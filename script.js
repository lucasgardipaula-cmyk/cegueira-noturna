/**
 * ============================================
 * SITE EDUCATIVO - CEGUEIRA NOTURNA
 * script.js
 * Funções: menu responsivo, rolagem suave,
 * flashcards interativos, edição do rodapé,
 * anúncios de acessibilidade.
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Elementos principais ----------
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav-link');
  const flashcards = document.querySelectorAll('.flashcard');
  const srAnnounce = document.getElementById('sr-announce');
  const editables = document.querySelectorAll('[contenteditable="true"]');

  // ---------- 1. MENU RESPONSIVO ----------
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
      );
    });

    // Fecha o menu ao clicar em um link (mobile)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navList.classList.contains('open')) {
          navList.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        }
      });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
      if (
        navList.classList.contains('open') &&
        !navList.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navList.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
      }
    });
  }

  // ---------- 2. ROLAGEM SUAVE ----------
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
          const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
          window.scrollTo({
            top: top,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ---------- 3. FLASHCARDS - VIRAR AO CLICAR / TOCAR / TECLADO ----------
  function announce(message) {
    if (srAnnounce) {
      srAnnounce.textContent = '';
      setTimeout(() => {
        srAnnounce.textContent = message;
      }, 50);
    }
  }

  function toggleCard(card) {
    const isFlipped = card.classList.toggle('flipped');
    const frontText = card.querySelector('.flashcard-front h3')?.textContent || 'Card';
    if (isFlipped) {
      announce(`Card virado: resposta revelada. ${frontText}`);
    } else {
      announce(`Card fechado: pergunta visível. ${frontText}`);
    }
  }

  flashcards.forEach((card) => {
    card.addEventListener('click', () => {
      toggleCard(card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });
  });

  // ---------- 4. EDIÇÃO DO RODAPÉ E LEGENDAS ----------
  editables.forEach((el) => {
    el.addEventListener('focus', () => {
      const placeholder = el.getAttribute('data-placeholder');
      if (placeholder && el.textContent.trim() === placeholder) {
        el.textContent = '';
      }
    });

    el.addEventListener('blur', () => {
      const placeholder = el.getAttribute('data-placeholder');
      if (placeholder && el.textContent.trim() === '') {
        el.textContent = placeholder;
      }
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        el.blur();
      }
    });
  });

  // ---------- 5. MENSAGEM INICIAL DE ACESSIBILIDADE ----------
  setTimeout(() => {
    announce('Página carregada. Use os botões de navegação ou os flashcards interativos. Os cards podem ser virados com clique, toque ou tecla Enter.');
  }, 800);

  // ---------- 6. FECHAR CARDS AO CLICAR FORA ----------
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.flashcard')) {
      flashcards.forEach((card) => {
        if (card.classList.contains('flipped')) {
          card.classList.remove('flipped');
        }
      });
    }
  });

  flashcards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});