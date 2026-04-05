
# Moveis.pro — Design Spec

**Data:** 2026-04-03
**Status:** Aprovado

---

## 1. Visão Geral

Site institucional de venda de serviços tech para o nicho moveleiro. Público-alvo: **donos de lojas de móveis no varejo** — foco inicial no **Nordeste** (Campina Grande, Caruaru, João Pessoa e Recife). Objetivo principal: captação de leads e conversão via agendamento de conversa gratuita com especialista.

**Diferencial competitivo real:** única solução 360° especializada em móveis com Visualização 3D/RA, CRM com IA e análise profunda de dados — nenhum concorrente local oferece esse conjunto integrado.

**Sem preços públicos:** o site não exibe tabela de preços. A qualificação e apresentação de pacotes ocorre na conversa com especialista.

---

## 2. Stack Técnico

| Item | Decisão |
|---|---|
| Framework | **Astro** (SSG — geração estática, SEO nativo) |
| CSS | **Tailwind CSS** |
| Linguagem | TypeScript |
| Deploy | Vercel ou Netlify |
| Formulários | Netlify Forms ou Formspree |

**Motivo do Astro:** site de marketing com blog requer SEO forte. Astro gera HTML estático por padrão, carrega sem JavaScript e é indexado com facilidade pelo Google.

---

## 3. Identidade Visual

### Marca
- **Nome:** Moveis.pro
- **Logo:** ícone geométrico marrom (formato de móvel/estante), fornecido pelo cliente
- **Tom:** tech premium, direto ao ponto, especialista no nicho

### Paleta de Cores
| Token | Valor | Uso |
|---|---|---|
| `--brown` | `#8B4513` | Cor principal, CTAs, bordas de destaque |
| `--gold` | `#C8792A` | Destaques, números, links |
| `--gold-light` | `#e8a855` | Gradientes, hover states |
| `--dark` | `#070707` | Background principal |
| `--dark-2` | `#0d0d0d` | Background secundário |
| `--dark-3` | `#131313` | Cards e painéis |
| `--border` | `rgba(255,255,255,0.06)` | Bordas sutis |
| `--muted` | `rgba(255,255,255,0.35)` | Texto secundário |
| `--dim` | `rgba(255,255,255,0.58)` | Texto de suporte |

### Tipografia
| Fonte | Papel | Peso | Fonte |
|---|---|---|---|
| **Urbanist** | Títulos / Display | 800–900 | Google Fonts |
| **DM Sans** | Corpo / UI | 300–600 | Google Fonts |

**Regras tipográficas:**
- Títulos: `letter-spacing: -2px a -3px`, `line-height: 0.95–1.05`
- Corpo: `font-weight: 300`, `line-height: 1.65–1.7`
- Eyebrows (labels acima de títulos): DM Sans 11px, `letter-spacing: 2px`, `text-transform: uppercase`, cor `--gold`
- Números de destaque: Urbanist 900, `letter-spacing: -2.5px`

### Estilo Visual
- **Modo:** Dark premium (fundo quase preto)
- **Ambient glows:** radial gradients marrom/dourado em posições estratégicas (hero, CTA)
- **Bordas:** sutis `rgba(255,255,255,0.06)`, border-radius 18–24px em cards grandes, 8–10px em botões
- **Linha de destaque:** `linear-gradient` marrom-dourado horizontal em `::before` de cards e seções
- **Texto outline:** palavra-chave do hero em `-webkit-text-stroke` dourado (efeito diferenciador)

---

## 4. Estrutura de Páginas

### 4.1 Home (/)
Seções em ordem:

1. **Nav fixo** — logo, links, CTA "Falar com especialista"
2. **Hero** — grid 2 colunas: headline + card de métricas flutuante
3. **Marquee animado** — faixa com os 8 serviços em loop
4. **Serviços** — lista editorial numerada (não cards genéricos)
5. **Numbers** — 4 métricas de impacto em painel escuro
6. **Cases** — grid assimétrico (1 featured + 2 menores)
7. **CTA Final** — 2 colunas: headline + botão de agendamento
8. **Footer** — logo + copyright

### 4.2 Serviços (/servicos/[slug])
Página individual por serviço. 8 serviços:
1. CRM Automatizado
2. Tráfego com IA
3. Omnichannel
4. Agente de IA / Chatbot
5. Métricas em Tempo Real
6. Sites de Alto Padrão
7. Soluções Comerciais
8. **Visualização 3D / Realidade Aumentada** ← diferencial principal, nenhum concorrente no Nordeste oferece

Cada página: hero do serviço, como funciona, benefícios, cases relacionados, CTA.

### 4.3 Sobre (/sobre)
História, equipe, diferenciais, valores. Tom: especialistas no nicho, não agência genérica.

### 4.4 Cases (/cases)
Grid de cases com filtro por serviço. Cada case tem: cliente, serviço, desafio, solução, resultado numérico.

### 4.5 Blog (/blog)
Conteúdo educativo para donos de loja de móveis. Posts em Markdown/MDX via Astro Content Collections.

### 4.6 Contato (/contato)
Formulário de agendamento de conversa gratuita. Campos: nome, loja, cidade, WhatsApp, principal desafio (select), mensagem.

---

## 5. Componentes Reutilizáveis

| Componente | Descrição |
|---|---|
| `<Nav />` | Navegação fixa com blur, logo, links, CTA |
| `<Footer />` | Footer simples com logo e copyright |
| `<SectionHeader />` | Index + título + subtexto + link (padrão editorial) |
| `<ServiceRow />` | Linha de serviço na lista numerada |
| `<CaseCard />` | Card de case com badge, título, descrição e métrica |
| `<NumbersBar />` | Faixa de 4 métricas numéricas |
| `<Marquee />` | Faixa de texto em loop infinito |
| `<HeroCard />` | Card de métricas flutuante no hero |
| `<CTABox />` | Bloco de CTA final em 2 colunas |
| `<BlogCard />` | Card de artigo do blog |

---

## 6. Navegação e Roteamento

```
/                   → Home
/servicos           → Lista de serviços
/servicos/crm       → CRM Automatizado
/servicos/trafego   → Tráfego com IA
/servicos/omnichannel
/servicos/agente-ia
/servicos/metricas
/servicos/sites
/servicos/solucoes-comerciais
/sobre              → Sobre a empresa
/cases              → Todos os cases
/cases/[slug]       → Case individual
/blog               → Lista de artigos
/blog/[slug]        → Artigo individual
/contato            → Formulário de contato
```

---

## 7. SEO e Performance

- Astro gera HTML estático — zero JS por padrão nas páginas
- Cada página tem `<title>`, `<meta description>` e Open Graph únicos
- Blog usa Astro Content Collections com frontmatter para SEO
- Imagens via `<Image />` do Astro (otimização automática: WebP, lazy load)
- Font loading: `display=swap` + preconnect para Google Fonts
- Sitemap gerado via `@astrojs/sitemap`
- robots.txt incluído

---

## 8. Formulário de Contato

**Campos:**
- Nome completo (obrigatório)
- Nome da loja (obrigatório)
- Cidade / Estado (obrigatório)
- WhatsApp (obrigatório)
- Principal desafio: select com opções (Gerar mais leads / Organizar clientes / Automatizar atendimento / Aumentar vendas online / Outro)
- Mensagem (opcional)

**Envio:** Netlify Forms (sem backend próprio) ou Formspree como alternativa.

---

## 9. Decisões de Arquitetura

- **Sem banco de dados:** site estático puro. Blog e cases em arquivos `.md`/`.mdx` na pasta `content/`
- **Sem autenticação:** site público, sem área logada
- **Sem e-commerce:** site de captação, não de venda direta
- **Componentes Astro nativos** para tudo estático; React apenas se necessário para interatividade futura
- **Tailwind via plugin Astro** — sem CSS-in-JS

---

## 10. Referências Visuais

- Mockup final aprovado: `.superpowers/brainstorm/.../content/home-v4-final.html`
- Referência de mercado: sierra.com.br (estrutura editorial, premium dark)
- Fonte Urbanist: fonts.google.com/specimen/Urbanist
- Fonte DM Sans: fonts.google.com/specimen/DM+Sans
