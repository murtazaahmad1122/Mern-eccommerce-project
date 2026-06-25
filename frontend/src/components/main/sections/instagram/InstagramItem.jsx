function InstagramItem({ image }) {
  return (
    <div className="mn-insta-item">
      <div className="mn-insta-inner">
        <a href="#" target="_blank" rel="noreferrer">
          <img src={`/src/assets/img/instagram/${image}`} alt="insta" />
        </a>
      </div>
    </div>
  );
}

export default InstagramItem;