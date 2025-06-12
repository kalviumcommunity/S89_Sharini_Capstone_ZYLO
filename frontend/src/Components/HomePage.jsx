import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css"

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="homepage-wrapper">
      <header className="homepage-header">
        <div className="logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/9068/9068679.png"
            alt="Zylo Logo"
            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "40%", marginRight: "0px" }}
          />
          <p style={{ fontSize: "1.7rem", fontWeight: "inherit" }}>Zylo</p>
        </div>
        <nav className="nav-links">
          
          <button className="login-btn" style={{ width: "150px", height: "55px" }} onClick={() => navigate("/login")}>Log in</button>
          <button className="signup-btn" style={{ width: "150px", height: "55px" }} onClick={() => navigate("/signup")}>Sign up</button>
        </nav>
      </header>

      <section className="hero-section" style={{ height: "auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: "50px" }}>
        <img
          src="https://i.pinimg.com/736x/2e/23/ec/2e23ec0845a7097a1ae49436ae38fd38.jpg"
          alt="Holding phone with location pins"
          className="hero-img"
          style={{ width: "400px", height: "500px", maxWidth: "800px", borderRadius: "20px", marginBottom: "20px" }}
        />
        <div>
          <div className="center-container">
            <h1>Stay Close, No Matter the Distance</h1>
          </div>
          <div className="center-container">
            <p>Connect with people around you, share moments, and chat with ease.</p>
          </div>
          <div className="center-container">
            <button className="cta-btn">Get Started</button>
          </div>
        </div>
      </section>
      <section id="features" className="features-section">
        <h2>Why Choose ZYLO?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://i.pinimg.com/736x/cb/3c/ef/cb3cefbcba842dc7a34c0dfafcf38858.jpg" alt="Emotional Engagement" />
            <h3>Emotional Engagement</h3>
            <p>
              Interactive reactions, AI-powered replies, and expressive memory sharing bring deeper connection to conversations.
            </p>
          </div>
          <div className="feature-card">
            <img src="https://i.pinimg.com/736x/f2/f3/7c/f2f37c8ab0549416a4b4712eb1805594.jpg" alt="Social Discovery" />
            <h3>Social Discovery</h3>
            <p>
              Unique features like Nearby Connect, Interest-Based Discovery, and Event Chat Rooms open doors to new, meaningful relationships.
            </p>
          </div>
          <div className="feature-card">
            <img src="https://i.pinimg.com/736x/b8/4b/ed/b84bedd339d00c83ee73e2829de0df5b.jpg" alt="Privacy and Control" />
            <h3>Privacy and Control</h3>
            <p>
              Advanced privacy modes like Contacts-Only, Secret Chats, and Disappearing Messages address the need for secure communication.
            </p>
          </div>
          <div className="feature-card">
            <img src="https://i.pinimg.com/736x/d6/6c/d3/d66cd3067d1f92f79b6e793fb4b51c8b.jpg" alt="Live Video Connect" />
            <h3>Live Video Connect</h3>
            <p>
              Seamless in-app video meetings to enhance collaboration, hangouts, and professional interactions.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Users Say?</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            "It's like Instagram and WhatsApp had a genius baby!"
          </div>
          <div className="testimonial">
            "Finally, an app that understands how I want to connect."
          </div>
          <div className="testimonial">
            "The chatbot's mood-based replies are insane!"
          </div>
        </div>
      </section>

      <footer className="homepage-footer">
        <div className="footer-grid">
          <div>
            <h4>Zylo</h4>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Legal</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4>Community</h4>
            <ul>
              <li>GitHub</li>
              <li>Discord</li>
              <li>Feedback</li>
              <li>Social Media Icons</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>
      </footer>
      <footer style={{ position: "relative", bottom: "0px", width: "100%" }}>
        <div className="footer-bottom">
          <p>&copy; 2025 Zylo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;