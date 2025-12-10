// Level 1 requirement: Set Diet Goals and Allergies

import { DietSettings } from '../types';

interface DietTabProps {
  dietSettings: DietSettings;
  onUpdateDiet: (settings: DietSettings) => void;
}

const DIET_GOAL_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'low-carb', label: 'Low Carb' },
  { value: 'gluten-free', label: 'Gluten Free' }
];

const ALLERGY_OPTIONS = [
  { value: 'dairy', label: 'Dairy' },
  { value: 'nuts', label: 'Nuts' },
  { value: 'shellfish', label: 'Shellfish' },
  { value: 'soy', label: 'Soy' }
];

// Feature 10: Advanced filtering options
const CUISINE_OPTIONS = [
  { value: 'Asian', label: 'Asian' },
  { value: 'Mediterranean', label: 'Mediterranean' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Mexican', label: 'Mexican' },
  { value: 'American', label: 'American' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Thai', label: 'Thai' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Greek', label: 'Greek' }
];

export default function DietTab({ dietSettings, onUpdateDiet }: DietTabProps) {
  const handleGoalToggle = (goal: string) => {
    const newGoals = dietSettings.goals.includes(goal)
      ? dietSettings.goals.filter(g => g !== goal)
      : [...dietSettings.goals, goal];

    onUpdateDiet({
      ...dietSettings,
      goals: newGoals
    });
  };

  const handleAllergyToggle = (allergy: string) => {
    const newAllergies = dietSettings.allergies.includes(allergy)
      ? dietSettings.allergies.filter(a => a !== allergy)
      : [...dietSettings.allergies, allergy];

    onUpdateDiet({
      ...dietSettings,
      allergies: newAllergies
    });
  };

  const handleCustomGoalsChange = (value: string) => {
    onUpdateDiet({
      ...dietSettings,
      customGoals: value
    });
  };

  const handleCustomAllergiesChange = (value: string) => {
    onUpdateDiet({
      ...dietSettings,
      customAllergies: value
    });
  };

  // Feature 10: Advanced filter handlers
  const handleCuisineToggle = (cuisine: string) => {
    const currentCuisines = dietSettings.cuisinePreferences || [];
    const newCuisines = currentCuisines.includes(cuisine)
      ? currentCuisines.filter(c => c !== cuisine)
      : [...currentCuisines, cuisine];

    onUpdateDiet({
      ...dietSettings,
      cuisinePreferences: newCuisines
    });
  };

  const handleMaxCaloriesChange = (value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    onUpdateDiet({
      ...dietSettings,
      maxCaloriesPerMeal: numValue
    });
  };

  const handleMaxCookingTimeChange = (value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    onUpdateDiet({
      ...dietSettings,
      maxCookingTime: numValue
    });
  };

  return (
    <div className="diet-tab">
      <h2>Diet Goals & Allergies</h2>
      <p>Tell us about your dietary preferences and restrictions</p>

      <section className="diet-section">
        <h3>Diet Goals</h3>
        <div className="checkbox-group">
          {DIET_GOAL_OPTIONS.map((option) => (
            <label key={option.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={dietSettings.goals.includes(option.value)}
                onChange={() => handleGoalToggle(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="custom-goals">Custom Goals (optional)</label>
          <input
            id="custom-goals"
            type="text"
            value={dietSettings.customGoals}
            onChange={(e) => handleCustomGoalsChange(e.target.value)}
            placeholder="e.g., high-protein, keto, paleo"
          />
          <small>Separate multiple goals with commas</small>
        </div>
      </section>

      <section className="diet-section">
        <h3>Allergies & Restrictions</h3>
        <div className="checkbox-group">
          {ALLERGY_OPTIONS.map((option) => (
            <label key={option.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={dietSettings.allergies.includes(option.value)}
                onChange={() => handleAllergyToggle(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="custom-allergies">Custom Allergies (optional)</label>
          <input
            id="custom-allergies"
            type="text"
            value={dietSettings.customAllergies}
            onChange={(e) => handleCustomAllergiesChange(e.target.value)}
            placeholder="e.g., sesame, garlic, mushrooms"
          />
          <small>Separate multiple allergies with commas</small>
        </div>
      </section>

      {/* Feature 10: Advanced Filtering Options */}
      <section className="diet-section advanced-filters">
        <h3>Advanced Filters (Optional)</h3>
        <p className="section-hint">Narrow down meal suggestions with additional preferences</p>

        <div className="form-group">
          <label>Cuisine Preferences</label>
          <div className="checkbox-group cuisine-grid">
            {CUISINE_OPTIONS.map((option) => (
              <label key={option.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={(dietSettings.cuisinePreferences || []).includes(option.value)}
                  onChange={() => handleCuisineToggle(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <small>Leave blank to include all cuisines</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="max-calories">Max Calories Per Meal</label>
            <input
              id="max-calories"
              type="number"
              min="0"
              step="50"
              value={dietSettings.maxCaloriesPerMeal || ''}
              onChange={(e) => handleMaxCaloriesChange(e.target.value)}
              placeholder="e.g., 600"
            />
            <small>Calories per serving</small>
          </div>

          <div className="form-group">
            <label htmlFor="max-cooking-time">Max Cooking Time (minutes)</label>
            <input
              id="max-cooking-time"
              type="number"
              min="0"
              step="5"
              value={dietSettings.maxCookingTime || ''}
              onChange={(e) => handleMaxCookingTimeChange(e.target.value)}
              placeholder="e.g., 30"
            />
            <small>Total preparation time</small>
          </div>
        </div>
      </section>

      <div className="diet-summary">
        <h4>Current Settings:</h4>
        <p>
          <strong>Goals:</strong>{' '}
          {dietSettings.goals.length > 0 || dietSettings.customGoals
            ? [...dietSettings.goals, dietSettings.customGoals].filter(Boolean).join(', ')
            : 'None selected'}
        </p>
        <p>
          <strong>Allergies:</strong>{' '}
          {dietSettings.allergies.length > 0 || dietSettings.customAllergies
            ? [...dietSettings.allergies, dietSettings.customAllergies].filter(Boolean).join(', ')
            : 'None selected'}
        </p>
        {(dietSettings.cuisinePreferences && dietSettings.cuisinePreferences.length > 0) && (
          <p>
            <strong>Cuisines:</strong> {dietSettings.cuisinePreferences.join(', ')}
          </p>
        )}
        {dietSettings.maxCaloriesPerMeal && (
          <p>
            <strong>Max Calories:</strong> {dietSettings.maxCaloriesPerMeal} per meal
          </p>
        )}
        {dietSettings.maxCookingTime && (
          <p>
            <strong>Max Cooking Time:</strong> {dietSettings.maxCookingTime} minutes
          </p>
        )}
      </div>
    </div>
  );
}
