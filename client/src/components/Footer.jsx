import React from 'react';
import { BsEnvelopeFill, BsFacebook, BsGeoAltFill, BsInstagram, BsLinkedin, BsTelephoneFill, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div>
          <Link to="/" className="font-bold text-2xl text-white">
            <div>
              <span className="text-slate-50">Property</span>
              <span className="text-secondary">Plus</span>
            </div>
          </Link>
          <p className="mt-4 text-gray-400">
            Your trusted partner in finding the perfect property. Discover your dream home with us today!
          </p>
        </div>

        {/* Quick Links */}
       
<div>
  <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
  <ul className="space-y-2 text-sm">
    <li>
      <Link to="/about" className="hover:text-white">About Us</Link>
    </li>
    <li>
      <Link to="/properties" className="hover:text-white">Properties</Link>
    </li>
    <li>
      <Link to="/services" className="hover:text-white">Services</Link>
    </li>
    <li>
      <Link to="/contact" className="hover:text-white">Contact</Link>
    </li>
    <li>
      <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
    </li>
  </ul>
</div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
          <p className="mb-2">
            <BsTelephoneFill className="inline-block mr-2 text-secondary" />
            +0 182 769-3853
          </p>
          <p className="mb-2">
            <BsEnvelopeFill className="inline-block mr-2 text-secondary" />
            atikhasan1971arik@gmail.com
          </p>
          <p>
            <BsGeoAltFill className="inline-block mr-2 text-secondary" />
            123 Real Estate Avenue, Suite 100, Dhaka Mirpur-2
          </p>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-blue-500">
              <BsFacebook />
            </a>
            <a href="#" className="hover:text-blue-500">
              <BsTwitter />
            </a>
            <a href="#" className="hover:text-pink-500">
              <BsInstagram />
            </a>
            <a href="#" className="hover:text-blue-500">
              <BsLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Property Plus. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
