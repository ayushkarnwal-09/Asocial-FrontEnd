import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <img className="footer_image" src="/images/Asocial_image.png" alt="" />
        <ul className="footer_nav">
          <li>Home</li>
          <li>About Us</li>
          <li>Privacy Policies</li>
          <li>Contact Us</li>
          <li>Help</li>
        </ul>
        <ul>
          <li>
            <FaFacebook />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaLinkedin />
          </li>
        </ul>
        <div className="copyright">
          <h4>Copyright @Asocial 2024</h4>
        </div>
      </div>
    </>
  );
};

export default Footer;
