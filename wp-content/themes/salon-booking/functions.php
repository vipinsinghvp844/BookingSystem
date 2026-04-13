<?php

function salon_enqueue_assets() {

    wp_enqueue_style(
        'salon-main',
        get_template_directory_uri() . '/dist/css/main.css',
        [],
        time()
    );

    wp_enqueue_script(
    'salon-app',
    get_template_directory_uri() . '/dist/js/app.js',
    [],
    filemtime(get_template_directory() . '/dist/js/app.js'),
    true
);
    
}
add_action('wp_enqueue_scripts', 'salon_enqueue_assets');

function vp_register_menus() {
  register_nav_menus([
    'primary_menu' => 'Primary Menu',
  ]);
}
add_action('after_setup_theme', 'vp_register_menus');




