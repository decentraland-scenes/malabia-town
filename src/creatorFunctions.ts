import { type Entity, ColliderLayer, engine, GltfContainer, Transform } from "@dcl/sdk/ecs"
import { blenderTransform, randomRange } from "./common"
import { type BlenderTransform } from "./definitions"
import { createElectricidad } from "./electricidad"
import { Vector3, Quaternion } from "@dcl/sdk/math"

export type createEntitySrc = string | string[]
export function createEntity(parent: Entity, transform: BlenderTransform, src?: createEntitySrc, collider?:boolean): Entity {
  let entity: Entity
  entity = engine.addEntity()
  if (src !== undefined) {
    if (typeof src === 'string') {
        GltfContainer.create(entity, { src })
        if (collider === true) {
          GltfContainer.getMutable(entity).visibleMeshesCollisionMask = ColliderLayer.CL_PHYSICS
        }
    } else {
      entity = createElectricidad(src, true, true)
    }
    Transform.create(entity, blenderTransform(transform, parent))
  }
  return entity
}

export const lav01T = {
  position: {
    x: -20.1402,
    y: 12.2063,
    z: 1.7013
  },
  rotation: {
    w: 0.742287,
    x: 0.122795,
    y: 0.114263,
    z: 0.64875
  },
  scale: {
    x: 3,
    y: 3,
    z: 3
  }
}

export const lav02T = {
  position: {
    x: -16.0287,
    y: 9.09817,
    z: 2.25433
  },
  rotation: {
    w: -0.0,
    x: 0.0,
    y: 0.165196,
    z: 0.986261
  },
  scale: {
    x: 3,
    y: 3,
    z: 3
  }
}

export const lav03T = {
  position: {
    x: -11.5584,
    y: 10.781,
    z: 2.62601
  },
  rotation: {
    w: 0.356573,
    x: -0.05164,
    y: -0.099501,
    z: -0.927517
  },
  scale: {
    x: 3,
    y: 3,
    z: 3
  }
}

export const rayosT = {
  position: {
    x: -14.4747,
    y: 13.2058,
    z: -0.45502
  },
  rotation: {
    w: 1.0,
    x: 0.0,
    y: 0.0,
    z: 0.0
  },
  scale: {
    x: 1.3212,
    y: 1.3212,
    z: 1.3212
  }
}

export const corazonT = {
  position: {
    x: 4.40177,
    y: -12.1165,
    z: -0.025851
  },
  rotation: {
    w: 0.829947,
    x: 0,
    y: 0,
    z: -0.557842
  },
  scale: {
    x: 2.2603,
    y: 2.2603,
    z: 2.2603
  }
}

export const inodorosT = {
  position: {
    x: 15.002,
    y: 11.71,
    z: 5.15977
  },
  rotation: {
    w: 0.893105,
    x: 0,
    y: 0,
    z: -0.449849
  },
  scale: {
    x: 1,
    y: 1,
    z: 1
  }
}

export const telefonoT = {
  position: {
    x: 19.1859,
    y: -17.98,
    z: -0.012038
  },
  rotation: {
    w: 0.702508,
    x: 0,
    y: 0,
    z: -0.711676
  },
  scale: {
    x: 1.55412,
    y: 1.55412,
    z: 1.55412
  }
}

export const audiosTelefono = [
  'telefono/Audio A.mp3',
  'telefono/Audio B.mp3',
  'telefono/Audio C.mp3',
  'telefono/Audio D.mp3',
  'telefono/Audio E.mp3',
  'telefono/Audio F.mp3',
  'telefono/Audio G.mp3',
  'telefono/Audio H.mp3',
  'telefono/Audio I.mp3',
  'telefono/Audio J.mp3',
  'telefono/Audio K.mp3',
  'telefono/WhatsApp Audio 2021-04-28 at 00.54.02.mp3',
  'telefono/WhatsApp Audio 2021-04-28 at 00.54.27.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 16.13.37.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 16.21.54.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 16.25.44.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 16.33.53.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 16.34.24.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 16.35.33.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 16.36.04.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 17.15.33.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 18.24.37.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 18.26.27.mp3',
  'telefono/WhatsApp Ptt 2021-04-26 at 19.03.03.mp3',
  'telefono/WhatsApp Ptt 2021-04-27 at 12.42.38.mp3',
  'telefono/WhatsApp Ptt 2021-04-27 at 12.43.52.mp3',
  'telefono/WhatsApp Ptt 2021-04-27 at 19.39.29.mp3',
  'telefono/WhatsApp Ptt 2021-04-27 at 23.12.05.mp3',
  'telefono/WhatsApp Ptt 2021-04-28 at 06.04.37.mp3',
  'telefono/WhatsApp Ptt 2021-04-28 at 16.44.23.mp3'
]

export const pantallaT = {
  position: {
    x: -0.602674,
    y: -18.6475,
    z: 2.23974
  },
  rotation: {
    w: 0,
    x: 0,
    y: 0,
    z: 1
  },
  scale: {
    x: 5.32,
    y: 2.0,
    z: 3.3
  }
}

export const antorchasT = [
  {
    position: {
      x: 18.8179,
      y: -8.52734,
      z: 0.035372
    },
    rotation: {
      w: 0.707107,
      x: 0,
      y: 0,
      z: 0.707107
    },
    scale: {
      x: 2.0297,
      y: 2.0297,
      z: 2.0297
    }
  },
  {
    position: {
      x: 12.4945,
      y: -8.52734,
      z: 0.035372
    },
    rotation: {
      w: 0.707107,
      x: 0,
      y: 0,
      z: 0.707107
    },
    scale: {
      x: 2.0297,
      y: 2.0297,
      z: 2.0297
    }
  },
  {
    position: {
      x: 10.0745,
      y: -8.52734,
      z: 0.035372
    },
    rotation: {
      w: 0.707107,
      x: 0,
      y: 0,
      z: 0.707107
    },
    scale: {
      x: 2.0297,
      y: 2.0297,
      z: 2.0297
    }
  }
]

export const mariposaT = {
  position: {
    x: -9.68033,
    y: -0.958399,
    z: 2.27608
  },
  rotation: {
    w: 1.0,
    x: 0,
    y: 0,
    z: 0
  },
  scale: {
    x: 2.0,
    y: 2.0,
    z: 2.0
  }
}

export const mariposaRandomT = {
  position: Vector3.create(
    randomRange(10, 40),
    randomRange(0.5, 2.5),
    randomRange(10, 40)
  ),
  rotation: Quaternion.fromEulerDegrees(0, randomRange(0, 170), 0),
  scale: Vector3.create(1.5, 1.5, 1.5),
}

export const wearablesFrames = [
  'models/wearables-001.gltf',
  'models/wearables-002.gltf',
  'models/wearables-003.gltf',
  'models/wearables-004.gltf',
  'models/wearables-005.gltf'
]

export const labT = {
  position: {
    x: -19.274,
    y: -5.8339,
    z: -0.02173
  },
  rotation: {
    w: 0,
    x: 0,
    y: 0,
    z: 1.0
  },
  scale: {
    x: 2.36082,
    y: 2.36082,
    z: 2.36082
  }
}

export const labFrames = [
  'models/laboratorio-001.gltf',
  'models/laboratorio-002.gltf',
  'models/laboratorio-003.gltf',
  'models/laboratorio-004.gltf',
  'models/laboratorio-005.gltf'
]