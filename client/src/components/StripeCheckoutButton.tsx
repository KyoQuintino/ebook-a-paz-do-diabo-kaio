import { ArrowRight } from "lucide-react";

const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/oIqQUxE";

export function StripeCheckoutButton({
  children,
  className = "gold-cta",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={KIWIFY_CHECKOUT_URL}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Comprar o e-book pelo checkout seguro da Kiwify"
    >
      {children}
      <ArrowRight size={16} strokeWidth={1.8} />
    </a>
  );
}
