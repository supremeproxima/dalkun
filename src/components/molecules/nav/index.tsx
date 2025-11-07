"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { Clock4, PhoneIcon, Menu, X } from "lucide-react";
import { NavConfig, NavOptions } from "@/config/base.config";

export default function Nav() {
  const highlightUI = "bg-custom-green rounded-3xl text-white";
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => mounted && pathname === href;
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <section className="flex flex-col justify-between items-center bg-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      {/* Top contact bar - hidden on mobile */}
      <div className="hidden md:flex justify-start items-center bg-custom-green py-4 px-12 w-full gap-14 text-xs font-semibold">
        <span className="flex items-center gap-2">
          <PhoneIcon className="text-white w-5 h-5" fill="white" />
          <p className="text-white">{NavConfig.phone}</p>
        </span>
        <span className="flex items-center gap-2">
          <Clock4 className="text-white w-5 h-5" />
          <p className="text-white">{NavConfig.workingHours}</p>
        </span>
      </div>
      
      {/* Main navigation */}
      <nav className="flex flex-row justify-between items-center w-full px-4 md:px-12 max-w-screen-2xl mx-auto">
        <div className="px-4 py-2">
          <Image
            src="/assets/danat_logo.svg"
            alt="logo"
            width={100}
            loading="lazy"
            height={100}
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </div>
        
        {/* Desktop navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {NavOptions.map((option) => (
            <li
              key={option.label}
              className={`p-2 w-28 font-medium text-center ${
                isActive(option.href) ? highlightUI : ""
              }`}
            >
              <Link href={option.href}>{option.label}</Link>
            </li>
          ))}
        </ul>
        
        {/* Desktop social links */}
        <div className="hidden md:flex p-4 gap-6">
          <Link href="https://www.facebook.com/share/19iPHseUKP/" target="_blank">
            <Image
              src="/assets/facebook_icon.svg"
              alt="facebook"
              width={32}
              height={32}
              loading="lazy"
            />
          </Link>
          <Link href="https://wa.me/971502617483?text=Hello, I am interested in your services. Please call me back." target="_blank">
            <Image
              src="/assets/whatsapp_icon.svg"
              alt="whatsapp"
              width={32}
              height={32}
              loading="lazy"
            />
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-700 hover:text-custom-green transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 bg-custom-green text-white text-sm">
            <div className="flex items-center gap-2 mb-2">
              <PhoneIcon className="w-4 h-4" />
              <span>{NavConfig.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock4 className="w-4 h-4" />
              <span className="text-xs">{NavConfig.workingHours}</span>
            </div>
          </div>
          <ul className="flex flex-col">
            {NavOptions.map((option) => (
              <li key={option.label}>
                <Link
                  href={option.href}
                  className={`block px-4 py-3 text-center font-medium border-b border-gray-100 ${
                    isActive(option.href) ? "bg-custom-green text-white" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {option.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-6 p-4 border-t border-gray-200">
            <Link href="https://www.facebook.com/danat.ae">
              <Image
                src="/assets/facebook_icon.svg"
                alt="facebook"
                width={32}
                height={32}
                loading="lazy"
              />
            </Link>
            <Link href="https://wa.me/971502617483">
              <Image
                src="/assets/whatsapp_icon.svg"
                alt="whatsapp"
                width={32}
                height={32}
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
