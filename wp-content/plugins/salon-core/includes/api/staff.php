<?php
add_action('rest_api_init', function () {

    register_rest_route('vp/v1', '/staff', [
    'methods' => 'GET',
    'callback' => 'vp_get_staff'
    ]);

    register_rest_route('vp/v1', '/staff/(?P<id>\d+)', [
    'methods' => 'GET',
    'callback' => 'vp_get_single_staff'
    ]);

    register_rest_route('vp/v1', '/availability', [
    'methods' => 'GET',
    'callback' => 'vp_get_availability'
    ]);


});


function vp_get_staff($request) {
    global $wpdb;

    $staff_table = $wpdb->prefix . 'staff';
    $relation_table = $wpdb->prefix . 'staff_services';

    $service_id = $request->get_param('service_id');

    if ($service_id) {

        $results = $wpdb->get_results($wpdb->prepare("
            SELECT s.*
            FROM $staff_table s
            INNER JOIN $relation_table ss ON s.id = ss.staff_id
            WHERE ss.service_id = %d AND s.status = 1
        ", $service_id));

    } else {

        $results = $wpdb->get_results("
            SELECT * FROM $staff_table WHERE status = 1
        ");
    }

    return [
        'success' => true,
        'data' => $results
    ];
}
function vp_get_single_staff($request) {
    global $wpdb;

    $id = intval($request['id']);
    $table = $wpdb->prefix . 'staff';

    $staff = $wpdb->get_row(
        $wpdb->prepare("SELECT * FROM $table WHERE id = %d", $id)
    );

    if (!$staff) {
        return [
            'success' => false,
            'message' => 'Staff not found'
        ];
    }

    return [
        'success' => true,
        'data' => $staff
    ];
}
function vp_get_availability($request) {
    global $wpdb;

    $staff_id = intval($request['staff_id']);

    $table = $wpdb->prefix . 'staff_availability';

    $results = $wpdb->get_results(
        $wpdb->prepare("SELECT * FROM $table WHERE staff_id = %d", $staff_id)
    );

    return [
        'success' => true,
        'data' => $results
    ];
}