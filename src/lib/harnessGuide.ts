import type { FormData, PromptTarget } from '@/types';
import { promptTargetOptions } from '@/types';

const economyByTarget: Record<PromptTarget, string> = {
  generic:
    'Se o chat não abre a pasta, cole só o Kickoff e a tarefa atual. Não cole o zip, o SPEC inteiro e todas as skills na mesma mensagem.',
  cursor:
    'A regra do projeto fica curta. O agente lê o arquivo quando precisa. Não repita AGENTS.md dentro do chat.',
  windsurf:
    'O adaptador só aponta para AGENTS.md. Não copie o mesmo texto em .windsurfrules e no prompt.',
  'claude-code':
    'CLAUDE.md é um atalho de uma linha para AGENTS.md. Busca larga vai para um subagente; o chat principal fica com o resumo.',
  codex:
    'Mantenha AGENTS.md curto. Exploração em worktree ou subagente. Um lote de arquivos por vez, com o comando de verificação no fim.',
  gemini:
    'GEMINI.md não repete o spec. Peça a próxima tarefa, não “continue de onde parou” com o histórico inteiro.',
  antigravity:
    '/boost já reparte a tarefa em agentes isolados. Não cole o kit no chat e não abra um segundo fan-out por cima.',
  pi:
    'O Pi coloca no prompt só o nome e a descrição da skill. O texto do SKILL.md entra quando a tarefa pede. Não cole skills no chat.',
  omp:
    'O Oh My Pi já lê AGENTS.md e .agents/skills, e também configs de Claude, Cursor e Codex se existirem. Não duplique a mesma regra em cinco arquivos.',
  opencode:
    'O override é curto de propósito. Skills ficam no disco. Não reenvie o histórico quando for só seguir a próxima tarefa.',
  kilo:
    'Mande exploração para um subagente em background. O agente principal recebe o resumo, não o log da busca.',
  cline:
    'Uma tarefa por sessão. Se o mesmo erro voltou duas vezes, abra um contexto novo com a tarefa e o erro — não empurre mais prompt.',
  crush:
    'Harness enxuto. Cada servidor MCP que você liga gasta contexto em toda mensagem, mesmo sem ser usado.',
  dsh:
    'A sessão é um log. Retome ou faça fork. Não cole de novo o que o harness já guardou.',
};

export function harnessLabel(target: PromptTarget | undefined): string {
  return promptTargetOptions.find((option) => option.value === (target || 'generic'))?.label || 'Qualquer agente';
}

export function economyNote(target: PromptTarget | undefined): string {
  return economyByTarget[target || 'generic'];
}

export function tokenTips(data: Pick<FormData, 'promptTarget' | 'useJev'>): string[] {
  const tips = [
    'Descompacte o zip na pasta. O agente lê o arquivo; colar o kit no chat gasta o contexto à toa.',
    'Uma tarefa de TASKS.md por conversa. Contexto novo sai mais barato do que contexto inchado.',
    'A skill entra pela descrição. O texto completo só quando a tarefa pede.',
    economyNote(data.promptTarget),
  ];
  if (data.useJev) {
    tips.push(
      'Jev decide o que mostrar, qual ferramenta cabe e se vale o modelo caro. Quem escreve o código continua sendo o harness que você escolheu.',
    );
  }
  return tips;
}

export function generateEconomia(data: FormData): string {
  const name = harnessLabel(data.promptTarget);
  const jev = data.useJev
    ? `
## Jev (ligado neste kit)
Jev não escreve código e não substitui ${name}. É um classificador rápido (System One) para decisão, não para texto.

- Use para: qual skill abrir, qual ferramenta cabe, se o comando pode rodar, se vale compactar, se a tarefa cabe num modelo barato.
- Não use para: gerar a tela, inventar copy, “pensar” a arquitetura.
- Se o Jev estiver fora do ar, siga o harness normal. Não trave a tarefa esperando o classificador.
- Não mande o repositório inteiro para o Jev. Mande o trecho da decisão.
`
    : `
## Jev (desligado)
Este kit não pede Jev. Se mais tarde você ligar (\`pi-jev\`, \`jev-use\` ou \`jev-harness\`), use só para decisão: skill, ferramenta, permissão, compactação. O código continua saindo do harness.
`;

  return `# Economia de tokens — ${data.projectName || 'projeto'}

O harness escolhido foi **${name}**. O modelo escreve; o harness decide o que entra no contexto. Encher o chat não deixa o agente mais inteligente.

## Sempre
- Leia arquivos do disco. Não peça o zip colado no chat.
- Uma fatia de \`TASKS.md\` por contexto. Terminou, verificou, próximo chat ou próxima fatia limpa.
- \`AGENTS.md\` fica curto. Detalhe mora em \`SPEC.md\`, \`TASKS.md\` e \`skills/\`.
- Não ligue MCP, LSP extra ou subagente que esta tarefa não usa. A descrição da ferramenta ocupa contexto em toda mensagem.
- Busca larga: subagente ou comando, e de volta só o resumo.
- Sessão longa: compacte ou abra outro chat com o Kickoff e a próxima tarefa. Não diga “continue” em cima de um histórico morto.
- Erro repetido duas vezes: pare, troque o contexto, leve só o erro e a tarefa. Não reescreva o repo.

## Neste harness
${economyNote(data.promptTarget)}
${jev}
## O que não economiza
- Apagar o spec para “ficar mais curto” e deixar o agente inventar requisito.
- Trocar de harness no meio da tarefa sem ler de novo o AGENTS.md.
`;
}
