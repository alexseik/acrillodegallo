<?php

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

function MemoryPhoto()
{
  $labels = array(
    'name' => _x('Memoria Fotográficas', 'Post Type General Name', 'acrillodegallo'),
    'singular_name' => _x('Memoria Fotográfica', 'Post Type Singular Name', 'acrillodegallo'),
    'menu_name' => __('Memoria Fotográficas', 'acrillodegallo'),
    'name_admin_bar' => __('Memoria Fotográfica', 'acrillodegallo'),
    'archives' => __('Archivo de Memoria Fotográficas', 'acrillodegallo'),
    'attributes' => __('Memoria Fotográfica Attributes', 'acrillodegallo'),
    'parent_item_colon' => __('Parent Item:', 'acrillodegallo'),
    'all_items' => __('Todos las Memoria Fotográficas', 'acrillodegallo'),
    'add_new_item' => __('Nuevo Memoria Fotográfica', 'acrillodegallo'),
    'add_new' => __('Nuevo', 'acrillodegallo'),
    'new_item' => __('Nuevo Memoria Fotográfica', 'acrillodegallo'),
    'edit_item' => __('Editar Memoria Fotográfica', 'acrillodegallo'),
    'update_item' => __('Actualizar Memoria Fotográfica', 'acrillodegallo'),
    'view_item' => __('Ver Memoria Fotográfica', 'acrillodegallo'),
    'view_items' => __('Ver Memoria Fotográfica', 'acrillodegallo'),
    'search_items' => __('Buscar Memoria Fotográfica', 'acrillodegallo'),
    'not_found' => __('Not found', 'acrillodegallo'),
    'not_found_in_trash' => __('Not found in Trash', 'acrillodegallo'),
    'featured_image' => __('Featured Image', 'acrillodegallo'),
    'set_featured_image' => __('Set featured image', 'acrillodegallo'),
    'remove_featured_image' => __('Remove featured image', 'acrillodegallo'),
    'use_featured_image' => __('Use as featured image', 'acrillodegallo'),
    'insert_into_item' => __('Insert into item', 'acrillodegallo'),
    'uploaded_to_this_item' => __('Uploaded to this item', 'acrillodegallo'),
    'items_list' => __('Items list', 'acrillodegallo'),
    'items_list_navigation' => __('Items list navigation', 'acrillodegallo'),
    'filter_items_list' => __('Filter items list', 'acrillodegallo'),
  );
  $args = array(
    'label' => __('Memoria Fotográfica', 'facua'),
    'description' => __('Archivos de la Memoria Fotográficas', 'facua'),
    'labels' => $labels,
    'supports' => array('title', 'editor'),
    'taxonomies' => array(''),
    'hierarchical' => false,
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-images-alt2',
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => true,
    'show_in_rest' => true,
    'can_export' => true,
    'exclude_from_search' => false,
    'publicly_queryable' => true,
    'capability_type' => 'post',
    'graphql_single_name' => 'memoryPhoto',
    'graphql_plural_name' => 'memoryPhotos',
    'show_in_graphql' => true,
  );
  register_post_type('memoryPhoto', $args);
}
add_action('init', 'MemoryPhoto', 10);