'use client';

import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { cn } from '@/lib/utils';

import 'swiper/css';

interface CarouselAutoScrollProps {
    items: React.ReactNode[];
    speed?: number;
    spaceBetween?: number;
    className?: string;
    pauseOnHover?: boolean;
}

export function CarouselAutoScroll({
    items,
    speed = 3000,
    spaceBetween = 20,
    className,
    pauseOnHover = true,
}: CarouselAutoScrollProps) {
    return (
        <div
            className={cn(
                'relative w-full overflow-hidden rounded-xl border border-border/40 bg-card/15 py-4',
                className,
            )}
        >
            <Swiper
                modules={[Autoplay]}
                speed={speed}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: pauseOnHover,
                }}
                loop={true}
                allowTouchMove={true}
                slidesPerView="auto"
                spaceBetween={spaceBetween}
                className="[&>.swiper-wrapper]:!transition-timing-function-[linear] w-full [&>.swiper-wrapper]:!ease-linear"
            >
                {items.map((item, idx) => (
                    <SwiperSlide
                        key={idx}
                        className="flex w-auto items-center justify-center"
                    >
                        <div className="shrink-0 select-none">{item}</div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default CarouselAutoScroll;
