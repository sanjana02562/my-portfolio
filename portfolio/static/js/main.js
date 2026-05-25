const { useEffect, useRef } = React;

function PortfolioBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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

    function movePointer(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function leavePointer() {
      pointer.x = -9999;
      pointer.y = -9999;
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

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", movePointer);
    window.addEventListener("pointerleave", leavePointer);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerleave", leavePointer);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="constellation-canvas" />
      <div className="quiet-light" />
    </>
  );
}

function RoleCard({ role }) {
  return (
    <div className="role-card">
      <img src={role.image} alt={role.title} />
      <h3>{role.title}</h3>
    </div>
  );
}

function RolesList({ roles = [] }) {
  return (
    <>
      {roles.map((role) => (
        <RoleCard key={role.title} role={role} />
      ))}
    </>
  );
}

function SkillCard({ skill }) {
  return (
    <div className="skill-card">
      <img src={skill.icon} alt={skill.name} />
      <span>{skill.name}</span>
    </div>
  );
}

function SkillsSlider({ skills = [] }) {
  const loopedSkills = [...skills, ...skills];

  return (
    <div className="skills-slider">
      <div className="skills-track">
        {loopedSkills.map((skill, index) => (
          <SkillCard key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        {project.image && (
          <img src={project.image} className="card-img-top" alt={project.title} />
        )}
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsGrid({ projects = [] }) {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={`${project.title}-${project.link || "local"}`}
          project={project}
        />
      ))}
    </>
  );
}

function CertificateCard({ certificate }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{certificate.title}</h5>
          <p className="card-text">{certificate.issuer}</p>
          <a
            href={certificate.link}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary"
          >
            View Certificate
          </a>
        </div>
      </div>
    </div>
  );
}

function CertificatesGrid({ certificates = [] }) {
  return (
    <>
      {certificates.map((certificate) => (
        <CertificateCard key={certificate.title} certificate={certificate} />
      ))}
    </>
  );
}

function renderReactApp(rootId, component) {
  const root = document.getElementById(rootId);

  if (root) {
    ReactDOM.createRoot(root).render(component);
  }
}

const portfolioData = window.portfolioData || {};

renderReactApp("portfolio-background", <PortfolioBackground />);
renderReactApp("roles-root", <RolesList roles={portfolioData.roles} />);
renderReactApp("skills-root", <SkillsSlider skills={portfolioData.skills} />);
renderReactApp("projects-root", <ProjectsGrid projects={portfolioData.projects} />);
renderReactApp(
  "certificates-root",
  <CertificatesGrid certificates={portfolioData.certificates} />
);
