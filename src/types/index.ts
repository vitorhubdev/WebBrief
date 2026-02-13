// Tipos de aplicação suportados
export type AppType = 'website' | 'android' | 'ios' | 'cli' | 'gui' | 'docker' | 'api';

// Stacks/Linguagens suportadas
export type Stack = 'go' | 'rust' | 'python' | 'typescript' | 'cpp' | 'csharp' | 'kotlin' | 'swift' | 'java' | 'dart';

// Interface principal do formulário
export interface FormData {
  // === ETAPA 1: TIPO E STACK ===
  appType: AppType | '';
  stack: Stack | '';

  // === ETAPA 2: IDENTIDADE E OBJETIVO ===
  projectName: string;
  pitch: string;
  targetAudience: string;
  mainAction: string;

  // === ETAPA 3: FUNCIONALIDADES ===
  features: string[];
  hasAuth: 'sim' | 'nao';
  authType: string;
  storesData: 'sim' | 'nao';
  storageType: string;
  integrations: string;

  // === ETAPA 4: REQUISITOS TÉCNICOS ===
  offlineSupport: 'nao' | 'parcial' | 'total';
  performanceTarget: string;
  accessibility: 'basica' | 'avancada';
  languages: 'ptbr' | 'multi';
  theme: 'claro' | 'escuro' | 'ambos';

  // === ETAPA 5: SEGURANÇA E LEGAL ===
  collectsData: 'sim' | 'nao';
  collectedDataTypes: string[];
  regulatedSector: 'nao' | 'saude' | 'financas' | 'educacao' | 'outro';
  licensesSource: string;

  // === ETAPA 6: ENTREGÁVEIS ===
  deliverables: string[];
  scope: 'mvp' | 'completo';
  codeQuality: 'simples' | 'clean' | 'patterns' | 'arquitetura';
  tests: 'nenhum' | 'unitarios' | 'integracao' | 'e2e';
  securityLevel: 'basica' | 'avancada' | 'compliance';

  // === MÓDULO: WEBSITE ===
  websiteType: string;
  websitePages: string[];
  contentType: 'estatico' | 'editavel';
  ctaType: string;
  ctaValue: string;
  needsSEO: 'sim' | 'nao';
  needsAnalytics: 'nenhum' | 'simples' | 'completo';
  websiteForms: 'nenhum' | 'lead' | 'multiplo';
  designStyle: string;
  designReference: string;
  allowAICrawlers: 'sim' | 'nao';

  // === MÓDULO: ANDROID ===
  androidMinVersion: string;
  androidUI: 'xml' | 'compose';
  androidTablet: 'sim' | 'nao';
  androidOrientation: 'portrait' | 'landscape' | 'ambos';
  androidPermissions: string[];
  androidPush: 'sim' | 'nao';
  androidPushType: string;
  androidOffline: 'nao' | 'cache' | 'sync';
  androidAuth: 'nenhuma' | 'email' | 'social' | 'sso';
  androidDistribution: 'apk' | 'playstore' | 'ambas';
  androidTelemetry: 'nenhum' | 'crash' | 'analytics';

  // === MÓDULO: iOS ===
  iosMinVersion: string;
  iosUI: 'uikit' | 'swiftui';
  iosIpad: 'sim' | 'nao';
  iosPermissions: string[];
  iosPush: 'sim' | 'nao';
  iosPushType: string;
  iosOffline: 'nao' | 'cache' | 'sync';
  iosAuth: 'nenhuma' | 'email' | 'apple' | 'outros';
  iosDistribution: 'testflight' | 'appstore' | 'ambas';
  iosPrivacyScreen: 'sim' | 'nao';

  // === MÓDULO: CLI ===
  cliPurpose: string;
  cliCommands: string;
  cliInput: 'stdin' | 'arquivos' | 'args' | 'ambos';
  cliOutput: 'texto' | 'json' | 'ambos';
  cliConfig: 'flags' | 'arquivo' | 'env';
  cliInteractive: 'sim' | 'nao';
  cliPlatforms: string[];
  cliInstall: 'binario' | 'package' | 'script';

  // === MÓDULO: GUI ===
  guiFramework: string;
  guiFlow: string;
  guiFiles: 'sim' | 'nao';
  guiFileFormats: string;
  guiShortcuts: 'sim' | 'nao';
  guiAutoUpdate: 'sim' | 'nao';
  guiPersistence: 'nenhum' | 'config' | 'banco';
  guiPackaging: 'installer' | 'portable' | 'ambos';

  // === MÓDULO: DOCKER ===
  dockerType: string;
  dockerPorts: string;
  dockerVolumes: 'sim' | 'nao';
  dockerVolumePaths: string;
  dockerEnvVars: string;
  dockerHealthcheck: 'sim' | 'nao';
  dockerNonRoot: 'sim' | 'nao';
  dockerMultistage: 'sim' | 'nao';
  dockerCompose: 'sim' | 'nao';
  dockerServices: string;

  // === MÓDULO: API ===
  apiType: 'rest' | 'graphql' | 'grpc' | 'websocket';
  apiFramework: string;
  apiDomain: string;
  apiResources: string;
  apiAuth: 'nenhuma' | 'jwt' | 'oauth' | 'apikey' | 'rbac';
  apiDatabase: string;
  apiCache: string;
  apiPagination: 'sim' | 'nao';
  apiRateLimit: 'sim' | 'nao';
  apiVersioning: 'sim' | 'nao';
  apiDocs: 'sim' | 'nao';
  apiJobs: 'sim' | 'nao';
  apiSchema: string;

  // === CRÉDITOS ===
  creditsText: string;
  creditsLocation: string;

  // === EXTRAS ===
  notes: string;
}

// Estado inicial vazio
export const initialFormData: FormData = {
  appType: '',
  stack: '',
  projectName: '',
  pitch: '',
  targetAudience: '',
  mainAction: '',
  features: [],
  hasAuth: 'nao',
  authType: '',
  storesData: 'nao',
  storageType: '',
  integrations: '',
  offlineSupport: 'nao',
  performanceTarget: '',
  accessibility: 'basica',
  languages: 'ptbr',
  theme: 'ambos',
  collectsData: 'nao',
  collectedDataTypes: [],
  regulatedSector: 'nao',
  licensesSource: 'licenca-livre',
  deliverables: ['codigo'],
  scope: 'mvp',
  codeQuality: 'clean',
  tests: 'unitarios',
  securityLevel: 'basica',
  // Website
  websiteType: '',
  websitePages: [],
  contentType: 'estatico',
  ctaType: 'whatsapp',
  ctaValue: '',
  needsSEO: 'sim',
  needsAnalytics: 'nenhum',
  websiteForms: 'nenhum',
  designStyle: 'moderno',
  designReference: '',
  allowAICrawlers: 'sim',
  // Android
  androidMinVersion: '10',
  androidUI: 'compose',
  androidTablet: 'nao',
  androidOrientation: 'portrait',
  androidPermissions: [],
  androidPush: 'nao',
  androidPushType: '',
  androidOffline: 'nao',
  androidAuth: 'nenhuma',
  androidDistribution: 'playstore',
  androidTelemetry: 'nenhum',
  // iOS
  iosMinVersion: '16',
  iosUI: 'swiftui',
  iosIpad: 'nao',
  iosPermissions: [],
  iosPush: 'nao',
  iosPushType: '',
  iosOffline: 'nao',
  iosAuth: 'nenhuma',
  iosDistribution: 'appstore',
  iosPrivacyScreen: 'nao',
  // CLI
  cliPurpose: '',
  cliCommands: '',
  cliInput: 'args',
  cliOutput: 'texto',
  cliConfig: 'flags',
  cliInteractive: 'nao',
  cliPlatforms: ['linux', 'macos', 'windows'],
  cliInstall: 'binario',
  // GUI
  guiFramework: '',
  guiFlow: '',
  guiFiles: 'nao',
  guiFileFormats: '',
  guiShortcuts: 'nao',
  guiAutoUpdate: 'nao',
  guiPersistence: 'config',
  guiPackaging: 'installer',
  // Docker
  dockerType: '',
  dockerPorts: '',
  dockerVolumes: 'nao',
  dockerVolumePaths: '',
  dockerEnvVars: '',
  dockerHealthcheck: 'sim',
  dockerNonRoot: 'sim',
  dockerMultistage: 'sim',
  dockerCompose: 'nao',
  dockerServices: '',
  // API
  apiType: 'rest',
  apiFramework: '',
  apiDomain: '',
  apiResources: '',
  apiAuth: 'jwt',
  apiDatabase: 'sqlite',
  apiCache: 'nenhum',
  apiPagination: 'sim',
  apiRateLimit: 'sim',
  apiVersioning: 'sim',
  apiDocs: 'sim',
  apiJobs: 'nao',
  apiSchema: '',
  // Créditos
  creditsText: '',
  creditsLocation: 'readme',
  // Extras
  notes: '',
};

// Interface de Preset
export interface Preset {
  id: string;
  name: string;
  description: string;
  icon: string;
  appType: AppType;
  stack: Stack;
  data: Partial<FormData>;
}

// Presets pré-definidos
export const presets: Preset[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Página de conversão simples com CTA',
    icon: 'Globe',
    appType: 'website',
    stack: 'typescript',
    data: {
      websiteType: 'landing-page',
      websitePages: ['Home'],
      contentType: 'estatico',
      ctaType: 'whatsapp',
      needsSEO: 'sim',
      needsAnalytics: 'simples',
      websiteForms: 'lead',
      designStyle: 'moderno',
      hasAuth: 'nao',
      storesData: 'nao',
      offlineSupport: 'nao',
      scope: 'mvp',
    }
  },
  {
    id: 'portfolio',
    name: 'Portfólio Pessoal',
    description: 'Site para mostrar seus projetos',
    icon: 'User',
    appType: 'website',
    stack: 'typescript',
    data: {
      websiteType: 'portfolio',
      websitePages: ['Home', 'Sobre', 'Projetos', 'Contato'],
      contentType: 'estatico',
      ctaType: 'email',
      needsSEO: 'sim',
      needsAnalytics: 'simples',
      websiteForms: 'nenhum',
      designStyle: 'minimalista',
      hasAuth: 'nao',
      storesData: 'nao',
      scope: 'mvp',
    }
  },
  {
    id: 'dashboard',
    name: 'Dashboard Admin',
    description: 'Painel administrativo com autenticação',
    icon: 'LayoutDashboard',
    appType: 'website',
    stack: 'typescript',
    data: {
      websiteType: 'dashboard',
      websitePages: ['Login', 'Dashboard', 'Usuários', 'Configurações'],
      contentType: 'editavel',
      needsSEO: 'nao',
      needsAnalytics: 'completo',
      websiteForms: 'multiplo',
      designStyle: 'moderno',
      hasAuth: 'sim',
      authType: 'jwt',
      storesData: 'sim',
      storageType: 'postgres',
      scope: 'completo',
      codeQuality: 'arquitetura',
      tests: 'integracao',
    }
  },
  {
    id: 'android-app',
    name: 'App Android Nativo',
    description: 'Aplicativo Android com Jetpack Compose',
    icon: 'Smartphone',
    appType: 'android',
    stack: 'kotlin',
    data: {
      androidUI: 'compose',
      androidMinVersion: '10',
      androidOrientation: 'portrait',
      androidOffline: 'cache',
      androidAuth: 'email',
      androidDistribution: 'playstore',
      hasAuth: 'sim',
      storesData: 'sim',
      storageType: 'sqlite',
      scope: 'mvp',
    }
  },
  {
    id: 'ios-app',
    name: 'App iOS Nativo',
    description: 'Aplicativo iOS com SwiftUI',
    icon: 'Apple',
    appType: 'ios',
    stack: 'swift',
    data: {
      iosUI: 'swiftui',
      iosMinVersion: '16',
      iosOffline: 'cache',
      iosAuth: 'apple',
      iosDistribution: 'appstore',
      hasAuth: 'sim',
      storesData: 'sim',
      storageType: 'coredata',
      scope: 'mvp',
    }
  },
  {
    id: 'cli-tool',
    name: 'Ferramenta CLI',
    description: 'Utilitário de linha de comando',
    icon: 'Terminal',
    appType: 'cli',
    stack: 'rust',
    data: {
      cliInput: 'args',
      cliOutput: 'texto',
      cliConfig: 'flags',
      cliInteractive: 'nao',
      cliPlatforms: ['linux', 'macos', 'windows'],
      cliInstall: 'binario',
      hasAuth: 'nao',
      storesData: 'nao',
      scope: 'mvp',
    }
  },
  {
    id: 'api-fiber',
    name: 'API Ultra-rápida (Go Fiber)',
    description: 'Framework minimalista v3 - Estilo Express',
    icon: 'Zap',
    appType: 'api',
    stack: 'go',
    data: {
      apiType: 'rest',
      apiFramework: 'Fiber v3',
      apiAuth: 'jwt',
      apiDatabase: 'postgres',
      apiCache: 'redis',
      apiPagination: 'sim',
      apiRateLimit: 'sim',
      apiVersioning: 'sim',
      apiDocs: 'sim',
      hasAuth: 'sim',
      storesData: 'sim',
      storageType: 'postgres',
      scope: 'completo',
      codeQuality: 'arquitetura',
    }
  },
  {
    id: 'api-fastapi',
    name: 'API Inteligente (FastAPI)',
    description: 'Python com tipagem forte e performance',
    icon: 'Server',
    appType: 'api',
    stack: 'python',
    data: {
      apiType: 'rest',
      apiFramework: 'FastAPI',
      apiAuth: 'jwt',
      apiDatabase: 'postgres',
      apiCache: 'redis',
      apiPagination: 'sim',
      apiDocs: 'sim',
      hasAuth: 'sim',
      storesData: 'sim',
      scope: 'mvp',
    }
  },
  {
    id: 'api-axum',
    name: 'Backend Robusto (Rust Axum)',
    description: 'Segurança extrema e performance Tokio',
    icon: 'Shield',
    appType: 'api',
    stack: 'rust',
    data: {
      apiType: 'rest',
      apiFramework: 'Axum v0.8',
      apiAuth: 'jwt',
      apiDatabase: 'postgres',
      apiCache: 'redis',
      apiPagination: 'sim',
      apiVersioning: 'sim',
      apiDocs: 'sim',
      hasAuth: 'sim',
      storesData: 'sim',
      scope: 'completo',
      codeQuality: 'arquitetura',
    }
  },
  {
    id: 'api-aspnet',
    name: 'Microserviço Enterprise (.NET 10)',
    description: 'ASP.NET Core moderno e escalável',
    icon: 'Layers',
    appType: 'api',
    stack: 'csharp',
    data: {
      apiType: 'rest',
      apiFramework: 'ASP.NET Core 10',
      apiAuth: 'rbac',
      apiDatabase: 'postgres',
      apiCache: 'redis',
      apiPagination: 'sim',
      apiRateLimit: 'sim',
      apiVersioning: 'sim',
      apiDocs: 'sim',
      hasAuth: 'sim',
      storesData: 'sim',
      scope: 'completo',
      codeQuality: 'arquitetura',
    }
  },
  {
    id: 'docker-service',
    name: 'Container Docker',
    description: 'Serviço containerizado com Compose',
    icon: 'Container',
    appType: 'docker',
    stack: 'go',
    data: {
      dockerType: 'api',
      dockerHealthcheck: 'sim',
      dockerNonRoot: 'sim',
      dockerMultistage: 'sim',
      dockerCompose: 'sim',
      scope: 'completo',
    }
  },
  {
    id: 'tauri-desktop',
    name: 'App Desktop Moderno (Tauri)',
    description: 'Interface Web com performance Rust (Tauri 2.0)',
    icon: 'Monitor',
    appType: 'gui',
    stack: 'rust',
    data: {
      guiFramework: 'tauri',
      guiPersistence: 'banco',
      guiPackaging: 'installer',
      guiAutoUpdate: 'sim',
      hasAuth: 'nao',
      storesData: 'sim',
      storageType: 'sqlite',
      scope: 'completo',
      codeQuality: 'arquitetura',
    }
  },
  {
    id: 'wails-go-desktop',
    name: 'Desktop de Alta Performance (Wails)',
    description: 'Backend em Go com frontend Web (Wails v3)',
    icon: 'Terminal',
    appType: 'gui',
    stack: 'go',
    data: {
      guiFramework: 'wails',
      guiPersistence: 'config',
      guiPackaging: 'portable',
      hasAuth: 'nao',
      storesData: 'sim',
      storageType: 'sqlite',
      scope: 'mvp',
    }
  },
  {
    id: 'electron-enterprise',
    name: 'App Desktop Corporativo (Electron)',
    description: 'Ecossistema TypeScript maduro e robusto',
    icon: 'Code2',
    appType: 'gui',
    stack: 'typescript',
    data: {
      guiFramework: 'electron',
      guiPersistence: 'banco',
      guiPackaging: 'ambos',
      guiAutoUpdate: 'sim',
      hasAuth: 'sim',
      authType: 'sso',
      storesData: 'sim',
      storageType: 'sqlite',
      scope: 'completo',
      codeQuality: 'arquitetura',
    }
  },
  {
    id: 'microservice',
    name: 'Microserviço de Autenticação',
    description: 'Serviço performático com Go e JWT',
    icon: 'Shield',
    appType: 'api',
    stack: 'go',
    data: {
      apiType: 'rest',
      apiFramework: 'Fiber v3',
      apiAuth: 'jwt',
      apiDatabase: 'postgres',
      apiResources: 'Auth, Users, Permissions',
      hasAuth: 'sim',
      storesData: 'sim',
      storageType: 'postgres',
      scope: 'completo',
      codeQuality: 'arquitetura',
    }
  },
  {
    id: 'discord-bot',
    name: 'Bot de Discord',
    description: 'CLI interativo para automação',
    icon: 'Terminal',
    appType: 'cli',
    stack: 'typescript',
    data: {
      cliPurpose: 'Automação de servidores e comandos interativos',
      cliCommands: '!ping, !ban, !help',
      cliInteractive: 'sim',
      cliPlatforms: ['linux'],
      hasAuth: 'nao',
      storesData: 'sim',
      storageType: 'mongodb',
    }
  },
  {
    id: 'financas-pessoais',
    name: 'App de Finanças',
    description: 'Gestão de gastos mobile (iOS)',
    icon: 'Apple',
    appType: 'ios',
    stack: 'swift',
    data: {
      iosUI: 'swiftui',
      iosMinVersion: '17',
      iosOffline: 'sync',
      iosAuth: 'apple',
      hasAuth: 'sim',
      storesData: 'sim',
      storageType: 'swiftdata',
      features: ['auth', 'pagamentos', 'geolocalizacao'],
    }
  },
  {
    id: 'flutter-app',
    name: 'App Cross-platform (Flutter)',
    description: 'Aplicativo de alta performance para Android e iOS',
    icon: 'Smartphone',
    appType: 'android',
    stack: 'dart',
    data: {
      androidUI: 'compose', // Representa a natureza declarativa do Flutter
      androidMinVersion: '21',
      androidOrientation: 'ambos',
      androidOffline: 'sync',
      hasAuth: 'sim',
      storesData: 'sim',
      storageType: 'sqlite',
      scope: 'mvp',
      features: ['auth', 'notificacoes', 'geolocalizacao'],
    }
  },
  {
    id: 'maui-enterprise',
    name: 'App Corporativo (MAUI)',
    description: 'Solução robusta .NET para Windows e Android',
    icon: 'Monitor',
    appType: 'gui',
    stack: 'csharp',
    data: {
      guiFramework: 'maui',
      guiPersistence: 'banco',
      guiPackaging: 'installer',
      hasAuth: 'sim',
      authType: 'sso',
      storesData: 'sim',
      storageType: 'sqlite',
      scope: 'completo',
      codeQuality: 'arquitetura',
    }
  },
  {
    id: 'local-ai-agent',
    name: 'Agente de IA Local',
    description: 'Automação com Python e Ollama/LangChain',
    icon: 'Cpu',
    appType: 'cli',
    stack: 'python',
    data: {
      cliPurpose: 'Agente inteligente para automação de tarefas locais',
      cliInteractive: 'sim',
      features: ['api-externa', 'busca'],
      hasAuth: 'nao',
      storesData: 'sim',
      storageType: 'sqlite',
      scope: 'completo',
      notes: 'Integração direta com Ollama API e LangChain para processamento local.',
    }
  },
];

// Opções para selects
export const appTypeOptions = [
  { value: 'website', label: 'Website', icon: 'Globe', desc: 'Sites, landing pages, dashboards' },
  { value: 'android', label: 'Android', icon: 'Smartphone', desc: 'Apps nativos ou cross-platform' },
  { value: 'ios', label: 'iOS', icon: 'Apple', desc: 'Apps para iPhone e iPad' },
  { value: 'cli', label: 'CLI', icon: 'Terminal', desc: 'Ferramentas de linha de comando' },
  { value: 'gui', label: 'GUI Desktop', icon: 'Monitor', desc: 'Apps para Windows, macOS, Linux' },
  { value: 'docker', label: 'Docker/Podman', icon: 'Container', desc: 'Containers e orquestração' },
  { value: 'api', label: 'API/Backend', icon: 'Server', desc: 'REST, GraphQL, gRPC' },
];

// Mapeamento de compatibilidade: quais stacks funcionam com cada tipo de app
export const stackCompatibility: Record<AppType, Stack[]> = {
  website: ['typescript', 'python', 'go'],
  android: ['kotlin', 'java', 'csharp', 'dart', 'typescript'], // C# (MAUI), Dart (Flutter), TS (React Native)
  ios: ['swift', 'csharp', 'dart', 'typescript'], // C# (MAUI), Dart (Flutter), TS (React Native)
  cli: ['go', 'rust', 'python', 'typescript', 'cpp', 'csharp', 'dart'],
  gui: ['csharp', 'cpp', 'typescript', 'rust', 'python', 'kotlin', 'swift', 'java', 'dart'], // C# (MAUI/Avalonia), Dart (Flutter)
  docker: ['go', 'rust', 'python', 'typescript', 'java', 'csharp'],
  api: ['go', 'rust', 'python', 'typescript', 'java', 'csharp'],
};

export const stackOptions = [
  { value: 'go', label: 'Go', desc: 'Sistemas rápidos, APIs e Microserviços' },
  { value: 'rust', label: 'Rust', desc: 'Segurança de memória e performance extrema' },
  { value: 'python', label: 'Python', desc: 'IA, Automação e Prototipagem rápida' },
  { value: 'typescript', label: 'TypeScript', desc: 'Ecossistema JS/Node - Web e Desktop' },
  { value: 'cpp', label: 'C++', desc: 'Software de baixo nível e alto desempenho' },
  { value: 'csharp', label: 'C#', desc: 'MAUI, Unity e Ecossistema .NET' },
  { value: 'kotlin', label: 'Kotlin', desc: 'Android Moderno e Multiplatform (KMP)' },
  { value: 'swift', label: 'Swift', desc: 'Ecossistema Apple e SwiftUI' },
  { value: 'java', label: 'Java', desc: 'Sistemas corporativos e legados' },
  { value: 'dart', label: 'Dart', desc: 'Performance nativa com Flutter' },
];

export const featureOptions = [
  { value: 'auth', label: 'Autenticação (Login/Cadastro)' },
  { value: 'pagamentos', label: 'Gateway de Pagamentos (Stripe/Pix)' },
  { value: 'upload', label: 'Upload de Arquivos/Imagens' },
  { value: 'chat', label: 'Chat em Tempo Real (WebSockets)' },
  { value: 'api-externa', label: 'Integração com APIs Terceiras' },
  { value: 'busca', label: 'Sistema de Busca/Filtros' },
  { value: 'multi-idioma', label: 'Suporte a Vários Idiomas (i18n)' },
  { value: 'offline', label: 'Modo Offline / PWA' },
  { value: 'notificacoes', label: 'Notificações Push' },
  { value: 'geolocalizacao', label: 'GPS e Mapas' },
];

export const websiteTypeOptions = [
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'institucional', label: 'Site Institucional' },
  { value: 'portfolio', label: 'Portfólio' },
  { value: 'blog', label: 'Blog / Notícias' },
  { value: 'ecommerce', label: 'E-commerce / Loja Virtual' },
  { value: 'dashboard', label: 'Dashboard / ERP' },
  { value: 'saas', label: 'Plataforma SaaS' },
];

export const websitePageOptions = [
  { value: 'Home', label: 'Home' },
  { value: 'Sobre', label: 'Sobre' },
  { value: 'Serviços', label: 'Serviços' },
  { value: 'Projetos', label: 'Projetos' },
  { value: 'Blog', label: 'Blog' },
  { value: 'Contato', label: 'Contato' },
  { value: 'Checkout', label: 'Checkout' },
  { value: 'Perfil', label: 'Perfil do Usuário' },
  { value: 'FAQ', label: 'FAQ' },
  { value: 'Admin', label: 'Área do Administrador' },
];

export const collectedDataOptions = [
  { value: 'nome', label: 'Nome Completo' },
  { value: 'email', label: 'E-mail' },
  { value: 'telefone', label: 'Telefone/WhatsApp' },
  { value: 'endereco', label: 'Endereço Físico' },
  { value: 'cpf', label: 'CPF / CNPJ' },
  { value: 'ip', label: 'Log de IP' },
  { value: 'pagamento', label: 'Dados de Cartão' },
  { value: 'localizacao', label: 'Coordenadas GPS' },
];
