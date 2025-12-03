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
      </div>
    </div>
  );
}
