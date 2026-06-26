import MainContent from "../components/main/MainContent";
import CategorySection from "../components/main/sections/CategorySection";
import NewProductSection from "../components/main/sections/NewProductSection";
import ServiceSection from "../components/main/sections/ServiceSection";
import BannerSection from "../components/main/sections/BannerSection";
import DealSection from "../components/main/sections/deal/DealSection";
import TestimonialSection from "../components/main/sections/testimonials/TestimonialSection";
import InstagramSection from "../components/main/sections/instagram/InstagramSection";

function PageHero({ title, description, eyebrow = "Welcome" }) {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="bg-light rounded p-5 text-center shadow-sm">
            <p className="text-uppercase small fw-semibold text-muted mb-2">{eyebrow}</p>
            <h2 className="mb-3">{title}</h2>
            <p className="mb-0">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ onOpenQuickView }) {
  return <MainContent onOpenQuickView={onOpenQuickView} />;
}

export function CategoriesPage() {
  return (
    <div className="mn-main-content">
      <div className="row">
        <div className="col-xxl-12">
          <PageHero
            eyebrow="Discover"
            title="Categories"
            description="Explore curated collections for fashion, lifestyle, home essentials, and more."
          />

          <CategorySection />
          <BannerSection />
        </div>
      </div>
    </div>
  );
}

export function ShopPage({ onOpenQuickView }) {
  return (
    <div className="mn-main-content">
      <div className="row">
        <div className="col-xxl-12">
          <PageHero
            eyebrow="Browse"
            title="Shop"
            description="Find the latest arrivals, trending picks, and limited offers all in one place."
          />

          <NewProductSection onOpenQuickView={onOpenQuickView} />
          <DealSection onOpenQuickView={onOpenQuickView} />
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="mn-main-content">
      <div className="row">
        <div className="col-xxl-12">
          <PageHero
            eyebrow="Support"
            title="Contact Us"
            description="We are here to help with questions, orders, and personalized recommendations."
          />

          <section className="container py-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="border rounded p-4 h-100 bg-white shadow-sm">
                  <h4 className="mb-3">Get in touch</h4>
                  <p className="mb-3">Reach out anytime and our team will respond quickly.</p>
                  <ul className="list-unstyled mb-0">
                    <li><strong>Email:</strong> support@example.com</li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    <li><strong>Address:</strong> 123 Market Street, New York</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded p-4 h-100 bg-white shadow-sm">
                  <h4 className="mb-3">Send us a message</h4>
                  <form>
                    <div className="mb-3">
                      <input className="form-control" type="text" placeholder="Your Name" aria-label="Your Name" />
                    </div>
                    <div className="mb-3">
                      <input className="form-control" type="email" placeholder="Your Email" aria-label="Your Email" />
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows="4" placeholder="Message"></textarea>
                    </div>
                    <button type="button" className="btn btn-dark">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <ServiceSection />
          <TestimonialSection />
          <InstagramSection />
        </div>
      </div>
    </div>
  );
}
