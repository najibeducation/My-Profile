// Toggle mobile menu
const burger = document.querySelector(".burger");
const menu = document.querySelector(".mobile-menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// ===== Highlight Section on Nav Click =====
document.querySelectorAll('.mobile-menu a, .navbar a').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');

    // Tutup menu mobile
    menu.classList.remove('open');
    burger.setAttribute("aria-expanded", "false");

    if (targetId && targetId.startsWith('#')) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        // delay biar scroll selesai dulu
        setTimeout(() => {
          targetEl.classList.add('section-flash');
          targetEl.addEventListener('animationend', () => {
            targetEl.classList.remove('section-flash');
          }, { once: true });
        }, 600);
      }
    }
  });
});

// Contact form submit handler
const form = document.querySelector(".contact form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    // Open default mail client
    const subject = encodeURIComponent("Contact from portfolio website");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;

    form.reset();
  });
}

// Toggle About text (with animation)
(function () {
  const toggleLink = document.querySelector('.about-text .toggle-about');
  const shortText = document.querySelector('.about-text .short');
  const moreText  = document.querySelector('.about-text .more');

  if (!toggleLink || !shortText || !moreText) return;

  toggleLink.addEventListener('click', function (e) {
    e.preventDefault();

    const expanded = moreText.classList.contains('show');

    if (!expanded) {
      // buka: tampilkan full, sembunyikan short
      moreText.removeAttribute('hidden');
      setTimeout(() => moreText.classList.add('show'), 10); // delay kecil biar transisi jalan
      shortText.setAttribute('hidden', '');
      toggleLink.textContent = ' Lebih sedikit';
      toggleLink.setAttribute('aria-expanded', 'true');
    } else {
      // tutup: sembunyikan full, tampilkan short
      moreText.classList.remove('show');
      moreText.addEventListener('transitionend', function handler() {
        moreText.setAttribute('hidden', '');
        moreText.removeEventListener('transitionend', handler);
      });
      shortText.removeAttribute('hidden');
      toggleLink.textContent = 'Selengkapnya';
      toggleLink.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Toggle Skills (More+ / Less-)
(function () {
  const toggleChip = document.querySelector('.skills-list .more-toggle');
  const skillsList = document.querySelector('.skills-list');
  const extraSkills = document.querySelectorAll('.skills-list .extra');

  if (!toggleChip || !extraSkills.length) return;

  toggleChip.addEventListener('click', () => {
    const isExpanded = toggleChip.textContent.includes('Less');

    if (isExpanded) {
      // Sembunyikan kembali (hapus class show + tambah hidden)
      extraSkills.forEach(skill => {
        skill.classList.remove('show');
        setTimeout(() => skill.setAttribute('hidden', ''), 300); // tunggu animasi selesai
      });
      toggleChip.textContent = 'More+';
    } else {
      // Tampilkan semua skill dengan animasi
      extraSkills.forEach(skill => {
        skill.removeAttribute('hidden');
        setTimeout(() => skill.classList.add('show'), 10); // delay kecil biar animasi jalan
      });
      toggleChip.textContent = 'Less-';
    }

    // Selalu pindahkan toggle ke akhir daftar
    skillsList.appendChild(toggleChip);
  });
})();

// ===== Work Experience Toggle =====
document.addEventListener("DOMContentLoaded", () => {
  const moreToggle = document.querySelector("#projects .more-toggle");
  const extraCards = document.querySelectorAll("#projects .extra");

  if (moreToggle) {
    moreToggle.addEventListener("click", () => {
      const isExpanded = moreToggle.textContent === "Less-";

      extraCards.forEach(card => {
        card.hidden = false; // penting: biar bisa ditransisi
        setTimeout(() => {
          if (!isExpanded) {
            card.classList.add("show");
          } else {
            card.classList.remove("show");
            setTimeout(() => { card.hidden = true; }, 400); // setelah animasi selesai
          }
        }, 10);
      });

      moreToggle.textContent = isExpanded ? "More+" : "Less-";
    });
  }
});

// ===== Education Toggle =====
document.addEventListener("DOMContentLoaded", () => {
  const eduToggle = document.querySelector("#experience .more-toggle");
  const extraItems = document.querySelectorAll("#experience .extra");

  if (eduToggle) {
    eduToggle.addEventListener("click", () => {
      const isExpanded = eduToggle.textContent === "Less-";

      extraItems.forEach(item => {
        item.hidden = false;
        setTimeout(() => {
          if (!isExpanded) {
            item.classList.add("show");
          } else {
            item.classList.remove("show");
            setTimeout(() => { item.hidden = true; }, 400);
          }
        }, 10);
      });

      eduToggle.textContent = isExpanded ? "More+" : "Less-";
    });
  }
});