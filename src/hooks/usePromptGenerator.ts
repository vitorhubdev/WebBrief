import { useState, useCallback, useEffect, useMemo } from 'react';
import type { FormData, Preset } from '@/types';
import { initialFormData, presets } from '@/types';

const STORAGE_KEY = 'promptgen-config-v2';

export function usePromptGenerator() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return initialFormData;
    }

    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return { ...initialFormData, ...parsed };
      }
    } catch (e) {
      console.error('Erro ao carregar configuração:', e);
    }

    return initialFormData;
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const promptStats = useMemo(() => {
    const preview = generatePromptText(formData);
    return {
      tokens: Math.ceil(preview.length / 4),
      characters: preview.length,
      lines: preview.split('\n').length
    };
  }, [formData]);

  // Salvar configuração automaticamente
  useEffect(() => {
    if (formData.projectName || formData.appType) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const updateField = useCallback(<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleArrayField = useCallback(<K extends keyof FormData>(
    field: K,
    value: string
  ) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  }, []);

  const loadPreset = useCallback((preset: Preset) => {
    setFormData({
      ...initialFormData,
      appType: preset.appType,
      stack: preset.stack,
      ...preset.data,
    });
  }, []);

  const exportConfig = useCallback(() => {
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptgen-config-${formData.projectName || 'untitled'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [formData]);

  const exportTOON = useCallback(() => {
    const toonData = generateTOON(formData);
    const blob = new Blob([toonData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-config-${formData.projectName || 'untitled'}.toon`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [formData]);

  const exportXML = useCallback(() => {
    const xmlData = generateXML(formData);
    const blob = new Blob([xmlData], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-config-${formData.projectName || 'untitled'}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [formData]);

  const importConfig = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        setFormData({ ...initialFormData, ...parsed });
        return true;
      } catch (err) {
        console.error('Erro ao importar:', err);
        return false;
      }
    };
    reader.readAsText(file);
  }, []);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
    setCurrentStep(1);
  }, []);

  const generatePrompt = useCallback(() => {
    const prompt = generatePromptText(formData);
    setGeneratedPrompt(prompt);
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setGeneratedPrompt('');
    setShowResult(false);
    setCurrentStep(1);
    setShowAdvanced(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      return true;
    } catch (err) {
      console.error('Erro ao copiar:', err);
      return false;
    }
  }, [generatedPrompt]);

  return {
    formData,
    generatedPrompt,
    showResult,
    currentStep,
    showAdvanced,
    setCurrentStep,
    setShowAdvanced,
    updateField,
    toggleArrayField,
    loadPreset,
    generatePrompt,
    resetForm,
    copyToClipboard,
    exportConfig,
    exportTOON,
    exportXML,
    importConfig,
    clearSavedData,
    promptStats,
    presets,
  };
}

export function generatePromptText(data: FormData): string {
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString('pt-BR');

  let prompt = `# PROMPT PARA CRIAÇÃO DE APLICAÇÃO

> **Gerado em:** ${dataFormatada}  
> **Ferramenta:** PromptGen - Gerador Universal de Aplicações
> **⚠️ PRIORIDADE ABSOLUTA:** Este prompt segue as **REGRAS UNIVERSAIS (Seção 7)**.

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
${data.features.length > 0 ? data.features.map(f => `- ${getFeatureLabel(f)}`).join('\n') : '- A definir pela IA'}

**Autenticação:** ${data.hasAuth === 'sim' ? `Sim - ${data.authType}` : 'Não necessária'}
**Armazena dados:** ${data.storesData === 'sim' ? `Sim - ${data.storageType}` : 'Não'}
**Integrações externas:** ${data.integrations || 'Nenhuma'}

---

## 3) REQUISITOS NÃO-FUNCIONAIS

**Suporte offline:** ${getOfflineLabel(data.offlineSupport)}
**Performance alvo:** ${data.performanceTarget || 'Padrão'}
**Acessibilidade:** ${data.accessibility === 'basica' ? 'Básica (navegação por teclado + contraste)' : 'Avançada (WCAG 2.1 AA)'}
**Idiomas:** ${data.languages === 'ptbr' ? 'Português brasileiro (pt-BR)' : 'Multi-idioma'}
**Tema:** ${getThemeLabel(data.theme)}

---

## 4) SEGURANÇA, LEGAL E AUTORIA

**Coleta dados pessoais:** ${data.collectsData === 'sim' ? `Sim (${data.collectedDataTypes.join(', ')})` : 'Não'}
**Setor regulado:** ${data.regulatedSector === 'nao' ? 'Não' : data.regulatedSector}
**Licenças de conteúdo:** ${data.licensesSource === 'licenca-livre' ? 'Apenas licença livre/uso comercial' : 'A verificar'}

**Créditos/autoria:** ${data.creditsText || 'Não especificado'}
**Local dos créditos:** ${data.creditsLocation || 'README'}

---

## 5) ENTREGÁVEIS E QUALIDADE

**O que entregar:** ${data.deliverables.map(d => getDeliverableLabel(d)).join(', ')}
**Escopo:** ${data.scope === 'mvp' ? 'MVP (mínimo viável)' : 'Completo'}
**Qualidade de código:** ${getQualityLabel(data.codeQuality)}
**Testes:** ${getTestsLabel(data.tests)}
**Nível de segurança:** ${getSecurityLabel(data.securityLevel)}

---

## 6) MÓDULO ESPECÍFICO: ${getAppTypeLabel(data.appType).toUpperCase()}

`;


  // Adicionar módulo específico
  prompt += generateSpecificModule(data);

  prompt += `

---

`;
  prompt += getUniversalRulesText();

  prompt += `

---

## 8) INSTRUÇÕES E OBSERVAÇÕES FINAIS

### Observações do Projeto:
${data.notes || 'Nenhuma'}

---

**IMPORTANTE:** Este prompt foi gerado automaticamente visando máxima fidelidade técnica. Revise e ajuste antes de enviar para a IA.

*PromptGen - Gerador Universal de Aplicações*`;

  return prompt;
}

function getUniversalRulesText(): string {
  return `## 7) 🤖 REGRAS UNIVERSAIS PARA GERAÇÃO DE CÓDIGO POR IA

> **Estas regras têm prioridade absoluta sobre qualquer outra instrução.**  
> Aplicáveis a qualquer stack, linguagem ou tipo de projeto.

---

### 🚫 1. INTEGRIDADE DO CÓDIGO (Anti-Placeholder)
**PROIBIDO:**
- Comentários como \`// ... resto do código\` ou \`// ... implement logic here\`
- Arquivos incompletos ou truncados
- \`// ... imports here\` sem especificar as importações

**OBRIGATÓRIO:**
- **Todo arquivo deve ser completo e funcional** com todas as importações explícitas.
- Se o arquivo for muito longo (>500 linhas), divida em múltiplos arquivos lógicos.
- Nunca trunque código - entregue sempre a solução completa.

---

### 🌐 2. PADRÃO DE IDIOMA
- **Código (variáveis, funções, classes):** 🇺🇸 INGLÊS.
- **Comentários, UI/UX e README:** 🇧🇷 PORTUGUÊS (PT-BR).
- **Justificativa:** Código em inglês é padrão global; documentação em português facilita manutenção.

---

### 🔒 3. SEGURANÇA POR PADRÃO (Zero Hardcoding)
- **Secrets:** Use variáveis de ambiente (process.env ou similar). Forneça sempre \`.env.example\`.
- **Validação:** Validar e sanitizar **TODOS** os inputs do usuário.
- **Proteção:** Prevenir SQL Injection, XSS, CSRF e Path Traversal.
- **Criptografia:** Hash de senhas forte (Argon2, bcrypt, scrypt). Logs nunca expõem dados sensíveis.

---

### 💎 4. QUALIDADE DE CÓDIGO
- **Princípios:** SOLID, DRY, KISS, YAGNI.
- **Código Profissional:** Nomes descritivos que revelam intenção. Funções pequenas (máximo 50 linhas).
- **Imutabilidade:** Preferência por imutabilidade; mutação apenas quando necessário.

---

### 🏗️ 5. ARQUITETURA
- **Camadas:** Separação clara: UI → Aplicação → Domínio → Infraestrutura.
- **Proibido:** God Classes (>300 linhas), acoplamento forte, lógica de negócio na UI.
- **Padrões:** Injeção de Dependências, uso de Interfaces/Abstrações sobre implementações concretas.

---

### ⚠️ 6. TRATAMENTO DE ERROS
- **Fail Fast:** Valide inputs no início do fluxo.
- **Erros Silenciosos:** PROIBIDO. Use try/catch com logs úteis e mensagens amigáveis ao usuário.
- **Resiliência:** Retry logic para operações transientes e graceful degradation.

---

### 📚 7. DOCUMENTAÇÃO OBRIGATÓRIA
- **README.md Mínimo:** Descrição, Pré-requisitos, Instalação (comandos executáveis), Como Rodar, Testes e Variáveis de Ambiente.
- **Transparência:** Explicação clara da estrutura de pastas.

---

### 🧪 8. TESTES
- **Obrigatório:** Testes unitários para lógica de domínio. Cobertura mínima alvo: 70%+.
- **Isolamento:** Testes devem ser idependentes e os nomes devem documentar o comportamento esperado.

---

### ⚡ 9. PERFORMANCE
- **Otimizações:** Lazy loading, paginação para listas grandes, cache e índices em banco de dados.
- **Regra de Ouro:** "Primeiro correto e simples, depois rápido". Sem otimização prematura.

---

### ♿ 10. ACESSIBILIDADE (WCAG 2.1)
- **Navegação:** Completa por teclado e foco visível.
- **Visual:** Contraste mínimo 4.5:1 (WCAG AA). HTML semântico ou ARIA labels.
- **Estados:** Loading, Empty, Error (claro + sugestão) e Success.

---

### 📦 11. DEPENDÊNCIAS
- **Critérios:** Versões LTS/estáveis, bibliotecas mantidas (<6 meses) e licenças compatíveis (MIT/Apache).
- **Gestão:** Commite lock files e realize auditoria de vulnerabilidades regularmente.

---

### ✅ DEFINITION OF DONE (DoD)
- [ ] Compila/roda sem erros ou warnings.
- [ ] README completo e atualizado com .env.example.
- [ ] Testes passando e secrets protegidos em .env.
- [ ] Código formatado consistentemente e sem comentários de código morto.
- [ ] Navegação por teclado operacional.

---

### 🎯 PRINCÍPIOS NORTEADORES
1. **Simplicidade** > Código "inteligente".
2. **Pragmatismo** - Entregue valor, evite over-engineering.
3. **Segurança by Design** - Requisito base, não opcional.
4. **Código é Comunicação** - Escreva para humanos.

---

### 🚨 MODO DE EXECUÇÃO DA IA
1. **Zero placeholders** - Nunca entregue código incompleto.
2. **MVP Primeiro** - Escopo funcional antes de extras.
3. **Justificativa** - Justifique escolhas de libs/frameworks em 1-2 linhas.
4. **Funcional de Primeira** - O código deve rodar imediatamente após o setup.`;
}

// Implementação do formato TOON (Token-Oriented Object Notation)
// Otimizado para baixo consumo de tokens em LLMs, mas mantendo a riqueza semântica
export function generateTOON(data: FormData): string {
  let toon = `PROMPT_CONFIG [v2026]\n`;

  // 1. Contexto Geral
  toon += `\nSECTION: GENERAL_CONTEXT\n`;
  toon += `  TYPE: ${getAppTypeLabel(data.appType)}\n`;
  toon += `  STACK: ${getStackLabel(data.stack)}\n`;
  toon += `  PROJECT_NAME: ${data.projectName || 'Not Defined'}\n`;
  toon += `  PITCH: ${data.pitch || 'Not Defined'}\n`;
  toon += `  TARGET_AUDIENCE: ${data.targetAudience || 'Not Defined'}\n`;
  toon += `  MAIN_ACTION: ${data.mainAction || 'Not Defined'}\n`;

  // 2. Requisitos Funcionais
  toon += `\nSECTION: FUNCTIONAL_REQUIREMENTS\n`;
  if (data.features.length > 0) {
    toon += `  FEATURES_LIST:\n`;
    data.features.forEach(f => toon += `    - ${getFeatureLabel(f)}\n`);
  } else {
    toon += `  FEATURES_LIST: To be defined by AI\n`;
  }
  toon += `  AUTH: ${data.hasAuth === 'sim' ? `Yes (${data.authType})` : 'Not Required'}\n`;
  toon += `  DATA_STORAGE: ${data.storesData === 'sim' ? `Yes (${data.storageType})` : 'No'}\n`;
  toon += `  INTEGRATIONS: ${data.integrations || 'None'}\n`;

  // 3. Requisitos Não-Funcionais
  toon += `\nSECTION: NON_FUNCTIONAL_REQUIREMENTS\n`;
  toon += `  OFFLINE_SUPPORT: ${getOfflineLabel(data.offlineSupport)}\n`;
  toon += `  PERFORMANCE: ${data.performanceTarget || 'Standard'}\n`;
  toon += `  ACCESSIBILITY: ${data.accessibility === 'basica' ? 'Basic' : 'Advanced (WCAG 2.1 AA)'}\n`;
  toon += `  LANGUAGES: ${data.languages === 'ptbr' ? 'Portuguese (BR)' : 'Multi-language'}\n`;
  toon += `  THEME: ${getThemeLabel(data.theme)}\n`;

  // 4. Segurança e Legal
  toon += `\nSECTION: SECURITY_AND_LEGAL\n`;
  toon += `  DATA_COLLECTION: ${data.collectsData === 'sim' ? `Yes (${data.collectedDataTypes.join(', ')})` : 'No'}\n`;
  toon += `  REGULATED_SECTOR: ${data.regulatedSector === 'nao' ? 'No' : data.regulatedSector}\n`;
  toon += `  CONTENT_LICENSE: ${data.licensesSource}\n`;
  toon += `  CREDITS: ${data.creditsText || 'None'} (${data.creditsLocation || 'README'})\n`;

  // 5. Entregáveis
  toon += `\nSECTION: DELIVERABLES_AND_QUALITY\n`;
  toon += `  ITEMS: ${data.deliverables.map(d => getDeliverableLabel(d)).join(', ')}\n`;
  toon += `  SCOPE: ${data.scope === 'mvp' ? 'MVP' : 'Full'}\n`;
  toon += `  CODE_QUALITY: ${getQualityLabel(data.codeQuality)}\n`;
  toon += `  TESTS: ${getTestsLabel(data.tests)}\n`;
  toon += `  SECURITY_LEVEL: ${getSecurityLabel(data.securityLevel)}\n`;

  // 6. Módulo Específico (Passamos o texto renderizado para manter as instruções ricas)
  toon += `\nSECTION: SPECIFIC_MODULE_${data.appType.toUpperCase()}\n`;
  const specificModuleText = generateSpecificModule(data).replace(/\n/g, '\n  '); // Indentar conteúdo
  toon += `  DETAILS:\n  ${specificModuleText}\n`;

  // 7. Regras Universais (Integradas)
  toon += `\nSECTION: UNIVERSAL_AI_RULES\n`;
  const rules = getUniversalRulesText().replace(/\n/g, '\n  ');
  toon += `  ${rules}\n`;

  // 8. Notas Finais
  toon += `\nSECTION: FINAL_NOTES\n`;
  toon += `  NOTES: ${data.notes || 'None'}\n`;

  return toon;
}

// Formato XML para estruturação hierárquica clara e rica
export function generateXML(data: FormData): string {
  const escape = (str: unknown) => String(str).replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return c;
    }
  });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<PromptConfig version="2026">\n`;

  // 1. Contexto
  xml += `  <GeneralContext>\n`;
  xml += `    <AppType>${escape(getAppTypeLabel(data.appType))}</AppType>\n`;
  xml += `    <Stack>${escape(getStackLabel(data.stack))}</Stack>\n`;
  xml += `    <ProjectName>${escape(data.projectName || 'Not Defined')}</ProjectName>\n`;
  xml += `    <Pitch>${escape(data.pitch || 'Not Defined')}</Pitch>\n`;
  xml += `    <TargetAudience>${escape(data.targetAudience || 'Not Defined')}</TargetAudience>\n`;
  xml += `    <MainAction>${escape(data.mainAction || 'Not Defined')}</MainAction>\n`;
  xml += `  </GeneralContext>\n`;

  // 2. Funcionais
  xml += `  <FunctionalRequirements>\n`;
  if (data.features.length > 0) {
    xml += `    <Features>\n`;
    data.features.forEach(f => xml += `      <Feature>${escape(getFeatureLabel(f))}</Feature>\n`);
    xml += `    </Features>\n`;
  }
  xml += `    <Auth>${escape(data.hasAuth === 'sim' ? data.authType : 'None')}</Auth>\n`;
  xml += `    <DataStorage>${escape(data.storesData === 'sim' ? data.storageType : 'None')}</DataStorage>\n`;
  xml += `    <Integrations>${escape(data.integrations || 'None')}</Integrations>\n`;
  xml += `  </FunctionalRequirements>\n`;

  // 3. Não-Funcionais
  xml += `  <NonFunctionalRequirements>\n`;
  xml += `    <OfflineSupport>${escape(getOfflineLabel(data.offlineSupport))}</OfflineSupport>\n`;
  xml += `    <PerformanceTarget>${escape(data.performanceTarget || 'Standard')}</PerformanceTarget>\n`;
  xml += `    <Accessibility>${escape(data.accessibility)}</Accessibility>\n`;
  xml += `    <Languages>${escape(data.languages)}</Languages>\n`;
  xml += `    <Theme>${escape(getThemeLabel(data.theme))}</Theme>\n`;
  xml += `  </NonFunctionalRequirements>\n`;

  // 4. Segurança
  xml += `  <SecurityAndLegal>\n`;
  xml += `    <DataCollection>${escape(data.collectsData === 'sim' ? 'Yes' : 'No')}</DataCollection>\n`;
  if (data.collectsData === 'sim') {
    xml += `    <CollectedTypes>${escape(data.collectedDataTypes.join(', '))}</CollectedTypes>\n`;
  }
  xml += `    <RegulatedSector>${escape(data.regulatedSector)}</RegulatedSector>\n`;
  xml += `    <ContentLicense>${escape(data.licensesSource)}</ContentLicense>\n`;
  xml += `    <Credits>${escape(data.creditsText || 'None')}</Credits>\n`;
  xml += `  </SecurityAndLegal>\n`;

  // 5. Entregáveis
  xml += `  <Deliverables>\n`;
  data.deliverables.forEach(d => xml += `    <Item>${escape(getDeliverableLabel(d))}</Item>\n`);
  xml += `    <Scope>${escape(data.scope)}</Scope>\n`;
  xml += `    <CodeQuality>${escape(getQualityLabel(data.codeQuality))}</CodeQuality>\n`;
  xml += `    <Tests>${escape(getTestsLabel(data.tests))}</Tests>\n`;
  xml += `    <SecurityLevel>${escape(getSecurityLabel(data.securityLevel))}</SecurityLevel>\n`;
  xml += `  </Deliverables>\n`;

  // 6. Módulo Específico (CDATA para conteúdo rico)
  xml += `  <SpecificModule type="${escape(data.appType)}">\n`;
  xml += `    <![CDATA[\n${generateSpecificModule(data)}\n    ]]>\n`;
  xml += `  </SpecificModule>\n`;

  // 7. Regras Universais (CDATA para formatação MD preservada)
  xml += `  <UniversalRules>\n`;
  xml += `    <![CDATA[\n${getUniversalRulesText()}\n    ]]>\n`;
  xml += `  </UniversalRules>\n`;

  // 8. Notas
  xml += `  <FinalNotes>${escape(data.notes || 'None')}</FinalNotes>\n`;

  xml += `</PromptConfig>`;

  return xml;
}

// Funções auxiliares
function getAppTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'website': 'Website',
    'android': 'Aplicativo Android',
    'ios': 'Aplicativo iOS',
    'cli': 'CLI (Command Line Interface)',
    'gui': 'GUI Desktop',
    'docker': 'Container Docker/Podman',
    'api': 'API/Backend',
  };
  return labels[type] || type;
}

function getStackLabel(stack: string): string {
  const labels: Record<string, string> = {
    'go': 'Go',
    'rust': 'Rust',
    'python': 'Python',
    'typescript': 'TypeScript (Bun/Node)',
    'cpp': 'C++',
    'csharp': 'C#',
    'kotlin': 'Kotlin',
    'swift': 'Swift',
    'java': 'Java',
    'dart': 'Dart',
  };
  return labels[stack] || stack;
}

function getFeatureLabel(feature: string): string {
  const labels: Record<string, string> = {
    'auth': 'Autenticação de usuários',
    'pagamentos': 'Sistema de pagamentos',
    'upload': 'Upload de arquivos',
    'chat': 'Chat/Mensagens em tempo real',
    'api-externa': 'Integração com APIs externas',
    'busca': 'Sistema de busca',
    'multi-idioma': 'Multi-idioma (i18n)',
    'offline': 'Funciona offline',
    'notificacoes': 'Notificações push',
    'geolocalizacao': 'GPS/Geolocalização',
  };
  return labels[feature] || feature;
}

function getOfflineLabel(offline: string): string {
  const labels: Record<string, string> = {
    'nao': 'Não necessário',
    'parcial': 'Parcial (cache de dados)',
    'total': 'Total (funciona 100% offline)',
  };
  return labels[offline] || offline;
}


function getMobileOfflineLabel(offline: string): string {
  const labels: Record<string, string> = {
    'nao': 'Não necessário',
    'cache': 'Parcial (cache local)',
    'sync': 'Sincronização offline/online',
  };
  return labels[offline] || offline;
}

function getThemeLabel(theme: string): string {
  const labels: Record<string, string> = {
    'claro': 'Claro apenas',
    'escuro': 'Escuro apenas',
    'ambos': 'Claro e escuro (toggle)',
  };
  return labels[theme] || theme;
}

function getDeliverableLabel(deliverable: string): string {
  const labels: Record<string, string> = {
    'codigo': 'Código fonte',
    'testes': 'Testes',
    'docs': 'Documentação',
    'docker': 'Docker/Container',
    'ci': 'Pipeline CI/CD',
  };
  return labels[deliverable] || deliverable;
}

function getQualityLabel(quality: string): string {
  const labels: Record<string, string> = {
    'simples': 'Simples e direto',
    'clean': 'Clean Code',
    'patterns': 'Design Patterns',
    'arquitetura': 'Arquitetura completa (Clean/Hexagonal)',
  };
  return labels[quality] || quality;
}

function getTestsLabel(tests: string): string {
  const labels: Record<string, string> = {
    'nenhum': 'Não necessários',
    'unitarios': 'Unitários',
    'integracao': 'Integração',
    'e2e': 'End-to-end (E2E)',
  };
  return labels[tests] || tests;
}

function getSecurityLabel(security: string): string {
  const labels: Record<string, string> = {
    'basica': 'Básica (inputs sanitizados, HTTPS)',
    'avancada': 'Avançada (rate limiting, CORS, headers)',
    'compliance': 'Compliance (LGPD/GDPR/PCI-DSS)',
  };
  return labels[security] || security;
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
**SEO:** ${data.needsSEO === 'sim' ? 'Sim (blog + sitemap + schema)' : 'Não prioritário'}
**Analytics:** ${data.needsAnalytics === 'nenhum' ? 'Nenhum' : data.needsAnalytics}
**Formulários:** ${data.websiteForms === 'nenhum' ? 'Nenhum' : data.websiteForms}
**Estilo de design:** ${data.designStyle}${data.designReference ? ` (referência: ${data.designReference})` : ''}
**Permitir crawlers de IA:** ${data.allowAICrawlers === 'sim' ? 'Sim' : 'Não'}

### Requisitos técnicos específicos:
- Responsivo: 320px até 4K
- Framework: React/Vue/Svelte (escolher baseado no contexto)
- Ícones: SVG apenas (sem emojis)
- Contraste mínimo: 4.5:1
- Menu mobile: hamburger funcional < 768px`;
}

function generateAndroidModule(data: FormData): string {
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
- Linguagem: Kotlin (preferencial) ou Java
- Arquitetura: MVVM ou MVI
- Injeção de dependência: Koin ou Hilt
- Async: Coroutines + Flow
- Testes: JUnit + Espresso (se necessário)`;
}

function generateiOSModule(data: FormData): string {
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
- Linguagem: Swift
- Arquitetura: MVVM or Clean Architecture
- Async: async/await (Swift 5.5+)
- Persistência: Core Data or SwiftData
- Testes: XCTest`;
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
- CLI framework: Cobra (Go), clap (Rust), Click (Python), or Commander (TS)
- Cores no terminal: suportar (chalk, colored, etc.)
- Progress bars: para operações longas
- Validação de inputs: robusta
- Help automático: --help para todos os comandos
- Códigos de saída: 0 = sucesso, >0 = erro`;
}

function generateGUIModule(data: FormData): string {
  return `**Framework:** ${data.guiFramework}
**Fluxo principal:** ${data.guiFlow}
**Trabalha com arquivos:** ${data.guiFiles === 'sim' ? `Sim (${data.guiFileFormats})` : 'Não'}
**Atalhos de teclado:** ${data.guiShortcuts === 'sim' ? 'Sim' : 'Não'}
**Auto-update:** ${data.guiAutoUpdate === 'sim' ? 'Sim' : 'Não'}
**Persistência:** ${data.guiPersistence}
**Empacotamento:** ${data.guiPackaging}

### Requisitos técnicos específicos:
- Framework UI: Tauri (Rust+Web), Electron, Flutter Desktop, or Qt
- State management: conforme stack
- Acesso ao sistema: permissões adequadas
- Notificações do SO: suportar
- Tray/menu bar: se aplicável
- Multi-janela: suportar se necessário`;
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
- Base image: Alpine or Distroless (minimal)
- Layer caching: otimizar para rebuild rápido
- .dockerignore: arquivo completo
- Labels: incluir metadata
- Security scanning: Trivy or similar (recomendado)
- Compatibilidade: Docker and Podman`;
}

function generateAPIModule(data: FormData): string {
  return `**Tipo de API:** ${data.apiType.toUpperCase()}
**Framework:** ${data.apiFramework || 'A ser sugerido pela IA (Fiber, Gin, Axum, FastAPI or ASP.NET Core)'}
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
${data.apiSchema ? `\`\`\`\n${data.apiSchema}\n\`\`\`` : 'Não fornecido (IA deve propor baseada nos recursos)'}

### Requisitos técnicos específicos:
- Framework: Echo/Fiber (Go), Axum (Rust), FastAPI (Python), Express/NestJS (TS)
- Validação: JSON Schema or similar
- Serialização: JSON (padrão)
- Logging: estruturado (JSON)
- Middlewares: CORS, recovery, request ID
- Graceful shutdown: implementar
- Health endpoints: /health, /ready`;
}
