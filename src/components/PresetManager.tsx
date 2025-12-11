// Level 1 requirement: Save a Preset for Next Time
// Feature 12: Enhanced preset system with categories, descriptions, export/import, and preview

import { useState, useEffect, useRef } from 'react';
import { SavedPreset, PantryItem, DietSettings, TimelineSettings } from '../types';
import { loadPresets, savePreset, deletePreset, exportPreset, importPreset } from '../utils/localStorage';

interface PresetManagerProps {
  currentPantryItems: PantryItem[];
  currentDietSettings: DietSettings;
  currentTimelineSettings: TimelineSettings;
  onLoadPreset: (preset: SavedPreset) => void;
}

const PRESET_CATEGORIES = [
  'Budget Friendly',
  'Quick Meals',
  'Vegetarian',
  'Vegan',
  'Low Carb',
  'Family Friendly',
  'Meal Prep',
  'Custom'
];

export default function PresetManager({
  currentPantryItems,
  currentDietSettings,
  currentTimelineSettings,
  onLoadPreset
}: PresetManagerProps) {
  const [presets, setPresets] = useState<SavedPreset[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [presetCategory, setPresetCategory] = useState('Custom');
  const [presetDescription, setPresetDescription] = useState('');
  const [previewPreset, setPreviewPreset] = useState<SavedPreset | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      currentTimelineSettings,
      presetCategory,
      presetDescription.trim() || undefined
    );

    setPresetName('');
    setPresetCategory('Custom');
    setPresetDescription('');
    setShowSaveDialog(false);
    refreshPresets();
    alert('Preset saved successfully!');
  };

  const handleLoadPreset = (preset: SavedPreset) => {
    onLoadPreset(preset);
    setPreviewPreset(null);
    alert('Preset loaded successfully!');
  };

  const handleDeletePreset = (id: string, name: string) => {
    if (confirm(`Delete preset "${name}"?`)) {
      deletePreset(id);
      refreshPresets();
      if (previewPreset?.id === id) {
        setPreviewPreset(null);
      }
    }
  };

  const handleExportPreset = (preset: SavedPreset) => {
    try {
      exportPreset(preset);
      alert(`Preset "${preset.name}" exported successfully!`);
    } catch (error) {
      alert('Failed to export preset. Please try again.');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importPreset(file);
      refreshPresets();
      alert('Preset imported successfully!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to import preset');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePreview = (preset: SavedPreset) => {
    setPreviewPreset(preset);
  };

  const closePreview = () => {
    setPreviewPreset(null);
  };

  // Filter presets by category
  const filteredPresets = filterCategory === 'All'
    ? presets
    : presets.filter(p => (p.category || 'Custom') === filterCategory);

  // Group presets by category
  const presetsByCategory = presets.reduce((acc, preset) => {
    const category = preset.category || 'Custom';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(preset);
    return acc;
  }, {} as Record<string, SavedPreset[]>);

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
        <button
          className="btn-secondary"
          onClick={handleImportClick}
        >
          Import Preset
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImportFile}
        />
      </div>

      {showSaveDialog && (
        <div className="save-dialog">
          <div className="form-group">
            <label htmlFor="preset-name">Preset Name *</label>
            <input
              id="preset-name"
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="e.g., Weekly Vegetarian Plan"
            />
          </div>

          <div className="form-group">
            <label htmlFor="preset-category">Category</label>
            <select
              id="preset-category"
              value={presetCategory}
              onChange={(e) => setPresetCategory(e.target.value)}
            >
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preset-description">Description (optional)</label>
            <textarea
              id="preset-description"
              value={presetDescription}
              onChange={(e) => setPresetDescription(e.target.value)}
              placeholder="e.g., Budget-friendly plan for a family of 4, includes pantry staples and seasonal produce"
              rows={3}
            />
          </div>

          <button className="btn-primary" onClick={handleSavePreset}>
            Save Preset
          </button>
        </div>
      )}

      {/* Category Filter */}
      {presets.length > 0 && (
        <div className="preset-filter">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories ({presets.length})</option>
            {Object.keys(presetsByCategory).sort().map((category) => (
              <option key={category} value={category}>
                {category} ({presetsByCategory[category].length})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="presets-list">
        {filteredPresets.length === 0 && filterCategory === 'All' && (
          <p className="empty-message">No saved presets yet. Save your current settings to reuse them later!</p>
        )}

        {filteredPresets.length === 0 && filterCategory !== 'All' && (
          <p className="empty-message">No presets in the "{filterCategory}" category.</p>
        )}

        {filteredPresets.map((preset) => (
          <div key={preset.id} className="preset-card">
            <div className="preset-info">
              <div className="preset-header">
                <h4>{preset.name}</h4>
                {preset.category && (
                  <span className="preset-category-badge">{preset.category}</span>
                )}
              </div>
              <p className="preset-date">
                Saved: {new Date(preset.savedAt).toLocaleDateString()}
              </p>
              {preset.description && (
                <p className="preset-description">{preset.description}</p>
              )}
              <div className="preset-stats">
                <span>📦 {preset.pantryItems.length} items</span>
                <span>🎯 {preset.dietSettings.goals.length} diet goals</span>
                <span>📅 {preset.timelineSettings.planDays} days</span>
                <span>💰 ${preset.timelineSettings.budget}</span>
              </div>
            </div>
            <div className="preset-actions-group">
              <button
                className="btn-preview"
                onClick={() => handlePreview(preset)}
                title="Preview preset details"
              >
                👁️ Preview
              </button>
              <button
                className="btn-secondary"
                onClick={() => handleLoadPreset(preset)}
                title="Load this preset"
              >
                Load
              </button>
              <button
                className="btn-export"
                onClick={() => handleExportPreset(preset)}
                title="Export as JSON file"
              >
                📥 Export
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDeletePreset(preset.id, preset.name)}
                title="Delete this preset"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewPreset && (
        <div className="preview-modal-overlay" onClick={closePreview}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <h3>Preview: {previewPreset.name}</h3>
              <button className="close-preview" onClick={closePreview}>×</button>
            </div>

            <div className="preview-content">
              {previewPreset.category && (
                <div className="preview-section">
                  <h4>Category</h4>
                  <span className="preset-category-badge large">{previewPreset.category}</span>
                </div>
              )}

              {previewPreset.description && (
                <div className="preview-section">
                  <h4>Description</h4>
                  <p>{previewPreset.description}</p>
                </div>
              )}

              <div className="preview-section">
                <h4>Timeline Settings</h4>
                <ul>
                  <li>Plan Duration: {previewPreset.timelineSettings.planDays} days</li>
                  <li>Cooking Frequency: {previewPreset.timelineSettings.cookingFrequency}x per week</li>
                  <li>Budget: ${previewPreset.timelineSettings.budget}</li>
                </ul>
              </div>

              <div className="preview-section">
                <h4>Diet Settings</h4>
                {previewPreset.dietSettings.goals.length > 0 && (
                  <div>
                    <strong>Goals:</strong>
                    <div className="preview-tags">
                      {previewPreset.dietSettings.goals.map((goal) => (
                        <span key={goal} className="preview-tag">{goal}</span>
                      ))}
                    </div>
                  </div>
                )}
                {previewPreset.dietSettings.allergies.length > 0 && (
                  <div>
                    <strong>Allergies:</strong>
                    <div className="preview-tags">
                      {previewPreset.dietSettings.allergies.map((allergy) => (
                        <span key={allergy} className="preview-tag warning">{allergy}</span>
                      ))}
                    </div>
                  </div>
                )}
                {previewPreset.dietSettings.customGoals && (
                  <p><strong>Custom Goals:</strong> {previewPreset.dietSettings.customGoals}</p>
                )}
                {previewPreset.dietSettings.cuisinePreferences && previewPreset.dietSettings.cuisinePreferences.length > 0 && (
                  <div>
                    <strong>Cuisine Preferences:</strong>
                    <div className="preview-tags">
                      {previewPreset.dietSettings.cuisinePreferences.map((cuisine) => (
                        <span key={cuisine} className="preview-tag">{cuisine}</span>
                      ))}
                    </div>
                  </div>
                )}
                {previewPreset.dietSettings.maxCaloriesPerMeal && (
                  <p><strong>Max Calories:</strong> {previewPreset.dietSettings.maxCaloriesPerMeal} per meal</p>
                )}
                {previewPreset.dietSettings.maxCookingTime && (
                  <p><strong>Max Cooking Time:</strong> {previewPreset.dietSettings.maxCookingTime} minutes</p>
                )}
              </div>

              <div className="preview-section">
                <h4>Pantry Items ({previewPreset.pantryItems.length})</h4>
                {previewPreset.pantryItems.length > 0 ? (
                  <div className="preview-pantry-grid">
                    {previewPreset.pantryItems.map((item) => (
                      <div key={item.id} className="preview-pantry-item">
                        {item.name} - {item.quantity} {item.unit}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No pantry items</p>
                )}
              </div>
            </div>

            <div className="preview-actions">
              <button className="btn-primary" onClick={() => handleLoadPreset(previewPreset)}>
                Load This Preset
              </button>
              <button className="btn-secondary" onClick={closePreview}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
