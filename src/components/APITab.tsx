// Future enhancement placeholder: API configuration tab

import { useState } from 'react';

export default function APITab() {
  const [openaiKey, setOpenaiKey] = useState('');
  const [spoonacularKey, setSpoonacularKey] = useState('');

  return (
    <div className="api-tab">
      <h2>API Configuration</h2>
      <div className="api-content">
        <p className="api-intro">
          Configure API keys for enhanced features. Currently in development.
        </p>

        <div className="api-form">
          <div className="form-group">
            <label htmlFor="openai-key">OpenAI API Key</label>
            <input
              id="openai-key"
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              disabled
            />
            <small>Used for intelligent meal planning and recipe suggestions</small>
          </div>

          <div className="form-group">
            <label htmlFor="spoonacular-key">Spoonacular API Key</label>
            <input
              id="spoonacular-key"
              type="password"
              value={spoonacularKey}
              onChange={(e) => setSpoonacularKey(e.target.value)}
              placeholder="Enter API key"
              disabled
            />
            <small>Used for recipe database and nutritional information</small>
          </div>

          <button className="btn-primary" disabled>
            Save API Keys (Coming Soon)
          </button>
        </div>

        <div className="api-info">
          <h3>Future Integration Plans</h3>
          <ul>
            <li>Real-time recipe recommendations from OpenAI</li>
            <li>Detailed nutritional analysis using Spoonacular</li>
            <li>Price comparison using grocery store APIs</li>
            <li>Seasonal ingredient suggestions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
