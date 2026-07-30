import { Link } from "react-router-dom";

const termsColumns = [
  [
    "Welcome to Mantu Store.",
    "Mantu Websites",
    "How browsing and vendor works?",
    "Becoming an vendor",
  ],
  [
    "How browsing and vendor works?",
    "Becoming an vendor",
    "How browsing and vendor works?",
    "Becoming an vendor",
  ],
];

function TermsPage() {
  return (
    <div className="mn-main-content">
      <div className="mn-breadcrumb m-b-30">
        <div className="row">
          <div className="col-12">
            <div className="row gi_breadcrumb_inner">
              <div className="col-md-6 col-sm-12">
                <h2 className="mn-breadcrumb-title">Terms Page</h2>
              </div>
              <div className="col-md-6 col-sm-12">
                <ul className="mn-breadcrumb-list">
                  <li className="mn-breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="mn-breadcrumb-item active">Terms Page</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mn-terms-conditions p-b-15">
        <div className="mn-title d-none">
          <h2>
            <span>Terms</span> &amp; Condition
          </h2>
          <p>Browse The Collection of Top Products</p>
        </div>
        <div className="row">
          {termsColumns.map((column, columnIndex) => (
            <div
              className={`col-lg-6 ${columnIndex === 1 ? "m-t-991" : ""}`}
              key={`terms-column-${columnIndex}`}
            >
              <div className="mn-common-wrapper">
                {column.map((title, itemIndex) => (
                  <div
                    className="col-sm-12 mn-cmn-block"
                    key={`${title}-${itemIndex}`}
                  >
                    <div className="mn-cmn-block-inner">
                      <h5 className="mn-cmn-block-title">{title}</h5>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.{" "}
                        <b>Lorem Ipsum is simply dutmmy text</b> ever since the
                        1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        {!(columnIndex === 1 && title === "Becoming an vendor") && (
                          <>
                            {" "}
                            <b>Lorem Ipsum is simply dutmmy text.</b>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TermsPage;
