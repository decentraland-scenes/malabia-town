
import { tiles } from "./common"
const texture = new Texture(`textures/rays.png`, {samplingMode:1, hasAlpha:false});

@Component("rayvolt")
export class RayComponent {
    plane: PlaneShape
    constructor() {
        this.plane = new PlaneShape()
    }
}

export class Ray extends Entity {
    constructor(color: Color3) {
        super()
        //const rays = new Entity()
        const plane = new PlaneShape()
        plane.withCollisions = false
        plane.uvs = tiles(2, 2, 0, 0)
        this.addComponent(plane)
        const rayComponent = new RayComponent()
        rayComponent.plane = plane
        this.addComponent(rayComponent)
        engine.addEntity(this)

        const mat = new Material()
        mat.emissiveColor = color
        mat.emissiveIntensity = 5
        mat.albedoTexture = texture
        mat.alphaTexture = texture

        this.addComponent(mat)
    }
}

const frames = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
]

const raysGroup = engine.getComponentGroup(RayComponent)
export class RaySystem implements ISystem {
    timePass: number = 0
    frame: number = 0
    update(td: number) {
        this.timePass += td
        if (this.timePass < 0.1) {
            return
        }
        this.timePass = 0
        for (let ray of raysGroup.entities) {
            const plane =  ray.getComponent(RayComponent).plane
            //
            plane.uvs = tiles(2, 2, frames[this.frame][0], frames[this.frame][1])

        }
        this.frame += 1
        if (this.frame > 3) {
            this.frame = 0
        }
    }
}
