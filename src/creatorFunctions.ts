import {
  type Entity,
  ColliderLayer,
  engine,
  GltfContainer,
  Transform,
  type TransformType
} from '@dcl/sdk/ecs'
import { blenderTransform, randomRange } from './common'
import { type BlenderTransform } from './definitions'
import { createModelsAnimation } from './modelsAnimation'
import { Vector3, Quaternion } from '@dcl/sdk/math'

export type createEntitySrc = string | string[]

// Create Entity with Blender Transform
export function createEntityWBT(
  parent: Entity,
  transform: BlenderTransform,
  src?: createEntitySrc,
  collider?: boolean
): Entity {
  let entity: Entity
  entity = engine.addEntity()
  if (src !== undefined) {
    if (typeof src === 'string') {
      GltfContainer.create(entity, { src })
      if (collider === true) {
        GltfContainer.getMutable(entity).visibleMeshesCollisionMask =
          ColliderLayer.CL_POINTER
      }
    } else {
      entity = createModelsAnimation(src, true, true)
    }
    Transform.create(entity, blenderTransform(transform, parent))
  }
  return entity
}

export function createEntity(
  parent: Entity,
  transform?: Partial<TransformType>,
  src?: createEntitySrc,
  collider?: boolean
): Entity {
  let entity: Entity
  entity = engine.addEntity()
  if (src !== undefined) {
    if (typeof src === 'string') {
      GltfContainer.create(entity, { src })
      if (collider === true) {
        GltfContainer.getMutable(entity).visibleMeshesCollisionMask =
          ColliderLayer.CL_POINTER
      }
    } else {
      entity = createModelsAnimation(src, true, true)
    }
    Transform.create(entity, transform)
    Transform.getMutable(entity).parent = parent
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
  scale: Vector3.create(1.5, 1.5, 1.5)
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

export const wearablesT = {
  position: {
    x: -21.087,
    y: 2.86733,
    z: 1.94923
  },
  rotation: {
    w: 0.707107,
    x: 0,
    y: 0,
    z: 0.707107
  },
  scale: {
    x: 2.71706,
    y: 2.71706,
    z: 2.71706
  }
}

export const donacionT = {
  position: {
    x: 19.1007,
    y: -5.35626,
    z: -0.045355
  },
  rotation: {
    w: 0.707107,
    x: 0,
    y: 0,
    z: -0.707107
  },
  scale: {
    x: 1.6604,
    y: 1.6604,
    z: 1.6604
  }
}

export const pizarronT = {
  position: {
    x: 13.8285,
    y: -3.56206,
    z: 0.921038
  },
  rotation: {
    w: 0.707107,
    x: 0,
    y: 0,
    z: 0.707107
  },
  scale: {
    x: 1.8,
    y: 1.8,
    z: 1.8
  }
}
export const brocheInstagramT = {
  position: {
    x: -21.0653,
    y: -10.3641,
    z: 1.48237
  },
  rotation: {
    w: 0.983209,
    x: 0,
    y: 0,
    z: 0.182481
  },
  scale: {
    x: 1.80515,
    y: 1.80515,
    z: 1.80515
  }
}
export const brocheMalabiaT = {
  position: {
    x: -20.3434,
    y: -10.3641,
    z: 1.475
  },
  rotation: {
    w: 0.977948,
    x: 0,
    y: 0,
    z: -0.208849
  },
  scale: {
    x: 1.80515,
    y: 1.80515,
    z: 1.80515
  }
}
export const cuernoT = {
  position: {
    x: -21.7179,
    y: -10.3455,
    z: 1.50615
  },
  rotation: {
    w: 0.911454,
    x: 0,
    y: 0,
    z: 0.411401
  },
  scale: {
    x: 1.34643,
    y: 1.34643,
    z: 1.34643
  }
}
export const puertaCortinaT = {
  position: {
    x: -8.75564,
    y: -15.1667,
    z: 0.040757
  },
  rotation: {
    w: 1.0,
    x: 0,
    y: 0,
    z: 0
  },
  scale: {
    x: 1.0,
    y: 1.0,
    z: 1.0
  }
}
export const calderoT = {
  position: {
    x: -10.7177,
    y: -14.646,
    z: 0.015462
  },
  rotation: {
    w: 0.707107,
    x: 0,
    y: 0,
    z: 0.707107
  },
  scale: {
    x: 1.0,
    y: 1.0,
    z: 1.0
  }
}
export const fogonazoT = {
  position: {
    x: -10.7177,
    y: -14.646,
    z: 0.893286
  },
  rotation: {
    w: 0.707107,
    x: 0,
    y: 0,
    z: 0.707107
  },
  scale: {
    x: 2.7992,
    y: 2.7992,
    z: 2.7992
  }
}
export const marcoCalderoT = {
  position: {
    x: -10.9323,
    y: -14.4948,
    z: 1.18818
  },
  rotation: {
    w: 0.707107,
    x: 0,
    y: 0,
    z: 0.707107
  },
  scale: {
    x: 0.8,
    y: 0.8,
    z: 0.8
  }
}
export const malabiaUploadT = {
  position: {
    x: -20.6295,
    y: -8.31086,
    z: 1.67004
  },
  rotation: {
    w: 1.0,
    x: 0,
    y: 0,
    z: 0
  },
  scale: {
    x: 1.52028,
    y: 1.52028,
    z: 1.52028
  }
}
export const malabiafxT = {
  position: {
    x: 12.8499,
    y: -12.2241,
    z: 0.015869
  },
  rotation: {
    w: 0.990095,
    x: 0.0,
    y: 0.140401,
    z: 0.0
  },
  scale: {
    x: 1.0,
    y: 1.0,
    z: 1.0
  }
}
export const caballofxT = {
  position: {
    x: 13.955,
    y: 5.47284,
    z: 3.05836
  },
  rotation: {
    w: 1.0,
    x: 0.0,
    y: 0.0,
    z: 0.0
  },
  scale: {
    x: 2.0,
    y: 2.0,
    z: 2.0
  }
}
export const tunelfxT = {
  position: {
    x: -10.5159,
    y: -21.4218,
    z: -0.081034
  },
  rotation: {
    w: -0.707107,
    x: 0.0,
    y: 0.0,
    z: 0.707107
  },
  scale: {
    x: 1.0,
    y: 1.0,
    z: 1.0
  }
}
export const terrazafxT = {
  position: {
    x: -17.8215,
    y: -13.9625,
    z: 5.20759
  },
  rotation: {
    w: 0.625469,
    x: 0.0,
    y: 0.0,
    z: 0.780249
  },
  scale: {
    x: 1.51739,
    y: 1.51739,
    z: 1.51739
  }
}
export const terrazafxFrames = [
  'models/terraza_luz-001.gltf',
  'models/terraza_luz-002.gltf',
  'models/terraza_luz-003.gltf',
  'models/terraza_luz-004.gltf',
  'models/terraza_luz-005.gltf',
  'models/terraza_luz-006.gltf'
]

export const velaFrames = [
  'models/vela-001.gltf',
  'models/vela-002.gltf',
  'models/vela-003.gltf',
  'models/vela-004.gltf',
  'models/vela-005.gltf',
  'models/vela-006.gltf'

]
  
export const velaT = {
  position: {
    x: -16.2303,
    y: 4.13286,
    z: 0.907689
  },
  rotation: {
    w: 0.707107,
    x: 0.0,
    y: 0.0,
    z: 0.707107
  },
  scale: {
    x: 2.73191,
    y: 2.73191,
    z: 2.73191
  }
}
export const exit1T = {
  position: {
    x: -14.6847,
    y: -8.28745,
    z: 2.61304
  },
  rotation: {
    w: 1.0,
    x: 0.0,
    y: 0.0,
    z: 0.0
  },
  scale: {
    x: 2.71864,
    y: 2.71864,
    z: 2.71864
  }
}
export const exit2T = {
  position: {
    x: -14.6847,
    y: -8.02379,
    z: 2.61304
  },
  rotation: {
    w: 0.0,
    x: 0.0,
    y: 0.0,
    z: 1.0
  },
  scale: {
    x: 2.71864,
    y: 2.71864,
    z: 2.71864
  }
}
export const exitFrames = [
  'models/exit-001.gltf',
  'models/exit-002.gltf',
  'models/exit-003.gltf',
  'models/exit-004.gltf'
]
export const portalfxFrames = [
  'models/portal-001.gltf',
  'models/portal-002.gltf',
  'models/portal-003.gltf',
  'models/portal-004.gltf',
  'models/portal-005.gltf',
  'models/portal-006.gltf'
]
export const malabiaUploadFrames = [
  'models/malabia_uploads-001.gltf',
  'models/malabia_uploads-002.gltf',
  'models/malabia_uploads-003.gltf',
  'models/malabia_uploads-004.gltf',
  'models/malabia_uploads-005.gltf',
  'models/malabia_uploads-006.gltf'
]

export const alfombrafxFrames = [
  'models/alfombra-001.gltf',
  'models/alfombra-002.gltf',
  'models/alfombra-003.gltf',
  'models/alfombra-004.gltf',
  'models/alfombra-005.gltf',
  'models/alfombra-006.gltf'
]

export const fogonazoFrames = [
  'models/fogonazo-001.gltf',
  'models/fogonazo-002.gltf',
  'models/fogonazo-003.gltf',
  'models/fogonazo-004.gltf',
  'models/fogonazo-005.gltf',
  'models/fogonazo-006.gltf',
  'models/fogonazo-007.gltf',
  'models/fogonazo-008.gltf',
  'models/fogonazo-009.gltf',
  'models/fogonazo-010.gltf'
]

export const obras = [
  'textures/oraculo/ Daniela Sciata  @danisciata .jpg',
  'textures/oraculo/DSC_5473.jpg',
  'textures/oraculo/DSC_4994.jpg',
  'textures/oraculo/DSC_5567 (1).jpg',
  'textures/oraculo/WhatsApp Image 2021-05-04 at 12.28.19.jpg',
  'textures/oraculo/WhatsApp Image 2021-05-03 at 06.20.12.jpg',
  'textures/oraculo/WhatsApp Image 2021-05-03 at 06.23.33.jpg',
  'textures/oraculo/WhatsApp Image 2021-05-03 at 06.25.15.jpg',
  'textures/oraculo/WhatsApp Image 2021-05-03 at 06.28.50.jpg',
  'textures/oraculo/video Quinteto de Academia en Malabia.mp4',
  'textures/oraculo/Lucia 01.mp4',
  'textures/oraculo/lucia.jpg',
  'textures/oraculo/Lucia 02.mp4',
  'textures/oraculo/lucia02.jpg',
  'textures/oraculo/Juana Varela.jpg',
  'textures/oraculo/@juanavarela_.jpg',
  'textures/oraculo/Karen Magali Romero.jpg',
  //
  'textures/oraculo/IMG-20181010-WA0015~2.jpg',
  'textures/oraculo/IMG_20170227_131716_232.jpg',
  'textures/oraculo/IMG_20170227_225534_708.jpg',
  'textures/oraculo/IMG_20170217_210709_332.jpg',
  'textures/oraculo/IMG_20180227_125637_478.jpg',
  'textures/oraculo/IMG_20180822_123205_370.jpg',
  'textures/oraculo/IMG_20180829_225647_142.jpg',
  'textures/oraculo/IMG_20181101_203711_885.jpg',
  'textures/oraculo/IMG_20190404_193342_728.jpg',
  'textures/oraculo/WP_20160126003 (2).jpg',
  'textures/oraculo/20200621_130659.jpg',
  'textures/oraculo/20200706_133025.jpg',
  'textures/oraculo/IMG_20170531_120753_541.jpg',
  'textures/oraculo/IMG_20180617_215709_HDR.jpg',
  'textures/oraculo/IMG_20180814_185543_HDR.jpg',
  'textures/oraculo/IMG_20180911_221100_823.jpg',
  'textures/oraculo/Picsart2016-15-4--22-43-40.jpg'
]

export const plantafxFrames = [
  'models/planta-001.gltf',
  'models/planta-002.gltf',
  'models/planta-003.gltf',
  'models/planta-004.gltf',
  'models/planta-005.gltf',
  'models/planta-006.gltf'
]

export const tunelfxFrames = [
  'models/tunel-001.gltf',
  'models/tunel-002.gltf',
  'models/tunel-003.gltf',
  'models/tunel-004.gltf',
  'models/tunel-005.gltf',
  'models/tunel-006.gltf'
]

export const caballofxFrames = [
  'models/caballo-001.gltf',
  'models/caballo-002.gltf',
  'models/caballo-003.gltf',
  'models/caballo-004.gltf',
  'models/caballo-005.gltf',
  'models/caballo-006.gltf'
]

export const portales = [
  {
    // Pasillo
    in: Vector3.create(46.17, 1.75, 30.97),
    dist: 1,
    out: [
      { x: 46.17, y: 1.75, z: 28.14 },
      { x: 48.17, y: 1.75, z: 21 }
    ]
  },
  {
    // Vulva
    in: Vector3.create(14, 1.75, 14.6),
    dist: 1,
    out: [
      { x: 14, y: 1.75, z: 11.6 },
      { x: 14, y: 1.75, z: 10.6 }
    ]
  },
  {
    // Lavadero
    in: Vector3.create(38.64, 1.75, 11.42),
    dist: 1.5,
    out: [
      { x: 42.5, y: 1.75, z: 16.6 },
      { x: 38.64, y: 1.75, z: 11.42 }
    ]
  },
  {
    // Inodoros
    in: Vector3.create(10.69, 6.92, 11.54),
    dist: 3,
    out: [
      { x: 10.69, y: 6.92, z: 18.54 },
      { x: 10.69, y: 6.92, z: 22.54 }
    ]
  }
]