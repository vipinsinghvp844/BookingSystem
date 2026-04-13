<?php
function salon_admin_coupons_page() {
  salon_admin_layout(function () {
?>

<div class="admin-layout">

  <main class="admin-content">

    <!-- HEADER -->
    <div class="admin-header">
      <h1>Coupons & Offers</h1>

      <button class="btn-primary">
        + Create Coupon
      </button>
    </div>

    <!-- GRID -->
    <div class="coupons-grid">

      <!-- CARD -->
      <div class="coupon-card">

        <div class="coupon-top">
          <div class="coupon-icon">🏷</div>
          <span class="status active">Active</span>
        </div>

        <h3>SPRING20</h3>
        <p class="coupon-discount">20% OFF</p>

        <div class="coupon-meta">
          <p>Expires: Apr 30, 2026</p>
          <p>Used: 45 times</p>
        </div>

        <div class="card-actions">
          <button class="btn-light">✏ Edit</button>
          <button class="btn-danger">🗑</button>
        </div>

      </div>

      <!-- CARD -->
      <div class="coupon-card">

        <div class="coupon-top">
          <div class="coupon-icon">🏷</div>
          <span class="status active">Active</span>
        </div>

        <h3>WELCOME10</h3>
        <p class="coupon-discount">10% OFF</p>

        <div class="coupon-meta">
          <p>Expires: Dec 31, 2026</p>
          <p>Used: 123 times</p>
        </div>

        <div class="card-actions">
          <button class="btn-light">✏ Edit</button>
          <button class="btn-danger">🗑</button>
        </div>

      </div>

      <!-- CARD -->
      <div class="coupon-card">

        <div class="coupon-top">
          <div class="coupon-icon">🏷</div>
          <span class="status active">Active</span>
        </div>

        <h3>VIP50</h3>
        <p class="coupon-discount">$50 OFF</p>

        <div class="coupon-meta">
          <p>Expires: Jun 15, 2026</p>
          <p>Used: 12 times</p>
        </div>

        <div class="card-actions">
          <button class="btn-light">✏ Edit</button>
          <button class="btn-danger">🗑</button>
        </div>

      </div>

    </div>

  </main>

</div>

<?php
  });
}