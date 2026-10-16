/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Gerenciamento de Pré-Configurações Nominais Salvas pelo Usuário
 * Persistência em localStorage
 * Super-Skill Omni Video Director Pro
 */

import { HeaderPreset, HEADER_PRESETS } from '../components/Header';
import { SceneDirectiveState } from './directorRules';

const USER_PRESETS_STORAGE_KEY = 'OMNI_DIRECTOR_USER_PRESETS_V4';

export interface UserCustomPreset extends HeaderPreset {
  createdAt?: string;
  isCustom: true;
}

/**
 * Retorna todos os presets customizados salvos pelo usuário
 */
export function getUserCustomPresets(): UserCustomPreset[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USER_PRESETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Erro ao ler presets customizados:', err);
    return [];
  }
}

/**
 * Salva nominalmente a configuração atual da cena como um preset customizado
 */
export function saveCurrentStateAsPreset(title: string, state: SceneDirectiveState): UserCustomPreset {
  const current = getUserCustomPresets();
  const trimmedTitle = title.trim();
  const id = `user_preset_${Date.now()}`;

  const newPreset: UserCustomPreset = {
    id,
    title: trimmedTitle || `Configuração Customizada ${current.length + 1}`,
    speechText: state.blockScripts?.[0] || state.speechText || '',
    visualIdea: state.visualIdea || '',
    masterMode: state.masterMode,
    bodyProfileId: state.bodyProfileId || 1,
    zDepthBoxId: state.zDepthBoxId || 'sem_caixa',
    scenarioId: state.scenarioId || 'consultorio',
    lightingId: state.lightingId || 'warm_amber',
    selectedPhysiologyId: state.selectedPhysiologyId,
    preferences: state.preferences || [],
    blockCount: state.blockCount || 1,
    blockScripts: state.blockScripts ? [...state.blockScripts] : [state.speechText || ''],
    createdAt: new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    isCustom: true
  };

  const updated = [newPreset, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_PRESETS_STORAGE_KEY, JSON.stringify(updated));
  }
  return newPreset;
}

/**
 * Remove um preset customizado salvo pelo usuário
 */
export function deleteUserCustomPreset(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getUserCustomPresets();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem(USER_PRESETS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Erro ao remover preset:', err);
  }
}
