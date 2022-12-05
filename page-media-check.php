<?php

/**
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

while (have_posts()) :
    the_post();
    the_content();
endwhile;

$query_images_args = array(
    'post_type'      => 'attachment',
    'post_mime_type' => 'image',
    'post_status'    => 'inherit',
    'posts_per_page' => -1,
);

$query_images = new WP_Query( $query_images_args );


function formatSizeUnits($bytes)
{
    if ($bytes >= 1073741824)
    {
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    }
    elseif ($bytes >= 1048576)
    {
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    }
    elseif ($bytes >= 1024)
    {
        $bytes = number_format($bytes / 1024, 2) . ' KB';
    }
    elseif ($bytes > 1)
    {
        $bytes = $bytes . ' bytes';
    }
    elseif ($bytes == 1)
    {
        $bytes = $bytes . ' byte';
    }
    else
    {
        $bytes = '0 bytes';
    }

    return $bytes;
}


?>
<div class="container-xxl py-80">
    <table id="mediaTable" class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Rezolucija</th>
                <th>Original</th>
                <th>XLarge</th>
                <th>Large</th>
                <th>Medium</th>
            </tr>
        </thead>
        <tbody>
<?php foreach ( $query_images->posts as $image ) : ?>
    <?php 
        if($image->post_mime_type === 'image/svg+xml') continue;
        $meta = wp_get_attachment_metadata($image->ID);   
        $xlarge = isset($meta['sizes']['xlarge']['filesize']) ? $meta['sizes']['xlarge']['filesize'] : 0;
        $large = isset($meta['sizes']['large']['filesize']) ? $meta['sizes']['large']['filesize'] : 0;
        $medium = isset($meta['sizes']['medium']['filesize']) ? $meta['sizes']['medium']['filesize'] : 0;
        ?>
        <tr>
            <td><?php echo $image->ID;?></td>
            <td><?php echo '<a href="'.wp_get_attachment_image_url($image->ID, 'full').'" target="_blank">'.$image->post_title.'</a>'; ?></td>
            <td><?php echo $meta['width'].'x'.$meta['height']; ?></td>
            <td data-sort="<?php echo $meta['filesize']; ?>"><?php echo formatSizeUnits($meta['filesize']); ?></td>
            <td data-sort="<?php echo $xlarge; ?>"><?php echo formatSizeUnits($xlarge); ?></td>
            <td data-sort="<?php echo $large; ?>"><?php echo formatSizeUnits($large); ?></td>
            <td data-sort="<?php echo $medium; ?>"><?php echo formatSizeUnits($medium); ?></td>
        </tr>
<?php endforeach; ?>
        </tbody>
    </table>
</div>
<script>
jQuery(function($) {
    var table = $('#mediaTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
        'copy', 'excel'
    ],
        "pageLength": 100,
        fixedHeader: {
            header: true,
            headerOffset: 50
        },
        columns: [
            null,
            null,
            {
                orderable: false
            },
            null,
            null,
            null,
            null
        ],
        
        "order": [[ 3, 'desc' ]],
        "language": {
            "decimal": "",
            "emptyTable": "Nema podataka u tabeli",
            "info": "Prikazano _START_ do _END_ od _TOTAL_ rezultata",
            "infoEmpty": "Prikazano 0 do 0 od 0",
            "infoFiltered": "(filtrirano od ukupno _MAX_)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Prikaži _MENU_ rezultata",
            "loadingRecords": "Učitavanje...",
            "processing": "",
            "search": "Pretraga:",
            "zeroRecords": "Nema rezultata",
            "paginate": {
                "first": "Prvo",
                "last": "Poslednje",
                "next": "Sledeća",
                "previous": "Prethodna"
            },
            "aria": {
                "sortAscending": ": aktiviraj za sortiranje uzlazno",
                "sortDescending": ": aktiviraj za sortiranje silazno"
            }
        },

    });

})
</script>
<?php

get_footer();