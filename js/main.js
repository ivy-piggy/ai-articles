/* ✦ AI 文章集萃 — Main JS */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Progress Bar ===== */
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressFill.style.width = progress + '%';
    });
  }

  /* ===== Nav Scroll Effect ===== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ===== Mobile Nav Toggle ===== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ===== Active Nav Highlight ===== */
  const sections = document.querySelectorAll('.module-section, .about-section, .hero');
  const navItems = document.querySelectorAll('.nav-links a');
  if (sections.length && navItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            navItems.forEach(a => {
              a.classList.toggle('active', a.getAttribute('href') === '#' + id);
            });
          }
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  /* ===== Scroll Reveal ===== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  /* ===== Animated Counter ===== */
  const counterEl = document.querySelector('[data-count]');
  if (counterEl) {
    const target = parseInt(counterEl.dataset.count, 10);
    if (target > 0) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let current = 0;
            const step = Math.max(1, Math.floor(target / 60));
            const interval = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              counterEl.textContent = current;
            }, 25);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counterObserver.observe(counterEl);
    }
  }

  /* ===== Back to Top Button ===== */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== Hero BG Floating Particles ===== */
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;position:absolute;inset:0;';
    heroBg.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = heroBg.offsetWidth;
      h = canvas.height = heroBg.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(0, 212, 255, 0.3)',
      'rgba(168, 85, 247, 0.25)',
      'rgba(45, 212, 191, 0.2)',
      'rgba(245, 158, 11, 0.2)',
    ];

    const NUM_PARTICLES = 50;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 0.5 + 0.5,
      });
    }

    let animFrame;
    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) { p.y = h; p.vy = -Math.abs(p.vy) * 0.5; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.03 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(animate);
    }
    animate();
  }

});
