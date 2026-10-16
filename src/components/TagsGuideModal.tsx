/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modal Explicativo Geral de Tags (Guia de Uso & 5 Exemplos Comuns)
 * Super-Skill Omni Video Director Pro
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Tag, 
  Search, 
  Check, 
  Sparkles, 
  Lightbulb, 
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';
import { TAGS_GUIDE_CATALOG, TagGuideItem } from '../engine/tagsGuideData';

interface TagsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
}

export const TagsGuideModal: React.FC<TagsGuideModalProps> = ({
  isOpen,
  onClose,
  selectedTags,
  onToggleTag
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lista de grupos únicos
  const groupsList = useMemo(() => {
    const set = new Set<string>();
    TAGS_GUIDE_CATALOG.forEach(item => set.add(item.groupTitle));
    return Array.from(set);
  }, []);

  // Filtragem por busca e por grupo
  const filteredTags = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TAGS_GUIDE_CATALOG.filter(item => {
      const matchesGroup = selectedGroup === 'all' || item.groupTitle === selectedGroup;
      if (!matchesGroup) return false;
      if (!q) return true;

      const inName = item.name.toLowerCase().includes(q);
      const inExplanation = item.explanation.toLowerCase().includes(q);
      const inGroup = item.groupTitle.toLowerCase().includes(q);
      const inExamples = item.whenToUse.some(ex => ex.toLowerCase().includes(q));

      return inName || inExplanation || inGroup || inExamples;
    });
  }, [searchQuery, selectedGroup]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#0e111a] border border-[#2a344d] rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-amber-500/10 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="p-5 sm:p-6 border-b border-[#1f2638] flex items-center justify-between bg-gradient-to-r from-[#141926] via-[#10141f] to-[#141926]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-100">
                  Guia Técnico Geral de Tags & Preferências
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                  15 Grupos
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Conceito técnico em frase curta e 5 momentos práticos de uso em roteiros e vídeos para cada elemento
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

        {/* Filtros e Busca */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-[#1f2638] bg-[#090b11] flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tag, conceito ou situação de uso..."
              className="w-full text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2 bg-[#121622] border border-[#242b3d] focus:border-amber-400 text-slate-100 placeholder:text-slate-500 font-sans"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              Grupo:
            </span>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="text-xs rounded-xl px-3 py-2 bg-[#121622] border border-[#242b3d] text-slate-200 focus:border-amber-400 cursor-pointer"
            >
              <option value="all">Todos os Grupos ({TAGS_GUIDE_CATALOG.length} tags)</option>
              {groupsList.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Cards de Tags */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredTags.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              Nenhuma tag encontrada para os termos pesquisados.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTags.map((item) => {
                const isSelected = selectedTags.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between gap-3.5 transition-all ${
                      isSelected
                        ? 'bg-amber-950/20 border-amber-400/80 ring-1 ring-amber-400/30 shadow-lg shadow-amber-500/5'
                        : 'bg-[#0d1017] border-[#22293b] hover:border-slate-500'
                    }`}
                  >
                    <div>
                      {/* Grupo & Status */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#181d2a] text-amber-300 border border-[#273248] font-bold">
                          {item.groupTitle}
                        </span>

                        <button
                          type="button"
                          onClick={() => onToggleTag(item.id)}
                          className={`text-xs px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-black font-black shadow-md'
                              : 'bg-[#151924] hover:bg-slate-700 text-slate-300 border border-[#242b3d]'
                          }`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Sparkles className="w-3 h-3 text-amber-400" />}
                          <span>{isSelected ? 'Ativa na Cena' : 'Ativar Tag'}</span>
                        </button>
                      </div>

                      {/* Nome da Tag */}
                      <h3 className="text-sm sm:text-base font-black text-slate-100 flex items-center gap-2 mb-1">
                        {item.name}
                      </h3>

                      {/* Explicação em Frase Curta */}
                      <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3 bg-[#11141f] p-2.5 rounded-xl border border-[#1e2436]">
                        <strong className="text-amber-400 font-semibold block mb-0.5">Explicação técnica:</strong>
                        {item.explanation}
                      </p>

                      {/* 5 Momentos / Exemplos Comuns de Uso */}
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1 mb-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
                          Quando Usar (5 Exemplos Comuns):
                        </span>
                        <ul className="space-y-1 pl-1">
                          {item.whenToUse.map((example, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex items-start gap-2 leading-snug">
                              <span className="w-4 h-4 rounded-full bg-[#171d2b] border border-[#29354e] text-cyan-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
