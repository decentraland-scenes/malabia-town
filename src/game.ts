//import { Ray, RaySystem } from "./ray"
import {
  AudioSource,
  engine,
  Transform,
  GltfContainer,
  Entity,
  executeTask,
  MeshRenderer,
  TextShape,
  Texture,
  VideoTexture,
  VideoPlayer,
  Material,
  InputAction,
  pointerEventsSystem,
  AvatarAttach,
  AvatarAnchorPointType
} from '@dcl/sdk/src/ecs'
import { Color3, Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'
import {
  blenderTransform,
  distanceIsLessThan,
  randomInt,
  randomIntExcluding,
  randomRange,
  sleep
} from './common'
import {
  Electricidad,
  ElectricidadComponent,
  ElectricidadSystem
} from './electricidad'

//import { getUserAccount } from '@decentraland/EthereumController'
import { getUserData } from '~system/UserIdentity'
// import { getProvider } from '@decentraland/web3-provider'
// import {
//   //ContractName,
//   //getContract,
//   sendMetaTransaction
// } from 'decentraland-transactions'
import * as eth from 'eth-connect'

import { abiManaArray, AbiObjectType } from './erc20Abi'
import abiMensajes from './mensajesAbi'
import canvas from './ui/canvas'
// const functionTransfer = new eth.SolidityFunction(
//   getFunction('transfer', abiManaArray)
// )
// const functionSetGreeting = new eth.SolidityFunction(
//   getFunction('setGreeting', abiMensajes)
// )

// function getFunction(name: string, abi: Array<AbiObjectType>) {
//   for (let n = 0; n < abi.length; n++) {
//     if (abi[n].type == 'function' && abi[n].name == name) {
//       return abi[n]
//     }
//   }
//   console.log(abi)
//   throw new Error('Function not found: ' + name)
// }

// const publicKeyRequest = executeTask(async () => {
//   const publicKey = await getUserPublicKey()
//   console.log(publicKey)
//   return publicKey
// })

// //const mumbaiProvider: any = new eth.WebSocketProvider("wss://ws-mumbai.matic.today")
// //const mumbaiProvider: any = new eth.WebSocketProvider("wss://rpc-mainnet.maticvigil.com/")
// const maticProvider: any = new eth.HTTPProvider(
//   'https://rpc-mainnet.maticvigil.com'
// )
// const metaRequestManager: any = new eth.RequestManager(maticProvider)

// async function prepareMetaTransaction(
//   functionSignature: any,
//   contractConfig: any
// ) {
//   const provider = await getProvider()
//   const requestManager: any = new eth.RequestManager(provider)

//   return sendMetaTransaction(
//     requestManager,
//     metaRequestManager,
//     functionSignature.data,
//     contractConfig
//   )
// }

//

// const canvas = new UICanvas()

//

const building_core = engine.addEntity()
Transform.create(building_core, {position: Vector3.create(0, -20, 0)})

//

const bosque = engine.addEntity()
GltfContainer.create(bosque, {src:'models/bosque.gltf'} )
Transform.create(bosque, {position: Vector3.create(16 + 8, 0, 16 + 8)})

const walls = engine.addEntity()
GltfContainer.create(walls, {src:'models/walls.gltf'})
Transform.create(walls, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: building_core
  })

const dynamic = engine.addEntity()
GltfContainer.create(dynamic, {src:'models/dynamic.gltf'})
Transform.create(dynamic, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: building_core
  })


const static_ = engine.addEntity()
GltfContainer.create(static_, {src:'models/static.gltf'})
Transform.create(static_, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: building_core
  })


const static2 = engine.addEntity()
GltfContainer.create(static2, {src:'models/static2.gltf'})
Transform.create(static2, {
    position: Vector3.create(16 + 8, 0, 16 + 8)  })

//
//static2.setParent(building_core)

const static3 = engine.addEntity()
GltfContainer.create(static3, {src:'models/static3.gltf'})
Transform.create(static3, {
    position: Vector3.create(16 + 8, 0, 16 + 8)
  })

//
//static3.setParent(building_core)

const static4 = engine.addEntity()
GltfContainer.create(static4, {src:'models/static4.gltf'})
Transform.create(static4,{
    position: Vector3.create(16 + 8, 0, 16 + 8)
  })

//
//static4.setParent(building_core)

// Dynamic objects
const lav_01_t = {
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

const lav_02_t = {
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

const lav_03_t = {
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

const rayos_t = {
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

const lavarropas_01 = engine.addEntity()
GltfContainer.create(lavarropas_01, {src:'models/lavarropas.gltf'})
Transform.create(lavarropas_01, blenderTransform(lav_01_t))
Transform.getMutable(lavarropas_01).parent = building_core

const lavarropas_02 = engine.addEntity()
GltfContainer.create(lavarropas_02, {src:'models/lavarropas.gltf'})
Transform.create(lavarropas_02, blenderTransform(lav_02_t))
Transform.getMutable(lavarropas_02).parent = building_core

const lavarropas_03 = engine.addEntity()
GltfContainer.create(lavarropas_03, {src:'models/lavarropas.gltf'})
Transform.create(lavarropas_03, blenderTransform(lav_03_t))
Transform.getMutable(lavarropas_03).parent = building_core

const lavarropas_rayos = engine.addEntity()
GltfContainer.create(lavarropas_rayos, {src:'models/lavarropas_rayos.gltf'})
Transform.create(lavarropas_rayos, blenderTransform(rayos_t))
Transform.getMutable(lavarropas_rayos).parent = building_core

const corazon_t = {
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

const corazon = engine.addEntity()
GltfContainer.create(corazon, {src:'models/corazon.gltf'})
Transform.create(corazon, blenderTransform(corazon_t))
Transform.getMutable(corazon).parent = building_core

const inodoros_t = {
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

const inodoros = engine.addEntity()
GltfContainer.create(inodoros, {src:'models/inodoros.gltf'})
Transform.create(inodoros, blenderTransform(inodoros_t))
Transform.getMutable(inodoros).parent = building_core

const telefono_t = {
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

const telefono = engine.addEntity()
GltfContainer.create(telefono, {src:'models/telefono.gltf'})
Transform.create(telefono, blenderTransform(telefono_t))
Transform.getMutable(telefono).parent = building_core

const audios_telefono = [
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

pointerEventsSystem.onPointerDown(
	{
		entity: telefono,
		opts: { button: InputAction.IA_ANY, hoverText: 'Atender' },
	},
	function () {
    AudioSource.createOrReplace(telefono, {
      audioClipUrl: 'audio/' + audios_telefono[randomInt(0, audios_telefono.length)],
      playing: true,
    }) 
	}
)


const pantalla_t = {
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

const pantalla = engine.addEntity()
MeshRenderer.setPlane(pantalla)
Transform.create(pantalla, blenderTransform(pantalla_t))
Transform.getMutable(pantalla).parent = building_core

VideoPlayer.create(pantalla, {
	src: 'textures/oraculo/video Quinteto de Academia en Malabia.mp4',
	playing: true,
})

const videoTexture = Material.Texture.Video({ videoPlayerEntity: pantalla })

Material.setPbrMaterial(pantalla, {
	texture: videoTexture,
	roughness: 1.0,
	specularIntensity: 0,
	metallic: 0,
})



pointerEventsSystem.onPointerDown(
	{
		entity: pantalla,
		opts: { button: InputAction.IA_POINTER, hoverText: 'Play/Pause' },
	},
	function () {
		const videoPlayer = VideoPlayer.getMutable(pantalla)
		videoPlayer.playing = !videoPlayer.playing
	}
)

const mutableVideoPlayer = VideoPlayer.getMutable(pantalla)
mutableVideoPlayer.volume = 0.1
mutableVideoPlayer.playing = false

/*const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, (e) => {
    console.log(Camera.instance.position)
})*/

/* Wearables Anim */
const wearables_t = {
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

const wearables_frames = [
  'models/wearables-001.gltf',
  'models/wearables-002.gltf',
  'models/wearables-003.gltf',
  'models/wearables-004.gltf',
  'models/wearables-005.gltf'
]

const hidden_transform = {
  position: Vector3.create(8, -5, 8)
}

const wearables_entities: Array<Entity> = []
for (let n = 0; n < wearables_frames.length; n++) {
  wearables_entities.push(engine.addEntity())
  GltfContainer.create(wearables_entities[n], {src:wearables_frames[n]})
  Transform.create(wearables_entities[n], {position:Vector3.create(8,-5,8), parent:building_core})
}

/* Lab Anim */
const lab_t = {
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

const lab_frames = [
  'models/laboratorio-001.gltf',
  'models/laboratorio-002.gltf',
  'models/laboratorio-003.gltf',
  'models/laboratorio-004.gltf',
  'models/laboratorio-005.gltf'
]

const lab_entities: Array<Entity> = []
for (let n = 0; n < lab_frames.length; n++) {
  GltfContainer.create(lab_entities[n], {src:lab_frames[n]})
  Transform.create(wearables_entities[n], {position:Vector3.create(8,-5,8), parent:building_core})
}

const donacion_t = {
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

const contracts = {
  mana: {
    matic: {
      version: '1',
      abi: abiMANA,
      address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
      name: '(PoS) Decentraland MANA',
      chainId: 137
    },
    mumbai: {
      version: '1',
      abi: abiMANA,
      //address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
      address: '0x4dA830330048be6380f102a83d3B94ea318bc598', // Test contract
      name: 'Decentraland MANA (PoS)',
      chainId: 80001
    }
  },
  mensajes: {
    matic: {
      version: '1',
      abi: abiMensajes,
      address: '0x7C778dB3dF481C64178ECA0AF98E47d0D0BcD1f7',
      name: 'MalabiaTown',
      chainId: 137
    },
    mumbai: {
      version: '1',
      abi: abiMensajes,
      address: '0xF8BD449956430e903253cFBc6E25A7ff9310ef8B',
      name: 'MalabiaTown',
      chainId: 80001
    }
  }
}

const donacion = engine.addEntity()
GltfContainer.create(donacion, {src:'models/expendedora.gltf'})
Transform.create(donacion, blenderTransform(donacion_t))
Transform.getMutable(donacion).parent = building_core


// Vending machine for donations

// const expendedora_clip = new AudioClip('audio/gaseosa.mp3')
// const expendedora_source = new AudioSource(expendedora_clip)
// expendedora_source.playing = false
// expendedora_source.loop = false
// donacion.addComponent(expendedora_source)

// donacion.addComponent(
//   new OnPointerDown(
//     async () => {
//       const addedValue = eth.toWei(10, 'ether')
//       const functionSignature = functionTransfer.toPayload([
//         //fromAddress,
//         '0x1a1792286a870d6630a80C924B39E37eD6618082',
//         String(addedValue)
//       ])
//       const conf = contracts.mana.matic
//       console.log(functionSignature)
//       console.log(conf)
//       prepareMetaTransaction(functionSignature, conf)
//         .then((tx) => {
//           expendedora_source.playOnce()
//           console.log('Donación Ok ', tx)
//           donacion_error.visible = false
//           donacion_ok.visible = true
//         })
//         .catch((e) => {
//           console.log('Error enviando donación', e)
//           donacion_error.visible = true
//           donacion_ok.visible = false
//         })
//     },
//     {
//       button: ActionButton.ANY,
//       hoverText: 'Donar 10 PolygonMANA'
//     }
//   )
// )

/* Messages */

// const donacion_ok = new UIText(canvas)
// donacion_ok.fontSize = 30
// donacion_ok.hTextAlign = 'center'
// donacion_ok.value = '¡Gracias por la donación!'
// donacion_ok.visible = false

// const donacion_error = new UIText(canvas)
// donacion_error.fontSize = 30
// donacion_error.hTextAlign = 'center'
// donacion_error.positionY = -20
// donacion_error.value = 'Error al donar ¿Está conectado MetaMask?'
// donacion_error.visible = false

// const mensaje_ok = new UIText(canvas)
// mensaje_ok.fontSize = 30
// mensaje_ok.hTextAlign = 'center'
// donacion_error.positionY = -40
// mensaje_ok.value = '¡Mensaje en camino! Aparecerá en unos segundos'
// mensaje_ok.visible = false

// const mensaje_error = new UIText(canvas)
// mensaje_error.fontSize = 30
// mensaje_error.hTextAlign = 'center'
// mensaje_error.positionY = -60
// mensaje_error.value = 'Error al enviar mensaje ¿Está conectado MetaMask?'
// mensaje_error.visible = false

// class messagesSystem implements ISystem {
//   donacion_ok_time: number = 0
//   donacion_error_time: number = 0
//   mensaje_ok_time: number = 0
//   mensaje_error_time: number = 0

//   update(td: number) {
//     const wait_time = 10
//     // donacion_ok
//     if (donacion_ok.visible && this.donacion_ok_time > 0) {
//       this.donacion_ok_time -= td
//       if (this.donacion_ok_time <= 0) {
//         donacion_ok.visible = false
//       }
//     }
//     if (donacion_ok.visible && this.donacion_ok_time == 0) {
//       this.donacion_ok_time = wait_time
//     }
//     // donacion_error
//     if (donacion_error.visible && this.donacion_error_time > 0) {
//       this.donacion_error_time -= td
//       if (this.donacion_error_time <= 0) {
//         donacion_error.visible = false
//       }
//     }
//     if (donacion_error.visible && this.donacion_error_time == 0) {
//       this.donacion_error_time = wait_time
//     }
//     // mensaje_ok
//     if (mensaje_ok.visible && this.mensaje_ok_time > 0) {
//       this.mensaje_ok_time -= td
//       if (this.mensaje_ok_time <= 0) {
//         mensaje_ok.visible = false
//       }
//     }
//     if (mensaje_ok.visible && this.mensaje_ok_time == 0) {
//       this.mensaje_ok_time = wait_time
//     }
//     // mensaje_error
//     if (mensaje_error.visible && this.mensaje_error_time > 0) {
//       this.mensaje_error_time -= td
//       if (this.mensaje_error_time <= 0) {
//         mensaje_error.visible = false
//       }
//     }
//     if (mensaje_error.visible && this.mensaje_error_time == 0) {
//       this.mensaje_error_time = wait_time
//     }
//     //
//   }
// }
// engine.addSystem(new messagesSystem())

/*executeTask(async () => {
    const userAddress = await getUserAccount()
    if (userAddress) {

    }
})*/

const antorchas_t = [
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

for (let n = 0; n < antorchas_t.length; n++) {
  const antorcha = engine.addEntity()
  GltfContainer.create(antorcha, {src:'models/antorcha.gltf'})
  Transform.create(antorcha, blenderTransform(antorchas_t[n]))
  Transform.getMutable(antorcha).parent = building_core
}

/* Mariposa */
const mariposa_t = {
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
const mariposa = engine.addEntity()
GltfContainer.create(mariposa, {src:'models/mariposa.gltf'})
Transform.create(mariposa, blenderTransform(mariposa_t))
Transform.getMutable(mariposa).parent = building_core

/* Mariposas Bosque */
const mariposas: Array<Entity> = []
for (let n = 0; n < 10; n++) {
  mariposas.push(engine.addEntity())
  GltfContainer.create(mariposas[n], {src:'models/mariposa.gltf'})
  Transform.create(wearables_entities[n], {position: Vector3.create(
    randomRange(10, 40),
    randomRange(0.5, 2.5),
    randomRange(10, 40)
  ),
  rotation: Quaternion.fromEulerDegrees(0, randomRange(0, 170), 0),
  scale: Vector3.create(1.5, 1.5, 1.5), parent:building_core}) 
}

/* Puerta principal */

const main_door = engine.addEntity()
//main_door.addComponent(new BoxShape())
Transform.create(main_door, {
    position: Vector3.create(16 + 8, 1, 16 + 8)
  })



const portales = [
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

for (let n = 0; n < portales.length; n++) {
  const electricidad = engine.addEntity()
  AudioSource.createOrReplace(electricidad, {
    audioClipUrl: 'audio/Electricidad.mp3',
    playing: true,
  }) 
  Transform.create(electricidad, {position:portales[n].in, parent:building_core})
  const mutableSource = AudioSource.getMutable(electricidad)
  mutableSource.playing = true
  mutableSource.loop = true
  mutableSource.volume = 0.1
}

const tmp = engine.addEntity()
AudioSource.createOrReplace(tmp, {
  audioClipUrl: 'audio/Teletransporte.mp3',
  playing: true, loop:false, volume:0.6
})
Transform.create(tmp, {position: Vector3.create(0,0,0.5)})
AvatarAttach.create(tmp, {
	anchorPointId: AvatarAnchorPointType.AAPT_HEAD,
})

// async function getMensajes() {
//   return getFactory(contracts.mensajes.matic).then(async (contract) => {
//     return await contract.getMessages()
//   })
// }

class AnimSystem implements ISystem {
  timePass: number = 0
  frame: number = 0
  building_visible = false
  just_teleported = false
  teleportTime = 0
  teleporting = false
  teleportingFrom = 0
  update(td: number) {
    if (!this.building_visible) {
      if (
        distanceIsLessThan(
          main_door.getComponent(Transform).position,
          Camera.instance.position,
          2
        )
      ) {
        this.building_visible = true
        this.just_teleported = true
        building_core.getComponent(Transform).position.y = 0
        

        main_door.getComponent(Transform).position.y = -20
        bosque.getComponent(Transform).position.y = -20
        engine.removeEntity(bosque)
        engine.removeEntity(electricidad1)
        engine.removeEntity(portalfx)
        for (let n = 0; n < mariposas.length; n++) {
          engine.removeEntity(mariposas[n])
        }
        //movePlayerTo({ x: 38, y: 0, z: 46 }, { x: 46, y: 1, z: 46 })
        movePlayerTo({ x: 34, y: 0, z: 45 }, { x: 46, y: 1, z: 45 })
        pasillo_source.playOnce()
      }
      return
    } else {
      if (
        distanceIsLessThan(
          Vector3.create(35, 1.75, 45),
          Camera.instance.position,
          2
        )
      ) {
        if (!this.just_teleported) {
          this.building_visible = false
          building_core.getComponent(Transform).position.y = -20
          engine.removeEntity(static2)
          engine.removeEntity(static3)
          engine.removeEntity(static4)

          main_door.getComponent(Transform).position.y = 1
          bosque.getComponent(Transform).position.y = 0
          
          
          for (let n = 0; n < mariposas.length; n++) {
            
          }
          movePlayerTo({ x: 16, y: 0, z: 16 }, { x: 16 + 8, y: 2, z: 16 + 8 })
          pasillo_source.playOnce()
        }
      } else {
        this.just_teleported = false
      }
    }

    this.timePass += td
    if (this.timePass < 0.3) {
      return
    }
    this.timePass = 0
    for (let n = 0; n < wearables_frames.length; n++) {
      if (n == this.frame) {
        //console.log("show", n)
        wearables_entities[n].getComponent(Transform).position =
          blenderTransform(wearables_t).position.clone()
        wearables_entities[n].getComponent(Transform).rotation =
          blenderTransform(wearables_t).rotation.clone()
        wearables_entities[n].getComponent(Transform).scale =
          blenderTransform(wearables_t).scale.clone()

        lab_entities[n].getComponent(Transform).position =
          blenderTransform(lab_t).position.clone()
        lab_entities[n].getComponent(Transform).rotation =
          blenderTransform(lab_t).rotation.clone()
        lab_entities[n].getComponent(Transform).scale =
          blenderTransform(lab_t).scale.clone()
      } else {
        //console.log("hide", n)
        wearables_entities[n].getComponent(Transform).position.x =
          hidden_transform.position.x
        wearables_entities[n].getComponent(Transform).position.y =
          hidden_transform.position.y
        wearables_entities[n].getComponent(Transform).position.z =
          hidden_transform.position.z

        lab_entities[n].getComponent(Transform).position.x =
          hidden_transform.position.x
        lab_entities[n].getComponent(Transform).position.y =
          hidden_transform.position.y
        lab_entities[n].getComponent(Transform).position.z =
          hidden_transform.position.z
      }
      //console.log(wearables_entities[this.frame].getComponent(Transform).position)
    }

    this.frame += 1
    if (this.frame >= wearables_entities.length) {
      this.frame = 0
    }

    // Check Portales

    if (this.teleporting) {
      this.teleportTime -= 0.5
      console.log(this.teleportTime)
      if (this.teleportTime <= 0) {
        this.teleporting = false
        //
        const port =
          portales[randomIntExcluding(0, portales.length, this.teleportingFrom)]
        movePlayerTo(port.out[0], port.out[1])
      }
    } else {
      for (let n = 0; n < portales.length; n++) {
        if (
          distanceIsLessThan(
            portales[n].in,
            Camera.instance.position,
            portales[n].dist
          )
        ) {
          console.log('on', n)
          if (n == 3) {
            // Inodoros
            // Si no está en la terraza, ignorar
            if (Camera.instance.position.y < 4) break
          }
          this.teleportTime = 1
          this.teleporting = true
          this.teleportingFrom = n
          sourceTeletransporte.playOnce()
          break
        }
      }
    }
  }
}
engine.addSystem(new AnimSystem())

async function getFactory(contractConfig: any) {
  const requestManager: any = new eth.RequestManager(maticProvider)

  const factory = new eth.ContractFactory(requestManager, contractConfig.abi)
  const contract = await factory.at(contractConfig.address)

  return contract
}

/* Electricidad */
const electricidadPasilloFrames = [
  new GLTFShape('models/electricidad_pasillo-001.gltf'),
  new GLTFShape('models/electricidad_pasillo-002.gltf'),
  new GLTFShape('models/electricidad_pasillo-003.gltf'),
  new GLTFShape('models/electricidad_pasillo-004.gltf'),
  new GLTFShape('models/electricidad_pasillo-005.gltf'),
  new GLTFShape('models/electricidad_pasillo-006.gltf')
]

// Puerta principal (Bosque)
const electricidad1 = new Electricidad(electricidadPasilloFrames)
electricidad1.Transform.create({
    position: Vector3.create(16 + 8 + 2, 0.2, 16 + 8 + 3),
    scale: Vector3.create(3, 10, 3),
    rotation: Quaternion.Euler(0, 0, 0)
  })
)

// Vulva
const electricidad2 = new Electricidad(electricidadPasilloFrames)
electricidad2.Transform.create({
    position: Vector3.create(14, 0.1, 14.5),
    scale: Vector3.create(1, 0.7, 1)
  })
)

electricidad2.setParent(building_core)

// Inodoros
const electricidad3 = new Electricidad(electricidadPasilloFrames)
electricidad3.Transform.create({
    position: Vector3.create(9, 6.92, 11.54), //10.69
    scale: Vector3.create(1.5, 2, 1.5)
  })
)

electricidad3.setParent(building_core)

// Lavadero
const electricidad4 = new Electricidad(electricidadPasilloFrames)
electricidad4.Transform.create({
    position: Vector3.create(38.64, 0.05, 11.42),
    scale: Vector3.create(1, 0.6, 1)
  })
)

electricidad4.setParent(building_core)

// Pasillo
const electricidad5 = new Electricidad(electricidadPasilloFrames)
electricidad5.Transform.create({
    position: Vector3.create(46.17, 0.05, 30.97),
    scale: Vector3.create(1, 0.9, 1)
  })
)

electricidad5.setParent(building_core)

engine.addSystem(new ElectricidadSystem())

/* Agregar nota */

const pizarron_t = {
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
    x: 2.0,
    y: 2.0,
    z: 2.0
  }
}

const pizarron = engine.addEntity()
GltfContainer.create(pizarron, {src:'models/pizarron.gltf'})
pizarron.addComponent(blenderTransform(pizarron_t))

pizarron.setParent(building_core)
pizarron.addComponent(
  new OnPointerDown(
    async () => {
      textInput.visible = true
    },
    {
      button: ActionButton.ANY,
      hoverText: 'Agrega una nota'
    }
  )
)
class pizarronSystem implements ISystem {
  update() {
    if (!textInput.visible) return
    if (
      !distanceIsLessThan(
        pizarron.getComponent(Transform).position,
        Camera.instance.position,
        4
      )
    ) {
      textInput.visible = false
    }
  }
}
engine.addSystem(new pizarronSystem())
/*
executeTask(async () => {
    const userAddress = await getUserAccount()
    if (userAddress) {
        pizarron.addComponentOrReplace(
          new OnPointerDown(async () => {
              textInput.visible = true
          },
          {
              button: ActionButton.ANY,
              hoverText: "Agrega una nota"
          })
        )
    }
})*/

const messageTexts: Array<TextShape> = []
let textColors = [
  new Color3(0.9, 0.1, 0.1),
  new Color3(0.0, 0.5, 0.0),
  new Color3(0.1, 0.1, 0.9),
  new Color3(0.0, 0.5, 0.5),
  new Color3(0.5, 0.5, 0.0),
  new Color3(0.9, 0.1, 0.9)
]
textColors = textColors.concat(textColors)
textColors = textColors.concat(textColors)

for (let n = 0; n < 16; n++) {
  const pizarronTextE = engine.addEntity()
  messageTexts.push(new TextShape(''})

  messageTexts[n].fontSize = 1
  messageTexts[n].hTextAlign = 'left'
  messageTexts[n].vTextAlign = 'top'
  messageTexts[n].fontWeight = 'strong'
  //pizarronText.resizeToFit = true
  //pizarronText.height = 0.1
  //pizarronText.width = 0.1
  messageTexts[n].color = textColors[n]
  pizarronTextE.addComponent(messageTexts[n])
  pizarronTextE.addComponent(blenderTransform(pizarron_t))
  pizarronTextE.getComponent(Transform).position.x -= 0.085 // Distancia del pizarron
  pizarronTextE.getComponent(Transform).position.y += 1.9 - n * 0.1 // Altura
  pizarronTextE.getComponent(Transform).position.z += 1.5 - randomRange(0, 0.1) //Lado
  pizarronTextE.getComponent(Transform).rotation = Quaternion.Euler(
    0,
    90,
    -5 + randomRange(0, 10)
  )
  pizarronTextE.getComponent(Transform).scale = Vector3.create(0.8, 0.8, 0.8)
  
  pizarronTextE.setParent(building_core)
}

const textInput = new UIInputText(canvas)
textInput.width = '70%'
textInput.height = '40px'
textInput.vAlign = 'bottom'
textInput.hAlign = 'center'
textInput.fontSize = 30
textInput.placeholder = 'Haz click aquí para escribir una nota'
textInput.placeholderColor = Color4.White()
textInput.positionY = '100px'
textInput.isPointerBlocker = true
textInput.background = new Color4(0.5, 0.1, 0.2, 0.5)
textInput.focusedBackground = new Color4(0.5, 0.1, 0.2, 0.8)
textInput.visible = false

textInput.onTextSubmit = new OnTextSubmit(async (x) => {
  /*const text = new UIText(textInput)
  text.value = "<USER-ID> " + x.text
  text.width = "100%"
  text.height = "20px"
  text.vAlign = "top"
  text.hAlign = "left"*/

  //const fromAddress = await getUserAccount()
  //const addedValue = eth.toWei(10, 'ether')
  //const spender = contracts.mana.matic.address

  //0xa41368620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000f5b6f626a656374204f626a6563745d0000000000000000000000000000000000
  //0xa41368620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000f5b6f626a656374204f626a6563745d0000000000000000000000000000000000

  //0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000144573746f20657320756e61206e6f746121e2808b000000000000000000000000

  //0xa4136862000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000114573746f20657320756e61206e6f746121000000000000000000000000000000

  const functionSignature = functionSetGreeting.toPayload([x.text])
  const conf = contracts.mensajes.matic
  console.log(functionSignature)
  console.log(conf)

  textInput.visible = false
  prepareMetaTransaction(functionSignature, conf)
    .then((tx) => {
      console.log('Agrega nota Ok ', tx)
      refrescarMensajes(10000)
      mensaje_ok.visible = true
    })
    .catch((e) => {
      console.log('Error agregando nota', e)
      mensaje_error.visible = true
    })
})

/* Refrescar notas */
function refrescarMensajes(delay: number = 0) {
  executeTask(async () => {
    await sleep(delay)
    const messages = await getMensajes()
    console.log(messages)
    console.log('Mensajes')
    for (let n = 0; n < messages.length; n++) {
      messageTexts[n].value = messages[n]
    }
  })
}
refrescarMensajes()

/* Broche Instagram */
const broche_instagram_t = {
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
const broche_instagram = engine.addEntity()
GltfContainer.create(broche_instagram, {src:'models/broche_instagram.gltf'})
broche_instagram.addComponent(blenderTransform(broche_instagram_t))

broche_instagram.setParent(building_core)
broche_instagram.addComponent(
  new OnPointerDown(
    () => {
      openExternalURL('https://www.instagram.com/malabiatown/')
    },
    { button: ActionButton.POINTER, hoverText: 'Nuestro Instagram' }
  )
)

/* Broche Malabia */
const broche_malabia_t = {
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
const broche_malabia = engine.addEntity()
GltfContainer.create(broche_malabia, {src:'models/broche_malabia.gltf'})
broche_malabia.addComponent(blenderTransform(broche_malabia_t))

broche_malabia.setParent(building_core)
broche_malabia.addComponent(
  new OnPointerDown(
    () => {
      openExternalURL('https://www.malabiatown.org/')
    },
    { button: ActionButton.POINTER, hoverText: 'Nuestra web' }
  )
)

/* Cuerno Recepcion */
const cuerno_t = {
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
const cuerno = engine.addEntity()
GltfContainer.create(cuerno, {src:'models/cuerno.gltf'})
cuerno.addComponent(blenderTransform(cuerno_t))

cuerno.setParent(building_core)
const cuerno_clip = new AudioClip('audio/cuerno.mp3')
const cuerno_source = new AudioSource(cuerno_clip)
cuerno_source.playing = false
cuerno_source.loop = false
cuerno.addComponent(cuerno_source)
cuerno.addComponent(
  new OnPointerDown(
    () => {
      cuerno_source.playOnce()
    },
    { button: ActionButton.POINTER, hoverText: 'Tocar' }
  )
)

/* Puerta Cortina */
const puerta_cortina_t = {
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
const puerta_cortina = engine.addEntity()
const puerta_cortina_model = new GLTFShape('models/puerta_cortina.gltf')
puerta_cortina_model.isPointerBlocker = false
puerta_cortina.addComponent(puerta_cortina_model)
puerta_cortina.addComponent(blenderTransform(puerta_cortina_t))

puerta_cortina.setParent(building_core)

/* Caldero */
const caldero_t = {
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
const caldero = engine.addEntity()
GltfContainer.create(caldero, {src:'models/caldero.gltf'})
caldero.addComponent(blenderTransform(caldero_t))

caldero.setParent(building_core)
const caldero_clip = new AudioClip('audio/caldero.mp3')
const caldero_source = new AudioSource(caldero_clip)
caldero_source.playing = true
caldero_source.loop = true
caldero.addComponent(caldero_source)
//
caldero.addComponent(
  new OnPointerDown(
    () => {
      calderoRandom()
    },
    { button: ActionButton.POINTER, hoverText: 'Sabiduría del caldero' }
  )
)

/* Fogonazo Anim */
const fogonazo_frames = [
  new GLTFShape('models/fogonazo-001.gltf'),
  new GLTFShape('models/fogonazo-002.gltf'),
  new GLTFShape('models/fogonazo-003.gltf'),
  new GLTFShape('models/fogonazo-004.gltf'),
  new GLTFShape('models/fogonazo-005.gltf'),
  new GLTFShape('models/fogonazo-006.gltf'),
  new GLTFShape('models/fogonazo-007.gltf'),
  new GLTFShape('models/fogonazo-008.gltf'),
  new GLTFShape('models/fogonazo-009.gltf'),
  new GLTFShape('models/fogonazo-010.gltf')
]
const fogonazo_t = {
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
const fogonazo = new Electricidad(fogonazo_frames)
fogonazo.getComponent(ElectricidadComponent).playing = false
fogonazo.getComponent(ElectricidadComponent).looping = false
fogonazo.addComponent(blenderTransform(fogonazo_t))

fogonazo.setParent(building_core)
const fogonazo_clip = new AudioClip('audio/fogonazo.mp3')
const fogonazo_source = new AudioSource(fogonazo_clip)
fogonazo_source.playing = false
fogonazo_source.loop = false
fogonazo.addComponent(fogonazo_source)

/* Marco caldero */
const marco_caldero_t = {
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
const marco_caldero = engine.addEntity()
GltfContainer.create(marco_caldero, {src:'models/marco_caldero.gltf'})
const marco_transform = blenderTransform(marco_caldero_t)
marco_caldero.addComponent(marco_transform)

marco_caldero.setParent(building_core)

const canvas_caldero = engine.addEntity()
canvas_caldero.addComponent(new PlaneShape())
const canvas_caldero_transform = blenderTransform(marco_caldero_t)
canvas_caldero_transform.position.x -= 0.01
canvas_caldero_transform.position.y += 0.77
canvas_caldero_transform.scale = Vector3.create(1.5, 1.5, 0)
canvas_caldero.addComponent(canvas_caldero_transform)
const caldero_mat = new BasicMaterial()
const texture = new Texture(`textures/rays.png`)
caldero_mat.texture = texture

canvas_caldero.addComponent(caldero_mat)

canvas_caldero.setParent(building_core)
/*canvas_caldero.addComponent(
  new OnPointerDown(() => {
      calderoRandom()
  },
  { button: ActionButton.POINTER, hoverText: "Sabiduría del caldero"})
)*/

function calderoRandom() {
  const obras = [
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
    'textures/oraculo/WP_20160126_003 (2).jpg',
    'textures/oraculo/20200621_130659.jpg',
    'textures/oraculo/20200706_133025.jpg',
    'textures/oraculo/IMG_20170531_120753_541.jpg',
    'textures/oraculo/IMG_20180617_215709_HDR.jpg',
    'textures/oraculo/IMG_20180814_185543_HDR.jpg',
    'textures/oraculo/IMG_20180911_221100_823.jpg',
    'textures/oraculo/Picsart2016-15-4--22-43-40.jpg'
  ]
  const texture_url = obras[randomInt(0, obras.length - 1)]
  if (texture_url.endsWith('.mp4')) {
    if (
      texture_url == 'textures/oraculo/Lucia 01.mp4' ||
      texture_url == 'textures/oraculo/Lucia 02.mp4'
    ) {
      canvas_caldero.getComponent(Transform).scale = Vector3.create(0.8, 1.5, 0)
    } else {
      canvas_caldero.getComponent(Transform).scale = Vector3.create(1.5, 0.9, 0)
    }
    canvas_caldero.getComponent(Transform).rotation = Quaternion.Euler(0, 90, 0)
    const myVideoClip = new VideoClip(texture_url)
    const myVideoTexture = new VideoTexture(myVideoClip)
    myVideoTexture.playing = true
    myVideoTexture.volume = 0.1
    caldero_mat.texture = myVideoTexture
  } else {
    canvas_caldero.getComponent(Transform).scale = Vector3.create(1.5, 1.5, 0)
    canvas_caldero.getComponent(Transform).rotation = Quaternion.Euler(
      0,
      90,
      180
    )
    const texture = new Texture(texture_url)
    caldero_mat.texture = texture
  }
  fogonazo_source.playOnce()
  fogonazo.getComponent(ElectricidadComponent).playOnce()
}
calderoRandom()

/* Malabia Upload Anim */
const malabia_upload_frames = [
  new GLTFShape('models/malabia_uploads-001.gltf'),
  new GLTFShape('models/malabia_uploads-002.gltf'),
  new GLTFShape('models/malabia_uploads-003.gltf'),
  new GLTFShape('models/malabia_uploads-004.gltf'),
  new GLTFShape('models/malabia_uploads-005.gltf'),
  new GLTFShape('models/malabia_uploads-006.gltf')
]
const malabia_upload_t:  = {
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
const malabia_upload = new Electricidad(malabia_upload_frames)
malabia_upload.addComponent(blenderTransform(malabia_upload_t))

malabia_upload.setParent(building_core)

/* Alfombra Anim */
const alfombrafx_frames = [
  new GLTFShape('models/alfombra-001.gltf'),
  new GLTFShape('models/alfombra-002.gltf'),
  new GLTFShape('models/alfombra-003.gltf'),
  new GLTFShape('models/alfombra-004.gltf'),
  new GLTFShape('models/alfombra-005.gltf'),
  new GLTFShape('models/alfombra-006.gltf')
]
const malabiafx_t = {
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
const alfombrafx = new Electricidad(alfombrafx_frames)
alfombrafx.addComponent(blenderTransform(malabiafx_t))

alfombrafx.setParent(building_core)

/* Planta Anim */
const plantafx_frames = [
  new GLTFShape('models/planta-001.gltf'),
  new GLTFShape('models/planta-002.gltf'),
  new GLTFShape('models/planta-003.gltf'),
  new GLTFShape('models/planta-004.gltf'),
  new GLTFShape('models/planta-005.gltf'),
  new GLTFShape('models/planta-006.gltf')
]
const plantafx = new Electricidad(plantafx_frames)
plantafx.Transform.create({
    position: Vector3.create(16 + 8, 0, 16 + 8)
  })
)

plantafx.setParent(building_core)

/* Caballo Anim */
const caballofx_frames = [
  new GLTFShape('models/caballo-001.gltf'),
  new GLTFShape('models/caballo-002.gltf'),
  new GLTFShape('models/caballo-003.gltf'),
  new GLTFShape('models/caballo-004.gltf'),
  new GLTFShape('models/caballo-005.gltf'),
  new GLTFShape('models/caballo-006.gltf')
]
const caballofx_t = {
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
const caballofx = new Electricidad(caballofx_frames)
caballofx.addComponent(blenderTransform(caballofx_t))

caballofx.setParent(building_core)

/* Caballo Anim */
const tunelfx_frames = [
  new GLTFShape('models/tunel-001.gltf'),
  new GLTFShape('models/tunel-002.gltf'),
  new GLTFShape('models/tunel-003.gltf'),
  new GLTFShape('models/tunel-004.gltf'),
  new GLTFShape('models/tunel-005.gltf'),
  new GLTFShape('models/tunel-006.gltf')
]
const tunelfx_t = {
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
const tunelfx = new Electricidad(tunelfx_frames)
tunelfx.addComponent(blenderTransform(tunelfx_t))

tunelfx.setParent(building_core)

const pasillo_clip = new AudioClip('audio/magia.mp3')
const pasillo_source = new AudioSource(pasillo_clip)
pasillo_source.playing = false
pasillo_source.loop = false
tunelfx.addComponent(pasillo_source)

/* Portal Anim */
const portalfx_frames = [
  new GLTFShape('models/portal-001.gltf'),
  new GLTFShape('models/portal-002.gltf'),
  new GLTFShape('models/portal-003.gltf'),
  new GLTFShape('models/portal-004.gltf'),
  new GLTFShape('models/portal-005.gltf'),
  new GLTFShape('models/portal-006.gltf')
]
const portalfx = new Electricidad(portalfx_frames)
portalfx.Transform.create({
    position: Vector3.create(16 + 8, 0, 16 + 8)
  })
)

//portalfx.setParent(building_core)

/* Terraza Anim */
const terrazafx_frames = [
  new GLTFShape('models/terraza_luz-001.gltf'),
  new GLTFShape('models/terraza_luz-002.gltf'),
  new GLTFShape('models/terraza_luz-003.gltf'),
  new GLTFShape('models/terraza_luz-004.gltf'),
  new GLTFShape('models/terraza_luz-005.gltf'),
  new GLTFShape('models/terraza_luz-006.gltf')
]
const terrazafx_t = {
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
const terrazafx = new Electricidad(terrazafx_frames)
terrazafx.addComponent(blenderTransform(terrazafx_t))

terrazafx.setParent(building_core)

/* Vela Anim */

const vela_t = {
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
const velafx = engine.addEntity()
GltfContainer.create(velafx, {src:'models/vela.gltf'})
velafx.addComponent(blenderTransform(vela_t))

velafx.setParent(building_core)

/* Exit Anim */
const exit_frames = [
  new GLTFShape('models/exit-001.gltf'),
  new GLTFShape('models/exit-002.gltf'),
  new GLTFShape('models/exit-003.gltf'),
  new GLTFShape('models/exit-004.gltf')
]
const exit1_t = {
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
const exit1 = new Electricidad(exit_frames)
exit1.addComponent(blenderTransform(exit1_t))

exit1.setParent(building_core)
const exit2_t = {
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
const exit2 = new Electricidad(exit_frames)
exit2.addComponent(blenderTransform(exit2_t))

exit2.setParent(building_core)
