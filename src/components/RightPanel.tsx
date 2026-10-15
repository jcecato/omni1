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
  Minimize2
} from 'lucide-react';

import { 
  PREFERENCE_ACCORDIONS, 
  LIVING_SKIN_FILTERS 
} from '../engine/catalog13Groups';

import { SceneDirectiveState } from '../engine/directorRules';

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

  // Estado do popup flutuante de 5 palavras com temporizador de 5 segundos
  const [activeTooltip, setActiveTooltip] = useState<{ chipId: string; text: string } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Limpar timeout no unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveTooltip(null);
    onUpdateState({ preferences: [] });
  };

  const handleChipClick = (chipId: string, tooltipText: string) => {
    const currentPrefs = state.preferences || [];
    const isAlreadySelected = currentPrefs.includes(chipId);

    // Se estiver desmarcando: remove e oculta imediatamente o popup
    if (isAlreadySelected) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (activeTooltip?.chipId === chipId) {
        setActiveTooltip(null);
      }
      onUpdateState({
        preferences: currentPrefs.filter(id => id !== chipId)
      });
      return;
    }

    // Se estiver ativando: adiciona, exibe popup em 17px por 5 segundos
    const nextPrefs = [...currentPrefs, chipId];
    onUpdateState({ preferences: nextPrefs });

    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveTooltip({ chipId, text: tooltipText });

    timerRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 5000);
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
        Selecione tags dos <strong className="text-slate-200">15 Grupos Técnicos</strong>. O Diretor de IA avaliará suas preferências e justificará no modal a aprovação ou adaptação de cada uma.
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
                    const showPopup = activeTooltip?.chipId === chip.id;

                    return (
                      <div key={chip.id} className="relative">
                        {/* Tooltip Popup Flutuante em 17px (Exatamente 5 Palavras em PT-BR por 5s) */}
                        {showPopup && (
                          <div 
                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 bg-[#161a27] text-amber-200 border-2 border-amber-400/90 shadow-2xl shadow-black px-3.5 py-2 rounded-2xl whitespace-nowrap animate-bounce flex items-center gap-1.5 pointer-events-none"
                            style={{ fontSize: '17px', lineHeight: '1.2' }}
                          >
                            <Info className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="font-extrabold tracking-wide text-amber-200">
                              {chip.tooltip5Words}
                            </span>
                            {/* Seta do Balão */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-amber-400" />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => handleChipClick(chip.id, chip.tooltip5Words)}
                          className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1 cursor-pointer select-none font-semibold ${
                            isSelected
                              ? 'bg-amber-500/25 border-amber-500 text-amber-200 shadow-sm shadow-amber-500/20 font-bold'
                              : 'bg-[#151924] border-[#242b3d] text-slate-300 hover:text-white hover:border-slate-500'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-amber-400 shrink-0" />}
                          <span>{chip.label}</span>
                        </button>
                      </div>
                    );
                  })}
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
    </aside>
  );
};
