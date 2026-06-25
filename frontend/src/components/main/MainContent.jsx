import CategorySection from "./sections/CategorySection";
import HeroSection from "./sections/HeroSection";
import NewProductSection from "./sections/NewProductSection";
import ServiceSection from "./sections/ServiceSection";
import BannerSection from "./sections/BannerSection";
import DealSection from "./sections/deal/DealSection";
import TestimonialSection from "./sections/testimonials/TestimonialSection";
import InstagramSection from "./sections/instagram/InstagramSection";

function MainContent({ onOpenQuickView }) {
  return (
    <div className="mn-main-content">
      <div className="row">
        <div className="col-xxl-12">
          <HeroSection />
          <CategorySection />
          <NewProductSection onOpenQuickView={onOpenQuickView} />
          <ServiceSection />
          <BannerSection />
          <DealSection onOpenQuickView={onOpenQuickView} />
          <TestimonialSection />
          <InstagramSection />
        </div>
      </div>
    </div>
  );
}

export default MainContent;