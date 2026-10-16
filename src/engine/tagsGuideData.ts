/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Guia Técnico Completo de Tags — Super-Skill Omni Video Director Pro
 * Cada tag possui: Grupo, Nome, Explicação curta e 5 Exemplos Comuns de Uso
 */

export interface TagGuideItem {
  id: string;
  groupId: string;
  groupTitle: string;
  name: string;
  explanation: string;
  whenToUse: [string, string, string, string, string];
}

export const TAGS_GUIDE_CATALOG: TagGuideItem[] = [
  // 1. MODELO DE VÍDEO & MODOS MESTRES
  {
    id: 'mod_humano_elem',
    groupId: 'video_model_modes',
    groupTitle: '1. Modelo de Vídeo & Modos Mestres',
    name: 'Humano com Elementos',
    explanation: 'Apresentador real em cena interagindo com camadas gráficas, infográficos e dados flutuantes.',
    whenToUse: [
      'Vídeos institucionais e tutoriais médicos.',
      'Apresentação de métricas com cards de dados.',
      'Explicação de produtos com mockups ao lado.',
      'Vídeos de vendas com autoridade técnica.',
      'Conteúdo educativo com esquemas passo a passo.'
    ]
  },
  {
    id: 'mod_fisiologia_3d',
    groupId: 'video_model_modes',
    groupTitle: '1. Modelo de Vídeo & Modos Mestres',
    name: 'Fisiologia 3D Ultra-realista',
    explanation: 'Simulação biomédica interna em CGI com PBR, dispersão subsuperficial (SSS) e callouts técnicos.',
    whenToUse: [
      'Visualização de inflamação e permeabilidade vascular.',
      'Demonstração de transporte molecular em membranas celulares.',
      'Exibição de neurotransmissores na fenda sináptica.',
      'Mecanismos de ação de suplementos ou medicamentos.',
      'Impacto do estresse oxidativo e acúmulo de colágeno.'
    ]
  },
  {
    id: 'mod_personagem_3d',
    groupId: 'video_model_modes',
    groupTitle: '1. Modelo de Vídeo & Modos Mestres',
    name: 'Personagem Estilizado 3D',
    explanation: 'Animação 3D com expressividade estilizada para ilustrar hábitos cotidianos e rotinas.',
    whenToUse: [
      'Storytelling descontraído de hábitos do paciente.',
      'Metáforas visuais para conceitos complexos.',
      'Vídeos dinâmicos para público jovem ou leigo.',
      'Demonstração de rotinas matinais e sono.',
      'Situações cômicas ou dramáticas sem ator real.'
    ]
  },
  {
    id: 'op_text_to_video',
    groupId: 'video_model_modes',
    groupTitle: '1. Modelo de Vídeo & Modos Mestres',
    name: 'Text-to-Video',
    explanation: 'Geração autônoma completa a partir de descrição de texto sem âncoras prévias.',
    whenToUse: [
      'Criação de novos cenários do zero.',
      'Conceitualização inicial sem material gravado.',
      'Vídeos conceituais puramente abstratos.',
      'Geração rápida de ideias visuais.',
      'Cenas de transição ou paisagens puras.'
    ]
  },
  {
    id: 'op_image_to_video',
    groupId: 'video_model_modes',
    groupTitle: '1. Modelo de Vídeo & Modos Mestres',
    name: 'Image-to-Video (Voiceover)',
    explanation: 'Ancoragem visual mantendo a imagem base intacta, lábios 100% selados e narração off.',
    whenToUse: [
      'Vídeos com imagem estática do especialista.',
      'B-rolls de alta fidelidade visual com narração.',
      'Cenas onde o foco é o infográfico e não a fala.',
      'Impedir distorções labiais em fotos profissionais.',
      'Vídeos baseados em fotos de consultório ou clínica.'
    ]
  },
  {
    id: 'op_video_to_video',
    groupId: 'video_model_modes',
    groupTitle: '1. Modelo de Vídeo & Modos Mestres',
    name: 'Video-to-Video',
    explanation: 'Reestilização e adição de camadas espaciais e dados preservando a cadência do vídeo original.',
    whenToUse: [
      'Inserir cards flutuantes em vídeo já gravado.',
      'Trocar o fundo de uma gravação mantendo a fala.',
      'Melhorar iluminação e contraste de gravação simples.',
      'Adicionar efeito 3D em vídeo existente.',
      'Padronizar estilo visual de gravações caseiras.'
    ]
  },
  {
    id: 'op_video_extend',
    groupId: 'video_model_modes',
    groupTitle: '1. Modelo de Vídeo & Modos Mestres',
    name: 'Video Extend (Frame-Lock)',
    explanation: 'Continuação fluida de vídeo travando exatamente o último frame da cena anterior.',
    whenToUse: [
      'Transição entre Blocos 1 e 2 sem jump-cut.',
      'Continuidade de raciocínio em múltiplos takes.',
      'Manter a mesma roupa e postura do apresentador.',
      'Transição de câmera orbital contínua.',
      'Mudança suave de tema sem corte abrupto.'
    ]
  },

  // 2. TRANSIÇÕES ESPECIAIS
  {
    id: 'tr_whip_pan',
    groupId: 'special_transitions',
    groupTitle: '2. Transições Especiais',
    name: 'Whip-Pan Motion Blur',
    explanation: 'Chicote veloz com desfoque de movimento conectando instantaneamente dois ambientes.',
    whenToUse: [
      'Mudança rápida do consultório para o laboratório.',
      'Corte de alta energia entre o problema e a solução.',
      'Quebra de ritmo em ganchos narrativos curtos.',
      'Transição dinâmica entre dois tópicos diferentes.',
      'Acelerar a narrativa mantendo dinamismo mobile.'
    ]
  },
  {
    id: 'tr_zaxis_pass',
    groupId: 'special_transitions',
    groupTitle: '2. Transições Especiais',
    name: 'Z-Axis Pass-Through',
    explanation: 'A câmera avança atravessando um card gráfico translúcido e revelando a próxima cena.',
    whenToUse: [
      'Mergulho em um gráfico para mostrar a causa biológica.',
      'Transição entre a introdução e o conteúdo denso.',
      'Efeito de portal entre macro e microscópico.',
      'Revelação de dados antes ocultos.',
      'Transição sofisticada em vídeos institucionais.'
    ]
  },
  {
    id: 'tr_match_cut',
    groupId: 'special_transitions',
    groupTitle: '2. Transições Especiais',
    name: 'Match-Cut Espacial',
    explanation: 'Troca instantânea de cenário mantendo rigorosamente a mesma postura corporal.',
    whenToUse: [
      'Apresentador fala no escritório e aparece na praia.',
      'Comparativo "Antes e Depois" do tratamento.',
      'Mudança de clima ou época mantendo o raciocínio.',
      'Demonstrar versatilidade de um protocolo.',
      'Efeito cinematográfico de autoridade ubíqua.'
    ]
  },
  {
    id: 'tr_glass_wipe',
    groupId: 'special_transitions',
    groupTitle: '2. Transições Especiais',
    name: 'Glass Shutter Wipe',
    explanation: 'Painel de vidro fosco desliza suavemente sobre o quadro limpando a cena anterior.',
    whenToUse: [
      'Conclusão de uma etapa e início do próximo passo.',
      'Transição limpa em conteúdos corporativos sérios.',
      'Remoção de dados antigos para novos números.',
      'Troca de ato com sobriedade clínica.',
      'Fechamento com Call-to-Action final.'
    ]
  },
  {
    id: 'tr_light_flash',
    groupId: 'special_transitions',
    groupTitle: '2. Transições Especiais',
    name: 'Light Flash Sub-Bass',
    explanation: 'Pulso luminoso branco rápido sincronizado a impacto sonoro grave no áudio.',
    whenToUse: [
      'Revelação do gancho principal no segundo 0:03.',
      'Momento de alerta de perigo para a saúde.',
      'Impacto na apresentação de um dado chocante.',
      'Corte no drop de música em reels/tiktoks.',
      'Destaque no nome da solução clínica.'
    ]
  },

  // 3. DISTÂNCIA, ENQUADRAMENTO & ÂNGULOS
  {
    id: 'dist_macro_20cm',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Distância Macro (20 cm)',
    explanation: 'Foco extremo e próximo a 20 cm do objeto com 50% de desfoque de fundo.',
    whenToUse: [
      'Foco cirúrgico em cápsula, seringa ou frasco.',
      'Destaque na textura de um tecido celular.',
      'Olhar detalhado de exame laboratorial.',
      'Apresentação macro de produto em cosmética.',
      'Close no detalhe de um ingrediente ativo.'
    ]
  },
  {
    id: 'dist_curta_1m',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Distância Curta (1m)',
    explanation: 'Enquadramento próximo do apresentador a 1 metro, gerando forte presença e conexão.',
    whenToUse: [
      'Fala de advertência direta ao espectador.',
      'Gancho de abertura de forte autoridade.',
      'Momento de escuta empática e acolhimento.',
      'Vídeos gravados para smartphone (Reels/Shorts).',
      'Confidência ou revelação de segredo clínico.'
    ]
  },
  {
    id: 'dist_media_3m',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Distância Média (3m)',
    explanation: 'Enquadramento padrão de 3 metros equilibrando torso e espaço para infográficos.',
    whenToUse: [
      'Padrão áureo para apresentadores de autoridade.',
      'Espaço ideal para exibir cards flutuantes.',
      'Vídeos explicativos com gesticulação controlada.',
      'Apresentação de casos com slides ao lado.',
      'Cena principal da maioria das aulas gravadas.'
    ]
  },
  {
    id: 'dist_inter_5m',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Distância Intermediária (5m)',
    explanation: 'Visão ampla integrando bancada de trabalho, sala e espaço circundante.',
    whenToUse: [
      'Apresentador em pé caminhando pelo estúdio.',
      'Exibição do consultório moderno e equipamentos.',
      'Cenas de equipe ou interação com paciente.',
      'Aberturas de vídeo institucionais de clínicas.',
      'Transição entre bancada e quadro digital.'
    ]
  },
  {
    id: 'dist_longa_10m',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Distância Longa (10m)',
    explanation: 'Plano geral a 10 metros mostrando corpo inteiro imerso na paisagem ou ambiente amplo.',
    whenToUse: [
      'Apresentador caminhando em parque ou campo aberto.',
      'Encerramento reflexivo com afastamento da cena.',
      'Estabelecer o local de um hospital ou centro de saúde.',
      'Vídeos de estilo de vida e longevidade ao ar livre.',
      'Cenas de abertura que contextualizam liberdade.'
    ]
  },
  {
    id: 'fr_closeup',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Close-Up Facial (85mm)',
    explanation: 'Do tórax para cima com foco absoluto no olhar e nas microexpressões faciais.',
    whenToUse: [
      'Ganchos emocionais intensos.',
      'Frases impactantes que exigem seriedade máxima.',
      'Explicação de dor ou sintoma do paciente.',
      'Desfecho conclusivo com olhar fixo na lente.',
      'Eliminar distrações de fundo para foco 100% verbal.'
    ]
  },
  {
    id: 'fr_medium_45',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Medium Shot (Headroom 45%)',
    explanation: 'Espaço superior amplo (45%) reservado especificamente para painéis e cards gráficos.',
    whenToUse: [
      'Cenas com Top-Floating HUD sobre a cabeça.',
      'Exibição de Bento Grid superior.',
      'Títulos em caixa alta projetados no teto virtual.',
      'Dados estatísticos e gráficos percentuais no topo.',
      'Layout clássico de reels educativos de alto nível.'
    ]
  },
  {
    id: 'fr_split_60_40',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Asymmetric Split 60/40',
    explanation: 'Apresentador posicionado em 60% à esquerda, liberando 40% em perspectiva à direita.',
    whenToUse: [
      'Exibição de telas verticais com infográficos.',
      'Mockups de exames laboratoriais comentados.',
      'Demonstração de aplicativos ou prontuários.',
      'Comparativo lado a lado de condutas médicas.',
      'Visual moderno de podcast corporativo.'
    ]
  },
  {
    id: 'fr_ots_esq',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'OTS Esquerdo (10% Blur)',
    explanation: 'Câmera por trás das costas desfocando o ombro esquerdo e focando o objeto frontal.',
    whenToUse: [
      'Médico olhando para tela de tomografia.',
      'Perspectiva de consulta em primeira pessoa.',
      'Demonstração de procedimento na bancada.',
      'Sensação de testemunha ocular no consultório.',
      'Diálogo com paciente em segundo plano.'
    ]
  },
  {
    id: 'ang_frontal',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Frontal Nível dos Olhos',
    explanation: 'Câmera alinhada horizontalmente aos olhos, gerando transparência, conexão e autoridade.',
    whenToUse: [
      'Cena 1 (Abertura obrigatória de conexão).',
      'Declarações oficiais e diagnósticos claros.',
      'Construção de confiança imediata com o paciente.',
      'Vídeos que não exigem movimento de câmera.',
      'Fechamento com compromisso com a verdade.'
    ]
  },
  {
    id: 'bokeh_f18',
    groupId: 'camera_distance_framing',
    groupTitle: '3. Distância, Enquadramento & Ângulos',
    name: 'Shallow Bokeh f/1.8',
    explanation: 'Desfoque óptico cremoso de fundo mantendo o apresentador em nitidez extrema.',
    whenToUse: [
      'Isolar o profissional de fundo poluído.',
      'Dar visual cinematográfico e caro à produção.',
      'Destacar iluminação quente em círculos de luz.',
      'Cenas intimistas de consultório nobre.',
      'Eliminar a sensação de vídeo amador ou webcam.'
    ]
  },

  // 4. MOVIMENTOS DE CÂMERA
  {
    id: 'mov_slow_pushin',
    groupId: 'camera_movements',
    groupTitle: '4. Movimentos de Câmera',
    name: 'Slow Push-In (Zoom In)',
    explanation: 'Aproximação lenta e suave em direção aos olhos aumentando foco e retenção visual.',
    whenToUse: [
      'Cena 2 logo após o gancho de abertura.',
      'Momento em que o segredo clínico é revelado.',
      'Aumento da gravidade de um sintoma de saúde.',
      'Prender a atenção antes do clímax do vídeo.',
      'Transição de raciocínio lógico profundo.'
    ]
  },
  {
    id: 'mov_slow_pullout',
    groupId: 'camera_movements',
    groupTitle: '4. Movimentos de Câmera',
    name: 'Slow Pull-Out (Zoom Out)',
    explanation: 'Afastamento gradual e suave revelando múltiplos elementos e o ambiente ao redor.',
    whenToUse: [
      'Revelar que o médico está cercado de dados.',
      'Conclusão de raciocínio mostrando o quadro geral.',
      'Encerramento do vídeo com tranquilidade.',
      'Apresentar o consultório após a fala de abertura.',
      'Alívio de tensão após explicação intensa.'
    ]
  },
  {
    id: 'mov_orbital_tilt',
    groupId: 'camera_movements',
    groupTitle: '4. Movimentos de Câmera',
    name: '3D Orbital Arc + Tilt',
    explanation: 'Giro diagonal em arco com leve inclinação vertical revelando profundidade e horizonte.',
    whenToUse: [
      'Cenas de campo aberto ao amanhecer ou entardecer.',
      'Vídeos de alto dinamismo para anúncios.',
      'Destacar a tridimensionalidade de cenários de estúdio.',
      'Transição marcante entre a teoria e a prática.',
      'Aberturas épicas de cursos ou documentários.'
    ]
  },
  {
    id: 'mov_isometric_pan',
    groupId: 'camera_movements',
    groupTitle: '4. Movimentos de Câmera',
    name: 'Isometric Parallax Pan',
    explanation: 'Deslize lateral em velocidade constante destacando o volume entre apresentador e gráficos.',
    whenToUse: [
      'Apresentação de linha do tempo ou etapas.',
      'Vídeos com múltiplos cards flutuando em camadas.',
      'Passagem por gráficos comparativos.',
      'Manter dinamismo enquanto o texto é lido.',
      'Estilo estético de infografia moderna.'
    ]
  },
  {
    id: 'mov_dolly_slider',
    groupId: 'camera_movements',
    groupTitle: '4. Movimentos de Câmera',
    name: 'Parallax Dolly Slider',
    explanation: 'Deslocamento horizontal da câmera em trilho revelando profundidade entre camadas.',
    whenToUse: [
      'Apresentador falando com objetos em primeiro plano.',
      'Passagem suave diante de bancada de consultório.',
      'Sensação de cinema com câmera física no set.',
      'Cenas longas de até 20s para evitar monotonia.',
      'Efeito premium em estúdio amadeirado.'
    ]
  },
  {
    id: 'mov_locked_anchor',
    groupId: 'camera_movements',
    groupTitle: '4. Movimentos de Câmera',
    name: 'Locked-Off Anchor (Estático)',
    explanation: 'Câmera absolutamente fixa no tripé concentrando 100% da atenção nos motions e na fala.',
    whenToUse: [
      'Vídeos com animações complexas que já se movem.',
      'Fala com alto número de dados técnicos.',
      'Garantir estabilidade total entre cortes de IA.',
      'Conteúdo acadêmico ou científico formal.',
      'Evitar náusea visual quando há muitos elementos.'
    ]
  },

  // 5. CENÁRIOS & ILUMINAÇÃO SOLAR
  {
    id: 'sol_17h',
    groupId: 'scenarios_solar',
    groupTitle: '5. Cenários & Iluminação Solar',
    name: 'Campo Aberto (Sol 17:00)',
    explanation: 'Luz natural alaranjada do entardecer com sombras longas e atmosfera acolhedora.',
    whenToUse: [
      'Vídeos sobre longevidade e estilo de vida.',
      'Reflexões sobre hábitos diários e descanso.',
      'Storytelling motivacional de superação.',
      'Apresentação de benefícios de saúde ao ar livre.',
      'Encerramento sereno de jornada médica.'
    ]
  },
  {
    id: 'cen_studio',
    groupId: 'scenarios_solar',
    groupTitle: '5. Cenários & Iluminação Solar',
    name: 'Studio Profissional Minimalista',
    explanation: 'Fundo infinito iluminado, minimalista e com isolamento acústico sem reverberação.',
    whenToUse: [
      'Apresentação de marcas e lançamentos de autoridade.',
      'Aulas de cursos com visual limpo e elegante.',
      'Foco total em infográficos sem ruído de fundo.',
      'Padronização de canal de YouTube ou TikTok.',
      'Vídeos com luzes néon ou chiaroscuro dramático.'
    ]
  },
  {
    id: 'cen_home_office',
    groupId: 'scenarios_solar',
    groupTitle: '5. Cenários & Iluminação Solar',
    name: 'Home Office / Consultório Moderno',
    explanation: 'Ambiente amadeirado nobre com estante, luz quente suave e livros ao fundo.',
    whenToUse: [
      'Consultas informais e dicas práticas de saúde.',
      'Construção de autoridade intelectual com livros.',
      'Sensação de proximidade e confiança pessoal.',
      'Vídeos gravados para redes sociais sem frieza.',
      'Respostas a dúvidas de seguidores e pacientes.'
    ]
  },

  // 6. MICROFONES & ACESSÓRIOS DE CENA
  {
    id: 'mic_braco_baixo',
    groupId: 'microphones_props',
    groupTitle: '6. Microfones & Acessórios de Cena',
    name: 'Braço Articulado Baixo (Broadcast)',
    explanation: 'Microfone profissional estilo Shure fixado discretamente na bancada sem cobrir o rosto.',
    whenToUse: [
      'Formato podcast ou mesa redonda médica.',
      'Demonstrar alta produção de áudio broadcast.',
      'Vídeos de estúdio com presença imponente.',
      'Cenas de entrevistas ou bate-papo técnico.',
      'Compor ambiente de autoridade corporativa.'
    ]
  },
  {
    id: 'mic_moeda_mao',
    groupId: 'microphones_props',
    groupTitle: '6. Microfones & Acessórios de Cena',
    name: 'Microfone Moeda (Mão)',
    explanation: 'Cápsula magnética circular segura com a ponta dos dedos rente ao queixo.',
    whenToUse: [
      'Estilo dinâmico moderno de TikTok e Reels.',
      'Entrevistas rápidas em eventos ou corredores.',
      'Vídeos gravados em pé de forma ágil.',
      'Criar sensação de espontaneidade intencional.',
      'Comunicação direta com a audiência jovem.'
    ]
  },
  {
    id: 'mic_clean_frame',
    groupId: 'microphones_props',
    groupTitle: '6. Microfones & Acessórios de Cena',
    name: 'Clean Frame (Sem Mic Aparente)',
    explanation: 'Quadro 100% limpo sem nenhum microfone visível, simulando captação boom de cinema.',
    whenToUse: [
      'Vídeos cinematográficos de alta fidelidade.',
      'Simulações onde microfone quebraria a imersão.',
      'Cenas de campo aberto ou paisagens naturais.',
      'Comerciais de alto orçamento.',
      'Foco exclusivo na fisionomia do especialista.'
    ]
  },

  // 7. ARQUITETURA ESPACIAL (9:16)
  {
    id: 'arq_top_hud',
    groupId: 'spatial_architecture',
    groupTitle: '7. Arquitetura Espacial (9:16)',
    name: 'Top-Floating HUD',
    explanation: 'Painéis e cards suspensos no terço superior do vídeo (10-25% do topo) sem cobrir a face.',
    whenToUse: [
      'Exibição de percentuais e alertas rápidos.',
      'Título do vídeo destacado continuamente.',
      'Passo a passo numerado durante a fala.',
      'Manter o rosto do médico 100% visível embaixo.',
      'Formato ideal para rolagem no Instagram e TikTok.'
    ]
  },
  {
    id: 'arq_midground_z1',
    groupId: 'spatial_architecture',
    groupTitle: '7. Arquitetura Espacial (9:16)',
    name: 'Z-Depth Midground (Z-1)',
    explanation: 'Elementos gráficos e infográficos tridimensionais posicionados atrás do apresentador.',
    whenToUse: [
      'Palavras gigantes que reforçam conceitos-chave.',
      'Infográficos 3D de DNA ou células atrás do corpo.',
      'Sensação de palco volumétrico tridimensional.',
      'Impedir qualquer sobreposição de card no rosto.',
      'Visual moderno de talk-shows de tecnologia.'
    ]
  },
  {
    id: 'arq_side_split',
    groupId: 'spatial_architecture',
    groupTitle: '7. Arquitetura Espacial (9:16)',
    name: 'Side Perspective Split',
    explanation: 'Telas verticais inclinadas a 35° flutuando ao lado do apresentador em perspectiva.',
    whenToUse: [
      'Exibição de prints de artigos científicos ou PubMed.',
      'Demonstração de lâminas ou exames de sangue.',
      'Apresentação de casos com fotos de antes/depois.',
      'Telas de software ou prontuário eletrônico.',
      'Vídeos que demandam prova documental visível.'
    ]
  },

  // 8. ANIMAÇÕES & MOTION DESIGN
  {
    id: 'ani_mini_cards',
    groupId: 'animations_motion',
    groupTitle: '8. Animações & Motion Design',
    name: 'Mini Cards Flutuantes de Topo',
    explanation: 'Caixas compactas suspensas que entram com dados rápidos sincronizados à fala.',
    whenToUse: [
      'Apresentação de 3 causas de um sintoma.',
      'Destaque de dosagens ou recomendações.',
      'Lista de alimentos anti-inflamatórios.',
      'Gatilhos rápidos de curiosidade.',
      'Organizar pensamentos em 3 pilares rápidos.'
    ]
  },
  {
    id: 'ani_dataviz',
    groupId: 'animations_motion',
    groupTitle: '8. Animações & Motion Design',
    name: 'Gráficos Data-Viz Dinâmicos',
    explanation: 'Barras e curvas que se desenham suavemente sincronizadas à narração dos números.',
    whenToUse: [
      'Queda de inflamação ao longo das semanas.',
      'Aumento da taxa de remissão de doenças.',
      'Comparativo estatístico de grupos clínicos.',
      'Evolução de biomarcadores sanguíneos.',
      'Comprovação científica de eficácia.'
    ]
  },
  {
    id: 'ani_carrossel_916',
    groupId: 'animations_motion',
    groupTitle: '8. Animações & Motion Design',
    name: 'Carrossel Espacial 9:16',
    explanation: 'Três telas verticais translúcidas flutuando em perspectiva e rotacionando conforme o tópico.',
    whenToUse: [
      'Exibição de 3 fases de um tratamento.',
      'Comparação entre 3 classes de medicamentos.',
      'Apresentação de 3 produtos ou suplementos.',
      'Histórico de evolução do caso clínico.',
      'Efeito visual moderno que amplia o tempo de tela.'
    ]
  },

  // 9. TEXTURAS, BORDAS & ACABAMENTOS
  {
    id: 'tex_glass_14110f',
    groupId: 'textures_borders',
    groupTitle: '9. Texturas, Bordas & Acabamentos',
    name: 'Glassmorphism Fosco (#14110F)',
    explanation: 'Vidro translúcido escuro (88% opacidade) com desfoque de fundo e reflexos suaves.',
    whenToUse: [
      'Padrão elegante para todos os cards gráficos.',
      'Evitar blocos pretos opacos que pesam a cena.',
      'Harmonização com iluminação quente de fundo.',
      'Visual moderno sem parecer amador.',
      'Garantir leitura do texto com contraste perfeito.'
    ]
  },
  {
    id: 'brd_hairline_1px',
    groupId: 'textures_borders',
    groupTitle: '9. Texturas, Bordas & Acabamentos',
    name: '1px Hairline Border',
    explanation: 'Contorno ultrafino com acabamento reflexivo que define os limites dos painéis.',
    whenToUse: [
      'Separar sutilmente cards do fundo escuro.',
      'Acabamento premium de design corporativo.',
      'Evitar bordas grossas infantis.',
      'Manter leveza estética em resolução 2K/4K.',
      'Enfatizar o requinte técnico da produção.'
    ]
  },

  // 10. ILUMINAÇÃO & TIPOGRAFIA (17PX)
  {
    id: 'luz_warm_golden',
    groupId: 'lighting_typography',
    groupTitle: '10. Iluminação & Tipografia (17px)',
    name: 'Luz Quente (Âmbar/Golden)',
    explanation: 'Tonalidade dourada que transmite acolhimento humano, autoridade e realça tons de pele.',
    whenToUse: [
      'Médicos que desejam transmitir empatia e confiança.',
      'Cenas de consultório amadeirado.',
      'Evitar o aspecto de frieza hospitalar estéril.',
      'Harmonizar com o motor de textura de pele viva.',
      'Vídeos de conselhos de saúde e bem-estar.'
    ]
  },
  {
    id: 'luz_daylight_fria',
    groupId: 'lighting_typography',
    groupTitle: '10. Iluminação & Tipografia (17px)',
    name: 'Luz Fria (Daylight Clínica 5600K)',
    explanation: 'Iluminação neutra, límpida e precisa transmitindo rigor cirúrgico e precisão diagnóstica.',
    whenToUse: [
      'Explicações de procedimentos cirúrgicos ou exames.',
      'Demonstração de biópsias e patologia.',
      'Conteúdos de imunologia e farmacologia.',
      'Ambientes de laboratório de alta tecnologia.',
      'Posicionamento de precisão técnica absoluta.'
    ]
  },
  {
    id: 'typ_17px',
    groupId: 'lighting_typography',
    groupTitle: '10. Iluminação & Tipografia (17px)',
    name: 'Calibre Técnico 17px',
    explanation: 'Dimensão tipográfica calibrada para perfeita legibilidade vertical (9:16) em telas de celular.',
    whenToUse: [
      'Rótulos e callouts anatômicos em 3D.',
      'Textos explicativos de cards flutuantes.',
      'Legendas e notas técnicas de rodapé.',
      'Garantir leitura sem forçar a vista do usuário.',
      'Padrão áureo de interface mobile moderna.'
    ]
  },

  // 11. VOZ, ACÚSTICA & BIOMECÂNICA
  {
    id: 'voz_dry_broadcast',
    groupId: 'voice_acoustics_biomech',
    groupTitle: '11. Voz, Acústica & Biomecânica',
    name: 'Acústica Dry Broadcast',
    explanation: 'Tratamento de áudio sem reverberação ou eco de sala, com clareza vocal e graves redondos.',
    whenToUse: [
      'Padrão essencial para todo conteúdo que ensina.',
      'Evitar a sensação de sala vazia ou áudio de celular.',
      'Melhorar retenção em ouvintes com fone de ouvido.',
      'Garantir dicção cristalina em qualquer velocidade.',
      'Harmonizar perfeitamente com ducking automático.'
    ]
  },
  {
    id: 'bio_seguranca',
    groupId: 'voice_acoustics_biomech',
    groupTitle: '11. Voz, Acústica & Biomecânica',
    name: 'Perfil 1: Segurança Firme',
    explanation: 'Olhar direto na lente, micro-aceno afirmativo, ombros alinhados e autoridade inabalável.',
    whenToUse: [
      'Ganchos de abertura de alto impacto (Cena 1).',
      'Desmentir mitos ou condutas errôneas.',
      'Afirmações categóricas sobre diagnóstico.',
      'Vídeos de posicionamento e liderança de mercado.',
      'Fechamento contundente de orientações clínicas.'
    ]
  },
  {
    id: 'bio_empatia',
    groupId: 'voice_acoustics_biomech',
    groupTitle: '11. Voz, Acústica & Biomecânica',
    name: 'Perfil 2: Empatia Acolhedora',
    explanation: 'Olhar acolhedor de escuta ativa, leve inclinação da cabeça e gestos fluidos e calmos.',
    whenToUse: [
      'Falar sobre sofrimento ou dor crônica do paciente.',
      'Explicar doenças difíceis com carinho e amparo.',
      'Momentos de diálogo com a família do doente.',
      'Construção de vínculo e confiança humana.',
      'Finalização com mensagem de esperança e cuidado.'
    ]
  },
  {
    id: 'bio_simpatia',
    groupId: 'voice_acoustics_biomech',
    groupTitle: '11. Voz, Acústica & Biomecânica',
    name: 'Perfil 3: Simpatia (Sem Dentes)',
    explanation: 'Sorriso Duchenne autêntico focado nos olhos, com lábios fechados sem expor dentes.',
    whenToUse: [
      'Comemoração de bons resultados de tratamento.',
      'Boas-vindas calorosas ao canal ou aula.',
      'Tom leve e agradável sem cair na caricatura.',
      'Prevenção de distorções em dentes por motores de IA.',
      'Clima de otimismo e saúde preventiva.'
    ]
  }
];
