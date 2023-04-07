"use client";
import { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import "./slider.css";
export interface SlideItemType {
  image: string;
  title: string;
  description: string;
}

interface PropsType {
  slides: Array<SlideItemType>;
}

const Slide = ({ image, title, description }: SlideItemType) => {
  useEffect(() => {}, []);
  return (
    <div className="bg-[#f7f7f7] fade-in-delay-0">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="h-[calc(100vh-60px)] bg-no-repeat bg-right"
      >
        <div className="w-[400px] absolute left-[10%] top-[50%] translate-y-[-50%]">
          <h2 className="text-4xl font-normal fade-in-delay-3 mb-5">{title}</h2>
          <p className="font-light text-justify fade-in-delay-5">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Slider = ({ slides }: PropsType) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const nextSlideHandler = () => {
    if (slideNumber < slides.length - 1) {
      setSlideNumber(slideNumber + 1);
    } else {
      setSlideNumber(0);
    }
  };
  const previousSlideHandler = () => {
    if (slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
    } else {
      setSlideNumber(slides.length - 1);
    }
  };
  return (
    <div>
      {slides.map((slide, index) => {
        return slideNumber === index ? (
          <Slide
            key={index}
            image={slide.image}
            title={slide.title}
            description={slide.description}
          />
        ) : (
          ""
        );
      })}

      <div
        onClick={previousSlideHandler}
        className="w-[50px]
        h-[50px]
        absolute
        left-10
        top-[50%]
        translate-y-[-50%]
        bg-red-400 text-center
        rounded-full
        grid
        justify-center
        items-center text-white
        cursor-pointer
        hover:scale-125
        transition-transform"
      >
        <MdNavigateNext className="rotate-180" />
      </div>
      <div
        onClick={nextSlideHandler}
        className="w-[50px]
        h-[50px]
        absolute
        right-10
        top-[50%]
        translate-y-[-50%]
        bg-red-400 text-center
        rounded-full
        grid
        justify-center
        items-center
        text-white
        cursor-pointer
        hover:scale-125
        transition-transform"
      >
        <MdNavigateNext />
      </div>
    </div>
  );
};

export default Slider;
