<?php
add_action('admin_menu', function () {

  add_menu_page(
    'Salon Dashboard',
    'Salon Dashboard',
    'manage_options',
    'salon-dashboard',
    'salon_admin_dashboard_page',
    'dashicons-chart-line',
    3
  );
   // SUBMENUS (ROUTES)
    add_submenu_page(
        'salon-dashboard',
        'Dashboard',
        'Dashboard',
        'manage_options',
        'salon-dashboard',
        'salon_admin_dashboard_page',
    );
    add_submenu_page(
        'salon-dashboard',
        'Calendar',
        'Calendar',
        'manage_options',
        'salon-calendar',
        'salon_admin_calendar_page'
    );
    add_submenu_page(
        'salon-dashboard',
        'Services',
        'Services',
        'manage_options',
        'salon-services',
        'salon_admin_services_page'
    );
    add_submenu_page(
        'salon-dashboard',
        'Bookings',
        'Bookings',
        'manage_options',
        'salon-bookings',
        'salon_admin_bookings_page'
    );
    add_submenu_page(
        'salon-dashboard',
        'Pakages',
        'Pakages',
        'manage_options',
        'salon-package',
        'salon_admin_packages_page'
    );
    add_submenu_page(
        'salon-dashboard',
        'Employees',
        'Employees',
        'manage_options',
        'salon-employees',
        'salon_admin_employees_page'
    );
    add_submenu_page(
        'salon-dashboard',
        'Customers',
        'Customers',
        'manage_options',
        'salon-customers',
        'salon_admin_customers_page'
        );
    add_submenu_page(
        'salon-dashboard',
        'Coupons & Offers',
        'Coupons & Offers',
        'manage_options',
        'salon-coupons',
        'salon_admin_coupons_page'
    );
    add_submenu_page(
        'salon-dashboard',
        'Payments',
        'Payments',
        'manage_options',
        'salon-payments',
        'salon_admin_payments_page'
    );
    add_submenu_page(
        'salon-dashboard',
        'Settings',
        'Settings',
        'manage_options',
        'salon-settings',
        'salon_admin_settings_page'
    );

});

