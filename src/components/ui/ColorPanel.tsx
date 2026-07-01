import { PAINT_COLORS, WRAP_PRESETS } from '../../cars/catalog';
import { useVisualizerStore } from '../../store/visualizerStore';
import type { PaintFinish } from '../../cars/types';

const FINISHES: { id: PaintFinish; label: string }[] = [
  { id: 'gloss', label: 'Gloss' },
  { id: 'matte', label: 'Matte' },
  { id: 'metallic', label: 'Metallic' },
  { id: 'satin', label: 'Satin' },
];

export function ColorPanel() {
  const {
    surfaceType,
    color,
    finish,
    wrapPresetId,
    setSurfaceType,
    setColor,
    setFinish,
    applyWrapPreset,
  } = useVisualizerStore();

  return (
    <section className="panel-section">
      <h2 className="section-title">Finish</h2>

      <div className="toggle-group">
        <button
          className={`toggle-btn ${surfaceType === 'paint' ? 'active' : ''}`}
          onClick={() => setSurfaceType('paint')}
        >
          Paint
        </button>
        <button
          className={`toggle-btn ${surfaceType === 'wrap' ? 'active' : ''}`}
          onClick={() => setSurfaceType('wrap')}
        >
          Wrap
        </button>
      </div>

      {surfaceType === 'paint' ? (
        <>
          <h3 className="subsection-title">Color</h3>
          <div className="color-grid">
            {PAINT_COLORS.map((preset) => (
              <button
                key={preset.id}
                className={`color-swatch ${color === preset.hex && !wrapPresetId ? 'active' : ''}`}
                style={{ backgroundColor: preset.hex }}
                title={preset.name}
                onClick={() => setColor(preset.hex)}
                aria-label={preset.name}
              />
            ))}
          </div>

          <label className="custom-color">
            <span>Custom</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>

          <h3 className="subsection-title">Finish Type</h3>
          <div className="finish-grid">
            {FINISHES.map((f) => (
              <button
                key={f.id}
                className={`finish-btn ${finish === f.id ? 'active' : ''}`}
                onClick={() => setFinish(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="subsection-title">Wrap Style</h3>
          <div className="wrap-grid">
            {WRAP_PRESETS.map((preset) => (
              <button
                key={preset.id}
                className={`wrap-card ${wrapPresetId === preset.id ? 'active' : ''}`}
                onClick={() => applyWrapPreset(preset.id)}
              >
                <div
                  className="wrap-preview"
                  style={{
                    background:
                      preset.pattern === 'racing-stripes'
                        ? `linear-gradient(90deg, ${preset.hex} 35%, ${preset.accentHex} 35%, ${preset.accentHex} 45%, ${preset.hex} 45%, ${preset.hex} 55%, ${preset.accentHex} 55%, ${preset.accentHex} 65%, ${preset.hex} 65%)`
                        : preset.pattern === 'gradient'
                          ? `linear-gradient(135deg, ${preset.hex}, ${preset.accentHex})`
                          : preset.pattern === 'carbon'
                            ? `repeating-conic-gradient(#2a2a2a 0% 25%, #1a1a1a 0% 50%) 0 0 / 8px 8px`
                            : preset.hex,
                  }}
                />
                <span className="wrap-name">{preset.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
