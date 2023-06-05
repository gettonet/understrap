<?php
defined('ABSPATH') || exit;

function elixir_cpt_tabs()
{
    $tabs_labels = array(
        'name'                  => __('Elixir Tabs', 'elixir'),
        'singular_name'         => __('Elixir Tab', 'elixir'),
    );
    $tabs_args = array(
        'labels'              => $tabs_labels,
        'description'         => esc_html__('', 'elixir'),
        'supports'            => array('title'),
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'menu_position'       => 9,
        'menu_icon'           => 'data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124"><defs><style>.cls-1{fill:none;stroke:#333;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="General_-_Tabs" data-name="General - Tabs"><g id="General_-_Tabs-2" data-name="General - Tabs"><path class="cls-1" d="M50.49 3H111a12 12 0 0 1 12 12v5"/><path d="M2 81.88V14A12 12 0 0 1 14 2h31.1l3.36 20H110a12 12 0 0 1 12 12v76a12 12 0 0 1-12 12H14a12 12 0 0 1-12-12V99" style="stroke-width:4px;fill:none;stroke:#333;stroke-linecap:round;stroke-linejoin:round"/><circle cx="2" cy="89" r="2" style="fill:#333"/><path class="cls-1" d="M27 77h70M27 91h50M27 63h70M27 49h70"/></g></g></g></svg>'),
        'show_in_admin_bar'   => true,
        'show_in_nav_menus'   => false,
        'can_export'          => true,
        'has_archive'         => false,
        'exclude_from_search' => true,
        'rewrite'             => false,
        'show_in_rest'        => true,
        'supports' => array(
            'title',
            'editor',
        )
    );

    register_post_type('elixir-tabs', $tabs_args);
}

function elixir_cpt_proizvodi()
{

    $labels = array(
        'name'                  => __('Proizvodi', 'elixir'),
        'singular_name'         => __('Proizvod', 'elixir'),
    );

    $args = array(

        'labels' => $labels,
        'public' => true,
        'hierarchical' => true,
        'orderby' => 'menu_order',
        'has_archive' => false,
        'publicly_queryable' => true,
        'query_var' => true,
        //'rewrite' => array('slug' => 'proizvodi'),  
        'show_in_rest' => true,
        'supports' => array(
            'page-attributes',
            'title',
            'editor',
            'thumbnail',
            'excerpt',
            'revisions',
            'custom-fields'
        ),
        'taxonomies' => array('category', 'product-elements'),
        'menu_position' => 6,
        'exclude_from_search' => false,
        'orderby' => 'menu_order',
        'capability_type' => 'post',
        'menu_icon' => 'data:image/svg+xml;base64,' . base64_encode('<svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M1591 1448q56 89 21.5 152.5t-140.5 63.5h-1152q-106 0-140.5-63.5t21.5-152.5l503-793v-399h-64q-26 0-45-19t-19-45 19-45 45-19h512q26 0 45 19t19 45-19 45-45 19h-64v399zm-779-725l-272 429h712l-272-429-20-31v-436h-128v436z"/></svg>')
    );

    // Elements Taxonomy

    $el_labels = array(

        'name'                       => __('Product elements', 'elixir'),
        'singular_name'              => __('Product element', 'elixir'),
        'menu_name'                  => __('Product element', 'elixir'),

    );

    $tax_args = array(

        'labels'                     => $el_labels,
        'hierarchical'               => false,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
    );

    // register_taxonomy('product-elements', 'proizvodi', $tax_args);
    register_post_type('proizvodi', $args);
}


function elixir_cpt_preporuka_djubrenja()
{

    $labels = array(

        'name'                  => __('Preporuke đubrenja', 'elixir'),
        'singular_name'         => __('Preporuka đubrenja', 'elixir'),
        'menu_name'             => __('Preporuke đubrenja', 'elixir'),
        'name_admin_bar'        => __('Preporuke đubrenja', 'elixir'),
        'archives'              => __('Preporuke đubrenja - arhiva', 'elixir'),

    );

    $args = array(

        'labels'                => $labels,
        'supports'              => array('page-attributes', 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'taxonomies'   => array('category'),
        'show_in_rest' => true,
        'hierarchical'          => true,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 7,
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'menu_icon'   => 'dashicons-groups',
        'rewrite' => array('slug' => __('preporuke-djubrenja', 'elixir'), 'with_front' => false),

    );

    register_post_type('preporuka_djubrenja', $args);
}

function elixir_cpt_block_patterns()
{
    register_post_type(
        'elixir-cbp',
        [
            'labels'        => [
                'name'                  => __('Elixir Block Patterns', 'elixir'),
                'singular_name'         => __('Elixir Block Pattern', 'elixir'),
                'menu_name'             => __('Block Patterns', 'elixir'),
            ],
            'public'        => false,
            'menu_position' => 10,
            'show_ui'       => true,
            'show_in_menu'  => true,
            'capabilities'  => [
                'create_posts' => 'create_elixir_cbp',
                'edit_post'          => 'update_core',
                'read_post'          => 'update_core',
                'delete_post'        => 'update_core',
                'edit_posts'         => 'update_core',
                'edit_others_posts'  => 'update_core',
                'delete_posts'       => 'update_core',
                'publish_posts'      => 'update_core',
                'read_private_posts' => 'update_core'
            ],
            'map_meta_cap'  => true,
            'has_archive'   => false,
            'menu_icon'     => 'dashicons-screenoptions',
            'show_in_rest'  => true,
            'supports'      => ['title', 'editor'],
        ]
    );
}

function elixir_cpt_posao()
{

    $labels = array(

        'name'                  => __('Oglasi za posao', 'elixir'),
        'singular_name'         => __('Oglas za posao', 'elixir'),
        'menu_name'             => __('Oglasi za posao', 'elixir'),
        'name_admin_bar'        => __('Oglasi za posao', 'elixir'),
        'archives'              => __('Oglasi za posao - arhiva', 'elixir'),

    );

    $args = array(

        'label'                 => __('Oglasi za posao', 'elixir'),
        'description'           => __('Oglasi za posao CPT', 'elixir'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        //'taxonomies'   => array('category'),
        'show_in_rest' => true,
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 8,
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'menu_icon'   => 'dashicons-portfolio',
        'rewrite' => array('slug' => __('karijera/zaposlenje', 'elixir'), 'with_front' => false),

    );

    register_post_type('oglas_za_posao', $args);
}

add_action('init', 'elixir_cpt_tabs', 5);
add_action('init', 'elixir_cpt_proizvodi', 10);
add_action('init', 'elixir_cpt_preporuka_djubrenja', 10);
add_action('init', 'elixir_cpt_posao', 10);
add_action('init', 'elixir_cpt_block_patterns', 10);


add_action('admin_init', 'cbp_admin_init');

function cbp_admin_init()
{
    global $wp_roles;
    $wp_roles->add_cap('administrator', 'create_elixir_cbp');
}


// Fix Category issue (add cpts to the post types list)

function namespace_add_custom_types($query)
{

    if (!is_admin() && (is_category() || is_tag())  && empty($query->query_vars['suppress_filters'])) {

        $query->set('post_type', array(

            'page', 'post', 'preporuka_djubrenja', 'proizvodi', 'strucni_saveti', 'oglas_za_posao'

        ));
    }

    return $query;
}

add_filter('pre_get_posts', 'namespace_add_custom_types');
