import { calculateMeshOutline } from './mesh_utility'
import { 
    BufferAttribute,
    Mesh,
    Vector3
} from "three";

export const outlineFromMeshWASM = (mesh0: Mesh, direction: Vector3, up: Vector3, epsilon = 0.0001) => {

    const meshData0 = {
        vertices: (mesh0.geometry.attributes.position as BufferAttribute).array,
        normals: (mesh0.geometry.attributes.normal as BufferAttribute)?.array,
        uvs: (mesh0.geometry.attributes.uv as BufferAttribute)?.array,
        indices: new Uint32Array(mesh0.geometry.index?.array ?? [])
    };

    const resultContour2d = calculateMeshOutline(meshData0, [direction.x, direction.y, direction.z], [up.x, up.y, up.z]);
    const contour2d: number[] = [];
    for (let i = 0; i < resultContour2d.size(); ++i) {
        contour2d.push(resultContour2d.get(i));
    }

    console.log(contour2d);
}