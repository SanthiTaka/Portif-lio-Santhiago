// =========================================
// MENU MOBILE
// =========================================

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// =========================================
// FECHAR MENU AO CLICAR EM UM LINK
// =========================================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// =========================================
// LINK ATIVO DO MENU
// =========================================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// =========================================
// FORMULÁRIO
// =========================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  alert(
    "Mensagem enviada com sucesso! " +
      "A funcionalidade de envio por e-mail será implementada posteriormente.",
  );

  contactForm.reset();
});

// =========================================
// CARROSSEL DE TECNOLOGIAS
// =========================================

const techSlider = document.getElementById("techSlider");
const techPrev = document.getElementById("techPrev");
const techNext = document.getElementById("techNext");
const techDots = document.getElementById("techDots");


// =========================================
// BOTÕES
// =========================================

techNext.addEventListener("click", () => {

  techSlider.scrollBy({
    left: 430,
    behavior: "smooth",
  });

});


techPrev.addEventListener("click", () => {

  techSlider.scrollBy({
    left: -430,
    behavior: "smooth",
  });

});


// =========================================
// ARRASTAR COM O MOUSE
// =========================================

let isDragging = false;
let startX;
let scrollLeft;


techSlider.addEventListener("mousedown", (event) => {

  isDragging = true;

  techSlider.classList.add("dragging");

  startX = event.pageX - techSlider.offsetLeft;

  scrollLeft = techSlider.scrollLeft;

});


techSlider.addEventListener("mouseleave", () => {

  isDragging = false;

  techSlider.classList.remove("dragging");

});


techSlider.addEventListener("mouseup", () => {

  isDragging = false;

  techSlider.classList.remove("dragging");

});


techSlider.addEventListener("mousemove", (event) => {

  if (!isDragging) return;

  event.preventDefault();

  const x = event.pageX - techSlider.offsetLeft;

  const distance = (x - startX) * 2;

  techSlider.scrollLeft = scrollLeft - distance;

});


// =========================================
// INDICADORES
// =========================================

const cards = document.querySelectorAll(".tech-card");

const cardsPerPage = 4;

const totalPages = Math.ceil(cards.length / cardsPerPage);


for (let i = 0; i < totalPages; i++) {

  const dot = document.createElement("button");

  dot.classList.add("tech-dot");

  dot.setAttribute(
    "aria-label",
    `Ir para página ${i + 1}`
  );

  dot.addEventListener("click", () => {

    const card = cards[i * cardsPerPage];

    if (card) {

      techSlider.scrollTo({
        left: card.offsetLeft - 10,
        behavior: "smooth",
      });

    }

  });

  techDots.appendChild(dot);
}


// =========================================
// ATUALIZAR INDICADOR
// =========================================

function updateTechDots() {

  const scrollPosition = techSlider.scrollLeft;

  const maxScroll =
    techSlider.scrollWidth - techSlider.clientWidth;

  const percentage =
    maxScroll > 0
      ? scrollPosition / maxScroll
      : 0;

  const currentPage =
    Math.round(
      percentage * (totalPages - 1)
    );

  const dots =
    document.querySelectorAll(".tech-dot");


  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === currentPage
    );

  });

}


techSlider.addEventListener(
  "scroll",
  updateTechDots
);


// =========================================
// PRIMEIRO INDICADOR ATIVO
// =========================================

updateTechDots();


// =========================================
// ROLAGEM COM RODA DO MOUSE
// =========================================

techSlider.addEventListener(
  "wheel",
  (event) => {

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {

      event.preventDefault();

      techSlider.scrollLeft += event.deltaY;

    }

  },
  { passive: false }
);