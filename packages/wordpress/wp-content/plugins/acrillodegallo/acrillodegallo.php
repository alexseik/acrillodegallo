<?php
/*
Plugin Name: AC Rillo de Gallo
Description: A custom plugin to add new CPT
Version: 1.0
Author: Alejandro Garrido
*/


if (!defined('WPINC')) {
  die;
}

function add_categories_and_tags_to_attachments()
{
  // register_taxonomy_for_object_type('category', 'attachment');
  register_taxonomy_for_object_type('post_tag', 'attachment');
}

add_action('init', 'add_categories_and_tags_to_attachments');

add_action('graphql_register_types', function () {

  // register_graphql_field('MediaItem', 'mediaCategories', [
  //   'type' => ['list_of' => 'Category'],
  //   'description' => __('Las categorías del archivo de medios', 'your-textdomain'),
  //   'resolve' => function ($post) {
  //     return get_the_terms($post->ID, 'category');
  //   }
  // ]);

  register_graphql_field('MediaItem', 'mediaTags', [
    'type' => ['list_of' => 'Tag'],
    'description' => __('Las etiquetas del archivo de medios', 'your-textdomain'),
    'resolve' => function ($post) {
      return get_the_terms($post->ID, 'post_tag');
    }
  ]);

});


require_once __DIR__ . '/cpt/memory-photo.php';