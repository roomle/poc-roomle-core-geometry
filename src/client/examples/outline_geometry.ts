import { ElapsedTime } from '../utility/time_utility'
import { Controls } from '../utility/controls'
import { intiMeshUtility } from '../utility/mesh_utility';
import { outlineFromMeshWASM } from '../utility/outline_utility'
import { DataGUI, Statistic } from '../utility/ui_utility' 
import {
    AmbientLight,
    AxesHelper,
    BoxGeometry,
    BufferGeometry,
    Color,
    Curve,
    DirectionalLight,
    DoubleSide,
    GridHelper,
    Group,
    Line,
    LineBasicMaterial,
    LineSegments,
    Material,
    Mesh,
    MeshPhysicalMaterial,
    Object3D,
    OrthographicCamera,
    Scene,
    SphereGeometry,
    TubeGeometry,
    Vector3,
    WebGLRenderer,
    WireframeGeometry,
} from 'three';


export const outlineGeometry = async (canvas: any) => {
    await intiMeshUtility();

    const renderer = new WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    const volumeSize = 5;
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new OrthographicCamera(-volumeSize, volumeSize, volumeSize, -volumeSize, -volumeSize, volumeSize);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -0.3;
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

    //const objectGeometry = new BoxGeometry(1, 1, 1);
    const objectGeometry = new SphereGeometry(1, 8, 4);
    //const objectGeometry = debugTubeGeometry();
    const objectMaterial = new MeshPhysicalMaterial({color: 0xc0f0c0, transparent: true, opacity: 0.5});
    const object = addGeometry(scene, objectGeometry, objectMaterial);

    const statistic = new Statistic();
    const dataGui = new DataGUI();

    const onWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;
        camera.left = -volumeSize * aspect;
        camera.right = volumeSize * aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    window.addEventListener('resize', onWindowResize, false);
    
    let worldDirection = new Vector3();
    const elapsedTime = new ElapsedTime();
    const animate = (timestamp: number) => {
        elapsedTime.update(timestamp);
        controls.update();
        camera.updateMatrixWorld();
        const newWorldDirection = camera.getWorldDirection(new Vector3()).clone();
        if (worldDirection.distanceTo(newWorldDirection) > 0.001) {
            worldDirection = newWorldDirection;
            console.log(worldDirection);
            const outline = createOutline(scene, object, worldDirection, new Vector3(0, 1, 0));
            outline.rotation.copy(camera.rotation);
        }
        render();
        statistic.update();
        requestAnimationFrame(animate);
    }

    const render = () => {
        renderer.render(scene, camera);
    }
    animate(0);
};

const debugTubeGeometry = (): BufferGeometry => {
    class CustomSinCurve extends Curve<Vector3> {
        private scale: number;
        constructor(scale = 1 ) {
            super();
            this.scale = scale;
        }
        getPoint(t: number, optionalTarget = new Vector3() ) {
            const tx = t * 3 - 1.5;
            const ty = Math.sin( 2 * Math.PI * t );
            const tz = 0;
            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
        }
    }
    const path = new CustomSinCurve(1);
    const objectGeometry = new TubeGeometry(path, 10, 0.5, 8, false);
    return objectGeometry;
}

const addGeometry = (target: Object3D, geometry: BufferGeometry, material: Material): Mesh => {
    const mesh = new Mesh(geometry, material);
    const lineMaterial = new LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5});
    const lineSegments = new LineSegments(new WireframeGeometry(geometry), lineMaterial);
    const group = new Group();
    group.add(mesh);
    group.add(lineSegments);
    target.add(group);
    return mesh;
}

let outlineMesh: Line | undefined = undefined;
const createOutline = (scene: Scene, sourceMesh: Mesh, direction: Vector3, up: Vector3) : Line => {
    const outlineVertices = outlineFromMeshWASM(sourceMesh, direction, up);
    console.log(outlineVertices);
    const outlineMaterial = new LineBasicMaterial({ color: 0xff0000, side: DoubleSide});
    const outlinePoints = [];
    if (outlineVertices && outlineVertices.length > 2) {
        for (let i = 0; i < outlineVertices.length; i += 2) {
            outlinePoints.push(new Vector3(outlineVertices[i], outlineVertices[i+1], 0));
        }
        outlinePoints.push(new Vector3(outlineVertices[0], outlineVertices[1], 0));
    }
    const outlineGeometry = new BufferGeometry().setFromPoints(outlinePoints);
    if (outlineMesh) {
        outlineMesh.geometry.dispose();
        outlineMesh.geometry = outlineGeometry;
    } else {
        outlineMesh = new Line(outlineGeometry, outlineMaterial);
        scene.add(outlineMesh);
    }
    return outlineMesh;
}