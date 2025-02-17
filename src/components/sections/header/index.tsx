"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Settings } from "@/sanity/lib/queries";

interface HeaderProps {
  navigation?: Navigation[];
  settings?: Settings;
}

export default function Header({ navigation = [], settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSrc = isScrolled ? "/logo-black.png" : "/logo-white.png";
  const defaultLogoAlt = settings?.title || "Site Logo";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 lg:px-8 h-20"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{defaultLogoAlt}</span>
            <Image
              aria-hidden
              src={logoSrc}
              alt={defaultLogoAlt}
              width={270}
              height={80}
              className="transition-opacity duration-200"
            />
          </Link>
        </div>
        {navigation.length > 0 && (
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item._id}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className={`text-sm/6 font-semibold transition-colors duration-200 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
        <div className="flex flex-1 items-center justify-end gap-x-6">
          {settings?.cta && (
            <Link
              href={settings.cta.href}
              target={settings.cta.isExternal ? "_blank" : undefined}
              rel={settings.cta.isExternal ? "noopener noreferrer" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm transition-colors duration-200 ${
                isScrolled 
                  ? "bg-indigo-600 text-white hover:bg-indigo-500" 
                  : "bg-white text-gray-900 hover:bg-gray-100"
              }`}
            >
              {settings.cta.text}
            </Link>
          )}
        </div>
        {navigation.length > 0 && (
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors duration-200 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        )}
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{defaultLogoAlt}</span>
              <Image
                aria-hidden
                src="/logo-black.png"
                alt={defaultLogoAlt}
                width={270}
                height={80}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          {navigation.length > 0 && (
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item._id}
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </header>
  );
}
