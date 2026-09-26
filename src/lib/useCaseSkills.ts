import type { FormData } from '@/types';

export interface UseCaseSkill {
  id: string;
  name: string;
  label: string;
  chip: string;
  description: string;
  content: string;
}

const CORE_CHIPS = ['anti-slop', 'copy pt-BR', 'verificar fatia'];

/** Chips na UI do cartão — alinhados às skills que o zip gera. */
export const patternSkillChips: Record<string, string[]> = {
  landing: [...CORE_CHIPS, 'conversão', 'SEO local', 'lead/WhatsApp'],
  portfolio: [...CORE_CHIPS, 'caso de estudo', 'marca pessoal'],
  loja: [...CORE_CHIPS, 'catálogo', 'checkout confiável'],
  saas: [...CORE_CHIPS, 'auth/RLS', '1º valor'],
  blog: [...CORE_CHIPS, 'MDX/SEO', 'newsletter'],
  'chat-ia': [...CORE_CHIPS, 'chat UX', 'segredo/API'],
  'app-flutter': [...CORE_CHIPS, 'nativo', 'loja/offline'],
  api: [...CORE_CHIPS, 'contrato REST', 'hardening'],
  automacao: [...CORE_CHIPS, 'CLI honesta', 'jobs idempotentes'],
  desktop: [...CORE_CHIPS, 'IPC/CSP', 'persistência'],
};

export function chipsForForm(data: FormData): string[] {
  if (data.patternId && patternSkillChips[data.patternId]) {
    return patternSkillChips[data.patternId];
  }
  switch (data.appType) {
    case 'website':
      return [...CORE_CHIPS, 'conversão', 'SEO'];
    case 'api':
      return [...CORE_CHIPS, 'contrato REST'];
    case 'cli':
      return [...CORE_CHIPS, 'CLI honesta'];
    case 'android':
    case 'ios':
      return [...CORE_CHIPS, 'nativo'];
    case 'gui':
      return [...CORE_CHIPS, 'IPC/CSP'];
    default:
      return CORE_CHIPS;
  }
}

function header(name: string, description: string, title: string): string {
  return `---
name: ${name}
description: ${description}
---

# ${title}

`;
}

function adaptBlock(data: FormData): string {
  return `## Adaptar a este projeto
- Projeto: ${data.projectName || '[NOME]'}
- Pitch: ${data.pitch || '[O QUE FAZ]'}
- Quem usa: ${data.targetAudience || '[PÚBLICO]'}
- Ação principal: ${data.mainAction || '[CLIQUE]'}
- Stack: ${data.stack || '[STACK]'} ${data.framework ? `/ ${data.framework}` : ''}
- Notas do humano: ${data.notes?.trim() || '(nenhuma)'}

Troque os colchetes se ainda estiverem genéricos. Não invente fato do negócio.
`;
}

export function listUseCaseSkills(data: FormData): UseCaseSkill[] {
  return [...coreSkills(data), ...caseSkills(data)];
}

function coreSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'ui-taste',
      name: 'ui-taste',
      label: 'UI taste',
      chip: 'anti-slop',
      description: 'Gosto visual — alinhado a frontend-design / anti-ui-slop',
      content: `${header('ui-taste', 'Evita visual de IA genérico ao criar ou revisar interface. Use em qualquer tela, CSS ou componente.', 'UI taste (anti-slop)')}${adaptBlock(data)}
Leia \`ANTI-SLOP.md\` primeiro. Inspiração de ecossistema: frontend-design, anti-ui-slop, web-design-guidelines.

## Faça
- Uma decisão de tipo + cor + ritmo no README (3 linhas).
- Um foco por viewport: a ação “${data.mainAction || 'principal'}”.
- Estados vazio / loading / erro / sucesso desenhados.

## Não faça
- Inter + roxo default, mesh gradient, bento vazio, “Unlock your potential”.
- Tema shadcn/Tailwind intocado.
`,
    },
    {
      id: 'copy-ptbr',
      name: 'copy-ptbr',
      label: 'Copy pt-BR',
      chip: 'copy pt-BR',
      description: 'Texto de UI sem clichê de marketing de IA',
      content: `${header('copy-ptbr', 'Texto de interface e README em português do Brasil, sem clichê de IA. Use em heroes, labels, e-mails e empty states.', 'Copy pt-BR')}${adaptBlock(data)}
## Faça
- Verbo + objeto. CTA = a ação principal, não “Saiba mais”.
- Erro que diz o que aconteceu e o que fazer.

## Não faça
- “Jornada”, “ecossistema”, “desbloqueie seu potencial”.
- Prometer o que não está no SPEC.
`,
    },
    {
      id: 'verify-slice',
      name: 'verify-slice',
      label: 'Verify',
      chip: 'verificar fatia',
      description: 'Fecha fatia só com evidência (comando + fluxo)',
      content: `${header('verify-slice', 'Fecha uma fatia só com evidência. Use no fim de cada item de TASKS.md ou antes de dizer pronto.', 'Verify slice')}${adaptBlock(data)}
Alinhado a tdd / systematic-debugging / code-review do ecossistema de skills.

## Passos
1. O que a fatia prometeu.
2. Rode o comando de teste/lint/dev da stack.
3. Se tocou UI, checklist de ANTI-SLOP.md.
4. Como o humano reproduz (URL ou binário) — sem exigir uma IDE.

## Pronto só se
Arquivo real, fluxo “${data.mainAction || 'principal'}” exercitável ou marcado fora do escopo, zero placeholder.
`,
    },
    {
      id: 'systematic-debug',
      name: 'systematic-debug',
      label: 'Debug',
      chip: 'debug',
      description: 'Diagnóstico em hipóteses, não chute de rewrite',
      content: `${header('systematic-debug', 'Quando algo quebra: reproduzir, hipotetizar, isolar. Use em bug, tela branca, 500, build vermelho.', 'Systematic debug')}${adaptBlock(data)}
Padrão diagnosing-bugs / systematic-debugging.

1. Reproduza em 3 linhas (comando + o que viu).
2. Uma hipótese. Mude uma variável.
3. Não reescreva o repo para “consertar”.
4. Se o erro for de ambiente, documente no README.
`,
    },
  ];
}

function caseSkills(data: FormData): UseCaseSkill[] {
  const key = data.patternId || data.appType;
  switch (key) {
    case 'landing':
    case 'website':
      return landingSkills(data);
    case 'portfolio':
      return portfolioSkills(data);
    case 'loja':
      return storeSkills(data);
    case 'saas':
      return saasSkills(data);
    case 'blog':
      return blogSkills(data);
    case 'chat-ia':
      return chatSkills(data);
    case 'app-flutter':
    case 'android':
    case 'ios':
      return flutterSkills(data);
    case 'api':
      return apiSkills(data);
    case 'automacao':
    case 'cli':
      return cliSkills(data);
    case 'desktop':
    case 'gui':
      return desktopSkills(data);
    default:
      return landingSkills(data);
  }
}

function landingSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'conversion-landing',
      name: 'conversion-landing',
      label: 'Conversão',
      chip: 'conversão',
      description: 'Uma tela, um CTA — landing de captura',
      content: `${header('conversion-landing', 'Landing de captura: uma promessa, uma prova, um CTA. Use ao montar hero, seções ou página única.', 'Conversão — landing')}${adaptBlock(data)}
CTA deste projeto: **${data.ctaType || 'whatsapp/form'}** ${data.ctaValue ? `(${data.ctaValue})` : ''}.

## Estrutura
1. Headline com o resultado para “${data.targetAudience || 'o visitante'}”.
2. Prova mínima (depoimento, número real ou “como funciona” em 3 passos).
3. CTA repetido: ${data.mainAction || 'a ação principal'}.
4. FAQ só do que trava a conversão.

## Não faça
Pricing de 3 colunas, logo cloud, “nossos valores”, blog no rodapé sem conteúdo.
`,
    },
    {
      id: 'seo-local',
      name: 'seo-local',
      label: 'SEO',
      chip: 'SEO local',
      description: 'Title, OG, sitemap — SEO de página local/serviço',
      content: `${header('seo-local', 'SEO on-page de landing/serviço local. Use ao criar metadata, sitemap ou texto acima da dobra.', 'SEO local')}${adaptBlock(data)}
## Faça
- \`title\` + \`description\` únicos com cidade/serviço se o pitch tiver lugar.
- OG image que mostra o produto, não um gradient.
- sitemap.xml + robots.txt. JSON-LD LocalBusiness/Service só com dados reais.
- Um H1. Headings que um humano leria.

## Não faça
Keyword stuffing, texto invisível, 12 H1s.
`,
    },
    {
      id: 'lead-whatsapp',
      name: 'lead-whatsapp',
      label: 'Lead',
      chip: 'lead/WhatsApp',
      description: 'Formulário ou wa.me com consentimento',
      content: `${header('lead-whatsapp', 'Captura de lead: WhatsApp wa.me ou form curto. Use ao implementar CTA, form ou thank-you.', 'Lead / WhatsApp')}${adaptBlock(data)}
## Faça
- Link \`https://wa.me/55...\` com texto pré-preenchido em pt-BR (peça o número se faltar).
- Form: nome + canal (e-mail ou zap). Consentimento LGPD numa linha.
- Estado de sucesso: “mensagem pronta” / “recebemos”. Sem página vazia.

## Não faça
CRM inventado, Mailchimp obrigatório, captcha que mata mobile.
`,
    },
  ];
}

function portfolioSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'case-study',
      name: 'case-study',
      label: 'Casos',
      chip: 'caso de estudo',
      description: 'Projeto com problema → processo → resultado',
      content: `${header('case-study', 'Página de projeto: contexto, processo, resultado. Use ao listar trabalhos ou detalhar um case.', 'Caso de estudo')}${adaptBlock(data)}
Cada projeto: problema do cliente, o que você fez, 1–3 imagens, resultado mensurável **se existir**. Sem “Lorem case”.
Se o humano não deu cases, use placeholders \`[CASE]\` e peça os reais.
`,
    },
    {
      id: 'personal-brand',
      name: 'personal-brand',
      label: 'Marca',
      chip: 'marca pessoal',
      description: 'Voz em 1ª pessoa, sem template de agência',
      content: `${header('personal-brand', 'Marca pessoal: tom, sobre, contato. Use na home, sobre e rodapé.', 'Marca pessoal')}${adaptBlock(data)}
Escreva como ${data.projectName || 'a pessoa'}. Sem “somos uma equipe multidisciplinar” se for uma pessoa.
Contato = a ação “${data.mainAction || 'falar comigo'}”.
`,
    },
  ];
}

function storeSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'catalog-store',
      name: 'catalog-store',
      label: 'Catálogo',
      chip: 'catálogo',
      description: 'Lista, detalhe, estoque honesto',
      content: `${header('catalog-store', 'Catálogo de loja: card, detalhe, filtro. Use em listagem e PDP.', 'Catálogo')}${adaptBlock(data)}
Foto + nome + preço + um CTA. Sem estoque inventado. Empty state se o catálogo estiver vazio.
Pagamentos: ${data.features.includes('pagamentos') ? 'Stripe/Pix no escopo' : 'só se o SPEC pedir'}.
`,
    },
    {
      id: 'checkout-trust',
      name: 'checkout-trust',
      label: 'Checkout',
      chip: 'checkout confiável',
      description: 'Carrinho e pagamento sem PAN no seu banco',
      content: `${header('checkout-trust', 'Checkout confiável: carrinho, frete, Stripe/Pix. Use em cart e pagamento.', 'Checkout')}${adaptBlock(data)}
Gateway cobra o cartão — nunca PAN/CVV no seu servidor. Resumo do pedido visível. Erro de pagamento em pt-BR.
Não finja “frete grátis” sem regra.
`,
    },
  ];
}

function saasSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'saas-auth',
      name: 'saas-auth',
      label: 'Auth',
      chip: 'auth/RLS',
      description: 'Login, sessão, dados por conta',
      content: `${header('saas-auth', 'Auth de SaaS: cadastro, sessão, isolamento por usuário. Use em login, middleware e queries.', 'Auth / isolamento')}${adaptBlock(data)}
Auth: ${data.authType || 'e-mail/senha'}. Storage: ${data.storageType || 'postgres'}.
Toda query com dono. Sem listar dados de outro usuário. Reset de senha real ou TODO explícito.
`,
    },
    {
      id: 'first-value',
      name: 'first-value',
      label: '1º valor',
      chip: '1º valor',
      description: 'Onboarding até a ação principal na 1ª sessão',
      content: `${header('first-value', 'Primeiro valor na primeira sessão. Use em onboarding, empty dashboard e empty states.', 'Primeiro valor')}${adaptBlock(data)}
Depois do login a pessoa consegue: **${data.mainAction || 'o fluxo principal'}**.
Máximo 1 passo de setup. Sem tour de 6 slides. Empty state ensina o clique, não um ilustração vazia.
`,
    },
  ];
}

function blogSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'content-mdx',
      name: 'content-mdx',
      label: 'Conteúdo',
      chip: 'MDX/SEO',
      description: 'Coleção de artigos (Astro/MDX) com frontmatter',
      content: `${header('content-mdx', 'Blog em coleção de arquivos (MDX/markdown). Use ao criar posts, listagem e RSS.', 'Conteúdo MDX')}${adaptBlock(data)}
Framework: ${data.framework || 'Astro'}. Frontmatter: title, date, description. Um post de exemplo real do tema, não “Hello World”.
RSS + sitemap. Sem CMS se o SPEC for estático/markdown.
`,
    },
    {
      id: 'article-seo',
      name: 'article-seo',
      label: 'Artigo',
      chip: 'newsletter',
      description: 'Artigo legível e newsletter opcional',
      content: `${header('article-seo', 'Artigo longo: medida de linha, TOC se precisar, newsletter só se pedida.', 'Artigo / newsletter')}${adaptBlock(data)}
Tipografia de leitura. Sem popup no primeiro segundo. Newsletter = um campo + consentimento, ou não existe.
`,
    },
  ];
}

function chatSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'chat-ux',
      name: 'chat-ux',
      label: 'Chat UX',
      chip: 'chat UX',
      description: 'Caixa de pergunta, stream, estados',
      content: `${header('chat-ux', 'UX de chat com IA: composer, stream, erro, vazio. Use nas telas de conversa.', 'Chat UX')}${adaptBlock(data)}
Uma conversa. Placeholder que sugere o que perguntar neste produto. Stream se possível. Parar geração. Histórico só se o SPEC pedir.
Sem sparkles no botão send, sem sidebar de 40 chats vazios.
`,
    },
    {
      id: 'llm-safety',
      name: 'llm-safety',
      label: 'API IA',
      chip: 'segredo/API',
      description: 'Chave no servidor, fallback, sem vazar prompt',
      content: `${header('llm-safety', 'Integração LLM segura. Use ao chamar OpenAI/Ollama ou gravar .env.', 'Segurança da API de IA')}${adaptBlock(data)}
Integração: ${data.integrations || 'OpenAI ou Ollama'}.
Chave só no servidor / .env. Nunca no cliente. Timeout + erro amigável. Não logar o prompt completo com PII.
Se offline/Ollama, documente o comando. Sem fingir RAG se não há índice.
`,
    },
  ];
}

function flutterSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'flutter-native',
      name: 'flutter-native',
      label: 'Flutter',
      chip: 'nativo',
      description: 'Poucas telas, look nativo, um código',
      content: `${header('flutter-native', 'App Flutter: Material/Cupertino como base + acento do negócio. Use em telas e navegação.', 'Flutter nativo')}${adaptBlock(data)}
Fluxo: **${data.mainAction || 'tela principal'}**. Sem FAB decorativo. Lista + detalhe + form. A11y: alvos 48dp, Semantics.
`,
    },
    {
      id: 'mobile-offline',
      name: 'mobile-offline',
      label: 'Offline',
      chip: 'loja/offline',
      description: 'SQLite, permissões, build de loja',
      content: `${header('mobile-offline', 'Dados locais, permissões e rumo às lojas. Use em persistência e release.', 'Offline / lojas')}${adaptBlock(data)}
Storage: ${data.storageType || 'sqlite'}. Permissão só quando o fluxo precisa. README: como rodar no emulador. Store listing fica TODO, não invente screenshots.
`,
    },
  ];
}

function apiSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'api-contract',
      name: 'api-contract',
      label: 'Contrato',
      chip: 'contrato REST',
      description: 'Erros estáveis, OpenAPI, versionamento',
      content: `${header('api-contract', 'Contrato de API: status, erros, OpenAPI. Use ao criar rotas e docs.', 'Contrato REST')}${adaptBlock(data)}
Framework: ${data.framework || data.apiFramework || 'FastAPI'}. Auth: ${data.apiAuth || data.authType || 'jwt'}.
Erros JSON estáveis ({ code, message }). Sem 200 com body de erro. OpenAPI se docs=sim. Exemplos reais no /docs.
`,
    },
    {
      id: 'api-hardening',
      name: 'api-hardening',
      label: 'Hardening',
      chip: 'hardening',
      description: 'Validação, rate limit, sem secret no git',
      content: `${header('api-hardening', 'API endurecida: validação, rate limit, .env. Use em auth, input e deploy.', 'Hardening')}${adaptBlock(data)}
Pydantic/schema em todo input. Rate limit nas rotas públicas. CORS explícito. Sem SQL concatenado.
`,
    },
  ];
}

function cliSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'cli-honest',
      name: 'cli-honest',
      label: 'CLI',
      chip: 'CLI honesta',
      description: 'Typer/Click: --help, exit codes, stderr',
      content: `${header('cli-honest', 'CLI honesta: help, códigos de saída, progresso. Use ao criar comandos.', 'CLI honesta')}${adaptBlock(data)}
Framework: ${data.framework || 'Typer'}. --help que um leigo entende. Exit 0/2/1 corretos. Progresso no stderr. Sem wizard de 8 passos.
A tarefa: **${data.mainAction || data.pitch || 'a automação'}**.
`,
    },
    {
      id: 'idempotent-job',
      name: 'idempotent-job',
      label: 'Jobs',
      chip: 'jobs idempotentes',
      description: 'Rodar de novo sem duplicar efeito',
      content: `${header('idempotent-job', 'Job/script idempotente. Use em cron, batch e reprocessamento.', 'Jobs idempotentes')}${adaptBlock(data)}
Rodar 2× não duplica efeito colateral. Log o que fez. Dry-run se fizer sentido. Secrets em env.
`,
    },
  ];
}

function desktopSkills(data: FormData): UseCaseSkill[] {
  return [
    {
      id: 'tauri-ipc',
      name: 'tauri-ipc',
      label: 'IPC',
      chip: 'IPC/CSP',
      description: 'Tauri: CSP, comandos allowlist, sem Node solto',
      content: `${header('tauri-ipc', 'Desktop Tauri/Electron seguro. Use em comandos nativos e janela.', 'IPC / CSP')}${adaptBlock(data)}
Framework: ${data.framework || data.guiFramework || 'Tauri'}. Allowlist mínima. CSP fechado. Sem eval. Uma janela, o fluxo “${data.mainAction || 'principal'}”.
`,
    },
    {
      id: 'desktop-persist',
      name: 'desktop-persist',
      label: 'Persistir',
      chip: 'persistência',
      description: 'Config e dados no diretório do app',
      content: `${header('desktop-persist', 'Persistência desktop: config do usuário, não cwd. Use em settings e cache.', 'Persistência')}${adaptBlock(data)}
Storage: ${data.storageType || 'sqlite/config'}. Paths do SO (app data), não a pasta do exe. Backup/export se o SPEC pedir.
`,
    },
  ];
}
