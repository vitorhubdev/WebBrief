import type { MessageTree } from './messages';
import { messages } from './messages';
import type { Locale } from './types';
import type { AppType, PromptTarget, Stack, WorkflowMode } from '@/types';
import type { LoopMode } from '@/lib/loopKit';

function m(locale: Locale): MessageTree {
  return messages[locale];
}

export function getWorkflowModeOptions(locale: Locale) {
  const msg = m(locale).workflowMode;
  return (['rapid', 'structured', 'spec'] as WorkflowMode[]).map((value) => ({
    value,
    label: msg[value].label,
    desc: msg[value].desc,
  }));
}

export function getLoopModeOptions(locale: Locale) {
  const msg = m(locale).loopMode;
  return (['off', 'ralph', 'gauntlet'] as LoopMode[]).map((value) => ({
    value,
    label: msg[value].label,
    desc: msg[value].desc,
  }));
}

const promptTargetMeta: {
  value: PromptTarget;
  groupKey: 'genericGroup' | 'ide' | 'vendor' | 'open';
}[] = [
  { value: 'generic', groupKey: 'genericGroup' },
  { value: 'cursor', groupKey: 'ide' },
  { value: 'windsurf', groupKey: 'ide' },
  { value: 'claude-code', groupKey: 'vendor' },
  { value: 'codex', groupKey: 'vendor' },
  { value: 'gemini', groupKey: 'vendor' },
  { value: 'antigravity', groupKey: 'vendor' },
  { value: 'pi', groupKey: 'open' },
  { value: 'omp', groupKey: 'open' },
  { value: 'opencode', groupKey: 'open' },
  { value: 'kilo', groupKey: 'open' },
  { value: 'cline', groupKey: 'open' },
  { value: 'crush', groupKey: 'open' },
  { value: 'dsh', groupKey: 'open' },
];

const promptTargetCopy: Record<
  Locale,
  Record<
    PromptTarget,
    { group: string; label: string; desc: string }
  >
> = {
  pt: {
    generic: {
      group: 'Sem ferramenta fixa',
      label: 'Qualquer agente',
      desc: 'Chat ou pasta. O contrato continua sendo AGENTS.md.',
    },
    cursor: { group: 'IDE', label: 'Cursor', desc: 'Regra no workspace. Skills em .cursor/skills.' },
    windsurf: { group: 'IDE', label: 'Windsurf', desc: 'Cascade. Adaptador .windsurfrules só neste destino.' },
    'claude-code': {
      group: 'Agente de um fornecedor',
      label: 'Claude Code',
      desc: 'CLAUDE.md aponta para AGENTS.md. Subagentes com contexto separado.',
    },
    codex: {
      group: 'Agente de um fornecedor',
      label: 'Codex',
      desc: 'AGENTS.md curto, sandbox, worktree e uma tarefa por lote.',
    },
    gemini: {
      group: 'Agente de um fornecedor',
      label: 'Gemini CLI',
      desc: 'GEMINI.md só aponta para o contrato.',
    },
    antigravity: {
      group: 'Agente de um fornecedor',
      label: 'Antigravity',
      desc: '/boost abre vários agentes. GEMINI.md só aponta para o contrato.',
    },
    pi: {
      group: 'Harness aberto',
      label: 'Pi',
      desc: 'Núcleo mínimo. Skills sob demanda em .pi/skills e .agents/skills.',
    },
    omp: {
      group: 'Harness aberto',
      label: 'Oh My Pi',
      desc: 'Pi completo: LSP, MCP, subagentes. Reaproveita configs de outros agentes.',
    },
    opencode: {
      group: 'Harness aberto',
      label: 'OpenCode',
      desc: 'Terminal multi-modelo. Override curto, sem duplicar o contrato.',
    },
    kilo: {
      group: 'Harness aberto',
      label: 'Kilo Code',
      desc: 'Subagentes em background. O principal recebe o resumo.',
    },
    cline: {
      group: 'Harness aberto',
      label: 'Cline',
      desc: 'Agente maduro. Uma tarefa por sessão, sem repetir o mesmo erro no contexto.',
    },
    crush: {
      group: 'Harness aberto',
      label: 'Crush',
      desc: 'TUI enxuta em Go. Não ligue MCP que a tarefa não usa.',
    },
    dsh: {
      group: 'Harness aberto',
      label: 'DeepSeek Harness',
      desc: 'Sessão em log: retome ou faça fork em vez de reenviar o histórico.',
    },
  },
  en: {
    generic: {
      group: 'No fixed tool',
      label: 'Any agent',
      desc: 'Chat or folder. AGENTS.md remains the contract.',
    },
    cursor: { group: 'IDE', label: 'Cursor', desc: 'Workspace rule. Skills in .cursor/skills.' },
    windsurf: { group: 'IDE', label: 'Windsurf', desc: 'Cascade. .windsurfrules adapter only for this target.' },
    'claude-code': {
      group: 'Vendor agent',
      label: 'Claude Code',
      desc: 'CLAUDE.md points to AGENTS.md. Subagents with separate context.',
    },
    codex: {
      group: 'Vendor agent',
      label: 'Codex',
      desc: 'Short AGENTS.md, sandbox, worktree, one task per batch.',
    },
    gemini: {
      group: 'Vendor agent',
      label: 'Gemini CLI',
      desc: 'GEMINI.md only points to the contract.',
    },
    antigravity: {
      group: 'Vendor agent',
      label: 'Antigravity',
      desc: '/boost fans out to multiple agents. GEMINI.md only points to the contract.',
    },
    pi: {
      group: 'Open harness',
      label: 'Pi',
      desc: 'Minimal core. On-demand skills in .pi/skills and .agents/skills.',
    },
    omp: {
      group: 'Open harness',
      label: 'Oh My Pi',
      desc: 'Full Pi: LSP, MCP, subagents. Reuses other agent configs.',
    },
    opencode: {
      group: 'Open harness',
      label: 'OpenCode',
      desc: 'Multi-model terminal. Short override without duplicating the contract.',
    },
    kilo: {
      group: 'Open harness',
      label: 'Kilo Code',
      desc: 'Background subagents. Main agent gets the summary.',
    },
    cline: {
      group: 'Open harness',
      label: 'Cline',
      desc: 'Mature agent. One task per session; do not repeat the same error in context.',
    },
    crush: {
      group: 'Open harness',
      label: 'Crush',
      desc: 'Lean Go TUI. Do not attach MCP the task does not need.',
    },
    dsh: {
      group: 'Open harness',
      label: 'DeepSeek Harness',
      desc: 'Session as log: resume or fork instead of resending history.',
    },
  },
};

export function getPromptTargetOptions(locale: Locale) {
  return promptTargetMeta.map(({ value }) => {
    const copy = promptTargetCopy[locale][value];
    return { value, group: copy.group, label: copy.label, desc: copy.desc };
  });
}

export function harnessLabelFor(locale: Locale, target: PromptTarget | undefined): string {
  const t = target || 'generic';
  return promptTargetCopy[locale][t]?.label ?? promptTargetCopy[locale].generic.label;
}

const appTypeCopy: Record<Locale, Record<AppType, { label: string; desc: string }>> = {
  pt: {
    website: { label: 'Website', desc: 'Sites, landing pages, dashboards' },
    android: { label: 'Android', desc: 'Apps nativos ou cross-platform' },
    ios: { label: 'iOS', desc: 'Apps para iPhone e iPad' },
    cli: { label: 'CLI', desc: 'Ferramentas de linha de comando' },
    gui: { label: 'GUI Desktop', desc: 'Apps para Windows, macOS, Linux' },
    docker: { label: 'Docker/Podman', desc: 'Containers e orquestração' },
    api: { label: 'API/Backend', desc: 'REST, GraphQL, gRPC' },
  },
  en: {
    website: { label: 'Website', desc: 'Sites, landing pages, dashboards' },
    android: { label: 'Android', desc: 'Native or cross-platform apps' },
    ios: { label: 'iOS', desc: 'Apps for iPhone and iPad' },
    cli: { label: 'CLI', desc: 'Command-line tools' },
    gui: { label: 'Desktop GUI', desc: 'Apps for Windows, macOS, Linux' },
    docker: { label: 'Docker/Podman', desc: 'Containers and orchestration' },
    api: { label: 'API / backend', desc: 'REST, GraphQL, gRPC' },
  },
};

export function getAppTypeOptions(locale: Locale) {
  return (Object.keys(appTypeCopy.pt) as AppType[]).map((value) => ({
    value,
    ...appTypeCopy[locale][value],
  }));
}

const stackCopy: Record<Locale, Record<string, { label: string; desc: string }>> = {
  pt: {
    typescript: { label: 'TypeScript', desc: 'O mais comum na web hoje (Next.js, React)' },
    javascript: { label: 'JavaScript', desc: 'Simples, Vite, Node — bom para começar' },
    python: { label: 'Python', desc: 'IA, APIs e automações com pouca fricção' },
    php: { label: 'PHP', desc: 'Sites e Laravel — muito hospedagem barata' },
    ruby: { label: 'Ruby', desc: 'Rails: CRUD e SaaS rápido' },
    dart: { label: 'Dart (Flutter)', desc: 'Um código para Android e iPhone' },
    go: { label: 'Go', desc: 'APIs e CLIs rápidas' },
    rust: { label: 'Rust', desc: 'Performance e segurança' },
    kotlin: { label: 'Kotlin', desc: 'Android nativo' },
    swift: { label: 'Swift', desc: 'iOS nativo' },
    java: { label: 'Java', desc: 'Android enterprise e backends' },
    csharp: { label: 'C#', desc: '.NET, MAUI, Unity' },
    cpp: { label: 'C++', desc: 'Performance extrema' },
  },
  en: {
    typescript: { label: 'TypeScript', desc: 'Most common on the web today (Next.js, React)' },
    javascript: { label: 'JavaScript', desc: 'Simple, Vite, Node — easy start' },
    python: { label: 'Python', desc: 'APIs and automation with low friction' },
    php: { label: 'PHP', desc: 'Sites and Laravel — cheap hosting' },
    ruby: { label: 'Ruby', desc: 'Rails: fast CRUD and SaaS' },
    dart: { label: 'Dart (Flutter)', desc: 'One codebase for Android and iPhone' },
    go: { label: 'Go', desc: 'Fast APIs and CLIs' },
    rust: { label: 'Rust', desc: 'Performance and safety' },
    kotlin: { label: 'Kotlin', desc: 'Native Android' },
    swift: { label: 'Swift', desc: 'Native iOS' },
    java: { label: 'Java', desc: 'Enterprise Android and backends' },
    csharp: { label: 'C#', desc: '.NET, MAUI, Unity' },
    cpp: { label: 'C++', desc: 'Maximum performance' },
  },
};

export function getStackOptions(locale: Locale, values: Stack[]) {
  return values.map((value) => ({
    value,
    label: stackCopy[locale][value]?.label ?? value,
    desc: stackCopy[locale][value]?.desc ?? '',
  }));
}

const featureCopy: Record<Locale, Record<string, string>> = {
  pt: {
    auth: 'Autenticação (Login/Cadastro)',
    pagamentos: 'Gateway de Pagamentos (Stripe/Pix)',
    upload: 'Upload de Arquivos/Imagens',
    busca: 'Busca / Filtros',
    chat: 'Chat em tempo real',
    'api-externa': 'Integração com API externa',
    notificacoes: 'Notificações (email/push)',
    admin: 'Painel administrativo',
    i18n: 'Multi-idioma',
    pwa: 'PWA (instalável)',
    darkmode: 'Modo escuro',
    analytics: 'Analytics',
  },
  en: {
    auth: 'Authentication (sign up / login)',
    pagamentos: 'Payments (Stripe/Pix)',
    upload: 'File / image upload',
    busca: 'Search / filters',
    chat: 'Real-time chat',
    'api-externa': 'External API integration',
    notificacoes: 'Notifications (email/push)',
    admin: 'Admin dashboard',
    i18n: 'Multi-language',
    pwa: 'PWA (installable)',
    darkmode: 'Dark mode',
    analytics: 'Analytics',
  },
};

export function getFeatureOptions(locale: Locale) {
  return Object.entries(featureCopy.pt).map(([value]) => ({
    value,
    label: featureCopy[locale][value] ?? value,
  }));
}

const patternCopy: Record<Locale, Record<string, { name: string; blurb: string }>> = {
  pt: {
    landing: {
      name: 'Página para captar clientes',
      blurb: 'Uma página, botão de WhatsApp ou formulário. O começo mais fácil.',
    },
    portfolio: { name: 'Portfólio ou site pessoal', blurb: 'Mostre quem você é e seus trabalhos.' },
    loja: { name: 'Loja simples', blurb: 'Catálogo, carrinho e checkout (Stripe/Pix).' },
    saas: { name: 'Sistema com login (SaaS)', blurb: 'Painel, contas de usuário e dados salvos.' },
    blog: { name: 'Blog ou conteúdo', blurb: 'Artigos, SEO e newsletter.' },
    'chat-ia': { name: 'Chat com IA', blurb: 'Caixa de pergunta + resposta (OpenAI ou Ollama).' },
    'app-flutter': {
      name: 'App de celular (Android e iPhone)',
      blurb: 'Um código Flutter para as duas lojas.',
    },
    api: { name: 'API / backend', blurb: 'O servidor que o app ou o site vai chamar.' },
    automacao: { name: 'Automação no computador', blurb: 'Script ou CLI que faz uma tarefa repetida.' },
    desktop: { name: 'Programa de computador', blurb: 'Janela no Windows/Mac — tipo um app instalável.' },
  },
  en: {
    landing: {
      name: 'Lead capture page',
      blurb: 'One page, WhatsApp button or form. Easiest start.',
    },
    portfolio: { name: 'Portfolio or personal site', blurb: 'Show who you are and your work.' },
    loja: { name: 'Simple store', blurb: 'Catalog, cart, and checkout (Stripe/Pix).' },
    saas: { name: 'Logged-in system (SaaS)', blurb: 'Dashboard, user accounts, saved data.' },
    blog: { name: 'Blog or content', blurb: 'Articles, SEO, and newsletter.' },
    'chat-ia': { name: 'AI chat UI', blurb: 'Question box + answers (OpenAI or Ollama).' },
    'app-flutter': { name: 'Mobile app (Android & iPhone)', blurb: 'One Flutter codebase for both stores.' },
    api: { name: 'API / backend', blurb: 'The server your app or site will call.' },
    automacao: { name: 'Desktop automation', blurb: 'Script or CLI for a repeated task.' },
    desktop: { name: 'Desktop program', blurb: 'Window on Windows/Mac — an installable app.' },
  },
};

export function getPatternDisplay(locale: Locale, id: string, fallback: { name: string; blurb: string }) {
  const copy = patternCopy[locale][id];
  return copy ?? fallback;
}

export function tokenTipsFor(
  locale: Locale,
  data: { promptTarget: PromptTarget | undefined; useJev: boolean },
): string[] {
  const msg = m(locale);
  const target = data.promptTarget || 'generic';
  const tips: string[] = [
    msg.tokenTips.unzip,
    msg.tokenTips.oneTask,
    msg.tokenTips.skillDesc,
    msg.economyByTarget[target],
  ];
  if (data.useJev) tips.push(msg.tokenTips.jev);
  return tips;
}

export function workflowModeShortLabel(locale: Locale, mode: WorkflowMode): string {
  return m(locale).workflowModeShort[mode];
}
