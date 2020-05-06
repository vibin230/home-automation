var scene,
  camera,
  renderer,
  tvOut,
  tvLight,
  rectLightMesh,
  rectLightMeshBack,
  spotLight,
  spotLight_2;
var meshFloor, meshWall_1, meshWall_2, meshWall_3, meshWall_4, meshRoof;
var lightOne = document.getElementById("light1");
var lightTwo = document.getElementById("light2");
var tv = document.getElementById("tv");
var settings = document.getElementById("settings");
var liveReport = document.getElementById("liveReport");
var person = { height: 2 };

var keyboard = {};

function toggleSettings() {
  if (settings.style.display === "none") {
    settings.style.display = "flex";
  } else {
    settings.style.display = "none";
  }
}

function toggleLiveReport() {
  if (liveReport.style.display === "none") {
    liveReport.style.display = "flex";
  } else {
    liveReport.style.display = "none";
  }
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  /* tv */
  tvOut = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.2),
    new THREE.MeshPhongMaterial({ color: 0x000000, wireframe: false })
  );
  tvOut.receiveShadow = true;
  tvOut.castShadow = true;
  tvOut.rotation.y = Math.PI / 2;
  tvOut.position.set(-5, 3, 0);
  scene.add(tvOut);

  tvLight = new THREE.RectAreaLight(0x00ff00, 0, 2.9, 1.8);
  tvLight.rotation.y -= Math.PI / 2;
  tvLight.position.set(-4.8, 3, 0);
  scene.add(tvLight);

  rectLightMesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(),
    new THREE.MeshBasicMaterial({ side: THREE.BackSide })
  );
  rectLightMesh.scale.x = tvLight.width;
  rectLightMesh.scale.y = tvLight.height;
  tvLight.add(rectLightMesh);

  rectLightMeshBack = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );
  rectLightMesh.add(rectLightMeshBack);

  /* floor */
  meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      roughness: 0,
      metalness: 0,
    })
  );
  meshFloor.rotation.x = Math.PI / 2;
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);

  /* wall1 */
  meshWall_1 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshPhongMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
    })
  );
  meshWall_1.receiveShadow = true;
  meshWall_1.position.set(0, 5, 5);
  scene.add(meshWall_1);

  /* wall2 */
  meshWall_2 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshPhongMaterial({
      color: 0xffff66,
      side: THREE.DoubleSide,
    })
  );
  meshWall_2.receiveShadow = true;
  meshWall_2.rotation.y = Math.PI / 2;
  meshWall_2.position.set(5, 5, 0);
  scene.add(meshWall_2);

  /* wall3 */
  meshWall_3 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 10, 10),
    new THREE.MeshPhongMaterial({ color: 0xffff66, side: THREE.DoubleSide })
  );
  meshWall_3.receiveShadow = true;
  meshWall_3.rotation.y = Math.PI / 2;
  meshWall_3.position.set(-5, 5, 0);
  scene.add(meshWall_3);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  /* light1 */
  spotLight = new THREE.SpotLight(0xffffff, 0, 100, 0.2);
  spotLight.position.set(10, 10, 10);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 0.1;
  spotLight.shadow.camera.far = 25;
  scene.add(spotLight);

  /* light2 */
  spotLight_2 = new THREE.SpotLight(0xffffff, 0, 100, 0.2);
  spotLight_2.position.set(-10, 10, 10);
  spotLight_2.castShadow = true;
  spotLight_2.shadow.camera.near = 0.1;
  spotLight_2.shadow.camera.far = 25;
  scene.add(spotLight_2);

  //   domEvents = new THREEx.DomEvents(camera,renderer.domElement)

  camera.position.set(0, person.height, -5);
  camera.lookAt(new THREE.Vector3(0, person.height, 0));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  document.body.appendChild(renderer.domElement);
  animate();
}

function lightone() {
  if (lightOne.checked == true) {
    spotLight.intensity = 0.4;
    document.getElementById("light_1_status").innerHTML = "Light-1 : on";
  } else {
    spotLight.intensity = 0;
    document.getElementById("light_1_status").innerHTML = "Light-1 : off";
  }
}

function lighttwo() {
  if (lightTwo.checked == true) {
    spotLight_2.intensity = 0.4;
    document.getElementById("light_2_status").innerHTML = "Light-2 : on";
  } else {
    spotLight_2.intensity = 0;
    document.getElementById("light_2_status").innerHTML = "Light-2 : off";
  }
}
function tvON_OFF() {
  if (tv.checked == true) {
    tvLight.intensity = 1;
    document.getElementById("tv_status").innerHTML = "Tv : on";
  } else {
    tvLight.intensity = 0;
    document.getElementById("tv_status").innerHTML = "Tv : off";
  }
}

function displayPower() {
  var total =
    spotLight.intensity * 4 * Math.PI +
    spotLight_2.intensity * 4 * Math.PI +
    tvLight.intensity * 4 * Math.PI;
  document.getElementById("power").innerHTML = `${total.toFixed(2)}`;
}

function animate() {
  requestAnimationFrame(animate);

  if (keyboard[37]) {
    camera.rotation.y -= Math.PI * 0.01;
  }

  if (keyboard[39]) {
    camera.rotation.y += Math.PI * 0.01;
  }

  renderer.render(scene, camera);
}

function keyDown(event) {
  keyboard[event.keyCode] = true;
}
function keyUp(event) {
  keyboard[event.keyCode] = false;
}

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

window.onload = init;
