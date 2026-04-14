<?php
add_action('rest_api_init', function () {

    register_rest_route('vp/v1', '/bookings', [
    'methods' => 'GET',
    'callback' => 'vp_get_bookings'
    ]);
    register_rest_route('vp/v1', '/create-booking', [
    'methods' => 'POST',
    'callback' => 'vp_create_booking'
    ]);
    register_rest_route('vp/v1', '/complete-booking', [
    'methods' => 'POST',
    'callback' => 'vp_complete_booking'
    ]);
     register_rest_route('vp/v1', '/admin/bookings', [
    'methods' => 'GET',
    'callback' => 'vp_get_admin_bookings',
    'permission_callback' => 'vp_admin_permission',
    ]);
    register_rest_route('vp/v1', '/admin/booking-status', [
    'methods' => 'POST',
    'callback' => 'vp_update_booking_status',
    'permission_callback' => 'vp_admin_permission'
    ]);
    register_rest_route('vp/v1', '/admin/calendar', [
    'methods' => 'GET',
    'callback' => 'vp_get_calendar_data',
    'permission_callback' => 'vp_admin_permission',
    ]);

});


function vp_get_bookings($request) {
    global $wpdb;

    $staff_id = intval($request['staff_id']);
    $date = sanitize_text_field($request['date']);

    $table = $wpdb->prefix . 'bookings';

    $results = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT booking_time FROM $table 
             WHERE staff_id = %d AND booking_date = %s AND status = 'confirmed'",
            $staff_id,
            $date
        )
    );

    return [
        'success' => true,
        'data' => $results
    ];
}
function vp_complete_booking($req) {

  global $wpdb;

  $data = $req->get_json_params();

  $user_id = get_current_user_id();

  $service_id = intval($data['service_id']);

  // 🔥 1. check active package
  $pkg = $wpdb->get_row("
    SELECT * FROM wp_salon_customer_packages
    WHERE customer_id = $user_id
    AND status = 'active'
    AND remaining_bookings > 0
    AND CURDATE() BETWEEN start_date AND end_date
    ORDER BY id DESC
    LIMIT 1
  ");

  $use_package = false;

  if ($pkg) {

    // 🔥 2. check service allowed
    $allowed = $wpdb->get_var("
      SELECT COUNT(*) FROM wp_salon_package_services
      WHERE package_id = {$pkg->package_id}
      AND service_id = $service_id
    ");

    if ($allowed) {
      $use_package = true;
    }

  }

  // 🔥 3. insert booking
  $wpdb->insert('wp_salon_bookings', [
    'customer_id' => $user_id,
    'service_id' => $service_id,
    'staff_id' => $data['staff_id'],
    'booking_date' => $data['date'],
    'booking_time' => $data['time'],
    'amount' => $use_package ? 0 : $data['amount'],
    'payment_method' => $data['method'],
    'transaction_id' => $data['transaction_id'],
    'package_id' => $use_package ? $pkg->package_id : null,
    'is_package_used' => $use_package ? 1 : 0,
    'status' => 'confirmed'
  ]);

  // 🔥 4. reduce booking
  if ($use_package) {
    $wpdb->query("
      UPDATE wp_salon_customer_packages
      SET remaining_bookings = remaining_bookings - 1
      WHERE id = {$pkg->id}
    ");
  }

  return [
    'success' => true,
    'used_package' => $use_package
  ];
}
function vp_create_booking($request) {
    global $wpdb;

    $table = $wpdb->prefix . 'bookings';

    $wpdb->insert($table, [
        'service_id' => $request['service_id'],
        'staff_id' => $request['staff_id'],
        'booking_date' => $request['date'],
        'booking_time' => $request['time'],
        'status' => 'confirmed'
    ]);

    return ['success' => true];
}

function vp_get_admin_bookings() {
  global $wpdb;

  $results = $wpdb->get_results("
    SELECT b.*, s.name as service_name, st.name as staff_name
    FROM {$wpdb->prefix}bookings b
    LEFT JOIN {$wpdb->prefix}services s ON b.service_id = s.id
    LEFT JOIN {$wpdb->prefix}staff st ON b.staff_id = st.id
    ORDER BY b.id DESC
  ");

  return [
    'success' => true,
    'data' => $results
  ];
}

function vp_update_booking_status($req) {
  global $wpdb;

  $id = intval($req['id']);
  $status = sanitize_text_field($req['status']);

  $wpdb->update(
    "{$wpdb->prefix}bookings",
    ['status' => $status],
    ['id' => $id]
  );

  return ['success' => true];
}

function vp_get_calendar_data() {
  global $wpdb;

  $results = $wpdb->get_results("
    SELECT 
      b.id,
      b.booking_date,
      b.booking_time,
      b.status,
      s.name as service_name,
      st.name as staff_name
    FROM {$wpdb->prefix}bookings b
    LEFT JOIN {$wpdb->prefix}services s ON b.service_id = s.id
    LEFT JOIN {$wpdb->prefix}staff st ON b.staff_id = st.id
  ");

  return [
    'success' => true,
    'data' => $results
  ];
}

function use_package_if_available($customer_id, $service_id) {
  global $wpdb;

  $pkg = $wpdb->get_row("
    SELECT cp.*, ps.service_id 
    FROM wp_salon_customer_packages cp
    JOIN wp_salon_package_services ps 
      ON cp.package_id = ps.package_id
    WHERE cp.customer_id = $customer_id
      AND ps.service_id = $service_id
      AND cp.status = 'active'
      AND cp.remaining_bookings > 0
      AND cp.end_date >= CURDATE()
    LIMIT 1
  ");

  if ($pkg) {
    // 🔥 reduce usage
    $wpdb->query("
      UPDATE wp_salon_customer_packages
      SET remaining_bookings = remaining_bookings - 1
      WHERE id = $pkg->id
    ");

    return true; // package used
  }

  return false;
}