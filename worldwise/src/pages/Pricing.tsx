import React from "react";
import PageNav from "../components/page-nav/PageNav";
import styles from "../pages/Product/Product.module.css";

const Product: React.FC = () => {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Access all features of this application for just $9 per month,
            bringing you a seamless and enhanced user experience at an
            affordable price point.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
};

export default Product;
