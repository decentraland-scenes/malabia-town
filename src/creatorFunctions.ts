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
  TransformType,
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
import { createElectricidad, ElectricidadSystem } from './electricidad'

// import { getUserAccount } from '@decentraland/EthereumController'
// import { getProvider } from '@decentraland/web3-provider'
// import {
//   //ContractName,
//   //getContract,
//   sendMetaTransaction
// } from 'decentraland-transactions'

import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
// import { getPlayer } from '@dcl/sdk/src/players'
import { ElectricidadComponent } from './definitions'
import { movePlayerTo, openExternalUrl } from '~system/RestrictedActions'
// import { abiManaArray } from './erc20Abi'
// import { abiMensajes } from './mensajesAbi'
const TORCHS_T: TransformType[] = [
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
export function createTorchs(parent: Entity): void {
  for (let n = 0; n < TORCHS_T.length; n++) {
    const antorcha = engine.addEntity()
    GltfContainer.create(antorcha, { src: 'models/antorcha.gltf' })
    Transform.create(antorcha, blenderTransform(TORCHS_T[n], parent))
  }
}

const BUTTERFLIES_T: TransformType = {
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
export function createButterflies(parent: Entity): void {

  const mariposa = engine.addEntity()
  GltfContainer.create(mariposa, { src: 'models/mariposa.gltf' })
  Transform.create(mariposa, blenderTransform(BUTTERFLIES_T, parent))

  /* Mariposas Bosque */
  const mariposas: Entity[] = []
  for (let n = 0; n < 10; n++) {
    mariposas.push(engine.addEntity())
    GltfContainer.create(mariposas[n], { src: 'models/mariposa.gltf' })
    Transform.create(mariposas[n], {
      position: Vector3.create(
        randomRange(10, 40),
        randomRange(0.5, 2.5),
        randomRange(10, 40)
      ),
      rotation: Quaternion.fromEulerDegrees(0, randomRange(0, 170), 0),
      scale: Vector3.create(1.5, 1.5, 1.5),
      parent
    })
  }
}

  /* Puerta principal */

  const mainDoor = engine.addEntity()
  // MeshRenderer.setBox(mainDoor)
  Transform.create(mainDoor, {
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
      playing: true
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
          Transform.get(engine.CameraEntity).position,
          2
        )
      ) {
        buildingVisible = true
        justTeleported = true
        Transform.getMutable(buildingCore).position.y = 5
        Transform.getMutable(mainDoor).position.y = -25
        const mutableBosqueT = Transform.getMutableOrNull(bosque)
        if (mutableBosqueT !== null) {
          mutableBosqueT.position.y = -25
        }
        engine.removeEntity(bosque)
        engine.removeEntity(electricidad1)
        engine.removeEntity(portalfx)
        for (let n = 0; n < mariposas.length; n++) {
          engine.removeEntity(mariposas[n])
        }
        void movePlayerTo({
          newRelativePosition: Vector3.create(34, 0, 45),
          cameraTarget: Vector3.create(46, 1, 45)
        })
      }
      return
    } else {
      if (
        distanceIsLessThan(
          Vector3.create(35, 1.75, 45),
          Transform.get(engine.CameraEntity).position,
          2
        )
      ) {
        if (!justTeleported) {
          buildingVisible = false
          Transform.getMutable(buildingCore).position.y = -20
          // engine.removeEntity(static2)
          // engine.removeEntity(static3)
          // engine.removeEntity(static4)

          Transform.getMutable(mainDoor).position.y = 1
          const mutableBosqueT = Transform.getMutableOrNull(bosque)
        if (mutableBosqueT !== null) {
          mutableBosqueT.position.y = 0
        }
          for (let n = 0; n < mariposas.length; n++) {
            mariposas.push(engine.addEntity())
          }
          void movePlayerTo({
            newRelativePosition: Vector3.create(16, 0, 16),
            cameraTarget: Vector3.create(16 + 8, 2, 16 + 8)
          })
          AudioSource.getMutable(tunelfx).playing = true
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
  const electricidad1 = createElectricidad(
    electricidadPasilloFrames,
    true,
    true
  )
  Transform.create(electricidad1, {
    position: Vector3.create(16 + 8 + 2, 0.2, 16 + 8 + 3),
    scale: Vector3.create(3, 10, 3),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    parent: buildingCore
  })

  // Vulva
  const electricidad2 = createElectricidad(
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
  const electricidad3 = createElectricidad(
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
  const electricidad4 = createElectricidad(
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
  const electricidad5 = createElectricidad(
    electricidadPasilloFrames,
    true,
    true
  )
  Transform.create(electricidad5, {
    position: Vector3.create(46.17, 0.05, 30.97),
    scale: Vector3.create(1, 0.9, 1),
    parent: buildingCore
  })

  engine.addSystem(ElectricidadSystem)

  /* Agregar nota */

  const pizarronT = {
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
      x: 4.0,
      y: 4.0,
      z: 4.0
    }
  }

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

  function pizarronSystem(dt: number): void {
    if (enviarMensajePrompt.isVisible()) return
    if (
      !distanceIsLessThan(
        Transform.get(pizarron).position,
        Transform.get(engine.CameraEntity).position,
        4
      )
    ) {
      enviarMensajePrompt.hide()
    }
  }

  engine.addSystem(pizarronSystem)

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
    mutablePizarronTransform.rotation = Quaternion.fromEulerDegrees(
      0,
      90,
      -5 + randomRange(0, 10)
    )
    mutablePizarronTransform.scale = Vector3.create(0.8, 0.8, 0.8)
  }

  const enviarMensajePrompt = ui.createComponent(ui.FillInPrompt, {
    title: 'Agregar nota en el pizarrón:',
    placeholder: 'Escribe tu nota aquí...',
    acceptLabel: 'Dejar nota',
    onAccept: (value: string): void => {enviarMensajePrompt.hide()}
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
  const brocheInstagramT = {
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
  const brocheInstagram = engine.addEntity()
  GltfContainer.create(brocheInstagram, { src: 'models/brocheInstagram.gltf' })
  Transform.create(
    brocheInstagram,
    blenderTransform(brocheInstagramT, buildingCore)
  )
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
  const brocheMalabiaT = {
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

  const brocheMalabia = engine.addEntity()
  GltfContainer.create(brocheMalabia, { src: 'models/brocheMalabia.gltf' })
  Transform.create(
    brocheMalabia,
    blenderTransform(brocheMalabiaT, brocheMalabia)
  )
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
  const cuernoT = {
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
  const puertaCortinaT = {
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
  const puertaCortina = engine.addEntity()
  GltfContainer.create(puertaCortina, { src: 'models/puertaCortina.gltf' })
  MeshCollider.setPlane(puertaCortina, ColliderLayer.CL_PHYSICS)
  Transform.create(
    puertaCortina,
    blenderTransform(puertaCortinaT, buildingCore)
  )

  /* Caldero */
  const calderoT = {
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
  GltfContainer.create(caldero, { src: 'models/caldero.gltf' })
  Transform.create(caldero, blenderTransform(calderoT, buildingCore))
  AudioSource.create(caldero, {
    audioClipUrl: 'audio/caldero.mp3',
    playing: true,
    loop: true
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
  const fogonazoT = {
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
  const fogonazo = createElectricidad(fogonazoFrames)
  ElectricidadComponent.getMutable(fogonazo).playing = true
  ElectricidadComponent.getMutable(fogonazo).looping = false
  Transform.create(fogonazo, blenderTransform(fogonazoT, buildingCore))
  AudioSource.create(fogonazo, {
    audioClipUrl: 'audio/fogonazo.mp3',
    playing: false,
    loop: false
  })

  /* Marco caldero */
  const marcoCalderoT = {
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
  const marcoCaldero = engine.addEntity()
  GltfContainer.create(marcoCaldero, { src: 'models/marcoCaldero.gltf' })
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
    VideoPlayer.deleteFrom(canvasCaldero)
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

      VideoPlayer.create(canvasCaldero, {
        src: textureUrl,
        playing: true
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
        Quaternion.fromEulerDegrees(0, 90, 180)
      Material.setBasicMaterial(canvasCaldero, {
        texture: Material.Texture.Common({
          src: textureUrl
        })
      })
      AudioSource.getMutable(fogonazo).playing = true
      ElectricidadComponent.getMutable(fogonazo).playing = true
    }
  }

  calderoRandom()

  /* Malabia Upload Anim */
  const malabiaUploadFrames = [
    'models/malabiaUploads-001.gltf',
    'models/malabiaUploads-002.gltf',
    'models/malabiaUploads-003.gltf',
    'models/malabiaUploads-004.gltf',
    'models/malabiaUploads-005.gltf',
    'models/malabiaUploads-006.gltf'
  ]
  const malabiaUploadT = {
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
  const malabiaUpload = createElectricidad(malabiaUploadFrames, true, true)
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
  const malabiafxT = {
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
  const alfombrafx = createElectricidad(alfombrafxFrames, true, true)
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
  const plantafx = createElectricidad(plantafxFrames, true, true)
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
  const caballofxT = {
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
  const caballofx = createElectricidad(caballofxFrames, true, true)
  Transform.create(caballofx, blenderTransform(caballofxT, buildingCore))

/* Caballo Anim */
  
export function createTunnelAnim(parent: Entity): void{
  const tunelfxFrames = [
    'models/tunel-001.gltf',
    'models/tunel-002.gltf',
    'models/tunel-003.gltf',
    'models/tunel-004.gltf',
    'models/tunel-005.gltf',
    'models/tunel-006.gltf'
  ]
  const tunelfxT = {
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
  const tunelfx = createElectricidad(tunelfxFrames, true, true)
  Transform.create(tunelfx, blenderTransform(tunelfxT, parent))
  AudioSource.create(tunelfx, {
    audioClipUrl: 'audio/magia.mp3',
    playing: false,
    loop: false
  })
}
  
export function createPortalAnim(parent: Entity): void {
  /* Portal Anim */
  const portalfxFrames = [
    'models/portal-001.gltf',
    'models/portal-002.gltf',
    'models/portal-003.gltf',
    'models/portal-004.gltf',
    'models/portal-005.gltf',
    'models/portal-006.gltf'
  ]
  const portalfx = createElectricidad(portalfxFrames, true, true)
  Transform.create(portalfx, {
    position: Vector3.create(16 + 8, 0, 16 + 8), parent
  })
}

/* Terraza Anim */
export function rooftopAnimation(parent: Entity): void{
  const terrazafxFrames = [
    'models/terraza_luz-001.gltf',
    'models/terraza_luz-002.gltf',
    'models/terraza_luz-003.gltf',
    'models/terraza_luz-004.gltf',
    'models/terraza_luz-005.gltf',
    'models/terraza_luz-006.gltf'
  ]
  const terrazafxT = {
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
  const terrazafx = createElectricidad(terrazafxFrames, true, true)
  Transform.create(terrazafx, blenderTransform(terrazafxT, parent))
}

export function createCandle(parent: Entity): void {
  /* Vela Anim */

  const velaT = {
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
  GltfContainer.create(velafx, { src: 'models/vela.gltf' })
  Transform.create(velafx, blenderTransform(velaT, parent))
}

export function createExitSignal(parent: Entity): void{
     /* Exit Anim */
  const exitFrames = [
    'models/exit-001.gltf',
    'models/exit-002.gltf',
    'models/exit-003.gltf',
    'models/exit-004.gltf'
  ]
  const exit1T = {
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
  const exit1 = createElectricidad(exitFrames, true, true)
  Transform.create(exit1, blenderTransform(exit1T, parent))

  const exit2T = {
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
  const exit2 = createElectricidad(exitFrames)
  Transform.create(exit2, blenderTransform(exit2T, parent))
}
  
export type createEntitySrc = string | string[]
export type createEntityTransform = TransformType | TransformType[]
export function createEntity(parent: Entity, src: createEntitySrc, transform: createEntityTransform): void{
  if (typeof src === 'string') {
    const velafx = engine.addEntity()
    GltfContainer.create(velafx, { src: 'models/vela.gltf' })
    Transform.create(velafx, blenderTransform(velaT, parent))
  }
  
  
}