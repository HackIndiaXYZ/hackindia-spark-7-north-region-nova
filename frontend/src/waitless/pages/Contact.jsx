import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    e.target.reset();
  };

  return (
    <main>
      <section className="page-header" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </div>
      </section>

      <section className="container" style={{ padding: 'var(--spacing-2xl) 0', maxWidth: '600px' }}>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" id="name" className="form-input" placeholder="John Doe" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" className="form-input" placeholder="john@example.com" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" className="form-textarea" placeholder="How can we help you?" required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
