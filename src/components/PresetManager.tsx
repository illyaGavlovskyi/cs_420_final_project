// Level 1 requirement: Save a Preset for Next Time

import { useState, useEffect } from 'react';
import { SavedPreset, PantryItem, DietSettings, TimelineSettings } from '../types';
import { loadPresets, savePreset, deletePreset } from '../utils/localStorage';

interface PresetManagerProps {
  currentPantryItems: PantryItem[];
  currentDietSettings: DietSettings;
  currentTimelineSettings: TimelineSettings;
  onLoadPreset: (preset: SavedPreset) => void;
}

export default function PresetManager({
  currentPantryItems,
  currentDietSettings,
  currentTimelineSettings,
  onLoadPreset
}: PresetManagerProps) {
  const [presets, setPresets] = useState<SavedPreset[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');

  useEffect(() => {
    refreshPresets();
  }, []);

  const refreshPresets = () => {
    const loaded = loadPresets();
    setPresets(loaded);
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      alert('Please enter a name for your preset');
      return;
    }

    savePreset(
      presetName.trim(),
      currentPantryItems,
      currentDietSettings,
      currentTimelineSettings
    );

    setPresetName('');
    setShowSaveDialog(false);
    refreshPresets();
    alert('Preset saved successfully!');
  };

  const handleLoadPreset = (preset: SavedPreset) => {
    if (confirm(`Load preset "${preset.name}"? This will replace your current settings.`)) {
      onLoadPreset(preset);
      alert('Preset loaded successfully!');
    }
  };

  const handleDeletePreset = (id: string, name: string) => {
    if (confirm(`Delete preset "${name}"?`)) {
      deletePreset(id);
      refreshPresets();
    }
  };

  return (
    <div className="preset-manager">
      <h3>Saved Presets</h3>

      <div className="preset-actions">
        <button
          className="btn-primary"
          onClick={() => setShowSaveDialog(!showSaveDialog)}
        >
          {showSaveDialog ? 'Cancel' : 'Save Current Settings as Preset'}
        </button>
      </div>

      {showSaveDialog && (
        <div className="save-dialog">
          <div className="form-group">
            <label htmlFor="preset-name">Preset Name</label>
            <input
              id="preset-name"
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="e.g., Weekly Vegetarian Plan"
            />
          </div>
          <button className="btn-primary" onClick={handleSavePreset}>
            Save Preset
          </button>
        </div>
      )}

      <div className="presets-list">
        {presets.length === 0 ? (
          <p className="empty-message">No saved presets yet. Save your current settings to reuse them later!</p>
        ) : (
          presets.map((preset) => (
            <div key={preset.id} className="preset-card">
              <div className="preset-info">
                <h4>{preset.name}</h4>
                <p className="preset-date">
                  Saved: {new Date(preset.savedAt).toLocaleDateString()}
                </p>
                <p className="preset-details">
                  {preset.pantryItems.length} pantry items, {preset.dietSettings.goals.length} diet goals
                </p>
              </div>
              <div className="preset-actions">
                <button
                  className="btn-secondary"
                  onClick={() => handleLoadPreset(preset)}
                >
                  Load
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePreset(preset.id, preset.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
