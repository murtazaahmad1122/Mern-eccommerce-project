function InstagramItem({ image }) {
  return (
    <div className="mn-insta-item">
      <div className="mn-insta-inner">
        <a
          href="#"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Open Instagram post"
          onClick={(event) => event.preventDefault()}
        >
          <img src={image} alt="Instagram post" loading="lazy" />
          <span className="visually-hidden">Open Instagram post</span>
        </a>
      </div>
    </div>
  );
}

export default InstagramItem;
