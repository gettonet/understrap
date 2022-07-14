
/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;
/**
 * Internal dependencies
 */
import DisableTitle from './controls';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'editorskit-disable-title', {
	icon: false,
	render: DisableTitle,
} );

/*
export function registerBlocks() {
	[importBlock, shareABlock].forEach((block) => {
		if (!block) {
			return;
		}

		const { name, settings, category } = block;

		registerBlockType(`editorskit/${name}`, { category, ...settings });
	});
}
registerBlocks();*/
