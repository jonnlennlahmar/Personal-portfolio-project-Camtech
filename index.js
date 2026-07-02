// ===== Project Data =====
const projects = [
  {
    id: "project1",
    title: "Arduino-based-Bicopter Control System",
    year: "2026",
    links: [
      { label: "View on GitHub", url: "https://github.com/jonnlennlahmar" }
    ],
    sections: [
      {
        title: "Overview",
        description: "Adapted an open-source Arduino-based bi-copter project by Eniko T. Enikov in 2025 to available hardware as part of my engineering internship. The project focused on implementing a PID control system, integrating an MPU-6050 IMU, and using MATLAB telemetry to analyze and tune the controller for stable flight behavior.",
        media: "assets/arduinoproject1.jpeg"
      },
      {
        title: "Results and Contributions",
        description: "I adapted the original design to different hardware, built and wired the electronic system, implemented and tuned the PID controller, developed Arduino and MATLAB telemetry code and finally analyzed controller performance using real-time plots.",
        media: "assets/angel target.png"
      }
    ]
  },
  {
    id: "project2",
    title: "Tower Defense Game",
    year: "2026",
    links: [
      { label: "View on GitHub", url: "https://github.com/jonnlennlahmar" }
    ],
    sections: [
      {
        title: "Project Overview",
        description: "Developed with a group of 3, a tower defense game in 6h (raw coding) for a Worldwide french school Coding competition (Nuit de Code) for high school students using Pyxel, a Python library for creating pixel art games. The game features multiple levels, various enemy types, and a range of tower upgrades. Implemented pathfinding algorithms for enemy movement and designed a user-friendly interface for tower placement and upgrades."
      },
      {
        title: "Results",
        description: "Although my game did not place among the winners, it ranked around top 200 out of 1500+ participants. This project taught me how to develop, finish a project under strict time pressure as well as how to work in a team and manage tasks effectively.",
        media: "assets/TowerDefense1.png"
      }
    ]
  },
  {
    id: "project3",
    title: "Personal Website Portfolio",
    year: "2026",
    links: [
      { label: "View on GitHub", url: "https://github.com/jonnlennlahmar/Personal-portfolio-project-Camtech" }
    ],
    sections: [
      {
        title: "Overview",
        description: "I built this personal website portfolio to showcase my projects and skills. The website is built using HTML, CSS, and JavaScript, with a focus on responsive design and accessibility. It features a clean and modern layout, interactive project cards, and smooth scrolling navigation. I focused mainly on user experience, accessibility, and performance optimization, by doing a accessibility ux design audit and optimizing the website for fast loading times.",
        media: "assets/SITE.png"
      }
    ]
  },
  {
    id: "project4",
    title: "Phone Holder CAD Design",
    year: "2022",
    sections: [
      {
        title: "Overview",
        description: "I built a 3D CAD design for a phone holder, created using SolidWorks. The design features a sleek and modern aesthetic with a focus on functionality and ease of use. This was for a class project in which I learned how to use SolidWorks and how to design for 3D printing.",
        media: "assets/PhoneHolder1.png"
      }
    ]
  },
  {
    id: "project5",
    title: "Sensor-Based Navigation",
    year: "2019",
    sections: [
      {
        title: "Overview",
        description: "Built and tested a small sensor-driven navigation system for a Mbot robot using Arduino, it own ultrasonic sensors and scratch code. The system was designed to detect obstacles and navigate around them autonomously. This project taught me the basics of robotics, sensor integration, and programming with Arduino with scratch code.",
        media: "assets/Mbot.jpg"
      }
    ]
  }
];

// ===== DOM Elements =====
const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const modalCloseBtn = modal.querySelector(".modal__close");
const projectCards = document.querySelectorAll(".project-card");

let lastFocusedElement = null;

// ===== Modal Functions =====
function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  lastFocusedElement = document.activeElement;
  modalContent.innerHTML = buildModalHTML(project);

  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    modalCloseBtn.focus();
  }, 100);
}

function closeModal() {
  modal.classList.remove("modal--open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function buildModalHTML(project) {
  let linksHTML = "";
  if (project.links && project.links.length > 0) {
    linksHTML = `
      <div class="modal__links">
        ${project.links.map(link => `
          <a href="${link.url}" class="btn btn--filled" target="_blank" rel="noopener noreferrer">${link.label}</a>
        `).join("")}
      </div>
    `;
  }

  let sectionsHTML = "";
  if (project.sections && project.sections.length > 0) {
    sectionsHTML = project.sections.map(section => `
      <div class="modal__section">
        <h3 class="modal__section-title">${section.title}</h3>
        <p class="modal__text">${section.description}</p>
        ${section.media ? `<img src="${section.media}" alt="${section.title} visual" class="modal__media" loading="lazy">` : ""}
      </div>
    `).join("");
  }

  let abstractHTML = "";
  if (project.abstract && project.abstract.trim()) {
    abstractHTML = `
      <div class="modal__section">
        <h3 class="modal__section-title">Abstract</h3>
        <p class="modal__text">${project.abstract}</p>
      </div>
    `;
  }

  return `
    <h2 class="modal__title" id="modal-title">${project.title}</h2>
    <div class="modal__meta">
      <div>
        <span class="modal__year-label">Year</span>
        <span class="modal__year-value">${project.year}</span>
      </div>
      ${linksHTML}
    </div>
    ${abstractHTML}
    ${sectionsHTML}
  `;
}

// ===== Project Card Event Listeners =====
projectCards.forEach(card => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project");
    openModal(projectId);
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const projectId = card.getAttribute("data-project");
      openModal(projectId);
    }
  });
});

// ===== Modal Event Listeners =====
modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("modal--open")) {
    closeModal();
  }
});

// Focus trap for modal
modal.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;

  const focusableElements = modal.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('.nav__link[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ===== Active Nav Highlight on Scroll =====
const trackedSections = document.querySelectorAll("[id]");
const navLinks = document.querySelectorAll(".nav__link");

function updateActiveNav() {
  let current = "";
  trackedSections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("nav__link--active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("nav__link--active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// ===== Experience Image Slider =====
function initExperienceSliders() {
  const sliders = document.querySelectorAll(".exp-slider");

  sliders.forEach(slider => {
    const track = slider.querySelector(".exp-slider__track");
    const slides = slider.querySelectorAll(".exp-slider__slide");
    const prevBtn = slider.querySelector(".exp-slider__arrow--prev");
    const nextBtn = slider.querySelector(".exp-slider__arrow--next");
    const dotsContainer = slider.querySelector(".exp-slider__dots");

    if (slides.length === 0) return;

    // Create dot indicators
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "exp-slider__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.setAttribute("aria-selected", index === 0 ? "true" : "false");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = slider.querySelectorAll(".exp-slider__dot");

    function updateDots() {
      const scrollLeft = track.scrollLeft;
      const slideWidth = track.offsetWidth * 0.85 + 12; // slide width + gap
      const activeIndex = Math.round(scrollLeft / slideWidth);

      dots.forEach((dot, index) => {
        dot.setAttribute("aria-selected", index === activeIndex ? "true" : "false");
      });
    }

    function goToSlide(index) {
      if (index < 0 || index >= slides.length) return;
      const slideWidth = slides[0].offsetWidth + 12; // + gap
      track.scrollTo({
        left: slideWidth * index,
        behavior: "smooth"
      });
    }

    function goNext() {
      const scrollLeft = track.scrollLeft;
      const slideWidth = slides[0].offsetWidth + 12;
      const currentIndex = Math.round(scrollLeft / slideWidth);
      goToSlide(Math.min(currentIndex + 1, slides.length - 1));
    }

    function goPrev() {
      const scrollLeft = track.scrollLeft;
      const slideWidth = slides[0].offsetWidth + 12;
      const currentIndex = Math.round(scrollLeft / slideWidth);
      goToSlide(Math.max(currentIndex - 1, 0));
    }

    prevBtn.addEventListener("click", goPrev);
    nextBtn.addEventListener("click", goNext);

    // Update dots on scroll
    let scrollTimeout;
    track.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateDots, 50);
    });

    // Keyboard navigation
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    });

    // Set slider tabIndex for keyboard access
    slider.setAttribute("tabindex", "0");

    // Initial dot state
    updateDots();
  });
}

// Initialize sliders when DOM is ready
document.addEventListener("DOMContentLoaded", initExperienceSliders);
