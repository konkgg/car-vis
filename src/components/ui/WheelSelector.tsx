import { WHEELS } from '../../cars/catalog';
import { useVisualizerStore } from '../../store/visualizerStore';

const STYLE_ICONS: Record<string, string> = {
  sport: '⚡',
  classic: '✦',
  offroad: '⛰',
  luxury: '◆',
};

export function WheelSelector() {
  const { wheelId, setWheelId } = useVisualizerStore();

  return (
    <section className="panel-section">
      <h2 className="section-title">Wheels</h2>
      <div className="wheel-grid">
        {WHEELS.map((wheel) => (
          <button
            key={wheel.id}
            className={`wheel-card ${wheelId === wheel.id ? 'active' : ''}`}
            onClick={() => setWheelId(wheel.id)}
          >
            <span className="wheel-icon">{STYLE_ICONS[wheel.style]}</span>
            <span className="wheel-name">{wheel.name}</span>
            <span className="wheel-desc">{wheel.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
