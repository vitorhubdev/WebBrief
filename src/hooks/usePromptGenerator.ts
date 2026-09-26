import { useState, useCallback, useEffect, useMemo } from 'react';
import type { AppType, FormData, Preset, ProductPattern, Stack } from '@/types';
import { initialFormData, normalizePromptTarget, presets, recommendedFramework, recommendedStack, stackCompatibility } from '@/types';
import { normalizeLoopMode } from '@/lib/loopKit';
import {
  generateAgentsMd,
  generatePromptText,
  generateTOON,
  generateXML,
} from '@/lib/promptGenerator';
import { assembleDownloadPackage } from '@/lib/kitPackage';
import { buildZipBlob, slugifyName } from '@/lib/kitZip';
import { generateVibeKit, type KitFile } from '@/lib/vibeKit';

const STORAGE_KEY = 'promptgen-config-v2';

function mergeFormData(raw: unknown): FormData {
  if (!raw || typeof raw !== 'object') {
    return initialFormData;
  }
  const merged = { ...initialFormData, ...(raw as Partial<FormData>) };
  return {
    ...merged,
    promptTarget: normalizePromptTarget(merged.promptTarget),
    useJev: merged.useJev === true,
    loopMode: normalizeLoopMode(merged.loopMode),
    qualityBar: typeof merged.qualityBar === 'string' ? merged.qualityBar : '',
  };
}

export function usePromptGenerator() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return initialFormData;
    }

    try {
      return mergeFormData(JSON.parse(saved));
    } catch (e) {
      console.error('Erro ao carregar configuração:', e);
    }

    return initialFormData;
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const vibeKit = useMemo(() => generateVibeKit(formData), [formData]);

  const promptStats = useMemo(() => {
    const preview = generatePromptText(formData);
    const kitChars = vibeKit.reduce((n, f) => n + f.content.length, 0);
    return {
      tokens: Math.ceil(preview.length / 4),
      characters: preview.length,
      lines: preview.split('\n').length,
      preview,
      kitFiles: vibeKit.length,
      kitTokens: Math.ceil(kitChars / 4),
    };
  }, [formData, vibeKit]);

  useEffect(() => {
    if (formData.projectName || formData.appType) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => {
      if (field === 'appType') {
        const nextType = value as AppType | '';
        const stackStillOk =
          nextType &&
          prev.stack &&
          stackCompatibility[nextType].includes(prev.stack as Stack);
        const nextStack = stackStillOk
          ? prev.stack
          : nextType
            ? recommendedStack[nextType]
            : '';
        return {
          ...prev,
          appType: nextType,
          stack: nextStack,
          patternId: '',
          framework:
            prev.framework ||
            (nextStack ? recommendedFramework[nextStack] || '' : ''),
        };
      }
      return { ...prev, [field]: value };
    });
  }, []);

  const toggleArrayField = useCallback(<K extends keyof FormData>(field: K, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  }, []);

  const loadPreset = useCallback((preset: Preset) => {
    setFormData((prev) => ({
      ...initialFormData,
      appType: preset.appType,
      stack: preset.stack,
      promptTarget: prev.promptTarget,
      useJev: prev.useJev,
      loopMode: prev.loopMode,
      qualityBar: prev.qualityBar,
      workflowMode: prev.workflowMode,
      framework: recommendedFramework[preset.stack] || '',
      ...preset.data,
    }));
  }, []);

  const loadPattern = useCallback((pattern: ProductPattern) => {
    setFormData((prev) => ({
      ...initialFormData,
      appType: pattern.appType,
      stack: pattern.stack,
      patternId: pattern.id,
      framework: pattern.framework,
      promptTarget: prev.promptTarget || 'generic',
      useJev: prev.useJev === true,
      loopMode: prev.loopMode || 'off',
      qualityBar: prev.qualityBar || '',
      workflowMode: prev.workflowMode || 'structured',
      ...pattern.data,
    }));
  }, []);

  const triggerDownload = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const downloadBlob = useCallback(
    (content: string, type: string, filename: string) => {
      triggerDownload(new Blob([content], { type }), filename);
    },
    [triggerDownload],
  );

  const slug = formData.projectName || 'untitled';

  const exportConfig = useCallback(() => {
    downloadBlob(JSON.stringify(formData, null, 2), 'application/json', `promptgen-config-${slug}.json`);
  }, [downloadBlob, formData, slug]);

  const exportTOON = useCallback(() => {
    downloadBlob(generateTOON(formData), 'text/plain', `prompt-config-${slug}.toon`);
  }, [downloadBlob, formData, slug]);

  const exportXML = useCallback(() => {
    downloadBlob(generateXML(formData), 'application/xml', `prompt-config-${slug}.xml`);
  }, [downloadBlob, formData, slug]);

  const exportAgents = useCallback(() => {
    const agents = vibeKit.find((f) => f.id === 'agents');
    downloadBlob(agents?.content || generateAgentsMd(formData), 'text/markdown', 'AGENTS.md');
  }, [downloadBlob, formData, vibeKit]);

  const exportKitFile = useCallback(
    (file: KitFile) => {
      const name = file.path.includes('/') ? file.path.replaceAll('/', '__') : file.path;
      downloadBlob(file.content, 'text/markdown', name);
    },
    [downloadBlob],
  );

  const exportKitAll = useCallback(async () => {
    const pack = assembleDownloadPackage(formData);
    const blob = buildZipBlob(pack.map((file) => ({ path: file.path, content: file.content })));
    const mode = formData.workflowMode || 'structured';
    const target = formData.promptTarget || 'generic';
    triggerDownload(blob, `${slugifyName(formData.projectName)}-${mode}-${target}-kit.zip`);
  }, [formData, triggerDownload]);

  const importConfig = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          setFormData(mergeFormData(JSON.parse(e.target?.result as string)));
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
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
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    formData,
    generatedPrompt,
    showResult,
    currentStep,
    setCurrentStep,
    updateField,
    toggleArrayField,
    loadPreset,
    loadPattern,
    generatePrompt,
    resetForm,
    exportConfig,
    exportTOON,
    exportXML,
    exportAgents,
    exportKitFile,
    exportKitAll,
    vibeKit,
    importConfig,
    clearSavedData,
    promptStats,
    presets,
  };
}

export { generateAgentsMd, generatePromptText, generateTOON, generateXML };
