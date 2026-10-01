const buttons = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll(".content-section");

function showSection(sectionId) {
    buttons.forEach((button) => {
        const isSelected = button.dataset.section === sectionId;
        button.classList.toggle("active", isSelected);
        button.setAttribute("aria-selected", String(isSelected));
    });

    sections.forEach((section) => {
        const isVisible = section.id === sectionId;
        section.hidden = !isVisible;

        if (isVisible) {
            section.classList.remove("active-section");
            // Force a small reflow so the entrance animation can restart.
            void section.offsetWidth;
            section.classList.add("active-section");
        }
    });

    const activeSection = document.getElementById(sectionId);
    const heading = activeSection.querySelector("h2");

    if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        showSection(button.dataset.section);
    });
});

// Allow Escape to return focus to the currently selected navigation button.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const activeButton = document.querySelector(".nav-button.active");
        if (activeButton) {
            activeButton.focus();
        }
    }
});
