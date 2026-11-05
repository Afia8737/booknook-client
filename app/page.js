"use client";
import HeroSlider from "@/components/HeroSlider";
import NewArrivals from "@/components/NewArrivals";
import { HowItWorks, TopCategories } from "@/components/HomeExtras";
import useTitle from "@/lib/useTitle";

export default function HomePage() {
  useTitle("Home");
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </>
  );
}
