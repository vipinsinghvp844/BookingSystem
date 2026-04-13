<?php
function salon_admin_employees_page() {
  salon_admin_layout(function () {
?>

<div class="admin-layout">

  <main class="admin-content">

    <!-- HEADER -->
    <div class="admin-header">
      <h1>Manage Employees</h1>

      <button class="btn-primary">
        + Add Employee
      </button>
    </div>

    <!-- SEARCH -->
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Search employees...">
    </div>

    <!-- TABLE -->
    <div class="table-card">
      <table class="admin-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td class="font-semibold">Emma Thompson</td>
            <td>Master Stylist</td>
            <td class="text-muted">emma@luxesalon.com</td>
            <td><span class="status active">Active</span></td>
            <td>
              <div class="actions">
                <button class="icon-btn">✏</button>
                <button class="icon-btn danger">🗑</button>
              </div>
            </td>
          </tr>

          <tr>
            <td class="font-semibold">Michael Chen</td>
            <td>Spa Director</td>
            <td class="text-muted">michael@luxesalon.com</td>
            <td><span class="status active">Active</span></td>
            <td>
              <div class="actions">
                <button class="icon-btn">✏</button>
                <button class="icon-btn danger">🗑</button>
              </div>
            </td>
          </tr>

          <tr>
            <td class="font-semibold">Sofia Rodriguez</td>
            <td>Nail Artist</td>
            <td class="text-muted">sofia@luxesalon.com</td>
            <td><span class="status active">Active</span></td>
            <td>
              <div class="actions">
                <button class="icon-btn">✏</button>
                <button class="icon-btn danger">🗑</button>
              </div>
            </td>
          </tr>

        </tbody>

      </table>
    </div>

  </main>

</div>

<?php
  });
}