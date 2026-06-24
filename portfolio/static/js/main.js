function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

function createImage(src, alt, className) {
  const image = createElement("img", className);
  image.src = src;
  image.alt = alt || "";
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.remove();
  });
  return image;
}

function createLink(href, className, textContent) {
  const link = createElement("a", className, textContent);
  link.href = href;
  link.target = "_blank";
  link.rel = "noreferrer";
  return link;
}

function createRevealWrapper(className) {
  return createElement("div", ["reveal-on-scroll", className].filter(Boolean).join(" "));
}

function renderPortfolioBackground() {
  const root = document.getElementById("portfolio-background");

  if (!root) {
    return;
  }

  const canvas = createElement("canvas", "constellation-canvas");
  const quietLight = createElement("div", "quiet-light");
  root.append(canvas, quietLight);

  const context = canvas.getContext("2d");
  const pointer = { x: -9999, y: -9999 };
  let width = 0;
  let height = 0;
  let animationFrame;
  let nodes = [];

  function resize() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.min(95, Math.max(48, Math.floor((width * height) / 18000)));
    nodes = Array.from({ length: count }, (_, index) => ({
      x: (index * 127.1) % width,
      y: (index * 83.7) % height,
      vx: ((index % 7) - 3) * 0.045,
      vy: (((index + 3) % 9) - 4) * 0.045,
      size: index % 11 === 0 ? 1.9 : 1.15
    }));
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(7, 10, 17, 0.36)";
    context.fillRect(0, 0, width, height);

    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;
    });

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const first = nodes[i];
        const second = nodes[j];
        const distance = Math.hypot(first.x - second.x, first.y - second.y);

        if (distance < 132) {
          const opacity = (1 - distance / 132) * 0.16;
          context.strokeStyle = `rgba(156, 220, 255, ${opacity})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }
    }

    nodes.forEach((node) => {
      const pointerDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
      const isNear = pointerDistance < 170;

      context.beginPath();
      context.fillStyle = isNear
        ? "rgba(255, 255, 255, 0.92)"
        : "rgba(236, 248, 255, 0.42)";
      context.arc(node.x, node.y, node.size + (isNear ? 0.8 : 0), 0, Math.PI * 2);
      context.fill();

      if (isNear) {
        context.strokeStyle = "rgba(235, 178, 255, 0.22)";
        context.beginPath();
        context.moveTo(node.x, node.y);
        context.lineTo(pointer.x, pointer.y);
        context.stroke();
      }
    });

    animationFrame = requestAnimationFrame(draw);
  }

  function movePointer(event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }

  function leavePointer() {
    pointer.x = -9999;
    pointer.y = -9999;
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", movePointer);
  window.addEventListener("pointerleave", leavePointer);
  window.addEventListener("pagehide", () => cancelAnimationFrame(animationFrame), { once: true });
}

function renderRoles(roles) {
  const root = document.getElementById("roles-root");

  if (!root) {
    return;
  }

  roles.forEach((role) => {
    const wrapper = createRevealWrapper();
    const card = createElement("div", "role-card");
    card.append(createImage(role.image, role.title), createElement("h3", "", role.title));
    wrapper.append(card);
    root.append(wrapper);
  });
}

function renderSkills(skills) {
  const root = document.getElementById("skills-root");

  if (!root) {
    return;
  }

  const slider = createElement("div", "skills-slider");
  const track = createElement("div", "skills-track");

  [...skills, ...skills].forEach((skill) => {
    const card = createElement("div", "skill-card");
    card.append(createImage(skill.icon, skill.name), createElement("span", "", skill.name));
    track.append(card);
  });

  slider.append(track);
  root.append(slider);
}

function renderProjects(projects) {
  const root = document.getElementById("projects-root");

  if (!root) {
    return;
  }

  if (!projects.length) {
    root.append(createElement("p", "empty-section-message text-center", "Projects will appear here soon."));
    return;
  }

  projects.forEach((project) => {
    const wrapper = createRevealWrapper("col-md-4 mb-4");
    const card = createElement("div", "card h-100 shadow-sm");
    const body = createElement("div", "card-body");

    if (project.image) {
      card.append(createImage(project.image, project.title, "card-img-top"));
    }

    body.append(
      createElement("h5", "card-title", project.title),
      createElement("p", "card-text", project.description)
    );

    if (project.link) {
      body.append(createLink(project.link, "btn btn-primary", "View Project"));
    }

    card.append(body);
    wrapper.append(card);
    root.append(wrapper);
  });
}

function renderCertificates(certificates) {
  const root = document.getElementById("certificates-root");

  if (!root) {
    return;
  }

  certificates.forEach((certificate) => {
    const wrapper = createRevealWrapper("col-md-4 mb-4");
    const card = createElement("div", "card shadow-sm");
    const body = createElement("div", "card-body");

    body.append(
      createElement("h5", "card-title", certificate.title),
      createElement("p", "card-text", certificate.issuer),
      createLink(certificate.link, "btn btn-outline-primary", "View Certificate")
    );

    card.append(body);
    wrapper.append(card);
    root.append(wrapper);
  });
}

function setupScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  document.documentElement.classList.add("reveal-ready");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    revealItems.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((element) => observer.observe(element));
}

document.addEventListener("DOMContentLoaded", () => {
  const portfolioData = window.portfolioData || {};

  renderPortfolioBackground();
  renderRoles(portfolioData.roles || []);
  renderSkills(portfolioData.skills || []);
  renderProjects(portfolioData.projects || []);
  renderCertificates(portfolioData.certificates || []);
  setupScrollReveal();
});
