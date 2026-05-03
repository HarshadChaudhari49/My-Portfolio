document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const contactBtn = document.getElementById("contactBtn");
  const contactModal = document.getElementById("contactModal");
  const closeModal = document.querySelector(".close");
  const contactForm = document.querySelector(".contact-form");

  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  window.addEventListener("scroll", () => {
    if (!nav) return;
    nav.style.background =
      window.scrollY > 50 ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.7)";
  });

  if (window.Typed) {
    new Typed(".text", {
      strings: ["Frontend Developer", "Web Developer", "Full Stack Developer"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
  }

  const openModal = () => {
    if (contactModal) contactModal.style.display = "flex";
  };

  const closeModalWindow = () => {
    if (contactModal) contactModal.style.display = "none";
  };

  contactBtn?.addEventListener("click", openModal);
  closeModal?.addEventListener("click", closeModalWindow);

  window.addEventListener("click", (event) => {
    if (event.target === contactModal) closeModalWindow();
  });

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      message: formData.get("message")?.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      alert(result.message);

      if (response.ok) {
        contactForm.reset();
        closeModalWindow();
      }
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    }
  });
});
