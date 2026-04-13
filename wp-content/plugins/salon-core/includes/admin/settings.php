<?php
function salon_admin_settings_page() {
  salon_admin_layout(function () {
?>

<div class="admin-layout">

  <main class="admin-content settings-page">

    <h1 class="page-title">Settings</h1>

    <div class="settings-wrapper">

      <!-- BUSINESS INFO -->
      <div class="settings-card">
        <h2>🏢 Business Information</h2>

        <div class="form-group">
          <label>Business Name</label>
          <input type="text" value="LuxeSalon">
        </div>

        <div class="form-group">
          <label>Address</label>
          <input type="text" value="123 Beauty Avenue">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Phone</label>
            <input type="text" value="9876543210">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" value="info@luxesalon.com">
          </div>
        </div>
      </div>

      <!-- BUSINESS HOURS -->
      <div class="settings-card">
        <h2>⏰ Business Hours</h2>

        <?php
        $days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        foreach ($days as $day) {
        ?>
          <div class="hours-row">
            <span><?php echo $day; ?></span>
            <input type="time" value="09:00">
            <input type="time" value="18:00">
          </div>
        <?php } ?>

      </div>

      <!-- PAYMENT -->
      <div class="settings-card">
        <h2>💰 Payment Settings</h2>

        <div class="form-group">
          <label>Tax Rate (%)</label>
          <input type="number" value="8">
        </div>

        <div class="form-group">
          <label>Currency</label>
          <select>
            <option>INR (₹)</option>
            <option>USD ($)</option>
          </select>
        </div>
      </div>

      <!-- SAVE -->
      <button class="btn-primary full-btn">Save All Settings</button>

    </div>

  </main>

</div>

<?php
  });
}