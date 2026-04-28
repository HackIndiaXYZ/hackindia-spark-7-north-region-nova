import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>About WaitLess</h4>
            <p>Revolutionizing hospital queue management with smart QR-based tracking for a better patient experience.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><a href="/#features" className="footer-link">Features</a></li>
              <li><a href="/#about" className="footer-link">About Us</a></li>
              <li><a href="/#pricing" className="footer-link">Pricing</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help" className="footer-link">Help Center</a></li>
              <li><a href="#contact" className="footer-link">Contact Us</a></li>
              <li><a href="#faq" className="footer-link">FAQ</a></li>
              <li><a href="#feedback" className="footer-link">Send Feedback</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="#terms" className="footer-link">Terms of Service</a></li>
              <li><a href="#security" className="footer-link">Security</a></li>
              <li><a href="#compliance" className="footer-link">Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-logo">WaitLess</div>
          <div className="footer-copy">&copy; 2024 WaitLess. All rights reserved. Bringing order to healthcare.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
