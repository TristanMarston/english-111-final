'use client';

import * as React from 'react';
import { HTMLMotionProps, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

type GradientBackgroundProps = HTMLMotionProps<'div'> & {
    animated?: boolean;
    gradient?: string;
    transition?: Transition;
};

function GradientBackground({
    className,
    gradient = 'from-primary-light/75 via-primary/75 to-primary-light/75',
    animated = true,
    transition = { duration: 20, ease: 'easeInOut', repeat: Infinity },
    ...props
}: GradientBackgroundProps) {
    return (
        <motion.div
            data-slot='gradient-background'
            className={cn('size-full bg-gradient-to-br', gradient, animated ? 'bg-[length:400%_400%]' : 'w-full h-auto', className)}
            animate={
                animated
                    ? {
                          //   backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                          backgroundPosition: ['0% 25%', '25% 25%', '25% 50%', '50% 50%', '75% 50%', '100% 50%', '75% 50%', '50% 75%', '50% 100%', '25% 75%', '0% 50%', '0% 25%'],
                      }
                    : {}
            }
            transition={transition}
            {...props}
        />
    );
}

export { GradientBackground, type GradientBackgroundProps };
