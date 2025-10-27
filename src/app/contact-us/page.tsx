"use client";

import Autoscroll from "@/components/molecules/autoscroll";
import Image from "next/image";
import { contact } from "@/lib/content.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Smartphone, MapPin, Mail } from "lucide-react";
import { useState } from "react";

const iconMap = {
  phone: Phone,
  smartphone: Smartphone,
  "map-pin": MapPin,
  mail: Mail,
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="flex flex-col items-center justify-start min-h-screen h-full gap-16 pb-8">
      <Autoscroll />
      <section className="flex items-center justify-center w-full relative pb-2 bg-custom-green">
        <Image
          src={contact.main.image}
          alt="Contact"
          width={100}
          height={100}
          className="w-full h-full object-fill"
        />
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-3xl px-4 md:px-0 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-6xl font-bold text-white">
            {contact.main.heading}
          </h1>
          <p className="text-sm md:text-lg text-white">
            {contact.main.sub_heading}
          </p>
        </section>
      </section>
      <section className="w-full max-w-screen-2xl mx-auto px-4 md:px-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-custom-green mb-4">
                {contact.info.heading}
              </h2>
              <p className="text-gray-600 text-lg w-5/6">
                {contact.info.sub_heading}
              </p>
            </div>

            <div className="space-y-6 flex flex-col items-start justify-start gap-8">
              {contact.info.details.map((detail, index) => {
                const IconComponent = iconMap[detail.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-custom-green rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {detail.label}
                      </h3>
                      <p className="text-gray-600">
                        {detail.value}
                      </p>
                      {detail.secondary_value && (
                        <p className="text-gray-600">
                          {detail.secondary_value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-green-50 rounded-xl p-8 max-h-fit md:mt-14">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {contact.form.fields.name.label}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={contact.form.fields.name.placeholder}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white rounded-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {contact.form.fields.email.label}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={contact.form.fields.email.placeholder}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white rounded-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {contact.form.fields.phone.label}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={contact.form.fields.phone.placeholder}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-white rounded-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {contact.form.fields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={contact.form.fields.message.placeholder}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-custom-green hover:bg-custom-green/90 text-white px-8 py-2 rounded-sm"
                >
                  {contact.form.submit_text}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="w-full max-w-screen-2xl mx-auto px-4 md:px-12 mt-8">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={contact.map.embed_url}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={contact.map.title}
          />
        </div>
      </section>
    </section>
  );
}