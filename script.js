document.addEventListener("DOMContentLoaded", function () {
  // Typed Role Animation
  const roles = [
    '<span class="dark">UI/UX</span> <span class="light">Designer</span>',
    '<span class="dark">Frontend</span> <span class="light">Developer</span>',
    '<span class="dark">Marketing</span> <span class="light">Designer</span>'
  ];
  const typedText = document.querySelector(".typed-text");
  let roleIndex = 0, charIndex = 0, typing = true, currentRole = "";

  function typeRole() {
    if (!typedText) return;
    currentRole = roles[roleIndex];
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = currentRole;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    if (typing) {
      if (charIndex < plainText.length) {
        let htmlToShow = "", count = 0;
        for (let i = 0; i < currentRole.length; i++) {
          htmlToShow += currentRole[i];
          if (currentRole[i] !== "<") {
            count++;
          } else {
            while (currentRole[i] !== ">" && i < currentRole.length) {
              i++;
              htmlToShow += currentRole[i];
            }
          }
          if (count >= charIndex + 1) break;
        }
        typedText.innerHTML = htmlToShow;
        charIndex++;
        setTimeout(typeRole, 70);
      } else {
        typing = false;
        setTimeout(typeRole, 1200);
      }
    } else {
      if (charIndex > 0) {
        let htmlToShow = "", count = 0;
        for (let i = 0; i < currentRole.length; i++) {
          htmlToShow += currentRole[i];
          if (currentRole[i] !== "<") {
            count++;
          } else {
            while (currentRole[i] !== ">" && i < currentRole.length) {
              i++;
              htmlToShow += currentRole[i];
            }
          }
          if (count >= charIndex - 1) break;
        }
        typedText.innerHTML = htmlToShow;
        charIndex--;
        setTimeout(typeRole, 30);
      } else {
        typing = true;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 400);
      }
    }
  }

  // Hide scroll hint after 5s or on first scroll/touch
  const scrollHint = document.getElementById('scrollHint');
  function hideScrollHint() {
    if (scrollHint) {
      scrollHint.style.display = 'none';
      window.removeEventListener('wheel', hideScrollHint);
      window.removeEventListener('touchstart', hideScrollHint);
    }
  }
  setTimeout(hideScrollHint, 5000);
  window.addEventListener('wheel', hideScrollHint, { once: true });
  window.addEventListener('touchstart', hideScrollHint, { once: true });

  typeRole();
});

document.addEventListener('click', function (event) {
  if (!event.target.matches('#print-page')) return;
  event.preventDefault();
  window.print();
}, false);

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submitted:', data);
      alert('Thank you for your message!');
      contactForm.reset();
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    scrollHint.addEventListener('click', function () {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
});
