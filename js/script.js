document.addEventListener('DOMContentLoaded', function() {
    
    // Carousel functionality
    setupCarousel();
    
    // Product filtering functionality
    setupProductFilter();
});

// Carousel functionality
function setupCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!carouselContainer || slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    const slideWidth = 100; // 100% width
    
    // Initialize the carousel
    function initCarousel() {
        // Set the width of the container based on the number of slides
        carouselContainer.style.width = `${slides.length * 100}%`;
        
        // Set each slide to equal width
        slides.forEach(slide => {
            slide.style.width = `${100 / slides.length}%`;
        });
        
        // Start automatic sliding
        startSlideTimer();
    }
    
    // Function to move to a specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        
        currentSlide = slideIndex;
        carouselContainer.style.transform = `translateX(-${currentSlide * slideWidth / slides.length}%)`;
        
        // Update indicators
        updateIndicators();
    }
    
    // Update the active indicator
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Start automatic sliding
    function startSlideTimer() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Start a new interval
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds
    }
    
    // Event listeners for prev and next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            startSlideTimer(); // Reset the timer
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            startSlideTimer(); // Reset the timer
        });
    }
    
    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            startSlideTimer(); // Reset the timer
        });
    });
    
    // Pause auto-sliding when hovering over the carousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startSlideTimer();
        });
    }
    
    // Initialize the carousel
    initCarousel();
}

// Product filtering functionality
function setupProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length === 0 || productCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show/hide products based on filter
            productCards.forEach(card => {
                if (filter === 'todos') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 100, // Ajuste este valor conforme necessário
            behavior: 'smooth'
        });
        
        // Fechar menu mobile se estiver aberto
        if(menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-title, .sobre-content, .product-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// Menu mobile
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Carrossel
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentIndex = 0;
const slideWidth = 100; // Em porcentagem

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    
    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
        if(index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Permitir clique nos indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Alternar slides automaticamente a cada 5 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}, 5000);

// Filtro de produtos
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover classe active de todos os botões
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar classe active ao botão clicado
        btn.classList.add('active');
        
        // Filtrar produtos
        const filter = btn.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if(filter === 'todos' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Fechar menu mobile se estiver aberto
        if(menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
});

// Formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Validação simples
    if(!name || !email || !phone || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Simulação de envio (aqui você adicionaria o código para enviar os dados)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
});