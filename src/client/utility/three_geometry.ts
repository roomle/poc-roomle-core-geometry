import { MeshSpecification } from '../utility/geometry_buffer';
import {
    BufferAttribute,
    BufferGeometry
} from 'three';

export const createBufferGeometry = (meshSpecification: MeshSpecification): THREE.BufferGeometry => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(meshSpecification.vertices, 3));
    if (meshSpecification.normals) {
        geometry.setAttribute('normal', new BufferAttribute(meshSpecification.normals, 3));
    }
    if (meshSpecification.uvs) {
        geometry.setAttribute('uv', new BufferAttribute(meshSpecification.uvs, 2));
    }
    if (meshSpecification.colors) {
        geometry.setAttribute('color', new BufferAttribute(meshSpecification.colors, 3));
    }
    if (meshSpecification.indices) {
        geometry.setIndex(new BufferAttribute(meshSpecification.indices, 1));
    }
    return geometry;
}

export const createEquilateralTriangleGeometry = (): THREE.BufferGeometry => {
    const vertices = new Float32Array([-0.866, -0.5, 0, 0.866, -0.5, 0, 0, 1, 0]);
    const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]);
    const indices = new Uint32Array([0, 1, 2]);
    return createBufferGeometry({vertices, normals, indices});
}