/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Motor Central de Direção Audiovisual Super-Skill Omni Video Director Pro v4.0
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
  blockCount: number; // 1 to 6 (quantos blocos o usuário quer fazer)
  blockScripts: string[]; // Roteiros de cada bloco (índice 0 = Bloco 1, 1 = Bloco 2, ..., até 5 = Bloco 6)
  masterMode: 'voiceover' | 'lipsync' | 'video_to_video';
  visualIdea: string;
  preferences: string[]; // Guided Autonomy Tags selecionadas no RightPanel
  directorReasoning: string; // "direcao_de_arte_analise" do Diretor de Cinema
  activeReferences: Record<string, boolean>;
  
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

  // Campos de compatibilidade
  speechBlock1?: string;
  speechBlock2?: string;
  speechText?: string;
  blockNumber?: number;
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

export interface CompiledBlockOutput {
  blockNumber: number;
  promptPt: string;
  promptEn: string;
  charCountPt: number;
  charCountEn: number;
  isWithinCharLimit: boolean;
  wordAnalysis: WordCountAnalysis;
  speech: string;
}

export interface CompiledOutput {
  promptPt: string; // Bloco 1 (ou todos concatenados)
  promptEn: string;
  blocks: CompiledBlockOutput[]; // Lista individual para cada Bloco selecionado
  audit: AuditExplanation;
  wordAnalysis: WordCountAnalysis;
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
  const clean = (text || '').trim();
  if (!clean) {
    return {
      wordCount: 0,
      charCount: 0,
      estimatedSeconds: 0,
      status: 'empty',
      message: 'Insira o roteiro da fala para calcular a métrica de cadência.'
    };
  }

  const words = clean.split(/\s+/).filter(w => w.length > 0);
  const count = words.length;
  const estimatedSec = parseFloat((count / 2.0).toFixed(1));

  if (count <= 20) {
    return {
      wordCount: count,
      charCount: clean.length,
      estimatedSeconds: estimatedSec,
      status: 'ideal',
      message: `${count} palavras (~${estimatedSec}s a 1.2x). Dentro da janela ideal (16-20 palavras).`
    };
  }

  return {
    wordCount: count,
    charCount: clean.length,
    estimatedSeconds: estimatedSec,
    status: 'warning',
    message: `${count} palavras (~${estimatedSec}s). Excede o teto de 20 palavras para 10s. Ajuste a fala.`
  };
}

/**
 * Cria o estado inicial padrão com 1 bloco selecionado
 */
export function createDefaultSceneState(initialBlocks = 1): SceneDirectiveState {
  const defaultScript1 = 'Quando você entende a causa raiz, cada conduta clínica ganha precisão e autoridade.';
  
  const blockScripts = [
    defaultScript1,
    'A inflamação celular silenciosa sabota o metabolismo muito antes dos primeiros sintomas.',
    'O equilíbrio do microbioma restaura a barreira intestinal e preserva a imunidade.',
    'Com dados clínicos integrados, você prevê interações medicamentosas com segurança total.',
    'A adesão do paciente triplica quando a explicação é visual, empática e direta.',
    'Essa é a nova medicina personalizada que gera resultados reais e duradouros.'
  ];

  return {
    blockCount: initialBlocks,
    blockScripts,
    masterMode: 'lipsync',
    speechBlock1: defaultScript1,
    speechBlock2: '',
    speechText: defaultScript1,
    blockNumber: 1,
    visualIdea: 'Médico em consultório moderno falando com autoridade, com iluminação balanceada e microfone broadcast ao lado.',
    preferences: ['bokeh_85mm', 'warm_amber', 'bio_seguranca'],
    directorReasoning: 'DIREÇÃO DE ARTE & ANÁLISE CINEMATOGRÁFICA:\n\n1. Seleção de Motor e Lente: Escolhi o Molde Mestre Talking-Head Lip-Sync com óptica prime de 85mm f/1.8 com shallow bokeh. A fala aborda o diagnóstico da "causa raiz", o que exige isolar o especialista do ambiente secundário para que o espectador retenha 100% da atenção nas microexpressões dos olhos e na articulação labial sóbria.\n\n2. Iluminação & Atmosfera (Warm Amber): A paleta âmbar foi selecionada para balancear autoridade clínica com acolhimento humano. Evitamos luz clínica hiper-fria (6500K) para não criar distanciamento ou frieza mecânica; os tons quentes valorizam a textura orgânica de pele real (Subsurface Scattering).\n\n3. Análise das Preferências do Usuário (Guided Autonomy):\n- "85mm Shallow Bokeh" e "Segurança Firme" foram APROVADAS e integradas como esteio da cena, pois casam perfeitamente com a gravidade e seriedade médica.\n- A posição Z-Depth foi configurada como "Apresentador Puro" (sem caixas flutuantes) durante o primeiro bloco para evitar sobrecarga cognitiva enquanto o médico estabelece o pacto de credibilidade inicial com o público.\n\n4. Biomecânica Labial e Dentes: Mandíbula estritamente contida, dentes superiores encobertos pelo lábio e ausência total de caretas ou movimentos laterais do queixo.',
    activeReferences: {
      personagem: true,
      voz: true,
      cena: true,
      elemento1: true,
      video_base: false,
      video_anterior: false
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
 * Compila cada bloco individualmente para que a tela do meio exiba exatamente os blocos criados
 */
export function compileScene(state: SceneDirectiveState): CompiledOutput {
  const numBlocks = Math.max(1, Math.min(6, state.blockCount || 1));

  // Resolver objetos do catálogo
  const bodyProfile = BODY_PROFILES.find(b => b.id === state.bodyProfileId) || BODY_PROFILES[0];
  const scenario = SCENARIO_CATALOG.find(s => s.id === state.scenarioId) || SCENARIO_CATALOG[0];
  const microphone = MICROPHONE_OPTIONS.find(m => m.id === state.microphoneId) || MICROPHONE_OPTIONS[0];
  const lensFraming = LENS_FRAMINGS.find(l => l.id === state.lensFramingId) || LENS_FRAMINGS[0];
  const cameraMove = CAMERA_MOVEMENTS.find(c => c.id === state.cameraMovementId) || CAMERA_MOVEMENTS[0];
  const cameraAngle = CAMERA_ANGLES.find(a => a.id === state.cameraAngleId) || CAMERA_ANGLES[0];
  const lighting = LIGHTING_OPTIONS.find(l => l.id === state.lightingId) || LIGHTING_OPTIONS[0];
  const zDepth = ZDEPTH_BOXES[state.zDepthBoxId] || ZDEPTH_BOXES.sem_caixa;
  const tone = EMOTIONAL_TONES.find(t => t.id === state.emotionalToneId) || EMOTIONAL_TONES[0];

  const somPt1 = 'Acústica broadcast seca, presença ambiente sutil.';
  const somPt2 = 'Foley sutil de respiração e claridade de estúdio.';
  const somEn1 = 'Dry broadcast room tone acoustics, subtle ambient presence.';
  const somEn2 = 'Subtle room clarity and soft room tone atmosphere.';

  let negPt = '';
  let negEn = '';
  if (state.zDepthBoxId === 'sem_caixa') {
    negPt = 'SEM elementos flutuantes, SEM caixas gráficas, SEM poluição visual.';
    negEn = 'NO floating UI elements, NO graphic boxes, NO visual clutter.';
  } else {
    negPt = 'SEM sobreposição no rosto, SEM textos desfocados, SEM bordas serrilhadas.';
    negEn = 'NO overlays covering the face, NO distorted typography, NO rough edges.';
  }

  const descVisualPt = `${lensFraming.ptDesc}, ${cameraAngle.ptDesc}, ${cameraMove.ptDesc}. ${lighting.ptDesc}. ${zDepth.ptDesc}.`;
  const descVisualEn = `${lensFraming.enDesc}, ${cameraAngle.enDesc}, ${cameraMove.enDesc}. ${lighting.enDesc}. ${zDepth.enDesc}.`;

  const compiledBlocks: CompiledBlockOutput[] = [];

  for (let i = 0; i < numBlocks; i++) {
    const blockNum = i + 1;
    const speech = (state.blockScripts && state.blockScripts[i] !== undefined)
      ? state.blockScripts[i].trim()
      : (i === 0 ? (state.speechBlock1 || state.speechText || '') : '');

    const wordAnalysis = analyzeSpeechCadence(speech);

    // Frame-Lock para cenas 2 em diante
    let continuidadePt = '';
    let continuidadeEn = '';
    if (blockNum > 1) {
      continuidadePt = `[CONTINUIDADE DE CENA - CENA #${blockNum} DE ${numBlocks} | FRAME-LOCK]: Continue do último frame de [ REFERENCIA VIDEO ANTERIOR ]. Enquadramento, iluminação e geometria 100% travados, zero jump-cut.`;
      continuidadeEn = `[SCENE CONTINUITY - SCENE #${blockNum} OF ${numBlocks} | FRAME-LOCK]: Seamlessly continue from final frame of [ REFERENCIA VIDEO ANTERIOR ]. Maintain 100% locked framing, lighting and geometry, zero jump-cut.`;
    }

    // Cronologia Visual Progressiva entre as cenas (Cena 1 a Cena 6)
    let ato1Pt = 'Ato 1 (0-5s): Foco inicial no olhar firme e gancho de autoridade imediato, lábios selados.';
    let ato2Pt = 'Ato 2 (5-10s): Articulação labial contida, estabilidade de mandíbula e clareza narrativa.';
    let ato1En = 'Act 1 (0-5s): Initial eye-contact hook and unwavering authority, sealed lips.';
    let ato2En = 'Act 2 (5-10s): Restrained sober lip movement, jaw stability and narrative clarity.';

    if (numBlocks > 1) {
      const startSec = (blockNum - 1) * 10;
      const midSec = startSec + 5;
      const endSec = blockNum * 10;

      if (blockNum === 1) {
        ato1Pt = `Ato 1 (0-5s): Enquadramento frontal direto, olhar firme estabelecendo gancho de autoridade imediato.`;
        ato2Pt = `Ato 2 (5-10s): Articulação labial sóbria, microexpressões assertivas sem mover mandíbula.`;
        ato1En = `Act 1 (0-5s): Direct eye-level frontal framing, locked gaze establishing instant credibility.`;
        ato2En = `Act 2 (5-10s): Controlled sober lip articulation, micro-assertive gaze without jaw displacement.`;
      } else if (blockNum === 2) {
        ato1Pt = `Ato 1 (${startSec}-${midSec}s): Transição contínua em Slow Push-In sutil conectada ao frame anterior.`;
        ato2Pt = `Ato 2 (${midSec}-${endSec}s): Ancoragem de autoridade com micro-aceno assertivo, lábios selados.`;
        ato1En = `Act 1 (${startSec}-${midSec}s): Seamless Slow Push-In transition perfectly locked from previous frame.`;
        ato2En = `Act 2 (${midSec}-${endSec}s): Anchored authoritative presence with subtle nod, sealed lips.`;
      } else if (blockNum === 3) {
        ato1Pt = `Ato 1 (${startSec}-${midSec}s): Variação angular em perspectiva dinâmica, aprofundando o mecanismo visual.`;
        ato2Pt = `Ato 2 (${midSec}-${endSec}s): Postura firme e gestos contidos de convicção técnica.`;
        ato1En = `Act 1 (${startSec}-${midSec}s): Dynamic angular perspective shift deepening visual mechanism.`;
        ato2En = `Act 2 (${midSec}-${endSec}s): Steady posture and restrained gestures conveying technical conviction.`;
      } else if (blockNum === 4) {
        ato1Pt = `Ato 1 (${startSec}-${midSec}s): Dimming narrativo sutil destacando a gravidade do ponto central.`;
        ato2Pt = `Ato 2 (${midSec}-${endSec}s): Retorno da iluminação principal com resolução assertiva.`;
        ato1En = `Act 1 (${startSec}-${midSec}s): Subtle narrative dimming accentuating central core message.`;
        ato2En = `Act 2 (${midSec}-${endSec}s): Key light restoration delivering clear assertive resolution.`;
      } else if (blockNum === 5) {
        ato1Pt = `Ato 1 (${startSec}-${midSec}s): Deslocamento Parallax destacando volumetria e dados essenciais.`;
        ato2Pt = `Ato 2 (${midSec}-${endSec}s): Preparação para fechamento com alta retenção do espectador.`;
        ato1En = `Act 1 (${startSec}-${midSec}s): Parallax spatial glide accentuating visual volume and key data.`;
        ato2En = `Act 2 (${midSec}-${endSec}s): Pre-closing transition maintaining maximum viewer retention.`;
      } else {
        ato1Pt = `Ato 1 (${startSec}-${midSec}s): Plano consolidado de autoridade máxima, estabilização perfeita.`;
        ato2Pt = `Ato 2 (${midSec}-${endSec}s): Desfecho contundente com olhar fixo, finalização sem jump-cut.`;
        ato1En = `Act 1 (${startSec}-${midSec}s): Consolidated master framing of peak authority, rock-solid posture.`;
        ato2En = `Act 2 (${midSec}-${endSec}s): Powerful closing delivery with unwavering eye contact, zero jump-cut.`;
      }
    }

    const varsPt: Record<string, string> = {
      BLOCO_CONTINUIDADE_AUTOMATICA: continuidadePt,
      FORMATO: '9:16 (Vertical)',
      NUM_CENAS: '2 atos dinâmicos',
      REGRA_TIPOGRAFIA_DINAMICA: zDepth.typographyRulePt,
      DESCRICAO_CURTA_CENA_1: ato1Pt,
      DESCRICAO_CURTA_CENA_2: ato2Pt,
      TOM_NARRACAO: tone.pt,
      TEXTO_DA_FALA: speech,
      SOM_CENA_1: somPt1,
      SOM_CENA_2: somPt2,
      NEGATIVO_TEXTO_DINAMICO: negPt,
      TIPO_MICROFONE: microphone.ptDesc,
      CAMERA_E_LUZ_CENA: `${lensFraming.ptDesc}, ${lighting.ptDesc}`,
      ELEMENTO_MOTION_ZDEPTH: zDepth.ptDesc,
      PERFIL_CORPORAL_SELECIONADO: bodyProfile.ptDesc,
      SAIDA_FINAL_DINAMICA: zDepth.outputRulePt,
      MODO_BOCA_V2V: 'Sincronia labial sutil, dentes invisíveis, mandíbula estável.',
      AMBIENTE_E_LUZ_V2V: `${scenario.ptDesc}; ${lighting.ptDesc}`,
      CAMERA_E_TRANSICAO_V2V: `${cameraMove.ptDesc}; ${cameraAngle.ptDesc}`,
      CONSTRUCAO_CAIXA_MOTION_V2V: zDepth.ptDesc
    };

    const varsEn: Record<string, string> = {
      BLOCO_CONTINUIDADE_AUTOMATICA: continuidadeEn,
      FORMATO: '9:16 (Vertical Portrait)',
      NUM_CENAS: '2 dynamic acts',
      REGRA_TIPOGRAFIA_DINAMICA: zDepth.typographyRuleEn,
      DESCRICAO_CURTA_CENA_1: ato1En,
      DESCRICAO_CURTA_CENA_2: ato2En,
      TOM_NARRACAO: tone.en,
      TEXTO_DA_FALA: speech, // Fala sempre em PT-BR
      SOM_CENA_1: somEn1,
      SOM_CENA_2: somEn2,
      NEGATIVO_TEXTO_DINAMICO: negEn,
      TIPO_MICROFONE: microphone.enDesc,
      CAMERA_E_LUZ_CENA: `${lensFraming.enDesc}, ${lighting.enDesc}`,
      ELEMENTO_MOTION_ZDEPTH: zDepth.enDesc,
      PERFIL_CORPORAL_SELECIONADO: bodyProfile.enDesc,
      SAIDA_FINAL_DINAMICA: zDepth.outputRuleEn,
      MODO_BOCA_V2V: 'Subtle lip-sync, invisible teeth, stable jaw motion.',
      AMBIENTE_E_LUZ_V2V: `${scenario.enDesc}; ${lighting.enDesc}`,
      CAMERA_E_TRANSICAO_V2V: `${cameraMove.enDesc}; ${cameraAngle.enDesc}`,
      CONSTRUCAO_CAIXA_MOTION_V2V: zDepth.enDesc
    };

    let pPt = '';
    let pEn = '';

    if (state.masterMode === 'voiceover') {
      pPt = injectTemplate(TEMPLATE_VOICEOVER, varsPt);
      pEn = injectTemplate(TEMPLATE_VOICEOVER_EN, varsEn);
    } else if (state.masterMode === 'lipsync') {
      pPt = injectTemplate(TEMPLATE_LIPSYNC, varsPt);
      pEn = injectTemplate(TEMPLATE_LIPSYNC_EN, varsEn);
    } else {
      pPt = injectTemplate(TEMPLATE_VIDEO_TO_VIDEO, varsPt);
      pEn = injectTemplate(TEMPLATE_VIDEO_TO_VIDEO_EN, varsEn);
    }

    compiledBlocks.push({
      blockNumber: blockNum,
      promptPt: pPt,
      promptEn: pEn,
      charCountPt: pPt.length,
      charCountEn: pEn.length,
      isWithinCharLimit: pPt.length <= 1800 && pEn.length <= 1800,
      wordAnalysis,
      speech
    });
  }

  // Auditoria do painel
  const audit: AuditExplanation = {
    engineName: MASTER_TEMPLATES.find(m => m.id === state.masterMode)?.name || 'Molde Mestre',
    blockInfo: `${numBlocks} ${numBlocks === 1 ? 'Bloco' : 'Blocos'} (${numBlocks * 10}s @ 1.2x)`,
    cameraLens: `${lensFraming.name} | ${cameraAngle.name} | ${cameraMove.name}`,
    zDepthLayout: zDepth.name,
    lightingName: lighting.name,
    bodyProfileName: bodyProfile.name,
    reasons: [
      `Total de Blocos: ${numBlocks} (${numBlocks * 10}s) — Continuidade Frame-Lock nos blocos subsequentes`,
      `Segurança Visual: Sem sobreposição no rosto. Regra de dentes e mandíbula blindada.`,
      `Guided Autonomy: ${state.preferences?.length || 0} preferências do usuário avaliadas pelo Diretor.`
    ]
  };

  const primaryBlock = compiledBlocks[0];

  return {
    promptPt: primaryBlock ? primaryBlock.promptPt : '',
    promptEn: primaryBlock ? primaryBlock.promptEn : '',
    blocks: compiledBlocks,
    audit,
    wordAnalysis: primaryBlock ? primaryBlock.wordAnalysis : analyzeSpeechCadence(''),
    directorReasoning: state.directorReasoning,
    charCountPt: primaryBlock ? primaryBlock.charCountPt : 0,
    charCountEn: primaryBlock ? primaryBlock.charCountEn : 0,
    isWithinCharLimit: primaryBlock ? primaryBlock.isWithinCharLimit : true
  };
}

/**
 * Interpretador inteligente de Mudança Rápida (NLP Local Fast Engine).
 * Suporte completo aos 15 Grupos Técnicos.
 */
export function applyQuickNaturalChange(
  currentState: SceneDirectiveState,
  request: string
): { updatedState: SceneDirectiveState; changeLog: string } {
  const lower = request.toLowerCase();
  const next = { ...currentState };
  const changes: string[] = [];

  // Iluminação
  if (lower.includes('luz quente') || lower.includes('warm') || lower.includes('amber') || lower.includes('golden') || lower.includes('dourad')) {
    next.lightingId = 'warm_amber';
    changes.push('Iluminação: Warm Amber (Luz Quente Dourada)');
  } else if (lower.includes('luz fria') || lower.includes('silver') || lower.includes('daylight') || lower.includes('clinica')) {
    next.lightingId = 'clinical_silver';
    changes.push('Iluminação: Clinical Silver (Luz Fria Daylight 5600K)');
  } else if (lower.includes('biotec') || lower.includes('cyan') || lower.includes('ciano') || lower.includes('azul')) {
    next.lightingId = 'biotec_cyan';
    changes.push('Iluminação: Biotec Cyan');
  } else if (lower.includes('chiaroscuro') || lower.includes('sombra dramatica')) {
    next.lightingId = 'chiaroscuro';
    changes.push('Iluminação: Chiaroscuro Studio');
  } else if (lower.includes('neon') || lower.includes('bicolor') || lower.includes('magenta')) {
    next.lightingId = 'neon_bicolor';
    changes.push('Iluminação: Néon Bicolor (Magenta/Azul)');
  } else if (lower.includes('rim light') || lower.includes('recorte') || lower.includes('luz de contorno')) {
    next.lightingId = 'rim_light';
    changes.push('Iluminação: Rim Light de Recorte');
  } else if (lower.includes('dimming') || lower.includes('escurec') || lower.includes('dramat') || lower.includes('light spill')) {
    next.lightingId = 'dimming_narrativo';
    changes.push('Iluminação: Dimming Narrativo + Light Spill');
  } else if (lower.includes('estudio balanceado') || lower.includes('suave balanceada')) {
    next.lightingId = 'estudio_balanceado';
    changes.push('Iluminação: Studio Profissional Balanceado');
  }

  // Z-Depth / Caixas Espaciais
  if (lower.includes('sem caixa') || lower.includes('zero texto') || lower.includes('puro') || lower.includes('apresentador puro') || lower.includes('tirar caixa') || lower.includes('remover caixa')) {
    next.zDepthBoxId = 'sem_caixa';
    changes.push('Camada Z-Depth: Modo Zero-Texto (Apresentador Puro)');
  } else if (lower.includes('caixa ao lado') || lower.includes('lateral') || lower.includes('60/40') || lower.includes('split') || lower.includes('35°') || lower.includes('isom')) {
    next.zDepthBoxId = 'lateral_perspectiva';
    changes.push('Camada Z-Depth: Side Perspective Split (Inclinado 35°)');
  } else if (lower.includes('acima da cabeça') || lower.includes('topo') || lower.includes('headroom') || lower.includes('hud') || lower.includes('bento')) {
    next.zDepthBoxId = 'topo_headroom';
    changes.push('Camada Z-Depth: Top-Floating HUD (+25% Escala)');
  } else if (lower.includes('atrás') || lower.includes('z-1') || lower.includes('midground') || lower.includes('gigante')) {
    next.zDepthBoxId = 'atras_gigante';
    changes.push('Camada Z-Depth: Z-Depth Midground (Atrás do Apresentador Z-1)');
  }

  // Lentes e Distâncias da Câmera
  if (lower.includes('macro') || lower.includes('20 cm') || lower.includes('20cm')) {
    next.lensFramingId = 'macro_20cm';
    changes.push('Enquadramento: Distância Macro (20 cm)');
  } else if (lower.includes('curta') || lower.includes('1 metro') || lower.includes('1m')) {
    next.lensFramingId = 'curta_1m';
    changes.push('Enquadramento: Distância Curta (1 metro)');
  } else if (lower.includes('plano medio') || lower.includes('medio 85mm') || lower.includes('3 metros') || lower.includes('3m') || lower.includes('85mm')) {
    next.lensFramingId = 'medio_85mm';
    changes.push('Enquadramento: Distância Média (3 metros) / 85mm f/1.8');
  } else if (lower.includes('intermediaria') || lower.includes('5 metros') || lower.includes('5m')) {
    next.lensFramingId = 'inter_5m';
    changes.push('Enquadramento: Distância Intermediária (5 metros)');
  } else if (lower.includes('longa') || lower.includes('10 metros') || lower.includes('10m') || lower.includes('plano geral')) {
    next.lensFramingId = 'longa_10m';
    changes.push('Enquadramento: Distância Longa (10 metros)');
  } else if (lower.includes('close-up') || lower.includes('closeup') || lower.includes('rosto')) {
    next.lensFramingId = 'close_up';
    changes.push('Enquadramento: Close-Up Facial (85mm)');
  } else if (lower.includes('plano americano') || lower.includes('50mm')) {
    next.lensFramingId = 'plano_americano';
    changes.push('Enquadramento: Plano Americano (50mm)');
  } else if (lower.includes('ots') || lower.includes('costas') || lower.includes('ombro')) {
    next.lensFramingId = 'ots_esquerdo';
    changes.push('Enquadramento: Over-The-Shoulder (OTS Esquerdo)');
  }

  // Movimentos de Câmera
  if (lower.includes('push in') || lower.includes('push-in') || lower.includes('zoom in')) {
    next.cameraMovementId = 'push_in_3m';
    changes.push('Movimento: Slow Push-In (Zoom In)');
  } else if (lower.includes('pull out') || lower.includes('pull-out') || lower.includes('zoom out')) {
    next.cameraMovementId = 'pull_out';
    changes.push('Movimento: Slow Pull-Out (Zoom Out)');
  } else if (lower.includes('snap zoom') || lower.includes('snap') || lower.includes('recuo rapido')) {
    next.cameraMovementId = 'snap_zoom';
    changes.push('Movimento: Snap Zoom-Out (1,5s)');
  } else if (lower.includes('orbital') || lower.includes('arco') || lower.includes('tilt')) {
    next.cameraMovementId = 'orbital_tilt';
    changes.push('Movimento: 3D Orbital Arc + Tilt');
  } else if (lower.includes('pedestal') || lower.includes('subir') || lower.includes('elevacao')) {
    next.cameraMovementId = 'pedestal_float';
    changes.push('Movimento: Pedestal Float (Elevação Vertical)');
  } else if (lower.includes('pan') || lower.includes('isometric')) {
    next.cameraMovementId = 'parallax_pan';
    changes.push('Movimento: Isometric Parallax Pan');
  } else if (lower.includes('dolly') || lower.includes('slider') || lower.includes('deslocamento')) {
    next.cameraMovementId = 'dolly_lateral';
    changes.push('Movimento: Parallax Dolly Slider');
  } else if (lower.includes('estatico') || lower.includes('fixo') || lower.includes('travada') || lower.includes('locked')) {
    next.cameraMovementId = 'estatico';
    changes.push('Movimento: Locked-Off Anchor (Câmera Travada)');
  }

  // Ângulos de Câmera
  if (lower.includes('frontal') || lower.includes('nivel dos olhos')) {
    next.cameraAngleId = 'frontal';
    changes.push('Ângulo: Frontal (Nível dos Olhos)');
  } else if (lower.includes('perfil 45') || lower.includes('diagonal')) {
    next.cameraAngleId = 'perfil_45';
    changes.push('Ângulo: Perfil Dinâmico 45°');
  } else if (lower.includes('perfil 90') || lower.includes('lateral 90')) {
    next.cameraAngleId = 'perfil_90';
    changes.push('Ângulo: Perfil Lateral 90°');
  } else if (lower.includes('plongee') || lower.includes('de cima')) {
    next.cameraAngleId = 'plongee';
    changes.push('Ângulo: Plongée (Superior)');
  } else if (lower.includes('contra-plongee') || lower.includes('contra plongee') || lower.includes('imponencia') || lower.includes('de baixo')) {
    next.cameraAngleId = 'contra_plongee';
    changes.push('Ângulo: Contra-Plongée (Imponência)');
  }

  // Perfis Biomecânicos
  if (lower.includes('empatia') || lower.includes('perfil 2') || lower.includes('acolh')) {
    next.bodyProfileId = 2;
    changes.push('Perfil Biomecânico: Perfil 2 (Empatia)');
  } else if (lower.includes('segurança') || lower.includes('autoridade') || lower.includes('perfil 1')) {
    next.bodyProfileId = 1;
    changes.push('Perfil Biomecânico: Perfil 1 (Segurança)');
  } else if (lower.includes('simpatia') || lower.includes('perfil 3') || lower.includes('sem dentes')) {
    next.bodyProfileId = 3;
    changes.push('Perfil Biomecânico: Perfil 3 (Simpatia sem mostrar dentes)');
  } else if (lower.includes('hilário') || lower.includes('elegante') || lower.includes('perfil 4')) {
    next.bodyProfileId = 4;
    changes.push('Perfil Biomecânico: Perfil 4 (Hilário Elegante)');
  } else if (lower.includes('preocupado') || lower.includes('analítico') || lower.includes('perfil 5')) {
    next.bodyProfileId = 5;
    changes.push('Perfil Biomecânico: Perfil 5 (Preocupado Profissional)');
  } else if (lower.includes('reflexivo') || lower.includes('perfil 6')) {
    next.bodyProfileId = 6;
    changes.push('Perfil Biomecânico: Perfil 6 (Reflexivo)');
  }

  // Microfone e Acessórios
  if (lower.includes('sem microfone') || lower.includes('tirar microfone') || lower.includes('remover microfone') || lower.includes('clean frame') || lower.includes('clean')) {
    next.microphoneId = 'sem_microfone';
    changes.push('Microfone: Clean Frame (Sem Microfone Visível)');
  } else if (lower.includes('moeda')) {
    next.microphoneId = 'moeda_mao';
    changes.push('Microfone: Microfone Moeda (Mão)');
  } else if (lower.includes('deadcat')) {
    next.microphoneId = 'deadcat_mao';
    changes.push('Microfone: Lapela Deadcat (Mão)');
  } else if (lower.includes('lapela') || lower.includes('gola')) {
    next.microphoneId = 'lapela_discreto';
    changes.push('Microfone: Lapela na Gola');
  } else if (lower.includes('shure') || lower.includes('braço') || lower.includes('articulado')) {
    next.microphoneId = 'shure_congelado';
    changes.push('Microfone: Braço Articulado Baixo');
  }

  // Cenários e Iluminação Solar
  if (lower.includes('sol 06') || lower.includes('amanhecer') || lower.includes('sol da manha')) {
    next.scenarioId = 'campo_sol_06';
    changes.push('Cenário: Campo Aberto (Sol 06:00 Dourado)');
  } else if (lower.includes('sol 10')) {
    next.scenarioId = 'campo_sol_10';
    changes.push('Cenário: Campo Aberto (Sol 10:00 Limpo)');
  } else if (lower.includes('sol 12') || lower.includes('meio dia')) {
    next.scenarioId = 'campo_sol_12';
    changes.push('Cenário: Campo Aberto (Sol 12:00 Zenith)');
  } else if (lower.includes('sol 17') || lower.includes('por do sol') || lower.includes('entardecer')) {
    next.scenarioId = 'campo_sol_17';
    changes.push('Cenário: Campo Aberto (Sol 17:00 Sunset)');
  } else if (lower.includes('campo aberto') || lower.includes('natureza') || lower.includes('filtrado')) {
    next.scenarioId = 'campo_aberto';
    changes.push('Cenário: Campo Aberto Filtrado');
  } else if (lower.includes('praia') || lower.includes('mar') || lower.includes('litoral')) {
    next.scenarioId = 'calçadao_praia';
    changes.push('Cenário: Calçadão de Praia');
  } else if (lower.includes('elevador') || lower.includes('metalico')) {
    next.scenarioId = 'elevador_metalico';
    changes.push('Cenário: Elevador Metálico');
  } else if (lower.includes('carro') || lower.includes('hb20') || lower.includes('veiculo') || lower.includes('automotivo')) {
    next.scenarioId = 'carro_movimento';
    changes.push('Cenário: Interior Veicular (Hyundai HB20S)');
  } else if (lower.includes('rua') || lower.includes('cidade') || lower.includes('urbana')) {
    next.scenarioId = 'rua_urbana';
    changes.push('Cenário: Cidade / Rua Urbana Dinâmica');
  } else if (lower.includes('consultorio') || lower.includes('clinica')) {
    next.scenarioId = 'consultorio';
    changes.push('Cenário: Consultório Moderno & Acolhedor');
  } else if (lower.includes('estudio') || lower.includes('studio') || lower.includes('broadcast')) {
    next.scenarioId = 'estudio_broadcast';
    changes.push('Cenário: Studio Profissional');
  } else if (lower.includes('escritorio') || lower.includes('home office')) {
    next.scenarioId = 'escritorio_executivo';
    changes.push('Cenário: Home Office');
  }

  // Molde Mestre
  if (lower.includes('voiceover') || lower.includes('voz em off') || lower.includes('b-roll') || lower.includes('imagem para video')) {
    next.masterMode = 'voiceover';
    changes.push('Molde Mestre: Voiceover & B-Roll (Imagem - Vídeo)');
  } else if (lower.includes('lip-sync') || lower.includes('lipsync') || lower.includes('talking head') || lower.includes('texto para video')) {
    next.masterMode = 'lipsync';
    changes.push('Molde Mestre: Talking-Head Lip-Sync (Texto - Vídeo)');
  } else if (lower.includes('video para video') || lower.includes('v2v')) {
    next.masterMode = 'video_to_video';
    changes.push('Molde Mestre: Vídeo para Vídeo (Z-Depth & Cadência)');
  }

  const log = changes.length > 0 
    ? `Ajustes aplicados: ${changes.join(', ')}.`
    : 'Nenhum parâmetro identificado explicitamente. Foram preservados os padrões técnicos.';

  return { updatedState: next, changeLog: log };
}

/**
 * Motor Inteligente Local de Guided Autonomy (15 Grupos Técnicos).
 * Avalia roteiro, blocos e preferências do Right Panel gerando diretivas e justificativa completa do Diretor.
 */
export function evaluateGuidedAutonomyLocally(state: SceneDirectiveState): {
  updatedState: SceneDirectiveState;
  auditSummary: string;
  reasoning: string;
} {
  const next = { ...state };
  const prefs = state.preferences || [];
  const scriptText = (state.blockScripts || []).slice(0, state.blockCount || 1).join(' ').toLowerCase();

  const approvedTags: string[] = [];
  const adjustedTags: string[] = [];

  // Mapeamento e Auditoria dos 15 Grupos

  // 1. Molde Mestre
  if (prefs.includes('op_image_to_video') || prefs.includes('voz_trava_zero')) {
    next.masterMode = 'voiceover';
    approvedTags.push('Image-to-Video Voiceover (Lábios 100% selados, narração límpida)');
  } else if (prefs.includes('op_video_to_video')) {
    next.masterMode = 'video_to_video';
    approvedTags.push('Video-to-Video (Cadência travada com reestilização Z-Depth)');
  } else if (prefs.includes('op_text_to_video')) {
    next.masterMode = 'lipsync';
    approvedTags.push('Text-to-Video Lip-Sync (Apresentador frontal com autoridade)');
  }

  // 2. Distância e Enquadramento
  if (prefs.includes('dist_macro_20cm')) {
    next.lensFramingId = 'macro_20cm';
    approvedTags.push('Distância Macro (20 cm) para foco cirúrgico no elemento');
  } else if (prefs.includes('dist_curta_1m') || prefs.includes('fr_closeup')) {
    next.lensFramingId = 'curta_1m';
    approvedTags.push('Distância Curta (1 metro) / Close-Up para conexão e gravidade');
  } else if (prefs.includes('dist_inter_5m') || prefs.includes('fr_americano')) {
    next.lensFramingId = 'inter_5m';
    approvedTags.push('Distância Intermediária (5 metros) integrando bancada e espaço');
  } else if (prefs.includes('dist_longa_10m')) {
    next.lensFramingId = 'longa_10m';
    approvedTags.push('Distância Longa (10 metros) com visão panorâmica');
  } else if (prefs.includes('fr_ots_esq')) {
    next.lensFramingId = 'ots_esquerdo';
    approvedTags.push('Over-The-Shoulder (OTS Esquerdo com 10% blur)');
  } else if (prefs.includes('dist_media_3m') || prefs.includes('fr_medium_45') || prefs.includes('bokeh_f18')) {
    next.lensFramingId = 'medio_85mm';
    approvedTags.push('Plano Médio 85mm f/1.8 com 45% headroom e shallow bokeh');
  }

  // 3. Movimento de Câmera
  if (prefs.includes('mov_slow_pushin')) {
    next.cameraMovementId = 'push_in_3m';
    approvedTags.push('Slow Push-In contínuo intensificando retenção na fala');
  } else if (prefs.includes('mov_slow_pullout')) {
    next.cameraMovementId = 'pull_out';
    approvedTags.push('Slow Pull-Out gradual revelando elementos ao redor');
  } else if (prefs.includes('mov_snap_zoomout')) {
    next.cameraMovementId = 'snap_zoom';
    approvedTags.push('Snap Zoom-Out (1,5s) quebrando ritmo visual de forma moderna');
  } else if (prefs.includes('mov_orbital_tilt')) {
    next.cameraMovementId = 'orbital_tilt';
    approvedTags.push('3D Orbital Arc + Tilt destacando tridimensionalidade');
  } else if (prefs.includes('mov_pedestal')) {
    next.cameraMovementId = 'pedestal_float';
    approvedTags.push('Pedestal Float com elevação vertical');
  } else if (prefs.includes('mov_isometric_pan')) {
    next.cameraMovementId = 'parallax_pan';
    approvedTags.push('Isometric Parallax Pan com volume gráfico');
  } else if (prefs.includes('mov_dolly_slider')) {
    next.cameraMovementId = 'dolly_lateral';
    approvedTags.push('Parallax Dolly Slider revelando profundidade entre camadas');
  } else if (prefs.includes('mov_locked_anchor')) {
    next.cameraMovementId = 'estatico';
    approvedTags.push('Locked-Off Anchor com câmera estável');
  }

  // 4. Ângulo de Câmera
  if (prefs.includes('ang_plongee_contra')) {
    next.cameraAngleId = 'contra_plongee';
    approvedTags.push('Contra-Plongée conferindo imponência e liderança');
  } else if (prefs.includes('ang_perfil_45_90')) {
    next.cameraAngleId = 'perfil_45';
    approvedTags.push('Perfil Dinâmico 45° evidenciando volumetria');
  } else {
    next.cameraAngleId = 'frontal';
    approvedTags.push('Frontal Nível dos Olhos para máxima transparência');
  }

  // 5. Iluminação & Atmosfera
  if (prefs.includes('luz_warm_golden') || prefs.includes('sol_17h') || prefs.includes('sol_06h')) {
    next.lightingId = 'warm_amber';
    approvedTags.push('Warm Amber / Golden Hour transmitindo acolhimento e calor humano');
  } else if (prefs.includes('luz_daylight_fria') || prefs.includes('sol_12h')) {
    next.lightingId = 'clinical_silver';
    approvedTags.push('Daylight Clínica (5600K) de alta precisão técnica');
  } else if (prefs.includes('luz_ciano_biotec')) {
    next.lightingId = 'biotec_cyan';
    approvedTags.push('Luz Ciano Biotec para atmosfera científica avançada');
  } else if (prefs.includes('luz_chiaroscuro')) {
    next.lightingId = 'chiaroscuro';
    approvedTags.push('Chiaroscuro Studio com foco facial e laterais controladas');
  } else if (prefs.includes('luz_neon_bicolor')) {
    next.lightingId = 'neon_bicolor';
    approvedTags.push('Néon Bicolor vibrante com recortes em magenta/azul');
  } else if (prefs.includes('luz_rim_light')) {
    next.lightingId = 'rim_light';
    approvedTags.push('Rim Light de recorte separando ombros do fundo');
  } else if (prefs.includes('luz_dimming')) {
    next.lightingId = 'dimming_narrativo';
    approvedTags.push('Dimming Narrativo com reflexo diegético no corpo');
  }

  // 6. Cenário
  if (prefs.includes('sol_06h')) next.scenarioId = 'campo_sol_06';
  else if (prefs.includes('sol_10h')) next.scenarioId = 'campo_sol_10';
  else if (prefs.includes('sol_12h')) next.scenarioId = 'campo_sol_12';
  else if (prefs.includes('sol_17h')) next.scenarioId = 'campo_sol_17';
  else if (prefs.includes('sol_filtrado')) next.scenarioId = 'campo_aberto';
  else if (prefs.includes('cen_studio')) next.scenarioId = 'estudio_broadcast';
  else if (prefs.includes('cen_home_office')) next.scenarioId = 'escritorio_executivo';
  else if (prefs.includes('cen_praia')) next.scenarioId = 'calçadao_praia';
  else if (prefs.includes('cen_elevador')) next.scenarioId = 'elevador_metalico';
  else if (prefs.includes('cen_hb20s')) next.scenarioId = 'carro_movimento';

  // 7. Microfone
  if (prefs.includes('mic_clean_frame')) next.microphoneId = 'sem_microfone';
  else if (prefs.includes('mic_moeda_mao')) next.microphoneId = 'moeda_mao';
  else if (prefs.includes('mic_deadcat_mao')) next.microphoneId = 'deadcat_mao';
  else if (prefs.includes('mic_lapela_gola')) next.microphoneId = 'lapela_discreto';
  else if (prefs.includes('mic_braco_baixo')) next.microphoneId = 'shure_congelado';

  // 8. Arquitetura Espacial e Z-Depth
  if (prefs.includes('typ_zero_texto')) {
    next.zDepthBoxId = 'sem_caixa';
    approvedTags.push('Modo Zero-Texto (Apresentador Puro sem sobreposições gráficas)');
  } else if (prefs.includes('arq_top_hud') || prefs.includes('ani_mini_cards') || prefs.includes('arq_bento_sup')) {
    next.zDepthBoxId = 'topo_headroom';
    approvedTags.push('Top-Floating HUD (+25% Escala) posicionado acima da cabeça');
  } else if (prefs.includes('arq_midground_z1') || prefs.includes('typ_traseiro_z1')) {
    next.zDepthBoxId = 'atras_gigante';
    approvedTags.push('Z-Depth Midground (Z-1) posicionado atrás do apresentador');
  } else if (prefs.includes('arq_side_split') || prefs.includes('fr_split_60_40') || prefs.includes('ani_carrossel_916')) {
    next.zDepthBoxId = 'lateral_perspectiva';
    approvedTags.push('Side Perspective Split com painel inclinado a 35° à direita');
  }

  // 9. Biomecânica Corporal
  if (prefs.includes('bio_empatia')) next.bodyProfileId = 2;
  else if (prefs.includes('bio_simpatia')) next.bodyProfileId = 3;
  else if (prefs.includes('bio_hilario')) next.bodyProfileId = 4;
  else if (prefs.includes('bio_preocupado')) next.bodyProfileId = 5;
  else if (prefs.includes('bio_reflexivo')) next.bodyProfileId = 6;
  else if (prefs.includes('bio_seguranca')) next.bodyProfileId = 1;
  else {
    // Inferência pelo tom da fala
    if (scriptText.includes('risco') || scriptText.includes('cuidado') || scriptText.includes('perigo')) {
      next.bodyProfileId = 5; // Preocupado profissional
      next.emotionalToneId = 'Alerta';
    } else if (scriptText.includes('entende') || scriptText.includes('acolh') || scriptText.includes('paciente')) {
      next.bodyProfileId = 2; // Empatia
      next.emotionalToneId = 'Empatico';
    } else {
      next.bodyProfileId = 1; // Segurança
      next.emotionalToneId = 'Cientifico';
    }
  }

  // Resolver descrições do catálogo
  const bodyProfile = BODY_PROFILES.find(b => b.id === next.bodyProfileId) || BODY_PROFILES[0];
  const scenario = SCENARIO_CATALOG.find(s => s.id === next.scenarioId) || SCENARIO_CATALOG[0];
  const lens = LENS_FRAMINGS.find(l => l.id === next.lensFramingId) || LENS_FRAMINGS[0];
  const light = LIGHTING_OPTIONS.find(l => l.id === next.lightingId) || LIGHTING_OPTIONS[0];
  const zdepth = ZDEPTH_BOXES[next.zDepthBoxId] || ZDEPTH_BOXES.sem_caixa;
  const numBlocks = next.blockCount || 1;

  // Elaboração do Raciocínio de Direção de Arte Completo
  const reasoning = `DIREÇÃO DE ARTE & RACIOCÍNIO CINEMATOGRÁFICO (CÉREBRO AUTÔNOMO V4.0):

1. CONCEPÇÃO DA CRONOLOGIA E RITMO (${numBlocks} BLOCO(S) DE 10s):
- O projeto foi estruturado em ${numBlocks} bloco(s) sequencial(is) somando ${numBlocks * 10} segundos a uma cadência controlada de 1.2x.
- A narrativa foi calibrada para manter uma progressão visual contínua, utilizando Frame-Lock absoluto entre blocos para eliminar jump-cuts e garantir retenção visual mobile.

2. ESCOLHA DE MOTOR, ÓPTICA E ENQUADRAMENTO:
- Molde Mestre Selecionado: ${MASTER_TEMPLATES.find(m => m.id === next.masterMode)?.name}.
- Óptica e Distância: ${lens.name}. Proporciona separação tridimensional limpa do fundo, mantendo a atenção focada nas microexpressões e na mandíbula do apresentador.
- Movimento e Ângulo: ${CAMERA_MOVEMENTS.find(c => c.id === next.cameraMovementId)?.name} com ângulo ${CAMERA_ANGLES.find(a => a.id === next.cameraAngleId)?.name}. Cria dinamismo sem desestabilizar os elementos de informação visual.

3. ARQUITETURA ESPACIAL Z-DEPTH & TIPOGRAFIA (17PX):
- Camada Selecionada: ${zdepth.name}.
- Blindagem Estética: A geometria espacial garante 100% de headroom livre e proíbe qualquer sobreposição gráfica sobre o rosto ou olhos. Textos calibrados no padrão técnico de 17px para legibilidade vertical (9:16).

4. ANÁLISE DAS TAGS DE PREFERÊNCIA DO USUÁRIO (GUIDED AUTONOMY):
${approvedTags.length > 0 
  ? `• TAGS APROVADAS E INTEGRADAS:\n  - ${approvedTags.join('\n  - ')}` 
  : '• Nenhuma tag específica foi forçada pelo usuário. O Diretor exerceu autonomia criativa plena baseando-se no sentimento da fala.'}
${adjustedTags.length > 0 ? `\n• TAGS ADAPTADAS/DESCARTADAS:\n  - ${adjustedTags.join('\n  - ')}` : ''}

5. BIOMECÂNICA CORPORAL E ACÚSTICA:
- Postura Biomecânica: ${bodyProfile.name}. ${bodyProfile.ptDesc}.
- Blindagem Bucal: Mandíbula estritamente contida, dentes superiores encobertos pelo lábio e inferiores ocultos.
- Acústica: Áudio Dry Broadcast tratado sem eco, com Foley suave de interface e Audio Ducking automático de -20dB sob a voz principal.`;

  const auditSummary = `Direção calibrada para ${numBlocks} bloco(s) (${numBlocks * 10}s) em ${lens.name}, iluminação ${light.name} e ${zdepth.name}.`;

  next.directorReasoning = reasoning;

  return {
    updatedState: next,
    auditSummary,
    reasoning
  };
}

