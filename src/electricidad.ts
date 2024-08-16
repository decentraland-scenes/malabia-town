import { engine, type Entity, GltfContainer, Schemas, Transform } from "@dcl/sdk/ecs"



export const ElectricidadComponent = engine.defineComponent(
	"electricidad",
	{
		entity_frames:  Schemas.Array(Schemas.Entity),
    frame: Schemas.Int,
    base_transform: Schemas.Map({
      position: Schemas.Vector3,
      scale: Schemas.Vector3,
      parent: Schemas.Entity,
      rotation: Schemas.Quaternion			
    }),
    gltf_frames:  Schemas.Array(Schemas.String),
    looping: Schemas.Boolean,
    playing: Schemas.Boolean
	})



// SDK6
// @Component('electricidad')
// export class ElectricidadComponent {
//   entity_frames: Entity[]
//   frame: number
//   base_transform: Transform
//   gltf_frames: string[]
//   looping: boolean
//   playing: boolean
//   constructor() {
//     this.entity_frames = []
//     this.frame = 0
//     this.base_transform = new Transform()
//     this.gltf_frames = []
//     this.looping = true
//     this.playing = true
//   }

//   playOnce() {
//     this.frame = 0
//     this.looping = false
//     this.playing = true
//   }
// }


// export class Electricidad extends Entity {
//   constructor(electricidadPasilloFrames: string[]) {
//     super()
// const elect_component = new ElectricidadComponent()
// this.addComponent(elect_component)

export function createElectricidad(electricidadPasilloFrames:string[]):Entity{
  const electricidad = engine.addEntity()
  ElectricidadComponent.create(electricidad)
  const MutableElectricidadComponent = ElectricidadComponent.getMutable(electricidad)
  MutableElectricidadComponent.gltf_frames = electricidadPasilloFrames

  for (let n = 0; n < electricidadPasilloFrames.length; n++) {
    MutableElectricidadComponent.entity_frames.push(engine.addEntity())
    GltfContainer.create(MutableElectricidadComponent.entity_frames[n], {src:electricidadPasilloFrames[n]})
    Transform.create(MutableElectricidadComponent.entity_frames[n], {parent:electricidad})
  }
  return electricidad
}

const electGroup = engine.getEntitiesWith(ElectricidadComponent)
export class ElectricidadSystem implements ISystem {
  timePass: number = 0
  update(td: number) {
    this.timePass += td
    if (this.timePass < 0.1) {
      return
    }
    this.timePass = 0
    for (const elect of electGroup.entities) {
      const elect_component = elect.getComponent(ElectricidadComponent)
      if (!elect_component.playing) {
        for (let n = 0; n < elect_component.entity_frames.length; n++) {
          const frameTransform =
            elect_component.entity_frames[n].getComponent(Transform)
          frameTransform.position.y = -20
          // engine.removeEntity(elect_component.entity_frames[n])
        }
        continue
      }
      //
      for (let n = 0; n < elect_component.entity_frames.length; n++) {
        const frameTransform =
          elect_component.entity_frames[n].getComponent(Transform)
        if (n === elect_component.frame) {
          frameTransform.position.y = 0
          // engine.addEntity(elect_component.entity_frames[n])
        } else {
          frameTransform.position.y = -20
          // engine.removeEntity(elect_component.entity_frames[n])
        }
      }

      elect_component.frame += 1
      if (elect_component.frame >= elect_component.entity_frames.length) {
        elect_component.frame = 0
        if (!elect_component.looping) {
          elect_component.playing = false
        }
      }
    }
  }
}
