// Level 1 requirement: Generate Grocery List with AI
// Level 2 requirement: Suggest Cheaper Store Splits

import { useState } from 'react';
import { GroceryItem, StoreSuggestion } from '../types';

interface ShoppingTabProps {
  groceryList: GroceryItem[];
  storeSuggestions: StoreSuggestion[];
  estimatedCost: number;
  budget: number;
  isGenerating: boolean;
  hasGenerated: boolean;
  onGenerate: () => void;
}

export default function ShoppingTab({
  groceryList,
  storeSuggestions,
  estimatedCost,
  budget,
  isGenerating,
  hasGenerated,
  onGenerate
}: ShoppingTabProps) {
  // Store selection state
  const [selectedStore, setSelectedStore] = useState<string>('Walmart');

  // Feature 7: Grocery List Features - Check off items
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const availableStores = [
    'Walmart',
    'Target',
    'Kroger',
    'Whole Foods',
    'Trader Joe\'s',
    'Costco',
    'Safeway',
    'Albertsons'
  ];

  // Group grocery items by category
  const groupedItems = groceryList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const categories = Object.keys(groupedItems).sort();

  // Feature 8: Budget breakdown by category
  const categoryBudgets = categories.map(category => {
    const categoryTotal = groupedItems[category].reduce((sum, item) => sum + item.totalPrice, 0);
    const percentage = estimatedCost > 0 ? (categoryTotal / estimatedCost) * 100 : 0;
    return { category, total: categoryTotal, percentage };
  });

  // Feature 7: Toggle item check
  const handleToggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  // Feature 7: Print grocery list
  const handlePrint = () => {
    window.print();
  };

  // Feature 7: Export as text file
  const handleExportText = () => {
    let text = `AIChef Grocery List\n`;
    text += `Generated on: ${new Date().toLocaleDateString()}\n`;
    text += `Budget: $${budget.toFixed(2)} | Estimated Cost: $${estimatedCost.toFixed(2)}\n\n`;

    categories.forEach(category => {
      text += `${category}:\n`;
      groupedItems[category].forEach(item => {
        const checked = checkedItems.has(item.id) ? '[✓] ' : '[ ] ';
        text += `  ${checked}${item.name} - ${item.quantity} ${item.unit} ($${item.totalPrice.toFixed(2)})\n`;
      });
      text += '\n';
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grocery-list-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Feature 7: Export as CSV
  const handleExportCSV = () => {
    let csv = 'Category,Item,Quantity,Unit,Price per Unit,Total Price,Checked\n';

    categories.forEach(category => {
      groupedItems[category].forEach(item => {
        const checked = checkedItems.has(item.id) ? 'Yes' : 'No';
        csv += `"${category}","${item.name}",${item.quantity},"${item.unit}",${item.pricePerUnit},${item.totalPrice},${checked}\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grocery-list-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            aria-busy={isGenerating}
            aria-label="Generate shopping list and meal plan"
          >
            {isGenerating ? 'Generating...' : 'Generate Shopping List & Meal Plan'}
          </button>
          <p className="hint">
            We'll use your pantry items, diet goals, and cooking frequency to create a plan that reduces waste.
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="loading-state" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <p>AI is analyzing your preferences and generating your personalized plan...</p>
          <span className="sr-only">Loading, please wait</span>
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

          <div className="budget-summary">
            <h3>Budget Overview</h3>
            <div className="budget-details">
              <div className="budget-item">
                <span className="budget-label">Estimated Cost:</span>
                <span className="budget-value">${estimatedCost.toFixed(2)}</span>
              </div>
              <div className="budget-item">
                <span className="budget-label">Your Budget:</span>
                <span className="budget-value">${budget.toFixed(2)}</span>
              </div>
              <div className={`budget-item ${estimatedCost <= budget ? 'under-budget' : 'over-budget'}`}>
                <span className="budget-label">Status:</span>
                <span className="budget-value">
                  {estimatedCost <= budget
                    ? `Under budget by $${(budget - estimatedCost).toFixed(2)}`
                    : `Over budget by $${(estimatedCost - budget).toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Feature 8: Budget Breakdown by Category */}
            <div className="budget-breakdown">
              <h4>Budget Breakdown by Category</h4>
              <div className="budget-category-list">
                {categoryBudgets.map(({ category, total, percentage }) => (
                  <div key={category} className="budget-category-item">
                    <div className="category-info">
                      <span className="category-name">{category}</span>
                      <span className="category-amount">${total.toFixed(2)}</span>
                    </div>
                    <div className="category-bar">
                      <div
                        className="category-bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="category-percentage">{percentage.toFixed(1)}% of total</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 8: Budget Alert */}
            {estimatedCost > budget * 0.9 && estimatedCost <= budget && (
              <div className="budget-alert warning">
                ⚠️ You're approaching your budget limit! ({((estimatedCost / budget) * 100).toFixed(0)}% used)
              </div>
            )}
            {estimatedCost > budget && (
              <div className="budget-alert danger">
                🚨 You've exceeded your budget! Consider removing items or adjusting your budget.
              </div>
            )}
          </div>

          {groceryList.length === 0 ? (
            <div className="no-items">
              <p>Great news! You already have everything you need in your pantry.</p>
            </div>
          ) : (
            <div className="grocery-list">
              <div className="grocery-list-header">
                <h3>Items to Buy ({groceryList.length})</h3>

                {/* Feature 7: Export and Print Actions */}
                <div className="grocery-actions">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="btn-action"
                    aria-label="Print grocery list"
                  >
                    🖨️ Print
                  </button>
                  <button
                    type="button"
                    onClick={handleExportText}
                    className="btn-action"
                    aria-label="Export as text file"
                  >
                    📄 Export TXT
                  </button>
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="btn-action"
                    aria-label="Export as CSV file"
                  >
                    📊 Export CSV
                  </button>
                </div>

                <div className="store-selector">
                  <label htmlFor="store-select">Shop at:</label>
                  <select
                    id="store-select"
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="store-dropdown"
                  >
                    {availableStores.map((store) => (
                      <option key={store} value={store}>
                        {store}
                      </option>
                    ))}
                  </select>
                  <span className="store-hint">Click any item to view it at {selectedStore}</span>
                </div>

                <div className="progress-info">
                  <span>{checkedItems.size} of {groceryList.length} items checked off</span>
                </div>
              </div>

              {categories.map((category) => (
                <div key={category} className="category-group">
                  <h4>{category}</h4>
                  <div className="items-grid">
                    {groupedItems[category].map((item) => (
                      <div
                        key={item.id}
                        className={`grocery-item-card-wrapper ${checkedItems.has(item.id) ? 'checked' : ''}`}
                      >
                        {/* Feature 7: Checkbox for checking off items */}
                        <div className="item-checkbox">
                          <input
                            type="checkbox"
                            checked={checkedItems.has(item.id)}
                            onChange={() => handleToggleItem(item.id)}
                            aria-label={`Mark ${item.name} as purchased`}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <a
                          href={item.storeUrls[selectedStore]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grocery-item-card clickable"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="item-image"
                            onError={(e) => {
                              // Fallback to default image if URL fails
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop';
                            }}
                          />
                          <div className="item-info">
                            <div className="item-name">{item.name}</div>
                            <div className="item-quantity">
                              {item.quantity} {item.unit}
                            </div>
                            <div className="item-pricing">
                              <span className="price-per-unit">
                                ${item.pricePerUnit.toFixed(2)} / {item.unit}
                              </span>
                              <span className="total-price">
                                ${item.totalPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="click-hint">Click to view at {selectedStore}</div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
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
