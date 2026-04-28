const projects = [
  {
    title: "Language-to-Plan (L2P)",
    description: "This library is a collection of tools for PDDL model generation extracted from natural language driven by large language models.",
    img: "images/l2p.png",
    link: "https://github.com/AI-Planning/l2p",
  },
  {
    title: "FixMyPlan",
    description: "FixMyPlan is a general framework that leverages the common sense capabilities of LLMs to judge the semantics of error-prone PDDL plans and back prompt to fix their corresponding specification models.",
    img: "images/fixmyplan.png",
    link: "https://github.com/MarcusTantakoun/FixMyPlan",
  },
  {
    title: "ZIPS: ZK-Solver on the Popular Game NYT game: PIPS",
    description: "Zips is an interactive, Python-based desktop application that combines classical constraint-satisfaction puzzle solving (inspired by games like Sudoku and Suguru) with modern cryptographic Zero-Knowledge Proofs (ZKPs).",
    img: "images/zips.png",
    link: "https://github.com/beckydvn/zips",
  },
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = "";
  projects.forEach((p) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
      </div>
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    `;
    if (p.link && p.link !== "#") {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => window.open(p.link, "_blank"));
    }
    grid.appendChild(card);
  });
}

function renderDropdown() {
  const dropdown = document.getElementById("projects-dropdown");
  if (!dropdown) return;
  dropdown.innerHTML = "";
  projects.forEach((p) => {
    const a = document.createElement("a");
    a.href = "#projects";
    a.textContent = p.title;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.remove("show");
      document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    });
    dropdown.appendChild(a);
  });
}

// Mobile nav toggle
document.getElementById("nav-toggle")?.addEventListener("click", () => {
  document.querySelector(".nav-links")?.classList.toggle("open");
});

// Dropdown toggle
const dropbtn = document.querySelector(".dropbtn");
if (dropbtn) {
  dropbtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("projects-dropdown")?.classList.toggle("show");
  });

  // Show dropdown on hover (desktop only)
  const dropdown = document.querySelector(".dropdown");
  if (window.innerWidth > 768 && dropdown) {
    dropdown.addEventListener("mouseenter", () => {
      document.getElementById("projects-dropdown")?.classList.add("show");
    });
    dropdown.addEventListener("mouseleave", () => {
      document.getElementById("projects-dropdown")?.classList.remove("show");
    });
  }
}

// Close dropdown on click outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.getElementById("projects-dropdown")?.classList.remove("show");
  }
  if (!e.target.closest(".nav-container")) {
    document.querySelector(".nav-links")?.classList.remove("open");
  }
});

// Close mobile nav on link click
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    document.querySelector(".nav-links")?.classList.remove("open");
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

renderProjects();
renderDropdown();
