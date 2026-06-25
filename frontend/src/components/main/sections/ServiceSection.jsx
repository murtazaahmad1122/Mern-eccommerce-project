import ServiceCard from "./ServiceCard";

import {
  FreeShippingIcon,
  SupportIcon,
  ReturnIcon,
  PaymentIcon,
} from "./icons";

const services = [
  {
    contentClass: "mn-ser-content-1",
    delay: "200",
    Icon: FreeShippingIcon,
    title: "Free Shipping",
    text: "Free shipping on all US order or order above $200",
  },
  {
    contentClass: "mn-ser-content-2",
    delay: "400",
    Icon: SupportIcon,
    title: "24X7 Support",
    text: "Contact us 24 hours live support, 7 days in a week",
  },
  {
    contentClass: "mn-ser-content-3",
    delay: "600",
    Icon: ReturnIcon,
    title: "30 Days Return",
    text: "Simply return it within 30 days for an exchange",
  },
  {
    contentClass: "mn-ser-content-4",
    delay: "800",
    Icon: PaymentIcon,
    title: "Payment Secure",
    text: "Contact us 24 hours live support, 7 days in a week",
  },
];

function ServiceSection() {
  return (
    <section className="mn-service p-tb-15">
      <div className="row m-b-m-24">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}

export default ServiceSection;
