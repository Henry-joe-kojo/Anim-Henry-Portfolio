# Anim Henry Antwi - Portfolio

A stunning, modern portfolio website for Anim Henry Antwi, featuring beautiful color-changing backgrounds, smooth animations, and a professional design perfect for an IT Student and Graphic Designer.

## ✨ Features

### 🎨 Visual Design
- **Dynamic Color-Changing Background**: Beautiful gradient animations that shift every 8 seconds
- **Modern UI/UX**: Clean, professional design with smooth transitions
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Profile Picture Upload**: Click to add your own profile photo
- **Smooth Animations**: Scroll-triggered animations and parallax effects

### 💻 Technical Features
- **Portfolio Filtering**: Filter projects by category (Web Development, Graphic Design, Applications)
- **Interactive Elements**: Hover effects, click animations, and particle effects
- **Contact Form**: Functional contact form with validation
- **Skill Bars**: Animated skill progress bars
- **Social Media Integration**: Links to GitHub, LinkedIn, Behance, and Instagram

### 📱 Sections
1. **Hero Section**: Profile picture, name, title, and social links
2. **About Section**: Personal story and statistics
3. **Skills Section**: Programming and design skills with progress bars
4. **Portfolio Section**: Filterable project gallery
5. **Contact Section**: Contact form and contact information

## 🚀 Quick Start

### Option 1: View Immediately
1. Simply open `index.html` in your web browser
2. Your portfolio is ready to view!

### Option 2: Customize First
1. Edit the content in `index.html` to personalize your information
2. Add your profile picture by clicking on the placeholder
3. Update portfolio images and project details
4. Customize colors and styling in `styles.css`

## 🎯 Customization Guide

### Personal Information
Edit these sections in `index.html`:

```html
<!-- Hero Section -->
<h1 class="hero-title">Anim Henry Antwi</h1>
<p class="hero-subtitle">IT Student & Graphic Designer</p>
<p class="hero-description">Your personal description here...</p>

<!-- Contact Information -->
<p>anim.henry@email.com</p>
<p>+233 XX XXX XXXX</p>
```

### Profile Picture
1. Click on the profile picture placeholder in the hero section
2. Select your photo from your computer
3. The image will automatically be displayed

### Portfolio Projects
Replace the placeholder images and update project information:

```html
<div class="portfolio-item" data-category="web">
    <div class="portfolio-image">
        <img src="your-project-image.jpg" alt="Project Name">
        <div class="portfolio-overlay">
            <h3>Your Project Name</h3>
            <p>Project description</p>
        </div>
    </div>
</div>
```

### Skills
Update your skills and proficiency levels in `index.html`:

```html
<div class="skill-item">
    <span class="skill-name">JavaScript</span>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 85%"></div>
    </div>
</div>
```

### Social Media Links
Update the social media links in the hero section and footer:

```html
<a href="your-github-url" class="social-link"><i class="fab fa-github"></i></a>
<a href="your-linkedin-url" class="social-link"><i class="fab fa-linkedin"></i></a>
<a href="your-behance-url" class="social-link"><i class="fab fa-behance"></i></a>
<a href="your-instagram-url" class="social-link"><i class="fab fa-instagram"></i></a>
```

## 🎨 Color Customization

### Background Colors
Modify the color array in `script.js` to change the background color scheme:

```javascript
const colors = [
    'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
    'linear-gradient(45deg, #4facfe, #00f2fe, #43e97b, #38f9d7)',
    // Add more color combinations
];
```

### Primary Colors
Update the primary color scheme in `styles.css`:

```css
/* Replace #667eea and #764ba2 with your preferred colors */
background: linear-gradient(45deg, #your-color1, #your-color2);
```

## 📁 File Structure

```
├── index.html          # Main portfolio page
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🌐 Deployment Options

### GitHub Pages (Free)
1. Create a GitHub repository
2. Upload your files
3. Enable GitHub Pages in repository settings
4. Your portfolio will be live at `username.github.io/repository-name`

### Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your folder
3. Get instant deployment with a custom URL

### Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Deploy with one click

## 📧 Contact Form Setup

To make the contact form actually send emails, you can integrate with:

### Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace the form action in `index.html` with your Formspree endpoint

### Netlify Forms
If deploying on Netlify, add `netlify` attribute to your form:
```html
<form class="contact-form" netlify>
```

## 🔧 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📱 Mobile Optimization

The portfolio is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🎭 Animation Features

- **Typing Effect**: Hero title types out character by character
- **Parallax Scrolling**: Profile picture moves on scroll
- **Particle Effects**: Subtle floating particles in background
- **Scroll Progress**: Progress bar at top of page
- **Skill Animations**: Progress bars animate when scrolled into view
- **Hover Effects**: Interactive elements respond to mouse movement

## 🚀 Performance Features

- Optimized CSS animations
- Efficient JavaScript
- Responsive images
- Minimal external dependencies
- Fast loading times

## 📈 SEO Ready

The portfolio includes:
- Proper meta tags
- Semantic HTML structure
- Alt text for images
- Clean URL structure
- Fast loading times

## 🎨 Design Philosophy

This portfolio emphasizes:
- **Clean Design**: Minimalist approach with focus on content
- **Visual Appeal**: Beautiful animations and color transitions
- **User Experience**: Smooth navigation and intuitive interactions
- **Professionalism**: Suitable for job applications and client presentations
- **Creativity**: Showcases both technical and design skills

## 🔮 Future Enhancements

Consider adding:
- Blog section for sharing insights
- Dark/Light mode toggle
- More interactive portfolio items
- Testimonials section
- Downloadable resume
- Multi-language support

## 📞 Support

If you need help customizing your portfolio:
1. Check the customization guide above
2. Review the code comments in the files
3. Test changes in a local environment first

---

**Created for Anim Henry Antwi**  
*IT Student & Graphic Designer*

*Portfolio featuring stunning color-changing backgrounds and modern design* 