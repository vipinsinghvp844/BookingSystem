document.addEventListener("DOMContentLoaded", function () {

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  fetch("/e-commerce/wp-json/vp/v1/admin-dashboard")
    .then(res => res.json())
    .then(res => {

      if (!res.success) return;

      const data = res.data;

      /* =========================
          FIXED DATA BINDING
      ========================== */

      document.getElementById("totalRevenue").innerText =
        "₹" + (data.total_revenue || 0);

      document.getElementById("totalBookings").innerText =
        data.total_bookings || 0;

      document.getElementById("totalCustomers").innerText =
        data.total_customers || 0;

      document.getElementById("totalGrowth").innerText =
        (data.growth || 0) + "%";


      /* =========================
          REVENUE CHART
      ========================== */

      new Chart(document.getElementById("revenueChart"), {
        type: 'line',
        data: {
          labels: data.revenue.months,
          datasets: [{
            data: data.revenue.values,
            borderColor: "#c9a96e",
            backgroundColor: "rgba(201,169,110,0.1)",
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          plugins: { legend: { display: false } }
        }
      });


      /* =========================
          SERVICE CHART
      ========================== */

      new Chart(document.getElementById("bookingChart"), {
        type: 'bar',
        data: {
          labels: data.services.labels,
          datasets: [{
            data: data.services.values,
            backgroundColor: "#c9a96e",
            borderRadius: 8
          }]
        },
        options: {
          plugins: { legend: { display: false } }
        }
      });

    });
});



// INIT 
document.addEventListener("DOMContentLoaded", function () {
  initLucide();
  initDashboard();
  initServicesPage();
  // renderCalendar();
  loadBookings();
  loadCalendar();
  loadPackages();
});

function initLucide() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

                                    /* =========================
                                     DASHBOARD
                                    ========================= */
function initDashboard() {
  const revenueCanvas = document.getElementById("revenueChart");
  const bookingCanvas = document.getElementById("bookingChart");

  if (!revenueCanvas || !bookingCanvas) return;

  fetch("/e-commerce/wp-json/vp/v1/dashboard")
    .then(res => res.json())
    .then(res => {
      if (!res.success) return;

      const data = res.data;

      const revenueEl = document.getElementById("totalRevenue");
      const bookingsEl = document.getElementById("totalBookings");
      const customersEl = document.getElementById("totalCustomers");
      const growthEl = document.getElementById("totalGrowth");

      if (revenueEl) revenueEl.innerText = "₹" + (data.total_revenue || 0);
      if (bookingsEl) bookingsEl.innerText = data.total_bookings || 0;
      if (customersEl) customersEl.innerText = data.total_customers || 0;
      if (growthEl) growthEl.innerText = (data.growth || 0) + "%";

      new Chart(revenueCanvas, {
        type: "line",
        data: {
          labels: data.revenue.months,
          datasets: [{
            data: data.revenue.values,
            borderColor: "#c9a96e",
            backgroundColor: "rgba(201,169,110,0.1)",
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          plugins: { legend: { display: false } }
        }
      });

      new Chart(bookingCanvas, {
        type: "bar",
        data: {
          labels: data.services.labels,
          datasets: [{
            data: data.services.values,
            backgroundColor: "#c9a96e",
            borderRadius: 8
          }]
        },
        options: {
          plugins: { legend: { display: false } }
        }
      });
    });
}

/* =========================
 admin  SERVICES PAGE CRUD
========================= */
function initServicesPage() {
  const table = document.getElementById("servicesTable");
  if (!table) return;
  const featuredEl = document.getElementById("sFeatured");
  const galleryEl = document.getElementById("sGallery");

  let featuredFile = null;
  let galleryFiles = [];
  const modal = document.getElementById("serviceModal");
  const addBtn = document.getElementById("addServiceBtn");
  const closeBtn = document.getElementById("closeModal");
  const saveBtn = document.getElementById("saveService");
  const searchInput = document.getElementById("searchService");

  const serviceIdEl = document.getElementById("serviceId");
  const modalTitleEl = document.getElementById("serviceModalTitle");
  const nameEl = document.getElementById("sName");
  const categoryEl = document.getElementById("sCategory");
  const priceEl = document.getElementById("sPrice");
  const durationEl = document.getElementById("sDuration");
  const statusEl = document.getElementById("sStatus");

  let allServices = [];

  fetchCategories();
  fetchServices();

  addBtn?.addEventListener("click", function () {
    resetServiceForm();
    modalTitleEl.textContent = "Add New Service";
    modal.classList.remove("hidden");
  });

  closeBtn?.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  searchInput?.addEventListener("input", function () {
    const term = this.value.toLowerCase().trim();

    const filtered = allServices.filter(service =>
      service.name.toLowerCase().includes(term) ||
      (service.category_name && service.category_name.toLowerCase().includes(term))
    );

    renderServices(filtered);
  });

  saveBtn?.addEventListener("click", async function () {
     let featuredUrl = "";
    let galleryUrls = [];

      if (featuredFile) {
        featuredUrl = await uploadFile(featuredFile);
      }
       if (galleryFiles.length) {
      for (let f of galleryFiles) {
      const url = await uploadFile(f);
      galleryUrls.push(url);
        }
      }
    const payload = {
      name: nameEl.value.trim(),
      category_id: categoryEl.value,
      price: priceEl.value,
      duration: durationEl.value.trim(),
      status: statusEl.value,
      featured_image: featuredUrl,
      gallery_images: galleryUrls
    };

    const editId = serviceIdEl.value.trim();

    if (!payload.name || !payload.category_id || !payload.price || !payload.duration) {
      alert("Please fill all required fields.");
      return;
    }

    if (editId) {
      updateService(editId, payload);
    } else {
      createService(payload);
    }
  });

  function fetchCategories() {
    fetch("/e-commerce/wp-json/vp/v1/categories")
      .then(res => res.json())
      .then(res => {
        if (!res.success) return;

        categoryEl.innerHTML = `<option value="">Select Category</option>` +
          res.data.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join("");
      });
  }

  function fetchServices() {
    fetch("/e-commerce/wp-json/vp/v1/services")
      .then(res => res.json())
      .then(res => {
        if (!res.success) return;

        allServices = res.data || [];
        renderServices(allServices);
      });
  }

  function renderServices(services) {
    table.innerHTML = services.map(service => `
      <tr>
        <td>
          ${service.featured_image 
          ? `<img src="${service.featured_image}" style="width:40px;border-radius:6px;">` 
          : "—"}
        </td>
        <td>${escapeHtml(service.name)}</td>
        <td><span class="badge">${escapeHtml(service.category_name || "N/A")}</span></td>
        <td>$${service.price}</td>
        <td>${escapeHtml(service.duration)} min</td>
        <td>
          <span class="${parseInt(service.status) === 1 ? "status-active" : "status-inactive"}">
            ${parseInt(service.status) === 1 ? "Active" : "Inactive"}
          </span>
        </td>
        <td class="actions">
          <button class="edit-service" data-id="${service.id}">✏️</button>
          <button class="delete delete-service" data-id="${service.id}">🗑</button>
        </td>
      </tr>
    `).join("");

    bindServiceActions();
  }

  function bindServiceActions() {
    document.querySelectorAll(".edit-service").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        const service = allServices.find(s => String(s.id) === String(id));
        if (!service) return;

        serviceIdEl.value = service.id;
        nameEl.value = service.name || "";
        categoryEl.value = service.category_id || "";
        priceEl.value = service.price || "";
        durationEl.value = service.duration || "";
        statusEl.value = service.status || "1";

        modalTitleEl.textContent = "Edit Service";
        modal.classList.remove("hidden");
      });
    });

    document.querySelectorAll(".delete-service").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        if (!confirm("Delete this service?")) return;
        deleteService(id);
      });
    });
  }

  function createService(payload) {
    fetch("/e-commerce/wp-json/vp/v1/admin/services", {
      method: "POST",
       headers: {
    "Content-Type": "application/json",
    "X-WP-Nonce": SALON_ADMIN.nonce
  },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          alert(res.message || "Failed to create service");
          return;
        }
        modal.classList.add("hidden");
        fetchServices();
      });
  }


  function updateService(id, payload) {
    fetch(`/e-commerce/wp-json/vp/v1/admin/services/${id}`, {
      method: "POST",
      headers: {
    "Content-Type": "application/json",
    "X-WP-Nonce": SALON_ADMIN.nonce
  },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          alert(res.message || "Failed to update service");
          return;
        }
        modal.classList.add("hidden");
        fetchServices();
      });
  }

  function deleteService(id) {
    fetch(`/e-commerce/wp-json/vp/v1/admin/services/${id}`, {
      method: "DELETE",
      headers: {
    "Content-Type": "application/json",
    "X-WP-Nonce": SALON_ADMIN.nonce
  },
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          alert(res.message || "Failed to delete service");
          return;
        }
        fetchServices();
      });
  }

  function resetServiceForm() {
    serviceIdEl.value = "";
    nameEl.value = "";
    categoryEl.value = "";
    priceEl.value = "";
    durationEl.value = "";
    statusEl.value = "1";
  }

  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, function (m) {
      return ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[m];
    });
  }
  featuredEl.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  featuredFile = file;

  const img = document.getElementById("previewFeatured");
  img.src = URL.createObjectURL(file);
  img.style.display = "block";
});

galleryEl.addEventListener("change", function () {
  const files = [...this.files];
  galleryFiles = files;

  const box = document.getElementById("previewGallery");
  box.innerHTML = "";

  files.forEach(f => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(f);
    img.style.width = "60px";
    img.style.borderRadius = "6px";
    box.appendChild(img);
  });
});
}
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/e-commerce/wp-json/vp/v1/upload", {
    method: "POST",
    headers: { "X-WP-Nonce": SALON_ADMIN.nonce },
    body: formData
  });

  const data = await res.json();
  return data.url;
}

/* ====================================== CALENDAR ================= */

let currentDate = new Date();

function loadCalendar() {

  fetch("/e-commerce/wp-json/vp/v1/admin/calendar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-WP-Nonce": SALON_ADMIN.nonce
    }
  })
  .then(res => res.json())
  .then(res => {

    const bookings = res.data || [];
    const grid = document.getElementById("calendarGrid");
    const monthLabel = document.getElementById("currentMonth");

    if (!grid || !monthLabel) return;

    grid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const today = new Date();

    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    monthLabel.innerText = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    /* ================= EMPTY CELLS ================= */
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startDay; i++) {
      grid.innerHTML += `<div class="calendar-day empty"></div>`;
    }

    /* ================= DAYS ================= */
    for (let i = 1; i <= daysInMonth; i++) {

      const dayStr = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;

      const dayBookings = bookings.filter(b => b.booking_date === dayStr);

      let eventsHTML = "";

      dayBookings.slice(0, 2).forEach(b => {
        eventsHTML += `
          <div class="event ${b.status}">
            ${b.booking_time}
          </div>
        `;
      });

      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      grid.innerHTML += `
        <div class="calendar-day ${isToday ? "today" : ""}" data-date="${dayStr}">
          <div class="day-number">${i}</div>

          ${dayBookings.length > 0 ? `<div class="booking-count">${dayBookings.length}</div>` : ""}

          <div class="events">${eventsHTML}</div>
        </div>
      `;
    }

    /* ================= CLICK EVENT ================= */
    document.querySelectorAll(".calendar-day").forEach(day => {

      day.addEventListener("click", () => {

        const date = day.dataset.date;
        if (!date) return;

        const dayBookings = bookings.filter(b => b.booking_date === date);

        let html = `<h3>Bookings (${date})</h3>`;

        if (dayBookings.length === 0) {
          html += `<p>No bookings</p>`;
        } else {
          dayBookings.forEach(b => {
            html += `
              <div style="margin-bottom:10px;">
                <strong>${b.service_name}</strong><br>
                ${b.booking_time}<br>
                ${b.customer_name || ""}
              </div>
            `;
          });
        }

        showPopup(html);

      });

    });

  });
}
function showPopup(content) {

  const popup = document.createElement("div");
  popup.className = "calendar-popup";

  popup.innerHTML = `
    <div class="popup-content">
      ${content}
      <button onclick="this.closest('.calendar-popup').remove()"
        style="margin-top:10px;padding:8px 12px;background:#c9a96e;color:white;border:none;border-radius:8px;">
        Close
      </button>
    </div>
  `;

  document.body.appendChild(popup);
}
/* ==================================== BUTTON FIX ================= */
document.addEventListener("click", function (e) {
  // PREV
  if (e.target.closest("#prevMonth")) {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar();
  }
  // NEXT
  if (e.target.closest("#nextMonth")) {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar();
  }
});



/* ================================= BOOKINGS PAGE ================= */

function loadBookings() {

  fetch("/e-commerce/wp-json/vp/v1/admin/bookings", {
      method: "GET",
      headers: {
    "Content-Type": "application/json",
    "X-WP-Nonce": SALON_ADMIN.nonce
  }
    })
    .then(res => res.json())
    .then(res => {

      const list = document.getElementById("bookingList");
      if (!list) return;

      list.innerHTML = "";

      res.data.forEach(b => {

        list.innerHTML += `
          <div class="booking-item">
            
            <div class="booking-top">
              <div>
                <h3>${b.service_name || "Service"}</h3>
                <p>${b.customer_name || "Customer"}</p>
              </div>

              <select onchange="updateStatus(${b.id}, this.value)" class="status-select">
                <option value="pending" ${b.status=='pending'?'selected':''}>Pending</option>
                <option value="confirmed" ${b.status=='confirmed'?'selected':''}>Confirmed</option>
                <option value="cancelled" ${b.status=='cancelled'?'selected':''}>Cancelled</option>
              </select>

            </div>

            <div class="booking-meta">
              <span>📅 ${b.booking_date}</span>
              <span>⏰ ${b.booking_time}</span>
              <span>💰 ₹${b.amount || 0}</span>
            </div>

          </div>
        `;

      });

    });
}

function updateStatus(id, status) {

  fetch("/e-commerce/wp-json/vp/v1/admin/booking-status", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "X-WP-Nonce": SALON_ADMIN.nonce
  },
    body: JSON.stringify({ id, status })
  })
  .then(() => {
    loadBookings();
  });

}


// ===============================PACKAGES PAGE=============================
let editId = null;

/* LOAD PACKAGES */
function loadPackages() {
  fetch("/e-commerce/wp-json/vp/v1/admin/packages", {
    headers: { "X-WP-Nonce": SALON_ADMIN.nonce }
  })
  .then(res => res.json())
  .then(res => {

    const grid = document.getElementById("packagesGrid");
    grid.innerHTML = "";

    res.data.forEach(p => {

      grid.innerHTML += `
        <div class="package-card">
        <span class="badge">Package</span>
          <h3>${p.name}</h3>
          <p class="price">₹${p.price}</p>

          <div class="package-meta">
            ${p.duration} ${p.duration_type} • 
            ${p.discount_percent}% off • 
            ${p.max_bookings || "Unlimited"} bookings
          </div>

          <div class="card-actions">
            <button onclick="editPackage(${p.id})">Edit</button>
            <button onclick="deletePackage(${p.id})">Delete</button>
          </div>
        </div>
      `;
    });

  });
}

/* EDIT */
function editPackage(id) {

  fetch("/e-commerce/wp-json/vp/v1/admin/packages", {
    headers: { "X-WP-Nonce": SALON_ADMIN.nonce }
  })
  .then(res => res.json())
  .then(res => {

    const pkg = res.data.find(p => p.id == id);
    if (!pkg) {
      alert("Package not found");
      return;
    }
    editId = id;
     loadServicesDropdown(pkg.services || []);

    pName.value = pkg.name;
    pDesc.value = pkg.description;
    pPrice.value = pkg.price;
    pDuration.value = pkg.duration;
    pDurationType.value = pkg.duration_type;
    pDiscount.value = pkg.discount_percent;
    pMaxBookings.value = pkg.max_bookings;
    packageModal.classList.remove("hidden");
  });
}

/* DELETE */
function deletePackage(id) {
  if (!confirm("Delete?")) return;

  fetch(`/e-commerce/wp-json/vp/v1/admin/packages/${id}`, {
    method: "DELETE",
    headers: { "X-WP-Nonce": SALON_ADMIN.nonce }
  })
  .then(() => loadPackages());
}

/* SAVE */
document.getElementById("savePackage").onclick = () => {

  const services = [...document.querySelectorAll("#pServicesBox input:checked")]
  .map(el => Number(el.value));
  

  const data = {
    name: pName.value,
    description: pDesc.value,
    price: pPrice.value,
    duration_type: pDurationType.value,
    duration: pDuration.value,
    discount: pDiscount.value,
    max_bookings: pMaxBookings.value,
    services
  };

  const url = editId
    ? `/e-commerce/wp-json/vp/v1/admin/packages/${editId}`
    : `/e-commerce/wp-json/vp/v1/admin/packages`;

  const method = editId ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-WP-Nonce": SALON_ADMIN.nonce
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    packageModal.classList.add("hidden");
    editId = null;
    loadPackages();
  });
};

/* MODAL */
openPackageModal.onclick = () => {
  editId = null;
  document.getElementById("modalTitle").innerText = "Add Package";

  loadServicesDropdown([]); // empty

  packageModal.classList.remove("hidden");
};

closePackageModal.onclick = () => {
  packageModal.classList.add("hidden");
};

/* SERVICES */
function loadServicesDropdown(selected = []) {

  fetch("/e-commerce/wp-json/vp/v1/services")
    .then(res => res.json())
    .then(res => {

      const box = document.getElementById("pServicesBox");
      box.innerHTML = "";

      const selectedIds = selected.map(Number); // 🔥 IMPORTANT

      res.data.forEach(s => {

        const isChecked = selectedIds.includes(Number(s.id)) ? "checked" : "";

        box.innerHTML += `
          <label class="service-item">
            <input type="checkbox" value="${s.id}" ${isChecked}>
            ${s.name}
          </label>
        `;
      });

    });
}
