import type { MessageTree } from './pt';

const en = {
  brand: {
    name: 'WebBrief',
    tagline: 'Structured brief + agent kit',
    byVitorHub: 'by VitorHub',
  },
  lang: {
    toggle: 'Language',
    pt: 'Português',
    en: 'English',
  },
  common: {
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    clear: 'Clear',
    recommended: 'recommended',
    files: 'files',
    tokens: 'tokens',
    draft: 'Draft',
    previous: 'Back',
    continue: 'Continue',
    generateKit: 'Generate kit',
    skipToContent: 'Skip to main content',
  },
  header: {
    kit: 'Kit',
    import: 'Import',
    export: 'Export',
    resetTitle: 'Start over?',
    resetDesc: 'This clears your current answers.',
    importSuccess: 'Configuration imported',
    importError: 'Invalid JSON. Nothing was changed.',
    exportSuccess: 'JSON downloaded',
    themeLight: 'Switch to light theme',
    themeDark: 'Switch to dark theme',
    github: 'View GitHub profile',
    githubSr: 'Developer GitHub (opens in a new tab)',
    importAria: 'Import configuration',
    exportAria: 'Export configuration',
    clearAria: 'Clear saved data',
    fullscreenExit: 'Exit fullscreen',
    fullscreenEnter: 'Focus mode',
  },
  steps: {
    model: 'Template',
    idea: 'Idea',
    adjustments: 'Harness',
    stepAria: 'Step {{id}}: {{title}}{{invalid}}',
    incomplete: ' (incomplete)',
  },
  hero: {
    eyebrow: 'A professional brief for your project',
    titleLine1: 'Describe the project.',
    titleLine2: 'Export the kit.',
    subtitle:
      'In a few minutes you lock scope, stack, and harness. The zip ships AGENTS.md, skills, and adapters — without rewriting the brief mid-flight.',
  },
  features: {
    skills: {
      title: 'Use-case skills',
      desc: 'Landing, store, SaaS, blog, app, API, CLI, desktop — SKILL.md tailored to your copy.',
    },
    rhythms: {
      title: 'Three rhythms',
      desc: 'Rapid, structured, or spec-driven. Same form.',
    },
    harness: {
      title: 'Harness & context',
      desc: 'Pi, Codex, Claude Code, Antigravity (/boost), and more. Optional Jev for decisions only — not for writing code.',
    },
  },
  generator: {
    aria: 'Brief builder',
    step1Title: 'Pick a template',
    step1Desc: 'Tap a card. Chips show which skills land in the zip.',
    step2Title: 'Tell the story',
    step2Desc: 'Name, what it does, who uses it, the main click.',
    step3Title: 'Harness & tweaks',
    step3Desc: 'Choose where the kit will run. Defaults are fine for the rest.',
    fillRequired: 'Fill in the required fields highlighted in red.',
    kitGenerated: 'Kit generated',
    patternApplied: 'Template “{{name}}” applied',
  },
  tips: {
    tokensTitle: 'Token economy',
    tokensIntro:
      'The model writes. The harness decides what enters context. These tips follow the harness you picked in step 3.',
    loopsTitle: 'Ralph or Gauntlet',
    loopsBody:
      'Ralph repeats the same request with a fresh context until tests pass. Gauntlet pits a clean critic against a named quality bar — Linear’s pricing page, the jq CLI — and stops when yours wins or you say stop.',
    jevTitle: 'Jev is not the agent',
    jevBody:
      'Jev classifies: which skill to open, which tool fits, whether the expensive model is worth it. Code still comes from Pi, Codex, Claude Code, or whichever harness you chose.',
    footerNote: 'ECONOMIA.md in the zip · skills on demand · one task per context',
  },
  footer: {
    terms: 'Terms',
    privacy: 'Privacy',
    github: 'GitHub',
    author: 'Vitor',
    site: 'vitorhub.com',
    mit: 'MIT',
  },
  easyStart: {
    introTitle: 'Start from a template.',
    introBody:
      'Each template ships case skills (conversion, checkout, auth, CLI…). You describe the idea; the zip adapts skills to your text.',
    whatBuild: 'What do you want to build?',
    orType: 'Or pick a type only if no template fits',
    language: 'Language / stack',
    dontKnow: 'Not sure — use {{stack}}',
  },
  easyStory: {
    hint: 'Write like you would to a teammate. Concrete beats vague.',
    projectName: 'Project name *',
    projectPlaceholder: 'e.g. Studio Aurora',
    pitch: 'What does it do, in one sentence? *',
    pitchPlaceholder: 'e.g. Page for yoga students to book a trial class via WhatsApp.',
    audience: 'Who will use it?',
    audiencePlaceholder: 'e.g. women 25–45 in my city',
    mainAction: 'The most important action *',
    mainActionPlaceholder: 'e.g. click Book and open WhatsApp',
    notes: 'Anything the agent must NOT do?',
    notesPlaceholder: 'e.g. no inventory, no login, calm colors, Brazilian Portuguese copy.',
  },
  easyExtras: {
    skillsTitle: 'Skills in this template’s zip',
    skillsHint:
      'Core (anti-slop, copy, verify, debug) plus case skills. Step 2 text flows into the “Adapt” block.',
    harnessLabel: 'Which harness do you use?',
    harnessHint:
      'The harness reads the folder and calls the model. If unsure, leave “Any agent”.',
    jevTitle: 'Jev on top of the harness',
    jevHint:
      'Optional. Jev does not write code — it picks skill, tool, and whether the pricey model is worth it. Implementation stays with the harness.',
    jevAria: 'Use Jev for decisions',
    loopIntroTitle: 'Minutes now. Hours without editing the prompt.',
    loopIntroBody:
      'You define what “done” means. The agent loops on its own. No “good enough”: either the check wins or you stop it.',
    qualityBar: 'Quality bar',
    qualityPlaceholder: 'e.g. Linear’s pricing page, or the jq CLI',
    qualityHint:
      'Must be something named that the critic can open. Empty: the skill suggests 2–3 bars and stops without building.',
    workflowLabel: 'Agent rhythm',
    authLabel: 'Need login?',
    featuresLabel: 'Check only what matters',
    moreDetails: 'More details (optional)',
  },
  resultado: {
    title: 'Kit ready',
    previewMeta:
      '{{count}} files in preview · zip with prompt, skills, and rules for {{mode}} · {{harness}}{{jev}}{{loop}}',
    jevSuffix: ' · Jev for decisions only',
    groupContract: 'Contract',
    groupSkills: 'Skills',
    groupSpec: 'Spec',
    copySuccess: '{{path}} copied',
    copyError: 'Could not copy',
    zipSuccess: 'Kit .zip downloaded — unzip into your project folder',
    zipError: 'Could not build the zip',
    zipButton: 'Download kit .zip',
    zipping: 'Building zip…',
    copyFile: 'Copy file',
    downloadOne: 'Download this file',
    newBrief: 'New brief',
    howToTitle: 'How to use today',
    howTo1: '1. Create the repo folder and unzip the .zip there (keep folder structure).',
    howTo2: '2. Open the folder in the agent you already use (chat or IDE).',
    howTo3: '3. Paste Kickoff as the first message.',
    howTo4: '4. In spec mode, do not ask for code until the plan is clear.',
    economyTitle: 'Token economy in this kit',
    whyKitTitle: 'Why a kit',
    whyKitBody:
      'Agents read files from the repo. A giant Markdown paste vanishes from context. AGENTS.md is the portable contract. ANTI-SLOP and skills work across tools. SPEC/TASKS stop invented requirements.',
    fileAria: 'Kit file',
  },
  workflowMode: {
    rapid: { label: 'Rapid', desc: 'One chat, MVP now. Still reads AGENTS.md and verifies at the end.' },
    structured: { label: 'Structured', desc: 'One task, one context. Default to avoid token bloat.' },
    spec: { label: 'Spec-driven', desc: 'Plan before code. Constitution, PLAN, and tasks.' },
  },
  workflowModeShort: {
    rapid: 'rapid',
    structured: 'structured',
    spec: 'spec-driven',
  },
  loopMode: {
    off: { label: 'No loop', desc: 'You drive each step. Cheaper.' },
    ralph: { label: 'Ralph loop', desc: 'Same request, fresh context, until tests pass.' },
    gauntlet: { label: 'Gauntlet loop', desc: 'Isolated builder and critic. Blind comparison to a bar.' },
  },
  specificModule: {
    empty: 'Select an application type to see specific settings',
  },
  tokenTips: {
    unzip: 'Unzip into the project folder. The agent reads files; pasting the whole kit wastes context.',
    oneTask: 'One TASKS.md item per conversation. Fresh context beats a bloated thread.',
    skillDesc: 'Skills enter by description. Full SKILL.md text only when the task needs it.',
    jev:
      'Jev decides what to surface, which tool fits, and whether the expensive model is worth it. Your harness still writes the code.',
  },
  economyByTarget: {
    generic:
      'If chat cannot open the folder, paste only Kickoff and the current task. Do not paste the zip, full SPEC, and every skill in one message.',
    cursor: 'Keep project rules short. The agent reads the file when needed. Do not repeat AGENTS.md in chat.',
    windsurf: 'The adapter only points to AGENTS.md. Do not duplicate the same text in .windsurfrules and the prompt.',
    'claude-code':
      'CLAUDE.md is a one-line shortcut to AGENTS.md. Wide search goes to a subagent; the main chat keeps the summary.',
    codex: 'Keep AGENTS.md short. Explore in a worktree or subagent. One batch of files at a time, with verify at the end.',
    gemini: 'GEMINI.md does not repeat the spec. Ask for the next task, not “continue where we left off” with full history.',
    antigravity: '/boost already splits work across isolated agents. Do not paste the kit in chat or stack another fan-out.',
    pi: 'Pi puts only the skill name and description in the prompt. SKILL.md body loads when the task needs it. Do not paste skills in chat.',
    omp:
      'Oh My Pi already reads AGENTS.md and .agents/skills, plus Claude/Cursor/Codex configs if present. Do not duplicate the same rule in five files.',
    opencode: 'The override is intentionally short. Skills live on disk. Do not resend history when you only need the next task.',
    kilo: 'Send exploration to a background subagent. The main agent gets the summary, not the search log.',
    cline: 'One task per session. If the same error returns twice, open fresh context with the task and error — do not push more prompt.',
    crush: 'Lean harness. Every MCP server you attach spends context on every message, even when unused.',
    dsh: 'The session is a log. Resume or fork. Do not paste what the harness already stored.',
  },
} as MessageTree;

export default en;
