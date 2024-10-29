//scrptForNavBar------------------------------
// Fetch the header HTML and insert it into the document
(() => {
  fetch("components/header.html")
    .then((response) => (response.ok ? response.text() : null))
    .then((data) => {
      if (data) {
        document.body.insertAdjacentHTML("afterbegin", data);

        // Initialize responsive navigation function once the navigation menu is successfully loaded
        setupResponsiveNav();

        // Initialize search modal functionality once the navigation menu is successfully loaded
        setupSearchModal();
      }
    });
})();

// Setup the responsive navigation functionality
const setupResponsiveNav = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    body.classList.toggle("menu-open");

    // Close all dropdowns when closing the menu
    if (!navLinks.classList.contains("active")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      body.classList.contains("menu-open") &&
      !e.target.closest(".nav-links") &&
      !e.target.closest(".menu-toggle")
    ) {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Handle mobile dropdowns
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".nav-item");
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const wasActive = dropdown.classList.contains("active");

        // Close all dropdowns first
        dropdowns.forEach((other) => {
          if (other !== dropdown) {
            other.classList.remove("active");
          }
        });

        // Toggle clicked dropdown
        dropdown.classList.toggle("active");
      }
    });
  });
};

// Setup the search modal functionality
const setupSearchModal = () => {
  const searchBtn = document.querySelector(".search-btn");
  const searchModal = document.querySelector(".search-modal");
  const closeSearch = document.querySelector(".close-search");
  const searchInput = document.querySelector(".search-input input");
  const searchSubmit = document.querySelector(".search-submit");
  const searchResults = document.querySelector(".search-results");
  const body = document.body;

  // Open search modal and focus input
  searchBtn.addEventListener("click", () => {
    searchModal.classList.add("active");
    searchInput.focus();
    body.style.overflow = "hidden";
  });

  // Close search modal function
  function closeSearchModal() {
    searchModal.classList.remove("active");
    searchInput.value = "";
    searchResults.innerHTML = "";
    body.style.overflow = "";
  }

  // Close search modal on clicking close button
  closeSearch.addEventListener("click", closeSearchModal);

  // Close search modal on escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchModal.classList.contains("active")) {
      closeSearchModal();
    }
  });

  // Perform search on clicking submit button
  searchSubmit.addEventListener("click", performSearch);

  // Perform search on enter key press
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Simple search functionality
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      searchResults.innerHTML = "";
      return;
    }

    // Example search results (replace with actual search logic)
    const dummyResults = [
      "Emergency Department",
      "Cardiology Department",
      "Patient Services",
      "Doctor Appointments",
      "Hospital Locations",
    ].filter((item) => item.toLowerCase().includes(query));

    searchResults.innerHTML =
      dummyResults.length > 0
        ? dummyResults
            .map(
              (result) => `
            <div class="search-result">
                <span class="material-symbols-outlined">arrow_forward</span>
                ${result}
            </div>`
            )
            .join("")
        : '<div class="no-results">No results found</div>';
  }
};

// slider---
var swiper = new Swiper("#hospitalSlider", {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
