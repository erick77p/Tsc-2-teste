document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function changeSlide(next = true) {
        if (!slides.length) return;
        currentIndex = next
            ? (currentIndex + 1) % slides.length
            : (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => changeSlide(true));
        prevBtn.addEventListener("click", () => changeSlide(false));
    }

    if (slider) {
        slider.addEventListener("touchstart", (event) => {
            isDragging = true;
            startX = event.touches[0].clientX;
        });

        slider.addEventListener("touchmove", (event) => {
            if (!isDragging) return;
            const moveDiff = event.touches[0].clientX - startX;
            if (Math.abs(moveDiff) > 50) {
                changeSlide(moveDiff < 0);
                isDragging = false;
            }
        });

        slider.addEventListener("touchend", () => (isDragging = false));
    }
});
