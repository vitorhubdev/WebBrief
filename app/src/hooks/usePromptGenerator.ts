import { useState, useCallback, useEffect } from 'react';
import type { FormData, Preset } from '@/types';
import { initialFormData, presets } from '@/types';

const STORAGE_KEY = 'promptgen-config-v2';

export function usePromptGenerator() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Carregar configuração salva ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Erro ao carregar configuração:', e);
      }
    }
  }, []);

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
    const data = formData;
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');

    let prompt = `# PROMPT PARA CRIAÇÃO DE APLICAÇÃO

> **Gerado em:** ${dataFormatada}  
> **Ferramenta:** PromptGen - Gerador Universal de Aplicações

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

## 7) INSTRUÇÕES FINAIS

### Regras Obrigatórias:
1. **Use versões mais recentes estáveis (LTS)** de todas as dependências
2. **Evite bibliotecas obsoletas** - verifique último commit (< 1 ano)
3. **Código limpo e bem documentado** - comentários em português
4. **Error handling robusto** - trate todos os erros com mensagens amigáveis
5. **Não exponha segredos** - use .env e arquivos de exemplo
6. **Sem gambiarras** - código profissional e mantenível

### Estrutura de Pastas:
- Organize em pastas claras e intuitivas
- Separe responsabilidades (MVC, camadas, ou arquitetura escolhida)
- Inclua README completo com instruções

### Definition of Done (DoD):
- [ ] Projeto roda localmente sem erros
- [ ] Happy path funcionando
- [ ] Logs/erros amigáveis
- [ ] Sem dependências obsoletas
- [ ] Sem conteúdo/licenças duvidosas
- [ ] Instruções de build/deploy claras

### Observações adicionais:
${data.notes || 'Nenhuma'}

---

**IMPORTANTE:** Este prompt foi gerado automaticamente. Revise e ajuste conforme necessário antes de enviar para a IA.

*PromptGen - Gerador Universal de Aplicações*`;

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
    importConfig,
    clearSavedData,
    presets,
  };
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
**UI:** ${data.androidUI === 'compose' ? 'Jetpack Compose' : 'XML tradicional'}
**Suporte tablet:** ${data.androidTablet === 'sim' ? 'Sim' : 'Não'}
**Orientação:** ${data.androidOrientation}
**Permissões:** ${data.androidPermissions.join(', ') || 'Nenhuma especial'}
**Push notifications:** ${data.androidPush === 'sim' ? `Sim (${data.androidPushType})` : 'Não'}
**Offline:** ${getOfflineLabel(data.androidOffline)}
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
**UI:** ${data.iosUI === 'swiftui' ? 'SwiftUI' : 'UIKit'}
**Suporte iPad:** ${data.iosIpad === 'sim' ? 'Sim' : 'Não'}
**Permissões:** ${data.iosPermissions.join(', ') || 'Nenhuma especial'}
**Push notifications:** ${data.iosPush === 'sim' ? `Sim (${data.iosPushType})` : 'Não'}
**Offline:** ${getOfflineLabel(data.iosOffline)}
**Autenticação:** ${data.iosAuth}
**Distribuição:** ${data.iosDistribution}
**Tela de privacidade:** ${data.iosPrivacyScreen === 'sim' ? 'Sim' : 'Não'}

### Requisitos técnicos específicos:
- Linguagem: Swift
- Arquitetura: MVVM ou Clean Architecture
- Async: async/await (Swift 5.5+)
- Persistência: Core Data ou SwiftData
- Testes: XCTest`;
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
- CLI framework: Cobra (Go), clap (Rust), Click (Python), ou Commander (TS)
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
- Framework UI: Tauri (Rust+Web), Electron, Flutter Desktop, ou Qt
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
- Base image: Alpine ou Distroless (minimal)
- Layer caching: otimizar para rebuild rápido
- .dockerignore: arquivo completo
- Labels: incluir metadata
- Security scanning: Trivy ou similar (recomendado)
- Compatibilidade: Docker e Podman`;
}

function generateAPIModule(data: FormData): string {
  return `**Tipo de API:** ${data.apiType.toUpperCase()}
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

### Requisitos técnicos específicos:
- Framework: Echo/Fiber (Go), Axum (Rust), FastAPI (Python), Express/NestJS (TS)
- Validação: JSON Schema ou similar
- Serialização: JSON (padrão)
- Logging: estruturado (JSON)
- Middlewares: CORS, recovery, request ID
- Graceful shutdown: implementar
- Health endpoints: /health, /ready`;
}
