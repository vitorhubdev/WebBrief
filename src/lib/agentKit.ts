import type { FormData, PromptTarget, WorkflowMode } from '@/types';
import { appTypeOptions, collectedDataOptions, promptTargetOptions, stackOptions } from '@/types';
import { generateEconomia, harnessLabel } from '@/lib/harnessGuide';
import { generateLoopPrompt, generateLoopSkill, loopLabel } from '@/lib/loopKit';
import { listUseCaseSkills } from '@/lib/useCaseSkills';

export interface KitFile {
  id: string;
  path: string;
  label: string;
  description: string;
  content: string;
}

export function generateAgentKit(data: FormData): KitFile[] {
  const mode = data.workflowMode || 'structured';
  const target = data.promptTarget || 'generic';
  const files: KitFile[] = [
    {
      id: 'howto',
      path: 'COMO-USAR.md',
      label: 'Como usar',
      description: 'Passo a passo para quem nunca usou um agente',
      content: generateHowTo(data),
    },
    {
      id: 'kickoff',
      path: 'KICKOFF.md',
      label: 'Kickoff',
      description: 'Cole isto na primeira mensagem do agente',
      content: generateKickoff(data),
    },
    {
      id: 'agents',
      path: 'AGENTS.md',
      label: 'AGENTS.md',
      description: 'Contrato portátil — qualquer agente que leia o repo',
      content: generateCanonicalAgents(data),
    },
    {
      id: 'antislop',
      path: 'ANTI-SLOP.md',
      label: 'Anti-slop',
      description: 'Veto a visual e texto de IA genéricos',
      content: generateAntiSlop(data),
    },
    {
      id: 'economia',
      path: 'ECONOMIA.md',
      label: 'Economia',
      description: 'Como gastar menos token neste harness',
      content: generateEconomia(data),
    },
  ];

  if (data.loopMode === 'ralph' || data.loopMode === 'gauntlet') {
    const loopSkill = generateLoopSkill(data);
    files.push({
      id: 'loop',
      path: 'LOOP.md',
      label: loopLabel(data.loopMode),
      description: 'Prompt fixo da corrida — não editar no meio',
      content: generateLoopPrompt(data),
    });
    files.push({
      id: `skill-${loopSkill.name}`,
      path: `skills/${loopSkill.name}/SKILL.md`,
      label: loopSkill.label,
      description: loopSkill.description,
      content: loopSkill.content,
    });
  }

  files.push(...listUseCaseSkills(data).map((skill) => ({
    id: `skill-${skill.id}`,
    path: `skills/${skill.name}/SKILL.md`,
    label: skill.label,
    description: skill.description,
    content: skill.content,
  })));

  if (mode === 'structured' || mode === 'spec') {
    files.push({
      id: 'spec',
      path: 'SPEC.md',
      label: 'SPEC.md',
      description: 'Contrato curto: por quê, o quê, o que não fazer',
      content: generateSpecKernel(data),
    });
    files.push({
      id: 'tasks',
      path: 'TASKS.md',
      label: 'TASKS.md',
      description: 'Fatias verificáveis — um contexto limpo por tarefa',
      content: generateTasks(data),
    });
  }

  if (mode === 'spec') {
    files.push({
      id: 'constitution',
      path: '.specify/CONSTITUTION.md',
      label: 'Constitution',
      description: 'Regras do projeto no estilo Spec Kit',
      content: generateConstitution(data),
    });
    files.push({
      id: 'plan',
      path: 'PLAN.md',
      label: 'PLAN.md',
      description: 'Plano técnico antes de implementar',
      content: generatePlan(data),
    });
  }

  if (target === 'claude-code') {
    files.push({
      id: 'claude',
      path: 'CLAUDE.md',
      label: 'CLAUDE.md',
      description: 'Shim só para Claude Code (@AGENTS.md)',
      content: generateClaudeShim(data),
    });
  }

  if (target === 'cursor') {
    files.push({
      id: 'cursor-rule',
      path: '.cursor/rules/project.mdc',
      label: 'Cursor rule',
      description: 'Regra alwaysApply só se o destino for Cursor',
      content: generateCursorRule(data),
    });
  }

  if (target === 'gemini' || target === 'antigravity') {
    files.push({
      id: 'gemini',
      path: 'GEMINI.md',
      label: 'GEMINI.md',
      description: target === 'antigravity' ? 'Shim do Antigravity — /boost para vários agentes' : 'Shim só para Gemini CLI',
      content: target === 'antigravity' ? generateAntigravityShim(data) : generateGenericShim(data, 'Gemini CLI'),
    });
  }

  if (target === 'opencode') {
    files.push({
      id: 'opencode',
      path: 'AGENTS.override.md',
      label: 'OpenCode',
      description: 'Override curto se o destino for OpenCode',
      content: generateGenericShim(data, 'OpenCode'),
    });
  }

  if (target === 'windsurf') {
    files.push({
      id: 'windsurf',
      path: '.windsurfrules',
      label: 'Windsurf',
      description: 'Regra só se o destino for Windsurf',
      content: generateCursorRule(data).replace(/^---[\s\S]*?---\n\n/, ''),
    });
  }

  return files;
}

function generateHowTo(data: FormData): string {
  const dest = data.promptTarget || 'generic';
  const tool = toolHowToName(dest);
  const adapter = adapterHowToLine(dest);

  return `# Como usar este kit (sem saber programar)

Você não vai “escrever o app”. Vai **pedir** para um agente escrever, com estes arquivos como contrato.
O kit **não depende** de uma ferramenta específica. O contrato é \`AGENTS.md\`.

## 1. Crie uma pasta vazia
No computador: Nova pasta → nome do projeto (${data.projectName || 'meu-projeto'}).

## 2. Abra o agente que você já usa
Agora: **${tool}**.
Abra essa pasta no programa (File → Open Folder, \`cd\` no terminal, ou anexe os arquivos no chat).

## 3. Cole os arquivos na pasta
O jeito mais fácil: **Baixar kit .zip** neste site e descompactar **dentro** da pasta do projeto (os caminhos das pastas já vêm certos).
Se preferir um a um, arraste:
- \`AGENTS.md\` (obrigatório — qualquer agente)
- \`ECONOMIA.md\` (como não estourar o contexto)
- \`ANTI-SLOP.md\` e a pasta \`skills/\`
- \`SPEC.md\` e \`TASKS.md\` se existirem
${data.loopMode === 'ralph' || data.loopMode === 'gauntlet' ? '- `LOOP.md` — o prompt da corrida. Não edite no meio.\n' : ''}
${adapter}
${data.useJev ? '- Jev está ligado: ele só decide (skill, ferramenta, permissão). Quem escreve o código é o harness.\n' : ''}

Se a sua ferramenta procurar outro nome (\`CLAUDE.md\`, \`.cursor/rules\`, \`GEMINI.md\`), só use o adaptador se ele veio neste kit. Não invente que o projeto “é de Cursor” ou “é de Claude”.

## 4. Mande a primeira mensagem
Abra o chat do agente e **cole o arquivo Kickoff** (KICKOFF.md). Envie.
${data.loopMode === 'gauntlet' && !data.qualityBar?.trim() ? 'O Gauntlet ainda não tem barra: a primeira resposta só oferece referências. Você escolhe uma e gera o kit de novo, ou escreve a barra no LOOP.md uma vez.\n' : ''}${data.loopMode === 'ralph' || (data.loopMode === 'gauntlet' && !!data.qualityBar?.trim()) ? 'A corrida usa LOOP.md numa sessão nova. Não reescreva esse arquivo a cada volta.\n' : ''}

## 5. Quando ele perguntar, responda em português
Não precisa usar termos técnicos. “O botão tem que ser verde” serve.

## 6. Como saber se funcionou
Peça: “como eu abro isso no navegador?”. Em site, em geral é um comando tipo \`npm run dev\` e um endereço localhost.

## O que este projeto é
- Tipo: ${labelApp(data)}
- Linguagem: ${labelStack(data)}${data.framework ? ` (${data.framework})` : ''}
- Ritmo: ${modeLabel(data.workflowMode || 'structured')}
- Harness: ${getPromptTargetLabel(data.promptTarget)}${data.useJev ? ' + Jev (decisão, não geração)' : ''}

Não apague o AGENTS.md. É o que impede o agente de inventar outro produto.
`;
}

export function generateKickoff(data: FormData): string {
  const mode = data.workflowMode || 'structured';
  const name = data.projectName || 'o projeto';
  const dest = getPromptTargetLabel(data.promptTarget);

  if (mode === 'rapid') {
    return `# Kickoff — ${name}

Você está no workspace. Leia \`AGENTS.md\` e implemente o MVP agora.

## Pedido
${data.pitch || 'Construir a aplicação descrita no formulário.'}

**Tipo:** ${labelApp(data)} · **Stack obrigatória:** ${labelStack(data)}${data.framework ? ` / ${data.framework}` : ''}  
**Ação principal:** ${data.mainAction || 'definir no código'}  
**Público:** ${data.targetAudience || 'não informado'}

${data.notes?.trim() ? `## Não faça\n${data.notes.trim()}\n` : ''}
## Como trabalhar
- Leia os arquivos do disco. Não peça o kit colado no chat.
- Crie arquivos reais. Sem placeholder.
- Respeite a stack. Não troque sem perguntar.
- UI/copy: ANTI-SLOP.md + skills/ui-taste e skills/copy-ptbr.
- Ao terminar: como rodar + o que ficou de fora do MVP. Sem exigir uma IDE.

Destino informado (opcional): ${dest}.
`;
  }

  if (mode === 'spec') {
    return `# Kickoff spec-driven — ${name}

Não escreva código de produto nesta mensagem.

1. Leia \`AGENTS.md\`, \`.specify/CONSTITUTION.md\` e \`SPEC.md\`.
2. Refine \`PLAN.md\` se algo estiver ambíguo — marque \`[NEEDS CLARIFICATION]\` em vez de inventar.
3. Só depois execute \`TASKS.md\` **uma tarefa por contexto**, com verificação (test/lint/build) no fim de cada fatia. Leia \`ECONOMIA.md\`.
4. Não avance a tarefa seguinte se a atual estiver vermelha.

Pedido: ${data.pitch || 'ver SPEC.md'}  
Stack: ${labelStack(data)} · Destino informado (opcional): ${dest}
`;
  }

  return `# Kickoff estruturado — ${name}

Leia \`AGENTS.md\` e \`SPEC.md\`. Não improvise fora do spec.

## Construir
${data.pitch || 'Ver SPEC.md.'}

- Stack: **${labelStack(data)}** (${labelApp(data)})
- Escopo: ${data.scope === 'mvp' ? 'MVP primeiro' : 'entrega completa'}
- Ação principal: ${data.mainAction || 'ver SPEC'}

## Método
1. Confirme 3 riscos ou premissas em 5 linhas.
2. Implemente \`TASKS.md\` em ordem. Uma tarefa = um contexto. Leia \`ECONOMIA.md\`.
3. Rode a verificação da tarefa. Se falhar, conserte antes da próxima.
4. Não reescreva o repo inteiro.

${data.notes?.trim() ? `## Observações do humano\n${data.notes.trim()}\n` : ''}
Aplique ANTI-SLOP.md nas telas. Destino informado (opcional): ${dest}.
`;
}

function generateCanonicalAgents(data: FormData): string {
  const mode = data.workflowMode || 'structured';
  const cmds = stackCommands(data.stack);

  return `# AGENTS.md

Instruções para agentes de código. Humanos leem o README; você lê este arquivo.

## Overview
- Projeto: ${data.projectName || 'sem nome'}
- ${labelApp(data)} em **${labelStack(data)}**${data.framework ? ` com ${data.framework}` : ''}
- Pitch: ${data.pitch || 'não informado'}
- Modo: ${modeLabel(mode)}

## Comandos
${cmds}

## Guardrails
- Não troque a stack sem o humano pedir.
- Diffs pequenos e revisáveis. Sem reescrever o que não pediu.
- Secrets só em \`.env\`; commite \`.env.example\`.
- UI/README em pt-BR; identificadores em inglês.
- Leia \`ECONOMIA.md\` antes de encher o contexto. Uma tarefa por vez.
- Leia \`ANTI-SLOP.md\` antes de UI ou copy. Abra a skill em \`skills/\` só quando a tarefa pedir.
- Não amarre o repo a um vendor. O contrato é este arquivo, não o nome da IDE.
${data.scope === 'mvp' ? '- MVP: valor usável antes de polish.\n' : '- Não corte o escopo pedido para “simplificar”.\n'}
${data.tests !== 'nenhum' ? `- Testes: ${data.tests}. Não marque pronto sem eles.\n` : ''}
${data.regulatedSector !== 'nao' ? `- Compliance: setor ${data.regulatedSector}. Não finja certificação; deixe TODOs jurídicos explícitos.\n` : ''}

## Skills (portáteis)
Qualquer agente: leia e siga. Se a ferramenta usar \`.agents/skills\` ou \`.cursor/skills\`, o zip já espelha.
${data.loopMode === 'ralph' || data.loopMode === 'gauntlet' ? `- \`LOOP.md\` + \`skills/${data.loopMode === 'ralph' ? 'ralph-loop' : 'gauntlet-loop'}/SKILL.md\` — corrida fixa. Não edite o prompt no meio.\n` : ''}
${listUseCaseSkills(data)
  .map((s) => `- \`skills/${s.name}/SKILL.md\` — ${s.description}`)
  .join('\n')}

## Verificação
Antes de encerrar uma tarefa:
1. O código roda com os comandos acima.
2. Nada de placeholder (\`// rest of code\`).
3. Passe o checklist de \`ANTI-SLOP.md\` se tocou em UI ou texto.
4. Liste o que mudou e como o humano reproduz, sem assumir qual app ele usa.

## Harness (opcional)
O humano disse que usa: ${getPromptTargetLabel(data.promptTarget)}${data.useJev ? ', com Jev só para decisão' : ''}.
Isso **não** muda o contrato. ${destinationHints(data)}
`;
}

function generateClaudeShim(data: FormData): string {
  return `@AGENTS.md

Este shim só existe porque o humano escolheu Claude Code. O contrato continua sendo AGENTS.md.

- Use as tools do ambiente. Não peça para o humano colar arquivos.
- Se existir \`SPEC.md\`, trate-o como contrato. divergência = perguntar, não adivinhar.
- Prefira editar arquivos existentes. ${data.workflowMode === 'spec' ? 'Não implemente até PLAN.md estar coerente com SPEC.md.' : 'Uma fatia de TASKS.md por vez.'}
- Aplique ANTI-SLOP.md e as skills em \`skills/\`.
`;
}

function generateAntigravityShim(data: FormData): string {
  return `# Antigravity

@AGENTS.md

Adaptador opcional. O contrato continua sendo AGENTS.md.

- Tarefa difícil, loop ou vários agentes: comece com \`/boost\`. O orquestrador reparte e verifica em escopos isolados.
- Não invente \`/loop\` nem ultracode. \`/boost\` é o fan-out deste harness.
- Não cole o kit no chat. Leia os arquivos.
- Stack: ${labelStack(data)}. Tipo: ${labelApp(data)}.
`;
}

function generateGenericShim(data: FormData, toolName: string): string {
  return `# ${toolName}

@AGENTS.md

Adaptador opcional. Não trate este projeto como “feito para ${toolName}”.
Leia ANTI-SLOP.md e \`skills/\`. Uma fatia de TASKS.md por vez.
Stack: ${labelStack(data)}. Tipo: ${labelApp(data)}.
`;
}

function generateAntiSlop(data: FormData): string {
  const taste = tasteDirection(data);
  const style = data.designStyle?.trim() || taste.mood;

  return `# ANTI-SLOP — ${data.projectName || 'projeto'}

Veto a produto que “parece IA”. Vale para UI, copy, README e commits.
Isto é contrato, não sugestão.

## Direção deste projeto
- Produto: ${data.pitch || 'ver SPEC.md'}
- Quem usa: ${data.targetAudience || 'não informado — inferir do pitch, não inventar persona de startup'}
- Ação principal: ${data.mainAction || 'fluxo principal'}
- Tom: ${style}
- Paleta âncora: ${taste.palette}
- Tipo: evite ${taste.avoid}

## Proibido (lista curta)
- Hero genérico: “Unlock your potential”, “Welcome to the future”, “Sua jornada começa aqui”
- Inter / Roboto / Arial como única fonte de display + roxo/indigo default do Tailwind
- Gradient roxo-rosa em botão primário + cards iguais em grid de 3
- Ícones lucide/heroicons sem critério, todos do mesmo peso
- Lorem ipsum, “John Doe”, “Acme Inc”, “lorem@email.com”
- Foto stock de equipe sorrindo / notebook + café
- Dark mode navy + glow neon sem pedido
- Espaçamento “tudo 24px”, cantos 16px, sombra suave em tudo
- Features inventadas para preencher a home

## Obrigatório
- Uma decisão visual explícita (tipo + cor + ritmo) escrita no README em 3 linhas
- Copy específica deste negócio — nomes, verbo e lugar reais quando o humano deu
- Estado vazio, erro e sucesso com texto útil em pt-BR
- Contraste legível; alvo de toque grande no fluxo principal
- Se não souber um fato, \`[NEEDS CLARIFICATION]\` — não preencha com slop

## Checklist antes de entregar UI
- [ ] Dá para reconhecer o produto num print sem o logo?
- [ ] Tirei uma frase que qualquer outro site poderia ter?
- [ ] A paleta não é o default do framework?
- [ ] O CTA é a ação principal (${data.mainAction || 'ver SPEC'}), não “Saiba mais”?
`;
}

function tasteDirection(data: FormData): { mood: string; palette: string; avoid: string } {
  switch (data.patternId) {
    case 'landing':
      return { mood: 'calmo e direto, uma tela', palette: 'cor quente de convite + fundo claro papel', avoid: 'hero de SaaS com 3 cards de feature' };
    case 'portfolio':
      return { mood: 'editorial, tipografia grande', palette: 'preto/creme ou um acento só', avoid: 'grid de projetos idênticos com overlay escuro' };
    case 'loja':
      return { mood: 'catálogo respirável, foto em primeiro', palette: 'neutro + um acento de compra', avoid: 'mega-menu e banner carrossel genérico' };
    case 'saas':
      return { mood: 'denso e operacional, painel de trabalho', palette: 'superfície fria + acento semântico (ok/erro)', avoid: 'onboarding de 6 slides e ilustração undraw' };
    case 'blog':
      return { mood: 'leitura longa, medida de linha curta', palette: 'papel + tinta, sem chrome', avoid: 'newsletter popup no primeiro segundo' };
    case 'chat-ia':
      return { mood: 'conversa, não dashboard', palette: 'fundo quieto + bolha do usuário distinta', avoid: 'sidebar de chats com sparkles e gradient no send' };
    case 'app-flutter':
      return { mood: 'nativo do SO, poucos ecrãs', palette: 'Material/Cupertino só como base + acento do negócio', avoid: 'FAB + cards brancos em cinza 50' };
    case 'api':
      return { mood: 'docs sóbrias, exemplos reais', palette: 'mono + um acento', avoid: 'landing de “developer platform”' };
    case 'automacao':
      return { mood: 'CLI honesta, progresso visível', palette: 'terminal, sem ASCII art', avoid: 'wizard colorido de 8 passos' };
    default:
      if (data.appType === 'website') {
        return { mood: data.designStyle || 'específico do pitch', palette: 'derivar do negócio, não do framework', avoid: 'template de agência' };
      }
      return { mood: 'funcional e reconhecível', palette: 'sistema do alvo (web/app/CLI), com um acento', avoid: 'tema default intocado' };
  }
}

function generateSpecKernel(data: FormData): string {
  const features = data.features.length
    ? data.features.map((f) => `- ${f}`).join('\n')
    : '- (definir a partir do pitch)';
  const collected = data.collectsData === 'sim'
    ? data.collectedDataTypes
        .map((v) => collectedDataOptions.find((o) => o.value === v)?.label || v)
        .join(', ')
    : 'não coleta (declarado)';

  return `# SPEC — ${data.projectName || 'projeto'}

## Why
${data.pitch || 'Ainda sem pitch — preencher antes de implementar.'}

## Capabilities
${features}

- Ação principal do usuário: ${data.mainAction || 'a definir'}
- Auth: ${data.hasAuth === 'sim' ? data.authType || 'sim' : 'não'}
- Persistência: ${data.storesData === 'sim' ? data.storageType || 'sim' : 'não'}
- Integrações: ${data.integrations || 'nenhuma'}

## Constraints
- Stack: ${labelStack(data)}
- Tipo: ${labelApp(data)}
- Offline: ${data.offlineSupport}
- A11y: ${data.accessibility}
- Idioma da UI: ${data.languages === 'ptbr' ? 'pt-BR' : 'multi'}
- Tema: ${data.theme}
- Dados pessoais: ${collected}
- Setor: ${data.regulatedSector}
${data.notes?.trim() ? `- Notas: ${data.notes.trim()}\n` : ''}
## Non-goals
- Não reescrever em outra linguagem.
- Não adicionar features fora desta spec sem atualizar o arquivo.
${data.scope === 'mvp' ? '- Não polish visual além do necessário para o fluxo principal.\n' : ''}
## Success signal
O usuário consegue completar: **${data.mainAction || 'o fluxo principal'}**.
Os entregáveis pedidos (${data.deliverables.join(', ') || 'codigo'}) existem e os comandos de \`AGENTS.md\` passam.
`;
}

function generateTasks(data: FormData): string {
  const name = data.projectName || 'app';
  return `# TASKS — ${name}

Uma tarefa = um agente com contexto limpo. Não faça 1–7 no mesmo turno se o contexto já estiver cheio.

- [ ] T1 — Scaffold ${labelStack(data)} + README + \`.env.example\`
- [ ] T2 — Modelo de dados / contratos do domínio (${data.storesData === 'sim' ? data.storageType || 'storage' : 'in-memory ok no MVP'})
- [ ] T3 — Fluxo principal: ${data.mainAction || 'happy path'}
${data.hasAuth === 'sim' ? `- [ ] T4 — Auth (${data.authType || 'a definir'})\n` : '- [ ] T4 — Sem auth: garantir rotas públicas e estados vazios\n'}
- [ ] T5 — UI do fluxo principal (pt-BR, teclado, vazio/erro/sucesso) + ANTI-SLOP.md + skill ui-taste
${data.tests !== 'nenhum' ? `- [ ] T6 — Testes (${data.tests}) no domínio do fluxo principal\n` : '- [ ] T6 — Smoke manual documentado no README\n'}
${data.deliverables.includes('docker') ? '- [ ] T7 — Container + healthcheck\n' : ''}${data.deliverables.includes('ci') ? '- [ ] T8 — Pipeline CI (lint/test)\n' : ''}
Cada item: implementar → verificar → só então o próximo.
`;
}

function generateConstitution(data: FormData): string {
  return `# Constitution

Governança do projeto. O código serve a \`SPEC.md\`.

1. Spec é a fonte da verdade. Chat sem atualizar SPEC não vale como requisito.
2. Ambiguidade vira \`[NEEDS CLARIFICATION]\`, não chute.
3. Stack ${labelStack(data)} é lei até o humano mudar a constitution.
4. Fatias pequenas; verificação no fim de cada tarefa.
5. Segurança: inputs validados, secrets fora do git.
6. ${data.scope === 'mvp' ? 'YAGNI no MVP.' : 'Não omitir o escopo completo pedido.'}
7. Qualidade: ${data.codeQuality}. Testes: ${data.tests}.
8. ANTI-SLOP.md é lei de UI/copy. Skills em \`skills/\` são procedimentos, não enfeite.
9. O repo não pertence a um vendor. Adaptadores de ferramenta são opcionais.
`;
}

function generatePlan(data: FormData): string {
  return `# PLAN — ${data.projectName || 'projeto'}

## Abordagem
Implementar ${labelApp(data)} em ${labelStack(data)}.
${data.performanceTarget ? `Performance alvo: ${data.performanceTarget}.\n` : ''}
## Módulos
1. Bootstrap e tooling
2. Domínio / persistência
3. Interface do fluxo principal
4. Integrações (${data.integrations || 'nenhuma'})
5. Qualidade (${data.tests}, ${data.deliverables.join(', ')})

## Riscos
- Stack e tipo precisam continuar alinhados (não gerar Kotlin num projeto Dart).
${data.regulatedSector !== 'nao' ? `- Setor ${data.regulatedSector}: isolamento de dados e avisos legais.\n` : ''}
## Ordem
Seguir \`TASKS.md\`. Não pular T1.
`;
}

function generateCursorRule(data: FormData): string {
  return `---
description: Regras do projeto ${data.projectName || 'WebBrief'}
alwaysApply: true
---

Leia AGENTS.md e SPEC.md (se existir) antes de editar.

- Stack: ${labelStack(data)}
- Tipo: ${labelApp(data)}
- Modo: ${modeLabel(data.workflowMode || 'structured')}
- Sem placeholders. Sem trocar de linguagem.
- Prefira editar arquivos existentes. Diffs pequenos.
`;
}

function getPromptTargetLabel(target: PromptTarget | undefined): string {
  return harnessLabel(target);
}

function destinationHints(data: FormData): string {
  switch (data.promptTarget) {
    case 'cursor':
      return 'Há um adaptador \`.cursor/rules/project.mdc\` só porque foi pedido.';
    case 'claude-code':
      return 'Há um \`CLAUDE.md\` só porque foi pedido.';
    case 'codex':
      return 'Mantenha AGENTS.md curto (~32 KiB). Sem pasta de vendor obrigatória.';
    case 'gemini':
      return 'Há um \`GEMINI.md\` só porque foi pedido.';
    case 'antigravity':
      return 'Há um `GEMINI.md` que manda a tarefa difícil começar com /boost. Vários agentes, escopos isolados.';
    case 'opencode':
      return 'Há um \`AGENTS.override.md\` só porque foi pedido.';
    case 'windsurf':
      return 'Há \`.windsurfrules\` só porque foi pedido.';
    case 'pi':
      return 'Skills também em `.pi/skills`. O Pi carrega a descrição e abre o SKILL.md sob demanda.';
    case 'omp':
      return 'OMP lê AGENTS.md e `.agents/skills`. Não duplique a regra em configs de outros agentes.';
    case 'kilo':
      return 'Exploração em subagente. O chat principal fica com a tarefa e o resumo.';
    case 'cline':
      return 'Uma tarefa por sessão. Erro repetido: contexto novo, não mais prompt.';
    case 'crush':
      return 'Não ligue MCP que esta tarefa não usa.';
    case 'dsh':
      return 'Retome ou faça fork da sessão. Não reenvie o histórico.';
    default:
      return 'Nenhum adaptador de vendor. Abra a pasta ou cole só KICKOFF e a tarefa atual.';
  }
}

function toolHowToName(target: PromptTarget): string {
  return promptTargetOptions.find((o) => o.value === target)?.label || 'o agente que você usa';
}

function adapterHowToLine(target: PromptTarget): string {
  switch (target) {
    case 'cursor':
      return '- Adaptador deste kit: `.cursor/rules/project.mdc`';
    case 'claude-code':
      return '- Adaptador deste kit: `CLAUDE.md`';
    case 'gemini':
      return '- Adaptador deste kit: `GEMINI.md`';
    case 'antigravity':
      return '- Adaptador deste kit: `GEMINI.md` (Antigravity: tarefa difícil começa com `/boost`)';
    case 'opencode':
      return '- Adaptador deste kit: `AGENTS.override.md`';
    case 'windsurf':
      return '- Adaptador deste kit: `.windsurfrules`';
    case 'pi':
      return '- Skills deste kit também em `.pi/skills/` (o Pi lê descrição primeiro)';
    case 'omp':
      return '- Oh My Pi usa `AGENTS.md` e `.agents/skills/` — sem pasta extra de vendor';
    default:
      return '- Sem adaptador de ferramenta: só os arquivos portáteis.';
  }
}

function stackCommands(stack: FormData['stack']): string {
  switch (stack) {
    case 'typescript':
    case 'javascript':
      return '- Dev: `npm run dev` / `pnpm dev`\n- Test: `npm test`\n- Lint/typecheck: `npm run lint`';
    case 'php':
      return '- Dev: `php artisan serve` ou o servidor da hospedagem\n- Test: `php artisan test` / PHPUnit';
    case 'ruby':
      return '- Dev: `bin/dev` ou `rails s`\n- Test: `bin/rails test` ou RSpec';
    case 'python':
      return '- Dev: `uv run` / `python -m`\n- Test: `pytest`\n- Lint: `ruff check`';
    case 'go':
      return '- Dev: `go run .`\n- Test: `go test ./...`\n- Vet: `go vet ./...`';
    case 'rust':
      return '- Dev: `cargo run`\n- Test: `cargo test`\n- Lint: `cargo clippy`';
    case 'csharp':
      return '- Dev: `dotnet run`\n- Test: `dotnet test`\n- Build: `dotnet build`';
    case 'dart':
      return '- Dev: `flutter run` / `dart run`\n- Test: `flutter test`';
    case 'kotlin':
    case 'java':
      return '- Build: Gradle/`./mvnw`\n- Test: task `test` do build';
    case 'swift':
      return '- Build/test: Xcode ou `swift test`';
    case 'cpp':
      return '- Build: CMake + Ninja\n- Test: ctest';
    default:
      return '- Documente install/dev/test no README e siga esses comandos.';
  }
}

function labelApp(data: FormData): string {
  return appTypeOptions.find((o) => o.value === data.appType)?.label || data.appType || 'app';
}

function labelStack(data: FormData): string {
  return stackOptions.find((o) => o.value === data.stack)?.label || data.stack || 'a definir';
}

function modeLabel(mode: WorkflowMode): string {
  if (mode === 'rapid') return 'rápido (kickoff + AGENTS.md)';
  if (mode === 'spec') return 'spec-driven (constitution → spec → plan → tasks)';
  return 'estruturado (spec curta + tasks + verificação)';
}
