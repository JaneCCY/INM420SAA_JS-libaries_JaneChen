console.log(typeof jQuery);


// Photo carousel
document.addEventListener('DOMContentLoaded', function () {
    const mainGlide = new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        gap: 0,
        focusAt: 'center',
        autoplay: 3000,
        animationDuration: 800,
        animationTimingFunc: 'ease',
        swipeThreshold: 80,
        keyboard: true
    }).mount();

    const prevButton = document.querySelector('.glide__arrow--left');
    const nextButton = document.querySelector('.glide__arrow--right');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function () {
            mainGlide.go('<');
        });

        nextButton.addEventListener('click', function () {
            mainGlide.go('>');
        });
    }

    // product carousel
    const productGlide = new Glide('#productCarousel', {
        type: 'carousel',
        startAt: 0,
        perView: 4,
        gap: 20,
        bound: true
    }).mount();

    if (window.innerWidth <= 768) {  
        productGlide.update({
            perView: 1  
        });
    }
    // Search toggle with Anime.js(not working idk why)
    const searchIcon = document.querySelector('.search-icon');
    const searchField = document.querySelector('.search-field');

    if (searchIcon && searchField) {
        searchIcon.addEventListener('click', function () {
            if (searchField.classList.contains('show')) {
                anime({
                    targets: searchField,
                    opacity: [1, 0],
                    width: ['200px', '0px'],
                    duration: 500,
                    easing: 'easeInQuad',
                    complete: function () {
                        searchField.classList.remove('show'); // Hide after animation
                    }
                });
            } else {
                searchField.classList.add('show');  // Show field first to allow width animation
                anime({
                    targets: searchField,
                    opacity: [0, 1],
                    width: ['0px', '200px'],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        });
    } else {
        console.error("Search icon or search field not found in the DOM.");
    }
});


// Scale up images in glide slides
const glideImages = document.querySelectorAll('.glide__slide img');

glideImages.forEach((img) => {
    img.addEventListener('mouseenter', () => {
        img.classList.add('scale-up');
    });
    img.addEventListener('mouseleave', () => {
        img.classList.remove('scale-up');
    });
});

// Show/Hide Back to Top button
window.onscroll = function () {
    var button = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        button.classList.add("show");
    } else {
        button.classList.remove("show");
    }
};

document.getElementById("backToTopBtn").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// marquee
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded');

    var marqueeElement = document.querySelector('.marquee-element');
    console.log(marqueeElement);  

    console.log("marqueeJs function: ", marqueeJs);

    if (marqueeElement && marqueeJs) {
        console.log('Initializing marquee...');
        marqueeJs(marqueeElement, { speed: 10, delay: 1000, direction: 'left' });
    } else {
        console.error('Marquee element or marqueeJs function not found!');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burgerMenu');
    const nav = document.querySelector('nav');
    
    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('open');
        nav.classList.toggle('open');
    });
});
