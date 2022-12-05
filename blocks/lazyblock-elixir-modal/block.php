<div class="modal fade" id="<?php echo $attributes['modal-id']; ?>" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-<?php echo $attributes['modal-size']; ?>">
        <div class="modal-content">
            <?php if ($attributes['modal-title']) : ?>
                <div class="modal-header">
                    <h1 class="modal-title fs-5"><?php echo $attributes['modal-title']; ?></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            <?php endif; ?>
            <div class="modal-body">
                <?php echo $attributes['content']; ?>
            </div>
        </div>
    </div>
</div>