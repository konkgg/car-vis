import { CarViewer } from './components/3d/CarViewer';
import { ControlPanel } from './components/ui/ControlPanel';

function App() {
  return (
    <div className="app">
      <ControlPanel />
      <main className="viewport">
        <CarViewer />
        <div className="viewport-hint">
          Drag to rotate · Scroll to zoom
        </div>
      </main>
    </div>
  );
}

export default App;
