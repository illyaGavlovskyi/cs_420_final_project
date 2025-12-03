// Level 1 requirement: Save a Preset for Next Time
// Utility functions for managing presets in localStorage

import { SavedPreset, PantryItem, DietSettings, TimelineSettings } from '../types';

const PRESETS_KEY = 'aichef-presets';

// Load all saved presets from localStorage
export function loadPresets(): SavedPreset[] {
  try {
    const data = localStorage.getItem(PRESETS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading presets:', error);
    return [];
  }
}

// Save a new preset to localStorage
export function savePreset(
  name: string,
  pantryItems: PantryItem[],
  dietSettings: DietSettings,
  timelineSettings: TimelineSettings
): SavedPreset {
  const presets = loadPresets();

  const newPreset: SavedPreset = {
    id: `preset-${Date.now()}`,
    name,
    pantryItems: [...pantryItems],
    dietSettings: { ...dietSettings },
    timelineSettings: { ...timelineSettings },
    savedAt: new Date().toISOString()
  };

  presets.push(newPreset);

  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error('Error saving preset:', error);
  }

  return newPreset;
}

// Load a specific preset by ID
export function loadPreset(id: string): SavedPreset | null {
  const presets = loadPresets();
  return presets.find(preset => preset.id === id) || null;
}

// Delete a preset by ID
export function deletePreset(id: string): void {
  const presets = loadPresets();
  const filtered = presets.filter(preset => preset.id !== id);

  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting preset:', error);
  }
}
