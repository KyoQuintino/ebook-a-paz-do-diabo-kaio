# E-book-a-paz-do-Diabo-kaio

Site de apresentação e vendas do e-book *Limite Zero*, em português brasileiro. O repositório privado contém o projeto estático completo, os textos de cadastro e as artes promocionais locais.

## Conteúdo

- `index.html`, `styles.css` e `app.js`: página de vendas, menu mobile e CTAs.
- `assets/limite-zero-cover.png`: arte original em alta resolução para divulgação.
- `assets/limite-zero-cover.webp`: versão otimizada usada na página.
- `HOTMART-COPY.md`: título e descrição para cadastro do produto.
- `manus-routes.json` e `app.config.ts`: metadados do projeto Manus.
- `scripts/`: validação estática e geração do build.
- `.github/workflows/pages.yml`: verificação e publicação via GitHub Pages.
- `vercel.json`: build e diretório estático da Vercel.
- `plan.md` e `TODO.md`: direção visual, escopo e entregas.

Os botões de compra mantêm o checkout Kiwify fornecido pelo proprietário: <https://pay.kiwify.com.br/oIqQUxE>. A seção de depoimentos informa que não há avaliações de compradores no material recebido e está reservada a comentários reais autorizados; nenhuma avaliação foi inventada. O selo identifica o e-book como digital e em português, sem representar certificação oficial.

## Executar e validar localmente

Use Node.js 22 ou compatível. Não há dependências npm externas para instalar.

```bash
npm run check
npm run build
python3 -m http.server 8080 --directory dist
```

Depois acesse `http://localhost:8080`. A saída `dist/` inclui a página, estilos, script e as duas imagens; o arquivo `dist/.nojekyll` facilita a publicação no GitHub Pages. Caminhos relativos permitem servir o projeto tanto na raiz da Vercel quanto no subdiretório do Pages.

## GitHub Pages

O workflow em `.github/workflows/pages.yml` executa `npm run build` em pushes para `main`, pull requests e acionamento manual. A publicação de `dist/` só ocorre após push em `main` ou acionamento manual iniciado nesse mesmo branch; pull requests e outras branches não implantam o site. Na primeira publicação, o workflow tenta ativar Pages automaticamente com **GitHub Actions** como origem. Se a conta/repositório impedir essa ativação, será necessário habilitar Pages em **Settings → Pages → Build and deployment → GitHub Actions** ou ajustar o plano; a visibilidade privada do código não é alterada por este projeto.

## Vercel

A configuração `vercel.json` executa `npm run build` e publica `dist/`. Ao conectar este repositório a um projeto Vercel, os commits de `main` serão implantados automaticamente; não são necessários segredos no código. O projeto Vercel deste e-book é separado do site principal da vitrine.
