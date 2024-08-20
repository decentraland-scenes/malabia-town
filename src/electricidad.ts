import { engine, type Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { ElectricidadComponent } from './definitions'

export function createElectricidad(
  electricidadPasilloFrames: string[], playing?:boolean, looping?:boolean
): Entity {
  const electricidad = engine.addEntity()
  ElectricidadComponent.create(electricidad, {gltf_frames:electricidadPasilloFrames})
  const MutableElectricidadComponent =
    ElectricidadComponent.getMutable(electricidad)
  if (playing !== undefined) {
    MutableElectricidadComponent.playing = playing
    }
    if (looping !== undefined) {
      MutableElectricidadComponent.looping = looping
      }

  for (let n = 0; n < electricidadPasilloFrames.length; n++) {
    MutableElectricidadComponent.entity_frames.push(engine.addEntity())
    GltfContainer.create(MutableElectricidadComponent.entity_frames[n], {
      src: electricidadPasilloFrames[n]
    })
    Transform.create(MutableElectricidadComponent.entity_frames[n], {
      parent: electricidad
    })
  }
  return electricidad
}

export function ElectricidadSystem(dt: number): void {
  for (const [elect] of engine.getEntitiesWith(ElectricidadComponent)) {
    const mutableElectComponent = ElectricidadComponent.getMutable(elect)
    if (!mutableElectComponent.playing) {
      for (let n = 0; n < mutableElectComponent.entity_frames.length; n++) {
        const frameTransform = Transform.getMutable(
          mutableElectComponent.entity_frames[n]
        )
        frameTransform.position.y = -20
      }
      continue
    }
    for (let n = 0; n < mutableElectComponent.entity_frames.length; n++) {
      const frameTransform = Transform.getMutable(
        mutableElectComponent.entity_frames[n]
      )
      if (n === mutableElectComponent.frame) {
        frameTransform.position.y = 0
      } else {
        frameTransform.position.y = -20
      }
    }
    mutableElectComponent.frame += 1
    if (
      mutableElectComponent.frame >= mutableElectComponent.entity_frames.length
    ) {
      mutableElectComponent.frame = 0
      if (!mutableElectComponent.looping) {
        mutableElectComponent.playing = false
      }
    }
  }
}
