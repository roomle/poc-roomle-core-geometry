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
    DirectionalLight,
    GridHelper,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
} from 'three';


export const outlineGeometry = async (canvas: any) => {
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

    const objectGeometry = new BoxGeometry(1, 1, 1);
    const objectMaterial = new MeshPhysicalMaterial({color: 0xc0f0c0, transparent: true, opacity: 0.5});
    const object = new Mesh(objectGeometry, objectMaterial);
    scene.add(object);

    createOutline(scene, object, new Vector3(0, 0, -1), new Vector3(0, 1));

    const statistic = new Statistic();
    const dataGui = new DataGUI();

    const onWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    window.addEventListener('resize', onWindowResize, false);
    
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
};

let outlineMesh: Mesh | undefined = undefined;
const createOutline = (scene: Scene, sourceMesh: Mesh, direction: Vector3, up: Vector3) => {
    const outlineVertices = outlineFromMeshWASM(sourceMesh, new Vector3(0, 0, -1), new Vector3(0, 1));
    console.log(outlineVertices);
    const outlineMaterial = new LineBasicMaterial({ color: 0xff0000});
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
        const outline = new Line(outlineGeometry, outlineMaterial);
        scene.add(outline);
    }
}