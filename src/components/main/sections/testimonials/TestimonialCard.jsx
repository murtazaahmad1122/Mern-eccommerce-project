const iconPath = "/src/assets/img/icons/";
const userPath = "/src/assets/img/user/";

function TestimonialCard({ testimonial }) {
  return (
    <li className="mn-test-item">
      <img
        src={`${iconPath}top-quotes.svg`}
        className="svg_img test_svg top"
        alt="user"
      />

      <div className="mn-test-inner">
        <div className="mn-test-img">
          <img
            alt="testimonial"
            title="testimonial"
            src={`${userPath}${testimonial.image}`}
          />
        </div>

        <div className="mn-test-content">
          <div className="mn-test-desc">{testimonial.text}</div>
          <div className="mn-test-name">{testimonial.name}</div>
          <div className="mn-test-designation">
            {testimonial.designation}
          </div>
        </div>
      </div>

      <img
        src={`${iconPath}bottom-quotes.svg`}
        className="svg_img test_svg bottom"
        alt=""
      />
    </li>
  );
}

export default TestimonialCard;