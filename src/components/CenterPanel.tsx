/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Painel Central — Auditoria, Mudança Rápida e Saída Compilada
 * Super-Skill Omni Video Director Pro — Guided Autonomy
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  Copy, 
  Check, 
  Layers, 
  Camera, 
  Sun, 
  UserCheck, 
  FileText, 
  Sparkles,
  AlertTriangle,
  RotateCcw,
  BookOpen
} from 'lucide-react';

import { 
  CompiledOutput, 
  SceneDirectiveState 
} from '../engine/directorRules';
import { DirectorModal } from './DirectorModal';

interface CenterPanelProps {
  compiled: CompiledOutput;
  state: SceneDirectiveState;
  onApplyQuickChange: (request: string) => void;
  quickChangeLog: string | null;
  onCopyText: (text: string, label: string) => void;
  isCopied: boolean;
}

export const CenterPanel: React.FC<CenterPanelProps> = ({
  compiled,
  state,
  onApplyQuickChange,
  quickChangeLog,
  onCopyText,
  isCopied
}) => {
  const [outputTab, setOutputTab] = useState<'pt' | 'en'>('en');
  const [quickInput, setQuickInput] = useState('');
  const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onApplyQuickChange(quickInput.trim());
    setQuickInput('');
  };

  const currentPromptText = outputTab === 'en' ? compiled.promptEn : compiled.promptPt;
  const currentCharCount = outputTab === 'en' ? compiled.charCountEn : compiled.charCountPt;

  return (
    <>
      <main className="bg-[#10131c] border border-[#242b3d] rounded-2xl p-5 flex flex-col gap-5 shadow-xl">
        {/* ============================================================ */}
        {/* BOTÃO GRANDE DESTACADO: LER RACIOCÍNIO DO DIRETOR           */}
        {/* ============================================================ */}
        <button
          type="button"
          onClick={() => setIsDirectorModalOpen(true)}
          className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-amber-500/25 via-[#1a2133] to-cyan-500/25 border-2 border-amber-400/80 hover:border-amber-300 text-amber-200 hover:text-white shadow-xl shadow-amber-500/10 flex items-center justify-between group transition-all active:scale-[0.99] cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-base sm:text-lg font-black tracking-wide text-white group-hover:text-amber-300 transition-colors">
                📖 Ler Raciocínio do Diretor (Por que essas escolhas?)
              </span>
              <span className="block text-xs sm:text-sm text-amber-200/80 font-medium">
                Veja o porquê de cada câmera, luz, caixa e tags aceitas ou descartadas
              </span>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-xl bg-amber-500 text-black font-black uppercase tracking-wider shrink-0 shadow-md">
            Abrir Análise
          </span>
        </button>

        {/* ============================================================ */}
        {/* BLOCO 1: Auditoria / Prévia em PT-BR                         */}
        {/* ============================================================ */}
        <section className="bg-[#0b0d13] border border-[#242b3d] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
          <div className="flex items-center justify-between border-b border-[#1f2537] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-100">
                  BLOCO 1: Painel de Decisão & Auditoria Técnica (PT-BR)
                </h2>
                <span className="text-xs text-slate-400 font-medium">
                  {compiled.audit.engineName} • {compiled.audit.blockInfo}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
              ✓ 100% Blindado
            </span>
          </div>

          {/* Grid de Auditoria */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs sm:text-sm">
            <div className="bg-[#151924] p-3 rounded-xl border border-[#242b3d]">
              <div className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                Câmera & Lente
              </div>
              <div className="font-bold text-slate-200 line-clamp-2">
                {compiled.audit.cameraLens}
              </div>
            </div>

            <div className="bg-[#151924] p-3 rounded-xl border border-[#242b3d]">
              <div className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Caixa Z-Depth
              </div>
              <div className="font-bold text-slate-200 line-clamp-2">
                {compiled.audit.zDepthLayout}
              </div>
            </div>

            <div className="bg-[#151924] p-3 rounded-xl border border-[#242b3d]">
              <div className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
                Iluminação
              </div>
              <div className="font-bold text-slate-200 line-clamp-2">
                {compiled.audit.lightingName}
              </div>
            </div>

            <div className="bg-[#151924] p-3 rounded-xl border border-[#242b3d]">
              <div className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                Perfil Corporal
              </div>
              <div className="font-bold text-slate-200 line-clamp-2">
                {compiled.audit.bodyProfileName}
              </div>
            </div>
          </div>

          {/* Resumo de Diretrizes */}
          <div className="bg-[#07090e] p-3 rounded-xl border border-[#1f2537] text-xs sm:text-sm space-y-1.5 text-slate-300">
            {compiled.audit.reasons.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-medium">{r}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* BLOCO 2: Campo "🔄 Solicitar Mudança Rápida"                 */}
        {/* ============================================================ */}
        <section className="bg-[#0b0d13] border border-cyan-500/30 rounded-2xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              BLOCO 2: Solicitar Mudança Rápida (NLP Fast Engine)
            </label>
            <span className="text-xs text-slate-400">
              Ajuste em linguagem natural
            </span>
          </div>

          <form onSubmit={handleQuickSubmit} className="flex items-center gap-2.5">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder='Ex: "mude para luz quente e caixa ao lado", "perfil empatia", "tirar microfone"...'
              className="flex-1 text-sm sm:text-base rounded-xl px-4 py-3 bg-[#07090e] border border-[#242b3d] focus:border-cyan-400 text-slate-100 placeholder:text-slate-500 font-sans leading-normal"
            />
            <button
              type="submit"
              className="px-4 sm:px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Aplicar</span>
            </button>
          </form>

          {quickChangeLog && (
            <div className="text-xs sm:text-sm text-cyan-300/90 bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-800/40 flex items-center gap-2 animate-fadeIn font-medium">
              <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>{quickChangeLog}</span>
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* BLOCO 3: Saída Final Compilada PT / EN                       */}
        {/* (FONTE DOBRADA PARA MÁXIMA LEGIBILIDADE E CÓPIA FÁCIL)       */}
        {/* ============================================================ */}
        <section className="bg-[#0b0d13] border border-[#242b3d] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2.5 border-b border-[#1f2537] pb-3">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-100">
                BLOCO 3: Saída Final Compilada
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Tabs PT-BR vs EN */}
              <div className="flex items-center bg-[#151924] p-1 rounded-xl border border-[#242b3d]">
                <button
                  type="button"
                  onClick={() => setOutputTab('en')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    outputTab === 'en'
                      ? 'bg-amber-500 text-black shadow-sm font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Inglês Técnico (EN)
                </button>
                <button
                  type="button"
                  onClick={() => setOutputTab('pt')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    outputTab === 'pt'
                      ? 'bg-amber-500 text-black shadow-sm font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Português (PT-BR)
                </button>
              </div>

              {/* Botão Copiar */}
              <button
                type="button"
                onClick={() => onCopyText(currentPromptText, outputTab === 'en' ? 'Prompt EN' : 'Prompt PT-BR')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition cursor-pointer"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Copiado!' : `Copiar Prompt (${outputTab.toUpperCase()})`}</span>
              </button>
            </div>
          </div>

          {/* Teto e Status de Caracteres */}
          <div className="flex items-center justify-between text-xs sm:text-sm px-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Teto Máximo do Modelo:</span>
              <span className={`font-mono font-bold ${
                currentCharCount <= 1800 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {currentCharCount} / 1.800 caracteres
              </span>
            </div>
            {currentCharCount <= 1800 ? (
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                ✓ Dentro do limite seguro (&lt;1.800 chars)
              </span>
            ) : (
              <span className="text-rose-400 text-xs font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Ultrapassou o teto de 1.800 chars
              </span>
            )}
          </div>

          {/* Caixa de Texto do Prompt Compilado (FONTE DOBRADA: text-lg/text-xl font-mono com alto contraste) */}
          <div className="relative">
            <pre 
              className="text-base sm:text-lg md:text-xl text-slate-100 whitespace-pre-wrap font-mono bg-[#07090e] p-5 sm:p-6 rounded-2xl border-2 border-[#283248] overflow-y-auto max-h-[520px] leading-relaxed selection:bg-amber-500/30 selection:text-amber-200"
              style={{ fontSize: '1.25rem', lineHeight: '1.8' }}
            >
              {currentPromptText}
            </pre>
          </div>
        </section>
      </main>

      {/* Modal Explicativo de Raciocínio do Diretor */}
      <DirectorModal
        isOpen={isDirectorModalOpen}
        onClose={() => setIsDirectorModalOpen(false)}
        reasoning={compiled.directorReasoning || state.directorReasoning}
        engineName={compiled.audit.engineName}
        blockInfo={compiled.audit.blockInfo}
      />
    </>
  );
};
