// Level 1 requirement: Choose Shopping Timeline and Cooking Frequency

import { TimelineSettings } from '../types';

interface TimelineSectionProps {
  timelineSettings: TimelineSettings;
  onUpdateTimeline: (settings: TimelineSettings) => void;
}

export default function TimelineSection({ timelineSettings, onUpdateTimeline }: TimelineSectionProps) {
  const handlePlanDaysChange = (days: number) => {
    onUpdateTimeline({
      ...timelineSettings,
      planDays: days
    });
  };

  const handleCookingFrequencyChange = (frequency: number) => {
    onUpdateTimeline({
      ...timelineSettings,
      cookingFrequency: frequency
    });
  };

  const handleBudgetChange = (budget: number) => {
    // Ensure budget is not negative
    const validBudget = Math.max(0, budget);
    onUpdateTimeline({
      ...timelineSettings,
      budget: validBudget
    });
  };

  return (
    <div className="timeline-section">
      <h3>Shopping Timeline & Cooking Frequency</h3>
      <p>How long should we plan for, how often do you cook, and what's your budget?</p>

      <div className="timeline-controls">
        <div className="form-group">
          <label htmlFor="plan-days">Plan Duration</label>
          <select
            id="plan-days"
            value={timelineSettings.planDays}
            onChange={(e) => handlePlanDaysChange(parseInt(e.target.value))}
          >
            <option value={7}>1 Week</option>
            <option value={10}>10 Days</option>
            <option value={14}>2 Weeks</option>
            <option value={21}>3 Weeks</option>
            <option value={30}>1 Month</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cooking-frequency">Cooking Frequency (meals per week)</label>
          <select
            id="cooking-frequency"
            value={timelineSettings.cookingFrequency}
            onChange={(e) => handleCookingFrequencyChange(parseInt(e.target.value))}
          >
            <option value={2}>2 times per week</option>
            <option value={3}>3 times per week</option>
            <option value={4}>4 times per week</option>
            <option value={5}>5 times per week</option>
            <option value={6}>6 times per week</option>
            <option value={7}>7 times per week</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Maximum Budget (USD)</label>
          <input
            id="budget"
            type="number"
            min="0"
            step="5"
            value={timelineSettings.budget}
            onChange={(e) => handleBudgetChange(parseInt(e.target.value) || 0)}
            placeholder="e.g., 100"
          />
        </div>
      </div>

      <div className="timeline-summary">
        <p>
          Planning for <strong>{timelineSettings.planDays} days</strong> with{' '}
          <strong>{timelineSettings.cookingFrequency} meals per week</strong> and a{' '}
          <strong>${timelineSettings.budget}</strong> budget
        </p>
      </div>
    </div>
  );
}
