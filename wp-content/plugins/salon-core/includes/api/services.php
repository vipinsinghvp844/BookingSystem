<?php

add_action('rest_api_init', function () {

    register_rest_route('vp/v1', '/categories', [
        'methods' => 'GET',
        'callback' => 'vp_get_categories'
    ]);

    register_rest_route('vp/v1', '/services', [
        'methods' => 'GET',
        'callback' => 'vp_get_services'
    ]);

    register_rest_route('vp/v1', '/services/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'vp_get_service_detail'
    ]);

    register_rest_route('vp/v1', '/admin/services', [
        'methods'  => 'POST',
        'callback' => 'vp_create_service',
        'permission_callback' => 'vp_admin_permission',
    ]);

    register_rest_route('vp/v1', '/admin/services/(?P<id>\d+)', [
        'methods'  => 'POST',
        'callback' => 'vp_update_service',
        'permission_callback' => 'vp_admin_permission',
    ]);

    register_rest_route('vp/v1', '/admin/services/(?P<id>\d+)', [
        'methods'  => 'DELETE',
        'callback' => 'vp_delete_service',
        'permission_callback' => 'vp_admin_permission',
    ]);
});
// function vp_admin_permission() {
//     return current_user_can('manage_options');
// }



function vp_get_categories() {
    global $wpdb;

    $table = $wpdb->prefix . 'service_categories';

    $categories = $wpdb->get_results("SELECT * FROM $table WHERE status = 1");

    return [
        'success' => true,
        'data' => $categories
    ];
}

function vp_get_services() {
    global $wpdb;

    $services_table = $wpdb->prefix . 'services';
    $cat_table = $wpdb->prefix . 'service_categories';

    $results = $wpdb->get_results("
        SELECT s.*, c.name as category_name
        FROM $services_table s
        LEFT JOIN $cat_table c ON s.category_id = c.id
        WHERE s.status = 1
    ");

    return [
        'success' => true,
        'data' => $results
    ];
}


function vp_get_service_detail($request) {
    global $wpdb;

    $id = intval($request['id']);

    $services_table = $wpdb->prefix . 'services';
    $cat_table = $wpdb->prefix . 'service_categories';

    $service = $wpdb->get_row(
        $wpdb->prepare("
            SELECT s.*, c.name as category_name
            FROM $services_table s
            LEFT JOIN $cat_table c ON s.category_id = c.id
            WHERE s.id = %d
        ", $id)
    );

    if (!$service) {
        return [
            'success' => false,
            'message' => 'Service not found'
        ];
    }

    return [
        'success' => true,
        'data' => $service
    ];
}


// create service by admin
function vp_create_service($request) {
    global $wpdb;

    $table = $wpdb->prefix . 'services';

    $name       = sanitize_text_field($request['name']);
    $categoryId = (int) $request['category_id'];
    $price      = (float) $request['price'];
    $duration   = sanitize_text_field($request['duration']);
    $status     = isset($request['status']) ? (int) $request['status'] : 1;
    $slug       = sanitize_title($name);

    if (!$name || !$categoryId || !$price || !$duration) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Missing required fields'
        ], 400);
    }

    $inserted = $wpdb->insert($table, [
        'category_id' => $categoryId,
        'name'        => $name,
        'slug'        => $slug,
        'price'       => $price,
        'duration'    => $duration,
        'status'      => $status,
        'created_at'  => current_time('mysql'),
        'updated_at'  => current_time('mysql'),
    ]);

    if (!$inserted) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Failed to create service'
        ], 500);
    }

    return [
        'success' => true,
        'message' => 'Service created successfully',
        'id'      => $wpdb->insert_id
    ];
}

function vp_update_service($request) {
    global $wpdb;

    $id    = (int) $request['id'];
    $table = $wpdb->prefix . 'services';

    $name       = sanitize_text_field($request['name']);
    $categoryId = (int) $request['category_id'];
    $price      = (float) $request['price'];
    $duration   = sanitize_text_field($request['duration']);
    $status     = isset($request['status']) ? (int) $request['status'] : 1;

    if (!$name || !$categoryId || !$price || !$duration) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Missing required fields'
        ], 400);
    }

    $updated = $wpdb->update(
        $table,
        [
            'category_id' => $categoryId,
            'name'        => $name,
            'slug'        => sanitize_title($name),
            'price'       => $price,
            'duration'    => $duration,
            'status'      => $status,
            'updated_at'  => current_time('mysql'),
        ],
        ['id' => $id]
    );

    return [
        'success' => true,
        'message' => 'Service updated successfully'
    ];
}

function vp_delete_service($request) {
    global $wpdb;

    $id    = (int) $request['id'];
    $table = $wpdb->prefix . 'services';

    $deleted = $wpdb->delete($table, ['id' => $id]);

    if (!$deleted) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Failed to delete service'
        ], 500);
    }

    return [
        'success' => true,
        'message' => 'Service deleted successfully'
    ];
}