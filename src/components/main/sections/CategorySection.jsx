import { useEffect, useRef } from "react";

const categoryImages = import.meta.glob("/src/assets/img/category/*.jpg", {
  eager: true,
  import: "default",
});

const categories = [
  {
    cardClass: "cat-card-1",
    discount: "35%",
    label: "Fashion",
    title: "Clothes",
    items: 16,
    images: [1, 2, 3],
  },
  {
    cardClass: "cat-card-2",
    discount: "22%",
    label: "Generic",
    title: "Cosmetics",
    items: 45,
    images: [4, 5, 6],
  },
  {
    cardClass: "cat-card-3",
    discount: "65%",
    label: "Stylish",
    title: "Shoes",
    items: 58,
    images: [7, 8, 9],
  },
  {
    cardClass: "cat-card-4",
    discount: "45%",
    label: "Digital",
    title: "watches",
    items: 64,
    images: [10, 11, 12],
  },
  {
    cardClass: "cat-card-5",
    discount: "63%",
    label: "leather",
    title: "belts",
    items: 75,
    images: [13, 14, 15],
  },
  {
    cardClass: "cat-card-6",
    discount: "23%",
    label: "Cotton",
    title: "Bags",
    items: 15,
    images: [16, 17, 18],
  },
];

function CategorySection() {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!carouselRef.current || typeof window === "undefined") {
      return undefined;
    }

    const $ = window.jQuery || window.$;
    if (!$ || !$.fn || !$.fn.owlCarousel) {
      return undefined;
    }

    const carousel = $(carouselRef.current);
    carousel.owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      margin: 24,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        992: { items: 3 },
      },
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, []);

  return (
    <section className="mn-category p-tb-15">
      <div className="mn-cat owl-carousel" ref={carouselRef}>
        {categories.map((category) => (
          <CategoryCard key={category.cardClass} category={category} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  return (
    <div className={`mn-cat-card ${category.cardClass}`}>
      <p className="lbl">
        <span>{category.discount}</span>
      </p>

      <span className="bg">{category.discount}</span>

      <h4>{category.label}</h4>
      <h3>{category.title}</h3>
      <p>Items ({category.items})</p>

      <ul>
        {category.images.map((imageNumber) => {
          const imagePath = `/src/assets/img/category/${imageNumber}.jpg`;
          return (
            <li key={imageNumber}>
              <a href="#" aria-label={`View ${category.title} category`}>
                <span className="visually-hidden">{category.title}</span>
                <img src={categoryImages[imagePath]} alt={`${category.title} category`} />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategorySection;