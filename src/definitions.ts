import { engine, type Entity, Schemas } from '@dcl/sdk/ecs'
import { type Quaternion, type Vector3 } from '@dcl/sdk/math'

export type BlenderTransform = {
  position: Vector3
  rotation?: Quaternion
  scale?: Vector3
  parent?: Entity
}

export const AnimationModelsComponent = engine.defineComponent(
  'animationModelsComponent',
  {
    entity_frames: Schemas.Array(Schemas.Entity),
    frame: Schemas.Int,
    base_transform: Schemas.Map({
      position: Schemas.Vector3,
      scale: Schemas.Vector3,
      parent: Schemas.Entity,
      rotation: Schemas.Quaternion
    }),
    gltf_frames: Schemas.Array(Schemas.String),
    looping: Schemas.Boolean,
    playing: Schemas.Boolean
  }
)

export const RayComponent = engine.defineComponent('rayvolt', {
  plane: Schemas.Array(Schemas.Int)
})
