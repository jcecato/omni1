/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modal Explicativo — Raciocínio do Diretor de Cinema
 * Super-Skill Omni Video Director Pro — Guided Autonomy
 */

import React, { useEffect } from 'react';
import { 
  Clapperboard, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  Sun, 
  Sliders, 
  ShieldCheck,
  FileText
} from 'lucide-react';

interface DirectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasoning: string;
  engineName?: string;
  blockInfo?: string;
}

export const DirectorModal: React.FC<DirectorModalProps> = ({
  isOpen,
  onClose,
  reasoning,
  engineName = 'Motor Audiovisual Pro',
  blockInfo = 'Bloco de 10s'
}) => {
  // Fechar com tecla ESC
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#0e111a] border border-[#2a344d] rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl shadow-amber-500/10 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="p-5 sm:p-6 border-b border-[#1f2638] flex items-center justify-between bg-gradient-to-r from-[#141926] via-[#10141f] to-[#141926]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
              <Clapperboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-100">
                  Raciocínio do Diretor de Cinema
                </h2>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                  Guided Autonomy
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {engineName} • {blockInfo}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-[#1a2133] border border-[#2d3852] hover:bg-[#25304a] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Fechar Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal com Justificativa do Diretor */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Card de introdução com princípios */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300 font-bold">Diretriz da Super-Skill:</strong> O Diretor analisa o peso semântico da fala, cadência fonética e intenção do roteiro para validar ou descartar as tags sugeridas pelo usuário, priorizando harmonia cinematográfica e retenção visual.
            </div>
          </div>

          {/* Análise de Direção de Arte */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-200">
                Análise Completa de Direção de Arte & Escolhas
              </h3>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#080a0f] border border-[#222a3d] leading-relaxed text-sm sm:text-base text-slate-200 font-sans whitespace-pre-wrap selection:bg-amber-500/30">
              {reasoning ? (
                reasoning
              ) : (
                <div className="text-slate-400 italic">
                  O Diretor ainda não realizou uma compilação guiada. Clique em "⚡ Criar Direção Inteligente" para gerar o raciocínio detalhado de direção de arte para este roteiro.
                </div>
              )}
            </div>
          </div>

          {/* Pilares de Decisão */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#141824] border border-[#232b3d] flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-cyan-400">
                <Camera className="w-3.5 h-3.5" />
                Câmera & Movimento
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Enquadramento e lentes selecionadas para sustentar a cadência sem causar cansaço ocular.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141824] border border-[#232b3d] flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-yellow-400">
                <Sun className="w-3.5 h-3.5" />
                Iluminação & Atmosfera
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Temperatura de cor e sombras mapeadas diretamente ao sentimento emocional das frases.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141824] border border-[#232b3d] flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Segurança Semântica
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Textos em 17px, safe zones respeitadas e mandíbula blindada contra artefatos plásticos.
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé com botão de fechar */}
        <div className="p-4 sm:p-5 border-t border-[#1f2638] bg-[#0b0e16] flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Omni Video Director Pro v4.0 • Guided Autonomy
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs sm:text-sm tracking-wide transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Entendido, Voltar ao Painel
          </button>
        </div>
      </div>
    </div>
  );
};
