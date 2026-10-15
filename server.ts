/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Shared Gemini AI Client instance with telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// 1. API: Guided Autonomy AI Video Director (Gemini 3.8 Flash)
app.post('/api/director/guided-autonomy', async (req, res) => {
  try {
    const { 
      scriptBlock1, 
      scriptBlock2, 
      visualIdea, 
      masterMode, 
      preferences = [] 
    } = req.body;

    const speechText = [scriptBlock1, scriptBlock2].filter(Boolean).join(' ');

    const systemInstruction = `Você atua como um sistema inteligente de direção audiovisual de cinema (CÉREBRO AUTÔNOMO V4.0 - GUIDED AUTONOMY).
Sua função é interpretar a intenção do usuário, a fala e as preferências selecionadas, compor cenas dinâmicas, cinematográficas e altamente variáveis, e retornar essas decisões estritamente estruturadas em JSON.

REGRAS RÍGIDAS DE DIREÇÃO:
1. DIRETOR DE ARTE & ANÁLISE (direcao_de_arte_analise):
   - Escreva um texto longo e aprofundado em tom de Diretor de Cinema experiente.
   - Justifique o PORQUÊ escolheu as ferramentas, lentes, iluminação, postura e posições de tela.
   - Avalie as preferências enviadas pelo usuário em "preferences". Se o usuário selecionou tags que não fazem sentido com a dramaticidade ou seriedade da fala (ex: luz néon para diagnóstico grave, ou órbita 360 para assunto íntimo), explique com autoridade por que você as descartou ou adaptou.
   - Justifique a iluminação, a câmera e a posição da caixa Z-Depth baseada no sentimento e peso do roteiro.
2. AUDITORIA: 3 linhas resumidas em PT-BR explicando o motor, cenário, luz e cadência da fala.
3. MOTOR ESCOLHIDO: "VOICEOVER" | "LIPSYNC" | "V2V".
4. DESCRICOES VISUAIS EM INGLÊS TÉCNICO CINEMATOGRÁFICO:
   - "descricao_curta_cena_1": max 45 palavras em inglês técnico cinematográfico (0-5s).
   - "descricao_curta_cena_2": max 45 palavras em inglês técnico (5-10s ou continuação). Se não houver bloco 2, componha o segundo ato dos 10s.
5. FALA E REGRAS: Preservar estritamente o Português do Brasil neutro e cadência de 1.2x.`;

    const prompt = `Analise e dirija o seguinte projeto de vídeo:
- Molde Mestre Sugerido: ${masterMode || 'LIPSYNC'}
- Roteiro Bloco 1 (0-10s): "${scriptBlock1 || ''}"
- Roteiro Bloco 2 (Continuação 10-20s): "${scriptBlock2 || 'Nenhum'}"
- Ideia Visual da Cena: "${visualIdea || 'Direção cinematográfica profissional com autoridade e naturalidade.'}"
- Preferências / Tags Selecionadas pelo Usuário (Guided Autonomy): ${preferences.length > 0 ? preferences.join(', ') : 'Nenhuma tag forçada (Autonomia Plena do Diretor)'}

Gere o JSON estrito conforme o schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.35,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            auditoria_ptbr: {
              type: Type.STRING,
              description: 'Resumo rápido de 3 linhas das escolhas criativas em PT-BR.'
            },
            direcao_de_arte_analise: {
              type: Type.STRING,
              description: 'Texto longo e detalhado. Explique como um Diretor de Cinema o PORQUÊ você escolheu as ferramentas X e Y. Se o usuário sugeriu preferências no payload que não faziam sentido para a cena, explique o porquê você as ignorou ou adaptou. Justifique a iluminação, a câmera e a posição da caixa baseada no sentimento do roteiro.'
            },
            motor_escolhido: {
              type: Type.STRING,
              enum: ['VOICEOVER', 'LIPSYNC', 'V2V']
            },
            descricao_curta_cena_1: {
              type: Type.STRING,
              description: 'English technical description of camera, lighting, and action for 0-5s (max 45 words).'
            },
            descricao_curta_cena_2: {
              type: Type.STRING,
              description: 'English technical description of camera, lighting, and action for 5-10s (max 45 words - empty if no block 2).'
            },
            tom_narracao: {
              type: Type.STRING,
              description: 'Empático | Confiável | Inspirador | Alerta...'
            },
            perfil_corporal: {
              type: Type.STRING,
              description: 'Perfil 1 (Segurança) | Perfil 2 (Empatia)...'
            },
            camera_e_luz_cena: {
              type: Type.STRING,
              description: 'English description of camera angle, lens, and lighting style.'
            },
            tipo_microfone: {
              type: Type.STRING,
              description: 'Tipo de microfone em cena (ex: Lapela Presa na Gola, Shure Articulado, Sem Microfone)'
            },
            elemento_motion_zdepth: {
              type: Type.STRING,
              description: 'English description of the Z-Depth architecture, textures, and UI elements.'
            },
            som_cena_1: {
              type: Type.STRING,
              description: 'Subtle ambient room tone, soft glass whoosh UI effect.'
            }
          },
          required: [
            'auditoria_ptbr',
            'direcao_de_arte_analise',
            'motor_escolhido',
            'descricao_curta_cena_1',
            'descricao_curta_cena_2',
            'tom_narracao',
            'perfil_corporal',
            'camera_e_luz_cena',
            'tipo_microfone',
            'elemento_motion_zdepth',
            'som_cena_1'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Erro na API Guided Autonomy (Gemini 3.8 Flash):', error);
    return res.status(500).json({ error: error.message || 'Falha ao processar direção guiada' });
  }
});

// 2. API: Coherence & Clinical Safety Audit (Gemini 3.8 Flash)
app.post('/api/director/audit-consistency', async (req, res) => {
  try {
    const { scenes, category } = req.body;

    if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
      return res.status(400).json({ error: 'Lista de cenas inválida.' });
    }

    const systemInstruction = `Você é o Auditor de Coerência Facial e Estética de Vídeos com IA (Gemini 3.8 Flash Clinical & Visual Audit).
Sua função é inspecionar cena a cena para encontrar qualquer falha de coerência emocional, risco de expressões deformadas (grimaces, micro-expressions 'feias'), discrepância entre fala e tom facial, e sugerir melhorias de iluminação e bloqueios.`;

    const promptText = `Avalie as seguintes ${scenes.length} cenas geradas pelo Motor de Direção de Vídeo:

${scenes.map((s: any, idx: number) => `
CENA ${idx + 1}:
- Tom: ${s.tomDetectado}
- Ação: ${s.acaoDetectada}
- Texto: "${s.textoTTSPtBr}"
- Prompt Técnico: ${s.promptTecnicoEn}
`).join('\n---\n')}

Analise a consistência geral, o cumprimento da REGRA GLOBAL DE ESTÉTICA e os bloqueios específicos.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallSafetyScore: {
              type: Type.INTEGER,
              description: 'Pontuação de conformidade de 0 a 100.'
            },
            clinicalAuthorityGrade: {
              type: Type.STRING,
              description: 'Classificação de autoridade e naturalidade (ex: "Excelente - Padrão Ouro", "Apto com pequenas ressalvas").'
            },
            aestheticRuleCompliance: {
              type: Type.BOOLEAN,
              description: 'Se a regra global de estética está 100% blindada contra caretas ou distorções.'
            },
            auditHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            sceneRecommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.INTEGER },
                  status: { type: Type.STRING, enum: ['PERFEITO', 'ATENCAO', 'AJUSTE_RECOMENDADO'] },
                  riskFound: { type: Type.STRING },
                  recommendation: { type: Type.STRING }
                },
                required: ['sceneNumber', 'status', 'recommendation']
              }
            }
          },
          required: ['overallSafetyScore', 'clinicalAuthorityGrade', 'aestheticRuleCompliance', 'auditHighlights', 'sceneRecommendations']
        }
      }
    });

    const auditData = JSON.parse(response.text || '{}');
    return res.json(auditData);
  } catch (error: any) {
    console.error('Erro na Auditoria de Coerência:', error);
    return res.status(500).json({ error: error.message || 'Falha ao auditar coerência' });
  }
});

// 3. API: Gemini 3.8 Flash Lite TTS (Gerar Áudio de Voz em Português)
app.post('/api/director/tts', async (req, res) => {
  try {
    const { text, tone, speechRate, voiceName } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Texto para síntese não informado.' });
    }

    const selectedVoice = voiceName || 'Zephyr'; // 'Kore', 'Zephyr', 'Puck', 'Fenrir', 'Charon'
    
    // Configura metadados de estilo vocal conforme o tom
    let styleDescription = 'Clara, profissional, articulação impecável em português do Brasil';
    if (tone === 'Alerta' || tone === 'Urgente') {
      styleDescription = 'Tom firme, focado, alerta clínico sério, sem pressa excessiva';
    } else if (tone === 'Empático' || tone === 'Calmo' || tone === 'Correção Empática') {
      styleDescription = 'Voz calorosa, acolhedora, ritmo respiratório suave e empático';
    } else if (tone === 'Autoridade' || tone === 'Propositivo') {
      styleDescription = 'Voz segura, queixo firme, autoridade técnica médica e corporativa';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.trim(),
              speechMetadata: {
                style: `${styleDescription}. Velocidade de fala ajustada para ${speechRate || 0.95}x.`,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return res.status(500).json({ error: 'Nenhum dado de áudio foi gerado pelo modelo TTS.' });
    }

    return res.json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
      voice: selectedVoice,
      toneUsed: tone
    });
  } catch (error: any) {
    console.error('Erro no TTS (gemini-3.8-flash-lite-tts):', error);
    return res.status(500).json({ error: error.message || 'Falha na síntese de voz TTS' });
  }
});

// Serve frontend in production or through Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI Video Director Engine] Servidor ativo em http://0.0.0.0:${PORT}`);
  });
}

startServer();
