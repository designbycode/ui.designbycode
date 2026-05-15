'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { VisualizerStyle } from '@/registry/new-york/lib/audio-context';

interface AudioVisualizerProps {
    analyser: AnalyserNode | null;
    isPlaying: boolean;
    style: VisualizerStyle;
    primaryColor?: string;
    secondaryColor?: string;
}

export function AudioVisualizer({
    analyser,
    isPlaying,
    style,
    primaryColor = '#e54545',
    secondaryColor = '#0bdec4',
}: AudioVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<
        Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            life: number;
        }>
    >([]);

    const drawBars = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            dataArray: Uint8Array,
            width: number,
            height: number,
        ) => {
            const bufferLength = dataArray.length;
            const barWidth = (width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * height * 0.8;

                const gradient = ctx.createLinearGradient(
                    0,
                    height,
                    0,
                    height - barHeight,
                );
                gradient.addColorStop(0, primaryColor);
                gradient.addColorStop(1, secondaryColor);

                ctx.fillStyle = gradient;
                ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

                // Reflection
                ctx.fillStyle = `${primaryColor}33`;
                ctx.fillRect(x, height, barWidth - 2, barHeight * 0.3);

                x += barWidth;
            }
        },
        [primaryColor, secondaryColor],
    );

    const drawWave = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            dataArray: Uint8Array,
            width: number,
            height: number,
        ) => {
            const bufferLength = dataArray.length;
            const sliceWidth = width / bufferLength;

            ctx.lineWidth = 3;
            ctx.strokeStyle = primaryColor;
            ctx.shadowColor = primaryColor;
            ctx.shadowBlur = 10;

            ctx.beginPath();
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * height) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(width, height / 2);
            ctx.stroke();

            // Second wave with offset
            ctx.strokeStyle = secondaryColor;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * height) / 2 + 10;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(width, height / 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        },
        [primaryColor, secondaryColor],
    );

    const drawCircular = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            dataArray: Uint8Array,
            width: number,
            height: number,
        ) => {
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) * 0.35;
            const bufferLength = dataArray.length;

            // Draw circular bars
            for (let i = 0; i < bufferLength; i++) {
                const angle = (i / bufferLength) * Math.PI * 2 - Math.PI / 2;
                const barHeight = (dataArray[i] / 255) * radius * 0.8;

                const x1 = centerX + Math.cos(angle) * radius;
                const y1 = centerY + Math.sin(angle) * radius;
                const x2 = centerX + Math.cos(angle) * (radius + barHeight);
                const y2 = centerY + Math.sin(angle) * (radius + barHeight);

                const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
                gradient.addColorStop(0, primaryColor);
                gradient.addColorStop(1, secondaryColor);

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // Inner glow circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
            ctx.strokeStyle = `${primaryColor}44`;
            ctx.lineWidth = 2;
            ctx.stroke();
        },
        [primaryColor, secondaryColor],
    );

    const drawParticles = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            dataArray: Uint8Array,
            width: number,
            height: number,
        ) => {
            const avgAmplitude =
                dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

            // Add new particles based on audio
            if (avgAmplitude > 50) {
                for (let i = 0; i < Math.floor(avgAmplitude / 30); i++) {
                    particlesRef.current.push({
                        x: Math.random() * width,
                        y: height,
                        vx: (Math.random() - 0.5) * 3,
                        vy: -Math.random() * (avgAmplitude / 30) - 2,
                        size: Math.random() * 4 + 2,
                        life: 1,
                    });
                }
            }

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.life -= 0.015;

                if (p.life <= 0) {
                    return false;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = p.life > 0.5 ? primaryColor : secondaryColor;
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;

                return p.life > 0;
            });

            // Draw frequency bars at bottom
            const barCount = 32;
            const barWidth = width / barCount;

            for (let i = 0; i < barCount; i++) {
                const dataIndex = Math.floor((i / barCount) * dataArray.length);
                const barHeight = (dataArray[dataIndex] / 255) * height * 0.3;

                ctx.fillStyle = `${primaryColor}88`;
                ctx.fillRect(
                    i * barWidth,
                    height - barHeight,
                    barWidth - 2,
                    barHeight,
                );
            }
        },
        [primaryColor, secondaryColor],
    );

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const draw = () => {
            const rect = canvas.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            ctx.clearRect(0, 0, width, height);

            if (analyser && isPlaying) {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);

                switch (style) {
                    case 'bars':
                        drawBars(ctx, dataArray, width, height);
                        break;
                    case 'wave':
                        analyser.getByteTimeDomainData(dataArray);
                        drawWave(ctx, dataArray, width, height);
                        break;
                    case 'circular':
                        drawCircular(ctx, dataArray, width, height);
                        break;
                    case 'particles':
                        drawParticles(ctx, dataArray, width, height);
                        break;
                }
            } else {
                // Draw idle animation
                const time = Date.now() / 1000;
                const bars = 32;
                const barWidth = rect.width / bars;

                for (let i = 0; i < bars; i++) {
                    const barHeight =
                        (Math.sin(time * 2 + i * 0.3) + 1) * 10 + 5;
                    ctx.fillStyle = `${primaryColor}44`;
                    ctx.fillRect(
                        i * barWidth,
                        height - barHeight,
                        barWidth - 2,
                        barHeight,
                    );
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [
        analyser,
        isPlaying,
        style,
        drawBars,
        drawWave,
        drawCircular,
        drawParticles,
        primaryColor,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ display: 'block' }}
        />
    );
}
