/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Painel Esquerdo — Configuração do Molde, Seletor Dinâmico de Blocos (1-6) e Roteiros
 * Super-Skill Omni Video Director Pro
 */

import React from 'react';
import { 
  Sparkles, 
  Film,
  CheckCircle2, 
  AlertCircle,
  Video,
  Layers
} from 'lucide-react';

import { 
  SceneDirectiveState, 
  WordCountAnalysis 
} from '../engine/directorRules';

interface LeftPanelProps {
  state: SceneDirectiveState;
  onUpdateState: (partial: Partial<SceneDirectiveState>) => void;
  onGenerateSmartDirection: () => void;
  isGenerating: boolean;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  state,
  onUpdateState,
  onGenerateSmartDirection,
  isGenerating
}) => {
  const currentBlockCount = state.blockCount || 1;
  const blockScripts = state.blockScripts || [];

  const handleSelectBlockCount = (count: number) => {
    onUpdateState({
      blockCount: count,
      blockNumber: count
    });
  };

  const handleUpdateScript = (index: number, text: string) => {
    const updated = [...blockScripts];
    updated[index] = text;
    onUpdateState({
      blockScripts: updated,
      speechBlock1: updated[0] || '',
      speechBlock2: updated[1] || '',
      speechText: updated.filter(Boolean).join(' ')
    });
  };

  // Análise rápida de palavras para o medidor de cada bloco
  const getWordAnalysis = (text: string): WordCountAnalysis => {
    const clean = (text || '').trim();
    if (!clean) {
      return {
        wordCount: 0,
        charCount: 0,
        estimatedSeconds: 0,
        status: 'empty',
        message: 'Aguardando texto da fala...'
      };
    }
    const words = clean.split(/\s+/).filter(w => w.length > 0);
    const count = words.length;
    const estSec = parseFloat((count / 2.0).toFixed(1));
    return {
      wordCount: count,
      charCount: clean.length,
      estimatedSeconds: estSec,
      status: count <= 20 ? 'ideal' : 'warning',
      message: `${count} palavras (~${estSec}s)`
    };
  };

  return (
    <aside className="bg-[#10131c] border border-[#242b3d] rounded-2xl p-4 sm:p-5 flex flex-col gap-5 shadow-xl">
      {/* 1. Escolha do Molde Mestre (3 botões elegantes, sem descrições longas) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-400" />
            1. Molde Mestre Inviolável
          </label>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
            v4.0
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Botão 1: Voiceover & B-Roll */}
          <button
            type="button"
            onClick={() => onUpdateState({ masterMode: 'voiceover' })}
            className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              state.masterMode === 'voiceover'
                ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/15 font-extrabold'
                : 'bg-[#0b0d13] border-[#242b3d] hover:border-slate-500 text-slate-300 font-semibold'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full border-2 ${
                state.masterMode === 'voiceover' ? 'border-amber-400 bg-amber-400' : 'border-slate-500'
              }`} />
              <span className="text-xs sm:text-sm">1. Voiceover & B-Roll (Imagem - Vídeo)</span>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
              state.masterMode === 'voiceover' ? 'bg-amber-500 text-black font-black' : 'bg-[#181d2a] text-slate-400'
            }`}>
              VOICEOVER
            </span>
          </button>

          {/* Botão 2: Talking-Head Lip-Sync */}
          <button
            type="button"
            onClick={() => onUpdateState({ masterMode: 'lipsync' })}
            className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              state.masterMode === 'lipsync'
                ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/15 font-extrabold'
                : 'bg-[#0b0d13] border-[#242b3d] hover:border-slate-500 text-slate-300 font-semibold'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full border-2 ${
                state.masterMode === 'lipsync' ? 'border-amber-400 bg-amber-400' : 'border-slate-500'
              }`} />
              <span className="text-xs sm:text-sm">2. Talking-Head Lip-Sync (Texto - Vídeo)</span>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
              state.masterMode === 'lipsync' ? 'bg-amber-500 text-black font-black' : 'bg-[#181d2a] text-slate-400'
            }`}>
              LIP-SYNC
            </span>
          </button>

          {/* Botão 3: Vídeo para Vídeo */}
          <button
            type="button"
            onClick={() => onUpdateState({ masterMode: 'video_to_video' })}
            className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              state.masterMode === 'video_to_video'
                ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/15 font-extrabold'
                : 'bg-[#0b0d13] border-[#242b3d] hover:border-slate-500 text-slate-300 font-semibold'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full border-2 ${
                state.masterMode === 'video_to_video' ? 'border-amber-400 bg-amber-400' : 'border-slate-500'
              }`} />
              <span className="text-xs sm:text-sm">3. Vídeo para Vídeo (Z-Depth & Cadência)</span>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
              state.masterMode === 'video_to_video' ? 'bg-amber-500 text-black font-black' : 'bg-[#181d2a] text-slate-400'
            }`}>
              V2V
            </span>
          </button>
        </div>
      </div>

      {/* 2. SELETOR DE QUANTIDADE DE BLOCOS (Grade Horizontal de 1 a 6) */}
      <div className="bg-[#0b0d13] border border-[#242b3d] rounded-2xl p-3.5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Número de Blocos (10s cada)
          </label>
          <span className="text-xs font-mono font-bold text-cyan-400">
            Duração: {currentBlockCount * 10}s
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isSelected = currentBlockCount === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => handleSelectBlockCount(num)}
                className={`py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex flex-col items-center justify-center cursor-pointer border ${
                  isSelected
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/25 scale-[1.03]'
                    : 'bg-[#131722] text-slate-400 border-[#242b3d] hover:text-white hover:border-slate-600'
                }`}
              >
                <span>{num}</span>
                <span className="text-[10px] font-normal opacity-80">{num * 10}s</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ENTRADA DE ROTEIRO DINÂMICA: Exibe exatamente o número de blocos selecionados */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: currentBlockCount }).map((_, index) => {
          const blockNum = index + 1;
          const text = blockScripts[index] || '';
          const analysis = getWordAnalysis(text);
          const isFirst = index === 0;

          return (
            <div 
              key={blockNum} 
              className="bg-[#0b0d13] border border-[#242b3d] rounded-2xl p-3.5 flex flex-col gap-2 transition-all animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isFirst ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                  Roteiro Bloco {blockNum} ({index * 10}-{(index + 1) * 10}s)
                </label>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                  isFirst
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                }`}>
                  {isFirst ? 'Bloco Inicial' : 'Frame-Lock Contínuo'}
                </span>
              </div>

              <textarea
                rows={2}
                value={text}
                onChange={(e) => handleUpdateScript(index, e.target.value)}
                placeholder={`Digite a fala em PT-BR para o Bloco ${blockNum} (máx. 16-20 palavras)...`}
                className="w-full text-xs sm:text-sm rounded-xl p-2.5 bg-[#07090e] border border-[#242b3d] focus:border-amber-400 text-slate-100 placeholder:text-slate-600 resize-none font-sans leading-relaxed"
              />

              {/* Medidor de Palavras do Bloco */}
              <div className={`p-2 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                analysis.status === 'ideal'
                  ? 'bg-emerald-950/35 border-emerald-700/60 text-emerald-300'
                  : analysis.status === 'warning'
                  ? 'bg-amber-950/45 border-amber-700/70 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center gap-1.5 font-bold">
                  {analysis.status === 'ideal' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span>{analysis.wordCount} / 20 palavras</span>
                  <span className="text-slate-500">•</span>
                  <span>~{analysis.estimatedSeconds}s (1.2x)</span>
                </div>
                <span className="font-mono font-bold text-[11px] uppercase">
                  {analysis.status === 'ideal' ? '✓ Ideal' : analysis.status === 'warning' ? '⚠ Atenção' : 'Vazio'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Caixa Ideia Visual da Cena */}
      <div className="bg-[#0b0d13] border border-[#242b3d] rounded-2xl p-3.5 flex flex-col gap-2">
        <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <Video className="w-4 h-4 text-amber-400" />
          Ideia Visual da Cena / O que aparece nos Quadros
        </label>
        <textarea
          rows={2}
          value={state.visualIdea}
          onChange={(e) => onUpdateState({ visualIdea: e.target.value })}
          placeholder="Descreva a ação visual, atmosfera ou elementos pretendidos..."
          className="w-full text-xs sm:text-sm rounded-xl p-2.5 bg-[#07090e] border border-[#242b3d] focus:border-amber-500 text-slate-100 placeholder:text-slate-600 resize-none font-sans leading-relaxed"
        />
      </div>

      {/* 5. Botão "⚡ Criar Direção Inteligente" */}
      <button
        type="button"
        onClick={onGenerateSmartDirection}
        disabled={isGenerating}
        className="w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black tracking-wide uppercase bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
      >
        <Sparkles className="w-4 h-4 fill-black text-black" />
        <span>{isGenerating ? 'Diretor Analisando Cenas...' : '⚡ Criar Direção Inteligente'}</span>
      </button>
    </aside>
  );
};
