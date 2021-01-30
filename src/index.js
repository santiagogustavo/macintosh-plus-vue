import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import Player from '@/entities/Player';

import AlexObj from '@/assets/models/alexander/alexander.obj';
import AlexMtl from '@/assets/models/alexander/alexander.mtl';
import Checker from '@/assets/img/checker.png';

import '@/assets/models/alexander/CLM.png';
import '@/assets/models/alexander/OCM.png';
import '@/assets/models/alexander/NRM.png';

import '@/css/main.css';

/* INITIALIZATION */

let scene;
let camera;
let controls;
let renderer;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let mesh;
let floor;
let floorTexture;

const movement = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

const bindEventListeners = () => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseMove = (event) => {
    event.preventDefault();

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    document.getElementById('three.js').style.cursor = 'initial';
    intersects.forEach((child) => {
      if (child.object.name === 'TEST') {
        document.getElementById('three.js').style.cursor = 'pointer';
      }
    });

    // handleMouseLook(event);
  };

  document.body.addEventListener('mousemove', onMouseMove);
  document.body.addEventListener('click', () => {
    controls.lock();
  }, false);

  const onMouseClick = (event) => {
    event.preventDefault();

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    intersects.forEach((child) => {
      if (child.object.name === 'TEST') {
        mesh.material.color.setHex(0x4DD0E1);
      }
    });
  };

  document.body.addEventListener('mousedown', onMouseClick);
};

/* SCENE & INIT */
const drawScene = () => {
  camera.position.set(0, Player.height, 5);

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
  scene.add(ambientLight);

  const light = new THREE.PointLight(0xFFFFFF, 0.8, 500);
  light.position.set(0, 6, 0);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 500;
  scene.add(light);

  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0xFFCC00, wireframe: process.env.USE_WIREFRAME }),
  );
  mesh.position.set(0, 0.5, -2);
  mesh.name = 'TEST';
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const textureLoader = new THREE.TextureLoader();
  floorTexture = new textureLoader.load(Checker);
  floorTexture.repeat.set(0.5, 0.5);

  const mtlLoader = new MTLLoader();
  mtlLoader.load(AlexMtl, (materials) => {
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load(AlexObj, (alex) => {
      alex.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          // node.castShadow = true; /* eslint-disable-line */
          // node.receiveShadow = true; /* eslint-disable-line */
        }
      });
      alex.rotation.set(0, Math.PI / 2, 0);
      alex.scale.set(0.1, 0.1, 0.1);
      alex.position.set(-2, 1, 0);

      scene.add(alex);
    });
  });

  floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 5, 5),
    new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      wireframe: process.env.USE_WIREFRAME,
      map: scene.floorTexture,
    }),
  );
  floor.rotation.x -= Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
};

const animate = () => {
  /* INIT FRAME */
  requestAnimationFrame(animate);

  /* UPDATE GEOMETRY */
  const time = performance.now();

  if (controls.isLocked === true) {
    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * Player.speed.walk * delta;
    velocity.z -= velocity.z * Player.speed.walk * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(movement.forward) - Number(movement.backward);
    direction.x = Number(movement.right) - Number(movement.left);
    direction.normalize(); // this ensures consistent movements in all directions

    if (movement.forward || movement.backward) velocity.z -= direction.z * 400.0 * delta;
    if (movement.left || movement.right) velocity.x -= direction.x * 400.0 * delta;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += (velocity.y * delta); // new behavior

    if (controls.getObject().position.y < Player.height) {
      velocity.y = 0;
      controls.getObject().position.y = Player.height;
    }
  }

  mesh.rotation.y += 0.01;

  /* UPDATE RENDER */
  prevTime = time;
  renderer.render(scene, camera);
};

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, Player.height, 5);

  controls = new PointerLockControls(camera, document.body);
  scene.add(controls.getObject());

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('#ff8fa7');
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.domElement.id = 'three.js';
  document.body.appendChild(renderer.domElement);

  drawScene();
  bindEventListeners();
  animate();
};

/* WINDOW LISTENERS */

/* Adjust aspect ratio and matrix on resize */
const onWindowResize = () => {
  requestAnimationFrame(onWindowResize);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

window.addEventListener('resize', onWindowResize, false);

/* Keyboard I/O */
const keyDown = (event) => {
  switch (event.keyCode) {
    /* W KEY */
    case 87:
      movement.forward = true;
      break;
    /* S KEY */
    case 83:
      movement.backward = true;
      break;
    /* A KEY */
    case 65:
      movement.left = true;
      break;
    /* D KEY */
    case 68:
      movement.right = true;
      break;
    default:
      break;
  }
};

const keyUp = (event) => {
  switch (event.keyCode) {
    /* W KEY */
    case 87:
      movement.forward = false;
      break;
    /* S KEY */
    case 83:
      movement.backward = false;
      break;
    /* A KEY */
    case 65:
      movement.left = false;
      break;
    /* D KEY */
    case 68:
      movement.right = false;
      break;
    default:
      break;
  }
};

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

/* INITIALIZE */

window.onload = init;
