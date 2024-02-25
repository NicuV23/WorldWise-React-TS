import React from "react";
import PageNav from "../../components/pageNav/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Explore the globe with Worldwise, a travel app that lets you mark
            the countries you've visited, along with the date and location.
            Capture memories by adding notes to each destination. Immerse
            yourself in a world of discovery for just $9 per month. Your
            passport to unforgettable adventures awaits!
          </p>
        </div>
      </section>
    </main>
  );
}
