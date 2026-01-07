'use client';

import { GradientBackground } from '@/lib/GradientBackground';

const page = () => {
    return (
        <GradientBackground className='w-full h-full flex flex-col items-center justify-center' gradient='from-gray-700 via-black to-gray-500'>
            <div className='flex flex-col gap-12 items-center'>
                <h1 className='text-primary font-fascinate text-[100px] primary-text-shadow'>The Song of Achilles</h1>
                <div className='flex items-center gap-3'>
                    <span className='text-primary bg-background py-2 px-8 text-2xl rounded-[10px] primary-dark-border font-bold font-figtree'>By Tristan Marston</span>
                    <span className='text-background bg-primary py-2 px-8 text-2xl rounded-[10px] primary-dark-border-hover font-bold font-figtree cursor-pointer'>
                        Start Animation
                    </span>
                </div>
            </div>
        </GradientBackground>
    );
};

export default page;
