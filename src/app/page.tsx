"use client";

import Image from "next/image";
import Link from "next/link";

import Autoplay from "embla-carousel-autoplay";

import Autoscroll from "@/components/molecules/autoscroll";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { BannerImages, PromisesList } from "@/config/base.config";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen h-full gap-12 pb-2">
      <Autoscroll />
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent>
          {BannerImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[calc(100vh-80px)] md:h-[calc(100vh-140px)] pb-2 bg-custom-green">
                <Image
                  className="w-full h-full object-cover"
                  src={image.src}
                  alt={image.alt}
                  width={1920}
                  priority
                  height={1080}
                />
                <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 max-w-3xl px-4 md:px-0">
                  <div className="space-y-4 md:space-y-6">
                    {image.title}
                    <p className="text-sm md:text-lg text-white/90 leading-relaxed font-light w-full md:w-2/3">
                      {image.description}
                    </p>
                    <Link href="/contact-us">
                        <Button
                        className="bg-custom-green hover:bg-custom-green/90 text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-normal rounded-sm"
                        size="lg"
                      >
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <section className="flex flex-col items-center justify-center w-full max-w-screen-2xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-center gap-8 md:gap-12">
          {PromisesList.map((promise, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start justify-center gap-4 text-center md:text-left"
            >
              <Image
                src={promise.icon}
                alt={promise.title}
                width={100}
                height={100}
                loading="lazy"
                className="w-16 h-16 md:w-20 md:h-20 -ml-1"
              />
              <h2 className="text-xl md:text-2xl font-bold">{promise.title}</h2>
              <p className="text-sm text-gray-500 max-w-sm">{promise.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full max-w-screen-2xl mx-auto relative mt-8 md:mt-12">
        <Image
          src="/assets/home/section_banner.svg"
          alt="section banner"
          width={100}
          loading="lazy"
          height={120}
          className="w-full h-64 md:h-full relative z-0 object-cover"
        />
        <section className="w-full h-full z-10 absolute top-0 left-0 flex flex-row items-center justify-center px-4 md:px-12 bg-black/20 md:pb-14">
          <Image
            src="/assets/home/owner_worker_image.svg"
            objectFit="cover"
            alt="Owner"
            width={100}
            loading="lazy"
            height={120}
            className="w-80 h-[calc(100%+110px)] z-10 hidden md:block"
          />
          <section className="flex flex-col items-center md:items-start justify-center w-full md:pl-20 gap-4 text-left">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-semibold text-white">
              Danat Alkun Steel Engineering
            </h2>
            <p className="text-lg lg:text-2xl xl:text-3xl text-white">
              All kinds of steel fabrication.
            </p>
            <Link href="/contact-us">
              <Button
              className="bg-custom-green hover:bg-custom-green/90 text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-normal rounded-sm mt-4 md:mt-8"
              size="lg"
            >
              Contact Us
            </Button>
            </Link>
          </section>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center w-full max-w-screen-2xl mx-auto px-4 md:px-12 py-2 md:w-9/12">
        <p className="text-xl md:text-4xl text-stone-600 font-semibold w-full text-center md:text-left">
         <strong className="text-custom-green"> Made for you</strong> — from Price to Perks. Grab your Personalized Quote now.
        </p>
        <Link href="/contact-us">
          <Button
          className="bg-custom-green hover:bg-custom-green/90 text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-normal rounded-sm mt-4 md:mt-8 self-start"
          size="lg"
        >
          Request a Quote
        </Button>
        </Link>
      </section>
    </section>
  );
}
