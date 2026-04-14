<?php
function salon_admin_packages_page() {
  salon_admin_layout(function () {
?>
<div class="admin-header">
  <h1>Manage Packages</h1>

  <button id="openPackageModal" class="btn-primary">
    + Add Package
  </button>
</div>

<div class="packages-grid" id="packagesGrid"></div>

<!-- MODAL -->
<div id="packageModal" class="modal hidden">
  <div class="modal-content">

    <h3 id="modalTitle">Add Package</h3>

    <input id="pName" placeholder="Package Name">
    <textarea id="pDesc" placeholder="Description" style="width:100%;"></textarea>
  <label>Select Services</label>

<div id="pServicesBox" class="services-box">
  <!-- checkbox list JS se fill hogi -->
</div>
    <div class="form-row">
      <input id="pPrice" type="number" placeholder="Price">
      <input id="pDiscount" type="number" placeholder="Discount %">
    </div>

    <div class="form-row">
      <select id="pDurationType">
        <option value="months">Months</option>
        <option value="days">Days</option>
      </select>

      <input id="pDuration" type="number" placeholder="Duration">
    </div>

    <input id="pMaxBookings" type="number" placeholder="Max Bookings">
    <div class="modal-actions">
      <button id="closePackageModal" class="btn-outline">Cancel</button>
      <button id="savePackage" class="btn-primary">Save</button>
    </div>

  </div>
</div>
<?php
  });
}