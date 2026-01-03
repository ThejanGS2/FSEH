// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Mouse Movement
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    gsap.to(cursorDot, {
        x: posX,
        y: posY,
        duration: 0,
        overwrite: true
    });

    // Outline follows with slight delay
    gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto" // Prevents stacking tweens for performance
    });
});

// Click Interaction (Down/Up)
window.addEventListener('mousedown', () => {
    gsap.to(cursorOutline, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
        overwrite: true
    });
});

window.addEventListener('mouseup', () => {
    gsap.to(cursorOutline, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)",
        overwrite: true
    });
});

// Hover States
const hoverTargets = document.querySelectorAll('a, button, .service-card, .btn');

hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');

        // Scale up outline
        gsap.to(cursorOutline, {
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true
        });
    });

    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');

        // Reset scale (check if mouse is down first? simpler to just reset)
        gsap.to(cursorOutline, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true
        });
    });
});

// Magnetic Buttons
const magButtons = document.querySelectorAll('.btn');

magButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move button slightly towards mouse
        gsap.to(btn, {
            x: x * 0.3, // Slightly stronger magnet
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
        });
    });

    btn.addEventListener('mouseleave', () => {
        // Snap back
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
            overwrite: true
        });
    });
});
