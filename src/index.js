import * as THREE from 'three';

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
let renderer;

let mesh;
let floor;
let floorTexture;

const keyboard = {};

const keyboardController = () => {
  /* W KEY */
  if (keyboard[87]) {
    camera.position.x -= Math.sin(camera.rotation.y) * Player.speed.walk;
    camera.position.z -= Math.cos(camera.rotation.y) * Player.speed.walk;
  }
  /* S KEY */
  if (keyboard[83]) {
    camera.position.x += Math.sin(camera.rotation.y) * Player.speed.walk;
    camera.position.z += Math.cos(camera.rotation.y) * Player.speed.walk;
  }
  /* A KEY */
  if (keyboard[65]) {
    camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * Player.speed.walk;
    camera.position.z += Math.cos(camera.rotation.y - Math.PI / 2) * Player.speed.walk;
  }
  /* D KEY */
  if (keyboard[68]) {
    camera.position.x -= Math.sin(camera.rotation.y - Math.PI / 2) * Player.speed.walk;
    camera.position.z -= Math.cos(camera.rotation.y - Math.PI / 2) * Player.speed.walk;
  }
  /* LEFT ARROW */
  if (keyboard[37]) {
    camera.rotation.y += Math.PI * Player.speed.turn;
  }
  /* RIGHT ARROW */
  if (keyboard[39]) {
    camera.rotation.y -= Math.PI * Player.speed.turn;
  }
};

const bindEventListeners = () => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseMove = (event) => {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    document.getElementById('three.js').style.cursor = 'initial';
    intersects.forEach((child) => {
      if (child.object.name === 'TEST') {
        document.getElementById('three.js').style.cursor = 'pointer';
      }
    });
  };

  document.body.addEventListener('mousemove', onMouseMove);

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
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  keyboardController();
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
  keyboard[event.keyCode] = true;
};

const keyUp = (event) => {
  keyboard[event.keyCode] = false;
};

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

/* INITIALIZE */

window.onload = init;
