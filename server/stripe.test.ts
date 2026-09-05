import { describe, expect, it } from "vitest";
import { buildEbookCheckoutParams } from "./stripe";
import { EBOOK_PRODUCT } from "./products";

describe("Stripe ebook checkout", () => {
  it("builds a one-time checkout with the configured Brazilian price", () => {
    const params = buildEbookCheckoutParams({
      origin: "https://pazdoebook-y5pqnwvd.manus.space",
      user: { id: 42, name: "Ana", email: "ana@example.com" },
    });

    expect(params.mode).toBe("payment");
    expect(params.allow_promotion_codes).toBe(true);
    expect(params.client_reference_id).toBe("42");
    expect(params.metadata).toMatchObject({
      product_key: EBOOK_PRODUCT.key,
      user_id: "42",
      customer_name: "Ana",
      customer_email: "ana@example.com",
    });
    expect(params.success_url).toContain("/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}");
    expect(params.cancel_url).toBe("https://pazdoebook-y5pqnwvd.manus.space/pagamento/cancelado");

    const lineItem = params.line_items?.[0];
    expect(lineItem).toMatchObject({
      quantity: 1,
      price_data: {
        currency: "brl",
        unit_amount: 2790,
      },
    });
  });
});
