# CS 420/620 Human-Computer Interaction
# Project Part 4: Prototype Implementation - Documentation

**Project**: AIChef - AI Powered Grocery and Meal Planner
**Student Name**: Illya Gavlovskyi
**Team Number**: T19
**Due Date**: Friday December 12, 2025 at 11:59 pm

---

## Table of Contents
1. [Code Summary (1-2 Pages)](#1-code-summary)
2. [AI Tools Usage Statement](#2-ai-tools-usage-statement)
3. [Submission Instructions](#3-submission-instructions)
4. [Team Contributions](#4-team-contributions-teams-of-2-only)

---

# 1. Code Summary

## 1.1 Project Overview

**Project Name**: AIChef - AI Powered Grocery and Meal Planner
**Technology Stack**: React 18 + TypeScript + Vite
**Architecture**: Single-page application (SPA) with client-side logic only
**Total Lines of Code**: Approximately 2,500+ lines across 13 source files

AIChef helps users save time and reduce waste by planning meals and grocery lists based on three main inputs:
1. Pantry items they already have
2. Diet goals and allergies
3. Shopping timeline, cooking frequency, and budget

## 1.2 Code Organization & Structure

```
cs_420_final_project/
├── src/
│   ├── components/          # React UI components (8 files)
│   │   ├── APITab.tsx       # Placeholder for future API integrations
│   │   ├── CameraTab.tsx    # Placeholder for camera feature
│   │   ├── DietTab.tsx      # Diet goals and allergy selection
│   │   ├── InventoryTab.tsx # Pantry management with quick-add
│   │   ├── MealsTab.tsx     # Displays generated meal plan
│   │   ├── NutritionTab.tsx # Nutrition tracking interface
│   │   ├── PresetManager.tsx# Save/load preset configurations
│   │   ├── ShoppingTab.tsx  # Grocery list and store suggestions
│   │   └── TimelineSection.tsx # Timeline and budget settings
│   ├── utils/
│   │   ├── aiSimulation.ts  # Mock AI engine with recipe filtering (~1500 lines)
│   │   └── localStorage.ts  # Preset save/load functionality
│   ├── App.tsx              # Main app container with state management
│   ├── main.tsx             # Application entry point
│   └── types.ts             # TypeScript type definitions
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```


## 1.3 Core Functionality Implementation

### State Management  
The main container `App.tsx` uses React state to manage pantry items, diet settings, allergies, timeline values, cooking frequency, budget, and all generated results. State is passed into child components through props so each feature stays modular.

### AI Simulation Engine  
`aiSimulation.ts` filters the recipe list using diet goals, allergies, cuisine preferences, calorie limits, and cooking time. The engine selects meals according to the user timeline, collects ingredients, checks the pantry, and creates a categorized grocery list. It also uses mock price data and creates store suggestions.

### User Interface Components

**InventoryTab.tsx**  
Pantry management with manual add, quick add buttons, edit and delete options.

**DietTab.tsx**  
Users choose diet goals, allergies, custom restrictions, cuisine preferences, and advanced limits.

**ShoppingTab.tsx**  
Runs the AI simulation with a generate button. Displays grocery items with prices, images, categories, and budget color indicators.

**MealsTab.tsx**  
Shows selected meals with descriptions, cooking steps, calories, time, servings, and ingredient details.

**PresetManager.tsx**  
Users can save and load presets. Uses browser localStorage for persistence.

## 1.4 Requirements Fulfillment

### Level 1 Requirements  
All Level 1 requirements have been implemented.  
Pantry input. Diet and allergy selection. Timeline values. Cooking frequency. Budget limits. Grocery list generation. Presets.

### Level 2 Requirements  
Two advanced features have been added using mock data.  
Meal suggestions reduce waste by preferring overlapping ingredients. Store split suggestions reduce cost.

### Extra Features  
Nutritional info. Ingredient images. Direct store links. Cuisine filters. Detailed steps. Responsive layout.

## 1.5 Design Patterns and Best Practices

The project uses TypeScript for type safety. Each feature is placed in its own component to keep responsibilities separated. The AI simulation logic stays in the utils folder which keeps logic independent from the UI. The system only runs heavy calculations when needed which improves performance.

## 1.6 Known Limitations and Future Work

Limitations include local only data and no real AI generation. The recipe database is small and prices are estimates.  
Future plans include camera ingredient recognition, full OpenAI recipe generation, real time store price comparison, and exporting lists to mobile devices.

## 1.7 Build and Deployment

Development: `npm run dev`  
Production build: `npm run build`  
Preview build: `npm run preview`  

---

# 2. AI Tools Usage Statement

## 2.1 AI Tools Used

### Claude Code by Anthropic  
**Link**: https://claude.ai/claude-code

**How It Helped**:  
Claude supported me while I made many design decisions for this project. I guided the structure of the interface, the look of each feature, and the way the documentation should be organized. Claude handled heavy lifting after I explained my intentions. I used it to shape the early form of components, write feature drafts, and explore UI ideas that I later refined. I also used it for debugging and code generation.  
I always directed it with detailed prompts about how the feature should behave and how the UI should look and feel.

**Specific Examples**:  
Generated early versions of `aiSimulation.ts`.  
Created documentation drafts from descriptions I provided.  
Helped adjust interface layout after I described the structure I wanted.  
Debugged issues in `PresetManager.tsx`.

### GitHub Copilot  
**Link**: https://github.com/features/copilot

**How It Helped**:  
Copilot filled routine patterns like JSX layouts and repeated CSS structures. It supported recipe data entry and small utility functions. It helped inside the structure that I had already created.

### ChatGPT  
**Link**: https://chat.openai.com

**How It Helped**:  
ChatGPT supported planning and problem solving. It helped think through UI flow, color use, and feature structure after I explained my design choices. It also helped with algorithm ideas for budget tracking and list creation and fixed TypeScript and Vite errors.

## 2.2 What Was Not AI Assisted

The full architecture. The visual layout. Choice of features. Manual testing and bug fixes. Final review of all code. All design decisions and structure choices were created by me.

## 2.3 Reflection on AI Tool Usage

AI tools helped me save time and supported learning i was able to add more features, improve layouts and visuals at a faster rate. They improved productivity and reduced errors. I still needed to review everything closely because suggestions do not always fit the needs of the project. Understanding React, TypeScript, and HCI ideas was important because this allowed me to direct the AI tools clearly.

## 2.4 Ethical Considerations

All generated work was reviewed and understood before use. Attribution is included according to course requirements. The final decisions, project structure, and direction were my own work.

---

# 3. Team Contributions

I worked alone

---

**Student Signature**: Illya Gavlovskyi  
**Date**: December 11, 2025
**Course**: CS 420/620 Human Computer Interaction  
**Instructor**: Dr. Sergiu Dascalu