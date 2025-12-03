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

  return (
    <div className="timeline-section">
      <h3>Shopping Timeline & Cooking Frequency</h3>
      <p>How long should we plan for and how often do you cook?</p>

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
      </div>

      <div className="timeline-summary">
        <p>
          Planning for <strong>{timelineSettings.planDays} days</strong> with{' '}
          <strong>{timelineSettings.cookingFrequency} meals per week</strong>
        </p>
      </div>
    </div>
  );
}
