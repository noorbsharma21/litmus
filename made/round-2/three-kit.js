/* Round two, the 3D kit. A lit stage that every 3D page builds on: a
   physically based renderer, soft shadows, and an environment so that
   glass, glaze and metal reflect something instead of looking flat. Pages
   bring their own objects, colours and behaviour; this decides none of
   that. three.js from jsDelivr, pinned. */
/* Pages declare an import map for 'three' so the addons, which import it by
   that bare name, resolve to the same copy. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
export { THREE };

export function stage(o){
  o = o || {};
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:!!o.alpha });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = o.exposure || 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;display:block;touch-action:none';
  document.body.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  if (o.bg) scene.background = new THREE.Color(o.bg);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(o.fov || 35, 1, 0.05, 400);
  const key = new THREE.DirectionalLight(0xffffff, o.key === undefined ? 2.4 : o.key);
  key.position.set(5, 9, 6); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; key.shadow.radius = 6;
  Object.assign(key.shadow.camera, { left:-12, right:12, top:12, bottom:-12, near:0.5, far:60 });
  scene.add(key);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, o.fill === undefined ? 0.5 : o.fill));

  /* A page that starts inside a frame can be 0 wide for a moment, so the
     size is checked every frame rather than trusted once. */
  let w = 0, h = 0;
  function fit(){
    const W = window.innerWidth, H = window.innerHeight;
    if (!W || !H || (W === w && H === h)) return;
    w = W; h = H; renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
  }
  function loop(fn){
    renderer.setAnimationLoop(function(t){ fit(); if (w && h){ fn && fn(t / 1000); renderer.render(scene, camera); } });
  }
  /* a floor that only shows the shadows falling on it */
  function catcher(y, size, opacity){
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size || 40, size || 40), new THREE.ShadowMaterial({ opacity: opacity || 0.22 }));
    m.rotation.x = -Math.PI / 2; m.position.y = y || 0; m.receiveShadow = true; scene.add(m); return m;
  }
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pick(e, objects){
    ndc.set(e.clientX / window.innerWidth * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(objects, true)[0] || null;
  }
  /* keep a given width of the scene in view whatever the window's shape */
  function frameWidth(width, look){
    const v = camera.fov * Math.PI / 180, hf = 2 * Math.atan(Math.tan(v / 2) * camera.aspect);
    const d = (width / 2) / Math.tan(hf / 2);
    const dir = new THREE.Vector3().subVectors(camera.position, look).normalize();
    camera.position.copy(look).addScaledVector(dir, Math.max(d, o.minDist || 0)); camera.lookAt(look);
  }
  return { renderer, scene, camera, key, loop, catcher, pick, frameWidth, THREE };
}

/* a text label painted onto a canvas, for labels that sit on objects */
export function labelTexture(lines, o){
  o = o || {};
  const c = document.createElement('canvas'); c.width = o.w || 512; c.height = o.h || 256;
  const g = c.getContext('2d');
  g.fillStyle = o.bg || '#ffffff'; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = o.ink || '#1A1614'; g.textBaseline = 'top';
  /* centred by default, because a label wrapped round a bottle is read
     from its middle, and text set from the left edge runs round the side */
  var centre = o.align !== 'left'; g.textAlign = centre ? 'center' : 'left';
  lines.forEach(function(l, i){ g.font = (i === 0 ? (o.size || 54) : (o.small || 32)) + 'px ' + (o.font || 'Georgia, serif');
    g.fillText(l, centre ? c.width / 2 : (o.pad || 28), (o.pad || 28) + i * (o.lead || 64)); });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
