import type { Request, Response } from "express";
import Stripe from "stripe";
import { EBOOK_PRODUCT } from "./products";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

export function buildEbookCheckoutParams({
  origin,
  user,
}: {
  origin: string;
  user?: { id: number; name?: string | null; email?: string | null } | null;
}): Stripe.Checkout.SessionCreateParams {
  const metadata: Record<string, string> = {
    product_key: EBOOK_PRODUCT.key,
  };

  if (user?.id) metadata.user_id = String(user.id);
  if (user?.email) metadata.customer_email = user.email;
  if (user?.name) metadata.customer_name = user.name;

  return {
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: EBOOK_PRODUCT.currency,
          product_data: {
            name: EBOOK_PRODUCT.name,
            description: EBOOK_PRODUCT.description,
          },
          unit_amount: EBOOK_PRODUCT.unitAmount,
        },
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    customer_email: user?.email ?? undefined,
    client_reference_id: user?.id ? String(user.id) : undefined,
    metadata,
    success_url: `${origin}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pagamento/cancelado`,
  };
}

export async function createEbookCheckoutSession({
  origin,
  user,
}: {
  origin: string;
  user?: { id: number; name?: string | null; email?: string | null } | null;
}) {
  return getStripeClient().checkout.sessions.create(buildEbookCheckoutParams({ origin, user }));
}

export async function getCheckoutSessionStatus(sessionId: string) {
  const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
  return {
    id: session.id,
    status: session.status,
    paymentStatus: session.payment_status,
    customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
    productKey: session.metadata?.product_key ?? null,
  };
}

export async function handleStripeWebhook(req: Request, res: Response) {
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || typeof signature !== "string") {
    return res.status(400).json({ error: "Stripe webhook is not configured" });
  }

  let event: Stripe.Event;
  try {
    event = getStripeClient().webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (error) {
    console.error("[Stripe] Invalid webhook signature", error);
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  if (event.id.startsWith("evt_test_")) {
    console.log("[Stripe] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[Stripe] Checkout completed", {
        eventId: event.id,
        sessionId: session.id,
        paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
        productKey: session.metadata?.product_key,
        createdAt: event.created,
      });
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.warn("[Stripe] Payment failed", {
        eventId: event.id,
        paymentIntentId: paymentIntent.id,
        createdAt: event.created,
      });
      break;
    }
    default:
      console.log("[Stripe] Event received", { eventId: event.id, type: event.type, createdAt: event.created });
  }

  return res.json({ received: true });
}
