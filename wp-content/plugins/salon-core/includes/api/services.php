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
    register_rest_route('vp/v1', '/upload', [
        'methods' => 'POST',
        'callback' => 'vp_upload_file',
        'permission_callback' => 'vp_admin_permission'
    ]);
});
function vp_upload_file() {

  if (!function_exists('wp_handle_upload')) {
    require_once ABSPATH . 'wp-admin/includes/file.php';
  }

  $file = $_FILES['file'];

  $uploaded = wp_handle_upload($file, ['test_form' => false]);

  if (isset($uploaded['url'])) {
    return ['success' => true, 'url' => $uploaded['url']];
  }

  return ['success' => false];
}



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

    $data = $request->get_json_params(); // ✅ correct

    $name       = sanitize_text_field($data['name']);
    $categoryId = (int) $data['category_id'];
    $price      = (float) $data['price'];
    $duration   = sanitize_text_field($data['duration']);
    $status     = isset($data['status']) ? (int) $data['status'] : 1;
    $slug       = sanitize_title($name);

    $featured = isset($data['featured_image']) ? esc_url_raw($data['featured_image']) : '';
    $gallery  = isset($data['gallery_images']) ? json_encode($data['gallery_images']) : '[]';

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
        'featured_image' => $featured,   // ✅ FIX
        'gallery_images' => $gallery,    // ✅ FIX
        'created_at'  => current_time('mysql'),
        'updated_at'  => current_time('mysql'),
    ]);

    if (!$inserted) {
        return new WP_REST_Response([
            'success' => false,
            'message' => $wpdb->last_error // 🔥 show actual error
        ], 500);
    }

    return [
        'success' => true,
        'id' => $wpdb->insert_id
    ];
}

function vp_update_service($request) {
    global $wpdb;

    $table = $wpdb->prefix . 'services';

    $data = $request->get_json_params(); // ✅ correct

    $id         = (int) $request['id'];
    $name       = sanitize_text_field($data['name']);
    $categoryId = (int) $data['category_id'];
    $price      = (float) $data['price'];
    $duration   = sanitize_text_field($data['duration']);
    $status     = isset($data['status']) ? (int) $data['status'] : 1;

    $featured = isset($data['featured_image']) ? esc_url_raw($data['featured_image']) : '';
    $gallery  = isset($data['gallery_images']) ? json_encode($data['gallery_images']) : '[]';

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
            'featured_image' => $featured,   // ✅ FIX
            'gallery_images' => $gallery,    // ✅ FIX
            'updated_at'  => current_time('mysql'),
        ],
        ['id' => $id]
    );

    return [
        'success' => true
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