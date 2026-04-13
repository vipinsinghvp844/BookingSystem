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
         ✅ FIXED DATA BINDING
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
         📈 REVENUE CHART
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
         📊 SERVICE CHART
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

// service page js here 
// document.addEventListener("DOMContentLoaded", function () {

//   if (!document.getElementById("servicesTable")) return;

//   // const services = [
//   //   { id: 1, name: "Premium Hair Cut", category: "Hair", price: 85, duration: "60 min" },
//   //   { id: 2, name: "Spa Treatment", category: "Spa", price: 150, duration: "90 min" },
//   //   { id: 3, name: "Manicure & Pedicure", category: "Nails", price: 65, duration: "75 min" },
//   // ];

//   const table = document.getElementById("servicesTable");

//   function render() {
//     table.innerHTML = services.map(s => `
//       <tr>
//         <td>${s.name}</td>
//         <td><span class="badge">${s.category}</span></td>
//         <td>$${s.price}</td>
//         <td>${s.duration}</td>
//         <td><span class="status-active">Active</span></td>
//         <td class="actions">
//           <button>✏️</button>
//           <button class="delete">🗑</button>
//         </td>
//       </tr>
//     `).join("");
//   }

//   render();

//   /* MODAL */
//   const modal = document.getElementById("serviceModal");

//   document.getElementById("addServiceBtn").onclick = () => {
//     modal.classList.remove("hidden");
//   };

//   document.getElementById("closeModal").onclick = () => {
//     modal.classList.add("hidden");
//   };

// });





// services jspage
document.addEventListener("DOMContentLoaded", function () {
  initLucide();
  initDashboard();
  initServicesPage();
  // renderCalendar();
  loadBookings();
  loadCalendar();
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

  saveBtn?.addEventListener("click", function () {
    const payload = {
      name: nameEl.value.trim(),
      category_id: categoryEl.value,
      price: priceEl.value,
      duration: durationEl.value.trim(),
      status: statusEl.value
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
}


/* ====================================== CALENDAR ================= */

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

      const bookings = res.data;
      console.log(bookings,"booking");
      
      const grid = document.getElementById("calendarGrid");

      if (!grid) return;

      grid.innerHTML = "";

      // current month
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 1; i <= daysInMonth; i++) {

        const dayStr = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;

        const dayBookings = bookings.filter(b => b.booking_date === dayStr);

        let eventsHTML = "";

        dayBookings.forEach(b => {
          eventsHTML += `
            <div class="event ${b.status}">
              ${b.booking_time} - ${b.service_name}
            </div>
          `;
        });

        grid.innerHTML += `
          <div class="calendar-day">
            <div class="day-number">${i}</div>
            <div class="events">
              ${eventsHTML}
            </div>
          </div>
        `;
      }

    });
}



/* ================= BOOKINGS PAGE ================= */

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
