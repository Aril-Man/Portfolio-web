// Initialize AOS (Animate On Scroll)
AOS.init({
    once: true, // Whether animation should happen only once - while scrolling down
    offset: 100, // Offset (in px) from the original trigger point
    duration: 800, // Duration of animation
    easing: 'ease-out-cubic', // Easing function
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// Three.js 3D Object Implementation
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Geometry (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(2.5, 0);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00f2ea, // Accent color
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner shape for depth
    const innerGeometry = new THREE.IcosahedronGeometry(1.5, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x7928ca, // Secondary gradient color
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerSphere);

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Mouse move event
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
        sphere.rotation.z += 0.005; // Constant slow rotation

        innerSphere.rotation.y += 0.5 * (targetX - innerSphere.rotation.y);
        innerSphere.rotation.x += 0.5 * (targetY - innerSphere.rotation.x);
        innerSphere.rotation.z -= 0.005; // Reverse rotation for inner

        renderer.render(scene, camera);
    };

    animate();
};

// Initialize Three.js after DOM content is loaded
document.addEventListener('DOMContentLoaded', initThreeJS);

// Load More Experience
const loadMoreBtn = document.getElementById('load-more-btn');
const hiddenItems = document.querySelectorAll('.experience-hidden');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        hiddenItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('experience-hidden');
        });
        
        loadMoreBtn.style.display = 'none';
        
        // Refresh AOS to animate new items
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    });
}
