// js dropdown logic
// Notification toggle
const notifBtn = document.getElementById("notificationBtn");
const notifDropdown = document.getElementById("notificationDropdown");

if (notifBtn) {
  notifBtn.addEventListener("click", () => {
    notifDropdown.classList.toggle("hidden");
  });
}

// Profile toggle
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    profileDropdown.classList.toggle("hidden");
  });
}

// Close on outside click
document.addEventListener("click", (e) => {
  if (!notifBtn?.contains(e.target) && !notifDropdown?.contains(e.target)) {
    notifDropdown?.classList.add("hidden");
  }

  if (!profileBtn?.contains(e.target) && !profileDropdown?.contains(e.target)) {
    profileDropdown?.classList.add("hidden");
  }
});

// mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuPanel = document.getElementById("menuPanel");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  function openMenu() {
    mobileMenu.classList.remove("hidden");
    setTimeout(() => {
      menuPanel.classList.remove("-translate-x-full");
    }, 10);
  }

  function closeMenu() {
    menuPanel.classList.add("-translate-x-full");
    setTimeout(() => {
      mobileMenu.classList.add("hidden");
    }, 300);
  }

  menuToggle?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);

});
// service list page category filter
document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".category-btn");
  const cards = document.querySelectorAll(".service-card");

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      const selected = button.getAttribute("data-category");

      // 🔥 Active button UI change
      buttons.forEach(btn => {
        btn.classList.remove("bg-accent", "text-white", "shadow-lg");
        btn.classList.add("bg-white", "border", "border-border");
      });

      button.classList.add("bg-accent", "text-white", "shadow-lg");

      // 🔥 Filter logic
      cards.forEach(card => {
        const category = card.getAttribute("data-category");

        if (selected === "All" || category === selected) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

    });
  });

});


/*Service page dynamic content here js with catogory filter */
document.addEventListener("DOMContentLoaded", function () {

  const servicesContainer = document.getElementById("servicesContainer");
  const categoryContainer = document.getElementById("categoryContainer");
  const searchInput = document.getElementById("serviceSearch");

  if (!servicesContainer || !categoryContainer) return;

  let allServices = [];
  let selectedCategory = "All";
  let searchTerm = "";

  /* =========================
     🔥 LOAD CATEGORIES
  ========================== */
  fetch("/e-commerce/wp-json/vp/v1/categories")
    .then(res => res.json())
    .then(res => {

      const categories = res.data;

      categoryContainer.innerHTML = `
        <button class="category-btn px-6 py-2.5 rounded-xl bg-accent text-white shadow-lg" data-category="All">
          All
        </button>
      `;

      categories.forEach(cat => {
        categoryContainer.insertAdjacentHTML("beforeend", `
          <button class="category-btn px-6 py-2.5 rounded-xl bg-white border border-border hover:bg-secondary transition-all" data-category="${cat.name}">
            ${cat.name}
          </button>
        `);
      });

      attachCategoryEvents();
    });

  /* =========================
     🔥 LOAD SERVICES
  ========================== */
  fetch("/e-commerce/wp-json/vp/v1/services")
    .then(res => res.json())
    .then(res => {
      allServices = res.data;
      renderServices(allServices);
    });

  /* =========================
     🔥 RENDER SERVICES
  ========================== */
  function renderServices(services) {

    servicesContainer.innerHTML = "";

    if (services.length === 0) {
      servicesContainer.innerHTML = `
        <p class="text-center text-muted-foreground col-span-full">
          No services found
        </p>
      `;
      return;
    }

    services.forEach(service => {

      const card = `
        <div class="service-card bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all group">
          
          <div class="bg-gradient-to-br from-beige to-beige-dark h-48 flex items-center justify-center text-6xl">
            💇
          </div>

          <div class="p-6">

            <span class="inline-block px-3 py-1 bg-secondary text-xs rounded-full mb-2">
              ${service.category_name}
            </span>

            <h3 class="font-semibold group-hover:text-accent transition-colors">
              ${service.name}
            </h3>

            <p class="text-sm text-muted-foreground mb-4">
              ${service.description ?? ""}
            </p>

            <div class="flex items-center gap-4 text-sm text-muted-foreground">
              <span>⏱ ${service.duration} min</span>
              <span>💰 ${service.price}</span>
            </div>

            <a href="/e-commerce/service-detail?id=${service.id}" 
              class="block w-full mt-4 text-center px-4 py-2.5 bg-accent text-white rounded-xl hover:bg-gold-dark transition-colors">
              Book Now
            </a>

          </div>
        </div>
      `;

      servicesContainer.insertAdjacentHTML("beforeend", card);
    });

  }

  /* =========================
     🔥 CATEGORY EVENTS
  ========================== */
  function attachCategoryEvents() {

    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        // UI change
        buttons.forEach(btn => {
          btn.classList.remove("bg-accent", "text-white", "shadow-lg");
          btn.classList.add("bg-white", "border", "border-border");
        });

        button.classList.add("bg-accent", "text-white", "shadow-lg");

        applyFilters();

      });
    });

  }

  /* =========================
     🔥 SEARCH EVENT
  ========================== */
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  /* =========================
     🔥 FINAL FILTER LOGIC
  ========================== */
  function applyFilters() {

    let filtered = allServices;

    // CATEGORY
    if (selectedCategory !== "All") {
      filtered = filtered.filter(s => s.category_name === selectedCategory);
    }

    // SEARCH
    if (searchTerm !== "") {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm) ||
        (s.description && s.description.toLowerCase().includes(searchTerm))
      );
    }

    renderServices(filtered);
  }

});



/* =========================
   🔥 SERVICE DETAIL PAGE
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("serviceDetailContainer");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p class='text-center'>Service not found</p>";
    return;
  }

  fetch(`/e-commerce/wp-json/vp/v1/services/${id}`)
    .then(res => res.json())
    .then(res => {

      const service = res.data;
      console.log(service, "servi");


      if (!service) {
        container.innerHTML = "<p class='text-center'>Service not found</p>";
        return;
      }

      fetch(`/e-commerce/wp-json/vp/v1/services`)
        .then(res => res.json())
        .then(listRes => {
          const allServices = listRes.data;
          renderService(service, allServices);
        });
    });

  function renderService(service, allServices) {

    const includes = JSON.parse(service.includes || "[]");
    const benefits = JSON.parse(service.benefits || "[]");
    const related = allServices
      .filter(s =>
        s.category_name === service.category_name &&
        s.id != service.id
      )
      .slice(0, 3);

    container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

      <!-- IMAGE -->
      <div class="bg-gradient-to-br from-beige to-beige-dark rounded-3xl h-[500px] flex items-center justify-center text-9xl shadow-xl">
        💇
      </div>

      <!-- DETAILS -->
      <div>

        <span class="inline-block px-4 py-2 bg-secondary text-sm rounded-full mb-4">
          ${service.category_name}
        </span>

        <h1 class="text-4xl font-semibold mb-4">
          ${service.name}
        </h1>

        <div class="flex items-center gap-6 mb-6">

          <div class="flex items-center gap-2">
            ⭐ <span class="font-semibold">4.9</span>
            <span class="text-sm text-muted-foreground">(127 reviews)</span>
          </div>

          <div class="flex items-center gap-2 text-muted-foreground">
            ⏱ ${service.duration} min
          </div>

        </div>

        <div class="flex items-baseline gap-2 mb-6">
          <span class="text-4xl font-semibold text-accent">
            ₹${service.price}
          </span>
          <span class="text-muted-foreground">per session</span>
        </div>

        <p class="text-muted-foreground mb-8 leading-relaxed">
          ${service.description ?? ""}
        </p>

        <a href="/e-commerce/booking-staff?service_id=${service.id}"
          class="inline-flex items-center justify-center w-full px-8 py-4 bg-accent text-white rounded-2xl hover:bg-gold-dark transition-all shadow-lg mb-8">
          Book This Service →
        </a>

        <!-- 🔥 INCLUDES -->
        ${includes.length > 0 ? `
        <div class="bg-white rounded-2xl p-6 border border-border mb-6">
          <h3 class="font-semibold mb-4">What's Included</h3>
          <ul class="space-y-3">
            ${includes.map(item => `
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 bg-beige rounded-full flex items-center justify-center mt-0.5">
                  ✓
                </div>
                <span class="text-sm">${item}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        ` : ""}

        <!-- 🔥 BENEFITS -->
        ${benefits.length > 0 ? `
        <div class="bg-beige rounded-2xl p-6">
          <h3 class="font-semibold mb-4">Benefits</h3>
          <ul class="space-y-3">
            ${benefits.map(item => `
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center mt-0.5">
                  ✓
                </div>
                <span class="text-sm">${item}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        ` : ""}

      </div>
    </div>
<!--  RELATED SERVICES -->

    ${related.length > 0 ? `
  <div class="mt-20">
    <h2 class="text-3xl font-semibold mb-8">Related Services</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      ${related.map(item => `
        <a href="/service-detail?id=${item.id}"
          class="bg-white rounded-2xl p-6 border border-border hover:shadow-xl transition-all">

          <div class="text-5xl mb-4">💇</div>

          <h3 class="font-semibold mb-2">
            ${item.name}
          </h3>

          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <span>₹${item.price}</span>
            <span>•</span>
            <span>${item.duration} min</span>
          </div>

        </a>
      `).join("")}

    </div>
  </div>
` : ""}
  `;
  }

});

/* =========================
   🔥 SELECT STAFF PAGE
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("staffContainer");
  const continueBtn = document.getElementById("continueBtn");

  if (!container) return;

  let selectedStaff = null;

  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("service_id");

  /* =========================
     FETCH STAFF
  ========================== */
  fetch(`/e-commerce/wp-json/vp/v1/staff?service_id=${serviceId}`)
    .then(res => res.json())
    .then(res => {

      let staff = res.data;

      // 🔥 Add "Any Available"
      staff.unshift({
        id: 0,
        name: "Any Available",
        bio: "First available specialist"
      });

      renderStaff(staff);
    });

  function renderStaff(staffList) {

    container.innerHTML = "";

    staffList.forEach(member => {

      const card = document.createElement("button");

      card.className = "text-left bg-white rounded-2xl p-6 border-2 border-border hover:border-accent/50 transition-all";
      card.dataset.id = member.id;

      card.innerHTML = `
        <div class="flex items-start gap-4">

          <div class="bg-gradient-to-br from-beige to-beige-dark w-20 h-20 rounded-2xl flex items-center justify-center text-4xl">
            👤
          </div>

          <div class="flex-1">

            <div class="flex items-start justify-between mb-2">

              <div>
                <h3 class="font-semibold">${member.name}</h3>
                <p class="text-sm text-muted-foreground">
                  ${member.bio ?? ""}
                </p>
              </div>

              <div class="check hidden w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                ✓
              </div>

            </div>

          </div>
        </div>
      `;

      /* CLICK EVENT */
      card.addEventListener("click", () => {

        selectedStaff = member.id;

        // remove all active
        document.querySelectorAll("#staffContainer button").forEach(btn => {
          btn.classList.remove("border-accent", "shadow-lg");
          btn.querySelector(".check")?.classList.add("hidden");
        });

        // active
        card.classList.add("border-accent", "shadow-lg");
        card.querySelector(".check").classList.remove("hidden");

        // enable button
        continueBtn.classList.remove("bg-muted", "text-muted-foreground", "cursor-not-allowed");
        continueBtn.classList.add("bg-accent", "text-white");

      });

      container.appendChild(card);
    });

  }
  // backBtn.addEventListener("click", () => {
  //   window.location.href = `e-commerce/service-detail?service_id=${serviceId}`;
  // });

  /* =========================
     CONTINUE BUTTON
  ========================== */
  continueBtn.addEventListener("click", () => {

    if (selectedStaff === null) return;

    window.location.href = `/e-commerce/booking-datetime?service_id=${serviceId}&staff_id=${selectedStaff}`;
  });

});

/* =========================
   🔥 DATE TIME PAGE
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const dateContainer = document.getElementById("dateContainer");
  const timeContainer = document.getElementById("timeContainer");
  const summaryContainer = document.getElementById("summaryContainer");
  const continueBtn = document.getElementById("continueBtn");
  const backBtn = document.getElementById("backBtn");

  if (!dateContainer) return;

  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("service_id");
  const staffId = params.get("staff_id");

  let selectedDate = null;
  let selectedTime = null;
  let availabilityData = [];

  /* =========================
     FETCH AVAILABILITY
  ========================== */
  fetch(`/e-commerce/wp-json/vp/v1/availability?staff_id=${staffId}`)
    .then(res => res.json())
    .then(res => {
      availabilityData = res.data;
      generateDates();
    });

  /* =========================
     GENERATE DATES
  ========================== */
  function generateDates() {

    const today = new Date();
    let dates = [];

    for (let i = 0; i < 7; i++) {

      let d = new Date();
      d.setDate(today.getDate() + i);

      const dayName = d.toLocaleDateString("en-US", { weekday: "long" });

      const available = availabilityData.find(a => a.day_of_week === dayName);

      dates.push({
        fullDate: d.toISOString().split("T")[0],
        dayShort: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.getDate(),
        available: !!available,
        availability: available || null
      });
    }

    renderDates(dates);
  }

  /* =========================
     RENDER DATES
  ========================== */
  function renderDates(dates) {

    dateContainer.innerHTML = `
      <div class="grid grid-cols-7 gap-3">
        ${dates.map(d => `
          <button 
            class="date-btn p-4 rounded-xl text-center ${
              d.available 
                ? "bg-beige hover:bg-beige-dark" 
                : "bg-muted opacity-50 cursor-not-allowed"
            }"
            ${!d.available ? "disabled" : ""}
            data-date="${d.fullDate}"
          >
            <div class="text-xs">${d.dayShort}</div>
            <div class="font-semibold">${d.date}</div>
          </button>
        `).join("")}
      </div>
    `;

    attachDateEvents(dates);
  }

  /* =========================
     DATE CLICK
  ========================== */
  function attachDateEvents(dates) {

    document.querySelectorAll(".date-btn").forEach(btn => {

      btn.addEventListener("click", () => {

        selectedDate = btn.dataset.date;

        document.querySelectorAll(".date-btn").forEach(b => {
          b.classList.remove("bg-accent","text-white");
        });

        btn.classList.add("bg-accent","text-white");

        const selected = dates.find(d => d.fullDate === selectedDate);

        generateTimeSlots(selected.availability);
      });
    });
  }

  /* =========================
     GENERATE TIME
  ========================== */
  function generateTimeSlots(availability) {

    timeContainer.classList.remove("hidden");

    const start = availability.start_time;
    const end = availability.end_time;
    const duration = availability.slot_duration;

    let times = [];

    let current = timeToMinutes(start);
    let endTime = timeToMinutes(end);

    while (current < endTime) {
      times.push(minutesToTime(current));
      current += duration;
    }

    fetch(`/e-commerce/wp-json/vp/v1/bookings?staff_id=${staffId}&date=${selectedDate}`)
      .then(res => res.json())
      .then(res => {

        const booked = res.data.map(b => convertTo12Hour(b.booking_time));

        // console.log("Generated slots:", times);
        // console.log("Booked slots:", booked);

        renderTimeSlots(times, booked);
      });
  }

  /* =========================
     RENDER TIME
  ========================== */
  function renderTimeSlots(times, bookedSlots) {

    timeContainer.innerHTML = `
      <h2 class="font-semibold mb-4">Available Times</h2>

      <div class="grid grid-cols-3 md:grid-cols-5 gap-3">
        ${times.map(t => {

          const isBooked = bookedSlots.includes(t);

          return `
            <button 
              class="time-btn px-4 py-3 rounded-xl ${
                isBooked
                  ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  : "bg-beige hover:bg-beige-dark"
              }"
              ${isBooked ? "disabled" : ""}
            >
              ${t}
            </button>
          `;
        }).join("")}
      </div>
    `;

    attachTimeEvents();
  }

  /* =========================
     TIME CLICK
  ========================== */
  function attachTimeEvents() {

    document.querySelectorAll(".time-btn").forEach(btn => {

      if (btn.disabled) return;

      btn.addEventListener("click", () => {

        selectedTime = btn.innerText;

        document.querySelectorAll(".time-btn").forEach(b => {
          b.classList.remove("bg-accent","text-white");
        });

        btn.classList.add("bg-accent","text-white");

        renderSummary();
      });
    });
  }

  /* =========================
     SUMMARY
  ========================== */
  function renderSummary() {

    summaryContainer.classList.remove("hidden");

    summaryContainer.innerHTML = `
      <h3 class="font-semibold mb-2">Your Appointment</h3>
      <p class="text-muted-foreground">
        ${selectedDate} at ${selectedTime}
      </p>
    `;

    continueBtn.classList.remove("bg-muted","text-muted-foreground","cursor-not-allowed");
    continueBtn.classList.add("bg-accent","text-white");
  }

  /* =========================
     BUTTONS
  ========================== */
  backBtn.addEventListener("click", () => {
    window.location.href = `/e-commerce/booking-staff?service_id=${serviceId}`;
  });

  continueBtn.addEventListener("click", () => {

    if (!selectedDate || !selectedTime) return;

    window.location.href = `/e-commerce/booking-summary?service_id=${serviceId}&staff_id=${staffId}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}`;
  });

  /* =========================
     HELPERS
  ========================== */
  function timeToMinutes(time) {
    const [h, m] = time.split(":");
    return parseInt(h) * 60 + parseInt(m);
  }

  function minutesToTime(minutes) {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;

    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
  }

  function convertTo12Hour(time) {
    let [hour, minute] = time.split(":");

    hour = parseInt(hour);
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;
  }

});

/* =========================
   BOOKING SUMMARY
========================= */
document.addEventListener("DOMContentLoaded", function () {

  if (!document.getElementById("serviceName")) return;

  const params = new URLSearchParams(window.location.search);

  const serviceId = params.get("service_id");
  const staffId = params.get("staff_id");
  const date = params.get("date");
  const time = params.get("time");

  /* =========================
     FETCH SERVICE
  ========================== */
  fetch(`/e-commerce/wp-json/vp/v1/services/${serviceId}`)
    .then(res => res.json())
    .then(res => {

      const s = res.data;
      

      document.getElementById("serviceName").innerText = s.name;
      document.getElementById("serviceDuration").innerText = s.duration + " min";

      const price = parseFloat(s.price);
      const tax = price * 0.08;
      const total = price + tax;

      document.getElementById("price").innerText = "₹" + price;
      document.getElementById("tax").innerText = "₹" + tax.toFixed(2);
      document.getElementById("total").innerText = "₹" + total.toFixed(2);

    });

  /* =========================
     FETCH STAFF
  ========================== */
  fetch(`/e-commerce/wp-json/vp/v1/staff/${staffId}`)
    .then(res => res.json())
    .then(res => {
      document.getElementById("staffName").innerText = res.data.name;
    });

  /* =========================
     DATE TIME
  ========================== */
  document.getElementById("bookingDate").innerText = date;
  document.getElementById("bookingTime").innerText = time;

});
/* =========================
   BOOKING SUMMARY UI FIX
========================= */
document.addEventListener("DOMContentLoaded", function () {

  if (!document.getElementById("serviceName")) return;

  const params = new URLSearchParams(window.location.search);

  const serviceId = params.get("service_id");
  const staffId = params.get("staff_id");
  const date = params.get("date");
  const time = params.get("time");

  document.getElementById("bookingDate").innerText = date;
  document.getElementById("bookingTime").innerText = time;

  document.getElementById("backBtn").onclick = () => {
    window.location.href = `/e-commerce/booking-datetime?service_id=${serviceId}&staff_id=${staffId}`;
  };

  document.getElementById("continuePayment").onclick = () => {
    window.location.href = `/e-commerce/booking-checkout?service_id=${serviceId}&staff_id=${staffId}&date=${date}&time=${encodeURIComponent(time)}`;
  };

});
/* =========================
   CHECKOUT PAYMENT 
========================= */
// document.addEventListener("DOMContentLoaded", function () {

//   if (!document.getElementById("payBtn")) return;

//   const params = new URLSearchParams(window.location.search);

//   const serviceId = params.get("service_id");
//   const staffId = params.get("staff_id");
//   const date = params.get("date");
//   const time = params.get("time");

//   let selectedMethod = "razorpay";
//   let totalAmount = 100;
//   let serviceData, staffData;

//   const stripeForm = document.getElementById("stripeForm");
//   const codMessage = document.getElementById("codMessage");

//   /* ================= FETCH ================= */

//   Promise.all([
//     fetch(`/e-commerce/wp-json/vp/v1/services/${serviceId}`).then(r => r.json()),
//     fetch(`/e-commerce/wp-json/vp/v1/staff/${staffId}`).then(r => r.json())
//   ])
//   .then(([s, st]) => {

//     serviceData = s.data;
//     staffData = st.data;

//     totalAmount = parseFloat(serviceData.price);

//     renderSummary();

//   });

//   /* ================= SUMMARY ================= */

//   function renderSummary() {

//     const tax = totalAmount * 0.08;
//     const total = totalAmount + tax;

//     document.getElementById("summaryBox").innerHTML = `
//       <p class="font-semibold">${serviceData.name}</p>
//       <p class="text-sm text-muted-foreground">${date} at ${time}</p>
//       <p class="text-sm text-muted-foreground">with ${staffData.name}</p>

//       <div class="flex justify-between text-sm mt-3">
//         <span>Subtotal</span>
//         <span>₹${totalAmount}</span>
//       </div>

//       <div class="flex justify-between text-sm">
//         <span>Tax</span>
//         <span>₹${tax.toFixed(2)}</span>
//       </div>
//     `;

//     document.getElementById("totalAmount").innerText = "₹" + total.toFixed(2);
//   }

//   /* ================= TOGGLE ================= */

//   document.querySelectorAll(".payment-method").forEach(btn => {

//     btn.addEventListener("click", () => {

//       document.querySelectorAll(".payment-method").forEach(b => {
//         b.classList.remove("border-accent","bg-accent/5");
//         b.classList.add("border-border");
//       });

//       btn.classList.add("border-accent","bg-accent/5");

//       selectedMethod = btn.dataset.method;

//       stripeForm.classList.add("hidden");
//       codMessage.classList.add("hidden");

//       if (selectedMethod === "stripe") stripeForm.classList.remove("hidden");
//       if (selectedMethod === "cod") codMessage.classList.remove("hidden");

//     });

//   });

//   /* ================= STRIPE ================= */

//   let stripe = Stripe("pk_test_51TEOaUD6j3IAZDzdz2PlA6KdKCyvE2tZKYnX9y4hbL4H3XhkWw7sz66QQ2pDdlLFTFf7yZPBpyK2naJugXugQF5v00GSv31xZG"); // replace
//   let elements = stripe.elements();
//   let card = elements.create("card");
//   card.mount("#card-element");

//   function stripePay() {
//     stripe.createToken(card).then(res => {
//       if (res.error) return alert(res.error.message);
//       completeBooking("stripe", res.token.id);
//     });
//   }

//   /* ================= RAZORPAY ================= */

//   function razorpay() {
//     const rzp = new Razorpay({
//       key: "rzp_test_SWGgS01VJnivZc",
//       amount: totalAmount * 100,
//       currency: "INR",
//       handler: res => completeBooking("razorpay", res.razorpay_payment_id)
//     });
//     rzp.open();
//   }

//   /* ================= PAY ================= */

//   document.getElementById("payBtn").onclick = () => {
//  console.log("method:", selectedMethod);
//     if (selectedMethod === "razorpay") razorpay();
//     else if (selectedMethod === "stripe") stripePay();
//     else completeBooking("cod", "offline");

//   };

//   /* ================= SAVE ================= */

//   function completeBooking(method, txn) {

//     fetch(`/e-commerce/wp-json/vp/v1/complete-booking`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         service_id: serviceId,
//         staff_id: staffId,
//         date,
//         time,
//         amount: totalAmount,
//         method,
//         transaction_id: txn
//       })
//     }).then(() => {
//       window.location.href = `/e-commerce/booking-success?service_id=${serviceId}&staff_id=${staffId}&date=${date}&time=${encodeURIComponent(time)}&amount=${totalAmount}`;
//     });

//   }

// });

document.addEventListener("DOMContentLoaded", function () {

  if (!document.getElementById("payBtn")) return;

  /* =========================
     📦 PARAMS
  ========================== */
  const params = new URLSearchParams(window.location.search);

  const serviceId = params.get("service_id");
  const staffId = params.get("staff_id");
  const date = params.get("date");
  const time = params.get("time");

  /* =========================
     🔢 VARIABLES
  ========================== */
  let selectedMethod = "razorpay";

  let serviceData = null;
  let staffData = null;

  let subtotal = 0;
  let tax = 0;
  let finalTotal = 0;

  const summaryBox = document.getElementById("summaryBox");
  const totalEl = document.getElementById("totalAmount");

  const stripeForm = document.getElementById("stripeForm");
  const codMessage = document.getElementById("codMessage");

  /* =========================
     🔥 FETCH DATA
  ========================== */
  Promise.all([
    fetch(`/e-commerce/wp-json/vp/v1/services/${serviceId}`).then(r => r.json()),
    fetch(`/e-commerce/wp-json/vp/v1/staff/${staffId}`).then(r => r.json())
  ])
  .then(([s, st]) => {

    if (!s.success || !st.success) {
      summaryBox.innerHTML = "Error loading data";
      return;
    }

    serviceData = s.data;
    staffData = st.data;

    /* 💰 CALCULATION */
    subtotal = parseFloat(serviceData.price);
    tax = subtotal * 0.08;
    finalTotal = subtotal + tax;

    renderSummary();

  })
  .catch(() => {
    summaryBox.innerHTML = "API error";
  });

  /* =========================
     🧾 RENDER SUMMARY
  ========================== */
  function renderSummary() {

    summaryBox.innerHTML = `
      <div>
        <p class="font-semibold text-lg">${serviceData.name}</p>
        <p class="text-sm text-muted-foreground">${date} at ${time}</p>
        <p class="text-sm text-muted-foreground">with ${staffData.name}</p>
      </div>

      <div class="space-y-2 text-sm mt-4">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>₹${subtotal}</span>
        </div>

        <div class="flex justify-between">
          <span>Tax (8%)</span>
          <span>₹${tax.toFixed(2)}</span>
        </div>
      </div>
    `;

    totalEl.innerText = "₹" + finalTotal.toFixed(2);
  }

  /* =========================
     💳 PAYMENT TOGGLE
  ========================== */
  document.querySelectorAll(".payment-method").forEach(btn => {

    btn.addEventListener("click", () => {

      document.querySelectorAll(".payment-method").forEach(b => {
        b.classList.remove("border-accent","bg-accent/5");
        b.classList.add("border-border");
      });

      btn.classList.add("border-accent","bg-accent/5");

      selectedMethod = btn.dataset.method;

      // reset UI
      stripeForm?.classList.add("hidden");
      codMessage?.classList.add("hidden");

      if (selectedMethod === "stripe") {
        stripeForm?.classList.remove("hidden");
      }

      if (selectedMethod === "cod") {
        codMessage?.classList.remove("hidden");
      }

    });

  });

  /* =========================
     💳 STRIPE INIT
  ========================== */
  let stripe, card;

  if (document.getElementById("card-element")) {
    stripe = Stripe("pk_test_51TEOaUD6j3IAZDzdz2PlA6KdKCyvE2tZKYnX9y4hbL4H3XhkWw7sz66QQ2pDdlLFTFf7yZPBpyK2naJugXugQF5v00GSv31xZG"); // 🔥 replace with your key
    const elements = stripe.elements();
    card = elements.create("card");
    card.mount("#card-element");
  }

  function stripePay() {

    stripe.createToken(card).then(res => {

      if (res.error) {
        alert(res.error.message);
        return;
      }

      completeBooking("stripe", res.token.id);

    });

  }

  /* =========================
     💰 RAZORPAY
  ========================== */
  function razorpay() {

    const rzp = new Razorpay({
      key: "rzp_test_SWGgS01VJnivZc", // 🔥 replace
      amount: Math.round(finalTotal * 100),
      currency: "INR",
      name: "Salon Booking",

      handler: function (response) {
        completeBooking("razorpay", response.razorpay_payment_id);
      }
    });

    rzp.open();
  }

  /* =========================
     🔘 PAY BUTTON
  ========================== */
  document.getElementById("payBtn").addEventListener("click", () => {

    if (!serviceData || !staffData) {
      alert("Please wait...");
      return;
    }

    if (selectedMethod === "razorpay") razorpay();
    else if (selectedMethod === "stripe") stripePay();
    else completeBooking("cod", "offline_" + Date.now());

  });

  /* =========================
     💾 SAVE BOOKING
  ========================== */
  function completeBooking(method, txn) {

    fetch(`/e-commerce/wp-json/vp/v1/complete-booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        staff_id: staffId,
        date: date,
        time: time,
        amount: finalTotal, // ✅ FIXED
        method: method,
        transaction_id: txn
      })
    })
    .then(res => res.json())
    .then(() => {

      window.location.href =
        `/e-commerce/booking-success?service_id=${serviceId}&staff_id=${staffId}&date=${date}&time=${encodeURIComponent(time)}&amount=${finalTotal}`;

    });

  }

});

/* =========================
   SUCCESS PAGE JS
========================= */
document.addEventListener("DOMContentLoaded", function () {

  if (!document.getElementById("bookingRef")) return;

  const params = new URLSearchParams(window.location.search);

  const serviceId = params.get("service_id");
  const staffId = params.get("staff_id");
  const date = params.get("date");
  const time = params.get("time");
  const amount = params.get("amount");

  /* FETCH DATA */
  Promise.all([
    fetch(`/e-commerce/wp-json/vp/v1/services/${serviceId}`).then(r => r.json()),
    fetch(`/e-commerce/wp-json/vp/v1/staff/${staffId}`).then(r => r.json())
  ])
  .then(([serviceRes, staffRes]) => {

    const service = serviceRes.data;
    const staff = staffRes.data;

    document.getElementById("serviceName").innerText = service.name;
    document.getElementById("staffName").innerText = staff.name;

    document.getElementById("bookingDate").innerText = date;
    document.getElementById("bookingTime").innerText = time;

    document.getElementById("totalPaid").innerText = "₹" + amount;

    document.getElementById("bookingRef").innerText =
      "BK-" + Math.floor(Math.random() * 1000000);

  });

});
