"use client";
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { Icon } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { ...restProps } = props;

  return (
    <button className="embla__button embla__button--prev disabled:opacity-20 disabled:cursor-not-allowed" type="button" {...restProps}>
      <Icon size={"lg"}>
        <HiChevronLeft />
      </Icon>
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className="embla__button embla__button--next disabled:opacity-20 disabled:cursor-not-allowed" type="button" {...restProps}>
      <Icon size={"lg"}>
        <HiChevronRight />
      </Icon>
    </button>
  );
};
