/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Header — Barra Superior de Controle e Presets
 * Super-Skill Omni Video Director Pro — Guided Autonomy
 */

import React from 'react';
import { 
  Clapperboard, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen
} from 'lucide-react';

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
    lightingId: 'biotec_cyan'
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
  onSelectPreset: (preset: HeaderPreset) => void;
  onCopyAllEN: () => void;
  onCopySpeechPT: () => void;
  copiedType: 'en' | 'pt' | null;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPreset,
  onCopyAllEN,
  onCopySpeechPT,
  copiedType
}) => {
  return (
    <header className="border-b border-[#242b3d] bg-[#0b0e15]/95 backdrop-blur-md sticky top-0 z-40 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3.5 shadow-lg">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-black font-black">
          <Clapperboard className="w-6 h-6 text-black stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-base sm:text-lg font-black text-slate-100 tracking-tight flex items-center gap-2">
              AI Video Director Pro
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                Guided Autonomy v4.0
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2 mt-0.5 font-medium">
            <span className="text-amber-400 font-bold">Super-Skill Autônoma</span>
            <span>•</span>
            <span className="text-slate-300">Dual-Language (Prompt EN / Roteiro PT-BR)</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono font-bold text-xs">Teto &lt;1.800 Chars</span>
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center bg-[#10131c] border border-[#242b3d] rounded-2xl px-3.5 py-2 shadow-inner">
          <BookOpen className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-slate-400 mr-2.5 hidden sm:inline">Pré-Configs:</span>
          <select 
            className="bg-transparent text-xs sm:text-sm font-semibold text-slate-200 focus:outline-none cursor-pointer pr-2 max-w-[240px] sm:max-w-none"
            onChange={(e) => {
              const p = HEADER_PRESETS.find(s => s.id === e.target.value);
              if (p) onSelectPreset(p);
            }}
            defaultValue=""
          >
            <option value="" disabled className="bg-[#10131c] text-slate-400">Carregar Pré-Configuração Técnica...</option>
            {HEADER_PRESETS.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#10131c] text-slate-200">
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Batch Copy Buttons */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center bg-[#10131c] border border-[#242b3d] rounded-2xl p-1 shadow-sm">
          <button
            type="button"
            onClick={onCopyAllEN}
            title="Copiar Prompt Técnico Compilado em Inglês"
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-black text-amber-300 hover:bg-[#181d2a] rounded-xl transition-all cursor-pointer"
          >
            {copiedType === 'en' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-amber-400" />
            )}
            <span>Copiar Prompt (EN)</span>
          </button>
          <div className="w-px h-5 bg-[#242b3d]" />
          <button
            type="button"
            onClick={onCopySpeechPT}
            title="Copiar Fala Limpa em Português para TTS/Voz"
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-black text-cyan-300 hover:bg-[#181d2a] rounded-xl transition-all cursor-pointer"
          >
            {copiedType === 'pt' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-cyan-400" />
            )}
            <span>Copiar Fala (PT-BR)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
