import { engine, Material, MeshRenderer } from '@dcl/sdk/ecs'
import { type Color4 } from '@dcl/sdk/math'
import { tiles } from './common'
import { RayComponent } from './definitions'


export const texture = Material.Texture.Common({
  src: 'textures/rays.png'
})

export function createRay(color:Color4): void{
  const ray = engine.addEntity()
  MeshRenderer.setPlane(ray, tiles(2,2,0,0))
  RayComponent.create(ray, {plane: tiles(2,2,0,0)})
  Material.setPbrMaterial(ray, {
    albedoColor: color,
    emissiveIntensity: 5,
    texture,
    alphaTest: 0.5
  })
}

const frames = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1]
]

let frame = 0
export function RaySystem(dt: number): void {
  for (const [ray] of engine.getEntitiesWith(RayComponent)) {
      MeshRenderer.deleteFrom(ray)
      MeshRenderer.setPlane(ray, tiles(2, 2, frames[frame][0], frames[frame][1]))
  }
  frame += 1
  if (frame > 3) {
    frame = 0
  }
}

