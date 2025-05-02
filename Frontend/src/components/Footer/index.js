import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center">
          {/* Get In Touch */}
          <div className="col-lg-6 col-md-8">
            <div className="footer-contact text-center">
              <h2>Get In Touch</h2>
              <address>
                <p>
                  <i className="fa fa-map-marker-alt" /> Jalan Sudirman No. 10,
                  Jakarta
                </p>
                <p>
                  <i className="fa fa-phone-alt" /> +012 345 67890
                </p>
                <p>
                  <i className="fa fa-envelope" />
                  <a
                    href="mailto:LabubuCW@gmail.com"
                    style={{ color: "white" }}
                  >
                    AquaSparkleAutoSpa@gmail.com
                  </a>
                </p>
              </address>

              {/* Social Media */}
              <div className="footer-social mt-4">
                <a
                  className="btn"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  className="btn"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  className="btn"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  className="btn"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container copyright">
        <p>
          © <Link to="/home">AquaSparkle Auto Spa</Link>, All Rights Reserved.
          Designed By{" "}
          <a
            href="https://htmlcodex.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            AquaSparkle Auto Spa Project
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
