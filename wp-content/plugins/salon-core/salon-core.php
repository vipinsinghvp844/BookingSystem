<?php
/**
 * Plugin Name: Salon Core
 */

if (!defined('ABSPATH')) exit;

/* =========================
    CONSTANTS
========================= */
define('SALON_CORE_PATH', plugin_dir_path(__FILE__));
define('SALON_CORE_URL', plugin_dir_url(__FILE__));

/* =========================
    LOAD FILES
========================= */

/* API */
require_once SALON_CORE_PATH . 'includes/api/services.php';
require_once SALON_CORE_PATH . 'includes/api/staff.php';
require_once SALON_CORE_PATH . 'includes/api/bookings.php';
require_once SALON_CORE_PATH . 'includes/api/dashboard.php';

/* ADMIN */
require_once SALON_CORE_PATH . 'includes/admin/menu.php';
require_once SALON_CORE_PATH . 'includes/admin/layout.php';
require_once SALON_CORE_PATH . 'includes/admin/dashboard.php';
require_once SALON_CORE_PATH . 'includes/admin/services.php';
require_once SALON_CORE_PATH . 'includes/admin/bookings.php';
require_once SALON_CORE_PATH . 'includes/admin/calendar.php';
require_once SALON_CORE_PATH . 'includes/admin/packages.php';
require_once SALON_CORE_PATH . 'includes/admin/employees.php';
require_once SALON_CORE_PATH . 'includes/admin/customers.php';
require_once SALON_CORE_PATH . 'includes/admin/coupons.php';
require_once SALON_CORE_PATH . 'includes/admin/payments.php';
require_once SALON_CORE_PATH . 'includes/admin/settings.php';


/* =========================
    ADMIN ASSETS
========================= */
add_action('admin_enqueue_scripts', function ($hook) {

    $allowed_pages = [
        'toplevel_page_salon-dashboard',
        'salon-dashboard_page_salon-services',
        'salon-dashboard_page_salon-bookings',
        'salon-dashboard_page_salon-calendar',
        'salon-dashboard_page_salon-package',
        'salon-dashboard_page_salon-employees',
        'salon-dashboard_page_salon-customers',
        'salon-dashboard_page_salon-coupons',
        'salon-dashboard_page_salon-payments',
        'salon-dashboard_page_salon-settings',
    ];

    if (!in_array($hook, $allowed_pages)) return;

    wp_enqueue_style(
        'salon-admin-css',
        SALON_CORE_URL . 'assets/css/admin.css',
        [],
        time()
    );

    wp_enqueue_script(
        'chart-js',
        'https://cdn.jsdelivr.net/npm/chart.js',
        [],
        null,
        true
    );
    wp_enqueue_script(
        'admin-dashboard-js',
        SALON_CORE_URL . 'assets/js/admin.js',
        ['chart-js'],
        null,
        true
    );
    wp_enqueue_script(
    'lucide-icons',
    'https://unpkg.com/lucide@latest',
    [],
    time(),
    true
);
 //  NONCE + REST URL yahi lagana hai
    wp_localize_script('admin-dashboard-js', 'SALON_ADMIN', [
        'rest_url' => esc_url_raw(rest_url()),
        'nonce'    => wp_create_nonce('wp_rest')
    ]);

});









