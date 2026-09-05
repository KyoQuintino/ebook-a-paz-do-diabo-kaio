import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export function StripeCheckoutButton({
  children,
  className = "gold-cta",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const checkout = trpc.checkout.createEbookSession.useMutation();

  async function handleCheckout() {
    try {
      toast.loading("Preparando seu checkout seguro...", { id: "stripe-checkout" });
      const { url } = await checkout.mutateAsync();
      toast.success("Abrindo o checkout seguro.", { id: "stripe-checkout" });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("[Checkout] Could not create Stripe session", error);
      toast.error("Não foi possível iniciar o pagamento. Tente novamente.", { id: "stripe-checkout" });
    }
  }

  return (
    <button type="button" className={className} onClick={handleCheckout} disabled={checkout.isPending} aria-busy={checkout.isPending}>
      {checkout.isPending ? <Loader2 size={16} className="animate-spin" /> : children}
      {!checkout.isPending && <ArrowRight size={16} strokeWidth={1.8} />}
    </button>
  );
}
