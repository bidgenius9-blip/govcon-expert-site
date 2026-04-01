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

const brandMarks = document.querySelectorAll('.brand-mark');
brandMarks.forEach((mark) => {
  mark.textContent = 'GC';
  mark.setAttribute('aria-label', 'GC monogram');
});

const logoStyles = `
  .site-header .brand {
    gap: 0.88rem;
  }

  .site-header .brand-mark {
    width: 52px;
    height: 52px;
    border-radius: 18px;
    border: 1px solid rgba(242, 207, 121, 0.28);
    background: linear-gradient(145deg, rgba(242, 207, 121, 0.24), rgba(217, 171, 73, 0.72));
    color: #07111f;
    display: grid;
    place-items: center;
    font-size: 1.12rem;
    font-weight: 800;
    letter-spacing: -0.08em;
    line-height: 1;
    box-shadow: 0 14px 26px rgba(217, 171, 73, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.42);
    text-transform: uppercase;
  }

  .site-header .brand-copy {
    display: block;
  }

  .site-header .brand-copy strong {
    font-size: 1rem;
    letter-spacing: -0.02em;
  }

  .site-header .brand-copy span {
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .site-footer .brand-mark {
    width: 58px;
    height: 58px;
    margin-bottom: 0.85rem;
    border-radius: 20px;
    border: 1px solid rgba(242, 207, 121, 0.2);
    background: linear-gradient(145deg, rgba(242, 207, 121, 0.22), rgba(217, 171, 73, 0.62));
    color: #07111f;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.08em;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 560px) {
    .site-header .brand-mark {
      width: 46px;
      height: 46px;
      border-radius: 16px;
      font-size: 1rem;
    }

    .site-header .brand-copy strong {
      font-size: 0.92rem;
    }

    .site-header .brand-copy span {
      font-size: 0.72rem;
    }

    .site-footer .brand-mark {
      width: 52px;
      height: 52px;
      border-radius: 18px;
      font-size: 1.08rem;
    }
  }
`;

const existingLogoStyle = document.querySelector('[data-brand-logo-style]');
if (existingLogoStyle) existingLogoStyle.remove();

const styleTag = document.createElement('style');
styleTag.setAttribute('data-brand-logo-style', 'true');
styleTag.textContent = logoStyles;
document.head.appendChild(styleTag);
