import { engine, type Entity, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { AnimationModelsComponent } from './definitions'

export function createModelsAnimation(
  modelsSrcs: string[],
  playing?: boolean,
  looping?: boolean
): Entity {
  const animation = engine.addEntity()
  AnimationModelsComponent.create(animation, {
    gltf_frames: modelsSrcs
  })
  const MutableAnimationModelsComponent =
    AnimationModelsComponent.getMutable(animation)
  if (playing !== undefined) {
    MutableAnimationModelsComponent.playing = playing
  }
  if (looping !== undefined) {
    MutableAnimationModelsComponent.looping = looping
  }

  for (let n = 0; n < modelsSrcs.length; n++) {
    MutableAnimationModelsComponent.entity_frames.push(engine.addEntity())
    GltfContainer.create(MutableAnimationModelsComponent.entity_frames[n], {
      src: modelsSrcs[n]
    })
    Transform.create(MutableAnimationModelsComponent.entity_frames[n], {
      parent: animation
    })
  }
  return animation
}

let timePass: number = 0
export function AnimationModelsSystem(dt: number): void {
  timePass += dt
  if (timePass < 0.1) {
    return
  } else {
    timePass = 0
  }
  for (const [elect] of engine.getEntitiesWith(AnimationModelsComponent)) {
    const mutableAnimationModelsComponent =
      AnimationModelsComponent.getMutable(elect)
    if (!mutableAnimationModelsComponent.playing) {
      for (
        let n = 0;
        n < mutableAnimationModelsComponent.entity_frames.length;
        n++
      ) {
        const frameTransform = Transform.getMutable(
          mutableAnimationModelsComponent.entity_frames[n]
        )
        frameTransform.position.y = -500
      }
      continue
    }
    for (
      let n = 0;
      n < mutableAnimationModelsComponent.entity_frames.length;
      n++
    ) {
      const frameTransform = Transform.getMutable(
        mutableAnimationModelsComponent.entity_frames[n]
      )
      if (n === mutableAnimationModelsComponent.frame) {
        frameTransform.position.y = 0
      } else {
        frameTransform.position.y = -30
      }
    }
    mutableAnimationModelsComponent.frame += 1
    if (
      mutableAnimationModelsComponent.frame >=
      mutableAnimationModelsComponent.entity_frames.length
    ) {
      mutableAnimationModelsComponent.frame = 0
      if (!mutableAnimationModelsComponent.looping) {
        mutableAnimationModelsComponent.playing = false
      }
    }
  }
}
