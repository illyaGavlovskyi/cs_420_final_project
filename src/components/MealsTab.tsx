// Level 2 requirement: Meal Suggestions That Use All Ingredients and Reduce Waste

import { GeneratedMeal } from '../types';

interface MealsTabProps {
  meals: GeneratedMeal[];
  hasGenerated: boolean;
}

export default function MealsTab({ meals, hasGenerated }: MealsTabProps) {
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
      <h2>Your Meal Plan</h2>
      <p className="meal-intro">
        These meals are designed to use overlapping ingredients and reduce food waste.
      </p>

      {meals.length === 0 ? (
        <div className="no-meals">
          <p>No suitable meals found based on your diet preferences.</p>
          <p>Try adjusting your diet goals or allergies.</p>
        </div>
      ) : (
        <div className="meals-grid">
          {meals.map((meal) => (
            <div key={meal.id} className="meal-card">
              <div className="meal-header">
                <h3>{meal.title}</h3>
                <span className="meal-servings">{meal.servings} servings</span>
              </div>

              <p className="meal-description">{meal.description}</p>

              <div className="meal-tags">
                {meal.dietTags.map((tag) => (
                  <span key={tag} className="diet-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="meal-ingredients">
                <h4>Ingredients:</h4>
                <ul>
                  {meal.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="meal-benefits">
        <h3>Benefits of This Plan</h3>
        <ul>
          <li>Uses ingredients across multiple meals to reduce waste</li>
          <li>Matches your dietary preferences and restrictions</li>
          <li>Considers items you already have in your pantry</li>
          <li>Optimized for your cooking frequency</li>
        </ul>
      </div>
    </div>
  );
}
