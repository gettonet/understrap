// Tomado de: https://jeffreycarandang.com/extending-gutenberg-core-blocks-with-custom-attributes-and-controls/

const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;
const { ToggleControl, PanelBody, PanelRow } = wp.components;
//const allowedBlocks = ["core/media-text"];

function addAttributes(settings) {
	if (typeof settings.attributes !== "undefined") {
		settings.attributes = Object.assign(settings.attributes, {
			visibleOnMobile: {
				type: "boolean",
				default: true
			},
			visibleOnTablet: {
				type: "boolean",
				default: true
			},
			visibleOnDesktop: {
				type: "boolean",
				default: true
			},
		});
	}
	return settings;
}

const withAdvancedControls = createHigherOrderComponent(BlockEdit => {
	return props => {
		const { name, attributes, setAttributes, isSelected } = props;

		const {
			visibleOnMobile,
			visibleOnTablet,
			visibleOnDesktop,
		} = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (
					<InspectorControls>
						<PanelBody title={__("Block Visibility")} initialOpen={false}>
							<PanelRow>
								<ToggleControl
									label={__("Mobile Visibity")}
									checked={!!visibleOnMobile}
									onChange={() =>
										setAttributes({ visibleOnMobile: !visibleOnMobile })
									}
									help={
										!!visibleOnMobile
											? __("Showing block on mobile devices.")
											: __("Hidden on mobile devices.")
									}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__("Tablet Visibity")}
									checked={!!visibleOnTablet}
									onChange={() =>
										setAttributes({ visibleOnTablet: !visibleOnTablet })
									}
									help={
										!!visibleOnTablet
											? __("Showing block on tablet devices.")
											: __("Hidden on tablet devices.")
									}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__("Desktop Visibity")}
									checked={!!visibleOnDesktop}
									onChange={() =>
										setAttributes({ visibleOnDesktop: !visibleOnDesktop })
									}
									help={
										!!visibleOnDesktop
											? __("Showing block on desktop.")
											: __("Hidden on desktop.")
									}
								/>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, "withAdvancedControls");

function applyExtraClass(extraProps, blockType, attributes) {
	const {
		visibleOnMobile,
		visibleOnTablet,
		visibleOnDesktop,
	} = attributes;

	let classes = [],
	mobile = typeof visibleOnMobile !== "undefined" ? visibleOnMobile : true,
	tablet = typeof visibleOnTablet !== "undefined" ? visibleOnTablet : true, 
	desktop = typeof visibleOnDesktop !== "undefined" ? visibleOnDesktop : true;	

	if (!mobile) {
		// not visible on mobile means d-none and then adding d-md-block d-lg-block or similar.
		!classes.includes("d-none") ? classes.push("d-none") : '';
		if (tablet) {
				!classes.includes("d-md-grid") ? classes.push("d-md-grid") : '';
			}
		if (desktop) {
			!classes.includes("d-lg-grid") ? classes.push("d-lg-grid") : '';
		}
	} else if (!tablet) {
		!classes.includes("d-md-none") ? classes.push("d-md-none") : '';
		if (desktop) {
			!classes.includes("d-lg-grid") ? classes.push("d-lg-grid") : '';
		}
	} else if (!desktop) {
		!classes.includes("d-lg-none") ? classes.push("d-lg-none") : '';
	}


	if(classes.length){
		if (typeof extraProps.className === "undefined") {
			extraProps.className = "";
		} else {
			extraProps.className += " "	
		}
		extraProps.className += classes.join(' ');
	}
	return extraProps;
}

//add filters

addFilter(
	"blocks.registerBlockType",
	"editorskit/custom-attributes",
	addAttributes
);

addFilter(
	"editor.BlockEdit",
	"editorskit/custom-advanced-control",
	withAdvancedControls
);

addFilter(
	"blocks.getSaveContent.extraProps",
	"editorskit/applyExtraClass",
	applyExtraClass
);
