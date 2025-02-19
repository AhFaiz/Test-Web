"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://cdn0-production-images-kly.akamaized.net/m2jZn2TtAW1pf613wFNr4kKz9rs=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4515967/original/012462200_1690427557-01912ff0-5e2e-4d47-8b5d-946344fd31ba.jpeg",
    "https://cdn0-production-images-kly.akamaized.net/DdQc1I4poeHA6MxPKxeEx038xtA=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2795179/original/096958300_1556865172-20190503-Pertamina-Jamin-Stok-LPG-Ramadan-ANGGA-1.jpg",
    "https://asset-2.tstatic.net/tribunnews/foto/bank/images/Gas-elpiji-gas-LPG-3-kg-bos.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3500); // Change slide every 3.5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="relative h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${image}')`
                }}
              >
                <div className="absolute inset-0 bg-black/60" />
              </div>
            </div>
          ))}
        </div>

        {/* Static Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">GasKita</h1>
            <p className="text-xl mb-8">Solusi Kebutuhan Gas Anda</p>
            <Link href="/products">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                Lihat Produk
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() => goToSlide((currentSlide - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-black/20 p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <Clock className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pengiriman 24 Jam</h3>
              <p className="text-gray-600">Layanan pengiriman gas 24 jam untuk kebutuhan mendesak Anda</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <Flame className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Terjamin</h3>
              <p className="text-gray-600">Gas berkualitas tinggi dengan standar keamanan terbaik</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <MapPin className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Jangkauan Luas</h3>
              <p className="text-gray-600">Melayani pengiriman ke berbagai wilayah</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Butuh Bantuan?</h2>
          <p className="text-xl mb-8">Tim kami siap membantu Anda 24/7</p>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Phone className="mr-2 h-4 w-4" /> Hubungi Kami
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}