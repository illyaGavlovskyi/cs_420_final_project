# Demo Recording Checklist - AIChef

## Pre-Recording Setup

### 1. Environment Preparation
- [ ] Close unnecessary browser tabs
- [ ] Close unnecessary applications
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Clear localStorage: Open DevTools (F12) → Application → Local Storage → Clear
- [ ] Set browser zoom to 110% or 125% for better visibility
- [ ] Hide browser bookmarks bar for cleaner video
- [ ] Use incognito/private mode to start fresh

### 2. Start the Application
```bash
cd cs_420_final_project
npm run dev
```
- [ ] Server starts successfully at http://localhost:5173
- [ ] No console errors (check F12 DevTools)
- [ ] Page loads correctly

### 3. Recording Software Setup
- [ ] Screen recording software ready (OBS, QuickTime, etc.)
- [ ] Microphone tested and working
- [ ] Recording area set to browser window only
- [ ] Audio levels checked

### 4. Browser Setup
- [ ] Full screen mode (F11) or maximize window
- [ ] Cursor/pointer visible
- [ ] Tab "AIChef" visible in browser tab

## Demo Flow (5-8 Minutes)

### Introduction (30 seconds)
- [ ] "Hello, I'm demonstrating AIChef, an AI-powered grocery and meal planner"
- [ ] "It helps users save time and reduce food waste"
- [ ] "The app takes three main inputs: pantry items, dietary preferences, and cooking habits"

### Part 1: Inventory Management (1 minute)
**Show Level 1: Enter Pantry Items with Quick Add**

Actions to perform:
- [ ] Point to "Inventory" tab (already active)
- [ ] Explain Quick Add section
- [ ] Click "Milk" quick-add button
- [ ] Show form auto-populated
- [ ] Click "Add Item"
- [ ] Click "Eggs" quick-add button
- [ ] Change quantity to 2
- [ ] Click "Add Item"
- [ ] Click "Rice" quick-add button
- [ ] Click "Add Item"
- [ ] Show pantry table with 3 items
- [ ] Manually add item: "Olive Oil", quantity 1, unit "cup"
- [ ] Click "Add Item"
- [ ] Show Edit: Click Edit on "Rice", change to 3 pounds
- [ ] Click "Update Item"
- [ ] Show Delete: Click Delete on "Milk"
- [ ] Confirm deletion
- [ ] Final pantry has: Eggs, Rice, Olive Oil

Say: "Quick Add makes it easy to add common items, and I can manually add custom items too"

### Part 2: Diet Settings (1.5 minutes)
**Show Level 1: Set Diet Goals and Allergies**
**Show Level 1: Choose Shopping Timeline and Cooking Frequency**

Actions to perform:
- [ ] Click "Diet" tab
- [ ] Say: "Now I'll set my dietary preferences"
- [ ] Check "Vegetarian" under Diet Goals
- [ ] Check "Low Carb" under Diet Goals
- [ ] Show selections highlighted
- [ ] Check "Dairy" under Allergies
- [ ] Show summary section updates
- [ ] Scroll down to Timeline section
- [ ] Say: "Next I'll set my shopping timeline"
- [ ] Select "1 Week" from Plan Duration dropdown
- [ ] Select "3 times per week" from Cooking Frequency dropdown
- [ ] Show summary: "Planning for 7 days with 3 meals per week"
- [ ] Point to green hint box: "Ready to generate plan"

Say: "The app will remember these preferences and filter recipes accordingly"

### Part 3: Generate Shopping List (2 minutes)
**Show Level 1: Generate Grocery List with AI**
**Show Level 2: Suggest Cheaper Store Splits**

Actions to perform:
- [ ] Click "Shopping" tab
- [ ] Say: "Time to generate my personalized plan"
- [ ] Read the explanation text aloud
- [ ] Click "Generate Shopping List & Meal Plan" button
- [ ] Point to loading spinner
- [ ] Say: "The AI is analyzing my pantry, diet, and cooking frequency"
- [ ] Wait for results (2 seconds)
- [ ] Say: "Great! Here's my personalized grocery list"
- [ ] Scroll through categories:
  - [ ] Point to Produce section
  - [ ] Point to Protein section
  - [ ] Point to Grains section
  - [ ] Point to Other section
- [ ] Say: "Notice items I already have aren't listed"
- [ ] Scroll down to Store Suggestions
- [ ] Say: "The app suggests splitting shopping between stores to save money"
- [ ] Point to each suggestion card
- [ ] Read one example: "Buy produce items at Farmer's Market, save $3-5"

Say: "This smart shopping strategy can save me $10-15 per week"

### Part 4: View Meal Plan (1.5 minutes)
**Show Level 2: Meal Suggestions That Use All Ingredients and Reduce Waste**

Actions to perform:
- [ ] Click "Meals" tab
- [ ] Say: "Let me show you the meal plan that reduces waste"
- [ ] Read intro text about ingredient overlap
- [ ] Point to first meal card
- [ ] Read title and servings
- [ ] Show diet tags: "vegetarian, low-carb"
- [ ] Read ingredient list
- [ ] Point to second meal card
- [ ] Read title and ingredients
- [ ] Say: "Notice these meals share ingredients"
- [ ] Point to shared ingredients (e.g., garlic, olive oil, tomatoes)
- [ ] Scroll to Benefits section
- [ ] Read benefits aloud:
  - [ ] "Uses ingredients across multiple meals"
  - [ ] "Matches your dietary preferences"
  - [ ] "Considers your pantry items"
  - [ ] "Optimized for cooking frequency"

Say: "By sharing ingredients, I reduce waste and save money"

### Part 5: Save and Load Preset (1.5 minutes)
**Show Level 1: Save a Preset for Next Time**

Actions to perform:
- [ ] Click "Inventory" tab
- [ ] Scroll to Saved Presets section
- [ ] Say: "I can save this configuration to reuse later"
- [ ] Click "Save Current Settings as Preset"
- [ ] Type name: "Weekly Vegetarian Plan"
- [ ] Click "Save Preset"
- [ ] Show success alert
- [ ] Point to preset card in list
- [ ] Show preset details: "3 pantry items, 2 diet goals"
- [ ] Say: "Now I'll demonstrate loading it"
- [ ] Scroll up to pantry table
- [ ] Delete "Rice" from pantry
- [ ] Show pantry now has only 2 items
- [ ] Scroll back to presets
- [ ] Click "Load" on saved preset
- [ ] Show confirmation dialog
- [ ] Click OK
- [ ] Show success alert
- [ ] Scroll up to pantry table
- [ ] Show "Rice" is back
- [ ] Say: "Everything is restored"

Say: "This makes it easy to reuse my favorite meal plans"

### Part 6: Future Features (30 seconds)

Actions to perform:
- [ ] Click "Camera" tab
- [ ] Say: "Here's a preview of future features"
- [ ] Point to camera icon
- [ ] Read: "Photo-based recognition coming soon"
- [ ] Quickly scroll through feature list
- [ ] Click "API" tab
- [ ] Say: "And API integrations for real AI"
- [ ] Point to disabled input fields
- [ ] Read future plans section quickly

Say: "These placeholders show the roadmap for enhancing the app"

### Conclusion (30 seconds)

Actions to perform:
- [ ] Click back to "Inventory" tab
- [ ] Say: "Let me summarize what we've seen"
- [ ] Count on fingers or list:
  1. "Pantry management with Quick Add"
  2. "Diet goals and allergy filtering"
  3. "AI-powered meal planning"
  4. "Smart shopping lists with store suggestions"
  5. "Preset saving for convenience"
- [ ] Say: "All Level 1 requirements are fully working"
- [ ] Say: "Level 2 features demonstrate waste reduction and cost savings"
- [ ] Say: "The app runs entirely in the browser with simulated AI"
- [ ] Say: "Thank you for watching!"

## Post-Recording Checklist

### 1. Video Review
- [ ] Watch entire video
- [ ] Check audio quality
- [ ] Verify all features shown
- [ ] Ensure no personal information visible
- [ ] Check video length (5-8 minutes)

### 2. Requirements Verification

Mark off each requirement shown:
- [ ] Level 1: Enter Pantry Items ✅
- [ ] Level 1: Quick Add Feature ✅
- [ ] Level 1: Set Diet Goals ✅
- [ ] Level 1: Set Allergies ✅
- [ ] Level 1: Shopping Timeline ✅
- [ ] Level 1: Cooking Frequency ✅
- [ ] Level 1: Generate Grocery List ✅
- [ ] Level 1: Save Preset ✅
- [ ] Level 1: Load Preset ✅
- [ ] Level 2: Meal Suggestions ✅
- [ ] Level 2: Reduce Waste ✅
- [ ] Level 2: Store Suggestions ✅

### 3. Video Export
- [ ] Export in HD (1080p recommended)
- [ ] Format: MP4 (most compatible)
- [ ] Check file size (< 500 MB if uploading)
- [ ] Test video plays correctly

### 4. Submission Package
- [ ] Video file ready
- [ ] README.md included
- [ ] Source code in zip or GitHub link
- [ ] REQUIREMENTS_MAPPING.md included
- [ ] All documentation files included

## Troubleshooting During Recording

### If App Crashes
1. Stop recording
2. Restart dev server: Ctrl+C, then `npm run dev`
3. Refresh browser
4. Start recording from beginning

### If Feature Doesn't Work
1. Check browser console (F12)
2. Read error message
3. Restart app if needed
4. If persistent, note as known issue

### If You Make a Mistake
- Small mistakes: Keep going, it shows authenticity
- Big mistakes: Pause, fix, resume recording
- Can edit video later if needed

### Audio Tips
- Speak clearly and not too fast
- Pause between sections
- Use natural language, not robotic
- It's OK to say "um" occasionally - sounds human

## Time Budget

Target: 6 minutes total

- Introduction: 0:00 - 0:30 (30 sec)
- Inventory: 0:30 - 1:30 (60 sec)
- Diet Settings: 1:30 - 3:00 (90 sec)
- Generate Shopping: 3:00 - 5:00 (120 sec)
- View Meals: 5:00 - 6:30 (90 sec)
- Save/Load Preset: 6:30 - 8:00 (90 sec)
- Future Features: 8:00 - 8:30 (30 sec)
- Conclusion: 8:30 - 9:00 (30 sec)

Total: ~9 minutes (can cut Future Features section to reach 7-8 min)

## Final Pre-Flight Check

Before hitting record:
- [ ] Deep breath, relax
- [ ] Browser at correct URL
- [ ] No console errors
- [ ] Audio recording
- [ ] Video recording
- [ ] Cursor visible
- [ ] Good lighting
- [ ] No distractions

Ready? **3... 2... 1... RECORD!** 🎬

Good luck! You've got this! 🎉
