// Tipos de aplicação suportados
export type AppType = 'website' | 'android' | 'ios' | 'cli' | 'gui' | 'docker' | 'api';

// Stacks/Linguagens suportadas
export type Stack = 'go' | 'rust' | 'python' | 'typescript' | 'cpp' | 'csharp' | 'kotlin' | 'swift' | 'java';

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
  apiDomain: string;
  apiResources: string;
  apiAuth: 'nenhuma' | 'jwt' | 'oauth' | 'apikey' | 'rbac';
  apiDatabase: 'nenhum' | 'sqlite' | 'postgres' | 'mysql' | 'mongodb' | 'redis';
  apiCache: 'nenhum' | 'redis' | 'outro';
  apiPagination: 'sim' | 'nao';
  apiRateLimit: 'sim' | 'nao';
  apiVersioning: 'sim' | 'nao';
  apiDocs: 'sim' | 'nao';
  apiJobs: 'sim' | 'nao';
  
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
    id: 'api-rest',
    name: 'API REST',
    description: 'Backend com autenticação JWT',
    icon: 'Server',
    appType: 'api',
    stack: 'go',
    data: {
      apiType: 'rest',
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
      tests: 'integracao',
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
    id: 'desktop-app',
    name: 'App Desktop',
    description: 'Aplicação multi-plataforma',
    icon: 'Monitor',
    appType: 'gui',
    stack: 'typescript',
    data: {
      guiFramework: 'tauri',
      guiPersistence: 'config',
      guiPackaging: 'installer',
      guiAutoUpdate: 'sim',
      hasAuth: 'nao',
      storesData: 'sim',
      storageType: 'sqlite',
      scope: 'mvp',
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

export const stackOptions = [
  { value: 'go', label: 'Go', desc: 'Alta performance, concorrência' },
  { value: 'rust', label: 'Rust', desc: 'Segurança, performance' },
  { value: 'python', label: 'Python', desc: 'Produtividade, IA/ML' },
  { value: 'typescript', label: 'TypeScript', desc: 'Bun/Node - Web moderna' },
  { value: 'cpp', label: 'C++', desc: 'Sistemas, games, embarcado' },
  { value: 'csharp', label: 'C#', desc: '.NET, Windows, Unity' },
  { value: 'kotlin', label: 'Kotlin', desc: 'Android nativo' },
  { value: 'swift', label: 'Swift', desc: 'iOS/macOS nativo' },
  { value: 'java', label: 'Java', desc: 'Android, enterprise' },
];

export const featureOptions = [
  { value: 'auth', label: 'Autenticação de usuários' },
  { value: 'pagamentos', label: 'Sistema de pagamentos' },
  { value: 'upload', label: 'Upload de arquivos' },
  { value: 'chat', label: 'Chat/Mensagens em tempo real' },
  { value: 'api-externa', label: 'Integração com APIs externas' },
  { value: 'busca', label: 'Sistema de busca' },
  { value: 'multi-idioma', label: 'Multi-idioma (i18n)' },
  { value: 'offline', label: 'Funciona offline' },
  { value: 'notificacoes', label: 'Notificações push' },
  { value: 'geolocalizacao', label: 'GPS/Geolocalização' },
];

export const websiteTypeOptions = [
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'institucional', label: 'Institucional' },
  { value: 'portfolio', label: 'Portfólio' },
  { value: 'blog', label: 'Blog' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'dashboard', label: 'Dashboard/Painel' },
  { value: 'saas', label: 'SaaS/Plataforma' },
];

export const websitePageOptions = [
  { value: 'Home', label: 'Home' },
  { value: 'Sobre', label: 'Sobre' },
  { value: 'Serviços', label: 'Serviços' },
  { value: 'Portfólio', label: 'Portfólio' },
  { value: 'Blog', label: 'Blog' },
  { value: 'Contato', label: 'Contato' },
  { value: 'FAQ', label: 'FAQ' },
  { value: 'Preços', label: 'Preços' },
  { value: 'Login', label: 'Login' },
  { value: 'Dashboard', label: 'Dashboard' },
];

export const collectedDataOptions = [
  { value: 'nome', label: 'Nome' },
  { value: 'email', label: 'Email' },
  { value: 'telefone', label: 'Telefone' },
  { value: 'endereco', label: 'Endereço' },
  { value: 'cpf', label: 'CPF/CNPJ' },
  { value: 'ip', label: 'Endereço IP' },
  { value: 'pagamento', label: 'Dados de pagamento' },
  { value: 'localizacao', label: 'Localização' },
];
