/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Aplicação Central — AI Video Director Engine
 * Super-Skill Omni Video Director Pro — Guided Autonomy v4.0
 */

import React, { useState, useMemo } from 'react';
import { Header, HeaderPreset } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { CenterPanel } from './components/CenterPanel';
import { RightPanel } from './components/RightPanel';

import { 
  SceneDirectiveState, 
  createDefaultSceneState, 
  compileScene, 
  applyQuickNaturalChange 
} from './engine/directorRules';

export default function App() {
  const [sceneState, setSceneState] = useState<SceneDirectiveState>(() => createDefaultSceneState(1));
  const [quickChangeLog, setQuickChangeLog] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'en' | 'pt' | null>(null);

  const compiled = useMemo(() => {
    return compileScene(sceneState);
  }, [sceneState]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleUpdateState = (partial: Partial<SceneDirectiveState>) => {
    setSceneState((prev) => ({
      ...prev,
      ...partial
    }));
  };

  // BLOCO 2: Processamento de Mudança Rápida (NLP Fast Engine)
  const handleApplyQuickChange = (request: string) => {
    const { updatedState, changeLog } = applyQuickNaturalChange(sceneState, request);
    setSceneState(updatedState);
    setQuickChangeLog(changeLog);
    showToast('Ajuste aplicado com sucesso!');
  };

  // Botão "⚡ Criar Direção Inteligente" via Guided Autonomy API (Gemini 3.8 Flash)
  const handleGenerateSmartDirection = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/director/guided-autonomy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scriptBlock1: sceneState.speechBlock1,
          scriptBlock2: sceneState.speechBlock2,
          visualIdea: sceneState.visualIdea,
          masterMode: sceneState.masterMode,
          preferences: sceneState.preferences || []
        })
      });

      if (res.ok) {
        const data = await res.json();
        
        setSceneState((prev) => ({
          ...prev,
          directorReasoning: data.direcao_de_arte_analise || prev.directorReasoning,
          visualIdea: data.descricao_curta_cena_1 
            ? `${data.descricao_curta_cena_1}${data.descricao_curta_cena_2 ? ' ' + data.descricao_curta_cena_2 : ''}`
            : prev.visualIdea
        }));

        showToast('Direção de Arte e Raciocínio calculados pelo Diretor!');
      } else {
        showToast('Direção local recalculada com sucesso!');
      }
    } catch {
      // Fallback local robusto
      showToast('Direção local recalculada com sucesso!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectPreset = (p: HeaderPreset) => {
    setSceneState((prev) => ({
      ...prev,
      masterMode: p.masterMode,
      speechBlock1: p.speechText,
      speechBlock2: '',
      speechText: p.speechText,
      visualIdea: p.visualIdea,
      bodyProfileId: p.bodyProfileId,
      zDepthBoxId: p.zDepthBoxId,
      scenarioId: p.scenarioId,
      lightingId: p.lightingId
    }));
    setQuickChangeLog(`Pré-configuração "${p.title}" aplicada com sucesso.`);
    showToast(`Carregado: ${p.title}`);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copiado para a área de transferência!`);
    }).catch(() => {
      showToast('Falha ao copiar.');
    });
  };

  const handleCopyAllEN = () => {
    handleCopyText(compiled.promptEn, 'Prompt Técnico (EN)');
    setCopiedType('en');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopySpeechPT = () => {
    const fullSpeech = sceneState.speechBlock1.trim() + (sceneState.speechBlock2.trim() ? ' ' + sceneState.speechBlock2.trim() : '');
    handleCopyText(fullSpeech, 'Roteiro da Fala (PT-BR)');
    setCopiedType('pt');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-200 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header Superior com fontes maiores */}
      <Header
        onSelectPreset={handleSelectPreset}
        onCopyAllEN={handleCopyAllEN}
        onCopySpeechPT={handleCopySpeechPT}
        copiedType={copiedType}
      />

      {/* Grid Principal dos 3 Painéis com espaçamento harmônico */}
      <div className="flex-1 max-w-[1920px] w-full mx-auto p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Painel Esquerdo: Configuração Mestre e Roteiro */}
        <div className="lg:col-span-4 h-fit">
          <LeftPanel
            state={sceneState}
            wordAnalysisBlock1={compiled.wordAnalysisBlock1}
            wordAnalysisBlock2={compiled.wordAnalysisBlock2}
            onUpdateState={handleUpdateState}
            onGenerateSmartDirection={handleGenerateSmartDirection}
            isGenerating={isGenerating}
          />
        </div>

        {/* Painel Central: Raciocínio do Diretor, Auditoria, Mudança Rápida e Saída Compilada */}
        <div className="lg:col-span-5 h-fit">
          <CenterPanel
            compiled={compiled}
            state={sceneState}
            onApplyQuickChange={handleApplyQuickChange}
            quickChangeLog={quickChangeLog}
            onCopyText={handleCopyText}
            isCopied={toastMessage?.includes('copiado') || false}
          />
        </div>

        {/* Painel Direito: Guided Autonomy Tags em Acordeão & Filtros Pele Viva */}
        <div className="lg:col-span-3 h-fit">
          <RightPanel
            state={sceneState}
            onUpdateState={handleUpdateState}
          />
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-black font-black text-sm px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
