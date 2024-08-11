import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Welcome to our HealthCare Services ! We are dedicated to
            transforming healthcare by providing innovative and efficient
            solutions for hospitals and clinics. Our system streamlines
            operations, improves patient care, and enhances overall healthcare
            delivery.
          </p>
          <p>Our Mission</p>
          <p>
            Our mission is to empower healthcare providers with the tools they
            need to offer the best possible care to their patients, leveraging
            technology to ensure access to quality healthcare services.
          </p>
          <p>Our Team</p>
          <p>
            Our team comprises experienced professionals from the healthcare and
            technology sectors, all passionate about making a difference through
            innovation and dedication.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
