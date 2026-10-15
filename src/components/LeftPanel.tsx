/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Painel Esquerdo — Configuração e Entrada de Roteiro
 * Super-Skill Omni Video Director Pro v3.0
 */

import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Clock, 
  Check, 
  AlertCircle, 
  Mic, 
  Video, 
  Film,
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';

import { 
  MASTER_TEMPLATES, 
  REFERENCE_PILLS 
} from '../engine/catalog13Groups';

import { 
  SceneDirectiveState, 
  WordCountAnalysis 
} from '../engine/directorRules';

interface LeftPanelProps {
  state: SceneDirectiveState;
  wordAnalysis: WordCountAnalysis;
  onUpdateState: (partial: Partial<SceneDirectiveState>) => void;
  onGenerateSmartDirection: () => void;
  isGenerating: boolean;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  state,
  wordAnalysis,
  onUpdateState,
  onGenerateSmartDirection,
  isGenerating
}) => {
  const toggleRef = (refId: string) => {
    onUpdateState({
      activeReferences: {
        ...state.activeReferences,
        [refId]: !state.activeReferences[refId]
      }
    });
  };

  return (
    <aside className="bg-[#10131c] border border-[#242b3d] rounded-2xl p-4 flex flex-col gap-4 shadow-xl">
      {/* 1. Escolha do Molde Mestre */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            1. Molde Mestre Inviolável
          </label>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
            v3.0 Strict
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {MASTER_TEMPLATES.map((tmpl) => {
            const isSelected = state.masterMode === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => onUpdateState({ masterMode: tmpl.id })}
                className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/80 shadow-md shadow-amber-500/10'
                    : 'bg-[#0b0d13] border-[#242b3d] hover:border-slate-600 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                    {tmpl.name}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-amber-500 text-black font-extrabold' : 'bg-[#181d2a] text-slate-400'
                  }`}>
                    {tmpl.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {tmpl.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Seletor de Blocos (1 a 6 de 10s cada) */}
      <div className="bg-[#0b0d13] border border-[#242b3d] rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            2. Seletor de Blocos (1 a 6 de 10s)
          </label>
          <span className="text-[10px] text-cyan-400 font-mono">
            {state.blockNumber === 1 ? 'Primeiro Bloco' : 'Frame-Lock Ativo'}
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isCurrent = state.blockNumber === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => onUpdateState({ 
                  blockNumber: num,
                  activeReferences: {
                    ...state.activeReferences,
                    video_anterior: num > 1
                  }
                })}
                className={`py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                    : 'bg-[#151924] text-slate-400 hover:text-white border border-[#242b3d]'
                }`}
              >
                #{num}
                <span className="block text-[9px] font-normal opacity-80">{num * 10 - 10}-{num * 10}s</span>
              </button>
            );
          })}
        </div>
        {state.blockNumber > 1 && (
          <div className="mt-2 text-[10px] text-cyan-300/90 flex items-center gap-1 bg-cyan-950/30 p-1.5 rounded border border-cyan-800/40">
            <BookmarkCheck className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
            <span>Continuidade automática ativada: travamento absoluto a partir de [ REFERENCIA VIDEO ANTERIOR ].</span>
          </div>
        )}
      </div>

      {/* 3. Pílulas de ativação [ REFERENCIA X ] */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
          3. Pílulas de Referência Ativas:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {REFERENCE_PILLS.map((pill) => {
            const isActive = !!state.activeReferences[pill.id];
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => toggleRef(pill.id)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-all flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-semibold'
                    : 'bg-[#0b0d13] border-[#242b3d] text-slate-500 hover:text-slate-400'
                }`}
                title={`Token: ${pill.token}`}
              >
                {isActive ? <Check className="w-3 h-3 text-amber-400" /> : <span className="w-3 text-center">○</span>}
                {pill.token}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Caixa Roteiro da Fala com medidor de palavras/segundos */}
      <div className="bg-[#0b0d13] border border-[#242b3d] rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5" />
            4. Roteiro da Fala (10s @ 1.2x)
          </label>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            Teto: 16-20 palavras
          </span>
        </div>

        <textarea
          rows={3}
          value={state.speechText}
          onChange={(e) => onUpdateState({ speechText: e.target.value })}
          placeholder="Digite o roteiro falado em PT-BR para este bloco de 10s..."
          className="w-full text-xs rounded-lg p-2.5 bg-[#07090e] border border-[#242b3d] focus:border-emerald-500 text-slate-100 placeholder:text-slate-600 resize-none font-sans"
        />

        {/* Medidor de Cadência */}
        <div className={`p-2 rounded-lg border text-[11px] flex items-center justify-between gap-2 ${
          wordAnalysis.status === 'ideal'
            ? 'bg-emerald-950/30 border-emerald-700/50 text-emerald-300'
            : wordAnalysis.status === 'warning'
            ? 'bg-amber-950/40 border-amber-700/60 text-amber-300'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <div className="flex items-center gap-1.5">
            {wordAnalysis.status === 'ideal' ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            )}
            <span className="font-semibold">{wordAnalysis.wordCount} palavras</span>
            <span className="text-slate-400">•</span>
            <span>~{wordAnalysis.estimatedSeconds}s</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider">
            {wordAnalysis.status === 'ideal' ? 'Status: Ideal' : wordAnalysis.status === 'warning' ? 'Status: Atenção' : 'Vazio'}
          </span>
        </div>
      </div>

      {/* 5. Caixa Ideia Visual da Cena / O que aparece nos Quadros */}
      <div className="bg-[#0b0d13] border border-[#242b3d] rounded-xl p-3 flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Video className="w-3.5 h-3.5 text-amber-400" />
          5. Ideia Visual da Cena / O que aparece nos Quadros
        </label>
        <textarea
          rows={2}
          value={state.visualIdea}
          onChange={(e) => onUpdateState({ visualIdea: e.target.value })}
          placeholder="Descreva a ação visual, atmosfera ou elementos pretendidos..."
          className="w-full text-xs rounded-lg p-2 bg-[#07090e] border border-[#242b3d] focus:border-amber-500 text-slate-200 placeholder:text-slate-600 resize-none"
        />
      </div>

      {/* 6. Botão Criar Direção Inteligente */}
      <button
        type="button"
        onClick={onGenerateSmartDirection}
        disabled={isGenerating}
        className="w-full py-3 px-4 rounded-xl text-xs font-extrabold tracking-wide uppercase bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
      >
        <Sparkles className="w-4 h-4 fill-black text-black" />
        <span>{isGenerating ? 'Compilando Direção...' : '⚡ Criar Direção Inteligente'}</span>
      </button>
    </aside>
  );
};
