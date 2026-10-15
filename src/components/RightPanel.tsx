/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Painel Direito — Chaves Rápidas de Override & Parâmetros Fisiológicos
 * Super-Skill Omni Video Director Pro v3.0
 */

import React from 'react';
import { 
  Sliders, 
  Layers, 
  UserCheck, 
  Mic, 
  Building2, 
  Sparkles, 
  Check, 
  Sun,
  Camera
} from 'lucide-react';

import { 
  BODY_PROFILES, 
  SCENARIO_CATALOG, 
  MICROPHONE_OPTIONS, 
  ZDEPTH_BOXES, 
  LIVING_SKIN_FILTERS,
  LIGHTING_OPTIONS,
  LENS_FRAMINGS
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
  const toggleSkinFilter = (key: string) => {
    onUpdateState({
      activeSkinFilters: {
        ...state.activeSkinFilters,
        [key]: !state.activeSkinFilters[key]
      }
    });
  };

  return (
    <aside className="bg-[#10131c] border border-[#242b3d] rounded-2xl p-4 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#242b3d] pb-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          Chaves Rápidas de Override
        </h2>
        <span className="text-[10px] text-slate-400 font-mono">
          Controle Direto
        </span>
      </div>

      {/* 1. Posição da Caixa Z-Depth */}
      <div className="bg-[#0b0d13] p-3 rounded-xl border border-[#242b3d]">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          Posição da Caixa Z-Depth
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {Object.values(ZDEPTH_BOXES).map((box) => {
            const isSelected = state.zDepthBoxId === box.id;
            return (
              <button
                key={box.id}
                type="button"
                onClick={() => onUpdateState({ zDepthBoxId: box.id as any })}
                className={`text-left p-2 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/80 text-amber-300 font-bold'
                    : 'bg-[#151924] border-[#242b3d] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="truncate pr-1">{box.name}</span>
                {isSelected && <Check className="w-3 h-3 text-amber-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Perfil Corporal (1 a 6) */}
      <div className="bg-[#0b0d13] p-3 rounded-xl border border-[#242b3d]">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          Perfil de Biomecânica Corporal
        </label>
        <select
          value={state.bodyProfileId}
          onChange={(e) => onUpdateState({ bodyProfileId: Number(e.target.value) })}
          className="w-full text-xs rounded-lg px-2.5 py-2 bg-[#151924] border border-[#242b3d] text-slate-200 focus:border-emerald-400"
        >
          {BODY_PROFILES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <p className="text-[10px] text-slate-400 mt-1.5 italic">
          {BODY_PROFILES.find(p => p.id === state.bodyProfileId)?.ptDesc}
        </p>
      </div>

      {/* 3. Microfone */}
      <div className="bg-[#0b0d13] p-3 rounded-xl border border-[#242b3d]">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
          <Mic className="w-3.5 h-3.5 text-cyan-400" />
          Microfone em Cena
        </label>
        <select
          value={state.microphoneId}
          onChange={(e) => onUpdateState({ microphoneId: e.target.value })}
          className="w-full text-xs rounded-lg px-2.5 py-2 bg-[#151924] border border-[#242b3d] text-slate-200 focus:border-cyan-400"
        >
          {MICROPHONE_OPTIONS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Cenário */}
      <div className="bg-[#0b0d13] p-3 rounded-xl border border-[#242b3d]">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
          <Building2 className="w-3.5 h-3.5 text-yellow-400" />
          Cenário & Atmosfera
        </label>
        <select
          value={state.scenarioId}
          onChange={(e) => onUpdateState({ scenarioId: e.target.value })}
          className="w-full text-xs rounded-lg px-2.5 py-2 bg-[#151924] border border-[#242b3d] text-slate-200 focus:border-yellow-400"
        >
          {SCENARIO_CATALOG.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Iluminação & Lente Rápida */}
      <div className="bg-[#0b0d13] p-3 rounded-xl border border-[#242b3d] grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Iluminação
          </label>
          <select
            value={state.lightingId}
            onChange={(e) => onUpdateState({ lightingId: e.target.value })}
            className="w-full text-xs rounded-lg p-1.5 bg-[#151924] border border-[#242b3d] text-slate-200"
          >
            {LIGHTING_OPTIONS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Lente / Enquadramento
          </label>
          <select
            value={state.lensFramingId}
            onChange={(e) => onUpdateState({ lensFramingId: e.target.value })}
            className="w-full text-xs rounded-lg p-1.5 bg-[#151924] border border-[#242b3d] text-slate-200"
          >
            {LENS_FRAMINGS.map((lf) => (
              <option key={lf.id} value={lf.id}>
                {lf.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 6. Filtros Pele Viva */}
      <div className="bg-[#0b0d13] p-3 rounded-xl border border-[#242b3d]">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Filtros Motor Pele Viva
          </label>
          <span className="text-[10px] text-amber-400/90 font-mono">
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
                className={`text-left p-1.5 rounded-lg border text-[11px] transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 font-semibold'
                    : 'bg-[#151924] border-[#242b3d] text-slate-500 hover:text-slate-400'
                }`}
              >
                <span>{filter.label}</span>
                {isActive ? <Check className="w-3 h-3 text-amber-400" /> : <span className="text-[10px] text-slate-600">○</span>}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
