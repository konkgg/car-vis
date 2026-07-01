import { CARS } from '../../cars/catalog';
import { useVisualizerStore } from '../../store/visualizerStore';

export function CarSelector() {
  const { carId, setCarId } = useVisualizerStore();

  return (
    <section className="panel-section">
      <h2 className="section-title">Vehicle</h2>
      <div className="car-grid">
        {CARS.map((car) => (
          <button
            key={car.id}
            className={`car-card ${carId === car.id ? 'active' : ''}`}
            onClick={() => setCarId(car.id)}
          >
            <span className="car-card-name">{car.name}</span>
            <span className="car-card-meta">
              {car.manufacturer} · {car.year}
            </span>
          </button>
        ))}
      </div>
      <p className="hint">More vehicles can be added to the catalog.</p>
    </section>
  );
}
