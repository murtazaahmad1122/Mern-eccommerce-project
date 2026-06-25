import InstagramItem from "./InstagramItem";

const instagramImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
];

function InstagramSection() {
  return (
    <section className="mn-instagram module p-tb-15" id="insta">
      <h2 className="d-none">insta</h2>

      <div className="mn-insta-wrapper">
        <div className="mn-insta-outer">
          <div className="insta-auto">
            {instagramImages.map((image) => (
              <InstagramItem key={image} image={image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstagramSection;