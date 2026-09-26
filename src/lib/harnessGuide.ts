import type { FormData, PromptTarget } from '@/types';
import { harnessLabelFor, tokenTipsFor } from '@/i18n/options';
import type { Locale } from '@/i18n/types';

export function harnessLabel(target: PromptTarget | undefined, locale: Locale = 'pt'): string {
  return harnessLabelFor(locale, target);
}

export function tokenTips(
  data: Pick<FormData, 'promptTarget' | 'useJev'>,
  locale: Locale = 'pt',
): string[] {
  return tokenTipsFor(locale, data);
}

export function generateEconomia(data: FormData): string {
  const name = harnessLabelFor('pt', data.promptTarget);
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
- Uma tarefa de TASKS.md por conversa.
- Skills entram pela descrição; o texto completo só quando a tarefa pede.

## Dica para ${name}
${tokenTipsFor('pt', data)[3]}

${jev}
`;
}
