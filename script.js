// Contact form submission handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector('textarea').value;
  
  // Simple validation
  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  
  // Show success message with animation
  const button = this.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Sending...';
  button.disabled = true;
  
  setTimeout(() => {
    button.textContent = 'Message Sent!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '#0066cc';
      button.disabled = false;
      this.reset();
    }, 2000);
  }, 1000);
});

// Profile image handling
function handleProfileImage() {
  const profileImage = document.querySelector('.profile-image');
  const placeholder = document.querySelector('.profile-placeholder');
  
  if (profileImage) {
    profileImage.addEventListener('load', function() {
      this.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    });
    
    profileImage.addEventListener('error', function() {
      this.style.display = 'none';
      if (placeholder) placeholder.style.display = 'flex';
    });
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Dynamic text animation
const roles = [
  "Data Science Enthusiast",
  "Web Developer", 
  "AI Explorer",
  "Python Developer",
  "Machine Learning Engineer",
  "Prompt Engineer"
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeDynamicText() {
  const dynamicText = document.getElementById('dynamic-text');
  const currentRole = roles[currentRoleIndex];
  
  if (isDeleting) {
    // Deleting text
    dynamicText.textContent = currentRole.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typingSpeed = 50;
  } else {
    // Typing text
    dynamicText.textContent = currentRole.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typingSpeed = 100;
  }
  
  // Handle transitions
  if (!isDeleting && currentCharIndex === currentRole.length) {
    // Finished typing, wait then start deleting
    typingSpeed = 2000; // Wait 2 seconds
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    // Finished deleting, move to next role
    isDeleting = false;
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    typingSpeed = 500; // Wait before starting next word
  }
  
  setTimeout(typeDynamicText, typingSpeed);
}

// Add typing effect to hero section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('#hero h1');
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 150);
  
  // Start dynamic text animation
  setTimeout(typeDynamicText, 2000); // Start after hero title finishes
  
  // Handle profile image
  handleProfileImage();
});

// Add skill animation on hover
document.querySelectorAll('.skill-list span').forEach(skill => {
  skill.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(2deg)';
  });
  
  skill.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
  });
}); 

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'disabled');
  }
}

darkModeToggle.addEventListener('click', () => {
  setDarkMode(!document.body.classList.contains('dark-mode'));
});

// On load, set dark mode if user previously enabled it or prefers dark
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'enabled' || (saved === null && prefersDark)) {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
}); 

// --- Animated Cubes Background with Parallax ---
const canvas = document.getElementById('cubes-bg');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const NUM_CUBES = 18;
const cubes = [];
let mouseX = width / 2, mouseY = height / 2, scrollY = 0;

function randomBetween(a, b) { return a + Math.random() * (b - a); }

for (let i = 0; i < NUM_CUBES; i++) {
  cubes.push({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    size: randomBetween(30, 80),
    angle: randomBetween(0, Math.PI * 2),
    speed: randomBetween(0.1, 0.4),
    driftX: randomBetween(-0.2, 0.2),
    driftY: randomBetween(-0.2, 0.2),
    rotSpeed: randomBetween(-0.01, 0.01),
    color: `rgba(${Math.floor(randomBetween(100,200))},${Math.floor(randomBetween(100,200))},${Math.floor(randomBetween(200,255))},0.13)`
  });
}

function drawCube(cube, parallaxX, parallaxY) {
  ctx.save();
  ctx.translate(cube.x + parallaxX, cube.y + parallaxY);
  ctx.rotate(cube.angle);
  ctx.strokeStyle = cube.color;
  ctx.lineWidth = 3;
  ctx.strokeRect(-cube.size/2, -cube.size/2, cube.size, cube.size);
  ctx.restore();
}

function animateCubes() {
  ctx.clearRect(0, 0, width, height);
  for (const cube of cubes) {
    // Parallax: cubes closer to top/left move more with mouse/scroll
    const parallaxX = ((mouseX - width/2) / width) * cube.size * 2 + (scrollY / 100) * cube.driftX * 30;
    const parallaxY = ((mouseY - height/2) / height) * cube.size * 2 + (scrollY / 100) * cube.driftY * 30;
    drawCube(cube, parallaxX, parallaxY);

    // Drift and rotate
    cube.x += cube.driftX * cube.speed;
    cube.y += cube.driftY * cube.speed;
    cube.angle += cube.rotSpeed;

    // Wrap around screen
    if (cube.x < -cube.size) cube.x = width + cube.size;
    if (cube.x > width + cube.size) cube.x = -cube.size;
    if (cube.y < -cube.size) cube.y = height + cube.size;
    if (cube.y > height + cube.size) cube.y = -cube.size;
  }
  requestAnimationFrame(animateCubes);
}

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

animateCubes();
// --- End Cubes Background --- 