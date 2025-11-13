import Image from "next/image";
import Autoscroll from "@/components/molecules/autoscroll";
import { gallery } from "@/lib/content.json";

export default function GalleryPage() {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen h-full gap-12 pb-8">
      <Autoscroll />
      <section className="flex items-center justify-center w-full relative pb-2 bg-custom-green">
        <Image
          src={gallery.main.image}
          alt="Gallery"
          width={100}
          priority
          height={100}
          className="w-full h-full object-fill"
        />
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-3xl px-4 md:px-0 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-6xl font-bold text-white">
            {gallery.main.heading}
          </h1>
          <p className="text-sm md:text-lg text-white">
            {gallery.main.sub_heading}
          </p>
        </section>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 w-full xl:max-w-screen-2xl mx-auto px-4 md:px-12 gap-10">
        <section className="flex items-center justify-start w-full h-full col-span-1 md:col-span-2">
          <h2 className="text-2xl md:text-4xl font-bold text-custom-green">
            {gallery.content.heading}
          </h2>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 w-full h-full gap-8 md:gap-20 col-span-2 items-start justify-between place-content-between">
          {gallery.content.works.map((work, index) => (
            <section
              key={index}
              className="w-full h-full flex flex-col items-center justify-center border shadow-md max-h-[420px]"
            >
              <Image
                src={work.image}
                alt={work.name}
                width={100}
                loading="lazy"
                height={100}
                className="w-full h-full object-cover max-h-[300px]"
                quality={100}
              />
              <p className="text-lg text-slate-800 font-semibold py-8 text-center bg-white">
                {work.name}
              </p>
            </section>
          ))}
          <section
            className="w-full h-full flex flex-col items-center justify-center border shadow-md max-h-[420px] relative"
          >
            <Image
              src={gallery.content.more.image}
              alt={gallery.content.more.name}
              width={100}
              loading="lazy"
              height={100}
              className="w-full h-full object-cover"
              quality={100}
            />
            <section className="absolute bottom-0 left-0 w-full h-full bg-black/25 flex flex-col items-center justify-center">
              <p className="text-xl text-white font-semibold py-8 text-center">
                {gallery.content.more.name}
              </p>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
