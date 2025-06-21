import BlogList from "@/components/blog-list";
import Hero from "@/components/hero";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import testimonialsData from "@/Data/testimonials";

export default function Home() {
  return (
   <>
    <Hero/>
    <BlogList/>
    <AnimatedTestimonials testimonials={testimonialsData} autoplay={true} button={true}/>
    
   </>
  );
}
