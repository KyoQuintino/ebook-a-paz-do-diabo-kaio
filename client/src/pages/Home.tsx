/*
  Direção visual: clonagem de alta fidelidade da referência A Paz do Diabo.
  Editorial devocional escura, vitral dourado, serif de alto contraste,
  superfícies de papel e movimento sutil. Novos módulos devem parecer nativos.
*/

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";

const heroImage = "/manus-storage/hero-bg_27ef829e.png";
const authorImage = "/manus-storage/author-spurgeon_107ca148.webp";
const coverImage = "/manus-storage/a-paz-do-diabo-cover_4f3abc7b.png";
const interiorImage = "/manus-storage/a-paz-do-diabo-interior_bb37241b.png";
const studyGuideImage = "/manus-storage/guia-de-estudo-interior_b472cb69.png";
const markImage = "/manus-storage/paz-do-diabo-mark_ef8a964c.png";

const chapters = [
  {
    number: "I",
    title: "A Paz do Diabo",
    body: "Descubra por que a paz que o mundo oferece é uma ilusão perigosa. Spurgeon revela como o inimigo usa a falsa sensação de tranquilidade para manter os cristãos adormecidos, longe da verdadeira paz que só Cristo pode conceder.",
  },
  {
    number: "II",
    title: "A Sutileza do Inimigo",
    body: "As estratégias mais perigosas são as que você não percebe. Este capítulo desvenda os métodos sutis e enganosos que o diabo utiliza para infiltrar a dúvida, a apatia e a conformidade espiritual no coração do crente.",
  },
  {
    number: "III",
    title: "Raiz da Fraqueza",
    body: "Por que você cai nas mesmas tentações repetidamente? Spurgeon conduz o leitor a uma jornada profunda de autoexame, revelando que a verdadeira transformação só acontece quando identificamos e arrancamos a raiz de nossa fraqueza espiritual.",
  },
  {
    number: "IV",
    title: "Quando Deus Abandona",
    body: "O silêncio de Deus não é abandono — é propósito. Aprenda a discernir os períodos de aparente ausência divina não como castigo, mas como instrumento de fortalecimento e amadurecimento da fé.",
  },
  {
    number: "V",
    title: "Sem Ansiedade",
    body: "A ansiedade rouba a paz, mas a fé a restaura. Spurgeon ensina como substituir a preocupação paralisante pela confiança inabalável em Deus, com princípios práticos para viver livre do medo.",
  },
  {
    number: "VI",
    title: "Como o Pecado Afeta a Mente",
    body: "O pecado não corrompe apenas ações — ele distorce o pensamento. Este capítulo demonstra como o pecado obscurece a percepção espiritual e como a renovação da mente leva à paz genuína.",
  },
];

const promises = [
  {
    initial: "D",
    title: "Discernimento",
    quote: "“Paz, paz; e não há paz.” — Jeremias 6:14",
    body: "Reconhecer a falsa paz que adormece a alma — e por que a tranquilidade sem arrependimento é a mais perigosa das ilusões.",
  },
  {
    initial: "V",
    title: "Vigilância",
    quote: "“Resisti ao diabo, e ele fugirá de vós.” — Tiago 4:7",
    body: "Identificar as táticas sutis do inimigo antes que elas se tornem hábito, dúvida ou frieza espiritual.",
  },
  {
    initial: "T",
    title: "Transformação",
    quote: "“Sonda-me, ó Deus, e conhece o meu coração.” — Salmos 139:23",
    body: "Arrancar a raiz da fraqueza que faz você cair sempre na mesma tentação, em vez de podar apenas os sintomas.",
  },
  {
    initial: "D",
    title: "Descanso",
    quote: "“A minha paz vos dou; não vo-la dou como o mundo a dá.” — João 14:27",
    body: "Atravessar o silêncio de Deus sem se render ao medo, e trocar a ansiedade paralisante por confiança firme.",
  },
];

const bonuses = [
  ["eBook A Paz do Diabo", "6 capítulos de confronto e esperança", "R$ 47"],
  ["Guia de Estudo Completo", "Perguntas e aplicações para aprofundar cada capítulo", "R$ 37"],
  ["Plano de Leitura de 30 Dias", "Roteiro diário para transformar leitura em prática", "R$ 27"],
  ["Devocional: 7 Dias Sem Ansiedade", "Meditações curtas para acalmar a mente todo dia", "R$ 24"],
  ["Audiobook dos 6 Capítulos", "Ouça no trânsito, na academia ou antes de dormir", "R$ 47"],
  ["Acesso à Comunidade", "Grupo exclusivo de estudo, discussão e suporte", "R$ 47"],
];

const faqs = [
  ["Como recebo o eBook após a compra?", "Assim que o pagamento for aprovado, você recebe o acesso no e-mail usado na compra. O processo é digital e costuma ser liberado em menos de 2 minutos."],
  ["Qual é a garantia oferecida?", "Você tem 7 dias para ler o material com tranquilidade. Se decidir que não é para você, basta solicitar o reembolso dentro do prazo."],
  ["Preciso ter conhecimento teológico prévio?", "Não. A leitura foi pensada para acompanhar tanto quem está começando uma jornada de fé quanto quem já conhece a obra de Spurgeon."],
  ["O eBook tem quantas páginas?", "A edição digital reúne os seis capítulos e os materiais complementares em um formato leve e confortável para leitura."],
  ["Posso ler no celular?", "Sim. O acesso funciona em celular, tablet, computador e nos principais aplicativos de leitura."],
  ["Os bônus estão inclusos no preço?", "Sim. Os cinco materiais complementares aparecem no mesmo acesso, sem cobrança adicional."],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`reveal ${className}`} data-reveal style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

function SectionMarker({ children }: { children: React.ReactNode }) {
  return <div className="section-marker"><span>✦</span><span>{children}</span></div>;
}

function CTA({ compact = false }: { compact?: boolean }) {
  return (
    <StripeCheckoutButton className={`gold-cta ${compact ? "gold-cta-compact" : ""}`}>
      <span>{compact ? "QUERO MINHA PAZ AGORA" : "QUERO MINHA PAZ AGORA — R$ 27,90"}</span>
    </StripeCheckoutButton>
  );
}

function Countdown() {
  const [remaining, setRemaining] = useState({ days: 1, hours: 22, minutes: 59, seconds: 57 });
  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining((current) => {
        const total = ((current.days * 24 + current.hours) * 60 + current.minutes) * 60 + current.seconds - 1;
        if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
          days: Math.floor(total / 86400),
          hours: Math.floor((total % 86400) / 3600),
          minutes: Math.floor((total % 3600) / 60),
          seconds: total % 60,
        };
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="countdown" aria-label="Contagem regressiva da oferta">
      {[
        [remaining.days, "DIAS"],
        [remaining.hours, "HORAS"],
        [remaining.minutes, "MINUTOS"],
        [remaining.seconds, "SEGUNDOS"],
      ].map(([value, label]) => (
        <div className="countdown-unit" key={label}>
          <span>{String(value).padStart(2, "0")}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -50px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <header className="top-mark" aria-label="Marca A Paz do Diabo">
        <a href="#inicio" className="brand-mark-link">
          <img src={markImage} alt="" />
          <span>A Paz do Diabo</span>
        </a>
        <a href="#oferta" className="header-offer-link">Oferta especial <ArrowDown size={14} /></a>
      </header>

      <main>
        <section id="inicio" className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-overlay" />
          <div className="hero-beam" />
          <div className="hero-content container-wide">
            <Reveal className="offer-pill"><Sparkles size={12} /> Oferta por Tempo Limitado — 88% OFF</Reveal>
            <Reveal delay={90}>
              <h1>A Paz do Diabo</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero-subtitle">A sabedoria intemporal de C. H. Spurgeon, o Príncipe dos Pregadores</p>
            </Reveal>
            <Reveal delay={230}>
              <p className="hero-copy">Descubra os segredos da verdadeira paz espiritual que transformaram milhões de vidas. A paz que o mundo oferece é uma ilusão. A paz de Deus transforma.</p>
            </Reveal>
            <Reveal delay={300} className="hero-actions">
              <CTA />
              <a className="ghost-cta" href="#capitulos">Saber Mais <ArrowDown size={15} /></a>
            </Reveal>
            <Reveal delay={370} className="hero-proof">
              <span><ShieldCheck size={15} /> 7 dias de garantia incondicional</span>
              <span className="proof-divider">•</span>
              <span><Clock3 size={15} /> Acesso imediato após a compra</span>
            </Reveal>
          </div>
          <div className="hero-scroll-note"><span>Role para descobrir</span><ArrowDown size={15} /></div>
        </section>

        <section id="capitulos" className="chapters-section dark-section section-pad">
          <div className="container-wide">
            <Reveal className="section-intro centered-intro">
              <SectionMarker>O QUE VOCÊ VAI DESCOBRIR</SectionMarker>
              <h2>Seis Capítulos que <em>Transformarão</em> sua Fé</h2>
              <p>Cada capítulo é uma jornada profunda rumo à verdadeira paz espiritual, guiada pela sabedoria penetrante de C. H. Spurgeon.</p>
            </Reveal>
            <div className="chapters-grid">
              {chapters.map((chapter, index) => (
                <Reveal key={chapter.number} delay={index * 60} className="chapter-card">
                  <div className="chapter-number">{chapter.number}</div>
                  <div>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.body}</p>
                  </div>
                  <span className="card-arrow"><ArrowRight size={15} /></span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="promises-section parchment-section section-pad">
          <div className="container-wide">
            <Reveal className="section-intro centered-intro">
              <SectionMarker>O QUE ESTE EBOOK ENTREGA</SectionMarker>
              <h2>As Promessas <em>do Livro</em></h2>
              <p>Não prometemos milagres — prometemos o que Spurgeon efetivamente ensina em cada página.</p>
            </Reveal>
            <div className="promises-grid">
              {promises.map((promise, index) => (
                <Reveal key={promise.title} delay={index * 70} className="promise-card">
                  <div className="promise-initial">{promise.initial}</div>
                  <p className="promise-body">{promise.body}</p>
                  <div className="promise-meta">
                    <strong>{promise.title}</strong>
                    <span>{promise.quote}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mockups-section dark-section section-pad-large" id="por-dentro">
          <div className="container-wide mockups-wrap">
            <Reveal className="section-intro mockups-intro">
              <SectionMarker>UMA LEITURA QUE ACOMPANHA VOCÊ</SectionMarker>
              <h2>Veja por dentro da <em>sua jornada</em></h2>
              <p>Uma experiência pensada para ser lida devagar, marcada com intenção e levada para todos os lugares.</p>
            </Reveal>
            <div className="mockups-stage" aria-label="Mockups do eBook e do guia de estudo">
              <Reveal className="device device-tablet" delay={80}>
                <div className="device-camera" />
                <div className="device-screen">
                  <div className="screen-toolbar"><span>A PAZ DO DIABO</span><span>01 / 06</span></div>
                  <img src={interiorImage} alt="Página interna do eBook A Paz do Diabo" />
                </div>
              </Reveal>
              <Reveal className="cover-float" delay={230}>
                <div className="cover-shadow" />
                <img src={coverImage} alt="Capa do eBook A Paz do Diabo" />
                <span>eBook principal</span>
              </Reveal>
              <Reveal className="device device-phone" delay={360}>
                <div className="device-camera phone-camera" />
                <div className="device-screen phone-screen">
                  <div className="screen-toolbar"><span>GUIA DE ESTUDO</span><span>04</span></div>
                  <img src={studyGuideImage} alt="Página interna do Guia de Estudo" />
                </div>
              </Reveal>
            </div>
            <Reveal className="mockups-caption" delay={430}>
              <span className="caption-rule" />
              <span>Capítulos, perguntas e práticas em um só lugar.</span>
              <span className="caption-rule" />
            </Reveal>
            <Reveal className="mockups-cta" delay={500}>
              <CTA />
              <small>Acesso liberado em menos de 2 minutos</small>
            </Reveal>
          </div>
        </section>

        <section className="author-section parchment-section section-pad-large">
          <div className="container-wide author-layout">
            <Reveal className="author-photo-wrap">
              <div className="author-photo-frame"><img src={authorImage} alt="C. H. Spurgeon, o Príncipe dos Pregadores" /></div>
              <div className="author-photo-note">O Príncipe dos Pregadores</div>
            </Reveal>
            <Reveal className="author-copy" delay={100}>
              <SectionMarker>SOBRE O AUTOR</SectionMarker>
              <h2>C. H. <em>Spurgeon</em></h2>
              <p className="author-lead">O Príncipe dos Pregadores</p>
              <p>Charles Haddon Spurgeon (1834–1892) foi um dos maiores pregadores da história do cristianismo. Com mais de 3.500 sermões publicados, sua influência atravessa gerações e fronteiras, moldando a fé de milhões de cristãos ao redor do mundo.</p>
              <p>Conhecido por comunicar verdades teológicas profundas com clareza e paixão, Spurgeon combinava erudição e simplicidade como poucos. Sua obra continua relevante hoje, falando diretamente às lutas espirituais do cristão contemporâneo.</p>
              <p>Em <em>A Paz do Diabo</em>, ele aborda um dos temas mais urgentes da fé cristã: a distinção entre a paz verdadeira e a falsa paz que o inimigo oferece.</p>
              <div className="author-stats">
                <div><strong>3.500+</strong><span>Sermões</span></div>
                <div><strong>Milhões</strong><span>De leitores</span></div>
                <div><strong>150+</strong><span>Anos de legado</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="offer-section dark-section section-pad-large" id="oferta">
          <div className="container-wide">
            <Reveal className="offer-intro centered-intro">
              <SectionMarker>OFERTA ESPECIAL DE LANÇAMENTO</SectionMarker>
              <h2>Garanta Seu eBook <em>Agora</em></h2>
              <p className="offer-expiry"><Clock3 size={15} /> Oferta expira em</p>
              <Countdown />
            </Reveal>
            <Reveal className="offer-card" delay={100}>
              <div className="offer-visual">
                <div className="offer-cover-wrap"><img src={coverImage} alt="Capa do eBook A Paz do Diabo" /></div>
                <div className="offer-visual-seal"><Star size={14} fill="currentColor" /> 88% OFF</div>
              </div>
              <div className="offer-details">
                <h3>Tudo o que você recebe hoje</h3>
                <div className="bonus-list">
                  {bonuses.map(([title, description, price]) => (
                    <div className="bonus-row" key={title}>
                      <span className="bonus-check"><Check size={13} /></span>
                      <div><strong>{title}</strong><span>{description}</span></div>
                      <del>{price}</del>
                    </div>
                  ))}
                </div>
                <div className="offer-total"><span>Valor total do pacote</span><strong>R$ 229</strong></div>
                <div className="offer-price-label">Hoje, por apenas</div>
                <div className="offer-price">R$ 27,90</div>
                <div className="offer-saving">Economia de R$ 201 <span>(88% OFF)</span></div>
                <p className="offer-terms">Pagamento único • Menos que um café por capítulo • Acesso vitalício</p>
                <CTA />
                <div className="secure-note"><LockKeyhole size={14} /> Cartão • PIX • Boleto • Compra 100% segura • Risco zero por 7 dias</div>
              </div>
            </Reveal>
            <Reveal className="scarcity-note" delay={180}>
              <strong>Apenas 50 vagas neste preço promocional</strong>
              <span>43 de 50 vagas já preenchidas — depois volta para R$ 47</span>
              <div className="scarcity-bar"><span /></div>
            </Reveal>
          </div>
        </section>

        <section className="guarantee-section parchment-section section-pad">
          <div className="container-narrow">
            <Reveal className="guarantee-card">
              <div className="guarantee-icon"><ShieldCheck size={25} /></div>
              <SectionMarker>RISCO ZERO</SectionMarker>
              <h2>Garantia de <em>7 Dias</em></h2>
              <p>Sua satisfação é nossa prioridade. Você tem 7 dias para ler o eBook e, se por qualquer motivo não ficar satisfeito, basta solicitar o reembolso. Devolveremos 100% do valor, sem perguntas e sem burocracia. O risco é todo nosso.</p>
            </Reveal>
          </div>
        </section>

        <section className="faq-section dark-section section-pad-large">
          <div className="container-narrow">
            <Reveal className="section-intro centered-intro">
              <SectionMarker>DÚVIDAS FREQUENTES</SectionMarker>
              <h2>Perguntas e <em>Respostas</em></h2>
            </Reveal>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <Reveal key={question} delay={index * 40}>
                  <details className="faq-item">
                    <summary><span>{question}</span><ChevronDown size={17} /></summary>
                    <p>{answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta-section" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="final-cta-overlay" />
          <div className="container-narrow final-cta-content">
            <Reveal>
              <SectionMarker>A DECISÃO É SUA</SectionMarker>
              <h2>A Paz Verdadeira Está a <em>Um Clique</em> de Distância</h2>
              <p>Não espere a oferta expirar. Comece hoje mesmo sua jornada rumo à paz espiritual que transforma, liberta e permanece.</p>
              <CTA />
              <div className="final-proof"><Check size={14} /> Acesso imediato <span>•</span> 5 bônus inclusos <span>•</span> Garantia de 7 dias <span>•</span> 88% OFF por tempo limitado</div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><img src={markImage} alt="" /><span>A Paz do Diabo</span></div>
        <p>© {year} A Paz do Diabo — C. H. Spurgeon. Todos os direitos reservados.</p>
        <a href="#inicio" aria-label="Voltar ao início"><ArrowDown size={15} /></a>
      </footer>
    </div>
  );
}
