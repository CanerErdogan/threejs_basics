import * as THREE from '../node_modules/three/build/three.module';

let scene, camera, renderer;
let cube1, cube2, cone1, cone2, plane;
// let normals;
let ADD = 0.02;

function createGeometry() {
    cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            color: 0x7fc5f9,
            emissive: 0x25673d,
            emissiveIntensity: 0.4,
            metalness: 1,
            roughness: 0.2
        })
    );
    cube1.position.y = -5;
    cube1.position.z = -6;

    cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 0.5
        }));
    cube2.position.y = -5;
    cube2.position.z = 6;

    cone1 = new THREE.Mesh(
        new THREE.ConeGeometry(4, 5, 20, 1, true),
        new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide,
            color: 0x7fc5f9,
            emissive: 0x25673d,
            emissiveIntensity: 0.5
        })
    );
    cone1.position.x = -6;
    cone1.position.y = 5;
    cone1.rotation.x = Math.PI;
    cone1.rotation.z = Math.PI;

    cone2 = new THREE.Mesh(
        new THREE.ConeGeometry(4, 5, 20, 1, true),
        new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: 0x7fc5f9,
            emissive: 0x25673d,
            emissiveIntensity: 0.8,
            shininess: 100,
            specular: 0x9d0a00
        })
    );
    cone2.position.x = 6;
    cone2.position.y = 5;
    cone2.rotation.x = Math.PI;
    cone2.rotation.z = Math.PI;

    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 50, 50),
        new THREE.MeshBasicMaterial({
            color: 0xa6f995,
            wireframe: true
        }));
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    scene.add(cube1);
    scene.add(cube2);
    scene.add(cone1);
    scene.add(cone2);
    scene.add(plane);
    
    // normals = new THREE.FaceNormalsHelper(cube2, 5);
    // scene.add(normals);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    camera = new THREE.PerspectiveCamera(75, 
                    window.innerWidth / window.innerHeight, 
                    1, 1000);
    camera.position.z = 20;

    let directionalLightUp = new THREE.DirectionalLight(0xffffff);
    scene.add(directionalLightUp);
    
    createGeometry();
    
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
};

function mainLoop() {
    cube1.position.x += ADD;
    cube1.rotation.x += ADD;
    cube1.rotation.y += ADD;
    cube2.position.x -= ADD;
    cube2.rotation.y -= ADD;
    cone1.rotation.x += ADD;
    cone1.rotation.z += ADD;
    cone2.rotation.x -= ADD;
    cone2.rotation.z -= ADD;

    // normals.update();

    if (cube1.position.x > 6 || cube1.position.x < -6)
        ADD *= -1;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

init();
mainLoop();
