// Feature 11: Weekly Nutrition Analytics

import { GeneratedMeal } from '../types';

interface NutritionTabProps {
  meals: GeneratedMeal[];
  hasGenerated: boolean;
}

interface NutritionSummary {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalSodium: number;
  totalVitaminC: number;
  totalIron: number;
  totalCalcium: number;
  dailyAverages: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function NutritionTab({ meals, hasGenerated }: NutritionTabProps) {
  // Calculate nutrition summary
  const calculateNutritionSummary = (): NutritionSummary => {
    const totals = meals.reduce(
      (acc, meal) => ({
        totalCalories: acc.totalCalories + meal.totalCalories,
        totalProtein: acc.totalProtein + meal.micronutrients.protein,
        totalCarbs: acc.totalCarbs + meal.micronutrients.carbs,
        totalFat: acc.totalFat + meal.micronutrients.fat,
        totalFiber: acc.totalFiber + meal.micronutrients.fiber,
        totalSodium: acc.totalSodium + meal.micronutrients.sodium,
        totalVitaminC: acc.totalVitaminC + meal.micronutrients.vitaminC,
        totalIron: acc.totalIron + meal.micronutrients.iron,
        totalCalcium: acc.totalCalcium + meal.micronutrients.calcium,
      }),
      {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        totalFiber: 0,
        totalSodium: 0,
        totalVitaminC: 0,
        totalIron: 0,
        totalCalcium: 0,
      }
    );

    const daysInPlan = 7; // Weekly plan
    const dailyAverages = {
      calories: Math.round(totals.totalCalories / daysInPlan),
      protein: Math.round(totals.totalProtein / daysInPlan),
      carbs: Math.round(totals.totalCarbs / daysInPlan),
      fat: Math.round(totals.totalFat / daysInPlan),
    };

    return { ...totals, dailyAverages };
  };

  // Calculate macronutrient percentages
  const calculateMacroPercentages = (summary: NutritionSummary) => {
    const totalMacroCalories =
      summary.totalProtein * 4 + summary.totalCarbs * 4 + summary.totalFat * 9;

    const proteinPercent = Math.round((summary.totalProtein * 4 / totalMacroCalories) * 100);
    const carbsPercent = Math.round((summary.totalCarbs * 4 / totalMacroCalories) * 100);
    const fatPercent = Math.round((summary.totalFat * 9 / totalMacroCalories) * 100);

    return { proteinPercent, carbsPercent, fatPercent };
  };

  if (!hasGenerated) {
    return (
      <div className="nutrition-tab">
        <h2>Weekly Nutrition Analytics</h2>
        <div className="empty-state">
          <p>Generate a meal plan first to see your weekly nutrition analytics.</p>
          <p>Navigate to the Shopping tab and click "Generate Shopping List & Meal Plan".</p>
        </div>
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="nutrition-tab">
        <h2>Weekly Nutrition Analytics</h2>
        <div className="empty-state">
          <p>No meals in your plan yet.</p>
          <p>Try adjusting your diet preferences or cooking frequency.</p>
        </div>
      </div>
    );
  }

  const summary = calculateNutritionSummary();
  const macroPercentages = calculateMacroPercentages(summary);

  return (
    <div className="nutrition-tab">
      <h2>Weekly Nutrition Analytics</h2>
      <p className="nutrition-intro">
        Track your weekly nutritional intake across all {meals.length} planned meals
      </p>

      {/* Daily Averages Section */}
      <section className="nutrition-section daily-averages">
        <h3>Daily Averages</h3>
        <div className="nutrition-cards">
          <div className="nutrition-card calories-card">
            <div className="nutrition-icon">🔥</div>
            <div className="nutrition-value">{summary.dailyAverages.calories}</div>
            <div className="nutrition-label">Calories/day</div>
          </div>
          <div className="nutrition-card protein-card">
            <div className="nutrition-icon">💪</div>
            <div className="nutrition-value">{summary.dailyAverages.protein}g</div>
            <div className="nutrition-label">Protein/day</div>
          </div>
          <div className="nutrition-card carbs-card">
            <div className="nutrition-icon">🌾</div>
            <div className="nutrition-value">{summary.dailyAverages.carbs}g</div>
            <div className="nutrition-label">Carbs/day</div>
          </div>
          <div className="nutrition-card fat-card">
            <div className="nutrition-icon">🥑</div>
            <div className="nutrition-value">{summary.dailyAverages.fat}g</div>
            <div className="nutrition-label">Fat/day</div>
          </div>
        </div>
      </section>

      {/* Macronutrient Distribution */}
      <section className="nutrition-section macro-distribution">
        <h3>Macronutrient Distribution</h3>
        <p className="section-hint">Percentage of calories from each macronutrient</p>
        <div className="macro-bars">
          <div className="macro-bar-item">
            <div className="macro-bar-header">
              <span className="macro-name">Protein</span>
              <span className="macro-percentage">{macroPercentages.proteinPercent}%</span>
            </div>
            <div className="macro-bar">
              <div
                className="macro-bar-fill protein-fill"
                style={{ width: `${macroPercentages.proteinPercent}%` }}
                role="progressbar"
                aria-valuenow={macroPercentages.proteinPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Protein: ${macroPercentages.proteinPercent}%`}
              />
            </div>
            <div className="macro-total">{Math.round(summary.totalProtein)}g total</div>
          </div>

          <div className="macro-bar-item">
            <div className="macro-bar-header">
              <span className="macro-name">Carbohydrates</span>
              <span className="macro-percentage">{macroPercentages.carbsPercent}%</span>
            </div>
            <div className="macro-bar">
              <div
                className="macro-bar-fill carbs-fill"
                style={{ width: `${macroPercentages.carbsPercent}%` }}
                role="progressbar"
                aria-valuenow={macroPercentages.carbsPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Carbohydrates: ${macroPercentages.carbsPercent}%`}
              />
            </div>
            <div className="macro-total">{Math.round(summary.totalCarbs)}g total</div>
          </div>

          <div className="macro-bar-item">
            <div className="macro-bar-header">
              <span className="macro-name">Fat</span>
              <span className="macro-percentage">{macroPercentages.fatPercent}%</span>
            </div>
            <div className="macro-bar">
              <div
                className="macro-bar-fill fat-fill"
                style={{ width: `${macroPercentages.fatPercent}%` }}
                role="progressbar"
                aria-valuenow={macroPercentages.fatPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Fat: ${macroPercentages.fatPercent}%`}
              />
            </div>
            <div className="macro-total">{Math.round(summary.totalFat)}g total</div>
          </div>
        </div>

        <div className="macro-info">
          <p>
            <strong>Recommended ranges:</strong> Protein 10-35%, Carbs 45-65%, Fat 20-35%
          </p>
        </div>
      </section>

      {/* Weekly Totals */}
      <section className="nutrition-section weekly-totals">
        <h3>Weekly Totals</h3>
        <div className="totals-grid">
          <div className="total-item">
            <div className="total-label">Total Calories</div>
            <div className="total-value">{Math.round(summary.totalCalories).toLocaleString()}</div>
          </div>
          <div className="total-item">
            <div className="total-label">Total Protein</div>
            <div className="total-value">{Math.round(summary.totalProtein)}g</div>
          </div>
          <div className="total-item">
            <div className="total-label">Total Carbs</div>
            <div className="total-value">{Math.round(summary.totalCarbs)}g</div>
          </div>
          <div className="total-item">
            <div className="total-label">Total Fat</div>
            <div className="total-value">{Math.round(summary.totalFat)}g</div>
          </div>
        </div>
      </section>

      {/* Micronutrients Section */}
      <section className="nutrition-section micronutrients">
        <h3>Micronutrients & Fiber</h3>
        <p className="section-hint">Weekly totals for key vitamins and minerals</p>
        <div className="micronutrient-grid">
          <div className="micronutrient-item">
            <div className="micro-icon">🥬</div>
            <div className="micro-info">
              <div className="micro-name">Fiber</div>
              <div className="micro-value">{Math.round(summary.totalFiber)}g</div>
              <div className="micro-hint">Recommended: 175-245g/week</div>
            </div>
          </div>

          <div className="micronutrient-item">
            <div className="micro-icon">🍊</div>
            <div className="micro-info">
              <div className="micro-name">Vitamin C</div>
              <div className="micro-value">{Math.round(summary.totalVitaminC)}mg</div>
              <div className="micro-hint">Recommended: 630mg/week</div>
            </div>
          </div>

          <div className="micronutrient-item">
            <div className="micro-icon">🥩</div>
            <div className="micro-info">
              <div className="micro-name">Iron</div>
              <div className="micro-value">{Math.round(summary.totalIron)}mg</div>
              <div className="micro-hint">Recommended: 56-126mg/week</div>
            </div>
          </div>

          <div className="micronutrient-item">
            <div className="micro-icon">🥛</div>
            <div className="micro-info">
              <div className="micro-name">Calcium</div>
              <div className="micro-value">{Math.round(summary.totalCalcium)}mg</div>
              <div className="micro-hint">Recommended: 7,000-9,100mg/week</div>
            </div>
          </div>

          <div className="micronutrient-item">
            <div className="micro-icon">🧂</div>
            <div className="micro-info">
              <div className="micro-name">Sodium</div>
              <div className="micro-value">{Math.round(summary.totalSodium)}mg</div>
              <div className="micro-hint">Limit: &lt;16,100mg/week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Insights */}
      <section className="nutrition-section health-insights">
        <h3>Health Insights</h3>
        <div className="insights-list">
          {summary.totalFiber >= 175 && (
            <div className="insight-item positive">
              <span className="insight-icon">✅</span>
              <span className="insight-text">
                Great fiber intake! Your meal plan provides {Math.round(summary.totalFiber)}g of fiber per week.
              </span>
            </div>
          )}
          {summary.totalFiber < 175 && (
            <div className="insight-item warning">
              <span className="insight-icon">⚠️</span>
              <span className="insight-text">
                Consider adding more fiber-rich foods. Current intake: {Math.round(summary.totalFiber)}g/week
                (recommended: 175-245g).
              </span>
            </div>
          )}

          {summary.totalSodium > 16100 && (
            <div className="insight-item warning">
              <span className="insight-icon">⚠️</span>
              <span className="insight-text">
                Sodium intake is high ({Math.round(summary.totalSodium)}mg). Try to reduce processed foods and added salt.
              </span>
            </div>
          )}
          {summary.totalSodium <= 16100 && (
            <div className="insight-item positive">
              <span className="insight-icon">✅</span>
              <span className="insight-text">
                Sodium levels are within recommended range.
              </span>
            </div>
          )}

          {macroPercentages.proteinPercent >= 10 && macroPercentages.proteinPercent <= 35 && (
            <div className="insight-item positive">
              <span className="insight-icon">✅</span>
              <span className="insight-text">
                Protein intake is balanced at {macroPercentages.proteinPercent}% of total calories.
              </span>
            </div>
          )}

          {summary.totalVitaminC >= 630 && (
            <div className="insight-item positive">
              <span className="insight-icon">✅</span>
              <span className="insight-text">
                Excellent Vitamin C intake! Your plan provides {Math.round(summary.totalVitaminC)}mg per week.
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
