// Level 2 requirement: Meal Suggestions That Use All Ingredients and Reduce Waste

import { useState } from 'react';
import { GeneratedMeal } from '../types';

interface MealsTabProps {
  meals: GeneratedMeal[];
  hasGenerated: boolean;
  onRegenerateMeal: (mealId: string) => void;
  onDeleteMeal: (mealId: string) => void;
}

export default function MealsTab({ meals, hasGenerated, onRegenerateMeal, onDeleteMeal }: MealsTabProps) {
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);

  const toggleExpand = (mealId: string) => {
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
  };

  const handleKeyPress = (event: React.KeyboardEvent, mealId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpand(mealId);
    }
  };

  if (!hasGenerated) {
    return (
      <div className="meals-tab">
        <h2>Meal Plan</h2>
        <div className="empty-state">
          <p>No meal plan generated yet.</p>
          <p>Go to the Shopping tab and generate your plan first!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meals-tab">
      <h2>Your Weekly Meal Plan</h2>
      <p className="meal-intro">
        Click on any meal to see detailed cooking instructions and complete nutritional breakdown.
      </p>

      {meals.length === 0 ? (
        <div className="no-meals">
          <p>No suitable meals found based on your diet preferences.</p>
          <p>Try adjusting your diet goals or allergies.</p>
        </div>
      ) : (
        <div className="weekly-meals">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className={`meal-card ${expandedMealId === meal.id ? 'expanded' : ''}`}
              onClick={() => toggleExpand(meal.id)}
              onKeyDown={(e) => handleKeyPress(e, meal.id)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedMealId === meal.id}
              aria-label={`${meal.title} for ${meal.dayOfWeek}. Click to ${expandedMealId === meal.id ? 'collapse' : 'expand'} details`}
            >
              {/* Collapsed View */}
              <div className="meal-header">
                <div className="meal-day-badge">{meal.dayOfWeek}</div>
                <div className="meal-title-section">
                  <h3>{meal.title}</h3>
                  <p className="meal-description">{meal.description}</p>
                  {/* Feature 10: Display cuisine type and cooking time */}
                  {(meal.cuisineType || meal.cookingTime) && (
                    <div className="meal-metadata">
                      {meal.cuisineType && <span className="cuisine-badge">{meal.cuisineType}</span>}
                      {meal.cookingTime && <span className="time-badge">⏱️ {meal.cookingTime} min</span>}
                    </div>
                  )}
                </div>
                <div className="meal-quick-info">
                  <span className="meal-calories">{meal.totalCalories} cal</span>
                  <span className="meal-servings">{meal.servings} servings</span>
                </div>
              </div>

              {/* Feature 6: Meal Customization Actions */}
              <div className="meal-actions">
                <button
                  type="button"
                  className="btn-regenerate-meal"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegenerateMeal(meal.id);
                  }}
                  aria-label={`Regenerate ${meal.title}`}
                >
                  🔄 Regenerate
                </button>
                <button
                  type="button"
                  className="btn-delete-meal"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Remove "${meal.title}" from your meal plan?`)) {
                      onDeleteMeal(meal.id);
                    }
                  }}
                  aria-label={`Delete ${meal.title}`}
                >
                  🗑️ Remove
                </button>
              </div>

              {/* Nutrition Summary Bar */}
              <div className="nutrition-summary">
                <div className="nutrition-item">
                  <span className="nutrition-label">Protein</span>
                  <span className="nutrition-value">{meal.micronutrients.protein}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Carbs</span>
                  <span className="nutrition-value">{meal.micronutrients.carbs}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fat</span>
                  <span className="nutrition-value">{meal.micronutrients.fat}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fiber</span>
                  <span className="nutrition-value">{meal.micronutrients.fiber}g</span>
                </div>
              </div>

              <div className="meal-tags">
                {meal.dietTags.map((tag) => (
                  <span key={tag} className="diet-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expanded View */}
              {expandedMealId === meal.id && (
                <div className="meal-details">
                  <div className="ingredients-section">
                    <h4>Ingredients & Nutrition</h4>
                    <ul className="detailed-ingredients">
                      {meal.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="ingredient-item-expanded">
                          <div className="ingredient-header">
                            <span className="ingredient-name">{ingredient.name}</span>
                            <span className="ingredient-amount">{ingredient.amount}</span>
                            <span className="ingredient-calories">{ingredient.calories} cal</span>
                          </div>
                          <div className="ingredient-micronutrients">
                            <span className="ingredient-micro">P: {ingredient.micronutrients.protein}g</span>
                            <span className="ingredient-micro">C: {ingredient.micronutrients.carbs}g</span>
                            <span className="ingredient-micro">F: {ingredient.micronutrients.fat}g</span>
                            <span className="ingredient-micro">Fiber: {ingredient.micronutrients.fiber}g</span>
                            <span className="ingredient-micro">Na: {ingredient.micronutrients.sodium}mg</span>
                            <span className="ingredient-micro">Vit C: {ingredient.micronutrients.vitaminC}mg</span>
                            <span className="ingredient-micro">Fe: {ingredient.micronutrients.iron}mg</span>
                            <span className="ingredient-micro">Ca: {ingredient.micronutrients.calcium}mg</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <h4 className="micro-title">Complete Nutrition</h4>
                    <div className="micronutrients-grid">
                      <div className="micro-card">
                        <span className="micro-label">Protein</span>
                        <span className="micro-value">{meal.micronutrients.protein}g</span>
                      </div>
                      <div className="micro-card">
                        <span className="micro-label">Carbohydrates</span>
                        <span className="micro-value">{meal.micronutrients.carbs}g</span>
                      </div>
                      <div className="micro-card">
                        <span className="micro-label">Fat</span>
                        <span className="micro-value">{meal.micronutrients.fat}g</span>
                      </div>
                      <div className="micro-card">
                        <span className="micro-label">Fiber</span>
                        <span className="micro-value">{meal.micronutrients.fiber}g</span>
                      </div>
                      <div className="micro-card">
                        <span className="micro-label">Sodium</span>
                        <span className="micro-value">{meal.micronutrients.sodium}mg</span>
                      </div>
                      <div className="micro-card">
                        <span className="micro-label">Vitamin C</span>
                        <span className="micro-value">{meal.micronutrients.vitaminC}mg</span>
                      </div>
                      <div className="micro-card">
                        <span className="micro-label">Iron</span>
                        <span className="micro-value">{meal.micronutrients.iron}mg</span>
                      </div>
                      <div className="micro-card">
                        <span className="micro-label">Calcium</span>
                        <span className="micro-value">{meal.micronutrients.calcium}mg</span>
                      </div>
                    </div>
                  </div>

                  <div className="instructions-section">
                    <h4>Cooking Instructions</h4>
                    <ol className="cooking-steps">
                      {meal.cookingInstructions.map((step, idx) => (
                        <li key={idx} className="cooking-step">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              <div className="expand-indicator">
                {expandedMealId === meal.id ? '▲ Click to collapse' : '▼ Click to expand'}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="meal-benefits">
        <h3>Benefits of This Plan</h3>
        <ul>
          <li>Organized by day of the week for easy planning</li>
          <li>Complete macronutrient and micronutrient information</li>
          <li>Detailed nutritional information for each ingredient</li>
          <li>Step-by-step cooking instructions</li>
          <li>Uses ingredients across multiple meals to reduce waste</li>
          <li>Matches your dietary preferences and restrictions</li>
        </ul>
      </div>
    </div>
  );
}
