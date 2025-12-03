# AIChef - AI Powered Grocery and Meal Planner

**HCI Course Project - Part 4 Frontend Prototype**

AIChef helps users save time and reduce waste by planning meals and grocery lists based on three main inputs:
1. Pantry items they already have
2. Diet goals and allergies
3. Shopping timeline and cooking frequency

## Features Implemented

### Level 1 Requirements (All Implemented)
- **Enter Pantry Items with Quick Add**: Add items manually or use quick-add buttons for common ingredients
- **Set Diet Goals and Allergies**: Select from common options or add custom preferences
- **Choose Shopping Timeline and Cooking Frequency**: Configure how many days to plan for and cooking frequency
- **Generate Grocery List with AI**: Simulated AI generates personalized shopping list and meal plan
- **Save a Preset for Next Time**: Save and load configurations using localStorage

### Level 2 Requirements (Implemented with Mock Data)
- **Meal Suggestions That Use All Ingredients**: Displays meals designed to reduce waste with overlapping ingredients
- **Suggest Cheaper Store Splits**: Shows mock suggestions for where to buy items to save money

### Additional Features
- **Camera Tab**: Placeholder for future photo-based recognition
- **API Tab**: Placeholder for future API integrations (OpenAI, Spoonacular, etc.)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Functional components** with React hooks
- **localStorage** for preset persistence
- **No backend** - all logic runs client-side

## Project Structure

```
cs_420_final_project/
├── src/
│   ├── components/
│   │   ├── APITab.tsx
│   │   ├── CameraTab.tsx
│   │   ├── DietTab.tsx
│   │   ├── InventoryTab.tsx
│   │   ├── MealsTab.tsx
│   │   ├── PresetManager.tsx
│   │   ├── ShoppingTab.tsx
│   │   └── TimelineSection.tsx
│   ├── styles/
│   │   └── App.css
│   ├── utils/
│   │   ├── aiSimulation.ts
│   │   └── localStorage.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Installation & Running

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Access the App
After running `npm run dev`, open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Demo Flow for Video Recording

Follow this flow to demonstrate all features in a 5-8 minute video:

1. **Start on Inventory Tab**
   - Add a few pantry items using Quick Add buttons
   - Add a custom item manually
   - Edit and delete an item

2. **Navigate to Diet Tab**
   - Select one or two diet goals (e.g., Vegetarian)
   - Mark an allergy (e.g., Dairy)
   - Set shopping duration (e.g., 1 Week)
   - Set cooking frequency (e.g., 3 times per week)

3. **Go to Shopping Tab**
   - Click "Generate Shopping List & Meal Plan"
   - Watch the loading animation
   - View the generated grocery list organized by category
   - Scroll down to see "Cheaper Store Suggestions"

4. **Switch to Meals Tab**
   - View detailed meal cards with ingredients and diet tags
   - Show how meals use overlapping ingredients
   - Read the benefits section

5. **Return to Inventory Tab**
   - Click "Save Current Settings as Preset"
   - Name it (e.g., "Weekly Vegetarian Plan")
   - See it appear in the presets list

6. **Demonstrate Preset Loading**
   - Clear some pantry items or change settings
   - Load the saved preset
   - Show that all settings are restored

7. **Show Future Features**
   - Briefly show Camera tab placeholder
   - Briefly show API tab placeholder

## Code Quality Notes

- TypeScript types are defined in [src/types.ts](src/types.ts)
- Comments throughout code link features to HCI requirements
- AI simulation logic is in [src/utils/aiSimulation.ts](src/utils/aiSimulation.ts)
- No real AI or backend - everything runs in the browser
- Deterministic recipe selection based on diet/allergies

## Requirements Mapping

| Requirement | Location | Status |
|------------|----------|--------|
| Enter Pantry Items | [InventoryTab.tsx](src/components/InventoryTab.tsx) | ✅ Level 1 |
| Quick Add Feature | [InventoryTab.tsx](src/components/InventoryTab.tsx) | ✅ Level 1 |
| Set Diet Goals | [DietTab.tsx](src/components/DietTab.tsx) | ✅ Level 1 |
| Set Allergies | [DietTab.tsx](src/components/DietTab.tsx) | ✅ Level 1 |
| Shopping Timeline | [TimelineSection.tsx](src/components/TimelineSection.tsx) | ✅ Level 1 |
| Cooking Frequency | [TimelineSection.tsx](src/components/TimelineSection.tsx) | ✅ Level 1 |
| Generate Grocery List | [ShoppingTab.tsx](src/components/ShoppingTab.tsx) | ✅ Level 1 |
| AI Simulation | [aiSimulation.ts](src/utils/aiSimulation.ts) | ✅ Level 1 |
| Meal Suggestions | [MealsTab.tsx](src/components/MealsTab.tsx) | ✅ Level 2 |
| Store Suggestions | [ShoppingTab.tsx](src/components/ShoppingTab.tsx) | ✅ Level 2 |
| Save Preset | [PresetManager.tsx](src/components/PresetManager.tsx) | ✅ Level 1 |
| Load Preset | [PresetManager.tsx](src/components/PresetManager.tsx) | ✅ Level 1 |

## Future Enhancements

- Camera-based ingredient recognition
- Real OpenAI integration for dynamic recipes
- Real-time price comparison APIs
- Nutritional analysis with Spoonacular
- Export shopping list to mobile devices
- Social features to share meal plans

## License

This is an academic project for HCI course requirements.
