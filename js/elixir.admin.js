'use strict';

// Tomado de: https://jeffreycarandang.com/extending-gutenberg-core-blocks-with-custom-attributes-and-controls/
const {
  __: __$2
} = wp.i18n;
const {
  addFilter: addFilter$1
} = wp.hooks;
const {
  Fragment: Fragment$1
} = wp.element;
const {
  InspectorControls: InspectorControls$1
} = wp.blockEditor;
const {
  createHigherOrderComponent: createHigherOrderComponent$1
} = wp.compose;
const {
  ToggleControl: ToggleControl$1,
  PanelBody: PanelBody$1,
  PanelRow: PanelRow$1
} = wp.components; //const allowedBlocks = ["core/media-text"];

function addAttributes$1(settings) {
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
      }
    });
  }

  return settings;
}

const withAdvancedControls$1 = createHigherOrderComponent$1(BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      setAttributes,
      isSelected
    } = props;
    const {
      visibleOnMobile,
      visibleOnTablet,
      visibleOnDesktop
    } = attributes;
    return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement(BlockEdit, props), isSelected && /*#__PURE__*/React.createElement(InspectorControls$1, null, /*#__PURE__*/React.createElement(PanelBody$1, {
      title: __$2("Block Visibility"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(PanelRow$1, null, /*#__PURE__*/React.createElement(ToggleControl$1, {
      label: __$2("Mobile Visibity"),
      checked: !!visibleOnMobile,
      onChange: () => setAttributes({
        visibleOnMobile: !visibleOnMobile
      }),
      help: !!visibleOnMobile ? __$2("Showing block on mobile devices.") : __$2("Hidden on mobile devices.")
    })), /*#__PURE__*/React.createElement(PanelRow$1, null, /*#__PURE__*/React.createElement(ToggleControl$1, {
      label: __$2("Tablet Visibity"),
      checked: !!visibleOnTablet,
      onChange: () => setAttributes({
        visibleOnTablet: !visibleOnTablet
      }),
      help: !!visibleOnTablet ? __$2("Showing block on tablet devices.") : __$2("Hidden on tablet devices.")
    })), /*#__PURE__*/React.createElement(PanelRow$1, null, /*#__PURE__*/React.createElement(ToggleControl$1, {
      label: __$2("Desktop Visibity"),
      checked: !!visibleOnDesktop,
      onChange: () => setAttributes({
        visibleOnDesktop: !visibleOnDesktop
      }),
      help: !!visibleOnDesktop ? __$2("Showing block on desktop.") : __$2("Hidden on desktop.")
    })))));
  };
}, "withAdvancedControls");

function applyExtraClass(extraProps, blockType, attributes) {
  const {
    visibleOnMobile,
    visibleOnTablet,
    visibleOnDesktop
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

  if (classes.length) {
    if (typeof extraProps.className === "undefined") {
      extraProps.className = "";
    } else {
      extraProps.className += " ";
    }

    extraProps.className += classes.join(' ');
  }

  return extraProps;
} //add filters


addFilter$1("blocks.registerBlockType", "editorskit/custom-attributes", addAttributes$1);
addFilter$1("editor.BlockEdit", "editorskit/custom-advanced-control", withAdvancedControls$1);
addFilter$1("blocks.getSaveContent.extraProps", "editorskit/applyExtraClass", applyExtraClass);

const {
  __: __$1
} = wp.i18n;
const {
  addFilter
} = wp.hooks;
const {
  Fragment
} = wp.element;
const {
  InspectorControls
} = wp.blockEditor;
const {
  createHigherOrderComponent
} = wp.compose;
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
      }
    });
  }

  return settings;
}

const withAdvancedControls = createHigherOrderComponent(BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      setAttributes,
      isSelected
    } = props;
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
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), isSelected && /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
      title: attributes.aos_animation && attributes.aos_animation !== '' ? __$1("Block Animation: ") + attributes.aos_animation : __$1("Block Animation"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
      label: __$1("Animation"),
      value: aos_animation,
      onChange: value => setAttributes({
        aos_animation: value
      }),
      options: [{
        value: null,
        label: "Select an animation type",
        disabled: true
      }, {
        value: "",
        label: "none"
      }, {
        value: "fade",
        label: "Fade"
      }, {
        value: "fade-up",
        label: "Fade to Up"
      }, {
        value: "fade-down",
        label: "Fade to Down"
      }, {
        value: "fade-left",
        label: "Fade to Left"
      }, {
        value: "fade-right",
        label: "Fade to Right"
      }, {
        value: "fade-up-left",
        label: "Fade Up to Left"
      }, {
        value: "fade-up-right",
        label: "Fade Up to Right"
      }, {
        value: "fade-down-left",
        label: "Fade Down to Left"
      }, {
        value: "fade-down-right",
        label: "Fade Down to Right"
      }, {
        value: "flip-up",
        label: "Flip Up"
      }, {
        value: "flip-down",
        label: "Flip Down"
      }, {
        value: "flip-left",
        label: "Flip Left"
      }, {
        value: "flip-right",
        label: "Flip Right"
      }, {
        value: "slide-up",
        label: "Slide Up"
      }, {
        value: "slide-down",
        label: "Slide Down"
      }, {
        value: "slide-left",
        label: "Slide Left"
      }, {
        value: "slide-right",
        label: "Slide Right"
      }, {
        value: "zoom-in",
        label: "Zoom In"
      }, {
        value: "zoom-in-up",
        label: "Zoom In to Up"
      }, {
        value: "zoom-in-down",
        label: "Zoom In to Down"
      }, {
        value: "zoom-in-left",
        label: "Zoom In to Left"
      }, {
        value: "zoom-in-right",
        label: "Zoom In to Right"
      }, {
        value: "zoom-out-up",
        label: "Zoom Out to Up"
      }, {
        value: "zoom-out-down",
        label: "Zoom Out to Down"
      }, {
        value: "zoom-out-left",
        label: "Zoom Out to Left"
      }, {
        value: "zoom-out-right",
        label: "Zoom out to Right"
      }]
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
      label: __$1("Easing"),
      value: aos_easing,
      onChange: value => setAttributes({
        aos_easing: value
      }),
      options: [{
        value: null,
        label: "Select easing function",
        disabled: true
      }, {
        value: "",
        label: "default"
      }, {
        value: "linear",
        label: "Linear"
      }, {
        value: "ease",
        label: "Ease"
      }, {
        value: "ease-in",
        label: "Ease In"
      }, {
        value: "ease-out",
        label: "Ease Out"
      }, {
        value: "ease-in-out",
        label: "Ease In and Out"
      }, {
        value: "ease-in-back",
        label: "Ease In Back"
      }, {
        value: "ease-out-back",
        label: "Ease Out Back"
      }, {
        value: "ease-in-out-back",
        label: "Ease In and Out Back"
      }, {
        value: "ease-in-sine",
        label: "Ease In Sine"
      }, {
        value: "ease-out-sine",
        label: "Ease Out Sine"
      }, {
        value: "ease-in-out-sine",
        label: "Ease In and Out Sine"
      }, {
        value: "ease-in-quad",
        label: "Ease In Quad"
      }, {
        value: "ease-out-quad",
        label: "Ease Out Quad"
      }, {
        value: "ease-in-out-quad",
        label: "Ease In and Out Quad"
      }, {
        value: "ease-in-cubic",
        label: "Ease In Cubic"
      }, {
        value: "ease-out-cubic",
        label: "Ease Out Cubic"
      }, {
        value: "ease-in-out-cubic",
        label: "Ease In and Out Cubic"
      }, {
        value: "ease-in-quart",
        label: "Ease In Quart"
      }, {
        value: "ease-out-quart",
        label: "Ease Out Quart"
      }, {
        value: "ease-in-out-quart",
        label: "Ease In and Out Quart"
      }]
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(RangeControl, {
      allowReset: true,
      showTooltip: true,
      withInputField: false,
      max: 3000,
      min: 0,
      step: 50,
      label: __$1("Animation duration (ms)"),
      onChange: value => setAttributes({
        aos_duration: value
      }),
      value: aos_duration
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(RangeControl, {
      allowReset: true,
      showTooltip: true,
      withInputField: false,
      max: 3000,
      min: 0,
      step: 50,
      label: __$1("Animation delay (ms)"),
      onChange: value => setAttributes({
        aos_delay: value
      }),
      value: aos_delay
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(ToggleControl, {
      label: __$1("Mirror Animation?"),
      checked: !!aos_mirror,
      onChange: () => setAttributes({
        aos_mirror: !aos_mirror
      }),
      help: !!aos_mirror ? __$1("Elements should animate out while scrolling past them") : __$1("Elements should not change while scrolling past them")
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(ToggleControl, {
      label: __$1("Loop Animation"),
      checked: !!aos_loop,
      onChange: () => setAttributes({
        aos_loop: !aos_loop
      }),
      help: !!aos_loop ? __$1("Animation runs infinitely ") : __$1("Animation runs once")
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(SelectControl, {
      label: __$1("Anchor Placement"),
      value: aos_anchorPlacement,
      onChange: value => setAttributes({
        aos_anchorPlacement: value
      }),
      options: [{
        value: null,
        label: "Select anchor placement",
        disabled: true
      }, {
        value: "",
        label: "default"
      }, {
        value: "top-bottom",
        label: "Top Bottom"
      }, {
        value: "top-center",
        label: "Top Center"
      }, {
        value: "top-top",
        label: "Top"
      }, {
        value: "center-bottom",
        label: "Center Bottom"
      }, {
        value: "center-center",
        label: "Center"
      }, {
        value: "center-top",
        label: "Center Top"
      }, {
        value: "bottom-bottom",
        label: "Bottom"
      }, {
        value: "bottom-center",
        label: "Bottom Center"
      }, {
        value: "bottom-top",
        label: "Bottom Top"
      }]
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(TextControl, {
      label: __$1("AOS ID"),
      value: aos_id,
      onChange: value => setAttributes({
        aos_id: value
      })
    })), /*#__PURE__*/React.createElement(PanelRow, null, /*#__PURE__*/React.createElement(RangeControl, {
      allowReset: true,
      showTooltip: true,
      withInputField: false,
      max: 500,
      min: 0,
      step: 10,
      label: __$1("Trigger offset (px)"),
      onChange: value => setAttributes({
        aos_offset: value
      }),
      value: aos_offset
    })))));
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
    extraProps['data-aos-once'] = "false";
  }

  if (typeof aos_mirror !== "undefined" && aos_mirror) {
    extraProps['data-aos-mirror'] = "true";
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
} //add filters


addFilter("blocks.registerBlockType", "editorskit/custom-attributes", addAttributes);
addFilter("editor.BlockEdit", "editorskit/custom-advanced-control", withAdvancedControls);
addFilter("blocks.getSaveContent.extraProps", "editorskit/applyExtraClass", applyExtraProps);

/**
 * WordPress dependencies
 */
const {
  __
} = wp.i18n;
const {
  Component
} = wp.element;
const {
  compose,
  ifCondition
} = wp.compose;
const {
  PluginPostStatusInfo
} = wp.editPost;
const {
  select,
  withSelect,
  withDispatch
} = wp.data;
const {
  withSpokenMessages,
  CheckboxControl
} = wp.components;

class DisableTitle extends Component {
  constructor() {
    super(...arguments);
    this.initialize = this.initialize.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate() {
    this.initialize();
  }

  initialize() {
    const {
      isDisabled,
      postmeta
    } = this.props;
    const titleBlock = document.querySelector('.editor-post-title__input');
    const editorWrapper = document.querySelector('.editor-styles-wrapper');

    if (titleBlock) {
      const isHidden = typeof postmeta !== 'undefined' && typeof postmeta._elixir_title_hidden !== 'undefined' ? postmeta._elixir_title_hidden : false;
      const bodyClass = isHidden ? 'elixir-title-hidden' : 'elixir-title-visible'; //remove existing class

      if (isHidden) {
        editorWrapper.classList.remove('elixir-title-visible');
      } else {
        editorWrapper.classList.remove('elixir-title-hidden');
      }

      editorWrapper.classList.add(bodyClass); //hide if disabled

      if (isDisabled) {
        editorWrapper.classList.add('elixir-title-visible-disabled');
      } else {
        editorWrapper.classList.remove('elixir-title-visible-disabled');
      }
    }
  }

  render() {
    const {
      onToggle,
      postmeta,
      posttype
    } = this.props;

    if (['wp_block'].includes(posttype)) {
      return false;
    }

    const isHidden = typeof postmeta !== 'undefined' && typeof postmeta._elixir_title_hidden !== 'undefined' ? postmeta._elixir_title_hidden : false;
    return /*#__PURE__*/React.createElement(PluginPostStatusInfo, null, /*#__PURE__*/React.createElement(CheckboxControl, {
      className: "elixir-hide-title-label",
      label: __('Hide ' + posttype + ' Title'),
      checked: isHidden,
      onChange: onToggle,
      help: isHidden ? __('Title is hidden on your website.') : null
    }));
  }

}

var DisableTitle$1 = compose(withSelect(() => {
  return {
    posttype: select('core/editor').getEditedPostAttribute('type'),
    postmeta: select('core/editor').getEditedPostAttribute('meta'),
    isDisabled: select('core/edit-post').isFeatureActive('disableeditorToggleTitleTools')
  };
}), withDispatch((dispatch, ownProps) => {
  let metavalue;

  if (typeof ownProps.postmeta !== 'undefined' && typeof ownProps.postmeta._elixir_title_hidden !== 'undefined') {
    metavalue = ownProps.postmeta._elixir_title_hidden;
  }

  return {
    onToggle() {
      dispatch('core/editor').editPost({
        meta: {
          '_elixir_title_hidden': !metavalue
        }
      });
    }

  };
}), ifCondition(props => {
  return !props.isDisabled;
}), withSpokenMessages)(DisableTitle);

/**
 * WordPress dependencies
 */
wp.blocks;
/**
 * WordPress dependencies
 */

const {
  registerPlugin
} = wp.plugins;
registerPlugin('editorskit-disable-title', {
  icon: false,
  render: DisableTitle$1
});
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

/*wp.hooks.addAction( 'lzb.components.PreviewServerCallback.onBeforeChange', 'elixir', function ( props ) {
    console.log( props );
} );*/
wp.hooks.addAction('lzb.components.PreviewServerCallback.onChange', 'elixir', function (props) {
  //    console.log( props );
  if (props['attributes']['hide-from-website'] === true) {
    jQuery('.' + props['attributes']['blockUniqueClass']).css('opacity', '50%');
  } else {
    jQuery('.' + props['attributes']['blockUniqueClass']).css('opacity', '100%');
  }
});
//# sourceMappingURL=elixir.admin.js.map
