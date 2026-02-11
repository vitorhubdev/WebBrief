import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Globe, Layout, Palette, Search, BarChart3, FileText } from 'lucide-react';
import type { FormData } from '@/types';
import { websiteTypeOptions, websitePageOptions } from '@/types';

interface WebsiteModuleProps {
  formData: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  toggleArrayField: <K extends keyof FormData>(field: K, value: string) => void;
}

export function WebsiteModule({ formData, updateField, toggleArrayField }: WebsiteModuleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Globe className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Configurações do Website</h3>
      </div>

      {/* Tipo de site */}
      <div className="space-y-3">
        <Label>Tipo de site</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {websiteTypeOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => updateField('websiteType', option.value)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${
                formData.websiteType === option.value
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-muted/50'
              }`}
            >
              <span className="text-sm font-medium">{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Páginas */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-muted-foreground" />
          <Label>Páginas/rotas desejadas</Label>
        </div>
        <Card className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {websitePageOptions.map((page) => (
              <div key={page.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`page-${page.value}`}
                  checked={formData.websitePages.includes(page.value)}
                  onCheckedChange={() => toggleArrayField('websitePages', page.value)}
                />
                <Label htmlFor={`page-${page.value}`} className="text-sm cursor-pointer">
                  {page.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Conteúdo */}
      <div className="space-y-3">
        <Label>Tipo de conteúdo</Label>
        <RadioGroup
          value={formData.contentType}
          onValueChange={(v) => updateField('contentType', v as 'estatico' | 'editavel')}
          className="grid grid-cols-2 gap-3"
        >
          <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="estatico" id="content-estatico" className="mt-1" />
            <div>
              <Label htmlFor="content-estatico" className="cursor-pointer font-medium">Estático</Label>
              <p className="text-xs text-muted-foreground">Hardcoded no código</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="editavel" id="content-editavel" className="mt-1" />
            <div>
              <Label htmlFor="content-editavel" className="cursor-pointer font-medium">Editável</Label>
              <p className="text-xs text-muted-foreground">CMS, headless, markdown</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <Label>CTA principal (Call-to-Action)</Label>
        <RadioGroup
          value={formData.ctaType}
          onValueChange={(v) => updateField('ctaType', v)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {['whatsapp', 'instagram', 'email', 'outro'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <RadioGroupItem value={type} id={`cta-${type}`} />
              <Label htmlFor={`cta-${type}`} className="cursor-pointer capitalize">{type}</Label>
            </div>
          ))}
        </RadioGroup>
        <Input
          placeholder="Número do WhatsApp, @instagram ou email..."
          value={formData.ctaValue}
          onChange={(e) => updateField('ctaValue', e.target.value)}
        />
      </div>

      {/* SEO e Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Label>SEO</Label>
          </div>
          <RadioGroup
            value={formData.needsSEO}
            onValueChange={(v) => updateField('needsSEO', v as 'sim' | 'nao')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="seo-sim" />
              <Label htmlFor="seo-sim" className="cursor-pointer text-sm">Sim (blog + sitemap)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="seo-nao" />
              <Label htmlFor="seo-nao" className="cursor-pointer text-sm">Não prioritário</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <Label>Analytics</Label>
          </div>
          <RadioGroup
            value={formData.needsAnalytics}
            onValueChange={(v) => updateField('needsAnalytics', v as 'nenhum' | 'simples' | 'completo')}
            className="flex gap-4 flex-wrap"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nenhum" id="analytics-none" />
              <Label htmlFor="analytics-none" className="cursor-pointer text-sm">Nenhum</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="simples" id="analytics-simples" />
              <Label htmlFor="analytics-simples" className="cursor-pointer text-sm">Simples</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="completo" id="analytics-completo" />
              <Label htmlFor="analytics-completo" className="cursor-pointer text-sm">Completo</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Design */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <Label>Estilo de design</Label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['minimalista', 'moderno', 'criativo', 'corporativo'].map((style) => (
            <div
              key={style}
              onClick={() => updateField('designStyle', style)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors text-center ${
                formData.designStyle === style ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
              }`}
            >
              <span className="text-sm capitalize">{style}</span>
            </div>
          ))}
        </div>
        <Input
          placeholder="Link de referência de design (opcional)"
          value={formData.designReference}
          onChange={(e) => updateField('designReference', e.target.value)}
        />
      </div>

      {/* Formulários */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <Label>Formulários</Label>
        </div>
        <RadioGroup
          value={formData.websiteForms}
          onValueChange={(v) => updateField('websiteForms', v as 'nenhum' | 'lead' | 'multiplo')}
          className="flex gap-4 flex-wrap"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nenhum" id="forms-none" />
            <Label htmlFor="forms-none" className="cursor-pointer text-sm">Nenhum</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lead" id="forms-lead" />
            <Label htmlFor="forms-lead" className="cursor-pointer text-sm">Lead simples</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multiplo" id="forms-multi" />
            <Label htmlFor="forms-multi" className="cursor-pointer text-sm">Múltiplos</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Crawlers de IA */}
      <div className="space-y-3">
        <Label>Permitir crawlers de IA indexarem o site?</Label>
        <RadioGroup
          value={formData.allowAICrawlers}
          onValueChange={(v) => updateField('allowAICrawlers', v as 'sim' | 'nao')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="crawlers-sim" />
            <Label htmlFor="crawlers-sim" className="cursor-pointer text-sm">Sim (recomendado)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="crawlers-nao" />
            <Label htmlFor="crawlers-nao" className="cursor-pointer text-sm">Não</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
