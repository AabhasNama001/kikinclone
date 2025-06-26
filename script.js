const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
    sideMenu.classList.remove("active");
  }
});

// 🛠 Fix: Auto-close menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    sideMenu.classList.remove("active");
  }
});

const slider1 = document.getElementById("slider1");
const slider2 = document.getElementById("slider2");
const slider3 = document.getElementById("slider3");

const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const value3 = document.getElementById("value3");
const result = document.getElementById("result");

const ratings = {
  1: { text: "Poor", weight: 0.8 },
  2: { text: "Average", weight: 1.0 },
  3: { text: "Good", weight: 1.2 },
};

function formatCurrency(val) {
  return "$" + Number(val).toLocaleString();
}

function updateValues() {
  const amount = parseInt(slider1.value);
  const multiplier = parseInt(slider2.value);
  const rating = ratings[slider3.value];

  value1.textContent = formatCurrency(amount);
  value2.textContent = multiplier;
  value3.textContent = rating.text;

  const total = Math.round(amount * multiplier * rating.weight);
  result.textContent = `Monthly Repayments: ${formatCurrency(total)}`;
}

slider1.addEventListener("input", updateValues);
slider2.addEventListener("input", updateValues);
slider3.addEventListener("input", updateValues);

updateValues(); // initial call

// ------------------------------GSAP-------------------------------

gsap.registerPlugin(ScrollTrigger);

// Text Animation (fade + slide in)
gsap.from(
  ".good-for-planet-section-heading h1, .good-for-planet-section-heading p, .good-for-planet-section-heading button",
  {
    scrollTrigger: {
      trigger: ".good-for-planet-section-heading",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  }
);

// Image Animation (falling + rotating)
gsap.utils.toArray("#good-for-planet-section .circleimg").forEach((img, i) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 85%", // when image is near bottom of viewport
      toggleActions: "play none none reverse",
    },
    y: -150,
    rotate: 360 + i * 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });
});

const contents = document.querySelectorAll("#grow-with-flow-section .content");
let previous = null;

// Reset styles
function resetContentStyles() {
  contents.forEach((c) => {
    c.style.backgroundColor = "";
    c.style.color = "";

    // Also reset grow-heading text
    const heading = c.querySelector(".grow-heading");
    if (heading) {
      heading
        .querySelectorAll("h1, p")
        .forEach((el) => (el.style.color = "black"));
    }
  });
}

contents.forEach((content, index) => {
  content.style.position = "relative";
  content.style.overflow = "hidden";

  content.addEventListener("mouseenter", () => {
    resetContentStyles();
    content.style.backgroundColor = "#122315";
    content.style.color = "white";

    // Change grow-heading text color to white
    const heading = content.querySelector(".grow-heading");
    if (heading) {
      heading
        .querySelectorAll("h1, p")
        .forEach((el) => (el.style.color = "wheat"));
    }

    if (previous && previous !== content) {
      const drop = document.createElement("div");

      Object.assign(drop.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "#122315",
        opacity: "0.6",
        borderRadius: "10px",
        pointerEvents: "none",
        zIndex: "1",
      });

      previous.appendChild(drop);

      const prevRect = previous.getBoundingClientRect();
      const currRect = content.getBoundingClientRect();
      const distance = currRect.top - prevRect.top;

      gsap.fromTo(
        drop,
        { y: "0px" },
        {
          y: `${distance}px`,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => drop.remove(),
        }
      );
    }

    previous = content;
  });
});

// Reset everything on leaving the section
document
  .getElementById("grow-with-flow-section")
  .addEventListener("mouseleave", () => {
    resetContentStyles();
    previous = null;
  });

gsap.registerPlugin(ScrollTrigger);

// ✅ 1. Text and button fade in on scroll
gsap.from(
  "#calculation-section h1, #calculation-section p, #calculation-section .btn",
  {
    scrollTrigger: {
      trigger: "#calculation-section",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  }
);

// ✅ 2. Image drop-in with rotation (slow and smooth)
const calcImages = document.querySelectorAll("#calculation-section img");

calcImages.forEach((img, i) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 90%",
      toggleActions: "play reverse play reverse",
    },
    y: -200,
    rotate: 360 + i * 60,
    opacity: 0,
    duration: 1, // slower fall
    delay: i * 0.3, // small delay between each image    ease: "power2.out",
  });
});

gsap.registerPlugin(ScrollTrigger);

// ✅ 1. Heading falling color effect
const headingLines = document.querySelectorAll(
  "#do-it-section .doitheading h1"
);

headingLines.forEach((line, i) => {
  const drop = document.createElement("span");
  drop.classList.add("color-overlay");
  line.style.position = "relative";
  line.appendChild(drop);

  // Set inline style to allow absolute overlay
  Object.assign(drop.style, {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // backgroundColor: "#54DD4C",
    mixBlendMode: "multiply",
    transformOrigin: "top",
    transform: "scaleY(0)",
    zIndex: 0,
    pointerEvents: "none",
    transition: "transform 0.4s ease",
  });

  ScrollTrigger.create({
    trigger: line,
    start: "top 60%",
    end: "top 40%",
    toggleActions: "play reverse play reverse",
    onEnter: () => {
      drop.style.transform = "scaleY(1)";
      line.style.color = "#54DD4C";
    },
    onLeaveBack: () => {
      drop.style.transform = "scaleY(0)";
      line.style.color = "";
    },
  });
});

// ✅ 2. Images move from random x/y positions to original
const doItImages = document.querySelectorAll("#do-it-section .doitimgdiv img");

doItImages.forEach((img, i) => {
  const randomX = gsap.utils.random(-100, 100);
  const randomY = gsap.utils.random(-100, 100);

  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    x: randomX,
    y: randomY,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
  });
});
