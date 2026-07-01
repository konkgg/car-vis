import { CarSelector } from './CarSelector';
import { ColorPanel } from './ColorPanel';
import { WheelSelector } from './WheelSelector';

export function ControlPanel() {
  return (
    <aside className="control-panel">
      <header className="panel-header">
        <h1>CarVis</h1>
        <p>Preview paint, wraps &amp; wheels in 3D</p>
      </header>

      <div className="panel-scroll">
        <CarSelector />
        <ColorPanel />
        <WheelSelector />
      </div>
    </aside>
  );
}
