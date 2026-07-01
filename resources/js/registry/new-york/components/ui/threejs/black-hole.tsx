/* eslint-disable */
`use client`;

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { cn } from '@/lib/utils';

export interface BlackHoleProps {
    className?: string;

    /**
     * Radius of the event horizon (singularity silhouette).
     * Default: 1.2
     */
    eventHorizonRadius?: number;

    /**
     * Inner radius of the accretion disk.
     * Default: 2.2
     */
    diskRadiusInner?: number;

    /**
     * Outer radius of the accretion disk.
     * Default: 7.2
     */
    diskRadiusOuter?: number;

    /**
     * Density of the vector rings.
     * Default: 90
     */
    ringDensity?: number;

    /**
     * Thickness of the accretion disk vector ribbons.
     * Default: 0.08
     */
    lineWidth?: number;

    /**
     * Colors for the accretion disk (inner hot color, outer cool color).
     * Default: ['#ffaa00', '#0077ff'] (orange to blue)
     */
    colors?: string[];

    /**
     * Color of the Einstein Ring lensing glow.
     * Default: '#ff8800'
     */
    glowColor?: string;

    /**
     * Speed multiplier for the rotation and wave animations.
     * Default: 1.0
     */
    speed?: number;

    /**
     * Enable interactive OrbitControls (drag to rotate, scroll to zoom).
     * Default: true
     */
    enableOrbitControls?: boolean;

    /**
     * Enable camera auto-orbit around the black hole.
     * Default: true
     */
    autoRotate?: boolean;

    /**
     * Initial position of the camera in 3D space.
     * Default: { x: 0, y: 1.8, z: 9 }
     */
    cameraPosition?: { x: number; y: number; z: number };

    /**
     * Max device pixel ratio for performance scaling.
     * Default: 2
     */
    maxPixelRatio?: number;

    /**
     * Callback when the Three.js scene is fully initialized.
     */
    onReady?: () => void;
}

export function BlackHole({
    className,
    eventHorizonRadius = 1.2,
    diskRadiusInner = 2.2,
    diskRadiusOuter = 7.2,
    ringDensity = 90,
    lineWidth = 0.08,
    colors = ['#ffcc00', '#ff3300'],
    glowColor = '#ff6600',
    speed = 1.0,
    enableOrbitControls = true,
    autoRotate = true,
    cameraPosition = { x: 0, y: 1.8, z: 9 },
    maxPixelRatio = 2,
    onReady,
}: BlackHoleProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const updateSize = () => {
            if (containerRef.current) {
                setSize({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!containerRef.current || size.width === 0 || size.height === 0)
            return;

        const el = containerRef.current;

        // 1. Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            size.width / size.height,
            0.1,
            100,
        );
        camera.position.set(
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z,
        );

        // 2. Renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        });
        renderer.setSize(size.width, size.height);
        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, maxPixelRatio),
        );
        el.appendChild(renderer.domElement);

        // 3. OrbitControls Setup
        let controls: OrbitControls | null = null;
        if (enableOrbitControls) {
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.enableZoom = true;
            controls.minDistance = 3.5;
            controls.maxDistance = 22.0;
            controls.enablePan = false; // Lock focal center on black hole

            controls.autoRotate = autoRotate;
            controls.autoRotateSpeed = speed * 1.5;
        }

        // Color helper
        const colorInner = new THREE.Color(colors[0] || '#ffcc00');
        const colorOuter = new THREE.Color(colors[1] || '#ff3300');
        const colorGlow = new THREE.Color(glowColor);

        const getPaletteColor = (t: number) => {
            return new THREE.Color().copy(colorInner).lerp(colorOuter, t);
        };

        // 4. Singularity (Event Horizon)
        const horizonGeometry = new THREE.SphereGeometry(
            eventHorizonRadius,
            32,
            32,
        );
        const horizonMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
        });
        const eventHorizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
        scene.add(eventHorizon);

        // 5. Einstein Ring Lensing Glow (Camera-facing Billboarded Glow Corona)
        const glowSize = eventHorizonRadius * 3.8;
        const glowGeometry = new THREE.PlaneGeometry(glowSize, glowSize);
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: colorGlow },
                uInnerRadius: { value: eventHorizonRadius },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform vec3 uColor;
                uniform float uInnerRadius;
                void main() {
                    float dist = length(vUv - vec2(0.5)) * 2.0;
                    // Corona falloff around event horizon
                    float border = 0.45;
                    float glow = exp(-pow((dist - border) * 4.5, 2.0));

                    // Darken the center where the event horizon is
                    float centerMask = smoothstep(border - 0.08, border + 0.02, dist);

                    gl_FragColor = vec4(uColor * glow * 1.6, glow * centerMask * 0.85);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glowMesh);

        // 6. Horizontal Accretion Disk (Smooth, Concentric Vector Ribbons)
        const diskLinesList: {
            mesh: THREE.Mesh;
            speed: number;
            baseRotationY: number;
        }[] = [];
        const diskGroup = new THREE.Group();

        for (let i = 0; i < ringDensity; i++) {
            const t = i / (ringDensity - 1);
            const r =
                diskRadiusInner +
                Math.pow(t, 1.8) * (diskRadiusOuter - diskRadiusInner);
            const segments = 120;

            const vertices: number[] = [];
            const indices: number[] = [];

            // Add wave fluctuations along the ring path
            const waveFreq = 2 + Math.floor(Math.random() * 4);
            const waveAmp = 0.03 + Math.random() * 0.06 * (r / diskRadiusOuter);
            const wavePhase = Math.random() * Math.PI * 2;

            for (let j = 0; j <= segments; j++) {
                const theta = (j / segments) * Math.PI * 2;
                const wave = Math.sin(theta * waveFreq + wavePhase) * waveAmp;
                const currR = r + wave;

                const rInner = currR - lineWidth / 2;
                const rOuter = currR + lineWidth / 2;

                const cos = Math.cos(theta);
                const sin = Math.sin(theta);

                // Inner vertex
                vertices.push(rInner * cos, 0, rInner * sin);
                // Outer vertex
                vertices.push(rOuter * cos, 0, rOuter * sin);
            }

            for (let j = 0; j < segments; j++) {
                const i0 = j * 2;
                const i1 = j * 2 + 1;
                const i2 = (j + 1) * 2;
                const i3 = (j + 1) * 2 + 1;

                indices.push(i0, i1, i2);
                indices.push(i1, i3, i2);
            }

            const ribbonGeometry = new THREE.BufferGeometry();
            ribbonGeometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(vertices, 3),
            );
            ribbonGeometry.setIndex(indices);

            const lineColor = getPaletteColor(t);

            const ribbonMaterial = new THREE.MeshBasicMaterial({
                color: lineColor,
                transparent: true,
                opacity: 0.15 + (1.0 - t) * 0.4,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.DoubleSide,
            });

            const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
            diskGroup.add(ribbon);

            // Keplerian velocity: inner rings rotate faster than outer
            const lineSpeed =
                (0.2 + Math.random() * 0.2) * (0.05 / Math.sqrt(r));
            diskLinesList.push({
                mesh: ribbon,
                speed: lineSpeed,
                baseRotationY: Math.random() * Math.PI * 2,
            });
        }
        scene.add(diskGroup);

        // 7. Gravitational Lensing Halo (Camera-facing bent ring vector ribbons)
        // Mimics the light warped over and under the event horizon
        const haloLinesList: {
            mesh: THREE.Mesh;
            speed: number;
            baseRotationZ: number;
        }[] = [];
        const haloGroup = new THREE.Group();
        const haloDensity = Math.floor(ringDensity * 0.5);

        for (let i = 0; i < haloDensity; i++) {
            const t = i / (haloDensity - 1);
            // Sits closely wrapping the event horizon
            const r =
                eventHorizonRadius * 1.05 +
                Math.pow(t, 1.5) * (eventHorizonRadius * 0.8);
            const segments = 90;

            const vertices: number[] = [];
            const indices: number[] = [];

            const waveFreq = 2 + Math.floor(Math.random() * 3);
            const waveAmp = 0.015 + Math.random() * 0.03;
            const wavePhase = Math.random() * Math.PI * 2;

            for (let j = 0; j <= segments; j++) {
                const theta = (j / segments) * Math.PI * 2;
                const wave = Math.sin(theta * waveFreq + wavePhase) * waveAmp;
                const currR = r + wave;

                const rInner = currR - lineWidth / 2;
                const rOuter = currR + lineWidth / 2;

                const cos = Math.cos(theta);
                const sin = Math.sin(theta);

                // Inner vertex
                vertices.push(rInner * cos, rInner * sin, 0);
                // Outer vertex
                vertices.push(rOuter * cos, rOuter * sin, 0);
            }

            for (let j = 0; j < segments; j++) {
                const i0 = j * 2;
                const i1 = j * 2 + 1;
                const i2 = (j + 1) * 2;
                const i3 = (j + 1) * 2 + 1;

                indices.push(i0, i1, i2);
                indices.push(i1, i3, i2);
            }

            const ribbonGeometry = new THREE.BufferGeometry();
            ribbonGeometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(vertices, 3),
            );
            ribbonGeometry.setIndex(indices);

            const lineColor = getPaletteColor(t * 0.7);

            const ribbonMaterial = new THREE.MeshBasicMaterial({
                color: lineColor,
                transparent: true,
                opacity: 0.25 + (1.0 - t) * 0.45,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.DoubleSide,
            });

            const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
            haloGroup.add(ribbon);

            const lineSpeed =
                (0.2 + Math.random() * 0.3) * (0.04 / Math.sqrt(r));
            haloLinesList.push({
                mesh: ribbon,
                speed: lineSpeed,
                baseRotationZ: Math.random() * Math.PI * 2,
            });
        }
        scene.add(haloGroup);

        // 8. Background Stars (Stable, anti-aliased Point cloud)
        const starGeometry = new THREE.BufferGeometry();
        const starsCount = 800;
        const starPos = new Float32Array(starsCount * 3);
        for (let i = 0; i < starsCount; i++) {
            const r = 25.0 + Math.random() * 20.0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2.0 * Math.random() - 1.0);

            starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            starPos[i * 3 + 2] = r * Math.cos(phi);
        }
        starGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(starPos, 3),
        );
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.08,
            transparent: true,
            opacity: 0.75,
            sizeAttenuation: true,
        });
        const starsPoints = new THREE.Points(starGeometry, starMaterial);
        scene.add(starsPoints);

        // 9. Animation Loop
        const clock = new THREE.Clock();
        let rafId: number;

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Rotate Accretion Disk (horizontal lines rotate around local Y)
            diskLinesList.forEach((line) => {
                line.mesh.rotation.y =
                    line.baseRotationY + elapsedTime * line.speed * speed * 2.0;
            });

            // Rotate Lensing Halo (vertical lines rotate around local Z)
            haloLinesList.forEach((line) => {
                line.mesh.rotation.z =
                    line.baseRotationZ + elapsedTime * line.speed * speed * 2.0;
            });

            // Keep Lensing Halo & Glow mesh facing the camera
            haloGroup.lookAt(camera.position);
            glowMesh.lookAt(camera.position);

            // Handle Camera movement (controls or auto-rotation)
            if (controls) {
                controls.update();
            } else if (autoRotate) {
                const orbitRadius = Math.sqrt(
                    cameraPosition.x * cameraPosition.x +
                        cameraPosition.z * cameraPosition.z,
                );
                const baseAngle = Math.atan2(
                    cameraPosition.z,
                    cameraPosition.x,
                );
                const angle = baseAngle + elapsedTime * 0.04 * speed;

                camera.position.x = Math.cos(angle) * orbitRadius;
                camera.position.z = Math.sin(angle) * orbitRadius;
                camera.lookAt(0, 0, 0);
            }

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        };

        animate();
        onReady?.();

        // 10. Resize handler
        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // 11. Cleanup
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', handleResize);

            // Event Horizon cleanup
            scene.remove(eventHorizon);
            horizonGeometry.dispose();
            horizonMaterial.dispose();

            // Glow Corona cleanup
            scene.remove(glowMesh);
            glowGeometry.dispose();
            glowMaterial.dispose();

            // Accretion Disk cleanup
            scene.remove(diskGroup);
            diskLinesList.forEach((line) => {
                line.mesh.geometry.dispose();
                (line.mesh.material as THREE.Material).dispose();
            });

            // Halo cleanup
            scene.remove(haloGroup);
            haloLinesList.forEach((line) => {
                line.mesh.geometry.dispose();
                (line.mesh.material as THREE.Material).dispose();
            });

            // Stars cleanup
            scene.remove(starsPoints);
            starGeometry.dispose();
            starMaterial.dispose();

            if (controls) {
                controls.dispose();
            }

            renderer.dispose();
            if (el.contains(renderer.domElement)) {
                el.removeChild(renderer.domElement);
            }
        };
    }, [
        size.width,
        size.height,
        eventHorizonRadius,
        diskRadiusInner,
        diskRadiusOuter,
        ringDensity,
        lineWidth,
        colors,
        glowColor,
        speed,
        enableOrbitControls,
        autoRotate,
        cameraPosition,
        maxPixelRatio,
        onReady,
    ]);

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative h-full min-h-[300px] w-full overflow-hidden bg-black select-none',
                className,
            )}
            aria-hidden="true"
        />
    );
}

export default BlackHole;
