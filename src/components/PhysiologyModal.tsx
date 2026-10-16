/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modal de Fisiologia Humana 3D Ultra-realista
 * Catálogo Oficial dos 5 Modelos da Auditoria 360º + Adição Manual de Novos Modelos
 * Super-Skill Omni Video Director Pro
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Dna, 
  Sparkles, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  BookOpen, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  PhysiologyPreset, 
  getPhysiologyPresets, 
  saveCustomPhysiologyPreset, 
  deleteCustomPhysiologyPreset, 
  resetPhysiologyPresets 
} from '../engine/physiologyPresets';

interface PhysiologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId?: string;
  onSelectPreset: (preset: PhysiologyPreset) => void;
  onApplyPromptDirect?: (preset: PhysiologyPreset, lang: 'pt' | 'en') => void;
}

export const PhysiologyModal: React.FC<PhysiologyModalProps> = ({
  isOpen,
  onClose,
  selectedId,
  onSelectPreset,
  onApplyPromptDirect
}) => {
  const [presets, setPresets] = useState<PhysiologyPreset[]>([]);
  const [activeTab, setActiveTab] = useState<'catalog' | 'create'>('catalog');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Formulário para criação manual de novos modelos
  const [newLabel, setNewLabel] = useState('');
  const [newTooltip, setNewTooltip] = useState('');
  const [newEducationalGoal, setNewEducationalGoal] = useState('');
  const [newPtPrompt, setNewPtPrompt] = useState(
    'Omni e Fisiologia Humana 3D Ultra-realista: Simulação biomédica interna em computação gráfica cinematográfica. Escala anatômica de precisão microscópica PBR com tecidos orgânicos vivos, dispersão subsuperficial (SSS), oclusão de ambiente profunda, poeira suspensa e vinheta óptica nas bordas com profundidade de campo macro cinematográfica. Cinemática com dinâmica de fluidos computacional (CFD), deformação elástica de tecidos sob pressão fisiológica e interações biofísicas realistas. Callouts anatômicos com ponto circular -> linha fina ascendente com dobra 60°-90° -> rótulo CAIXA ALTA 17px por ~3s.'
  );
  const [newEnPrompt, setNewEnPrompt] = useState(
    'Omni and Ultra-realistic 3D Human Physiology: Internal biomedical simulation in cinematic CGI. Precision anatomical scale in microscopic PBR with living organic tissues, subsurface scattering (SSS), deep ambient occlusion, suspended microscopic dust and optical edge vignette with cinematic macro depth of field. Kinematics with computational fluid dynamics (CFD), elastic tissue deformation under physiological pressure and realistic biophysical interactions. Anatomical callouts with circular point -> thin ascending line with 60°-90° bend -> 17px UPPERCASE label for ~3s.'
  );
  const [formError, setFormError] = useState('');

  const loadPresets = () => {
    setPresets(getPhysiologyPresets());
  };

  useEffect(() => {
    if (isOpen) {
      loadPresets();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) {
      setFormError('Por favor informe o título/label do modelo.');
      return;
    }
    if (!newPtPrompt.trim() || !newEnPrompt.trim()) {
      setFormError('Os prompts em PT-BR e EN são obrigatórios.');
      return;
    }

    const created = saveCustomPhysiologyPreset({
      label: newLabel.trim(),
      tooltip5Words: newTooltip.trim() || 'Simulação biomédica personalizada interna.',
      educationalGoal: newEducationalGoal.trim() || 'Visualização anatômica personalizada.',
      ptPrompt: newPtPrompt.trim(),
      enPrompt: newEnPrompt.trim()
    });

    loadPresets();
    setNewLabel('');
    setNewTooltip('');
    setNewEducationalGoal('');
    setFormError('');
    setActiveTab('catalog');
    onSelectPreset(created);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Deseja realmente excluir este modelo personalizado?')) {
      deleteCustomPhysiologyPreset(id);
      loadPresets();
    }
  };

  const handleReset = () => {
    if (confirm('Deseja restaurar os presets oficiais de fábrica da Auditoria 360º?')) {
      const reset = resetPhysiologyPresets();
      setPresets(reset);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#0e111a] border border-[#2a344d] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-500/10 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="p-5 sm:p-6 border-b border-[#1f2638] flex items-center justify-between bg-gradient-to-r from-[#141926] via-[#10141f] to-[#141926]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
              <Dna className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-100">
                  Fisiologia Humana 3D Ultra-realista
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                  Auditoria 360º
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulações biomédicas cinematográficas PBR, SSS orgânico e Callouts Técnicos de 17px
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#1a2133] border border-[#2d3852] hover:bg-[#25304a] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Fechar Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas e Ações Superiores */}
        <div className="px-5 sm:px-6 py-3 border-b border-[#1f2638] bg-[#090b11] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-cyan-500 text-black font-black shadow-md shadow-cyan-500/20'
                  : 'bg-[#151924] text-slate-400 hover:text-white border border-[#242b3d]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Modelos Catalogados ({presets.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('create')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'create'
                  ? 'bg-amber-500 text-black font-black shadow-md shadow-amber-500/20'
                  : 'bg-[#151924] text-slate-400 hover:text-white border border-[#242b3d]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Criar Novo Modelo Manual</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141824] border border-[#242b3d] transition cursor-pointer"
            title="Restaurar presets padrão da Auditoria 360º"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restaurar Padrões</span>
          </button>
        </div>

        {/* Conteúdo: Catálogo de Presets */}
        {activeTab === 'catalog' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="text-xs text-slate-400 leading-relaxed bg-[#10141f] border border-[#242b3d] p-3 rounded-2xl flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Selecione qualquer modelo para aplicar na cena. Cada preset injeta a dinâmica nanométrica (CFD), iluminação subsuperficial (SSS) e callouts anatômicos em caixa alta 17px por ~3s.
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {presets.map((preset) => {
                const isSelected = selectedId === preset.id;
                const isMasterUniversal = preset.id === 'fisio_template_mestre';

                return (
                  <div
                    key={preset.id}
                    className={`rounded-2xl border transition-all p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden ${
                      isSelected
                        ? 'bg-cyan-950/25 border-cyan-400 ring-1 ring-cyan-400/40 shadow-lg shadow-cyan-500/10'
                        : isMasterUniversal
                        ? 'bg-[#121622] border-amber-500/40 hover:border-amber-400'
                        : 'bg-[#0d1017] border-[#22293b] hover:border-slate-500'
                    }`}
                  >
                    {/* Faixa lateral indicativa */}
                    <div 
                      className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                        isSelected 
                          ? 'bg-cyan-400' 
                          : isMasterUniversal 
                          ? 'bg-amber-400' 
                          : preset.isCustom 
                          ? 'bg-purple-400' 
                          : 'bg-slate-700'
                      }`} 
                    />

                    {/* Linha de Título, Tags e Ações */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pl-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-sm sm:text-base font-black text-slate-100 flex items-center gap-2">
                          {preset.label}
                        </h3>

                        {isMasterUniversal && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                            Base Universal (Sempre por Último)
                          </span>
                        )}

                        {preset.isCustom && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                            Customizado pelo Usuário
                          </span>
                        )}

                        {isSelected && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500 text-black font-black flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            Ativo na Cena
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {preset.isCustom && (
                          <button
                            type="button"
                            onClick={(e) => handleDelete(preset.id, e)}
                            className="p-1.5 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/25 border border-red-500/30 transition cursor-pointer"
                            title="Excluir modelo customizado"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {isSelected ? (
                          <div className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Modelo Ativo na Cena</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onSelectPreset(preset)}
                            className="px-3 py-1 rounded-xl bg-[#181f2f] hover:bg-slate-700 text-slate-300 hover:text-white border border-[#273248] text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Selecionar Modelo</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Resumo de 5 palavras & Objetivo Educacional */}
                    <div className="pl-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 font-medium text-slate-300">
                        <span className="text-cyan-400 font-bold">Resumo:</span>
                        <span>{preset.tooltip5Words}</span>
                      </div>
                      {preset.educationalGoal && (
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <span className="text-amber-400 font-bold">Objetivo:</span>
                          <span>{preset.educationalGoal}</span>
                        </div>
                      )}
                    </div>

                    {/* Aplicação INDIVIDUAL para cada Prompt (PT ou EN) — 100% Integral sem cortes */}
                    <div className="pl-2 grid grid-cols-1 lg:grid-cols-2 gap-3.5 pt-1">
                      {/* Box 1: Prompt PT-BR Individual */}
                      <div className="bg-[#07090f] p-3.5 rounded-2xl border border-amber-500/30 flex flex-col justify-between gap-3 shadow-sm">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                            <span className="font-bold text-amber-400 flex items-center gap-1.5">
                              <span className="text-sm">🇧🇷</span>
                              <span>Prompt em Português (PT-BR)</span>
                              <span className="text-[11px] font-mono text-slate-500 font-normal">({preset.ptPrompt.length} chars)</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleCopy(preset.ptPrompt, `${preset.id}_pt`)}
                                className="p-1 px-2 rounded-lg bg-[#141824] hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-[#242b3d] text-[11px] font-mono flex items-center gap-1 transition cursor-pointer"
                              >
                                {copiedKey === `${preset.id}_pt` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedKey === `${preset.id}_pt` ? 'Copiado' : 'Copiar PT'}</span>
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans select-text bg-[#0c0f17] p-2.5 rounded-xl border border-[#1b2233] line-clamp-4 hover:line-clamp-none transition-all">
                            {preset.ptPrompt}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#1a2030] flex flex-col gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (onApplyPromptDirect) {
                                onApplyPromptDirect(preset, 'pt');
                              } else {
                                onSelectPreset(preset);
                              }
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-amber-500/20"
                          >
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            <span>Aplicar SOMENTE Este Prompt PT na Cena</span>
                          </button>
                          <span className="text-[10px] text-slate-400 text-center">
                            Destino: Injeta o texto completo em PT na <strong>Ideia Visual da Cena</strong> (integral e sem mudanças).
                          </span>
                        </div>
                      </div>

                      {/* Box 2: Prompt EN Individual */}
                      <div className="bg-[#07090f] p-3.5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between gap-3 shadow-sm">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                            <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                              <span className="text-sm">🇺🇸</span>
                              <span>Prompt em Inglês (Motor IA EN)</span>
                              <span className="text-[11px] font-mono text-slate-500 font-normal">({preset.enPrompt.length} chars)</span>
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleCopy(preset.enPrompt, `${preset.id}_en`)}
                                className="p-1 px-2 rounded-lg bg-[#141824] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-[#242b3d] text-[11px] font-mono flex items-center gap-1 transition cursor-pointer"
                              >
                                {copiedKey === `${preset.id}_en` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedKey === `${preset.id}_en` ? 'Copiado' : 'Copiar EN'}</span>
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans select-text bg-[#0c0f17] p-2.5 rounded-xl border border-[#1b2233] line-clamp-4 hover:line-clamp-none transition-all">
                            {preset.enPrompt}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#1a2030] flex flex-col gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (onApplyPromptDirect) {
                                onApplyPromptDirect(preset, 'en');
                              } else {
                                onSelectPreset(preset);
                              }
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-cyan-500/20"
                          >
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            <span>Aplicar SOMENTE Este Prompt EN na Cena</span>
                          </button>
                          <span className="text-[10px] text-slate-400 text-center">
                            Destino: Injeta o texto técnico em EN no <strong>Prompt Compilado da IA</strong> (integral e sem mudanças).
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Conteúdo: Formulário de Criação Manual */}
        {activeTab === 'create' && (
          <form onSubmit={handleCreateSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="bg-amber-950/25 border border-amber-500/40 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Crie um novo modelo anatômico personalizado. Ele será salvo no seu navegador e inserido antes do <strong>Template Mestre Universal</strong>.
              </span>
            </div>

            {formError && (
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-bold">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Título / Nome do Modelo
                </label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Ex: 🫀 6. Sistema Cardiovascular & Endotélio"
                  className="w-full text-xs sm:text-sm rounded-xl p-2.5 bg-[#07090e] border border-[#242b3d] focus:border-amber-400 text-slate-100 placeholder:text-slate-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Resumo em 5 palavras (Tooltip)
                </label>
                <input
                  type="text"
                  value={newTooltip}
                  onChange={(e) => setNewTooltip(e.target.value)}
                  placeholder="Ex: Fluxo coronário mostrando elasticidade endotelial."
                  className="w-full text-xs sm:text-sm rounded-xl p-2.5 bg-[#07090e] border border-[#242b3d] focus:border-amber-400 text-slate-100 placeholder:text-slate-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Objetivo Educacional
              </label>
              <input
                type="text"
                value={newEducationalGoal}
                onChange={(e) => setNewEducationalGoal(e.target.value)}
                placeholder="Ex: Evidenciar a dilatação vascular e a pressão hidrodinâmica sanguínea."
                className="w-full text-xs sm:text-sm rounded-xl p-2.5 bg-[#07090e] border border-[#242b3d] focus:border-amber-400 text-slate-100 placeholder:text-slate-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center justify-between">
                <span>Prompt Técnico em Português (PT-BR)</span>
                <span className="text-[11px] font-mono text-slate-400 font-normal">({newPtPrompt.length} caracteres)</span>
              </label>
              <textarea
                rows={4}
                value={newPtPrompt}
                onChange={(e) => setNewPtPrompt(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl p-3 bg-[#07090e] border border-[#242b3d] focus:border-amber-400 text-slate-100 font-mono leading-relaxed resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center justify-between">
                <span>Prompt Técnico em Inglês (EN — Motor IA)</span>
                <span className="text-[11px] font-mono text-slate-400 font-normal">({newEnPrompt.length} caracteres)</span>
              </label>
              <textarea
                rows={4}
                value={newEnPrompt}
                onChange={(e) => setNewEnPrompt(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl p-3 bg-[#07090e] border border-[#242b3d] focus:border-cyan-400 text-slate-100 font-mono leading-relaxed resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#1f2638]">
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-[#151924] border border-[#242b3d] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Salvar Modelo e Aplicar</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
