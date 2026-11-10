/* Round two, the 3D kit. A lit stage that every 3D page builds on: a
   physically based renderer, soft shadows, and an environment so that
   glass, glaze and metal reflect something instead of looking flat. Pages
   bring their own objects, colours and behaviour; this decides none of
   that. three.js from jsDelivr, pinned. */
/* Pages declare an import map for 'three' so the addons, which import it by
   that bare name, resolve to the same copy. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
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
  /* o.el: render inside a frame on the page rather than across the whole
     window, so type can have space of its own that the scene never enters */
  const host = o.el || null;
  if (host){ renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none'; host.appendChild(renderer.domElement); }
  else { renderer.domElement.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;display:block;touch-action:none'; document.body.prepend(renderer.domElement); }

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
    const W = host ? host.clientWidth : window.innerWidth, H = host ? host.clientHeight : window.innerHeight;
    if (!W || !H || (W === w && H === h)) return;
    w = W; h = H; renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
    if (composer){ composer.setSize(W, H); const pr = renderer.getPixelRatio(); post.uniforms.res.value.set(W * pr, H * pr); }
  }
  /* Round three, from cr6: 3D that reaches for realism and falls short reads
     as old internet. o.analog takes the render through a process instead:
     'grain' (film), 'xerox' (photocopy toner on paper), 'riso' (two inks,
     grainy screen, out of register). */
  let composer = null, post = null;
  if (o.analog){
    const a = o.analog, v3 = (hx) => { hx = hx.replace('#', ''); return new THREE.Vector3(parseInt(hx.slice(0, 2), 16) / 255, parseInt(hx.slice(2, 4), 16) / 255, parseInt(hx.slice(4, 6), 16) / 255); };
    composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { samples:4, type:THREE.HalfFloatType }));
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new OutputPass());
    post = new ShaderPass({
      uniforms:{ tDiffuse:{ value:null }, res:{ value:new THREE.Vector2(1, 1) }, time:{ value:0 },
        mode:{ value:{ grain:0, xerox:1, riso:2 }[a.mode || 'grain'] }, grain:{ value:a.grain === undefined ? 0.09 : a.grain },
        vignette:{ value:a.vignette === undefined ? 0.25 : a.vignette }, paper:{ value:v3(a.paper || '#EDEBE6') },
        ink:{ value:v3(a.ink || '#141311') }, inkB:{ value:v3(a.inkB || '#F64FB2') }, lo:{ value:a.lo || 0.38 }, hi:{ value:a.hi || 0.62 } },
      vertexShader:'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader:`uniform sampler2D tDiffuse; uniform vec2 res; uniform float time, mode, grain, vignette, lo, hi; uniform vec3 paper, ink, inkB; varying vec2 vUv;
        float hash(vec2 p){ p = mod(p, 1031.0); return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main(){
          vec3 c = texture2D(tDiffuse, vUv).rgb; vec2 px = floor(vUv * res);
          float f = floor(time * 18.0), n = hash(px + f * vec2(17.0, 31.0)), l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          if (mode < 0.5){
            c += (n - 0.5) * grain;
          } else if (mode < 1.5){
            float s = hash(px * 0.5);
            float t = smoothstep(hi, lo, l + (s - 0.5) * 0.3 + (hash(vec2(px.x, 3.0)) - 0.5) * 0.04);
            c = mix(paper, ink, t * 0.95) + (hash(px + 7.0) - 0.5) * grain;
          } else {
            vec3 c2 = texture2D(tDiffuse, vUv + vec2(4.0, 3.0) / res).rgb; float l2 = dot(c2, vec3(0.2126, 0.7152, 0.0722));
            float s = hash(px), s2 = hash(px + vec2(7.0, 3.0));
            float da = smoothstep(hi, lo * 0.3, l), db = smoothstep(0.9, lo, l2) * 0.9;
            da = s < da ? 0.94 : da * 0.1; db = s2 < db ? 0.9 : db * 0.12;
            c = paper * (1.0 - db * (1.0 - inkB)) * (1.0 - da * (1.0 - ink)) + (n - 0.5) * grain * 0.5;
          }
          vec2 q = vUv - 0.5; c *= 1.0 - vignette * dot(q, q) * 2.0;
          gl_FragColor = vec4(c, 1.0);
        }`
    });
    composer.addPass(post);
  }
  function loop(fn){
    renderer.setAnimationLoop(function(t){ fit(); if (w && h){ fn && fn(t / 1000); if (composer){ post.uniforms.time.value = t / 1000; composer.render(); } else renderer.render(scene, camera); } });
  }
  /* a floor that only shows the shadows falling on it */
  function catcher(y, size, opacity){
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size || 40, size || 40), new THREE.ShadowMaterial({ opacity: opacity || 0.22 }));
    m.rotation.x = -Math.PI / 2; m.position.y = y || 0; m.receiveShadow = true; scene.add(m); return m;
  }
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pick(e, objects){
    const r = host ? host.getBoundingClientRect() : { left:0, top:0, width:window.innerWidth, height:window.innerHeight };
    ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
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
