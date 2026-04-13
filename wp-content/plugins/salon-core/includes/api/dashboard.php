<?php
add_action('rest_api_init', function () {

    // admin Apis
    register_rest_route('vp/v1', '/admin-dashboard', [
    'methods' => 'GET',
    'callback' => 'vp_admin_dashboard'
]);

});



// Admin Apis Function
function vp_admin_dashboard() {
    global $wpdb;

    $bookings = $wpdb->prefix . 'bookings';
    $services = $wpdb->prefix . 'services';
    $payments = $wpdb->prefix . 'payments';


    /* TOTAL REVENUE */
    $total_revenue = $wpdb->get_var("SELECT SUM(amount) FROM $payments");

    /* TOTAL BOOKINGS */
    $total_bookings = $wpdb->get_var("SELECT COUNT(*) FROM $bookings");

    /* TOTAL CUSTOMERS (basic) */
    $total_customers = $wpdb->get_var("SELECT COUNT(DISTINCT user_id) FROM $bookings");

    /* MONTHLY REVENUE */
    $monthly = $wpdb->get_results("
        SELECT DATE_FORMAT(created_at, '%b') as month, SUM(amount) as total
        FROM $bookings
        GROUP BY MONTH(created_at)
    ");

    $months = [];
    $values = [];

    foreach ($monthly as $m) {
        $months[] = $m->month;
        $values[] = (int)$m->total;
    }

    /* BOOKINGS BY SERVICE */
    $services_data = $wpdb->get_results("
        SELECT s.name, COUNT(b.id) as total
        FROM $bookings b
        JOIN $services s ON b.service_id = s.id
        GROUP BY s.id
    ");

    $labels = [];
    $counts = [];

    foreach ($services_data as $s) {
        $labels[] = $s->name;
        $counts[] = (int)$s->total;
    }

    return [
        'success' => true,
        'data' => [
            'total_revenue' => $total_revenue ?: 0,
            'total_bookings' => $total_bookings ?: 0,
            'total_customers' => $total_customers ?: 0,
            'growth' => 12, // dummy अभी

            'revenue' => [
                'months' => $months,
                'values' => $values
            ],

            'services' => [
                'labels' => $labels,
                'values' => $counts
            ]
        ]
    ];
}