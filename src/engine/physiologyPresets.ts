/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Presets Oficiais de Fisiologia Humana 3D Ultra-realista
 * Textos 100% literais conforme Auditoria 360º + Persistência em localStorage
 * Super-Skill Omni Video Director Pro
 */

export interface PhysiologyPreset {
  id: string;
  label: string;
  tooltip5Words: string;
  educationalGoal?: string;
  ptPrompt: string;
  enPrompt: string;
  isCustom?: boolean;
}

export const DEFAULT_PHYSIOLOGY_PRESETS: PhysiologyPreset[] = [
  {
    id: 'fisio_1_bioquimica',
    label: '🍎 1. Nutrição Clínica em Bioquímica Celular',
    tooltip5Words: 'Simulação celular nanométrica de membranas.',
    educationalGoal: 'Demonstrar transporte de nutrientes e integridade da membrana celular.',
    ptPrompt: 'Omni e Fisiologia Humana 3D Ultra-realista: Simulação biomédica interna em computação gráfica cinematográfica. Escala celular nanométrica, membranas fosfolipídicas com rugosidade molecular irregular e proteínas transmembrana texturizadas em fluido citoplasmático viscoso de alta refração óptica. Iluminação global com dispersão subsuperficial (SSS) translúcida em estruturas orgânicas viva, oclusão de ambiente profunda gerando micro-sombras de contato e vinheta óptica nas bordas com profundidade de campo macro cinematográfica (foco ultra curto e bokeh). Cinemática baseada em dinâmica de fluidos computacional (CFD) com movimento cinético molecular, colisões físicas precisas e deformação elástica de membranas ao toque. Callouts anatômicos com ponto circular -> linha fina ascendente com dobra 60°-90° -> rótulo CAIXA ALTA 17px por ~3s.',
    enPrompt: 'Omni and Ultra-realistic 3D Human Physiology: Internal biomedical simulation in cinematic CGI. Nanometric cellular scale, phospholipid membranes with irregular molecular roughness and textured transmembrane proteins in high-refraction viscous cytoplasmic fluid. Global illumination with translucent subsurface scattering (SSS) in living organic structures, deep ambient occlusion generating contact micro-shadows and optical edge vignette with cinematic macro depth of field (ultra-short focus and bokeh). Computational fluid dynamics (CFD) kinematics with molecular kinetic motion, precise physical collisions and elastic membrane deformation upon touch. Anatomical callouts with circular point -> thin ascending line with 60°-90° bend -> 17px UPPERCASE label for ~3s.'
  },
  {
    id: 'fisio_2_patologia',
    label: '🦠 2. Patologia em Doenças',
    tooltip5Words: 'Microambiente vascular mostrando lesões patológicas.',
    educationalGoal: 'Visualizar mecanismos fisiopatológicos de estresse oxidativo e lesões vasculares.',
    ptPrompt: 'Omni e Fisiologia Humana 3D Ultra-realista: Simulação biomédica interna em computação gráfica cinematográfica. Escala tecidual e vascular, microambiente patológico mostrando lesões endoteliais, fibras de colágeno ásperas com imperfeições biológicas e acúmulo denso de resíduos metabólicos opacos. Sombreamento PBR avançado com oclusão de ambiente profunda nas cavidades celulares, oclusão de luz real, vinheta óptica sutil nas bordas e profundidade de campo macro (foco central nítido com desfoque periférico). Cinemática baseada em dinâmica de fluidos (CFD) com fluxo hidrodinâmico contínuo alterado por turbulência patológica e deformação elástica de tecidos sob estresse. Callouts anatômicos com ponto circular -> linha fina ascendente com dobra 60°-90° -> rótulo CAIXA ALTA 17px por ~3s.',
    enPrompt: 'Omni and Ultra-realistic 3D Human Physiology: Internal biomedical simulation in cinematic CGI. Tissue and vascular scale, pathological microenvironment showing endothelial lesions, rough collagen fibers with biological imperfections and dense opaque metabolic waste accumulation. Advanced PBR shading with deep ambient occlusion in cellular cavities, real light occlusion, subtle optical edge vignette and macro depth of field (sharp central focus with peripheral blur). Computational fluid dynamics (CFD) kinematics with continuous hydrodynamic flow altered by pathological turbulence and elastic tissue deformation under stress. Anatomical callouts with circular point -> thin ascending line with 60°-90° bend -> 17px UPPERCASE label for ~3s.'
  },
  {
    id: 'fisio_3_vitaminas',
    label: '🧬 3. Vitaminas em Funções Fisiologicas',
    tooltip5Words: 'Escala nuclear com DNA cofatores.',
    educationalGoal: 'Evidenciar o papel de cofatores enzimáticos e minerais na transcrição e proteção celular.',
    ptPrompt: 'Omni e Fisiologia Humana 3D Ultra-realista: Simulação biomédica interna em computação gráfica cinematográfica. Escala subcelular nuclear ultra-profunda, filamentos espirais de DNA com dispersão de luz molecular e cofatores minerais cristalinos brilhantes. Refração de luz precisa em estruturas moleculares densas, oclusão de ambiente profunda, poeira microscópica flutuante em suspensão, vinheta óptica nas bordas e profundidade de campo macro com foco isolado no ponto de interação. Cinemática molecular com atração eletrostática volumétrica e transição de energia por luminescência interna progressiva através do encaixe tridimensional exato de ligantes. Callouts anatômicos com ponto circular -> linha fina ascendente com dobra 60°-90° -> rótulo CAIXA ALTA 17px por ~3s.',
    enPrompt: 'Omni and Ultra-realistic 3D Human Physiology: Internal biomedical simulation in cinematic CGI. Ultra-deep nuclear subcellular scale, spiral DNA filaments with molecular light scattering and glowing crystalline mineral cofactors. Precise light refraction in dense molecular structures, deep ambient occlusion, floating microscopic dust in suspension, optical edge vignette and macro depth of field with isolated focus at the interaction point. Molecular kinematics with volumetric electrostatic attraction and progressive internal luminescence energy transition through exact 3D ligand docking. Anatomical callouts with circular point -> thin ascending line with 60°-90° bend -> 17px UPPERCASE label for ~3s.'
  },
  {
    id: 'fisio_4_cerebro',
    label: '🧠 4. Nutrição no Cérebro',
    tooltip5Words: 'Fenda sináptica ativa com neurotransmissores.',
    educationalGoal: 'Explicar neuroproteção, transmissão de impulsos e integridade sináptica.',
    ptPrompt: 'Omni e Fisiologia Humana 3D Ultra-realista: Simulação biomédica interna em computação gráfica cinematográfica. Escala neurovascular e fenda sináptica ativa. Bainha de mielina com textura lipídica acetinada, vesículas sinápticas esféricas liberando neurotransmissores luminescentes em fenda intercelular com dispersão de bioeletricidade fluida. Iluminação volumétrica azulada com pontos quentes de sinapse e pulsos bioelétricos de cálcio e sódio em alta velocidade, oclusão profunda e profundidade de campo macro cinematográfica. Cinemática baseada em transmissão de impulsos nervosos e dinâmica eletroquímica com deformação elástica de receptores de membrana. Callouts anatômicos com ponto circular -> linha fina ascendente com dobra 60°-90° -> rótulo CAIXA ALTA 17px por ~3s.',
    enPrompt: 'Omni and Ultra-realistic 3D Human Physiology: Internal biomedical simulation in cinematic CGI. Neurovascular scale and active synaptic cleft. Myelin sheath with satiny lipid texture, spherical synaptic vesicles releasing luminescent neurotransmitters into intercellular cleft with fluid bioelectricity scattering. Volumetric bluish lighting with synaptic hot spots and high-speed calcium and sodium bioelectric pulses, deep occlusion and cinematic macro depth of field. Kinematics based on nerve impulse transmission and electrochemical dynamics with elastic deformation of membrane receptors. Anatomical callouts with circular point -> thin ascending line with 60°-90° bend -> 17px UPPERCASE label for ~3s.'
  },
  {
    id: 'fisio_template_mestre',
    label: '⚙️ 5. Template Mestre Universal (Para Qualquer Nova Cena)',
    tooltip5Words: 'Molde universal para novos tecidos.',
    educationalGoal: 'Servir como fundação inviolável para qualquer simulação biomédica interna personalizada.',
    ptPrompt: 'Omni e Fisiologia Humana 3D Ultra-realista: Simulação biomédica interna em computação gráfica cinematográfica. Escala anatômica de precisão microscópica PBR com tecidos orgânicos vivos, dispersão subsuperficial (SSS), oclusão de ambiente profunda, poeira suspensa e vinheta óptica nas bordas com profundidade de campo macro cinematográfica. Cinemática com dinâmica de fluidos computacional (CFD), deformação elástica de tecidos sob pressão fisiológica e interações biofísicas realistas. Callouts anatômicos com ponto circular -> linha fina ascendente com dobra 60°-90° -> rótulo CAIXA ALTA 17px por ~3s.',
    enPrompt: 'Omni and Ultra-realistic 3D Human Physiology: Internal biomedical simulation in cinematic CGI. Precision anatomical scale in microscopic PBR with living organic tissues, subsurface scattering (SSS), deep ambient occlusion, suspended microscopic dust and optical edge vignette with cinematic macro depth of field. Kinematics with computational fluid dynamics (CFD), elastic tissue deformation under physiological pressure and realistic biophysical interactions. Anatomical callouts with circular point -> thin ascending line with 60°-90° bend -> 17px UPPERCASE label for ~3s.'
  }
];

const LOCAL_STORAGE_KEY = 'omni_physiology_presets_v1';

/**
 * Retorna todos os presets de fisiologia (padrões + modelos criados pelo usuário)
 */
export function getPhysiologyPresets(): PhysiologyPreset[] {
  if (typeof window === 'undefined') {
    return DEFAULT_PHYSIOLOGY_PRESETS;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_PHYSIOLOGY_PRESETS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn('Erro ao carregar presets de fisiologia do localStorage:', err);
  }
  return DEFAULT_PHYSIOLOGY_PRESETS;
}

/**
 * Salva novo modelo de fisiologia criado manualmente pelo usuário no localStorage
 */
export function saveCustomPhysiologyPreset(
  preset: Omit<PhysiologyPreset, 'id' | 'isCustom'>
): PhysiologyPreset {
  const current = getPhysiologyPresets();
  const newPreset: PhysiologyPreset = {
    ...preset,
    id: `fisio_custom_${Date.now()}`,
    isCustom: true
  };

  // Mantém o Template Mestre Universal por último
  const masterIdx = current.findIndex(p => p.id === 'fisio_template_mestre');
  let nextList: PhysiologyPreset[];
  if (masterIdx !== -1) {
    const master = current[masterIdx];
    const withoutMaster = current.filter(p => p.id !== 'fisio_template_mestre');
    nextList = [...withoutMaster, newPreset, master];
  } else {
    nextList = [...current, newPreset];
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextList));
  } catch (err) {
    console.error('Erro ao salvar preset no localStorage:', err);
  }

  return newPreset;
}

/**
 * Remove um modelo customizado salvo pelo usuário
 */
export function deleteCustomPhysiologyPreset(id: string): void {
  const current = getPhysiologyPresets();
  const filtered = current.filter(p => p.id !== id);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Erro ao deletar preset no localStorage:', err);
  }
}

/**
 * Restaura os presets padrão originais da Auditoria 360º
 */
export function resetPhysiologyPresets(): PhysiologyPreset[] {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error('Erro ao resetar presets no localStorage:', err);
  }
  return DEFAULT_PHYSIOLOGY_PRESETS;
}
