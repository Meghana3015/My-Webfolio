document.addEventListener("DOMContentLoaded", function () {
  const roles = [
    '<span class="dark">UI/UX</span> <span class="light">Designer</span>',
    '<span class="dark">Frontend</span> <span class="light">Developer</span>',
    '<span class="dark">Marketing</span> <span class="light">Designer</span>'
  ];
  const typedText = document.querySelector(".typed-text");
  let roleIndex = 0;
  let charIndex = 0;
  let typing = true;
  let currentRole = "";

  function typeRole() {
    if (!typedText) return;
    currentRole = roles[roleIndex];
    // Remove HTML tags for typing effect
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = currentRole;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    if (typing) {
      if (charIndex < plainText.length) {
        // Find the substring in HTML that matches the length of plainText
        let htmlToShow = "";
        let count = 0;
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
        let htmlToShow = "";
        let count = 0;
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

  // Hide the scroll hint after 5 seconds or on first scroll
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

