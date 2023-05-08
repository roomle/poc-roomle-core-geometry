import { ElapsedTime } from '../utility/time_utility'
import { Controls } from '../utility/controls'
import { MeshSpecification } from '../utility/geometry_buffer'
import { 
    findTriangleInMesh,
    calculateIntersectionBox,
    intersectMeshWASM,
    MESH_INTERSECT,
    MESH_MINUS_AB,
    MESH_OR_AB,
    MESH_AND_AB
} from '../utility/intersection_utility'
import { 
    createBufferGeometry,
    createEquilateralTriangleGeometry
} from '../utility/three_geometry'
import { intiMeshUtility } from '../utility/mesh_utility';
import { DataGUI, Statistic } from '../utility/ui_utility' 
import {
    AmbientLight,
    AxesHelper,
    Box3Helper,
    BoxGeometry,
    BufferGeometry,
    Camera,
    Color,
    DirectionalLight,
    FrontSide,
    GridHelper,
    Group,
    LineBasicMaterial,
    LineSegments,
    Material,
    Mesh,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    Object3D,
    PerspectiveCamera,
    Scene,
    SphereGeometry,
    Vector2,
    WebGLRenderer,
    WireframeGeometry,
} from 'three';

// TODO:
// - more complex example
// - texture

export const constructiveSolidGeometry = async (canvas: any) => {
    await intiMeshUtility();

    const renderer = new WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 1.5;
    camera.position.z = 3;
    const controls = new Controls(renderer, camera);

    const scene = new Scene();
    scene.background = new Color(0xc0c0c0);

    const ambientLight = new AmbientLight(0x404040);
    scene.add(ambientLight); 
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    const gridHelper = new GridHelper(10, 10);
    scene.add(gridHelper);
    const axesHelper = new AxesHelper(2);
    scene.add(axesHelper);

    const geometry1 = new SphereGeometry(1, 32, 16);
    const material1 = new MeshPhysicalMaterial({color: 0xc0c0c0, polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 2});
    const object1 = addGeometry(scene, geometry1, material1);
    object1.group.position.set(0, 0, 0);
    const geometry2 = new BoxGeometry(1, 1, 1);
    const material2 = new MeshPhysicalMaterial({color: 0xc0f0c0, transparent: true, opacity: 0.5});
    const object2 = addGeometry(scene, geometry2, material2);
    object2.group.position.set(0.5, 0.5, 0.5);
    
    const statistic = new Statistic();
    const dataGui = new DataGUI();
    const uiProperties = {
        intersectionBox: true,
        intersect: true,
    };
    dataGui.gui.add(uiProperties, 'intersectionBox').onChange(() => updateIntersection());
    dataGui.gui.add(uiProperties, 'intersect').onChange(() => updateIntersection());
    dataGui.gui.add<any>(material2, 'opacity', 0, 1).onChange(() => material2.needsUpdate = true);

    const updateObjectFromMeshSpecification = (geometryObject: GeometryObject | undefined, specification: MeshSpecification, material: Material): GeometryObject => {
        const geometry = createBufferGeometry(specification);
        if (geometryObject) {
            scene.remove(geometryObject.group);
        }
        geometryObject = addGeometry(scene, geometry, material);
        geometryObject.group.applyMatrix4(object1.mesh.matrixWorld);
        geometryObject.group.updateMatrixWorld();
        return geometryObject;
    }

    const errorMaterial = new MeshBasicMaterial({color: 0xff0000, side: FrontSide, polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 2});
    const intersectMeshes = () => {
        const intersectionGeometry = intersectMeshWASM(object1.mesh, object2.mesh, MESH_MINUS_AB);
        if (intersectionGeometry) {
            intersectionObject = updateObjectFromMeshSpecification(intersectionObject, intersectionGeometry, intersectionGeometry.error ? errorMaterial : material1);
            intersectionObject.group.visible = true;
            object1.group.visible = false;
        } else if (intersectionObject) {
            intersectionObject.group.visible = false;
            object1.group.visible = true;
        }
    }

    let boxHelper: Box3Helper | undefined;
    let intersectionObject: GeometryObject | undefined;
    const updateIntersection = () => {
        //console.log(object2.group.position);
        object1.group.updateMatrixWorld();
        object2.group.updateMatrixWorld();
        if (boxHelper) {
            scene.remove(boxHelper);
        }
        const intersection = calculateIntersectionBox(object1.mesh, object2.mesh);
        if (!intersection.isEmpty() && uiProperties.intersectionBox) { 
            boxHelper = new Box3Helper(intersection, new Color(1, 0, 0));
            scene.add(boxHelper);
        } else {
            boxHelper = undefined;
        }
        if (uiProperties.intersect) {
            intersectMeshes();
        } else if (intersectionObject) {
            intersectionObject.group.visible = false;
            object1.group.visible = true;
        }
    }
    updateIntersection();
    const transformControl = controls.addTransformControl(object2.group, scene);
    transformControl.addEventListener('objectChange', (event: any) => {
        updateIntersection();
    });

    const highlightGeometry = createEquilateralTriangleGeometry();
    const highlightMaterial = new MeshBasicMaterial({color: 0xffff00});
    const highlightTriangleMesh = new Mesh(highlightGeometry, highlightMaterial);
    scene.add(highlightTriangleMesh);
    highlightTriangleMesh.visible = false;

    const onWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    window.addEventListener('resize', onWindowResize, false);
    const canvasPointer: Vector2 = new Vector2();
    const onPointerMove = (event: any) => {
        canvasPointer.x = event.clientX / window.innerWidth * 2 - 1;
	    canvasPointer.y = 1 - event.clientY / window.innerHeight * 2;
        highlightTriangleOfMesh(highlightTriangleMesh, object1.mesh, camera, canvasPointer);
    };
    window.addEventListener('pointermove', onPointerMove);

    const elapsedTime = new ElapsedTime();
    const animate = (timestamp: number) => {
        elapsedTime.update(timestamp);
        requestAnimationFrame(animate);
        controls.update();
        render();
        statistic.update();
    }

    const render = () => {
        renderer.render(scene, camera);
    }
    animate(0);
}

interface GeometryObject {
    mesh: Mesh,
    group: Group
}

const highlightTriangleOfMesh = (highlightTriangleMesh: Mesh, mesh: Mesh, camera: Camera, canvasPointer: Vector2) => {
    const intersectsMesh = findTriangleInMesh(mesh, camera, canvasPointer);
    
    const material = mesh.material as MeshPhysicalMaterial;
    material.color.set(intersectsMesh ? 0xff40ff : 0xc0c0c0);
    material.needsUpdate = true;

    highlightTriangleMesh.visible = intersectsMesh?.length === 3;    
    if (highlightTriangleMesh.visible && intersectsMesh) {
        const normal = intersectsMesh[1].clone().sub(intersectsMesh[0]).cross(intersectsMesh[2].clone().sub(intersectsMesh[0])).normalize();
        const vertices = new Float32Array([
            intersectsMesh[0].x, intersectsMesh[0].y, intersectsMesh[0].z,
            intersectsMesh[1].x, intersectsMesh[1].y, intersectsMesh[1].z,
            intersectsMesh[2].x, intersectsMesh[2].y, intersectsMesh[2].z,
        ]);
        const normals = new Float32Array([
            normal.x, normal.y, normal.z,
            normal.x, normal.y, normal.z,
            normal.x, normal.y, normal.z,
        ]);
        highlightTriangleMesh.geometry = createBufferGeometry({ vertices, normals });
        highlightTriangleMesh.position.set(0, 0, 0);
        highlightTriangleMesh.rotation.set(0, 0, 0);
        highlightTriangleMesh.scale.set(1, 1, 1);
        highlightTriangleMesh.updateMatrix();
        highlightTriangleMesh.applyMatrix4(mesh.matrixWorld);
        highlightTriangleMesh.updateMatrixWorld();
    }
}

const addGeometry = (target: Object3D, geometry: BufferGeometry, material: Material): GeometryObject => {
    const mesh = new Mesh(geometry, material);
    const lineMaterial = new LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5});
    const lineSegments = new LineSegments(new WireframeGeometry(geometry), lineMaterial);
    const group = new Group();
    group.add(mesh);
    group.add(lineSegments);
    target.add(group);
    return { mesh, group };
}
