// Future enhancement placeholder: Camera tab for photo-based recognition

export default function CameraTab() {
  return (
    <div className="camera-tab">
      <h2>Camera Recognition</h2>
      <div className="placeholder-content">
        <div className="placeholder-icon">📷</div>
        <h3>Coming Soon!</h3>
        <p>
          In a future version, you'll be able to use your camera to quickly add pantry items
          by taking photos of ingredients or receipts.
        </p>
        <ul className="feature-list">
          <li>Scan barcodes for instant item recognition</li>
          <li>Take photos of ingredients to auto-detect items</li>
          <li>Upload receipt photos to import purchases</li>
          <li>AI-powered image recognition for accuracy</li>
        </ul>
      </div>
    </div>
  );
}
