import { getCarById, getWheelById, WRAP_PRESETS } from '../../cars/catalog';
import { useVisualizerStore } from '../../store/visualizerStore';
import { CoupeBody, SedanBody } from './CarBody';
import { GltfCar } from './GltfCar';
import { Wheel } from './Wheel';

export function CarModel() {
  const { carId, color, finish, surfaceType, wrapPresetId, wheelId } = useVisualizerStore();
  const car = getCarById(carId);
  const wheel = getWheelById(wheelId);

  const wrapPreset = wrapPresetId
    ? WRAP_PRESETS.find((w) => w.id === wrapPresetId)
    : undefined;

  const bodyProps = {
    color,
    finish,
    surfaceType,
    wrapPattern: wrapPreset?.pattern,
    wrapAccentHex: wrapPreset?.accentHex,
  };

  const mounts = Object.values(car.wheelMounts) as [number, number, number][];

  return (
    <group>
      {car.modelPath ? (
        <GltfCar car={car} {...bodyProps} />
      ) : car.proceduralType === 'coupe' ? (
        <CoupeBody {...bodyProps} />
      ) : (
        <SedanBody {...bodyProps} />
      )}

      {mounts.map((pos, i) => (
        <Wheel key={`${wheelId}-${i}`} wheel={wheel} position={pos} />
      ))}
    </group>
  );
}
