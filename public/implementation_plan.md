# 🔬 Auditoria Completa UX/UI — moveis.pro

## Visão Geral do Estado Atual

O site tem uma **base sólida**. Dark theme premium, copywriting afiado, identidade visual coerente. Mas existem oportunidades claras pra elevar de "bom site de agência" → **referência de mercado**. Organizei em **5 categorias** com prioridade real.

---

## 📸 Evidências Visuais

````carousel
![Homepage Hero — a base está boa, mas faltam refinamentos](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_home_hero_1777206831818.png)
<!-- slide -->
![Homepage Mid — Seção "Quatro coisas que mudam o jogo"](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_home_mid_1777206847397.png)
<!-- slide -->
![Homepage Footer — CTA final + rodapé](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_home_bottom_1777206886790.png)
<!-- slide -->
![Serviços — Hero da página index](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_servicos_top_1777206939737.png)
<!-- slide -->
![Serviços — Grid de cards](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_servicos_grid_1777206952878.png)
<!-- slide -->
![Sobre — Hero com sofá 3D](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_sobre_top_1777207009791.png)
<!-- slide -->
![Contato — Hero com imagem de showroom](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_contato_top_1777207051865.png)
<!-- slide -->
![Contato — Formulário](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_contato_form_1777207061447.png)
<!-- slide -->
![Blog — Hero](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_blog_top_1777207081564.png)
<!-- slide -->
![Cases — Hero com carrossel](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_cases_top_1777207130223.png)
<!-- slide -->
![Mobile — Home](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_mobile_home_1777207174029.png)
<!-- slide -->
![Mobile — Serviços](C:\Users\Neto\.gemini\antigravity\brain\cd2ea0b1-dcdc-4fd5-9c3a-56c48f9fe5c0\audit_mobile_servicos_1777207185132.png)
````

---

## 1️⃣ CRÍTICO — Impacto imediato na conversão

### 1.1 Falta seção de **Prova Social / Trust Bar**
> [!CAUTION]
> O site não tem logos de clientes, depoimentos com foto, nem selos de autoridade. Para o público-alvo (donos de lojas de móveis de médio-alto ticket), isso é **decisivo**. Eles precisam ver que "gente parecida comigo já confiou".

**Proposta:**
- Adicionar uma barra horizontal de logos de clientes logo após o hero da homepage
- Adicionar seção de depoimentos com foto + nome + cargo + resultado numérico
- Integrar números reais nos cases (fotos de fachada, prints de dashboard)

### 1.2 **Formulário de contato sem campo "Nome"**
O formulário pede Cidade, WhatsApp, Ticket Médio, Onde está travando — mas **pula o nome da pessoa/empresa**. Isso é estranho e diminui a personalização do primeiro contato.

**Proposta:** Adicionar campo "Seu nome" e "Nome da loja" no topo do formulário.

### 1.3 **Hierarquia do header: dois botões de mesmo peso visual**
"Ver Resultados" e "Diagnóstico Gratuito" competem pela atenção no header. O visitante não sabe onde clicar primeiro.

**Proposta:**
- "Ver Resultados" → transformar em link texto simples (sem borda/pill)
- "Diagnóstico Gratuito" → manter como único botão primário com destaque

---

## 2️⃣ ALTO — Profissionalismo e modernidade

### 2.1 **Ausência de animações de entrada (scroll reveal)**
O site tem `[data-animate]` configurado no CSS, mas a maioria dos elementos aparecem estáticos na primeira carga. As animações de reveal via scroll são essenciais para um feel moderno. 

**Proposta:**
- Verificar que o `IntersectionObserver` está ativo em todas as páginas (não apenas na home)
- Adicionar animações em **stagger** nos cards (cascade effect)
- Adicionar parallax sutil nas imagens hero

### 2.2 **Cards de serviço na listagem são planos demais**
Na `/servicos/`, os cards são apenas caixas escuras com ícone + texto. Comparando com referências premium (Apple, Stripe, Linear), falta:
- **Hover reveal** — mostrar preview/thumbnail da imagem hero ao passar o mouse
- **Ícone animado** ao hover
- **Borda luminosa** (glow effect) no hover em vez de border estática

**Proposta:**
- Implementar card com thumbnail da hero image que aparece em fade ao hover
- Adicionar micro-glow na borda ao hover (box-shadow com cor terra)
- Transição suave de 0.3s para tudo

### 2.3 **Footer minimalista demais**
O footer tem apenas: logo, tagline, ícones sociais e 4 links. Para um site premium, falta:
- Coluna com serviços listados
- Horário de atendimento
- Certificados/badges
- Newsletter ou link para diagnóstico com campo inline

**Proposta:** Expandir footer para 3–4 colunas com mais conteúdo e links internos.

### 2.4 **Tipografia dos KPIs no hero poderia ser mais impactante**
Os números "14 dias / 45 dias / 30 leads" estão pequenos (20px). Para um hero de 92vh, eles deveriam ser maiores e com animação de **counter-up** (os números subindo de 0 até o valor final).

**Proposta:** 
- Aumentar tamanho dos KPIs para 28–32px
- Adicionar animação counter-up com `requestAnimationFrame`

---

## 3️⃣ MÉDIO — Visual polish e UX refinement

### 3.1 **Transições entre páginas**
Hoje a navegação é "corte seco" — clicou, tela branca, nova página. Sites premium usam fade-out/fade-in com `View Transition API` do Astro.

**Proposta:** Ativar `view transitions` no Astro (`transition:animate` nativo).

### 3.2 **Cursor customizado (opcional, mas diferenciador)**
Referências como Studio Freight, Linear e Lusion usam cursores personalizados que reforçam a marca premium.

**Proposta:** Cursor customizado dourado/terra que muda de shape ao hover em links e botões.

### 3.3 **Gradient noise/grain missing**
O background do site usa gradientes radiais mas não tem grain/noise texture. Isso faz o gradiente parecer "digital demais". Sites premium adicionam um overlay de noise muito sutil (1–2% opacity).

**Proposta:** Adicionar overlay de SVG noise no body com `opacity: 0.015`.

### 3.4 **Seção FAQ poderia ser accordion**
O FAQ está em grid 2×3 com todas as respostas visíveis. Um accordion (expandir/colapsar) é mais moderno, economiza espaço e adiciona interatividade.

**Proposta:** Converter para accordion com animação suave de altura.

### 3.5 **Blog listing sem thumbnails**
Os posts do blog provavelmente aparecem como cards de texto puro. Adicionar thumbnails ou ícones ilustrativos eleva o visual.

### 3.6 **Marquee (faixa rolante) poderia ter melhor contraste**
O marquee aparece entre hero e seção "Pilares" e está um pouco opaco. Para sites premium, o marquee deveria ter destaque maior.

---

## 4️⃣ MOBILE-SPECIFIC

### 4.1 **Hero mobile está bom, mas CTAs competem com floating actions**
O botão "Diagnóstico Gratuito" flutuante no canto inferior direito fica próximo dos CTAs do conteúdo ao scrollar. Ao chegar no hero, duplica as chamadas para ação.

**Proposta:** Esconder o floating CTA nos primeiros 100vh (só mostrar após scroll).

### 4.2 **Texto do hero mobile pode ficar colado na borda**
O padding lateral de 20px funciona, mas em telas de 375px (iPhone SE) o texto fica um pouco apertado.

**Proposta:** Garantir padding mínimo de 24px em mobile.

### 4.3 **Na página de Serviços mobile, a imagem de fundo do hero fica escondida**
A seção `/servicos/` em mobile perde a imagem de fundo por conta do gradiente muito escuro. Ajustar a intensidade do overlay.

---

## 5️⃣ PERFORMANCE & SEO

### 5.1 **Imagens em PNG pesadas (6–10MB cada)**
Todas as imagens hero estão em PNG bruto. O Astro tem `<Image>` component para otimização automática.

**Proposta:**
- Converter imagens para WebP via Astro `<Image>` ou build-time optimization
- Usar `loading="lazy"` em tudo exceto hero
- Adicionar `width` e `height` explícitos para evitar CLS

### 5.2 **Fontes auto-hospedadas sem `preload`**
As fontes Gamgote/Satoshi estão em `/fonts/` sem preload hint.

**Proposta:** Adicionar `<link rel="preload" as="font">` no `<head>`.

### 5.3 **Acessibilidade: contraste dos textos muted**
`--text-muted: rgba(247,240,232,0.66)` sobre fundo `#100c09` pode não atingir ratio WCAG AA (4.5:1) em textos menores.

**Proposta:** Verificar e ajustar opacidade para garantir ratio ≥ 4.5:1.

---

## 🗺️ Roadmap de Prioridade

| Bloco | O que | Impacto | Esforço |
|-------|-------|---------|---------|
| Sprint 1 | Trust Bar + Depoimentos + Fix header CTAs | 🔴 Alto | Médio |
| Sprint 1 | Noise texture + Scroll reveal fix + KPI counter-up | 🟠 Alto | Baixo |
| Sprint 2 | Cards de serviço com hover reveal + glow | 🟠 Alto | Médio |
| Sprint 2 | FAQ accordion + View Transitions | 🟡 Médio | Médio |
| Sprint 2 | Footer expandido | 🟡 Médio | Baixo |
| Sprint 3 | Otimização de imagens (WebP) + Font preload | 🟡 Médio | Baixo |
| Sprint 3 | Cursor custom + Parallax hero | 🟢 Nice-to-have | Médio |
| Sprint 3 | Mobile floating CTA visibility fix | 🟢 Nice-to-have | Baixo |

---

## Decisão Necessária

> [!IMPORTANT]
> Posso começar a implementar esses itens agora. Me diga:
> 1. **Quer que eu comece pelo Sprint 1?** (Trust Bar, header fix, noise texture, scroll animations, KPI counter-up)
> 2. **Tem logos de clientes reais** para usar na Trust Bar? Se não, posso criar placeholders genéricos estilizados.
> 3. **Tem depoimentos reais** para incluir? Se não, posso criar a estrutura visual com texto placeholder.
> 4. **Quer implementar tudo de uma vez ou sprint por sprint?**
