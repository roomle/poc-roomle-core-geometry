import { calculateMeshOutline } from './mesh_utility'
import { 
    BufferAttribute,
    Mesh,
    Vector3
} from "three";

export const outlineFromMeshWASM = (mesh0: Mesh, direction: Vector3, up: Vector3, epsilon = 0.0001): Float32Array | null => {

    const meshData0 = {
        vertices: (mesh0.geometry.attributes.position as BufferAttribute).array,
        normals: (mesh0.geometry.attributes.normal as BufferAttribute)?.array,
        uvs: (mesh0.geometry.attributes.uv as BufferAttribute)?.array,
        indices: new Uint32Array(mesh0.geometry.index?.array ?? [])
    };
    //consoleLogFloatArray(meshData0.vertices);
    //consoleLogFloatArray(meshData0.indices);

    const resultContour2d = calculateMeshOutline(meshData0, [direction.x, direction.y, direction.z], [up.x, up.y, up.z]);
    if (!resultContour2d || resultContour2d.size() === 0) {
        return new Float32Array(0);
    }
    const noOfPoints = resultContour2d.size() / 2;
    const contour2d =  new Float32Array(resultContour2d.size());
    for (let i = 0; i < resultContour2d.size(); ++i) {
        contour2d[i] = resultContour2d.get(i);
    }
    return contour2d;
}

const consoleLogFloatArray = (a: any, decimalPlaces = 4) => {
    const oa = [];
    for (let i = 0; i < a.length; ++i) {
        oa.push(Number(a[i].toFixed(decimalPlaces)));
    }
    console.log(JSON.stringify(oa));
}