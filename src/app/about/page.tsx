import Image from "next/image";
import Autoscroll from "@/components/molecules/autoscroll";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { about } from "@/lib/content.json";
export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen h-full gap-12 pb-4">
      <Autoscroll />
      <section className="flex items-center justify-center w-full relative pb-2 bg-custom-green">
        <Image
          src={about.main.image}
          alt="About Us"
          width={100}
          loading="lazy"
          height={100}
          className="w-full h-full object-fill"
        />
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-3xl px-4 md:px-0 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-6xl font-bold text-white">
            {about.main.heading}
          </h1>
          <p className="text-sm md:text-lg text-white">
            {about.main.sub_heading}
          </p>
        </section>
      </section>
      <section className="grid grid-cols-2 w-full xl:max-w-screen-2xl mx-auto px-4 md:px-12">
        <section className="flex flex-col items-start justify-start w-full gap-1 leading-7 col-span-2 md:col-span-1">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-300">
            {about.who_we_are.heading}
          </h2>
          <h2 className="text-2xl text-custom-green font-semibold">
            {about.who_we_are.sub_heading}
          </h2>
          <section className="text-slate-800 flex flex-col items-start justify-start gap-10 mt-8">
            <p>
              {about.who_we_are.sub_title}{" "}
              <strong>{about.who_we_are.strong_text}</strong>{" "}
              {about.who_we_are.description}
            </p>
            {about.who_we_are.sub_description.map((item, index) => (
              <p key={index}>{item.text}</p>
            ))}
          </section>
        </section>
        <section className="w-full h-full relative md:flex hidden flex-col items-center justify-center col-span-2 md:col-span-1">
          <Image
            src="/assets/about/steel_steps.svg"
            className="h-full w-full max-w-[340px] max-h-[340px]"
            width={100}
            loading="lazy"
            height={100}
            alt="Steps"
          />
          <Image
            src="/assets/about/storage_tank.svg"
            className="h-full w-full max-w-[240px] max-h-[240px] absolute top-7/12 left-[65%]"
            width={100}
            loading="lazy"
            height={100}
            alt="Steps"
          />
          <Card className="w-full h-full rounded-lg absolute top-8/12 left-5/12 max-w-[200px] max-h-[120px]">
            <CardContent className="flex flex-col items-center justify-center gap-2 text-center">
              <h2 className="text-3xl font-semibold text-custom-green">25+</h2>
              <p className="text-slate-600">Years of Experience</p>
            </CardContent>
          </Card>
        </section>
      </section>
      <section className="flex items-center justify-center w-full xl:max-w-screen-2xl mx-auto md:px-12 relative h-full min-h-max">
        <Image
          src={about.our_mission.background_image}
          alt="Our Mission"
          width={100}
          loading="lazy"
          height={100}
          className="w-full h-full object-cover relative z-0 hidden md:block"
        />
        <section className="md:absolute top-0 left-0 w-full h-full min-h-max flex md:flex-row flex-col items-center justify-center gap-4 xl:max-w-screen-2xl md:px-12">
          <Image
            src={about.our_mission.image}
            alt="Our Mission"
            width={100}
            loading="lazy"
            height={100}
            className="w-full h-full object-cover relative z-10"
          />
          <section className="flex flex-col items-start justify-center gap-1 md:text-white text-slate-600 md:p-10 leading-8">
            <p className="italic font-semibold md:block hidden">{about.our_mission.quote}</p>
            <p className="md:block hidden">{about.our_mission.quote_description}</p>
            <p className="md:block hidden">{about.our_mission.sub_quote}</p>
            <p className="md:block hidden">{about.our_mission.sub_quote_description}</p>
          </section>
          <section className="md:hidden flex flex-col items-start justify-end gap-1 absolute bg-black/40 top-0 left-0 w-full h-[97%] z-10">
            <p className="text-sm md:text-base p-2 md:p-0 text-white">{`"${about.our_mission.sub_quote}"`}</p>
          </section>
        </section>
      </section>
      <section className="flex flex-col md:grid md:grid-cols-12 justify-center w-full xl:max-w-screen-2xl mx-auto px-4 md:px-12 relative">
        <section className="col-span-3 w-full h-full flex items-center justify-center">
          <Image
            src={about.our_vision.image}
            alt="Space Rocket"
            width={100}
            loading="lazy"
            height={100}
            className="w-full h-full object-cover relative z-0"
          />
        </section>
        <section className="col-span-9 flex flex-col items-start justify-center text-white leading-8 mt-4 md:mt-0 gap-8 md:py-12 md:pl-12 md:w-10/12 w-full">
          <p className="text-slate-600">
            <strong className="text-custom-green font-bold text-2xl">
              {about.our_vision.highlight_text}
            </strong>{" "}
            {about.our_vision.description}
          </p>
          {about.our_vision.sub_description.map((item, index) => (
            <p className="text-slate-600" key={index}>
              {item.text}
            </p>
          ))}
        </section>
      </section>
      <section className="flex flex-col items-start justify-center w-full xl:max-w-screen-2xl mx-auto px-4 md:px-12 relative gap-4">
        {about.policy.map((item, index) => (
          <Accordion
            className="w-full border rounded-lg p-3"
            collapsible
            type="single"
            key={index}
          >
            <AccordionItem value={item.heading}>
              <AccordionTrigger className="text-lg font-semibold text-slate-700">
                {item.heading}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-8">
                <p>{item.description}</p>
                {item.sub_description &&
                  item.sub_description.map((subItem, subIndex) => (
                    <p key={subIndex}>• {subItem}</p>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
    </section>
  );
}
