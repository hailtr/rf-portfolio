import { applyTextTranslations } from '../loadText.js';
import { getLang } from '../i18n.js';

async function loadResume() {
  const lang = getLang();
  const res = await fetch('data/resume.json');
  const data = await res.json();
  const resume = data[lang];
  const basics = resume.basics;


  document.getElementById("cv-name").textContent = basics.name;
  document.getElementById("cv-role").textContent = basics.label;
  document.getElementById("cv-email").textContent = basics.email;
  document.getElementById("cv-phone").textContent = basics.phone;
  document.getElementById("cv-website").innerHTML = `<a href="${basics.website}" target="_blank">${basics.website} <i class='fa fa-external-link' aria-hidden='true'></i></a>`;
  document.getElementById("cv-location").innerHTML = `${basics.location.address}<br>${basics.location.city}, ${basics.location.region}`;
  document.getElementById("cv-image").src = basics.image;

  document.getElementById("cv-summary").textContent = basics.summary;

  renderList(resume.skills, "cv-skills", skill => `
    <section class="container">
      <div class="title">
        <h3>${skill.name}</h3>
        <div class="keyline"></div>
      </div>
      <h4 class="bold">${skill.level}</h4>
      <ul class="minimal">
        ${skill.keywords.map(k => `<li><h6>${k}</h6></li>`).join('')}
      </ul>
    </section>
  `);

  renderBlock("cv-languages", "languages", `
    <ul class="minimal">
      ${resume.languages.map(lang => `<li><h6>${lang.language} <em>(${lang.fluency})</em></h6></li>`).join('')}
    </ul>
  `);

  renderBlock("cv-interests", "interests", resume.interests.map(interest => `
    <section class="item">
      <h4 class="bold">${interest.name}</h4>
      <ul class="minimal">
        ${interest.keywords.map(k => `<li>${k}</li>`).join('')}
      </ul>
    </section>
  `).join(''));

  renderSection("cv-work", "experience", resume.work, job => `
    <section class="item">
      <div class="section-header clearfix">
        <h3 class="bold pull-left">
          <a href="${job.url}" target="_blank">${job.company} <i class="fa fa-external-link"></i></a>
        </h3>
        <h5 class="italic pull-right">
          <span class="startDate">${job.startDate}</span> - <span class="endDate">${job.endDate || 'Present'}</span>
        </h5>
      </div>
      <h4>${job.position}</h4>
      <p class="summary">${job.summary}</p>
      <ul>
        ${(job.highlights || []).map(h => `<li>${h}</li>`).join('')}
      </ul>
    </section>
  `);

  renderSection("cv-volunteer", "volunteer", resume.volunteer, vol => `
    <section class="item">
      <div class="section-header clearfix">
        <h3 class="bold pull-left">
          <a href="${vol.url}" target="_blank">${vol.organization} <i class="fa fa-external-link"></i></a>
        </h3>
        <h5 class="italic pull-right">
          <span class="startDate">${vol.startDate}</span> - <span class="endDate">${vol.endDate || 'Present'}</span>
        </h5>
      </div>
      <h5>${vol.position}</h5>
      <p class="summary">${vol.summary}</p>
      <ul>
        ${(vol.highlights || []).map(h => `<li>${h}</li>`).join('')}
      </ul>
    </section>
  `);

  renderSection("cv-education", "education", resume.education, edu => `
    <section class="item">
      <div class="section-header clearfix">
        <h3 class="bold pull-left">${edu.institution}</h3>
        <h5 class="italic pull-right">
          <span class="startDate">${edu.startDate}</span> - <span class="endDate">${edu.endDate || 'Present'}</span>
        </h5>
      </div>
      <h5 class="location">${edu.location || ''}</h5>
      <h4>${edu.studyType} ${edu.area ? `en ${edu.area}` : ''}</h4>
      ${edu.gpa ? `<h5>GPA ${edu.gpa}</h5>` : ''}
      ${edu.specialization ? `<h5 class="specialization">${edu.specialization}</h5>` : ''}
      ${edu.courses ? `<ul class="two-column">${edu.courses.map(c => `<li>${c}</li>`).join('')}</ul>` : ''}
    </section>
  `);

  renderSection("cv-awards", "awards", resume.awards, award => `
    <section class="item">
      <div class="section-header clearfix">
        <h3 class="bold pull-left">
          <a href="${award.link}" target="_blank">${award.title} <i class="fa fa-external-link"></i></a>
        </h3>
        <h5 class="italic pull-right">${award.date || ''}</h5>
      </div>
      <h5 class="awarder">${award.awarder}</h5>
      <p class="summary">${award.summary}</p>
    </section>
  `);

  renderSection("cv-publications", "publications", resume.publications, pub => `
    <section class="item">
      <div class="section-header clearfix">
        <h3 class="bold pull-left">
          <a href="${pub.url}" target="_blank">${pub.name} <i class="fa fa-external-link"></i></a>
        </h3>
        <h5 class="italic pull-right">${pub.releaseDate || ''}</h5>
      </div>
      <h5 class="awarder">${pub.publisher}</h5>
      <p class="summary">${pub.summary}</p>
    </section>
  `);

  renderSection("cv-references", "references", resume.references, ref => `
    <section class="item clearfix">
      <i class="fa fa-quote-left pull-left" aria-hidden="true"></i>
      <blockquote>${ref.reference}</blockquote>
      <h5 class="pull-right"> — ${ref.name}</h5>
    </section>
  `);

  // Aplicar traducciones
  applyTextTranslations(lang);

  // PDF export
  const pdfButton = document.getElementById('download-pdf');
  if (pdfButton) {
    pdfButton.addEventListener('click', async () => {
      const element = document.getElementById('resume');
      const bounds = element.getBoundingClientRect();
      const width = Math.round(bounds.width);
      const height = Math.round(bounds.height);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [width, height]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      pdf.save('cv-rafael-ortiz.pdf');
    });
  }
}

function renderBlock(containerId, i18nKey, content) {
  const container = document.getElementById(containerId);
  if (!container || !content) return;

  container.innerHTML = `
    <div class="title">
      <h3 data-i18n="${i18nKey}" data-i18n-scope="text-cv">${i18nKey}</h3>
      <div class="keyline"></div>
    </div>
    ${content}
  `;
}

function renderSection(containerId, i18nKey, list, templateFn) {
  const container = document.getElementById(containerId);
  if (!list || list.length === 0 || !container) return;

  container.innerHTML = `
    <div class="title">
      <h3 data-i18n="${i18nKey}" data-i18n-scope="text-cv">${i18nKey}</h3>
      <div class="keyline"></div>
    </div>
    ${list.map(templateFn).join('')}
  `;
}

function renderList(list, containerId, templateFn) {
  const container = document.getElementById(containerId);
  if (!list || list.length === 0 || !container) return;
  container.innerHTML = list.map(templateFn).join('');
}

loadResume();
