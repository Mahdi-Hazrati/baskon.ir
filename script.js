import db from './db.js';

const baskonList = document.getElementById("baskon-list");
const baskonDetail = document.getElementById("baskon-detail");
const baskonContent = document.getElementById("baskon-content");

function showBaskonDetail(item) {
  baskonList.style.display = "none";
  baskonDetail.style.display = "block";
  baskonContent.innerHTML = `
    <h2>${item.emoji} ${item.title}</h2>
    <p>${item.description}</p>
    <button onclick='window.location.href = "/"'>بازگشت</button>
  `;
  loadGiscus();
}
function loadGiscus() { const giscus = document.querySelector("script[src*='giscus.app']"); if (giscus) giscus.remove(); const giscusContainer = document.getElementById("giscus-container"); const slug = window.location.hash.slice(1) || "home"; const newScript = document.createElement("script"); newScript.src = "https://giscus.app/client.js"; newScript.setAttribute("data-repo", "Mahdi-Hazrati/baskon.ir"); newScript.setAttribute("data-repo-id", "R_kgDOOhNjpw"); newScript.setAttribute("data-category", "General"); newScript.setAttribute("data-category-id", "DIC_kwDOOhNjp84Cpjyv"); newScript.setAttribute("data-mapping", "specific"); newScript.setAttribute("data-term", slug); // This line is key newScript.setAttribute("data-theme", "noborder_light"); newScript.setAttribute("data-lang", "fa"); newScript.async = true; newScript.crossOrigin = "anonymous"; giscusContainer.innerHTML = ""; giscusContainer.appendChild(newScript); } 
  const newScript = document.createElement("script");
  newScript.src = "https://giscus.app/client.js";
  newScript.setAttribute("data-repo", "Mahdi-Hazrati/baskon.ir");
  newScript.setAttribute("data-repo-id", "R_kgDOOhNjpw");
  newScript.setAttribute("data-category", "General");
  newScript.setAttribute("data-category-id", "DIC_kwDOOhNjp84Cpjyv");
  newScript.setAttribute("data-mapping", "pathname");
  newScript.setAttribute("data-strict", "1");
  newScript.setAttribute("data-reactions-enabled", "1");
  newScript.setAttribute("data-emit-metadata", "0");
  newScript.setAttribute("data-input-position", "top");
  newScript.setAttribute("data-theme", "noborder_light");
  newScript.setAttribute("data-lang", "fa");
  newScript.setAttribute("data-loading", "lazy");
  newScript.async = true;
  newScript.crossOrigin = "anonymous";

  giscusContainer.innerHTML = "";
  giscusContainer.appendChild(newScript);
}

function loadBaskons() {
  baskonList.innerHTML = "";

  db.forEach((item) => {
    const card = document.createElement("div");
    card.className = "baskon-card";
    card.innerHTML = `
      <div class="emoji">${item.emoji}</div>
      <div class="title">${item.title}</div>
      <div class="description">${item.description}</div>
    `;
    card.addEventListener("click", () => {
      location.hash = `#${item.slug}`;  
    });
    baskonList.appendChild(card);
  });

  handleRouteChange();
}

function handleRouteChange() {
  const path = window.location.hash.slice(1);  
  if (path) {
    const baskon = db.find((item) => item.slug === path);
    if (baskon) {
      showBaskonDetail(baskon);
    } else {
      baskonList.style.display = "none";
      baskonDetail.style.display = "block";
      baskonContent.innerHTML = `
        <h2>یافت نشد 🫣</h2>
        <p>هیچ "بس کن"ی با این آدرس پیدا نشد.</p>
      `;
    }
  } else {
    baskonList.style.display = "grid";
    baskonDetail.style.display = "none";
  }
}


window.addEventListener("hashchange", handleRouteChange);
window.addEventListener("DOMContentLoaded", loadBaskons);
