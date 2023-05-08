import { constructiveSolidGeometry } from './examples/constructive_solid_geometry'
import { outlineGeometry } from './examples/outline_geometry'

// @ts-ignore
const canvas: any = three_canvas
let example: string = ""

const threeCanvas = document.getElementById('three_canvas')
const exampleAttribute = threeCanvas?.getAttribute('example')
if (exampleAttribute) {
    console.log(`load example ${exampleAttribute}`)
    example = exampleAttribute
}

switch(example) {
    default:
    case 'csg_example': constructiveSolidGeometry(canvas); break;
    case 'outline_geometry_example': outlineGeometry(canvas); break;
}
