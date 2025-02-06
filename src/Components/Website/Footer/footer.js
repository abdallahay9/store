import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#17314a', color: 'white' }} className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-md-left text-center">
            <p className="mb-0" style={{ fontSize: '1rem' }}>&copy; 2025 All Rights Reserved | Your Company Name</p>
            <ul className="list-inline mt-3">
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ fontSize: '1rem' }}>Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ fontSize: '1rem' }}>Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 text-md-right text-center mt-3 mt-md-0">
            <h5 style={{ fontSize: '1.2rem' }}>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
