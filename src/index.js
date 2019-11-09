import * as THREE from 'three';

import Checker from '@/assets/img/checker.png';
import '@/css/main.css';

const USE_WIREFRAME = false;

/* INITIALIZATION */

let renderer;
let scene;
let camera;

let mesh;

let floor;
let floorTexture;

const keyboard = {};

const player = {
  height: 1.8,
  speed: {
    walk: 0.1,
    turn: 0.01,
  },
};

const keyboardController = () => {
  /* W KEY */
  if (keyboard[87]) {
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed.walk;
    camera.position.z -= Math.cos(camera.rotation.y) * player.speed.walk;
  }
  /* S KEY */
  if (keyboard[83]) {
    camera.position.x += Math.sin(camera.rotation.y) * player.speed.walk;
    camera.position.z += Math.cos(camera.rotation.y) * player.speed.walk;
  }
  /* A KEY */
  if (keyboard[65]) {
    camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed.walk;
    camera.position.z += Math.cos(camera.rotation.y - Math.PI / 2) * player.speed.walk;
  }
  /* D KEY */
  if (keyboard[68]) {
    camera.position.x -= Math.sin(camera.rotation.y - Math.PI / 2) * player.speed.walk;
    camera.position.z -= Math.cos(camera.rotation.y - Math.PI / 2) * player.speed.walk;
  }
  /* LEFT ARROW */
  if (keyboard[37]) {
    camera.rotation.y += Math.PI * player.speed.turn;
  }
  /* RIGHT ARROW */
  if (keyboard[39]) {
    camera.rotation.y -= Math.PI * player.speed.turn;
  }
};

const draw = () => {
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0xFFCC00, wireframe: USE_WIREFRAME }),
  );
  mesh.position.y = 0.5;
  mesh.name = 'TEST';
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const textureLoader = new THREE.TextureLoader();
  floorTexture = new textureLoader.load(Checker);
  floorTexture.repeat.set(0.5, 0.5);

  floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 5, 5),
    new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      wireframe: USE_WIREFRAME,
      map: floorTexture,
    }),
  );
  floor.rotation.x -= Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
  scene.add(ambientLight);

  const light = new THREE.PointLight(0xFFFFFF, 0.8, 100);
  light.position.set(0, 6, 0);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 500;
  scene.add(light);
};

const animate = () => {
  requestAnimationFrame(animate);

  keyboardController();
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
};

const init = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, player.height, 5);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('#ff8fa7');
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.domElement.id = 'three.js';
  document.body.appendChild(renderer.domElement);

  /* SCENE */

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

  draw();

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
