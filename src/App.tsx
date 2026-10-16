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
  applyQuickNaturalChange,
  evaluateGuidedAutonomyLocally
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

  // Processamento de Mudança Rápida (NLP Fast Engine)
  const handleApplyQuickChange = (request: string) => {
    const { updatedState, changeLog } = applyQuickNaturalChange(sceneState, request);
    setSceneState(updatedState);
    setQuickChangeLog(changeLog);
    showToast('Ajuste aplicado com sucesso!');
  };

  // Botão "⚡ Criar Direção Inteligente" via Guided Autonomy API (Gemini 3.8 Flash + Fallback Local Robusto)
  const handleGenerateSmartDirection = async () => {
    setIsGenerating(true);
    const activeScripts = (sceneState.blockScripts || []).slice(0, sceneState.blockCount || 1);

    try {
      const res = await fetch('/api/director/guided-autonomy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blockCount: sceneState.blockCount || 1,
          blockScripts: activeScripts,
          scriptBlock1: activeScripts[0] || sceneState.speechBlock1 || '',
          scriptBlock2: activeScripts[1] || sceneState.speechBlock2 || '',
          visualIdea: sceneState.visualIdea,
          masterMode: sceneState.masterMode,
          preferences: sceneState.preferences || []
        })
      });

      if (res.ok) {
        const data = await res.json();
        
        setSceneState((prev) => {
          const updated = { ...prev };
          if (data.direcao_de_arte_analise) updated.directorReasoning = data.direcao_de_arte_analise;
          if (data.motor_escolhido) updated.masterMode = data.motor_escolhido.toLowerCase().replace('-', '_');
          if (data.perfil_id) updated.bodyProfileId = data.perfil_id;
          if (data.cenario_id) updated.scenarioId = data.cenario_id;
          if (data.iluminacao_id) updated.lightingId = data.iluminacao_id;
          if (data.lente_id) updated.lensFramingId = data.lente_id;
          if (data.movimento_id) updated.cameraMovementId = data.movimento_id;
          if (data.angulo_id) updated.cameraAngleId = data.angulo_id;
          if (data.zdepth_id) updated.zDepthBoxId = data.zdepth_id;
          if (data.microfone_id) updated.microphoneId = data.microfone_id;
          if (data.tom_id) updated.emotionalToneId = data.tom_id;

          if (data.cenas_cronologicas && data.cenas_cronologicas.length > 0) {
            updated.visualIdea = data.cenas_cronologicas
              .map((c: any) => `Cena ${c.bloco}: ${c.ato_1_pt} ${c.ato_2_pt}`)
              .join(' | ');
          } else if (data.descricao_curta_cena_1) {
            updated.visualIdea = `${data.descricao_curta_cena_1}${data.descricao_curta_cena_2 ? ' ' + data.descricao_curta_cena_2 : ''}`;
          }

          return updated;
        });

        showToast('Direção de Arte e Raciocínio calculados pelo Diretor!');
      } else {
        // Fallback local robusto baseado no catálogo completo dos 15 grupos
        const { updatedState } = evaluateGuidedAutonomyLocally(sceneState);
        setSceneState(updatedState);
        showToast('Direção recalculada localmente pelo Diretor!');
      }
    } catch {
      // Fallback local robusto
      const { updatedState } = evaluateGuidedAutonomyLocally(sceneState);
      setSceneState(updatedState);
      showToast('Direção recalculada localmente pelo Diretor!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectPreset = (p: HeaderPreset) => {
    setSceneState((prev) => {
      const updatedScripts = p.blockScripts && p.blockScripts.length > 0 
        ? [...p.blockScripts] 
        : [...(prev.blockScripts || [])];
      if (!p.blockScripts || p.blockScripts.length === 0) {
        updatedScripts[0] = p.speechText;
      }
      return {
        ...prev,
        masterMode: p.masterMode,
        blockCount: p.blockCount || (p.blockScripts && p.blockScripts.length > 0 ? p.blockScripts.length : prev.blockCount),
        blockScripts: updatedScripts,
        speechBlock1: updatedScripts[0] || p.speechText,
        speechText: p.speechText,
        visualIdea: p.visualIdea,
        bodyProfileId: p.bodyProfileId,
        zDepthBoxId: p.zDepthBoxId,
        scenarioId: p.scenarioId,
        lightingId: p.lightingId,
        selectedPhysiologyId: p.selectedPhysiologyId,
        preferences: p.preferences ? [...p.preferences] : prev.preferences
      };
    });
    setQuickChangeLog(`Pré-configuração "${p.title}" aplicada com sucesso.`);
    showToast(`Carregado: ${p.title}`);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copiado!`);
    }).catch(() => {
      showToast('Falha ao copiar.');
    });
  };

  const handleCopyAllEN = () => {
    // Copia todas as cenas ativas em inglês
    const allEn = compiled.blocks.map(b => `// === CENA ${b.blockNumber} ===\n${b.promptEn}`).join('\n\n');
    handleCopyText(allEn, 'Todas as Cenas (EN)');
    setCopiedType('en');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopySpeechPT = () => {
    const activeScripts = (sceneState.blockScripts || []).slice(0, sceneState.blockCount || 1);
    const fullSpeech = activeScripts.join(' ');
    handleCopyText(fullSpeech, 'Roteiro da Fala (PT-BR)');
    setCopiedType('pt');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#080a0f] text-slate-200 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header Superior com Presets Nominais */}
      <Header
        currentState={sceneState}
        onSelectPreset={handleSelectPreset}
        onCopyAllEN={handleCopyAllEN}
        onCopySpeechPT={handleCopySpeechPT}
        copiedType={copiedType}
      />

      {/* Grid Principal dos 3 Painéis (Largura Total Máxima Expandida) */}
      <div className="flex-1 w-full max-w-none px-2 sm:px-3 lg:px-4 py-3 grid grid-cols-1 lg:grid-cols-12 gap-3 xl:gap-4">
        {/* Painel Esquerdo: Molde Mestre, Seletor 1 a 6 e Roteiros estritos */}
        <div className="lg:col-span-4 h-fit">
          <LeftPanel
            state={sceneState}
            onUpdateState={handleUpdateState}
            onGenerateSmartDirection={handleGenerateSmartDirection}
            isGenerating={isGenerating}
          />
        </div>

        {/* Painel Central: Objetivo, exibindo estritamente Bloco X + EN / PT / Copiar + Prompt */}
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
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-black font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
