document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});



// Add this script right before </body>
// Video rotation logic
document.addEventListener('DOMContentLoaded', function () {
    const videoSlides = document.querySelectorAll('.video-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const transitionDuration = 1500; // Match this with your CSS transition time
    let currentVideo = 0;
    let videoInterval;
    let isChanging = false;

    // Initialize first video
    function initVideos() {
        if (videoSlides.length === 0) return;

        videoSlides[0].classList.add('active');
        videoSlides[0].play().catch(e => console.log("Autoplay prevented:", e));
        navDots[0]?.classList.add('active');
    }

    // Change to specific video
    function changeVideo(index) {
        if (isChanging || index === currentVideo || index >= videoSlides.length) return;

        isChanging = true;

        // Pause current video
        videoSlides[currentVideo].classList.remove('active');
        navDots[currentVideo]?.classList.remove('active');

        // Play new video
        currentVideo = index;
        videoSlides[currentVideo].classList.add('active');
        videoSlides[currentVideo].play().catch(e => console.log("Video play error:", e));
        navDots[currentVideo]?.classList.add('active');

        // Reset changing flag after transition
        setTimeout(() => {
            isChanging = false;
        }, transitionDuration);
    }

    // Auto-rotation function
    function startRotation() {
        if (videoSlides.length < 2) return;

        videoInterval = setInterval(() => {
            const nextVideo = (currentVideo + 1) % videoSlides.length;
            changeVideo(nextVideo);
        }, 5000); // Change every 5 seconds
    }

    // Setup dot navigation
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(videoInterval);
            changeVideo(index);
            // Restart auto-rotation after manual interaction
            setTimeout(startRotation, 10000); // Resume after 10 seconds
        });
    });

    // Pause/play on hover
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(videoInterval);
            // Optional: Pause current video
            // videoSlides[currentVideo].pause();
        });

        heroSection.addEventListener('mouseleave', () => {
            startRotation();
            // Optional: Play current video
            // videoSlides[currentVideo].play().catch(e => console.log(e));
        });
    }

    // Initialize
    initVideos();
    startRotation();

    // Handle visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(videoInterval);
        } else {
            startRotation();
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Reviews Auto-Rotation
document.addEventListener('DOMContentLoaded', function () {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.nav-dot');
    let currentReview = 0;
    let reviewInterval;

    function showReview(index) {
        reviews.forEach(review => review.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        reviews[index].classList.add('active');
        dots[index].classList.add('active');
        currentReview = index;
    }

    function nextReview() {
        let nextIndex = (currentReview + 1) % reviews.length;
        showReview(nextIndex);
    }

    // Auto-rotate every 5 seconds
    function startRotation() {
        reviewInterval = setInterval(nextReview, 5000);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(reviewInterval);
            showReview(index);
            startRotation();
        });
    });

    // Pause on hover
    const slider = document.querySelector('.reviews-slider');
    slider.addEventListener('mouseenter', () => clearInterval(reviewInterval));
    slider.addEventListener('mouseleave', startRotation);

    // Initialize
    showReview(0);
    startRotation();
});


// Smooth Auto-Rotating Reviews
document.addEventListener('DOMContentLoaded', function () {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;
    let interval;

    function showReview(index) {
        // Hide all reviews
        reviews.forEach(review => review.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show selected review
        reviews[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextReview() {
        const nextIndex = (currentIndex + 1) % reviews.length;
        showReview(nextIndex);
    }

    // Start auto-rotation
    function startRotation() {
        interval = setInterval(nextReview, 5000); // Change every 5 seconds
    }

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            clearInterval(interval);
            showReview(parseInt(this.getAttribute('data-index')));
            startRotation();
        });
    });

    // Pause on hover
    const slider = document.querySelector('.reviews-slider');
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', startRotation);

    // Initialize
    showReview(0);
    startRotation();
});