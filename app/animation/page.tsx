'use client';

import useScreenSize from '@/hooks/useScreenSize';
import { GradientBackground } from '@/lib/GradientBackground';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Home, Play, SkipBack, SkipForward } from 'lucide-react';
import HelmetSVG from './HelmetSVG';
import LyreSVG from './LyreSVG';
import GravestonesSVG from './GravestonesSVG';
import Link from 'next/link';

type Point = { x: number; y: number; lastMoved: number | undefined };
export type SVGPoint = { x: number; y: number };

export const NUM_POINTS = 1000;
export const IMAGE_PADDING_Y = 50;
export const HELMET_VIEW_X = 512;
export const HELMET_VIEW_Y = 976;
export const LYRE_VIEW_X = 688;
export const LYRE_VIEW_Y = 688;
export const GRAVESTONES_VIEW_X = 688;
export const GRAVESTONES_VIEW_Y = 512;

const page = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const helmetRef = useRef<HTMLDivElement>(null);
    const [helmetSVGPoints, setHelmetSVGPoints] = useState<SVGPoint[]>([]);
    const lyreRef = useRef<HTMLDivElement>(null);
    const [lyreSVGPoints, setLyreSVGPoints] = useState<SVGPoint[]>([]);
    const gravestonesRef = useRef<HTMLDivElement>(null);
    const [gravestonesSVGPoints, setGravestonesSVGPoints] = useState<SVGPoint[]>([]);
    const [animationSpeed, setAnimationSpeed] = useState(0.5);
    const { width, height } = useScreenSize();
    const [step, setStep] = useState(0);

    const getInitialPoints = () => {
        const temp: Point[] = [];

        for (let i = 0; i < NUM_POINTS; i++) {
            const xPercent = Math.random();
            const yPercent = Math.random();

            const x = xPercent * width;
            const y = yPercent * height;

            temp.push({ x, y, lastMoved: undefined });
        }

        return temp;
    };

    useEffect(() => {
        const temp: Point[] = getInitialPoints();

        setPoints([...temp]);
    }, [width, height]);

    // useEffect(() => {
    //     const getMousePosition = (e: MouseEvent) => {
    //         if (!canMovePoints) return;
    //         const { x, y } = e;

    //         const tempPoints = points
    //             .map((p, index) => (x >= p.x - MOUSE_RADIUS && x <= p.x + MOUSE_RADIUS && y >= p.y - MOUSE_RADIUS && y <= p.y + MOUSE_RADIUS ? { ...p, index } : null))
    //             .filter((p) => p !== null)
    //             .filter((p) => !p.lastMoved || performance.now() - p.lastMoved > 2000);

    //         for (const { x: pointX, y: pointY, index } of tempPoints) {
    //             const xDistance = Math.abs(x - pointX);
    //             const yDistance = Math.abs(y - pointY);

    //             const offsetX = (xDistance / MOUSE_RADIUS) * 10;
    //             const offsetY = (yDistance / MOUSE_RADIUS) * 10;
    //             const xPos = prevMousePosition.x <= x;
    //             const yPos = prevMousePosition.y <= y;

    //             setPoints((prev) => {
    //                 const temp = [...prev];
    //                 temp[index].x += xPos ? offsetX : -offsetX;
    //                 temp[index].y += yPos ? offsetY : -offsetY;
    //                 temp[index].lastMoved = performance.now();
    //                 return prev;
    //             });
    //         }

    //         setPrevMousePosition({ x, y });
    //     };

    //     window.addEventListener('mousemove', getMousePosition);

    //     return () => {
    //         window.removeEventListener('mousemove', getMousePosition);
    //     };
    // });

    const move = (svgRef: React.RefObject<HTMLDivElement | null>, svgPoints: SVGPoint[], viewX: number, viewY: number) => {
        const svgWidth = svgRef.current?.clientWidth;
        const svgHeight = svgRef.current?.clientHeight;
        if (!svgWidth || !svgHeight) return;
        setAnimationSpeed(5);

        const startX = (width - svgWidth) / 2;
        const startY = (height - svgHeight) / 2;

        if (svgPoints.length === NUM_POINTS) {
            const positions = Array.from({ length: NUM_POINTS }, (_, i) => i);
            positions.sort(() => Math.random() - 0.5);

            setPoints((prev) =>
                prev.map((p, i) => {
                    let index = positions[i];

                    const newX = (svgPoints[index].x / viewX) * svgWidth + startX;
                    const newY = (svgPoints[index].y / viewY) * svgHeight + startY;
                    return { ...p, animate: true, x: newX, y: newY };
                })
            );
        }
    };

    const navigation = (direction: 'next' | 'previous') => {
        let newStep = step + (direction === 'next' ? 1 : -1);
        newStep = newStep < 0 ? 0 : newStep;

        if (newStep === 1) {
            move(lyreRef, lyreSVGPoints, LYRE_VIEW_X, LYRE_VIEW_Y);
            setStep(newStep);
        } else if (newStep === 2) {
            move(helmetRef, helmetSVGPoints, HELMET_VIEW_X, HELMET_VIEW_Y);
            setStep(newStep);
        } else if (newStep === 3) {
            move(gravestonesRef, gravestonesSVGPoints, GRAVESTONES_VIEW_X, GRAVESTONES_VIEW_Y);
            setStep(newStep);
        } else if (newStep === 4) {
            const temp: Point[] = getInitialPoints();
            setAnimationSpeed(1);

            setPoints([...temp]);
            setStep(0);
        }
    };

    const refresh = () => {
        const temp: Point[] = getInitialPoints();
        setAnimationSpeed(1);

        setPoints([...temp]);
    };

    return (
        <GradientBackground className='w-full h-full flex flex-col items-center justify-center overflow-hidden' gradient='from-primary via-black to-primary'>
            {points.length === NUM_POINTS && points.map((point, index) => <PointElement key={index} animationSpeed={animationSpeed} point={point} index={index} />)}
            <div className='absolute left-10 top-10 flex rounded-full bg-black shadow-sm shadow-primary z-50'>
                <Link href='/' className='py-3 px-6 rounded-full cursor-pointer hover:bg-gray-800 transition-colors'>
                    <Home className='text-white w-6 h-6' strokeWidth={2.5} />
                </Link>
                <div onClick={() => navigation('previous')} className='py-3 px-6 rounded-full cursor-pointer hover:bg-gray-800 transition-colors'>
                    <SkipBack className='text-white w-6 h-6' strokeWidth={2.5} />
                </div>
                <div onClick={() => navigation('next')} className='py-3 px-6 rounded-full cursor-pointer hover:bg-gray-800 transition-colors'>
                    <SkipForward className='text-white w-6 h-6' strokeWidth={2.5} />
                </div>
                <div onClick={refresh} className='py-3 px-6 rounded-full cursor-pointer w-18 relative hover:bg-gray-800 transition-colors'>
                    <div className='absolute cursor-pointer top-4 right-10 w-1.5 h-1.5 bg-white rounded-full' />
                    <div className='absolute cursor-pointer top-7 right-9 w-1.5 h-1.5 bg-white rounded-full' />
                    <div className='absolute cursor-pointer top-5 right-6 w-1.5 h-1.5 bg-white rounded-full' />
                </div>
            </div>
            <LyreSVG lyreRef={lyreRef} setPoints={setLyreSVGPoints} />
            <HelmetSVG helmetRef={helmetRef} setPoints={setHelmetSVGPoints} />
            <GravestonesSVG gravestonesRef={gravestonesRef} setPoints={setGravestonesSVGPoints} />
        </GradientBackground>
    );
};

const PointElement = ({ point, index, animationSpeed }: { point: Point; index: number; animationSpeed: number }) => {
    return (
        <motion.div className='w-1 h-1 rounded-full absolute' animate={{ left: point.x, top: point.y }} transition={{ duration: animationSpeed, type: 'spring', bounce: 0.05 }}>
            <motion.div
                className='w-1 h-1 absolute bg-white/80 rounded-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 0.9, 0.1, 0.5] }}
                transition={{ duration: Math.random() * 7 + 3, ease: 'easeInOut', repeat: Infinity, delay: Math.random() }}
            ></motion.div>
        </motion.div>
    );
};

export default page;
