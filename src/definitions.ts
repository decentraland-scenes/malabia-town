import { type Vector3, type Quaternion } from "@dcl/sdk/math"

export type BlenderTransform = {
    position:Vector3,
    rotation:Quaternion,
    scale:Vector3
}
