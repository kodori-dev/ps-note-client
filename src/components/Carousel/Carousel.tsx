'use client';

import React, { ReactNode, useEffect, useState } from 'react';
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
  const [isClient, setIsClient] = useState(false);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <section className="embla flex items-center w-full">
      {isClient && <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container gap-2 w-[910px]">{children}</div>
      </div>
      {isClient && <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />}
    </section>
  );
}

export default Carousel;
