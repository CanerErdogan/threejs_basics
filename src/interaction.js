import * as THREE from '../node_modules/three/build/three.module';

let scene, camera, light, renderer;
let plane;
let cubes = [];
let colors = [];
let defaultColors = [];
let mouse, rayCast;
let xMod = 0.5;
let zMod = 0.5;

function createCube(x, y, z, color) {
    let cube = new THREE.Mesh(
        new THREE.CubeGeometry(3, 3, 3),
        new THREE.MeshLambertMaterial({
            color,
            emissive: 0x25673d,
            emissiveIntensity: 0.5
        })
    );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
}

function onKeyDown(event) {
    if (event.key === 'a' || event.key === 'A'){
        camera.position.x -= xMod;
        camera.position.z -= zMod;
    } else if (event.key === 'd' || event.key === 'D'){
        camera.position.x += xMod;
        camera.position.z += zMod;
    } else if (event.key === 'w' || event.key === 'W'){
        camera.position.x += xMod;
        camera.position.z -= zMod;
    } else if (event.key === 's' || event.key === 'S'){
        camera.position.x -= xMod;
        camera.position.z += zMod;
    } else
        return;
};

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;

    rayCast.setFromCamera(mouse, camera);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    light = new THREE.SpotLight(0xffffff, 1, {
        distance: 10,
        angle: Math.PI / 2,
        decay: 5,
        penumbra: 1
    });
    light.position.x = -2;
    light.position.y = 15;
    light.position.z = 0;
    
    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 50, 50),
        new THREE.MeshPhongMaterial({
            color: 0x693421,
            side: THREE.DoubleSide,
        })
    );
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -10;
    

    colors = [
        [0x1a8262, 0x1a6d82, 0x1a822e],
        [0xaf8115, 0x90af15, 0xaf3415],
        [0xaf152c, 0xaf4b15, 0xaf1579]
    ];

    for (var x = 0; x < 3; x++) {
        for (var z = 0; z < 3; z++) {
            cubes.push(createCube(x*10, 0, z*10, colors[x][z]));
            defaultColors.push(colors[x][z]);
        }
    }
    cubes.forEach(cube => scene.add(cube));

    camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / - 2, 0, 1000);
    camera.zoom = 30;
    camera.position.x = -10;
    camera.position.y = 10;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    camera.updateProjectionMatrix();

    scene.add(light);
    scene.add(plane);
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.x = mouse.y = -1;

    document.onkeydown = onKeyDown;
    document.onclick = onMouseClick;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    cubes.forEach((cube, idx) => 
        cube.material.color.set(defaultColors[idx]));

    let intersects = rayCast.intersectObjects(scene.children);
    intersects.forEach((obj, idx) =>
        obj.object.material.color.set(0xe0bc2c));
    
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();
