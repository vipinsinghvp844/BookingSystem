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
function vp_complete_booking($request) {
  global $wpdb;

  $booking_table = $wpdb->prefix . 'bookings';
  $payment_table = $wpdb->prefix . 'payments';

  // SAVE BOOKING
  $wpdb->insert($booking_table, [
    'service_id' => $request['service_id'],
    'staff_id' => $request['staff_id'],
    'booking_date' => $request['date'],
    'booking_time' => $request['time'],
    'status' => 'confirmed'
  ]);

  $booking_id = $wpdb->insert_id;

  // SAVE PAYMENT
  $wpdb->insert($payment_table, [
    'booking_id' => $booking_id,
    'service_id' => $request['service_id'],
    'staff_id' => $request['staff_id'],
    'amount' => $request['amount'],
    'payment_method' => $request['method'],
    'transaction_id' => $request['transaction_id'],
    'status' => 'paid'
  ]);

  return ['success'=>true];
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