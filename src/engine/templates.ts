/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Moldes Invioláveis e Injeção de Variáveis
 * Super-Skill Omni Video Director Pro
 * Otimizado para Densidade Cinematográfica (<1.800 caracteres por cena)
 */

// 1. TEMPLATE VOICEOVER (PT-BR)
export const TEMPLATE_VOICEOVER = `[GERAÇÃO VISUAL - IMAGEM PARA VÍDEO 2K 9:16]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Referências: Identidade [ REFERENCIA PERSONAGEM ], Elementos [ REFERENCIA ELEMENTO 1 ], Áudio [ REFERENCIA VOZ ].

BLOQUEIO DE IDENTIDADE E BOCA SELADA:
Aparência e corpo 100% fiéis a [ REFERENCIA PERSONAGEM ]. PROIBIDO mesclar com [ REFERENCIA VOZ ].
De 00:00 a 10:00, lábios 100% selados e mandíbula imóvel (respiração nasal). Zero fala ou movimento labial.

COMPOSIÇÃO E ATOS:
Vídeo 2K em {{FORMATO}}, plano-sequência dividido em {{NUM_CENAS}}:
- Ato 1 (0-5s): {{DESCRICAO_CURTA_CENA_1}}
- Ato 2 (5-10s): {{DESCRICAO_CURTA_CENA_2}}
{{REGRA_TIPOGRAFIA_DINAMICA}}

NARRAÇÃO EM VOICEOVER (PT-BR 1.2x):
Locução rápida a 1.2x com voz [ REFERENCIA VOZ ]. Tom: [ {{TOM_NARRACAO}} ].
Pronúncia culta neutra: sem "R" caipira, sem sopros em P/T, articulação nítida e queda final de tom.
Roteiro da Narração:
"{{TEXTO_DA_FALA}}"

DESIGN DE SOM & RESTRIÇÕES:
Sons: {{SOM_CENA_1}}; {{SOM_CENA_2}}.
Sem sincronia labial, sem abrir a boca, sem pele plástica. {{NEGATIVO_TEXTO_DINAMICO}}`.trim();

// 2. TEMPLATE LIPSYNC (PT-BR)
export const TEMPLATE_LIPSYNC = `[GERAÇÃO VISUAL - TALKING-HEAD LIP-SYNC 2K 9:16]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Âncoras: Cenário [ REFERENCIA CENA ], Rosto [ REFERENCIA PERSONAGEM ], Voz [ REFERENCIA VOZ ].

BLOQUEIO DE IDENTIDADE E CENA:
Cenário, luz e microfone ({{TIPO_MICROFONE}}) idênticos a [ REFERENCIA CENA ]. Rosto 100% fiel a [ REFERENCIA PERSONAGEM ] (pele viva, estrutura facial). Proibido usar traços de [ REFERENCIA VOZ ].

BIOMECÂNICA LABIAL E DENTES:
Sincronia labial sutil. Dentes superiores encobertos pelo lábio; dentes inferiores invisíveis. Sorriso restrito aos olhos (Duchenne). Mandíbula estável, sem desvio lateral.

CÂMERA, ILUMINAÇÃO E POSTURA:
Pele biológica realista, microexpressões assertivas.
Câmera e Luz: {{CAMERA_E_LUZ_CENA}}.
Motion Z-Depth: {{ELEMENTO_MOTION_ZDEPTH}}.
Postura: {{PERFIL_CORPORAL_SELECIONADO}}. Piscar espontâneo, respiração suave.

VOZ E FALA (PT-BR 1.2x):
Português do Brasil (pt-BR) a 1.2x. Locução culta neutra: sem "R" caipira, sem sopro em P/T, queda de tom no final. Tom: [ {{TOM_NARRACAO}} ].
Fala Completa: "{{TEXTO_DA_FALA}}"

[REGRA DE SAÍDA]
{{SAIDA_FINAL_DINAMICA}} Roteiro integral sem cortes ou acréscimos.`.trim();

// 3. TEMPLATE VIDEO-TO-VIDEO (PT-BR)
export const TEMPLATE_VIDEO_TO_VIDEO = `[GERAÇÃO VISUAL - VÍDEO PARA VÍDEO 2K 9:16]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Âncoras: Vídeo [ REFERENCIA VIDEO BASE ], Rosto [ REFERENCIA PERSONAGEM ], Voz [ REFERENCIA VOZ ], Elementos [ REFERENCIA ELEMENTO 1 ].

PRESERVAÇÃO E IDENTIDADE:
Preserve cadência e enquadramento de [ REFERENCIA VIDEO BASE ]. Rosto 100% fiel a [ REFERENCIA PERSONAGEM ]. Proibido traços de [ REFERENCIA VOZ ].

CAMADAS ESPACIAIS:
- Boca: {{MODO_BOCA_V2V}}
- Postura: {{PERFIL_CORPORAL_SELECIONADO}}
- Cena & Luz: {{AMBIENTE_E_LUZ_V2V}}
- Câmera: {{CAMERA_E_TRANSICAO_V2V}}
- Motion Z-Depth: {{CONSTRUCAO_CAIXA_MOTION_V2V}}

VOZ (PT-BR 1.2x):
Áudio pt-BR a 1.2x com [ REFERENCIA VOZ ]. Tom: [ {{TOM_NARRACAO}} ]. Locução culta, sem "R" caipira, sem sopro em P/T, pitch drop final.
Fala: "{{TEXTO_DA_FALA}}"

DESIGN DE SOM & RESTRIÇÕES:
Sons: {{SOM_CENA_1}}. Zero flickering, sem deformação de mãos/mandíbula, sem pele plástica. {{NEGATIVO_TEXTO_DINAMICO}}`.trim();

// ====================================================================
// TEMPLATES EM INGLÊS TÉCNICO (FALA E REGRAS FONÉTICAS EM PT-BR)
// ====================================================================

export const TEMPLATE_VOICEOVER_EN = `[VISUAL GENERATION - IMAGE-TO-VIDEO 2K 9:16]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
References: Identity [ REFERENCIA PERSONAGEM ], Assets [ REFERENCIA ELEMENTO 1 ], Voice [ REFERENCIA VOZ ].

IDENTITY LOCK & SEALED LIPS:
Identity and body 100% identical to [ REFERENCIA PERSONAGEM ]. NEVER blend traits from [ REFERENCIA VOZ ].
From 00:00 to 10:00, lips remain 100% sealed, motionless jaw (nasal breathing). Zero on-screen character lip movement.

COMPOSITION & ACTS:
2K video, {{FORMATO}} portrait, single-take sequence in {{NUM_CENAS}}:
- Act 1 (0-5s): {{DESCRICAO_CURTA_CENA_1}}
- Act 2 (5-10s): {{DESCRICAO_CURTA_CENA_2}}
{{REGRA_TIPOGRAFIA_DINAMICA}}

VOICEOVER NARRATION (PT-BR 1.2x):
Brisk 1.2x narration using voice [ REFERENCIA VOZ ]. Tone: [ {{TOM_NARRACAO}} ].
Neutral cultured Brazilian broadcast delivery: no retroflex R, no aspirated P/T, natural pitch drop on final word.
Narration Script:
"{{TEXTO_DA_FALA}}"

SOUND DESIGN & STRICT CONSTRAINTS:
Foley: {{SOM_CENA_1}}; {{SOM_CENA_2}}.
NO lip-sync, NO talking heads, sealed lips, no plastic skin. {{NEGATIVO_TEXTO_DINAMICO}}`.trim();

export const TEMPLATE_LIPSYNC_EN = `[VISUAL GENERATION - TALKING-HEAD LIP-SYNC 2K 9:16]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Anchors: Scene [ REFERENCIA CENA ], Face [ REFERENCIA PERSONAGEM ], Voice [ REFERENCIA VOZ ].

IDENTITY & SCENE LOCK:
Preserve environment, lighting, mic ({{TIPO_MICROFONE}}) exactly from [ REFERENCIA CENA ]. Face 100% identical to [ REFERENCIA PERSONAGEM ] (bone structure, organic skin). Never blend traits from [ REFERENCIA VOZ ].

NATURAL BIOMECHANICS & MOUTH:
Discreet lip-sync. Upper teeth hidden behind lip; lower teeth invisible. Duchenne smile (eyes only). Motionless jaw, zero lateral shift.

CAMERA, LIGHT & MOTION:
Realistic biological skin, authoritative micro-expressions.
Camera & Light: {{CAMERA_E_LUZ_CENA}}.
Spatial Motion: {{ELEMENTO_MOTION_ZDEPTH}}.
Posture: {{PERFIL_CORPORAL_SELECIONADO}}. Natural blinking and breathing.

VOICE & DIALOGUE (PT-BR 1.2x):
Brazilian Portuguese (pt-BR) at 1.2x. Cultured delivery: no retroflex R, no aspirated P/T, pitch drop on final word. Tone: [ {{TOM_NARRACAO}} ].
Spoken Dialogue: "{{TEXTO_DA_FALA}}"

[OUTPUT RULE]
{{SAIDA_FINAL_DINAMICA}} Full script delivery without dropped or invented words.`.trim();

export const TEMPLATE_VIDEO_TO_VIDEO_EN = `[VISUAL GENERATION - VIDEO-TO-VIDEO 2K 9:16]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Anchors: Video [ REFERENCIA VIDEO BASE ], Face [ REFERENCIA PERSONAGEM ], Voice [ REFERENCIA VOZ ], Assets [ REFERENCIA ELEMENTO 1 ].

STRUCTURAL & IDENTITY LOCK:
Preserve cadence and framing of [ REFERENCIA VIDEO BASE ]. Face 100% matching [ REFERENCIA PERSONAGEM ]. Never blend traits from [ REFERENCIA VOZ ].

SPATIAL LAYERS:
- Mouth: {{MODO_BOCA_V2V}}
- Posture: {{PERFIL_CORPORAL_SELECIONADO}}
- Scene & Light: {{AMBIENTE_E_LUZ_V2V}}
- Camera: {{CAMERA_E_TRANSICAO_V2V}}
- Motion Z-Depth: {{CONSTRUCAO_CAIXA_MOTION_V2V}}

VOICE & DIALOGUE (PT-BR 1.2x):
PT-BR at 1.2x with [ REFERENCIA VOZ ]. Tone: [ {{TOM_NARRACAO}} ]. Cultured delivery, no retroflex R, no aspirated P/T, final pitch drop.
Script: "{{TEXTO_DA_FALA}}"

SOUND & CONSTRAINTS:
Foley: {{SOM_CENA_1}}. Zero flickering, no hand/jaw distortion, no rubbery skin. {{NEGATIVO_TEXTO_DINAMICO}}`.trim();

/**
 * Injeta variáveis em um template sem alterar o texto fixo das regras.
 */
export function injectTemplate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(placeholder, value || '');
  }
  // Limpar quebras de linha duplas desnecessárias geradas por blocos vazios
  result = result.replace(/\n{3,}/g, '\n\n').trim();
  return result;
}
