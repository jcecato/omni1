/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Catálogo Completo dos 13 Grupos Técnicos da Super-Skill Omni Video Director Pro v3.0
 */

export interface MasterTemplateDef {
  id: 'voiceover' | 'lipsync' | 'video_to_video';
  name: string;
  badge: string;
  desc: string;
}

export const MASTER_TEMPLATES: MasterTemplateDef[] = [
  {
    id: 'voiceover',
    name: '1. Voiceover & B-Roll (Imagem para Vídeo)',
    badge: 'VOICEOVER 10s',
    desc: 'Lábios 100% selados (00:00-10:00), respiração nasal, narração em off límpida com cortes dinâmicos de cena.'
  },
  {
    id: 'lipsync',
    name: '2. Talking-Head Lip-Sync (Vídeo Mestre 2K)',
    badge: 'LIP-SYNC 2K',
    desc: 'Apresentador frontal/médio, autoridade, dentes ocultos, sincronia labial orgânica com bloqueio facial total.'
  },
  {
    id: 'video_to_video',
    name: '3. Vídeo para Vídeo (Z-Depth & Cadência)',
    badge: 'VIDEO-TO-VIDEO',
    desc: 'Preserva cadência e microexpressões do vídeo base, alterando áudio, camadas espaciais e iluminação.'
  }
];

export interface BodyProfile {
  id: number;
  name: string;
  ptDesc: string;
  enDesc: string;
}

export const BODY_PROFILES: BodyProfile[] = [
  {
    id: 1,
    name: 'Perfil 1: Segurança',
    ptDesc: 'Olhar firme na lente, cabeça ereta com micro-aceno assertivo, ombros alinhados, braços em movimentos médios à frente da câmera e mãos articulando sem excessos.',
    enDesc: 'Firm steady gaze into lens, erect posture with affirmative micro-nods, aligned shoulders, controlled mid-range arm gestures and natural hands articulating without excess.'
  },
  {
    id: 2,
    name: 'Perfil 2: Empatia',
    ptDesc: 'Olhar acolhedor em escuta ativa, leve inclinação de cabeça, ombros suaves, braços em movimentos médios receptivos e mãos fluidas sem excessos.',
    enDesc: 'Warm empathetic gaze in active listening, subtle receptive head tilt, soft shoulders, fluid receptive mid-range arm movements and calm natural hands.'
  },
  {
    id: 3,
    name: 'Perfil 3: Simpatia (Sem mostrar dentes)',
    ptDesc: 'Sorriso autêntico exclusivamente nos olhos (Duchenne), lábios fechados sem mostrar dentes, braços médios e mãos naturais sem excessos.',
    enDesc: 'Authentic Duchenne smile restricted strictly to the eyes, closed lips without exposing teeth, relaxed mid-range arms and subtle natural gestures.'
  },
  {
    id: 4,
    name: 'Perfil 4: Hilário Elegante',
    ptDesc: 'Olhar expressivo com sutil arqueamento de sobrancelha, leve jogo de cabeça inteligente, braços médios e mãos articulando sem caricatura.',
    enDesc: 'Witty expressive eyes with subtle eyebrow arch, intelligent discreet head angle, engaging mid-range arm articulation without caricature.'
  },
  {
    id: 5,
    name: 'Perfil 5: Preocupado Profissional',
    ptDesc: 'Olhar clínico e analítico com leve tensão controlada no cenho, cabeça firme, braços médios contidos e mãos precisas.',
    enDesc: 'Clinical analytical gaze with subtle controlled brow tension, steady head posture, restrained mid-range arms and precise scientific hand movements.'
  },
  {
    id: 6,
    name: 'Perfil 6: Reflexivo',
    ptDesc: 'Olhar profundo e estratégico, cadência lenta de cabeça, ombros estáveis e gestos minimalistas de mãos.',
    enDesc: 'Deep strategic contemplative gaze, deliberate slow head cadence, grounded stable shoulders and minimalist refined hand gestures.'
  }
];

export interface ScenarioOption {
  id: string;
  name: string;
  ptDesc: string;
  enDesc: string;
}

export const SCENARIO_CATALOG: ScenarioOption[] = [
  {
    id: 'consultorio',
    name: 'Consultório Moderno & Acolhedor',
    ptDesc: 'Consultório médico/clínico moderno com acabamento amadeirado nobre, plantas sutis e iluminação suave de fundo',
    enDesc: 'Modern inviting clinical consultation office with subtle warm wooden accents, tasteful greenery and soft background depth'
  },
  {
    id: 'estudio_broadcast',
    name: 'Estúdio Broadcast Minimalista',
    ptDesc: 'Estúdio broadcast acústico com parede neutra fosca, iluminação volumétrica balanceada e atmosfera sóbria',
    enDesc: 'Minimalist sound-treated broadcast studio with matte neutral backdrop, balanced volumetric key lighting and clean aesthetic'
  },
  {
    id: 'escritorio_executivo',
    name: 'Escritório Executivo / Home Office',
    ptDesc: 'Home office executivo contemporâneo com mesa de carvalho, laptop sutil e estante desbotada ao fundo',
    enDesc: 'Contemporary executive home office with clean oak desk, subtle laptop and softly blurred bookshelf background'
  },
  {
    id: 'campo_aberto',
    name: 'Campo Aberto / Gramado / Natureza',
    ptDesc: 'Ambiente externo em gramado ensolarado suave com luz dourada natural e brisa sutil',
    enDesc: 'Open outdoor natural lawn with soft golden-hour natural illumination and subtle atmospheric breeze'
  },
  {
    id: 'rua_urbana',
    name: 'Cidade / Rua Urbana Dinâmica',
    ptDesc: 'Cenário urbano sofisticado com profundidade arquitetônica e luz natural diurna suave',
    enDesc: 'Sophisticated urban street setting with architectural depth and soft daytime natural illumination'
  },
  {
    id: 'calçadao_praia',
    name: 'Calçadão da Praia / Orla',
    ptDesc: 'Calçadão litorâneo luminoso com horizonte marítimo desfocado e iluminação clara e arejada',
    enDesc: 'Coastal seaside promenade with smoothly blurred oceanic horizon and crisp luminous lighting'
  },
  {
    id: 'carro_movimento',
    name: 'Interior de Veículo / Carro',
    ptDesc: 'Interior minimalista de carro moderno com iluminação difusa através dos vidros e dinâmica elegante',
    enDesc: 'Modern sleek vehicle interior with diffused natural glass lighting and elegant calm dynamics'
  }
];

export interface MicrophoneOption {
  id: string;
  name: string;
  ptDesc: string;
  enDesc: string;
}

export const MICROPHONE_OPTIONS: MicrophoneOption[] = [
  {
    id: 'shure_congelado',
    name: 'Braço articulado Shure congelado',
    ptDesc: 'Braço articulado Shure com microfone profissional congelado na posição lateral',
    enDesc: 'Shure articulated broadcast boom arm with professional microphone frozen in exact lateral position'
  },
  {
    id: 'lapela_discreto',
    name: 'Microfone de lapela discreto',
    ptDesc: 'Microfone de lapela profissional discreto fixado na gola',
    enDesc: 'Discreet professional lavalier microphone clipped to collar'
  },
  {
    id: 'microfone_mao',
    name: 'Microfone de mão broadcast',
    ptDesc: 'Microfone dinâmico de mão empunhado com firmeza',
    enDesc: 'Handheld broadcast dynamic microphone held with steady posture'
  },
  {
    id: 'sem_microfone',
    name: 'Sem microfone visível (Clean)',
    ptDesc: 'Nenhum microfone visível no enquadramento (estética 100% limpa)',
    enDesc: 'No visible microphone in frame, completely clean visual composition'
  }
];

export interface LensFramingOption {
  id: string;
  name: string;
  ptDesc: string;
  enDesc: string;
}

export const LENS_FRAMINGS: LensFramingOption[] = [
  {
    id: 'medio_85mm',
    name: 'Plano Médio 85mm f/1.8 (45% headroom)',
    ptDesc: 'Plano Médio (peito para cima, 45% de headroom), lente 85mm f/1.8 com bokeh suave e desfoque orgânico de fundo',
    enDesc: 'Medium shot (chest up, 45% headroom), 85mm f/1.8 lens with creamy bokeh and organic background separation'
  },
  {
    id: 'close_85mm',
    name: 'Close-up Facial Suave 85mm',
    ptDesc: 'Close-up facial suave na faixa dos olhos e ombros, lente 85mm sem distorções angulares',
    enDesc: 'Soft facial close-up highlighting eyes and shoulders, 85mm focal length with zero facial distortion'
  },
  {
    id: 'americano_50mm',
    name: 'Plano Americano 50mm f/1.8',
    ptDesc: 'Plano Americano (cintura para cima), lente 50mm f/1.8 com perspectiva realista e neutra',
    enDesc: 'Medium long shot / cowboy shot (waist up), 50mm f/1.8 lens with natural eye-level perspective'
  },
  {
    id: 'aberto_35mm',
    name: 'Plano Aberto Wide 35mm',
    ptDesc: 'Plano Aberto amplo, lente 35mm cinematográfica contextualizando sujeito e profundidade de ambiente',
    enDesc: 'Wide establishing cinematic shot, 35mm lens showcasing subject and architectural spatial depth'
  }
];

export interface CameraMovementOption {
  id: string;
  name: string;
  ptDesc: string;
  enDesc: string;
}

export const CAMERA_MOVEMENTS: CameraMovementOption[] = [
  {
    id: 'estatico',
    name: 'Câmera Estática / Fixa',
    ptDesc: 'Câmera em tripé fixo e estável, sem trepidação',
    enDesc: 'Locked tripod static camera, perfectly stable framing'
  },
  {
    id: 'push_in_3m',
    name: 'Aproximar Lentamente (3m ➔ Olhos)',
    ptDesc: 'Início a ~3m de distância nos primeiros 3s, aproximando lentamente até os olhos entre 3s-7s e estabilizando',
    enDesc: 'Starts at ~3m distance for 3s, slowly pushes in towards eye level between 3s-7s, then holds steady'
  },
  {
    id: 'pull_out',
    name: 'Afastar Suavemente (Pull-Out)',
    ptDesc: 'Afastamento gradual e suave da câmera revelando maior amplitude espacial',
    enDesc: 'Smooth gradual pull-out camera movement gently revealing wider environmental context'
  },
  {
    id: 'orbita_360',
    name: 'Órbita Suave 360° ao redor do sujeito',
    ptDesc: 'Humano imóvel na posição central enquanto a câmera realiza órbita suave e fluida em torno do sujeito',
    enDesc: 'Subject remains centered while camera performs a smooth, fluid 360-degree orbital motion'
  },
  {
    id: 'dolly_lateral',
    name: 'Dolly Lateral Suave',
    ptDesc: 'Deslocamento lateral suave em trilho/dolly mantendo o sujeito no terço áureo',
    enDesc: 'Smooth lateral dolly tracking shot keeping subject anchored along rule of thirds'
  },
  {
    id: 'drone_suave',
    name: 'Movimento Aéreo / Drone Suave',
    ptDesc: 'Movimento fluido e amplo tipo drone em altitude baixa e estabilizada',
    enDesc: 'Fluid low-altitude aerial drone camera glide with stabilized horizon'
  }
];

export interface CameraAngleOption {
  id: string;
  name: string;
  ptDesc: string;
  enDesc: string;
}

export const CAMERA_ANGLES: CameraAngleOption[] = [
  {
    id: 'frontal',
    name: 'Frontal (Nível dos Olhos)',
    ptDesc: 'Ângulo frontal direto ao nível dos olhos, transmitindo máxima transparência',
    enDesc: 'Direct frontal eye-level angle, conveying maximum connection and clarity'
  },
  {
    id: 'perfil_45',
    name: 'Perfil 45° Dinâmico',
    ptDesc: 'Ângulo em três quartos (45°), conferindo profundidade tridimensional ao rosto',
    enDesc: 'Three-quarter 45-degree angle adding cinematic three-dimensional facial depth'
  },
  {
    id: 'lateral_90',
    name: 'Lateral 90° (Perfil Puro)',
    ptDesc: 'Perfil lateral a 90° com iluminação de recorte e silhueta precisa',
    enDesc: 'Pure 90-degree side profile with rim light detailing facial contour'
  },
  {
    id: 'plongee',
    name: 'Plongée (De Cima para Baixo)',
    ptDesc: 'Câmera ligeiramente elevada em ângulo plongée sutil',
    enDesc: 'Subtle high-angle shot looking slightly downward with refined composition'
  },
  {
    id: 'contra_plongee',
    name: 'Contra-Plongée (De Baixo para Cima)',
    ptDesc: 'Ângulo baixo em contra-plongée suave conferindo autoridade e liderança',
    enDesc: 'Low-angle hero perspective projecting authority and stature'
  }
];

export interface LightingOption {
  id: string;
  name: string;
  ptDesc: string;
  enDesc: string;
}

export const LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: 'estudio_balanceado',
    name: 'Luz de Estúdio Balanceada',
    ptDesc: 'Luz principal suave difusa a 45°, luz de preenchimento neutra e luz de recorte sutil nos ombros',
    enDesc: 'Balanced studio lighting: diffused soft key at 45°, gentle fill and subtle hair rim light'
  },
  {
    id: 'warm_amber',
    name: 'Warm Amber (Acolhedora & Bronzeada)',
    ptDesc: 'Luz principal quente dourada (Warm Key Light) vinda da direita, criando leve bronzeado saudável e catchlight nos olhos',
    enDesc: 'Warm amber key light from right creating healthy radiant skin warmth and crisp ocular catchlights'
  },
  {
    id: 'clinical_silver',
    name: 'Clinical Silver (Fria & Analítica)',
    ptDesc: 'Iluminação neutra fria 5600K com alto índice de reprodução de cor e nitidez cirúrgica',
    enDesc: 'Crisp 5600K clinical silver illumination with clinical precision and immaculate color fidelity'
  },
  {
    id: 'biotec_cyan',
    name: 'Biotec Cyan (Alta Tecnologia)',
    ptDesc: 'Luz ambiente fria complementada por luz de recorte azul ciano biotecnológico',
    enDesc: 'Cold technological ambient lighting accented by subtle biotech cyan edge backlight'
  },
  {
    id: 'dimming_narrativo',
    name: 'Dimming Narrativo (Foco Dramático)',
    ptDesc: 'Iluminação padrão que escurece suavemente (dimming) no momento de alerta e retorna ao tom original',
    enDesc: 'Dynamic lighting subtly dimming the surroundings during the alert focal moment, then restoring balance'
  }
];

export interface ZDepthBoxOption {
  id: 'sem_caixa' | 'topo_headroom' | 'atras_gigante' | 'lateral_perspectiva';
  name: string;
  typographyRulePt: string;
  typographyRuleEn: string;
  outputRulePt: string;
  outputRuleEn: string;
  ptDesc: string;
  enDesc: string;
}

export const ZDEPTH_BOXES: Record<string, ZDepthBoxOption> = {
  sem_caixa: {
    id: 'sem_caixa',
    name: '1. Sem Caixa (Apresentador Puro)',
    typographyRulePt: 'SEM TEXTO, SEM LEGENDAS, SEM TÍTULOS, SEM LOGOS, SEM TIPOGRAFIA na tela. Narrativa estritamente visual.',
    typographyRuleEn: 'NO TEXT, NO SUBTITLES, NO TITLES, NO LOGOS, NO ON-SCREEN TYPOGRAPHY. Strictly visual narrative.',
    outputRulePt: 'Nenhum elemento flutuante na tela.',
    outputRuleEn: 'No floating HUD elements on screen.',
    ptDesc: 'Apresentador puro em tela cheia, sem sobreposições gráficas ou caixas flutuantes.',
    enDesc: 'Pure human presenter full frame, zero floating overlays or graphic boxes.'
  },
  topo_headroom: {
    id: 'topo_headroom',
    name: '2. Caixa Acima da Cabeça (+25% Escala, Headroom 45%)',
    typographyRulePt: 'Sem legendas na base da tela. Renderizar exclusivamente a tipografia fina de calibre 17px dentro do Painel Espacial Glassmorphism flutuante no topo (10%-25% da tela), sem sobrepor o rosto.',
    typographyRuleEn: 'No captions at bottom. Exclusively render crisp 17px typography inside the floating Glassmorphism HUD panel in head-space (10%-25% of frame), never occluding the face.',
    outputRulePt: 'Painel flutuante Glassmorphism (#14110F, opacidade 88%, borda dourada champanhe de 1px) posicionado na camada superior.',
    outputRuleEn: 'Floating Glassmorphism HUD (#14110F, 88% opacity, 1px champagne gold border) positioned in top head-space layer.',
    ptDesc: 'Painel Glassmorphism flutuando acima da cabeça (head-space, 10%-25% superior) com borda ultrafina de 1px.',
    enDesc: 'Glassmorphism HUD floating in top head-space (10%-25% upper frame) with 1px razor-thin border.'
  },
  atras_gigante: {
    id: 'atras_gigante',
    name: '3. Caixa Gigante Atrás da Cabeça (Z-1) + Humano Base (30-40%)',
    typographyRulePt: 'Sem legendas na base. Conteúdo gráfico e esquemático projetado na Camada Média Z-1 atrás dos ombros do apresentador, com tipografia nítida de calibre 17px.',
    typographyRuleEn: 'No bottom subtitles. Visual infographics and schematic data projected in Midground Z-1 layer behind presenter shoulders, crisp 17px typography.',
    outputRulePt: 'Layout Híbrido: Apresentador minimizado ocupando 30%-40% inferior apontando para cima, com canvas principal superior (60%-70%) projetando o infográfico.',
    outputRuleEn: 'Hybrid layout: Presenter minimized at bottom 30%-40% pointing upward, with main upper canvas (60%-70%) projecting architectural diagram.',
    ptDesc: 'Projeção espacial na camada traseira (Z-1) atrás do apresentador, com infográficos ou tabelas comparativas.',
    enDesc: 'Spatial projection in back midground layer (Z-1) behind subject, featuring comparative charts or diagrams.'
  },
  lateral_perspectiva: {
    id: 'lateral_perspectiva',
    name: '4. Caixa Lateral em Perspectiva (35°) + Humano 60% Esquerda',
    typographyRulePt: 'Sem legendas na base da tela. Renderizar mockup/card em perspectiva isométrica de 35° à direita com textos e ícones calibre 17px de alto contraste.',
    typographyRuleEn: 'No subtitles on screen bottom. Render 3D card/mockup in 35-degree isometric tilt on the right with crisp 17px high-contrast typography.',
    outputRulePt: 'Layout 60/40: Apresentador posicionado à esquerda ocupando 60% do quadro e mockup tridimensional inclinado a 35° à direita.',
    outputRuleEn: '60/40 Split Layout: Presenter on left 60% of frame with 3D card/smartphone mockup tilted at 35 degrees on the right.',
    ptDesc: 'Layout 60/40: Apresentador à esquerda e mockup 3D/Data Card inclinado a 35° à direita.',
    enDesc: '60/40 Split Layout: Presenter on the left and 35-degree angled 3D data card on the right.'
  }
};

export interface LivingSkinFilter {
  key: string;
  label: string;
  ptDesc: string;
  enDesc: string;
  activeDefault: boolean;
}

export const LIVING_SKIN_FILTERS: LivingSkinFilter[] = [
  {
    key: 'texturas',
    label: 'Texturas Reais',
    ptDesc: 'Microgeometria epidérmica humana viva, poros visíveis e textura natural',
    enDesc: 'authentic living human epidermal micro-geometry and visible pores',
    activeDefault: true
  },
  {
    key: 'pele_sss',
    label: 'SSS Orgânico',
    ptDesc: 'Espalhamento subsuperficial orgânico (SSS) biologicamente plausível',
    enDesc: 'natural organic subsurface scattering (SSS)',
    activeDefault: true
  },
  {
    key: 'anti_plastico',
    label: 'Anti-Plástico',
    ptDesc: 'Proibição rigorosa de brilho sintético, aspecto de cera ou airbrush',
    enDesc: 'strictly no waxy sheen, zero synthetic plastic highlights',
    activeDefault: true
  },
  {
    key: 'anti_emborrachado',
    label: 'Anti-Emborrachado',
    ptDesc: 'Biomecânica anatômica precisa, mandíbula estável sem estiramento emborrachado',
    enDesc: 'anatomically accurate biomechanics, zero rubbery stretching or jaw warp',
    activeDefault: true
  },
  {
    key: 'anti_opaco',
    label: 'Anti-Opaco / Vitalidade',
    ptDesc: 'Vitalidade biológica saudável da pele, sem palidez cadavérica ou opacidade artificial',
    enDesc: 'healthy biological skin vitality, realistic warm vascular undertone',
    activeDefault: true
  },
  {
    key: 'poros_suaves',
    label: 'Poros Suaves (85mm)',
    ptDesc: 'Poros faciais orgânicos e suaves sem efeito grosseiro ou granulado de ruído',
    enDesc: 'soft natural skin pores optimized for 85mm portrait optics',
    activeDefault: true
  }
];

export interface ReferencePill {
  id: string;
  token: string;
  label: string;
  requiredFor: ('voiceover' | 'lipsync' | 'video_to_video')[];
  defaultActive: boolean;
}

export const REFERENCE_PILLS: ReferencePill[] = [
  { id: 'personagem', token: '[ REFERENCIA PERSONAGEM ]', label: 'Personagem (Face / Corpo)', requiredFor: ['voiceover', 'lipsync', 'video_to_video'], defaultActive: true },
  { id: 'voz', token: '[ REFERENCIA VOZ ]', label: 'Voz (Áudio Somente)', requiredFor: ['voiceover', 'lipsync', 'video_to_video'], defaultActive: true },
  { id: 'cena', token: '[ REFERENCIA CENA ]', label: 'Cena de Referência', requiredFor: ['lipsync'], defaultActive: true },
  { id: 'elemento1', token: '[ REFERENCIA ELEMENTO 1 ]', label: 'Card / Mockup Z-Depth', requiredFor: ['voiceover', 'video_to_video'], defaultActive: true },
  { id: 'video_base', token: '[ REFERENCIA VIDEO BASE ]', label: 'Vídeo Base (Movimento)', requiredFor: ['video_to_video'], defaultActive: true },
  { id: 'video_anterior', token: '[ REFERENCIA VIDEO ANTERIOR ]', label: 'Vídeo Anterior (Frame-Lock)', requiredFor: ['voiceover', 'lipsync', 'video_to_video'], defaultActive: false }
];

export const EMOTIONAL_TONES = [
  { id: 'Alerta', label: 'Alerta Clínico', pt: 'Alerta e foco cirúrgico', en: 'clinical alert and focused awareness' },
  { id: 'Empatico', label: 'Empático / Acolhedor', pt: 'Empático e acolhedor', en: 'warm empathetic physician tone' },
  { id: 'Cientifico', label: 'Científico / Autoridade', pt: 'Analítico e autoridade científica', en: 'analytical scientific authority' },
  { id: 'Inspirador', label: 'Inspirador / Motivacional', pt: 'Inspirador e propositivo', en: 'inspiring and uplifting tone' },
  { id: 'Tensao', label: 'Tensão / Risco à Saúde', pt: 'Sério, focado em gravidade controlada', en: 'serious controlled medical gravity' },
  { id: 'Propositivo', label: 'Propositivo / Estratégico', pt: 'Confiante e estratégico', en: 'proactive and strategically confident' },
  { id: 'Simpatia', label: 'Sorriso no Olhar', pt: 'Simpatia contida com sorriso nos olhos', en: 'warm Duchenne smile in the eyes' },
  { id: 'Reflexivo', label: 'Questionador / Reflexivo', pt: 'Reflexivo e pausado', en: 'reflective and analytical contemplation' }
];

export interface PreferenceChip {
  id: string;
  label: string;
  tooltip5Words: string; // Exatamente 5 palavras em PT-BR
}

export interface PreferenceCategory {
  id: string;
  title: string; // Em inglês profissional
  chips: PreferenceChip[];
}

export const PREFERENCE_ACCORDIONS: PreferenceCategory[] = [
  {
    id: 'camera_lens',
    title: 'CAMERA & LENS',
    chips: [
      { id: 'slow_push_in', label: 'Slow Push-In', tooltip5Words: 'Aproximação suave gerando tensão foco.' },
      { id: 'slow_pull_out', label: 'Slow Pull-Out', tooltip5Words: 'Afastamento suave revelando ambiente amplo.' },
      { id: 'parallax_dolly', label: 'Parallax Dolly', tooltip5Words: 'Movimento lateral criando profundidade espacial.' },
      { id: 'orbita_3d', label: 'Órbita 3D', tooltip5Words: 'Giro dinâmico destacando o apresentador.' },
      { id: 'bokeh_85mm', label: '85mm Shallow Bokeh', tooltip5Words: 'Foco nítido com fundo desfocado.' },
      { id: 'natural_50mm', label: '50mm Visão Natural', tooltip5Words: 'Perspectiva humana realista e equilibrada.' },
      { id: 'wide_35mm', label: '35mm Grande Angular', tooltip5Words: 'Plano aberto contextualizando todo cenário.' },
      { id: 'plano_medio', label: 'Plano Médio 45%', tooltip5Words: 'Enquadramento profissional da cintura acima.' },
      { id: 'close_up', label: 'Close-up Focado', tooltip5Words: 'Expressão facial com máxima intensidade.' }
    ]
  },
  {
    id: 'lighting_mood',
    title: 'LIGHTING & MOOD',
    chips: [
      { id: 'chiaroscuro', label: 'Chiaroscuro', tooltip5Words: 'Sombras dramáticas destacando o rosto.' },
      { id: 'warm_amber', label: 'Warm Amber', tooltip5Words: 'Tonalidade dourada acolhedora e confiante.' },
      { id: 'clinical_silver', label: 'Clinical Silver', tooltip5Words: 'Luz fria transmitindo precisão médica.' },
      { id: 'biotec_cyan', label: 'Biotec Cyan', tooltip5Words: 'Iluminação futurista com tecnologia avançada.' },
      { id: 'neon_bicolor', label: 'Néon Bicolor', tooltip5Words: 'Contraste moderno de duas cores.' },
      { id: 'dimming', label: 'Dimming Narrativo', tooltip5Words: 'Escurecimento sutil aumentando o suspense.' },
      { id: 'light_spill', label: 'Light Spill', tooltip5Words: 'Flashes sutis recortando os ombros.' }
    ]
  },
  {
    id: 'zdepth_motion',
    title: 'Z-DEPTH & MOTION',
    chips: [
      { id: 'bento_grid', label: 'Bento Grid', tooltip5Words: 'Cards flutuantes organizando tópicos visuais.' },
      { id: 'top_hud', label: 'Top HUD (+25%)', tooltip5Words: 'Painel superior com leitura imediata.' },
      { id: 'midground_z1', label: 'Midground Z-1', tooltip5Words: 'Caixa gigante atrás do apresentador.' },
      { id: 'side_split', label: 'Side Split 35°', tooltip5Words: 'Divisão lateral preservando enquadramento humano.' },
      { id: 'dataviz', label: 'Data-Viz Orgânico', tooltip5Words: 'Gráficos fluidos ilustrando métricas essenciais.' },
      { id: 'vidro_fosco', label: 'Vidro Fosco Glass', tooltip5Words: 'Blur sofisticado com borda champanhe.' },
      { id: 'puro', label: 'Apresentador Puro', tooltip5Words: 'Sem caixas preservando foco total.' }
    ]
  },
  {
    id: 'biomechanics',
    title: 'BIOMECHANICS',
    chips: [
      { id: 'bio_seguranca', label: 'Segurança Firme', tooltip5Words: 'Olhar direto transmitindo autoridade total.' },
      { id: 'bio_empatia', label: 'Empatia Acolhedora', tooltip5Words: 'Inclinação suave demonstrando escuta ativa.' },
      { id: 'bio_simpatia', label: 'Simpatia Sem Dentes', tooltip5Words: 'Sorriso nos olhos sem dentes.' },
      { id: 'bio_preocupado', label: 'Preocupado Clínico', tooltip5Words: 'Cenho analítico focado no diagnóstico.' },
      { id: 'bio_reflexivo', label: 'Reflexivo Profundo', tooltip5Words: 'Cadência pausada sugerindo raciocínio denso.' },
      { id: 'bio_hilario', label: 'Hilário Elegante', tooltip5Words: 'Leveza contida sem exageros faciais.' }
    ]
  }
];

