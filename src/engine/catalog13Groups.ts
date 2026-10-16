/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Catálogo Integral Sincronizado (15 Grupos Técnicos + Guided Autonomy)
 * Super-Skill Omni Video Director Pro v4.0
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
    name: '1. Voiceover & B-Roll (Imagem - Vídeo)',
    badge: 'VOICEOVER',
    desc: 'Lábios 100% selados (00:00-10:00), respiração nasal, narração em off com cortes dinâmicos.'
  },
  {
    id: 'lipsync',
    name: '2. Talking-Head Lip-Sync (Texto - Vídeo)',
    badge: 'LIP-SYNC',
    desc: 'Apresentador frontal/médio, autoridade, dentes ocultos, sincronia labial orgânica.'
  },
  {
    id: 'video_to_video',
    name: '3. Vídeo para Vídeo (Z-Depth & Cadência)',
    badge: 'V2V',
    desc: 'Preserva cadência do vídeo base, alterando áudio, camadas espaciais e iluminação.'
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
    name: 'Studio Profissional',
    ptDesc: 'Fundo infinito minimalista iluminado sem reverberação acústica e atmosfera sóbria',
    enDesc: 'Minimalist sound-treated professional studio with infinite matte backdrop and zero acoustic reverb'
  },
  {
    id: 'escritorio_executivo',
    name: 'Home Office',
    ptDesc: 'Ambiente corporativo acolhedor com mesa de carvalho, luz suave e silencioso',
    enDesc: 'Warm corporate home office with oak desk, soft ambient lighting and silent acoustics'
  },
  {
    id: 'campo_sol_06',
    name: 'Campo Aberto (Sol 06:00)',
    ptDesc: 'Campo aberto com luz solar rasante dourada matinal direta',
    enDesc: 'Open natural field with direct golden low-angle 06:00 AM morning sunlight'
  },
  {
    id: 'campo_sol_10',
    name: 'Campo Aberto (Sol 10:00)',
    ptDesc: 'Campo aberto com iluminação natural limpa das 10:00 e sombras médias',
    enDesc: 'Open field with crisp 10:00 AM natural daylight and balanced medium shadows'
  },
  {
    id: 'campo_sol_12',
    name: 'Campo Aberto (Sol 12:00)',
    ptDesc: 'Campo aberto com luz zenital vertical de alto contraste ao meio-dia',
    enDesc: 'Open field under vertical high-contrast 12:00 PM zenith sunlight'
  },
  {
    id: 'campo_sol_17',
    name: 'Campo Aberto (Sol 17:00)',
    ptDesc: 'Campo aberto com luz do entardecer alaranjada das 17:00 e sombras longas',
    enDesc: 'Open field bathed in warm orange 05:00 PM sunset light with long dramatic shadows'
  },
  {
    id: 'campo_aberto',
    name: 'Campo Aberto Filtrado',
    ptDesc: 'Luz difusa filtrada por vegetação com áudio natural baixo e brisa sutil',
    enDesc: 'Open outdoor greenery with sunlight diffused through tree leaves and quiet nature ambiance'
  },
  {
    id: 'rua_urbana',
    name: 'Cidade / Rua Urbana Dinâmica',
    ptDesc: 'Cenário urbano sofisticado com profundidade arquitetônica e luz natural diurna suave',
    enDesc: 'Sophisticated urban street setting with architectural depth and soft daytime natural illumination'
  },
  {
    id: 'calçadao_praia',
    name: 'Calçadão de Praia',
    ptDesc: 'Iluminação litorânea vibrante com horizonte marítimo desfocado e áudio suave ao fundo',
    enDesc: 'Vibrant coastal promenade with blurred ocean horizon and soft ambient background'
  },
  {
    id: 'elevador_metalico',
    name: 'Elevador Metálico',
    ptDesc: 'Interior de elevador moderno com superfícies reflexivas escovadas para cortes rápidos sem ruído',
    enDesc: 'Modern brushed-metal elevator interior with sleek reflective surfaces and silent acoustics'
  },
  {
    id: 'carro_movimento',
    name: 'Interior Veicular (Hyundai HB20S)',
    ptDesc: 'Habitáculo automotivo fechado de Hyundai HB20S com luz natural difusa de cabine',
    enDesc: 'Closed Hyundai HB20S vehicle cabin interior with natural diffused window daylight'
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
    name: 'Braço Articulado Baixo',
    ptDesc: 'Microfone broadcast em braço articulado baixo fixado discretamente na bancada',
    enDesc: 'Low-profile articulated broadcast boom arm microphone discreetly fixed on desk'
  },
  {
    id: 'mic_moeda',
    name: 'Microfone Moeda (Mão)',
    ptDesc: 'Cápsula magnética circular estilo moeda segurada rente ao queixo',
    enDesc: 'Coin-sized circular magnetic wireless microphone held delicately near the chin'
  },
  {
    id: 'lapela_deadcat',
    name: 'Lapela Deadcat (Mão)',
    ptDesc: 'Microfone compacto com espuma/pelúcia deadcat segurado manualmente',
    enDesc: 'Compact lavalier microphone with furry deadcat windscreen held in hand'
  },
  {
    id: 'lapela_discreto',
    name: 'Lapela na Gola',
    ptDesc: 'Microfone de lapela discreto preso à gola da roupa liberando as duas mãos',
    enDesc: 'Discreet professional lavalier microphone clipped to collar leaving hands free'
  },
  {
    id: 'sem_microfone',
    name: 'Clean Frame (Sem Microfone)',
    ptDesc: 'Sem microfones aparentes mantendo a imagem 100% limpa',
    enDesc: 'Clean frame with no visible microphones in shot'
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
    name: 'Medium Shot (Headroom 45%) — 3m',
    ptDesc: 'Distância Média (3m), Plano Médio (peito para cima, 45% headroom), lente 85mm f/1.8 Shallow Bokeh',
    enDesc: 'Medium distance (3m), medium shot (chest up, 45% headroom), 85mm f/1.8 lens with shallow bokeh'
  },
  {
    id: 'close_85mm',
    name: 'Close-Up (1m) — 85mm f/1.8',
    ptDesc: 'Distância Curta (1m), Close-Up do tórax para cima com foco facial e fundo desfocado',
    enDesc: 'Short distance (1m), chest-up close-up with sharp facial focus and 85mm f/1.8 shallow bokeh'
  },
  {
    id: 'macro_20cm',
    name: 'Distância Macro (20 cm)',
    ptDesc: 'Distância Macro extrema (20 cm) focada no elemento/detalhe com desfoque traseiro de 50%',
    enDesc: 'Extreme macro distance (20cm) focused on target detail with 50% background blur'
  },
  {
    id: 'americano_50mm',
    name: 'Plano Americano (5m) — 50mm',
    ptDesc: 'Distância Intermediária (5m), cintura para cima integrando bancada física, lente 50mm',
    enDesc: 'Intermediate distance (5m), waist-up cowboy shot integrating physical desk, 50mm lens'
  },
  {
    id: 'aberto_35mm',
    name: 'Distância Longa (10m) — Wide 35mm',
    ptDesc: 'Distância Longa (10m), plano geral mostrando corpo inteiro e ambiente natural em 35mm',
    enDesc: 'Long distance (10m), full-body wide establishing shot showcasing environment, 35mm lens'
  },
  {
    id: 'ots_esquerdo',
    name: 'Over-The-Shoulder (OTS Esquerdo)',
    ptDesc: 'Câmera posicionada nas costas desfocando o ombro esquerdo em 10% com foco nítido frontal',
    enDesc: 'Over-the-shoulder left camera angle with 10% soft shoulder blur and sharp frontal focus'
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
    name: 'Locked-Off Anchor (Câmera Travada)',
    ptDesc: 'Câmera travada em tripé fixo focando toda a atenção nos motions gráficos',
    enDesc: 'Locked-off static camera anchor focusing viewer attention on graphic motions'
  },
  {
    id: 'push_in_3m',
    name: 'Slow Push-In (Zoom In 3m ➔ Olhos)',
    ptDesc: 'Aproximação contínua de 3m até a faixa dos olhos aumentando retenção e foco',
    enDesc: 'Continuous slow push-in from 3m towards eye level increasing retention and focus'
  },
  {
    id: 'pull_out',
    name: 'Slow Pull-Out (Zoom Out)',
    ptDesc: 'Afastamento gradual revelando múltiplos elementos e infográficos ao redor',
    enDesc: 'Gradual slow pull-out revealing surrounding spatial elements and infographics'
  },
  {
    id: 'snap_zoom_out',
    name: 'Snap Zoom-Out (1,5s)',
    ptDesc: 'Recuo ligeiro e ágil de 1,5s quebrando o ritmo visual com dinamismo',
    enDesc: 'Quick 1.5s snap zoom-out subtly breaking visual pacing with dynamic energy'
  },
  {
    id: 'orbita_360',
    name: '3D Orbital Arc + Tilt',
    ptDesc: 'Rotação diagonal em arco ao redor do sujeito revelando o horizonte',
    enDesc: '3D diagonal orbital arc rotation around subject tilting up to reveal horizon'
  },
  {
    id: 'isometric_pan',
    name: 'Isometric Parallax Pan',
    ptDesc: 'Deslize lateral em perspectiva isométrica destacando o volume 3D dos gráficos',
    enDesc: 'Isometric lateral parallax pan highlighting 3D thickness of floating graphics'
  },
  {
    id: 'pedestal_float',
    name: 'Pedestal Float',
    ptDesc: 'Elevação vertical suave da câmera subindo em direção à camada gráfica superior',
    enDesc: 'Smooth vertical pedestal float rising toward upper graphic HUD layer'
  },
  {
    id: 'dolly_lateral',
    name: 'Parallax Dolly Slider',
    ptDesc: 'Deslocamento horizontal em slider revelando profundidade real entre camadas Z-Depth',
    enDesc: 'Horizontal parallax dolly slider movement revealing depth between Z-layers'
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
    name: 'Frontal Nível dos Olhos',
    ptDesc: 'Alinhamento direto ao nível dos olhos gerando máxima conexão e autoridade',
    enDesc: 'Direct eye-level frontal alignment generating connection and authority'
  },
  {
    id: 'perfil_45',
    name: 'Perfil Dinâmico 45°',
    ptDesc: 'Ângulo diagonal a 45° evidenciando a volumetria do espaço e do rosto',
    enDesc: 'Dynamic 45-degree diagonal profile highlighting spatial and facial volume'
  },
  {
    id: 'lateral_90',
    name: 'Perfil Dinâmico 90°',
    ptDesc: 'Ângulo lateral puro a 90° destacando silhueta e camadas espaciais',
    enDesc: 'Pure 90-degree lateral profile emphasizing silhouette and spatial layers'
  },
  {
    id: 'plongee',
    name: 'Plongée (Superior)',
    ptDesc: 'Ângulo vertical levemente superior alterando a perspectiva com elegância',
    enDesc: 'Subtle high-angle plongee perspective'
  },
  {
    id: 'contra_plongee',
    name: 'Contra-Plongée (Imponência)',
    ptDesc: 'Ângulo vertical baixo conferindo imponência e liderança ao apresentador',
    enDesc: 'Low-angle contra-plongee perspective projecting stature and authority'
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
    name: 'Chiaroscuro Studio',
    ptDesc: 'Foco luminoso preciso no rosto com laterais e fundo suavemente escurecidos',
    enDesc: 'Chiaroscuro studio lighting with precise facial focus and darkened surroundings'
  },
  {
    id: 'warm_amber',
    name: 'Luz Quente (Âmbar/Golden)',
    ptDesc: 'Tonalidade amarelada/dourada transmitindo proximidade, saúde e conforto',
    enDesc: 'Warm amber golden key lighting conveying warmth, health and comfort'
  },
  {
    id: 'clinical_silver',
    name: 'Luz Fria (Daylight Clínica)',
    ptDesc: 'Iluminação neutra e clara (5600K) transmitindo rigor e precisão científica',
    enDesc: 'Crisp 5600K clinical daylight illumination conveying medical precision'
  },
  {
    id: 'biotec_cyan',
    name: 'Luz Ciano Biotec',
    ptDesc: 'Atmosfera fria com recorte ciano direcionada à linguagem científica avançada',
    enDesc: 'Cold biotech cyan accented lighting tailored for advanced scientific visuals'
  },
  {
    id: 'neon_bicolor',
    name: 'Néon Bicolor (Magenta & Azul)',
    ptDesc: 'Recortes luminosos modernos combinando magenta e azul ciano',
    enDesc: 'Modern bicolor neon rim lighting combining magenta and cyber blue'
  },
  {
    id: 'dimming_narrativo',
    name: 'Dimming Narrativo + Light Spill',
    ptDesc: 'Luz que escurece suavemente no ponto crítico com reflexo diegético do card sobre os ombros',
    enDesc: 'Narrative dimming during key phrase with diegetic HUD light spill on shoulders'
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
    name: '1. Modo Zero-Texto (Apresentador Puro)',
    typographyRulePt: 'SEM TEXTO, SEM LEGENDAS, SEM TÍTULOS, SEM LOGOS, SEM TIPOGRAFIA na tela. Narrativa estritamente visual.',
    typographyRuleEn: 'NO TEXT, NO SUBTITLES, NO TITLES, NO LOGOS, NO ON-SCREEN TYPOGRAPHY. Strictly visual narrative.',
    outputRulePt: 'Nenhum elemento flutuante na tela.',
    outputRuleEn: 'No floating HUD elements on screen.',
    ptDesc: 'Apresentador puro em tela cheia, sem sobreposições gráficas ou caixas flutuantes.',
    enDesc: 'Pure human presenter full frame, zero floating overlays or graphic boxes.'
  },
  topo_headroom: {
    id: 'topo_headroom',
    name: '2. Top-Floating HUD (+25% Escala, Bento Grid Superior)',
    typographyRulePt: 'Sem legendas na base da tela. Renderizar exclusivamente tipografia Sans-Serif fina (Inter/SF Pro) calibre 17px dentro do Top-Floating HUD Glassmorphism (#14110F) no topo (10%-25% da tela), sem sobrepor o rosto.',
    typographyRuleEn: 'No bottom captions. Exclusively render crisp 17px Inter/SF Pro typography inside the Top-Floating Glassmorphism HUD (#14110F) in upper head-space (10%-25%), never occluding face.',
    outputRulePt: 'Top-Floating HUD em Glassmorphism Fosco (#14110F, filete dourado champagne 1px, cantos 18px e soft drop shadow) posicionado acima da cabeça.',
    outputRuleEn: 'Top-Floating HUD in Matte Glassmorphism (#14110F, 1px champagne gold hairline border, 18px rounded corners, soft drop shadow) above head.',
    ptDesc: 'Gráficos suspensos acima da linha visual com Bento Grid ou Mini Cards.',
    enDesc: 'Graphics suspended in upper head-space featuring Bento Grid or Mini Cards.'
  },
  atras_gigante: {
    id: 'atras_gigante',
    name: '3. Z-Depth Midground (Atrás Z-1) / Layout Híbrido Split',
    typographyRulePt: 'Sem legendas na base. Conteúdo gráfico e Texto Traseiro Z-1 ancorados atrás do apresentador (ou no Canvas Superior 60-70% com Mini-Presenter 30-40% na base), fonte calibre 17px.',
    typographyRuleEn: 'No bottom subtitles. Visual infographics and Z-1 back typography anchored behind presenter (or upper 60-70% canvas with 30-40% mini-presenter below), 17px font.',
    outputRulePt: 'Camada Z-Depth Midground (Z-1) com infográfico/painel translúcido atrás dos ombros ou Layout Híbrido Split.',
    outputRuleEn: 'Z-Depth Midground (Z-1) translucent panel behind shoulders or Hybrid Split Layout.',
    ptDesc: 'Elementos gráficos posicionados atrás do apresentador ou em Layout Híbrido Split.',
    enDesc: 'Graphic elements positioned behind presenter or in Hybrid Split Layout.'
  },
  lateral_perspectiva: {
    id: 'lateral_perspectiva',
    name: '4. Side Perspective Split (60/40, Inclinado 35°)',
    typographyRulePt: 'Sem legendas na base. Renderizar tela vertical em perspectiva isométrica de 35° à direita com tipografia calibre 17px em contraste bicolor.',
    typographyRuleEn: 'No bottom subtitles. Render vertical screen in 35-degree isometric tilt on the right with 17px bicolor contrast typography.',
    outputRulePt: 'Asymmetric Split 60/40: Apresentador à esquerda e card/carrossel espacial inclinado a 35° à direita.',
    outputRuleEn: 'Asymmetric 60/40 Split: Presenter on left and 35-degree tilted spatial card/carousel on right.',
    ptDesc: 'Telas verticais inclinadas flutuando ao lado com apresentador lateralizado.',
    enDesc: 'Tilted vertical screens floating on the side with presenter on the left.'
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
    label: 'Pele Humana Realista',
    ptDesc: 'Microtextura epidérmica real com poros visíveis',
    enDesc: 'authentic living human epidermal micro-geometry and visible pores',
    activeDefault: true
  },
  {
    key: 'pele_sss',
    label: 'Textura Orgânica PBR / SSS',
    ptDesc: 'Tecidos biológicos e espalhamento subsuperficial orgânico (SSS)',
    enDesc: 'natural organic subsurface scattering (SSS) and PBR biological realism',
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
    ptDesc: 'Biomecânica anatômica precisa, mandíbula estável sem estiramento',
    enDesc: 'anatomically accurate biomechanics, zero rubbery stretching or jaw warp',
    activeDefault: true
  },
  {
    key: 'anti_opaco',
    label: 'Alto Contraste & Vitalidade',
    ptDesc: 'Pretos profundos equilibrados com realces luminosos e vitalidade biológica',
    enDesc: 'cinematic high contrast with deep blacks and healthy biological skin vitality',
    activeDefault: true
  },
  {
    key: 'poros_suaves',
    label: 'Shallow Bokeh 85mm',
    ptDesc: 'Poros suaves otimizados para lente 85mm f/1.8 com fundo desfocado',
    enDesc: 'soft natural skin pores optimized for 85mm f/1.8 shallow bokeh optics',
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
  { id: 'personagem', token: '[ REFERENCIA PERSONAGEM ]', label: 'Slot 01: Identidade Facial/Corporal', requiredFor: ['voiceover', 'lipsync', 'video_to_video'], defaultActive: true },
  { id: 'elemento1', token: '[ REFERENCIA ELEMENTO 1 ]', label: 'Slot 02–04: Produtos / Gráficos', requiredFor: ['voiceover', 'video_to_video'], defaultActive: true },
  { id: 'cena', token: '[ REFERENCIA CENA ]', label: 'Slot 05: Cenário de Fundo Fixo', requiredFor: ['lipsync'], defaultActive: true },
  { id: 'voz', token: '[ REFERENCIA VOZ ]', label: 'Slot 06: Guia Isolada de Áudio', requiredFor: ['voiceover', 'lipsync', 'video_to_video'], defaultActive: true },
  { id: 'video_base', token: '[ REFERENCIA VIDEO BASE ]', label: 'Vídeo Base (Video-to-Video)', requiredFor: ['video_to_video'], defaultActive: true },
  { id: 'video_anterior', token: '[ REFERENCIA VIDEO ANTERIOR ]', label: 'Video Extend (Frame-Lock)', requiredFor: ['voiceover', 'lipsync', 'video_to_video'], defaultActive: false }
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
  tooltip5Words: string; // Exatamente 5 palavras em PT-BR (calibre 17px por 5s)
}

export interface PreferenceCategory {
  id: string;
  title: string;
  chips: PreferenceChip[];
}

/**
 * MATRIZ INTEGRAL DE ACORDEÕES DO RIGHT PANEL (100% DOS 15 GRUPOS)
 * Cada chip possui exatamente 5 palavras em PT-BR para o popup de 5 segundos.
 */
export const PREFERENCE_ACCORDIONS: PreferenceCategory[] = [
  {
    id: 'video_model_modes',
    title: '1. MODELO DE VÍDEO & MODOS MESTRES',
    chips: [
      { id: 'mod_humano_elem', label: 'Humano com Elementos', tooltip5Words: 'Apresentador real integrado com gráficos.' },
      { id: 'mod_fisiologia_3d', label: 'Fisiologia 3D Ultra-realista', tooltip5Words: 'Simulação biomédica interna ultra realista.' },
      { id: 'mod_personagem_3d', label: 'Personagem Estilizado 3D', tooltip5Words: 'Animação expressiva ilustrando hábitos cotidianos.' },
      { id: 'op_text_to_video', label: 'Text-to-Video', tooltip5Words: 'Geração autônoma total por texto.' },
      { id: 'op_image_to_video', label: 'Image-to-Video', tooltip5Words: 'Ancoragem visual mantendo imagem base.' },
      { id: 'op_video_to_video', label: 'Video-to-Video', tooltip5Words: 'Reestilização adicionando camadas espaciais profundas.' },
      { id: 'op_video_extend', label: 'Video Extend (Frame-Lock)', tooltip5Words: 'Continuação fluida travando último frame.' },
      { id: 'op_slot_01', label: 'Ref Slot 01 (Identidade)', tooltip5Words: 'Trava identidade facial e corporal.' },
      { id: 'op_slot_02_04', label: 'Ref Slot 02–04 (Produtos)', tooltip5Words: 'Injeção de produtos e gráficos.' },
      { id: 'op_slot_05', label: 'Ref Slot 05 (Cenário)', tooltip5Words: 'Aplicação de cenário fixo traseiro.' },
      { id: 'op_slot_06', label: 'Ref Slot 06 (Áudio)', tooltip5Words: 'Guia isolada sincronizando o áudio.' }
    ]
  },
  {
    id: 'special_transitions',
    title: '2. TRANSIÇÕES ESPECIAIS',
    chips: [
      { id: 'tr_whip_pan', label: 'Whip-Pan Motion Blur', tooltip5Words: 'Chicote veloz conectando dois ambientes.' },
      { id: 'tr_zaxis_pass', label: 'Z-Axis Pass-Through', tooltip5Words: 'Câmera atravessa card revelando cena.' },
      { id: 'tr_match_cut', label: 'Match-Cut Espacial', tooltip5Words: 'Troca fundo mantendo mesma postura.' },
      { id: 'tr_glass_wipe', label: 'Glass Shutter Wipe', tooltip5Words: 'Painel fosco desliza limpando quadro.' },
      { id: 'tr_light_flash', label: 'Light Flash Sub-Bass', tooltip5Words: 'Pulso luminoso com impacto grave.' }
    ]
  },
  {
    id: 'camera_distance_framing',
    title: '3. DISTÂNCIA, ENQUADRAMENTO & ÂNGULOS',
    chips: [
      { id: 'dist_macro_20cm', label: 'Distância Macro (20 cm)', tooltip5Words: 'Foco extremo desfocando fundo cinquenta.' },
      { id: 'dist_curta_1m', label: 'Distância Curta (1m)', tooltip5Words: 'Enquadramento fechado com alta presença.' },
      { id: 'dist_media_3m', label: 'Distância Média (3m)', tooltip5Words: 'Equilíbrio padrão entre corpo infográficos.' },
      { id: 'dist_inter_5m', label: 'Distância Intermediária (5m)', tooltip5Words: 'Visão ampla integrando bancada espaço.' },
      { id: 'dist_longa_10m', label: 'Distância Longa (10m)', tooltip5Words: 'Plano geral mostrando corpo inteiro.' },
      { id: 'fr_closeup', label: 'Close-Up Facial', tooltip5Words: 'Tórax acima com foco facial.' },
      { id: 'fr_medium_45', label: 'Medium Shot (Headroom 45%)', tooltip5Words: 'Espaço superior livre para painéis.' },
      { id: 'fr_split_60_40', label: 'Asymmetric Split 60/40', tooltip5Words: 'Apresentador lateral liberando espaço direito.' },
      { id: 'fr_mini_lower', label: 'Mini-Presenter Lower-Third', tooltip5Words: 'Apresentador reduzido sob grande painel.' },
      { id: 'fr_americano', label: 'Plano Americano', tooltip5Words: 'Cintura acima integrando bancada física.' },
      { id: 'fr_ots_esq', label: 'OTS Esquerdo (10% Blur)', tooltip5Words: 'Câmera traseira desfocando ombro esquerdo.' },
      { id: 'ang_frontal', label: 'Frontal Nível Olhos', tooltip5Words: 'Alinhamento direto gerando máxima autoridade.' },
      { id: 'ang_perfil_45_90', label: 'Perfil Dinâmico 45°/90°', tooltip5Words: 'Ângulo diagonal evidenciando volume espacial.' },
      { id: 'ang_plongee_contra', label: 'Plongée / Contra-Plongée', tooltip5Words: 'Ângulos verticais alterando perspectiva imponência.' },
      { id: 'bokeh_f18', label: 'Shallow Bokeh f/1.8', tooltip5Words: 'Fundo desfocado mantendo frente nítida.' }
    ]
  },
  {
    id: 'camera_movements',
    title: '4. MOVIMENTOS DE CÂMERA',
    chips: [
      { id: 'mov_orbital_tilt', label: '3D Orbital Arc + Tilt', tooltip5Words: 'Rotação diagonal revelando o horizonte.' },
      { id: 'mov_slow_pushin', label: 'Slow Push-In (Zoom In)', tooltip5Words: 'Aproximação contínua aumentando retenção visual.' },
      { id: 'mov_slow_pullout', label: 'Slow Pull-Out (Zoom Out)', tooltip5Words: 'Afastamento gradual revelando múltiplos elementos.' },
      { id: 'mov_snap_zoomout', label: 'Snap Zoom-Out (1,5s)', tooltip5Words: 'Recuo rápido quebrando ritmo visual.' },
      { id: 'mov_isometric_pan', label: 'Isometric Parallax Pan', tooltip5Words: 'Deslize lateral destacando volume gráfico.' },
      { id: 'mov_pedestal', label: 'Pedestal Float', tooltip5Words: 'Elevação vertical subindo aos gráficos.' },
      { id: 'mov_dolly_slider', label: 'Parallax Dolly Slider', tooltip5Words: 'Deslocamento horizontal revelando profundidade tridimensional.' },
      { id: 'mov_locked_anchor', label: 'Locked-Off Anchor', tooltip5Words: 'Câmera travada focando nos motions.' }
    ]
  },
  {
    id: 'scenarios_solar',
    title: '5. CENÁRIOS & ILUMINAÇÃO SOLAR',
    chips: [
      { id: 'sol_06h', label: 'Campo Aberto (Sol 06:00)', tooltip5Words: 'Luz solar dourada matinal direta.' },
      { id: 'sol_10h', label: 'Campo Aberto (Sol 10:00)', tooltip5Words: 'Iluminação natural limpa sombras médias.' },
      { id: 'sol_12h', label: 'Campo Aberto (Sol 12:00)', tooltip5Words: 'Luz zenital vertical alto contraste.' },
      { id: 'sol_17h', label: 'Campo Aberto (Sol 17:00)', tooltip5Words: 'Luz alaranjada entardecer sombras longas.' },
      { id: 'sol_filtrado', label: 'Campo Aberto Filtrado', tooltip5Words: 'Luz difusa vegetação áudio suave.' },
      { id: 'cen_studio', label: 'Studio Profissional', tooltip5Words: 'Fundo infinito iluminado sem eco.' },
      { id: 'cen_home_office', label: 'Home Office', tooltip5Words: 'Ambiente corporativo acolhedor luz suave.' },
      { id: 'cen_praia', label: 'Calçadão de Praia', tooltip5Words: 'Iluminação litorânea vibrante áudio suave.' },
      { id: 'cen_elevador', label: 'Elevador Metálico', tooltip5Words: 'Superfícies reflexivas para cortes rápidos.' },
      { id: 'cen_hb20s', label: 'Interior Hyundai HB20S', tooltip5Words: 'Habitáculo automotivo fechado luz natural.' }
    ]
  },
  {
    id: 'microphones_props',
    title: '6. MICROFONES & ACESSÓRIOS DE CENA',
    chips: [
      { id: 'mic_braco_baixo', label: 'Braço Articulado Baixo', tooltip5Words: 'Microfone broadcast fixado na bancada.' },
      { id: 'mic_moeda_mao', label: 'Microfone Moeda (Mão)', tooltip5Words: 'Cápsula magnética segura ao queixo.' },
      { id: 'mic_deadcat_mao', label: 'Lapela Deadcat (Mão)', tooltip5Words: 'Microfone com pelúcia segurado manualmente.' },
      { id: 'mic_lapela_gola', label: 'Lapela na Gola', tooltip5Words: 'Microfone discreto liberando as mãos.' },
      { id: 'mic_clean_frame', label: 'Clean Frame (Sem Mic)', tooltip5Words: 'Sem microfones mantendo imagem limpa.' },
      { id: 'prop_contexto', label: 'Objetos de Contexto', tooltip5Words: 'Elementos físicos reforçando tema central.' }
    ]
  },
  {
    id: 'spatial_architecture',
    title: '7. ARQUITETURA ESPACIAL (9:16)',
    chips: [
      { id: 'arq_top_hud', label: 'Top-Floating HUD', tooltip5Words: 'Gráficos suspensos acima linha visual.' },
      { id: 'arq_midground_z1', label: 'Z-Depth Midground (Z-1)', tooltip5Words: 'Elementos gráficos atrás do apresentador.' },
      { id: 'arq_fore_layer', label: 'Fore-Layer Interactive', tooltip5Words: 'Gráficos interativos frente do corpo.' },
      { id: 'arq_hibrido_split', label: 'Layout Híbrido Split', tooltip5Words: 'Canvas amplo superior apresentador reduzido.' },
      { id: 'arq_side_split', label: 'Side Perspective Split', tooltip5Words: 'Telas verticais inclinadas ao lado.' },
      { id: 'arq_bento_sup', label: 'Bento Grid Superior', tooltip5Words: 'Grade organizando dados técnicos visuais.' },
      { id: 'arq_popout_3d', label: 'Efeito Pop-Out 3D', tooltip5Words: 'Elemento salta fora da moldura.' }
    ]
  },
  {
    id: 'animations_motion',
    title: '8. ANIMAÇÕES & MOTION DESIGN',
    chips: [
      { id: 'ani_mini_cards', label: 'Mini Cards de Topo', tooltip5Words: 'Caixas compactas contendo dados rápidos.' },
      { id: 'ani_dataviz', label: 'Gráficos Data-Viz Dinâmicos', tooltip5Words: 'Curvas barras animadas com dados.' },
      { id: 'ani_passo_caixas', label: 'Passo a Passo Caixas', tooltip5Words: 'Blocos sequenciais numerados organizando etapas.' },
      { id: 'ani_barras_exp', label: 'Barras Horizontais Expansivas', tooltip5Words: 'Barras lineares crescendo na fala.' },
      { id: 'ani_icones_gif', label: 'Ícones Animados (GIF-Style)', tooltip5Words: 'Microelementos vetoriais pulsando em loop.' },
      { id: 'ani_film_strip', label: 'Film Strip 9:16 (Rolo)', tooltip5Words: 'Sequência vertical deslizando continuamente tela.' },
      { id: 'ani_carrossel_916', label: 'Carrossel Espacial 9:16', tooltip5Words: 'Três telas translúcidas em perspectiva.' },
      { id: 'ani_laser_border', label: 'Laser Border Trace', tooltip5Words: 'Fio luminoso desenhando bordas card.' },
      { id: 'ani_spring_pop', label: 'Spring Pop-In', tooltip5Words: 'Entrada dinâmica com física mola.' },
      { id: 'ani_staggered', label: 'Staggered Cascade', tooltip5Words: 'Entrada sequencial compassada dos itens.' },
      { id: 'ani_exploded_3d', label: '3D Exploded Layering', tooltip5Words: 'Decomposição tridimensional em planos paralelos.' }
    ]
  },
  {
    id: 'textures_borders',
    title: '9. TEXTURAS, BORDAS & ACABAMENTOS',
    chips: [
      { id: 'tex_glass_14110f', label: 'Glassmorphism Fosco (#14110F)', tooltip5Words: 'Vidro escuro com desfoque traseiro.' },
      { id: 'tex_deep_space', label: 'Deep Space Glass', tooltip5Words: 'Vidro azulado com aspecto tecnológico.' },
      { id: 'tex_capsula_1e1916', label: 'Cápsula Interna (#1E1916)', tooltip5Words: 'Sub-card com gradiente quente inferior.' },
      { id: 'tex_pbr_organica', label: 'Textura Orgânica PBR', tooltip5Words: 'Tecidos biológicos úmidos ultra realistas.' },
      { id: 'tex_pele_real', label: 'Pele Humana Realista', tooltip5Words: 'Microtextura epidérmica com poros visíveis.' },
      { id: 'brd_hairline_1px', label: '1px Hairline Border', tooltip5Words: 'Linha ultrafina com contorno reflexivo.' },
      { id: 'brd_ouro_champ', label: 'Filete Dourado Champagne', tooltip5Words: 'Borda metálica fina brilho dourado.' },
      { id: 'brd_prata_titanio', label: 'Filete Prateado Titânio', tooltip5Words: 'Traço metálico frio alta precisão.' },
      { id: 'brd_ambar_cobre', label: 'Filete Âmbar Acobreado', tooltip5Words: 'Contorno translúcido para paletas quentes.' },
      { id: 'brd_cantos_10_20', label: 'Cantos Arredondados (10–20px)', tooltip5Words: 'Curvatura suave nos painéis gráficos.' },
      { id: 'brd_drop_shadow', label: 'Soft Ambient Drop Shadow', tooltip5Words: 'Sombra difusa descolando do fundo.' }
    ]
  },
  {
    id: 'lighting_typography',
    title: '10. ILUMINAÇÃO & TIPOGRAFIA (17PX)',
    chips: [
      { id: 'luz_chiaroscuro', label: 'Chiaroscuro Studio', tooltip5Words: 'Foco facial com laterais escurecidas.' },
      { id: 'luz_warm_golden', label: 'Luz Quente (Âmbar/Golden)', tooltip5Words: 'Tonalidade dourada transmitindo conforto proximidade.' },
      { id: 'luz_daylight_fria', label: 'Luz Fria (Daylight Clínica)', tooltip5Words: 'Iluminação clara transmitindo precisão médica.' },
      { id: 'luz_ciano_biotec', label: 'Luz Ciano Biotec', tooltip5Words: 'Atmosfera fria para linguagem científica.' },
      { id: 'luz_neon_bicolor', label: 'Néon Bicolor', tooltip5Words: 'Recortes luminosos magenta e azul.' },
      { id: 'luz_rim_light', label: 'Rim Light de Recorte', tooltip5Words: 'Feixe traseiro destacando os ombros.' },
      { id: 'luz_light_spill', label: 'Light Spill Diegético', tooltip5Words: 'Reflexo luminoso real no corpo.' },
      { id: 'luz_alto_contraste', label: 'Alto Contraste Cinematográfico', tooltip5Words: 'Pretos profundos com realces luminosos.' },
      { id: 'typ_17px', label: 'Calibre Técnico 17px', tooltip5Words: 'Tamanho ideal para leitura móvel.' },
      { id: 'typ_sans_inter', label: 'Sans-Serif Fina (Inter/SF)', tooltip5Words: 'Tipografia limpa sem serifa moderna.' },
      { id: 'typ_caixa_alta', label: 'Títulos em Caixa Alta', tooltip5Words: 'Categorias destacadas com letras espaçadas.' },
      { id: 'typ_caixa_baixa', label: 'Rótulos em Caixa Baixa', tooltip5Words: 'Textos secundários em estilo minimalista.' },
      { id: 'typ_bicolor', label: 'Contraste Bicolor', tooltip5Words: 'Destaque alternando branco cor temática.' },
      { id: 'typ_traseiro_z1', label: 'Texto Traseiro Z-1', tooltip5Words: 'Palavras gigantes atrás da cabeça.' },
      { id: 'typ_lettering_3d', label: 'Motion Lettering Frontal', tooltip5Words: 'Tipografia tridimensional no primeiro plano.' },
      { id: 'typ_zero_texto', label: 'Modo Zero-Texto', tooltip5Words: 'Supressão textual focando visual puro.' }
    ]
  },
  {
    id: 'voice_acoustics_biomech',
    title: '11. VOZ, ACÚSTICA & BIOMECÂNICA',
    chips: [
      { id: 'voz_trava_zero', label: 'Trava Labial Frame-Zero', tooltip5Words: 'Lábios selados desde frame zero.' },
      { id: 'voz_exp_mapeadas', label: 'Expressões Mapeadas', tooltip5Words: 'Microexpressões alinhadas ao tom narrativo.' },
      { id: 'voz_acoes_sutis', label: 'Ações Físicas Sutis', tooltip5Words: 'Movimentos naturais sem exageros corporais.' },
      { id: 'voz_dry_broadcast', label: 'Acústica Dry Broadcast', tooltip5Words: 'Áudio tratado sem reverberação eco.' },
      { id: 'voz_ptbr_culta', label: 'Pronúncia PT-BR Culta', tooltip5Words: 'Dicção neutra sem sotaque regional.' },
      { id: 'voz_ritmo_10s', label: 'Calculadora Ritmo (10s)', tooltip5Words: 'Cadência ideal para dez segundos.' },
      { id: 'voz_foley_ui', label: 'Foley de Interface', tooltip5Words: 'Sons sutis acompanhando animações gráficas.' },
      { id: 'voz_ducking_20db', label: 'Audio Ducking (-20dB)', tooltip5Words: 'Sons reduzidos destacando voz principal.' },
      { id: 'bio_seguranca', label: 'Perfil 1: Segurança', tooltip5Words: 'Olhar direto transmitindo autoridade total.' },
      { id: 'bio_empatia', label: 'Perfil 2: Empatia', tooltip5Words: 'Inclinação suave demonstrando escuta ativa.' },
      { id: 'bio_simpatia', label: 'Perfil 3: Simpatia (S/ Dentes)', tooltip5Words: 'Sorriso nos olhos sem dentes.' },
      { id: 'bio_hilario', label: 'Perfil 4: Hilário Elegante', tooltip5Words: 'Leveza contida sem exageros faciais.' },
      { id: 'bio_preocupado', label: 'Perfil 5: Preocupado Clínico', tooltip5Words: 'Cenho analítico focado no diagnóstico.' },
      { id: 'bio_reflexivo', label: 'Perfil 6: Reflexivo', tooltip5Words: 'Cadência pausada sugerindo raciocínio denso.' }
    ]
  }
];