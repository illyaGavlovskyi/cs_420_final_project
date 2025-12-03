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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter an item name');
      return;
    }

    const itemData = {
      name: name.trim(),
      quantity: parseFloat(quantity) || 1,
      unit: unit.trim()
    };

    if (editingId) {
      onEditItem(editingId, itemData);
      setEditingId(null);
    } else {
      onAddItem(itemData);
    }

    // Reset form
    setName('');
    setQuantity('1');
    setUnit('unit');
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
  };

  return (
    <div className="inventory-tab">
      <h2>Pantry Inventory</h2>
      <p>Add items you already have at home</p>

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
        <h3>Current Pantry Items ({pantryItems.length})</h3>
        {pantryItems.length === 0 ? (
          <p className="empty-message">No items in pantry. Add some items to get started!</p>
        ) : (
          <table className="pantry-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pantryItems.map((item) => (
                <tr key={item.id}>
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
                      onClick={() => onDeleteItem(item.id)}
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
