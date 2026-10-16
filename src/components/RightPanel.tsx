/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Painel Direito — Guided Autonomy: Tags de Preferência em Acordeão (15 Grupos) & Motor Pele Viva
 * Super-Skill Omni Video Director Pro v4.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Check, 
  Camera, 
  Sun, 
  Layers, 
  UserCheck,
  Info,
  Film,
  Zap,
  Move,
  Mic,
  Shield,
  Type,
  Search,
  X,
  Maximize2,
  Minimize2,
  Dna,
  BookOpen,
  Tag
} from 'lucide-react';

import { 
  PREFERENCE_ACCORDIONS, 
  LIVING_SKIN_FILTERS 
} from '../engine/catalog13Groups';

import { SceneDirectiveState } from '../engine/directorRules';
import { PhysiologyModal } from './PhysiologyModal';
import { TagsGuideModal } from './TagsGuideModal';
import { getPhysiologyPresets, PhysiologyPreset } from '../engine/physiologyPresets';

interface RightPanelProps {
  state: SceneDirectiveState;
  onUpdateState: (partial: Partial<SceneDirectiveState>) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  state,
  onUpdateState
}) => {
  // Estado dos acordeões (primeiros grupos abertos por padrão)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    video_model_modes: true,
    camera_distance_framing: true,
    lighting_typography: true
  });

  // Campo de busca rápida de tags
  const [searchQuery, setSearchQuery] = useState('');
  const [isPhysiologyModalOpen, setIsPhysiologyModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  // Preset ativo de fisiologia 3D
  const currentPhysioPreset = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const presets = getPhysiologyPresets();
    if (state.selectedPhysiologyId) {
      return presets.find(p => p.id === state.selectedPhysiologyId) || null;
    }
    if ((state.preferences || []).includes('mod_fisiologia_3d')) {
      return presets[0];
    }
    return null;
  }, [state.selectedPhysiologyId, state.preferences]);

  const handleSelectPhysiologyPreset = (preset: PhysiologyPreset) => {
    const currentPrefs = state.preferences || [];
    const withFisio = currentPrefs.includes('mod_fisiologia_3d')
      ? currentPrefs
      : [...currentPrefs, 'mod_fisiologia_3d'];

    onUpdateState({
      selectedPhysiologyId: preset.id,
      preferences: withFisio,
      masterMode: 'voiceover',
      visualIdea: `Simulação 3D: ${preset.label}. ${preset.tooltip5Words}`
    });
    setIsPhysiologyModalOpen(false);
  };

  const handleApplyPromptDirect = (preset: PhysiologyPreset, lang: 'pt' | 'en') => {
    const currentPrefs = state.preferences || [];
    const withFisio = currentPrefs.includes('mod_fisiologia_3d')
      ? currentPrefs
      : [...currentPrefs, 'mod_fisiologia_3d'];

    const chosenPrompt = lang === 'pt' ? preset.ptPrompt : preset.enPrompt;

    onUpdateState({
      selectedPhysiologyId: preset.id,
      preferences: withFisio,
      masterMode: 'voiceover',
      visualIdea: chosenPrompt
    });
    setIsPhysiologyModalOpen(false);
  };

  const toggleAccordion = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    PREFERENCE_ACCORDIONS.forEach(cat => {
      allOpen[cat.id] = true;
    });
    setOpenSections(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenSections({});
  };

  const handleClearAllPreferences = () => {
    onUpdateState({ preferences: [], selectedPhysiologyId: undefined });
  };

  const handleChipClick = (chipId: string) => {
    const currentPrefs = state.preferences || [];
    const isAlreadySelected = currentPrefs.includes(chipId);

    // Se for o chip de Fisiologia 3D e não estiver ativo, abre o modal de fisiologia
    if (chipId === 'mod_fisiologia_3d' && !isAlreadySelected) {
      setIsPhysiologyModalOpen(true);
    }

    // Se estiver desmarcando: remove da lista
    if (isAlreadySelected) {
      onUpdateState({
        preferences: currentPrefs.filter(id => id !== chipId),
        ...(chipId === 'mod_fisiologia_3d' ? { selectedPhysiologyId: undefined } : {})
      });
      return;
    }

    // Se estiver ativando: adiciona diretamente sem popup
    const nextPrefs = [...currentPrefs, chipId];
    onUpdateState({ preferences: nextPrefs });
  };

  const toggleSkinFilter = (key: string) => {
    onUpdateState({
      activeSkinFilters: {
        ...state.activeSkinFilters,
        [key]: !state.activeSkinFilters[key]
      }
    });
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'video_model_modes':
        return <Film className="w-4 h-4 text-amber-400" />;
      case 'special_transitions':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'camera_distance_framing':
        return <Camera className="w-4 h-4 text-cyan-400" />;
      case 'camera_movements':
        return <Move className="w-4 h-4 text-blue-400" />;
      case 'scenarios_solar':
        return <Sun className="w-4 h-4 text-amber-300" />;
      case 'microphones_props':
        return <Mic className="w-4 h-4 text-emerald-400" />;
      case 'spatial_architecture':
        return <Layers className="w-4 h-4 text-purple-400" />;
      case 'animations_motion':
        return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 'textures_borders':
        return <Shield className="w-4 h-4 text-slate-300" />;
      case 'lighting_typography':
        return <Type className="w-4 h-4 text-indigo-400" />;
      case 'voice_acoustics_biomech':
        return <UserCheck className="w-4 h-4 text-teal-400" />;
      default:
        return <Sliders className="w-4 h-4 text-slate-400" />;
    }
  };

  // Filtragem dinâmica de categorias e chips quando há busca
  const filteredAccordions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PREFERENCE_ACCORDIONS;

    return PREFERENCE_ACCORDIONS.map(cat => {
      const matchingChips = cat.chips.filter(chip => 
        chip.label.toLowerCase().includes(q) ||
        chip.tooltip5Words.toLowerCase().includes(q)
      );
      if (matchingChips.length > 0 || cat.title.toLowerCase().includes(q)) {
        return {
          ...cat,
          chips: matchingChips.length > 0 ? matchingChips : cat.chips
        };
      }
      return null;
    }).filter(Boolean) as typeof PREFERENCE_ACCORDIONS;
  }, [searchQuery]);

  const activeCount = state.preferences?.length || 0;

  return (
    <aside className="bg-[#10131c] border border-[#242b3d] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-xl">
      {/* Header do Painel Direito */}
      <div className="flex items-center justify-between border-b border-[#242b3d] pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-100">
            Guided Autonomy
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsTagsModalOpen(true)}
            className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition cursor-pointer flex items-center gap-1 font-bold"
            title="Abrir Guia Geral de Tags & 5 Exemplos Comuns de Uso"
          >
            <Tag className="w-3 h-3 text-amber-400" />
            <span>TAGS</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPhysiologyModalOpen(true)}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition cursor-pointer flex items-center gap-1 font-bold"
            title="Abrir Catálogo Oficial de Fisiologia Humana 3D"
          >
            <Dna className="w-3 h-3 text-cyan-400" />
            <span>Fisio 3D</span>
          </button>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={handleClearAllPreferences}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 transition cursor-pointer"
              title="Desmarcar todas as tags"
            >
              Limpar ({activeCount})
            </button>
          )}
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
            {activeCount} Tags Ativas
          </span>
        </div>
      </div>

      <div className="text-xs text-slate-400 leading-relaxed -mt-1">
        Selecione tags dos <strong className="text-slate-200">15 Grupos Técnicos</strong> (organizados nos 11 acordeões práticos abaixo). O Diretor de IA aplicará suas escolhas ao prompt em tempo real e justificará no modal a aprovação ou adaptação de cada uma.
      </div>

      {/* Barra de Busca de Tags e Controles Expandir / Recolher */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tag técnica..."
            className="w-full text-xs rounded-xl pl-8 pr-7 py-1.5 bg-[#0b0d13] border border-[#242b3d] focus:border-amber-400 text-slate-200 placeholder:text-slate-500 font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleExpandAll}
          className="p-1.5 rounded-lg bg-[#141824] border border-[#242b3d] text-slate-400 hover:text-amber-300 transition"
          title="Expandir Todos os Acordeões"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCollapseAll}
          className="p-1.5 rounded-lg bg-[#141824] border border-[#242b3d] text-slate-400 hover:text-amber-300 transition"
          title="Recolher Todos os Acordeões"
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tags de Preferência em Acordeão (15 Grupos Técnicos) */}
      <div className="flex flex-col gap-2.5 max-h-[520px] overflow-y-auto pr-1">
        {filteredAccordions.map((category) => {
          const isOpen = searchQuery.trim().length > 0 ? true : !!openSections[category.id];
          const selectedInCategory = category.chips.filter(c => (state.preferences || []).includes(c.id)).length;

          return (
            <div 
              key={category.id} 
              className="bg-[#0b0d13] border border-[#242b3d] rounded-2xl overflow-visible transition-all"
            >
              {/* Botão de Controle do Acordeão */}
              <button
                type="button"
                onClick={() => toggleAccordion(category.id)}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-[#151924]/60 transition rounded-2xl cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {getCategoryIcon(category.id)}
                  <span className="text-xs font-black tracking-wide text-slate-200">
                    {category.title}
                  </span>
                  {selectedInCategory > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                      {selectedInCategory}
                    </span>
                  )}
                </div>
                {isOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </button>

              {/* Chips dentro do Acordeão */}
              {isOpen && (
                <div className="p-3 pt-0 flex flex-wrap gap-1.5">
                  {category.chips.map((chip) => {
                    const isSelected = (state.preferences || []).includes(chip.id);

                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => handleChipClick(chip.id)}
                        className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1 cursor-pointer select-none font-semibold ${
                          isSelected
                            ? 'bg-amber-500/25 border-amber-500 text-amber-200 shadow-sm shadow-amber-500/20 font-bold'
                            : 'bg-[#151924] border-[#242b3d] text-slate-300 hover:text-white hover:border-slate-500'
                        }`}
                        title={chip.tooltip5Words}
                      >
                        {isSelected && <Check className="w-3 h-3 text-amber-400 shrink-0" />}
                        <span>{chip.label}</span>
                      </button>
                    );
                  })}

                  {/* Seção de Fisiologia 3D Ultra-realista */}
                  {category.id === 'video_model_modes' && (
                    <div className="w-full mt-2.5 pt-2.5 border-t border-[#1c2333] flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <Dna className="w-3.5 h-3.5" />
                          Modelos Fisiologia 3D (Auditoria 360º)
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsPhysiologyModalOpen(true)}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 transition cursor-pointer flex items-center gap-1"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Ver Catálogo & Criar</span>
                        </button>
                      </div>

                      {currentPhysioPreset && (
                        <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-between gap-2 text-xs">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-100 flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                              {currentPhysioPreset.label}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {currentPhysioPreset.tooltip5Words}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsPhysiologyModalOpen(true)}
                            className="px-2 py-0.5 rounded bg-cyan-500 text-black text-[10px] font-black uppercase cursor-pointer"
                          >
                            Trocar
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SEÇÃO FIXA NO FINAL: FILTROS MOTOR PELE VIVA */}
      <div className="bg-[#0b0d13] p-3.5 rounded-2xl border border-[#242b3d] mt-auto">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Filtros Motor Pele Viva
          </label>
          <span className="text-[10px] text-amber-400 font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 font-bold">
            Anti-Plástico
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {LIVING_SKIN_FILTERS.map((filter) => {
            const isActive = !!state.activeSkinFilters[filter.key];
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => toggleSkinFilter(filter.key)}
                className={`text-left p-1.5 px-2 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                    : 'bg-[#151924] border-[#242b3d] text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="truncate pr-1 text-[11px] sm:text-xs">{filter.label}</span>
                {isActive ? (
                  <Check className="w-3 h-3 text-amber-400 shrink-0" />
                ) : (
                  <span className="text-[10px] text-slate-600">○</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Oficial de Presets de Fisiologia Humana 3D & Criação Manual */}
      <PhysiologyModal
        isOpen={isPhysiologyModalOpen}
        onClose={() => setIsPhysiologyModalOpen(false)}
        selectedId={state.selectedPhysiologyId}
        onSelectPreset={handleSelectPhysiologyPreset}
        onApplyPromptDirect={handleApplyPromptDirect}
      />

      {/* Modal Explicativo Geral de Tags com 5 Exemplos de Uso */}
      <TagsGuideModal
        isOpen={isTagsModalOpen}
        onClose={() => setIsTagsModalOpen(false)}
        selectedTags={state.preferences || []}
        onToggleTag={handleChipClick}
      />
    </aside>
  );
};
