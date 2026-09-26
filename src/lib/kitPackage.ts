import type { FormData } from '@/types';
import { harnessLabel } from '@/lib/harnessGuide';
import { generateLegacyPromptText, generateTOON } from '@/lib/promptGenerator';
import { generateVibeKit, type KitFile } from '@/lib/vibeKit';

function modeLabel(mode: FormData['workflowMode']): string {
  if (mode === 'vibe') return 'vibe';
  if (mode === 'spec') return 'spec-driven';
  return 'estruturado';
}

function targetLabel(target: FormData['promptTarget']): string {
  return harnessLabel(target);
}

function generateManifest(data: FormData, files: KitFile[]): string {
  const list = files.map((f) => `- \`${f.path}\` — ${f.description}`).join('\n');
  return `# Manifesto do kit — ${data.projectName || 'projeto'}

Pacote gerado pelo PromptGen. Descompacte **na raiz** da pasta do projeto.

## Esquema deste zip
- Ritmo: **${modeLabel(data.workflowMode)}**
- Harness: **${targetLabel(data.promptTarget)}**${data.useJev ? ' + Jev (só decisão)' : ''}
- Economia: \`ECONOMIA.md\` — uma tarefa por contexto, skills sob demanda
- Loop: **${data.loopMode === 'ralph' ? 'Ralph' : data.loopMode === 'gauntlet' ? 'Gauntlet' : 'nenhum'}**${data.loopMode === 'gauntlet' && data.qualityBar?.trim() ? ` · barra: ${data.qualityBar.trim()}` : ''}
- Tipo: ${data.appType || '—'} · stack: ${data.stack || '—'} · framework: ${data.framework || '—'}
- Modelo: ${data.patternId || 'livre'}

## O que entra em cada esquema
- **Sempre:** COMO-USAR, KICKOFF, AGENTS, ECONOMIA, ANTI-SLOP, \`skills/\`, \`prompts/PROMPT.md\`, config
- **Estruturado / spec:** SPEC.md + TASKS.md
- **Spec-driven:** \`.specify/CONSTITUTION.md\` + PLAN.md
- **Cursor:** \`.cursor/rules/project.mdc\` + cópia das skills em \`.cursor/skills/\`
- **Claude Code:** CLAUDE.md + cópia em \`.claude/skills/\`
- **Gemini / Antigravity / OpenCode / Windsurf:** o shim pedido na raiz
- **Antigravity:** \`/boost\` para vários agentes; não usar \`/loop\`
- **Pi:** cópia das skills em \`.pi/skills/\`

## Arquivos
${list}
`;
}

export function assembleDownloadPackage(data: FormData): KitFile[] {
  const kit = generateVibeKit(data);
  const extras: KitFile[] = [
    {
      id: 'prompt-full',
      path: 'prompts/PROMPT.md',
      label: 'Prompt',
      description: 'Prompt completo (legado) para colar no chat se a ferramenta não ler o disco',
      content: generateLegacyPromptText(data),
    },
    {
      id: 'toon',
      path: 'prompts/config.toon',
      label: 'TOON',
      description: 'Config compacta do formulário',
      content: generateTOON(data),
    },
    {
      id: 'config',
      path: 'promptgen-config.json',
      label: 'Config',
      description: 'JSON para reimportar no PromptGen',
      content: `${JSON.stringify(data, null, 2)}\n`,
    },
  ];

  const skills = kit.filter((f) => f.path.startsWith('skills/'));
  for (const skill of skills) {
    extras.push({
      ...skill,
      id: `agents-${skill.id}`,
      path: `.agents/skills/${skill.path.slice('skills/'.length)}`,
      description: `${skill.description} (cópia .agents)`,
    });
  }
  if (data.promptTarget === 'cursor') {
    for (const skill of skills) {
      extras.push({
        ...skill,
        id: `cursor-${skill.id}`,
        path: `.cursor/skills/${skill.path.slice('skills/'.length)}`,
        description: `${skill.description} (cópia Cursor)`,
      });
    }
  }
  if (data.promptTarget === 'pi') {
    for (const skill of skills) {
      extras.push({
        ...skill,
        id: `pi-${skill.id}`,
        path: `.pi/skills/${skill.path.slice('skills/'.length)}`,
        description: `${skill.description} (cópia Pi)`,
      });
    }
  }
  if (data.promptTarget === 'claude-code') {
    for (const skill of skills) {
      extras.push({
        ...skill,
        id: `claude-${skill.id}`,
        path: `.claude/skills/${skill.path.slice('skills/'.length)}`,
        description: `${skill.description} (cópia Claude Code)`,
      });
    }
  }

  const all = [...kit, ...extras];
  all.push({
    id: 'manifest',
    path: 'MANIFEST.md',
    label: 'Manifesto',
    description: 'O que este zip contém e por quê',
    content: generateManifest(data, all),
  });
  return all;
}
