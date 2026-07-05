import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '@/lib/utils';
import type { ReviewItem} from './review-card';
import { ReviewCard } from './review-card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ReviewCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    reviews: ReviewItem[];
    autoplay?: boolean;
    autoplayDelay?: number;
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
}

export function ReviewCarousel({
    reviews,
    autoplay = true,
    autoplayDelay = 5000,
    slidesPerView = 1,
    spaceBetween = 24,
    className,
    ...props
}: ReviewCarouselProps) {
    const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const handlePrev = () => {
        swiper?.slidePrev();
    };

    const handleNext = () => {
        swiper?.slideNext();
    };

    const handleDotClick = (index: number) => {
        swiper?.slideTo(index);
    };

    const modules = [];

    if (autoplay) {
        modules.push(Autoplay);
    }

    modules.push(Pagination, Navigation);

    return (
        <div
            className={cn(
                'group relative mx-auto w-full max-w-5xl px-4 py-8 select-none',
                className,
            )}
            {...props}
        >
            <div className="relative overflow-visible">
                <Swiper
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                    modules={modules}
                    spaceBetween={spaceBetween}
                    slidesPerView={slidesPerView}
                    centeredSlides={slidesPerView === 1 ? false : true}
                    loop={reviews.length > 2}
                    autoplay={
                        autoplay
                            ? {
                                  delay: autoplayDelay,
                                  disableOnInteraction: false,
                                  pauseOnMouseEnter: true,
                              }
                            : false
                    }
                    breakpoints={{
                        640: {
                            slidesPerView: Math.min(
                                slidesPerView === 'auto'
                                    ? 2
                                    : (slidesPerView as number),
                                2,
                            ),
                        },
                        1024: {
                            slidesPerView:
                                slidesPerView === 'auto'
                                    ? 3
                                    : (slidesPerView as number),
                        },
                    }}
                    className="w-full"
                >
                    {reviews.map((review) => (
                        <SwiperSlide
                            key={review.id}
                            className="flex h-auto py-2"
                        >
                            <ReviewCard
                                review={review}
                                showQuoteIcon
                                className="h-full w-full flex-1"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Styled Arrow Navigation (shown on hover) */}
                {reviews.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute top-1/2 -left-4 z-20 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 shadow-xs transition-all group-hover:opacity-100 hover:bg-muted hover:text-foreground active:scale-90"
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute top-1/2 -right-4 z-20 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 shadow-xs transition-all group-hover:opacity-100 hover:bg-muted hover:text-foreground active:scale-90"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </>
                )}
            </div>

            {/* Custom styled slider dot indicators */}
            {reviews.length > 1 && (
                <div className="mt-6 flex items-center justify-center gap-1.5">
                    {reviews.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className={cn(
                                'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                                activeIndex === idx
                                    ? 'w-5 bg-primary'
                                    : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60',
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
