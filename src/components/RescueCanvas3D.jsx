import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Globe, Utensils, Pill, RotateCcw, Eye } from 'lucide-react';

export default function RescueCanvas3D({ mode = 'network', onModeChange }) {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState(mode);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    currentMount.appendChild(renderer.domElement);

    // Warm daylight studio lighting for light stone canvas
    const ambientLight = new THREE.AmbientLight(0xfffcf5, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff7ed, 2.2); // Warm sunlight
    dirLight1.position.set(5, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x059669, 1.6); // Emerald sage rim light
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xd97706, 2.0, 20); // Warm amber point light
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const networkGroup = new THREE.Group();
    const foodGroup = new THREE.Group();
    const medicineGroup = new THREE.Group();
    rootGroup.add(networkGroup);
    rootGroup.add(foodGroup);
    rootGroup.add(medicineGroup);

    /* ============================================================
       1. NETWORK HOLOGRAPHIC GLOBE & REDISTRIBUTION ARCS
    ============================================================ */
    // Inner wireframe sphere
    const sphereGeom = new THREE.IcosahedronGeometry(2.4, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.7
    });
    const globeMesh = new THREE.Mesh(sphereGeom, sphereMat);
    networkGroup.add(globeMesh);

    // Core pearl sphere (soft alabaster glow)
    const coreGeom = new THREE.SphereGeometry(1.9, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe6,
      transparent: true,
      opacity: 0.75,
      roughness: 0.3,
      metalness: 0.1
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    networkGroup.add(coreMesh);

    // Latitude rings
    const ringMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.45 });
    [-1.2, 0, 1.2].forEach(y => {
      const radius = Math.sqrt(Math.max(0.1, 2.4 * 2.4 - y * y));
      const ringGeom = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
      }
      ringGeom.setFromPoints(points);
      const ring = new THREE.Line(ringGeom, ringMat);
      networkGroup.add(ring);
    });

    // Rescue Nodes on Globe
    const nodePositions = [
      new THREE.Vector3(1.6, 1.2, 1.2),   // Green Leaf Restaurant
      new THREE.Vector3(-1.8, 0.8, 1.1),  // Hope Shelter
      new THREE.Vector3(0.5, -1.9, 1.2),  // Metro Food Bank
      new THREE.Vector3(-0.8, -1.5, -1.5),// Community Clinic
      new THREE.Vector3(1.9, -0.6, -1.1), // Apex Pharmacy
      new THREE.Vector3(-1.5, 1.6, -0.9), // University Pantry
      new THREE.Vector3(0.2, 2.2, 0.6),   // Valley Harvest
      new THREE.Vector3(-0.3, 0.2, 2.3),  // City Center Hub
    ];

    const nodeColors = [0x059669, 0xd97706, 0x059669, 0x0284c7, 0x0284c7, 0xd97706, 0x059669, 0x10b981];
    const nodeMeshes = [];

    nodePositions.forEach((pos, idx) => {
      const nodeGeom = new THREE.SphereGeometry(0.13, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[idx % nodeColors.length],
        emissive: nodeColors[idx % nodeColors.length],
        emissiveIntensity: 0.6,
        roughness: 0.2
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.copy(pos);
      networkGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Pulse ring for each node
      const pulseGeom = new THREE.RingGeometry(0.15, 0.23, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: nodeColors[idx % nodeColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const pulseMesh = new THREE.Mesh(pulseGeom, pulseMat);
      pulseMesh.position.copy(pos);
      pulseMesh.lookAt(pos.clone().multiplyScalar(2));
      networkGroup.add(pulseMesh);
    });

    // Transport Curves (Arcs connecting nodes)
    const arcCurves = [];
    const arcPairs = [
      [0, 1], [0, 7], [4, 3], [6, 2], [7, 3], [1, 5], [6, 0]
    ];

    arcPairs.forEach(([i1, i2]) => {
      const p1 = nodePositions[i1];
      const p2 = nodePositions[i2];
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(2.4 + dist * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      arcCurves.push(curve);

      const points = curve.getPoints(36);
      const arcGeom = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x059669,
        transparent: true,
        opacity: 0.4
      });
      const arcLine = new THREE.Line(arcGeom, arcMat);
      networkGroup.add(arcLine);
    });

    // Animated particles traveling along arcs
    const particleCount = arcCurves.length * 2;
    const packetGeom = new THREE.SphereGeometry(0.075, 8, 8);
    const packetMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8
    });
    const packets = [];

    for (let i = 0; i < particleCount; i++) {
      const packet = new THREE.Mesh(packetGeom, packetMat);
      networkGroup.add(packet);
      packets.push({
        mesh: packet,
        curveIndex: i % arcCurves.length,
        progress: (i / particleCount)
      });
    }

    // Surrounding Particle Dust
    const starsGeom = new THREE.BufferGeometry();
    const starCount = 140;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 14;
      starCoords[i + 1] = (Math.random() - 0.5) * 10;
      starCoords[i + 2] = (Math.random() - 0.5) * 8;
    }
    starsGeom.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x059669,
      size: 0.045,
      transparent: true,
      opacity: 0.35
    });
    const starPoints = new THREE.Points(starsGeom, starMat);
    scene.add(starPoints);

    /* ============================================================
       2. 3D FOOD RESCUE RELIEF CRATE (Mode: 'food')
    ============================================================ */
    const crateGeom = new THREE.BoxGeometry(2.4, 1.8, 1.8);
    const crateMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Terracotta / Warm amber
      roughness: 0.35,
      metalness: 0.15
    });
    const crateMesh = new THREE.Mesh(crateGeom, crateMat);
    foodGroup.add(crateMesh);

    const edgeGeom = new THREE.BoxGeometry(2.45, 1.85, 1.85);
    const edgeWire = new THREE.WireframeGeometry(edgeGeom);
    const edgeLine = new THREE.LineSegments(edgeWire, new THREE.LineBasicMaterial({ color: 0xfef3c7, linewidth: 2 }));
    foodGroup.add(edgeLine);

    const lidGeom = new THREE.BoxGeometry(2.5, 0.25, 1.9);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.3 });
    const lid = new THREE.Mesh(lidGeom, lidMat);
    lid.position.y = 0.95;
    foodGroup.add(lid);

    const badgeGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 32);
    badgeGeom.rotateX(Math.PI / 2);
    const badgeMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.2, metalness: 0.7 });
    const badge = new THREE.Mesh(badgeGeom, badgeMat);
    badge.position.set(0, 0, 0.92);
    foodGroup.add(badge);

    const foodOrbitGeom = new THREE.TorusGeometry(2.2, 0.03, 16, 64);
    const foodOrbitMat = new THREE.MeshBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.5 });
    const foodOrbit = new THREE.Mesh(foodOrbitGeom, foodOrbitMat);
    foodOrbit.rotation.x = Math.PI / 3;
    foodGroup.add(foodOrbit);

    /* ============================================================
       3. 3D MEDICINE CAPSULE (Mode: 'medicine')
    ============================================================ */
    const capTopGeom = new THREE.CapsuleGeometry(0.8, 1.2, 16, 32);
    const capTopMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7, // Vibrant cyan
      roughness: 0.15,
      transmission: 0.15,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const capTop = new THREE.Mesh(capTopGeom, capTopMat);
    capTop.rotation.z = Math.PI / 4;
    medicineGroup.add(capTop);

    const bandGeom = new THREE.TorusGeometry(0.81, 0.05, 16, 32);
    const bandMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 });
    const band = new THREE.Mesh(bandGeom, bandMat);
    band.rotation.y = Math.PI / 4;
    medicineGroup.add(band);

    const medRingGeom = new THREE.TorusGeometry(2.0, 0.02, 16, 64);
    const medRingMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.4 });
    const medRing1 = new THREE.Mesh(medRingGeom, medRingMat);
    medRing1.rotation.x = Math.PI / 3;
    medicineGroup.add(medRing1);

    const medRing2 = new THREE.Mesh(medRingGeom, new THREE.MeshBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.4 }));
    medRing2.rotation.y = Math.PI / 3;
    medicineGroup.add(medRing2);

    /* ============================================================
       MOUSE INTERACTION & ORBIT TILT
    ============================================================ */
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousemove', handleMouseMove);
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    /* ============================================================
       ANIMATION LOOP
    ============================================================ */
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      networkGroup.visible = activeMode === 'network';
      foodGroup.visible = activeMode === 'food';
      medicineGroup.visible = activeMode === 'medicine';

      if (!isDragging) {
        targetRotationY += 0.0035;
        rootGroup.rotation.y += (targetRotationY + mouseX * 0.4 - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (targetRotationX + mouseY * 0.2 - rootGroup.rotation.x) * 0.05;
      } else {
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.15;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.15;
      }

      if (networkGroup.visible) {
        globeMesh.rotation.y = elapsedTime * 0.08;
        coreMesh.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.02);

        packets.forEach(p => {
          p.progress += 0.006;
          if (p.progress > 1) p.progress = 0;
          const curve = arcCurves[p.curveIndex];
          if (curve) {
            const point = curve.getPoint(p.progress);
            p.mesh.position.copy(point);
          }
        });
      }

      if (foodGroup.visible) {
        crateMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
        edgeLine.position.y = crateMesh.position.y;
        lid.position.y = 0.95 + crateMesh.position.y;
        badge.position.y = crateMesh.position.y;
        foodOrbit.rotation.z = elapsedTime * 0.5;
        foodGroup.rotation.y = elapsedTime * 0.25;
      }

      if (medicineGroup.visible) {
        capTop.position.y = Math.sin(elapsedTime * 1.8) * 0.12;
        band.position.y = capTop.position.y;
        medRing1.rotation.z = elapsedTime * 0.6;
        medRing2.rotation.x = -elapsedTime * 0.5;
        medicineGroup.rotation.y = elapsedTime * 0.3;
      }

      starPoints.rotation.y = -elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('mousemove', handleMouseMove);
      domEl.removeEventListener('mousedown', handleMouseDown);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeMode]);

  const switchMode = (m) => {
    setActiveMode(m);
    if (onModeChange) onModeChange(m);
  };

  return (
    <div
      className="relative w-full h-full min-h-[440px] lg:min-h-[540px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing z-0" />

      {/* Floating 3D Controls (Pill bar top-right of 3D scene in luxury stone theme) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1.5 rounded-full bg-[#f4efe8]/90 backdrop-blur-md border border-stone-200/90 shadow-md">
        <button
          onClick={() => switchMode('network')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeMode === 'network'
              ? 'bg-[#201f1e] text-white font-bold shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
          title="3D Real-time Redistribution Network"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">3D Network</span>
        </button>

        <button
          onClick={() => switchMode('food')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeMode === 'food'
              ? 'bg-[#201f1e] text-white font-bold shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
          title="3D Surplus Food Relief"
        >
          <Utensils className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">Food 3D</span>
        </button>

        <button
          onClick={() => switchMode('medicine')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeMode === 'medicine'
              ? 'bg-[#201f1e] text-white font-bold shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
          title="3D Verified Medicine Capsule"
        >
          <Pill className="w-3.5 h-3.5 text-sky-500" />
          <span className="hidden sm:inline">Medicine 3D</span>
        </button>
      </div>

      {/* Bottom Floating Hint / Live Indicator */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4efe8]/90 backdrop-blur-md border border-stone-200/90 shadow-sm text-[11px] text-stone-700">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-emerald-700 font-bold">LIVE 3D VIEW:</span>
        <span className="text-stone-500 hidden sm:inline">Click & drag to rotate 360°</span>
      </div>
    </div>
  );
}
