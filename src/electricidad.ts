import { engine, Entity, Transform } from "@dcl/sdk/ecs"

@Component('electricidad')
export class ElectricidadComponent {
  entity_frames: Entity[]
  frame: number
  base_transform: Transform
  gltf_frames: GLTFShape[]
  looping: boolean
  playing: boolean
  constructor() {
    this.entity_frames = []
    this.frame = 0
    this.base_transform = new Transform()
    this.gltf_frames = []
    this.looping = true
    this.playing = true
  }

  playOnce() {
    this.frame = 0
    this.looping = false
    this.playing = true
  }
}

export class Electricidad extends Entity {
  constructor(electricidad_pasillo_frames: GLTFShape[]) {
    super()

    const elect_component = new ElectricidadComponent()
    this.addComponent(elect_component)

    elect_component.gltf_frames = electricidad_pasillo_frames

    for (let n = 0; n < electricidad_pasillo_frames.length; n++) {
      elect_component.entity_frames.push(new Entity())
      elect_component.entity_frames[n].addComponent(
        electricidad_pasillo_frames[n]
      )
      elect_component.entity_frames[n].addComponent(new Transform())
      engine.addEntity(elect_component.entity_frames[n])
      elect_component.entity_frames[n].setParent(this)
    }
  }
}

const electGroup = engine.getComponentGroup(ElectricidadComponent)
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
