/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Painel Central — Limpeza Total: Foco Exclusivo nas Saídas Finais Compiladas (Cena 1, Cena 2... Cena 6)
 * Topo: Botão Raciocínio do Diretor & Cronologia (Modal) + Barra de Solicitar Mudança Rápida
 */

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  FileText, 
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Send,
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
  isCopied: _isCopied
}) => {
  // Aba de idioma ativa por cena: chave = sceneNum, valor = 'en' | 'pt'
  const [tabByBlock, setTabByBlock] = useState<Record<number, 'en' | 'pt'>>({});
  const [copiedBlockNum, setCopiedBlockNum] = useState<number | null>(null);
  const [quickInput, setQuickInput] = useState('');
  const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onApplyQuickChange(quickInput.trim());
    setQuickInput('');
  };

  const handleCopyBlock = (sceneNum: number, text: string, lang: 'en' | 'pt') => {
    onCopyText(text, `Cena ${sceneNum} (${lang.toUpperCase()})`);
    setCopiedBlockNum(sceneNum);
    setTimeout(() => setCopiedBlockNum(null), 2000);
  };

  const blocksToRender = compiled.blocks && compiled.blocks.length > 0 
    ? compiled.blocks 
    : [
        {
          blockNumber: 1,
          promptPt: compiled.promptPt,
          promptEn: compiled.promptEn,
          charCountPt: compiled.charCountPt,
          charCountEn: compiled.charCountEn,
          isWithinCharLimit: compiled.isWithinCharLimit,
          wordAnalysis: compiled.wordAnalysis,
          speech: state.speechBlock1 || ''
        }
      ];

  return (
    <>
      <main className="bg-[#10131c] border border-[#242b3d] rounded-2xl p-4 sm:p-5 flex flex-col gap-5 shadow-xl">
        {/* TOPO ITEM A: BOTÃO DESTACADO: ABRIR RACIOCÍNIO DO DIRETOR & CRONOLOGIA (MODAL) */}
        <button
          type="button"
          onClick={() => setIsDirectorModalOpen(true)}
          className="w-full py-4 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-[#161c29] to-cyan-500/20 border-2 border-amber-400 hover:border-amber-300 text-amber-200 hover:text-white shadow-xl shadow-amber-500/10 flex items-center justify-between group transition-all active:scale-[0.99] cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shrink-0 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-sm sm:text-base font-black tracking-wide text-white group-hover:text-amber-300 transition-colors">
                📖 Abrir Raciocínio do Diretor & Cronologia (Modal)
              </span>
              <span className="block text-xs text-amber-200/80 font-medium">
                Linha do tempo de 1 a 6 cenas, auditoria técnica e justificativa de cada ferramenta
              </span>
            </div>
          </div>
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-amber-500 text-black font-black uppercase tracking-wider shrink-0 shadow-md">
            Abrir Análise
          </span>
        </button>

        {/* TOPO ITEM B: BARRA ENXUTA: SOLICITAR MUDANÇA RÁPIDA (NLP Fast Engine) */}
        <div className="bg-[#0b0d13] border border-cyan-500/35 rounded-2xl p-3 flex flex-col gap-2 shadow-sm">
          <form onSubmit={handleQuickSubmit} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 pl-1 shrink-0">
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>🔄 Solicitar Mudança Rápida:</span>
            </div>
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder='Ex: "mude para luz quente", "sem caixa Z-Depth", "perfil empatia", "tirar microfone"...'
              className="flex-1 text-xs sm:text-sm rounded-xl px-3 py-2 bg-[#07090e] border border-[#242b3d] focus:border-cyan-400 text-slate-100 placeholder:text-slate-500 font-sans"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Aplicar</span>
            </button>
          </form>

          {quickChangeLog && (
            <div className="text-xs text-cyan-300/90 bg-cyan-950/40 p-2 rounded-xl border border-cyan-800/40 flex items-center gap-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
              <span>{quickChangeLog}</span>
            </div>
          )}
        </div>

        {/* SAÍDA FINAL COMPILADA: Cartões separados de forma limpa por Cena (Cena 1, Cena 2... Cena 6) */}
        <div className="flex flex-col gap-5">
          {blocksToRender.map((block) => {
            const sceneNum = block.blockNumber;
            const isFirstScene = sceneNum === 1;
            const currentTab = tabByBlock[sceneNum] || 'en';
            const promptText = currentTab === 'en' ? block.promptEn : block.promptPt;
            const charCount = currentTab === 'en' ? block.charCountEn : block.charCountPt;
            const isBlockCopied = copiedBlockNum === sceneNum;

            const sceneTitle = isFirstScene
              ? 'PROMPT FINAL — CENA 1 (0-10s)'
              : `PROMPT FINAL — CENA ${sceneNum} (${(sceneNum - 1) * 10}-${sceneNum * 10}s - Continuidade Frame-Lock)`;

            return (
              <section 
                key={sceneNum}
                className="bg-[#0b0d13] border border-[#242b3d] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-lg relative overflow-hidden"
              >
                {/* Faixa lateral indicativa de status */}
                <div className={`absolute top-0 left-0 bottom-0 w-1 ${isFirstScene ? 'bg-amber-400' : 'bg-cyan-400'}`} />

                {/* Cabeçalho do Card da Cena */}
                <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#1f2537] pb-3">
                  <div className="flex items-center gap-2.5">
                    <FileText className={`w-4 h-4 ${isFirstScene ? 'text-amber-400' : 'text-cyan-400'}`} />
                    <h2 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider text-slate-100 font-sans">
                      {sceneTitle}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Alternância PT-BR / EN */}
                    <div className="flex items-center bg-[#151924] p-1 rounded-xl border border-[#242b3d]">
                      <button
                        type="button"
                        onClick={() => setTabByBlock(prev => ({ ...prev, [sceneNum]: 'en' }))}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentTab === 'en'
                            ? 'bg-amber-500 text-black font-black shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        type="button"
                        onClick={() => setTabByBlock(prev => ({ ...prev, [sceneNum]: 'pt' }))}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentTab === 'pt'
                            ? 'bg-amber-500 text-black font-black shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        PT-BR
                      </button>
                    </div>

                    {/* Botão Copiar Prompt */}
                    <button
                      type="button"
                      onClick={() => handleCopyBlock(sceneNum, promptText, currentTab)}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 text-black font-black text-xs shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition cursor-pointer"
                    >
                      {isBlockCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isBlockCopied ? 'Copiado!' : `Copiar Prompt (${currentTab.toUpperCase()})`}</span>
                    </button>
                  </div>
                </div>

                {/* Status de Limite de Caracteres (<1.800 chars) */}
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-1.5" title="Contagem de caracteres para motores de vídeo IA (Runway Gen-3, Kling, Sora, Luma)">
                    <span className="text-slate-400">Caracteres:</span>
                    <span className={`font-mono font-bold ${
                      charCount <= 1800 
                        ? 'text-emerald-400' 
                        : charCount <= 2200 
                        ? 'text-amber-400' 
                        : 'text-rose-400'
                    }`}>
                      {charCount} / 1.800
                    </span>
                  </div>
                  {charCount <= 1800 ? (
                    <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                      ✓ Dentro do limite seguro (&lt;1.800 chars)
                    </span>
                  ) : charCount <= 2200 ? (
                    <span className="text-amber-400 font-semibold text-[11px] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Moderado ({charCount} chars — suportado em Kling/Sora)
                    </span>
                  ) : (
                    <span className="text-rose-400 font-semibold text-[11px] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Risco de truncamento (&gt;2.200 chars)
                    </span>
                  )}
                </div>

                {/* Texto do Prompt Compilado */}
                <div className="relative">
                  <pre 
                    className="text-xs sm:text-sm text-slate-100 whitespace-pre-wrap font-mono bg-[#07090e] p-4 rounded-xl border border-[#283248] overflow-y-auto max-h-[380px] leading-relaxed selection:bg-amber-500/30 selection:text-amber-200"
                  >
                    {promptText}
                  </pre>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Modal Explicativo de Raciocínio do Diretor & Cronologia (Toda a auditoria técnica de 1 a 6 cenas) */}
      <DirectorModal
        isOpen={isDirectorModalOpen}
        onClose={() => setIsDirectorModalOpen(false)}
        reasoning={compiled.directorReasoning || state.directorReasoning}
        engineName={compiled.audit.engineName}
        blockInfo={compiled.audit.blockInfo}
        audit={compiled.audit}
      />
    </>
  );
};
