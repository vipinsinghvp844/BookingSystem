<?php
function salon_admin_customers_page() {
  salon_admin_layout(function () {
?>

<div class="admin-layout">

  <main class="admin-content">

    <!-- TITLE -->
    <h1 class="mb-8">Manage Customers</h1>

    <!-- SEARCH -->
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Search customers...">
    </div>

    <!-- TABLE -->
    <div class="table-card">
      <table class="admin-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bookings</th>
            <th>Total Spent</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td class="font-semibold">Sarah Johnson</td>
            <td class="text-muted">sarah@example.com</td>
            <td>12</td>
            <td class="text-accent font-semibold">$1,240</td>
            <td>
              <button class="icon-btn">👁</button>
            </td>
          </tr>

          <tr>
            <td class="font-semibold">Emily Davis</td>
            <td class="text-muted">emily@example.com</td>
            <td>8</td>
            <td class="text-accent font-semibold">$890</td>
            <td>
              <button class="icon-btn">👁</button>
            </td>
          </tr>

          <tr>
            <td class="font-semibold">Jessica Wilson</td>
            <td class="text-muted">jessica@example.com</td>
            <td>15</td>
            <td class="text-accent font-semibold">$1,650</td>
            <td>
              <button class="icon-btn">👁</button>
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