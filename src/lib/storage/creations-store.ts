import { SavedCreation } from '../../types/try-on';

const STORAGE_KEY = 'fitswap_ai_user_creations_v1';

export function getSavedCreations(): SavedCreation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load local creations from browser storage', e);
    return [];
  }
}

export function saveCreation(creation: SavedCreation): SavedCreation[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedCreations();
    // Keep newest at front, cap at 50 creations to avoid browser quota exhaustion
    const updated = [creation, ...current.filter((c) => c.id !== creation.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to persist creation to browser storage', e);
    return [];
  }
}

export function deleteCreation(creationId: string): SavedCreation[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedCreations();
    const updated = current.filter((c) => c.id !== creationId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete creation', e);
    return [];
  }
}

export function clearAllCreations(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear creations', e);
  }
}
