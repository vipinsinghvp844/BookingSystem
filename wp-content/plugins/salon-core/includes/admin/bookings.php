<?php
function salon_admin_bookings_page() {
  salon_admin_layout(function () {
?>

<div class="admin-layout">

  <main class="admin-content">

    <!-- HEADER -->
    <div class="admin-header">
      <h1>Manage Bookings</h1>
    </div>

    <!-- SEARCH -->
    <div class="search-box">
      <input type="text" placeholder="Search bookings..." id="searchBooking">
    </div>

    <!-- LIST -->
    <div class="booking-list" id="bookingList">
      <!-- append data -->
    </div>

  </main>

</div>

<?php
  });
}