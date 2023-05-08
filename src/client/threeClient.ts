import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// @ts-ignore
import Stats from 'three/examples/jsm/libs/stats.module' 
import { GUI } from 'dat.gui'
// @ts-ignore
import * as MeshGenerator from '../../buildWASM/MeshGenerator.js';

export const helloCube = async (canvas: any) => {
    const meshGenerator = await MeshGenerator();
    console.log('MeshGenerator version: ' + meshGenerator.getVersion());
    meshGenerator.setIOContext({
        log: (message: string) => console.log(message),
        newMesh: (id: string, vertices: Float32Array, indices: Uint32Array, normals: Float32Array, uvs: Float32Array): void => {
            console.log('newMesh: ' + id);
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
            geometry.setAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));
            geometry.setAttribute('uv', new THREE.BufferAttribute(Float32Array.from(uvs), 3));
            geometry.setIndex(new THREE.BufferAttribute(Uint32Array.from(indices), 1));
            geometry.rotateX(Math.PI/2);
            mesh.geometry = geometry;
        }
    });

    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.LinearEncoding;
    //renderer.toneMapping = THREE.NoToneMapping;
    //renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 2;
    camera.position.z = 4;
    const controls = new OrbitControls(camera, renderer.domElement)

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xc0c0c0);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environmentTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environmentTexture;
    scene.background = environmentTexture;

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 3, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const lightTransformControl = new TransformControls(camera, renderer.domElement);
    lightTransformControl.addEventListener( 'dragging-changed', (event: any) => {
        controls.enabled = !event.value;
    });
    lightTransformControl.attach(directionalLight);
    lightTransformControl.visible = false;
    scene.add(lightTransformControl);
    
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.ShadowMaterial();
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const size = 2;
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshPhysicalMaterial({color: 0xe02020});
    const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.y = size / 2;
    scene.add(mesh);
    const meshTransformControl = new TransformControls(camera, renderer.domElement);
    meshTransformControl.addEventListener( 'dragging-changed', (event: any) => {
        controls.enabled = !event.value;
    });
    meshTransformControl.attach(mesh);
    meshTransformControl.visible = false;
    scene.add(meshTransformControl);

    meshGenerator.createMesh("my shape", 2);

    // @ts-ignore
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    const gui = new GUI();
    const uiProperties = {
        'mesh transform control': meshTransformControl.visible,
        'light transform control': lightTransformControl.visible
    }
    gui.add(uiProperties, 'mesh transform control').onChange((value) => meshTransformControl.visible = value);
    gui.add(uiProperties, 'light transform control').onChange((value) => lightTransformControl.visible = value);

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }, false);

    let previousTimeStamp: number | undefined;
    const animate = (timestamp: number) => {
        const deltaTimeMs = timestamp - (previousTimeStamp ?? timestamp);
        previousTimeStamp = timestamp;
        requestAnimationFrame(animate);
        mesh.rotation.y += 45 * Math.PI / 180 * deltaTimeMs / 1000;
        controls.update();
        render();
        stats.update()
    }

    const render = () => {
        renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
}

// @ts-ignore
helloCube(three_canvas);
