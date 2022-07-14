const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;
const {
	ToggleControl,
	PanelBody,
	PanelRow,
	SelectControl,
	RangeControl,
	TextControl
} = wp.components;

function addAttributes(settings) {
	if (typeof settings.attributes !== "undefined") {
		settings.attributes = Object.assign(settings.attributes, {
			aos_animation: {
				type: "text",
				default: ""
			},
			aos_easing: {
				type: "text",
				default: ""
			},
			aos_duration: {
				type: "number",
				default: 0
			},
			aos_delay: {
				type: "number",
				default: 0
			},
			aos_mirror: {
				type: "boolean",
				default: false
			},
			aos_anchorPlacement: {
				type: "text",
				default: ""
			},		
			aos_loop: {
				type: "boolean",
				default: false
			}, 
			aos_id: {
				type: "text",
				default: ""
			},
			aos_offset: {
				type: "number",
				default: 0
			},
		});
	}

	return settings;
}

const withAdvancedControls = createHigherOrderComponent(BlockEdit => {
	return props => {
		const { name, attributes, setAttributes, isSelected } = props;

		const {
			aos_animation,
			aos_duration,
			aos_delay,
			aos_mirror,
			aos_easing,
			aos_anchorPlacement,
			aos_loop,
			aos_id,
			aos_offset
		} = attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (
					<InspectorControls>
						<PanelBody title={attributes.aos_animation && attributes.aos_animation !== ''
											? __("Block Animation: ") + attributes.aos_animation
											: __("Block Animation")} initialOpen={false}>
							<PanelRow>
								<SelectControl
									label={__("Animation")}
									value={aos_animation}
									onChange={value => setAttributes({ aos_animation: value })}
									options={[
										{
											value: null,
											label: "Select an animation type",
											disabled: true
										},
										{ value: "", label: "none" },
										{ value: "fade", label: "Fade" },
										{ value: "fade-up", label: "Fade to Up" },
										{ value: "fade-down", label: "Fade to Down" },
										{ value: "fade-left", label: "Fade to Left" },
										{ value: "fade-right", label: "Fade to Right" },
										{ value: "fade-up-left", label: "Fade Up to Left" },
										{ value: "fade-up-right", label: "Fade Up to Right" },
										{ value: "fade-down-left", label: "Fade Down to Left" },
										{ value: "fade-down-right", label: "Fade Down to Right" },
										{ value: "flip-up", label: "Flip Up" },
										{ value: "flip-down", label: "Flip Down" },
										{ value: "flip-left", label: "Flip Left" },
										{ value: "flip-right", label: "Flip Right" },
										{ value: "slide-up", label: "Slide Up" },
										{ value: "slide-down", label: "Slide Down" },
										{ value: "slide-left", label: "Slide Left" },
										{ value: "slide-right", label: "Slide Right" },
										{ value: "zoom-in", label: "Zoom In" },
										{ value: "zoom-in-up", label: "Zoom In to Up" },
										{ value: "zoom-in-down", label: "Zoom In to Down" },
										{ value: "zoom-in-left", label: "Zoom In to Left" },
										{ value: "zoom-in-right", label: "Zoom In to Right" },
										{ value: "zoom-out-up", label: "Zoom Out to Up" },
										{ value: "zoom-out-down", label: "Zoom Out to Down" },
										{ value: "zoom-out-left", label: "Zoom Out to Left" },
										{ value: "zoom-out-right", label: "Zoom out to Right" },
									]}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label={__("Easing")}
									value={aos_easing}
									onChange={value => setAttributes({ aos_easing: value })}
									options={[
										{
											value: null,
											label: "Select easing function",
											disabled: true
										},
										{ value: "", label: "default" },
										{ value: "linear", label: "Linear" },
										{ value: "ease", label: "Ease" },
										{ value: "ease-in", label: "Ease In" },
										{ value: "ease-out", label: "Ease Out" },
										{ value: "ease-in-out", label: "Ease In and Out" },
										{ value: "ease-in-back", label: "Ease In Back" },
										{ value: "ease-out-back", label: "Ease Out Back" },
										{ value: "ease-in-out-back", label: "Ease In and Out Back" },
										{ value: "ease-in-sine", label: "Ease In Sine" },
										{ value: "ease-out-sine", label: "Ease Out Sine" },
										{ value: "ease-in-out-sine", label: "Ease In and Out Sine" },
										{ value: "ease-in-quad", label: "Ease In Quad" },
										{ value: "ease-out-quad", label: "Ease Out Quad" },
										{ value: "ease-in-out-quad", label: "Ease In and Out Quad" },
										{ value: "ease-in-cubic", label: "Ease In Cubic" },
										{ value: "ease-out-cubic", label: "Ease Out Cubic" },
										{ value: "ease-in-out-cubic", label: "Ease In and Out Cubic" },
										{ value: "ease-in-quart", label: "Ease In Quart" },
										{ value: "ease-out-quart", label: "Ease Out Quart" },
										{ value: "ease-in-out-quart", label: "Ease In and Out Quart" },

									]}
								/>
							</PanelRow>
							<PanelRow>
								<RangeControl
									allowReset={true}
									showTooltip={true}
									withInputField={false}
									max={3000}
									min={0}
									step={50}
									label={__("Animation duration (ms)")}
									onChange={value => setAttributes({ aos_duration: value })}
									value={aos_duration}
								/>
							</PanelRow>
							<PanelRow>
								<RangeControl
									allowReset={true}
									showTooltip={true}
									withInputField={false}
									max={3000}
									min={0}
									step={50}
									label={__("Animation delay (ms)")}
									onChange={value => setAttributes({ aos_delay: value })}
									value={aos_delay}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__("Mirror Animation?")}
									checked={!!aos_mirror}
									onChange={() => setAttributes({ aos_mirror: !aos_mirror })}
									help={
										!!aos_mirror
											? __("Elements should animate out while scrolling past them")
											: __("Elements should not change while scrolling past them")
									}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__("Loop Animation")}
									checked={!!aos_loop}
									onChange={() => setAttributes({ aos_loop: !aos_loop })}
									help={
										!!aos_loop
											? __("Animation runs infinitely ")
											: __("Animation runs once")
									}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label={__("Anchor Placement")}
									value={aos_anchorPlacement}
									onChange={value => setAttributes({ aos_anchorPlacement: value })}
									options={[
										{
											value: null,
											label: "Select anchor placement",
											disabled: true
										},
										{ value: "", label: "default" },
										{ value: "top-bottom", label: "Top Bottom" },
										{ value: "top-center", label: "Top Center" },
										{ value: "top-top", label: "Top" },
										{ value: "center-bottom", label: "Center Bottom" },
										{ value: "center-center", label: "Center" },
										{ value: "center-top", label: "Center Top" },
										{ value: "bottom-bottom", label: "Bottom" },
										{ value: "bottom-center", label: "Bottom Center" },
										{ value: "bottom-top", label: "Bottom Top" },

									]}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__("AOS ID")}
									value={aos_id}
									onChange={value => setAttributes({ aos_id: value })}
								/>
							</PanelRow>
							<PanelRow>
								<RangeControl
									allowReset={true}
									showTooltip={true}
									withInputField={false}
									max={500}
									min={0}
									step={10}
									label={__("Trigger offset (px)")}
									onChange={value => setAttributes({ aos_offset: value })}
									value={aos_offset}
								/>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, "withAdvancedControls");

function applyExtraProps(extraProps, blockType, attributes) {
	const {
		aos_animation,
		aos_duration,
		aos_delay,
		aos_mirror,
		aos_easing,
		aos_loop,
		aos_id,
		aos_offset
	} = attributes;

	if (typeof aos_animation === "undefined" || aos_animation === "") {
		return extraProps;
	}

	/*if (typeof extraProps.className === "undefined") {
		extraProps.className = "";
	}
	if (typeof extraProps.style === "undefined") {
		extraProps.style = [];
	}*/

	extraProps['data-aos'] = aos_animation;
	if (typeof aos_delay !== "undefined" && aos_delay !== 0) {
		extraProps['data-aos-delay'] = aos_delay;
	}
	if (typeof aos_duration !== "undefined" && aos_duration !== 0) {
		extraProps['data-aos-duration'] = aos_duration;
	}
	if (typeof aos_easing !== "undefined" && aos_easing !== "") {
		extraProps['data-aos-easing'] = aos_easing;
	}
	if (typeof aos_loop !== "undefined" && aos_loop) {
		extraProps['data-aos-once'] = "false"
	}
	if (typeof aos_mirror !== "undefined" && aos_mirror) {
		extraProps['data-aos-mirror'] = "true"
	}
	if (typeof aos_anchorPlacement !== "undefined") {
		extraProps['data-aos-anchor-placement'] = aos_anchorPlacement;
	}
	if (typeof aos_id !== "undefined") {
		extraProps['data-aos-id'] = aos_id;
	}
	if (typeof aos_offset !== "undefined" && aos_offset !== 0) {
		extraProps['data-aos-offset'] = aos_offset;
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
	applyExtraProps
);
