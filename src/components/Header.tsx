/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Header — Barra Superior de Controle e Presets
 * Super-Skill Omni Video Director Pro — Guided Autonomy
 */

import React, { useState, useEffect } from 'react';
import { 
  Clapperboard, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen,
  BookmarkPlus,
  Trash2,
  X
} from 'lucide-react';
import { SceneDirectiveState } from '../engine/directorRules';
import { 
  getUserCustomPresets, 
  saveCurrentStateAsPreset, 
  deleteUserCustomPreset,
  UserCustomPreset 
} from '../engine/userPresets';

export interface HeaderPreset {
  id: string;
  title: string;
  speechText: string;
  visualIdea: string;
  masterMode: 'voiceover' | 'lipsync' | 'video_to_video';
  bodyProfileId: number;
  zDepthBoxId: 'sem_caixa' | 'topo_headroom' | 'atras_gigante' | 'lateral_perspectiva';
  scenarioId: string;
  lightingId: string;
  selectedPhysiologyId?: string;
  preferences?: string[];
  blockCount?: number;
  blockScripts?: string[];
  isCustom?: boolean;
}

export const HEADER_PRESETS: HeaderPreset[] = [
  {
    id: 'alzheimer_clinico',
    title: '🏥 Protocolo Alzheimer (Clínico / Segurança)',
    speechText: 'Quando você entende a causa raiz, cada conduta clínica ganha precisão e autoridade imediata.',
    visualIdea: 'Médico em consultório moderno falando com autoridade técnica calma, iluminação balanceada e microfone ao lado.',
    masterMode: 'lipsync',
    bodyProfileId: 1, // Segurança
    zDepthBoxId: 'sem_caixa',
    scenarioId: 'consultorio',
    lightingId: 'warm_amber'
  },
  {
    id: 'inflamacao_alerta',
    title: '⚠️ Alerta Inflamação Silenciosa (Urgência / Dimming)',
    speechText: 'Atenção aos sinais silenciosos da inflamação celular crônica antes que surjam sintomas irreversíveis.',
    visualIdea: 'Foco dramático com iluminação escurecendo suavemente (dimming) no momento do alerta e micro-aceno afirmativo.',
    masterMode: 'lipsync',
    bodyProfileId: 5, // Preocupado Profissional
    zDepthBoxId: 'topo_headroom',
    scenarioId: 'estudio_broadcast',
    lightingId: 'dimming_narrativo'
  },
  {
    id: 'fisiologia_broll',
    title: '🧬 Fisiologia & Barreira Intestinal (Voiceover / Z-1)',
    speechText: 'A barreira intestinal íntegra impede que toxinas penetrem na circulação sanguínea celular.',
    visualIdea: 'Cena visual de enterócitos e junções oclusivas com infográfico 3D projetado na camada traseira Z-1.',
    masterMode: 'voiceover',
    bodyProfileId: 2, // Empatia
    zDepthBoxId: 'atras_gigante',
    scenarioId: 'consultorio',
    lightingId: 'biotec_cyan',
    selectedPhysiologyId: 'fisio_1_bioquimica'
  },
  {
    id: 'estrategia_lateral',
    title: '📊 Estratégia & Resultados (Split 60/40 Lateral)',
    speechText: 'Com esse planejamento estratégico, a tomada de decisão se torna previsível e altamente lucrativa.',
    visualIdea: 'Apresentador à esquerda ocupando 60% e mockup 3D de dados inclinado a 35° à direita.',
    masterMode: 'video_to_video',
    bodyProfileId: 1, // Segurança
    zDepthBoxId: 'lateral_perspectiva',
    scenarioId: 'escritorio_executivo',
    lightingId: 'warm_amber'
  }
];

interface HeaderProps {
  currentState?: SceneDirectiveState;
  onSelectPreset: (preset: HeaderPreset) => void;
  onCopyAllEN: () => void;
  onCopySpeechPT: () => void;
  copiedType: 'en' | 'pt' | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentState,
  onSelectPreset,
  onCopyAllEN,
  onCopySpeechPT,
  copiedType
}) => {
  const [customPresets, setCustomPresets] = useState<UserCustomPreset[]>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('');

  // Carregar presets do usuário ao montar
  useEffect(() => {
    setCustomPresets(getUserCustomPresets());
  }, []);

  const handleOpenSaveModal = () => {
    const defaultName = `Minha Cena ${currentState?.masterMode === 'lipsync' ? 'Lip-Sync' : currentState?.masterMode === 'voiceover' ? 'Voiceover' : 'V2V'} (${customPresets.length + 1})`;
    setNewPresetName(defaultName);
    setIsSaveModalOpen(true);
  };

  const handleConfirmSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentState) return;
    const saved = saveCurrentStateAsPreset(newPresetName, currentState);
    setCustomPresets(getUserCustomPresets());
    setSelectedPresetId(saved.id);
    setIsSaveModalOpen(false);
  };

  const handleDeleteCustomPreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteUserCustomPreset(id);
    setCustomPresets(getUserCustomPresets());
    if (selectedPresetId === id) {
      setSelectedPresetId('');
    }
  };

  return (
    <>
      <header className="border-b border-[#242b3d] bg-[#0b0e15]/95 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-black font-black">
            <Clapperboard className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base lg:text-lg font-black text-slate-100 tracking-tight flex items-center gap-2">
                AI Video Director Pro
                <span className="text-[10px] sm:text-xs uppercase font-mono px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                  Guided Autonomy v4.0
                </span>
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-medium">
              <span className="text-amber-400 font-bold">Super-Skill Autônoma</span>
              <span>•</span>
              <span className="text-slate-300">Dual-Language (Prompt EN / Roteiro PT-BR)</span>
              <span>•</span>
              <span className="text-emerald-400 font-mono font-bold text-[11px]">Teto &lt;1.800 Chars</span>
            </p>
          </div>
        </div>

        {/* Preset Selector & Nominal Save */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#10131c] border border-[#242b3d] rounded-2xl px-3 py-1.5 shadow-inner">
            <BookOpen className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
            <span className="text-xs font-bold text-slate-400 mr-2 hidden md:inline">Pré-Configs:</span>
            <select 
              value={selectedPresetId}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-2 max-w-[200px] sm:max-w-[280px]"
              onChange={(e) => {
                const val = e.target.value;
                setSelectedPresetId(val);
                // Busca nos customizados do usuário ou nos padrão
                const custom = customPresets.find(s => s.id === val);
                if (custom) {
                  onSelectPreset(custom);
                  return;
                }
                const p = HEADER_PRESETS.find(s => s.id === val);
                if (p) onSelectPreset(p);
              }}
            >
              <option value="" disabled className="bg-[#10131c] text-slate-400">
                Carregar Pré-Configuração...
              </option>

              {customPresets.length > 0 && (
                <optgroup label="⭐ Minhas Pré-Configurações Salvas (Nominais)" className="bg-[#141824] text-amber-300 font-bold">
                  {customPresets.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#10131c] text-slate-200">
                      ⭐ {p.title}
                    </option>
                  ))}
                </optgroup>
              )}

              <optgroup label="🎬 Pré-Configurações Padrão do Sistema" className="bg-[#141824] text-cyan-300 font-bold">
                {HEADER_PRESETS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#10131c] text-slate-200">
                    {p.title}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Botão Salvar Nominalmente */}
          {currentState && (
            <button
              type="button"
              onClick={handleOpenSaveModal}
              title="Salvar a configuração atual com um nome personalizado no seu navegador"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Salvar Pré-Config</span>
              <span className="sm:hidden">Salvar</span>
            </button>
          )}
        </div>

        {/* Batch Copy Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#10131c] border border-[#242b3d] rounded-2xl p-1 shadow-sm">
            <button
              type="button"
              onClick={onCopyAllEN}
              title="Copiar Prompt Técnico Compilado em Inglês"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-amber-300 hover:bg-[#181d2a] rounded-xl transition-all cursor-pointer"
            >
              {copiedType === 'en' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>Copiar Prompt (EN)</span>
            </button>
            <div className="w-px h-4 bg-[#242b3d]" />
            <button
              type="button"
              onClick={onCopySpeechPT}
              title="Copiar Fala Limpa em Português para TTS/Voz"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-cyan-300 hover:bg-[#181d2a] rounded-xl transition-all cursor-pointer"
            >
              {copiedType === 'pt' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>Copiar Fala (PT-BR)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modal: Salvar Pré-Configuração Nominalmente */}
      {isSaveModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsSaveModalOpen(false)}
        >
          <div 
            className="bg-[#0f121a] border border-[#2a344d] rounded-3xl max-w-md w-full p-6 shadow-2xl shadow-amber-500/10 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2638]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <BookmarkPlus className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-100 uppercase tracking-wide">
                  Salvar Pré-Configuração Nominal
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsSaveModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dê um nome para esta configuração. Ela armazenará os roteiros, molde mestre, tags selecionadas, modelo de fisiologia e enquadramentos atuais no seu navegador.
            </p>

            <form onSubmit={handleConfirmSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nome da Pré-Configuração:
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="Ex: Protocolo Dr. Carlos - 2 Cenas"
                  className="w-full text-xs sm:text-sm rounded-xl p-3 bg-[#07090e] border border-[#242b3d] focus:border-amber-400 text-slate-100 placeholder:text-slate-500 font-sans"
                />
              </div>

              {/* Resumo do que será gravado */}
              <div className="bg-[#141824] p-3 rounded-xl border border-[#1e2538] flex flex-col gap-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Molde Mestre:</span>
                  <span className="font-bold text-slate-200 capitalize">{currentState?.masterMode}</span>
                </div>
                <div className="flex justify-between">
                  <span>Blocos de Cena:</span>
                  <span className="font-bold text-slate-200">{currentState?.blockCount || 1} Bloco(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Tags Ativas:</span>
                  <span className="font-bold text-amber-300">{currentState?.preferences?.length || 0} Tags</span>
                </div>
                {currentState?.selectedPhysiologyId && (
                  <div className="flex justify-between text-cyan-400">
                    <span>Fisiologia 3D:</span>
                    <span className="font-bold">Ativa</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1f2638]">
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-black transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Salvar Pré-Config
                </button>
              </div>
            </form>

            {/* Lista para gerenciar/excluir presets já salvos */}
            {customPresets.length > 0 && (
              <div className="mt-2 pt-3 border-t border-[#1f2638] flex flex-col gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Pré-Configurações Existentes ({customPresets.length}):
                </span>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {customPresets.map((cp) => (
                    <div key={cp.id} className="p-2 rounded-lg bg-[#07090e] border border-[#1c2233] flex items-center justify-between text-xs">
                      <span className="text-slate-200 font-semibold truncate mr-2">{cp.title}</span>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteCustomPreset(cp.id, e)}
                        title="Excluir esta pré-configuração"
                        className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950/40 transition cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

