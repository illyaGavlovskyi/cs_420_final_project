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
// Feature 12: Enhanced with category and description support
export function savePreset(
  name: string,
  pantryItems: PantryItem[],
  dietSettings: DietSettings,
  timelineSettings: TimelineSettings,
  category?: string,
  description?: string
): SavedPreset {
  const presets = loadPresets();

  const newPreset: SavedPreset = {
    id: `preset-${Date.now()}`,
    name,
    pantryItems: [...pantryItems],
    dietSettings: { ...dietSettings },
    timelineSettings: { ...timelineSettings },
    savedAt: new Date().toISOString(),
    category,
    description
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

// Feature 12: Export a preset as JSON file
export function exportPreset(preset: SavedPreset): void {
  try {
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${preset.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_preset.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting preset:', error);
    throw new Error('Failed to export preset');
  }
}

// Feature 12: Import a preset from JSON file
export function importPreset(file: File): Promise<SavedPreset> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const preset = JSON.parse(json) as SavedPreset;

        // Validate preset structure
        if (!preset.name || !preset.pantryItems || !preset.dietSettings || !preset.timelineSettings) {
          throw new Error('Invalid preset file format');
        }

        // Generate new ID and timestamp for imported preset
        const importedPreset: SavedPreset = {
          ...preset,
          id: `preset-${Date.now()}`,
          savedAt: new Date().toISOString()
        };

        // Add to presets
        const presets = loadPresets();
        presets.push(importedPreset);
        localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));

        resolve(importedPreset);
      } catch (error) {
        console.error('Error importing preset:', error);
        reject(new Error('Failed to import preset. Please check the file format.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}
