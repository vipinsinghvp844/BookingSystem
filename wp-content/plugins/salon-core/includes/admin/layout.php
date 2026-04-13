<?php
function salon_admin_layout($content_callback) {
?>

<div class="admin-layout">

  <!-- SIDEBAR -->
  <aside class="admin-sidebar">

    <div class="sidebar-header">
      <div class="logo-box">LS</div>
      <span>LuxeSalon</span>
    </div>

    <nav class="sidebar-menu">
     
      <a href="<?php echo admin_url('admin.php?page=salon-dashboard'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-dashboard') ? 'active' : ''; ?>">
         <i data-lucide="layout-dashboard"></i> Dashboard
      </a>
       <a href="<?php echo admin_url('admin.php?page=salon-calendar'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-calendar') ? 'active' : ''; ?>">
         <i data-lucide="calendar"></i> Calendar
      </a>
      <a href="<?php echo admin_url('admin.php?page=salon-services'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-services') ? 'active' : ''; ?>">
         <i data-lucide="scissors"></i> Services
      </a>
      <a href="<?php echo admin_url('admin.php?page=salon-bookings'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-bookings') ? 'active' : ''; ?>">
         <i data-lucide="calendar-days"></i> Bookings
      </a>
      <a href="<?php echo admin_url('admin.php?page=salon-package'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-packages') ? 'active' : ''; ?>">
         <i data-lucide="Package"></i> Packages
      </a>
      <a href="<?php echo admin_url('admin.php?page=salon-employees'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-employees') ? 'active' : ''; ?>">
         <i data-lucide="Users"></i> Employees
      </a>
      <a href="<?php echo admin_url('admin.php?page=salon-customers'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-customers') ? 'active' : ''; ?>">
         <i data-lucide="Users"></i> Customers
      </a>
      <a href="<?php echo admin_url('admin.php?page=salon-coupons'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-coupons') ? 'active' : ''; ?>">
         <i data-lucide="Tag"></i> Coupons & Offers
      </a>
      <a href="<?php echo admin_url('admin.php?page=salon-payments'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-payments') ? 'active' : ''; ?>">
         <i data-lucide="CreditCard"></i> Payments
      </a>
      <a href="<?php echo admin_url('admin.php?page=salon-settings'); ?>"
         class="<?php echo ($_GET['page'] === 'salon-settings') ? 'active' : ''; ?>">
         <i data-lucide="Settings"></i> Settings
      </a>

    </nav>

    <div class="sidebar-help">
      <h4>Need Help?</h4>
      <p>Contact our support team</p>
      <button>Get Support</button>
    </div>

  </aside>

  <!-- CONTENT -->
  <main class="admin-content">
    <?php call_user_func($content_callback); ?>
  </main>

</div>

<?php
}