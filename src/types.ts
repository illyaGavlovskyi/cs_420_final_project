// TypeScript types for AIChef application

// Level 1 requirement: Enter Pantry Items with Quick Add
export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

// Level 1 requirement: Set Diet Goals and Allergies
export interface DietSettings {
  goals: string[]; // e.g., ["vegetarian", "low-carb"]
  customGoals: string;
  allergies: string[]; // e.g., ["dairy", "nuts"]
  customAllergies: string;
}

// Level 1 requirement: Choose Shopping Timeline and Cooking Frequency
export interface TimelineSettings {
  planDays: number; // How many days to plan for
  cookingFrequency: number; // Times per week
}

// Level 1 & 2: Generated meal with recipe details
export interface GeneratedMeal {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  dietTags: string[]; // e.g., ["vegetarian", "gluten-free"]
  servings: number;
}

// Level 1: Generated grocery list item
export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string; // e.g., "Produce", "Protein", "Grains"
}

// Level 2: Store suggestion for cheaper shopping
export interface StoreSuggestion {
  item: string;
  store: string;
  estimatedSavings: string;
}

// Level 1: Preset that can be saved and loaded from localStorage
export interface SavedPreset {
  id: string;
  name: string;
  pantryItems: PantryItem[];
  dietSettings: DietSettings;
  timelineSettings: TimelineSettings;
  savedAt: string;
}

// App state combining all data
export interface AppState {
  pantryItems: PantryItem[];
  dietSettings: DietSettings;
  timelineSettings: TimelineSettings;
  generatedMeals: GeneratedMeal[];
  groceryList: GroceryItem[];
  storeSuggestions: StoreSuggestion[];
  isGenerating: boolean;
  hasGenerated: boolean;
}
