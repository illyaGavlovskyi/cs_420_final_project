// Main application component with tab routing and state management
// AIChef: AI Powered Grocery and Meal Planner - HCI Course Project Part 4

import { useState } from 'react';
import { AppState, PantryItem, DietSettings, TimelineSettings, SavedPreset } from './types';
import { simulateAIGeneration } from './utils/aiSimulation';
import InventoryTab from './components/InventoryTab';
import DietTab from './components/DietTab';
import TimelineSection from './components/TimelineSection';
import ShoppingTab from './components/ShoppingTab';
import MealsTab from './components/MealsTab';
import CameraTab from './components/CameraTab';
import APITab from './components/APITab';
import PresetManager from './components/PresetManager';
import './styles/App.css';

type TabType = 'inventory' | 'diet' | 'shopping' | 'meals' | 'camera' | 'api';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('inventory');

  // Initialize app state
  const [appState, setAppState] = useState<AppState>({
    pantryItems: [],
    dietSettings: {
      goals: [],
      customGoals: '',
      allergies: [],
      customAllergies: ''
    },
    timelineSettings: {
      planDays: 7,
      cookingFrequency: 3,
      budget: 100
    },
    generatedMeals: [],
    groceryList: [],
    storeSuggestions: [],
    estimatedCost: 0,
    isGenerating: false,
    hasGenerated: false
  });

  // Pantry item handlers (Level 1: Enter Pantry Items with Quick Add)
  const handleAddPantryItem = (item: Omit<PantryItem, 'id'>) => {
    const newItem: PantryItem = {
      ...item,
      id: `pantry-${Date.now()}-${Math.random()}`
    };
    setAppState(prev => ({
      ...prev,
      pantryItems: [...prev.pantryItems, newItem]
    }));
  };

  const handleEditPantryItem = (id: string, item: Omit<PantryItem, 'id'>) => {
    setAppState(prev => ({
      ...prev,
      pantryItems: prev.pantryItems.map(i =>
        i.id === id ? { ...item, id } : i
      )
    }));
  };

  const handleDeletePantryItem = (id: string) => {
    setAppState(prev => ({
      ...prev,
      pantryItems: prev.pantryItems.filter(i => i.id !== id)
    }));
  };

  // Diet settings handler (Level 1: Set Diet Goals and Allergies)
  const handleUpdateDiet = (settings: DietSettings) => {
    setAppState(prev => ({
      ...prev,
      dietSettings: settings
    }));
  };

  // Timeline settings handler (Level 1: Choose Shopping Timeline and Cooking Frequency)
  const handleUpdateTimeline = (settings: TimelineSettings) => {
    setAppState(prev => ({
      ...prev,
      timelineSettings: settings
    }));
  };

  // Level 1: Generate Grocery List with AI (simulated)
  const handleGeneratePlan = async () => {
    setAppState(prev => ({ ...prev, isGenerating: true }));

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Run AI simulation
    const { meals, groceryList, storeSuggestions, estimatedCost } = simulateAIGeneration(
      appState.pantryItems,
      appState.dietSettings,
      appState.timelineSettings
    );

    setAppState(prev => ({
      ...prev,
      generatedMeals: meals,
      groceryList,
      storeSuggestions,
      estimatedCost,
      isGenerating: false,
      hasGenerated: true
    }));

    // Auto-switch to shopping tab to show results
    setActiveTab('shopping');
  };

  // Level 1: Save and Load Presets
  const handleLoadPreset = (preset: SavedPreset) => {
    setAppState(prev => ({
      ...prev,
      pantryItems: preset.pantryItems,
      dietSettings: preset.dietSettings,
      timelineSettings: preset.timelineSettings,
      // Clear generated data when loading preset
      generatedMeals: [],
      groceryList: [],
      storeSuggestions: [],
      estimatedCost: 0,
      hasGenerated: false
    }));
  };

  // Feature 6: Meal Plan Customization - Regenerate individual meal
  const handleRegenerateMeal = (mealId: string) => {
    // Find a different meal from the recipe database
    const { meals } = simulateAIGeneration(
      appState.pantryItems,
      appState.dietSettings,
      appState.timelineSettings
    );

    // Find the meal to replace
    const mealToReplace = appState.generatedMeals.find(m => m.id === mealId);
    if (!mealToReplace) return;

    // Find a new meal that isn't already in the plan
    const existingTitles = appState.generatedMeals.map(m => m.title);
    const newMeal = meals.find(m => !existingTitles.includes(m.title));

    if (newMeal) {
      // Replace with new meal but keep the same day
      const updatedMeal = { ...newMeal, id: mealId, dayOfWeek: mealToReplace.dayOfWeek };
      const updatedMeals = appState.generatedMeals.map(m =>
        m.id === mealId ? updatedMeal : m
      );

      setAppState(prev => ({
        ...prev,
        generatedMeals: updatedMeals
      }));
    }
  };

  // Feature 6: Delete a meal from the plan
  const handleDeleteMeal = (mealId: string) => {
    const updatedMeals = appState.generatedMeals.filter(m => m.id !== mealId);
    setAppState(prev => ({
      ...prev,
      generatedMeals: updatedMeals
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AIChef</h1>
        <p className="tagline">AI Powered Grocery and Meal Planner</p>
      </header>

      <nav className="app-nav" role="navigation" aria-label="Main navigation">
        <button
          className={`nav-tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
          aria-current={activeTab === 'inventory' ? 'page' : undefined}
        >
          Inventory
        </button>
        <button
          className={`nav-tab ${activeTab === 'diet' ? 'active' : ''}`}
          onClick={() => setActiveTab('diet')}
          aria-current={activeTab === 'diet' ? 'page' : undefined}
        >
          Diet
        </button>
        <button
          className={`nav-tab ${activeTab === 'shopping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shopping')}
          aria-current={activeTab === 'shopping' ? 'page' : undefined}
        >
          Shopping
        </button>
        <button
          className={`nav-tab ${activeTab === 'meals' ? 'active' : ''}`}
          onClick={() => setActiveTab('meals')}
          aria-current={activeTab === 'meals' ? 'page' : undefined}
        >
          Meals
        </button>
        <button
          className={`nav-tab ${activeTab === 'camera' ? 'active' : ''}`}
          onClick={() => setActiveTab('camera')}
          aria-current={activeTab === 'camera' ? 'page' : undefined}
        >
          Camera
        </button>
        <button
          className={`nav-tab ${activeTab === 'api' ? 'active' : ''}`}
          onClick={() => setActiveTab('api')}
          aria-current={activeTab === 'api' ? 'page' : undefined}
        >
          API
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'inventory' && (
          <>
            <InventoryTab
              pantryItems={appState.pantryItems}
              onAddItem={handleAddPantryItem}
              onEditItem={handleEditPantryItem}
              onDeleteItem={handleDeletePantryItem}
            />
            <PresetManager
              currentPantryItems={appState.pantryItems}
              currentDietSettings={appState.dietSettings}
              currentTimelineSettings={appState.timelineSettings}
              onLoadPreset={handleLoadPreset}
            />
          </>
        )}

        {activeTab === 'diet' && (
          <>
            <DietTab
              dietSettings={appState.dietSettings}
              onUpdateDiet={handleUpdateDiet}
            />
            <TimelineSection
              timelineSettings={appState.timelineSettings}
              onUpdateTimeline={handleUpdateTimeline}
            />
            <div className="next-step-hint">
              <p>Ready to see your plan? Go to the Shopping tab and click "Generate"!</p>
            </div>
          </>
        )}

        {activeTab === 'shopping' && (
          <ShoppingTab
            groceryList={appState.groceryList}
            storeSuggestions={appState.storeSuggestions}
            estimatedCost={appState.estimatedCost}
            budget={appState.timelineSettings.budget}
            isGenerating={appState.isGenerating}
            hasGenerated={appState.hasGenerated}
            onGenerate={handleGeneratePlan}
          />
        )}

        {activeTab === 'meals' && (
          <MealsTab
            meals={appState.generatedMeals}
            hasGenerated={appState.hasGenerated}
            onRegenerateMeal={handleRegenerateMeal}
            onDeleteMeal={handleDeleteMeal}
          />
        )}

        {activeTab === 'camera' && <CameraTab />}

        {activeTab === 'api' && <APITab />}
      </main>

      <footer className="app-footer">
        <p>HCI Course Project - Part 4 Prototype</p>
        <p>All AI behavior is simulated. No backend or real API calls.</p>
      </footer>
    </div>
  );
}

export default App;
