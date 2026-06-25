function ServiceCard({ service }) {
  const Icon = service.Icon;

  return (
    <div
      className={`mn-ser-content ${service.contentClass} col-sm-6 col-xl-3 m-b-24`}
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={service.delay}
    >
      <div className="mn-ser-box">
        <div className="mn-ser-inner">
          <div className="mn-service-image">
            <Icon />
          </div>

          <div className="mn-service-desc">
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
