import type { FormData, PromptTarget, Stack } from '@/types';
import { collectedDataOptions } from '@/types';
import { harnessLabel } from '@/lib/harnessGuide';
import { generateKickoff } from '@/lib/agentKit';

export function generatePromptText(data: FormData): string {
  return generateKickoff(data);
}

export function generateLegacyPromptText(data: FormData): string {
  const hoje = new Date().toLocaleDateString('pt-BR');
  const collected = formatCollectedTypes(data);
  const sector = getRegulatedSectorLabel(data.regulatedSector);

  let prompt = `# PROMPT PARA CRIAÇÃO DE APLICAÇÃO

> **Gerado em:** ${hoje}
> **Ferramenta:** WebBrief
> **Destino:** ${getPromptTargetLabel(data.promptTarget)}
> **Prioridade:** as regras da Seção 7 valem sobre qualquer outra instrução.

---

## 1) CONTEXTO GERAL

**Tipo de aplicação:** ${getAppTypeLabel(data.appType)}
**Stack/Linguagem:** ${getStackLabel(data.stack)}
**Nome do projeto:** ${data.projectName || 'Não definido'}
**Objetivo (pitch):** ${data.pitch || 'Não definido'}
**Público-alvo:** ${data.targetAudience || 'Não definido'}
**Ação principal do usuário:** ${data.mainAction || 'Não definido'}

---

## 2) REQUISITOS FUNCIONAIS

**Funcionalidades principais:**
${data.features.length > 0 ? data.features.map((f) => `- ${getFeatureLabel(f)}`).join('\n') : '- A definir pela IA'}

**Autenticação:** ${data.hasAuth === 'sim' ? `Sim - ${data.authType}` : 'Não necessária'}
**Armazena dados:** ${data.storesData === 'sim' ? `Sim - ${data.storageType}` : 'Não'}
**Integrações externas:** ${data.integrations || 'Nenhuma'}

---

## 3) REQUISITOS NÃO-FUNCIONAIS

**Suporte offline:** ${getOfflineLabel(data.offlineSupport)}
**Performance alvo:** ${data.performanceTarget || 'Padrão'}
**Acessibilidade:** ${data.accessibility === 'basica' ? 'Básica (teclado + contraste)' : 'Avançada (WCAG 2.2 AA)'}
**Idiomas:** ${data.languages === 'ptbr' ? 'Português brasileiro (pt-BR)' : 'Multi-idioma'}
**Tema:** ${getThemeLabel(data.theme)}

---

## 4) SEGURANÇA, LEGAL E AUTORIA

**Coleta dados pessoais:** ${data.collectsData === 'sim' ? `Sim (${collected})` : 'Não'}
**Setor regulado:** ${sector}
**Licenças de conteúdo:** ${data.licensesSource === 'licenca-livre' ? 'Apenas licença livre/uso comercial' : 'A verificar'}

**Créditos/autoria:** ${data.creditsText || 'Não especificado'}
**Local dos créditos:** ${data.creditsLocation || 'README'}
`;

  prompt += getComplianceBlock(data);

  prompt += `
---

## 5) ENTREGÁVEIS E QUALIDADE

**O que entregar:** ${data.deliverables.map((d) => getDeliverableLabel(d)).join(', ') || 'Código fonte'}
**Escopo:** ${data.scope === 'mvp' ? 'MVP (mínimo viável)' : 'Completo'}
**Qualidade de código:** ${getQualityLabel(data.codeQuality)}
**Testes:** ${getTestsLabel(data.tests)}
**Nível de segurança:** ${getSecurityLabel(data.securityLevel)}

---

## 6) MÓDULO ESPECÍFICO: ${getAppTypeLabel(data.appType).toUpperCase()}

`;

  prompt += generateSpecificModule(data);
  prompt += `\n---\n\n`;
  prompt += getUniversalRulesText(data);
  prompt += getToolProfileBlock(data.promptTarget);

  prompt += `

---

## 8) INSTRUÇÕES E OBSERVAÇÕES FINAIS

### Observações do Projeto:
${data.notes?.trim() || 'Nenhuma'}

---

Revise o prompt antes de enviar. A stack escolhida (${getStackLabel(data.stack)}) deve ser respeitada em todo o código.

*WebBrief* — https://vitorhub.com`;

  return prompt;
}

export function generateTOON(data: FormData): string {
  let toon = `PROMPT_CONFIG [v2026]\n`;
  toon += `TARGET: ${data.promptTarget || 'generic'}\n`;
  toon += `\nSECTION: GENERAL_CONTEXT\n`;
  toon += `  TYPE: ${getAppTypeLabel(data.appType)}\n`;
  toon += `  STACK: ${getStackLabel(data.stack)}\n`;
  toon += `  PROJECT_NAME: ${data.projectName || 'Not Defined'}\n`;
  toon += `  PITCH: ${data.pitch || 'Not Defined'}\n`;
  toon += `  TARGET_AUDIENCE: ${data.targetAudience || 'Not Defined'}\n`;
  toon += `  MAIN_ACTION: ${data.mainAction || 'Not Defined'}\n`;

  toon += `\nSECTION: FUNCTIONAL_REQUIREMENTS\n`;
  if (data.features.length > 0) {
    toon += `  FEATURES_LIST:\n`;
    data.features.forEach((f) => {
      toon += `    - ${getFeatureLabel(f)}\n`;
    });
  } else {
    toon += `  FEATURES_LIST: To be defined by AI\n`;
  }
  toon += `  AUTH: ${data.hasAuth === 'sim' ? `Yes (${data.authType})` : 'Not Required'}\n`;
  toon += `  DATA_STORAGE: ${data.storesData === 'sim' ? `Yes (${data.storageType})` : 'No'}\n`;
  toon += `  INTEGRATIONS: ${data.integrations || 'None'}\n`;

  toon += `\nSECTION: NON_FUNCTIONAL_REQUIREMENTS\n`;
  toon += `  OFFLINE_SUPPORT: ${getOfflineLabel(data.offlineSupport)}\n`;
  toon += `  PERFORMANCE: ${data.performanceTarget || 'Standard'}\n`;
  toon += `  ACCESSIBILITY: ${data.accessibility === 'basica' ? 'Basic' : 'Advanced (WCAG 2.2 AA)'}\n`;
  toon += `  LANGUAGES: ${data.languages === 'ptbr' ? 'Portuguese (BR)' : 'Multi-language'}\n`;
  toon += `  THEME: ${getThemeLabel(data.theme)}\n`;

  toon += `\nSECTION: SECURITY_AND_LEGAL\n`;
  toon += `  DATA_COLLECTION: ${data.collectsData === 'sim' ? `Yes (${formatCollectedTypes(data)})` : 'No'}\n`;
  toon += `  REGULATED_SECTOR: ${getRegulatedSectorLabel(data.regulatedSector)}\n`;
  toon += `  CONTENT_LICENSE: ${data.licensesSource}\n`;
  toon += `  CREDITS: ${data.creditsText || 'None'} (${data.creditsLocation || 'README'})\n`;

  toon += `\nSECTION: DELIVERABLES_AND_QUALITY\n`;
  toon += `  ITEMS: ${data.deliverables.map((d) => getDeliverableLabel(d)).join(', ')}\n`;
  toon += `  SCOPE: ${data.scope === 'mvp' ? 'MVP' : 'Full'}\n`;
  toon += `  CODE_QUALITY: ${getQualityLabel(data.codeQuality)}\n`;
  toon += `  TESTS: ${getTestsLabel(data.tests)}\n`;
  toon += `  SECURITY_LEVEL: ${getSecurityLabel(data.securityLevel)}\n`;

  toon += `\nSECTION: SPECIFIC_MODULE_${data.appType.toUpperCase()}\n`;
  const specificModuleText = generateSpecificModule(data).replace(/\n/g, '\n  ');
  toon += `  DETAILS:\n  ${specificModuleText}\n`;

  toon += `\nSECTION: RULES_REF\n`;
  getRuleFlags(data).forEach((flag) => {
    toon += `  - ${flag}\n`;
  });

  toon += `\nSECTION: FINAL_NOTES\n`;
  toon += `  NOTES: ${data.notes || 'None'}\n`;

  return toon;
}

export function generateXML(data: FormData): string {
  const escape = (str: unknown) =>
    String(str).replace(/[<>&"']/g, (c) => {
      switch (c) {
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '&':
          return '&amp;';
        case '"':
          return '&quot;';
        case "'":
          return '&apos;';
        default:
          return c;
      }
    });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<PromptConfig version="2026" target="${escape(data.promptTarget || 'generic')}">\n`;
  xml += `  <GeneralContext>\n`;
  xml += `    <AppType>${escape(getAppTypeLabel(data.appType))}</AppType>\n`;
  xml += `    <Stack>${escape(getStackLabel(data.stack))}</Stack>\n`;
  xml += `    <ProjectName>${escape(data.projectName || 'Not Defined')}</ProjectName>\n`;
  xml += `    <Pitch>${escape(data.pitch || 'Not Defined')}</Pitch>\n`;
  xml += `    <TargetAudience>${escape(data.targetAudience || 'Not Defined')}</TargetAudience>\n`;
  xml += `    <MainAction>${escape(data.mainAction || 'Not Defined')}</MainAction>\n`;
  xml += `  </GeneralContext>\n`;
  xml += `  <FunctionalRequirements>\n`;
  if (data.features.length > 0) {
    xml += `    <Features>\n`;
    data.features.forEach((f) => {
      xml += `      <Feature>${escape(getFeatureLabel(f))}</Feature>\n`;
    });
    xml += `    </Features>\n`;
  }
  xml += `    <Auth>${escape(data.hasAuth === 'sim' ? data.authType : 'None')}</Auth>\n`;
  xml += `    <DataStorage>${escape(data.storesData === 'sim' ? data.storageType : 'None')}</DataStorage>\n`;
  xml += `    <Integrations>${escape(data.integrations || 'None')}</Integrations>\n`;
  xml += `  </FunctionalRequirements>\n`;
  xml += `  <NonFunctionalRequirements>\n`;
  xml += `    <OfflineSupport>${escape(getOfflineLabel(data.offlineSupport))}</OfflineSupport>\n`;
  xml += `    <PerformanceTarget>${escape(data.performanceTarget || 'Standard')}</PerformanceTarget>\n`;
  xml += `    <Accessibility>${escape(data.accessibility)}</Accessibility>\n`;
  xml += `    <Languages>${escape(data.languages)}</Languages>\n`;
  xml += `    <Theme>${escape(getThemeLabel(data.theme))}</Theme>\n`;
  xml += `  </NonFunctionalRequirements>\n`;
  xml += `  <SecurityAndLegal>\n`;
  xml += `    <DataCollection>${escape(data.collectsData === 'sim' ? 'Yes' : 'No')}</DataCollection>\n`;
  if (data.collectsData === 'sim') {
    xml += `    <CollectedTypes>${escape(formatCollectedTypes(data))}</CollectedTypes>\n`;
  }
  xml += `    <RegulatedSector>${escape(getRegulatedSectorLabel(data.regulatedSector))}</RegulatedSector>\n`;
  xml += `    <ContentLicense>${escape(data.licensesSource)}</ContentLicense>\n`;
  xml += `    <Credits>${escape(data.creditsText || 'None')}</Credits>\n`;
  xml += `  </SecurityAndLegal>\n`;
  xml += `  <Deliverables>\n`;
  data.deliverables.forEach((d) => {
    xml += `    <Item>${escape(getDeliverableLabel(d))}</Item>\n`;
  });
  xml += `    <Scope>${escape(data.scope)}</Scope>\n`;
  xml += `    <CodeQuality>${escape(getQualityLabel(data.codeQuality))}</CodeQuality>\n`;
  xml += `    <Tests>${escape(getTestsLabel(data.tests))}</Tests>\n`;
  xml += `    <SecurityLevel>${escape(getSecurityLabel(data.securityLevel))}</SecurityLevel>\n`;
  xml += `  </Deliverables>\n`;
  xml += `  <SpecificModule type="${escape(data.appType)}">\n`;
  xml += `    <![CDATA[\n${generateSpecificModule(data)}\n    ]]>\n`;
  xml += `  </SpecificModule>\n`;
  xml += `  <UniversalRules>\n`;
  xml += `    <![CDATA[\n${getUniversalRulesText(data)}\n    ]]>\n`;
  xml += `  </UniversalRules>\n`;
  xml += `  <FinalNotes>${escape(data.notes || 'None')}</FinalNotes>\n`;
  xml += `</PromptConfig>`;
  return xml;
}

export function generateAgentsMd(data: FormData): string {
  return `# Instruções do agente — ${data.projectName || 'projeto'}

## Objetivo
${data.pitch || 'Implementar a aplicação descrita no prompt gerado.'}

## Stack obrigatória
- Tipo: ${getAppTypeLabel(data.appType)}
- Linguagem: ${getStackLabel(data.stack)}
- Não troque a stack sem justificativa explícita.

## Escopo
- ${data.scope === 'mvp' ? 'MVP funcional primeiro' : 'Entrega completa'}
- Entregáveis: ${data.deliverables.map((d) => getDeliverableLabel(d)).join(', ') || 'código'}
- Testes: ${getTestsLabel(data.tests)}

## Regras
${getRuleFlags(data).map((r) => `- ${r}`).join('\n')}

## Módulo específico
${generateSpecificModule(data)}

## Observações
${data.notes?.trim() || 'Nenhuma'}

## Destino
${getToolProfileBlock(data.promptTarget)}
`;
}

function getUniversalRulesText(data: FormData): string {
  const flags = getRuleFlags(data);
  const includeArch = data.codeQuality === 'patterns' || data.codeQuality === 'arquitetura';
  const includeTests = data.tests !== 'nenhum';
  const includeDocs = data.deliverables.includes('docs');
  const includeA11y = data.accessibility === 'avancada' || data.appType === 'website' || data.appType === 'gui';
  const includePerf = Boolean(data.performanceTarget?.trim()) || data.appType === 'api' || data.appType === 'website';

  let rules = `## 7) REGRAS PARA GERAÇÃO DE CÓDIGO

> Prioridade absoluta. Só valem as regras abaixo — as demais foram omitidas de propósito.

**Ativas neste prompt:** ${flags.join(' · ')}

### 1. INTEGRIDADE DO CÓDIGO
- Proibido placeholder, \`// ... resto do código\` ou arquivos truncados.
- Todo arquivo deve ser completo, com imports explícitos.
- Arquivos >500 linhas devem ser divididos.

### 2. IDIOMA
- Código (identificadores): inglês.
- UI, README e comentários: português (pt-BR).

### 3. SEGURANÇA
- Secrets só em variáveis de ambiente; entregar \`.env.example\`.
- Validar e sanitizar todos os inputs.
- Prevenir SQL injection, XSS, CSRF e path traversal.
- Hash de senha forte (Argon2/bcrypt). Logs sem dados sensíveis.
`;

  if (data.securityLevel === 'avancada' || data.securityLevel === 'compliance') {
    rules += `
### 3.1 SEGURANÇA AVANÇADA
- Rate limiting, CORS explícito, headers de segurança e auditoria de dependências.
`;
  }

  rules += `
### 4. QUALIDADE
- ${getQualityLabel(data.codeQuality)}. Funções curtas, nomes que revelam intenção.
- Preferir imutabilidade. Sem over-engineering no MVP.
`;

  if (includeArch) {
    rules += `
### 5. ARQUITETURA
- Camadas: UI → Aplicação → Domínio → Infraestrutura.
- Sem God Classes (>300 linhas) e sem regra de negócio na UI.
- Injeção de dependências e interfaces sobre implementações concretas.
`;
  }

  rules += `
### 6. ERROS
- Fail fast. Sem catch vazio. Mensagens úteis para o usuário.
- Retry só em falhas transientes.
`;

  if (includeDocs) {
    rules += `
### 7. DOCUMENTAÇÃO
- README com descrição, pré-requisitos, instalação, como rodar, testes e env.
- Explicar a estrutura de pastas.
`;
  }

  if (includeTests) {
    const coverage = data.tests === 'e2e' ? '70%+ no domínio + e2e do fluxo principal' : data.tests === 'integracao' ? 'testes de integração nos contratos' : 'testes unitários do domínio';
    rules += `
### 8. TESTES
- Nível pedido: ${getTestsLabel(data.tests)} (${coverage}).
- Testes independentes; nomes descrevem o comportamento.
`;
  }

  if (includePerf) {
    rules += `
### 9. PERFORMANCE
- Alvo: ${data.performanceTarget || 'padrão da categoria'}.
- Lazy loading, paginação e cache quando fizer sentido. Sem otimização prematura.
`;
  }

  if (includeA11y) {
    rules += `
### 10. ACESSIBILIDADE
- ${data.accessibility === 'avancada' ? 'WCAG 2.2 AA completo' : 'Teclado, foco visível, HTML semântico, contraste 4.5:1'}.
- Estados: loading, vazio, erro e sucesso.
`;
  }

  rules += `
### DEFINITION OF DONE
- [ ] Compila/roda sem erros.
- [ ] Stack ${getStackLabel(data.stack)} respeitada de ponta a ponta.
- [ ] Secrets fora do repositório.
${includeTests ? '- [ ] Testes do nível pedido passando.\n' : ''}${includeDocs ? '- [ ] README e .env.example atualizados.\n' : ''}${includeA11y ? '- [ ] Navegação por teclado operacional.\n' : ''}
### MODO DE EXECUÇÃO
1. Zero placeholders.
2. ${data.scope === 'mvp' ? 'MVP funcional antes de extras.' : 'Entrega completa, sem cortar o escopo pedido.'}
3. Justifique libs/frameworks em 1–2 linhas.
4. O código deve rodar após o setup descrito.
`;

  return rules;
}

function getRuleFlags(data: FormData): string[] {
  const flags = ['anti-placeholder', 'pt-BR UI / EN code', 'secrets em env'];
  if (data.codeQuality === 'patterns' || data.codeQuality === 'arquitetura') flags.push('arquitetura em camadas');
  if (data.tests !== 'nenhum') flags.push(`testes:${data.tests}`);
  if (data.deliverables.includes('docs')) flags.push('README');
  if (data.accessibility === 'avancada') flags.push('WCAG 2.2 AA');
  if (data.securityLevel !== 'basica') flags.push(`segurança:${data.securityLevel}`);
  if (data.regulatedSector !== 'nao') flags.push(`compliance:${data.regulatedSector}`);
  if (data.scope === 'mvp') flags.push('MVP primeiro');
  return flags;
}

function getComplianceBlock(data: FormData): string {
  if (data.regulatedSector === 'nao' && data.securityLevel !== 'compliance' && data.collectsData !== 'sim') {
    return '';
  }

  const lines: string[] = ['\n### Conformidade (obrigatório no código e na documentação)\n'];

  if (data.collectsData === 'sim') {
    lines.push(
      `- **LGPD / GDPR:** base legal, minimização, consentimento, direito de exclusão/exportação. Dados coletados: ${formatCollectedTypes(data)}.`,
    );
  }

  switch (data.regulatedSector) {
    case 'saude':
      lines.push(
        '- **Saúde (LGPD + analogia HIPAA):** dados clínicos são sensíveis. Criptografia em trânsito e em repouso, trilha de auditoria, controle de acesso por papel. Não invente conformidade clínica — deixe TODOs claros para revisão jurídica.',
      );
      break;
    case 'financas':
      lines.push(
        '- **Finanças (LGPD + PCI-DSS se houver cartão):** nunca armazenar PAN/CVV. Preferir gateway (Stripe/Pagar.me). Logs sem dados de pagamento. Rate limit e antifraude básicos.',
      );
      break;
    case 'educacao':
      lines.push(
        '- **Educação:** dados de menores exigem consentimento do responsável. Controle de acesso professor/aluno e retenção limitada.',
      );
      break;
    case 'outro':
      lines.push(
        '- **Setor regulado (outro):** documentar restrições no README e isolar dados pessoais. Sinalizar onde é necessária consultoria especializada.',
      );
      break;
    default:
      break;
  }

  if (data.securityLevel === 'compliance') {
    lines.push('- **Nível compliance:** políticas de retenção, auditoria e relatório de incidentes devem aparecer no README.');
  }

  lines.push('- Aviso: este gerador não substitui assessoria jurídica.');
  return `${lines.join('\n')}\n`;
}

function getToolProfileBlock(target: PromptTarget | undefined): string {
  switch (target) {
    case 'cursor':
      return `
### Perfil: Cursor
- Entregue arquivos reais no workspace, não um único bloco monolítico.
- Prefira editar arquivos existentes. Não reescreva o projeto inteiro sem necessidade.
- Ao terminar, liste o que mudou e como rodar.
`;
    case 'claude-code':
      return `
### Perfil: Claude Code
- Trabalhe em passos verificáveis (build/test após mudanças grandes).
- Use ferramentas do ambiente; não peça ao usuário para colar código à mão.
`;
    case 'codex':
      return `
### Perfil: Codex / agentes de código
- Diffs pequenos e revisáveis. Um objetivo por lote de arquivos.
- Comandos de verificação explícitos (test, lint, build).
`;
    case 'gemini':
      return `
### Perfil: Gemini CLI
- Estruture a resposta por arquivo. Evite omitir imports.
- Quando incerto, declare a premissa em uma linha e siga.
`;
    case 'antigravity':
      return `
### Perfil: Antigravity
- Tarefa difícil: comece com /boost. Vários agentes em escopos isolados, com verificação antes de entregar.
- Não invente /loop. Não cole o kit no chat.
`;
    case 'opencode':
    case 'windsurf':
    case 'pi':
    case 'omp':
    case 'kilo':
    case 'cline':
    case 'crush':
    case 'dsh':
      return `
### Perfil: harness no workspace
- Edite arquivos reais. Uma tarefa por contexto. Leia ECONOMIA.md.
- Siga AGENTS.md. Abra a skill só quando a tarefa pedir.
- Não reenvie o histórico: retome a sessão ou abra um contexto limpo.
`;
    default:
      return `
### Perfil: qualquer agente
- Organize a resposta por arquivo (\`path\` + conteúdo completo) se não puder gravar no disco.
- Não assuma Cursor, Claude ou qualquer outra ferramenta.
- Inclua ordem de implementação se o projeto for grande.
`;
  }
}

function generateSpecificModule(data: FormData): string {
  switch (data.appType) {
    case 'website':
      return generateWebsiteModule(data);
    case 'android':
      return generateAndroidModule(data);
    case 'ios':
      return generateiOSModule(data);
    case 'cli':
      return generateCLIModule(data);
    case 'gui':
      return generateGUIModule(data);
    case 'docker':
      return generateDockerModule(data);
    case 'api':
      return generateAPIModule(data);
    default:
      return '- Módulo específico não configurado';
  }
}

function generateWebsiteModule(data: FormData): string {
  return `**Tipo de site:** ${data.websiteType}
**Páginas/rotas:** ${data.websitePages.join(', ') || 'A definir'}
**Tipo de conteúdo:** ${data.contentType === 'estatico' ? 'Estático (hardcoded)' : 'Editável (CMS/headless)'}
**CTA principal:** ${data.ctaType}${data.ctaValue ? ` (${data.ctaValue})` : ''}
**SEO:** ${data.needsSEO === 'sim' ? 'Sim (sitemap + schema + meta)' : 'Não prioritário'}
**Analytics:** ${data.needsAnalytics === 'nenhum' ? 'Nenhum' : data.needsAnalytics}
**Formulários:** ${data.websiteForms === 'nenhum' ? 'Nenhum' : data.websiteForms}
**Estilo de design:** ${data.designStyle}${data.designReference ? ` (referência: ${data.designReference})` : ''}
**Permitir crawlers de IA:** ${data.allowAICrawlers === 'sim' ? 'Sim' : 'Não (robots + llms.txt bloqueando)'}

### Requisitos técnicos específicos:
- Stack obrigatória: ${getStackLabel(data.stack)}
- Framework: ${websiteFramework(data.stack, data.framework)}
- Responsivo: 320px até 4K; menu funcional < 768px
- Ícones: SVG (sem emoji como ícone)
- Contraste mínimo: 4.5:1
- Sem trocar a linguagem sem justificativa`;
}

function generateAndroidModule(data: FormData): string {
  const reqs = androidStackReqs(data);
  return `**Versão mínima:** Android ${data.androidMinVersion}+
**UI:** ${getAndroidUILabel(data.androidUI)}
**Suporte tablet:** ${data.androidTablet === 'sim' ? 'Sim' : 'Não'}
**Orientação:** ${data.androidOrientation}
**Permissões:** ${data.androidPermissions.join(', ') || 'Nenhuma especial'}
**Push notifications:** ${data.androidPush === 'sim' ? `Sim (${data.androidPushType})` : 'Não'}
**Offline:** ${getMobileOfflineLabel(data.androidOffline)}
**Autenticação:** ${data.androidAuth}
**Distribuição:** ${data.androidDistribution}
**Telemetria:** ${data.androidTelemetry}

### Requisitos técnicos específicos:
- Stack obrigatória: ${getStackLabel(data.stack)}
${reqs}`;
}

function generateiOSModule(data: FormData): string {
  const reqs = iosStackReqs(data);
  return `**Versão mínima:** iOS ${data.iosMinVersion}+
**UI:** ${getIOSUILabel(data.iosUI)}
**Suporte iPad:** ${data.iosIpad === 'sim' ? 'Sim' : 'Não'}
**Permissões:** ${data.iosPermissions.join(', ') || 'Nenhuma especial'}
**Push notifications:** ${data.iosPush === 'sim' ? `Sim (${data.iosPushType})` : 'Não'}
**Offline:** ${getMobileOfflineLabel(data.iosOffline)}
**Autenticação:** ${data.iosAuth}
**Distribuição:** ${data.iosDistribution}
**Tela de privacidade:** ${data.iosPrivacyScreen === 'sim' ? 'Sim' : 'Não'}

### Requisitos técnicos específicos:
- Stack obrigatória: ${getStackLabel(data.stack)}
${reqs}`;
}

function generateCLIModule(data: FormData): string {
  return `**Propósito:** ${data.cliPurpose}
**Comandos principais:** ${data.cliCommands}
**Entrada:** ${data.cliInput}
**Saída:** ${data.cliOutput}
**Configuração:** ${data.cliConfig}
**Interativo:** ${data.cliInteractive === 'sim' ? 'Sim' : 'Não'}
**Plataformas:** ${data.cliPlatforms.join(', ')}
**Instalação:** ${data.cliInstall}

### Requisitos técnicos específicos:
- Stack obrigatória: ${getStackLabel(data.stack)}
- CLI framework: ${cliFramework(data.stack)}
- Cores e progress bar em operações longas
- Validação de inputs e --help em todos os comandos
- Códigos de saída: 0 sucesso, >0 erro`;
}

function generateGUIModule(data: FormData): string {
  return `**Framework pedido:** ${data.guiFramework || 'sugerir o idiomático da stack'}
**Fluxo principal:** ${data.guiFlow}
**Trabalha com arquivos:** ${data.guiFiles === 'sim' ? `Sim (${data.guiFileFormats})` : 'Não'}
**Atalhos de teclado:** ${data.guiShortcuts === 'sim' ? 'Sim' : 'Não'}
**Auto-update:** ${data.guiAutoUpdate === 'sim' ? 'Sim' : 'Não'}
**Persistência:** ${data.guiPersistence}
**Empacotamento:** ${data.guiPackaging}

### Requisitos técnicos específicos:
- Stack obrigatória: ${getStackLabel(data.stack)}
- Toolkit: ${guiToolkit(data.stack, data.guiFramework)}
- State management idiomático da stack
- Permissões de SO, notificações e tray se fizer sentido
- Atalhos e empacotamento nativos da plataforma`;
}

function generateDockerModule(data: FormData): string {
  return `**O que containerizar:** ${data.dockerType}
**Portas expostas:** ${data.dockerPorts || 'A definir'}
**Volumes:** ${data.dockerVolumes === 'sim' ? `Sim (${data.dockerVolumePaths})` : 'Não'}
**Variáveis de ambiente:** ${data.dockerEnvVars || 'Padrão'}
**Healthcheck:** ${data.dockerHealthcheck === 'sim' ? 'Sim' : 'Não'}
**Usuário non-root:** ${data.dockerNonRoot === 'sim' ? 'Sim' : 'Não'}
**Multi-stage build:** ${data.dockerMultistage === 'sim' ? 'Sim' : 'Não'}
**Docker Compose:** ${data.dockerCompose === 'sim' ? `Sim (${data.dockerServices})` : 'Não'}

### Requisitos técnicos específicos:
- Runtime da imagem: ${getStackLabel(data.stack)} (${dockerBase(data.stack)})
- Layer cache, .dockerignore e labels
- Compatível com Docker e Podman
- Scan de imagem recomendado (Trivy)`;
}

function generateAPIModule(data: FormData): string {
  return `**Tipo de API:** ${data.apiType.toUpperCase()}
**Framework:** ${data.apiFramework || apiFramework(data.stack, data.apiType)}
**Domínio do negócio:** ${data.apiDomain}
**Recursos principais:** ${data.apiResources}
**Autenticação/Autorização:** ${data.apiAuth}
**Banco de dados:** ${data.apiDatabase}
**Cache:** ${data.apiCache}
**Paginação:** ${data.apiPagination === 'sim' ? 'Sim' : 'Não'}
**Rate limiting:** ${data.apiRateLimit === 'sim' ? 'Sim' : 'Não'}
**Versionamento:** ${data.apiVersioning === 'sim' ? 'Sim' : 'Não'}
**Documentação:** ${data.apiDocs === 'sim' ? 'Sim (OpenAPI/Swagger)' : 'Não'}
**Jobs assíncronos:** ${data.apiJobs === 'sim' ? 'Sim' : 'Não'}

### Schema / Estrutura de Dados:
${data.apiSchema ? `\`\`\`\n${data.apiSchema}\n\`\`\`` : 'Não fornecido (propor com base nos recursos)'}

### Requisitos técnicos específicos:
- Stack obrigatória: ${getStackLabel(data.stack)}
- Framework: ${data.apiFramework || apiFramework(data.stack, data.apiType)}
- Validação de payload, logging JSON, request ID
- CORS, recovery, graceful shutdown
- Health: /health e /ready`;
}

function websiteFramework(stack: FormData['stack'], requested?: string): string {
  if (requested?.trim()) return requested.trim();
  switch (stack) {
    case 'typescript':
      return 'Next.js (App Router) ou React + Vite';
    case 'javascript':
      return 'Vite + React';
    case 'php':
      return 'Laravel ou WordPress só se for conteúdo editorial';
    case 'ruby':
      return 'Rails + Hotwire';
    case 'python':
      return 'Django ou FastAPI + Jinja/HTMX';
    case 'go':
      return 'templ ou html/template + chi/echo';
    default:
      return 'framework idiomático da stack escolhida';
  }
}

function androidStackReqs(data: FormData): string {
  if (data.stack === 'dart' || data.androidUI === 'flutter') {
    return `- UI: Flutter (Dart). Não gere Kotlin nativo salvo plugins.
- Estado: Riverpod ou Bloc
- Persistência: sqflite/drift; sync se offline=sync
- Testes: flutter_test`;
  }
  if (data.stack === 'csharp' || data.androidUI === 'maui') {
    return `- UI: .NET MAUI (C#)
- Arquitetura: MVVM
- Persistência: SQLite / EF Core
- Testes: xUnit`;
  }
  if (data.stack === 'typescript') {
    return `- UI: React Native + Expo (TypeScript)
- Navegação: Expo Router
- Persistência: AsyncStorage ou SQLite
- Testes: Jest + Testing Library`;
  }
  if (data.stack === 'java') {
    return `- Linguagem: Java
- UI: ${data.androidUI === 'xml' ? 'XML Views' : 'Jetpack Compose interop'}
- Arquitetura: MVVM
- Testes: JUnit`;
  }
  return `- Linguagem: Kotlin
- UI: ${data.androidUI === 'xml' ? 'XML Views' : 'Jetpack Compose'}
- Arquitetura: MVVM ou MVI; DI com Hilt ou Koin
- Async: Coroutines + Flow
- Testes: JUnit + Espresso se necessário`;
}

function iosStackReqs(data: FormData): string {
  if (data.stack === 'dart' || data.iosUI === 'flutter') {
    return `- UI: Flutter (Dart) no iOS
- Estado: Riverpod ou Bloc
- Persistência: sqflite/drift
- Testes: flutter_test`;
  }
  if (data.stack === 'csharp' || data.iosUI === 'maui') {
    return `- UI: .NET MAUI (C#)
- Arquitetura: MVVM
- Persistência: SQLite
- Testes: xUnit`;
  }
  if (data.stack === 'typescript') {
    return `- UI: React Native + Expo (TypeScript)
- Navegação: Expo Router
- Atenção às guidelines da App Store e Sign in with Apple se houver auth`;
  }
  return `- Linguagem: Swift
- UI: ${data.iosUI === 'uikit' ? 'UIKit' : 'SwiftUI'}
- Arquitetura: MVVM
- Async: async/await
- Persistência: SwiftData ou Core Data
- Testes: XCTest`;
}

function cliFramework(stack: FormData['stack']): string {
  const map: Partial<Record<Stack, string>> = {
    go: 'Cobra ou urfave/cli',
    rust: 'clap',
    python: 'Typer ou Click',
    typescript: 'citty, commander ou bun',
    cpp: 'CLI11',
    csharp: 'System.CommandLine',
    dart: 'args + mason/cli',
    kotlin: 'clikt',
    java: 'picocli',
    swift: 'ArgumentParser',
  };
  return (stack && map[stack]) || 'framework idiomático da stack';
}

function guiToolkit(stack: FormData['stack'], requested: string): string {
  if (requested) {
    return `${requested} (respeitar; alinhar com ${getStackLabel(stack)})`;
  }
  switch (stack) {
    case 'rust':
      return 'Tauri 2 ou egui';
    case 'go':
      return 'Wails ou Fyne';
    case 'typescript':
      return 'Electron ou Tauri + frontend TS';
    case 'csharp':
      return 'MAUI, Avalonia ou WinUI';
    case 'python':
      return 'PySide / Dear PyGui';
    case 'dart':
      return 'Flutter Desktop';
    case 'kotlin':
      return 'Compose Multiplatform';
    case 'swift':
      return 'SwiftUI (macOS)';
    case 'java':
      return 'Compose for Desktop ou JavaFX';
    case 'cpp':
      return 'Qt ou Dear ImGui';
    default:
      return 'toolkit nativo da stack';
  }
}

function apiFramework(stack: FormData['stack'], apiType: FormData['apiType']): string {
  if (apiType === 'graphql') {
    if (stack === 'typescript') return 'Yoga / Mercurius / NestJS GraphQL';
    if (stack === 'python') return 'Strawberry ou Graphene';
    if (stack === 'go') return 'gqlgen';
  }
  if (apiType === 'grpc') {
    if (stack === 'go') return 'gRPC-Go';
    if (stack === 'rust') return 'Tonic';
    if (stack === 'python') return 'grpcio';
    if (stack === 'csharp') return 'grpc-dotnet';
  }
  if (apiType === 'websocket') {
    if (stack === 'go') return 'gorilla/websocket ou nhooyr';
    if (stack === 'typescript') return 'ws ou Socket.IO';
    if (stack === 'python') return 'FastAPI WebSocket ou Starlette';
  }
  switch (stack) {
    case 'go':
      return 'Fiber ou chi';
    case 'rust':
      return 'Axum';
    case 'python':
      return 'FastAPI';
    case 'typescript':
      return 'Hono ou NestJS';
    case 'java':
      return 'Spring Boot';
    case 'csharp':
      return 'ASP.NET Core';
    default:
      return 'framework HTTP idiomático da stack';
  }
}

function dockerBase(stack: FormData['stack']): string {
  switch (stack) {
    case 'go':
      return 'multi-stage, binário estático, distroless/alpine';
    case 'rust':
      return 'multi-stage rust:slim → distroless';
    case 'python':
      return 'python:slim + venv; sem root';
    case 'typescript':
      return 'node:lts-alpine ou bun; multi-stage';
    case 'java':
      return 'eclipse-temurin JRE slim';
    case 'csharp':
      return 'mcr.microsoft.com/dotnet aspnet runtime';
    default:
      return 'imagem oficial slim da stack';
  }
}

function formatCollectedTypes(data: FormData): string {
  if (!data.collectedDataTypes.length) return 'não especificados';
  return data.collectedDataTypes
    .map((value) => collectedDataOptions.find((o) => o.value === value)?.label || value)
    .join(', ');
}

function getRegulatedSectorLabel(sector: FormData['regulatedSector']): string {
  const labels: Record<FormData['regulatedSector'], string> = {
    nao: 'Não',
    saude: 'Saúde',
    financas: 'Finanças',
    educacao: 'Educação',
    outro: 'Outro setor regulado',
  };
  return labels[sector] || sector;
}

export function getPromptTargetLabel(target: PromptTarget | undefined): string {
  return harnessLabel(target);
}

function getAppTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    website: 'Website',
    android: 'Aplicativo Android',
    ios: 'Aplicativo iOS',
    cli: 'CLI (Command Line Interface)',
    gui: 'GUI Desktop',
    docker: 'Container Docker/Podman',
    api: 'API/Backend',
  };
  return labels[type] || type || 'Não definido';
}

function getStackLabel(stack: string): string {
  const labels: Record<string, string> = {
    go: 'Go',
    rust: 'Rust',
    python: 'Python',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    php: 'PHP',
    ruby: 'Ruby',
    cpp: 'C++',
    csharp: 'C#',
    kotlin: 'Kotlin',
    swift: 'Swift',
    java: 'Java',
    dart: 'Dart',
  };
  return labels[stack] || stack || 'Não definida';
}

function getFeatureLabel(feature: string): string {
  const labels: Record<string, string> = {
    auth: 'Autenticação de usuários',
    pagamentos: 'Sistema de pagamentos',
    upload: 'Upload de arquivos',
    chat: 'Chat/Mensagens em tempo real',
    'api-externa': 'Integração com APIs externas',
    busca: 'Sistema de busca',
    'multi-idioma': 'Multi-idioma (i18n)',
    offline: 'Funciona offline',
    notificacoes: 'Notificações push',
    geolocalizacao: 'GPS/Geolocalização',
    ia: 'Inteligência artificial',
    whatsapp: 'WhatsApp / mensagem',
    agenda: 'Agenda e horários',
  };
  return labels[feature] || feature;
}

function getOfflineLabel(offline: string): string {
  const labels: Record<string, string> = {
    nao: 'Não necessário',
    parcial: 'Parcial (cache de dados)',
    total: 'Total (funciona 100% offline)',
  };
  return labels[offline] || offline;
}

function getMobileOfflineLabel(offline: string): string {
  const labels: Record<string, string> = {
    nao: 'Não necessário',
    cache: 'Parcial (cache local)',
    sync: 'Sincronização offline/online',
  };
  return labels[offline] || offline;
}

function getThemeLabel(theme: string): string {
  const labels: Record<string, string> = {
    claro: 'Claro apenas',
    escuro: 'Escuro apenas',
    ambos: 'Claro e escuro (toggle)',
  };
  return labels[theme] || theme;
}

function getDeliverableLabel(deliverable: string): string {
  const labels: Record<string, string> = {
    codigo: 'Código fonte',
    testes: 'Testes',
    docs: 'Documentação',
    docker: 'Docker/Container',
    ci: 'Pipeline CI/CD',
  };
  return labels[deliverable] || deliverable;
}

function getQualityLabel(quality: string): string {
  const labels: Record<string, string> = {
    simples: 'Simples e direto',
    clean: 'Clean Code',
    patterns: 'Design Patterns',
    arquitetura: 'Arquitetura completa (Clean/Hexagonal)',
  };
  return labels[quality] || quality;
}

function getTestsLabel(tests: string): string {
  const labels: Record<string, string> = {
    nenhum: 'Não necessários',
    unitarios: 'Unitários',
    integracao: 'Integração',
    e2e: 'End-to-end (E2E)',
  };
  return labels[tests] || tests;
}

function getSecurityLabel(security: string): string {
  const labels: Record<string, string> = {
    basica: 'Básica (inputs sanitizados, HTTPS)',
    avancada: 'Avançada (rate limiting, CORS, headers)',
    compliance: 'Compliance (LGPD/GDPR/PCI-DSS)',
  };
  return labels[security] || security;
}

function getAndroidUILabel(ui: FormData['androidUI']): string {
  const labels: Record<FormData['androidUI'], string> = {
    compose: 'Jetpack Compose',
    xml: 'XML tradicional',
    flutter: 'Flutter',
    maui: '.NET MAUI',
  };
  return labels[ui];
}

function getIOSUILabel(ui: FormData['iosUI']): string {
  const labels: Record<FormData['iosUI'], string> = {
    swiftui: 'SwiftUI',
    uikit: 'UIKit',
    flutter: 'Flutter',
    maui: '.NET MAUI',
  };
  return labels[ui];
}
