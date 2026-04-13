<?php
function salon_admin_payments_page() {
  salon_admin_layout(function () {
?>

<div class="admin-layout">

  <main class="admin-content">

    <!-- HEADER -->
    <div class="admin-header">
      <h1>Payments</h1>

      <button class="btn-primary">
        ⬇ Export Report
      </button>
    </div>

    <!-- STATS -->
    <div class="stats-grid payments-stats">

      <div class="card">
        <div class="icon">💰</div>
        <h2>₹12,450</h2>
        <p>Total Revenue</p>
      </div>

      <div class="card">
        <div class="icon">💳</div>
        <h2>₹324</h2>
        <p>Pending Payments</p>
      </div>

      <div class="card">
        <div class="icon">📊</div>
        <h2>156</h2>
        <p>Transactions</p>
      </div>

    </div>

    <!-- TABLE -->
    <div class="table-card">

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td class="mono">PAY-001234</td>
            <td>Sarah Johnson</td>
            <td class="amount">₹91.80</td>
            <td class="muted">Mar 25, 2026</td>
            <td>Credit Card</td>
            <td><span class="status success">Completed</span></td>
          </tr>

          <tr>
            <td class="mono">PAY-001235</td>
            <td>Emily Davis</td>
            <td class="amount">₹162.00</td>
            <td class="muted">Mar 25, 2026</td>
            <td>PayPal</td>
            <td><span class="status success">Completed</span></td>
          </tr>

          <tr>
            <td class="mono">PAY-001236</td>
            <td>Jessica Wilson</td>
            <td class="amount">₹70.20</td>
            <td class="muted">Mar 26, 2026</td>
            <td>Credit Card</td>
            <td><span class="status pending">Pending</span></td>
          </tr>

        </tbody>

      </table>

    </div>

  </main>

</div>

<?php
  });
}