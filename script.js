// ==========================================
// MENU MOBILE
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos os elementos com classe fade-in-scroll
document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
});

// ==========================================
// CONTADOR ANIMADO (Estatísticas)
// ==========================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Observar contadores
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ==========================================
// SLIDER DE DEPOIMENTOS
// ==========================================

let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // Auto-play
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// ==========================================
// POP-UP DE CAPTURA DE E-MAIL
// ==========================================

const popup = document.getElementById('emailPopup');
const popupClose = document.querySelector('.popup-close');
const popupForm = document.getElementById('popupForm');

// Mostrar pop-up após 30 segundos
setTimeout(() => {
    // Verificar se já foi mostrado nesta sessão
    if (!sessionStorage.getItem('popupShown')) {
        popup.classList.add('active');
        sessionStorage.setItem('popupShown', 'true');
    }
}, 30000);

// Fechar pop-up
if (popupClose) {
    popupClose.addEventListener('click', () => {
        popup.classList.remove('active');
    });
}

// Fechar ao clicar fora
if (popup) {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
}

// Submeter formulário
if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = popupForm.querySelector('input[type="email"]').value;
        
        // Aqui você integraria com seu serviço de email marketing
        console.log('Email capturado:', email);
        
        alert('Obrigado! Em breve você receberá nosso guia no e-mail: ' + email);
        popup.classList.remove('active');
    });
}

// ==========================================
// FILTRO DE PORTFÓLIO
// ==========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover classe active de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));
        // Adicionar classe active ao botão clicado
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ==========================================
// FAQ ACCORDION
// ==========================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fechar todos os FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir o clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ==========================================
// SMOOTH SCROLL PARA ÂNCORAS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// HEADER FIXO COM SOMBRA AO SCROLL
// ==========================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// FORMULÁRIO DE CONTATO
// ==========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Aqui você integraria com seu backend ou serviço de email
        console.log('Dados do formulário:', data);
        
        // Simular envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ==========================================
// VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL
// ==========================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    let isValid = true;
    let errorMessage = '';
    
    // Validação de campo obrigatório
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }
    
    // Validação de email
    if (type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Digite um e-mail válido';
        }
    }
    
    // Validação de telefone
    if (input.name === 'phone' && value !== '') {
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Digite um telefone válido';
        }
    }
    
    // Mostrar/esconder mensagem de erro
    let errorElement = input.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        errorElement.style.color = '#ff0000';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
    }
}

// ==========================================
// PARÂMETROS DE URL (para pre-selecionar serviços)
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const plano = urlParams.get('plano');
    const servico = urlParams.get('servico');
    
    const serviceSelect = document.getElementById('serviceType');
    
    if (serviceSelect) {
        if (plano) {
            serviceSelect.value = plano;
        } else if (servico) {
            serviceSelect.value = servico;
        }
    }
});

// ==========================================
// LAZY LOADING DE IMAGENS
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// CONSOLE LOG CUSTOMIZADO
// ==========================================

console.log('%c🎨 MALHADO Creative Studio', 'font-size: 20px; font-weight: bold; color: #D97940;');
console.log('%cSite desenvolvido com ❤️', 'font-size: 12px; color: #666;');
console.log('%cProcurando por talentos? Entre em contato!', 'font-size: 12px; color: #8B956D;');

// Coloque no seu arquivo script.js
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-scroll').forEach((el) => observer.observe(el));
});