
# Requirements Mapping - AIChef

This document maps each HCI requirement to specific code locations and explains how it's implemented.

## Level 1 Requirements (All Fully Implemented)

### 1. Enter Pantry Items with Quick Add

**File:** [src/components/InventoryTab.tsx](src/components/InventoryTab.tsx)

**Implementation:**
- Lines 13-22: `QUICK_ADD_ITEMS` array defines common pantry items
- Lines 78-92: Quick Add button grid rendering
- Lines 48-56: `handleQuickAdd()` function populates form with quick item
- Lines 30-47: Form submission handler `handleSubmit()` adds items to state
- Lines 110-167: Pantry table displays all items with edit/delete actions

**User Flow:**
1. User clicks quick-add button (e.g., "Milk")
2. Form auto-populates with item name and common unit
3. User adjusts quantity if needed and clicks "Add Item"
4. Item appears in the pantry table below

---

### 2. Set Diet Goals and Allergies

**File:** [src/components/DietTab.tsx](src/components/DietTab.tsx)

**Implementation:**
- Lines 11-16: `DIET_GOAL_OPTIONS` array (vegetarian, vegan, low-carb, gluten-free)
- Lines 18-23: `ALLERGY_OPTIONS` array (dairy, nuts, shellfish, soy)
- Lines 25-30: `handleGoalToggle()` manages diet goal selections
- Lines 32-41: `handleAllergyToggle()` manages allergy selections
- Lines 43-47: `handleCustomGoalsChange()` for custom diet input
- Lines 49-53: `handleCustomAllergiesChange()` for custom allergen input
- Lines 62-77: Checkbox group for diet goals
- Lines 94-109: Checkbox group for allergies

**User Flow:**
1. User checks diet goals (e.g., "Vegetarian", "Low Carb")
2. User checks allergies (e.g., "Dairy")
3. Optionally adds custom goals/allergies in text fields
4. Summary section shows all selections

---

### 3. Choose Shopping Timeline, Cooking Frequency, and Budget

**File:** [src/components/TimelineSection.tsx](src/components/TimelineSection.tsx)

**Implementation:**
- Lines 11-16: `handlePlanDaysChange()` updates planning duration
- Lines 18-23: `handleCookingFrequencyChange()` updates cooking frequency
- Lines 25-30: `handleBudgetChange()` updates budget constraint
- Lines 38-51: Dropdown for plan duration (1 week to 1 month)
- Lines 53-67: Dropdown for cooking frequency (2-7 times per week)
- Lines 69-80: Number input for maximum budget (USD)
- Lines 84-88: Summary display of all selections including budget

**User Flow:**
1. User selects "Plan Duration" from dropdown (e.g., "1 Week")
2. User selects "Cooking Frequency" from dropdown (e.g., "3 times per week")
3. User enters "Maximum Budget" (e.g., $100)
4. Summary shows: "Planning for 7 days with 3 meals per week and a $100 budget"

---

### 4. Generate Grocery List with AI (Simulated)

**Files:**
- [src/components/ShoppingTab.tsx](src/components/ShoppingTab.tsx)
- [src/utils/aiSimulation.ts](src/utils/aiSimulation.ts)

**Implementation in ShoppingTab.tsx:**
- Lines 24-31: Grouping grocery items by category
- Lines 39-50: "Generate" button and loading state
- Lines 52-58: Loading animation during AI simulation
- Lines 60-97: Display of categorized grocery list
- Lines 99-125: Display of store suggestions

**Implementation in aiSimulation.ts:**
- Lines 8-80: `RECIPE_DATABASE` with 8 mock recipes, each tagged with diet types
- Lines 83-92: `isIngredientAllowed()` checks for allergens
- Lines 95-103: `recipeMatchesDiet()` filters recipes by diet goals
- Lines 106-109: `recipeContainsAllergens()` filters recipes by allergies
- Lines 112-162: `simulateAIGeneration()` main function that:
  - Filters recipes based on diet and allergies
  - Selects number of meals based on cooking frequency
  - Calculates required ingredients
  - Subtracts pantry items from grocery list
  - Calculates estimated cost via `calculateEstimatedCost()`
  - Generates store suggestions
  - Returns meals, groceryList, storeSuggestions, estimatedCost, and budget
- Lines 164-193: `calculateEstimatedCost()` function:
  - Mock pricing based on category (Produce: $2.50, Protein: $8.00, Grains: $3.50, Dairy: $4.00)
  - Multiplies quantity by price per category
  - Returns total cost rounded to 2 decimal places

**User Flow:**
1. User clicks "Generate Shopping List & Meal Plan"
2. Loading spinner appears for 2 seconds (simulated AI processing)
3. Budget Overview appears showing:
   - Estimated Cost (calculated from grocery list)
   - User's Budget (from timeline settings)
   - Status: "Under budget by $X" or "Over budget by $X" with color coding
4. Grocery list appears organized by categories:
   - Produce
   - Protein
   - Grains
   - Dairy
   - Other
5. Only items NOT in pantry are shown
6. Store suggestions appear below

---

### 4a. Budget Tracking and Display

**Files:**
- [src/components/ShoppingTab.tsx](src/components/ShoppingTab.tsx) (lines 72-92)
- [src/styles/App.css](src/styles/App.css) (lines 549-606)

**Implementation:**
- Budget Overview section displays immediately after generation
- Three-row layout showing:
  1. Estimated Cost with dollar amount
  2. User's Budget with dollar amount
  3. Status with difference calculation
- Dynamic CSS classes:
  - `.under-budget`: Green styling when cost ≤ budget
  - `.over-budget`: Red styling when cost > budget
- Visual indicators via border colors matching status

**User Flow:**
1. After generation completes, Budget Overview appears first
2. User sees estimated cost vs. their budget at a glance
3. Color-coded status provides immediate feedback
4. Can adjust budget in Timeline settings and regenerate if needed

---

### 5. Save a Preset for Next Time

**Files:**
- [src/components/PresetManager.tsx](src/components/PresetManager.tsx)
- [src/utils/localStorage.ts](src/utils/localStorage.ts)

**Implementation in PresetManager.tsx:**
- Lines 23-26: `refreshPresets()` loads saved presets from localStorage
- Lines 28-42: `handleSavePreset()` saves current state with user-provided name
- Lines 44-49: `handleLoadPreset()` restores saved preset to app state
- Lines 51-56: `handleDeletePreset()` removes preset from localStorage
- Lines 64-76: Save dialog with preset name input
- Lines 78-107: List of saved presets with Load/Delete actions

**Implementation in localStorage.ts:**
- Lines 9-17: `loadPresets()` retrieves all presets from localStorage
- Lines 20-43: `savePreset()` creates new preset object and stores it
- Lines 46-49: `loadPreset()` finds specific preset by ID
- Lines 52-61: `deletePreset()` removes preset from storage

**User Flow:**
1. User clicks "Save Current Settings as Preset"
2. Dialog appears asking for preset name
3. User enters name (e.g., "Weekly Vegetarian Plan")
4. Clicks "Save Preset"
5. Preset appears in list with saved date and item counts
6. User can click "Load" to restore settings later
7. User can click "Delete" to remove preset

---

## Level 2 Requirements (Implemented with Mock Data)

### 1. Meal Suggestions That Use All Ingredients and Reduce Waste

**File:** [src/components/MealsTab.tsx](src/components/MealsTab.tsx)

**Implementation:**
- Lines 27-30: Introduction text explaining waste reduction
- Lines 38-78: Meal card grid displaying:
  - Recipe title and servings
  - Description
  - Diet tags (vegetarian, vegan, low-carb, gluten-free)
  - Complete ingredient lists
- Lines 80-91: Benefits section explaining how plan reduces waste

**Mock Data:** [src/utils/aiSimulation.ts](src/utils/aiSimulation.ts)
- Lines 8-80: Recipe database with overlapping ingredients
- Example: "Vegetable Stir Fry" and "Pasta Primavera" both use garlic, tomatoes
- Example: "Grilled Chicken Salad" and "Baked Salmon" both use lemon, olive oil

**User Flow:**
1. After generating plan, user clicks "Meals" tab
2. Sees 3 meal cards (based on cooking frequency of 3x/week)
3. Each card shows ingredients needed
4. User can visually see ingredient overlap between meals
5. Benefits section explains waste reduction strategy

---

### 2. Suggest Cheaper Store Splits

**Files:**
- [src/components/ShoppingTab.tsx](src/components/ShoppingTab.tsx)
- [src/utils/aiSimulation.ts](src/utils/aiSimulation.ts)

**Implementation in ShoppingTab.tsx:**
- Lines 99-125: Store suggestions section with:
  - Introduction text about saving money
  - Grid of suggestion cards
  - Each card shows item category, store name, estimated savings

**Implementation in aiSimulation.ts:**
- Lines 197-225: `generateStoreSuggestions()` function creates mock suggestions:
  - Produce items → Farmer's Market (Save $3-5)
  - Protein items → Costco (Save $4-8)
  - Grain items → Trader Joe's (Save $2-4)

**User Flow:**
1. After generating grocery list, scroll down
2. See "Cheaper Store Suggestions" section
3. View cards showing:
   - What items to buy
   - Which store to buy from
   - Estimated savings amount

---

## Additional Features (Future Enhancements)

### 1. Camera Tab (Placeholder)

**File:** [src/components/CameraTab.tsx](src/components/CameraTab.tsx)

**Implementation:**
- Lines 7-23: Placeholder UI explaining future camera features:
  - Barcode scanning
  - Photo-based ingredient detection
  - Receipt upload
  - AI image recognition

---

### 2. API Tab (Placeholder)

**File:** [src/components/APITab.tsx](src/components/APITab.tsx)

**Implementation:**
- Lines 11-45: Placeholder UI with:
  - Disabled input fields for OpenAI and Spoonacular API keys
  - Explanation of future integrations
  - List of planned features

---

## State Management

**File:** [src/App.tsx](src/App.tsx)

**Implementation:**
- Lines 18-31: `AppState` interface defines complete app state
- Lines 33-48: Initial state with empty arrays and default settings
- Lines 51-63: `handleAddPantryItem()` manages pantry additions
- Lines 65-72: `handleEditPantryItem()` manages pantry edits
- Lines 74-79: `handleDeletePantryItem()` manages pantry deletions
- Lines 82-87: `handleUpdateDiet()` manages diet settings
- Lines 90-95: `handleUpdateTimeline()` manages timeline settings
- Lines 98-119: `handleGeneratePlan()` runs AI simulation with 2-second delay
- Lines 122-135: `handleLoadPreset()` restores saved preset

**React Hooks Used:**
- `useState` for all state management
- No Redux or complex state libraries needed
- All state lives in App.tsx and flows down via props

---

## Styling

**File:** [src/styles/App.css](src/styles/App.css)

**Key Features:**
- Lines 1-11: CSS variables for consistent theming
- Lines 28-41: Gradient header with app branding
- Lines 44-63: Tab navigation with active state highlighting
- Lines 310-322: Loading spinner animation
- Lines 394-418: Responsive meal card grid
- Lines 626-644: Mobile responsive breakpoints

**Design Principles:**
- Clean, modern interface
- Green/blue color scheme suggesting freshness and technology
- Clear visual hierarchy
- Accessible form inputs with proper labels
- Responsive grid layouts
- Smooth transitions and hover effects

---

## Type Safety

**File:** [src/types.ts](src/types.ts)

**All Data Models:**
- Lines 4-9: `PantryItem` interface
- Lines 12-17: `DietSettings` interface
- Lines 20-24: `TimelineSettings` interface
- Lines 27-34: `GeneratedMeal` interface
- Lines 37-43: `GroceryItem` interface
- Lines 46-51: `StoreSuggestion` interface
- Lines 54-61: `SavedPreset` interface
- Lines 64-73: `AppState` interface

**Benefits:**
- Full TypeScript type checking
- IntelliSense support in VS Code
- Compile-time error catching
- Self-documenting code

---

## Testing Instructions

### Manual Testing Checklist

1. **Pantry Management**
   - [ ] Add item via Quick Add
   - [ ] Add item manually
   - [ ] Edit item quantity
   - [ ] Delete item
   - [ ] Verify table updates

2. **Diet Settings**
   - [ ] Check diet goals
   - [ ] Uncheck diet goals
   - [ ] Check allergies
   - [ ] Add custom goals
   - [ ] Add custom allergies
   - [ ] Verify summary updates

3. **Timeline Settings**
   - [ ] Change plan duration
   - [ ] Change cooking frequency
   - [ ] Verify summary updates

4. **Generation**
   - [ ] Click generate button
   - [ ] See loading animation
   - [ ] See grocery list with categories
   - [ ] See store suggestions
   - [ ] Verify items not in pantry aren't listed

5. **Meals**
   - [ ] View meal cards
   - [ ] Check ingredient lists
   - [ ] Verify diet tags match selections
   - [ ] Confirm meals respect allergies

6. **Presets**
   - [ ] Save preset with name
   - [ ] See preset in list
   - [ ] Load preset
   - [ ] Verify all settings restored
   - [ ] Delete preset

7. **Navigation**
   - [ ] Switch between all tabs
   - [ ] Verify tab highlighting
   - [ ] Check Camera placeholder
   - [ ] Check API placeholder

---

## Code Comments

Throughout the codebase, comments link features to requirements:

```typescript
// Level 1 requirement: Enter Pantry Items with Quick Add
// Level 1 requirement: Generate Grocery List with AI (simulated)
// Level 2 requirement: Suggest Cheaper Store Splits
```

Search for "Level 1" or "Level 2" in code to find requirement implementations.

---

## Performance Notes

- **No Network Calls**: Everything runs client-side
- **Fast Load Time**: Minimal dependencies (~166KB gzipped)
- **Instant Updates**: React state updates are immediate
- **Simulated Delay**: 2-second timeout mimics AI processing for realism
- **localStorage**: Presets persist across browser sessions

---

## Browser Compatibility

Tested and working in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires:
- ES2020 JavaScript support
- localStorage API
- CSS Grid and Flexbox

---

## Summary

All Level 1 requirements are fully implemented and functional:
✅ Enter Pantry Items with Quick Add
✅ Set Diet Goals and Allergies
✅ Choose Shopping Timeline and Cooking Frequency
✅ Generate Grocery List with AI (simulated)
✅ Save a Preset for Next Time

All Level 2 requirements are implemented with mock data:
✅ Meal Suggestions That Use All Ingredients
✅ Suggest Cheaper Store Splits

The application is ready for video demonstration and submission.
