import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

// ============================================================
// Chemistry Data
// ============================================================

const CHEMICALS = {
  water: [
    {
      id: "h2o",
      formula: "H₂O",
      name: "Water",
      color: "#b8ddf0",
      opacity: 0.4,
      ph: 7.0,
    },
    {
      id: "d2o",
      formula: "D₂O",
      name: "Heavy Water",
      color: "#a0ccee",
      opacity: 0.42,
      ph: 7.0,
    },
  ],
  acids: [
    {
      id: "hcl",
      formula: "HCl",
      name: "Hydrochloric",
      color: "#f0e8a0",
      opacity: 0.45,
      ph: 1.0,
    },
    {
      id: "h2so4",
      formula: "H₂SO₄",
      name: "Sulfuric",
      color: "#f5dda0",
      opacity: 0.55,
      ph: 0.3,
    },
    {
      id: "hno3",
      formula: "HNO₃",
      name: "Nitric",
      color: "#f8f0a0",
      opacity: 0.5,
      ph: 1.2,
    },
    {
      id: "hf",
      formula: "HF",
      name: "Hydrofluoric",
      color: "#d5eed5",
      opacity: 0.35,
      ph: 3.2,
    },
    {
      id: "ch3cooh",
      formula: "CH₃COOH",
      name: "Acetic",
      color: "#f0f0e8",
      opacity: 0.3,
      ph: 2.9,
    },
  ],
  bases: [
    {
      id: "naoh",
      formula: "NaOH",
      name: "Sodium Hydr.",
      color: "#c5e0ff",
      opacity: 0.35,
      ph: 14.0,
    },
    {
      id: "koh",
      formula: "KOH",
      name: "Potassium Hydr.",
      color: "#bdd8f8",
      opacity: 0.37,
      ph: 13.5,
    },
    {
      id: "nh3",
      formula: "NH₃",
      name: "Ammonia",
      color: "#ddf0d8",
      opacity: 0.25,
      ph: 11.6,
    },
    {
      id: "ca_oh_2",
      formula: "Ca(OH)₂",
      name: "Lime Water",
      color: "#e8e8e8",
      opacity: 0.4,
      ph: 12.4,
    },
  ],
  salts: [
    {
      id: "nacl",
      formula: "NaCl",
      name: "Table Salt",
      color: "#f0f0f0",
      opacity: 0.25,
      ph: 7.0,
    },
    {
      id: "cuso4",
      formula: "CuSO₄",
      name: "Copper Sulf.",
      color: "#3388cc",
      opacity: 0.75,
      ph: 4.0,
    },
    {
      id: "kmno4",
      formula: "KMnO₄",
      name: "Potass. Perm.",
      color: "#8820dd",
      opacity: 0.9,
      ph: 7.0,
    },
    {
      id: "fecl3",
      formula: "FeCl₃",
      name: "Iron(III) Chl.",
      color: "#bb7722",
      opacity: 0.7,
      ph: 2.0,
    },
    {
      id: "cocl2",
      formula: "CoCl₂",
      name: "Cobalt Chl.",
      color: "#ff5ca0",
      opacity: 0.65,
      ph: 5.0,
    },
  ],
  metals: [
    {
      id: "na",
      formula: "Na",
      name: "Sodium",
      color: "#cccccc",
      opacity: 0.9,
      ph: null,
      reactive: true,
    },
    {
      id: "k",
      formula: "K",
      name: "Potassium",
      color: "#bbbbbb",
      opacity: 0.9,
      ph: null,
      reactive: true,
    },
    {
      id: "fe",
      formula: "Fe",
      name: "Iron",
      color: "#888888",
      opacity: 0.95,
      ph: null,
    },
    {
      id: "cu",
      formula: "Cu",
      name: "Copper",
      color: "#cc7733",
      opacity: 0.95,
      ph: null,
    },
    {
      id: "zn",
      formula: "Zn",
      name: "Zinc",
      color: "#aabbcc",
      opacity: 0.9,
      ph: null,
    },
  ],
};

const REACTIONS = {
  "hcl+naoh": {
    color: "#f0f0f0",
    opacity: 0.25,
    ph: 7.0,
    text: "HCl + NaOH → NaCl + H₂O",
    heat: 15,
  },
  "naoh+hcl": {
    color: "#f0f0f0",
    opacity: 0.25,
    ph: 7.0,
    text: "HCl + NaOH → NaCl + H₂O",
    heat: 15,
  },
  "h2so4+naoh": {
    color: "#f0f0f0",
    opacity: 0.28,
    ph: 7.0,
    text: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
    heat: 25,
  },
  "naoh+h2so4": {
    color: "#f0f0f0",
    opacity: 0.28,
    ph: 7.0,
    text: "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
    heat: 25,
  },
  "cuso4+naoh": {
    color: "#3399ee",
    opacity: 0.8,
    ph: 9.0,
    text: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄",
    precipitate: { color: "#2277cc", amount: 12 },
  },
  "naoh+cuso4": {
    color: "#3399ee",
    opacity: 0.8,
    ph: 9.0,
    text: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄",
    precipitate: { color: "#2277cc", amount: 12 },
  },
  "fecl3+naoh": {
    color: "#cc5500",
    opacity: 0.85,
    ph: 9.0,
    text: "FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl",
    precipitate: { color: "#994400", amount: 10 },
  },
  "naoh+fecl3": {
    color: "#cc5500",
    opacity: 0.85,
    ph: 9.0,
    text: "FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl",
    precipitate: { color: "#994400", amount: 10 },
  },
  "kmno4+h2o": {
    color: "#7718cc",
    opacity: 0.85,
    ph: 7.0,
    text: "KMnO₄ dissolved in H₂O",
  },
  "h2o+kmno4": {
    color: "#7718cc",
    opacity: 0.85,
    ph: 7.0,
    text: "KMnO₄ dissolved in H₂O",
  },
  "cocl2+naoh": {
    color: "#ff7799",
    opacity: 0.75,
    ph: 9.0,
    text: "CoCl₂ + 2NaOH → Co(OH)₂↓ + 2NaCl",
    precipitate: { color: "#cc3366", amount: 8 },
  },
  "naoh+cocl2": {
    color: "#ff7799",
    opacity: 0.75,
    ph: 9.0,
    text: "CoCl₂ + 2NaOH → Co(OH)₂↓ + 2NaCl",
    precipitate: { color: "#cc3366", amount: 8 },
  },
  "cuso4+h2o": {
    color: "#3388cc",
    opacity: 0.7,
    ph: 4.0,
    text: "CuSO₄ dissolved in H₂O",
  },
  "h2o+cuso4": {
    color: "#3388cc",
    opacity: 0.7,
    ph: 4.0,
    text: "CuSO₄ dissolved in H₂O",
  },
  "cocl2+h2o": {
    color: "#ff5ca0",
    opacity: 0.6,
    ph: 5.0,
    text: "CoCl₂ dissolved in H₂O",
  },
  "h2o+cocl2": {
    color: "#ff5ca0",
    opacity: 0.6,
    ph: 5.0,
    text: "CoCl₂ dissolved in H₂O",
  },
  "hf+h2o": {
    color: "#d5eed5",
    opacity: 0.35,
    ph: 3.2,
    text: "HF dissolved in H₂O",
  },
  "h2o+hf": {
    color: "#d5eed5",
    opacity: 0.35,
    ph: 3.2,
    text: "HF dissolved in H₂O",
  },
  "na+h2o": {
    color: "#c5e0ff",
    opacity: 0.35,
    ph: 14.0,
    text: "2Na + 2H₂O → 2NaOH + H₂↑ (Violent!)",
    violent: true,
    gas: true,
    heat: 60,
  },
  "h2o+na": {
    color: "#c5e0ff",
    opacity: 0.35,
    ph: 14.0,
    text: "2Na + 2H₂O → 2NaOH + H₂↑ (Violent!)",
    violent: true,
    gas: true,
    heat: 60,
  },
  "k+h2o": {
    color: "#bdd8f8",
    opacity: 0.37,
    ph: 14.0,
    text: "2K + 2H₂O → 2KOH + H₂↑ (Very Violent!)",
    violent: true,
    gas: true,
    heat: 90,
  },
  "h2o+k": {
    color: "#bdd8f8",
    opacity: 0.37,
    ph: 14.0,
    text: "2K + 2H₂O → 2KOH + H₂↑ (Very Violent!)",
    violent: true,
    gas: true,
    heat: 90,
  },
};

// ============================================================
// State
// ============================================================

const state = {
  beakerContents: [],
  totalVolume: 0,
  maxVolume: 350,
  currentColor: null,
  currentOpacity: 0.4,
  currentPh: 7.0,
  temperature: 25,
  pourSpeed: 1.0,
  selectedChemical: null,
  selectedCategory: "water",
  isPouring: false,
  isStirring: false,
  reactions: [],
  liquidLevel: 0,
};

// ============================================================
// Renderer
// ============================================================

const canvas = document.getElementById("labCanvas");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(
  32,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(0, 3.0, 10.0);
camera.lookAt(0, 2.5, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
renderer.outputColorSpace = THREE.SRGBColorSpace;

// ============================================================
// Environment Map - key to realistic glass & liquid
// ============================================================

let envMap = null;

function generateEnvMap() {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  // Procedural environment: soft studio HDRI substitute
  const envScene = new THREE.Scene();

  // Gradient sky dome
  const skyGeo = new THREE.SphereGeometry(50, 32, 32);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      topColor: { value: new THREE.Color(0x1a3a5c) },
      bottomColor: { value: new THREE.Color(0x050505) },
      horizonColor: { value: new THREE.Color(0x0d1f3c) },
    },
    vertexShader: `
            varying vec3 vWorldPos;
            void main() {
                vec4 worldPos = modelMatrix * vec4(position, 1.0);
                vWorldPos = worldPos.xyz;
                gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
        `,
    fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform vec3 horizonColor;
            varying vec3 vWorldPos;
            void main() {
                float h = normalize(vWorldPos).y;
                vec3 col = mix(bottomColor, horizonColor, smoothstep(-0.1, 0.0, h));
                col = mix(col, topColor, smoothstep(0.0, 0.6, h));
                gl_FragColor = vec4(col, 1.0);
            }
        `,
  });
  envScene.add(new THREE.Mesh(skyGeo, skyMat));

  // Bright area lights for specular highlights on glass
  const lightGeo = new THREE.PlaneGeometry(8, 4);
  const lightMat = new THREE.MeshBasicMaterial({
    color: 0x8899bb,
    side: THREE.DoubleSide,
  });

  const light1 = new THREE.Mesh(lightGeo, lightMat);
  light1.position.set(5, 8, 3);
  light1.lookAt(0, 0, 0);
  envScene.add(light1);

  const light2 = new THREE.Mesh(lightGeo, lightMat.clone());
  light2.position.set(-4, 6, -3);
  light2.lookAt(0, 0, 0);
  envScene.add(light2);

  const light3 = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 3),
    lightMat.clone(),
  );
  light3.position.set(0, 10, 0);
  light3.rotation.x = Math.PI / 2;
  envScene.add(light3);

  // Subtle warm fill
  const warmMat = new THREE.MeshBasicMaterial({
    color: 0x334466,
    side: THREE.DoubleSide,
  });
  const warm = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), warmMat);
  warm.position.set(3, 2, 6);
  warm.lookAt(0, 2, 0);
  envScene.add(warm);

  envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
  scene.environment = envMap;

  pmremGenerator.dispose();
}

generateEnvMap();

// ============================================================
// Lighting
// ============================================================

scene.add(new THREE.AmbientLight(0xf5f8ff, 0.8));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 10, 8);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xe8f0ff, 0.5);
fillLight.position.set(-4, 6, 4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
rimLight.position.set(0, 4, -6);
scene.add(rimLight);

const bottomLight = new THREE.DirectionalLight(0xf0f0f0, 0.2);
bottomLight.position.set(0, -2, 4);
scene.add(bottomLight);

// ============================================================
// Background gradient
// ============================================================

const bgMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 35),
  new THREE.ShaderMaterial({
    uniforms: {
      colorTop: { value: new THREE.Color(0x1a3a5c) },
      colorMid: { value: new THREE.Color(0x0d1f3c) },
      colorBottom: { value: new THREE.Color(0x050505) },
    },
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `
            uniform vec3 colorTop, colorMid, colorBottom;
            varying vec2 vUv;
            void main(){
                vec3 col = mix(colorBottom, colorMid, smoothstep(0.0, 0.45, vUv.y));
                col = mix(col, colorTop, smoothstep(0.45, 1.0, vUv.y));
                gl_FragColor = vec4(col, 1.0);
            }
        `,
    depthWrite: false,
  }),
);
bgMesh.position.set(0, 5, -10);
scene.add(bgMesh);

// ============================================================
// Floor
// ============================================================

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshPhysicalMaterial({
    color: 0x0a0a0a,
    roughness: 0.08,
    metalness: 0.05,
    clearcoat: 0.4,
    clearcoatRoughness: 0.1,
  }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// ============================================================
// Beaker - realistic glass
// ============================================================

const gltfLoader = new GLTFLoader();
let beakerModel = null;
let beakerBoundingBox = null;

gltfLoader.load("3d/beaker.glb", (gltf) => {
  beakerModel = gltf.scene;

  const box = new THREE.Box3().setFromObject(beakerModel);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const scale = 3.0 / size.y;
  beakerModel.scale.setScalar(scale);
  beakerModel.position.set(
    -center.x * scale,
    -box.min.y * scale,
    -center.z * scale,
  );

  beakerModel.traverse((child) => {
    if (!child.isMesh) return;

    // Realistic borosilicate glass material
    child.material = new THREE.MeshPhysicalMaterial({
      color: 0xf8fcff,
      transparent: true,
      opacity: 0.18,
      roughness: 0.02,
      metalness: 0.0,
      transmission: 0.92,
      thickness: 1.2,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  });

  scene.add(beakerModel);
  beakerBoundingBox = new THREE.Box3().setFromObject(beakerModel);
  createLiquidMesh();
});

// ============================================================
// Burette - realistic
// ============================================================

let buretteModel = null;
const buretteGroup = new THREE.Group();
buretteGroup.position.set(0, 3.5, 0);
scene.add(buretteGroup);

let buretteTipY = 3.5;

gltfLoader.load("3d/burette.glb", (gltf) => {
  buretteModel = gltf.scene;

  const box = new THREE.Box3().setFromObject(buretteModel);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const scale = 5.5 / size.y;
  buretteModel.scale.setScalar(scale);
  buretteModel.position.set(
    -center.x * scale,
    -box.min.y * scale,
    -center.z * scale,
  );
  buretteModel.rotation.y = Math.PI * 0.5;

  buretteModel.traverse((child) => {
    if (!child.isMesh) return;

    // Keep original material but enhance glass parts
    if (child.material && child.material.transparent) {
      child.material = new THREE.MeshPhysicalMaterial({
        color: 0xf8fcff,
        transparent: true,
        opacity: 0.15,
        roughness: 0.02,
        transmission: 0.9,
        thickness: 0.8,
        ior: 1.52,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        envMapIntensity: 1.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    }
  });

  buretteGroup.add(buretteModel);

  const worldBox = new THREE.Box3().setFromObject(buretteGroup);
  buretteTipY = worldBox.min.y;
});

// Burette liquid inside
const buretteLiquidMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff5ca0,
  transparent: true,
  opacity: 0.75,
  roughness: 0.0,
  metalness: 0.0,
  transmission: 0.3,
  thickness: 1.5,
  ior: 1.34,
  clearcoat: 0.5,
  clearcoatRoughness: 0.05,
  envMapIntensity: 0.8,
});

const buretteLiquid = new THREE.Mesh(
  new THREE.CylinderGeometry(0.08, 0.08, 3.5, 24),
  buretteLiquidMaterial,
);
buretteLiquid.position.y = 2.5;
buretteGroup.add(buretteLiquid);

// ============================================================
// Liquid in Beaker - realistic
// ============================================================

let liquidMesh = null;
let liquidTopMesh = null;
let liquidMaterial = null;
let liquidTopMaterial = null;
let bubbles = [];
let liquidRadius = 1;
let liquidMaxHeight = 1;
let liquidCenterX = 0;
let liquidCenterZ = 0;

// Wave/turbulence state
const waveState = {
  amplitude: 0, // current wave height
  targetAmplitude: 0, // where we're heading
  frequency: 2.5, // wave speed
  rippleTime: 0, // time since last ripple
  rippleStrength: 0, // ripple intensity (from pouring)
  turbulence: 0, // overall turbulence (from reactions/stirring)
};

function createLiquidMesh() {
  if (!beakerBoundingBox) return;

  const bMin = beakerBoundingBox.min;
  const bMax = beakerBoundingBox.max;
  liquidRadius = (bMax.x - bMin.x) * 0.39;
  liquidMaxHeight = (bMax.y - bMin.y) * 0.88;
  liquidCenterX = (bMin.x + bMax.x) / 2;
  liquidCenterZ = (bMin.z + bMax.z) / 2;

  // Main liquid body
  liquidMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#b8ddf0"),
    transparent: true,
    opacity: 0,
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.6,
    thickness: 2.0,
    ior: 1.33,
    clearcoat: 0.4,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.0,
    side: THREE.DoubleSide,
  });

  liquidMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(
      liquidRadius,
      liquidRadius,
      liquidMaxHeight,
      48,
      1,
      false,
    ),
    liquidMaterial,
  );
  liquidMesh.position.set(liquidCenterX, bMin.y, liquidCenterZ);
  liquidMesh.scale.y = 0.001;
  scene.add(liquidMesh);

  // Animated wave surface (high-res disc with vertex shader)
  const topGeoHD = new THREE.CircleGeometry(liquidRadius, 64);

  liquidTopMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#b8ddf0") },
      uOpacity: { value: 0 },
      uAmplitude: { value: 0.0 },
      uRipple: { value: 0.0 },
      uTurbulence: { value: 0.0 },
      uRadius: { value: liquidRadius },
    },
    vertexShader: `
            uniform float uTime;
            uniform float uAmplitude;
            uniform float uRipple;
            uniform float uTurbulence;
            uniform float uRadius;
            varying vec2 vUv;
            varying float vHeight;
            varying float vDist;

            void main() {
                vUv = uv;
                vec3 pos = position;

                // CircleGeometry is in XY plane, distance from center
                float dist = length(pos.xy);
                vDist = dist / uRadius;

                float h = 0.0;

                // Gentle waves (always present when liquid exists)
                h += sin(pos.x * 4.0 + uTime * 1.5) * uAmplitude * 0.4;
                h += sin(pos.y * 3.5 + uTime * 1.2) * uAmplitude * 0.3;
                h += sin((pos.x + pos.y) * 2.8 + uTime * 1.8) * uAmplitude * 0.2;

                // Ripple rings from center (pouring effect)
                float ripple = sin(dist * 12.0 - uTime * 6.0) * uRipple * 0.6;
                ripple *= smoothstep(uRadius, 0.0, dist); // fade at edges
                h += ripple;

                // Turbulence (reactions, stirring)
                h += sin(pos.x * 8.0 + uTime * 4.0) * uTurbulence * 0.15;
                h += cos(pos.y * 7.0 + uTime * 3.5) * uTurbulence * 0.12;
                h += sin((pos.x - pos.y) * 10.0 + uTime * 5.0) * uTurbulence * 0.08;

                // Edge meniscus - liquid climbs edges slightly
                float edge = smoothstep(uRadius * 0.7, uRadius, dist);
                h += edge * 0.02;

                pos.z += h;
                vHeight = h;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
    fragmentShader: `
            uniform vec3 uColor;
            uniform float uOpacity;
            uniform float uTime;
            varying vec2 vUv;
            varying float vHeight;
            varying float vDist;

            void main() {
                // Discard outside circle
                if (vDist > 1.02) discard;

                // Base color
                vec3 col = uColor;

                // Highlight on wave peaks
                float highlight = smoothstep(0.0, 0.03, vHeight) * 0.25;
                col += highlight;

                // Subtle specular reflection
                float spec = pow(max(0.0, sin(vUv.x * 10.0 + uTime * 0.5) * cos(vUv.y * 8.0 + uTime * 0.3)), 8.0) * 0.15;
                col += spec;

                // Edge darkening (Fresnel-like)
                float edgeFade = smoothstep(0.9, 1.0, vDist);
                col *= (1.0 - edgeFade * 0.3);

                // Overall opacity with edge fade
                float alpha = uOpacity * (1.0 - edgeFade * 0.5);

                gl_FragColor = vec4(col, alpha);
            }
        `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  liquidTopMesh = new THREE.Mesh(topGeoHD, liquidTopMaterial);
  liquidTopMesh.rotation.x = -Math.PI / 2;
  liquidTopMesh.position.set(liquidCenterX, bMin.y, liquidCenterZ);
  scene.add(liquidTopMesh);
}

function updateLiquid() {
  if (!liquidMesh || !beakerBoundingBox) return;

  const level = state.totalVolume / state.maxVolume;
  state.liquidLevel = level;

  const bMin = beakerBoundingBox.min;
  const maxHeight = liquidMaxHeight;

  // Smooth scale animation
  const targetScaleY = Math.max(level, 0.001);
  liquidMesh.scale.y += (targetScaleY - liquidMesh.scale.y) * 0.08;
  liquidMesh.position.y = bMin.y + (maxHeight * liquidMesh.scale.y) / 2;

  // Top surface follows liquid height
  const topY = bMin.y + maxHeight * liquidMesh.scale.y;
  liquidTopMesh.position.y = topY + 0.002;

  // Color
  if (state.currentColor) {
    const target = new THREE.Color(state.currentColor);
    liquidMaterial.color.lerp(target, 0.06);
    liquidTopMaterial.uniforms.uColor.value.lerp(target, 0.06);
  }

  // Opacity
  const targetOp = state.currentOpacity * Math.min(level * 3, 1);
  liquidMaterial.opacity += (targetOp - liquidMaterial.opacity) * 0.06;
  liquidTopMaterial.uniforms.uOpacity.value +=
    (Math.min(targetOp + 0.2, 0.92) -
      liquidTopMaterial.uniforms.uOpacity.value) *
    0.06;

  // Transmission
  liquidMaterial.transmission = Math.max(0.1, 0.7 - targetOp * 0.5);

  // --- Wave animation ---
  const time = performance.now() * 0.001;
  liquidTopMaterial.uniforms.uTime.value = time;

  // Base wave amplitude (small idle waves when liquid exists)
  waveState.targetAmplitude = level > 0.01 ? 0.008 : 0;

  // Pouring increases ripple
  if (state.isPouring) {
    waveState.rippleStrength = Math.min(
      waveState.rippleStrength + 0.02,
      0.06 * state.pourSpeed,
    );
    waveState.targetAmplitude = 0.02;
  } else {
    waveState.rippleStrength *= 0.96;
  }

  // Stirring increases turbulence
  if (state.isStirring && state.totalVolume > 0) {
    waveState.turbulence = Math.min(waveState.turbulence + 0.015, 0.08);
    waveState.targetAmplitude = 0.03;
  } else {
    waveState.turbulence *= 0.97;
  }

  // Smooth amplitude transition
  waveState.amplitude +=
    (waveState.targetAmplitude - waveState.amplitude) * 0.05;

  // Update uniforms
  liquidTopMaterial.uniforms.uAmplitude.value = waveState.amplitude;
  liquidTopMaterial.uniforms.uRipple.value = waveState.rippleStrength;
  liquidTopMaterial.uniforms.uTurbulence.value = waveState.turbulence;
}

// ============================================================
// Bubbles - realistic
// ============================================================

function createBubble(isViolent = false) {
  if (!beakerBoundingBox || state.totalVolume === 0) return;

  const bMin = beakerBoundingBox.min;
  const bMax = beakerBoundingBox.max;
  const bRadius = (bMax.x - bMin.x) * 0.34;
  const liquidTop = bMin.y + state.liquidLevel * (bMax.y - bMin.y) * 0.88;

  const size = isViolent
    ? Math.random() * 0.1 + 0.05
    : Math.random() * 0.06 + 0.015;

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.95,
    thickness: 0.05,
    ior: 1.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    envMapIntensity: 2.0,
  });

  const bubble = new THREE.Mesh(
    new THREE.SphereGeometry(size, 16, 16),
    material,
  );

  const cx = (bMin.x + bMax.x) / 2;
  const cz = (bMin.z + bMax.z) / 2;
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * bRadius * 0.75;
  const startY =
    bMin.y + Math.random() * state.liquidLevel * (bMax.y - bMin.y) * 0.6;

  bubble.position.set(
    cx + Math.cos(angle) * r,
    startY,
    cz + Math.sin(angle) * r,
  );

  bubble.userData = {
    speed: isViolent
      ? Math.random() * 0.035 + 0.02
      : Math.random() * 0.012 + 0.004,
    maxY: liquidTop + size * 0.5,
    phase: Math.random() * Math.PI * 2,
    wobbleRate: Math.random() * 0.025 + 0.01,
    initialSize: size,
  };

  scene.add(bubble);
  bubbles.push(bubble);
}

function updateBubbles() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    const b = bubbles[i];
    const d = b.userData;

    b.position.y += d.speed;
    d.phase += d.wobbleRate;
    b.position.x += Math.sin(d.phase) * 0.0008;
    b.position.z += Math.cos(d.phase * 0.7) * 0.0008;

    // Grow slightly as rising (less pressure)
    const progress =
      (b.position.y - beakerBoundingBox.min.y) /
      (d.maxY - beakerBoundingBox.min.y);
    const growFactor = 1 + progress * 0.3;
    b.scale.setScalar(growFactor);

    // Fade near surface
    b.material.opacity = 0.35 * (1 - progress * progress);

    if (b.position.y >= d.maxY || b.material.opacity <= 0.01) {
      scene.remove(b);
      b.geometry.dispose();
      b.material.dispose();
      bubbles.splice(i, 1);
    }
  }
}

// ============================================================
// Precipitate Particles - settle to bottom during reactions
// ============================================================

let precipitateParticles = [];

function createPrecipitate(color, amount) {
  if (!beakerBoundingBox) return;

  const bMin = beakerBoundingBox.min;
  const bMax = beakerBoundingBox.max;
  const liquidTop = bMin.y + state.liquidLevel * (bMax.y - bMin.y) * 0.88;
  const cx = (bMin.x + bMax.x) / 2;
  const cz = (bMin.z + bMax.z) / 2;
  const bRadius = (bMax.x - bMin.x) * 0.34;

  for (let i = 0; i < amount; i++) {
    const size = Math.random() * 0.04 + 0.015;
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.85,
      roughness: 0.7,
      metalness: 0.0,
      clearcoat: 0.2,
    });

    // Use irregular shapes - stretched spheres
    const particle = new THREE.Mesh(new THREE.SphereGeometry(size, 6, 6), mat);
    particle.scale.set(
      0.8 + Math.random() * 0.6,
      0.5 + Math.random() * 0.4,
      0.8 + Math.random() * 0.6,
    );

    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * bRadius * 0.8;
    const startY =
      liquidTop * 0.5 +
      bMin.y * 0.5 +
      Math.random() * (liquidTop - bMin.y) * 0.5;

    particle.position.set(
      cx + Math.cos(angle) * r,
      startY,
      cz + Math.sin(angle) * r,
    );

    particle.userData = {
      settleSpeed: Math.random() * 0.003 + 0.001,
      minY: bMin.y + size + 0.01 + Math.random() * 0.05,
      wobble: Math.random() * Math.PI * 2,
      wobbleRate: Math.random() * 0.01 + 0.005,
      settled: false,
    };

    scene.add(particle);
    precipitateParticles.push(particle);
  }
}

function updatePrecipitateParticles() {
  for (const p of precipitateParticles) {
    const d = p.userData;
    if (d.settled) continue;

    p.position.y -= d.settleSpeed;
    d.wobble += d.wobbleRate;
    p.position.x += Math.sin(d.wobble) * 0.0003;
    p.position.z += Math.cos(d.wobble * 0.7) * 0.0003;

    if (p.position.y <= d.minY) {
      p.position.y = d.minY;
      d.settled = true;
    }
  }
}

// ============================================================
// Gas Bubbles - large bubbles rising fast for gas-producing reactions
// ============================================================

function createGasBurst(count = 15) {
  if (!beakerBoundingBox || state.totalVolume === 0) return;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const isLarge = Math.random() > 0.5;
      createBubble(true);
      // Extra large gas bubble
      if (isLarge && bubbles.length > 0) {
        const last = bubbles[bubbles.length - 1];
        const scale = 1.5 + Math.random() * 1.5;
        last.scale.setScalar(scale);
        last.userData.speed *= 1.5;
      }
    }, i * 60);
  }
}

// ============================================================
// Foam Particles - float on surface during violent reactions
// ============================================================

let foamParticles = [];

function createFoam(count = 20) {
  if (!beakerBoundingBox || state.totalVolume === 0) return;

  const bMin = beakerBoundingBox.min;
  const bMax = beakerBoundingBox.max;
  const liquidTop = bMin.y + state.liquidLevel * (bMax.y - bMin.y) * 0.88;
  const cx = (bMin.x + bMax.x) / 2;
  const cz = (bMin.z + bMax.z) / 2;
  const bRadius = (bMax.x - bMin.x) * 0.34;

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 0.03 + 0.01;
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5 + Math.random() * 0.3,
      roughness: 0.3,
      metalness: 0.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    const foam = new THREE.Mesh(new THREE.SphereGeometry(size, 8, 8), mat);
    foam.scale.y = 0.5; // flatten to disc-like

    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * bRadius * 0.85;

    foam.position.set(
      cx + Math.cos(angle) * r,
      liquidTop + size * 0.3,
      cz + Math.sin(angle) * r,
    );

    foam.userData = {
      life: 1.0,
      decay: 0.002 + Math.random() * 0.004,
      driftX: (Math.random() - 0.5) * 0.0008,
      driftZ: (Math.random() - 0.5) * 0.0008,
      bobPhase: Math.random() * Math.PI * 2,
      bobRate: 0.02 + Math.random() * 0.02,
    };

    scene.add(foam);
    foamParticles.push(foam);
  }
}

function updateFoamParticles() {
  if (!beakerBoundingBox) return;

  const bMin = beakerBoundingBox.min;
  const bMax = beakerBoundingBox.max;
  const liquidTop = bMin.y + state.liquidLevel * (bMax.y - bMin.y) * 0.88;

  for (let i = foamParticles.length - 1; i >= 0; i--) {
    const f = foamParticles[i];
    const d = f.userData;

    // Float on surface
    f.position.y = liquidTop + 0.005 + Math.sin(d.bobPhase) * 0.003;
    d.bobPhase += d.bobRate;

    // Drift slowly
    f.position.x += d.driftX;
    f.position.z += d.driftZ;

    // Fade out
    d.life -= d.decay;
    f.material.opacity = d.life * 0.6;

    if (d.life <= 0 || state.totalVolume === 0) {
      scene.remove(f);
      f.geometry.dispose();
      f.material.dispose();
      foamParticles.splice(i, 1);
    }
  }
}

// ============================================================
// Splash Particles - appear when pour stream hits liquid
// ============================================================

let splashParticles = [];

function createSplash() {
  if (!beakerBoundingBox || state.totalVolume < 5) return;

  const bMin = beakerBoundingBox.min;
  const bMax = beakerBoundingBox.max;
  const liquidTop = bMin.y + state.liquidLevel * (bMax.y - bMin.y) * 0.88;
  const cx = (bMin.x + bMax.x) / 2;
  const cz = (bMin.z + bMax.z) / 2;

  const count = Math.floor(2 + Math.random() * 3);
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 0.025 + 0.01;
    const mat = new THREE.MeshPhysicalMaterial({
      color: state.currentColor
        ? new THREE.Color(state.currentColor)
        : new THREE.Color(0xb8ddf0),
      transparent: true,
      opacity: 0.7,
      roughness: 0.0,
      transmission: 0.5,
      ior: 1.33,
      clearcoat: 1.0,
      envMapIntensity: 1.0,
    });

    const droplet = new THREE.Mesh(new THREE.SphereGeometry(size, 8, 8), mat);
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.03 + 0.01;

    droplet.position.set(cx, liquidTop + 0.02, cz);
    droplet.userData = {
      vx: Math.cos(angle) * speed,
      vy: Math.random() * 0.04 + 0.02,
      vz: Math.sin(angle) * speed,
      gravity: -0.0015,
      life: 1.0,
      decay: 0.02 + Math.random() * 0.02,
    };

    scene.add(droplet);
    splashParticles.push(droplet);
  }
}

function updateSplashParticles() {
  for (let i = splashParticles.length - 1; i >= 0; i--) {
    const p = splashParticles[i];
    const d = p.userData;

    p.position.x += d.vx;
    p.position.y += d.vy;
    p.position.z += d.vz;
    d.vy += d.gravity;
    d.life -= d.decay;

    p.material.opacity = d.life * 0.7;
    p.scale.setScalar(d.life);

    if (d.life <= 0) {
      scene.remove(p);
      p.geometry.dispose();
      p.material.dispose();
      splashParticles.splice(i, 1);
    }
  }
}

// ============================================================
// Pour Stream - realistic liquid flow
// ============================================================

let pourStreamMesh = null;
const pourStreamMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff5ca0,
  transparent: true,
  opacity: 0,
  roughness: 0.0,
  metalness: 0.0,
  transmission: 0.4,
  thickness: 0.5,
  ior: 1.33,
  clearcoat: 1.0,
  clearcoatRoughness: 0.0,
  envMapIntensity: 1.2,
  side: THREE.DoubleSide,
});

function createPourStream() {
  pourStreamMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.03, 1, 16),
    pourStreamMaterial,
  );
  pourStreamMesh.visible = false;
  scene.add(pourStreamMesh);
}

function updatePourStream() {
  if (!pourStreamMesh) return;

  if (state.isPouring && state.selectedChemical) {
    pourStreamMesh.visible = true;

    const liquidTop = beakerBoundingBox
      ? beakerBoundingBox.min.y +
        state.liquidLevel *
          (beakerBoundingBox.max.y - beakerBoundingBox.min.y) *
          0.88
      : 0.3;

    const streamTop = buretteTipY + 0.1;
    const streamBottom = Math.max(
      liquidTop,
      beakerBoundingBox ? beakerBoundingBox.min.y + 0.05 : 0.05,
    );
    const h = streamTop - streamBottom;

    if (h > 0.05) {
      pourStreamMesh.scale.y = h;
      pourStreamMesh.position.set(
        Math.sin(performance.now() * 0.006) * 0.003,
        streamBottom + h / 2,
        0,
      );

      pourStreamMaterial.color.lerp(
        new THREE.Color(state.selectedChemical.color),
        0.15,
      );
      pourStreamMaterial.opacity += (0.8 - pourStreamMaterial.opacity) * 0.12;

      // Create splash droplets where stream meets liquid
      if (state.totalVolume > 5 && Math.random() > 0.6) {
        createSplash();
      }
    }
  } else {
    pourStreamMaterial.opacity *= 0.8;
    if (pourStreamMaterial.opacity < 0.01) {
      pourStreamMesh.visible = false;
      pourStreamMaterial.opacity = 0;
    }
  }
}

createPourStream();

// ============================================================
// Chemistry Logic
// ============================================================

function addChemical(chemical) {
  if (state.totalVolume >= state.maxVolume) {
    showNotification("Beaker is full!");
    return;
  }

  const amount = 10 * state.pourSpeed;
  const actual = Math.min(amount, state.maxVolume - state.totalVolume);

  let reacted = false;
  for (const existing of state.beakerContents) {
    const reaction =
      REACTIONS[existing.chemical.id + "+" + chemical.id] ||
      REACTIONS[chemical.id + "+" + existing.chemical.id];

    if (reaction) {
      reacted = true;
      state.currentColor = reaction.color;
      state.currentOpacity = reaction.opacity;
      state.currentPh = reaction.ph;

      if (!state.reactions.includes(reaction.text)) {
        state.reactions.push(reaction.text);
      }

      const count = reaction.violent ? 25 : 10;
      for (let i = 0; i < count; i++) {
        setTimeout(
          () => createBubble(reaction.violent),
          i * (reaction.violent ? 30 : 50),
        );
      }

      // Precipitate effect
      if (reaction.precipitate) {
        setTimeout(() => {
          createPrecipitate(
            reaction.precipitate.color,
            reaction.precipitate.amount,
          );
        }, 300);
      }

      // Gas production effect
      if (reaction.gas) {
        createGasBurst(20);
      }

      // Exothermic heat
      if (reaction.heat) {
        state.temperature = Math.min(state.temperature + reaction.heat, 200);
        updateThermometer();
      }

      // Boost wave turbulence on reaction
      waveState.turbulence = Math.min(
        waveState.turbulence + (reaction.violent ? 0.12 : 0.05),
        0.15,
      );
      waveState.targetAmplitude = reaction.violent ? 0.05 : 0.025;

      // Foam on violent reactions
      if (reaction.violent) {
        createFoam(30);
        setTimeout(() => createFoam(15), 500);
        setTimeout(() => createFoam(10), 1000);
        showNotification("Violent reaction!");
      } else if (reaction.precipitate) {
        createFoam(5);
      }
      break;
    }
  }

  if (!reacted) {
    if (state.totalVolume === 0) {
      state.currentColor = chemical.color;
      state.currentOpacity = chemical.opacity;
      state.currentPh = chemical.ph ?? 7.0;
    } else {
      const ratio = actual / (state.totalVolume + actual);
      const mixed = new THREE.Color(state.currentColor || "#b8ddf0");
      mixed.lerp(new THREE.Color(chemical.color), ratio);
      state.currentColor = "#" + mixed.getHexString();
      state.currentOpacity =
        state.currentOpacity * (1 - ratio) + chemical.opacity * ratio;
      if (chemical.ph !== null) {
        state.currentPh = state.currentPh * (1 - ratio) + chemical.ph * ratio;
      }
    }
  }

  const entry = state.beakerContents.find((c) => c.chemical.id === chemical.id);
  if (entry) entry.amount += actual;
  else state.beakerContents.push({ chemical, amount: actual });

  state.totalVolume += actual;
  if (Math.random() > 0.4) createBubble(false);

  updateUI();
}

// ============================================================
// UI
// ============================================================

function updateUI() {
  updateContentsTable();
  updateReactionsList();
  updatePhMeter();
  updateThermometer();
  updateBuretteLiquid();
}

function updateContentsTable() {
  const tbody = document.getElementById("contentsBody");
  if (!tbody) return;
  if (state.beakerContents.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="3" style="text-align:center;color:#8892a8;padding:20px">Empty beaker</td></tr>';
    return;
  }
  tbody.innerHTML = state.beakerContents
    .map((item) => {
      const mol = (item.amount / 50).toFixed(2);
      const dis =
        item.amount < 50
          ? `${(item.amount / 10).toFixed(1)}g`
          : `${mol} mol 100%`;
      return `<tr><td>${item.chemical.formula}</td><td>${mol} mol</td><td>${dis}</td></tr>`;
    })
    .join("");
}

function updateReactionsList() {
  const el = document.getElementById("reactionsList");
  if (!el) return;
  el.innerHTML =
    state.reactions.length === 0
      ? '<p class="empty-text">No reactions yet</p>'
      : state.reactions
          .map((r) => `<div class="reaction-item">${r}</div>`)
          .join("");
}

function updatePhMeter() {
  const ind = document.getElementById("phIndicator");
  const val = document.getElementById("phValue");
  if (!ind || !val) return;
  ind.style.top = `${(state.currentPh / 14) * 100}%`;
  val.textContent = state.currentPh.toFixed(1);
}

function updateThermometer() {
  const fill = document.getElementById("thermoFill");
  if (fill)
    fill.style.height = `${Math.min((state.temperature / 200) * 100, 100)}%`;
}

function updateBuretteLiquid() {
  if (!state.selectedChemical) return;
  buretteLiquidMaterial.color.set(state.selectedChemical.color);
  buretteLiquidMaterial.opacity = Math.max(
    state.selectedChemical.opacity,
    0.55,
  );
}

function showNotification(text) {
  let n = document.querySelector(".notification");
  if (!n) {
    n = document.createElement("div");
    n.className = "notification";
    document.body.appendChild(n);
  }
  n.textContent = text;
  n.classList.add("show");
  setTimeout(() => n.classList.remove("show"), 2000);
}

// ============================================================
// Chemical List
// ============================================================

function renderChemicalList(category) {
  const list = document.getElementById("chemicalList");
  if (!list) return;
  const chems = CHEMICALS[category] || [];
  list.innerHTML = chems
    .map(
      (c) => `
        <div class="chem-item" data-id="${c.id}" data-category="${category}">
            <div class="chem-color" style="background:${c.color};opacity:${Math.max(c.opacity, 0.5)}"></div>
            <span class="chem-formula">${c.formula}</span>
            <span class="chem-name">${c.name}</span>
        </div>`,
    )
    .join("");

  list.querySelectorAll(".chem-item").forEach((item) => {
    item.addEventListener("click", () => {
      const chem = CHEMICALS[item.dataset.category]?.find(
        (c) => c.id === item.dataset.id,
      );
      if (!chem) return;
      state.selectedChemical = chem;
      list
        .querySelectorAll(".chem-item")
        .forEach((el) => el.classList.remove("selected"));
      item.classList.add("selected");
      updateBuretteLiquid();
    });
  });
}

// ============================================================
// Events
// ============================================================

function setupEvents() {
  document.querySelectorAll(".cat-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".cat-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      state.selectedCategory = tab.dataset.category;
      state.selectedChemical = null;
      renderChemicalList(tab.dataset.category);
    });
  });

  document.querySelectorAll(".info-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".info-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const show = tab.dataset.tab === "contents";
      document
        .getElementById("contentsTable")
        .classList.toggle("hidden", !show);
      document.getElementById("reactionsList").classList.toggle("hidden", show);
    });
  });

  document.getElementById("pourSpeedUp")?.addEventListener("click", () => {
    state.pourSpeed = Math.min(state.pourSpeed + 0.5, 5.0);
    document.getElementById("pourSpeedValue").textContent =
      state.pourSpeed.toFixed(1);
  });
  document.getElementById("pourSpeedDown")?.addEventListener("click", () => {
    state.pourSpeed = Math.max(state.pourSpeed - 0.5, 0.5);
    document.getElementById("pourSpeedValue").textContent =
      state.pourSpeed.toFixed(1);
  });

  document.getElementById("heatUp")?.addEventListener("click", () => {
    state.temperature = Math.min(state.temperature + 10, 200);
    updateThermometer();
    if (state.temperature > 80 && state.totalVolume > 0) {
      for (let i = 0; i < 5; i++) createBubble(false);
    }
  });
  document.getElementById("heatDown")?.addEventListener("click", () => {
    state.temperature = Math.max(state.temperature - 10, 0);
    updateThermometer();
  });

  const stirBtn = document.getElementById("stirBtn");
  stirBtn?.addEventListener("click", () => {
    state.isStirring = !state.isStirring;
    stirBtn.classList.toggle("stirring", state.isStirring);
    if (state.isStirring && state.totalVolume > 0) {
      for (let i = 0; i < 10; i++)
        setTimeout(() => createBubble(false), i * 50);
    }
  });

  // Pour
  let pourInterval = null;

  canvas.addEventListener("mousedown", pourStart);
  canvas.addEventListener("mouseup", pourEnd);
  canvas.addEventListener("mouseleave", pourEnd);
  canvas.addEventListener("touchstart", pourStart, { passive: false });
  canvas.addEventListener("touchend", pourEnd);

  function pourStart(e) {
    if (!state.selectedChemical) {
      showNotification("Select a chemical first");
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const x = (cx - rect.left) / rect.width;
    const y = (cy - rect.top) / rect.height;
    if (x < 0.15 || x > 0.85 || y < 0.1 || y > 0.9) return;

    state.isPouring = true;
    addChemical(state.selectedChemical);
    pourInterval = setInterval(() => {
      if (state.selectedChemical && state.isPouring)
        addChemical(state.selectedChemical);
    }, 150);
  }

  function pourEnd() {
    state.isPouring = false;
    if (pourInterval) {
      clearInterval(pourInterval);
      pourInterval = null;
    }
  }

  // Reset
  document.getElementById("closeBtn")?.addEventListener("click", () => {
    state.beakerContents = [];
    state.totalVolume = 0;
    state.currentColor = null;
    state.currentOpacity = 0.4;
    state.currentPh = 7.0;
    state.temperature = 25;
    state.reactions = [];
    state.selectedChemical = null;

    bubbles.forEach((b) => {
      scene.remove(b);
      b.geometry.dispose();
      b.material.dispose();
    });
    bubbles = [];

    splashParticles.forEach((p) => {
      scene.remove(p);
      p.geometry.dispose();
      p.material.dispose();
    });
    splashParticles = [];

    precipitateParticles.forEach((p) => {
      scene.remove(p);
      p.geometry.dispose();
      p.material.dispose();
    });
    precipitateParticles = [];

    foamParticles.forEach((f) => {
      scene.remove(f);
      f.geometry.dispose();
      f.material.dispose();
    });
    foamParticles = [];

    if (liquidMesh) {
      liquidMesh.scale.y = 0.001;
      liquidMaterial.opacity = 0;
    }
    if (liquidTopMesh) {
      liquidTopMaterial.uniforms.uOpacity.value = 0;
      liquidTopMaterial.uniforms.uAmplitude.value = 0;
      liquidTopMaterial.uniforms.uRipple.value = 0;
      liquidTopMaterial.uniforms.uTurbulence.value = 0;
    }
    waveState.amplitude = 0;
    waveState.targetAmplitude = 0;
    waveState.rippleStrength = 0;
    waveState.turbulence = 0;

    document
      .querySelectorAll(".chem-item")
      .forEach((el) => el.classList.remove("selected"));
    updateUI();
    showNotification("Beaker cleared");
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ============================================================
// Animate
// ============================================================

let stirAngle = 0;

function animate() {
  requestAnimationFrame(animate);

  updateLiquid();
  updateBubbles();
  updatePourStream();
  updateSplashParticles();
  updatePrecipitateParticles();
  updateFoamParticles();

  if (liquidMesh && state.isStirring && state.totalVolume > 0) {
    stirAngle += 0.05;
    liquidMesh.rotation.y = Math.sin(stirAngle) * 0.04;
    // Wave shader handles surface stirring via uTurbulence uniform
    if (Math.random() > 0.9) createBubble(false);
  } else if (liquidMesh) {
    liquidMesh.rotation.y *= 0.96;
  }

  renderer.render(scene, camera);
}

// ============================================================
// Init
// ============================================================

renderChemicalList("water");
setupEvents();
updateUI();
animate();
