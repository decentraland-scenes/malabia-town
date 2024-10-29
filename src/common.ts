// Get distance

import { type BlenderTransform } from './definitions'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import {
  // type ComponentDefinition,
  type Entity,
  Transform
  // engine
} from '@dcl/sdk/ecs'

/*
Note:
This function really returns distance squared, as it's a lot more efficient to calculate.
The square root operation is expensive and isn't really necessary if we compare the result to squared values.
We also use {x,z} not {x,y}. The y-coordinate is how high up it is.
*/
export function distance(pos1: Vector3, pos2: Vector3): number {
  const a = pos1.x - pos2.x
  const b = pos1.y - pos2.y
  const c = pos1.z - pos2.z
  return a * a + b * b + c * c
}

export function distanceIsLessThan(
  pos1: Vector3,
  pos2: Vector3,
  dist: number
): boolean {
  return distance(pos1, pos2) < dist * dist * dist
}

// Random number between 2 numbers
export function randomRange(number1: number, number2: number): number {
  return Math.random() * (number2 - number1) + number1
}

// Random number between 2 numbers
export function randomInt(number1: number, number2: number): number {
  return Math.floor(Math.random() * (number2 - number1) + number1)
}

// Random number between 2 numbers
export function randomIntExcluding(
  number1: number,
  number2: number,
  exclude: number
): number {
  if (number1 === number2) {
    return number1
  }
  let rand = randomInt(number1, number2)
  while (rand === exclude) {
    rand = randomInt(number1, number2)
  }
  return rand
}

//
export function interpolateValue(
  initialTime: number,
  finalTime: number,
  initialValue: number,
  finalValue: number,
  currentTime: number
): number {
  const sample = (currentTime - initialTime) / (finalTime - initialTime)
  const res = (finalValue - initialValue) * sample + initialValue
  return res
}

//

export type Frame = {
  time: number
  value: number
}
export function interpolateAnimation(
  keyframes: Frame[],
  currentTime: number
): number {
  let initialKeyframe = 0
  let finalKeyframe = 0
  for (let k = 0; k < keyframes.length; k++) {
    if (keyframes[k].time > currentTime) {
      if (k > 0) {
        initialKeyframe = k - 1
        finalKeyframe = k
      } else {
        return keyframes[0].value
      }
      break
    }
  }
  //
  return interpolateValue(
    keyframes[initialKeyframe].time,
    keyframes[finalKeyframe].time,
    keyframes[initialKeyframe].value,
    keyframes[finalKeyframe].value,
    currentTime
  )
}

export const fetchRetry = async (
  url: string,
  options: object,
  n: number
): Promise<Response | undefined> => {
  for (let i = 0; i < n; i++) {
    try {
      return await fetch(url, options)
    } catch (err) {
      const isLastAttempt = i + 1 === n
      if (isLastAttempt) throw err
    }
  }
}

export function isInsideSquare(
  x: number,
  y: number,
  lowX: number,
  highX: number,
  lowY: number,
  highY: number
): boolean {
  if (x < lowX || x > highX || y < lowY || y > highY) {
    return false
  }
  return true
}

export function dot(v1: Vector3, v2: Vector3): number {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
}

export function getGlobalPosition(entity: Entity): Vector3 {
  const entityTransfrom = Transform.getOrNull(entity)
  const entityPosition =
    entityTransfrom != null
      ? Vector3.clone(entityTransfrom.position)
      : Vector3.Zero()
  // const parentEntity = (entityTransfrom != null)
  // ? entityTransfrom.parent
  // : null

  // if (parentEntity != null) {
  //   const parentEntityTransform = Transform.getOrNull(parentEntity)
  //   const parentRotation = (parentEntityTransform !== null)
  //     ? Quaternion.create(parentEntityTransform.rotation.x, parentEntityTransform.rotation.y, parentEntityTransform.rotation.z, parentEntityTransform.rotation.w)
  //     : Quaternion.Identity
  //   const resultPosition =  Vector3.add(getGlobalPosition(parentEntity), Vector3.rotate(entityPosition, parentRotation))
  //   return resultPosition
  // }

  return entityPosition
}

export function planeRayIntersection(
  rayVector: Vector3,
  rayPoint: Vector3,
  planePoint: Vector3,
  planeNormal: Vector3
): Vector3 {
  const diff = Vector3.subtract(rayPoint, planePoint)
  const prod1 = Vector3.dot(diff, planeNormal)
  const prod2 = Vector3.dot(rayVector, planeNormal)
  const prod3 = prod1 / prod2
  const intersection = Vector3.subtract(
    rayPoint,
    Vector3.scale(rayVector, prod3)
  )
  return intersection
}

// export function getUniqueEntityByComponent(component: ComponentDefinition<any>) : string | undefined {
//   const inputs = engine.getEntitiesWith(component)
//   for (const key in engine.getEntitiesWith(component)) {
//     if (Object.prototype.hasOwnProperty.call(inputs, key)) {
//       return inputs[key].getComponent(component)
//     }
//   }
// }

export function tiles(
  x: number,
  y: number,
  nx: number,
  ny: number,
  mirror: boolean = false
): number[] {
  const height = 1 / x
  const width = 1 / y
  let uv

  if (!mirror) {
    uv = [
      height * (nx + 1),
      width * ny,
      height * nx,
      width * ny,
      height * nx,
      width * (ny + 1),
      height * (nx + 1),
      width * (ny + 1),
      //
      height * (nx + 1),
      width * ny,
      height * nx,
      width * ny,
      height * nx,
      width * (ny + 1),
      height * (nx + 1),
      width * (ny + 1)
    ]
  } else {
    uv = [
      height * nx,
      width * ny,
      height * (nx + 1),
      width * ny,
      height * (nx + 1),
      width * (ny + 1),
      height * nx,
      width * (ny + 1),
      //
      height * nx,
      width * ny,
      height * (nx + 1),
      width * ny,
      height * (nx + 1),
      width * (ny + 1),
      height * nx,
      width * (ny + 1)
    ]
  }

  // log("UV", uv)
  return uv
}

export function gravityToVelocity(
  force: number,
  invMass: number,
  _gravity: number,
  dt: number
): number {
  // Symplectic Euler
  return force * invMass * dt
}

export function blenderTransform(
  blenderT: BlenderTransform,
  parent?: Entity
): BlenderTransform {
  const position = Vector3.create(
    blenderT.position.x * -1 + 24,
    blenderT.position.z,
    blenderT.position.y * -1 + 24
  )
  let rotation: Quaternion
  if (blenderT.rotation !== undefined) {
    rotation = Quaternion.create(
      blenderT.rotation.x * -1, // X Invert
      blenderT.rotation.z, // Z
      blenderT.rotation.y * -1, // Y Invert
      blenderT.rotation.w * -1 // W Invert
    )
  } else {
    rotation = Quaternion.create(1, 0, 0, 0)
  }

  let scale: Vector3
  if (blenderT.scale !== undefined) {
    scale = Vector3.create(blenderT.scale.x, blenderT.scale.z, blenderT.scale.y)
  } else {
    scale = Vector3.One()
  }

  if (parent !== undefined) {
    return {
      position,
      rotation,
      scale,
      parent
    }
  }
  return {
    position,
    rotation,
    scale
  }
}
