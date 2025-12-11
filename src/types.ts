// TypeScript types for AIChef application

// Level 1 requirement: Enter Pantry Items with Quick Add
export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

// Level 1 requirement: Set Diet Goals and Allergies
// Feature 10: Advanced Filtering Options
export interface DietSettings {
  goals: string[]; // e.g., ["vegetarian", "low-carb"]
  customGoals: string;
  allergies: string[]; // e.g., ["dairy", "nuts"]
  customAllergies: string;
  // Advanced filters
  cuisinePreferences?: string[]; // e.g., ["Asian", "Mediterranean"]
  maxCaloriesPerMeal?: number; // Maximum calories per meal
  maxCookingTime?: number; // Maximum cooking time in minutes
}

// Level 1 requirement: Choose Shopping Timeline and Cooking Frequency
export interface TimelineSettings {
  planDays: number; // How many days to plan for
  cookingFrequency: number; // Times per week
  budget: number; // Maximum budget in dollars
}

// Level 1 & 2: Generated meal with recipe details
// Feature 10: Added cuisine and cooking time for advanced filtering
export interface GeneratedMeal {
  id: string;
  title: string;
  description: string;
  ingredients: Array<{
    name: string;
    amount: string;
    calories: number;
    micronutrients: {
      protein: number; // grams
      carbs: number; // grams
      fat: number; // grams
      fiber: number; // grams
      sodium: number; // mg
      vitaminC: number; // mg
      iron: number; // mg
      calcium: number; // mg
    };
  }>;
  dietTags: string[]; // e.g., ["vegetarian", "gluten-free"]
  cuisineType?: string; // e.g., "Asian", "Mediterranean", "Mexican"
  cookingTime?: number; // Estimated cooking time in minutes
  servings: number;
  totalCalories: number;
  micronutrients: {
    protein: number; // grams
    carbs: number; // grams
    fat: number; // grams
    fiber: number; // grams
    sodium: number; // mg
    vitaminC: number; // mg
    iron: number; // mg
    calcium: number; // mg
  };
  dayOfWeek: string; // e.g., "Monday", "Tuesday"
  cookingInstructions: string[];
}

// Level 1: Generated grocery list item
export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string; // e.g., "Produce", "Protein", "Grains"
  pricePerUnit: number; // Price per unit in USD
  totalPrice: number; // Total price for this item
  imageUrl: string; // URL to item image
  storeUrls: Record<string, string>; // URLs to product pages at different stores
}

// Level 2: Store suggestion for cheaper shopping
export interface StoreSuggestion {
  item: string;
  store: string;
  estimatedSavings: string;
}

// Level 1: Preset that can be saved and loaded from localStorage
// Feature 12: Enhanced preset system with categories and descriptions
export interface SavedPreset {
  id: string;
  name: string;
  pantryItems: PantryItem[];
  dietSettings: DietSettings;
  timelineSettings: TimelineSettings;
  savedAt: string;
  category?: string; // e.g., "Budget Friendly", "Quick Meals", "Vegetarian", "Custom"
  description?: string; // User notes about the preset
}

// App state combining all data
export interface AppState {
  pantryItems: PantryItem[];
  dietSettings: DietSettings;
  timelineSettings: TimelineSettings;
  generatedMeals: GeneratedMeal[];
  groceryList: GroceryItem[];
  storeSuggestions: StoreSuggestion[];
  estimatedCost: number;
  isGenerating: boolean;
  hasGenerated: boolean;
}
