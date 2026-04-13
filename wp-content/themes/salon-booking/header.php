<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script src="https://js.stripe.com/v3/"></script>
    <?php wp_head(); ?> 
</head>

<body <?php body_class(); ?>>
<header class="bg-white border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-white/95">
  <div class="flex items-center justify-between px-6 py-4">

    <!-- LEFT -->
    <div class="flex items-center gap-4">
      
      <!-- Mobile Menu Button -->
      <button id="menuToggle"
        class="lg:hidden p-2 hover:bg-secondary rounded-xl transition-colors">
        ☰
      </button>

      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <div class="w-10 h-10 bg-gradient-to-br from-accent to-gold-dark rounded-xl flex items-center justify-center">
          <?php if (has_custom_logo()) : ?>
            <?php the_custom_logo(); ?>
          <?php else : ?>
            <span class="text-white font-semibold">LS</span>
          <?php endif; ?>
        </div>
        <span class="font-semibold tracking-tight hidden sm:block">LuxeSalon</span>
      </a>
    </div>

    <!-- NAV -->
    <nav class="hidden md:flex items-center gap-8">
      <?php
        wp_nav_menu([
          'theme_location' => 'primary_menu',
          'container' => false,
          'menu_class' => 'flex items-center gap-8 text-sm hover:text-accent transition-colors',
          'fallback_cb' => false,
          'items_wrap' => '%3$s',
        ]);
      ?>
    </nav>

    <!-- RIGHT -->
    <div class="flex items-center gap-3">

      <!-- 🔔 Notifications -->
      <div class="relative">
        <button id="notificationBtn"
          class="p-2 hover:bg-secondary rounded-xl transition-colors relative">
          🔔
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full"></span>
        </button>

        <div id="notificationDropdown"
          class="hidden absolute right-0 mt-2 w-80 bg-white border border-border rounded-2xl shadow-xl overflow-hidden">

          <div class="p-4 border-b border-border">
            <h3 class="font-semibold">Notifications</h3>
          </div>

          <div class="max-h-96 overflow-y-auto">
            <div class="p-4 border-b border-border hover:bg-secondary transition cursor-pointer">
              <p class="text-sm">Your appointment is confirmed for tomorrow at 2:00 PM</p>
              <p class="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </div>

            <div class="p-4 border-b border-border hover:bg-secondary transition cursor-pointer">
              <p class="text-sm">Special offer: 20% off on all spa packages</p>
              <p class="text-xs text-muted-foreground mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 👤 Profile -->
      <?php if (is_user_logged_in()) : 
  $current_user = wp_get_current_user();
?>

<div class="relative">
  <button id="profileBtn" class="p-2 hover:bg-secondary rounded-xl">
    👤
  </button>

  <div id="profileDropdown" class="hidden absolute right-0 mt-2 w-64 bg-white border rounded-2xl shadow-xl">

    <div class="p-4 border-b">
      <p class="font-semibold"><?php echo $current_user->display_name; ?></p>
      <p class="text-sm text-muted-foreground"><?php echo $current_user->user_email; ?></p>
    </div>

    <div class="p-2">
      <a href="/customer-dashboard" class="block px-4 py-2 text-sm hover:bg-secondary rounded-xl">Dashboard</a>
      <a href="/my-bookings" class="block px-4 py-2 text-sm hover:bg-secondary rounded-xl">My Bookings</a>

      <hr class="my-2">

      <a href="<?php echo wp_logout_url('/'); ?>" 
         class="block px-4 py-2 text-sm hover:bg-secondary rounded-xl">
        Logout
      </a>
    </div>

  </div>
</div>

<?php else : ?>

<a href="/login"
  class="px-4 py-2 border rounded-xl text-sm">
  Login
</a>

<?php endif; ?>

      <!-- CTA -->
    <a href="<?php echo home_url('/booking/service'); ?>"
        class="hidden sm:inline-flex items-center px-6 py-2.5 bg-accent text-white rounded-xl hover:bg-gold-dark transition-colors">
        Book Now
      </a>

    </div>
  </div>

  <!-- MOBILE MENU SAME (no change in JS IDs) -->
  <div id="mobileMenu" class="fixed inset-0 z-50 hidden">
    <div id="menuOverlay" class="absolute inset-0 bg-black/50"></div>

    <div id="menuPanel"
      class="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-6 transform -translate-x-full transition-transform duration-300">

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold">Menu</h2>
        <button id="menuClose" class="text-2xl">✕</button>
      </div>

      <nav class="flex flex-col gap-4">
  <?php
    wp_nav_menu([
      'theme_location' => 'primary_menu',
      'container' => false,
      'items_wrap' => '%3$s',
    ]);
  ?>

  <a href="<?php echo home_url('/booking/service'); ?>"
    class="mt-4 bg-accent text-white px-4 py-2 rounded-xl text-center">
    Book Now
  </a>
</nav>
    </div>
  </div>

</header>