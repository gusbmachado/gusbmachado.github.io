/* =============== Change Background Header =============== */
function scrollHeader() {
    const header = document.getElementById('header');

    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll',scrollHeader)

/* =============== Services Modal =============== */
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalClose = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i)
    })
})

modalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        modalViews.forEach((mv) => {
            mv.classList.remove('active-modal')
        })
    })
})

/* =============== Mixitup Filter Portfolio =============== */
var mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l => l.addEventListener('click', activeWork))


/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestmonial = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
      },
  });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }
        else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== LIGHT DARK THEME ===============*/ 
function handleTheme() {
    var element = document.body;
    element.classList.toggle("light-mode");
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset: true,
})

sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, {delay: 700})
sr.reveal(`.home__social, .home__scroll`, {delay: 900, origin: 'bottom'})

/*=============== Experience Time ===============*/

function XPtime(date) {
    const old_d = new Date(date);
    const new_d = new Date();
    
    var diff = Math.abs(new_d - old_d);
    
    var y = Math.floor(diff / 31556952000);
    var m = Math.floor(diff / 2592000000) % 12;
    var aux = y;
    
    if (y > 1) {
        y += ' years ';  
    } else {
        y += ' year ';  
    }

    /*=============== RESUME / DOCS - language detection, preview, downloads ===============*/
    function detectPreferredLang() {
        try {
            const nav = navigator.language || navigator.userLanguage || 'en';
            if (nav.toLowerCase().startsWith('pt')) return 'pt';
            return 'en';
        } catch (e) {
            return 'en';
        }
    }

    function setResumeLanguage(lang) {
        const cards = document.querySelectorAll('.resume__card');
        cards.forEach(card => {
            const cardLang = card.getAttribute('data-lang');
            if (lang === 'auto') {
                // show all but highlight preferred
                card.style.display = '';
            } else if (cardLang === 'all') {
                card.style.display = '';
            } else {
                card.style.display = (cardLang === lang) ? '' : 'none';
            }
        });
    }

    function openResumePreview(pdfPath) {
        const modal = document.getElementById('resumeModal');
        const iframe = document.getElementById('resumePreview');
        iframe.src = pdfPath;
        modal.classList.add('active-modal');
    }

    function closeResumePreview() {
        const modal = document.getElementById('resumeModal');
        const iframe = document.getElementById('resumePreview');
        iframe.src = '';
        modal.classList.remove('active-modal');
    }

    document.addEventListener('DOMContentLoaded', function() {
        const selector = document.getElementById('resumeLang');
        if (selector) {
            // initial selection: try saved theme/lang then detect
            const saved = localStorage.getItem('resumeLang') || 'auto';
            selector.value = saved;
            const langToUse = (saved === 'auto') ? detectPreferredLang() : saved;
            setResumeLanguage(saved === 'auto' ? langToUse : saved);

            selector.addEventListener('change', () => {
                const val = selector.value;
                localStorage.setItem('resumeLang', val);
                const toUse = (val === 'auto') ? detectPreferredLang() : val;
                setResumeLanguage(val === 'auto' ? toUse : val);
            });
        }

        // Preview buttons
        document.querySelectorAll('.resume-preview').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pdf = btn.getAttribute('data-pdf');
                if (pdf) openResumePreview(pdf);
            });
        });

        const closeBtn = document.getElementById('resumeModalClose');
        if (closeBtn) closeBtn.addEventListener('click', closeResumePreview);
        // close by clicking backdrop
        const modal = document.getElementById('resumeModal');
        if (modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) closeResumePreview();
        });
    });

    if (m > 1) {
        m += ' months ';  
    } else {
        m += ' months ';  
    }

    if (aux > 0) {
        return(y + m);  
    } else {
        return(m);
    }
  }