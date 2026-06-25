function InstagramItem({ image }) {
  return (
    <div className="mn-insta-item">
      <div className="mn-insta-inner">
        <a href="#" target="_blank" rel="noreferrer noopener" aria-label="Open Instagram post">
          <img src={`/src/assets/img/instagram/${image}`} alt="Instagram post" />
          <span className="visually-hidden">Open Instagram post</span>
        </a>
      </div>
    </div>
  );
}

export default InstagramItem;