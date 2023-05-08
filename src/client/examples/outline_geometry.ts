import { ElapsedTime } from '../utility/time_utility'
import { Controls } from '../utility/controls'
import { intiMeshUtility } from '../utility/mesh_intersection';
import { DataGUI, Statistic } from '../utility/ui_utility' 
import {
    AmbientLight,
    AxesHelper,
    BoxGeometry,
    Color,
    DirectionalLight,
    GridHelper,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    Scene,
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

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhysicalMaterial({color: 0xc0f0c0, transparent: true, opacity: 0.5});
    const object = new Mesh(geometry, material);
    scene.add(object);

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