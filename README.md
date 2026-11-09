# A Paz do Diabo — página de apresentação

Página de apresentação e venda do e-book **A Paz do Diabo**, em português brasileiro, com conteúdo editorial, imagens, informações sobre a obra e chamadas para compra.

## Tecnologias

- React 19 e Vite 7 para a interface.
- TypeScript e Tailwind CSS 4.
- PNPM 10.4.1 para instalação reproduzível das dependências.
- Express e tRPC para os endpoints de servidor disponíveis na implantação Node/Vercel.

## Checkout

Os botões principais direcionam diretamente ao checkout Kiwify configurado pelo proprietário:

https://pay.kiwify.com.br/oIqQUxE

O checkout é externo à aplicação. A disponibilidade, o preço, os meios de pagamento e a confirmação da compra são administrados pela Kiwify. Não inserir depoimentos fictícios nem alegações de certificação.

## Instalação e validação local

Requisitos: Node.js 22 e PNPM 10.4.1.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

O Vite gera a interface em `dist/public`; o comando de build também empacota o servidor em `dist/index.js`.

Para iniciar o servidor compilado, configure as variáveis de ambiente exigidas pelos recursos de backend e execute:

```bash
pnpm start
```

## GitHub Pages

O workflow `.github/workflows/pages.yml` instala as dependências com lockfile congelado, compila a aplicação e publica `dist/public`. O Vite usa a base `/ebook-a-paz-do-diabo-kaio/` quando `GITHUB_PAGES=true`.

GitHub Pages hospeda somente os arquivos estáticos da interface; não executa Express, tRPC, webhooks ou outros endpoints de servidor. O botão de compra continua funcional porque abre diretamente o checkout externo da Kiwify.

Ative **Settings → Pages → Build and deployment → Source → GitHub Actions** se o repositório ainda não estiver configurado para publicar pelo Actions.

## Vercel

A implantação Node/Vercel é necessária para os recursos de backend da aplicação. Configure as variáveis de ambiente e os serviços externos exigidos antes de depender de endpoints de API. A publicação estática no GitHub Pages e a implantação na Vercel são destinos independentes.

## Segurança e manutenção

- Não commitar chaves, tokens ou segredos.
- Manter `package.json` e `pnpm-lock.yaml` sincronizados.
- Usar apenas avaliações reais e autorizadas.
- Validar os links de compra no ambiente publicado antes de divulgar a página.
