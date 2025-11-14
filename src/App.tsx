import React from 'react';
import { Button } from '@/components/Button';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="app">
      <h1>Component Library - Dev Playground</h1>
      <p className="description">
        This is a development playground for testing components locally.
        <br />
        For component documentation, use Storybook: <code>npm run storybook</code>
      </p>

      <div className="demo-section">
        <h2>Button Component Demo</h2>
        <div className="button-grid">
          <Button variant="primary" onClick={() => setCount(count + 1)}>
            Primary Button
          </Button>
          <Button variant="secondary" onClick={() => setCount(count + 1)}>
            Secondary Button
          </Button>
          <Button variant="outline" onClick={() => setCount(count + 1)}>
            Outline Button
          </Button>
          <Button variant="ghost" onClick={() => setCount(count + 1)}>
            Ghost Button
          </Button>
        </div>

        <div className="button-grid">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>

        <div className="button-grid">
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" loading>
            Loading
          </Button>
          <Button variant="primary" fullWidth>
            Full Width
          </Button>
        </div>

        <p className="counter">Button clicked: {count} times</p>
      </div>

      <div className="info-section">
        <h3>Quick Tips:</h3>
        <ul>
          <li>Edit components in <code>lib/components/</code></li>
          <li>Changes will hot-reload automatically</li>
          <li>Add your test code in <code>src/App.tsx</code></li>
          <li>Design tokens are available via CSS variables</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
