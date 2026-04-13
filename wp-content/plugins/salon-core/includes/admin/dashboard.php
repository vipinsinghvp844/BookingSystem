<?php
function salon_admin_dashboard_page() {

  salon_admin_layout(function () {
?>

<h1>Admin Dashboard</h1>

<div class="stats-grid">

  <div class="card">
    <div class="card-top">
      <div class="icon"><i data-lucide="dollar-sign"></i></div>
      <span>+12%</span>
    </div>
    <h2 id="totalRevenue">0</h2>
    <p>Total Revenue</p>
  </div>

  <div class="card">
    <div class="card-top">
      <div class="icon"><i data-lucide="calendar"></i></div>
      <span>+8%</span>
    </div>
    <h2 id="totalBookings">0</h2>
    <p>Bookings</p>
  </div>

  <div class="card">
    <div class="card-top">
      <div class="icon"><i data-lucide="users"></i></div>
      <span>+15%</span>
    </div>
    <h2 id="totalCustomers">0</h2>
    <p>Customers</p>
  </div>

  <div class="card">
    <div class="card-top">
      <div class="icon"><i data-lucide="trending-up"></i></div>
      <span>+5%</span>
    </div>
    <h2 id="totalGrowth">0%</h2>
    <p>Growth</p>
  </div>

</div>

<div class="charts-grid">
  <div class="chart-card">
    <h3>Revenue Overview</h3>
    <canvas id="revenueChart"></canvas>
  </div>

  <div class="chart-card">
    <h3>Bookings by Service</h3>
    <canvas id="bookingChart"></canvas>
  </div>
</div>

<?php
  });

}