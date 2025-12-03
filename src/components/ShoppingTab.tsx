// Level 1 requirement: Generate Grocery List with AI
// Level 2 requirement: Suggest Cheaper Store Splits

import { GroceryItem, StoreSuggestion } from '../types';

interface ShoppingTabProps {
  groceryList: GroceryItem[];
  storeSuggestions: StoreSuggestion[];
  isGenerating: boolean;
  hasGenerated: boolean;
  onGenerate: () => void;
}

export default function ShoppingTab({
  groceryList,
  storeSuggestions,
  isGenerating,
  hasGenerated,
  onGenerate
}: ShoppingTabProps) {
  // Group grocery items by category
  const groupedItems = groceryList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const categories = Object.keys(groupedItems).sort();

  return (
    <div className="shopping-tab">
      <h2>Shopping List</h2>

      {!hasGenerated && (
        <div className="generate-section">
          <p>Ready to generate your personalized grocery list and meal plan?</p>
          <button
            className="btn-generate"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Shopping List & Meal Plan'}
          </button>
          <p className="hint">
            We'll use your pantry items, diet goals, and cooking frequency to create a plan that reduces waste.
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>AI is analyzing your preferences and generating your personalized plan...</p>
        </div>
      )}

      {hasGenerated && !isGenerating && (
        <>
          <div className="results-header">
            <p>Your personalized grocery list is ready!</p>
            <button className="btn-secondary" onClick={onGenerate}>
              Regenerate
            </button>
          </div>

          {groceryList.length === 0 ? (
            <div className="no-items">
              <p>Great news! You already have everything you need in your pantry.</p>
            </div>
          ) : (
            <div className="grocery-list">
              <h3>Items to Buy ({groceryList.length})</h3>
              {categories.map((category) => (
                <div key={category} className="category-group">
                  <h4>{category}</h4>
                  <ul>
                    {groupedItems[category].map((item) => (
                      <li key={item.id}>
                        <span className="item-name">{item.name}</span>
                        <span className="item-details">
                          {item.quantity} {item.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {storeSuggestions.length > 0 && (
            <div className="store-suggestions">
              <h3>Cheaper Store Suggestions</h3>
              <p className="section-description">
                Save money by splitting your shopping between these stores:
              </p>
              <div className="suggestions-list">
                {storeSuggestions.map((suggestion, idx) => (
                  <div key={idx} className="suggestion-card">
                    <div className="suggestion-item">{suggestion.item}</div>
                    <div className="suggestion-store">
                      <strong>{suggestion.store}</strong>
                    </div>
                    <div className="suggestion-savings">
                      Save {suggestion.estimatedSavings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
