import { engine, Schemas } from "@dcl/sdk/ecs"
import { type Vector3, type Quaternion } from "@dcl/sdk/math"

export type BlenderTransform = {
    position:Vector3,
    rotation:Quaternion,
    scale:Vector3
}

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
  }
)
