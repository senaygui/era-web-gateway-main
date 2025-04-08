
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';

// Types for carousel slides
export interface BaseSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface HeroSlide extends BaseSlide {
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
}

export interface CategorySlide extends BaseSlide {
  category: string;
}

export type CarouselSlide = HeroSlide | CategorySlide;

// Function to check if slide has a category (type guard)
export function hasCategory(slide: CarouselSlide): slide is CategorySlide {
  return 'category' in slide;
}

// Function to check if slide has secondary CTA (type guard)
export function hasSecondaryCta(slide: CarouselSlide): slide is HeroSlide {
  return 'ctaSecondaryText' in slide;
}

interface HeroCarouselProps {
  slides: CarouselSlide[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Set up auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 1000); // Auto-slide every 1 second

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden bg-black">
      <Carousel className="w-full" setApi={(api) => emblaApi} ref={emblaRef}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[50vh] md:h-[60vh] lg:h-[80vh] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0" 
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                <div className="relative z-20 container mx-auto h-full flex items-center">
                  <div className="text-white max-w-2xl p-4 md:p-6">
                    {hasCategory(slide) && (
                      <span className="inline-block bg-era-orange text-white px-3 py-1 rounded-md text-sm font-medium mb-4">
                        {slide.category}
                      </span>
                    )}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-white/80 text-lg mb-6">{slide.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <Link to={slide.ctaLink}>
                        <Button className="bg-era-orange hover:bg-era-orange/90">
                          {slide.ctaText}
                        </Button>
                      </Link>
                      {hasSecondaryCta(slide) && (
                        <Link to={slide.ctaSecondaryLink}>
                          <Button variant="outline" className="text-black border-white hover:bg-white/10">
                            {slide.ctaSecondaryText}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="container mx-auto relative">
          <CarouselPrevious className="absolute left-4 z-30" />
          <CarouselNext className="absolute right-4 z-30" />
        </div>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
