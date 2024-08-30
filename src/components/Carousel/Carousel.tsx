'use client';

import React, { ReactNode } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { PrevButton, NextButton, usePrevNextButtons } from './CarouselArrowButton';
import useEmblaCarousel from 'embla-carousel-react';
import './embla.css';

interface Props {
  children: ReactNode;
  options?: EmblaOptionsType;
}

function Carousel({ children, options }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla flex items-center">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="embla__viewport mx-1" ref={emblaRef}>
        <div className="embla__container gap-3">{children}</div>
      </div>
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </section>
  );
}

export default Carousel;
