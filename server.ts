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

// 1. API: Guided Autonomy AI Video Director (Gemini 3.8 Flash - Catálogo Integral 15 Grupos)
app.post('/api/director/guided-autonomy', async (req, res) => {
  try {
    const { 
      blockCount = 1,
      blockScripts = [],
      scriptBlock1, 
      scriptBlock2, 
      visualIdea, 
      masterMode, 
      preferences = [] 
    } = req.body;

    const activeBlocks: string[] = Array.isArray(blockScripts) && blockScripts.length > 0
      ? blockScripts.slice(0, blockCount)
      : [scriptBlock1, scriptBlock2].filter(Boolean);

    const systemInstruction = `Você atua como um sistema inteligente de direção audiovisual de cinema (CÉREBRO AUTÔNOMO V4.0 — CATÁLOGO INTEGRAL 15 GRUPOS).
Sua função é interpretar a intenção do usuário, a cronologia das falas (de 1 a 6 blocos de 10s), a ideia visual e as tags de preferência enviadas pelo painel direito (Guided Autonomy), compor cenas cinematográficas e retornar suas decisões estritamente em JSON estruturado.

CATÁLOGO TÉCNICO DOS 15 GRUPOS DISPONÍVEIS:
- Perfis Biomecânicos (1 a 6): 1=Segurança, 2=Empatia, 3=Simpatia (sem dentes), 4=Hilário Elegante, 5=Preocupado Profissional, 6=Reflexivo.
- Cenários: consultorio, estudio_broadcast, escritorio_executivo, campo_sol_06, campo_sol_10, campo_sol_12, campo_sol_17, campo_aberto, rua_urbana, calçadao_praia, elevador_metalico, carro_movimento.
- Iluminação: estudio_balanceado, warm_amber, clinical_silver, biotec_cyan, neon_bicolor, chiaroscuro, rim_light, dimming_narrativo.
- Lentes/Distância: macro_20cm, curta_1m, medio_85mm, inter_5m, longa_10m, close_up, plano_americano, ots_esquerdo.
- Movimento: estatico, push_in_3m, pull_out, snap_zoom, orbital_tilt, pedestal_float, parallax_pan, dolly_lateral.
- Ângulos: frontal, perfil_45, perfil_90, plongee, contra_plongee.
- Arquitetura Z-Depth: sem_caixa, topo_headroom, atras_gigante, lateral_perspectiva.
- Microfones: shure_congelado, moeda_mao, deadcat_mao, lapela_discreto, sem_microfone.
- Tons: Alerta, Empatico, Cientifico, Inspirador, Tensao, Propositivo, Simpatia, Reflexivo.

REGRAS:
1. "direcao_de_arte_analise": Texto aprofundado em tom de Diretor de Cinema. Explique a cronologia dos blocos, justifique o enquadramento, luz e Z-Depth. Avalie CADA uma das preferências selecionadas pelo usuário em "preferences": se fizer sentido, aprove; se for conflitante ou inadequada ao tom da fala, justifique com autoridade cinematográfica a adaptação ou descarte.
2. "auditoria_ptbr": Resumo executivo de 3 linhas sobre a direção geral e cronologia dos blocos.
3. "cenas_cronologicas": Gere para cada um dos blocos ativos (1 a ${activeBlocks.length}) a descrição técnica de 0-5s (ato 1) e 5-10s (ato 2) em PT e EN (máx 45 palavras por ato).`;

    const prompt = `Analise e dirija o seguinte projeto de vídeo cinematográfico:
- Molde Mestre: ${masterMode || 'lipsync'}
- Quantidade de Blocos: ${activeBlocks.length} bloco(s) de 10s (Duração total: ${activeBlocks.length * 10}s a 1.2x)
- Roteiros por Bloco:
${activeBlocks.map((s, idx) => `  Bloco ${idx + 1} (${idx * 10}-${(idx + 1) * 10}s): "${s}"`).join('\n')}
- Ideia Visual da Cena: "${visualIdea || 'Especialista em ambiente profissional com iluminação e enquadramento de alta autoridade.'}"
- Preferências / Tags Selecionadas (Guided Autonomy): ${preferences.length > 0 ? preferences.join(', ') : 'Nenhuma tag forçada (Autonomia Plena do Diretor)'}

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
              description: 'Resumo executivo de 3 linhas das escolhas criativas em PT-BR.'
            },
            direcao_de_arte_analise: {
              type: Type.STRING,
              description: 'Texto longo e detalhado explicando o PORQUÊ de cada escolha e justificando a aprovação ou descarte de cada preferência do usuário.'
            },
            motor_escolhido: {
              type: Type.STRING,
              enum: ['voiceover', 'lipsync', 'video_to_video']
            },
            perfil_id: {
              type: Type.INTEGER,
              description: 'ID do Perfil Biomecânico de 1 a 6'
            },
            cenario_id: {
              type: Type.STRING,
              description: 'ID do Cenário no catálogo'
            },
            iluminacao_id: {
              type: Type.STRING,
              description: 'ID da Iluminação no catálogo'
            },
            lente_id: {
              type: Type.STRING,
              description: 'ID da Lente/Distância no catálogo'
            },
            movimento_id: {
              type: Type.STRING,
              description: 'ID do Movimento de Câmera no catálogo'
            },
            angulo_id: {
              type: Type.STRING,
              description: 'ID do Ângulo no catálogo'
            },
            zdepth_id: {
              type: Type.STRING,
              enum: ['sem_caixa', 'topo_headroom', 'atras_gigante', 'lateral_perspectiva']
            },
            microfone_id: {
              type: Type.STRING,
              description: 'ID do Microfone no catálogo'
            },
            tom_id: {
              type: Type.STRING,
              description: 'ID do Tom Emocional no catálogo'
            },
            descricao_curta_cena_1: {
              type: Type.STRING,
              description: 'English technical description for scene 1 (max 45 words).'
            },
            descricao_curta_cena_2: {
              type: Type.STRING,
              description: 'English technical description for scene 2 (max 45 words).'
            },
            cenas_cronologicas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  bloco: { type: Type.INTEGER },
                  ato_1_pt: { type: Type.STRING },
                  ato_1_en: { type: Type.STRING },
                  ato_2_pt: { type: Type.STRING },
                  ato_2_en: { type: Type.STRING },
                  motion_pt: { type: Type.STRING },
                  motion_en: { type: Type.STRING },
                  som_pt: { type: Type.STRING },
                  som_en: { type: Type.STRING }
                },
                required: ['bloco', 'ato_1_pt', 'ato_1_en', 'ato_2_pt', 'ato_2_en']
              }
            }
          },
          required: [
            'auditoria_ptbr',
            'direcao_de_arte_analise',
            'motor_escolhido',
            'perfil_id',
            'cenario_id',
            'iluminacao_id',
            'lente_id',
            'movimento_id',
            'angulo_id',
            'zdepth_id',
            'microfone_id'
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
