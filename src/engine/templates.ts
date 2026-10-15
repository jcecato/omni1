/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Moldes Invioláveis e Injeção de Variáveis
 * Super-Skill Omni Video Director Pro
 */

// 1. TEMPLATE VOICEOVER (PT-BR)
export const TEMPLATE_VOICEOVER = `[GERAÇÃO VISUAL E DE CENAS - IMAGEM PARA VÍDEO]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Referência de Identidade Visual: [ REFERENCIA PERSONAGEM ]
Referência de Elementos/Cards (Opcional): [ REFERENCIA ELEMENTO 1 ]

INSTRUÇÃO CRÍTICA DE IDENTIDADE E BOCA SELADA:
Utilize EXCLUSIVAMENTE a aparência, rosto, estrutura óssea, corpo e roupas de [ REFERENCIA PERSONAGEM ] para compor o personagem principal.
PROIBIÇÃO TOTAL: NÃO use e NÃO misture o rosto ou corpo do avatar de [ REFERENCIA VOZ ].
Desde o milissegundo 00:00 até 10:00, o personagem DEVE manter os lábios 100% selados e mandíbula imóvel (respiração nasal). Nenhum personagem na tela deve falar ou mover os lábios.

Gere um vídeo cinematográfico em 2K (10s), formato {{FORMATO}}, plano-sequência contínuo, dividido em {{NUM_CENAS}} atos dinâmicos.
{{REGRA_TIPOGRAFIA_DINAMICA}}

Cena 1 (0-5s): {{DESCRICAO_CURTA_CENA_1}}
Cena 2 (5-10s): {{DESCRICAO_CURTA_CENA_2}}

[GERAÇÃO DE ÁUDIO E NARRAÇÃO (VOICEOVER)]
Ritmo ágil e claro (cadência 1.2x). Gere APENAS narração em voiceover e design de som imersivo. SEM diálogos na tela.
Idioma: Português do Brasil (pt-BR) exclusivamente.
Voz: [ REFERENCIA VOZ ]
Tom da Narração: {{TOM_NARRACAO}}.

Regra de Pronúncia e Sotaque (CRÍTICO):
- Adotar pronúncia NEUTRA e padrão culto do Português do Brasil (locução nacional).
- PROIBIDO usar "R" retroflexo (caipira/interiorano) ou "R" aspirado.
- PROIBIDO aspirar as consoantes "P" e "T" (evitar sopro em "prato", "pneu", "tia", "quadro").
- Articular cada palavra perfeitamente, sem pular, fundir, substituir ou truncar sílabas.
- Terminar a última palavra da narração com queda natural de tom (pitch drop).

Roteiro da Narração (Máx. 16-20 palavras):
"{{TEXTO_DA_FALA}}"

Design de Som:
Cena 1 (0-5s): {{SOM_CENA_1}}
Cena 2 (5-10s): {{SOM_CENA_2}}

[PROMPT NEGATIVO / RESTRIÇÕES RÍGIDAS]
NÃO usar rosto ou corpo de [ REFERENCIA VOZ ], NÃO mesclar identidades.
SEM sincronia labial, SEM cabeças falantes, SEM abrir a boca no início, SEM rostos distorcidos, SEM pele de plástico, SEM movimentos não naturais. {{NEGATIVO_TEXTO_DINAMICO}}`;

// 2. TEMPLATE LIPSYNC (PT-BR)
export const TEMPLATE_LIPSYNC = `[GERAÇÃO VISUAL E DE CENA - TALKING-HEAD LIP-SYNC 2K]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Crie um vídeo qualidade 2K (10s) com ótima definição, usando a cena de referência [ REFERENCIA CENA ], a identidade facial de [ REFERENCIA PERSONAGEM ] e a voz de [ REFERENCIA VOZ ].

IDENTIDADE E CENA (BLOQUEIO TOTAL):
Mantenha fielmente o cenário, iluminação, objetos, elementos e microfone ({{TIPO_MICROFONE}}) exatamente iguais a [ REFERENCIA CENA ].
Rosto 100% idêntico a [ REFERENCIA PERSONAGEM ]: mesma estrutura óssea, textura de pele natural, cabelo e óculos. PROIBIDO usar traços visuais de [ REFERENCIA VOZ ].

BOCA E DENTES (BIOMECÂNICA NATURAL):
Sincronia labial perfeita com o áudio. A boca abre discretamente para fala humana natural.
Dentes superiores mais ocultos atrás do lábio; dentes inferiores quase invisíveis.
Sorrir apenas com os olhos. Maxilar estável, sem deformações laterais.

EXPRESSÃO FACIAL, PELE E CÂMERA:
Pele biológica realista, não plástica ou emborrachada.
Microexpressões na testa e olhos sincronizadas com a fala, transmitindo segurança imediata.
Câmera e Iluminação: {{CAMERA_E_LUZ_CENA}}.
Motion Espacial: {{ELEMENTO_MOTION_ZDEPTH}}.

MOVIMENTO CORPORAL:
{{PERFIL_CORPORAL_SELECIONADO}}
Piscar natural e respiração suave sincronizada com o diálogo.

VOZ E FALA (PT-BR 1.2x):
Idioma Português do Brasil (pt-BR), ritmo ágil e claro (1.2x).
Pronúncia culta neutra, sem "R" caipira e sem aspiração em "P" e "T". Todas as sílabas articuladas com queda de tom final.

TOM DE VOZ SINCRONIZADO:
[ {{TOM_NARRACAO}} ]

FALA COMPLETA (Queda natural de tom na última palavra):
"{{TEXTO_DA_FALA}}"

[SAÍDA FINAL]
{{SAIDA_FINAL_DINAMICA}} Complete todo o roteiro sem cortar ou inventar palavras.`;

// 3. TEMPLATE VIDEO-TO-VIDEO (PT-BR)
export const TEMPLATE_VIDEO_TO_VIDEO = `[GERAÇÃO VISUAL - VÍDEO PARA VÍDEO & CAMADAS ESPACIAIS 2K]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Utilize como base estrutural o vídeo [ REFERENCIA VIDEO BASE ], identidade facial de [ REFERENCIA PERSONAGEM ], voz de [ REFERENCIA VOZ ] e ativos de [ REFERENCIA ELEMENTO 1 ].

PRESERVAÇÃO ESTRUTURAL E IDENTIDADE:
Preserve a cadência física e enquadramento de [ REFERENCIA VIDEO BASE ]. Rosto 100% idêntico a [ REFERENCIA PERSONAGEM ] (pele orgânica real, cabelo, óculos). PROIBIDO usar traços de [ REFERENCIA VOZ ].

MODO DE BOCA E ATUAÇÃO:
{{MODO_BOCA_V2V}}
{{PERFIL_CORPORAL_SELECIONADO}}

TRANSFORMAÇÃO VISUAL, CÂMERA E CAMADAS (0-10s):
- Ambiente e Luz: {{AMBIENTE_E_LUZ_V2V}}.
- Câmera e Transição: {{CAMERA_E_TRANSICAO_V2V}}.
- Motion Design (Z-Depth): {{CONSTRUCAO_CAIXA_MOTION_V2V}}.

VOZ, PRONÚNCIA E ÁUDIO (PT-BR):
Português do Brasil (pt-BR) a 1.2x, usando [ REFERENCIA VOZ ] em tom {{TOM_NARRACAO}}. Pronúncia culta neutra, sem "R" caipira, sem aspirações em P/T, com queda de tom na última palavra.

Roteiro da Fala (Máx. 16-20 palavras):
"{{TEXTO_DA_FALA}}"

Design de Som:
{{SOM_CENA_1}}

[RESTRIÇÕES RÍGIDAS]
Zero flickering temporal, sem deformação de mãos ou maxilar, sem pele emborrachada, sem mesclar rosto de [ REFERENCIA VOZ ]. {{NEGATIVO_TEXTO_DINAMICO}}`;

// ====================================================================
// TEMPLATES EM INGLÊS TÉCNICO (FALA E REGRAS FONÉTICAS EM PT-BR)
// ====================================================================

export const TEMPLATE_VOICEOVER_EN = `[VISUAL GENERATION & SCENE COMPOSITION - IMAGE-TO-VIDEO 2K]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Visual Identity Reference: [ REFERENCIA PERSONAGEM ]
Graphic/Card Element Reference (Optional): [ REFERENCIA ELEMENTO 1 ]

CRITICAL IDENTITY & SEALED-LIPS INSTRUCTION:
Exclusively utilize the appearance, facial morphology, skin texture and wardrobe of [ REFERENCIA PERSONAGEM ] for the main subject.
STRICT PROHIBITION: DO NOT use or blend features from audio avatar [ REFERENCIA VOZ ].
From 00:00 to 10:00, the subject MUST maintain 100% sealed lips and motionless jaw (nasal breathing). No on-screen character speaks or moves lips.

Generate a 2K cinematic video (10s), {{FORMATO}} aspect ratio, continuous single-take sequence divided into {{NUM_CENAS}} dynamic acts.
{{REGRA_TIPOGRAFIA_DINAMICA}}

Scene 1 (0-5s): {{DESCRICAO_CURTA_CENA_1}}
Scene 2 (5-10s): {{DESCRICAO_CURTA_CENA_2}}

[AUDIO & VOICEOVER GENERATION]
Brisk and articulate pacing (1.2x tempo). Generate exclusively voiceover narration and immersive sound design. NO on-screen dialogues.
Language: Strictly Brazilian Portuguese (pt-BR).
Voice: [ REFERENCIA VOZ ]
Narration Tone: {{TOM_NARRACAO}}.

Pronunciation & Accent Rules (CRITICAL PT-BR):
- Adopt NEUTRAL cultured Brazilian Portuguese broadcast pronunciation.
- STRICTLY PROHIBITED retroflex or aspirated "R".
- STRICTLY PROHIBITED aspirated "P" and "T" bursts.
- Articulate every syllable completely with natural pitch drop on the final word.

Narration Script (Max 16-20 words):
"{{TEXTO_DA_FALA}}"

Sound Design:
Scene 1 (0-5s): {{SOM_CENA_1}}
Scene 2 (5-10s): {{SOM_CENA_2}}

[NEGATIVE PROMPT / STRICT CONSTRAINTS]
DO NOT use face or body of [ REFERENCIA VOZ ], no identity blending.
NO lip-sync, NO talking heads, NO mouth opening at onset, NO distorted face, NO plastic skin, NO unnatural motions. {{NEGATIVO_TEXTO_DINAMICO}}`;

export const TEMPLATE_LIPSYNC_EN = `[VISUAL GENERATION - TALKING-HEAD LIP-SYNC 2K]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Create a 2K high-definition video (10s) using reference scene [ REFERENCIA CENA ], facial identity [ REFERENCIA PERSONAGEM ] and voice [ REFERENCIA VOZ ].

IDENTITY & SCENE LOCK (ABSOLUTE):
Faithfully preserve environment, lighting, objects, elements and microphone ({{TIPO_MICROFONE}}) exactly matching [ REFERENCIA CENA ].
Face 100% identical to [ REFERENCIA PERSONAGEM ]: bone structure, organic living skin, hair and eyewear. STRICTLY PROHIBITED using visual traits of [ REFERENCIA VOZ ].

MOUTH & TEETH (NATURAL BIOMECHANICS):
Precise organic lip-sync with speech. Mouth opens discreetly, strictly enough for natural speech.
Upper teeth mostly hidden behind lip; lower teeth virtually invisible.
Smile restricted to eyes (Duchenne). Stable jaw, zero sideways distortion.

FACIAL EXPRESSION, SKIN & CAMERA:
Realistic biological skin matching [ REFERENCIA PERSONAGEM ], non-plastic, non-rubbery.
Authentic micro-expressions on forehead and around eyes synchronized with speech, projecting authority.
Camera & Lighting: {{CAMERA_E_LUZ_CENA}}.
Spatial Motion: {{ELEMENTO_MOTION_ZDEPTH}}.

SYNCHRONIZED BODY MOVEMENT:
{{PERFIL_CORPORAL_SELECIONADO}}
Natural sporadic blinking and gentle chest breathing rhythm synchronized with dialogue.

VOICE & DIALOGUE (PT-BR 1.2x):
Language: Brazilian Portuguese (pt-BR), brisk articulate tempo (1.2x).
Neutral cultured Brazilian broadcast delivery, zero retroflex "R", zero aspirated "P"/"T" puffs, complete syllable articulation with natural pitch drop on the final word.

SYNCHRONIZED VOCAL TONE:
[ {{TOM_NARRACAO}} ]

COMPLETE SPOKEN DIALOGUE (Natural pitch drop on the last word):
"{{TEXTO_DA_FALA}}"

[FINAL OUTPUT]
{{SAIDA_FINAL_DINAMICA}} Deliver the entire script without dropping or inventing words.`;

export const TEMPLATE_VIDEO_TO_VIDEO_EN = `[VISUAL GENERATION - VIDEO-TO-VIDEO & SPATIAL Z-DEPTH 2K]
{{BLOCO_CONTINUIDADE_AUTOMATICA}}
Use [ REFERENCIA VIDEO BASE ] as structural anchor, retaining facial identity of [ REFERENCIA PERSONAGEM ], voice [ REFERENCIA VOZ ] and visual assets from [ REFERENCIA ELEMENTO 1 ].

STRUCTURAL & IDENTITY PRESERVATION:
Preserve physical cadence and base framing of [ REFERENCIA VIDEO BASE ], ensuring face 100% identical to [ REFERENCIA PERSONAGEM ] (organic skin, hair, glasses). STRICTLY PROHIBITED visual traits of [ REFERENCIA VOZ ].

MOUTH MODE & ACTING:
{{MODO_BOCA_V2V}}
{{PERFIL_CORPORAL_SELECIONADO}}

VISUAL TRANSFORMATION, CAMERA & LAYERS (0-10s):
- Environment & Lighting: {{AMBIENTE_E_LUZ_V2V}}.
- Camera & Transition: {{CAMERA_E_TRANSICAO_V2V}}.
- Motion Design Layer (Z-Depth): {{CONSTRUCAO_CAIXA_MOTION_V2V}}.

VOICE & PRONUNCIATION (PT-BR):
Spoken audio strictly in Brazilian Portuguese (pt-BR), articulate 1.2x pacing, using [ REFERENCIA VOZ ] in tone {{TOM_NARRACAO}}.
Neutral national accent, no retroflex R, no aspirated P/T, syllable articulation and final pitch drop.

Dialogue Script (Max 16-20 words):
"{{TEXTO_DA_FALA}}"

Sound Design:
{{SOM_CENA_1}}

[STRICT CONSTRAINTS]
Zero temporal flickering, zero hand or jaw distortion, zero rubbery skin, zero face blending from [ REFERENCIA VOZ ]. {{NEGATIVO_TEXTO_DINAMICO}}`;

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
