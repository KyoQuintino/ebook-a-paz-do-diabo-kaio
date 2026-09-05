import { Link } from "wouter";
import { Check, Loader2, ShieldCheck, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function PaymentResult({ cancelled = false }: { cancelled?: boolean }) {
  const sessionId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("session_id") : null;
  const status = trpc.checkout.getSessionStatus.useQuery(
    { sessionId: sessionId ?? "missing" },
    { enabled: Boolean(sessionId) && !cancelled, retry: 1 },
  );

  const paid = status.data?.paymentStatus === "paid";
  const title = cancelled ? "Pagamento não concluído" : paid ? "Compra confirmada" : "Estamos confirmando seu pagamento";
  const description = cancelled
    ? "Tudo bem. Seu checkout foi cancelado e nenhuma compra foi concluída. Você pode retornar quando estiver pronto."
    : paid
      ? "Seu acesso ao eBook será liberado no e-mail informado no checkout. Obrigado por dar este passo em direção à paz verdadeira."
      : "A confirmação pode levar alguns instantes. Mantenha esta página aberta enquanto verificamos o status com segurança.";

  return (
    <main className="payment-result-page">
      <div className="payment-result-card">
        <div className={`payment-result-icon ${cancelled ? "is-cancelled" : paid ? "is-paid" : "is-pending"}`}>
          {cancelled ? <X size={27} /> : paid ? <Check size={27} /> : <Loader2 size={27} className="animate-spin" />}
        </div>
        <span className="payment-result-kicker"><ShieldCheck size={14} /> Stripe Checkout seguro</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {!cancelled && status.data?.customerEmail && <small>Confirmação associada a {status.data.customerEmail}</small>}
        <Link href="/" className="payment-result-link">Voltar para A Paz do Diabo</Link>
      </div>
    </main>
  );
}
