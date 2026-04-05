# Moveis.pro Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Moveis.pro marketing website — site institucional dark premium para venda de serviços tech especializados no nicho moveleiro do Nordeste.

**Architecture:** Astro (SSG) + Tailwind CSS + TypeScript. Todas as páginas são geradas como HTML estático — sem banco de dados, sem auth, sem JS client-side exceto onde explicitamente necessário. Conteúdo de blog e cases gerenciado via Astro Content Collections (arquivos `.md`). Formulário de contato via Netlify Forms.

**Tech Stack:** Astro 4, Tailwind CSS 3, TypeScript, @astrojs/sitemap, Playwright (E2E), Netlify Forms

---

## File Structure

```
src/
├── components/
│   ├── Nav.astro              # Navegação fixa com blur
│   ├── Footer.astro           # Footer com logo e copyright
│   ├── SectionHeader.astro    # Index + título + subtexto + link
│   ├── Marquee.astro          # Faixa de texto em loop infinito
│   ├── HeroCard.astro         # Card de métricas flutuante no hero
│   ├── ServiceRow.astro       # Linha numerada na lista de serviços
│   ├── NumbersBar.astro       # Faixa de 4 métricas numéricas
│   ├── CaseCard.astro         # Card de case com badge e métrica
│   └── CTABox.astro           # Bloco CTA final em 2 colunas
├── layouts/
│   └── BaseLayout.astro       # HTML base com fonts, meta, SEO
├── pages/
│   ├── index.astro            # Home
│   ├── sobre.astro            # Sobre a empresa
│   ├── contato.astro          # Formulário de agendamento
│   ├── servicos/
│   │   ├── index.astro        # Lista de serviços
│   │   └── [slug].astro       # Página individual de serviço
│   ├── cases/
│   │   ├── index.astro        # Grid de cases
│   │   └── [slug].astro       # Case individual
│   └── blog/
│       ├── index.astro        # Lista de artigos
│       └── [slug].astro       # Artigo individual
├── content/
│   ├── config.ts              # Schemas das Content Collections
│   ├── servicos/              # .md de cada serviço
│   ├── cases/                 # .md de cada case
│   └── blog/                  # .md de artigos
└── styles/
    └── global.css             # CSS vars, reset, classes utilitárias

public/
├── favicon.ico
├── logo.png                   # Logo da Moveis.pro (fornecido)
└── robots.txt

tests/
├── home.spec.ts               # E2E: home page
├── servicos.spec.ts           # E2E: listagem e páginas de serviço
├── contato.spec.ts            # E2E: formulário de contato
└── navigation.spec.ts         # E2E: navegação entre páginas

astro.config.mjs
tailwind.config.mjs
tsconfig.json
playwright.config.ts
package.json
.gitignore
netlify.toml
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `netlify.toml`

- [ ] **Step 1: Inicializar projeto Astro**

```bash
cd "g:/documentos/moveis.pro site"
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```

Expected: pasta `src/` criada com estrutura mínima do Astro.

- [ ] **Step 2: Instalar dependências**

```bash
npm install
npm install -D @astrojs/tailwind tailwindcss @astrojs/sitemap playwright @playwright/test
npx astro add tailwind --yes
npx astro add sitemap --yes
```

Expected: `node_modules/` criado, sem erros.

- [ ] **Step 3: Configurar astro.config.mjs**

Substituir conteúdo de `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://moveis.pro',
  integrations: [tailwind(), sitemap()],
});
```

- [ ] **Step 4: Configurar tailwind.config.mjs**

Substituir conteúdo de `tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: '#8B4513',
        gold: '#C8792A',
        'gold-light': '#e8a855',
        dark: '#070707',
        'dark-2': '#0d0d0d',
        'dark-3': '#131313',
      },
      fontFamily: {
        display: ['Urbanist', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tightest: '-0.07em',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Criar netlify.toml**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 6: Criar .gitignore**

```
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
.DS_Store
test-results/
playwright-report/
```

- [ ] **Step 7: Inicializar git e commitar scaffold**

```bash
git init
git add .
git commit -m "feat: scaffold Astro + Tailwind project"
```

Expected: commit criado sem erros.

---

## Task 2: CSS Global e Design Tokens

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Criar global.css com CSS vars e reset**

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --brown: #8B4513;
    --gold: #C8792A;
    --gold-light: #e8a855;
    --dark: #070707;
    --dark-2: #0d0d0d;
    --dark-3: #131313;
    --border: rgba(255, 255, 255, 0.06);
    --muted: rgba(255, 255, 255, 0.35);
    --dim: rgba(255, 255, 255, 0.58);
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--dark);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

@layer utilities {
  .text-muted { color: var(--muted); }
  .text-dim { color: var(--dim); }
  .border-subtle { border-color: var(--border); }
  .bg-dark-2 { background-color: var(--dark-2); }
  .bg-dark-3 { background-color: var(--dark-3); }
}
```

- [ ] **Step 2: Verificar que Tailwind importa o CSS**

Abrir `src/pages/index.astro` e verificar que tem:
```astro
---
import '../styles/global.css';
---
```

Se não tiver, adicionar o import.

- [ ] **Step 3: Testar build**

```bash
npm run build
```

Expected: `dist/` criado sem erros.

- [ ] **Step 4: Commitar**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with design tokens"
```

---

## Task 3: BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Criar BaseLayout.astro**

```astro
---
// src/layouts/BaseLayout.astro
export interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const {
  title,
  description = 'Tecnologia especializada no mercado moveleiro. CRM com IA, tráfego inteligente, omnichannel e visualização 3D para lojas de móveis do Nordeste.',
  ogImage = '/og-default.png',
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href={canonicalURL} />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;700;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
      rel="stylesheet"
    />
    <title>{title} | Moveis.pro</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Configurar Playwright**

Criar `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 3: Criar primeiro teste E2E**

Criar `tests/home.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Moveis\.pro/);
});

test('nav has logo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toBeVisible();
});
```

- [ ] **Step 4: Rodar teste (deve falhar — página ainda vazia)**

```bash
npx playwright test tests/home.spec.ts
```

Expected: FAIL — `nav` not found.

- [ ] **Step 5: Commitar layout base**

```bash
git add src/layouts/BaseLayout.astro playwright.config.ts tests/home.spec.ts
git commit -m "feat: add BaseLayout with SEO meta and font imports"
```

---

## Task 4: Componente Nav

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Criar Nav.astro**

```astro
---
// src/components/Nav.astro
const links = [
  { href: '/servicos', label: 'Serviços' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/cases', label: 'Cases' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
];

const currentPath = Astro.url.pathname;
---

<nav
  class="fixed top-0 left-0 right-0 z-50 h-16 px-14 flex items-center justify-between"
  style="background: rgba(7,7,7,0.88); backdrop-filter: blur(18px) saturate(1.6); border-bottom: 1px solid var(--border);"
>
  <a href="/" class="font-display font-black text-xl tracking-tight text-white no-underline">
    moveis<em class="not-italic" style="color: var(--gold);">.pro</em>
  </a>

  <ul class="hidden md:flex gap-9 list-none">
    {links.map((link) => (
      <li>
        <a
          href={link.href}
          class={`text-sm font-normal no-underline transition-colors duration-150 ${
            currentPath.startsWith(link.href)
              ? 'text-white'
              : 'text-muted hover:text-white'
          }`}
          style={currentPath.startsWith(link.href) ? '' : 'color: var(--muted);'}
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>

  <a
    href="/contato"
    class="text-sm font-semibold text-white px-5 py-2.5 rounded-lg no-underline transition-opacity hover:opacity-90"
    style="background: var(--brown);"
  >
    Falar com especialista
  </a>
</nav>
```

- [ ] **Step 2: Criar Footer.astro**

```astro
---
// src/components/Footer.astro
const year = new Date().getFullYear();
---

<footer
  class="px-14 py-7 flex justify-between items-center"
  style="border-top: 1px solid var(--border);"
>
  <div class="font-display font-black text-base tracking-tight" style="color: rgba(255,255,255,0.25);">
    moveis<em class="not-italic" style="color: var(--brown);">.pro</em>
  </div>
  <p class="text-xs font-light" style="color: rgba(255,255,255,0.18);">
    © {year} Moveis.pro — Tecnologia para o mercado moveleiro
  </p>
</footer>
```

- [ ] **Step 3: Adicionar Nav e Footer ao index.astro**

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';
---

<BaseLayout title="Tecnologia que vende móveis">
  <Nav />
  <main style="padding-top: 64px;">
    <p style="padding: 4rem;">Em construção...</p>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 4: Rodar testes**

```bash
npx playwright test tests/home.spec.ts
```

Expected: PASS — nav visível, title contém "Moveis.pro".

- [ ] **Step 5: Commitar**

```bash
git add src/components/Nav.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Nav and Footer components"
```

---

## Task 5: Componentes Reutilizáveis

**Files:**
- Create: `src/components/SectionHeader.astro`
- Create: `src/components/Marquee.astro`
- Create: `src/components/HeroCard.astro`
- Create: `src/components/ServiceRow.astro`
- Create: `src/components/NumbersBar.astro`
- Create: `src/components/CaseCard.astro`
- Create: `src/components/CTABox.astro`

- [ ] **Step 1: Criar SectionHeader.astro**

```astro
---
// src/components/SectionHeader.astro
export interface Props {
  index: string;       // ex: "01 — Serviços"
  title: string;       // ex: "O que a\nMoveis.pro faz"
  subtitle?: string;
  linkLabel?: string;
  linkHref?: string;
}
const { index, title, subtitle, linkLabel, linkHref } = Astro.props;
---

<div
  class="flex justify-between items-end pb-11 mb-0"
  style="border-bottom: 1px solid var(--border);"
>
  <div>
    <div
      class="text-xs font-bold tracking-widest uppercase mb-4"
      style="color: var(--brown); letter-spacing: 2px;"
    >
      {index}
    </div>
    <h2
      class="font-display font-black text-white"
      style="font-size: clamp(32px, 4vw, 52px); letter-spacing: -1.8px; line-height: 1.0;"
    >
      {title}
    </h2>
  </div>

  {(subtitle || linkLabel) && (
    <div class="text-right max-w-xs">
      {subtitle && (
        <p class="text-sm font-light leading-relaxed mb-5" style="color: var(--muted);">
          {subtitle}
        </p>
      )}
      {linkLabel && linkHref && (
        <a
          href={linkHref}
          class="text-sm font-medium no-underline inline-flex items-center gap-1.5"
          style="color: var(--gold);"
        >
          {linkLabel}
        </a>
      )}
    </div>
  )}
</div>
```

- [ ] **Step 2: Criar Marquee.astro**

```astro
---
// src/components/Marquee.astro
export interface Props {
  items: string[];
}
const { items } = Astro.props;
const doubled = [...items, ...items];
---

<style>
  .marquee-track {
    display: flex;
    gap: 52px;
    width: max-content;
    animation: scroll 28s linear infinite;
  }
  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .marquee-item {
    font-family: 'Urbanist', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.13);
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .marquee-item::after {
    content: '✦';
    color: #8B4513;
    font-size: 9px;
  }
</style>

<div
  class="overflow-hidden py-4"
  style="border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--dark-2);"
>
  <div class="marquee-track">
    {doubled.map((item) => (
      <span class="marquee-item">{item}</span>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Criar HeroCard.astro**

```astro
---
// src/components/HeroCard.astro
export interface Props {
  metric: string;        // ex: "+187%"
  metricLabel: string;  // ex: "Leads qualificados — Móveis Alfa SP"
  barPercent: number;   // 0-100
  rows: Array<{ label: string; value: string }>;
}
const { metric, metricLabel, barPercent, rows } = Astro.props;
---

<div
  class="relative rounded-2xl p-8 overflow-hidden"
  style="background: var(--dark-3); border: 1px solid var(--border);"
>
  <div
    class="absolute top-0 left-0 right-0 h-px"
    style="background: linear-gradient(90deg, transparent, rgba(200,121,42,0.7), transparent);"
  ></div>

  <div
    class="text-xs font-semibold uppercase tracking-widest mb-6"
    style="color: var(--muted); letter-spacing: 1.8px;"
  >
    Performance do mês atual
  </div>

  <div
    class="font-display font-black leading-none mb-2"
    style="font-size: 56px; letter-spacing: -2.5px; color: #fff;"
  >
    <em class="not-italic" style="color: var(--gold);">{metric.startsWith('+') ? '+' : ''}</em>{metric.replace('+', '')}
  </div>

  <p class="text-xs font-light mb-6" style="color: var(--muted);">{metricLabel}</p>

  <div class="h-px rounded-full mb-6" style="background: rgba(255,255,255,0.06);">
    <div
      class="h-px rounded-full"
      style={`width: ${barPercent}%; background: linear-gradient(90deg, var(--brown), var(--gold-light));`}
    ></div>
  </div>

  <div class="flex flex-col gap-3">
    {rows.map((row) => (
      <div class="flex justify-between items-center">
        <span class="text-xs font-light" style="color: var(--muted);">{row.label}</span>
        <span
          class="font-display font-black text-sm"
          style="color: var(--gold); letter-spacing: -0.3px;"
        >
          {row.value}
        </span>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Criar ServiceRow.astro**

```astro
---
// src/components/ServiceRow.astro
export interface Props {
  number: string;   // ex: "01"
  name: string;
  description: string;
  badge: string;    // ex: "IA & Automação"
  href: string;
}
const { number, name, description, badge, href } = Astro.props;
---

<a
  href={href}
  class="grid gap-7 py-8 no-underline group transition-all duration-200"
  style="grid-template-columns: 72px 1fr 1.1fr 110px; align-items: center; border-bottom: 1px solid var(--border);"
>
  <span
    class="font-display font-bold text-xs tracking-wider"
    style="color: var(--brown); letter-spacing: 1px;"
  >
    {number}
  </span>
  <span
    class="font-display font-black text-white transition-colors group-hover:opacity-80"
    style="font-size: 19px; letter-spacing: -0.5px;"
  >
    {name}
  </span>
  <span class="text-sm font-light leading-snug" style="color: var(--muted);">
    {description}
  </span>
  <span
    class="text-xs font-medium text-center px-3 py-1.5 rounded-full whitespace-nowrap"
    style="color: var(--muted); background: rgba(255,255,255,0.04); letter-spacing: 0.5px;"
  >
    {badge}
  </span>
</a>
```

- [ ] **Step 5: Criar NumbersBar.astro**

```astro
---
// src/components/NumbersBar.astro
export interface Props {
  items: Array<{ value: string; label: string }>;
}
const { items } = Astro.props;
---

<div
  class="relative rounded-2xl overflow-hidden"
  style="background: var(--dark-3); border: 1px solid var(--border); padding: 68px 60px;"
>
  <div
    class="absolute top-0 left-1/4 right-1/4 h-px"
    style="background: linear-gradient(90deg, transparent, rgba(139,69,19,0.6), transparent);"
  ></div>

  <div class="grid gap-0" style={`grid-template-columns: repeat(${items.length}, 1fr);`}>
    {items.map((item, i) => (
      <div
        class="px-9"
        style={`padding-left: ${i === 0 ? '0' : '36px'}; padding-right: 36px; ${i < items.length - 1 ? 'border-right: 1px solid var(--border);' : ''}`}
      >
        <div
          class="font-display font-black leading-none"
          style="font-size: 48px; letter-spacing: -2.5px; color: #fff;"
          set:html={item.value.replace(/(\d+[\d.,]*[x%+\-]?)/g, `<em style="color: var(--gold); font-style: normal;">$1</em>`)}
        />
        <p class="text-xs font-light leading-snug mt-2.5" style="color: var(--muted);">
          {item.label}
        </p>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 6: Criar CaseCard.astro**

```astro
---
// src/components/CaseCard.astro
export interface Props {
  tag: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  featured?: boolean;
}
const { tag, title, description, metric, metricLabel, featured = false } = Astro.props;
---

<div
  class={`relative rounded-[18px] p-10 flex flex-col justify-between transition-all duration-200 hover:border-opacity-40 ${featured ? 'row-span-2' : ''}`}
  style="background: var(--dark-3); border: 1px solid var(--border); min-height: 220px;"
>
  <div>
    <span
      class="block text-xs font-semibold tracking-widest uppercase mb-5"
      style="color: var(--gold); letter-spacing: 1.5px;"
    >
      {tag}
    </span>
    <h3
      class="font-display font-black text-white mb-2.5"
      style="font-size: 22px; letter-spacing: -0.6px;"
    >
      {title}
    </h3>
    <p class="text-sm font-light leading-relaxed" style="color: var(--muted);">
      {description}
    </p>
  </div>

  <div class="mt-10">
    <div
      class="font-display font-black leading-none"
      style={`font-size: ${featured ? '58px' : '44px'}; letter-spacing: -3px; color: var(--gold);`}
    >
      {metric}
    </div>
    <p class="text-xs font-light mt-1.5" style="color: var(--muted);">{metricLabel}</p>
  </div>
</div>
```

- [ ] **Step 7: Criar CTABox.astro**

```astro
---
// src/components/CTABox.astro
export interface Props {
  title: string;           // pode ter \n para quebra de linha
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
}
const { title, subtitle, buttonLabel, buttonHref } = Astro.props;
const titleLines = title.split('\n');
---

<div
  class="relative rounded-3xl overflow-hidden"
  style="border: 1px solid var(--border); background: var(--dark-2); padding: 84px 68px;"
>
  <div
    class="absolute bottom-0 right-0 w-72 h-72 pointer-events-none"
    style="background: radial-gradient(circle, rgba(139,69,19,0.16) 0%, transparent 70%); transform: translate(25%, 25%);"
  ></div>

  <div class="grid gap-14 items-center" style="grid-template-columns: 1fr 260px;">
    <h2
      class="font-display font-black text-white leading-tight"
      style="font-size: clamp(32px, 4vw, 52px); letter-spacing: -2px; line-height: 1.05;"
    >
      {titleLines.map((line, i) => (
        <span>
          {i === titleLines.length - 1
            ? <em class="not-italic" style="color: var(--gold);">{line}</em>
            : line}
          {i < titleLines.length - 1 && <br />}
        </span>
      ))}
    </h2>

    <div class="relative z-10">
      <p class="text-sm font-light leading-relaxed mb-5" style="color: var(--muted);">
        {subtitle}
      </p>
      <a
        href={buttonHref}
        class="flex items-center justify-center gap-2 w-full text-sm font-semibold text-white rounded-[10px] no-underline transition-opacity hover:opacity-90"
        style="background: var(--brown); padding: 15px 28px;"
      >
        {buttonLabel}
      </a>
    </div>
  </div>
</div>
```

- [ ] **Step 8: Commitar todos os componentes**

```bash
git add src/components/
git commit -m "feat: add all reusable UI components"
```

---

## Task 6: Home Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Montar a Home com todos os componentes**

Substituir `src/pages/index.astro` por:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import Marquee from '../components/Marquee.astro';
import HeroCard from '../components/HeroCard.astro';
import SectionHeader from '../components/SectionHeader.astro';
import ServiceRow from '../components/ServiceRow.astro';
import NumbersBar from '../components/NumbersBar.astro';
import CaseCard from '../components/CaseCard.astro';
import CTABox from '../components/CTABox.astro';
import '../styles/global.css';

const services = [
  { number: '01', name: 'CRM Automatizado', description: 'Gestão de clientes com IA para aumentar conversão e fidelização sem trabalho manual.', badge: 'IA & Automação', slug: 'crm-automatizado' },
  { number: '02', name: 'Tráfego com IA', description: 'Google e Meta Ads otimizados por inteligência artificial para maximizar seu ROI.', badge: 'Performance', slug: 'trafego-com-ia' },
  { number: '03', name: 'Omnichannel', description: 'WhatsApp, Instagram, e-mail e loja física integrados em um único painel de controle.', badge: 'Integração', slug: 'omnichannel' },
  { number: '04', name: 'Agente de IA / Chatbot', description: 'Atendimento 24/7 que qualifica leads, responde dúvidas e agenda visitas automaticamente.', badge: 'IA & Automação', slug: 'agente-ia' },
  { number: '05', name: 'Métricas em Tempo Real', description: 'Dashboard com todos os indicadores da sua loja atualizados ao vivo, acessível de qualquer lugar.', badge: 'Analytics', slug: 'metricas' },
  { number: '06', name: 'Sites de Alto Padrão', description: 'Sites rápidos, modernos e otimizados para converter visitantes em compradores reais.', badge: 'Web & Design', slug: 'sites' },
  { number: '07', name: 'Soluções Comerciais', description: 'Estratégia e consultoria comercial integrada para ampliar suas vendas no Nordeste.', badge: 'Estratégia', slug: 'solucoes-comerciais' },
  { number: '08', name: 'Visualização 3D / RA', description: 'Configurador 3D e realidade aumentada para móveis — nenhum concorrente no Nordeste oferece.', badge: '3D & RA', slug: 'visualizacao-3d' },
];

const numbers = [
  { value: '+200', label: 'Lojas de móveis atendidas no Brasil' },
  { value: '3.8×', label: 'Retorno médio sobre investimento em tráfego' },
  { value: '98%', label: 'Taxa de satisfação dos clientes ativos' },
  { value: '24h', label: 'Suporte especializado sempre disponível' },
];

const cases = [
  { tag: 'CRM + Tráfego com IA', title: 'Móveis Alfa — São Paulo', description: 'Implementação de CRM automatizado e campanhas de tráfego com IA em 45 dias. O resultado superou todas as metas no primeiro trimestre.', metric: '+187%', metricLabel: 'Aumento em leads qualificados', featured: true },
  { tag: 'Omnichannel', title: 'Casa & Design — BH', description: 'Integração de todos os canais em painel único.', metric: '4.2×', metricLabel: 'Retorno sobre investimento', featured: false },
  { tag: 'Agente de IA', title: 'Decor Prime — Rio', description: 'Chatbot com IA para qualificação automática de leads.', metric: '−68%', metricLabel: 'Tempo de atendimento', featured: false },
];

const marqueeItems = ['CRM Automatizado', 'Tráfego com IA', 'Omnichannel', 'Agente de IA', 'Métricas em Tempo Real', 'Sites de Alto Padrão', 'Soluções Comerciais', 'Visualização 3D'];
---

<BaseLayout title="Tecnologia que vende móveis">
  <Nav />

  <!-- HERO -->
  <section
    class="relative overflow-hidden"
    style="padding: 148px 56px 88px; display: grid; grid-template-columns: 1fr 400px; gap: 56px; align-items: center; min-height: 100vh;"
  >
    <!-- Ambient glows -->
    <div class="absolute pointer-events-none" style="top: -160px; right: 80px; width: 580px; height: 580px; background: radial-gradient(circle, rgba(139,69,19,0.2) 0%, transparent 68%);"></div>
    <div class="absolute pointer-events-none" style="bottom: 0; left: -60px; width: 360px; height: 360px; background: radial-gradient(circle, rgba(200,121,42,0.07) 0%, transparent 70%);"></div>

    <div class="relative z-10">
      <div class="inline-flex items-center gap-2.5 mb-8" style="color: var(--gold);">
        <span class="block w-7 h-px" style="background: var(--gold);"></span>
        <span class="text-xs font-medium tracking-widest uppercase" style="letter-spacing: 2px;">Especialistas em móveis</span>
      </div>

      <h1
        class="font-display font-black text-white mb-8"
        style="font-size: clamp(52px, 6.2vw, 86px); line-height: 0.95; letter-spacing: -3px;"
      >
        Tecnologia<br />que vende<br />
        <span style="-webkit-text-stroke: 1.8px var(--gold); color: transparent;">móveis.</span>
      </h1>

      <p class="font-light mb-12 max-w-md" style="font-size: 16px; color: var(--dim); line-height: 1.7;">
        CRM com IA, tráfego inteligente, omnichannel e visualização 3D — desenvolvidos para o mercado moveleiro do Nordeste.
      </p>

      <div class="flex items-center gap-4">
        <a
          href="/contato"
          class="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-[10px] no-underline transition-opacity hover:opacity-90"
          style="background: var(--brown); padding: 14px 28px;"
        >
          Ver demonstração →
        </a>
        <a
          href="/servicos"
          class="text-sm font-normal no-underline transition-colors hover:text-white"
          style="color: var(--muted);"
        >
          Conheça os serviços ↓
        </a>
      </div>
    </div>

    <div class="relative z-10">
      <HeroCard
        metric="+187%"
        metricLabel="Leads qualificados — Móveis Alfa SP"
        barPercent={74}
        rows={[
          { label: 'ROI em tráfego pago', value: '3.8×' },
          { label: 'Taxa de conversão', value: '+64%' },
          { label: 'Tempo de resposta', value: '−68%' },
        ]}
      />
    </div>
  </section>

  <!-- MARQUEE -->
  <Marquee items={marqueeItems} />

  <!-- SERVICES -->
  <section style="padding: 116px 56px;">
    <SectionHeader
      index="01 — Serviços"
      title={"O que a\nMoveis.pro faz"}
      subtitle="Da captação de leads à gestão completa — cobrimos toda a jornada com tecnologia própria para o setor moveleiro."
      linkLabel="Ver todos os serviços →"
      linkHref="/servicos"
    />
    <div class="flex flex-col mt-0">
      {services.map((s) => (
        <ServiceRow
          number={s.number}
          name={s.name}
          description={s.description}
          badge={s.badge}
          href={`/servicos/${s.slug}`}
        />
      ))}
    </div>
  </section>

  <!-- NUMBERS -->
  <div style="padding: 0 56px;">
    <NumbersBar items={numbers} />
  </div>

  <!-- CASES -->
  <section style="padding: 116px 56px;">
    <SectionHeader index="02 — Resultados" title="Cases de sucesso" />
    <div
      class="mt-14"
      style="display: grid; grid-template-columns: 1.5fr 1fr; grid-template-rows: 1fr 1fr; gap: 14px;"
    >
      {cases.map((c) => (
        <CaseCard
          tag={c.tag}
          title={c.title}
          description={c.description}
          metric={c.metric}
          metricLabel={c.metricLabel}
          featured={c.featured}
        />
      ))}
    </div>
  </section>

  <!-- CTA -->
  <div style="padding: 0 56px 100px;">
    <CTABox
      title={"Pronto para sua\nloja vender com\ntecnologia?"}
      subtitle="Agende uma conversa gratuita com um especialista e receba um diagnóstico completo do seu negócio."
      buttonLabel="Agendar conversa gratuita →"
      buttonHref="/contato"
    />
  </div>

  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Rodar dev server e verificar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:4321` e verificar que todas as seções aparecem.

- [ ] **Step 3: Atualizar testes E2E da home**

Substituir `tests/home.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('home page renders hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Tecnologia');
  await expect(page.locator('h1')).toContainText('móveis');
});

test('home has nav with all links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="/servicos"]')).toBeVisible();
  await expect(page.locator('nav a[href="/sobre"]')).toBeVisible();
  await expect(page.locator('nav a[href="/cases"]')).toBeVisible();
  await expect(page.locator('nav a[href="/blog"]')).toBeVisible();
  await expect(page.locator('nav a[href="/contato"]')).toBeVisible();
});

test('home has 8 service rows', async ({ page }) => {
  await page.goto('/');
  const rows = page.locator('a[href^="/servicos/"]');
  await expect(rows).toHaveCount(8);
});

test('home has numbers bar', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('+200')).toBeVisible();
  await expect(page.getByText('3.8×')).toBeVisible();
});

test('home CTA links to contato', async ({ page }) => {
  await page.goto('/');
  const cta = page.locator('a[href="/contato"]').last();
  await expect(cta).toBeVisible();
});
```

- [ ] **Step 4: Rodar testes**

```bash
npx playwright test tests/home.spec.ts
```

Expected: todos PASS.

- [ ] **Step 5: Commitar**

```bash
git add src/pages/index.astro tests/home.spec.ts
git commit -m "feat: build complete home page"
```

---

## Task 7: Content Collections (Serviços, Cases, Blog)

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/servicos/*.md` (8 arquivos)
- Create: `src/content/cases/*.md` (3 arquivos)
- Create: `src/content/blog/*.md` (1 arquivo exemplo)

- [ ] **Step 1: Criar config.ts das Content Collections**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const servicos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    badge: z.string(),
    icon: z.string(),
    order: z.number(),
  }),
});

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    city: z.string(),
    service: z.string(),
    metric: z.string(),
    metricLabel: z.string(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Equipe Moveis.pro'),
  }),
});

export const collections = { servicos, cases, blog };
```

- [ ] **Step 2: Criar arquivos .md dos serviços**

Criar `src/content/servicos/crm-automatizado.md`:

```markdown
---
title: CRM Automatizado
description: Gestão de clientes com IA para aumentar conversão e fidelização sem trabalho manual.
badge: IA & Automação
icon: 🤖
order: 1
---

## Como funciona

O CRM Automatizado da Moveis.pro integra inteligência artificial diretamente no seu processo de gestão de clientes. Cada lead que chega ao seu negócio é automaticamente classificado, pontuado e direcionado para o vendedor certo.

## Benefícios

- Nunca perca um follow-up com clientes
- Histórico completo de cada interação
- Automação de e-mails e mensagens de WhatsApp
- Score de probabilidade de compra por cliente
- Relatórios de conversão em tempo real
```

Criar `src/content/servicos/trafego-com-ia.md`:

```markdown
---
title: Tráfego com IA
description: Google e Meta Ads otimizados por inteligência artificial para maximizar seu ROI.
badge: Performance
icon: 📊
order: 2
---

## Como funciona

Nossa plataforma de tráfego usa IA para analisar continuamente o desempenho dos seus anúncios, redistribuindo o orçamento automaticamente para os anúncios e públicos que mais convertem.

## Benefícios

- Redução de custo por lead em até 40%
- Otimização automática 24/7
- Relatórios de ROI por campanha
- Segmentação avançada para o setor moveleiro
- Integração com Google Ads e Meta Ads
```

Criar `src/content/servicos/omnichannel.md`:

```markdown
---
title: Omnichannel
description: WhatsApp, Instagram, e-mail e loja física integrados em um único painel de controle.
badge: Integração
icon: 🔗
order: 3
---

## Como funciona

Unificamos todos os seus canais de atendimento — WhatsApp, Instagram, e-mail, telefone e loja física — em uma única interface. Sua equipe vê todo o histórico do cliente em qualquer canal.

## Benefícios

- Atendimento unificado em todos os canais
- Histórico completo do cliente
- Transferência de atendimento entre canais sem perda de contexto
- Métricas por canal e por vendedor
- Integração com WhatsApp Business API
```

Criar `src/content/servicos/agente-ia.md`:

```markdown
---
title: Agente de IA / Chatbot
description: Atendimento 24/7 que qualifica leads, responde dúvidas e agenda visitas automaticamente.
badge: IA & Automação
icon: 💬
order: 4
---

## Como funciona

Nosso agente de IA é treinado com o catálogo de móveis da sua loja e com as dúvidas mais frequentes dos seus clientes. Ele atende, qualifica e agenda visitas — sem intervenção humana.

## Benefícios

- Atendimento 24h por dia, 7 dias por semana
- Qualificação automática de leads
- Agendamento de visitas integrado ao seu calendário
- Transferência para vendedor humano quando necessário
- Treinado com seu catálogo de produtos
```

Criar `src/content/servicos/metricas.md`:

```markdown
---
title: Métricas em Tempo Real
description: Dashboard com todos os indicadores da sua loja atualizados ao vivo.
badge: Analytics
icon: ⚡
order: 5
---

## Como funciona

Um painel completo com todos os KPIs do seu negócio — vendas, leads, atendimentos, tráfego e ROI — acessível do celular ou computador, atualizado em tempo real.

## Benefícios

- Visão completa do negócio em uma tela
- Alertas automáticos para metas e anomalias
- Comparativo por período e por loja
- Exportação de relatórios em PDF
- Acesso via app ou navegador
```

Criar `src/content/servicos/sites.md`:

```markdown
---
title: Sites de Alto Padrão
description: Sites rápidos, modernos e otimizados para converter visitantes em compradores reais.
badge: Web & Design
icon: 🌐
order: 6
---

## Como funciona

Desenvolvemos sites premium para lojas de móveis, com design exclusivo, carregamento ultra-rápido e otimização para aparecer nas primeiras posições do Google.

## Benefícios

- Design exclusivo e premium
- Carregamento em menos de 2 segundos
- SEO técnico avançado
- Integração com WhatsApp e Instagram
- Formulários de captação de leads
```

Criar `src/content/servicos/solucoes-comerciais.md`:

```markdown
---
title: Soluções Comerciais
description: Estratégia e consultoria comercial integrada para ampliar suas vendas no Nordeste.
badge: Estratégia
icon: 💼
order: 7
---

## Como funciona

Nossa equipe analisa o seu mercado local, a concorrência e o comportamento dos seus clientes para montar uma estratégia comercial personalizada — do primeiro contato ao fechamento da venda.

## Benefícios

- Diagnóstico completo do seu negócio
- Estratégia de vendas personalizada
- Treinamento da equipe comercial
- Scripts de atendimento e follow-up
- Acompanhamento semanal de resultados
```

Criar `src/content/servicos/visualizacao-3d.md`:

```markdown
---
title: Visualização 3D / Realidade Aumentada
description: Configurador 3D e realidade aumentada para móveis — nenhum concorrente no Nordeste oferece.
badge: 3D & RA
icon: 🏠
order: 8
---

## Como funciona

Seus clientes podem visualizar os móveis em 3D diretamente no site, configurar cores e tamanhos, e usar realidade aumentada para ver como o móvel ficaria na própria casa — tudo pelo celular.

## Benefícios

- Configurador 3D integrado ao seu catálogo
- Realidade aumentada via câmera do celular
- Redução de devoluções e trocas
- Aumento de 40% na taxa de conversão (benchmark de mercado)
- Diferencial competitivo único no Nordeste
```

- [ ] **Step 3: Criar cases de exemplo**

Criar `src/content/cases/moveis-alfa.md`:

```markdown
---
title: De 0 a +187% em leads qualificados
client: Móveis Alfa
city: São Paulo, SP
service: CRM + Tráfego com IA
metric: "+187%"
metricLabel: Aumento em leads qualificados no primeiro trimestre
featured: true
---

## O desafio

A Móveis Alfa tinha um alto volume de visitantes nas redes sociais mas baixíssima conversão em leads qualificados. O atendimento era 100% manual e não havia rastreamento de clientes.

## A solução

Implementamos o CRM Automatizado integrado a campanhas de tráfego com IA no Google e Meta. O agente de IA passou a qualificar leads 24/7 e direcionar os mais quentes para os vendedores.

## O resultado

Em 45 dias: +187% em leads qualificados, ROI de 3.8× em tráfego e redução de 68% no tempo de resposta ao cliente.
```

Criar `src/content/cases/casa-design.md`:

```markdown
---
title: 4.2× de retorno com integração omnichannel
client: Casa & Design
city: Belo Horizonte, MG
service: Omnichannel
metric: "4.2×"
metricLabel: Retorno sobre investimento
featured: false
---

## O desafio

A Casa & Design atendia clientes em 4 canais diferentes sem integração. Mensagens se perdiam e o histórico de cada cliente era inexistente.

## A solução

Unificamos WhatsApp, Instagram, e-mail e loja física em um painel único com o histórico completo de cada cliente.

## O resultado

4.2× de retorno sobre o investimento em 3 meses, com aumento de 35% na satisfação dos clientes.
```

Criar `src/content/cases/decor-prime.md`:

```markdown
---
title: -68% no tempo de atendimento com IA
client: Decor Prime
city: Rio de Janeiro, RJ
service: Agente de IA
metric: "−68%"
metricLabel: Redução no tempo de atendimento
featured: false
---

## O desafio

A Decor Prime recebia mais de 200 mensagens por dia no WhatsApp e não conseguia responder todos os clientes a tempo.

## A solução

Implementamos um agente de IA treinado com todo o catálogo da loja. O agente passou a responder, qualificar e agendar visitas automaticamente.

## O resultado

Redução de 68% no tempo médio de atendimento e aumento de 45% na taxa de agendamentos de visita.
```

- [ ] **Step 4: Criar artigo de blog de exemplo**

Criar `src/content/blog/como-aumentar-vendas-loja-moveis.md`:

```markdown
---
title: Como aumentar as vendas da sua loja de móveis com tecnologia
description: 5 estratégias digitais que lojas de móveis do Nordeste estão usando para crescer em 2026.
pubDate: 2026-04-01
author: Equipe Moveis.pro
---

O mercado de móveis no Nordeste está passando por uma transformação digital acelerada. Lojas que antes dependiam exclusivamente do tráfego de rua agora geram 30-50% das suas vendas pelo digital.

## 1. CRM com Inteligência Artificial

Diferente de planilhas ou sistemas genéricos, um CRM com IA aprende o comportamento dos seus clientes e sugere o melhor momento para abordá-los.

## 2. Tráfego Pago Otimizado

Anúncios no Google e Instagram funcionam muito melhor quando otimizados por IA — o sistema redistribui o orçamento automaticamente para os anúncios que mais convertem.

## 3. Atendimento Omnichannel

Clientes esperam ser atendidos no canal que preferirem — WhatsApp, Instagram ou e-mail — sem precisar repetir suas informações.

## 4. Visualização 3D

Lojas que oferecem visualização 3D dos móveis têm taxa de conversão até 40% maior. O cliente pode ver o móvel em 3D antes de comprar.

## 5. Métricas em Tempo Real

Sem dados, é impossível tomar boas decisões. Um dashboard com os KPIs do negócio atualizados em tempo real muda a forma de gerir a loja.
```

- [ ] **Step 5: Rodar build para verificar collections**

```bash
npm run build
```

Expected: sem erros de tipo nas collections.

- [ ] **Step 6: Commitar**

```bash
git add src/content/
git commit -m "feat: add content collections for services, cases, and blog"
```

---

## Task 8: Páginas de Serviços

**Files:**
- Create: `src/pages/servicos/index.astro`
- Create: `src/pages/servicos/[slug].astro`

- [ ] **Step 1: Criar página de listagem de serviços**

```astro
---
// src/pages/servicos/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import CTABox from '../../components/CTABox.astro';

const services = (await getCollection('servicos')).sort((a, b) => a.data.order - b.data.order);
---

<BaseLayout title="Serviços" description="Conheça todos os serviços da Moveis.pro para lojas de móveis.">
  <Nav />
  <main style="padding-top: 64px;">

    <section style="padding: 100px 56px 60px;">
      <div class="inline-flex items-center gap-2.5 mb-8" style="color: var(--gold);">
        <span class="block w-7 h-px" style="background: var(--gold);"></span>
        <span class="text-xs font-medium tracking-widest uppercase" style="letter-spacing: 2px;">Nossos serviços</span>
      </div>
      <h1 class="font-display font-black text-white mb-6" style="font-size: clamp(44px, 5.5vw, 72px); letter-spacing: -2.5px; line-height: 1.0;">
        Tecnologia completa<br />para sua loja.
      </h1>
      <p class="font-light max-w-lg" style="font-size: 16px; color: var(--dim); line-height: 1.7;">
        8 soluções integradas, desenvolvidas exclusivamente para o mercado moveleiro do Nordeste.
      </p>
    </section>

    <section style="padding: 0 56px 100px;">
      <div class="grid gap-4" style="grid-template-columns: repeat(2, 1fr);">
        {services.map((service) => (
          <a
            href={`/servicos/${service.slug}`}
            class="relative rounded-[18px] p-10 no-underline group transition-all duration-200"
            style="background: var(--dark-3); border: 1px solid var(--border);"
          >
            <div class="absolute top-0 left-0 right-0 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style="background: var(--brown);"></div>
            <div class="text-3xl mb-6">{service.data.icon}</div>
            <div class="text-xs font-semibold tracking-widest uppercase mb-3" style="color: var(--gold); letter-spacing: 1.5px;">{service.data.badge}</div>
            <h2 class="font-display font-black text-white mb-3" style="font-size: 22px; letter-spacing: -0.5px;">{service.data.title}</h2>
            <p class="text-sm font-light leading-relaxed" style="color: var(--muted);">{service.data.description}</p>
            <div class="mt-6 text-sm font-medium" style="color: var(--gold);">Saiba mais →</div>
          </a>
        ))}
      </div>
    </section>

    <div style="padding: 0 56px 100px;">
      <CTABox
        title={"Não sabe por onde\ncomeçar? Fale\nconosco."}
        subtitle="Nossa equipe faz um diagnóstico gratuito e indica qual solução faz mais sentido para o seu momento."
        buttonLabel="Agendar conversa gratuita →"
        buttonHref="/contato"
      />
    </div>

  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Criar página dinâmica de serviço individual**

```astro
---
// src/pages/servicos/[slug].astro
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import CTABox from '../../components/CTABox.astro';

export async function getStaticPaths() {
  const services = await getCollection('servicos');
  return services.map((service) => ({
    params: { slug: service.slug },
    props: { service },
  }));
}

const { service } = Astro.props;
const { Content } = await service.render();
---

<BaseLayout title={service.data.title} description={service.data.description}>
  <Nav />
  <main style="padding-top: 64px;">

    <section style="padding: 100px 56px 80px;">
      <a href="/servicos" class="inline-flex items-center gap-2 text-sm no-underline mb-12 transition-colors hover:text-white" style="color: var(--muted);">
        ← Todos os serviços
      </a>

      <div class="text-4xl mb-8">{service.data.icon}</div>
      <div class="text-xs font-semibold tracking-widest uppercase mb-4" style="color: var(--gold); letter-spacing: 1.5px;">{service.data.badge}</div>
      <h1 class="font-display font-black text-white mb-6" style="font-size: clamp(44px, 5.5vw, 68px); letter-spacing: -2.5px; line-height: 1.0; max-width: 700px;">
        {service.data.title}
      </h1>
      <p class="font-light max-w-lg" style="font-size: 18px; color: var(--dim); line-height: 1.7;">
        {service.data.description}
      </p>
    </section>

    <section style="padding: 0 56px 80px; max-width: 760px;">
      <div class="prose-custom">
        <Content />
      </div>
    </section>

    <div style="padding: 0 56px 100px;">
      <CTABox
        title={`Quer implementar\n${service.data.title}\nna sua loja?`}
        subtitle="Agende uma conversa gratuita e receba um diagnóstico personalizado para o seu negócio."
        buttonLabel="Falar com especialista →"
        buttonHref="/contato"
      />
    </div>

  </main>
  <Footer />
</BaseLayout>

<style is:global>
  .prose-custom h2 {
    font-family: 'Urbanist', sans-serif;
    font-weight: 800;
    font-size: 28px;
    letter-spacing: -0.8px;
    color: #fff;
    margin: 48px 0 16px;
  }
  .prose-custom p {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(255,255,255,0.58);
    margin-bottom: 16px;
  }
  .prose-custom ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .prose-custom li {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255,255,255,0.58);
    padding-left: 20px;
    position: relative;
  }
  .prose-custom li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #C8792A;
    font-weight: 700;
  }
</style>
```

- [ ] **Step 3: Criar teste E2E de serviços**

Criar `tests/servicos.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('services listing page loads', async ({ page }) => {
  await page.goto('/servicos');
  await expect(page.locator('h1')).toContainText('Tecnologia completa');
});

test('services listing has 8 cards', async ({ page }) => {
  await page.goto('/servicos');
  const cards = page.locator('a[href^="/servicos/"]');
  await expect(cards).toHaveCount(8);
});

test('individual service page loads', async ({ page }) => {
  await page.goto('/servicos/crm-automatizado');
  await expect(page.locator('h1')).toContainText('CRM Automatizado');
});

test('individual service has back link', async ({ page }) => {
  await page.goto('/servicos/visualizacao-3d');
  await expect(page.locator('a[href="/servicos"]')).toBeVisible();
});
```

- [ ] **Step 4: Rodar testes**

```bash
npx playwright test tests/servicos.spec.ts
```

Expected: todos PASS.

- [ ] **Step 5: Commitar**

```bash
git add src/pages/servicos/ tests/servicos.spec.ts
git commit -m "feat: add services listing and individual service pages"
```

---

## Task 9: Páginas Cases e Blog

**Files:**
- Create: `src/pages/cases/index.astro`
- Create: `src/pages/cases/[slug].astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`

- [ ] **Step 1: Criar página de listagem de cases**

```astro
---
// src/pages/cases/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import CaseCard from '../../components/CaseCard.astro';
import CTABox from '../../components/CTABox.astro';

const cases = await getCollection('cases');
const featured = cases.find((c) => c.data.featured);
const rest = cases.filter((c) => !c.data.featured);
---

<BaseLayout title="Cases de Sucesso" description="Resultados reais de lojas de móveis que transformaram seus negócios com a Moveis.pro.">
  <Nav />
  <main style="padding-top: 64px;">
    <section style="padding: 100px 56px;">
      <div class="inline-flex items-center gap-2.5 mb-8" style="color: var(--gold);">
        <span class="block w-7 h-px" style="background: var(--gold);"></span>
        <span class="text-xs font-medium tracking-widest uppercase" style="letter-spacing: 2px;">Resultados reais</span>
      </div>
      <h1 class="font-display font-black text-white mb-6" style="font-size: clamp(44px, 5.5vw, 72px); letter-spacing: -2.5px; line-height: 1.0;">
        Cases de sucesso.
      </h1>
      <p class="font-light max-w-lg mb-16" style="font-size: 16px; color: var(--dim); line-height: 1.7;">
        Lojas de móveis que transformaram seus resultados com tecnologia da Moveis.pro.
      </p>

      <div style="display: grid; grid-template-columns: 1.5fr 1fr; grid-template-rows: auto auto; gap: 14px;">
        {featured && (
          <a href={`/cases/${featured.slug}`} class="no-underline" style="grid-row: span 2;">
            <CaseCard
              tag={featured.data.service}
              title={`${featured.data.client} — ${featured.data.city}`}
              description=""
              metric={featured.data.metric}
              metricLabel={featured.data.metricLabel}
              featured={true}
            />
          </a>
        )}
        {rest.map((c) => (
          <a href={`/cases/${c.slug}`} class="no-underline">
            <CaseCard
              tag={c.data.service}
              title={`${c.data.client} — ${c.data.city}`}
              description=""
              metric={c.data.metric}
              metricLabel={c.data.metricLabel}
              featured={false}
            />
          </a>
        ))}
      </div>
    </section>

    <div style="padding: 0 56px 100px;">
      <CTABox
        title={"Quer ser o\npróximo case\nde sucesso?"}
        subtitle="Fale com um especialista e receba um diagnóstico gratuito do potencial digital do seu negócio."
        buttonLabel="Agendar conversa →"
        buttonHref="/contato"
      />
    </div>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Criar página individual de case**

```astro
---
// src/pages/cases/[slug].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import CTABox from '../../components/CTABox.astro';

export async function getStaticPaths() {
  const cases = await getCollection('cases');
  return cases.map((c) => ({ params: { slug: c.slug }, props: { case: c } }));
}

const { case: caseEntry } = Astro.props;
const { Content } = await caseEntry.render();
---

<BaseLayout title={caseEntry.data.title} description={`Case: ${caseEntry.data.client} — ${caseEntry.data.service}`}>
  <Nav />
  <main style="padding-top: 64px;">
    <section style="padding: 100px 56px 80px; max-width: 860px;">
      <a href="/cases" class="inline-flex items-center gap-2 text-sm no-underline mb-12 transition-colors hover:text-white" style="color: var(--muted);">
        ← Todos os cases
      </a>
      <div class="text-xs font-semibold tracking-widest uppercase mb-4" style="color: var(--gold); letter-spacing: 1.5px;">{caseEntry.data.service}</div>
      <h1 class="font-display font-black text-white mb-4" style="font-size: clamp(36px, 5vw, 60px); letter-spacing: -2px; line-height: 1.0;">
        {caseEntry.data.title}
      </h1>
      <p class="font-light mb-12" style="font-size: 15px; color: var(--muted);">
        {caseEntry.data.client} — {caseEntry.data.city}
      </p>

      <div class="mb-16 p-10 rounded-2xl" style="background: var(--dark-3); border: 1px solid var(--border);">
        <div class="font-display font-black" style="font-size: 64px; letter-spacing: -3px; color: var(--gold); line-height: 1;">{caseEntry.data.metric}</div>
        <p class="text-sm font-light mt-2" style="color: var(--muted);">{caseEntry.data.metricLabel}</p>
      </div>

      <div class="prose-custom"><Content /></div>
    </section>

    <div style="padding: 0 56px 100px;">
      <CTABox
        title={"Quer resultados\nassim na sua\nloja?"}
        subtitle="Agende uma conversa e descubra como podemos transformar o seu negócio."
        buttonLabel="Falar com especialista →"
        buttonHref="/contato"
      />
    </div>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Criar listagem e página individual de blog**

Criar `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<BaseLayout title="Blog" description="Conteúdo educativo para donos de lojas de móveis.">
  <Nav />
  <main style="padding-top: 64px;">
    <section style="padding: 100px 56px;">
      <div class="inline-flex items-center gap-2.5 mb-8" style="color: var(--gold);">
        <span class="block w-7 h-px" style="background: var(--gold);"></span>
        <span class="text-xs font-medium tracking-widest uppercase" style="letter-spacing: 2px;">Blog</span>
      </div>
      <h1 class="font-display font-black text-white mb-16" style="font-size: clamp(44px, 5.5vw, 72px); letter-spacing: -2.5px; line-height: 1.0;">
        Conteúdo para<br />donos de loja.
      </h1>

      <div class="flex flex-col gap-4">
        {posts.map((post) => (
          <a
            href={`/blog/${post.slug}`}
            class="flex justify-between items-center py-8 no-underline group transition-colors"
            style="border-bottom: 1px solid var(--border);"
          >
            <div>
              <p class="text-xs font-medium uppercase tracking-widest mb-3" style="color: var(--brown); letter-spacing: 1.5px;">
                {post.data.pubDate.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <h2 class="font-display font-black text-white group-hover:opacity-80 transition-opacity" style="font-size: 22px; letter-spacing: -0.5px;">
                {post.data.title}
              </h2>
              <p class="text-sm font-light mt-2" style="color: var(--muted);">{post.data.description}</p>
            </div>
            <span class="text-xl ml-8 transition-transform group-hover:translate-x-2" style="color: var(--gold);">→</span>
          </a>
        ))}
      </div>
    </section>
  </main>
  <Footer />
</BaseLayout>
```

Criar `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import CTABox from '../../components/CTABox.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <Nav />
  <main style="padding-top: 64px;">
    <article style="padding: 100px 56px 80px; max-width: 760px;">
      <a href="/blog" class="inline-flex items-center gap-2 text-sm no-underline mb-12 transition-colors hover:text-white" style="color: var(--muted);">
        ← Blog
      </a>
      <p class="text-xs font-medium uppercase tracking-widest mb-4" style="color: var(--brown); letter-spacing: 1.5px;">
        {post.data.pubDate.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <h1 class="font-display font-black text-white mb-4" style="font-size: clamp(36px, 5vw, 56px); letter-spacing: -2px; line-height: 1.05;">
        {post.data.title}
      </h1>
      <p class="font-light mb-16" style="font-size: 15px; color: var(--muted);">Por {post.data.author}</p>
      <div class="prose-custom"><Content /></div>
    </article>

    <div style="padding: 0 56px 100px;">
      <CTABox
        title={"Quer aplicar isso\nna sua loja\nagora?"}
        subtitle="Agende uma conversa gratuita com nossa equipe."
        buttonLabel="Falar com especialista →"
        buttonHref="/contato"
      />
    </div>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 4: Rodar build completo**

```bash
npm run build
```

Expected: sem erros. Todas as páginas geradas em `dist/`.

- [ ] **Step 5: Commitar**

```bash
git add src/pages/cases/ src/pages/blog/
git commit -m "feat: add cases and blog pages"
```

---

## Task 10: Página Sobre

**Files:**
- Create: `src/pages/sobre.astro`

- [ ] **Step 1: Criar sobre.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import NumbersBar from '../components/NumbersBar.astro';
import CTABox from '../components/CTABox.astro';

const diferenciais = [
  { icon: '🎯', title: 'Especialistas em móveis', desc: 'Somos a única agência 100% focada no setor moveleiro. Entendemos seu cliente, seu ciclo de vendas e o que realmente converte.' },
  { icon: '🤖', title: 'Tecnologia proprietária', desc: 'Desenvolvemos nossas próprias ferramentas de IA, CRM e 3D — não revendemos software genérico.' },
  { icon: '📍', title: 'Foco no Nordeste', desc: 'Atuamos em Campina Grande, Caruaru, João Pessoa e Recife com conhecimento profundo do mercado local.' },
  { icon: '📊', title: 'ROI garantido', desc: 'Trabalhamos com métricas claras e acompanhamento semanal. Você sabe exatamente o retorno do investimento.' },
];

const numbers = [
  { value: '+200', label: 'Lojas atendidas no Brasil' },
  { value: '3.8×', label: 'ROI médio em tráfego' },
  { value: '98%', label: 'Satisfação dos clientes' },
  { value: '4', label: 'Cidades no Nordeste' },
];
---

<BaseLayout title="Sobre" description="Conheça a Moveis.pro — especialistas em tecnologia para o mercado moveleiro do Nordeste.">
  <Nav />
  <main style="padding-top: 64px;">

    <section style="padding: 100px 56px 80px;">
      <div class="inline-flex items-center gap-2.5 mb-8" style="color: var(--gold);">
        <span class="block w-7 h-px" style="background: var(--gold);"></span>
        <span class="text-xs font-medium tracking-widest uppercase" style="letter-spacing: 2px;">Sobre nós</span>
      </div>
      <h1 class="font-display font-black text-white mb-8" style="font-size: clamp(44px, 5.5vw, 72px); letter-spacing: -2.5px; line-height: 1.0; max-width: 700px;">
        A única solução 360°<br />para móveis no<br /><em class="not-italic" style="color: var(--gold);">Nordeste.</em>
      </h1>
      <p class="font-light max-w-xl" style="font-size: 17px; color: var(--dim); line-height: 1.75;">
        A Moveis.pro nasceu de uma constatação simples: o mercado moveleiro do Nordeste tem potencial enorme, mas carece de tecnologia especializada. Agências genéricas não entendem o ciclo de venda de móveis. Nós entendemos.
      </p>
    </section>

    <div style="padding: 0 56px 80px;">
      <NumbersBar items={numbers} />
    </div>

    <section style="padding: 0 56px 100px;">
      <div class="grid gap-4" style="grid-template-columns: repeat(2, 1fr);">
        {diferenciais.map((d) => (
          <div class="rounded-[18px] p-10" style="background: var(--dark-3); border: 1px solid var(--border);">
            <div class="text-3xl mb-6">{d.icon}</div>
            <h3 class="font-display font-black text-white mb-3" style="font-size: 20px; letter-spacing: -0.5px;">{d.title}</h3>
            <p class="text-sm font-light leading-relaxed" style="color: var(--muted);">{d.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <div style="padding: 0 56px 100px;">
      <CTABox
        title={"Quer conhecer\nmelhor o nosso\ntrabalho?"}
        subtitle="Agende uma conversa e veja como transformamos lojas de móveis no Nordeste."
        buttonLabel="Falar com especialista →"
        buttonHref="/contato"
      />
    </div>

  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Commitar**

```bash
git add src/pages/sobre.astro
git commit -m "feat: add about page"
```

---

## Task 11: Página de Contato

**Files:**
- Create: `src/pages/contato.astro`

- [ ] **Step 1: Criar contato.astro com Netlify Forms**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout
  title="Contato"
  description="Agende uma conversa gratuita com um especialista da Moveis.pro."
>
  <Nav />
  <main style="padding-top: 64px;">
    <section style="padding: 100px 56px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;">

      <div>
        <div class="inline-flex items-center gap-2.5 mb-8" style="color: var(--gold);">
          <span class="block w-7 h-px" style="background: var(--gold);"></span>
          <span class="text-xs font-medium tracking-widest uppercase" style="letter-spacing: 2px;">Contato</span>
        </div>
        <h1 class="font-display font-black text-white mb-6" style="font-size: clamp(40px, 5vw, 64px); letter-spacing: -2.5px; line-height: 1.0;">
          Vamos transformar<br />sua loja<br /><em class="not-italic" style="color: var(--gold);">juntos.</em>
        </h1>
        <p class="font-light mb-12" style="font-size: 16px; color: var(--dim); line-height: 1.7;">
          Agende uma conversa gratuita de 30 minutos. Nossa equipe faz um diagnóstico completo do seu negócio e apresenta as soluções mais adequadas para o seu momento.
        </p>

        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style="background: rgba(139,69,19,0.15); border: 1px solid rgba(139,69,19,0.3);">📍</div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest mb-1" style="color: var(--brown); letter-spacing: 1.5px;">Atuação</p>
              <p class="text-sm font-light" style="color: var(--muted);">Campina Grande · Caruaru · João Pessoa · Recife</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style="background: rgba(139,69,19,0.15); border: 1px solid rgba(139,69,19,0.3);">⚡</div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest mb-1" style="color: var(--brown); letter-spacing: 1.5px;">Resposta</p>
              <p class="text-sm font-light" style="color: var(--muted);">Retornamos em até 24 horas úteis</p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl p-10" style="background: var(--dark-3); border: 1px solid var(--border);">
        <form
          name="contato"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          class="flex flex-col gap-5"
        >
          <input type="hidden" name="form-name" value="contato" />
          <p class="hidden"><label>Não preencha: <input name="bot-field" /></label></p>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--muted); letter-spacing: 1.5px;">Nome completo *</label>
            <input
              type="text"
              name="nome"
              required
              class="w-full text-sm font-light text-white rounded-lg px-4 py-3 outline-none transition-all"
              style="background: rgba(255,255,255,0.04); border: 1px solid var(--border); focus:border-[var(--brown)];"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--muted); letter-spacing: 1.5px;">Nome da loja *</label>
            <input
              type="text"
              name="loja"
              required
              class="w-full text-sm font-light text-white rounded-lg px-4 py-3 outline-none"
              style="background: rgba(255,255,255,0.04); border: 1px solid var(--border);"
              placeholder="Ex: Móveis Silva"
            />
          </div>

          <div class="grid gap-4" style="grid-template-columns: 1fr 1fr;">
            <div>
              <label class="block text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--muted); letter-spacing: 1.5px;">Cidade *</label>
              <input
                type="text"
                name="cidade"
                required
                class="w-full text-sm font-light text-white rounded-lg px-4 py-3 outline-none"
                style="background: rgba(255,255,255,0.04); border: 1px solid var(--border);"
                placeholder="Sua cidade"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--muted); letter-spacing: 1.5px;">WhatsApp *</label>
              <input
                type="tel"
                name="whatsapp"
                required
                class="w-full text-sm font-light text-white rounded-lg px-4 py-3 outline-none"
                style="background: rgba(255,255,255,0.04); border: 1px solid var(--border);"
                placeholder="(81) 99999-9999"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--muted); letter-spacing: 1.5px;">Principal desafio *</label>
            <select
              name="desafio"
              required
              class="w-full text-sm font-light text-white rounded-lg px-4 py-3 outline-none appearance-none"
              style="background: rgba(255,255,255,0.04); border: 1px solid var(--border);"
            >
              <option value="" disabled selected style="background: #131313;">Selecione...</option>
              <option value="leads" style="background: #131313;">Gerar mais leads</option>
              <option value="crm" style="background: #131313;">Organizar meus clientes</option>
              <option value="atendimento" style="background: #131313;">Automatizar atendimento</option>
              <option value="online" style="background: #131313;">Aumentar vendas online</option>
              <option value="3d" style="background: #131313;">Implementar visualização 3D</option>
              <option value="outro" style="background: #131313;">Outro</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--muted); letter-spacing: 1.5px;">Mensagem (opcional)</label>
            <textarea
              name="mensagem"
              rows="3"
              class="w-full text-sm font-light text-white rounded-lg px-4 py-3 outline-none resize-none"
              style="background: rgba(255,255,255,0.04); border: 1px solid var(--border);"
              placeholder="Conte mais sobre sua loja..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full text-sm font-semibold text-white rounded-[10px] py-4 transition-opacity hover:opacity-90 mt-2"
            style="background: var(--brown);"
          >
            Agendar conversa gratuita →
          </button>
        </form>
      </div>

    </section>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Criar teste E2E de contato**

Criar `tests/contato.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('contact page loads', async ({ page }) => {
  await page.goto('/contato');
  await expect(page.locator('h1')).toContainText('Vamos transformar');
});

test('contact form has all required fields', async ({ page }) => {
  await page.goto('/contato');
  await expect(page.locator('input[name="nome"]')).toBeVisible();
  await expect(page.locator('input[name="loja"]')).toBeVisible();
  await expect(page.locator('input[name="cidade"]')).toBeVisible();
  await expect(page.locator('input[name="whatsapp"]')).toBeVisible();
  await expect(page.locator('select[name="desafio"]')).toBeVisible();
});

test('contact form submit button is present', async ({ page }) => {
  await page.goto('/contato');
  await expect(page.locator('button[type="submit"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toContainText('Agendar');
});
```

- [ ] **Step 3: Rodar testes**

```bash
npx playwright test tests/contato.spec.ts
```

Expected: todos PASS.

- [ ] **Step 4: Commitar**

```bash
git add src/pages/contato.astro tests/contato.spec.ts
git commit -m "feat: add contact page with Netlify Forms"
```

---

## Task 12: SEO, robots.txt e Sitemap

**Files:**
- Create: `public/robots.txt`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Criar robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://moveis.pro/sitemap-index.xml
```

- [ ] **Step 2: Verificar sitemap está configurado**

Confirmar que `astro.config.mjs` tem `sitemap()` no array `integrations` (já feito no Task 1). Verificar após build que `dist/sitemap-index.xml` é gerado:

```bash
npm run build && ls dist/sitemap*.xml
```

Expected: `dist/sitemap-index.xml` e `dist/sitemap-0.xml` existem.

- [ ] **Step 3: Criar teste de navegação**

Criar `tests/navigation.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', title: /Moveis\.pro/ },
  { path: '/servicos', title: /Serviços/ },
  { path: '/sobre', title: /Sobre/ },
  { path: '/cases', title: /Cases/ },
  { path: '/blog', title: /Blog/ },
  { path: '/contato', title: /Contato/ },
];

for (const { path, title } of pages) {
  test(`${path} loads with correct title`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
  });
}

test('nav CTA links to /contato', async ({ page }) => {
  await page.goto('/');
  await page.click('nav a[href="/contato"]');
  await expect(page).toHaveURL('/contato');
});
```

- [ ] **Step 4: Rodar todos os testes**

```bash
npx playwright test
```

Expected: todos PASS.

- [ ] **Step 5: Commitar**

```bash
git add public/robots.txt tests/navigation.spec.ts
git commit -m "feat: add robots.txt, sitemap and full navigation tests"
```

---

## Task 13: Build Final e Verificação

- [ ] **Step 1: Build de produção**

```bash
npm run build
```

Expected: sem erros, `dist/` completo.

- [ ] **Step 2: Preview da build**

```bash
npm run preview
```

Abrir `http://localhost:4321` e verificar todas as páginas:
- `/` — Home completa
- `/servicos` — 8 cards de serviços
- `/servicos/visualizacao-3d` — página individual
- `/cases` — grid de cases
- `/blog` — listagem de posts
- `/sobre` — página sobre
- `/contato` — formulário

- [ ] **Step 3: Rodar suite completa de testes contra preview**

```bash
npx playwright test --reporter=list
```

Expected: todos PASS.

- [ ] **Step 4: Verificar type checking**

```bash
npx astro check
```

Expected: sem erros de TypeScript.

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "feat: complete Moveis.pro website — all pages, tests passing, build clean"
```

---

## Self-Review — Spec Coverage Check

| Requisito do Spec | Task que implementa |
|---|---|
| Astro + Tailwind + TypeScript | Task 1 |
| Fontes Urbanist + DM Sans | Task 3 (BaseLayout) |
| Paleta dark premium (tokens CSS) | Task 2 |
| Nav fixa com blur | Task 4 |
| Footer | Task 4 |
| Home: Hero 2 colunas + HeroCard | Task 6 |
| Home: Marquee 8 serviços | Task 6 |
| Home: Lista editorial de serviços | Task 6 |
| Home: NumbersBar | Task 6 |
| Home: Cases assimétrico | Task 6 |
| Home: CTABox | Task 6 |
| /servicos — listagem | Task 8 |
| /servicos/[slug] — individual | Task 8 |
| 8 serviços (incl. 3D/RA) | Task 7 + 8 |
| /sobre | Task 10 |
| /cases + /cases/[slug] | Task 9 |
| /blog + /blog/[slug] | Task 9 |
| /contato — formulário Netlify | Task 11 |
| SEO: title, description, og | Task 3 |
| Sitemap | Task 1 + 12 |
| robots.txt | Task 12 |
| Sem página de preços | ✓ não criada |
| Sem auth, sem banco de dados | ✓ site 100% estático |
| Foco geográfico Nordeste | Task 10, 11 (copy) |
| Visualização 3D como diferencial | Task 7 (content) + Task 8 |
| E2E tests | Tasks 3, 6, 8, 11, 12 |
