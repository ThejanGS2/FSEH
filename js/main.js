// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for load to ensure layout is ready
window.addEventListener('load', () => {

    // Hero Entrance Animation (Staggered Fade Up)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Split Text Logic for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Simple manual split to avoid Splitting.js dependency for now
        const text = heroTitle.innerHTML;
        // Note: This matches the specific BR structure in HTML
        // Use a more robust approach if text changes often, but fine for static
        const lines = text.split('<br>');

        let newHtml = '';
        lines.forEach((line, index) => {
            const cleanText = line.trim();
            let lineHtml = '';
            for (let char of cleanText) {
                if (char === ' ') lineHtml += '&nbsp;';
                else lineHtml += `<span class="char">${char}</span>`;
            }
            newHtml += lineHtml;
            if (index < lines.length - 1) newHtml += '<br>';
        });

        heroTitle.innerHTML = newHtml;
    }

    // Ensure elements are visible before animating (removing visibility: hidden)
    gsap.set('.fade-up', { autoAlpha: 0 });
    gsap.set('.char', { y: 100, autoAlpha: 0, display: 'inline-block' });

    tl.to('.hero-title .char', {
        y: 0,
        autoAlpha: 1,
        stagger: 0.02,
        duration: 1,
        ease: 'back.out(1.7)'
    })
        .to('.fade-up', {
            autoAlpha: 1, // Animate to visible
            y: 0,
            duration: 1,
            stagger: 0.1,
            clearProps: 'all'
        }, "-=0.5"); // Overlap slightly

    // Parallax Background Text ("BIG IDEAS")
    gsap.to('.bg-watermark', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });

    // Floating Cards Animation (Scroll Interaction)
    gsap.to('.float-card.left', {
        x: -60,
        y: 80,
        rotation: -5,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    gsap.to('.float-card.right', {
        x: 60,
        y: -80,
        rotation: 5,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    // Marquee Animation
    gsap.to('.marquee-content', {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1
    });

    // General Fade Up for new sections
    gsap.utils.toArray('.services-section .fade-up, .feature-section .fade-up, .site-footer .fade-up').forEach((element) => {
        gsap.fromTo(element,
            { autoAlpha: 0, y: 50 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 90%', // Trigger earlier for footer
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Button Hover Effects (JavaScript enhanced)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Optional: Magnet effect or custom pointer logic could go here
        });
    });

});
