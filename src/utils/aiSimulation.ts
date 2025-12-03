// Level 1 requirement: Generate Grocery List with AI (simulated)
// This file simulates AI behavior using deterministic rules and mock data

import { PantryItem, DietSettings, TimelineSettings, GeneratedMeal, GroceryItem, StoreSuggestion } from '../types';

// Mock recipe database with diet tags
const RECIPE_DATABASE: Omit<GeneratedMeal, 'id'>[] = [
  {
    title: "Vegetable Stir Fry",
    description: "Quick and healthy vegetable stir fry with rice",
    ingredients: ["bell peppers", "broccoli", "carrots", "soy sauce", "rice", "garlic", "ginger"],
    dietTags: ["vegetarian", "vegan"],
    servings: 4
  },
  {
    title: "Grilled Chicken Salad",
    description: "Fresh salad with grilled chicken breast",
    ingredients: ["chicken breast", "lettuce", "tomatoes", "cucumbers", "olive oil", "lemon"],
    dietTags: ["low-carb", "gluten-free"],
    servings: 2
  },
  {
    title: "Pasta Primavera",
    description: "Pasta with seasonal vegetables",
    ingredients: ["pasta", "zucchini", "tomatoes", "garlic", "olive oil", "parmesan"],
    dietTags: ["vegetarian"],
    servings: 4
  },
  {
    title: "Quinoa Buddha Bowl",
    description: "Nutritious bowl with quinoa and roasted vegetables",
    ingredients: ["quinoa", "sweet potato", "chickpeas", "kale", "tahini", "lemon"],
    dietTags: ["vegetarian", "vegan", "gluten-free"],
    servings: 2
  },
  {
    title: "Baked Salmon with Asparagus",
    description: "Omega-3 rich salmon with roasted asparagus",
    ingredients: ["salmon", "asparagus", "lemon", "olive oil", "garlic"],
    dietTags: ["low-carb", "gluten-free"],
    servings: 2
  },
  {
    title: "Lentil Curry",
    description: "Hearty and flavorful lentil curry",
    ingredients: ["lentils", "coconut milk", "curry powder", "onions", "garlic", "ginger", "rice"],
    dietTags: ["vegetarian", "vegan", "gluten-free"],
    servings: 4
  },
  {
    title: "Turkey Chili",
    description: "Lean turkey chili with beans",
    ingredients: ["ground turkey", "kidney beans", "tomatoes", "onions", "chili powder", "bell peppers"],
    dietTags: ["low-carb", "gluten-free"],
    servings: 6
  },
  {
    title: "Caprese Sandwich",
    description: "Fresh mozzarella, tomato and basil sandwich",
    ingredients: ["bread", "mozzarella", "tomatoes", "basil", "balsamic vinegar"],
    dietTags: ["vegetarian"],
    servings: 2
  }
];

// Check if ingredient is an allergen or conflicts with diet
function isIngredientAllowed(ingredient: string, dietSettings: DietSettings): boolean {
  const allergenCheck = [...dietSettings.allergies, ...dietSettings.customAllergies.toLowerCase().split(',').map(a => a.trim())];

  // Check for allergens
  for (const allergen of allergenCheck) {
    if (allergen && ingredient.toLowerCase().includes(allergen.toLowerCase())) {
      return false;
    }
  }

  return true;
}

// Check if recipe matches diet goals
function recipeMatchesDiet(recipe: Omit<GeneratedMeal, 'id'>, dietSettings: DietSettings): boolean {
  const userGoals = [...dietSettings.goals];

  // If user has specific diet goals, recipe must have matching tags
  if (userGoals.length > 0) {
    return userGoals.some(goal => recipe.dietTags.includes(goal));
  }

  return true;
}

// Check if recipe contains allergens
function recipeContainsAllergens(recipe: Omit<GeneratedMeal, 'id'>, dietSettings: DietSettings): boolean {
  return !recipe.ingredients.every(ing => isIngredientAllowed(ing, dietSettings));
}

// Main AI simulation function
export function simulateAIGeneration(
  pantryItems: PantryItem[],
  dietSettings: DietSettings,
  timelineSettings: TimelineSettings
): { meals: GeneratedMeal[], groceryList: GroceryItem[], storeSuggestions: StoreSuggestion[] } {

  // Filter recipes based on diet and allergies
  const suitableRecipes = RECIPE_DATABASE.filter(recipe =>
    recipeMatchesDiet(recipe, dietSettings) &&
    !recipeContainsAllergens(recipe, dietSettings)
  );

  // Select meals based on cooking frequency
  const numberOfMeals = Math.min(timelineSettings.cookingFrequency, suitableRecipes.length);
  const selectedRecipes = suitableRecipes.slice(0, numberOfMeals);

  // Generate meal objects with IDs
  const meals: GeneratedMeal[] = selectedRecipes.map((recipe, index) => ({
    ...recipe,
    id: `meal-${Date.now()}-${index}`
  }));

  // Collect all required ingredients
  const requiredIngredients = new Map<string, { quantity: number, unit: string, category: string }>();

  meals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      if (!requiredIngredients.has(ingredient)) {
        requiredIngredients.set(ingredient, {
          quantity: 1,
          unit: categorizeUnit(ingredient),
          category: categorizeIngredient(ingredient)
        });
      } else {
        const current = requiredIngredients.get(ingredient)!;
        current.quantity += 1;
      }
    });
  });

  // Check what's already in pantry
  const pantryNames = new Set(pantryItems.map(item => item.name.toLowerCase()));

  // Generate grocery list (only items not in pantry)
  const groceryList: GroceryItem[] = [];
  requiredIngredients.forEach((details, ingredientName) => {
    if (!pantryNames.has(ingredientName.toLowerCase())) {
      groceryList.push({
        id: `grocery-${Date.now()}-${ingredientName}`,
        name: ingredientName,
        quantity: details.quantity,
        unit: details.unit,
        category: details.category
      });
    }
  });

  // Level 2 requirement: Suggest Cheaper Store Splits (mock data)
  const storeSuggestions: StoreSuggestion[] = generateStoreSuggestions(groceryList);

  return { meals, groceryList, storeSuggestions };
}

// Categorize ingredient into grocery category
function categorizeIngredient(ingredient: string): string {
  const produce = ['bell peppers', 'broccoli', 'carrots', 'lettuce', 'tomatoes', 'cucumbers',
                   'zucchini', 'kale', 'asparagus', 'onions', 'garlic', 'ginger', 'lemon',
                   'basil', 'sweet potato'];
  const protein = ['chicken breast', 'salmon', 'ground turkey', 'chickpeas', 'lentils', 'kidney beans'];
  const grains = ['rice', 'pasta', 'quinoa', 'bread'];
  const dairy = ['parmesan', 'mozzarella'];

  if (produce.some(p => ingredient.toLowerCase().includes(p))) return 'Produce';
  if (protein.some(p => ingredient.toLowerCase().includes(p))) return 'Protein';
  if (grains.some(g => ingredient.toLowerCase().includes(g))) return 'Grains';
  if (dairy.some(d => ingredient.toLowerCase().includes(d))) return 'Dairy';

  return 'Other';
}

// Determine unit for ingredient
function categorizeUnit(ingredient: string): string {
  const byPound = ['chicken breast', 'salmon', 'ground turkey'];
  const byCup = ['rice', 'quinoa', 'lentils'];
  const byPiece = ['bell peppers', 'tomatoes', 'cucumbers', 'lemon'];

  if (byPound.some(p => ingredient.toLowerCase().includes(p))) return 'lb';
  if (byCup.some(c => ingredient.toLowerCase().includes(c))) return 'cup';
  if (byPiece.some(p => ingredient.toLowerCase().includes(p))) return 'piece';

  return 'unit';
}

// Level 2 requirement: Generate cheaper store suggestions (mock data)
function generateStoreSuggestions(groceryList: GroceryItem[]): StoreSuggestion[] {
  const suggestions: StoreSuggestion[] = [];

  // Mock store price logic
  const produceItems = groceryList.filter(item => item.category === 'Produce');
  const proteinItems = groceryList.filter(item => item.category === 'Protein');
  const grainItems = groceryList.filter(item => item.category === 'Grains');

  if (produceItems.length > 0) {
    suggestions.push({
      item: `${produceItems.length} produce items`,
      store: "Farmer's Market",
      estimatedSavings: "$3-5"
    });
  }

  if (proteinItems.length > 0) {
    suggestions.push({
      item: proteinItems[0].name,
      store: "Costco",
      estimatedSavings: "$4-8"
    });
  }

  if (grainItems.length > 0) {
    suggestions.push({
      item: `${grainItems.length} grain items`,
      store: "Trader Joe's",
      estimatedSavings: "$2-4"
    });
  }

  return suggestions;
}
