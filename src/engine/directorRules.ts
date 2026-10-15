/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Motor Central de Direção Audiovisual Super-Skill Omni Video Director Pro v3.0
 */

import {
  TEMPLATE_VOICEOVER,
  TEMPLATE_LIPSYNC,
  TEMPLATE_VIDEO_TO_VIDEO,
  TEMPLATE_VOICEOVER_EN,
  TEMPLATE_LIPSYNC_EN,
  TEMPLATE_VIDEO_TO_VIDEO_EN,
  injectTemplate
} from './templates';

import {
  MASTER_TEMPLATES,
  BODY_PROFILES,
  SCENARIO_CATALOG,
  MICROPHONE_OPTIONS,
  LENS_FRAMINGS,
  CAMERA_MOVEMENTS,
  CAMERA_ANGLES,
  LIGHTING_OPTIONS,
  ZDEPTH_BOXES,
  LIVING_SKIN_FILTERS,
  EMOTIONAL_TONES,
  BodyProfile,
  ScenarioOption,
  MicrophoneOption,
  LensFramingOption,
  CameraMovementOption,
  CameraAngleOption,
  LightingOption,
  ZDepthBoxOption
} from './catalog13Groups';

export interface SceneDirectiveState {
  blockNumber: number; // 1 to 6 (10s each)
  masterMode: 'voiceover' | 'lipsync' | 'video_to_video';
  speechBlock1: string; // Roteiro Bloco 1 (0-10s) - Limite 20 palavras
  speechBlock2: string; // Roteiro Bloco 2 (Continuação 10-20s) [Opcional]
  speechText: string;   // Fallback ou concatenação dos blocos
  visualIdea: string;
  preferences: string[]; // Guided Autonomy Tags selecionadas no RightPanel
  directorReasoning: string; // "direcao_de_arte_analise" do Diretor de Cinema
  activeReferences: Record<string, boolean>; // 'personagem', 'voz', 'cena', 'elemento1', 'video_base', 'video_anterior'
  
  // Overrides & Selections
  bodyProfileId: number; // 1 to 6
  scenarioId: string;
  microphoneId: string;
  lensFramingId: string;
  cameraMovementId: string;
  cameraAngleId: string;
  lightingId: string;
  zDepthBoxId: 'sem_caixa' | 'topo_headroom' | 'atras_gigante' | 'lateral_perspectiva';
  emotionalToneId: string;
  activeSkinFilters: Record<string, boolean>;
}

export interface WordCountAnalysis {
  wordCount: number;
  charCount: number;
  estimatedSeconds: number;
  status: 'ideal' | 'warning' | 'empty';
  message: string;
}

export interface AuditExplanation {
  engineName: string;
  blockInfo: string;
  cameraLens: string;
  zDepthLayout: string;
  lightingName: string;
  bodyProfileName: string;
  reasons: string[];
}

export interface CompiledOutput {
  promptPt: string;
  promptEn: string;
  audit: AuditExplanation;
  wordAnalysis: WordCountAnalysis;
  wordAnalysisBlock1: WordCountAnalysis;
  wordAnalysisBlock2: WordCountAnalysis;
  directorReasoning: string;
  charCountPt: number;
  charCountEn: number;
  isWithinCharLimit: boolean; // <= 1800 chars
}

/**
 * Análise de palavras e cadência para vídeos de 10s a 1.2x.
 * Teto de 16 a 20 palavras por bloco de 10s.
 */
export function analyzeSpeechCadence(text: string): WordCountAnalysis {
  const clean = text.trim();
  if (!clean) {
    return {
      wordCount: 0,
      charCount: 0,
      estimatedSeconds: 0,
      status: 'empty',
      message: 'Insira o roteiro da fala para calcular a métrica de cadência.'
    };
  }

  // Dividir por espaços e pontuações comuns
  const words = clean.split(/\s+/).filter(w => w.length > 0);
  const count = words.length;

  // Em cadência 1.2x (aprox. 2.0 a 2.2 palavras por segundo)
  const estimatedSec = parseFloat((count / 2.0).toFixed(1));

  if (count <= 20) {
    return {
      wordCount: count,
      charCount: clean.length,
      estimatedSeconds: estimatedSec,
      status: 'ideal',
      message: `Ideal para 10s a 1.2x (${count} palavras — ~${estimatedSec}s com pausas respiratórias)`
    };
  }

  return {
    wordCount: count,
    charCount: clean.length,
    estimatedSeconds: estimatedSec,
    status: 'warning',
    message: `Atenção: ${count} palavras ultrapassa o teto de 20 palavras. Pode acelerar a voz ou cortar o final. Sugerido dividir em Bloco #${Math.ceil(count / 18)}.`
  };
}

/**
 * Cria um estado padrão inicial de cena.
 */
export function createDefaultSceneState(blockNumber = 1): SceneDirectiveState {
  const speechBlock1 = 'Quando você entende a causa raiz, cada conduta clínica ganha precisão e autoridade.';
  const speechBlock2 = '';
  
  return {
    blockNumber,
    masterMode: 'lipsync',
    speechBlock1,
    speechBlock2,
    speechText: speechBlock1,
    visualIdea: 'Médico em consultório moderno falando com autoridade, com iluminação balanceada e microfone broadcast ao lado.',
    preferences: ['bokeh_85mm', 'warm_amber', 'bio_seguranca'],
    directorReasoning: 'DIREÇÃO DE ARTE & ANÁLISE CINEMATOGRÁFICA:\n\n1. Seleção de Motor e Lente: Escolhi o Molde Mestre Talking-Head Lip-Sync com óptica prime de 85mm f/1.8 com shallow bokeh. A fala aborda o diagnóstico da "causa raiz", o que exige isolar o especialista do ambiente secundário para que o espectador retenha 100% da atenção nas microexpressões dos olhos e na articulação labial sóbria.\n\n2. Iluminação & Atmosfera (Warm Amber): A paleta âmbar foi selecionada para balancear autoridade clínica com acolhimento humano. Evitamos luz clínica hiper-fria (6500K) para não criar distanciamento ou frieza mecânica; os tons quentes valorizam a textura orgânica de pele real (Subsurface Scattering).\n\n3. Análise das Preferências do Usuário (Guided Autonomy):\n- "85mm Shallow Bokeh" e "Segurança Firme" foram APROVADAS e integradas como esteio da cena, pois casam perfeitamente com a gravidade seriedade médica.\n- A posição Z-Depth foi configurada como "Apresentador Puro" (sem caixas flutuantes) durante o primeiro bloco para evitar sobrecarga cognitiva enquanto o médico estabelece o pacto de credibilidade inicial com o público.\n\n4. Biomecânica Labial e Dentes: Mandíbula estritamente contida, dentes superiores encobertos pelo lábio e ausência total de caretas ou movimentos laterais do queixo.',
    activeReferences: {
      personagem: true,
      voz: true,
      cena: true,
      elemento1: true,
      video_base: false,
      video_anterior: blockNumber > 1
    },
    bodyProfileId: 1, // Segurança
    scenarioId: 'consultorio',
    microphoneId: 'shure_congelado',
    lensFramingId: 'medio_85mm',
    cameraMovementId: 'push_in_3m',
    cameraAngleId: 'frontal',
    lightingId: 'warm_amber',
    zDepthBoxId: 'sem_caixa',
    emotionalToneId: 'Alerta',
    activeSkinFilters: {
      texturas: true,
      pele_sss: true,
      anti_plastico: true,
      anti_emborrachado: true,
      anti_opaco: true,
      poros_suaves: true
    }
  };
}

/**
 * Compila a cena completa aplicando as regras estritas da Super-Skill v3.0 e Guided Autonomy.
 */
export function compileScene(state: SceneDirectiveState): CompiledOutput {
  const speech1 = state.speechBlock1?.trim() || '';
  const speech2 = state.speechBlock2?.trim() || '';
  const fullSpeech = [speech1, speech2].filter(Boolean).join(' ') || state.speechText.trim();

  const wordAnalysisBlock1 = analyzeSpeechCadence(speech1);
  const wordAnalysisBlock2 = analyzeSpeechCadence(speech2);
  const wordAnalysis = analyzeSpeechCadence(fullSpeech);

  // 1. Resolver objetos do catálogo
  const bodyProfile = BODY_PROFILES.find(b => b.id === state.bodyProfileId) || BODY_PROFILES[0];
  const scenario = SCENARIO_CATALOG.find(s => s.id === state.scenarioId) || SCENARIO_CATALOG[0];
  const microphone = MICROPHONE_OPTIONS.find(m => m.id === state.microphoneId) || MICROPHONE_OPTIONS[0];
  const lensFraming = LENS_FRAMINGS.find(l => l.id === state.lensFramingId) || LENS_FRAMINGS[0];
  const cameraMove = CAMERA_MOVEMENTS.find(c => c.id === state.cameraMovementId) || CAMERA_MOVEMENTS[0];
  const cameraAngle = CAMERA_ANGLES.find(a => a.id === state.cameraAngleId) || CAMERA_ANGLES[0];
  const lighting = LIGHTING_OPTIONS.find(l => l.id === state.lightingId) || LIGHTING_OPTIONS[0];
  const zDepth = ZDEPTH_BOXES[state.zDepthBoxId] || ZDEPTH_BOXES.sem_caixa;
  const tone = EMOTIONAL_TONES.find(t => t.id === state.emotionalToneId) || EMOTIONAL_TONES[0];

  // 2. Continuidade Automática (Frame-Lock) para blocos 2 a 6
  let continuidadePt = '';
  let continuidadeEn = '';
  if (state.blockNumber > 1 || speech2) {
    continuidadePt = `[CONTINUIDADE DE CENA - BLOCO #${state.blockNumber} DE 6 | FRAME-LOCK]: Continue exatamente a partir do último frame de [ REFERENCIA VIDEO ANTERIOR ]. Mantenha 100% travados o enquadramento final, iluminação, roupa, postura corporal e geometria espacial, sem corte seco.`;
    continuidadeEn = `[SCENE CONTINUITY - BLOCK #${state.blockNumber} OF 6 | FRAME-LOCK]: Continue seamlessly from the final frame of [ REFERENCIA VIDEO ANTERIOR ]. Maintain 100% locked the final framing, lighting, wardrobe, body posture and spatial geometry, zero jump-cut.`;
  }

  // 3. Montar descrição visual densa
  const descVisualPt = `${lensFraming.ptDesc}, ${cameraAngle.ptDesc}, ${cameraMove.ptDesc}. Sujeito no centro em postura firme e segura. ${lighting.ptDesc}. ${zDepth.ptDesc}.`;
  const descVisualEn = `${lensFraming.enDesc}, ${cameraAngle.enDesc}, ${cameraMove.enDesc}. Subject centered with confident poised posture. ${lighting.enDesc}. ${zDepth.enDesc}.`;

  // 4. Sons e Foley
  const somPt1 = 'Acústica de estúdio broadcast seca, tom de ambiente sutil de escritório executivo.';
  const somPt2 = 'Foley suave de interface com transição atmosférica sutil e fita sonora imersiva.';
  const somEn1 = 'Dry broadcast room tone acoustics, subtle low-frequency ambient presence.';
  const somEn2 = 'Subtle interface foley with atmospheric air swell and crisp room clarity.';

  // 5. Restrições e Negativos dinâmicos
  let negPt = '';
  let negEn = '';
  if (state.zDepthBoxId === 'sem_caixa') {
    negPt = 'SEM elementos flutuantes, SEM caixas gráficas, SEM mockups, SEM poluição visual.';
    negEn = 'NO floating UI elements, NO graphic boxes, NO mockups, NO visual clutter.';
  } else {
    negPt = 'SEM elementos sobrepondo o rosto, SEM textos desfocados ou distorcidos, SEM bordas serrilhadas.';
    negEn = 'NO overlays covering the face, NO distorted or unreadable typography, NO rough edges.';
  }

  // 6. Dicionário de variáveis PT
  const varsPt: Record<string, string> = {
    BLOCO_CONTINUIDADE_AUTOMATICA: continuidadePt,
    FORMATO: '9:16 (Vertical)',
    NUM_CENAS: speech2 ? '2 (Atos Contínuos 0-10s / 10-20s)' : '2',
    REGRA_TIPOGRAFIA_DINAMICA: zDepth.typographyRulePt,
    DESCRICAO_CURTA_CENA_1: `${descVisualPt} (Ato 1: 0-10s: "${speech1 || fullSpeech}").`,
    DESCRICAO_CURTA_CENA_2: speech2 
      ? `${descVisualPt} (Ato 2 Continuação: 10-20s: "${speech2}").` 
      : `${descVisualPt} (Ato 2: 5-10s, aproximação sutil na faixa dos olhos).`,
    TOM_NARRACAO: tone.pt,
    TEXTO_DA_FALA: fullSpeech,
    SOM_CENA_1: somPt1,
    SOM_CENA_2: somPt2,
    NEGATIVO_TEXTO_DINAMICO: negPt,
    TIPO_MICROFONE: microphone.ptDesc,
    CAMERA_E_LUZ_CENA: `${lensFraming.ptDesc}, ${lighting.ptDesc}`,
    ELEMENTO_MOTION_ZDEPTH: zDepth.ptDesc,
    PERFIL_CORPORAL_SELECIONADO: bodyProfile.ptDesc,
    SAIDA_FINAL_DINAMICA: zDepth.outputRulePt,
    MODO_BOCA_V2V: 'Sincronia labial fluida preservando 100% da biomecânica do vídeo de base, dentes superiores encobertos.',
    AMBIENTE_E_LUZ_V2V: `${scenario.ptDesc}; ${lighting.ptDesc}`,
    CAMERA_E_TRANSICAO_V2V: `${cameraMove.ptDesc}; ${cameraAngle.ptDesc}`,
    CONSTRUCAO_CAIXA_MOTION_V2V: zDepth.ptDesc
  };

  // 7. Dicionário de variáveis EN (visual em inglês, voz e fala preservadas em PT-BR)
  const varsEn: Record<string, string> = {
    BLOCO_CONTINUIDADE_AUTOMATICA: continuidadeEn,
    FORMATO: '9:16 (Vertical Portrait)',
    NUM_CENAS: speech2 ? '2 (Continuous Acts 0-10s / 10-20s)' : '2',
    REGRA_TIPOGRAFIA_DINAMICA: zDepth.typographyRuleEn,
    DESCRICAO_CURTA_CENA_1: `${descVisualEn} (Act 1: 0-10s: "${speech1 || fullSpeech}").`,
    DESCRICAO_CURTA_CENA_2: speech2
      ? `${descVisualEn} (Act 2 Continuation: 10-20s: "${speech2}").`
      : `${descVisualEn} (Act 2: 5-10s, subtle push-in to eye level).`,
    TOM_NARRACAO: tone.en,
    TEXTO_DA_FALA: fullSpeech, // Fala sempre em PT-BR
    SOM_CENA_1: somEn1,
    SOM_CENA_2: somEn2,
    NEGATIVO_TEXTO_DINAMICO: negEn,
    TIPO_MICROFONE: microphone.enDesc,
    CAMERA_E_LUZ_CENA: `${lensFraming.enDesc}, ${lighting.enDesc}`,
    ELEMENTO_MOTION_ZDEPTH: zDepth.enDesc,
    PERFIL_CORPORAL_SELECIONADO: bodyProfile.enDesc,
    SAIDA_FINAL_DINAMICA: zDepth.outputRuleEn,
    MODO_BOCA_V2V: 'Fluid natural lip-sync strictly preserving video motion base, teeth hidden behind lips.',
    AMBIENTE_E_LUZ_V2V: `${scenario.enDesc}; ${lighting.enDesc}`,
    CAMERA_E_TRANSICAO_V2V: `${cameraMove.enDesc}; ${cameraAngle.enDesc}`,
    CONSTRUCAO_CAIXA_MOTION_V2V: zDepth.enDesc
  };

  // 8. Escolher molde
  let promptPt = '';
  let promptEn = '';

  if (state.masterMode === 'voiceover') {
    promptPt = injectTemplate(TEMPLATE_VOICEOVER, varsPt);
    promptEn = injectTemplate(TEMPLATE_VOICEOVER_EN, varsEn);
  } else if (state.masterMode === 'lipsync') {
    promptPt = injectTemplate(TEMPLATE_LIPSYNC, varsPt);
    promptEn = injectTemplate(TEMPLATE_LIPSYNC_EN, varsEn);
  } else {
    promptPt = injectTemplate(TEMPLATE_VIDEO_TO_VIDEO, varsPt);
    promptEn = injectTemplate(TEMPLATE_VIDEO_TO_VIDEO_EN, varsEn);
  }

  // 9. Auditoria do painel
  const audit: AuditExplanation = {
    engineName: MASTER_TEMPLATES.find(m => m.id === state.masterMode)?.name || 'Molde Mestre',
    blockInfo: speech2 ? 'Bloco Duplo (0-10s + Continuação 10-20s @ 1.2x)' : `Bloco #${state.blockNumber} (10s @ 1.2x)${state.blockNumber > 1 ? ' [Frame-Lock Ativo]' : ' [Início]'}`,
    cameraLens: `${lensFraming.name} | ${cameraAngle.name} | ${cameraMove.name}`,
    zDepthLayout: zDepth.name,
    lightingName: lighting.name,
    bodyProfileName: bodyProfile.name,
    reasons: [
      `Cadência Bloco 1: ${wordAnalysisBlock1.wordCount} palavras (~${wordAnalysisBlock1.estimatedSeconds}s) — ${wordAnalysisBlock1.status === 'ideal' ? 'Total conformidade com o teto de 20 palavras' : 'Requer atenção ao limite'}`,
      speech2 ? `Cadência Bloco 2: ${wordAnalysisBlock2.wordCount} palavras (~${wordAnalysisBlock2.estimatedSeconds}s) — ${wordAnalysisBlock2.status === 'ideal' ? 'Conforme' : 'Atenção'}` : 'Bloco único configurado para 10s',
      `Segurança Visual: Sem sobreposição no rosto. Regra de dentes e mandíbula blindada.`,
      `Guided Autonomy: ${state.preferences?.length || 0} preferências do usuário avaliadas pelo Diretor.`
    ]
  };

  return {
    promptPt,
    promptEn,
    audit,
    wordAnalysis,
    wordAnalysisBlock1,
    wordAnalysisBlock2,
    directorReasoning: state.directorReasoning,
    charCountPt: promptPt.length,
    charCountEn: promptEn.length,
    isWithinCharLimit: promptPt.length <= 1800 && promptEn.length <= 1800
  };
}

/**
 * Interpretador inteligente de Mudança Rápida (NLP Local Fast Engine).
 * Interpreta pedidos como "mude para luz quente", "sem caixa", "perfil empatia", etc.
 */
export function applyQuickNaturalChange(
  currentState: SceneDirectiveState,
  request: string
): { updatedState: SceneDirectiveState; changeLog: string } {
  const lower = request.toLowerCase();
  const next = { ...currentState };
  const changes: string[] = [];

  // Iluminação
  if (lower.includes('luz quente') || lower.includes('warm') || lower.includes('amber') || lower.includes('dourad')) {
    next.lightingId = 'warm_amber';
    changes.push('Iluminação ajustada para Warm Amber (Luz Quente)');
  } else if (lower.includes('luz fria') || lower.includes('silver') || lower.includes('clinica')) {
    next.lightingId = 'clinical_silver';
    changes.push('Iluminação ajustada para Clinical Silver (Luz Fria)');
  } else if (lower.includes('biotec') || lower.includes('cyan') || lower.includes('azul')) {
    next.lightingId = 'biotec_cyan';
    changes.push('Iluminação ajustada para Biotec Cyan');
  } else if (lower.includes('dimming') || lower.includes('escurec') || lower.includes('dramat')) {
    next.lightingId = 'dimming_narrativo';
    changes.push('Iluminação ajustada para Dimming Narrativo');
  }

  // Z-Depth / Caixas
  if (lower.includes('sem caixa') || lower.includes('puro') || lower.includes('apresentador puro') || lower.includes('tirar caixa') || lower.includes('remover caixa')) {
    next.zDepthBoxId = 'sem_caixa';
    changes.push('Camada Z-Depth alterada para: Sem Caixa (Apresentador Puro)');
  } else if (lower.includes('caixa ao lado') || lower.includes('lateral') || lower.includes('60/40') || lower.includes('isom')) {
    next.zDepthBoxId = 'lateral_perspectiva';
    changes.push('Camada Z-Depth alterada para: Caixa Lateral em Perspectiva (35°)');
  } else if (lower.includes('acima da cabeça') || lower.includes('topo') || lower.includes('headroom') || lower.includes('hud')) {
    next.zDepthBoxId = 'topo_headroom';
    changes.push('Camada Z-Depth alterada para: Caixa Acima da Cabeça (+25% Escala)');
  } else if (lower.includes('atrás') || lower.includes('z-1') || lower.includes('midground') || lower.includes('gigante')) {
    next.zDepthBoxId = 'atras_gigante';
    changes.push('Camada Z-Depth alterada para: Caixa Gigante Atrás da Cabeça (Z-1)');
  }

  // Perfis Corporais
  if (lower.includes('empatia') || lower.includes('perfil 2') || lower.includes('acolh')) {
    next.bodyProfileId = 2;
    changes.push('Perfil Corporal alterado para: Perfil 2 (Empatia)');
  } else if (lower.includes('segurança') || lower.includes('perfil 1') || lower.includes('firme')) {
    next.bodyProfileId = 1;
    changes.push('Perfil Corporal alterado para: Perfil 1 (Segurança)');
  } else if (lower.includes('simpatia') || lower.includes('perfil 3') || lower.includes('sorriso')) {
    next.bodyProfileId = 3;
    changes.push('Perfil Corporal alterado para: Perfil 3 (Simpatia sem dentes)');
  } else if (lower.includes('hilário') || lower.includes('elegante') || lower.includes('perfil 4')) {
    next.bodyProfileId = 4;
    changes.push('Perfil Corporal alterado para: Perfil 4 (Hilário Elegante)');
  } else if (lower.includes('preocupado') || lower.includes('analítico') || lower.includes('perfil 5')) {
    next.bodyProfileId = 5;
    changes.push('Perfil Corporal alterado para: Perfil 5 (Preocupado Profissional)');
  } else if (lower.includes('reflexivo') || lower.includes('perfil 6')) {
    next.bodyProfileId = 6;
    changes.push('Perfil Corporal alterado para: Perfil 6 (Reflexivo)');
  }

  // Microfone
  if (lower.includes('sem microfone') || lower.includes('tirar microfone') || lower.includes('remover microfone') || lower.includes('clean')) {
    next.microphoneId = 'sem_microfone';
    changes.push('Microfone alterado para: Sem microfone visível (Clean)');
  } else if (lower.includes('lapela')) {
    next.microphoneId = 'lapela_discreto';
    changes.push('Microfone alterado para: Lapela discreto');
  } else if (lower.includes('shure') || lower.includes('braço')) {
    next.microphoneId = 'shure_congelado';
    changes.push('Microfone alterado para: Braço articulado Shure');
  }

  // Cenário
  if (lower.includes('campo aberto') || lower.includes('gramado') || lower.includes('natureza')) {
    next.scenarioId = 'campo_aberto';
    changes.push('Cenário alterado para: Campo Aberto / Natureza');
  } else if (lower.includes('praia') || lower.includes('orla')) {
    next.scenarioId = 'calçadao_praia';
    changes.push('Cenário alterado para: Calçadão da Praia');
  } else if (lower.includes('carro') || lower.includes('veiculo')) {
    next.scenarioId = 'carro_movimento';
    changes.push('Cenário alterado para: Interior de Veículo / Carro');
  } else if (lower.includes('consultorio') || lower.includes('clinica')) {
    next.scenarioId = 'consultorio';
    changes.push('Cenário alterado para: Consultório Moderno & Acolhedor');
  } else if (lower.includes('estudio') || lower.includes('broadcast')) {
    next.scenarioId = 'estudio_broadcast';
    changes.push('Cenário alterado para: Estúdio Broadcast Minimalista');
  } else if (lower.includes('escritorio') || lower.includes('home office')) {
    next.scenarioId = 'escritorio_executivo';
    changes.push('Cenário alterado para: Escritório Executivo / Home Office');
  }

  // Câmera & Movimento
  if (lower.includes('orbita') || lower.includes('circular') || lower.includes('360')) {
    next.cameraMovementId = 'orbita_360';
    changes.push('Movimento alterado para: Órbita Suave 360°');
  } else if (lower.includes('push in') || lower.includes('aproximar') || lower.includes('zoom')) {
    next.cameraMovementId = 'push_in_3m';
    changes.push('Movimento alterado para: Aproximar Lentamente (3m ➔ Olhos)');
  } else if (lower.includes('estatico') || lower.includes('fixo') || lower.includes('tripé')) {
    next.cameraMovementId = 'estatico';
    changes.push('Movimento alterado para: Câmera Estática / Fixa');
  }

  // Molde Mestre
  if (lower.includes('voiceover') || lower.includes('voz em off') || lower.includes('b-roll')) {
    next.masterMode = 'voiceover';
    changes.push('Molde Mestre alterado para: Voiceover & B-Roll');
  } else if (lower.includes('lip-sync') || lower.includes('lipsync') || lower.includes('talking head')) {
    next.masterMode = 'lipsync';
    changes.push('Molde Mestre alterado para: Talking-Head Lip-Sync 2K');
  } else if (lower.includes('video para video') || lower.includes('v2v')) {
    next.masterMode = 'video_to_video';
    changes.push('Molde Mestre alterado para: Vídeo para Vídeo');
  }

  const log = changes.length > 0 
    ? `Ajustes aplicados: ${changes.join(', ')}.`
    : 'Nenhum parâmetro identificado explicitamente. Foram preservados os padrões técnicos.';

  return { updatedState: next, changeLog: log };
}
