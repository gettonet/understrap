<?php

// Exit if accessed directly.
defined('ABSPATH') || exit;

use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make('theme_options', __('Theme Options', 'elixir'))
    ->set_icon('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0My44NiA0My44NiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3ODk5MDQ7fS5jbHMtMntmaWxsOiNjMmQ1MDA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5lbGl4aXJfaWNvbjwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48ZyBpZD0iTGF5ZXJfMS0yLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMS0yIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xOS43NSw0My43NWEyMS45MywyMS45MywwLDEsMSwyNC0xOS42NHYwQTIyLDIyLDAsMCwxLDE5Ljc1LDQzLjc1Wk0yMy43LDQuNjhhMTcuMzEsMTcuMzEsMCwxLDAtMy40OSwzNC40NUMyNi4zNiwzOS43OCwzMy40NCwzNS43NSwzNiwzMmMuMjUtLjQxLjI3LS43LjE0LS44MnMtLjUsMC0uOC4yOGExMy4yOSwxMy4yOSwwLDAsMS00LjQzLDIuNDUsMTkuMjUsMTkuMjUsMCwwLDEtOC4xOCwxLDEzLjMyLDEzLjMyLDAsMCwxLTEuNjYtLjI2Yy00Ljg2LTEtOC44Ni00LjA5LTEwLjQ0LTguMDhBMTIuMzUsMTIuMzUsMCwwLDEsMjMuMjYsOS44N2ExMS4yMywxMS4yMywwLDAsMSwyLC4zOWMzLC45LDYuMzksMy41Miw2LjY2LDcuMTdhOCw4LDAsMCwxLTEuNjEsNS4yOCw4LjA3LDguMDcsMCwwLDEtNC41MywyLjc1LDE1LjgsMTUuOCwwLDAsMS00LC4zM2MtMS44OSwwLTMuNjgsMC01LDFsLS40My4zNC40My4zNmExMi4zNywxMi4zNywwLDAsMCwyLjgyLDEuNzcsMTEuNzYsMTEuNzYsMCwwLDAsMy43NywxLDEzLjIyLDEzLjIyLDAsMCwwLDMuMDgsMCwxMy4wNiwxMy4wNiwwLDAsMCw3LTMuMTFBMTEuNTYsMTEuNTYsMCwwLDAsMzcsMjEuMzhhMTIuNSwxMi41LDAsMCwwLS41OC03LjY0LDEzLjQ5LDEzLjQ5LDAsMCwwLTMuNC01QTEzLjg3LDEzLjg3LDAsMCwwLDMxLjE3LDcuMywxNy4yMSwxNy4yMSwwLDAsMCwyMy43LDQuNjhaTTIzLDE0LjE3YTguNzMsOC43MywwLDAsMC01LjI4LDEuMjQsNy4xMyw3LjEzLDAsMCwwLTMuMjMsNC4yNiw4LjA3LDguMDcsMCwwLDAtLjQsM3YuODVsLjY4LS41YzEuNjMtMS4xOSwzLjA4LTEuNDksNi43MS0xLjQsMi42Ni4wNyw1LjI0LS4yMSw2LTIuNzEuMzQtMS4wNy4xMS0zLjM4LTMuMjEtNC40NkE3Ljc3LDcuNzcsMCwwLDAsMjMsMTQuMTdaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTYuNSwyMC40NGExLjc5LDEuNzksMCwwLDEsLjEzLS40NkE1LjEzLDUuMTMsMCwwLDEsMTksMTYuOWE2LjUsNi41LDAsMCwxLDMuODMtLjksNC44NSw0Ljg1LDAsMCwxLC45Mi4xOWMyLjQzLjc4LDIsMi4xOSwyLDIuMjUtLjMxLDEtMS4xLDEuNTQtNC4wOCwxLjQ2QTEzLjQsMTMuNCwwLDAsMCwxNi41LDIwLjQ0WiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==')
    ->add_tab('Header/Footer code', array(
        Field::make('textarea', 'elixir_header', 'Header code'),
        Field::make('textarea', 'elixir_footer', 'Footer code')
    ))
    ->add_tab('GTM', array(
        Field::make('text', 'gtm_id', 'GTM ID')
    ))
    ->add_tab('Social Links', array(
        Field::make('html', 'egroup_social_desc')
            ->set_html('<h3>Elixir Group</h3>'),
        Field::make('text', 'fb_url', 'Facebook')
            ->set_attribute('type', 'url'),
        Field::make('text', 'yt_url', 'YouTube')
            ->set_attribute('type', 'url'),
        Field::make('text', 'ig_url', 'Instagram')
            ->set_attribute('type', 'url'),
        Field::make('text', 'lin_url', 'LinkedIn')
            ->set_attribute('type', 'url'),
        Field::make('html', 'ezorka_social_desc')
            ->set_html('<h3>Elixir Zorka</h3>'),
        Field::make('text', 'zorka_fb_url', 'Facebook')
            ->set_attribute('type', 'url'),
        Field::make('text', 'zorka_yt_url', 'YouTube')
            ->set_attribute('type', 'url'),
        Field::make('text', 'zorka_ig_url', 'Instagram')
            ->set_attribute('type', 'url'),
        Field::make('text', 'zorka_lin_url', 'LinkedIn')
            ->set_attribute('type', 'url'),
    ))
    ->add_tab('Izveštaji', array(
        Field::make('html', 'egroup_reports')
            ->set_html('<p>Izveštaji o poslovanju, društvenom uticaju i očuvanju okruženja.<br>Pozivaju se uz pomoć shortcode [elixir-reports]</p>'),
        Field::make('complex', 'elixir_reports', __('Izveštaji'))
            ->add_fields(array(
                Field::make('file', 'report')
                    ->set_type('application/pdf'),
                Field::make('text', 'title', __('Title')),
            ))

    ));

Container::make('post_meta', 'Povezani proizvodi')
    ->where('post_type', '=', 'preporuka_djubrenja')
    ->add_fields(array(
        Field::make('association', 'proizvodi', __('Proizvodi:'))
            ->set_types(array(
                array(
                    'type'      => 'post',
                    'post_type' => 'proizvodi',
                )
            ))
            ->set_help_text('Choose products')
    ));

Container::make('term_meta', __('Category Properties'))
    ->where('term_taxonomy', '=', 'category')
    ->add_fields(array(
        Field::make('image', 'category_image', __('Category Image')),
    ));

Container::make('post_meta', __('Header Image'))
    ->where('post_type', '=', 'post')
    ->set_context('side')
    ->add_fields(array(
        Field::make('image', 'header_image', __('Choose image:')),
        Field::make('text', 'img_pos_x', 'Position X')
            ->set_width(50)
            ->set_attribute('type', 'number')
            ->set_attribute('min', '0')
            ->set_attribute('max', '50')
            ->set_default_value(50),
        Field::make('text', 'img_pos_y', 'PositionY')
            ->set_width(50)
            ->set_attribute('type', 'number')
            ->set_attribute('min', '0')
            ->set_attribute('max', '100')
            ->set_default_value(50)

    ));

Container::make('post_meta', __('Job data'))
    ->where('post_type', '=', 'oglas_za_posao')
    ->set_context('side')
    ->add_fields(array(
        Field::make('multiselect', 'lokacija', __('Lokacija'))
            ->set_options(array(
                'ph' => 'Prahovo',
                'sb' => 'Šabac',
                'bg' => 'Beograd',
                'ns' => 'Novi Sad',
            )),
        Field::make('select', 'clanica', __('Članica'))
            ->set_options(array(
                'ElixirPrahovo' => 'Elixir Prahovo',
                'ElixirZorka' => 'Elixir Zorka',
                'ElixirAgrar' => 'Elixir Agrar',
                'ElixirFeed' => 'Elixir Feed',
                'ElixirCraft' => 'Elixir Craft',
                'ElixirFondacija' => 'Elixir Fondacija'
            ))
    ));

    Container::make('post_meta', __('More options'))
    ->where('post_type', '=', 'page')
    ->set_context('side')
    ->add_fields(array(
        Field::make( 'select', 'color_palette', __( 'Color Palette' ) )
	->set_options( array(
		'' => 'Default',
        'dark-green' => 'Dark Green',
		'light-green' => 'Light Green',
		'deep-blue' => 'Deep Blue',
		'blue' => 'Blue',
		'light-blue' => 'Light Blue',
        'dark-blue' => 'Dark Blue',
        'purple' => 'Purple'

	) )
    ));    
