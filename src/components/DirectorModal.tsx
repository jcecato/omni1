/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modal Explicativo — Raciocínio Completo do Diretor de Cinema & Auditoria Técnica
 * Super-Skill Omni Video Director Pro
 */

import React, { useEffect } from 'react';
import { 
  Clapperboard, 
  X, 
  Sparkles, 
  Camera, 
  Sun, 
  Layers, 
  UserCheck,
  ShieldCheck,
  FileText
} from 'lucide-react';

import { AuditExplanation } from '../engine/directorRules';

interface DirectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasoning: string;
  engineName?: string;
  blockInfo?: string;
  audit?: AuditExplanation;
}

export const DirectorModal: React.FC<DirectorModalProps> = ({
  isOpen,
  onClose,
  reasoning,
  engineName = 'Motor Audiovisual Pro',
  blockInfo = 'Blocos Configurados',
  audit
}) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#0e111a] border border-[#2a344d] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl shadow-amber-500/10 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="p-5 sm:p-6 border-b border-[#1f2638] flex items-center justify-between bg-gradient-to-r from-[#141926] via-[#10141f] to-[#141926]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
              <Clapperboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-100">
                  Raciocínio do Diretor & Auditoria
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                  Guided Autonomy
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {engineName} • {blockInfo}
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

        {/* Corpo do Modal */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-slate-200">
          {/* Card com os 4 Pilares da Auditoria Técnica da Cena */}
          {audit && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Auditoria Técnica da Cena Selecionada
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                  100% Blindado
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-[#141824] p-2.5 rounded-xl border border-[#232b3d]">
                  <div className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1 mb-0.5">
                    <Camera className="w-3 h-3 text-cyan-400" />
                    Câmera & Lente
                  </div>
                  <div className="font-bold text-slate-200 line-clamp-2">
                    {audit.cameraLens}
                  </div>
                </div>

                <div className="bg-[#141824] p-2.5 rounded-xl border border-[#232b3d]">
                  <div className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1 mb-0.5">
                    <Layers className="w-3 h-3 text-amber-400" />
                    Caixa Z-Depth
                  </div>
                  <div className="font-bold text-slate-200 line-clamp-2">
                    {audit.zDepthLayout}
                  </div>
                </div>

                <div className="bg-[#141824] p-2.5 rounded-xl border border-[#232b3d]">
                  <div className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1 mb-0.5">
                    <Sun className="w-3 h-3 text-yellow-400" />
                    Iluminação
                  </div>
                  <div className="font-bold text-slate-200 line-clamp-2">
                    {audit.lightingName}
                  </div>
                </div>

                <div className="bg-[#141824] p-2.5 rounded-xl border border-[#232b3d]">
                  <div className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1 mb-0.5">
                    <UserCheck className="w-3 h-3 text-emerald-400" />
                    Perfil Corporal
                  </div>
                  <div className="font-bold text-slate-200 line-clamp-2">
                    {audit.bodyProfileName}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Banner de Princípios da Super-Skill */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <strong className="text-amber-300 font-bold">Diretriz da Super-Skill:</strong> O Diretor avalia a fala, cadência fonética (1.2x) e preferências selecionadas pelo usuário, justificando abaixo o porquê de cada decisão técnica e descartes.
            </div>
          </div>

          {/* Análise de Direção de Arte e Raciocínio detalhado */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200">
                Análise Completa de Direção de Arte & Justificativas
              </h3>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#080a0f] border border-[#222a3d] leading-relaxed text-xs sm:text-sm text-slate-200 font-sans whitespace-pre-wrap selection:bg-amber-500/30">
              {reasoning ? (
                reasoning
              ) : (
                <div className="text-slate-400 italic">
                  O Diretor ainda não realizou uma compilação guiada. Clique em "⚡ Criar Direção Inteligente" para gerar o raciocínio detalhado de direção de arte para este roteiro.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rodapé com botão de fechar */}
        <div className="p-4 border-t border-[#1f2638] bg-[#0b0e16] flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Omni Video Director Pro v4.0 • Guided Autonomy
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs tracking-wide transition-all active:scale-95 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Entendido, Voltar ao Painel
          </button>
        </div>
      </div>
    </div>
  );
};
