"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaBookOpen, FaHandHoldingHeart, FaRotate } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { icon: FaBookOpen, title: "Add a book, borrow a book, return a book", text: "BookNook is a small library that lives online. Share what you have read and pick up what you have not.", tone: "from-primary to-[#2c4f8a]" },
  { icon: FaRotate, title: "Borrow for a week, return when you are done", text: "Pick a book, confirm the borrow, and it appears on your shelf with its return date.", tone: "from-secondary to-[#1f5a4b]" },
  { icon: FaHandHoldingHeart, title: "Put your own shelf on the map", text: "Add the books you can lend. Set how many copies you own and we keep count for you.", tone: "from-[#2a2f44] to-primary" },
];

export default function HeroSlider() {
  return (
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} loop className="hero-swiper">
      {slides.map(({ icon: Icon, title, text, tone }) => (
        <SwiperSlide key={title}>
          <div className={`bg-gradient-to-br ${tone} text-white`}>
            <div className="page-wrap relative flex min-h-[26rem] items-center py-16 md:min-h-[32rem]">
              <div className="max-w-2xl space-y-5">
                <h1 className="text-4xl font-extrabold md:text-6xl">{title}</h1>
                <p className="text-lg text-white/85">{text}</p>
                <Link href="/books" className="btn btn-accent btn-lg">Browse Books</Link>
              </div>
              <Icon aria-hidden="true" className="absolute right-6 hidden text-white/10 md:block" size={280} />
            </div>
          </div>
        </SwiperSlide>
      ))}
      <style>{`.hero-swiper .swiper-pagination-bullet{background:#fff;opacity:.5}.hero-swiper .swiper-pagination-bullet-active{background:var(--color-accent);opacity:1}`}</style>
    </Swiper>
  );
}
