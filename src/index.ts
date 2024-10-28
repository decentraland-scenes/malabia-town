import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import * as ui from 'dcl-ui-toolkit'

// import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'
import {
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  ColliderLayer,
  engine,
  type Entity,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  TextShape,
  Transform,
  VideoPlayer
} from '@dcl/sdk/src/ecs'
// import * as eth from "eth-connect"
// import { openExternalUrl } from "~system/RestrictedActions"
import {
  blenderTransform,
  distanceIsLessThan,
  randomInt,
  randomIntExcluding,
  randomRange
} from './common'
import { createModelsAnimation, AnimationModelsSystem } from './modelsAnimation'

// import { getUserAccount } from '@decentraland/EthereumController'
// import { getProvider } from '@decentraland/web3-provider'
// import {
//   //ContractName,
//   //getContract,
//   sendMetaTransaction
// } from 'decentraland-transactions'

import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
// import { getPlayer } from '@dcl/sdk/src/players'
import { AnimationModelsComponent } from './definitions'
import { movePlayerTo, openExternalUrl } from '~system/RestrictedActions'
import {
  lav01T,
  lav02T,
  lav03T,
  rayosT,
  corazonT,
  inodorosT,
  telefonoT,
  pantallaT,
  donacionT,
  mariposaT,
  wearablesT,
  labT,
  pizarronT,
  brocheInstagramT,
  brocheMalabiaT,
  cuernoT,
  // puertaCortinaT,
  calderoT,
  fogonazoT,
  marcoCalderoT,
  malabiaUploadT,
  malabiafxT,
  caballofxT,
  tunelfxT,
  terrazafxT,
  velaT,
  exit1T,
  exit2T,
  audiosTelefono,
  wearablesFrames,
  labFrames,
  antorchasT,
  portales
} from './creatorFunctions'
// import { abiManaArray } from './erc20Abi'
// import { abiMensajes } from './mensajesAbi'

export function main(): void {
  ReactEcsRenderer.setUiRenderer(ui.render)

  // const functionTransfer = new eth.SolidityFunction(
  //   getFunction('transfer', abiManaArray)
  // )
  // const functionSetGreeting = new eth.SolidityFunction(
  //   getFunction('setGreeting', abiMensajes)
  // )

  // function getFunction(name: string, abi: eth.AbiItemGeneric[]): eth.AbiFunction {
  //   for (let n = 0; n < abi.length; n++) {
  //     if (abi[n].type === 'function' && abi[n].name === name) {

  //       return abi[n] as eth.AbiFunction
  //     }
  //   }
  //   console.log(abi)
  //   throw new Error('Function not found: ' + name)
  // }

  // const publicKeyRequest = getPlayer()?.userId

  // const maticProvider: any = new eth.HTTPProvider(
  //   'https://rpc-mainnet.maticvigil.com'
  // )
  // const metaRequestManager: any = new eth.RequestManager(maticProvider)

  // async function prepareMetaTransaction(
  //   functionSignature: any,
  //   contractConfig: any
  // ):Promise<void> {
  //   const provider = createEthereumProvider()
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

  const buildingCore = engine.addEntity()
  Transform.create(buildingCore, { position: Vector3.create(0, -500, 0) })

  const bosque = engine.addEntity()
  GltfContainer.create(bosque, {
    src: 'models/bosque.gltf'
  })
  Transform.create(bosque, { position: Vector3.create(16 + 8, 0, 16 + 8) })

  const walls = engine.addEntity()
  GltfContainer.create(walls, { src: 'models/walls.gltf' })
  Transform.create(walls, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: buildingCore
  })

  const dynamic = engine.addEntity()
  GltfContainer.create(dynamic, { src: 'models/dynamic.gltf' })
  Transform.create(dynamic, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: buildingCore
  })

  const static_ = engine.addEntity()
  GltfContainer.create(static_, { src: 'models/static.gltf' })
  Transform.create(static_, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: buildingCore
  })

  const static2 = engine.addEntity()
  GltfContainer.create(static2, { src: 'models/static2.gltf' })
  Transform.create(static2, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: buildingCore
  })

  

  const static3 = engine.addEntity()
  GltfContainer.create(static3, { src: 'models/static3.gltf' })
  Transform.create(static3, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: buildingCore
  })

  

  const static4 = engine.addEntity()
  GltfContainer.create(static4, { src: 'models/static4.gltf' })
  Transform.create(static4, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: buildingCore
  })

  //

  // Dynamic objects

  const lavarropas01 = engine.addEntity()
  GltfContainer.create(lavarropas01, {
    src: 'models/lavarropas.gltf',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })
  Transform.create(lavarropas01, blenderTransform(lav01T, buildingCore))

  const lavarropas02 = engine.addEntity()
  GltfContainer.create(lavarropas02, {
    src: 'models/lavarropas.gltf',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })
  Transform.create(lavarropas02, blenderTransform(lav02T, buildingCore))

  const lavarropas03 = engine.addEntity()
  GltfContainer.create(lavarropas03, {
    src: 'models/lavarropas.gltf',
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  })
  Transform.create(lavarropas03, blenderTransform(lav03T, buildingCore))

  const lavarropasRayos = engine.addEntity()
  GltfContainer.create(lavarropasRayos, { src: 'models/lavarropas_rayos.gltf' })
  Transform.create(lavarropasRayos, blenderTransform(rayosT, buildingCore))

  const corazon = engine.addEntity()
  GltfContainer.create(corazon, { src: 'models/corazon.gltf' })
  Transform.create(corazon, blenderTransform(corazonT, buildingCore))

  const inodoros = engine.addEntity()
  GltfContainer.create(inodoros, { src: 'models/inodoros.gltf' })
  Transform.create(inodoros, blenderTransform(inodorosT, buildingCore))

  const telefono = engine.addEntity()
  GltfContainer.create(telefono, { src: 'models/telefono.gltf' })
  Transform.create(telefono, blenderTransform(telefonoT, buildingCore))

  

  pointerEventsSystem.onPointerDown(
    {
      entity: telefono,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Atender' }
    },
    function () {
      AudioSource.createOrReplace(telefono, {
        audioClipUrl:
          'audio/' + audiosTelefono[randomInt(0, audiosTelefono.length)],
        playing: true
        // global:false
      })
    }
  )

  const pantalla = engine.addEntity()
  MeshRenderer.setPlane(pantalla)
  MeshCollider.setPlane(pantalla)
  Transform.create(pantalla, blenderTransform(pantallaT, buildingCore))

  VideoPlayer.create(pantalla, {
    src: 'textures/oraculo/video Quinteto de Academia en Malabia.mp4',
    playing: true
  })

  const videoTexture = Material.Texture.Video({ videoPlayerEntity: pantalla })

  Material.setPbrMaterial(pantalla, {
    texture: videoTexture,
    roughness: 1.0,
    specularIntensity: 0,
    metallic: 0
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: pantalla,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Play/Pause' }
    },
    function () {
      const videoPlayer = VideoPlayer.getMutable(pantalla)
      if (videoPlayer.playing === true) {
        videoPlayer.playing = false
      } else {
        videoPlayer.playing = true
      }
    }
  )

  const mutableVideoPlayer = VideoPlayer.getMutable(pantalla)
  mutableVideoPlayer.volume = 0.1
  mutableVideoPlayer.playing = false

  /* const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, (e) => {
    console.log(Camera.instance.position)
}) */

  /* Wearables Anim */

  const hiddenTransform = {
    position: Vector3.create(8, -5, 8)
  }


  const wearablesEntities: Entity[] = []
  for (let n = 0; n < wearablesFrames.length; n++) {
    wearablesEntities.push(engine.addEntity())
    GltfContainer.create(wearablesEntities[n], { src: wearablesFrames[n] })
    Transform.create(wearablesEntities[n], {
      position: Vector3.create(8, -5, 8),
      parent: buildingCore
    })
  }

  /* Lab Anim */


  const labEntities: Entity[] = []

  for (let n = 0; n < labFrames.length; n++) {
    const newLabN = engine.addEntity()
    labEntities.push(newLabN)
    GltfContainer.create(newLabN, { src: labFrames[n] })
    Transform.create(newLabN, {
      position: Vector3.create(8, -5, 8),
      parent: buildingCore
    })
  }

  // const contracts = {
  //   mana: {
  //     matic: {
  //       version: '1',
  //       abi: abiMANA,
  //       address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
  //       name: '(PoS) Decentraland MANA',
  //       chainId: 137
  //     },
  //     mumbai: {
  //       version: '1',
  //       abi: abiMANA,
  //       // address: '0x882Da5967c435eA5cC6b09150d55E8304B838f45',
  //       address: '0x4dA830330048be6380f102a83d3B94ea318bc598', // Test contract
  //       name: 'Decentraland MANA (PoS)',
  //       chainId: 80001
  //     }
  //   },
  //   mensajes: {
  //     matic: {
  //       version: '1',
  //       abi: abiMensajes,
  //       address: '0x7C778dB3dF481C64178ECA0AF98E47d0D0BcD1f7',
  //       name: 'MalabiaTown',
  //       chainId: 137
  //     },
  //     mumbai: {
  //       version: '1',
  //       abi: abiMensajes,
  //       address: '0xF8BD449956430e903253cFBc6E25A7ff9310ef8B',
  //       name: 'MalabiaTown',
  //       chainId: 80001
  //     }
  //   }
  // }

  const donacion = engine.addEntity()
  GltfContainer.create(donacion, { src: 'models/expendedora.gltf' })
  Transform.create(donacion, blenderTransform(donacionT, buildingCore))
  AudioSource.create(donacion, {
    audioClipUrl: 'audio/gaseosa.mp3',
    playing: false,
    loop: false
    // global:false
  })

  // Vending machine for donations

  // pointerEventsSystem.onPointerDown(
  // 	{
  // 		entity: donacion,
  // 		opts: { button: InputAction.IA_ANY, hoverText: 'Donar 10 PolygonMANA' },
  // 	},
  // 	async ():Promise<void> => {
  //             const addedValue = eth.toWei(10, 'ether')
  //             const functionSignature = functionTransfer.toPayload([
  //               //fromAddress,
  //               '0x1a1792286a870d6630a80C924B39E37eD6618082',
  //               String(addedValue)
  //             ])
  //             const conf = contracts.mana.matic
  //             console.log(functionSignature)
  //             console.log(conf)
  //             prepareMetaTransaction(functionSignature, conf)
  //               .then((tx) => {
  //                 AudioSource.getMutable(donacion).playing = true
  //                 console.log('Donación Ok ', tx)
  //                 donacionOk.show()
  //                 donacionError.hide()
  //               })
  //               .catch((e) => {
  //                 console.log('Error enviando donación', e)
  //                 donacionError.show()
  //                 donacionOk.hide()
  //               })
  // 	}
  // )

  /* Messages */
  // const donacionOk = ui.createComponent(ui.Announcement, { value: '¡Gracias por la donación!', duration: 10, startHidden: true })
  // const donacionError = ui.createComponent(ui.Announcement, { value: 'Error al donar ¿Está conectado MetaMask?', duration: 10, startHidden: true, yOffset: -20 })
  // const mensajeOk = ui.createComponent(ui.Announcement, { value: '¡Mensaje en camino! Aparecerá en unos segundos', duration: 10, startHidden: true, yOffset: -40 })
  // const mensajeError = ui.createComponent(ui.Announcement, { value: 'Error al enviar mensaje ¿Está conectado MetaMask?', duration: 10, startHidden: true, yOffset: -60 })

  

  for (let n = 0; n < antorchasT.length; n++) {
    const antorcha = engine.addEntity()
    GltfContainer.create(antorcha, { src: 'models/antorcha.gltf' })
    Transform.create(antorcha, blenderTransform(antorchasT[n], buildingCore))
  }

  /* Mariposa */

  const mariposa = engine.addEntity()
  GltfContainer.create(mariposa, { src: 'models/mariposa.gltf' })
  Transform.create(mariposa, blenderTransform(mariposaT, buildingCore))

  /* Mariposas Bosque */
  const mariposas: Entity[] = []
  for (let n = 0; n < 10; n++) {
    mariposas.push(engine.addEntity())
    GltfContainer.create(mariposas[n], { src: 'models/mariposa.gltf' })
    Transform.create(mariposas[n], {
      position: Vector3.create(
        randomRange(-16, 16),
        randomRange(0.5, 2.5),
        randomRange(-16, 16)
      ),
      rotation: Quaternion.fromEulerDegrees(0, randomRange(0, 170), 0),
      scale: Vector3.create(1.5, 1.5, 1.5),
      parent: bosque
    })
  }

  /* Puerta principal */

  const mainDoor = engine.addEntity()
  // MeshRenderer.setBox(mainDoor)
  Transform.create(mainDoor, {
    position: Vector3.create(16 + 8, 1, 16 + 8),
    parent: bosque
  })

 

  for (let n = 0; n < portales.length; n++) {
    const electricidad = engine.addEntity()
    AudioSource.createOrReplace(electricidad, {
      audioClipUrl: 'audio/Electricidad.mp3',
      playing: true
      // global:false
    })
    Transform.create(electricidad, {
      position: portales[n].in,
      parent: buildingCore
    })
    const mutableSource = AudioSource.getMutable(electricidad)
    mutableSource.playing = true
    mutableSource.loop = true
    mutableSource.volume = 0.1
  }

  const tmp = engine.addEntity()
  AudioSource.createOrReplace(tmp, {
    audioClipUrl: 'audio/Teletransporte.mp3',
    playing: true,
    loop: false,
    volume: 0.6
    // global:false
  })
  Transform.create(tmp, { position: Vector3.create(0, 0, 0.5) })
  AvatarAttach.create(tmp, {
    anchorPointId: AvatarAnchorPointType.AAPT_HEAD
  })

  // async function getMensajes():Promise<void> {
  //   return getFactory(contracts.mensajes.matic).then(async (contract) => {
  //     return await contract.getMessages()
  //   })
  // }

  let frame: number = 0
  let buildingVisible: boolean = false
  let justTeleported: boolean = false
  let teleportTime: number = 0
  let teleporting: boolean = false
  let teleportingFrom: number = 0
  let timePass: number = 0
  function AnimSystem(dt: number): void {
    if (!buildingVisible) {
      if (
        distanceIsLessThan(
          Transform.get(mainDoor).position,
          Transform.get(engine.PlayerEntity).position,
          1
        )
      ) {
        buildingVisible = true
        justTeleported = true
        Transform.getMutable(buildingCore).position.y = 0
        Transform.getMutable(mainDoor).position.y = -20
        const mutableBosqueT = Transform.getMutableOrNull(bosque)
        if (mutableBosqueT !== null) {
          mutableBosqueT.position.y = -500
        }
        void movePlayerTo({
          newRelativePosition: Vector3.create(37, 0, 45),
          cameraTarget: Vector3.create(46, 1, 45)
        })
      }
      return
    } else {
      if (
        distanceIsLessThan(
          Vector3.create(35, 0, 45),
          Transform.get(engine.PlayerEntity).position,
          1.5
        )
      ) {
        if (!justTeleported) {
          buildingVisible = false
          Transform.getMutable(buildingCore).position.y = -500
          // engine.removeEntity(static2)
          // engine.removeEntity(static3)
          // engine.removeEntity(static4)

          Transform.getMutable(mainDoor).position.y = 1
          const mutableBosqueT = Transform.getMutableOrNull(bosque)
          if (mutableBosqueT !== null) {
            mutableBosqueT.position.y = 0
          }
          void movePlayerTo({
            newRelativePosition: Vector3.create(16, 0, 16),
            cameraTarget: Vector3.create(16 + 8, 2, 16 + 8)
          })
          // AudioSource.getMutable(tunelfx).playing = true
          // pasillo_source.playOnce()
        }
      } else {
        justTeleported = false
      }
    }

    timePass += dt
    if (timePass < 0.3) {
      return
    }
    timePass = 0
    for (let n = 0; n < wearablesFrames.length; n++) {
      if (n === frame) {
        // console.log("show", n)
        Transform.createOrReplace(
          wearablesEntities[n],
          blenderTransform(wearablesT, buildingCore)
        )
        Transform.createOrReplace(
          labEntities[n],
          blenderTransform(labT, buildingCore)
        )
      } else {
        // console.log("hide", n)
        Transform.createOrReplace(wearablesEntities[n], {
          position: hiddenTransform.position,
          parent: buildingCore
        })
        Transform.createOrReplace(labEntities[n], {
          position: hiddenTransform.position,
          parent: buildingCore
        })
      }
      // console.log(wearablesEntities[this.frame].getComponent(Transform).position)
    }

    frame += 1
    if (frame >= wearablesEntities.length) {
      frame = 0
    }

    // Check Portales

    if (teleporting) {
      teleportTime -= 0.5
      console.log(teleportTime)
      if (teleportTime <= 0) {
        teleporting = false

        const port =
          portales[randomIntExcluding(0, portales.length, teleportingFrom)]
        void movePlayerTo({
          newRelativePosition: port.out[0],
          cameraTarget: port.out[1]
        })
      }
    } else {
      for (let n = 0; n < portales.length; n++) {
        if (
          distanceIsLessThan(
            portales[n].in,
            Transform.get(engine.CameraEntity).position,
            portales[n].dist
          )
        ) {
          console.log('on', n)
          if (n === 3) {
            // Inodoros
            // Si no está en la terraza, ignorar
            if (Transform.get(engine.CameraEntity).position.y < 4) break
          }
          teleportTime = 1
          teleporting = true
          teleportingFrom = n
          AudioSource.getMutable(tmp).playing = true
          break
        }
      }
    }
  }

  engine.addSystem(AnimSystem)

  //   async function getFactory(contractConfig: any):Promise<any> {
  //     const requestManager: any = new eth.RequestManager(maticProvider)

  //     const factory = new eth.ContractFactory(requestManager, contractConfig.abi)
  //     const contract = await factory.at(contractConfig.address)

  //     return contract
  //   }

  /* Electricidad */
  const electricidadPasilloFrames = [
    'models/electricidad_pasillo-001.gltf',
    'models/electricidad_pasillo-002.gltf',
    'models/electricidad_pasillo-003.gltf',
    'models/electricidad_pasillo-004.gltf',
    'models/electricidad_pasillo-005.gltf',
    'models/electricidad_pasillo-006.gltf'
  ]

  // Puerta principal (Bosque)
  const electricidad1 = createModelsAnimation(
    electricidadPasilloFrames,
    true,
    true
  )
  Transform.create(electricidad1, {
    // position: Vector3.create(16 + 8 + 2, 0.2, 16 + 8 + 3),
    position: Vector3.create(1.2, 0.2, 1.2),
    scale: Vector3.create(3, 10, 3),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    parent: bosque
  })

  // Vulva
  const electricidad2 = createModelsAnimation(
    electricidadPasilloFrames,
    true,
    true
  )
  Transform.create(electricidad2, {
    position: Vector3.create(14, 0.1, 14.5),
    scale: Vector3.create(1, 0.7, 1),
    parent: buildingCore
  })

  // Inodoros
  const electricidad3 = createModelsAnimation(
    electricidadPasilloFrames,
    true,
    true
  )
  Transform.create(electricidad3, {
    position: Vector3.create(9, 6.92, 11.54),
    scale: Vector3.create(1.5, 2, 1.5),
    parent: buildingCore
  })

  // Lavadero
  const electricidad4 = createModelsAnimation(
    electricidadPasilloFrames,
    true,
    true
  )
  Transform.create(electricidad4, {
    position: Vector3.create(38.64, 0.05, 11.42),
    scale: Vector3.create(1, 0.6, 1),
    parent: buildingCore
  })

  // Pasillo
  const electricidad5 = createModelsAnimation(
    electricidadPasilloFrames,
    true,
    true
  )
  Transform.create(electricidad5, {
    position: Vector3.create(46.17, 0.05, 30.97),
    scale: Vector3.create(1, 0.9, 1),
    parent: buildingCore
  })

  engine.addSystem(AnimationModelsSystem)

  /* Agregar nota */

  const pizarron = engine.addEntity()
  MeshCollider.setBox(pizarron)
  GltfContainer.create(pizarron, { src: 'models/pizarron.gltf' })
  Transform.create(pizarron, blenderTransform(pizarronT, buildingCore))
  const mutablePizarronTransform = Transform.getMutable(pizarron)

  pointerEventsSystem.onPointerDown(
    {
      entity: pizarron,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Agrega una nota' }
    },
    function () {
      enviarMensajePrompt.show()
    }
  )

  // function pizarronSystem(dt: number): void {
  //   if (enviarMensajePrompt.isVisible()) return
  //   if (
  //     !distanceIsLessThan(
  //       Transform.get(pizarron).position,
  //       Transform.get(engine.CameraEntity).position,
  //       4
  //     )
  //   ) {
  //     enviarMensajePrompt.hide()
  //   }
  // }

  // engine.addSystem(pizarronSystem)

  const messageTexts: string[] = []
  let textColors = [
    Color4.create(0.9, 0.1, 0.1),
    Color4.create(0.0, 0.5, 0.0),
    Color4.create(0.1, 0.1, 0.9),
    Color4.create(0.0, 0.5, 0.5),
    Color4.create(0.5, 0.5, 0.0),
    Color4.create(0.9, 0.1, 0.9)
  ]
  textColors = textColors.concat(textColors)

  for (let n = 0; n < 16; n++) {
    const pizarronTextE = engine.addEntity()
    messageTexts.push('')
    TextShape.create(pizarronTextE, {
      text: messageTexts[n],
      fontSize: 1,
      textAlign: 0,
      textColor: textColors[n]
    })
    Transform.create(pizarronTextE, blenderTransform(pizarronT, buildingCore))
    const mutableTransformPizarronTextE = Transform.getMutable(pizarronTextE)
    mutableTransformPizarronTextE.position = Vector3.add(
      mutablePizarronTransform.position,
      Vector3.create(-0.085, 1.9 - n * 0.1, 1.5 - randomRange(0, 0.1))
    )
    // mutablePizarronTransform.rotation = Quaternion.fromEulerDegrees(
    //   0,
    //   90,
    //   -5 + randomRange(0, 10)
    // )
    // mutablePizarronTransform.scale = Vector3.create(0.8, 0.8, 0.8)
  }

  const enviarMensajePrompt = ui.createComponent(ui.FillInPrompt, {
    title: 'Agregar nota en el pizarrón:',
    placeholder: 'Escribe tu nota aquí...',
    acceptLabel: 'Dejar nota',
    onAccept: (value: string): void => {
      enviarMensajePrompt.hide()
    }
    //   async (value: string) => {
    //     const functionSignature = functionSetGreeting.toPayload([value])
    //     const conf = contracts.mensajes.matic
    //     console.log(functionSignature)
    //     console.log(conf)
    //     enviarMensajePrompt.hide()
    //     prepareMetaTransaction(functionSignature, conf)
    //       .then((tx) => {
    //         console.log('Agrega nota Ok ', tx)
    //         refrescarMensajes(10000)
    //         mensajeOk.show()
    //         mensajeError.hide()
    //       })
    //       .catch((e) => {
    //         console.log('Error agregando nota', e)
    //         mensajeOk.hide()
    //         mensajeError.show()
    //       })
    //   }
  })

  /* Refrescar notas */
  // function refrescarMensajes(delay: number = 0):void {
  //   executeTask(async () => {
  //     await sleep(delay)
  //     const messages = await getMensajes()
  //     console.log(messages)
  //     console.log('Mensajes')
  //     for (let n = 0; n < messages.length; n++) {
  //       messageTexts[n].value = messages[n]
  //     }
  //   })
  // }
  // refrescarMensajes()

  /* Broche Instagram */

  const brocheInstagram = engine.addEntity()
  GltfContainer.create(brocheInstagram, { src: 'models/broche_instagram.gltf' })
  Transform.create(
    brocheInstagram,
    blenderTransform(brocheInstagramT, buildingCore)
  )
  MeshCollider.setBox(brocheInstagram)
  pointerEventsSystem.onPointerDown(
    {
      entity: brocheInstagram,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Nuestro Instagram' }
    },
    function () {
      void openExternalUrl({ url: 'https://www.instagram.com/malabiatown/' })
    }
  )

  /* Broche Malabia */

  const brocheMalabia = engine.addEntity()
  GltfContainer.create(brocheMalabia, { src: 'models/broche_malabia.gltf' })
  Transform.create(
    brocheMalabia,
    blenderTransform(brocheMalabiaT, buildingCore)
  )
  MeshCollider.setBox(brocheMalabia)

  pointerEventsSystem.onPointerDown(
    {
      entity: brocheMalabia,
      opts: { button: InputAction.IA_POINTER, hoverText: 'Nuestra web' }
    },
    function (): void {
      void openExternalUrl({ url: 'https://www.malabiatown.org/' })
    }
  )

  /* Cuerno Recepcion */

  const cuerno = engine.addEntity()
  GltfContainer.create(cuerno, {
    src: 'models/cuerno.gltf',
    invisibleMeshesCollisionMask: ColliderLayer.CL_POINTER
  })
  Transform.create(cuerno, blenderTransform(cuernoT, buildingCore))
  MeshCollider.setBox(cuerno)
  AudioSource.createOrReplace(cuerno, {
    audioClipUrl: 'audio/cuerno.mp3',
    playing: false,
    loop: false
    // global:false
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: cuerno,
      opts: { button: InputAction.IA_PRIMARY, hoverText: 'Tocar' }
    },
    function () {
      AudioSource.getMutable(cuerno).playing = true
    }
  )

  /* Puerta Cortina */

  // const puertaCortina = engine.addEntity()
  // GltfContainer.create(puertaCortina, { src: 'models/puerta_cortina.gltf' })
  // // MeshCollider.setPlane(puertaCortina, ColliderLayer.CL_NONE)
  // Transform.create(
  //   puertaCortina,
  //   blenderTransform(puertaCortinaT, buildingCore)
  // )

  /* Caldero */

  const caldero = engine.addEntity()
  GltfContainer.create(caldero, { src: 'models/caldero.gltf' })
  Transform.create(caldero, blenderTransform(calderoT, buildingCore))
  AudioSource.create(caldero, {
    audioClipUrl: 'audio/caldero.mp3',
    playing: true,
    loop: true
    // global:false
  })
  MeshCollider.setBox(caldero)
  pointerEventsSystem.onPointerDown(
    {
      entity: caldero,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Sabiduría del caldero'
      }
    },
    function () {
      calderoRandom()
    }
  )

  /* Fogonazo Anim */
  const fogonazoFrames = [
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

  const fogonazo = createModelsAnimation(fogonazoFrames)
  AnimationModelsComponent.getMutable(fogonazo).playing = true
  AnimationModelsComponent.getMutable(fogonazo).looping = false
  Transform.create(fogonazo, blenderTransform(fogonazoT, buildingCore))
  AudioSource.create(fogonazo, {
    audioClipUrl: 'audio/fogonazo.mp3',
    playing: false,
    loop: false
    // global:false
  })

  /* Marco caldero */

  const marcoCaldero = engine.addEntity()
  GltfContainer.create(marcoCaldero, { src: 'models/marco_caldero.gltf' })
  Transform.create(marcoCaldero, blenderTransform(marcoCalderoT, buildingCore))

  const canvasCaldero = engine.addEntity()
  MeshRenderer.setPlane(canvasCaldero)
  Transform.create(canvasCaldero, blenderTransform(marcoCalderoT, buildingCore))
  const mutableCanvasTransform = Transform.getMutable(canvasCaldero)
  mutableCanvasTransform.position = Vector3.add(
    mutableCanvasTransform.position,
    Vector3.create(-0.01, 0.77, 0)
  )
  mutableCanvasTransform.scale = Vector3.create(1.5, 1.5, 0)
  Material.setPbrMaterial(canvasCaldero, {
    texture: {
      tex: {
        $case: 'texture',
        texture: {
          src: 'textures/rays.png'
          // TODO Wraping mode??
        }
      }
    }
  })

  function calderoRandom(): void {
    const mutable = VideoPlayer.getMutableOrNull(canvasCaldero)
    if (mutable !== null) {
      mutable.playing = false
      mutable.position = 0
    }
    Material.deleteFrom(canvasCaldero)

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
      'textures/oraculo/WP_20160126003 (2).jpg',
      'textures/oraculo/20200621_130659.jpg',
      'textures/oraculo/20200706_133025.jpg',
      'textures/oraculo/IMG_20170531_120753_541.jpg',
      'textures/oraculo/IMG_20180617_215709_HDR.jpg',
      'textures/oraculo/IMG_20180814_185543_HDR.jpg',
      'textures/oraculo/IMG_20180911_221100_823.jpg',
      'textures/oraculo/Picsart2016-15-4--22-43-40.jpg'
    ]
    const textureUrl = obras[randomInt(0, obras.length - 1)]
    console.log(textureUrl)
    if (textureUrl.endsWith('.mp4')) {
      if (
        textureUrl === 'textures/oraculo/Lucia 01.mp4' ||
        textureUrl === 'textures/oraculo/Lucia 02.mp4'
      ) {
        Transform.getMutable(canvasCaldero).scale = Vector3.create(0.8, 1.5, 0)
      } else {
        Transform.getMutable(canvasCaldero).scale = Vector3.create(1.5, 0.9, 0)
      }
      Transform.getMutable(canvasCaldero).rotation =
        Quaternion.fromEulerDegrees(0, 90, 0)

      VideoPlayer.createOrReplace(canvasCaldero, {
        src: textureUrl,
        playing: true,
        position: 0,
        volume: 0.2
      })

      const videoTexture = Material.Texture.Video({
        videoPlayerEntity: canvasCaldero
      })

      Material.setBasicMaterial(canvasCaldero, {
        texture: videoTexture
      })
    } else {
      Transform.getMutable(canvasCaldero).scale = Vector3.create(1.5, 1.5, 0)
      Transform.getMutable(canvasCaldero).rotation =
        // Quaternion.fromEulerDegrees(0, 90, 180)
        Quaternion.fromEulerDegrees(0, 90, 0)

      Material.setBasicMaterial(canvasCaldero, {
        texture: Material.Texture.Common({
          src: textureUrl
        })
      })
      AudioSource.getMutable(fogonazo).playing = true
      AnimationModelsComponent.getMutable(fogonazo).playing = true
    }
  }

  calderoRandom()

  /* Malabia Upload Anim */
  const malabiaUploadFrames = [
    'models/malabia_uploads-001.gltf',
    'models/malabia_uploads-002.gltf',
    'models/malabia_uploads-003.gltf',
    'models/malabia_uploads-004.gltf',
    'models/malabia_uploads-005.gltf',
    'models/malabia_uploads-006.gltf'
  ]

  const malabiaUpload = createModelsAnimation(malabiaUploadFrames, true, true)
  Transform.create(
    malabiaUpload,
    blenderTransform(malabiaUploadT, buildingCore)
  )

  /* Alfombra Anim */
  const alfombrafxFrames = [
    'models/alfombra-001.gltf',
    'models/alfombra-002.gltf',
    'models/alfombra-003.gltf',
    'models/alfombra-004.gltf',
    'models/alfombra-005.gltf',
    'models/alfombra-006.gltf'
  ]

  const alfombrafx = createModelsAnimation(alfombrafxFrames, true, true)
  Transform.create(alfombrafx, blenderTransform(malabiafxT, buildingCore))

  /* Planta Anim */
  const plantafxFrames = [
    'models/planta-001.gltf',
    'models/planta-002.gltf',
    'models/planta-003.gltf',
    'models/planta-004.gltf',
    'models/planta-005.gltf',
    'models/planta-006.gltf'
  ]
  const plantafx = createModelsAnimation(plantafxFrames, true, true)
  Transform.create(plantafx, {
    position: Vector3.create(16 + 8, 0, 16 + 8),
    parent: buildingCore
  })

  /* Caballo Anim */
  const caballofxFrames = [
    'models/caballo-001.gltf',
    'models/caballo-002.gltf',
    'models/caballo-003.gltf',
    'models/caballo-004.gltf',
    'models/caballo-005.gltf',
    'models/caballo-006.gltf'
  ]

  const caballofx = createModelsAnimation(caballofxFrames, true, true)
  Transform.create(caballofx, blenderTransform(caballofxT, buildingCore))

  /* Caballo Anim */
  const tunelfxFrames = [
    'models/tunel-001.gltf',
    'models/tunel-002.gltf',
    'models/tunel-003.gltf',
    'models/tunel-004.gltf',
    'models/tunel-005.gltf',
    'models/tunel-006.gltf'
  ]

  const tunelfx = createModelsAnimation(tunelfxFrames, true, true)
  Transform.create(tunelfx, blenderTransform(tunelfxT, buildingCore))

  /* Portal Anim */
  const portalfxFrames = [
    'models/portal-001.gltf',
    'models/portal-002.gltf',
    'models/portal-003.gltf',
    'models/portal-004.gltf',
    'models/portal-005.gltf',
    'models/portal-006.gltf'
  ]
  const portalfx = createModelsAnimation(portalfxFrames, true, true)
  Transform.create(portalfx, {
    position: Vector3.create(0, 0, 0),
    parent: bosque
  })

  /* Terraza Anim */
  const terrazafxFrames = [
    'models/terraza_luz-001.gltf',
    'models/terraza_luz-002.gltf',
    'models/terraza_luz-003.gltf',
    'models/terraza_luz-004.gltf',
    'models/terraza_luz-005.gltf',
    'models/terraza_luz-006.gltf'
  ]

  const terrazafx = createModelsAnimation(terrazafxFrames, true, true)
  Transform.create(terrazafx, blenderTransform(terrazafxT, buildingCore))

  /* Vela Anim */

  const velafx = engine.addEntity()
  GltfContainer.create(velafx, { src: 'models/vela.gltf' })
  Transform.create(velafx, blenderTransform(velaT, buildingCore))

  /* Exit Anim */
  const exitFrames = [
    'models/exit-001.gltf',
    'models/exit-002.gltf',
    'models/exit-003.gltf',
    'models/exit-004.gltf'
  ]

  const exit1 = createModelsAnimation(exitFrames, true, true)
  Transform.create(exit1, blenderTransform(exit1T, buildingCore))

  const exit2 = createModelsAnimation(exitFrames)
  Transform.create(exit2, blenderTransform(exit2T, buildingCore))
}
