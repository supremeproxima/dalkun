import Image from "next/image";
import Autoscroll from "@/components/molecules/autoscroll";
import { products } from "@/lib/content.json";

export default function ProductsPage() {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen h-full gap-12 pb-4">
      <Autoscroll />
      <section className="flex items-center justify-center w-full pb-2 bg-custom-green relative">
        <Image
          src={products.main.image}
          alt="Products"
          width={100}
          loading="lazy"
          priority
          height={100}
          className="w-full h-full object-fill"
        />
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-3xl px-4 md:px-0 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-6xl font-bold text-white">
            {products.main.heading}
          </h1>
          <p className="text-sm md:text-lg text-white">
            {products.main.sub_heading}
          </p>
        </section>
      </section>
      <section className="flex w-full max-w-screen-2xl mx-auto px-4 md:px-12">
        <span className="w-full h-full flex items-center justify-start">
          <h2 className="text-2xl md:text-4xl font-bold text-custom-green">
            {products.range.heading}
          </h2>
        </span>
      </section>
      <section className="flex flex-col items-center justify-center w-full max-w-screen-2xl mx-auto px-4 md:px-12">
        <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full gap-4">
          {products.range.products.map((product, index) => (
            <div
              key={index}
              className="w-full h-full flex items-end justify-between border"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                loading="lazy"
                height={100}
                className="object-contain w-60 h-52"
              />
              <p className="text-sm font-medium text-slate-700 p-3">
                {product.name}
              </p>
            </div>
          ))}
        </section>
      </section>
      <section className="flex flex-col items-center justify-center w-full max-w-screen-2xl mx-auto px-4 md:px-12 mt-12">
        <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full gap-4">
          <section className="flex flex-col items-start justify-start">
            <h1 className="text-2xl font-bold text-slate-400">
              {products.machineries.heading}
            </h1>
            <h1 className="text-2xl md:text-lg text-custom-green">
              {products.machineries.sub_heading}
            </h1>
          </section>
          {products.machineries.lists.map((product, index) => (
            <section
              key={index}
              className="w-full h-full flex items-center justify-center relative group cursor-pointer"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                loading="lazy"
                height={100}
                className="object-contain w-10/12 h-10/12 transition-transform duration-300 group-hover:scale-105"
              />
              <section className="absolute inset-0 w-full h-full bg-stone-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start z-10">
                <p className="text-lg md:text-2xl font-bold text-white p-4 md:p-6 capitalize">
                  {product.name}
                </p>
              </section>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}
