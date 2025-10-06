const form = document.getElementById("searchForm");
const placeInput = document.getElementById("place");
const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const clearBtn = document.getElementById("clearBtn");
const resultDiv = document.getElementById("result");
const errorBox = document.getElementById("error");

const cursor = document.getElementById("cursor");
let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});
function animateCursor() {
  cursorX += (targetX - cursorX) * 0.1;
  cursorY += (targetY - cursorY) * 0.1;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

const sampleData = {
    place: "Patiala, India",
    description:
      "Patiala is a city in southeastern Punjab, India. It was the capital of the princely state of Patiala. Known for its rich history, grand palaces, gardens, and unique architectural style, it's often called the 'Royal City.' Key aspects of its culture include traditional Punjabi cuisine, Patiala Shahi Turban, and its historical forts and palaces.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/NSNIS.png",
      "https://s7ap1.scene7.com/is/image/incredibleindia/sheesh-mahal-patiala-punjab-city-ff?qlt=82&ts=1742174155892",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/MotiBaghPalace.jpg/250px-MotiBaghPalace.jpg",
      "https://s7ap1.scene7.com/is/image/incredibleindia/gurudwara-dukh-nivaran-sahib-patiala-punjab-2-attr-hero?qlt=82&ts=1742175247004",
      "https://s7ap1.scene7.com/is/image/incredibleindia/qila-mubarak-patiala-punjab-1-attr-hero?qlt=82&ts=1742167147483",
    ],
    bestTimes: "October to March offers pleasant weather for sightseeing.",
    quickFacts: [
      "Known as the 'Royal City'.",
      "Famous for its Patiala Shahi Turban and traditional Punjabi attire.",
      "Home to grand palaces and historical forts.",
      "Rich cultural heritage with a blend of Sikh and Mughal architecture.",
    ],
    weather: {
      current: {
        temp: 25,
        summary: "Partly cloudy",
      },
      forecast: [
        {
          date: "2025-10-01",
          day: "Wednesday",
          temp: 0,
          summary: "No forecast available",
        },
        {
          date: "2025-10-02",
          day: "Thursday",
          temp: 0,
          summary: "No forecast available",
        },
        {
          date: "2025-10-03",
          day: "Friday",
          temp: 0,
          summary: "No forecast available",
        },
        {
          date: "2025-10-04",
          day: "Saturday",
          temp: 0,
          summary: "No forecast available",
        },
        {
          date: "2025-10-05",
          day: "Sunday",
          temp: 0,
          summary: "No forecast available",
        },
      ],
    },
    hotels: [
      {
        id: 1,
        name: "Hotel Eqbal Inn",
        rating: 3.9,
        price: "$49",
        image:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrgK2zvdG85WvyafdSUYOzgvvws5ZkT851w99g9qACoQxP2DNeCLaXYRMMh9xJTNX16rzd1hmFtI72-crSBa2fnOJiZ-Vqwbp4AFJKhHpq4E3C7T4cs5n76AJ0sMUD6tr55lEzj=s287-w287-h192-n-k-no-v1",
        url: "https://www.hoteleqbal.com/",
      },
      {
        id: 2,
        name: "The Baradari Palace - 19th Century, Patiala",
        rating: 4.3,
        price: "$39",
        image:
          "https://lh3.googleusercontent.com/p/AF1QipOb9ti-SwdDoYzbyq3uH3U6woQexgQua3eS4Ohh=s287-w287-h192-n-k-no-v1",
        url: "http://www.neemranahotels.com/the-baradari-palace-patiala-punjab/",
      },
      {
        id: 3,
        name: "Hotel Clarion Inn AMPS",
        rating: 4.4,
        price: "$48",
        image:
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nod7PAsRFS3muxXCFbKgoWyuTbxWWZjluz-TRbGU-AIpNjyqS4tPjCEnO45OWiDj4um2X9mkuqpF4sa-NNXO44MGHM3GgET_LWCf-iya0tFGjiDjNM2ix5pkzPNTjiiOIn4Cvk2=s287-w287-h192-n-k-no-v1",
        url: "http://www.clarioninnpatiala.com/",
      },
      {
        id: 4,
        name: "Hotel Mohan Continental",
        rating: 3.7,
        price: "$25",
        image:
          "https://lh3.googleusercontent.com/p/AF1QipP5OPKJ2DabKjT1uvR93A8XtxVF1PKMVZrNqTk=s287-w287-h192-n-k-no-v1",
        url: "http://www.mohancontinental.com/",
      },
      {
        id: 5,
        name: "RAN BAAS The Palace",
        rating: 4.6,
        price: "$569",
        image:
          "https://lh6.googleusercontent.com/proxy/AxAUQ-UoLcwYabzcOG8u8j1GG6uc6GAhjE5kn8i6l_-wQw7eOVEhgIP1wg_jSZOV3aMqnUN_9Gh1bNvIa0WT_pVIx8uAx8xZw1sEY1xAL_DHqhM7lsZsiOV-4nxznj8OsJbP914rRMM9xOWplbJvgHnBM-w-oA=s287-w287-h192-n-k-no-v1",
        url: "https://www.theparkhotels.com/ran-baas-the-palace/",
      },
    ],
    activities: [
      {
        id: 1,
        name: "Qila Mubarak",
        description:
          "A historic fort complex in Patiala, showcasing Sikh palace architecture.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/df/Qila_Mubarak%2C_Patiala.jpg",
      },
      {
        id: 2,
        name: "Moti Bagh Palace",
        description:
          "A grand palace in Patiala, known for its architectural beauty and historical significance. It now houses the National Institute of Sports.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/65/MotiBaghPalace.jpg",
      },
      {
        id: 3,
        name: "Sheesh Mahal",
        description:
          "Part of the Old Moti Bagh Palace, known as the 'Palace of Mirrors' for its exquisite mirror work and frescoes.",
        image:
          "https://s7ap1.scene7.com/is/image/incredibleindia/sheesh-mahal-patiala-punjab-1-attr-hero?qlt=82&ts=1742180406649",
      },
      {
        id: 4,
        name: "Baradari Garden",
        description:
          "A beautiful garden with a palace (Baradari Palace) at its center, known for its rare trees and flowers.",
        image:
          "https://assets.simplotel.com/simplotel/image/upload/q_80,fl_progressive,w_1500,f_auto,c_fit/the-baradari-palace---19th-century-patiala/The_Baradari_Palace_Patiala_Punjab_11_vqm6ko",
      },
      {
        id: 5,
        name: "Gurudwara Dukh Nivaran Sahib",
        description:
          "A prominent Sikh gurudwara known for its sacred Sarovar (holy tank) believed to have healing powers.",
        image:
          "https://s7ap1.scene7.com/is/image/incredibleindia/gurudwara-dukh-nivaran-sahib-patiala-punjab-2-attr-hero?qlt=82&ts=1742175247004",
      },
      {
        id: 6,
        name: "National Institute of Sports (NIS)",
        description:
          "Located in the Old Moti Bagh Palace, it is Asia's largest sports institute and a premier institute for sports coaching.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/NSNIS.png",
      },
    ],
  };

function showError(msg) {
  errorBox.textContent = msg;
}

function hideError() {
  errorBox.textContent = "";
}

function clearResultDisplay() {
  document.getElementById("placeName").textContent = "";
  document.getElementById("placeDesc").textContent = "";
  document.getElementById("bestTimes").textContent = "";
  document.getElementById("tripDates").textContent = "";
  document.getElementById("quickFacts").innerHTML = "";
  document.getElementById("gallery").innerHTML = "";
  document.getElementById("weather").innerHTML = "";
  document.getElementById("hotels").innerHTML = "";
  document.getElementById("activities").innerHTML = "";
}

function renderResult(data) {
  resultDiv.classList.remove("hidden");

  document.getElementById("placeName").textContent = data.place || "";
  document.getElementById("placeDesc").textContent = data.description || "";
  document.getElementById("bestTimes").textContent =
    data.bestTimes ? "Best times: " + data.bestTimes : "";
  if (startInput.value) {
    document.getElementById("tripDates").textContent =
      "Trip: " + startInput.value + " — " + endInput.value;
  } else {
    document.getElementById("tripDates").textContent = "";
  }

  const factsEl = document.getElementById("quickFacts");
  if (data.quickFacts && Array.isArray(data.quickFacts)) {
    let ul = document.createElement("ul");
    data.quickFacts.forEach((f) => {
      let li = document.createElement("li");
      li.textContent = f;
      ul.appendChild(li);
    });
    factsEl.innerHTML = "";
    factsEl.appendChild(ul);
  }

  const galEl = document.getElementById("gallery");
  galEl.innerHTML = "";
  if (data.images && Array.isArray(data.images)) {
    data.images.forEach((img) => {
      let im = document.createElement("img");
      im.src = img;
      im.alt = data.place || "";
      galEl.appendChild(im);
    });
  }

  const weatherEl = document.getElementById("weather");
if (data.weather) {
  let html = ``;

  if (data.weather.current) {
    html += `
      <div class="weather-current">
        <div><strong>Current</strong></div>
        <div style="font-size:1.5rem;font-weight:bold;">
          ${data.weather.current.temp}°
        </div>
        <div>${data.weather.current.summary}</div>
      </div>
    `;
  }

  if (data.weather.forecast && Array.isArray(data.weather.forecast)) {
    html += `<div class="weather-forecast">`;
    html += data.weather.forecast
      .map(
        (f) => `
          <div class="weather-forecast-item">
            <strong>${f.date}</strong>
            <div>${f.temp}°</div>
            <div>${f.summary}</div>
          </div>
        `
      )
      .join("");
    html += `</div>`;
  }

  weatherEl.innerHTML = html;
}

const hotelsEl = document.getElementById("hotels");
hotelsEl.innerHTML = "";
if (data.hotels && Array.isArray(data.hotels)) {
  data.hotels.forEach((h) => {
    const card = document.createElement("div");
    card.className = "card";
    let html = "";
    if (h.image) html += `<img src="${h.image}" />`;
    html += `<div><strong>${h.name}</strong></div>`;
    if (h.rating || h.price) {
      html += `<div>${h.rating || ""} ★ • from ${h.price || ""}</div>`;
    }

    if (h.url) {
      html += `<div class="mt-2">
                 <a href="${h.url}" target="_blank" class="book-btn">
                   Book
                 </a>
               </div>`;
    }

    card.innerHTML = html;
    hotelsEl.appendChild(card);
  });
}


  const actEl = document.getElementById("activities");
  actEl.innerHTML = "";
  if (data.activities && Array.isArray(data.activities)) {
    data.activities.forEach((a) => {
      const card = document.createElement("div");
      card.className = "card";
      let html = "";
      if (a.image) html += `<img src="${a.image}" />`;
      html += `<div><strong>${a.name}</strong></div>`;
      html += `<p>${a.description || ""}</p>`;
      card.innerHTML = html;
      actEl.appendChild(card);
    });
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const place = placeInput.value.trim();
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!place) {
    showError("Please enter a place to search.");
    return;
  }
  hideError();

  clearResultDisplay();

  document.getElementById("placeName").textContent = "Loading...";

  const payload = { place, startDate, endDate };

  const searchBtn = document.getElementById("searchBtn");
  searchBtn.textContent = "Searching...";
  searchBtn.disabled = true;

  try {
    const res = await fetch(
      "https://n8n-dnv8.onrender.com/webhook/b1a7b181-51e0-4296-a33a-574f7f013b54",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error: ${res.status} ${text}`);
    }
    const data = await res.json();
    console.log("API response data:", data);

    if (data && Array.isArray(data) && data.length > 0 && data[0].output) {
      renderResult(data[0].output);
    } else if (data && typeof data === "object" && data.output) {
      renderResult(data.output);
    } else if (data) {
      renderResult(data);
    } else {
      throw new Error("Invalid response format");
    }

    window.scrollTo({ top: 600, behavior: "smooth" });
  } catch (err) {
    console.error("Fetch error:", err);
    showError(err.message || "An unknown error occurred");
    renderResult(sampleData);
  } finally {
    searchBtn.textContent = "Search";
    searchBtn.disabled = false;
  }
});

clearBtn.addEventListener("click", () => {
  placeInput.value = "";
  startInput.value = "";
  endInput.value = "";
  hideError();
  clearResultDisplay();
  renderResult(sampleData);
});

document.addEventListener("DOMContentLoaded", () => {
  renderResult(sampleData);
});
