<?php
function salon_admin_packages_page() {
  salon_admin_layout(function () {
?>

<div class="admin-layout">

  <main class="admin-content">

    <!-- HEADER -->
    <div class="admin-header">
      <h1>Manage Packages</h1>

      <button class="btn-primary">
        + Add Package
      </button>
    </div>

    <!-- GRID -->
    <div class="packages-grid">

      <!-- CARD -->
      <div class="package-card">
        <h3>Beauty Essentials</h3>
        <p class="price">$199/mo</p>
        <p class="members">45 active members</p>

        <div class="card-actions">
          <button class="btn-light">✏ Edit</button>
          <button class="btn-danger">🗑</button>
        </div>
      </div>

      <div class="package-card">
        <h3>Premium Luxury</h3>
        <p class="price">$399/mo</p>
        <p class="members">89 active members</p>

        <div class="card-actions">
          <button class="btn-light">✏ Edit</button>
          <button class="btn-danger">🗑</button>
        </div>
      </div>

      <div class="package-card">
        <h3>Royal Treatment</h3>
        <p class="price">$699/mo</p>
        <p class="members">23 active members</p>

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