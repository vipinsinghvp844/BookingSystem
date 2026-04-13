<?php
function salon_admin_calendar_page() {
  salon_admin_layout(function () {
?>

<div class="admin-layout">

  <main class="admin-content">

    <!-- HEADER -->
    <div class="admin-header">
      <h1>System Calendar</h1>

      <div class="calendar-nav">
        <button class="nav-btn" id="prevMonth">◀</button>
        <span id="currentMonth">March 2026</span>
        <button class="nav-btn" id="nextMonth">▶</button>
      </div>
    </div>

    <!-- CALENDAR -->
    <div class="calendar-card">

      <!-- DAYS -->
      <div class="calendar-days">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      <!-- DATES -->
      <div class="calendar-grid" id="calendarGrid">
        <!-- JS se fill hoga -->
      </div>

    </div>

  </main>

</div>

<?php
  });
}