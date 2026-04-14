<?php
if (!defined('ABSPATH')) exit;

/* =========================
   REGISTER ROUTES
========================= */
add_action('rest_api_init', function () {

  // ADMIN
  register_rest_route('vp/v1', '/admin/packages', [
    'methods' => 'GET',
    'callback' => 'vp_get_admin_packages',
    'permission_callback' => 'vp_admin_permission'
  ]);

  register_rest_route('vp/v1', '/admin/packages', [
    'methods' => 'POST',
    'callback' => 'vp_create_package',
    'permission_callback' => 'vp_admin_permission'
  ]);

  register_rest_route('vp/v1', '/admin/packages/(?P<id>\d+)', [
    'methods' => 'PUT',
    'callback' => 'vp_update_package',
    'permission_callback' => 'vp_admin_permission'
  ]);

  register_rest_route('vp/v1', '/admin/packages/(?P<id>\d+)', [
    'methods' => 'DELETE',
    'callback' => 'vp_delete_package',
    'permission_callback' => 'vp_admin_permission'
  ]);

  // FRONTEND
  register_rest_route('vp/v1', '/packages', [
    'methods' => 'GET',
    'callback' => 'vp_get_public_packages',
    'permission_callback' => '__return_true'
  ]);

  register_rest_route('vp/v1', '/packages/buy', [
    'methods' => 'POST',
    'callback' => 'vp_buy_package',
    'permission_callback' => 'is_user_logged_in'
  ]);
  register_rest_route('vp/v1', '/customer/package', [
  'methods' => 'GET',
  'callback' => function () {

    global $wpdb;
    $user_id = get_current_user_id();

    $pkg = $wpdb->get_row("
      SELECT cp.*, p.name 
      FROM wp_salon_customer_packages cp
      JOIN wp_salon_packages p ON p.id = cp.package_id
      WHERE cp.customer_id = $user_id
      AND cp.status = 'active'
      LIMIT 1
    ");

    return ['success' => true, 'data' => $pkg];
  }
]);

});

/* =========================
   PERMISSION
========================= */
// function vp_admin_permission() {
//   return current_user_can('manage_options');
// }

/* =========================
   GET ADMIN PACKAGES
========================= */
function vp_get_admin_packages() {
  global $wpdb;

  $table = $wpdb->prefix . 'salon_packages';
  $link = $wpdb->prefix . 'salon_package_services';

  $packages = $wpdb->get_results("SELECT * FROM $table ORDER BY id DESC");

  foreach ($packages as &$p) {
    $services = $wpdb->get_col("SELECT service_id FROM $link WHERE package_id = $p->id");
    $p->services = $services;
  }

  return ['success' => true, 'data' => $packages];
}

/* =========================
   CREATE PACKAGE
========================= */
function vp_create_package($req) {
  global $wpdb;

  $table = $wpdb->prefix . 'salon_packages';
  $link = $wpdb->prefix . 'salon_package_services';

  $data = $req->get_json_params();

  $wpdb->insert($table, [
    'name' => sanitize_text_field($data['name']),
    'description' => sanitize_textarea_field($data['description']),
    'price' => floatval($data['price']),
    'duration_type' => $data['duration_type'],
    'duration' => intval($data['duration']),
    'discount_percent' => intval($data['discount']),
    'max_bookings' => intval($data['max_bookings']),
    'status' => 'active'
  ]);

  $package_id = $wpdb->insert_id;

  // service attach
  if (!empty($data['services'])) {
    foreach ($data['services'] as $sid) {
      $wpdb->insert($link, [
        'package_id' => $package_id,
        'service_id' => intval($sid)
      ]);
    }
  }

  return ['success' => true];
}

/* =========================
   UPDATE PACKAGE
========================= */
function vp_update_package($req) {
  global $wpdb;

  $table = $wpdb->prefix . 'salon_packages';
  $link = $wpdb->prefix . 'salon_package_services';

  $id = intval($req['id']);
  $data = $req->get_json_params();

  $wpdb->update($table, [
    'name' => sanitize_text_field($data['name']),
    'description' => sanitize_textarea_field($data['description']),
    'price' => floatval($data['price']),
    'duration_type' => $data['duration_type'],
    'duration' => intval($data['duration']),
    'discount_percent' => intval($data['discount']),
    'max_bookings' => intval($data['max_bookings']),
  ], ['id' => $id]);

  // पुold remove
  $wpdb->delete($link, ['package_id' => $id]);

  // new add
  if (!empty($data['services'])) {
    foreach ($data['services'] as $sid) {
      $wpdb->insert($link, [
        'package_id' => $id,
        'service_id' => intval($sid)
      ]);
    }
  }

  return ['success' => true];
}

/* =========================
   DELETE
========================= */
function vp_delete_package($req) {
  global $wpdb;

  $table = $wpdb->prefix . 'salon_packages';

  $wpdb->delete($table, ['id' => intval($req['id'])]);

  return ['success' => true];
}

/* =========================
   PUBLIC PACKAGES
========================= */
function vp_get_public_packages() {
  global $wpdb;

  $table = $wpdb->prefix . 'salon_packages';

  $data = $wpdb->get_results("SELECT * FROM $table WHERE status='active'");

  return ['success' => true, 'data' => $data];
}

/* =========================
   BUY PACKAGE
========================= */
function vp_buy_package($req) {
  global $wpdb;

  $data = $req->get_json_params();
  $pkg = $wpdb->get_row("SELECT * FROM {$wpdb->prefix}salon_packages WHERE id=".$data['package_id']);

  $start = date("Y-m-d");
  $end = date("Y-m-d", strtotime("+{$pkg->duration} {$pkg->duration_type}"));

  $wpdb->insert($wpdb->prefix.'salon_customer_packages', [
    'customer_id' => get_current_user_id(),
    'package_id' => $pkg->id,
    'remaining_bookings' => $pkg->max_bookings,
    'start_date' => $start,
    'end_date' => $end
  ]);

  return ['success' => true];
}