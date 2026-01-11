'use client';

import { GradientBackground } from '@/lib/GradientBackground';
import Link from 'next/link';
// 1728px
const page = () => {
    return (
        <GradientBackground className='w-full h-full flex flex-col items-center justify-center' gradient='from-primary via-black to-primary'>
            <div className='flex flex-col gap-12 items-center'>
                <h1 className='text-primary font-fascinate text-[8vw] primary-text-shadow'>The Song of Achilles</h1>
                <div className='flex items-center gap-3'>
                    <span className='text-primary bg-background py-2 px-8 text-[2vw] rounded-[18px] primary-dark-border font-extrabold font-nunito tracking-wide'>
                        By Tristan Marston
                    </span>
                    <Link
                        href='/animation'
                        className='text-background bg-primary py-2 px-8 text-[2vw] rounded-[18px] primary-dark-border-hover font-extrabold font-nunito tracking-wide cursor-pointer'
                    >
                        Start Animation
                    </Link>
                </div>
            </div>
        </GradientBackground>
    );
};

export default page;
