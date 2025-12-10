// Level 1 requirement: Enter Pantry Items with Quick Add

import { useState } from 'react';
import { PantryItem } from '../types';

interface InventoryTabProps {
  pantryItems: PantryItem[];
  onAddItem: (item: Omit<PantryItem, 'id'>) => void;
  onEditItem: (id: string, item: Omit<PantryItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
}

// Quick add suggestions for common pantry items
const QUICK_ADD_ITEMS = [
  { name: 'Milk', unit: 'gallon' },
  { name: 'Eggs', unit: 'dozen' },
  { name: 'Bread', unit: 'loaf' },
  { name: 'Rice', unit: 'lb' },
  { name: 'Chicken', unit: 'lb' },
  { name: 'Tomatoes', unit: 'lb' },
  { name: 'Onions', unit: 'lb' },
  { name: 'Pasta', unit: 'box' }
];

export default function InventoryTab({ pantryItems, onAddItem, onEditItem, onDeleteItem }: InventoryTabProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('unit');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Feature 5: Pantry Management Enhancements
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'quantity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validation
    if (!name.trim()) {
      setError('Please enter an item name');
      return;
    }

    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setError('Quantity must be a positive number');
      return;
    }

    if (!unit.trim()) {
      setError('Please select a unit');
      return;
    }

    // Check for duplicate items (case-insensitive)
    const isDuplicate = pantryItems.some(
      item => item.name.toLowerCase() === name.trim().toLowerCase() && item.id !== editingId
    );

    if (isDuplicate) {
      setError(`"${name.trim()}" is already in your pantry. Please edit the existing item instead.`);
      return;
    }

    const itemData = {
      name: name.trim(),
      quantity: parsedQuantity,
      unit: unit.trim()
    };

    try {
      if (editingId) {
        onEditItem(editingId, itemData);
        setSuccessMessage(`Updated "${itemData.name}" successfully!`);
        setEditingId(null);
      } else {
        onAddItem(itemData);
        setSuccessMessage(`Added "${itemData.name}" to your pantry!`);
      }

      // Reset form
      setName('');
      setQuantity('1');
      setUnit('unit');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to save item. Please try again.');
    }
  };

  const handleQuickAdd = (quickItem: { name: string; unit: string }) => {
    setName(quickItem.name);
    setUnit(quickItem.unit);
  };

  const handleEdit = (item: PantryItem) => {
    setEditingId(item.id);
    setName(item.name);
    setQuantity(item.quantity.toString());
    setUnit(item.unit);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setQuantity('1');
    setUnit('unit');
    setError(null);
  };

  const handleDelete = (item: PantryItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}" from your pantry?`)) {
      onDeleteItem(item.id);
      setSuccessMessage(`Removed "${item.name}" from pantry`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // Feature 5: Bulk delete functionality
  const handleBulkDelete = () => {
    if (selectedIds.size === 0) {
      setError('Please select items to delete');
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedIds.size} item(s) from your pantry?`)) {
      selectedIds.forEach(id => onDeleteItem(id));
      setSelectedIds(new Set());
      setSuccessMessage(`Removed ${selectedIds.size} item(s) from pantry`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredAndSortedItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAndSortedItems.map(item => item.id)));
    }
  };

  // Feature 5: Filter and sort pantry items
  const filteredAndSortedItems = pantryItems
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        const comparison = a.name.localeCompare(b.name);
        return sortOrder === 'asc' ? comparison : -comparison;
      } else {
        const comparison = a.quantity - b.quantity;
        return sortOrder === 'asc' ? comparison : -comparison;
      }
    });

  return (
    <div className="inventory-tab">
      <h2>Pantry Inventory</h2>
      <p>Add items you already have at home</p>

      {/* Error and Success Messages */}
      {error && (
        <div className="alert alert-error" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="quick-add-section">
        <h3>Quick Add</h3>
        <div className="quick-add-buttons">
          {QUICK_ADD_ITEMS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="quick-add-btn"
              onClick={() => handleQuickAdd(item)}
            >
              + {item.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="add-item-form">
        <h3>{editingId ? 'Edit Item' : 'Add Item'}</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="item-name">Item Name</label>
            <input
              id="item-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Milk, Eggs, Rice"
            />
          </div>
          <div className="form-group">
            <label htmlFor="item-quantity">Quantity</label>
            <input
              id="item-quantity"
              type="number"
              min="0"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="item-unit">Unit</label>
            <select
              id="item-unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="unit">unit</option>
              <option value="lb">lb</option>
              <option value="oz">oz</option>
              <option value="cup">cup</option>
              <option value="gallon">gallon</option>
              <option value="dozen">dozen</option>
              <option value="box">box</option>
              <option value="bag">bag</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Item' : 'Add Item'}
          </button>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="pantry-list">
        <div className="pantry-list-header">
          <h3>Current Pantry Items ({pantryItems.length})</h3>

          {/* Feature 5: Search and Sort Controls */}
          {pantryItems.length > 0 && (
            <div className="pantry-controls">
              <div className="search-box">
                <label htmlFor="search-items">Search:</label>
                <input
                  id="search-items"
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="sort-controls">
                <label htmlFor="sort-by">Sort by:</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'quantity')}
                  className="sort-select"
                >
                  <option value="name">Name</option>
                  <option value="quantity">Quantity</option>
                </select>

                <button
                  type="button"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="sort-order-btn"
                  aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>

              {/* Feature 5: Bulk Actions */}
              <div className="bulk-actions">
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="btn-bulk-delete"
                  disabled={selectedIds.size === 0}
                >
                  Delete Selected ({selectedIds.size})
                </button>
              </div>
            </div>
          )}
        </div>

        {pantryItems.length === 0 ? (
          <p className="empty-message">No items in pantry. Add some items to get started!</p>
        ) : filteredAndSortedItems.length === 0 ? (
          <p className="empty-message">No items match your search.</p>
        ) : (
          <table className="pantry-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filteredAndSortedItems.length}
                    onChange={handleSelectAll}
                    aria-label="Select all items"
                  />
                </th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedItems.map((item) => (
                <tr key={item.id} className={selectedIds.has(item.id) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      aria-label={`Select ${item.name}`}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
