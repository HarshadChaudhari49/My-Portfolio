document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scrolling for Navbar Links
  document.querySelectorAll('nav ul li a').forEach(anchor => {
      anchor.addEventListener('click', function(event) {
          event.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          document.getElementById(targetId).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Simple Contact Form Validation
  document.querySelector('#contact form').addEventListener('submit', function(event) {
      event.preventDefault();
      let name = document.getElementById('name').value.trim();
      let email = document.getElementById('email').value.trim();
      let message = document.getElementById('message').value.trim();
      
      if (name === "" || email === "" || message === "") {
          alert("Please fill out all fields.");
          return;
      }
      alert("Message sent successfully!");
      this.reset();
  });

  // Navbar Background Change on Scroll
  window.addEventListener('scroll', () => {
      let navbar = document.querySelector('nav');
      if (window.scrollY > 50) {
          navbar.style.background = "rgba(0, 0, 0, 0.9)";
      } else {
          navbar.style.background = "rgba(0, 0, 0, 0.7)";
      }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
  
    // Cohesive neon/dark theme colors matching project section
    const colors = [
      "#0a0a0a",  // deep black base
      "#0f1b3f",  // bluish dark
      "#001f3f",  // navy blue
      "#003344",  // teal dark
      "#0ef",     // neon cyan glow
      "#1a1a40"   // soft violet-dark
    ];
  
    let currentIndex = 0;
  
    function changeBackground() {
      body.style.transition = "background-color 2s ease-in-out";
      body.style.backgroundColor = colors[currentIndex];
      currentIndex = (currentIndex + 1) % colors.length;
    }
  
    // Set initial color
    body.style.backgroundColor = colors[currentIndex];
  
    // Begin animation loop
    setInterval(changeBackground, 5000);
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Floating Animation Delay for Skills Icons
    document.querySelectorAll('.skills-container img').forEach((img, index) => {
      img.style.animation = "floatIn 0.6s ease forwards";
      img.style.animationDelay = `${index * 0.2}s`;
      img.style.opacity = 0;
    });
  
    // Typing Effect for Hero Section
    const typedText = "Hi, I'm Harshad";
    const target = document.querySelector('#hero h2');
    let i = 0;
  
    function typeEffect() {
      if (i < typedText.length) {
        target.textContent += typedText.charAt(i);
        i++;
        setTimeout(typeEffect, 100);
      }
    }
  
    // Clear any previous text and begin typing
    target.textContent = '';
    typeEffect();
  });
  

  // Button Hover Effect
  document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('mouseover', () => {
          button.style.transform = "scale(1.1)";
      });
      button.addEventListener('mouseleave', () => {
          button.style.transform = "scale(1)";
      });
  });
});
document.addEventListener("DOMContentLoaded", () => {
    new Typed(".text", {
        strings: ["Frontend Developer", "Web Developer", "Full Stack Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});

