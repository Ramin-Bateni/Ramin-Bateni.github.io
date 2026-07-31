/**
 * space-background.js
 * A lightweight decorative Three.js layer: a few blurred aurora
 * "ribbons" made of low-poly planes with a simple vertex wave,
 * plus a sparse point-cloud of cosmic dust. No physics, no heavy
 * shaders, no post-processing — just slow drift and rotation.
 *
 * Pauses when the tab/canvas is not visible and respects
 * prefers-reduced-motion by rendering a single static frame.
 */

const CANVAS_ID = 'space-canvas';
const PARTICLE_COUNT = 220;
const AURORA_COLORS = [0xff8a4c, 0x4fd8e0, 0x8b7cf6];

let renderer, scene, camera, clock;
let particles, ribbons = [];
let rafId = null;
let isVisible = true;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export async function initSpaceBackground() {
  const canvas = document.getElementById(CANVAS_ID);
  if (!canvas || !supportsWebGL()) {
    if (canvas) canvas.remove();
    document.body.classList.add('no-webgl-fallback');
    return;
  }

  let THREE;
  try {
    THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  } catch (err) {
    console.warn('Three.js failed to load; falling back to static background.', err);
    canvas.remove();
    document.body.classList.add('no-webgl-fallback');
    return;
  }

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 18;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);

  clock = new THREE.Clock();

  buildRibbons(THREE);
  buildParticles(THREE);

  if (prefersReducedMotion) {
    renderer.render(scene, camera);
  } else {
    animate();
  }

  window.addEventListener('resize', () => onResize(THREE), { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => (isVisible = e.isIntersecting)),
    { threshold: 0 }
  );
  io.observe(canvas);
}

/** @param {typeof import('three')} THREE */
function buildRibbons(THREE) {
  AURORA_COLORS.forEach((color, i) => {
    const geometry = new THREE.PlaneGeometry(34, 10, 40, 12);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(i % 2 === 0 ? -4 : 5, i * 3 - 4, -10 - i * 4);
    mesh.rotation.z = (i - 1) * 0.18;
    mesh.rotation.x = -0.3;
    scene.add(mesh);
    ribbons.push({ mesh, offset: i * 1.7, geometry });
  });
}

/** @param {typeof import('three')} THREE */
function buildParticles(THREE) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xaeb8d6,
    size: 0.06,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function animate() {
  rafId = window.requestAnimationFrame(animate);
  if (!isVisible) return;

  const t = clock.getElapsedTime();

  ribbons.forEach(({ mesh }, i) => {
    mesh.rotation.z += 0.0002 * (i % 2 === 0 ? 1 : -1);
    mesh.position.x += Math.sin(t * 0.05 + i) * 0.002;
    mesh.position.y += Math.cos(t * 0.04 + i) * 0.0015;
  });

  if (particles) {
    particles.rotation.y = t * 0.01;
  }

  renderer.render(scene, camera);
}

/** @param {typeof import('three')} THREE */
function onResize(THREE) {
  if (!renderer || !camera) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onVisibilityChange() {
  isVisible = document.visibilityState === 'visible';
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}
