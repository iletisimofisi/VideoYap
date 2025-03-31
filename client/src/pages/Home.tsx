import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { VideoCreationDemoSection } from "@/components/home/VideoCreationDemoSection";
import { PointsSection } from "@/components/home/PointsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <VideoCreationDemoSection />
      <PointsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
