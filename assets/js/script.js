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
  .brand-mark {
    width: 38px;
    height: 44px;
    border-radius: 0;
    border: none;
    background-color: transparent;
    background-image: url("data:image/png;base64,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");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    color: transparent;
    font-size: 0;
    box-shadow: none;
  }

  .brand {
    gap: 0.78rem;
  }

  .brand-copy strong {
    letter-spacing: -0.02em;
  }

  .footer-brand .brand-mark {
    margin-bottom: 0.65rem;
  }

  @media (max-width: 560px) {
    .brand-mark {
      width: 34px;
      height: 40px;
    }
  }
`;

const styleTag = document.createElement('style');
styleTag.textContent = logoStyles;
document.head.appendChild(styleTag);
