import { useState, useEffect } from 'react'
import './App.css'

function RippleEffect() {
  const [ripples, setRipples] = useState([])

  const createRipple = (e) => {
    const x = e.clientX
    const y = e.clientY
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: 0
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Animate the ripple
    setTimeout(() => {
      setRipples(prev => prev.map(ripple => 
        ripple.id === newRipple.id 
          ? { ...ripple, size: 200 }
          : ripple
      ))
    }, 10)
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 1000)
  }

  useEffect(() => {
    document.addEventListener('mousemove', createRipple)
    return () => {
      document.removeEventListener('mousemove', createRipple)
    }
  }, [])

  return (
    <>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="body-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
        />
      ))}
    </>
  )
}

function ImageMarquee({ images, speed = 30 }) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div 
      className="image-marquee-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={`image-marquee-content ${isPaused ? 'paused' : ''}`}
        style={{ '--speed': `${speed}s` }}
      >
        {images.map((image, index) => (
          <div key={index} className="marquee-image-item">
            <img src={image.url} alt={image.alt} />
            <span className="image-label">{image.label}</span>
          </div>
        ))}
        {images.map((image, index) => (
          <div key={`duplicate-${index}`} className="marquee-image-item">
            <img src={image.url} alt={image.alt} />
            <span className="image-label">{image.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamMember({ number, name, title, imageUrl, imageAlt }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="team-member"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`team-member-bar ${isHovered ? 'hovered' : ''}`}>
        <div className="member-info">
          <span className="member-number">{number}</span>
          <span className="member-name">{name}</span>
        </div>
        <span className="member-title">{title}</span>
      </div>
      <div className={`member-image ${isHovered ? 'visible' : ''}`}>
        <img src={imageUrl} alt={imageAlt} />
      </div>
    </div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const productImages = [
    {
      url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
      alt: "Natural Face Cream",
      label: "Ayurvedic Face Cream"
    },
    {
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop",
      alt: "Herbal Soap",
      label: "Herbal Soap"
    },
    {
      url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
      alt: "Natural Oil",
      label: "Essential Oils"
    },
    {
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop",
      alt: "Face Mask",
      label: "Clay Masks"
    },
    {
      url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
      alt: "Body Lotion",
      label: "Body Care"
    },
    {
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop",
      alt: "Hair Oil",
      label: "Hair Care"
    }
  ]

  return (
    <div className="app">
      <RippleEffect />
      
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-text">PRAKRITI AYURVEDA</span>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="dot-text">NATURAL SKINCARE</span>
            <span className="dot-text">FROM ANCIENT WISDOM</span>
          </h1>
          <p className="hero-subtitle">Pure Ayurvedic ingredients for radiant, healthy skin</p>
          <button className="cta-button">Discover Products</button>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Our Products</h2>
          <ImageMarquee images={productImages} speed={20} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Our Natural Benefits</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>100% Natural</h3>
              <p>Pure Ayurvedic herbs and ingredients, free from harmful chemicals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧘</div>
              <h3>Ancient Wisdom</h3>
              <p>Formulas based on centuries-old Ayurvedic traditions and practices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Radiant Results</h3>
              <p>Transform your skin with nature's most powerful healing ingredients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Our Ayurvedic Experts</h2>
          <div className="team-members">
            <TeamMember 
              number="01"
              name="Dr. Priya Sharma"
              title="Chief Ayurvedic Expert"
              imageUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"
              imageAlt="Dr. Priya Sharma - Chief Ayurvedic Expert"
            />
            <TeamMember 
              number="02"
              name="Rajesh Patel"
              title="Herbal Formulator"
              imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              imageAlt="Rajesh Patel - Herbal Formulator"
            />
            <TeamMember 
              number="03"
              name="Sudheer Desai"
              title="Quality Assurance"
              imageUrl="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face"
              imageAlt="Anjali Desai - Quality Assurance"
            />
            <TeamMember 
              number="04"
              name="Dr. Amit Kumar"
              title="Research Director"
              imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              imageAlt="Dr. Amit Kumar - Research Director"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">About Prakriti Ayurveda</h2>
            <p className="about-text">
              We are dedicated to bringing the ancient wisdom of Ayurveda to modern skincare. 
              Our products are crafted with pure, natural ingredients sourced from the finest 
              organic farms, following traditional Ayurvedic formulations that have been 
              perfected over centuries.
            </p>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Natural Ingredients</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Herbs Used</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Ready to transform your skin?</h3>
              <p>Let's discuss how our natural Ayurvedic products can help you achieve radiant, healthy skin.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>hello@prakritiayurveda.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+91 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Tell us about your skin concerns"></textarea>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Navigation Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay">
          <div className="menu-left-panel">
            <div className="agency-brand">
              <span>PRAKRITI AYURVEDA</span>
            </div>
          </div>
          
          <div className="menu-right-panel">
            <button className="close-button" onClick={toggleMenu}>
              CLOSE ×
            </button>
            
            <div className="menu-description">
              <p>Natural skincare products<br />
              crafted with ancient Ayurvedic<br />
              wisdom for modern beauty.</p>
            </div>
            
            <div className="menu-items">
              <div className="menu-item about-us">
                <span className="dot-text">ABOUT US</span>
                <button className="nav-arrow">→</button>
              </div>
              <div className="menu-item works">
                <span className="dot-text">PRODUCTS</span>
                <button className="nav-arrow">→</button>
              </div>
              <div className="menu-item services">
                <span className="dot-text">INGREDIENTS</span>
                <button className="nav-arrow">→</button>
              </div>
              <div className="menu-item contacts">
                <span className="dot-text">CONTACTS</span>
                <button className="nav-arrow">→</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="dot-text">PRAKRITI AYURVEDA</span>
            </div>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#ingredients">Ingredients</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">YouTube</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Prakriti Ayurveda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
