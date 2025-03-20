import React, { useEffect, useRef, useState } from 'react';

interface TaskPathProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    onAnimationComplete: () => void;
}

const TaskPath: React.FC<TaskPathProps> = ({
                                               startX, startY, endX, endY, onAnimationComplete
                                           }) => {
    const maskPathRef = useRef<SVGPathElement>(null);
    const [animationPhase, setAnimationPhase] = useState<'draw' | 'fade' | 'complete'>('draw');
    const d = `M ${startX} ${startY} L ${endX} ${endY}`;
    const maskId = `mask-${startX}-${startY}-${endX}-${endY}`;

    // Calculate path length and animation duration
    const pixelsPerSecond = 100;
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const drawDuration = distance / pixelsPerSecond;
    const fadeDuration = drawDuration * 0.8; // Fade out a bit faster than draw in

    useEffect(() => {
        const maskPath = maskPathRef.current;
        if (!maskPath) return;

        const pathLength = maskPath.getTotalLength();

        if (animationPhase === 'draw') {
            // Initial drawing animation
            maskPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
            maskPath.style.strokeDashoffset = `${pathLength}`;
            maskPath.getBoundingClientRect(); // Force layout recalculation

            maskPath.style.transition = `stroke-dashoffset ${drawDuration}s linear`;
            maskPath.style.strokeDashoffset = '0';

            const timer = setTimeout(() => {
                setAnimationPhase('fade');
            }, drawDuration * 1000);

            return () => clearTimeout(timer);
        }
        else if (animationPhase === 'fade') {
            // Fade out animation (disappear from start)
            maskPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
            maskPath.style.strokeDashoffset = '0';
            maskPath.getBoundingClientRect(); // Force layout recalculation

            maskPath.style.transition = `stroke-dashoffset ${fadeDuration}s linear`;
            maskPath.style.strokeDashoffset = `-${pathLength}`; // Negative value makes it disappear from start

            const timer = setTimeout(() => {
                setAnimationPhase('complete');
                onAnimationComplete();
            }, fadeDuration * 1000);

            return () => clearTimeout(timer);
        }
    }, [drawDuration, fadeDuration, onAnimationComplete, animationPhase]);

    return (
        <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
        >
            <defs>
                <mask id={maskId}>
                    <rect x="0" y="0" width="100%" height="100%" fill="black" />
                    <path
                        ref={maskPathRef}
                        d={d}
                        fill="none"
                        stroke="white"
                        strokeWidth={6}
                        strokeLinecap="round"
                    />
                </mask>
            </defs>
            <path
                d={d}
                fill="none"
                stroke="#262525"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="10 15"
                mask={`url(#${maskId})`}
            />
        </svg>
    );
};

export default TaskPath;