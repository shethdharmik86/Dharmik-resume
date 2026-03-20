function renderChips(container, items) {
  container.innerHTML = "";
  items.forEach((s) => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = s;
    container.appendChild(span);
  });
}

async function loadResume() {
  const res = await fetch("data.json");
  const data = await res.json();

  document.title = data.name + " | Resume";
  document.getElementById("name").textContent = data.name;
  document.getElementById("role").textContent = data.role;
  document.getElementById("summary").textContent = data.summary;

  const contact = document.getElementById("contact");
  contact.innerHTML = "";
  data.contactButtons.forEach((c) => {
    const a = document.createElement("a");
    a.href = c.href;
    a.textContent = c.label;
    a.target = "_blank";
    a.rel = "noopener";
    contact.appendChild(a);
  });

  const quick = document.getElementById("quick");
  quick.innerHTML = "<h3>Key Information</h3>";
  if (data.quickInfo && data.quickInfo.length > 0) {
    data.quickInfo.forEach((q) => {
      const p = document.createElement("p");
      p.textContent = q;
      quick.appendChild(p);
    });
  } else {
    quick.style.display = "none";
  }

  const skillGroups = document.getElementById("skillGroups");
  const skillsFallback = document.getElementById("skills");
  if (data.skillGroups && data.skillGroups.length > 0) {
    skillGroups.innerHTML = "";
    data.skillGroups.forEach((group) => {
      const card = document.createElement("div");
      card.className = "skill-group";
      const title = document.createElement("h3");
      title.textContent = group.title;
      card.appendChild(title);

      const chips = document.createElement("div");
      chips.className = "chips";
      renderChips(chips, group.items || []);
      card.appendChild(chips);

      skillGroups.appendChild(card);
    });
    skillsFallback.style.display = "none";
  } else if (data.skills && data.skills.length > 0) {
    renderChips(skillsFallback, data.skills);
  } else {
    document.getElementById("skillsSection").style.display = "none";
  }

  const softSkills = document.getElementById("softSkills");
  if (data.softSkills && data.softSkills.length > 0) {
    renderChips(softSkills, data.softSkills);
  } else {
    document.getElementById("softSkillsSection").style.display = "none";
  }

  const languages = document.getElementById("languages");
  if (data.languages && data.languages.length > 0) {
    renderChips(languages, data.languages);
  } else {
    document.getElementById("languagesSection").style.display = "none";
  }

  const experience = document.getElementById("experience");
  experience.innerHTML = "";
  if (data.experience && data.experience.length > 0) {
    data.experience.forEach((e) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML =
        "<h3>" +
        e.role +
        " - " +
        e.company +
        "</h3><div class=\"meta\">" +
        e.period +
        " - " +
        e.location +
        "</div>";

      const ul = document.createElement("ul");
      (e.points || []).forEach((p) => {
        const li = document.createElement("li");
        li.textContent = p;
        ul.appendChild(li);
      });
      if (ul.children.length > 0) div.appendChild(ul);
      experience.appendChild(div);
    });
  } else {
    document.getElementById("experienceSection").style.display = "none";
  }

  const projects = document.getElementById("projects");
  projects.innerHTML = "";
  if (data.projects && data.projects.length > 0) {
    data.projects.forEach((p) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = "<h3>" + p.name + "</h3><p>" + p.desc + "</p>";

      if (p.points && p.points.length > 0) {
        const ul = document.createElement("ul");
        p.points.forEach((pt) => {
          const li = document.createElement("li");
          li.textContent = pt;
          ul.appendChild(li);
        });
        div.appendChild(ul);
      }

      if (p.tech) {
        const tech = document.createElement("p");
        tech.className = "meta";
        tech.textContent = "Tech: " + p.tech;
        div.appendChild(tech);
      }
      projects.appendChild(div);
    });
  } else {
    document.getElementById("projectsSection").style.display = "none";
  }

  const education = document.getElementById("education");
  education.innerHTML = "";
  if (data.education && data.education.length > 0) {
    data.education.forEach((ed) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML =
        "<h3>" +
        ed.degree +
        "</h3><div class=\"meta\">" +
        ed.school +
        " - " +
        ed.year +
        "</div>";
      education.appendChild(div);
    });
  } else {
    document.getElementById("educationSection").style.display = "none";
  }

  const personal = document.getElementById("personal");
  personal.innerHTML = "";
  if (data.personalDetails && data.personalDetails.length > 0) {
    data.personalDetails.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";
      div.textContent = item;
      personal.appendChild(div);
    });
  } else {
    document.getElementById("personalSection").style.display = "none";
  }

  const certs = document.getElementById("certs");
  certs.innerHTML = "";
  if (data.certs && data.certs.length > 0) {
    data.certs.forEach((c) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = "<h3>" + c.title + "</h3><div class=\"meta\">" + c.year + "</div>";
      certs.appendChild(div);
    });
  } else {
    document.getElementById("certsSection").style.display = "none";
  }

  document.getElementById("footer").textContent = data.footer;

  const sections = document.querySelectorAll(".section");
  sections.forEach((section, index) => {
    section.style.animationDelay = 120 * index + "ms";
  });
}

loadResume().catch((err) => {
  document.body.innerHTML =
    "<p style=\"padding:40px;font-family:Georgia;\">Failed to load data.json. " +
    "Please keep index.html, style.css, app.js, and data.json in the same folder.</p>";
  console.error(err);
});

