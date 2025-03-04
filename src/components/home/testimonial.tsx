import {
  MotionInView,
  varFadeInRight,
  varFadeInLeft,
  varFadeInDown,
} from "../animate";
import Image from "next/image";
import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import SlickSlider, { Settings } from "react-slick";

const Slider: any = SlickSlider;

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <MotionInView variants={varFadeInRight}>
      <div className={className} onClick={onClick}>
        <HiOutlineArrowNarrowRight size={36} className="text-primary" />
      </div>
    </MotionInView>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <MotionInView variants={varFadeInLeft}>
      <div className={className} onClick={onClick}>
        <HiOutlineArrowNarrowLeft size={36} className="text-primary" />
      </div>
    </MotionInView>
  );
}

export default function OurCustomers() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <section className="relative overflow-hidden py-6 md:py-20 ">
      <div className="container mx-auto">
        <div className="text-start mb-10">
          <MotionInView variants={varFadeInRight}>
            <h1 className="text-primary font-PPPangramSans text-[24px] md:text-[72px] font-[600]">
              What users say
            </h1>
          </MotionInView>
        </div>
        <Slider className="mt-10 md:mt-20 pb-20" {...settings}>
          {[
            {
              id: 1,
              text: "“Receiving beats used to be overwhelming, and managing files felt like a chore. I tried a dedicated email for loops, but reviewing each file was time-consuming. Stems transformed my workflow, allowing me to concentrate on creating hits.”",
              name: "AusGod, artist & producer",
              image: "/assets/Ausgod_400x400.jpg",
            },
            {
              id: 2,
              text: "“Stems has revolutionized the way I handle my music projects. The ease of use and the ability to receive everything in one place is a game-changer.”",
              name: "Othello, music producer",
              image: "/assets/Othello_400x400.jpg",
            },
          ].map((item) => (
            <div key={item.id} className="relative">
              <p className="text-[14.02px] font-PPPangramSans  md:text-[36px] text-center">
                {item.text}
              </p>
              <MotionInView variants={varFadeInLeft}>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="relative rounded-full h-[40px] md:h-[96px] w-[40px] md:w-[96px]">
                    <Image
                      className=" rounded-full"
                      src={item.image}
                      alt="avatar"
                      fill
                      sizes="100vw"
                      placeholder="blur"
                      objectFit="cover"
                      blurDataURL={item.image}
                    />
                  </div>

                  <div className="text-[16.02px] font-PPPangramSans text-primary md:text-[36px]">
                    <div>{item.name}</div>
                  </div>
                </div>
              </MotionInView>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
