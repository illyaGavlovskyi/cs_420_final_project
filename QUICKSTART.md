# Quick Start Guide - AIChef

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to the URL shown in terminal (typically http://localhost:5173)

## Demo Script for 5-8 Minute Video

### Introduction (30 seconds)
"Hi, I'm demonstrating AIChef, an AI-powered grocery and meal planner that helps reduce food waste. The app takes your pantry items, dietary preferences, and cooking habits to generate personalized meal plans and shopping lists."

### Step 1: Add Pantry Items (1 minute)
1. You're on the Inventory tab by default
2. Click Quick Add buttons: "Milk", "Eggs", "Rice"
3. Manually add a custom item: "Olive Oil, 1, cup"
4. Show editing: Click Edit on "Rice", change quantity to 2
5. Show deletion: Click Delete on one item

### Step 2: Set Dietary Preferences (1 minute)
1. Click "Diet" tab
2. Check "Vegetarian" under Diet Goals
3. Check "Dairy" under Allergies
4. Scroll down to Timeline section
5. Set Plan Duration to "1 Week"
6. Set Cooking Frequency to "3 times per week"
7. Read the summary showing your selections

### Step 3: Generate Shopping List (1.5 minutes)
1. Click "Shopping" tab
2. Click "Generate Shopping List & Meal Plan" button
3. Wait for loading animation (~2 seconds)
4. Explain: "The AI analyzes my pantry, diet goals, and cooking frequency"
5. Show the generated grocery list organized by category:
   - Produce
   - Protein
   - Grains
   - Other
6. Scroll down to "Cheaper Store Suggestions"
7. Explain: "The app suggests splitting shopping between stores to save money"

### Step 4: View Meal Plan (1.5 minutes)
1. Click "Meals" tab
2. Show the meal cards with:
   - Recipe title and servings
   - Description
   - Diet tags (vegetarian, gluten-free, etc.)
   - Full ingredient lists
3. Explain: "These meals are designed to use overlapping ingredients to reduce waste"
4. Point out meals that share ingredients
5. Scroll to "Benefits" section at bottom

### Step 5: Save and Load Preset (1.5 minutes)
1. Click back to "Inventory" tab
2. Scroll to "Saved Presets" section
3. Click "Save Current Settings as Preset"
4. Enter name: "Weekly Vegetarian Plan"
5. Click "Save Preset"
6. Show the preset card appearing in the list
7. Delete a pantry item to show difference
8. Click "Load" on the saved preset
9. Show that the item is restored

### Step 6: Future Features (30 seconds)
1. Click "Camera" tab
2. Briefly explain future camera recognition
3. Click "API" tab
4. Briefly explain future API integrations

### Conclusion (30 seconds)
"AIChef successfully demonstrates all Level 1 requirements including pantry management, dietary preferences, AI-simulated meal planning, and preset saving. Level 2 features like waste-reducing meal suggestions and store price comparisons are shown with mock data. Thank you!"

## Tips for Recording

- Use full screen mode for cleaner video
- Zoom browser to 110% or 125% for better visibility
- Speak clearly while demonstrating each feature
- Keep mouse movements deliberate and visible
- Point out the requirement levels as you demonstrate features
- If you make a mistake, just keep going naturally

## Troubleshooting

**Port already in use?**
```bash
# Kill the process or use a different port
npm run dev -- --port 5174
```

**Build errors?**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Blank screen?**
- Check browser console (F12) for errors
- Ensure you're on http://localhost:5173 (not https)
- Try clearing browser cache

## Requirements Checklist

Use this to verify all features work before recording:

- [ ] Quick Add buttons work
- [ ] Manual item add works
- [ ] Edit item works
- [ ] Delete item works
- [ ] Diet goal checkboxes work
- [ ] Allergy checkboxes work
- [ ] Timeline dropdowns work
- [ ] Generate button shows loading state
- [ ] Grocery list displays with categories
- [ ] Store suggestions appear
- [ ] Meal cards display with all details
- [ ] Save preset works
- [ ] Load preset works
- [ ] Preset delete works
- [ ] All tabs are accessible
- [ ] Camera tab shows placeholder
- [ ] API tab shows placeholder

All features implemented and tested! Ready for video recording.
