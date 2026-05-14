/**
 * REDE DE PROTEÇÃO - JavaScript Vanilla
 * Interatividade e funcionalidades do site
 */

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================

let secaoAtual = 'inicio';
let posicaoScroll = 0;

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacao();
    inicializarEventosScroll();
    inicializarEventosBotoes();
});

// ============================================
// NAVEGAÇÃO
// ============================================

function inicializarNavegacao() {
    const linksNavegacao = document.querySelectorAll('.nav-link');
    linksNavegacao.forEach(link => {
        link.addEventListener('click', function() {
            const secao = this.getAttribute('data-section');
            rolarParaSecao(secao);
        });
    });
}

function rolarParaSecao(idSecao) {
    const secao = document.getElementById(idSecao);
    if (secao) {
        secao.scrollIntoView({ behavior: 'smooth' });
        atualizarLinkAtivo(idSecao);
        secaoAtual = idSecao;
    }
}

function atualizarLinkAtivo(idSecao) {
    const linksNavegacao = document.querySelectorAll('.nav-link');
    linksNavegacao.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === idSecao) {
            link.classList.add('active');
        }
    });
}

// ============================================
// EVENTOS DE SCROLL
// ============================================

function inicializarEventosScroll() {
    window.addEventListener('scroll', function() {
        posicaoScroll = window.scrollY;
        atualizarSecaoAtiva();
        atualizarEstiloNavbar();
    });
}

function atualizarSecaoAtiva() {
    const secoes = document.querySelectorAll('section[id]');
    secoes.forEach(secao => {
        const topo = secao.offsetTop;
        const altura = secao.clientHeight;
        if (posicaoScroll >= topo - 150 && posicaoScroll < topo + altura - 150) {
            secaoAtual = secao.id;
            atualizarLinkAtivo(secao.id);
        }
    });
}

function atualizarEstiloNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (posicaoScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(139, 90, 142, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(139, 90, 142, 0.1)';
    }
}

// ============================================
// EVENTOS DE BOTÕES
// ============================================

function inicializarEventosBotoes() {
    const botaoCta = document.querySelector('.cta-button');
    if (botaoCta) {
        botaoCta.addEventListener('click', function() {
            rolarParaSecao('leis');
        });
    }
    adicionarEfeitosHoverCards();
}

function adicionarEfeitosHoverCards() {
    const cards = document.querySelectorAll('.info-card, .help-card, .feature, .timeline-content');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// ANIMAÇÕES DE ENTRADA
// ============================================

function observarElementos() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    const elementos = document.querySelectorAll('.info-card, .help-card, .feature, .timeline-item');
    elementos.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Chamar observeElements quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observarElementos);
} else {
    observarElementos();
}

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Anima um número de 0 até o valor final
 * Útil para contadores
 */
function animarContador(elemento, valorFinal, duracao = 2000) {
    let valorAtual = 0;
    const incremento = valorFinal / (duracao / 16);
    const intervalo = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(intervalo);
        }
        elemento.textContent = Math.floor(valorAtual);
    }, 16);
}

/**
 * Adiciona classe com delay
 */
function adicionarClasseComDelay(elemento, nomeClasse, delay = 0) {
    setTimeout(() => {
        elemento.classList.add(nomeClasse);
    }, delay);
}

/**
 * Remove classe com delay
 */
function removerClasseComDelay(elemento, nomeClasse, delay = 0) {
    setTimeout(() => {
        elemento.classList.remove(nomeClasse);
    }, delay);
}

/**
 * Verifica se um elemento está visível na viewport
 */
function elementoEstaNaViewport(elemento) {
    const rect = elemento.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce para otimizar eventos frequentes
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle para limitar frequência de eventos
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// INTERATIVIDADE AVANÇADA
// ============================================

/**
 * Adiciona efeito de ripple ao clicar em botões
 */
function adicionarEfeitoRipple() {
    const botoes = document.querySelectorAll('button, .social-link, .card-link');
    botoes.forEach(botao => {
        botao.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// PERFORMANCE E OTIMIZAÇÃO
// ============================================

/**
 * Lazy loading para imagens
 */
function inicializarLazyLoading() {
    const imagens = document.querySelectorAll('img[data-src]');
    const observadorImagens = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    imagens.forEach(img => observadorImagens.observe(img));
}

/**
 * Prefetch de recursos
 */
function preCarregarRecursos() {
    const links = [
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Lato:wght@400;700&display=swap'
    ];
    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    });
}

// ============================================
// ACESSIBILIDADE
// ============================================

/**
 * Melhora acessibilidade com teclado
 */
function melhorarAcessibilidadeTeclado() {
    const elementosFocaveis = document.querySelectorAll('button, a, input, [tabindex]');
    elementosFocaveis.forEach(elemento => {
        elemento.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
}

/**
 * Respeita preferência de movimento reduzido
 */
function respeitarMovimentoReduzido() {
    const prefereReduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefereReduzir) {
        document.documentElement.style.scrollBehavior = 'auto';
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// INICIALIZAÇÃO COMPLETA
// ============================================

// Executar ao carregar a página
window.addEventListener('load', function() {
    adicionarEfeitoRipple();
    inicializarLazyLoading();
    preCarregarRecursos();
    melhorarAcessibilidadeTeclado();
    respeitarMovimentoReduzido();
    console.log('🎉 Rede de Proteção - Site carregado com sucesso!');
});

// ============================================
// SERVICE WORKER (Opcional para PWA)
// ============================================

/**
 * Registrar service worker para funcionalidade offline
 */


// ============================================
// ANALYTICS (Opcional)
// ============================================

/**
 * Rastrear cliques em links importantes
 */
function rastrearCliquesImportantes() {
    const elementos = document.querySelectorAll('.cta-button, .card-link, .social-link');
    elementos.forEach(elemento => {
        elemento.addEventListener('click', function() {
            if (window.gtag) {
                gtag('event', 'click', {
                    'element': this.textContent,
                    'section': secaoAtual
                });
            }
        });
    });
}

// Executar rastreamento quando disponível
document.addEventListener('DOMContentLoaded', trackImportantClicks);

// ============================================
// EXPORTAR FUNÇÕES GLOBAIS
// ============================================

// Disponibilizar funções globalmente se necessário
window.scrollToSection = scrollToSection;
window.animateCounter = animateCounter;
window.isElementInViewport = isElementInViewport;
