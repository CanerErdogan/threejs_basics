import * as THREE from '../node_modules/three/build/three.module';

let scene, camera, renderer;
let light, hemisphereLight, directionalLight, pointLight, spotLight;
let cube, cone, sphere, plane;
let intensityModifier = 0.2;
let positionModifier = 0.2;

function createGeometry() {
    let material = new THREE.MeshPhongMaterial({
        color: 0x0f1d89,
        side: THREE.DoubleSide,
        emissive: 0x25673d,
        emissiveIntensity: 0.3,
        shininess: 100,
        specular: 0x9d0a00
    });

    cube = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        material
    );
    cube.position.x = -6;
    cube.position.y = -5;
    cube.position.z = -6;

    cone = new THREE.Mesh(
        new THREE.ConeGeometry(3, 4, 20, 1, true),
        material
    );
    cone.position.x = 7;
    cone.position.y = -5;

    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 50, 50),
        new THREE.MeshPhongMaterial({
            color: 0x693421,
            side: THREE.DoubleSide,
        })
    );
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 30, 30),
        material
    );
    sphere.position.y = -5;

    scene.add(cube);
    scene.add(cone);
    scene.add(sphere);
    scene.add(plane);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    camera = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight,
        1, 1000);
    camera.position.z = 20;

    // light = new THREE.AmbientLight(0xffffff);
    hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000);
    hemisphereLight.name = "hemisphere";

    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.name = "directional";
    directionalLight.position.x = 10;
    directionalLight.position.y = 5;
    directionalLight.position.z = 0;

    pointLight = new THREE.PointLight(0xffffff, 2, 20, 2);
    pointLight.position.y = 1;
    pointLight.name = "point";

    spotLight = new THREE.SpotLight(0xffffff, 1, {
        distance: 100,
        angle: Math.PI / 4,
        decay: 2,
        penumbra: 0.15
    });
    spotLight.position.y = 10;
    spotLight.position.z = 3;
    spotLight.name = "spot";

    light = hemisphereLight;

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    scene.add(light);
    setInterval(() => {
        scene.remove(light);
        switch (light.name) {
            case "hemisphere":
                document.getElementById("info").innerHTML = "Directional Light";
                light = directionalLight;
                break;
            case "directional":
                document.getElementById("info").innerHTML = "Point Light";
                light = pointLight;
                break;
            case "point":
                document.getElementById("info").innerHTML = "Spot Light";
                light = spotLight;
                break;
            default:
                document.getElementById("info").innerHTML = "Hemisphere Light";
                light = hemisphereLight;
                break;
        }
        scene.add(light);
    }, 2000);
}

function mainLoop() {
    light.intensity += intensityModifier;
    if (light.intensity >= 8 || light.intensity <= 0) {
        intensityModifier *= -1;
    }
    if (light.name == "directional") {
        if (light.position.x >= 10 || light.position.x <= 5)
            positionModifier *= -1;
        light.position.x += positionModifier;
    } else {
        light.position.x = 0;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();
