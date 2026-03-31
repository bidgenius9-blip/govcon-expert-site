const body = document.body;
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-site-nav]');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
    const expanded = body.classList.contains('menu-open');
    toggle.setAttribute('aria-expanded', String(expanded));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const fades = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window && fades.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  fades.forEach((item) => observer.observe(item));
} else {
  fades.forEach((item) => item.classList.add('visible'));
}

const yearSlot = document.querySelector('[data-current-year]');
if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const organization = (formData.get('organization') || '').toString().trim();
    const projectType = (formData.get('projectType') || '').toString().trim();
    const details = (formData.get('details') || '').toString().trim();

    if (!name || !email || !details) {
      if (formStatus) {
        formStatus.textContent = 'Please add your name, email, and project details so the message is complete.';
        formStatus.className = 'form-status error';
      }
      return;
    }

    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${organization || 'Not provided'}`,
      `Project type: ${projectType || 'Not provided'}`,
      '',
      'Project details:',
      details
    ];

    const bodyText = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:philipthegovconexpert@gmail.com?subject=${subject}&body=${bodyText}`;

    if (formStatus) {
      formStatus.textContent = 'Your email app should open with a drafted message. If it does not, use the contact links below.';
      formStatus.className = 'form-status success';
    }

    contactForm.reset();
  });
}

const logoStyles = `
  .brand {
    gap: 0.7rem;
  }

  .brand-mark {
    width: 168px;
    height: 50px;
    border: none;
    border-radius: 0;
    display: block;
    background: transparent url("assets/img/logo-dark.png") center / contain no-repeat;
    color: transparent;
    font-size: 0;
    box-shadow: none;
  }

  .brand-copy {
    display: none;
  }

  .footer-brand .brand-mark {
    width: 176px;
    height: 54px;
    margin-bottom: 0.65rem;
  }

  @media (max-width: 560px) {
    .brand-mark {
      width: 138px;
      height: 42px;
    }

    .footer-brand .brand-mark {
      width: 154px;
      height: 48px;
    }
  }
`;

const styleTag = document.createElement('style');
styleTag.textContent = logoStyles;
document.head.appendChild(styleTag);
