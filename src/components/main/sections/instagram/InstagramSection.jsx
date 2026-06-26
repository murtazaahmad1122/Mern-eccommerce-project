import InstagramItem from "./InstagramItem";

const instagramImageModules = import.meta.glob(
  "/src/assets/img/instagram/*.jpg",
  {
    eager: true,
    import: "default",
  }
);

const instagramImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
].map((image) => instagramImageModules[`/src/assets/img/instagram/${image}`]);

function InstagramSection() {
  const marqueeImages = [...instagramImages, ...instagramImages];

  return (
    <section className="mn-instagram module p-tb-15" id="insta">
      <h2 className="d-none">insta</h2>

      <div className="mn-insta-wrapper">
        <div className="mn-insta-outer">
          <div className="insta-auto" aria-label="Instagram posts">
            {marqueeImages.map((image, index) => (
              <InstagramItem key={`${image}-${index}`} image={image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstagramSection;
