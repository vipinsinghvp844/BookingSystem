<?php
function salon_admin_services_page() {
  salon_admin_layout(function () {
?>

  <div class="admin-header">
    <h1>Manage Services</h1>

    <button id="addServiceBtn" class="btn-primary">
      + Add Service
    </button>
  </div>

  <div class="search-box">
    <input type="text" placeholder="Search services..." id="searchService">
  </div>

  <div class="table-card">
    <table>
      <thead>
        <tr>
          <th>S Image</th>
          <th>Service Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Duration</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody id="servicesTable"></tbody>
    </table>
  </div>

  <div id="serviceModal" class="modal hidden">
    <div class="modal-content">

      <h3 id="serviceModalTitle">Add New Service</h3>

      <input id="serviceId" type="hidden">
      <!-- FEATURED IMAGE -->
      <label>Featured Image</label>
      <input type="file" id="sFeatured" accept="image/*">
      <img id="previewFeatured" style="width:80px; margin-top:10px; display:none;" />

      <input id="sName" type="text" placeholder="Service Name">
      
      <select id="sCategory">
        <option value="">Select Category</option>
      </select>

      <input id="sPrice" type="number" placeholder="Price">
      <input id="sDuration" type="text" placeholder="Duration (60 min)">
      <!-- GALLERY -->
      <label>Gallery Images</label>
      <input type="file" id="sGallery" multiple accept="image/*">
      <div id="previewGallery" style="display:flex; gap:10px; margin-top:10px;"></div>
      <select id="sStatus">
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>

      <div class="modal-actions">
        <button id="closeModal" class="btn-outline">Cancel</button>
        <button id="saveService" class="btn-primary">Save Service</button>
      </div>

    </div>
  </div>

<?php
  });
}