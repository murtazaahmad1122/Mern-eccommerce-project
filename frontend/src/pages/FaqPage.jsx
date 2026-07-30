import { useState } from "react";
import { Link } from "react-router-dom";

const faqColumns = [
  [
    {
      question: "What is the multi vendor services?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "How to buy many products at a time?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever. unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "Refund policy for customer.",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "Exchange policy for customer.",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Ipsum has been the industry's unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "Give a way products available.",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Ipsum has been the industry's standard dummy text ever since the 1500s. unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ],
  [
    {
      question: "Refund policy for customer.",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "Exchange policy for customer.",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Ipsum has been the industry's unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "How to buy many products at a time?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever. unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "Give a way products available.",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Ipsum has been the industry's standard dummy text ever since the 1500s. unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: "What is the multi vendor services?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ],
];

function FaqPage() {
  const [openItems, setOpenItems] = useState({
    "0-0": true,
    "1-0": true,
  });

  const toggleItem = (itemKey) => {
    setOpenItems((current) => ({
      ...current,
      [itemKey]: !current[itemKey],
    }));
  };

  return (
    <div className="mn-main-content">
      <div className="mn-breadcrumb m-b-30">
        <div className="row">
          <div className="col-12">
            <div className="row gi_breadcrumb_inner">
              <div className="col-md-6 col-sm-12">
                <h2 className="mn-breadcrumb-title">FAQ Page</h2>
              </div>
              <div className="col-md-6 col-sm-12">
                <ul className="mn-breadcrumb-list">
                  <li className="mn-breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="mn-breadcrumb-item active">FAQ Page</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mn-faq p-b-15">
        <div className="mn-title d-none">
          <h2>
            frequently asked <span>questions</span>
          </h2>
          <p>Customer service management.</p>
        </div>
        <div className="row">
          {faqColumns.map((column, columnIndex) => (
            <div
              className={`col-lg-6 ${columnIndex === 1 ? "m-t-991" : ""}`}
              key={`faq-column-${columnIndex}`}
            >
              <div className="mn-accordion style-1">
                {column.map((item, itemIndex) => {
                  const itemKey = `${columnIndex}-${itemIndex}`;
                  const isOpen = Boolean(openItems[itemKey]);

                  return (
                    <div className="mn-accordion-item" key={itemKey}>
                      <button
                        type="button"
                        className="mn-accordion-header"
                        onClick={() => toggleItem(itemKey)}
                        aria-expanded={isOpen}
                      >
                        {item.question}
                      </button>
                      <div
                        className={`mn-accordion-body ${isOpen ? "show" : ""}`}
                      >
                        {item.answer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FaqPage;
