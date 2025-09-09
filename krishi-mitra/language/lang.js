// ===== Custom Dropdown Script =====
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".custom-dropdown");
  const selected = dropdown.querySelector(".dropdown-selected");
  const items = dropdown.querySelectorAll(".dropdown-list li");
  const applyBtn = document.querySelector(".apply-lang");

  // Toggle dropdown open/close
  dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // Select language from list
  items.forEach(item => {
    item.addEventListener("click", () => {
      const value = item.getAttribute("data-value");
      selected.textContent = item.textContent; 
      dropdown.classList.remove("active");
      dropdown.setAttribute("data-selected", value);
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  // Handle Apply Button
  applyBtn.addEventListener("click", async () => {
    const chosenLang = dropdown.getAttribute("data-selected");
    if (!chosenLang) {
      alert("⚠️ Please select a language first!");
      return;
    }

    alert("✅ Language applied: " + chosenLang.toUpperCase());

    // Grab elements to translate
    const titleEl = document.getElementById("page-title");
    const subtitleEl = document.getElementById("subtitle");

    if (titleEl && subtitleEl) {
      titleEl.innerHTML = await translateText(titleEl.innerText, chosenLang);
      subtitleEl.innerHTML = await translateText(subtitleEl.innerText, chosenLang);
    }
  });
});

// ===== Translate API Call =====
const API_KEY = "api"; 

async function translateText(text, targetLang) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      target: targetLang
    }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  return data.data.translations[0].translatedText;
}
