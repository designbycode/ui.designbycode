'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { cn } from '@/lib/utils';

export interface FeedbackStarProps {
    className?: string;

    /**
     * Geometry shape to render in the scene.
     * Default: 'torus-knot'
     */
    geometryType?: 'torus-knot' | 'sphere' | 'icosahedron' | 'torus';

    /**
     * Color of the 3D mesh object.
     * Default: '#ffffff'
     */
    meshColor?: string;

    /**
     * Speed multiplier for the glitch animation.
     * Default: 1.0
     */
    speed?: number;

    /**
     * Enable interactive camera OrbitControls.
     * Default: true
     */
    enableOrbitControls?: boolean;
}

export function FeedbackStar({
    className,
    geometryType = 'torus-knot',
    meshColor = '#ffffff',
    speed = 1.0,
    enableOrbitControls = true,
}: FeedbackStarProps) {
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

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (size.width === 0 || size.height === 0 || !containerRef.current)
            return;

        const el = containerRef.current;
        const width = size.width;
        const height = size.height;

        // 1. Renderer Setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
        });
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 1.0);
        el.appendChild(renderer.domElement);

        // 2. Render Target for Post-Processing
        const rtWidth = Math.floor(width * pixelRatio);
        const rtHeight = Math.floor(height * pixelRatio);

        const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
        });

        // 3. 3D Scene (Gets rendered to texture)
        const scene3d = new THREE.Scene();
        const camera3d = new THREE.PerspectiveCamera(
            45,
            width / height,
            0.1,
            1000,
        );
        camera3d.position.z = 30;

        // Add Lights
        scene3d.add(new THREE.AmbientLight(0x222222));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(1, 1, 1);
        scene3d.add(dirLight);

        // Add 3D Mesh
        let geometry: THREE.BufferGeometry;
        if (geometryType === 'sphere') {
            geometry = new THREE.SphereGeometry(8, 64, 64);
        } else if (geometryType === 'icosahedron') {
            geometry = new THREE.IcosahedronGeometry(8, 0);
        } else if (geometryType === 'torus') {
            geometry = new THREE.TorusGeometry(8, 3, 32, 100);
        } else {
            geometry = new THREE.TorusKnotGeometry(5.5, 1.8, 256, 32);
        }

        const meshMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(meshColor),
            shininess: 60,
        });

        const mesh = new THREE.Mesh(geometry, meshMaterial);
        scene3d.add(mesh);

        // 4. Post-processing Screen Scene & Camera
        const sceneScreen = new THREE.Scene();
        const cameraScreen = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const screenGeometry = new THREE.PlaneGeometry(2, 2);

        // 5. Orbit Controls for 3D camera
        let controls: OrbitControls | null = null;
        if (enableOrbitControls) {
            controls = new OrbitControls(camera3d, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.enablePan = false;
        }

        // 6. Shader Uniforms
        const uniforms = {
            u_time: { value: 0.0 },
            u_frame: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(rtWidth, rtHeight) },
            u_mouse: {
                value: new THREE.Vector2(rtWidth * 0.5, rtHeight * 0.5),
            },
            u_texture: { value: renderTarget.texture as any },
        };

        // 7. Shaders Code
        const vertexShader = `
            varying vec2 v_uv;
            void main() {
                v_uv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_time;
            uniform float u_frame;
            uniform sampler2D u_texture;
            varying vec2 v_uv;

            highp float random1d(float dt) {
                highp float c = 43758.5453;
                highp float sn = mod(dt, 3.14);
                return fract(sin(sn) * c);
            }

            highp float noise1d(float value) {
                highp float i = floor(value);
                highp float f = fract(value);
                return mix(random1d(i), random1d(i + 1.0), smoothstep(0.0, 1.0, f));
            }

            highp float random2d(vec2 co) {
                highp float a = 12.9898;
                highp float b = 78.233;
                highp float c = 43758.5453;
                highp float dt = dot(co.xy, vec2(a, b));
                highp float sn = mod(dt, 3.14);
                return fract(sin(sn) * c);
            }

            void main() {
                // Calculate the effect relative strength
                float strength = (0.3 + 0.7 * noise1d(0.3 * u_time)) * u_mouse.x / u_resolution.x;

                // Calculate the effect jump at the current time interval
                float jump = 500.0 * floor(0.3 * (u_mouse.x / u_resolution.x) * (u_time + noise1d(u_time)));

                // Shift the texture coordinates
                vec2 uv = v_uv;
                uv.y += 0.2 * strength * (noise1d(5.0 * v_uv.y + 2.0 * u_time + jump) - 0.5);
                uv.x += 0.1 * strength * (noise1d(100.0 * strength * uv.y + 3.0 * u_time + jump) - 0.5);

                // Get the texture pixel color
                vec3 pixel_color = texture2D(u_texture, uv).rgb;

                // Add some white noise
                pixel_color += vec3(5.0 * strength * (random2d(v_uv + 1.133001 * vec2(u_time, 1.13)) - 0.5));

                gl_FragColor = vec4(pixel_color, 1.0);
            }
        `;

        const materialShader = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            depthWrite: false,
            depthTest: false,
        });

        const screenMesh = new THREE.Mesh(screenGeometry, materialShader);
        sceneScreen.add(screenMesh);

        // 8. Render loop
        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            const time = clock.getElapsedTime() * speed;
            uniforms.u_time.value = time;
            uniforms.u_frame.value += 1.0;

            // Animate object slightly
            mesh.rotation.y += 0.005;
            mesh.rotation.x += 0.003;

            if (controls) {
                controls.update();
            }

            // Render 3D Scene into RenderTarget texture
            renderer.setRenderTarget(renderTarget);
            renderer.render(scene3d, camera3d);

            // Render screen-space Quad applying glitch shader
            renderer.setRenderTarget(null);
            renderer.render(sceneScreen, cameraScreen);

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // 9. Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) * pixelRatio;
            const y = (rect.bottom - e.clientY) * pixelRatio;
            uniforms.u_mouse.value.set(x, y);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 0) return;
            const rect = el.getBoundingClientRect();
            const x = (e.touches[0].clientX - rect.left) * pixelRatio;
            const y = (rect.bottom - e.touches[0].clientY) * pixelRatio;
            uniforms.u_mouse.value.set(x, y);
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('touchmove', handleTouchMove, { passive: true });

        // 10. Cleanups
        return () => {
            cancelAnimationFrame(animationFrameId);
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('touchmove', handleTouchMove);

            geometry.dispose();
            meshMaterial.dispose();
            screenGeometry.dispose();
            materialShader.dispose();
            renderTarget.dispose();

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
        geometryType,
        meshColor,
        speed,
        enableOrbitControls,
    ]);

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative h-full min-h-[350px] w-full overflow-hidden select-none',
                className,
            )}
            aria-hidden="true"
        />
    );
}

export default FeedbackStar;
