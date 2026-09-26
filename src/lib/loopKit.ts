import type { FormData, PromptTarget } from '@/types';
import { harnessLabel } from '@/lib/harnessGuide';

export type LoopMode = 'off' | 'ralph' | 'gauntlet';

export function normalizeLoopMode(value: unknown): LoopMode {
  return value === 'ralph' || value === 'gauntlet' ? value : 'off';
}

export function loopLabel(mode: LoopMode | undefined): string {
  if (mode === 'ralph') return 'Ralph loop';
  if (mode === 'gauntlet') return 'Gauntlet loop';
  return 'Sem loop';
}

function needsBaseline(data: FormData): boolean {
  return data.appType === 'api' || data.appType === 'cli' || data.appType === 'docker' || data.tests !== 'nenhum';
}

function harnessRunLine(target: PromptTarget | undefined): string {
  switch (target) {
    case 'claude-code':
      return 'Fan-out com subagentes. Em cada peça use /loop. O crítico é outro subagente, contexto limpo. Ultracode só no turno que orquestra.';
    case 'codex':
      return 'Fan-out com subagentes. Feche cada peça com /goal. O crítico é outro agente, contexto limpo. Não invente /loop.';
    case 'antigravity':
      return 'Comece com /boost. O orquestrador reparte builder e crítico em escopos isolados e verifica de novo antes de entregar. Não invente /loop.';
    default:
      return `No ${harnessLabel(target)}, builder e crítico são subagentes separados, cada um com contexto limpo. Repita. Não fixe um número de voltas.`;
  }
}

function barText(data: FormData): string {
  const bar = data.qualityBar?.trim();
  return bar || '';
}

export function generateLoopPrompt(data: FormData): string {
  const name = data.projectName || 'o projeto';
  const goal = data.pitch || 'o produto descrito em SPEC.md';
  const stack = data.framework ? `${data.stack} / ${data.framework}` : data.stack || 'a stack de AGENTS.md';
  const action = data.mainAction || 'o fluxo principal';
  const notes = data.notes?.trim();

  if (data.loopMode === 'ralph') {
    return `# Ralph loop — ${name}

Este texto não se edita no meio da corrida. A memória é o disco. Cada volta abre um contexto novo, lê o repo e continua.

Construa ${goal}. Stack: ${stack}. A pessoa tem que conseguir: ${action}.
Leia AGENTS.md e SPEC.md se existirem. Não troque a stack. Não aumente o escopo.

Cada volta: olhe o que já passa, faça o menor diff que aproxima a checagem, rode o comando, pare se passou.
${data.promptTarget === 'antigravity' ? 'Nesta volta, comece com /boost para o orquestrador separar quem implementa de quem verifica. Não use /loop.\n' : ''}
Checagem: ${data.tests !== 'nenhum' ? `os testes (${data.tests}) passam e ` : ''}dá para completar “${action}” com os comandos de AGENTS.md.
Se falhar, a próxima volta começa do zero no chat e do disco como está. Não reescreva este arquivo.
${notes ? `Limite que reprova a volta: ${notes}.\n` : ''}Pare quando a checagem passar, ou quando o humano interromper. Você é o freio só se mandar parar.
`;
  }

  const bar = barText(data);
  if (!bar) {
    return `# Gauntlet — ${name} — ainda sem barra

Não comece a construir.

O objetivo é: ${goal}. Stack prevista: ${stack}. Ação: ${action}.

Ofereça 2 ou 3 barras e pare. Cada barra tem que ser as três coisas ao mesmo tempo:
- Nomeada: uma página, um texto, um repo, uma suíte, um número. Não uma categoria (“design premiado”).
- Alcançável pelo crítico: ele consegue abrir, rodar, ler ou medir. Se não conseguir, a comparação é inventada.
- Comparável: as duas coisas lado a lado, sem rótulo, e o crítico escolhe uma.

Não escreva o prompt de execução nesta volta. Espere o humano escolher.
`;
  }

  const baseline = needsBaseline(data)
    ? ' Se a rodada cuspir um número, imprima ao lado o preditor constante, o preditor aleatório e as duas distribuições de rótulos. Número que não vence o constante é rodada falha.'
    : '';

  return `# Gauntlet loop — ${name}

Construa ${goal} no nível de ${bar}. Tem que aguentar comparação direta, da ação “${action}” até o resto que essa barra exige. Stack: ${stack}. Não prescreva a arquitetura além da stack.

Divida no menor pedaço que dá para melhorar sozinho. Cada pedaço tem um builder e um crítico separado. O crítico abre o artefato de verdade — tela, comando, teste — e nunca o resumo do builder. Contexto do crítico é limpo: ele não sabe o quanto o builder penou.
${harnessRunLine(data.promptTarget)}

Não pare até o crítico, vendo o nosso trabalho e ${bar} lado a lado sem saber qual é qual, escolher o nosso. Escolha, não nota de 0 a 10. Sem número fixo de voltas.${baseline}
${notes ? `Se cruzar este limite, o crítico reprova na hora: ${notes}.\n` : ''}Se houver progress.html, cada linha leva horário real. Não invente histórico.
O humano é o freio. Continue até o nosso ganhar ou até ele mandar parar. Não edite este prompt no meio.
`;
}

export function generateLoopSkill(data: FormData): { name: string; label: string; description: string; content: string } {
  const ralph = data.loopMode === 'ralph';
  const name = ralph ? 'ralph-loop' : 'gauntlet-loop';
  const title = ralph ? 'Ralph loop' : 'Gauntlet loop';
  const description = ralph
    ? 'Repete o mesmo pedido em contexto novo até a checagem passar. Não edite o prompt no meio.'
    : 'Monta ou roda um gauntlet: barra nomeada, builder e crítico isolados, comparação cega.';

  const body = ralph
    ? `## Faça
1. Leia \`LOOP.md\`. Não reescreva.
2. Uma volta = um contexto novo. A memória está nos arquivos.
3. Rode a checagem do LOOP.md. Se falhar, o harness chama de novo com o mesmo arquivo.
4. Não alargue o pedido para “deixar mais bonito”.

## Não faça
- Editar LOOP.md porque a volta falhou.
- Marcar pronto sem o comando ter passado.
`
    : `## Faça
1. Se \`LOOP.md\` pedir barras, ofereça 2 ou 3 e pare. Não construa.
2. Se a barra já estiver nomeada, rode esse prompt numa sessão nova. Não edite os três blocos (tarefa, método, barra).
3. Builder e crítico não são a mesma sessão. O crítico escolhe um dos dois, sem nota.
4. Diga “só o texto” se o humano quiser o prompt sem executar.

## Não faça
- Barra vaga (“incrível”, “premiado”).
- Crítico que lê o diário do builder.
- Parar numa nota alta ou num número fixo de voltas.
${needsBaseline(data) ? '- Publicar métrica sem o preditor constante e o aleatório ao lado.\n' : ''}
## Crédito
Técnica: Matt Shumer (Gauntlet Loop). Este arquivo é o gerador do PromptGen, não uma cópia das skills de RoboNuggets, gauntletx ou duolahypercho.
`;

  return {
    name,
    label: title,
    description,
    content: `---
name: ${name}
description: ${description}
---

# ${title}

${body}
O prompt desta corrida está em \`LOOP.md\`. Harness previsto: ${harnessLabel(data.promptTarget)}.
`,
  };
}
