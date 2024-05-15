/*!
  * Elixir v1.1.0 (https://elixir.com)
  * Copyright 2013-2024 The Elixir Authors (https://github.com/elixir/elixir/graphs/contributors)
  * Licensed under GPL (http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.elixir = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var alert$1 = {exports: {}};

	var eventHandler = {exports: {}};

	/*!
	  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/event-handler.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	  const stripNameRegex = /\..*/;
	  const stripUidRegex = /::\d+$/;
	  const eventRegistry = {}; // Events storage

	  let uidEvent = 1;
	  const customEvents = {
	    mouseenter: 'mouseover',
	    mouseleave: 'mouseout'
	  };
	  const customEventsRegex = /^(mouseenter|mouseleave)/i;
	  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	  /**
	   * ------------------------------------------------------------------------
	   * Private methods
	   * ------------------------------------------------------------------------
	   */

	  function getUidEvent(element, uid) {
	    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
	  }

	  function getEvent(element) {
	    const uid = getUidEvent(element);
	    element.uidEvent = uid;
	    eventRegistry[uid] = eventRegistry[uid] || {};
	    return eventRegistry[uid];
	  }

	  function bootstrapHandler(element, fn) {
	    return function handler(event) {
	      event.delegateTarget = element;

	      if (handler.oneOff) {
	        EventHandler.off(element, event.type, fn);
	      }

	      return fn.apply(element, [event]);
	    };
	  }

	  function bootstrapDelegationHandler(element, selector, fn) {
	    return function handler(event) {
	      const domElements = element.querySelectorAll(selector);

	      for (let {
	        target
	      } = event; target && target !== this; target = target.parentNode) {
	        for (let i = domElements.length; i--;) {
	          if (domElements[i] === target) {
	            event.delegateTarget = target;

	            if (handler.oneOff) {
	              EventHandler.off(element, event.type, selector, fn);
	            }

	            return fn.apply(target, [event]);
	          }
	        }
	      } // To please ESLint


	      return null;
	    };
	  }

	  function findHandler(events, handler, delegationSelector = null) {
	    const uidEventList = Object.keys(events);

	    for (let i = 0, len = uidEventList.length; i < len; i++) {
	      const event = events[uidEventList[i]];

	      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
	        return event;
	      }
	    }

	    return null;
	  }

	  function normalizeParams(originalTypeEvent, handler, delegationFn) {
	    const delegation = typeof handler === 'string';
	    const originalHandler = delegation ? delegationFn : handler;
	    let typeEvent = getTypeEvent(originalTypeEvent);
	    const isNative = nativeEvents.has(typeEvent);

	    if (!isNative) {
	      typeEvent = originalTypeEvent;
	    }

	    return [delegation, originalHandler, typeEvent];
	  }

	  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }

	    if (!handler) {
	      handler = delegationFn;
	      delegationFn = null;
	    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
	    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


	    if (customEventsRegex.test(originalTypeEvent)) {
	      const wrapFn = fn => {
	        return function (event) {
	          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
	            return fn.call(this, event);
	          }
	        };
	      };

	      if (delegationFn) {
	        delegationFn = wrapFn(delegationFn);
	      } else {
	        handler = wrapFn(handler);
	      }
	    }

	    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	    const events = getEvent(element);
	    const handlers = events[typeEvent] || (events[typeEvent] = {});
	    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

	    if (previousFn) {
	      previousFn.oneOff = previousFn.oneOff && oneOff;
	      return;
	    }

	    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
	    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
	    fn.delegationSelector = delegation ? handler : null;
	    fn.originalHandler = originalHandler;
	    fn.oneOff = oneOff;
	    fn.uidEvent = uid;
	    handlers[uid] = fn;
	    element.addEventListener(typeEvent, fn, delegation);
	  }

	  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	    const fn = findHandler(events[typeEvent], handler, delegationSelector);

	    if (!fn) {
	      return;
	    }

	    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	    delete events[typeEvent][fn.uidEvent];
	  }

	  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	    const storeElementEvent = events[typeEvent] || {};
	    Object.keys(storeElementEvent).forEach(handlerKey => {
	      if (handlerKey.includes(namespace)) {
	        const event = storeElementEvent[handlerKey];
	        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	      }
	    });
	  }

	  function getTypeEvent(event) {
	    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
	    event = event.replace(stripNameRegex, '');
	    return customEvents[event] || event;
	  }

	  const EventHandler = {
	    on(element, event, handler, delegationFn) {
	      addHandler(element, event, handler, delegationFn, false);
	    },

	    one(element, event, handler, delegationFn) {
	      addHandler(element, event, handler, delegationFn, true);
	    },

	    off(element, originalTypeEvent, handler, delegationFn) {
	      if (typeof originalTypeEvent !== 'string' || !element) {
	        return;
	      }

	      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	      const inNamespace = typeEvent !== originalTypeEvent;
	      const events = getEvent(element);
	      const isNamespace = originalTypeEvent.startsWith('.');

	      if (typeof originalHandler !== 'undefined') {
	        // Simplest case: handler is passed, remove that listener ONLY.
	        if (!events || !events[typeEvent]) {
	          return;
	        }

	        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
	        return;
	      }

	      if (isNamespace) {
	        Object.keys(events).forEach(elementEvent => {
	          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	        });
	      }

	      const storeElementEvent = events[typeEvent] || {};
	      Object.keys(storeElementEvent).forEach(keyHandlers => {
	        const handlerKey = keyHandlers.replace(stripUidRegex, '');

	        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	          const event = storeElementEvent[keyHandlers];
	          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	        }
	      });
	    },

	    trigger(element, event, args) {
	      if (typeof event !== 'string' || !element) {
	        return null;
	      }

	      const $ = getjQuery();
	      const typeEvent = getTypeEvent(event);
	      const inNamespace = event !== typeEvent;
	      const isNative = nativeEvents.has(typeEvent);
	      let jQueryEvent;
	      let bubbles = true;
	      let nativeDispatch = true;
	      let defaultPrevented = false;
	      let evt = null;

	      if (inNamespace && $) {
	        jQueryEvent = $.Event(event, args);
	        $(element).trigger(jQueryEvent);
	        bubbles = !jQueryEvent.isPropagationStopped();
	        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	        defaultPrevented = jQueryEvent.isDefaultPrevented();
	      }

	      if (isNative) {
	        evt = document.createEvent('HTMLEvents');
	        evt.initEvent(typeEvent, bubbles, true);
	      } else {
	        evt = new CustomEvent(event, {
	          bubbles,
	          cancelable: true
	        });
	      } // merge custom information in our event


	      if (typeof args !== 'undefined') {
	        Object.keys(args).forEach(key => {
	          Object.defineProperty(evt, key, {
	            get() {
	              return args[key];
	            }

	          });
	        });
	      }

	      if (defaultPrevented) {
	        evt.preventDefault();
	      }

	      if (nativeDispatch) {
	        element.dispatchEvent(evt);
	      }

	      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
	        jQueryEvent.preventDefault();
	      }

	      return evt;
	    }

	  };

	  return EventHandler;

	}));

	}(eventHandler));

	var baseComponent = {exports: {}};

	var data = {exports: {}};

	/*!
	  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/data.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */
	  const elementMap = new Map();
	  const data = {
	    set(element, key, instance) {
	      if (!elementMap.has(element)) {
	        elementMap.set(element, new Map());
	      }

	      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
	      // can be removed later when multiple key/instances are fine to be used

	      if (!instanceMap.has(key) && instanceMap.size !== 0) {
	        // eslint-disable-next-line no-console
	        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
	        return;
	      }

	      instanceMap.set(key, instance);
	    },

	    get(element, key) {
	      if (elementMap.has(element)) {
	        return elementMap.get(element).get(key) || null;
	      }

	      return null;
	    },

	    remove(element, key) {
	      if (!elementMap.has(element)) {
	        return;
	      }

	      const instanceMap = elementMap.get(element);
	      instanceMap.delete(key); // free up element references if there are no instances left for an element

	      if (instanceMap.size === 0) {
	        elementMap.delete(element);
	      }
	    }

	  };

	  return data;

	}));

	}(data));

	/*!
	  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(data.exports, eventHandler.exports) ;
	})(commonjsGlobal, (function (Data, EventHandler) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): base-component.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const VERSION = '5.1.3';

	  class BaseComponent {
	    constructor(element) {
	      element = getElement(element);

	      if (!element) {
	        return;
	      }

	      this._element = element;
	      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
	    }

	    dispose() {
	      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
	      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
	      Object.getOwnPropertyNames(this).forEach(propertyName => {
	        this[propertyName] = null;
	      });
	    }

	    _queueCallback(callback, element, isAnimated = true) {
	      executeAfterTransition(callback, element, isAnimated);
	    }
	    /** Static */


	    static getInstance(element) {
	      return Data__default.default.get(getElement(element), this.DATA_KEY);
	    }

	    static getOrCreateInstance(element, config = {}) {
	      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
	    }

	    static get VERSION() {
	      return VERSION;
	    }

	    static get NAME() {
	      throw new Error('You have to implement the static method "NAME", for each component!');
	    }

	    static get DATA_KEY() {
	      return `bs.${this.NAME}`;
	    }

	    static get EVENT_KEY() {
	      return `.${this.DATA_KEY}`;
	    }

	  }

	  return BaseComponent;

	}));

	}(baseComponent));

	/*!
	  * Bootstrap alert.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method) => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): alert.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'alert';
	  const DATA_KEY = 'bs.alert';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_CLOSE = `close${EVENT_KEY}`;
	  const EVENT_CLOSED = `closed${EVENT_KEY}`;
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Alert extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    close() {
	      const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);

	      if (closeEvent.defaultPrevented) {
	        return;
	      }

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);

	      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
	    } // Private


	    _destroyElement() {
	      this._element.remove();

	      EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
	      this.dispose();
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Alert.getOrCreateInstance(this);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](this);
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  enableDismissTrigger(Alert, 'close');
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Alert to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Alert);

	  return Alert;

	}));

	}(alert$1));

	var alert = alert$1.exports;

	var button$1 = {exports: {}};

	/*!
	  * Bootstrap button.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): button.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'button';
	  const DATA_KEY = 'bs.button';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const CLASS_NAME_ACTIVE = 'active';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Button extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
	      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Button.getOrCreateInstance(this);

	        if (config === 'toggle') {
	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
	    event.preventDefault();
	    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
	    const data = Button.getOrCreateInstance(button);
	    data.toggle();
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Button to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Button);

	  return Button;

	}));

	}(button$1));

	var button = button$1.exports;

	var carousel$1 = {exports: {}};

	var manipulator = {exports: {}};

	/*!
	  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/manipulator.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  function normalizeData(val) {
	    if (val === 'true') {
	      return true;
	    }

	    if (val === 'false') {
	      return false;
	    }

	    if (val === Number(val).toString()) {
	      return Number(val);
	    }

	    if (val === '' || val === 'null') {
	      return null;
	    }

	    return val;
	  }

	  function normalizeDataKey(key) {
	    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
	  }

	  const Manipulator = {
	    setDataAttribute(element, key, value) {
	      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
	    },

	    removeDataAttribute(element, key) {
	      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
	    },

	    getDataAttributes(element) {
	      if (!element) {
	        return {};
	      }

	      const attributes = {};
	      Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
	        let pureKey = key.replace(/^bs/, '');
	        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	        attributes[pureKey] = normalizeData(element.dataset[key]);
	      });
	      return attributes;
	    },

	    getDataAttribute(element, key) {
	      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
	    },

	    offset(element) {
	      const rect = element.getBoundingClientRect();
	      return {
	        top: rect.top + window.pageYOffset,
	        left: rect.left + window.pageXOffset
	      };
	    },

	    position(element) {
	      return {
	        top: element.offsetTop,
	        left: element.offsetLeft
	      };
	    }

	  };

	  return Manipulator;

	}));

	}(manipulator));

	var selectorEngine = {exports: {}};

	/*!
	  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, (function () {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dom/selector-engine.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const NODE_TEXT = 3;
	  const SelectorEngine = {
	    find(selector, element = document.documentElement) {
	      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
	    },

	    findOne(selector, element = document.documentElement) {
	      return Element.prototype.querySelector.call(element, selector);
	    },

	    children(element, selector) {
	      return [].concat(...element.children).filter(child => child.matches(selector));
	    },

	    parents(element, selector) {
	      const parents = [];
	      let ancestor = element.parentNode;

	      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
	        if (ancestor.matches(selector)) {
	          parents.push(ancestor);
	        }

	        ancestor = ancestor.parentNode;
	      }

	      return parents;
	    },

	    prev(element, selector) {
	      let previous = element.previousElementSibling;

	      while (previous) {
	        if (previous.matches(selector)) {
	          return [previous];
	        }

	        previous = previous.previousElementSibling;
	      }

	      return [];
	    },

	    next(element, selector) {
	      let next = element.nextElementSibling;

	      while (next) {
	        if (next.matches(selector)) {
	          return [next];
	        }

	        next = next.nextElementSibling;
	      }

	      return [];
	    },

	    focusableChildren(element) {
	      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
	      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
	    }

	  };

	  return SelectorEngine;

	}));

	}(selectorEngine));

	/*!
	  * Bootstrap carousel.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };
	  /**
	   * Return the previous/next element of a list.
	   *
	   * @param {array} list    The list of elements
	   * @param activeElement   The active element
	   * @param shouldGetNext   Choose to get next or previous element
	   * @param isCycleAllowed
	   * @return {Element|elem} The proper element
	   */


	  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

	    if (index === -1) {
	      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
	    }

	    const listLength = list.length;
	    index += shouldGetNext ? 1 : -1;

	    if (isCycleAllowed) {
	      index = (index + listLength) % listLength;
	    }

	    return list[Math.max(0, Math.min(index, listLength - 1))];
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): carousel.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'carousel';
	  const DATA_KEY = 'bs.carousel';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ARROW_LEFT_KEY = 'ArrowLeft';
	  const ARROW_RIGHT_KEY = 'ArrowRight';
	  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	  const SWIPE_THRESHOLD = 40;
	  const Default = {
	    interval: 5000,
	    keyboard: true,
	    slide: false,
	    pause: 'hover',
	    wrap: true,
	    touch: true
	  };
	  const DefaultType = {
	    interval: '(number|boolean)',
	    keyboard: 'boolean',
	    slide: '(boolean|string)',
	    pause: '(string|boolean)',
	    wrap: 'boolean',
	    touch: 'boolean'
	  };
	  const ORDER_NEXT = 'next';
	  const ORDER_PREV = 'prev';
	  const DIRECTION_LEFT = 'left';
	  const DIRECTION_RIGHT = 'right';
	  const KEY_TO_DIRECTION = {
	    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
	    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
	  };
	  const EVENT_SLIDE = `slide${EVENT_KEY}`;
	  const EVENT_SLID = `slid${EVENT_KEY}`;
	  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
	  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
	  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
	  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
	  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
	  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
	  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
	  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
	  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_CAROUSEL = 'carousel';
	  const CLASS_NAME_ACTIVE = 'active';
	  const CLASS_NAME_SLIDE = 'slide';
	  const CLASS_NAME_END = 'carousel-item-end';
	  const CLASS_NAME_START = 'carousel-item-start';
	  const CLASS_NAME_NEXT = 'carousel-item-next';
	  const CLASS_NAME_PREV = 'carousel-item-prev';
	  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
	  const SELECTOR_ACTIVE = '.active';
	  const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
	  const SELECTOR_ITEM = '.carousel-item';
	  const SELECTOR_ITEM_IMG = '.carousel-item img';
	  const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
	  const SELECTOR_INDICATORS = '.carousel-indicators';
	  const SELECTOR_INDICATOR = '[data-bs-target]';
	  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	  const POINTER_TYPE_TOUCH = 'touch';
	  const POINTER_TYPE_PEN = 'pen';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Carousel extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._items = null;
	      this._interval = null;
	      this._activeElement = null;
	      this._isPaused = false;
	      this._isSliding = false;
	      this.touchTimeout = null;
	      this.touchStartX = 0;
	      this.touchDeltaX = 0;
	      this._config = this._getConfig(config);
	      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
	      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	      this._pointerEvent = Boolean(window.PointerEvent);

	      this._addEventListeners();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    next() {
	      this._slide(ORDER_NEXT);
	    }

	    nextWhenVisible() {
	      // Don't call next when the page isn't visible
	      // or the carousel or its parent isn't visible
	      if (!document.hidden && isVisible(this._element)) {
	        this.next();
	      }
	    }

	    prev() {
	      this._slide(ORDER_PREV);
	    }

	    pause(event) {
	      if (!event) {
	        this._isPaused = true;
	      }

	      if (SelectorEngine__default.default.findOne(SELECTOR_NEXT_PREV, this._element)) {
	        triggerTransitionEnd(this._element);
	        this.cycle(true);
	      }

	      clearInterval(this._interval);
	      this._interval = null;
	    }

	    cycle(event) {
	      if (!event) {
	        this._isPaused = false;
	      }

	      if (this._interval) {
	        clearInterval(this._interval);
	        this._interval = null;
	      }

	      if (this._config && this._config.interval && !this._isPaused) {
	        this._updateInterval();

	        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
	      }
	    }

	    to(index) {
	      this._activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      const activeIndex = this._getItemIndex(this._activeElement);

	      if (index > this._items.length - 1 || index < 0) {
	        return;
	      }

	      if (this._isSliding) {
	        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
	        return;
	      }

	      if (activeIndex === index) {
	        this.pause();
	        this.cycle();
	        return;
	      }

	      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

	      this._slide(order, this._items[index]);
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _handleSwipe() {
	      const absDeltax = Math.abs(this.touchDeltaX);

	      if (absDeltax <= SWIPE_THRESHOLD) {
	        return;
	      }

	      const direction = absDeltax / this.touchDeltaX;
	      this.touchDeltaX = 0;

	      if (!direction) {
	        return;
	      }

	      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
	    }

	    _addEventListeners() {
	      if (this._config.keyboard) {
	        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	      }

	      if (this._config.pause === 'hover') {
	        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
	        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
	      }

	      if (this._config.touch && this._touchSupported) {
	        this._addTouchEventListeners();
	      }
	    }

	    _addTouchEventListeners() {
	      const hasPointerPenTouch = event => {
	        return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
	      };

	      const start = event => {
	        if (hasPointerPenTouch(event)) {
	          this.touchStartX = event.clientX;
	        } else if (!this._pointerEvent) {
	          this.touchStartX = event.touches[0].clientX;
	        }
	      };

	      const move = event => {
	        // ensure swiping with one touch and not pinching
	        this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
	      };

	      const end = event => {
	        if (hasPointerPenTouch(event)) {
	          this.touchDeltaX = event.clientX - this.touchStartX;
	        }

	        this._handleSwipe();

	        if (this._config.pause === 'hover') {
	          // If it's a touch-enabled device, mouseenter/leave are fired as
	          // part of the mouse compatibility events on first tap - the carousel
	          // would stop cycling until user tapped out of it;
	          // here, we listen for touchend, explicitly pause the carousel
	          // (as if it's the second time we tap on it, mouseenter compat event
	          // is NOT fired) and after a timeout (to allow for mouse compatibility
	          // events to fire) we explicitly restart cycling
	          this.pause();

	          if (this.touchTimeout) {
	            clearTimeout(this.touchTimeout);
	          }

	          this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
	        }
	      };

	      SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
	        EventHandler__default.default.on(itemImg, EVENT_DRAG_START, event => event.preventDefault());
	      });

	      if (this._pointerEvent) {
	        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => start(event));
	        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => end(event));

	        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	      } else {
	        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => start(event));
	        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => move(event));
	        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => end(event));
	      }
	    }

	    _keydown(event) {
	      if (/input|textarea/i.test(event.target.tagName)) {
	        return;
	      }

	      const direction = KEY_TO_DIRECTION[event.key];

	      if (direction) {
	        event.preventDefault();

	        this._slide(direction);
	      }
	    }

	    _getItemIndex(element) {
	      this._items = element && element.parentNode ? SelectorEngine__default.default.find(SELECTOR_ITEM, element.parentNode) : [];
	      return this._items.indexOf(element);
	    }

	    _getItemByOrder(order, activeElement) {
	      const isNext = order === ORDER_NEXT;
	      return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
	    }

	    _triggerSlideEvent(relatedTarget, eventDirectionName) {
	      const targetIndex = this._getItemIndex(relatedTarget);

	      const fromIndex = this._getItemIndex(SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element));

	      return EventHandler__default.default.trigger(this._element, EVENT_SLIDE, {
	        relatedTarget,
	        direction: eventDirectionName,
	        from: fromIndex,
	        to: targetIndex
	      });
	    }

	    _setActiveIndicatorElement(element) {
	      if (this._indicatorsElement) {
	        const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
	        activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
	        activeIndicator.removeAttribute('aria-current');
	        const indicators = SelectorEngine__default.default.find(SELECTOR_INDICATOR, this._indicatorsElement);

	        for (let i = 0; i < indicators.length; i++) {
	          if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
	            indicators[i].classList.add(CLASS_NAME_ACTIVE);
	            indicators[i].setAttribute('aria-current', 'true');
	            break;
	          }
	        }
	      }
	    }

	    _updateInterval() {
	      const element = this._activeElement || SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      if (!element) {
	        return;
	      }

	      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

	      if (elementInterval) {
	        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
	        this._config.interval = elementInterval;
	      } else {
	        this._config.interval = this._config.defaultInterval || this._config.interval;
	      }
	    }

	    _slide(directionOrOrder, element) {
	      const order = this._directionToOrder(directionOrOrder);

	      const activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	      const activeElementIndex = this._getItemIndex(activeElement);

	      const nextElement = element || this._getItemByOrder(order, activeElement);

	      const nextElementIndex = this._getItemIndex(nextElement);

	      const isCycling = Boolean(this._interval);
	      const isNext = order === ORDER_NEXT;
	      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
	      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

	      const eventDirectionName = this._orderToDirection(order);

	      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
	        this._isSliding = false;
	        return;
	      }

	      if (this._isSliding) {
	        return;
	      }

	      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

	      if (slideEvent.defaultPrevented) {
	        return;
	      }

	      if (!activeElement || !nextElement) {
	        // Some weirdness is happening, so we bail
	        return;
	      }

	      this._isSliding = true;

	      if (isCycling) {
	        this.pause();
	      }

	      this._setActiveIndicatorElement(nextElement);

	      this._activeElement = nextElement;

	      const triggerSlidEvent = () => {
	        EventHandler__default.default.trigger(this._element, EVENT_SLID, {
	          relatedTarget: nextElement,
	          direction: eventDirectionName,
	          from: activeElementIndex,
	          to: nextElementIndex
	        });
	      };

	      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
	        nextElement.classList.add(orderClassName);
	        reflow(nextElement);
	        activeElement.classList.add(directionalClassName);
	        nextElement.classList.add(directionalClassName);

	        const completeCallBack = () => {
	          nextElement.classList.remove(directionalClassName, orderClassName);
	          nextElement.classList.add(CLASS_NAME_ACTIVE);
	          activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
	          this._isSliding = false;
	          setTimeout(triggerSlidEvent, 0);
	        };

	        this._queueCallback(completeCallBack, activeElement, true);
	      } else {
	        activeElement.classList.remove(CLASS_NAME_ACTIVE);
	        nextElement.classList.add(CLASS_NAME_ACTIVE);
	        this._isSliding = false;
	        triggerSlidEvent();
	      }

	      if (isCycling) {
	        this.cycle();
	      }
	    }

	    _directionToOrder(direction) {
	      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
	        return direction;
	      }

	      if (isRTL()) {
	        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
	      }

	      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
	    }

	    _orderToDirection(order) {
	      if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
	        return order;
	      }

	      if (isRTL()) {
	        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
	      }

	      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
	    } // Static


	    static carouselInterface(element, config) {
	      const data = Carousel.getOrCreateInstance(element, config);
	      let {
	        _config
	      } = data;

	      if (typeof config === 'object') {
	        _config = { ..._config,
	          ...config
	        };
	      }

	      const action = typeof config === 'string' ? config : _config.slide;

	      if (typeof config === 'number') {
	        data.to(config);
	      } else if (typeof action === 'string') {
	        if (typeof data[action] === 'undefined') {
	          throw new TypeError(`No method named "${action}"`);
	        }

	        data[action]();
	      } else if (_config.interval && _config.ride) {
	        data.pause();
	        data.cycle();
	      }
	    }

	    static jQueryInterface(config) {
	      return this.each(function () {
	        Carousel.carouselInterface(this, config);
	      });
	    }

	    static dataApiClickHandler(event) {
	      const target = getElementFromSelector(this);

	      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	        return;
	      }

	      const config = { ...Manipulator__default.default.getDataAttributes(target),
	        ...Manipulator__default.default.getDataAttributes(this)
	      };
	      const slideIndex = this.getAttribute('data-bs-slide-to');

	      if (slideIndex) {
	        config.interval = false;
	      }

	      Carousel.carouselInterface(target, config);

	      if (slideIndex) {
	        Carousel.getInstance(target).to(slideIndex);
	      }

	      event.preventDefault();
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);

	    for (let i = 0, len = carousels.length; i < len; i++) {
	      Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
	    }
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Carousel to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Carousel);

	  return Carousel;

	}));

	}(carousel$1));

	var carousel = carousel$1.exports;

	var collapse$1 = {exports: {}};

	/*!
	  * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(data.exports, eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getSelectorFromElement = element => {
	    const selector = getSelector(element);

	    if (selector) {
	      return document.querySelector(selector) ? selector : null;
	    }

	    return null;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): collapse.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'collapse';
	  const DATA_KEY = 'bs.collapse';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const Default = {
	    toggle: true,
	    parent: null
	  };
	  const DefaultType = {
	    toggle: 'boolean',
	    parent: '(null|element)'
	  };
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_COLLAPSE = 'collapse';
	  const CLASS_NAME_COLLAPSING = 'collapsing';
	  const CLASS_NAME_COLLAPSED = 'collapsed';
	  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
	  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
	  const WIDTH = 'width';
	  const HEIGHT = 'height';
	  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Collapse extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._isTransitioning = false;
	      this._config = this._getConfig(config);
	      this._triggerArray = [];
	      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);

	      for (let i = 0, len = toggleList.length; i < len; i++) {
	        const elem = toggleList[i];
	        const selector = getSelectorFromElement(elem);
	        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElem => foundElem === this._element);

	        if (selector !== null && filterElement.length) {
	          this._selector = selector;

	          this._triggerArray.push(elem);
	        }
	      }

	      this._initializeChildren();

	      if (!this._config.parent) {
	        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
	      }

	      if (this._config.toggle) {
	        this.toggle();
	      }
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      if (this._isShown()) {
	        this.hide();
	      } else {
	        this.show();
	      }
	    }

	    show() {
	      if (this._isTransitioning || this._isShown()) {
	        return;
	      }

	      let actives = [];
	      let activesData;

	      if (this._config.parent) {
	        const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
	        actives = SelectorEngine__default.default.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)); // remove children if greater depth
	      }

	      const container = SelectorEngine__default.default.findOne(this._selector);

	      if (actives.length) {
	        const tempActiveData = actives.find(elem => container !== elem);
	        activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

	        if (activesData && activesData._isTransitioning) {
	          return;
	        }
	      }

	      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);

	      if (startEvent.defaultPrevented) {
	        return;
	      }

	      actives.forEach(elemActive => {
	        if (container !== elemActive) {
	          Collapse.getOrCreateInstance(elemActive, {
	            toggle: false
	          }).hide();
	        }

	        if (!activesData) {
	          Data__default.default.set(elemActive, DATA_KEY, null);
	        }
	      });

	      const dimension = this._getDimension();

	      this._element.classList.remove(CLASS_NAME_COLLAPSE);

	      this._element.classList.add(CLASS_NAME_COLLAPSING);

	      this._element.style[dimension] = 0;

	      this._addAriaAndCollapsedClass(this._triggerArray, true);

	      this._isTransitioning = true;

	      const complete = () => {
	        this._isTransitioning = false;

	        this._element.classList.remove(CLASS_NAME_COLLAPSING);

	        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

	        this._element.style[dimension] = '';
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
	      };

	      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	      const scrollSize = `scroll${capitalizedDimension}`;

	      this._queueCallback(complete, this._element, true);

	      this._element.style[dimension] = `${this._element[scrollSize]}px`;
	    }

	    hide() {
	      if (this._isTransitioning || !this._isShown()) {
	        return;
	      }

	      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (startEvent.defaultPrevented) {
	        return;
	      }

	      const dimension = this._getDimension();

	      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
	      reflow(this._element);

	      this._element.classList.add(CLASS_NAME_COLLAPSING);

	      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

	      const triggerArrayLength = this._triggerArray.length;

	      for (let i = 0; i < triggerArrayLength; i++) {
	        const trigger = this._triggerArray[i];
	        const elem = getElementFromSelector(trigger);

	        if (elem && !this._isShown(elem)) {
	          this._addAriaAndCollapsedClass([trigger], false);
	        }
	      }

	      this._isTransitioning = true;

	      const complete = () => {
	        this._isTransitioning = false;

	        this._element.classList.remove(CLASS_NAME_COLLAPSING);

	        this._element.classList.add(CLASS_NAME_COLLAPSE);

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._element.style[dimension] = '';

	      this._queueCallback(complete, this._element, true);
	    }

	    _isShown(element = this._element) {
	      return element.classList.contains(CLASS_NAME_SHOW);
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...config
	      };
	      config.toggle = Boolean(config.toggle); // Coerce string values

	      config.parent = getElement(config.parent);
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _getDimension() {
	      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
	    }

	    _initializeChildren() {
	      if (!this._config.parent) {
	        return;
	      }

	      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
	      SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE, this._config.parent).filter(elem => !children.includes(elem)).forEach(element => {
	        const selected = getElementFromSelector(element);

	        if (selected) {
	          this._addAriaAndCollapsedClass([element], this._isShown(selected));
	        }
	      });
	    }

	    _addAriaAndCollapsedClass(triggerArray, isOpen) {
	      if (!triggerArray.length) {
	        return;
	      }

	      triggerArray.forEach(elem => {
	        if (isOpen) {
	          elem.classList.remove(CLASS_NAME_COLLAPSED);
	        } else {
	          elem.classList.add(CLASS_NAME_COLLAPSED);
	        }

	        elem.setAttribute('aria-expanded', isOpen);
	      });
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const _config = {};

	        if (typeof config === 'string' && /show|hide/.test(config)) {
	          _config.toggle = false;
	        }

	        const data = Collapse.getOrCreateInstance(this, _config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
	    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
	      event.preventDefault();
	    }

	    const selector = getSelectorFromElement(this);
	    const selectorElements = SelectorEngine__default.default.find(selector);
	    selectorElements.forEach(element => {
	      Collapse.getOrCreateInstance(element, {
	        toggle: false
	      }).toggle();
	    });
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Collapse to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Collapse);

	  return Collapse;

	}));

	}(collapse$1));

	var collapse = collapse$1.exports;

	var dropdown$1 = {exports: {}};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }

	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }

	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}

	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}

	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }

	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];

	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}

	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;

	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }

	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getBoundingClientRect(element, includeScale) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }

	  var rect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;

	  if (isHTMLElement(element) && includeScale) {
	    var offsetHeight = element.offsetHeight;
	    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
	    // Fallback to 1 in case both values are `0`

	    if (offsetWidth > 0) {
	      scaleX = round(rect.width) / offsetWidth || 1;
	    }

	    if (offsetHeight > 0) {
	      scaleY = round(rect.height) / offsetHeight || 1;
	    }
	  }

	  return {
	    width: rect.width / scaleX,
	    height: rect.height / scaleY,
	    top: rect.top / scaleY,
	    right: rect.right / scaleX,
	    bottom: rect.bottom / scaleY,
	    left: rect.left / scaleX,
	    x: rect.left / scaleX,
	    y: rect.top / scaleY
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;

	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }

	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }

	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;

	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        } // $FlowFixMe[prop-missing]: need a better way to handle this...


	        next = next.parentNode || next.host;
	      } while (next);
	    } // Give up, the result is false


	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || ( // DOM Element detected
	    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }

	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
	  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);

	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }

	  var currentNode = getParentNode(element);

	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);

	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }

	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }

	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};

	function arrow(_ref) {
	  var _state$modifiersData$;

	  var state = _ref.state,
	      name = _ref.name,
	      options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';

	  if (!arrowElement || !popperOffsets) {
	    return;
	  }

	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

	  if (arrowElement == null) {
	    return;
	  } // CSS selector


	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);

	    if (!arrowElement) {
	      return;
	    }
	  }

	  if (!contains(state.elements.popper, arrowElement)) {

	    return;
	  }

	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules


	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      variation = _ref2.variation,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets,
	      isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	      x = _offsets$x === void 0 ? 0 : _offsets$x,
	      _offsets$y = offsets.y,
	      y = _offsets$y === void 0 ? 0 : _offsets$y;

	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;

	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';

	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);

	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


	    offsetParent = offsetParent;

	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref4.x;
	  y = _ref4.y;

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref5) {
	  var state = _ref5.state,
	      options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };

	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }

	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }

	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};

	function effect(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }

	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }

	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
	  // can be obscured underneath it.
	  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
	  // if it isn't open, so if this isn't available, the popper will be detected
	  // to overflow the bottom of the screen too early.

	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
	    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
	    // errors due to floating point numbers, so we need to check precision.
	    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
	    // Feature detection fails in mobile emulation mode in Chrome.
	    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
	    // 0.001
	    // Fallback here: "Not Safari" userAgent

	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }

	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;

	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;

	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }

	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;

	  if (list === void 0) {
	    list = [];
	  }

	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}

	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;

	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;

	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;

	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;

	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;

	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }

	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';

	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;

	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }

	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }

	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });

	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }

	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;

	  if (state.modifiersData[name]._skip) {
	    return;
	  }

	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];

	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];

	    var _basePlacement = getBasePlacement(placement);

	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }

	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];

	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }

	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }

	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }

	    checksMap.set(placement, checks);
	  }

	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;

	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);

	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });

	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };

	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);

	      if (_ret === "break") break;
	    }
	  }

	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules


	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }

	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}

	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}

	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];

	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}

	function offset$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;

	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var offset$2 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset$1
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis) {
	    var _offsetModifierState$;

	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }

	  if (checkAltAxis) {
	    var _offsetModifierState$2;

	    var _mainSide = mainAxis === 'x' ? top : left;

	    var _altSide = mainAxis === 'x' ? bottom : right;

	    var _offset = popperOffsets[altAxis];

	    var _len = altAxis === 'y' ? 'height' : 'width';

	    var _min = _offset + overflow[_mainSide];

	    var _max = _offset - overflow[_altSide];

	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.


	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }

	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);

	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }

	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce$2(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }

	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};

	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}

	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }

	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }

	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned

	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {

	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });

	        for (var index = 0; index < state.orderedModifiers.length; index++) {

	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }

	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;

	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce$2(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };

	    if (!areValidElements(reference, popper)) {

	      return instance;
	    }

	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;

	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });

	          var noopFn = function noopFn() {};

	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }

	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }

	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$2, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$2,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(require$$0, eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (Popper, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  function _interopNamespace(e) {
	    if (e && e.__esModule) return e;
	    const n = Object.create(null);
	    if (e) {
	      for (const k in e) {
	        if (k !== 'default') {
	          const d = Object.getOwnPropertyDescriptor(e, k);
	          Object.defineProperty(n, k, d.get ? d : {
	            enumerable: true,
	            get: () => e[k]
	          });
	        }
	      }
	    }
	    n.default = e;
	    return Object.freeze(n);
	  }

	  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };

	  const noop = () => {};

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };
	  /**
	   * Return the previous/next element of a list.
	   *
	   * @param {array} list    The list of elements
	   * @param activeElement   The active element
	   * @param shouldGetNext   Choose to get next or previous element
	   * @param isCycleAllowed
	   * @return {Element|elem} The proper element
	   */


	  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

	    if (index === -1) {
	      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
	    }

	    const listLength = list.length;
	    index += shouldGetNext ? 1 : -1;

	    if (isCycleAllowed) {
	      index = (index + listLength) % listLength;
	    }

	    return list[Math.max(0, Math.min(index, listLength - 1))];
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): dropdown.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'dropdown';
	  const DATA_KEY = 'bs.dropdown';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ESCAPE_KEY = 'Escape';
	  const SPACE_KEY = 'Space';
	  const TAB_KEY = 'Tab';
	  const ARROW_UP_KEY = 'ArrowUp';
	  const ARROW_DOWN_KEY = 'ArrowDown';
	  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

	  const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`);
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_DROPUP = 'dropup';
	  const CLASS_NAME_DROPEND = 'dropend';
	  const CLASS_NAME_DROPSTART = 'dropstart';
	  const CLASS_NAME_NAVBAR = 'navbar';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]';
	  const SELECTOR_MENU = '.dropdown-menu';
	  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
	  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	  const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
	  const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
	  const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
	  const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
	  const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
	  const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
	  const Default = {
	    offset: [0, 2],
	    boundary: 'clippingParents',
	    reference: 'toggle',
	    display: 'dynamic',
	    popperConfig: null,
	    autoClose: true
	  };
	  const DefaultType = {
	    offset: '(array|string|function)',
	    boundary: '(string|element)',
	    reference: '(string|element|object)',
	    display: 'string',
	    popperConfig: '(null|object|function)',
	    autoClose: '(boolean|string)'
	  };
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Dropdown extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._popper = null;
	      this._config = this._getConfig(config);
	      this._menu = this._getMenuElement();
	      this._inNavbar = this._detectNavbar();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle() {
	      return this._isShown() ? this.hide() : this.show();
	    }

	    show() {
	      if (isDisabled(this._element) || this._isShown(this._menu)) {
	        return;
	      }

	      const relatedTarget = {
	        relatedTarget: this._element
	      };
	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      const parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar

	      if (this._inNavbar) {
	        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'none');
	      } else {
	        this._createPopper(parent);
	      } // If this is a touch-enabled device we add extra
	      // empty mouseover listeners to the body's immediate children;
	      // only needed because of broken event delegation on iOS
	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


	      if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
	        [].concat(...document.body.children).forEach(elem => EventHandler__default.default.on(elem, 'mouseover', noop));
	      }

	      this._element.focus();

	      this._element.setAttribute('aria-expanded', true);

	      this._menu.classList.add(CLASS_NAME_SHOW);

	      this._element.classList.add(CLASS_NAME_SHOW);

	      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
	    }

	    hide() {
	      if (isDisabled(this._element) || !this._isShown(this._menu)) {
	        return;
	      }

	      const relatedTarget = {
	        relatedTarget: this._element
	      };

	      this._completeHide(relatedTarget);
	    }

	    dispose() {
	      if (this._popper) {
	        this._popper.destroy();
	      }

	      super.dispose();
	    }

	    update() {
	      this._inNavbar = this._detectNavbar();

	      if (this._popper) {
	        this._popper.update();
	      }
	    } // Private


	    _completeHide(relatedTarget) {
	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);

	      if (hideEvent.defaultPrevented) {
	        return;
	      } // If this is a touch-enabled device we remove the extra
	      // empty mouseover listeners we added for iOS support


	      if ('ontouchstart' in document.documentElement) {
	        [].concat(...document.body.children).forEach(elem => EventHandler__default.default.off(elem, 'mouseover', noop));
	      }

	      if (this._popper) {
	        this._popper.destroy();
	      }

	      this._menu.classList.remove(CLASS_NAME_SHOW);

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      this._element.setAttribute('aria-expanded', 'false');

	      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
	      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
	    }

	    _getConfig(config) {
	      config = { ...this.constructor.Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...config
	      };
	      typeCheckConfig(NAME, config, this.constructor.DefaultType);

	      if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
	        // Popper virtual elements require a getBoundingClientRect method
	        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
	      }

	      return config;
	    }

	    _createPopper(parent) {
	      if (typeof Popper__namespace === 'undefined') {
	        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
	      }

	      let referenceElement = this._element;

	      if (this._config.reference === 'parent') {
	        referenceElement = parent;
	      } else if (isElement(this._config.reference)) {
	        referenceElement = getElement(this._config.reference);
	      } else if (typeof this._config.reference === 'object') {
	        referenceElement = this._config.reference;
	      }

	      const popperConfig = this._getPopperConfig();

	      const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
	      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);

	      if (isDisplayStatic) {
	        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static');
	      }
	    }

	    _isShown(element = this._element) {
	      return element.classList.contains(CLASS_NAME_SHOW);
	    }

	    _getMenuElement() {
	      return SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0];
	    }

	    _getPlacement() {
	      const parentDropdown = this._element.parentNode;

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
	        return PLACEMENT_RIGHT;
	      }

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
	        return PLACEMENT_LEFT;
	      } // We need to trim the value because custom properties can also include spaces


	      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

	      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
	        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
	      }

	      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	    }

	    _detectNavbar() {
	      return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
	    }

	    _getOffset() {
	      const {
	        offset
	      } = this._config;

	      if (typeof offset === 'string') {
	        return offset.split(',').map(val => Number.parseInt(val, 10));
	      }

	      if (typeof offset === 'function') {
	        return popperData => offset(popperData, this._element);
	      }

	      return offset;
	    }

	    _getPopperConfig() {
	      const defaultBsPopperConfig = {
	        placement: this._getPlacement(),
	        modifiers: [{
	          name: 'preventOverflow',
	          options: {
	            boundary: this._config.boundary
	          }
	        }, {
	          name: 'offset',
	          options: {
	            offset: this._getOffset()
	          }
	        }]
	      }; // Disable Popper if we have a static display

	      if (this._config.display === 'static') {
	        defaultBsPopperConfig.modifiers = [{
	          name: 'applyStyles',
	          enabled: false
	        }];
	      }

	      return { ...defaultBsPopperConfig,
	        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	      };
	    }

	    _selectMenuItem({
	      key,
	      target
	    }) {
	      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

	      if (!items.length) {
	        return;
	      } // if target isn't included in items (e.g. when expanding the dropdown)
	      // allow cycling to get the last item in case key equals ARROW_UP_KEY


	      getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Dropdown.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	    static clearMenus(event) {
	      if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
	        return;
	      }

	      const toggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);

	      for (let i = 0, len = toggles.length; i < len; i++) {
	        const context = Dropdown.getInstance(toggles[i]);

	        if (!context || context._config.autoClose === false) {
	          continue;
	        }

	        if (!context._isShown()) {
	          continue;
	        }

	        const relatedTarget = {
	          relatedTarget: context._element
	        };

	        if (event) {
	          const composedPath = event.composedPath();
	          const isMenuTarget = composedPath.includes(context._menu);

	          if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
	            continue;
	          } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


	          if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
	            continue;
	          }

	          if (event.type === 'click') {
	            relatedTarget.clickEvent = event;
	          }
	        }

	        context._completeHide(relatedTarget);
	      }
	    }

	    static getParentFromElement(element) {
	      return getElementFromSelector(element) || element.parentNode;
	    }

	    static dataApiKeydownHandler(event) {
	      // If not input/textarea:
	      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
	      // If input/textarea:
	      //  - If space key => not a dropdown command
	      //  - If key is other than escape
	      //    - If key is not up or down => not a dropdown command
	      //    - If trigger inside the menu => not a dropdown command
	      if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
	        return;
	      }

	      const isActive = this.classList.contains(CLASS_NAME_SHOW);

	      if (!isActive && event.key === ESCAPE_KEY) {
	        return;
	      }

	      event.preventDefault();
	      event.stopPropagation();

	      if (isDisabled(this)) {
	        return;
	      }

	      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0];
	      const instance = Dropdown.getOrCreateInstance(getToggleButton);

	      if (event.key === ESCAPE_KEY) {
	        instance.hide();
	        return;
	      }

	      if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
	        if (!isActive) {
	          instance.show();
	        }

	        instance._selectMenuItem(event);

	        return;
	      }

	      if (!isActive || event.key === SPACE_KEY) {
	        Dropdown.clearMenus();
	      }
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
	  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
	  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    event.preventDefault();
	    Dropdown.getOrCreateInstance(this).toggle();
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Dropdown to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Dropdown);

	  return Dropdown;

	}));

	}(dropdown$1));

	var dropdown = /*@__PURE__*/getDefaultExportFromCjs(dropdown$1.exports);

	var modal$1 = {exports: {}};

	/*!
	  * Bootstrap modal.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/scrollBar.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	  const SELECTOR_STICKY_CONTENT = '.sticky-top';

	  class ScrollBarHelper {
	    constructor() {
	      this._element = document.body;
	    }

	    getWidth() {
	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	      const documentWidth = document.documentElement.clientWidth;
	      return Math.abs(window.innerWidth - documentWidth);
	    }

	    hide() {
	      const width = this.getWidth();

	      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


	      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


	      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

	      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
	    }

	    _disableOverFlow() {
	      this._saveInitialAttribute(this._element, 'overflow');

	      this._element.style.overflow = 'hidden';
	    }

	    _setElementAttributes(selector, styleProp, callback) {
	      const scrollbarWidth = this.getWidth();

	      const manipulationCallBack = element => {
	        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	          return;
	        }

	        this._saveInitialAttribute(element, styleProp);

	        const calculatedValue = window.getComputedStyle(element)[styleProp];
	        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    reset() {
	      this._resetElementAttributes(this._element, 'overflow');

	      this._resetElementAttributes(this._element, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
	    }

	    _saveInitialAttribute(element, styleProp) {
	      const actualValue = element.style[styleProp];

	      if (actualValue) {
	        Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
	      }
	    }

	    _resetElementAttributes(selector, styleProp) {
	      const manipulationCallBack = element => {
	        const value = Manipulator__default.default.getDataAttribute(element, styleProp);

	        if (typeof value === 'undefined') {
	          element.style.removeProperty(styleProp);
	        } else {
	          Manipulator__default.default.removeDataAttribute(element, styleProp);
	          element.style[styleProp] = value;
	        }
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    _applyManipulationCallback(selector, callBack) {
	      if (isElement(selector)) {
	        callBack(selector);
	      } else {
	        SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
	      }
	    }

	    isOverflowing() {
	      return this.getWidth() > 0;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/backdrop.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$2 = {
	    className: 'modal-backdrop',
	    isVisible: true,
	    // if false, we use the backdrop helper without adding any element to the dom
	    isAnimated: false,
	    rootElement: 'body',
	    // give the choice to place backdrop under different elements
	    clickCallback: null
	  };
	  const DefaultType$2 = {
	    className: 'string',
	    isVisible: 'boolean',
	    isAnimated: 'boolean',
	    rootElement: '(element|string)',
	    clickCallback: '(function|null)'
	  };
	  const NAME$2 = 'backdrop';
	  const CLASS_NAME_FADE$1 = 'fade';
	  const CLASS_NAME_SHOW$1 = 'show';
	  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;

	  class Backdrop {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isAppended = false;
	      this._element = null;
	    }

	    show(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._append();

	      if (this._config.isAnimated) {
	        reflow(this._getElement());
	      }

	      this._getElement().classList.add(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        execute(callback);
	      });
	    }

	    hide(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._getElement().classList.remove(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        this.dispose();
	        execute(callback);
	      });
	    } // Private


	    _getElement() {
	      if (!this._element) {
	        const backdrop = document.createElement('div');
	        backdrop.className = this._config.className;

	        if (this._config.isAnimated) {
	          backdrop.classList.add(CLASS_NAME_FADE$1);
	        }

	        this._element = backdrop;
	      }

	      return this._element;
	    }

	    _getConfig(config) {
	      config = { ...Default$2,
	        ...(typeof config === 'object' ? config : {})
	      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

	      config.rootElement = getElement(config.rootElement);
	      typeCheckConfig(NAME$2, config, DefaultType$2);
	      return config;
	    }

	    _append() {
	      if (this._isAppended) {
	        return;
	      }

	      this._config.rootElement.append(this._getElement());

	      EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
	        execute(this._config.clickCallback);
	      });
	      this._isAppended = true;
	    }

	    dispose() {
	      if (!this._isAppended) {
	        return;
	      }

	      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

	      this._element.remove();

	      this._isAppended = false;
	    }

	    _emulateAnimation(callback) {
	      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/focustrap.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$1 = {
	    trapElement: null,
	    // The element to trap focus inside of
	    autofocus: true
	  };
	  const DefaultType$1 = {
	    trapElement: 'element',
	    autofocus: 'boolean'
	  };
	  const NAME$1 = 'focustrap';
	  const DATA_KEY$1 = 'bs.focustrap';
	  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
	  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
	  const TAB_KEY = 'Tab';
	  const TAB_NAV_FORWARD = 'forward';
	  const TAB_NAV_BACKWARD = 'backward';

	  class FocusTrap {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isActive = false;
	      this._lastTabNavDirection = null;
	    }

	    activate() {
	      const {
	        trapElement,
	        autofocus
	      } = this._config;

	      if (this._isActive) {
	        return;
	      }

	      if (autofocus) {
	        trapElement.focus();
	      }

	      EventHandler__default.default.off(document, EVENT_KEY$1); // guard against infinite focus loop

	      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
	      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	      this._isActive = true;
	    }

	    deactivate() {
	      if (!this._isActive) {
	        return;
	      }

	      this._isActive = false;
	      EventHandler__default.default.off(document, EVENT_KEY$1);
	    } // Private


	    _handleFocusin(event) {
	      const {
	        target
	      } = event;
	      const {
	        trapElement
	      } = this._config;

	      if (target === document || target === trapElement || trapElement.contains(target)) {
	        return;
	      }

	      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

	      if (elements.length === 0) {
	        trapElement.focus();
	      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	        elements[elements.length - 1].focus();
	      } else {
	        elements[0].focus();
	      }
	    }

	    _handleKeydown(event) {
	      if (event.key !== TAB_KEY) {
	        return;
	      }

	      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	    }

	    _getConfig(config) {
	      config = { ...Default$1,
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME$1, config, DefaultType$1);
	      return config;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): modal.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'modal';
	  const DATA_KEY = 'bs.modal';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const ESCAPE_KEY = 'Escape';
	  const Default = {
	    backdrop: true,
	    keyboard: true,
	    focus: true
	  };
	  const DefaultType = {
	    backdrop: '(boolean|string)',
	    keyboard: 'boolean',
	    focus: 'boolean'
	  };
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_RESIZE = `resize${EVENT_KEY}`;
	  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
	  const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
	  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_OPEN = 'modal-open';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_STATIC = 'modal-static';
	  const OPEN_SELECTOR = '.modal.show';
	  const SELECTOR_DIALOG = '.modal-dialog';
	  const SELECTOR_MODAL_BODY = '.modal-body';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Modal extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._config = this._getConfig(config);
	      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
	      this._backdrop = this._initializeBackDrop();
	      this._focustrap = this._initializeFocusTrap();
	      this._isShown = false;
	      this._ignoreBackdropClick = false;
	      this._isTransitioning = false;
	      this._scrollBar = new ScrollBarHelper();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    toggle(relatedTarget) {
	      return this._isShown ? this.hide() : this.show(relatedTarget);
	    }

	    show(relatedTarget) {
	      if (this._isShown || this._isTransitioning) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget
	      });

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = true;

	      if (this._isAnimated()) {
	        this._isTransitioning = true;
	      }

	      this._scrollBar.hide();

	      document.body.classList.add(CLASS_NAME_OPEN);

	      this._adjustDialog();

	      this._setEscapeEvent();

	      this._setResizeEvent();

	      EventHandler__default.default.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
	        EventHandler__default.default.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
	          if (event.target === this._element) {
	            this._ignoreBackdropClick = true;
	          }
	        });
	      });

	      this._showBackdrop(() => this._showElement(relatedTarget));
	    }

	    hide() {
	      if (!this._isShown || this._isTransitioning) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = false;

	      const isAnimated = this._isAnimated();

	      if (isAnimated) {
	        this._isTransitioning = true;
	      }

	      this._setEscapeEvent();

	      this._setResizeEvent();

	      this._focustrap.deactivate();

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      EventHandler__default.default.off(this._element, EVENT_CLICK_DISMISS);
	      EventHandler__default.default.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

	      this._queueCallback(() => this._hideModal(), this._element, isAnimated);
	    }

	    dispose() {
	      [window, this._dialog].forEach(htmlElement => EventHandler__default.default.off(htmlElement, EVENT_KEY));

	      this._backdrop.dispose();

	      this._focustrap.deactivate();

	      super.dispose();
	    }

	    handleUpdate() {
	      this._adjustDialog();
	    } // Private


	    _initializeBackDrop() {
	      return new Backdrop({
	        isVisible: Boolean(this._config.backdrop),
	        // 'static' option will be translated to true, and booleans will keep their value
	        isAnimated: this._isAnimated()
	      });
	    }

	    _initializeFocusTrap() {
	      return new FocusTrap({
	        trapElement: this._element
	      });
	    }

	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _showElement(relatedTarget) {
	      const isAnimated = this._isAnimated();

	      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);

	      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
	        // Don't move modal's DOM position
	        document.body.append(this._element);
	      }

	      this._element.style.display = 'block';

	      this._element.removeAttribute('aria-hidden');

	      this._element.setAttribute('aria-modal', true);

	      this._element.setAttribute('role', 'dialog');

	      this._element.scrollTop = 0;

	      if (modalBody) {
	        modalBody.scrollTop = 0;
	      }

	      if (isAnimated) {
	        reflow(this._element);
	      }

	      this._element.classList.add(CLASS_NAME_SHOW);

	      const transitionComplete = () => {
	        if (this._config.focus) {
	          this._focustrap.activate();
	        }

	        this._isTransitioning = false;
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget
	        });
	      };

	      this._queueCallback(transitionComplete, this._dialog, isAnimated);
	    }

	    _setEscapeEvent() {
	      if (this._isShown) {
	        EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	          if (this._config.keyboard && event.key === ESCAPE_KEY) {
	            event.preventDefault();
	            this.hide();
	          } else if (!this._config.keyboard && event.key === ESCAPE_KEY) {
	            this._triggerBackdropTransition();
	          }
	        });
	      } else {
	        EventHandler__default.default.off(this._element, EVENT_KEYDOWN_DISMISS);
	      }
	    }

	    _setResizeEvent() {
	      if (this._isShown) {
	        EventHandler__default.default.on(window, EVENT_RESIZE, () => this._adjustDialog());
	      } else {
	        EventHandler__default.default.off(window, EVENT_RESIZE);
	      }
	    }

	    _hideModal() {
	      this._element.style.display = 'none';

	      this._element.setAttribute('aria-hidden', true);

	      this._element.removeAttribute('aria-modal');

	      this._element.removeAttribute('role');

	      this._isTransitioning = false;

	      this._backdrop.hide(() => {
	        document.body.classList.remove(CLASS_NAME_OPEN);

	        this._resetAdjustments();

	        this._scrollBar.reset();

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      });
	    }

	    _showBackdrop(callback) {
	      EventHandler__default.default.on(this._element, EVENT_CLICK_DISMISS, event => {
	        if (this._ignoreBackdropClick) {
	          this._ignoreBackdropClick = false;
	          return;
	        }

	        if (event.target !== event.currentTarget) {
	          return;
	        }

	        if (this._config.backdrop === true) {
	          this.hide();
	        } else if (this._config.backdrop === 'static') {
	          this._triggerBackdropTransition();
	        }
	      });

	      this._backdrop.show(callback);
	    }

	    _isAnimated() {
	      return this._element.classList.contains(CLASS_NAME_FADE);
	    }

	    _triggerBackdropTransition() {
	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      const {
	        classList,
	        scrollHeight,
	        style
	      } = this._element;
	      const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

	      if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
	        return;
	      }

	      if (!isModalOverflowing) {
	        style.overflowY = 'hidden';
	      }

	      classList.add(CLASS_NAME_STATIC);

	      this._queueCallback(() => {
	        classList.remove(CLASS_NAME_STATIC);

	        if (!isModalOverflowing) {
	          this._queueCallback(() => {
	            style.overflowY = '';
	          }, this._dialog);
	        }
	      }, this._dialog);

	      this._element.focus();
	    } // ----------------------------------------------------------------------
	    // the following methods are used to handle overflowing modals
	    // ----------------------------------------------------------------------


	    _adjustDialog() {
	      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

	      const scrollbarWidth = this._scrollBar.getWidth();

	      const isBodyOverflowing = scrollbarWidth > 0;

	      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
	        this._element.style.paddingLeft = `${scrollbarWidth}px`;
	      }

	      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
	        this._element.style.paddingRight = `${scrollbarWidth}px`;
	      }
	    }

	    _resetAdjustments() {
	      this._element.style.paddingLeft = '';
	      this._element.style.paddingRight = '';
	    } // Static


	    static jQueryInterface(config, relatedTarget) {
	      return this.each(function () {
	        const data = Modal.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](relatedTarget);
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    const target = getElementFromSelector(this);

	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
	      if (showEvent.defaultPrevented) {
	        // only register focus restorer if modal will actually get shown
	        return;
	      }

	      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
	        if (isVisible(this)) {
	          this.focus();
	        }
	      });
	    }); // avoid conflict when clicking moddal toggler while another one is open

	    const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

	    if (allReadyOpen) {
	      Modal.getInstance(allReadyOpen).hide();
	    }

	    const data = Modal.getOrCreateInstance(target);
	    data.toggle(this);
	  });
	  enableDismissTrigger(Modal);
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Modal to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Modal);

	  return Modal;

	}));

	}(modal$1));

	var modal = modal$1.exports;

	var offcanvas$1 = {exports: {}};

	/*!
	  * Bootstrap offcanvas.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(selectorEngine.exports, manipulator.exports, eventHandler.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (SelectorEngine, Manipulator, EventHandler, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MILLISECONDS_MULTIPLIER = 1000;
	  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const getTransitionDurationFromElement = element => {
	    if (!element) {
	      return 0;
	    } // Get transition-duration of the element


	    let {
	      transitionDuration,
	      transitionDelay
	    } = window.getComputedStyle(element);
	    const floatTransitionDuration = Number.parseFloat(transitionDuration);
	    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	    if (!floatTransitionDuration && !floatTransitionDelay) {
	      return 0;
	    } // If multiple durations are defined, take the first


	    transitionDuration = transitionDuration.split(',')[0];
	    transitionDelay = transitionDelay.split(',')[0];
	    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	  };

	  const triggerTransitionEnd = element => {
	    element.dispatchEvent(new Event(TRANSITION_END));
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isVisible = element => {
	    if (!isElement(element) || element.getClientRects().length === 0) {
	      return false;
	    }

	    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  const execute = callback => {
	    if (typeof callback === 'function') {
	      callback();
	    }
	  };

	  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	    if (!waitForTransition) {
	      execute(callback);
	      return;
	    }

	    const durationPadding = 5;
	    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	    let called = false;

	    const handler = ({
	      target
	    }) => {
	      if (target !== transitionElement) {
	        return;
	      }

	      called = true;
	      transitionElement.removeEventListener(TRANSITION_END, handler);
	      execute(callback);
	    };

	    transitionElement.addEventListener(TRANSITION_END, handler);
	    setTimeout(() => {
	      if (!called) {
	        triggerTransitionEnd(transitionElement);
	      }
	    }, emulatedDuration);
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/scrollBar.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	  const SELECTOR_STICKY_CONTENT = '.sticky-top';

	  class ScrollBarHelper {
	    constructor() {
	      this._element = document.body;
	    }

	    getWidth() {
	      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	      const documentWidth = document.documentElement.clientWidth;
	      return Math.abs(window.innerWidth - documentWidth);
	    }

	    hide() {
	      const width = this.getWidth();

	      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


	      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


	      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

	      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
	    }

	    _disableOverFlow() {
	      this._saveInitialAttribute(this._element, 'overflow');

	      this._element.style.overflow = 'hidden';
	    }

	    _setElementAttributes(selector, styleProp, callback) {
	      const scrollbarWidth = this.getWidth();

	      const manipulationCallBack = element => {
	        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	          return;
	        }

	        this._saveInitialAttribute(element, styleProp);

	        const calculatedValue = window.getComputedStyle(element)[styleProp];
	        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    reset() {
	      this._resetElementAttributes(this._element, 'overflow');

	      this._resetElementAttributes(this._element, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

	      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
	    }

	    _saveInitialAttribute(element, styleProp) {
	      const actualValue = element.style[styleProp];

	      if (actualValue) {
	        Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
	      }
	    }

	    _resetElementAttributes(selector, styleProp) {
	      const manipulationCallBack = element => {
	        const value = Manipulator__default.default.getDataAttribute(element, styleProp);

	        if (typeof value === 'undefined') {
	          element.style.removeProperty(styleProp);
	        } else {
	          Manipulator__default.default.removeDataAttribute(element, styleProp);
	          element.style[styleProp] = value;
	        }
	      };

	      this._applyManipulationCallback(selector, manipulationCallBack);
	    }

	    _applyManipulationCallback(selector, callBack) {
	      if (isElement(selector)) {
	        callBack(selector);
	      } else {
	        SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
	      }
	    }

	    isOverflowing() {
	      return this.getWidth() > 0;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/backdrop.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$2 = {
	    className: 'modal-backdrop',
	    isVisible: true,
	    // if false, we use the backdrop helper without adding any element to the dom
	    isAnimated: false,
	    rootElement: 'body',
	    // give the choice to place backdrop under different elements
	    clickCallback: null
	  };
	  const DefaultType$2 = {
	    className: 'string',
	    isVisible: 'boolean',
	    isAnimated: 'boolean',
	    rootElement: '(element|string)',
	    clickCallback: '(function|null)'
	  };
	  const NAME$2 = 'backdrop';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW$1 = 'show';
	  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;

	  class Backdrop {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isAppended = false;
	      this._element = null;
	    }

	    show(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._append();

	      if (this._config.isAnimated) {
	        reflow(this._getElement());
	      }

	      this._getElement().classList.add(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        execute(callback);
	      });
	    }

	    hide(callback) {
	      if (!this._config.isVisible) {
	        execute(callback);
	        return;
	      }

	      this._getElement().classList.remove(CLASS_NAME_SHOW$1);

	      this._emulateAnimation(() => {
	        this.dispose();
	        execute(callback);
	      });
	    } // Private


	    _getElement() {
	      if (!this._element) {
	        const backdrop = document.createElement('div');
	        backdrop.className = this._config.className;

	        if (this._config.isAnimated) {
	          backdrop.classList.add(CLASS_NAME_FADE);
	        }

	        this._element = backdrop;
	      }

	      return this._element;
	    }

	    _getConfig(config) {
	      config = { ...Default$2,
	        ...(typeof config === 'object' ? config : {})
	      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

	      config.rootElement = getElement(config.rootElement);
	      typeCheckConfig(NAME$2, config, DefaultType$2);
	      return config;
	    }

	    _append() {
	      if (this._isAppended) {
	        return;
	      }

	      this._config.rootElement.append(this._getElement());

	      EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
	        execute(this._config.clickCallback);
	      });
	      this._isAppended = true;
	    }

	    dispose() {
	      if (!this._isAppended) {
	        return;
	      }

	      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);

	      this._element.remove();

	      this._isAppended = false;
	    }

	    _emulateAnimation(callback) {
	      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/focustrap.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const Default$1 = {
	    trapElement: null,
	    // The element to trap focus inside of
	    autofocus: true
	  };
	  const DefaultType$1 = {
	    trapElement: 'element',
	    autofocus: 'boolean'
	  };
	  const NAME$1 = 'focustrap';
	  const DATA_KEY$1 = 'bs.focustrap';
	  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
	  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
	  const TAB_KEY = 'Tab';
	  const TAB_NAV_FORWARD = 'forward';
	  const TAB_NAV_BACKWARD = 'backward';

	  class FocusTrap {
	    constructor(config) {
	      this._config = this._getConfig(config);
	      this._isActive = false;
	      this._lastTabNavDirection = null;
	    }

	    activate() {
	      const {
	        trapElement,
	        autofocus
	      } = this._config;

	      if (this._isActive) {
	        return;
	      }

	      if (autofocus) {
	        trapElement.focus();
	      }

	      EventHandler__default.default.off(document, EVENT_KEY$1); // guard against infinite focus loop

	      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
	      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	      this._isActive = true;
	    }

	    deactivate() {
	      if (!this._isActive) {
	        return;
	      }

	      this._isActive = false;
	      EventHandler__default.default.off(document, EVENT_KEY$1);
	    } // Private


	    _handleFocusin(event) {
	      const {
	        target
	      } = event;
	      const {
	        trapElement
	      } = this._config;

	      if (target === document || target === trapElement || trapElement.contains(target)) {
	        return;
	      }

	      const elements = SelectorEngine__default.default.focusableChildren(trapElement);

	      if (elements.length === 0) {
	        trapElement.focus();
	      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	        elements[elements.length - 1].focus();
	      } else {
	        elements[0].focus();
	      }
	    }

	    _handleKeydown(event) {
	      if (event.key !== TAB_KEY) {
	        return;
	      }

	      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	    }

	    _getConfig(config) {
	      config = { ...Default$1,
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME$1, config, DefaultType$1);
	      return config;
	    }

	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): offcanvas.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'offcanvas';
	  const DATA_KEY = 'bs.offcanvas';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const ESCAPE_KEY = 'Escape';
	  const Default = {
	    backdrop: true,
	    keyboard: true,
	    scroll: false
	  };
	  const DefaultType = {
	    backdrop: 'boolean',
	    keyboard: 'boolean',
	    scroll: 'boolean'
	  };
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
	  const OPEN_SELECTOR = '.offcanvas.show';
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Offcanvas extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._config = this._getConfig(config);
	      this._isShown = false;
	      this._backdrop = this._initializeBackDrop();
	      this._focustrap = this._initializeFocusTrap();

	      this._addEventListeners();
	    } // Getters


	    static get NAME() {
	      return NAME;
	    }

	    static get Default() {
	      return Default;
	    } // Public


	    toggle(relatedTarget) {
	      return this._isShown ? this.hide() : this.show(relatedTarget);
	    }

	    show(relatedTarget) {
	      if (this._isShown) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget
	      });

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._isShown = true;
	      this._element.style.visibility = 'visible';

	      this._backdrop.show();

	      if (!this._config.scroll) {
	        new ScrollBarHelper().hide();
	      }

	      this._element.removeAttribute('aria-hidden');

	      this._element.setAttribute('aria-modal', true);

	      this._element.setAttribute('role', 'dialog');

	      this._element.classList.add(CLASS_NAME_SHOW);

	      const completeCallBack = () => {
	        if (!this._config.scroll) {
	          this._focustrap.activate();
	        }

	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget
	        });
	      };

	      this._queueCallback(completeCallBack, this._element, true);
	    }

	    hide() {
	      if (!this._isShown) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      this._focustrap.deactivate();

	      this._element.blur();

	      this._isShown = false;

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      this._backdrop.hide();

	      const completeCallback = () => {
	        this._element.setAttribute('aria-hidden', true);

	        this._element.removeAttribute('aria-modal');

	        this._element.removeAttribute('role');

	        this._element.style.visibility = 'hidden';

	        if (!this._config.scroll) {
	          new ScrollBarHelper().reset();
	        }

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._queueCallback(completeCallback, this._element, true);
	    }

	    dispose() {
	      this._backdrop.dispose();

	      this._focustrap.deactivate();

	      super.dispose();
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' ? config : {})
	      };
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _initializeBackDrop() {
	      return new Backdrop({
	        className: CLASS_NAME_BACKDROP,
	        isVisible: this._config.backdrop,
	        isAnimated: true,
	        rootElement: this._element.parentNode,
	        clickCallback: () => this.hide()
	      });
	    }

	    _initializeFocusTrap() {
	      return new FocusTrap({
	        trapElement: this._element
	      });
	    }

	    _addEventListeners() {
	      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	        if (this._config.keyboard && event.key === ESCAPE_KEY) {
	          this.hide();
	        }
	      });
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Offcanvas.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](this);
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    const target = getElementFromSelector(this);

	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    if (isDisabled(this)) {
	      return;
	    }

	    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
	      // focus on trigger when it is closed
	      if (isVisible(this)) {
	        this.focus();
	      }
	    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

	    const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);

	    if (allReadyOpen && allReadyOpen !== target) {
	      Offcanvas.getInstance(allReadyOpen).hide();
	    }

	    const data = Offcanvas.getOrCreateInstance(target);
	    data.toggle(this);
	  });
	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => SelectorEngine__default.default.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show()));
	  enableDismissTrigger(Offcanvas);
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  defineJQueryPlugin(Offcanvas);

	  return Offcanvas;

	}));

	}(offcanvas$1));

	var offcanvas = offcanvas$1.exports;

	var popover$1 = {exports: {}};

	var tooltip$1 = {exports: {}};

	/*!
	  * Bootstrap tooltip.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(require$$0, data.exports, eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (Popper, Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  function _interopNamespace(e) {
	    if (e && e.__esModule) return e;
	    const n = Object.create(null);
	    if (e) {
	      for (const k in e) {
	        if (k !== 'default') {
	          const d = Object.getOwnPropertyDescriptor(e, k);
	          Object.defineProperty(n, k, d.get ? d : {
	            enumerable: true,
	            get: () => e[k]
	          });
	        }
	      }
	    }
	    n.default = e;
	    return Object.freeze(n);
	  }

	  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
	  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const MAX_UID = 1000000;

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };
	  /**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */


	  const getUID = prefix => {
	    do {
	      prefix += Math.floor(Math.random() * MAX_UID);
	    } while (document.getElementById(prefix));

	    return prefix;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const findShadowRoot = element => {
	    if (!document.documentElement.attachShadow) {
	      return null;
	    } // Can find the shadow root otherwise it'll return the document


	    if (typeof element.getRootNode === 'function') {
	      const root = element.getRootNode();
	      return root instanceof ShadowRoot ? root : null;
	    }

	    if (element instanceof ShadowRoot) {
	      return element;
	    } // when we don't find a shadow root


	    if (!element.parentNode) {
	      return null;
	    }

	    return findShadowRoot(element.parentNode);
	  };

	  const noop = () => {};

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const isRTL = () => document.documentElement.dir === 'rtl';

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/sanitizer.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
	  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	  /**
	   * A pattern that recognizes a commonly useful subset of URLs that are safe.
	   *
	   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
	   */

	  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
	  /**
	   * A pattern that matches safe data URLs. Only matches image, video and audio types.
	   *
	   * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
	   */

	  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

	  const allowedAttribute = (attribute, allowedAttributeList) => {
	    const attributeName = attribute.nodeName.toLowerCase();

	    if (allowedAttributeList.includes(attributeName)) {
	      if (uriAttributes.has(attributeName)) {
	        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
	      }

	      return true;
	    }

	    const regExp = allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp); // Check if a regular expression validates the attribute.

	    for (let i = 0, len = regExp.length; i < len; i++) {
	      if (regExp[i].test(attributeName)) {
	        return true;
	      }
	    }

	    return false;
	  };

	  const DefaultAllowlist = {
	    // Global attributes allowed on any supplied element below.
	    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
	    a: ['target', 'href', 'title', 'rel'],
	    area: [],
	    b: [],
	    br: [],
	    col: [],
	    code: [],
	    div: [],
	    em: [],
	    hr: [],
	    h1: [],
	    h2: [],
	    h3: [],
	    h4: [],
	    h5: [],
	    h6: [],
	    i: [],
	    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
	    li: [],
	    ol: [],
	    p: [],
	    pre: [],
	    s: [],
	    small: [],
	    span: [],
	    sub: [],
	    sup: [],
	    strong: [],
	    u: [],
	    ul: []
	  };
	  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
	    if (!unsafeHtml.length) {
	      return unsafeHtml;
	    }

	    if (sanitizeFn && typeof sanitizeFn === 'function') {
	      return sanitizeFn(unsafeHtml);
	    }

	    const domParser = new window.DOMParser();
	    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

	    for (let i = 0, len = elements.length; i < len; i++) {
	      const element = elements[i];
	      const elementName = element.nodeName.toLowerCase();

	      if (!Object.keys(allowList).includes(elementName)) {
	        element.remove();
	        continue;
	      }

	      const attributeList = [].concat(...element.attributes);
	      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
	      attributeList.forEach(attribute => {
	        if (!allowedAttribute(attribute, allowedAttributes)) {
	          element.removeAttribute(attribute.nodeName);
	        }
	      });
	    }

	    return createdDocument.body.innerHTML;
	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): tooltip.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'tooltip';
	  const DATA_KEY = 'bs.tooltip';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const CLASS_PREFIX = 'bs-tooltip';
	  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	  const DefaultType = {
	    animation: 'boolean',
	    template: 'string',
	    title: '(string|element|function)',
	    trigger: 'string',
	    delay: '(number|object)',
	    html: 'boolean',
	    selector: '(string|boolean)',
	    placement: '(string|function)',
	    offset: '(array|string|function)',
	    container: '(string|element|boolean)',
	    fallbackPlacements: 'array',
	    boundary: '(string|element)',
	    customClass: '(string|function)',
	    sanitize: 'boolean',
	    sanitizeFn: '(null|function)',
	    allowList: 'object',
	    popperConfig: '(null|object|function)'
	  };
	  const AttachmentMap = {
	    AUTO: 'auto',
	    TOP: 'top',
	    RIGHT: isRTL() ? 'left' : 'right',
	    BOTTOM: 'bottom',
	    LEFT: isRTL() ? 'right' : 'left'
	  };
	  const Default = {
	    animation: true,
	    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    selector: false,
	    placement: 'top',
	    offset: [0, 0],
	    container: false,
	    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
	    boundary: 'clippingParents',
	    customClass: '',
	    sanitize: true,
	    sanitizeFn: null,
	    allowList: DefaultAllowlist,
	    popperConfig: null
	  };
	  const Event = {
	    HIDE: `hide${EVENT_KEY}`,
	    HIDDEN: `hidden${EVENT_KEY}`,
	    SHOW: `show${EVENT_KEY}`,
	    SHOWN: `shown${EVENT_KEY}`,
	    INSERTED: `inserted${EVENT_KEY}`,
	    CLICK: `click${EVENT_KEY}`,
	    FOCUSIN: `focusin${EVENT_KEY}`,
	    FOCUSOUT: `focusout${EVENT_KEY}`,
	    MOUSEENTER: `mouseenter${EVENT_KEY}`,
	    MOUSELEAVE: `mouseleave${EVENT_KEY}`
	  };
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_MODAL = 'modal';
	  const CLASS_NAME_SHOW = 'show';
	  const HOVER_STATE_SHOW = 'show';
	  const HOVER_STATE_OUT = 'out';
	  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
	  const EVENT_MODAL_HIDE = 'hide.bs.modal';
	  const TRIGGER_HOVER = 'hover';
	  const TRIGGER_FOCUS = 'focus';
	  const TRIGGER_CLICK = 'click';
	  const TRIGGER_MANUAL = 'manual';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Tooltip extends BaseComponent__default.default {
	    constructor(element, config) {
	      if (typeof Popper__namespace === 'undefined') {
	        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
	      }

	      super(element); // private

	      this._isEnabled = true;
	      this._timeout = 0;
	      this._hoverState = '';
	      this._activeTrigger = {};
	      this._popper = null; // Protected

	      this._config = this._getConfig(config);
	      this.tip = null;

	      this._setListeners();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    }

	    static get Event() {
	      return Event;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    } // Public


	    enable() {
	      this._isEnabled = true;
	    }

	    disable() {
	      this._isEnabled = false;
	    }

	    toggleEnabled() {
	      this._isEnabled = !this._isEnabled;
	    }

	    toggle(event) {
	      if (!this._isEnabled) {
	        return;
	      }

	      if (event) {
	        const context = this._initializeOnDelegatedTarget(event);

	        context._activeTrigger.click = !context._activeTrigger.click;

	        if (context._isWithActiveTrigger()) {
	          context._enter(null, context);
	        } else {
	          context._leave(null, context);
	        }
	      } else {
	        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW)) {
	          this._leave(null, this);

	          return;
	        }

	        this._enter(null, this);
	      }
	    }

	    dispose() {
	      clearTimeout(this._timeout);
	      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

	      if (this.tip) {
	        this.tip.remove();
	      }

	      this._disposePopper();

	      super.dispose();
	    }

	    show() {
	      if (this._element.style.display === 'none') {
	        throw new Error('Please use show on visible elements');
	      }

	      if (!(this.isWithContent() && this._isEnabled)) {
	        return;
	      }

	      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.Event.SHOW);
	      const shadowRoot = findShadowRoot(this._element);
	      const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

	      if (showEvent.defaultPrevented || !isInTheDom) {
	        return;
	      } // A trick to recreate a tooltip in case a new title is given by using the NOT documented `data-bs-original-title`
	      // This will be removed later in favor of a `setContent` method


	      if (this.constructor.NAME === 'tooltip' && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
	        this._disposePopper();

	        this.tip.remove();
	        this.tip = null;
	      }

	      const tip = this.getTipElement();
	      const tipId = getUID(this.constructor.NAME);
	      tip.setAttribute('id', tipId);

	      this._element.setAttribute('aria-describedby', tipId);

	      if (this._config.animation) {
	        tip.classList.add(CLASS_NAME_FADE);
	      }

	      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

	      const attachment = this._getAttachment(placement);

	      this._addAttachmentClass(attachment);

	      const {
	        container
	      } = this._config;
	      Data__default.default.set(tip, this.constructor.DATA_KEY, this);

	      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	        container.append(tip);
	        EventHandler__default.default.trigger(this._element, this.constructor.Event.INSERTED);
	      }

	      if (this._popper) {
	        this._popper.update();
	      } else {
	        this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
	      }

	      tip.classList.add(CLASS_NAME_SHOW);

	      const customClass = this._resolvePossibleFunction(this._config.customClass);

	      if (customClass) {
	        tip.classList.add(...customClass.split(' '));
	      } // If this is a touch-enabled device we add extra
	      // empty mouseover listeners to the body's immediate children;
	      // only needed because of broken event delegation on iOS
	      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


	      if ('ontouchstart' in document.documentElement) {
	        [].concat(...document.body.children).forEach(element => {
	          EventHandler__default.default.on(element, 'mouseover', noop);
	        });
	      }

	      const complete = () => {
	        const prevHoverState = this._hoverState;
	        this._hoverState = null;
	        EventHandler__default.default.trigger(this._element, this.constructor.Event.SHOWN);

	        if (prevHoverState === HOVER_STATE_OUT) {
	          this._leave(null, this);
	        }
	      };

	      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE);

	      this._queueCallback(complete, this.tip, isAnimated);
	    }

	    hide() {
	      if (!this._popper) {
	        return;
	      }

	      const tip = this.getTipElement();

	      const complete = () => {
	        if (this._isWithActiveTrigger()) {
	          return;
	        }

	        if (this._hoverState !== HOVER_STATE_SHOW) {
	          tip.remove();
	        }

	        this._cleanTipClass();

	        this._element.removeAttribute('aria-describedby');

	        EventHandler__default.default.trigger(this._element, this.constructor.Event.HIDDEN);

	        this._disposePopper();
	      };

	      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.Event.HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
	      // empty mouseover listeners we added for iOS support

	      if ('ontouchstart' in document.documentElement) {
	        [].concat(...document.body.children).forEach(element => EventHandler__default.default.off(element, 'mouseover', noop));
	      }

	      this._activeTrigger[TRIGGER_CLICK] = false;
	      this._activeTrigger[TRIGGER_FOCUS] = false;
	      this._activeTrigger[TRIGGER_HOVER] = false;
	      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE);

	      this._queueCallback(complete, this.tip, isAnimated);

	      this._hoverState = '';
	    }

	    update() {
	      if (this._popper !== null) {
	        this._popper.update();
	      }
	    } // Protected


	    isWithContent() {
	      return Boolean(this.getTitle());
	    }

	    getTipElement() {
	      if (this.tip) {
	        return this.tip;
	      }

	      const element = document.createElement('div');
	      element.innerHTML = this._config.template;
	      const tip = element.children[0];
	      this.setContent(tip);
	      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
	      this.tip = tip;
	      return this.tip;
	    }

	    setContent(tip) {
	      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
	    }

	    _sanitizeAndSetContent(template, content, selector) {
	      const templateElement = SelectorEngine__default.default.findOne(selector, template);

	      if (!content && templateElement) {
	        templateElement.remove();
	        return;
	      } // we use append for html objects to maintain js events


	      this.setElementContent(templateElement, content);
	    }

	    setElementContent(element, content) {
	      if (element === null) {
	        return;
	      }

	      if (isElement(content)) {
	        content = getElement(content); // content is a DOM node or a jQuery

	        if (this._config.html) {
	          if (content.parentNode !== element) {
	            element.innerHTML = '';
	            element.append(content);
	          }
	        } else {
	          element.textContent = content.textContent;
	        }

	        return;
	      }

	      if (this._config.html) {
	        if (this._config.sanitize) {
	          content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
	        }

	        element.innerHTML = content;
	      } else {
	        element.textContent = content;
	      }
	    }

	    getTitle() {
	      const title = this._element.getAttribute('data-bs-original-title') || this._config.title;

	      return this._resolvePossibleFunction(title);
	    }

	    updateAttachment(attachment) {
	      if (attachment === 'right') {
	        return 'end';
	      }

	      if (attachment === 'left') {
	        return 'start';
	      }

	      return attachment;
	    } // Private


	    _initializeOnDelegatedTarget(event, context) {
	      return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
	    }

	    _getOffset() {
	      const {
	        offset
	      } = this._config;

	      if (typeof offset === 'string') {
	        return offset.split(',').map(val => Number.parseInt(val, 10));
	      }

	      if (typeof offset === 'function') {
	        return popperData => offset(popperData, this._element);
	      }

	      return offset;
	    }

	    _resolvePossibleFunction(content) {
	      return typeof content === 'function' ? content.call(this._element) : content;
	    }

	    _getPopperConfig(attachment) {
	      const defaultBsPopperConfig = {
	        placement: attachment,
	        modifiers: [{
	          name: 'flip',
	          options: {
	            fallbackPlacements: this._config.fallbackPlacements
	          }
	        }, {
	          name: 'offset',
	          options: {
	            offset: this._getOffset()
	          }
	        }, {
	          name: 'preventOverflow',
	          options: {
	            boundary: this._config.boundary
	          }
	        }, {
	          name: 'arrow',
	          options: {
	            element: `.${this.constructor.NAME}-arrow`
	          }
	        }, {
	          name: 'onChange',
	          enabled: true,
	          phase: 'afterWrite',
	          fn: data => this._handlePopperPlacementChange(data)
	        }],
	        onFirstUpdate: data => {
	          if (data.options.placement !== data.placement) {
	            this._handlePopperPlacementChange(data);
	          }
	        }
	      };
	      return { ...defaultBsPopperConfig,
	        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	      };
	    }

	    _addAttachmentClass(attachment) {
	      this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
	    }

	    _getAttachment(placement) {
	      return AttachmentMap[placement.toUpperCase()];
	    }

	    _setListeners() {
	      const triggers = this._config.trigger.split(' ');

	      triggers.forEach(trigger => {
	        if (trigger === 'click') {
	          EventHandler__default.default.on(this._element, this.constructor.Event.CLICK, this._config.selector, event => this.toggle(event));
	        } else if (trigger !== TRIGGER_MANUAL) {
	          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
	          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
	          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => this._enter(event));
	          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => this._leave(event));
	        }
	      });

	      this._hideModalHandler = () => {
	        if (this._element) {
	          this.hide();
	        }
	      };

	      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

	      if (this._config.selector) {
	        this._config = { ...this._config,
	          trigger: 'manual',
	          selector: ''
	        };
	      } else {
	        this._fixTitle();
	      }
	    }

	    _fixTitle() {
	      const title = this._element.getAttribute('title');

	      const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

	      if (title || originalTitleType !== 'string') {
	        this._element.setAttribute('data-bs-original-title', title || '');

	        if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
	          this._element.setAttribute('aria-label', title);
	        }

	        this._element.setAttribute('title', '');
	      }
	    }

	    _enter(event, context) {
	      context = this._initializeOnDelegatedTarget(event, context);

	      if (event) {
	        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
	      }

	      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
	        context._hoverState = HOVER_STATE_SHOW;
	        return;
	      }

	      clearTimeout(context._timeout);
	      context._hoverState = HOVER_STATE_SHOW;

	      if (!context._config.delay || !context._config.delay.show) {
	        context.show();
	        return;
	      }

	      context._timeout = setTimeout(() => {
	        if (context._hoverState === HOVER_STATE_SHOW) {
	          context.show();
	        }
	      }, context._config.delay.show);
	    }

	    _leave(event, context) {
	      context = this._initializeOnDelegatedTarget(event, context);

	      if (event) {
	        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
	      }

	      if (context._isWithActiveTrigger()) {
	        return;
	      }

	      clearTimeout(context._timeout);
	      context._hoverState = HOVER_STATE_OUT;

	      if (!context._config.delay || !context._config.delay.hide) {
	        context.hide();
	        return;
	      }

	      context._timeout = setTimeout(() => {
	        if (context._hoverState === HOVER_STATE_OUT) {
	          context.hide();
	        }
	      }, context._config.delay.hide);
	    }

	    _isWithActiveTrigger() {
	      for (const trigger in this._activeTrigger) {
	        if (this._activeTrigger[trigger]) {
	          return true;
	        }
	      }

	      return false;
	    }

	    _getConfig(config) {
	      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);
	      Object.keys(dataAttributes).forEach(dataAttr => {
	        if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
	          delete dataAttributes[dataAttr];
	        }
	      });
	      config = { ...this.constructor.Default,
	        ...dataAttributes,
	        ...(typeof config === 'object' && config ? config : {})
	      };
	      config.container = config.container === false ? document.body : getElement(config.container);

	      if (typeof config.delay === 'number') {
	        config.delay = {
	          show: config.delay,
	          hide: config.delay
	        };
	      }

	      if (typeof config.title === 'number') {
	        config.title = config.title.toString();
	      }

	      if (typeof config.content === 'number') {
	        config.content = config.content.toString();
	      }

	      typeCheckConfig(NAME, config, this.constructor.DefaultType);

	      if (config.sanitize) {
	        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
	      }

	      return config;
	    }

	    _getDelegateConfig() {
	      const config = {};

	      for (const key in this._config) {
	        if (this.constructor.Default[key] !== this._config[key]) {
	          config[key] = this._config[key];
	        }
	      } // In the future can be replaced with:
	      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
	      // `Object.fromEntries(keysWithDifferentValues)`


	      return config;
	    }

	    _cleanTipClass() {
	      const tip = this.getTipElement();
	      const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, 'g');
	      const tabClass = tip.getAttribute('class').match(basicClassPrefixRegex);

	      if (tabClass !== null && tabClass.length > 0) {
	        tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
	      }
	    }

	    _getBasicClassPrefix() {
	      return CLASS_PREFIX;
	    }

	    _handlePopperPlacementChange(popperData) {
	      const {
	        state
	      } = popperData;

	      if (!state) {
	        return;
	      }

	      this.tip = state.elements.popper;

	      this._cleanTipClass();

	      this._addAttachmentClass(this._getAttachment(state.placement));
	    }

	    _disposePopper() {
	      if (this._popper) {
	        this._popper.destroy();

	        this._popper = null;
	      }
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Tooltip.getOrCreateInstance(this, config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Tooltip to jQuery only if jQuery is present
	   */


	  defineJQueryPlugin(Tooltip);

	  return Tooltip;

	}));

	}(tooltip$1));

	var tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip$1.exports);

	/*!
	  * Bootstrap popover.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(tooltip$1.exports) ;
	})(commonjsGlobal, (function (Tooltip) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): popover.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'popover';
	  const DATA_KEY = 'bs.popover';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const CLASS_PREFIX = 'bs-popover';
	  const Default = { ...Tooltip__default.default.Default,
	    placement: 'right',
	    offset: [0, 8],
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
	  };
	  const DefaultType = { ...Tooltip__default.default.DefaultType,
	    content: '(string|element|function)'
	  };
	  const Event = {
	    HIDE: `hide${EVENT_KEY}`,
	    HIDDEN: `hidden${EVENT_KEY}`,
	    SHOW: `show${EVENT_KEY}`,
	    SHOWN: `shown${EVENT_KEY}`,
	    INSERTED: `inserted${EVENT_KEY}`,
	    CLICK: `click${EVENT_KEY}`,
	    FOCUSIN: `focusin${EVENT_KEY}`,
	    FOCUSOUT: `focusout${EVENT_KEY}`,
	    MOUSEENTER: `mouseenter${EVENT_KEY}`,
	    MOUSELEAVE: `mouseleave${EVENT_KEY}`
	  };
	  const SELECTOR_TITLE = '.popover-header';
	  const SELECTOR_CONTENT = '.popover-body';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Popover extends Tooltip__default.default {
	    // Getters
	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    }

	    static get Event() {
	      return Event;
	    }

	    static get DefaultType() {
	      return DefaultType;
	    } // Overrides


	    isWithContent() {
	      return this.getTitle() || this._getContent();
	    }

	    setContent(tip) {
	      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);

	      this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
	    } // Private


	    _getContent() {
	      return this._resolvePossibleFunction(this._config.content);
	    }

	    _getBasicClassPrefix() {
	      return CLASS_PREFIX;
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Popover.getOrCreateInstance(this, config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Popover to jQuery only if jQuery is present
	   */


	  defineJQueryPlugin(Popover);

	  return Popover;

	}));

	}(popover$1));

	var popover = popover$1.exports;

	var scrollspy$1 = {exports: {}};

	/*!
	  * Bootstrap scrollspy.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getSelectorFromElement = element => {
	    const selector = getSelector(element);

	    if (selector) {
	      return document.querySelector(selector) ? selector : null;
	    }

	    return null;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const getElement = obj => {
	    if (isElement(obj)) {
	      // it's a jQuery object or a node element
	      return obj.jquery ? obj[0] : obj;
	    }

	    if (typeof obj === 'string' && obj.length > 0) {
	      return document.querySelector(obj);
	    }

	    return null;
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): scrollspy.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'scrollspy';
	  const DATA_KEY = 'bs.scrollspy';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const Default = {
	    offset: 10,
	    method: 'auto',
	    target: ''
	  };
	  const DefaultType = {
	    offset: 'number',
	    method: 'string',
	    target: '(string|element)'
	  };
	  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
	  const EVENT_SCROLL = `scroll${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	  const CLASS_NAME_ACTIVE = 'active';
	  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	  const SELECTOR_NAV_LINKS = '.nav-link';
	  const SELECTOR_NAV_ITEMS = '.nav-item';
	  const SELECTOR_LIST_ITEMS = '.list-group-item';
	  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
	  const SELECTOR_DROPDOWN = '.dropdown';
	  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	  const METHOD_OFFSET = 'offset';
	  const METHOD_POSITION = 'position';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class ScrollSpy extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
	      this._config = this._getConfig(config);
	      this._offsets = [];
	      this._targets = [];
	      this._activeTarget = null;
	      this._scrollHeight = 0;
	      EventHandler__default.default.on(this._scrollElement, EVENT_SCROLL, () => this._process());
	      this.refresh();

	      this._process();
	    } // Getters


	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    refresh() {
	      const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
	      const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
	      const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
	      this._offsets = [];
	      this._targets = [];
	      this._scrollHeight = this._getScrollHeight();
	      const targets = SelectorEngine__default.default.find(SELECTOR_LINK_ITEMS, this._config.target);
	      targets.map(element => {
	        const targetSelector = getSelectorFromElement(element);
	        const target = targetSelector ? SelectorEngine__default.default.findOne(targetSelector) : null;

	        if (target) {
	          const targetBCR = target.getBoundingClientRect();

	          if (targetBCR.width || targetBCR.height) {
	            return [Manipulator__default.default[offsetMethod](target).top + offsetBase, targetSelector];
	          }
	        }

	        return null;
	      }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
	        this._offsets.push(item[0]);

	        this._targets.push(item[1]);
	      });
	    }

	    dispose() {
	      EventHandler__default.default.off(this._scrollElement, EVENT_KEY);
	      super.dispose();
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' && config ? config : {})
	      };
	      config.target = getElement(config.target) || document.documentElement;
	      typeCheckConfig(NAME, config, DefaultType);
	      return config;
	    }

	    _getScrollTop() {
	      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
	    }

	    _getScrollHeight() {
	      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	    }

	    _getOffsetHeight() {
	      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
	    }

	    _process() {
	      const scrollTop = this._getScrollTop() + this._config.offset;

	      const scrollHeight = this._getScrollHeight();

	      const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

	      if (this._scrollHeight !== scrollHeight) {
	        this.refresh();
	      }

	      if (scrollTop >= maxScroll) {
	        const target = this._targets[this._targets.length - 1];

	        if (this._activeTarget !== target) {
	          this._activate(target);
	        }

	        return;
	      }

	      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
	        this._activeTarget = null;

	        this._clear();

	        return;
	      }

	      for (let i = this._offsets.length; i--;) {
	        const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

	        if (isActiveTarget) {
	          this._activate(this._targets[i]);
	        }
	      }
	    }

	    _activate(target) {
	      this._activeTarget = target;

	      this._clear();

	      const queries = SELECTOR_LINK_ITEMS.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
	      const link = SelectorEngine__default.default.findOne(queries.join(','), this._config.target);
	      link.classList.add(CLASS_NAME_ACTIVE);

	      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
	        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
	      } else {
	        SelectorEngine__default.default.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(listGroup => {
	          // Set triggered links parents as active
	          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
	          SelectorEngine__default.default.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE)); // Handle special case when .nav-link is inside .nav-item

	          SelectorEngine__default.default.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
	            SelectorEngine__default.default.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE));
	          });
	        });
	      }

	      EventHandler__default.default.trigger(this._scrollElement, EVENT_ACTIVATE, {
	        relatedTarget: target
	      });
	    }

	    _clear() {
	      SelectorEngine__default.default.find(SELECTOR_LINK_ITEMS, this._config.target).filter(node => node.classList.contains(CLASS_NAME_ACTIVE)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE));
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = ScrollSpy.getOrCreateInstance(this, config);

	        if (typeof config !== 'string') {
	          return;
	        }

	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
	    SelectorEngine__default.default.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .ScrollSpy to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(ScrollSpy);

	  return ScrollSpy;

	}));

	}(scrollspy$1));

	var scrollspy = scrollspy$1.exports;

	var tab$1 = {exports: {}};

	/*!
	  * Bootstrap tab.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, selectorEngine.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, SelectorEngine, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): tab.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'tab';
	  const DATA_KEY = 'bs.tab';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const DATA_API_KEY = '.data-api';
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
	  const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
	  const CLASS_NAME_ACTIVE = 'active';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const SELECTOR_DROPDOWN = '.dropdown';
	  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	  const SELECTOR_ACTIVE = '.active';
	  const SELECTOR_ACTIVE_UL = ':scope > li > .active';
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
	  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	  const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Tab extends BaseComponent__default.default {
	    // Getters
	    static get NAME() {
	      return NAME;
	    } // Public


	    show() {
	      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
	        return;
	      }

	      let previous;
	      const target = getElementFromSelector(this._element);

	      const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

	      if (listElement) {
	        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
	        previous = SelectorEngine__default.default.find(itemSelector, listElement);
	        previous = previous[previous.length - 1];
	      }

	      const hideEvent = previous ? EventHandler__default.default.trigger(previous, EVENT_HIDE, {
	        relatedTarget: this._element
	      }) : null;
	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
	        relatedTarget: previous
	      });

	      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
	        return;
	      }

	      this._activate(this._element, listElement);

	      const complete = () => {
	        EventHandler__default.default.trigger(previous, EVENT_HIDDEN, {
	          relatedTarget: this._element
	        });
	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
	          relatedTarget: previous
	        });
	      };

	      if (target) {
	        this._activate(target, target.parentNode, complete);
	      } else {
	        complete();
	      }
	    } // Private


	    _activate(element, container, callback) {
	      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine__default.default.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine__default.default.children(container, SELECTOR_ACTIVE);
	      const active = activeElements[0];
	      const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE);

	      const complete = () => this._transitionComplete(element, active, callback);

	      if (active && isTransitioning) {
	        active.classList.remove(CLASS_NAME_SHOW);

	        this._queueCallback(complete, element, true);
	      } else {
	        complete();
	      }
	    }

	    _transitionComplete(element, active, callback) {
	      if (active) {
	        active.classList.remove(CLASS_NAME_ACTIVE);
	        const dropdownChild = SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

	        if (dropdownChild) {
	          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
	        }

	        if (active.getAttribute('role') === 'tab') {
	          active.setAttribute('aria-selected', false);
	        }
	      }

	      element.classList.add(CLASS_NAME_ACTIVE);

	      if (element.getAttribute('role') === 'tab') {
	        element.setAttribute('aria-selected', true);
	      }

	      reflow(element);

	      if (element.classList.contains(CLASS_NAME_FADE)) {
	        element.classList.add(CLASS_NAME_SHOW);
	      }

	      let parent = element.parentNode;

	      if (parent && parent.nodeName === 'LI') {
	        parent = parent.parentNode;
	      }

	      if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
	        const dropdownElement = element.closest(SELECTOR_DROPDOWN);

	        if (dropdownElement) {
	          SelectorEngine__default.default.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
	        }

	        element.setAttribute('aria-expanded', true);
	      }

	      if (callback) {
	        callback();
	      }
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Tab.getOrCreateInstance(this);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config]();
	        }
	      });
	    }

	  }
	  /**
	   * ------------------------------------------------------------------------
	   * Data Api implementation
	   * ------------------------------------------------------------------------
	   */


	  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    if (isDisabled(this)) {
	      return;
	    }

	    const data = Tab.getOrCreateInstance(this);
	    data.show();
	  });
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Tab to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Tab);

	  return Tab;

	}));

	}(tab$1));

	var tab = tab$1.exports;

	var toast$1 = {exports: {}};

	/*!
	  * Bootstrap toast.js v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(eventHandler.exports, manipulator.exports, baseComponent.exports) ;
	})(commonjsGlobal, (function (EventHandler, Manipulator, BaseComponent) {
	  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

	  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
	  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
	  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/index.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const toType = obj => {
	    if (obj === null || obj === undefined) {
	      return `${obj}`;
	    }

	    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	  };

	  const getSelector = element => {
	    let selector = element.getAttribute('data-bs-target');

	    if (!selector || selector === '#') {
	      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	      // `document.querySelector` will rightfully complain it is invalid.
	      // See https://github.com/twbs/bootstrap/issues/32273

	      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	        return null;
	      } // Just in case some CMS puts out a full URL with the anchor appended


	      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	        hrefAttr = `#${hrefAttr.split('#')[1]}`;
	      }

	      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	    }

	    return selector;
	  };

	  const getElementFromSelector = element => {
	    const selector = getSelector(element);
	    return selector ? document.querySelector(selector) : null;
	  };

	  const isElement = obj => {
	    if (!obj || typeof obj !== 'object') {
	      return false;
	    }

	    if (typeof obj.jquery !== 'undefined') {
	      obj = obj[0];
	    }

	    return typeof obj.nodeType !== 'undefined';
	  };

	  const typeCheckConfig = (componentName, config, configTypes) => {
	    Object.keys(configTypes).forEach(property => {
	      const expectedTypes = configTypes[property];
	      const value = config[property];
	      const valueType = value && isElement(value) ? 'element' : toType(value);

	      if (!new RegExp(expectedTypes).test(valueType)) {
	        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	      }
	    });
	  };

	  const isDisabled = element => {
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      return true;
	    }

	    if (element.classList.contains('disabled')) {
	      return true;
	    }

	    if (typeof element.disabled !== 'undefined') {
	      return element.disabled;
	    }

	    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	  };
	  /**
	   * Trick to restart an element's animation
	   *
	   * @param {HTMLElement} element
	   * @return void
	   *
	   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	   */


	  const reflow = element => {
	    // eslint-disable-next-line no-unused-expressions
	    element.offsetHeight;
	  };

	  const getjQuery = () => {
	    const {
	      jQuery
	    } = window;

	    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	      return jQuery;
	    }

	    return null;
	  };

	  const DOMContentLoadedCallbacks = [];

	  const onDOMContentLoaded = callback => {
	    if (document.readyState === 'loading') {
	      // add listener on the first call when the document is in loading state
	      if (!DOMContentLoadedCallbacks.length) {
	        document.addEventListener('DOMContentLoaded', () => {
	          DOMContentLoadedCallbacks.forEach(callback => callback());
	        });
	      }

	      DOMContentLoadedCallbacks.push(callback);
	    } else {
	      callback();
	    }
	  };

	  const defineJQueryPlugin = plugin => {
	    onDOMContentLoaded(() => {
	      const $ = getjQuery();
	      /* istanbul ignore if */

	      if ($) {
	        const name = plugin.NAME;
	        const JQUERY_NO_CONFLICT = $.fn[name];
	        $.fn[name] = plugin.jQueryInterface;
	        $.fn[name].Constructor = plugin;

	        $.fn[name].noConflict = () => {
	          $.fn[name] = JQUERY_NO_CONFLICT;
	          return plugin.jQueryInterface;
	        };
	      }
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): util/component-functions.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */

	  const enableDismissTrigger = (component, method = 'hide') => {
	    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	    const name = component.NAME;
	    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	      if (['A', 'AREA'].includes(this.tagName)) {
	        event.preventDefault();
	      }

	      if (isDisabled(this)) {
	        return;
	      }

	      const target = getElementFromSelector(this) || this.closest(`.${name}`);
	      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	      instance[method]();
	    });
	  };

	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v5.1.3): toast.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  const NAME = 'toast';
	  const DATA_KEY = 'bs.toast';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
	  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
	  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
	  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_NAME_SHOWING = 'showing';
	  const DefaultType = {
	    animation: 'boolean',
	    autohide: 'boolean',
	    delay: 'number'
	  };
	  const Default = {
	    animation: true,
	    autohide: true,
	    delay: 5000
	  };
	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  class Toast extends BaseComponent__default.default {
	    constructor(element, config) {
	      super(element);
	      this._config = this._getConfig(config);
	      this._timeout = null;
	      this._hasMouseInteraction = false;
	      this._hasKeyboardInteraction = false;

	      this._setListeners();
	    } // Getters


	    static get DefaultType() {
	      return DefaultType;
	    }

	    static get Default() {
	      return Default;
	    }

	    static get NAME() {
	      return NAME;
	    } // Public


	    show() {
	      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);

	      if (showEvent.defaultPrevented) {
	        return;
	      }

	      this._clearTimeout();

	      if (this._config.animation) {
	        this._element.classList.add(CLASS_NAME_FADE);
	      }

	      const complete = () => {
	        this._element.classList.remove(CLASS_NAME_SHOWING);

	        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);

	        this._maybeScheduleHide();
	      };

	      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


	      reflow(this._element);

	      this._element.classList.add(CLASS_NAME_SHOW);

	      this._element.classList.add(CLASS_NAME_SHOWING);

	      this._queueCallback(complete, this._element, this._config.animation);
	    }

	    hide() {
	      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
	        return;
	      }

	      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

	      if (hideEvent.defaultPrevented) {
	        return;
	      }

	      const complete = () => {
	        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


	        this._element.classList.remove(CLASS_NAME_SHOWING);

	        this._element.classList.remove(CLASS_NAME_SHOW);

	        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
	      };

	      this._element.classList.add(CLASS_NAME_SHOWING);

	      this._queueCallback(complete, this._element, this._config.animation);
	    }

	    dispose() {
	      this._clearTimeout();

	      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
	        this._element.classList.remove(CLASS_NAME_SHOW);
	      }

	      super.dispose();
	    } // Private


	    _getConfig(config) {
	      config = { ...Default,
	        ...Manipulator__default.default.getDataAttributes(this._element),
	        ...(typeof config === 'object' && config ? config : {})
	      };
	      typeCheckConfig(NAME, config, this.constructor.DefaultType);
	      return config;
	    }

	    _maybeScheduleHide() {
	      if (!this._config.autohide) {
	        return;
	      }

	      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
	        return;
	      }

	      this._timeout = setTimeout(() => {
	        this.hide();
	      }, this._config.delay);
	    }

	    _onInteraction(event, isInteracting) {
	      switch (event.type) {
	        case 'mouseover':
	        case 'mouseout':
	          this._hasMouseInteraction = isInteracting;
	          break;

	        case 'focusin':
	        case 'focusout':
	          this._hasKeyboardInteraction = isInteracting;
	          break;
	      }

	      if (isInteracting) {
	        this._clearTimeout();

	        return;
	      }

	      const nextElement = event.relatedTarget;

	      if (this._element === nextElement || this._element.contains(nextElement)) {
	        return;
	      }

	      this._maybeScheduleHide();
	    }

	    _setListeners() {
	      EventHandler__default.default.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
	      EventHandler__default.default.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
	      EventHandler__default.default.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
	      EventHandler__default.default.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
	    }

	    _clearTimeout() {
	      clearTimeout(this._timeout);
	      this._timeout = null;
	    } // Static


	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Toast.getOrCreateInstance(this, config);

	        if (typeof config === 'string') {
	          if (typeof data[config] === 'undefined') {
	            throw new TypeError(`No method named "${config}"`);
	          }

	          data[config](this);
	        }
	      });
	    }

	  }

	  enableDismissTrigger(Toast);
	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   * add .Toast to jQuery only if jQuery is present
	   */

	  defineJQueryPlugin(Toast);

	  return Toast;

	}));

	}(toast$1));

	var toast = toast$1.exports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	      isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	      isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	          element;

	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }

	      element = document.getElementById(id);

	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }

	        element.focus();
	      }
	    }, false);
	  }
	})();

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT$1 = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN$1 = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag$1 = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim$1 = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary$1 = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal$1 = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt$1 = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$1 = objectProto$1.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$1 = Math.max,
	    nativeMin$1 = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now$1 = function() {
	  return root$1.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce$1(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }
	  wait = toNumber$1(wait) || 0;
	  if (isObject$1(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now$1();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now$1());
	  }

	  function debounced() {
	    var time = now$1(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT$1);
	  }
	  if (isObject$1(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce$1(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$1(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike$1(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol$1(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber$1(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol$1(value)) {
	    return NAN$1;
	  }
	  if (isObject$1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject$1(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim$1, '');
	  var isBinary = reIsBinary$1.test(value);
	  return (isBinary || reIsOctal$1.test(value))
	    ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex$1.test(value) ? NAN$1 : +value);
	}

	var lodash_throttle = throttle;

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var lodash_debounce = debounce;

	var callback = function callback() {};

	function containsAOSNode(nodes) {
	  var i = void 0,
	      currentNode = void 0,
	      result = void 0;

	  for (i = 0; i < nodes.length; i += 1) {
	    currentNode = nodes[i];

	    if (currentNode.dataset && currentNode.dataset.aos) {
	      return true;
	    }

	    result = currentNode.children && containsAOSNode(currentNode.children);

	    if (result) {
	      return true;
	    }
	  }

	  return false;
	}

	function check(mutations) {
	  if (!mutations) return;

	  mutations.forEach(function (mutation) {
	    var addedNodes = Array.prototype.slice.call(mutation.addedNodes);
	    var removedNodes = Array.prototype.slice.call(mutation.removedNodes);
	    var allNodes = addedNodes.concat(removedNodes);

	    if (containsAOSNode(allNodes)) {
	      return callback();
	    }
	  });
	}

	function getMutationObserver() {
	  return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	}

	function isSupported() {
	  return !!getMutationObserver();
	}

	function ready(selector, fn) {
	  var doc = window.document;
	  var MutationObserver = getMutationObserver();

	  var observer = new MutationObserver(check);
	  callback = fn;

	  observer.observe(doc.documentElement, {
	    childList: true,
	    subtree: true,
	    removedNodes: true
	  });
	}

	var observer = { isSupported: isSupported, ready: ready };

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	/**
	 * Device detector
	 */

	var fullNameRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
	var prefixRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
	var fullNameMobileRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
	var prefixMobileRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

	function ua() {
	  return navigator.userAgent || navigator.vendor || window.opera || '';
	}

	var Detector = function () {
	  function Detector() {
	    classCallCheck(this, Detector);
	  }

	  createClass(Detector, [{
	    key: 'phone',
	    value: function phone() {
	      var a = ua();
	      return !!(fullNameRe.test(a) || prefixRe.test(a.substr(0, 4)));
	    }
	  }, {
	    key: 'mobile',
	    value: function mobile() {
	      var a = ua();
	      return !!(fullNameMobileRe.test(a) || prefixMobileRe.test(a.substr(0, 4)));
	    }
	  }, {
	    key: 'tablet',
	    value: function tablet() {
	      return this.mobile() && !this.phone();
	    }

	    // http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c

	  }, {
	    key: 'ie11',
	    value: function ie11() {
	      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
	    }
	  }]);
	  return Detector;
	}();

	var detect = new Detector();

	/**
	 * Adds multiple classes on node
	 * @param {DOMNode} node
	 * @param {array}  classes
	 */
	var addClasses = function addClasses(node, classes) {
	  return classes && classes.forEach(function (className) {
	    return node.classList.add(className);
	  });
	};

	/**
	 * Removes multiple classes from node
	 * @param {DOMNode} node
	 * @param {array}  classes
	 */
	var removeClasses = function removeClasses(node, classes) {
	  return classes && classes.forEach(function (className) {
	    return node.classList.remove(className);
	  });
	};

	var fireEvent = function fireEvent(eventName, data) {
	  var customEvent = void 0;

	  if (detect.ie11()) {
	    customEvent = document.createEvent('CustomEvent');
	    customEvent.initCustomEvent(eventName, true, true, { detail: data });
	  } else {
	    customEvent = new CustomEvent(eventName, {
	      detail: data
	    });
	  }

	  return document.dispatchEvent(customEvent);
	};

	/**
	 * Set or remove aos-animate class
	 * @param {node} el         element
	 * @param {int}  top        scrolled distance
	 */
	var applyClasses = function applyClasses(el, top) {
	  var options = el.options,
	      position = el.position,
	      node = el.node;
	      el.data;


	  var hide = function hide() {
	    if (!el.animated) return;

	    removeClasses(node, options.animatedClassNames);
	    fireEvent('aos:out', node);

	    if (el.options.id) {
	      fireEvent('aos:in:' + el.options.id, node);
	    }

	    el.animated = false;
	  };

	  var show = function show() {
	    if (el.animated) return;

	    addClasses(node, options.animatedClassNames);

	    fireEvent('aos:in', node);
	    if (el.options.id) {
	      fireEvent('aos:in:' + el.options.id, node);
	    }

	    el.animated = true;
	  };

	  if (options.mirror && top >= position.out && !options.once) {
	    hide();
	  } else if (top >= position.in) {
	    show();
	  } else if (el.animated && !options.once) {
	    hide();
	  }
	};

	/**
	 * Scroll logic - add or remove 'aos-animate' class on scroll
	 *
	 * @param  {array} $elements         array of elements nodes
	 * @return {void}
	 */
	var handleScroll = function handleScroll($elements) {
	  return $elements.forEach(function (el, i) {
	    return applyClasses(el, window.pageYOffset);
	  });
	};

	/**
	 * Get offset of DOM element
	 * like there were no transforms applied on it
	 *
	 * @param  {Node} el [DOM element]
	 * @return {Object} [top and left offset]
	 */
	var offset = function offset(el) {
	  var _x = 0;
	  var _y = 0;

	  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
	    _x += el.offsetLeft - (el.tagName != 'BODY' ? el.scrollLeft : 0);
	    _y += el.offsetTop - (el.tagName != 'BODY' ? el.scrollTop : 0);
	    el = el.offsetParent;
	  }

	  return {
	    top: _y,
	    left: _x
	  };
	};

	/**
	 * Get inline option with a fallback.
	 *
	 * @param  {Node} el [Dom element]
	 * @param  {String} key [Option key]
	 * @param  {String} fallback [Default (fallback) value]
	 * @return {Mixed} [Option set with inline attributes or fallback value if not set]
	 */

	var getInlineOption = (function (el, key, fallback) {
	  var attr = el.getAttribute('data-aos-' + key);

	  if (typeof attr !== 'undefined') {
	    if (attr === 'true') {
	      return true;
	    } else if (attr === 'false') {
	      return false;
	    }
	  }

	  return attr || fallback;
	});

	/**
	 * Calculate offset
	 * basing on element's settings like:
	 * - anchor
	 * - offset
	 *
	 * @param  {Node} el [Dom element]
	 * @return {Integer} [Final offset that will be used to trigger animation in good position]
	 */

	var getPositionIn = function getPositionIn(el, defaultOffset, defaultAnchorPlacement) {
	  var windowHeight = window.innerHeight;
	  var anchor = getInlineOption(el, 'anchor');
	  var inlineAnchorPlacement = getInlineOption(el, 'anchor-placement');
	  var additionalOffset = Number(getInlineOption(el, 'offset', inlineAnchorPlacement ? 0 : defaultOffset));
	  var anchorPlacement = inlineAnchorPlacement || defaultAnchorPlacement;
	  var finalEl = el;

	  if (anchor && document.querySelectorAll(anchor)) {
	    finalEl = document.querySelectorAll(anchor)[0];
	  }

	  var triggerPoint = offset(finalEl).top - windowHeight;

	  switch (anchorPlacement) {
	    case 'top-bottom':
	      // Default offset
	      break;
	    case 'center-bottom':
	      triggerPoint += finalEl.offsetHeight / 2;
	      break;
	    case 'bottom-bottom':
	      triggerPoint += finalEl.offsetHeight;
	      break;
	    case 'top-center':
	      triggerPoint += windowHeight / 2;
	      break;
	    case 'center-center':
	      triggerPoint += windowHeight / 2 + finalEl.offsetHeight / 2;
	      break;
	    case 'bottom-center':
	      triggerPoint += windowHeight / 2 + finalEl.offsetHeight;
	      break;
	    case 'top-top':
	      triggerPoint += windowHeight;
	      break;
	    case 'bottom-top':
	      triggerPoint += windowHeight + finalEl.offsetHeight;
	      break;
	    case 'center-top':
	      triggerPoint += windowHeight + finalEl.offsetHeight / 2;
	      break;
	  }

	  return triggerPoint + additionalOffset;
	};

	var getPositionOut = function getPositionOut(el, defaultOffset) {
	  var anchor = getInlineOption(el, 'anchor');
	  var additionalOffset = getInlineOption(el, 'offset', defaultOffset);
	  var finalEl = el;

	  if (anchor && document.querySelectorAll(anchor)) {
	    finalEl = document.querySelectorAll(anchor)[0];
	  }

	  var elementOffsetTop = offset(finalEl).top;

	  return elementOffsetTop + finalEl.offsetHeight - additionalOffset;
	};

	/* Clearing variables */

	var prepare = function prepare($elements, options) {
	  $elements.forEach(function (el, i) {
	    var mirror = getInlineOption(el.node, 'mirror', options.mirror);
	    var once = getInlineOption(el.node, 'once', options.once);
	    var id = getInlineOption(el.node, 'id');
	    var customClassNames = options.useClassNames && el.node.getAttribute('data-aos');

	    var animatedClassNames = [options.animatedClassName].concat(customClassNames ? customClassNames.split(' ') : []).filter(function (className) {
	      return typeof className === 'string';
	    });

	    if (options.initClassName) {
	      el.node.classList.add(options.initClassName);
	    }

	    el.position = {
	      in: getPositionIn(el.node, options.offset, options.anchorPlacement),
	      out: mirror && getPositionOut(el.node, options.offset)
	    };

	    el.options = {
	      once: once,
	      mirror: mirror,
	      animatedClassNames: animatedClassNames,
	      id: id
	    };
	  });

	  return $elements;
	};

	/**
	 * Generate initial array with elements as objects
	 * This array will be extended later with elements attributes values
	 * like 'position'
	 */
	var elements = (function () {
	  var elements = document.querySelectorAll('[data-aos]');
	  return Array.prototype.map.call(elements, function (node) {
	    return { node: node };
	  });
	});

	/**
	 * *******************************************************
	 * AOS (Animate on scroll) - wowjs alternative
	 * made to animate elements on scroll in both directions
	 * *******************************************************
	 */

	/**
	 * Private variables
	 */
	var $aosElements = [];
	var initialized = false;

	/**
	 * Default options
	 */
	var options = {
	  offset: 120,
	  delay: 0,
	  easing: 'ease',
	  duration: 400,
	  disable: false,
	  once: false,
	  mirror: false,
	  anchorPlacement: 'top-bottom',
	  startEvent: 'DOMContentLoaded',
	  animatedClassName: 'aos-animate',
	  initClassName: 'aos-init',
	  useClassNames: false,
	  disableMutationObserver: false,
	  throttleDelay: 99,
	  debounceDelay: 50
	};

	// Detect not supported browsers (<=IE9)
	// http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	var isBrowserNotSupported = function isBrowserNotSupported() {
	  return document.all && !window.atob;
	};

	var initializeScroll = function initializeScroll() {
	  // Extend elements objects in $aosElements with their positions
	  $aosElements = prepare($aosElements, options);
	  // Perform scroll event, to refresh view and show/hide elements
	  handleScroll($aosElements);

	  /**
	   * Handle scroll event to animate elements on scroll
	   */
	  window.addEventListener('scroll', lodash_throttle(function () {
	    handleScroll($aosElements, options.once);
	  }, options.throttleDelay));

	  return $aosElements;
	};

	/**
	 * Refresh AOS
	 */
	var refresh = function refresh() {
	  var initialize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	  // Allow refresh only when it was first initialized on startEvent
	  if (initialize) initialized = true;
	  if (initialized) initializeScroll();
	};

	/**
	 * Hard refresh
	 * create array with new elements and trigger refresh
	 */
	var refreshHard = function refreshHard() {
	  $aosElements = elements();

	  if (isDisabled(options.disable) || isBrowserNotSupported()) {
	    return disable();
	  }

	  refresh();
	};

	/**
	 * Disable AOS
	 * Remove all attributes to reset applied styles
	 */
	var disable = function disable() {
	  $aosElements.forEach(function (el, i) {
	    el.node.removeAttribute('data-aos');
	    el.node.removeAttribute('data-aos-easing');
	    el.node.removeAttribute('data-aos-duration');
	    el.node.removeAttribute('data-aos-delay');

	    if (options.initClassName) {
	      el.node.classList.remove(options.initClassName);
	    }

	    if (options.animatedClassName) {
	      el.node.classList.remove(options.animatedClassName);
	    }
	  });
	};

	/**
	 * Check if AOS should be disabled based on provided setting
	 */
	var isDisabled = function isDisabled(optionDisable) {
	  return optionDisable === true || optionDisable === 'mobile' && detect.mobile() || optionDisable === 'phone' && detect.phone() || optionDisable === 'tablet' && detect.tablet() || typeof optionDisable === 'function' && optionDisable() === true;
	};

	/**
	 * Initializing AOS
	 * - Create options merging defaults with user defined options
	 * - Set attributes on <body> as global setting - css relies on it
	 * - Attach preparing elements to options.startEvent,
	 *   window resize and orientation change
	 * - Attach function that handle scroll and everything connected to it
	 *   to window scroll event and fire once document is ready to set initial state
	 */
	var init = function init(settings) {
	  options = _extends(options, settings);

	  // Create initial array with elements -> to be fullfilled later with prepare()
	  $aosElements = elements();

	  /**
	   * Disable mutation observing if not supported
	   */
	  if (!options.disableMutationObserver && !observer.isSupported()) {
	    console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    ');
	    options.disableMutationObserver = true;
	  }

	  /**
	   * Observe [aos] elements
	   * If something is loaded by AJAX
	   * it'll refresh plugin automatically
	   */
	  if (!options.disableMutationObserver) {
	    observer.ready('[data-aos]', refreshHard);
	  }

	  /**
	   * Don't init plugin if option `disable` is set
	   * or when browser is not supported
	   */
	  if (isDisabled(options.disable) || isBrowserNotSupported()) {
	    return disable();
	  }

	  /**
	   * Set global settings on body, based on options
	   * so CSS can use it
	   */
	  document.querySelector('body').setAttribute('data-aos-easing', options.easing);

	  document.querySelector('body').setAttribute('data-aos-duration', options.duration);

	  document.querySelector('body').setAttribute('data-aos-delay', options.delay);

	  /**
	   * Handle initializing
	   */
	  if (['DOMContentLoaded', 'load'].indexOf(options.startEvent) === -1) {
	    // Listen to options.startEvent and initialize AOS
	    document.addEventListener(options.startEvent, function () {
	      refresh(true);
	    });
	  } else {
	    window.addEventListener('load', function () {
	      refresh(true);
	    });
	  }

	  if (options.startEvent === 'DOMContentLoaded' && ['complete', 'interactive'].indexOf(document.readyState) > -1) {
	    // Initialize AOS if default startEvent was already fired
	    refresh(true);
	  }

	  /**
	   * Refresh plugin on window resize or orientation change
	   */
	  window.addEventListener('resize', lodash_debounce(refresh, options.debounceDelay, true));

	  window.addEventListener('orientationchange', lodash_debounce(refresh, options.debounceDelay, true));

	  return $aosElements;
	};

	/**
	 * Export Public API
	 */

	var aos = {
	  init: init,
	  refresh: refresh,
	  refreshHard: refreshHard
	};

	// @fancyapps/ui/Fancybox v4.0.27
	const t=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),e=(...i)=>{let s=!1;"boolean"==typeof i[0]&&(s=i.shift());let o=i[0];if(!o||"object"!=typeof o)throw new Error("extendee must be an object");const n=i.slice(1),a=n.length;for(let i=0;i<a;i++){const a=n[i];for(let i in a)if(a.hasOwnProperty(i)){const n=a[i];if(s&&(Array.isArray(n)||t(n))){const t=Array.isArray(n)?[]:{};o[i]=e(!0,o.hasOwnProperty(i)?o[i]:t,n);}else o[i]=n;}}return o},i=(t,e=1e4)=>(t=parseFloat(t)||0,Math.round((t+Number.EPSILON)*e)/e),s=function(t){return !!(t&&"object"==typeof t&&t instanceof Element&&t!==document.body)&&(!t.__Panzoom&&(function(t){const e=getComputedStyle(t)["overflow-y"],i=getComputedStyle(t)["overflow-x"],s=("scroll"===e||"auto"===e)&&Math.abs(t.scrollHeight-t.clientHeight)>1,o=("scroll"===i||"auto"===i)&&Math.abs(t.scrollWidth-t.clientWidth)>1;return s||o}(t)?t:s(t.parentNode)))},o="undefined"!=typeof window&&window.ResizeObserver||class{constructor(t){this.observables=[],this.boundCheck=this.check.bind(this),this.boundCheck(),this.callback=t;}observe(t){if(this.observables.some((e=>e.el===t)))return;const e={el:t,size:{height:t.clientHeight,width:t.clientWidth}};this.observables.push(e);}unobserve(t){this.observables=this.observables.filter((e=>e.el!==t));}disconnect(){this.observables=[];}check(){const t=this.observables.filter((t=>{const e=t.el.clientHeight,i=t.el.clientWidth;if(t.size.height!==e||t.size.width!==i)return t.size.height=e,t.size.width=i,!0})).map((t=>t.el));t.length>0&&this.callback(t),window.requestAnimationFrame(this.boundCheck);}};class n{constructor(t){this.id=self.Touch&&t instanceof Touch?t.identifier:-1,this.pageX=t.pageX,this.pageY=t.pageY,this.clientX=t.clientX,this.clientY=t.clientY;}}const a=(t,e)=>e?Math.sqrt((e.clientX-t.clientX)**2+(e.clientY-t.clientY)**2):0,r=(t,e)=>e?{clientX:(t.clientX+e.clientX)/2,clientY:(t.clientY+e.clientY)/2}:t;class h{constructor(t,{start:e=(()=>!0),move:i=(()=>{}),end:s=(()=>{})}={}){this._element=t,this.startPointers=[],this.currentPointers=[],this._pointerStart=t=>{if(t.buttons>0&&0!==t.button)return;const e=new n(t);this.currentPointers.some((t=>t.id===e.id))||this._triggerPointerStart(e,t)&&(window.addEventListener("mousemove",this._move),window.addEventListener("mouseup",this._pointerEnd));},this._touchStart=t=>{for(const e of Array.from(t.changedTouches||[]))this._triggerPointerStart(new n(e),t);},this._move=t=>{const e=this.currentPointers.slice(),i=(t=>"changedTouches"in t)(t)?Array.from(t.changedTouches).map((t=>new n(t))):[new n(t)];for(const t of i){const e=this.currentPointers.findIndex((e=>e.id===t.id));e<0||(this.currentPointers[e]=t);}this._moveCallback(e,this.currentPointers.slice(),t);},this._triggerPointerEnd=(t,e)=>{const i=this.currentPointers.findIndex((e=>e.id===t.id));return !(i<0)&&(this.currentPointers.splice(i,1),this.startPointers.splice(i,1),this._endCallback(t,e),!0)},this._pointerEnd=t=>{t.buttons>0&&0!==t.button||this._triggerPointerEnd(new n(t),t)&&(window.removeEventListener("mousemove",this._move,{passive:!1}),window.removeEventListener("mouseup",this._pointerEnd,{passive:!1}));},this._touchEnd=t=>{for(const e of Array.from(t.changedTouches||[]))this._triggerPointerEnd(new n(e),t);},this._startCallback=e,this._moveCallback=i,this._endCallback=s,this._element.addEventListener("mousedown",this._pointerStart,{passive:!1}),this._element.addEventListener("touchstart",this._touchStart,{passive:!1}),this._element.addEventListener("touchmove",this._move,{passive:!1}),this._element.addEventListener("touchend",this._touchEnd),this._element.addEventListener("touchcancel",this._touchEnd);}stop(){this._element.removeEventListener("mousedown",this._pointerStart,{passive:!1}),this._element.removeEventListener("touchstart",this._touchStart,{passive:!1}),this._element.removeEventListener("touchmove",this._move,{passive:!1}),this._element.removeEventListener("touchend",this._touchEnd),this._element.removeEventListener("touchcancel",this._touchEnd),window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd);}_triggerPointerStart(t,e){return !!this._startCallback(t,e)&&(this.currentPointers.push(t),this.startPointers.push(t),!0)}}class l{constructor(t={}){this.options=e(!0,{},t),this.plugins=[],this.events={};for(const t of ["on","once"])for(const e of Object.entries(this.options[t]||{}))this[t](...e);}option(t,e,...i){t=String(t);let s=(o=t,n=this.options,o.split(".").reduce((function(t,e){return t&&t[e]}),n));var o,n;return "function"==typeof s&&(s=s.call(this,this,...i)),void 0===s?e:s}localize(t,e=[]){return t=(t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,i,s)=>{let o="";s?o=this.option(`${i[0]+i.toLowerCase().substring(1)}.l10n.${s}`):i&&(o=this.option(`l10n.${i}`)),o||(o=t);for(let t=0;t<e.length;t++)o=o.split(e[t][0]).join(e[t][1]);return o}))).replace(/\{\{(.*)\}\}/,((t,e)=>e))}on(e,i){if(t(e)){for(const t of Object.entries(e))this.on(...t);return this}return String(e).split(" ").forEach((t=>{const e=this.events[t]=this.events[t]||[];-1==e.indexOf(i)&&e.push(i);})),this}once(e,i){if(t(e)){for(const t of Object.entries(e))this.once(...t);return this}return String(e).split(" ").forEach((t=>{const e=(...s)=>{this.off(t,e),i.call(this,this,...s);};e._=i,this.on(t,e);})),this}off(e,i){if(!t(e))return e.split(" ").forEach((t=>{const e=this.events[t];if(!e||!e.length)return this;let s=-1;for(let t=0,o=e.length;t<o;t++){const o=e[t];if(o&&(o===i||o._===i)){s=t;break}}-1!=s&&e.splice(s,1);})),this;for(const t of Object.entries(e))this.off(...t);}trigger(t,...e){for(const i of [...this.events[t]||[]].slice())if(i&&!1===i.call(this,this,...e))return !1;for(const i of [...this.events["*"]||[]].slice())if(i&&!1===i.call(this,t,this,...e))return !1;return !0}attachPlugins(t){const i={};for(const[s,o]of Object.entries(t||{}))!1===this.options[s]||this.plugins[s]||(this.options[s]=e({},o.defaults||{},this.options[s]),i[s]=new o(this));for(const[t,e]of Object.entries(i))e.attach(this);return this.plugins=Object.assign({},this.plugins,i),this}detachPlugins(){for(const t in this.plugins){let e;(e=this.plugins[t])&&"function"==typeof e.detach&&e.detach(this);}return this.plugins={},this}}const c={touch:!0,zoom:!0,pinchToZoom:!0,panOnlyZoomed:!1,lockAxis:!1,friction:.64,decelFriction:.88,zoomFriction:.74,bounceForce:.2,baseScale:1,minScale:1,maxScale:2,step:.5,textSelection:!1,click:"toggleZoom",wheel:"zoom",wheelFactor:42,wheelLimit:5,draggableClass:"is-draggable",draggingClass:"is-dragging",ratio:1};class d extends l{constructor(t,i={}){super(e(!0,{},c,i)),this.state="init",this.$container=t;for(const t of ["onLoad","onWheel","onClick"])this[t]=this[t].bind(this);this.initLayout(),this.resetValues(),this.attachPlugins(d.Plugins),this.trigger("init"),this.updateMetrics(),this.attachEvents(),this.trigger("ready"),!1===this.option("centerOnStart")?this.state="ready":this.panTo({friction:0}),t.__Panzoom=this;}initLayout(){const t=this.$container;if(!(t instanceof HTMLElement))throw new Error("Panzoom: Container not found");const e=this.option("content")||t.querySelector(".panzoom__content");if(!e)throw new Error("Panzoom: Content not found");this.$content=e;let i=this.option("viewport")||t.querySelector(".panzoom__viewport");i||!1===this.option("wrapInner")||(i=document.createElement("div"),i.classList.add("panzoom__viewport"),i.append(...t.childNodes),t.appendChild(i)),this.$viewport=i||e.parentNode;}resetValues(){this.updateRate=this.option("updateRate",/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)?250:24),this.container={width:0,height:0},this.viewport={width:0,height:0},this.content={origWidth:0,origHeight:0,width:0,height:0,x:this.option("x",0),y:this.option("y",0),scale:this.option("baseScale")},this.transform={x:0,y:0,scale:1},this.resetDragPosition();}onLoad(t){this.updateMetrics(),this.panTo({scale:this.option("baseScale"),friction:0}),this.trigger("load",t);}onClick(t){if(t.defaultPrevented)return;if(this.option("textSelection")&&window.getSelection().toString().length)return void t.stopPropagation();const e=this.$content.getClientRects()[0];if("ready"!==this.state&&(this.dragPosition.midPoint||Math.abs(e.top-this.dragStart.rect.top)>1||Math.abs(e.left-this.dragStart.rect.left)>1))return t.preventDefault(),void t.stopPropagation();!1!==this.trigger("click",t)&&this.option("zoom")&&"toggleZoom"===this.option("click")&&(t.preventDefault(),t.stopPropagation(),this.zoomWithClick(t));}onWheel(t){!1!==this.trigger("wheel",t)&&this.option("zoom")&&this.option("wheel")&&this.zoomWithWheel(t);}zoomWithWheel(t){void 0===this.changedDelta&&(this.changedDelta=0);const e=Math.max(-1,Math.min(1,-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)),i=this.content.scale;let s=i*(100+e*this.option("wheelFactor"))/100;if(e<0&&Math.abs(i-this.option("minScale"))<.01||e>0&&Math.abs(i-this.option("maxScale"))<.01?(this.changedDelta+=Math.abs(e),s=i):(this.changedDelta=0,s=Math.max(Math.min(s,this.option("maxScale")),this.option("minScale"))),this.changedDelta>this.option("wheelLimit"))return;if(t.preventDefault(),s===i)return;const o=this.$content.getBoundingClientRect(),n=t.clientX-o.left,a=t.clientY-o.top;this.zoomTo(s,{x:n,y:a});}zoomWithClick(t){const e=this.$content.getClientRects()[0],i=t.clientX-e.left,s=t.clientY-e.top;this.toggleZoom({x:i,y:s});}attachEvents(){this.$content.addEventListener("load",this.onLoad),this.$container.addEventListener("wheel",this.onWheel,{passive:!1}),this.$container.addEventListener("click",this.onClick,{passive:!1}),this.initObserver();const t=new h(this.$container,{start:(e,i)=>{if(!this.option("touch"))return !1;if(this.velocity.scale<0)return !1;const o=i.composedPath()[0];if(!t.currentPointers.length){if(-1!==["BUTTON","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].indexOf(o.nodeName))return !1;if(this.option("textSelection")&&((t,e,i)=>{const s=t.childNodes,o=document.createRange();for(let t=0;t<s.length;t++){const n=s[t];if(n.nodeType!==Node.TEXT_NODE)continue;o.selectNodeContents(n);const a=o.getBoundingClientRect();if(e>=a.left&&i>=a.top&&e<=a.right&&i<=a.bottom)return n}return !1})(o,e.clientX,e.clientY))return !1}return !s(o)&&(!1!==this.trigger("touchStart",i)&&("mousedown"===i.type&&i.preventDefault(),this.state="pointerdown",this.resetDragPosition(),this.dragPosition.midPoint=null,this.dragPosition.time=Date.now(),!0))},move:(e,i,s)=>{if("pointerdown"!==this.state)return;if(!1===this.trigger("touchMove",s))return void s.preventDefault();if(i.length<2&&!0===this.option("panOnlyZoomed")&&this.content.width<=this.viewport.width&&this.content.height<=this.viewport.height&&this.transform.scale<=this.option("baseScale"))return;if(i.length>1&&(!this.option("zoom")||!1===this.option("pinchToZoom")))return;const o=r(e[0],e[1]),n=r(i[0],i[1]),h=n.clientX-o.clientX,l=n.clientY-o.clientY,c=a(e[0],e[1]),d=a(i[0],i[1]),u=c&&d?d/c:1;this.dragOffset.x+=h,this.dragOffset.y+=l,this.dragOffset.scale*=u,this.dragOffset.time=Date.now()-this.dragPosition.time;const f=1===this.dragStart.scale&&this.option("lockAxis");if(f&&!this.lockAxis){if(Math.abs(this.dragOffset.x)<6&&Math.abs(this.dragOffset.y)<6)return void s.preventDefault();const t=Math.abs(180*Math.atan2(this.dragOffset.y,this.dragOffset.x)/Math.PI);this.lockAxis=t>45&&t<135?"y":"x";}if("xy"===f||"y"!==this.lockAxis){if(s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation(),this.lockAxis&&(this.dragOffset["x"===this.lockAxis?"y":"x"]=0),this.$container.classList.add(this.option("draggingClass")),this.transform.scale===this.option("baseScale")&&"y"===this.lockAxis||(this.dragPosition.x=this.dragStart.x+this.dragOffset.x),this.transform.scale===this.option("baseScale")&&"x"===this.lockAxis||(this.dragPosition.y=this.dragStart.y+this.dragOffset.y),this.dragPosition.scale=this.dragStart.scale*this.dragOffset.scale,i.length>1){const e=r(t.startPointers[0],t.startPointers[1]),i=e.clientX-this.dragStart.rect.x,s=e.clientY-this.dragStart.rect.y,{deltaX:o,deltaY:a}=this.getZoomDelta(this.content.scale*this.dragOffset.scale,i,s);this.dragPosition.x-=o,this.dragPosition.y-=a,this.dragPosition.midPoint=n;}else this.setDragResistance();this.transform={x:this.dragPosition.x,y:this.dragPosition.y,scale:this.dragPosition.scale},this.startAnimation();}},end:(e,i)=>{if("pointerdown"!==this.state)return;if(this._dragOffset={...this.dragOffset},t.currentPointers.length)return void this.resetDragPosition();if(this.state="decel",this.friction=this.option("decelFriction"),this.recalculateTransform(),this.$container.classList.remove(this.option("draggingClass")),!1===this.trigger("touchEnd",i))return;if("decel"!==this.state)return;const s=this.option("minScale");if(this.transform.scale<s)return void this.zoomTo(s,{friction:.64});const o=this.option("maxScale");if(this.transform.scale-o>.01){const t=this.dragPosition.midPoint||e,i=this.$content.getClientRects()[0];this.zoomTo(o,{friction:.64,x:t.clientX-i.left,y:t.clientY-i.top});}}});this.pointerTracker=t;}initObserver(){this.resizeObserver||(this.resizeObserver=new o((()=>{this.updateTimer||(this.updateTimer=setTimeout((()=>{const t=this.$container.getBoundingClientRect();t.width&&t.height?((Math.abs(t.width-this.container.width)>1||Math.abs(t.height-this.container.height)>1)&&(this.isAnimating()&&this.endAnimation(!0),this.updateMetrics(),this.panTo({x:this.content.x,y:this.content.y,scale:this.option("baseScale"),friction:0})),this.updateTimer=null):this.updateTimer=null;}),this.updateRate));})),this.resizeObserver.observe(this.$container));}resetDragPosition(){this.lockAxis=null,this.friction=this.option("friction"),this.velocity={x:0,y:0,scale:0};const{x:t,y:e,scale:i}=this.content;this.dragStart={rect:this.$content.getBoundingClientRect(),x:t,y:e,scale:i},this.dragPosition={...this.dragPosition,x:t,y:e,scale:i},this.dragOffset={x:0,y:0,scale:1,time:0};}updateMetrics(t){!0!==t&&this.trigger("beforeUpdate");const e=this.$container,s=this.$content,o=this.$viewport,n=s instanceof HTMLImageElement,a=this.option("zoom"),r=this.option("resizeParent",a);let h=this.option("width"),l=this.option("height"),c=h||(d=s,Math.max(parseFloat(d.naturalWidth||0),parseFloat(d.width&&d.width.baseVal&&d.width.baseVal.value||0),parseFloat(d.offsetWidth||0),parseFloat(d.scrollWidth||0)));var d;let u=l||(t=>Math.max(parseFloat(t.naturalHeight||0),parseFloat(t.height&&t.height.baseVal&&t.height.baseVal.value||0),parseFloat(t.offsetHeight||0),parseFloat(t.scrollHeight||0)))(s);Object.assign(s.style,{width:h?`${h}px`:"",height:l?`${l}px`:"",maxWidth:"",maxHeight:""}),r&&Object.assign(o.style,{width:"",height:""});const f=this.option("ratio");c=i(c*f),u=i(u*f),h=c,l=u;const g=s.getBoundingClientRect(),p=o.getBoundingClientRect(),m=o==e?p:e.getBoundingClientRect();let y=Math.max(o.offsetWidth,i(p.width)),v=Math.max(o.offsetHeight,i(p.height)),b=window.getComputedStyle(o);if(y-=parseFloat(b.paddingLeft)+parseFloat(b.paddingRight),v-=parseFloat(b.paddingTop)+parseFloat(b.paddingBottom),this.viewport.width=y,this.viewport.height=v,a){if(Math.abs(c-g.width)>.1||Math.abs(u-g.height)>.1){const t=((t,e,i,s)=>{const o=Math.min(i/t||0,s/e);return {width:t*o||0,height:e*o||0}})(c,u,Math.min(c,g.width),Math.min(u,g.height));h=i(t.width),l=i(t.height);}Object.assign(s.style,{width:`${h}px`,height:`${l}px`,transform:""});}if(r&&(Object.assign(o.style,{width:`${h}px`,height:`${l}px`}),this.viewport={...this.viewport,width:h,height:l}),n&&a&&"function"!=typeof this.options.maxScale){const t=this.option("maxScale");this.options.maxScale=function(){return this.content.origWidth>0&&this.content.fitWidth>0?this.content.origWidth/this.content.fitWidth:t};}this.content={...this.content,origWidth:c,origHeight:u,fitWidth:h,fitHeight:l,width:h,height:l,scale:1,isZoomable:a},this.container={width:m.width,height:m.height},!0!==t&&this.trigger("afterUpdate");}zoomIn(t){this.zoomTo(this.content.scale+(t||this.option("step")));}zoomOut(t){this.zoomTo(this.content.scale-(t||this.option("step")));}toggleZoom(t={}){const e=this.option("maxScale"),i=this.option("baseScale"),s=this.content.scale>i+.5*(e-i)?i:e;this.zoomTo(s,t);}zoomTo(t=this.option("baseScale"),{x:e=null,y:s=null}={}){t=Math.max(Math.min(t,this.option("maxScale")),this.option("minScale"));const o=i(this.content.scale/(this.content.width/this.content.fitWidth),1e7);null===e&&(e=this.content.width*o*.5),null===s&&(s=this.content.height*o*.5);const{deltaX:n,deltaY:a}=this.getZoomDelta(t,e,s);e=this.content.x-n,s=this.content.y-a,this.panTo({x:e,y:s,scale:t,friction:this.option("zoomFriction")});}getZoomDelta(t,e=0,i=0){const s=this.content.fitWidth*this.content.scale,o=this.content.fitHeight*this.content.scale,n=e>0&&s?e/s:0,a=i>0&&o?i/o:0;return {deltaX:(this.content.fitWidth*t-s)*n,deltaY:(this.content.fitHeight*t-o)*a}}panTo({x:t=this.content.x,y:e=this.content.y,scale:i,friction:s=this.option("friction"),ignoreBounds:o=!1}={}){if(i=i||this.content.scale||1,!o){const{boundX:s,boundY:o}=this.getBounds(i);s&&(t=Math.max(Math.min(t,s.to),s.from)),o&&(e=Math.max(Math.min(e,o.to),o.from));}this.friction=s,this.transform={...this.transform,x:t,y:e,scale:i},s?(this.state="panning",this.velocity={x:(1/this.friction-1)*(t-this.content.x),y:(1/this.friction-1)*(e-this.content.y),scale:(1/this.friction-1)*(i-this.content.scale)},this.startAnimation()):this.endAnimation();}startAnimation(){this.rAF?cancelAnimationFrame(this.rAF):this.trigger("startAnimation"),this.rAF=requestAnimationFrame((()=>this.animate()));}animate(){if(this.setEdgeForce(),this.setDragForce(),this.velocity.x*=this.friction,this.velocity.y*=this.friction,this.velocity.scale*=this.friction,this.content.x+=this.velocity.x,this.content.y+=this.velocity.y,this.content.scale+=this.velocity.scale,this.isAnimating())this.setTransform();else if("pointerdown"!==this.state)return void this.endAnimation();this.rAF=requestAnimationFrame((()=>this.animate()));}getBounds(t){let e=this.boundX,s=this.boundY;if(void 0!==e&&void 0!==s)return {boundX:e,boundY:s};e={from:0,to:0},s={from:0,to:0},t=t||this.transform.scale;const o=this.content.fitWidth*t,n=this.content.fitHeight*t,a=this.viewport.width,r=this.viewport.height;if(o<a){const t=i(.5*(a-o));e.from=t,e.to=t;}else e.from=i(a-o);if(n<r){const t=.5*(r-n);s.from=t,s.to=t;}else s.from=i(r-n);return {boundX:e,boundY:s}}setEdgeForce(){if("decel"!==this.state)return;const t=this.option("bounceForce"),{boundX:e,boundY:i}=this.getBounds(Math.max(this.transform.scale,this.content.scale));let s,o,n,a;if(e&&(s=this.content.x<e.from,o=this.content.x>e.to),i&&(n=this.content.y<i.from,a=this.content.y>i.to),s||o){let i=((s?e.from:e.to)-this.content.x)*t;const o=this.content.x+(this.velocity.x+i)/this.friction;o>=e.from&&o<=e.to&&(i+=this.velocity.x),this.velocity.x=i,this.recalculateTransform();}if(n||a){let e=((n?i.from:i.to)-this.content.y)*t;const s=this.content.y+(e+this.velocity.y)/this.friction;s>=i.from&&s<=i.to&&(e+=this.velocity.y),this.velocity.y=e,this.recalculateTransform();}}setDragResistance(){if("pointerdown"!==this.state)return;const{boundX:t,boundY:e}=this.getBounds(this.dragPosition.scale);let i,s,o,n;if(t&&(i=this.dragPosition.x<t.from,s=this.dragPosition.x>t.to),e&&(o=this.dragPosition.y<e.from,n=this.dragPosition.y>e.to),(i||s)&&(!i||!s)){const e=i?t.from:t.to,s=e-this.dragPosition.x;this.dragPosition.x=e-.3*s;}if((o||n)&&(!o||!n)){const t=o?e.from:e.to,i=t-this.dragPosition.y;this.dragPosition.y=t-.3*i;}}setDragForce(){"pointerdown"===this.state&&(this.velocity.x=this.dragPosition.x-this.content.x,this.velocity.y=this.dragPosition.y-this.content.y,this.velocity.scale=this.dragPosition.scale-this.content.scale);}recalculateTransform(){this.transform.x=this.content.x+this.velocity.x/(1/this.friction-1),this.transform.y=this.content.y+this.velocity.y/(1/this.friction-1),this.transform.scale=this.content.scale+this.velocity.scale/(1/this.friction-1);}isAnimating(){return !(!this.friction||!(Math.abs(this.velocity.x)>.05||Math.abs(this.velocity.y)>.05||Math.abs(this.velocity.scale)>.05))}setTransform(t){let e,s,o;if(t?(e=i(this.transform.x),s=i(this.transform.y),o=this.transform.scale,this.content={...this.content,x:e,y:s,scale:o}):(e=i(this.content.x),s=i(this.content.y),o=this.content.scale/(this.content.width/this.content.fitWidth),this.content={...this.content,x:e,y:s}),this.trigger("beforeTransform"),e=i(this.content.x),s=i(this.content.y),t&&this.option("zoom")){let t,n;t=i(this.content.fitWidth*o),n=i(this.content.fitHeight*o),this.content.width=t,this.content.height=n,this.transform={...this.transform,width:t,height:n,scale:o},Object.assign(this.$content.style,{width:`${t}px`,height:`${n}px`,maxWidth:"none",maxHeight:"none",transform:`translate3d(${e}px, ${s}px, 0) scale(1)`});}else this.$content.style.transform=`translate3d(${e}px, ${s}px, 0) scale(${o})`;this.trigger("afterTransform");}endAnimation(t){cancelAnimationFrame(this.rAF),this.rAF=null,this.velocity={x:0,y:0,scale:0},this.setTransform(!0),this.state="ready",this.handleCursor(),!0!==t&&this.trigger("endAnimation");}handleCursor(){const t=this.option("draggableClass");t&&this.option("touch")&&(1==this.option("panOnlyZoomed")&&this.content.width<=this.viewport.width&&this.content.height<=this.viewport.height&&this.transform.scale<=this.option("baseScale")?this.$container.classList.remove(t):this.$container.classList.add(t));}detachEvents(){this.$content.removeEventListener("load",this.onLoad),this.$container.removeEventListener("wheel",this.onWheel,{passive:!1}),this.$container.removeEventListener("click",this.onClick,{passive:!1}),this.pointerTracker&&(this.pointerTracker.stop(),this.pointerTracker=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null);}destroy(){"destroy"!==this.state&&(this.state="destroy",clearTimeout(this.updateTimer),this.updateTimer=null,cancelAnimationFrame(this.rAF),this.rAF=null,this.detachEvents(),this.detachPlugins(),this.resetDragPosition());}}d.version="4.0.27",d.Plugins={};const u=(t,e)=>{let i=0;return function(...s){const o=(new Date).getTime();if(!(o-i<e))return i=o,t(...s)}};class f{constructor(t){this.$container=null,this.$prev=null,this.$next=null,this.carousel=t,this.onRefresh=this.onRefresh.bind(this);}option(t){return this.carousel.option(`Navigation.${t}`)}createButton(t){const e=document.createElement("button");e.setAttribute("title",this.carousel.localize(`{{${t.toUpperCase()}}}`));const i=this.option("classNames.button")+" "+this.option(`classNames.${t}`);return e.classList.add(...i.split(" ")),e.setAttribute("tabindex","0"),e.innerHTML=this.carousel.localize(this.option(`${t}Tpl`)),e.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),this.carousel["slide"+("next"===t?"Next":"Prev")]();})),e}build(){this.$container||(this.$container=document.createElement("div"),this.$container.classList.add(...this.option("classNames.main").split(" ")),this.carousel.$container.appendChild(this.$container)),this.$next||(this.$next=this.createButton("next"),this.$container.appendChild(this.$next)),this.$prev||(this.$prev=this.createButton("prev"),this.$container.appendChild(this.$prev));}onRefresh(){const t=this.carousel.pages.length;t<=1||t>1&&this.carousel.elemDimWidth<this.carousel.wrapDimWidth&&!Number.isInteger(this.carousel.option("slidesPerPage"))?this.cleanup():(this.build(),this.$prev.removeAttribute("disabled"),this.$next.removeAttribute("disabled"),this.carousel.option("infiniteX",this.carousel.option("infinite"))||(this.carousel.page<=0&&this.$prev.setAttribute("disabled",""),this.carousel.page>=t-1&&this.$next.setAttribute("disabled","")));}cleanup(){this.$prev&&this.$prev.remove(),this.$prev=null,this.$next&&this.$next.remove(),this.$next=null,this.$container&&this.$container.remove(),this.$container=null;}attach(){this.carousel.on("refresh change",this.onRefresh);}detach(){this.carousel.off("refresh change",this.onRefresh),this.cleanup();}}f.defaults={prevTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',nextTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',classNames:{main:"carousel__nav",button:"carousel__button",next:"is-next",prev:"is-prev"}};class g{constructor(t){this.carousel=t,this.selectedIndex=null,this.friction=0,this.onNavReady=this.onNavReady.bind(this),this.onNavClick=this.onNavClick.bind(this),this.onNavCreateSlide=this.onNavCreateSlide.bind(this),this.onTargetChange=this.onTargetChange.bind(this);}addAsTargetFor(t){this.target=this.carousel,this.nav=t,this.attachEvents();}addAsNavFor(t){this.target=t,this.nav=this.carousel,this.attachEvents();}attachEvents(){this.nav.options.initialSlide=this.target.options.initialPage,this.nav.on("ready",this.onNavReady),this.nav.on("createSlide",this.onNavCreateSlide),this.nav.on("Panzoom.click",this.onNavClick),this.target.on("change",this.onTargetChange),this.target.on("Panzoom.afterUpdate",this.onTargetChange);}onNavReady(){this.onTargetChange(!0);}onNavClick(t,e,i){const s=i.target.closest(".carousel__slide");if(!s)return;i.stopPropagation();const o=parseInt(s.dataset.index,10),n=this.target.findPageForSlide(o);this.target.page!==n&&this.target.slideTo(n,{friction:this.friction}),this.markSelectedSlide(o);}onNavCreateSlide(t,e){e.index===this.selectedIndex&&this.markSelectedSlide(e.index);}onTargetChange(){const t=this.target.pages[this.target.page].indexes[0],e=this.nav.findPageForSlide(t);this.nav.slideTo(e),this.markSelectedSlide(t);}markSelectedSlide(t){this.selectedIndex=t,[...this.nav.slides].filter((t=>t.$el&&t.$el.classList.remove("is-nav-selected")));const e=this.nav.slides[t];e&&e.$el&&e.$el.classList.add("is-nav-selected");}attach(t){const e=t.options.Sync;(e.target||e.nav)&&(e.target?this.addAsNavFor(e.target):e.nav&&this.addAsTargetFor(e.nav),this.friction=e.friction);}detach(){this.nav&&(this.nav.off("ready",this.onNavReady),this.nav.off("Panzoom.click",this.onNavClick),this.nav.off("createSlide",this.onNavCreateSlide)),this.target&&(this.target.off("Panzoom.afterUpdate",this.onTargetChange),this.target.off("change",this.onTargetChange));}}g.defaults={friction:.92};const p={Navigation:f,Dots:class{constructor(t){this.carousel=t,this.$list=null,this.events={change:this.onChange.bind(this),refresh:this.onRefresh.bind(this)};}buildList(){if(this.carousel.pages.length<this.carousel.option("Dots.minSlideCount"))return;const t=document.createElement("ol");return t.classList.add("carousel__dots"),t.addEventListener("click",(t=>{if(!("page"in t.target.dataset))return;t.preventDefault(),t.stopPropagation();const e=parseInt(t.target.dataset.page,10),i=this.carousel;e!==i.page&&(i.pages.length<3&&i.option("infinite")?i[0==e?"slidePrev":"slideNext"]():i.slideTo(e));})),this.$list=t,this.carousel.$container.appendChild(t),this.carousel.$container.classList.add("has-dots"),t}removeList(){this.$list&&(this.$list.parentNode.removeChild(this.$list),this.$list=null),this.carousel.$container.classList.remove("has-dots");}rebuildDots(){let t=this.$list;const e=!!t,i=this.carousel.pages.length;if(i<2)return void(e&&this.removeList());e||(t=this.buildList());const s=this.$list.children.length;if(s>i)for(let t=i;t<s;t++)this.$list.removeChild(this.$list.lastChild);else {for(let t=s;t<i;t++){const e=document.createElement("li");e.classList.add("carousel__dot"),e.dataset.page=t,e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("title",this.carousel.localize("{{GOTO}}",[["%d",t+1]])),e.addEventListener("keydown",(t=>{const i=t.code;let s;"Enter"===i||"NumpadEnter"===i?s=e:"ArrowRight"===i?s=e.nextSibling:"ArrowLeft"===i&&(s=e.previousSibling),s&&s.click();})),this.$list.appendChild(e);}this.setActiveDot();}}setActiveDot(){if(!this.$list)return;this.$list.childNodes.forEach((t=>{t.classList.remove("is-selected");}));const t=this.$list.childNodes[this.carousel.page];t&&t.classList.add("is-selected");}onChange(){this.setActiveDot();}onRefresh(){this.rebuildDots();}attach(){this.carousel.on(this.events);}detach(){this.removeList(),this.carousel.off(this.events),this.carousel=null;}},Sync:g};const m={slides:[],preload:0,slidesPerPage:"auto",initialPage:null,initialSlide:null,friction:.92,center:!0,infinite:!0,fill:!0,dragFree:!1,prefix:"",classNames:{viewport:"carousel__viewport",track:"carousel__track",slide:"carousel__slide",slideSelected:"is-selected"},l10n:{NEXT:"Next slide",PREV:"Previous slide",GOTO:"Go to slide #%d"}};class y extends l{constructor(t,i={}){if(super(i=e(!0,{},m,i)),this.state="init",this.$container=t,!(this.$container instanceof HTMLElement))throw new Error("No root element provided");this.slideNext=u(this.slideNext.bind(this),250),this.slidePrev=u(this.slidePrev.bind(this),250),this.init(),t.__Carousel=this;}init(){this.pages=[],this.page=this.pageIndex=null,this.prevPage=this.prevPageIndex=null,this.attachPlugins(y.Plugins),this.trigger("init"),this.initLayout(),this.initSlides(),this.updateMetrics(),this.$track&&this.pages.length&&(this.$track.style.transform=`translate3d(${-1*this.pages[this.page].left}px, 0px, 0) scale(1)`),this.manageSlideVisiblity(),this.initPanzoom(),this.state="ready",this.trigger("ready");}initLayout(){const t=this.option("prefix"),e=this.option("classNames");this.$viewport=this.option("viewport")||this.$container.querySelector(`.${t}${e.viewport}`),this.$viewport||(this.$viewport=document.createElement("div"),this.$viewport.classList.add(...(t+e.viewport).split(" ")),this.$viewport.append(...this.$container.childNodes),this.$container.appendChild(this.$viewport)),this.$track=this.option("track")||this.$container.querySelector(`.${t}${e.track}`),this.$track||(this.$track=document.createElement("div"),this.$track.classList.add(...(t+e.track).split(" ")),this.$track.append(...this.$viewport.childNodes),this.$viewport.appendChild(this.$track));}initSlides(){this.slides=[];this.$viewport.querySelectorAll(`.${this.option("prefix")}${this.option("classNames.slide")}`).forEach((t=>{const e={$el:t,isDom:!0};this.slides.push(e),this.trigger("createSlide",e,this.slides.length);})),Array.isArray(this.options.slides)&&(this.slides=e(!0,[...this.slides],this.options.slides));}updateMetrics(){let t,e=0,s=[];this.slides.forEach(((i,o)=>{const n=i.$el,a=i.isDom||!t?this.getSlideMetrics(n):t;i.index=o,i.width=a,i.left=e,t=a,e+=a,s.push(o);}));let o=Math.max(this.$track.offsetWidth,i(this.$track.getBoundingClientRect().width)),n=getComputedStyle(this.$track);o-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),this.contentWidth=e,this.viewportWidth=o;const a=[],r=this.option("slidesPerPage");if(Number.isInteger(r)&&e>o)for(let t=0;t<this.slides.length;t+=r)a.push({indexes:s.slice(t,t+r),slides:this.slides.slice(t,t+r)});else {let t=0,e=0;for(let i=0;i<this.slides.length;i+=1){let s=this.slides[i];(!a.length||e+s.width>o)&&(a.push({indexes:[],slides:[]}),t=a.length-1,e=0),e+=s.width,a[t].indexes.push(i),a[t].slides.push(s);}}const h=this.option("center"),l=this.option("fill");a.forEach(((t,i)=>{t.index=i,t.width=t.slides.reduce(((t,e)=>t+e.width),0),t.left=t.slides[0].left,h&&(t.left+=.5*(o-t.width)*-1),l&&!this.option("infiniteX",this.option("infinite"))&&e>o&&(t.left=Math.max(t.left,0),t.left=Math.min(t.left,e-o));}));const c=[];let d;a.forEach((t=>{const e={...t};d&&e.left===d.left?(d.width+=e.width,d.slides=[...d.slides,...e.slides],d.indexes=[...d.indexes,...e.indexes]):(e.index=c.length,d=e,c.push(e));})),this.pages=c;let u=this.page;if(null===u){const t=this.option("initialSlide");u=null!==t?this.findPageForSlide(t):parseInt(this.option("initialPage",0),10)||0,c[u]||(u=c.length&&u>c.length?c[c.length-1].index:0),this.page=u,this.pageIndex=u;}this.updatePanzoom(),this.trigger("refresh");}getSlideMetrics(t){if(!t){const e=this.slides[0];(t=document.createElement("div")).dataset.isTestEl=1,t.style.visibility="hidden",t.classList.add(...(this.option("prefix")+this.option("classNames.slide")).split(" ")),e.customClass&&t.classList.add(...e.customClass.split(" ")),this.$track.prepend(t);}let e=Math.max(t.offsetWidth,i(t.getBoundingClientRect().width));const s=t.currentStyle||window.getComputedStyle(t);return e=e+(parseFloat(s.marginLeft)||0)+(parseFloat(s.marginRight)||0),t.dataset.isTestEl&&t.remove(),e}findPageForSlide(t){t=parseInt(t,10)||0;const e=this.pages.find((e=>e.indexes.indexOf(t)>-1));return e?e.index:null}slideNext(){this.slideTo(this.pageIndex+1);}slidePrev(){this.slideTo(this.pageIndex-1);}slideTo(t,e={}){const{x:i=-1*this.setPage(t,!0),y:s=0,friction:o=this.option("friction")}=e;this.Panzoom.content.x===i&&!this.Panzoom.velocity.x&&o||(this.Panzoom.panTo({x:i,y:s,friction:o,ignoreBounds:!0}),"ready"===this.state&&"ready"===this.Panzoom.state&&this.trigger("settle"));}initPanzoom(){this.Panzoom&&this.Panzoom.destroy();const t=e(!0,{},{content:this.$track,wrapInner:!1,resizeParent:!1,zoom:!1,click:!1,lockAxis:"x",x:this.pages.length?-1*this.pages[this.page].left:0,centerOnStart:!1,textSelection:()=>this.option("textSelection",!1),panOnlyZoomed:function(){return this.content.width<=this.viewport.width}},this.option("Panzoom"));this.Panzoom=new d(this.$container,t),this.Panzoom.on({"*":(t,...e)=>this.trigger(`Panzoom.${t}`,...e),afterUpdate:()=>{this.updatePage();},beforeTransform:this.onBeforeTransform.bind(this),touchEnd:this.onTouchEnd.bind(this),endAnimation:()=>{this.trigger("settle");}}),this.updateMetrics(),this.manageSlideVisiblity();}updatePanzoom(){this.Panzoom&&(this.Panzoom.content={...this.Panzoom.content,fitWidth:this.contentWidth,origWidth:this.contentWidth,width:this.contentWidth},this.pages.length>1&&this.option("infiniteX",this.option("infinite"))?this.Panzoom.boundX=null:this.pages.length&&(this.Panzoom.boundX={from:-1*this.pages[this.pages.length-1].left,to:-1*this.pages[0].left}),this.option("infiniteY",this.option("infinite"))?this.Panzoom.boundY=null:this.Panzoom.boundY={from:0,to:0},this.Panzoom.handleCursor());}manageSlideVisiblity(){const t=this.contentWidth,e=this.viewportWidth;let i=this.Panzoom?-1*this.Panzoom.content.x:this.pages.length?this.pages[this.page].left:0;const s=this.option("preload"),o=this.option("infiniteX",this.option("infinite")),n=parseFloat(getComputedStyle(this.$viewport,null).getPropertyValue("padding-left")),a=parseFloat(getComputedStyle(this.$viewport,null).getPropertyValue("padding-right"));this.slides.forEach((r=>{let h,l,c=0;h=i-n,l=i+e+a,h-=s*(e+n+a),l+=s*(e+n+a);const d=r.left+r.width>h&&r.left<l;h=i+t-n,l=i+t+e+a,h-=s*(e+n+a);const u=o&&r.left+r.width>h&&r.left<l;h=i-t-n,l=i-t+e+a,h-=s*(e+n+a);const f=o&&r.left+r.width>h&&r.left<l;u||d||f?(this.createSlideEl(r),d&&(c=0),u&&(c=-1),f&&(c=1),r.left+r.width>i&&r.left<=i+e+a&&(c=0)):this.removeSlideEl(r),r.hasDiff=c;}));let r=0,h=0;this.slides.forEach(((e,i)=>{let s=0;e.$el?(i!==r||e.hasDiff?s=h+e.hasDiff*t:h=0,e.$el.style.left=Math.abs(s)>.1?`${h+e.hasDiff*t}px`:"",r++):h+=e.width;})),this.markSelectedSlides();}createSlideEl(t){if(!t)return;if(t.$el){let e=t.$el.dataset.index;if(!e||parseInt(e,10)!==t.index){let e;t.$el.dataset.index=t.index,t.$el.querySelectorAll("[data-lazy-srcset]").forEach((t=>{t.srcset=t.dataset.lazySrcset;})),t.$el.querySelectorAll("[data-lazy-src]").forEach((t=>{let e=t.dataset.lazySrc;t instanceof HTMLImageElement?t.src=e:t.style.backgroundImage=`url('${e}')`;})),(e=t.$el.dataset.lazySrc)&&(t.$el.style.backgroundImage=`url('${e}')`),t.state="ready";}return}const e=document.createElement("div");e.dataset.index=t.index,e.classList.add(...(this.option("prefix")+this.option("classNames.slide")).split(" ")),t.customClass&&e.classList.add(...t.customClass.split(" ")),t.html&&(e.innerHTML=t.html);const i=[];this.slides.forEach(((t,e)=>{t.$el&&i.push(e);}));const s=t.index;let o=null;if(i.length){let t=i.reduce(((t,e)=>Math.abs(e-s)<Math.abs(t-s)?e:t));o=this.slides[t];}return this.$track.insertBefore(e,o&&o.$el?o.index<t.index?o.$el.nextSibling:o.$el:null),t.$el=e,this.trigger("createSlide",t,s),t}removeSlideEl(t){t.$el&&!t.isDom&&(this.trigger("removeSlide",t),t.$el.remove(),t.$el=null);}markSelectedSlides(){const t=this.option("classNames.slideSelected"),e="aria-hidden";this.slides.forEach(((i,s)=>{const o=i.$el;if(!o)return;const n=this.pages[this.page];n&&n.indexes&&n.indexes.indexOf(s)>-1?(t&&!o.classList.contains(t)&&(o.classList.add(t),this.trigger("selectSlide",i)),o.removeAttribute(e)):(t&&o.classList.contains(t)&&(o.classList.remove(t),this.trigger("unselectSlide",i)),o.setAttribute(e,!0));}));}updatePage(){this.updateMetrics(),this.slideTo(this.page,{friction:0});}onBeforeTransform(){this.option("infiniteX",this.option("infinite"))&&this.manageInfiniteTrack(),this.manageSlideVisiblity();}manageInfiniteTrack(){const t=this.contentWidth,e=this.viewportWidth;if(!this.option("infiniteX",this.option("infinite"))||this.pages.length<2||t<e)return;const i=this.Panzoom;let s=!1;return i.content.x<-1*(t-e)&&(i.content.x+=t,this.pageIndex=this.pageIndex-this.pages.length,s=!0),i.content.x>e&&(i.content.x-=t,this.pageIndex=this.pageIndex+this.pages.length,s=!0),s&&"pointerdown"===i.state&&i.resetDragPosition(),s}onTouchEnd(t,e){const i=this.option("dragFree");if(!i&&this.pages.length>1&&t.dragOffset.time<350&&Math.abs(t.dragOffset.y)<1&&Math.abs(t.dragOffset.x)>5)this[t.dragOffset.x<0?"slideNext":"slidePrev"]();else if(i){const[,e]=this.getPageFromPosition(-1*t.transform.x);this.setPage(e);}else this.slideToClosest();}slideToClosest(t={}){let[,e]=this.getPageFromPosition(-1*this.Panzoom.content.x);this.slideTo(e,t);}getPageFromPosition(t){const e=this.pages.length;this.option("center")&&(t+=.5*this.viewportWidth);const i=Math.floor(t/this.contentWidth);t-=i*this.contentWidth;let s=this.slides.find((e=>e.left<=t&&e.left+e.width>t));if(s){let t=this.findPageForSlide(s.index);return [t,t+i*e]}return [0,0]}setPage(t,e){let i=0,s=parseInt(t,10)||0;const o=this.page,n=this.pageIndex,a=this.pages.length,r=this.contentWidth,h=this.viewportWidth;if(t=(s%a+a)%a,this.option("infiniteX",this.option("infinite"))&&r>h){const o=Math.floor(s/a)||0,n=r;if(i=this.pages[t].left+o*n,!0===e&&a>2){let t=-1*this.Panzoom.content.x;const e=i-n,o=i+n,r=Math.abs(t-i),h=Math.abs(t-e),l=Math.abs(t-o);l<r&&l<=h?(i=o,s+=a):h<r&&h<l&&(i=e,s-=a);}}else t=s=Math.max(0,Math.min(s,a-1)),i=this.pages.length?this.pages[t].left:0;return this.page=t,this.pageIndex=s,null!==o&&t!==o&&(this.prevPage=o,this.prevPageIndex=n,this.trigger("change",t,o)),i}destroy(){this.state="destroy",this.slides.forEach((t=>{this.removeSlideEl(t);})),this.slides=[],this.Panzoom.destroy(),this.detachPlugins();}}y.version="4.0.27",y.Plugins=p;const v=!("undefined"==typeof window||!window.document||!window.document.createElement);let b=null;const x=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","video","audio","[contenteditable]",'[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'],w=t=>{if(t&&v){null===b&&document.createElement("div").focus({get preventScroll(){return b=!0,!1}});try{if(t.setActive)t.setActive();else if(b)t.focus({preventScroll:!0});else {const e=window.pageXOffset||document.body.scrollTop,i=window.pageYOffset||document.body.scrollLeft;t.focus(),document.body.scrollTo({top:e,left:i,behavior:"auto"});}}catch(t){}}};class ${constructor(t){this.fancybox=t,this.$container=null,this.state="init";for(const t of ["onPrepare","onClosing","onKeydown"])this[t]=this[t].bind(this);this.events={prepare:this.onPrepare,closing:this.onClosing,keydown:this.onKeydown};}onPrepare(){this.getSlides().length<this.fancybox.option("Thumbs.minSlideCount")?this.state="disabled":!0===this.fancybox.option("Thumbs.autoStart")&&this.fancybox.Carousel.Panzoom.content.height>=this.fancybox.option("Thumbs.minScreenHeight")&&this.build();}onClosing(){this.Carousel&&this.Carousel.Panzoom.detachEvents();}onKeydown(t,e){e===t.option("Thumbs.key")&&this.toggle();}build(){if(this.$container)return;const t=document.createElement("div");t.classList.add("fancybox__thumbs"),this.fancybox.$carousel.parentNode.insertBefore(t,this.fancybox.$carousel.nextSibling),this.Carousel=new y(t,e(!0,{Dots:!1,Navigation:!1,Sync:{friction:0},infinite:!1,center:!0,fill:!0,dragFree:!0,slidesPerPage:1,preload:1},this.fancybox.option("Thumbs.Carousel"),{Sync:{target:this.fancybox.Carousel},slides:this.getSlides()})),this.Carousel.Panzoom.on("wheel",((t,e)=>{e.preventDefault(),this.fancybox[e.deltaY<0?"prev":"next"]();})),this.$container=t,this.state="visible";}getSlides(){const t=[];for(const e of this.fancybox.items){const i=e.thumb;i&&t.push({html:`<div class="fancybox__thumb" style="background-image:url('${i}')"></div>`,customClass:`has-thumb has-${e.type||"image"}`});}return t}toggle(){"visible"===this.state?this.hide():"hidden"===this.state?this.show():this.build();}show(){"hidden"===this.state&&(this.$container.style.display="",this.Carousel.Panzoom.attachEvents(),this.state="visible");}hide(){"visible"===this.state&&(this.Carousel.Panzoom.detachEvents(),this.$container.style.display="none",this.state="hidden");}cleanup(){this.Carousel&&(this.Carousel.destroy(),this.Carousel=null),this.$container&&(this.$container.remove(),this.$container=null),this.state="init";}attach(){this.fancybox.on(this.events);}detach(){this.fancybox.off(this.events),this.cleanup();}}$.defaults={minSlideCount:2,minScreenHeight:500,autoStart:!0,key:"t",Carousel:{}};const C=(t,e)=>{const i=new URL(t),s=new URLSearchParams(i.search);let o=new URLSearchParams;for(const[t,i]of [...s,...Object.entries(e)])"t"===t?o.set("start",parseInt(i)):o.set(t,i);o=o.toString();let n=t.match(/#t=((.*)?\d+s)/);return n&&(o+=`#t=${n[1]}`),o},S={video:{autoplay:!0,ratio:16/9},youtube:{autohide:1,fs:1,rel:0,hd:1,wmode:"transparent",enablejsapi:1,html5:1},vimeo:{hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1},html5video:{tpl:'<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',format:""}};class E{constructor(t){this.fancybox=t;for(const t of ["onInit","onReady","onCreateSlide","onRemoveSlide","onSelectSlide","onUnselectSlide","onRefresh","onMessage"])this[t]=this[t].bind(this);this.events={init:this.onInit,ready:this.onReady,"Carousel.createSlide":this.onCreateSlide,"Carousel.removeSlide":this.onRemoveSlide,"Carousel.selectSlide":this.onSelectSlide,"Carousel.unselectSlide":this.onUnselectSlide,"Carousel.refresh":this.onRefresh};}onInit(){for(const t of this.fancybox.items)this.processType(t);}processType(t){if(t.html)return t.src=t.html,t.type="html",void delete t.html;const i=t.src||"";let s=t.type||this.fancybox.options.type,o=null;if(!i||"string"==typeof i){if(o=i.match(/(?:youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)){const e=C(i,this.fancybox.option("Html.youtube")),n=encodeURIComponent(o[1]);t.videoId=n,t.src=`https://www.youtube-nocookie.com/embed/${n}?${e}`,t.thumb=t.thumb||`https://i.ytimg.com/vi/${n}/mqdefault.jpg`,t.vendor="youtube",s="video";}else if(o=i.match(/^.+vimeo.com\/(?:\/)?([\d]+)(.*)?/)){const e=C(i,this.fancybox.option("Html.vimeo")),n=encodeURIComponent(o[1]);t.videoId=n,t.src=`https://player.vimeo.com/video/${n}?${e}`,t.vendor="vimeo",s="video";}else (o=i.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i))?(t.src=`//maps.google.${o[1]}/?ll=${(o[2]?o[2]+"&z="+Math.floor(o[3])+(o[4]?o[4].replace(/^\//,"&"):""):o[4]+"").replace(/\?/,"&")}&output=${o[4]&&o[4].indexOf("layer=c")>0?"svembed":"embed"}`,s="map"):(o=i.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i))&&(t.src=`//maps.google.${o[1]}/maps?q=${o[2].replace("query=","q=").replace("api=1","")}&output=embed`,s="map");s||("#"===i.charAt(0)?s="inline":(o=i.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))?(s="html5video",t.format=t.format||"video/"+("ogv"===o[1]?"ogg":o[1])):i.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?s="image":i.match(/\.(pdf)((\?|#).*)?$/i)&&(s="pdf")),t.type=s||this.fancybox.option("defaultType","image"),"html5video"!==s&&"video"!==s||(t.video=e({},this.fancybox.option("Html.video"),t.video),t._width&&t._height?t.ratio=parseFloat(t._width)/parseFloat(t._height):t.ratio=t.ratio||t.video.ratio||S.video.ratio);}}onReady(){this.fancybox.Carousel.slides.forEach((t=>{t.$el&&(this.setContent(t),t.index===this.fancybox.getSlide().index&&this.playVideo(t));}));}onCreateSlide(t,e,i){"ready"===this.fancybox.state&&this.setContent(i);}loadInlineContent(t){let e;if(t.src instanceof HTMLElement)e=t.src;else if("string"==typeof t.src){const i=t.src.split("#",2),s=2===i.length&&""===i[0]?i[1]:i[0];e=document.getElementById(s);}if(e){if("clone"===t.type||e.$placeHolder){e=e.cloneNode(!0);let i=e.getAttribute("id");i=i?`${i}--clone`:`clone-${this.fancybox.id}-${t.index}`,e.setAttribute("id",i);}else {const t=document.createElement("div");t.classList.add("fancybox-placeholder"),e.parentNode.insertBefore(t,e),e.$placeHolder=t;}this.fancybox.setContent(t,e);}else this.fancybox.setError(t,"{{ELEMENT_NOT_FOUND}}");}loadAjaxContent(t){const e=this.fancybox,i=new XMLHttpRequest;e.showLoading(t),i.onreadystatechange=function(){i.readyState===XMLHttpRequest.DONE&&"ready"===e.state&&(e.hideLoading(t),200===i.status?e.setContent(t,i.responseText):e.setError(t,404===i.status?"{{AJAX_NOT_FOUND}}":"{{AJAX_FORBIDDEN}}"));};const s=t.ajax||null;i.open(s?"POST":"GET",t.src),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i.send(s),t.xhr=i;}loadIframeContent(t){const e=this.fancybox,i=document.createElement("iframe");if(i.className="fancybox__iframe",i.setAttribute("id",`fancybox__iframe_${e.id}_${t.index}`),i.setAttribute("allow","autoplay; fullscreen"),i.setAttribute("scrolling","auto"),t.$iframe=i,"iframe"!==t.type||!1===t.preload)return i.setAttribute("src",t.src),this.fancybox.setContent(t,i),void this.resizeIframe(t);e.showLoading(t);const s=document.createElement("div");s.style.visibility="hidden",this.fancybox.setContent(t,s),s.appendChild(i),i.onerror=()=>{e.setError(t,"{{IFRAME_ERROR}}");},i.onload=()=>{e.hideLoading(t);let s=!1;i.isReady||(i.isReady=!0,s=!0),i.src.length&&(i.parentNode.style.visibility="",this.resizeIframe(t),s&&e.revealContent(t));},i.setAttribute("src",t.src);}setAspectRatio(t){const e=t.$content,i=t.ratio;if(!e)return;let s=t._width,o=t._height;if(i||s&&o){Object.assign(e.style,{width:s&&o?"100%":"",height:s&&o?"100%":"",maxWidth:"",maxHeight:""});let t=e.offsetWidth,n=e.offsetHeight;if(s=s||t,o=o||n,s>t||o>n){let e=Math.min(t/s,n/o);s*=e,o*=e;}Math.abs(s/o-i)>.01&&(i<s/o?s=o*i:o=s/i),Object.assign(e.style,{width:`${s}px`,height:`${o}px`});}}resizeIframe(t){const e=t.$iframe;if(!e)return;let i=t._width||0,s=t._height||0;i&&s&&(t.autoSize=!1);const o=e.parentNode,n=o&&o.style;if(!1!==t.preload&&!1!==t.autoSize&&n)try{const t=window.getComputedStyle(o),a=parseFloat(t.paddingLeft)+parseFloat(t.paddingRight),r=parseFloat(t.paddingTop)+parseFloat(t.paddingBottom),h=e.contentWindow.document,l=h.getElementsByTagName("html")[0],c=h.body;n.width="",c.style.overflow="hidden",i=i||l.scrollWidth+a,n.width=`${i}px`,c.style.overflow="",n.flex="0 0 auto",n.height=`${c.scrollHeight}px`,s=l.scrollHeight+r;}catch(t){}if(i||s){const t={flex:"0 1 auto"};i&&(t.width=`${i}px`),s&&(t.height=`${s}px`),Object.assign(n,t);}}onRefresh(t,e){e.slides.forEach((t=>{t.$el&&(t.$iframe&&this.resizeIframe(t),t.ratio&&this.setAspectRatio(t));}));}setContent(t){if(t&&!t.isDom){switch(t.type){case"html":this.fancybox.setContent(t,t.src);break;case"html5video":this.fancybox.setContent(t,this.fancybox.option("Html.html5video.tpl").replace(/\{\{src\}\}/gi,t.src).replace("{{format}}",t.format||t.html5video&&t.html5video.format||"").replace("{{poster}}",t.poster||t.thumb||""));break;case"inline":case"clone":this.loadInlineContent(t);break;case"ajax":this.loadAjaxContent(t);break;case"pdf":case"video":case"map":t.preload=!1;case"iframe":this.loadIframeContent(t);}t.ratio&&this.setAspectRatio(t);}}onSelectSlide(t,e,i){"ready"===t.state&&this.playVideo(i);}playVideo(t){if("html5video"===t.type&&t.video.autoplay)try{const e=t.$el.querySelector("video");if(e){const t=e.play();void 0!==t&&t.then((()=>{})).catch((t=>{e.muted=!0,e.play();}));}}catch(t){}if("video"!==t.type||!t.$iframe||!t.$iframe.contentWindow)return;const e=()=>{if("done"===t.state&&t.$iframe&&t.$iframe.contentWindow){let e;if(t.$iframe.isReady)return t.video&&t.video.autoplay&&(e="youtube"==t.vendor?{event:"command",func:"playVideo"}:{method:"play",value:"true"}),void(e&&t.$iframe.contentWindow.postMessage(JSON.stringify(e),"*"));"youtube"===t.vendor&&(e={event:"listening",id:t.$iframe.getAttribute("id")},t.$iframe.contentWindow.postMessage(JSON.stringify(e),"*"));}t.poller=setTimeout(e,250);};e();}onUnselectSlide(t,e,i){if("html5video"===i.type){try{i.$el.querySelector("video").pause();}catch(t){}return}let s=!1;"vimeo"==i.vendor?s={method:"pause",value:"true"}:"youtube"===i.vendor&&(s={event:"command",func:"pauseVideo"}),s&&i.$iframe&&i.$iframe.contentWindow&&i.$iframe.contentWindow.postMessage(JSON.stringify(s),"*"),clearTimeout(i.poller);}onRemoveSlide(t,e,i){i.xhr&&(i.xhr.abort(),i.xhr=null),i.$iframe&&(i.$iframe.onload=i.$iframe.onerror=null,i.$iframe.src="//about:blank",i.$iframe=null);const s=i.$content;"inline"===i.type&&s&&(s.classList.remove("fancybox__content"),"none"!==s.style.display&&(s.style.display="none")),i.$closeButton&&(i.$closeButton.remove(),i.$closeButton=null);const o=s&&s.$placeHolder;o&&(o.parentNode.insertBefore(s,o),o.remove(),s.$placeHolder=null);}onMessage(t){try{let e=JSON.parse(t.data);if("https://player.vimeo.com"===t.origin){if("ready"===e.event)for(let e of document.getElementsByClassName("fancybox__iframe"))e.contentWindow===t.source&&(e.isReady=1);}else "https://www.youtube-nocookie.com"===t.origin&&"onReady"===e.event&&(document.getElementById(e.id).isReady=1);}catch(t){}}attach(){this.fancybox.on(this.events),window.addEventListener("message",this.onMessage,!1);}detach(){this.fancybox.off(this.events),window.removeEventListener("message",this.onMessage,!1);}}E.defaults=S;class P{constructor(t){this.fancybox=t;for(const t of ["onReady","onClosing","onDone","onPageChange","onCreateSlide","onRemoveSlide","onImageStatusChange"])this[t]=this[t].bind(this);this.events={ready:this.onReady,closing:this.onClosing,done:this.onDone,"Carousel.change":this.onPageChange,"Carousel.createSlide":this.onCreateSlide,"Carousel.removeSlide":this.onRemoveSlide};}onReady(){this.fancybox.Carousel.slides.forEach((t=>{t.$el&&this.setContent(t);}));}onDone(t,e){this.handleCursor(e);}onClosing(t){clearTimeout(this.clickTimer),this.clickTimer=null,t.Carousel.slides.forEach((t=>{t.$image&&(t.state="destroy"),t.Panzoom&&t.Panzoom.detachEvents();})),"closing"===this.fancybox.state&&this.canZoom(t.getSlide())&&this.zoomOut();}onCreateSlide(t,e,i){"ready"===this.fancybox.state&&this.setContent(i);}onRemoveSlide(t,e,i){i.$image&&(i.$el.classList.remove(t.option("Image.canZoomInClass")),i.$image.remove(),i.$image=null),i.Panzoom&&(i.Panzoom.destroy(),i.Panzoom=null),i.$el&&i.$el.dataset&&delete i.$el.dataset.imageFit;}setContent(t){if(t.isDom||t.html||t.type&&"image"!==t.type)return;if(t.$image)return;t.type="image",t.state="loading";const e=document.createElement("div");e.style.visibility="hidden";const i=document.createElement("img");i.addEventListener("load",(e=>{e.stopImmediatePropagation(),this.onImageStatusChange(t);})),i.addEventListener("error",(()=>{this.onImageStatusChange(t);})),i.src=t.src,i.alt="",i.draggable=!1,i.classList.add("fancybox__image"),t.srcset&&i.setAttribute("srcset",t.srcset),t.sizes&&i.setAttribute("sizes",t.sizes),t.$image=i;const s=this.fancybox.option("Image.wrap");if(s){const o=document.createElement("div");o.classList.add("string"==typeof s?s:"fancybox__image-wrap"),o.appendChild(i),e.appendChild(o),t.$wrap=o;}else e.appendChild(i);t.$el.dataset.imageFit=this.fancybox.option("Image.fit"),this.fancybox.setContent(t,e),i.complete||i.error?this.onImageStatusChange(t):this.fancybox.showLoading(t);}onImageStatusChange(t){const e=t.$image;e&&"loading"===t.state&&(e.complete&&e.naturalWidth&&e.naturalHeight?(this.fancybox.hideLoading(t),"contain"===this.fancybox.option("Image.fit")&&this.initSlidePanzoom(t),t.$el.addEventListener("wheel",(e=>this.onWheel(t,e)),{passive:!1}),t.$content.addEventListener("click",(e=>this.onClick(t,e)),{passive:!1}),this.revealContent(t)):this.fancybox.setError(t,"{{IMAGE_ERROR}}"));}initSlidePanzoom(t){t.Panzoom||(t.Panzoom=new d(t.$el,e(!0,this.fancybox.option("Image.Panzoom",{}),{viewport:t.$wrap,content:t.$image,width:t._width,height:t._height,wrapInner:!1,textSelection:!0,touch:this.fancybox.option("Image.touch"),panOnlyZoomed:!0,click:!1,wheel:!1})),t.Panzoom.on("startAnimation",(()=>{this.fancybox.trigger("Image.startAnimation",t);})),t.Panzoom.on("endAnimation",(()=>{"zoomIn"===t.state&&this.fancybox.done(t),this.handleCursor(t),this.fancybox.trigger("Image.endAnimation",t);})),t.Panzoom.on("afterUpdate",(()=>{this.handleCursor(t),this.fancybox.trigger("Image.afterUpdate",t);})));}revealContent(t){null===this.fancybox.Carousel.prevPage&&t.index===this.fancybox.options.startIndex&&this.canZoom(t)?this.zoomIn():this.fancybox.revealContent(t);}getZoomInfo(t){const e=t.$thumb.getBoundingClientRect(),i=e.width,s=e.height,o=t.$content.getBoundingClientRect(),n=o.width,a=o.height,r=o.top-e.top,h=o.left-e.left;let l=this.fancybox.option("Image.zoomOpacity");return "auto"===l&&(l=Math.abs(i/s-n/a)>.1),{top:r,left:h,scale:n&&i?i/n:1,opacity:l}}canZoom(t){const e=this.fancybox,i=e.$container;if(window.visualViewport&&1!==window.visualViewport.scale)return !1;if(t.Panzoom&&!t.Panzoom.content.width)return !1;if(!e.option("Image.zoom")||"contain"!==e.option("Image.fit"))return !1;const s=t.$thumb;if(!s||"loading"===t.state)return !1;i.classList.add("fancybox__no-click");const o=s.getBoundingClientRect();let n;if(this.fancybox.option("Image.ignoreCoveredThumbnail")){const t=document.elementFromPoint(o.left+1,o.top+1)===s,e=document.elementFromPoint(o.right-1,o.bottom-1)===s;n=t&&e;}else n=document.elementFromPoint(o.left+.5*o.width,o.top+.5*o.height)===s;return i.classList.remove("fancybox__no-click"),n}zoomIn(){const t=this.fancybox,e=t.getSlide(),i=e.Panzoom,{top:s,left:o,scale:n,opacity:a}=this.getZoomInfo(e);t.trigger("reveal",e),i.panTo({x:-1*o,y:-1*s,scale:n,friction:0,ignoreBounds:!0}),e.$content.style.visibility="",e.state="zoomIn",!0===a&&i.on("afterTransform",(t=>{"zoomIn"!==e.state&&"zoomOut"!==e.state||(t.$content.style.opacity=Math.min(1,1-(1-t.content.scale)/(1-n)));})),i.panTo({x:0,y:0,scale:1,friction:this.fancybox.option("Image.zoomFriction")});}zoomOut(){const t=this.fancybox,e=t.getSlide(),i=e.Panzoom;if(!i)return;e.state="zoomOut",t.state="customClosing",e.$caption&&(e.$caption.style.visibility="hidden");let s=this.fancybox.option("Image.zoomFriction");const o=t=>{const{top:o,left:n,scale:a,opacity:r}=this.getZoomInfo(e);t||r||(s*=.82),i.panTo({x:-1*n,y:-1*o,scale:a,friction:s,ignoreBounds:!0}),s*=.98;};window.addEventListener("scroll",o),i.once("endAnimation",(()=>{window.removeEventListener("scroll",o),t.destroy();})),o();}handleCursor(t){if("image"!==t.type||!t.$el)return;const e=t.Panzoom,i=this.fancybox.option("Image.click",!1,t),s=this.fancybox.option("Image.touch"),o=t.$el.classList,n=this.fancybox.option("Image.canZoomInClass"),a=this.fancybox.option("Image.canZoomOutClass");if(o.remove(a),o.remove(n),e&&"toggleZoom"===i){e&&1===e.content.scale&&e.option("maxScale")-e.content.scale>.01?o.add(n):e.content.scale>1&&!s&&o.add(a);}else "close"===i&&o.add(a);}onWheel(t,e){if("ready"===this.fancybox.state&&!1!==this.fancybox.trigger("Image.wheel",e))switch(this.fancybox.option("Image.wheel")){case"zoom":"done"===t.state&&t.Panzoom&&t.Panzoom.zoomWithWheel(e);break;case"close":this.fancybox.close();break;case"slide":this.fancybox[e.deltaY<0?"prev":"next"]();}}onClick(t,e){if("ready"!==this.fancybox.state)return;const i=t.Panzoom;if(i&&(i.dragPosition.midPoint||0!==i.dragOffset.x||0!==i.dragOffset.y||1!==i.dragOffset.scale))return;if(this.fancybox.Carousel.Panzoom.lockAxis)return !1;const s=i=>{switch(i){case"toggleZoom":e.stopPropagation(),t.Panzoom&&t.Panzoom.zoomWithClick(e);break;case"close":this.fancybox.close();break;case"next":e.stopPropagation(),this.fancybox.next();}},o=this.fancybox.option("Image.click"),n=this.fancybox.option("Image.doubleClick");n?this.clickTimer?(clearTimeout(this.clickTimer),this.clickTimer=null,s(n)):this.clickTimer=setTimeout((()=>{this.clickTimer=null,s(o);}),300):s(o);}onPageChange(t,e){const i=t.getSlide();e.slides.forEach((t=>{t.Panzoom&&"done"===t.state&&t.index!==i.index&&t.Panzoom.panTo({x:0,y:0,scale:1,friction:.8});}));}attach(){this.fancybox.on(this.events);}detach(){this.fancybox.off(this.events);}}P.defaults={canZoomInClass:"can-zoom_in",canZoomOutClass:"can-zoom_out",zoom:!0,zoomOpacity:"auto",zoomFriction:.82,ignoreCoveredThumbnail:!1,touch:!0,click:"toggleZoom",doubleClick:null,wheel:"zoom",fit:"contain",wrap:!1,Panzoom:{ratio:1}};class L{constructor(t){this.fancybox=t;for(const t of ["onChange","onClosing"])this[t]=this[t].bind(this);this.events={initCarousel:this.onChange,"Carousel.change":this.onChange,closing:this.onClosing},this.hasCreatedHistory=!1,this.origHash="",this.timer=null;}onChange(t){const e=t.Carousel;this.timer&&clearTimeout(this.timer);const i=null===e.prevPage,s=t.getSlide(),o=new URL(document.URL).hash;let n=!1;if(s.slug)n="#"+s.slug;else {const i=s.$trigger&&s.$trigger.dataset,o=t.option("slug")||i&&i.fancybox;o&&o.length&&"true"!==o&&(n="#"+o+(e.slides.length>1?"-"+(s.index+1):""));}i&&(this.origHash=o!==n?o:""),n&&o!==n&&(this.timer=setTimeout((()=>{try{window.history[i?"pushState":"replaceState"]({},document.title,window.location.pathname+window.location.search+n),i&&(this.hasCreatedHistory=!0);}catch(t){}}),300));}onClosing(){if(this.timer&&clearTimeout(this.timer),!0!==this.hasSilentClose)try{return void window.history.replaceState({},document.title,window.location.pathname+window.location.search+(this.origHash||""))}catch(t){}}attach(t){t.on(this.events);}detach(t){t.off(this.events);}static startFromUrl(){const t=L.Fancybox;if(!t||t.getInstance()||!1===t.defaults.Hash)return;const{hash:e,slug:i,index:s}=L.getParsedURL();if(!i)return;let o=document.querySelector(`[data-slug="${e}"]`);if(o&&o.dispatchEvent(new CustomEvent("click",{bubbles:!0,cancelable:!0})),t.getInstance())return;const n=document.querySelectorAll(`[data-fancybox="${i}"]`);n.length&&(null===s&&1===n.length?o=n[0]:s&&(o=n[s-1]),o&&o.dispatchEvent(new CustomEvent("click",{bubbles:!0,cancelable:!0})));}static onHashChange(){const{slug:t,index:e}=L.getParsedURL(),i=L.Fancybox,s=i&&i.getInstance();if(s&&s.plugins.Hash){if(t){const i=s.Carousel;if(t===s.option("slug"))return i.slideTo(e-1);for(let e of i.slides)if(e.slug&&e.slug===t)return i.slideTo(e.index);const o=s.getSlide(),n=o.$trigger&&o.$trigger.dataset;if(n&&n.fancybox===t)return i.slideTo(e-1)}s.plugins.Hash.hasSilentClose=!0,s.close();}L.startFromUrl();}static create(t){function e(){window.addEventListener("hashchange",L.onHashChange,!1),L.startFromUrl();}L.Fancybox=t,v&&window.requestAnimationFrame((()=>{/complete|interactive|loaded/.test(document.readyState)?e():document.addEventListener("DOMContentLoaded",e);}));}static destroy(){window.removeEventListener("hashchange",L.onHashChange,!1);}static getParsedURL(){const t=window.location.hash.substr(1),e=t.split("-"),i=e.length>1&&/^\+?\d+$/.test(e[e.length-1])&&parseInt(e.pop(-1),10)||null;return {hash:t,slug:e.join("-"),index:i}}}const T={pageXOffset:0,pageYOffset:0,element:()=>document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,activate(t){T.pageXOffset=window.pageXOffset,T.pageYOffset=window.pageYOffset,t.requestFullscreen?t.requestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.msRequestFullscreen&&t.msRequestFullscreen();},deactivate(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen();}};class _{constructor(t){this.fancybox=t,this.active=!1,this.handleVisibilityChange=this.handleVisibilityChange.bind(this);}isActive(){return this.active}setTimer(){if(!this.active||this.timer)return;const t=this.fancybox.option("slideshow.delay",3e3);this.timer=setTimeout((()=>{this.timer=null,this.fancybox.option("infinite")||this.fancybox.getSlide().index!==this.fancybox.Carousel.slides.length-1?this.fancybox.next():this.fancybox.jumpTo(0,{friction:0});}),t);let e=this.$progress;e||(e=document.createElement("div"),e.classList.add("fancybox__progress"),this.fancybox.$carousel.parentNode.insertBefore(e,this.fancybox.$carousel),this.$progress=e,e.offsetHeight),e.style.transitionDuration=`${t}ms`,e.style.transform="scaleX(1)";}clearTimer(){clearTimeout(this.timer),this.timer=null,this.$progress&&(this.$progress.style.transitionDuration="",this.$progress.style.transform="",this.$progress.offsetHeight);}activate(){this.active||(this.active=!0,this.fancybox.$container.classList.add("has-slideshow"),"done"===this.fancybox.getSlide().state&&this.setTimer(),document.addEventListener("visibilitychange",this.handleVisibilityChange,!1));}handleVisibilityChange(){this.deactivate();}deactivate(){this.active=!1,this.clearTimer(),this.fancybox.$container.classList.remove("has-slideshow"),document.removeEventListener("visibilitychange",this.handleVisibilityChange,!1);}toggle(){this.active?this.deactivate():this.fancybox.Carousel.slides.length>1&&this.activate();}}const A={display:["counter","zoom","slideshow","fullscreen","thumbs","close"],autoEnable:!0,items:{counter:{position:"left",type:"div",class:"fancybox__counter",html:'<span data-fancybox-index=""></span>&nbsp;/&nbsp;<span data-fancybox-count=""></span>',attr:{tabindex:-1}},prev:{type:"button",class:"fancybox__button--prev",label:"PREV",html:'<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>',attr:{"data-fancybox-prev":""}},next:{type:"button",class:"fancybox__button--next",label:"NEXT",html:'<svg viewBox="0 0 24 24"><path d="M8 4l8 8-8 8"/></svg>',attr:{"data-fancybox-next":""}},fullscreen:{type:"button",class:"fancybox__button--fullscreen",label:"TOGGLE_FULLSCREEN",html:'<svg viewBox="0 0 24 24">\n                <g><path d="M3 8 V3h5"></path><path d="M21 8V3h-5"></path><path d="M8 21H3v-5"></path><path d="M16 21h5v-5"></path></g>\n                <g><path d="M7 2v5H2M17 2v5h5M2 17h5v5M22 17h-5v5"/></g>\n            </svg>',click:function(t){t.preventDefault(),T.element()?T.deactivate():T.activate(this.fancybox.$container);}},slideshow:{type:"button",class:"fancybox__button--slideshow",label:"TOGGLE_SLIDESHOW",html:'<svg viewBox="0 0 24 24">\n                <g><path d="M6 4v16"/><path d="M20 12L6 20"/><path d="M20 12L6 4"/></g>\n                <g><path d="M7 4v15M17 4v15"/></g>\n            </svg>',click:function(t){t.preventDefault(),this.Slideshow.toggle();}},zoom:{type:"button",class:"fancybox__button--zoom",label:"TOGGLE_ZOOM",html:'<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="7"></circle><path d="M16 16 L21 21"></svg>',click:function(t){t.preventDefault();const e=this.fancybox.getSlide().Panzoom;e&&e.toggleZoom();}},download:{type:"link",label:"DOWNLOAD",class:"fancybox__button--download",html:'<svg viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.62 2.48A2 2 0 004.56 21h14.88a2 2 0 001.94-1.51L22 17"/></svg>',click:function(t){t.stopPropagation();}},thumbs:{type:"button",label:"TOGGLE_THUMBS",class:"fancybox__button--thumbs",html:'<svg viewBox="0 0 24 24"><circle cx="4" cy="4" r="1" /><circle cx="12" cy="4" r="1" transform="rotate(90 12 4)"/><circle cx="20" cy="4" r="1" transform="rotate(90 20 4)"/><circle cx="4" cy="12" r="1" transform="rotate(90 4 12)"/><circle cx="12" cy="12" r="1" transform="rotate(90 12 12)"/><circle cx="20" cy="12" r="1" transform="rotate(90 20 12)"/><circle cx="4" cy="20" r="1" transform="rotate(90 4 20)"/><circle cx="12" cy="20" r="1" transform="rotate(90 12 20)"/><circle cx="20" cy="20" r="1" transform="rotate(90 20 20)"/></svg>',click:function(t){t.stopPropagation();const e=this.fancybox.plugins.Thumbs;e&&e.toggle();}},close:{type:"button",label:"CLOSE",class:"fancybox__button--close",html:'<svg viewBox="0 0 24 24"><path d="M20 20L4 4m16 0L4 20"></path></svg>',attr:{"data-fancybox-close":"",tabindex:0}}}};class z{constructor(t){this.fancybox=t,this.$container=null,this.state="init";for(const t of ["onInit","onPrepare","onDone","onKeydown","onClosing","onChange","onSettle","onRefresh"])this[t]=this[t].bind(this);this.events={init:this.onInit,prepare:this.onPrepare,done:this.onDone,keydown:this.onKeydown,closing:this.onClosing,"Carousel.change":this.onChange,"Carousel.settle":this.onSettle,"Carousel.Panzoom.touchStart":()=>this.onRefresh(),"Image.startAnimation":(t,e)=>this.onRefresh(e),"Image.afterUpdate":(t,e)=>this.onRefresh(e)};}onInit(){if(this.fancybox.option("Toolbar.autoEnable")){let t=!1;for(const e of this.fancybox.items)if("image"===e.type){t=!0;break}if(!t)return void(this.state="disabled")}for(const e of this.fancybox.option("Toolbar.display")){if("close"===(t(e)?e.id:e)){this.fancybox.options.closeButton=!1;break}}}onPrepare(){const t=this.fancybox;if("init"===this.state&&(this.build(),this.update(),this.Slideshow=new _(t),!t.Carousel.prevPage&&(t.option("slideshow.autoStart")&&this.Slideshow.activate(),t.option("fullscreen.autoStart")&&!T.element())))try{T.activate(t.$container);}catch(t){}}onFsChange(){window.scrollTo(T.pageXOffset,T.pageYOffset);}onSettle(){const t=this.fancybox,e=this.Slideshow;e&&e.isActive()&&(t.getSlide().index!==t.Carousel.slides.length-1||t.option("infinite")?"done"===t.getSlide().state&&e.setTimer():e.deactivate());}onChange(){this.update(),this.Slideshow&&this.Slideshow.isActive()&&this.Slideshow.clearTimer();}onDone(t,e){const i=this.Slideshow;e.index===t.getSlide().index&&(this.update(),i&&i.isActive()&&(t.option("infinite")||e.index!==t.Carousel.slides.length-1?i.setTimer():i.deactivate()));}onRefresh(t){t&&t.index!==this.fancybox.getSlide().index||(this.update(),!this.Slideshow||!this.Slideshow.isActive()||t&&"done"!==t.state||this.Slideshow.deactivate());}onKeydown(t,e,i){" "===e&&this.Slideshow&&(this.Slideshow.toggle(),i.preventDefault());}onClosing(){this.Slideshow&&this.Slideshow.deactivate(),document.removeEventListener("fullscreenchange",this.onFsChange);}createElement(t){let e;"div"===t.type?e=document.createElement("div"):(e=document.createElement("link"===t.type?"a":"button"),e.classList.add("carousel__button")),e.innerHTML=t.html,e.setAttribute("tabindex",t.tabindex||0),t.class&&e.classList.add(...t.class.split(" "));for(const i in t.attr)e.setAttribute(i,t.attr[i]);t.label&&e.setAttribute("title",this.fancybox.localize(`{{${t.label}}}`)),t.click&&e.addEventListener("click",t.click.bind(this)),"prev"===t.id&&e.setAttribute("data-fancybox-prev",""),"next"===t.id&&e.setAttribute("data-fancybox-next","");const i=e.querySelector("svg");return i&&(i.setAttribute("role","img"),i.setAttribute("tabindex","-1"),i.setAttribute("xmlns","http://www.w3.org/2000/svg")),e}build(){this.cleanup();const i=this.fancybox.option("Toolbar.items"),s=[{position:"left",items:[]},{position:"center",items:[]},{position:"right",items:[]}],o=this.fancybox.plugins.Thumbs;for(const n of this.fancybox.option("Toolbar.display")){let a,r;if(t(n)?(a=n.id,r=e({},i[a],n)):(a=n,r=i[a]),["counter","next","prev","slideshow"].includes(a)&&this.fancybox.items.length<2)continue;if("fullscreen"===a){if(!document.fullscreenEnabled||window.fullScreen)continue;document.addEventListener("fullscreenchange",this.onFsChange);}if("thumbs"===a&&(!o||"disabled"===o.state))continue;if(!r)continue;let h=r.position||"right",l=s.find((t=>t.position===h));l&&l.items.push(r);}const n=document.createElement("div");n.classList.add("fancybox__toolbar");for(const t of s)if(t.items.length){const e=document.createElement("div");e.classList.add("fancybox__toolbar__items"),e.classList.add(`fancybox__toolbar__items--${t.position}`);for(const i of t.items)e.appendChild(this.createElement(i));n.appendChild(e);}this.fancybox.$carousel.parentNode.insertBefore(n,this.fancybox.$carousel),this.$container=n;}update(){const t=this.fancybox.getSlide(),e=t.index,i=this.fancybox.items.length,s=t.downloadSrc||("image"!==t.type||t.error?null:t.src);for(const t of this.fancybox.$container.querySelectorAll("a.fancybox__button--download"))s?(t.removeAttribute("disabled"),t.removeAttribute("tabindex"),t.setAttribute("href",s),t.setAttribute("download",s),t.setAttribute("target","_blank")):(t.setAttribute("disabled",""),t.setAttribute("tabindex",-1),t.removeAttribute("href"),t.removeAttribute("download"));const o=t.Panzoom,n=o&&o.option("maxScale")>o.option("baseScale");for(const t of this.fancybox.$container.querySelectorAll(".fancybox__button--zoom"))n?t.removeAttribute("disabled"):t.setAttribute("disabled","");for(const e of this.fancybox.$container.querySelectorAll("[data-fancybox-index]"))e.innerHTML=t.index+1;for(const t of this.fancybox.$container.querySelectorAll("[data-fancybox-count]"))t.innerHTML=i;if(!this.fancybox.option("infinite")){for(const t of this.fancybox.$container.querySelectorAll("[data-fancybox-prev]"))0===e?t.setAttribute("disabled",""):t.removeAttribute("disabled");for(const t of this.fancybox.$container.querySelectorAll("[data-fancybox-next]"))e===i-1?t.setAttribute("disabled",""):t.removeAttribute("disabled");}}cleanup(){this.Slideshow&&this.Slideshow.isActive()&&this.Slideshow.clearTimer(),this.$container&&this.$container.remove(),this.$container=null;}attach(){this.fancybox.on(this.events);}detach(){this.fancybox.off(this.events),this.cleanup();}}z.defaults=A;const k={ScrollLock:class{constructor(t){this.fancybox=t,this.viewport=null,this.pendingUpdate=null;for(const t of ["onReady","onResize","onTouchstart","onTouchmove"])this[t]=this[t].bind(this);}onReady(){const t=window.visualViewport;t&&(this.viewport=t,this.startY=0,t.addEventListener("resize",this.onResize),this.updateViewport()),window.addEventListener("touchstart",this.onTouchstart,{passive:!1}),window.addEventListener("touchmove",this.onTouchmove,{passive:!1}),window.addEventListener("wheel",this.onWheel,{passive:!1});}onResize(){this.updateViewport();}updateViewport(){const t=this.fancybox,e=this.viewport,i=e.scale||1,s=t.$container;if(!s)return;let o="",n="",a="";i-1>.1&&(o=e.width*i+"px",n=e.height*i+"px",a=`translate3d(${e.offsetLeft}px, ${e.offsetTop}px, 0) scale(${1/i})`),s.style.width=o,s.style.height=n,s.style.transform=a;}onTouchstart(t){this.startY=t.touches?t.touches[0].screenY:t.screenY;}onTouchmove(t){const e=this.startY,i=window.innerWidth/window.document.documentElement.clientWidth;if(!t.cancelable)return;if(t.touches.length>1||1!==i)return;const o=s(t.composedPath()[0]);if(!o)return void t.preventDefault();const n=window.getComputedStyle(o),a=parseInt(n.getPropertyValue("height"),10),r=t.touches?t.touches[0].screenY:t.screenY,h=e<=r&&0===o.scrollTop,l=e>=r&&o.scrollHeight-o.scrollTop===a;(h||l)&&t.preventDefault();}onWheel(t){s(t.composedPath()[0])||t.preventDefault();}cleanup(){this.pendingUpdate&&(cancelAnimationFrame(this.pendingUpdate),this.pendingUpdate=null);const t=this.viewport;t&&(t.removeEventListener("resize",this.onResize),this.viewport=null),window.removeEventListener("touchstart",this.onTouchstart,!1),window.removeEventListener("touchmove",this.onTouchmove,!1),window.removeEventListener("wheel",this.onWheel,{passive:!1});}attach(){this.fancybox.on("initLayout",this.onReady);}detach(){this.fancybox.off("initLayout",this.onReady),this.cleanup();}},Thumbs:$,Html:E,Toolbar:z,Image:P,Hash:L};const O={startIndex:0,preload:1,infinite:!0,showClass:"fancybox-zoomInUp",hideClass:"fancybox-fadeOut",animated:!0,hideScrollbar:!0,parentEl:null,mainClass:null,autoFocus:!0,trapFocus:!0,placeFocusBack:!0,click:"close",closeButton:"inside",dragToClose:!0,keyboard:{Escape:"close",Delete:"close",Backspace:"close",PageUp:"next",PageDown:"prev",ArrowUp:"next",ArrowDown:"prev",ArrowRight:"next",ArrowLeft:"prev"},template:{closeButton:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg>',spinner:'<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',main:null},l10n:{CLOSE:"Close",NEXT:"Next",PREV:"Previous",MODAL:"You can close this modal content with the ESC key",ERROR:"Something Went Wrong, Please Try Again Later",IMAGE_ERROR:"Image Not Found",ELEMENT_NOT_FOUND:"HTML Element Not Found",AJAX_NOT_FOUND:"Error Loading AJAX : Not Found",AJAX_FORBIDDEN:"Error Loading AJAX : Forbidden",IFRAME_ERROR:"Error Loading Page",TOGGLE_ZOOM:"Toggle zoom level",TOGGLE_THUMBS:"Toggle thumbnails",TOGGLE_SLIDESHOW:"Toggle slideshow",TOGGLE_FULLSCREEN:"Toggle full-screen mode",DOWNLOAD:"Download"}},M=new Map;let I=0;class F extends l{constructor(t,i={}){t=t.map((t=>(t.width&&(t._width=t.width),t.height&&(t._height=t.height),t))),super(e(!0,{},O,i)),this.bindHandlers(),this.state="init",this.setItems(t),this.attachPlugins(F.Plugins),this.trigger("init"),!0===this.option("hideScrollbar")&&this.hideScrollbar(),this.initLayout(),this.initCarousel(),this.attachEvents(),M.set(this.id,this),this.trigger("prepare"),this.state="ready",this.trigger("ready"),this.$container.setAttribute("aria-hidden","false"),this.option("trapFocus")&&this.focus();}option(t,...e){const i=this.getSlide();let s=i?i[t]:void 0;return void 0!==s?("function"==typeof s&&(s=s.call(this,this,...e)),s):super.option(t,...e)}bindHandlers(){for(const t of ["onMousedown","onKeydown","onClick","onFocus","onCreateSlide","onSettle","onTouchMove","onTouchEnd","onTransform"])this[t]=this[t].bind(this);}attachEvents(){document.addEventListener("mousedown",this.onMousedown),document.addEventListener("keydown",this.onKeydown,!0),this.option("trapFocus")&&document.addEventListener("focus",this.onFocus,!0),this.$container.addEventListener("click",this.onClick);}detachEvents(){document.removeEventListener("mousedown",this.onMousedown),document.removeEventListener("keydown",this.onKeydown,!0),document.removeEventListener("focus",this.onFocus,!0),this.$container.removeEventListener("click",this.onClick);}initLayout(){this.$root=this.option("parentEl")||document.body;let t=this.option("template.main");t&&(this.$root.insertAdjacentHTML("beforeend",this.localize(t)),this.$container=this.$root.querySelector(".fancybox__container")),this.$container||(this.$container=document.createElement("div"),this.$root.appendChild(this.$container)),this.$container.onscroll=()=>(this.$container.scrollLeft=0,!1),Object.entries({class:"fancybox__container",role:"dialog",tabIndex:"-1","aria-modal":"true","aria-hidden":"true","aria-label":this.localize("{{MODAL}}")}).forEach((t=>this.$container.setAttribute(...t))),this.option("animated")&&this.$container.classList.add("is-animated"),this.$backdrop=this.$container.querySelector(".fancybox__backdrop"),this.$backdrop||(this.$backdrop=document.createElement("div"),this.$backdrop.classList.add("fancybox__backdrop"),this.$container.appendChild(this.$backdrop)),this.$carousel=this.$container.querySelector(".fancybox__carousel"),this.$carousel||(this.$carousel=document.createElement("div"),this.$carousel.classList.add("fancybox__carousel"),this.$container.appendChild(this.$carousel)),this.$container.Fancybox=this,this.id=this.$container.getAttribute("id"),this.id||(this.id=this.options.id||++I,this.$container.setAttribute("id","fancybox-"+this.id));const e=this.option("mainClass");return e&&this.$container.classList.add(...e.split(" ")),document.documentElement.classList.add("with-fancybox"),this.trigger("initLayout"),this}setItems(t){const e=[];for(const i of t){const t=i.$trigger;if(t){const e=t.dataset||{};i.src=e.src||t.getAttribute("href")||i.src,i.type=e.type||i.type,!i.src&&t instanceof HTMLImageElement&&(i.src=t.currentSrc||i.$trigger.src);}let s=i.$thumb;if(!s){let t=i.$trigger&&i.$trigger.origTarget;t&&(s=t instanceof HTMLImageElement?t:t.querySelector("img:not([aria-hidden])")),!s&&i.$trigger&&(s=i.$trigger instanceof HTMLImageElement?i.$trigger:i.$trigger.querySelector("img:not([aria-hidden])"));}i.$thumb=s||null;let o=i.thumb;!o&&s&&(o=s.currentSrc||s.src,!o&&s.dataset&&(o=s.dataset.lazySrc||s.dataset.src)),o||"image"!==i.type||(o=i.src),i.thumb=o||null,i.caption=i.caption||"",e.push(i);}this.items=e;}initCarousel(){return this.Carousel=new y(this.$carousel,e(!0,{},{prefix:"",classNames:{viewport:"fancybox__viewport",track:"fancybox__track",slide:"fancybox__slide"},textSelection:!0,preload:this.option("preload"),friction:.88,slides:this.items,initialPage:this.options.startIndex,slidesPerPage:1,infiniteX:this.option("infinite"),infiniteY:!0,l10n:this.option("l10n"),Dots:!1,Navigation:{classNames:{main:"fancybox__nav",button:"carousel__button",next:"is-next",prev:"is-prev"}},Panzoom:{textSelection:!0,panOnlyZoomed:()=>this.Carousel&&this.Carousel.pages&&this.Carousel.pages.length<2&&!this.option("dragToClose"),lockAxis:()=>{if(this.Carousel){let t="x";return this.option("dragToClose")&&(t+="y"),t}}},on:{"*":(t,...e)=>this.trigger(`Carousel.${t}`,...e),init:t=>this.Carousel=t,createSlide:this.onCreateSlide,settle:this.onSettle}},this.option("Carousel"))),this.option("dragToClose")&&this.Carousel.Panzoom.on({touchMove:this.onTouchMove,afterTransform:this.onTransform,touchEnd:this.onTouchEnd}),this.trigger("initCarousel"),this}onCreateSlide(t,e){let i=e.caption||"";if("function"==typeof this.options.caption&&(i=this.options.caption.call(this,this,this.Carousel,e)),"string"==typeof i&&i.length){const t=document.createElement("div"),s=`fancybox__caption_${this.id}_${e.index}`;t.className="fancybox__caption",t.innerHTML=i,t.setAttribute("id",s),e.$caption=e.$el.appendChild(t),e.$el.classList.add("has-caption"),e.$el.setAttribute("aria-labelledby",s);}}onSettle(){this.option("autoFocus")&&this.focus();}onFocus(t){this.focus(t);}onClick(t){if(t.defaultPrevented)return;let e=t.composedPath()[0];if(e.matches("[data-fancybox-close]"))return t.preventDefault(),void F.close(!1,t);if(e.matches("[data-fancybox-next]"))return t.preventDefault(),void F.next();if(e.matches("[data-fancybox-prev]"))return t.preventDefault(),void F.prev();if(e.matches(x)||document.activeElement.blur(),e.closest(".fancybox__content"))return;if(getSelection().toString().length)return;if(!1===this.trigger("click",t))return;switch(this.option("click")){case"close":this.close();break;case"next":this.next();}}onTouchMove(){const t=this.getSlide().Panzoom;return !t||1===t.content.scale}onTouchEnd(t){const e=t.dragOffset.y;Math.abs(e)>=150||Math.abs(e)>=35&&t.dragOffset.time<350?(this.option("hideClass")&&(this.getSlide().hideClass="fancybox-throwOut"+(t.content.y<0?"Up":"Down")),this.close()):"y"===t.lockAxis&&t.panTo({y:0});}onTransform(t){if(this.$backdrop){const e=Math.abs(t.content.y),i=e<1?"":Math.max(.33,Math.min(1,1-e/t.content.fitHeight*1.5));this.$container.style.setProperty("--fancybox-ts",i?"0s":""),this.$container.style.setProperty("--fancybox-opacity",i);}}onMousedown(){"ready"===this.state&&document.body.classList.add("is-using-mouse");}onKeydown(t){if(F.getInstance().id!==this.id)return;document.body.classList.remove("is-using-mouse");const e=t.key,i=this.option("keyboard");if(!i||t.ctrlKey||t.altKey||t.shiftKey)return;const s=t.composedPath()[0],o=document.activeElement&&document.activeElement.classList,n=o&&o.contains("carousel__button");if("Escape"!==e&&!n){if(t.target.isContentEditable||-1!==["BUTTON","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].indexOf(s.nodeName))return}if(!1===this.trigger("keydown",e,t))return;const a=i[e];"function"==typeof this[a]&&this[a]();}getSlide(){const t=this.Carousel;if(!t)return null;const e=null===t.page?t.option("initialPage"):t.page,i=t.pages||[];return i.length&&i[e]?i[e].slides[0]:null}focus(t){if(F.ignoreFocusChange)return;if(["init","closing","customClosing","destroy"].indexOf(this.state)>-1)return;const e=this.$container,i=this.getSlide(),s="done"===i.state?i.$el:null;if(s&&s.contains(document.activeElement))return;t&&t.preventDefault(),F.ignoreFocusChange=!0;const o=Array.from(e.querySelectorAll(x));let n,a=[];for(let t of o){const e=t.offsetParent,i=s&&s.contains(t),o=!this.Carousel.$viewport.contains(t);e&&(i||o)?(a.push(t),void 0!==t.dataset.origTabindex&&(t.tabIndex=t.dataset.origTabindex,t.removeAttribute("data-orig-tabindex")),(t.hasAttribute("autoFocus")||!n&&i&&!t.classList.contains("carousel__button"))&&(n=t)):(t.dataset.origTabindex=void 0===t.dataset.origTabindex?t.getAttribute("tabindex"):t.dataset.origTabindex,t.tabIndex=-1);}t?a.indexOf(t.target)>-1?this.lastFocus=t.target:this.lastFocus===e?w(a[a.length-1]):w(e):this.option("autoFocus")&&n?w(n):a.indexOf(document.activeElement)<0&&w(e),this.lastFocus=document.activeElement,F.ignoreFocusChange=!1;}hideScrollbar(){if(!v)return;const t=window.innerWidth-document.documentElement.getBoundingClientRect().width,e="fancybox-style-noscroll";let i=document.getElementById(e);i||t>0&&(i=document.createElement("style"),i.id=e,i.type="text/css",i.innerHTML=`.compensate-for-scrollbar {padding-right: ${t}px;}`,document.getElementsByTagName("head")[0].appendChild(i),document.body.classList.add("compensate-for-scrollbar"));}revealScrollbar(){document.body.classList.remove("compensate-for-scrollbar");const t=document.getElementById("fancybox-style-noscroll");t&&t.remove();}clearContent(t){this.Carousel.trigger("removeSlide",t),t.$content&&(t.$content.remove(),t.$content=null),t.$closeButton&&(t.$closeButton.remove(),t.$closeButton=null),t._className&&t.$el.classList.remove(t._className);}setContent(t,e,i={}){let s;const o=t.$el;if(e instanceof HTMLElement)["img","iframe","video","audio"].indexOf(e.nodeName.toLowerCase())>-1?(s=document.createElement("div"),s.appendChild(e)):s=e;else {const t=document.createRange().createContextualFragment(e);s=document.createElement("div"),s.appendChild(t);}if(t.filter&&!t.error&&(s=s.querySelector(t.filter)),s instanceof Element)return t._className=`has-${i.suffix||t.type||"unknown"}`,o.classList.add(t._className),s.classList.add("fancybox__content"),"none"!==s.style.display&&"none"!==getComputedStyle(s).getPropertyValue("display")||(s.style.display=t.display||this.option("defaultDisplay")||"flex"),t.id&&s.setAttribute("id",t.id),t.$content=s,o.prepend(s),this.manageCloseButton(t),"loading"!==t.state&&this.revealContent(t),s;this.setError(t,"{{ELEMENT_NOT_FOUND}}");}manageCloseButton(t){const e=void 0===t.closeButton?this.option("closeButton"):t.closeButton;if(!e||"top"===e&&this.$closeButton)return;const i=document.createElement("button");i.classList.add("carousel__button","is-close"),i.setAttribute("title",this.options.l10n.CLOSE),i.innerHTML=this.option("template.closeButton"),i.addEventListener("click",(t=>this.close(t))),"inside"===e?(t.$closeButton&&t.$closeButton.remove(),t.$closeButton=t.$content.appendChild(i)):this.$closeButton=this.$container.insertBefore(i,this.$container.firstChild);}revealContent(t){this.trigger("reveal",t),t.$content.style.visibility="";let e=!1;t.error||"loading"===t.state||null!==this.Carousel.prevPage||t.index!==this.options.startIndex||(e=void 0===t.showClass?this.option("showClass"):t.showClass),e?(t.state="animating",this.animateCSS(t.$content,e,(()=>{this.done(t);}))):this.done(t);}animateCSS(t,e,i){if(t&&t.dispatchEvent(new CustomEvent("animationend",{bubbles:!0,cancelable:!0})),!t||!e)return void("function"==typeof i&&i());const s=function(o){o.currentTarget===this&&(t.removeEventListener("animationend",s),i&&i(),t.classList.remove(e));};t.addEventListener("animationend",s),t.classList.add(e);}done(t){t.state="done",this.trigger("done",t);const e=this.getSlide();e&&t.index===e.index&&this.option("autoFocus")&&this.focus();}setError(t,e){t.error=e,this.hideLoading(t),this.clearContent(t);const i=document.createElement("div");i.classList.add("fancybox-error"),i.innerHTML=this.localize(e||"<p>{{ERROR}}</p>"),this.setContent(t,i,{suffix:"error"});}showLoading(t){t.state="loading",t.$el.classList.add("is-loading");let e=t.$el.querySelector(".fancybox__spinner");e||(e=document.createElement("div"),e.classList.add("fancybox__spinner"),e.innerHTML=this.option("template.spinner"),e.addEventListener("click",(()=>{this.Carousel.Panzoom.velocity||this.close();})),t.$el.prepend(e));}hideLoading(t){const e=t.$el&&t.$el.querySelector(".fancybox__spinner");e&&(e.remove(),t.$el.classList.remove("is-loading")),"loading"===t.state&&(this.trigger("load",t),t.state="ready");}next(){const t=this.Carousel;t&&t.pages.length>1&&t.slideNext();}prev(){const t=this.Carousel;t&&t.pages.length>1&&t.slidePrev();}jumpTo(...t){this.Carousel&&this.Carousel.slideTo(...t);}close(t){if(t&&t.preventDefault(),["closing","customClosing","destroy"].includes(this.state))return;if(!1===this.trigger("shouldClose",t))return;if(this.state="closing",this.Carousel.Panzoom.destroy(),this.detachEvents(),this.trigger("closing",t),"destroy"===this.state)return;this.$container.setAttribute("aria-hidden","true"),this.$container.classList.add("is-closing");const e=this.getSlide();if(this.Carousel.slides.forEach((t=>{t.$content&&t.index!==e.index&&this.Carousel.trigger("removeSlide",t);})),"closing"===this.state){const t=void 0===e.hideClass?this.option("hideClass"):e.hideClass;this.animateCSS(e.$content,t,(()=>{this.destroy();}),!0);}}destroy(){if("destroy"===this.state)return;this.state="destroy",this.trigger("destroy");const t=this.option("placeFocusBack")?this.getSlide().$trigger:null;this.Carousel.destroy(),this.detachPlugins(),this.Carousel=null,this.options={},this.events={},this.$container.remove(),this.$container=this.$backdrop=this.$carousel=null,t&&w(t),M.delete(this.id);const e=F.getInstance();e?e.focus():(document.documentElement.classList.remove("with-fancybox"),document.body.classList.remove("is-using-mouse"),this.revealScrollbar());}static show(t,e={}){return new F(t,e)}static fromEvent(t,e={}){if(t.defaultPrevented)return;if(t.button&&0!==t.button)return;if(t.ctrlKey||t.metaKey||t.shiftKey)return;const i=t.composedPath()[0];let s,o,n,a=i;if((a.matches("[data-fancybox-trigger]")||(a=a.closest("[data-fancybox-trigger]")))&&(s=a&&a.dataset&&a.dataset.fancyboxTrigger),s){const t=document.querySelectorAll(`[data-fancybox="${s}"]`),e=parseInt(a.dataset.fancyboxIndex,10)||0;a=t.length?t[e]:a;}a||(a=i),Array.from(F.openers.keys()).reverse().some((e=>{n=a;let i=!1;try{n instanceof Element&&("string"==typeof e||e instanceof String)&&(i=n.matches(e)||(n=n.closest(e)));}catch(t){}return !!i&&(t.preventDefault(),o=e,!0)}));let r=!1;if(o){e.event=t,e.target=n,n.origTarget=i,r=F.fromOpener(o,e);const s=F.getInstance();s&&"ready"===s.state&&t.detail&&document.body.classList.add("is-using-mouse");}return r}static fromOpener(t,i={}){let s=[],o=i.startIndex||0,n=i.target||null;const a=void 0!==(i=e({},i,F.openers.get(t))).groupAll&&i.groupAll,r=void 0===i.groupAttr?"data-fancybox":i.groupAttr,h=r&&n?n.getAttribute(`${r}`):"";if(!n||h||a){const e=i.root||(n?n.getRootNode():document.body);s=[].slice.call(e.querySelectorAll(t));}if(n&&!a&&(s=h?s.filter((t=>t.getAttribute(`${r}`)===h)):[n]),!s.length)return !1;const l=F.getInstance();return !(l&&s.indexOf(l.options.$trigger)>-1)&&(o=n?s.indexOf(n):o,s=s.map((function(t){const e=["false","0","no","null","undefined"],i=["true","1","yes"],s=Object.assign({},t.dataset),o={};for(let[t,n]of Object.entries(s))if("fancybox"!==t)if("width"===t||"height"===t)o[`_${t}`]=n;else if("string"==typeof n||n instanceof String)if(e.indexOf(n)>-1)o[t]=!1;else if(i.indexOf(o[t])>-1)o[t]=!0;else try{o[t]=JSON.parse(n);}catch(e){o[t]=n;}else o[t]=n;return t instanceof Element&&(o.$trigger=t),o})),new F(s,e({},i,{startIndex:o,$trigger:n})))}static bind(t,e={}){function i(){document.body.addEventListener("click",F.fromEvent,!1);}v&&(F.openers.size||(/complete|interactive|loaded/.test(document.readyState)?i():document.addEventListener("DOMContentLoaded",i)),F.openers.set(t,e));}static unbind(t){F.openers.delete(t),F.openers.size||F.destroy();}static destroy(){let t;for(;t=F.getInstance();)t.destroy();F.openers=new Map,document.body.removeEventListener("click",F.fromEvent,!1);}static getInstance(t){if(t)return M.get(t);return Array.from(M.values()).reverse().find((t=>!["closing","customClosing","destroy"].includes(t.state)&&t))||null}static close(t=!0,e){if(t)for(const t of M.values())t.close(e);else {const t=F.getInstance();t&&t.close(e);}}static next(){const t=F.getInstance();t&&t.next();}static prev(){const t=F.getInstance();t&&t.prev();}}F.version="4.0.27",F.defaults=O,F.openers=new Map,F.Plugins=k,F.bind("[data-fancybox]");for(const[t,e]of Object.entries(F.Plugins||{}))"function"==typeof e.create&&e.create(F);

	var js = {exports: {}};

	var core = {exports: {}};

	var evEmitter$1 = {exports: {}};

	/**
	 * EvEmitter v2.1.1
	 * Lil' event emitter
	 * MIT License
	 */

	(function (module) {
	( function( global, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.EvEmitter = factory();
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function() {

	function EvEmitter() {}

	let proto = EvEmitter.prototype;

	proto.on = function( eventName, listener ) {
	  if ( !eventName || !listener ) return this;

	  // set events hash
	  let events = this._events = this._events || {};
	  // set listeners array
	  let listeners = events[ eventName ] = events[ eventName ] || [];
	  // only add once
	  if ( !listeners.includes( listener ) ) {
	    listeners.push( listener );
	  }

	  return this;
	};

	proto.once = function( eventName, listener ) {
	  if ( !eventName || !listener ) return this;

	  // add event
	  this.on( eventName, listener );
	  // set once flag
	  // set onceEvents hash
	  let onceEvents = this._onceEvents = this._onceEvents || {};
	  // set onceListeners object
	  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
	  // set flag
	  onceListeners[ listener ] = true;

	  return this;
	};

	proto.off = function( eventName, listener ) {
	  let listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) return this;

	  let index = listeners.indexOf( listener );
	  if ( index != -1 ) {
	    listeners.splice( index, 1 );
	  }

	  return this;
	};

	proto.emitEvent = function( eventName, args ) {
	  let listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) return this;

	  // copy over to avoid interference if .off() in listener
	  listeners = listeners.slice( 0 );
	  args = args || [];
	  // once stuff
	  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];

	  for ( let listener of listeners ) {
	    let isOnce = onceListeners && onceListeners[ listener ];
	    if ( isOnce ) {
	      // remove listener
	      // remove before trigger to prevent recursion
	      this.off( eventName, listener );
	      // unset once flag
	      delete onceListeners[ listener ];
	    }
	    // trigger listener
	    listener.apply( this, args );
	  }

	  return this;
	};

	proto.allOff = function() {
	  delete this._events;
	  delete this._onceEvents;
	  return this;
	};

	return EvEmitter;

	} ) );
	}(evEmitter$1));

	var getSize$2 = {exports: {}};

	/*!
	 * Infinite Scroll v2.0.4
	 * measure size of elements
	 * MIT license
	 */

	(function (module) {
	( function( window, factory ) {
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.getSize = factory();
	  }

	} )( window, function factory() {

	// -------------------------- helpers -------------------------- //

	// get a number from a string, not a percentage
	function getStyleSize( value ) {
	  let num = parseFloat( value );
	  // not a percent like '100%', and a number
	  let isValid = value.indexOf('%') == -1 && !isNaN( num );
	  return isValid && num;
	}

	// -------------------------- measurements -------------------------- //

	let measurements = [
	  'paddingLeft',
	  'paddingRight',
	  'paddingTop',
	  'paddingBottom',
	  'marginLeft',
	  'marginRight',
	  'marginTop',
	  'marginBottom',
	  'borderLeftWidth',
	  'borderRightWidth',
	  'borderTopWidth',
	  'borderBottomWidth',
	];

	function getZeroSize() {
	  let size = {
	    width: 0,
	    height: 0,
	    innerWidth: 0,
	    innerHeight: 0,
	    outerWidth: 0,
	    outerHeight: 0,
	  };
	  measurements.forEach( ( measurement ) => {
	    size[ measurement ] = 0;
	  } );
	  return size;
	}

	// -------------------------- getSize -------------------------- //

	function getSize( elem ) {
	  // use querySeletor if elem is string
	  if ( typeof elem == 'string' ) elem = document.querySelector( elem );

	  // do not proceed on non-objects
	  let isElement = elem && typeof elem == 'object' && elem.nodeType;
	  if ( !isElement ) return;

	  let style = getComputedStyle( elem );

	  // if hidden, everything is 0
	  if ( style.display == 'none' ) return getZeroSize();

	  let size = {};
	  size.width = elem.offsetWidth;
	  size.height = elem.offsetHeight;

	  let isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

	  // get all measurements
	  measurements.forEach( ( measurement ) => {
	    let value = style[ measurement ];
	    let num = parseFloat( value );
	    // any 'auto', 'medium' value will be 0
	    size[ measurement ] = !isNaN( num ) ? num : 0;
	  } );

	  let paddingWidth = size.paddingLeft + size.paddingRight;
	  let paddingHeight = size.paddingTop + size.paddingBottom;
	  let marginWidth = size.marginLeft + size.marginRight;
	  let marginHeight = size.marginTop + size.marginBottom;
	  let borderWidth = size.borderLeftWidth + size.borderRightWidth;
	  let borderHeight = size.borderTopWidth + size.borderBottomWidth;

	  // overwrite width and height if we can get it from style
	  let styleWidth = getStyleSize( style.width );
	  if ( styleWidth !== false ) {
	    size.width = styleWidth +
	      // add padding and border unless it's already including it
	      ( isBorderBox ? 0 : paddingWidth + borderWidth );
	  }

	  let styleHeight = getStyleSize( style.height );
	  if ( styleHeight !== false ) {
	    size.height = styleHeight +
	      // add padding and border unless it's already including it
	      ( isBorderBox ? 0 : paddingHeight + borderHeight );
	  }

	  size.innerWidth = size.width - ( paddingWidth + borderWidth );
	  size.innerHeight = size.height - ( paddingHeight + borderHeight );

	  size.outerWidth = size.width + marginWidth;
	  size.outerHeight = size.height + marginHeight;

	  return size;
	}

	return getSize;

	} );
	}(getSize$2));

	var utils$1 = {exports: {}};

	/**
	 * Fizzy UI utils v3.0.0
	 * MIT license
	 */

	(function (module) {
	( function( global, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory( global );
	  } else {
	    // browser global
	    global.fizzyUIUtils = factory( global );
	  }

	}( commonjsGlobal, function factory( global ) {

	let utils = {};

	// ----- extend ----- //

	// extends objects
	utils.extend = function( a, b ) {
	  return Object.assign( a, b );
	};

	// ----- modulo ----- //

	utils.modulo = function( num, div ) {
	  return ( ( num % div ) + div ) % div;
	};

	// ----- makeArray ----- //

	// turn element or nodeList into an array
	utils.makeArray = function( obj ) {
	  // use object if already an array
	  if ( Array.isArray( obj ) ) return obj;

	  // return empty array if undefined or null. #6
	  if ( obj === null || obj === undefined ) return [];

	  let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
	  // convert nodeList to array
	  if ( isArrayLike ) return [ ...obj ];

	  // array of single index
	  return [ obj ];
	};

	// ----- removeFrom ----- //

	utils.removeFrom = function( ary, obj ) {
	  let index = ary.indexOf( obj );
	  if ( index != -1 ) {
	    ary.splice( index, 1 );
	  }
	};

	// ----- getParent ----- //

	utils.getParent = function( elem, selector ) {
	  while ( elem.parentNode && elem != document.body ) {
	    elem = elem.parentNode;
	    if ( elem.matches( selector ) ) return elem;
	  }
	};

	// ----- getQueryElement ----- //

	// use element as selector string
	utils.getQueryElement = function( elem ) {
	  if ( typeof elem == 'string' ) {
	    return document.querySelector( elem );
	  }
	  return elem;
	};

	// ----- handleEvent ----- //

	// enable .ontype to trigger from .addEventListener( elem, 'type' )
	utils.handleEvent = function( event ) {
	  let method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	// ----- filterFindElements ----- //

	utils.filterFindElements = function( elems, selector ) {
	  // make array of elems
	  elems = utils.makeArray( elems );

	  return elems
	    // check that elem is an actual element
	    .filter( ( elem ) => elem instanceof HTMLElement )
	    .reduce( ( ffElems, elem ) => {
	      // add elem if no selector
	      if ( !selector ) {
	        ffElems.push( elem );
	        return ffElems;
	      }
	      // filter & find items if we have a selector
	      // filter
	      if ( elem.matches( selector ) ) {
	        ffElems.push( elem );
	      }
	      // find children
	      let childElems = elem.querySelectorAll( selector );
	      // concat childElems to filterFound array
	      ffElems = ffElems.concat( ...childElems );
	      return ffElems;
	    }, [] );
	};

	// ----- debounceMethod ----- //

	utils.debounceMethod = function( _class, methodName, threshold ) {
	  threshold = threshold || 100;
	  // original method
	  let method = _class.prototype[ methodName ];
	  let timeoutName = methodName + 'Timeout';

	  _class.prototype[ methodName ] = function() {
	    clearTimeout( this[ timeoutName ] );

	    let args = arguments;
	    this[ timeoutName ] = setTimeout( () => {
	      method.apply( this, args );
	      delete this[ timeoutName ];
	    }, threshold );
	  };
	};

	// ----- docReady ----- //

	utils.docReady = function( onDocReady ) {
	  let readyState = document.readyState;
	  if ( readyState == 'complete' || readyState == 'interactive' ) {
	    // do async to allow for other scripts to run. metafizzy/flickity#441
	    setTimeout( onDocReady );
	  } else {
	    document.addEventListener( 'DOMContentLoaded', onDocReady );
	  }
	};

	// ----- htmlInit ----- //

	// http://bit.ly/3oYLusc
	utils.toDashed = function( str ) {
	  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
	    return $1 + '-' + $2;
	  } ).toLowerCase();
	};

	let console = global.console;

	// allow user to initialize classes via [data-namespace] or .js-namespace class
	// htmlInit( Widget, 'widgetName' )
	// options are parsed from data-namespace-options
	utils.htmlInit = function( WidgetClass, namespace ) {
	  utils.docReady( function() {
	    let dashedNamespace = utils.toDashed( namespace );
	    let dataAttr = 'data-' + dashedNamespace;
	    let dataAttrElems = document.querySelectorAll( `[${dataAttr}]` );
	    let jQuery = global.jQuery;

	    [ ...dataAttrElems ].forEach( ( elem ) => {
	      let attr = elem.getAttribute( dataAttr );
	      let options;
	      try {
	        options = attr && JSON.parse( attr );
	      } catch ( error ) {
	        // log error, do not initialize
	        if ( console ) {
	          console.error( `Error parsing ${dataAttr} on ${elem.className}: ${error}` );
	        }
	        return;
	      }
	      // initialize
	      let instance = new WidgetClass( elem, options );
	      // make available via $().data('namespace')
	      if ( jQuery ) {
	        jQuery.data( elem, namespace, instance );
	      }
	    } );

	  } );
	};

	// -----  ----- //

	return utils;

	} ) );
	}(utils$1));

	var cell = {exports: {}};

	(function (module) {
	// Flickity.Cell
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory( getSize$2.exports );
	  } else {
	    // browser global
	    window.Flickity = window.Flickity || {};
	    window.Flickity.Cell = factory( window.getSize );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( getSize ) {

	const cellClassName = 'flickity-cell';

	function Cell( elem ) {
	  this.element = elem;
	  this.element.classList.add( cellClassName );

	  this.x = 0;
	  this.unselect();
	}

	let proto = Cell.prototype;

	proto.destroy = function() {
	  // reset style
	  this.unselect();
	  this.element.classList.remove( cellClassName );
	  this.element.style.transform = '';
	  this.element.removeAttribute('aria-hidden');
	};

	proto.getSize = function() {
	  this.size = getSize( this.element );
	};

	proto.select = function() {
	  this.element.classList.add('is-selected');
	  this.element.removeAttribute('aria-hidden');
	};

	proto.unselect = function() {
	  this.element.classList.remove('is-selected');
	  this.element.setAttribute( 'aria-hidden', 'true' );
	};

	proto.remove = function() {
	  this.element.remove();
	};

	return Cell;

	} ) );
	}(cell));

	var slide = {exports: {}};

	(function (module) {
	// slide
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.Flickity = window.Flickity || {};
	    window.Flickity.Slide = factory();
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory() {

	function Slide( beginMargin, endMargin, cellAlign ) {
	  this.beginMargin = beginMargin;
	  this.endMargin = endMargin;
	  this.cellAlign = cellAlign;
	  this.cells = [];
	  this.outerWidth = 0;
	  this.height = 0;
	}

	let proto = Slide.prototype;

	proto.addCell = function( cell ) {
	  this.cells.push( cell );
	  this.outerWidth += cell.size.outerWidth;
	  this.height = Math.max( cell.size.outerHeight, this.height );
	  // first cell stuff
	  if ( this.cells.length === 1 ) {
	    this.x = cell.x; // x comes from first cell
	    this.firstMargin = cell.size[ this.beginMargin ];
	  }
	};

	proto.updateTarget = function() {
	  let lastCell = this.getLastCell();
	  let lastMargin = lastCell ? lastCell.size[ this.endMargin ] : 0;
	  let slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
	  this.target = this.x + this.firstMargin + slideWidth * this.cellAlign;
	};

	proto.getLastCell = function() {
	  return this.cells[ this.cells.length - 1 ];
	};

	proto.select = function() {
	  this.cells.forEach( ( cell ) => cell.select() );
	};

	proto.unselect = function() {
	  this.cells.forEach( ( cell ) => cell.unselect() );
	};

	proto.getCellElements = function() {
	  return this.cells.map( ( cell ) => cell.element );
	};

	return Slide;

	} ) );
	}(slide));

	var animate = {exports: {}};

	(function (module) {
	// animate
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory( utils$1.exports );
	  } else {
	    // browser global
	    window.Flickity = window.Flickity || {};
	    window.Flickity.animatePrototype = factory( window.fizzyUIUtils );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( utils ) {

	// -------------------------- animate -------------------------- //

	let proto = {};

	proto.startAnimation = function() {
	  if ( this.isAnimating ) return;

	  this.isAnimating = true;
	  this.restingFrames = 0;
	  this.animate();
	};

	proto.animate = function() {
	  this.applyDragForce();
	  this.applySelectedAttraction();

	  let previousX = this.x;

	  this.integratePhysics();
	  this.positionSlider();
	  this.settle( previousX );
	  // animate next frame
	  if ( this.isAnimating ) requestAnimationFrame( () => this.animate() );
	};

	proto.positionSlider = function() {
	  let x = this.x;
	  // wrap position around
	  if ( this.isWrapping ) {
	    x = utils.modulo( x, this.slideableWidth ) - this.slideableWidth;
	    this.shiftWrapCells( x );
	  }

	  this.setTranslateX( x, this.isAnimating );
	  this.dispatchScrollEvent();
	};

	proto.setTranslateX = function( x, is3d ) {
	  x += this.cursorPosition;
	  // reverse if right-to-left and using transform
	  if ( this.options.rightToLeft ) x = -x;
	  let translateX = this.getPositionValue( x );
	  // use 3D transforms for hardware acceleration on iOS
	  // but use 2D when settled, for better font-rendering
	  this.slider.style.transform = is3d ?
	    `translate3d(${translateX},0,0)` : `translateX(${translateX})`;
	};

	proto.dispatchScrollEvent = function() {
	  let firstSlide = this.slides[0];
	  if ( !firstSlide ) return;

	  let positionX = -this.x - firstSlide.target;
	  let progress = positionX / this.slidesWidth;
	  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
	};

	proto.positionSliderAtSelected = function() {
	  if ( !this.cells.length ) return;

	  this.x = -this.selectedSlide.target;
	  this.velocity = 0; // stop wobble
	  this.positionSlider();
	};

	proto.getPositionValue = function( position ) {
	  if ( this.options.percentPosition ) {
	    // percent position, round to 2 digits, like 12.34%
	    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 ) + '%';
	  } else {
	    // pixel positioning
	    return Math.round( position ) + 'px';
	  }
	};

	proto.settle = function( previousX ) {
	  // keep track of frames where x hasn't moved
	  let isResting = !this.isPointerDown &&
	      Math.round( this.x * 100 ) === Math.round( previousX * 100 );
	  if ( isResting ) this.restingFrames++;
	  // stop animating if resting for 3 or more frames
	  if ( this.restingFrames > 2 ) {
	    this.isAnimating = false;
	    delete this.isFreeScrolling;
	    // render position with translateX when settled
	    this.positionSlider();
	    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
	  }
	};

	proto.shiftWrapCells = function( x ) {
	  // shift before cells
	  let beforeGap = this.cursorPosition + x;
	  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
	  // shift after cells
	  let afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
	  this._shiftCells( this.afterShiftCells, afterGap, 1 );
	};

	proto._shiftCells = function( cells, gap, shift ) {
	  cells.forEach( ( cell ) => {
	    let cellShift = gap > 0 ? shift : 0;
	    this._wrapShiftCell( cell, cellShift );
	    gap -= cell.size.outerWidth;
	  } );
	};

	proto._unshiftCells = function( cells ) {
	  if ( !cells || !cells.length ) return;

	  cells.forEach( ( cell ) => this._wrapShiftCell( cell, 0 ) );
	};

	// @param {Integer} shift - 0, 1, or -1
	proto._wrapShiftCell = function( cell, shift ) {
	  this._renderCellPosition( cell, cell.x + this.slideableWidth * shift );
	};

	// -------------------------- physics -------------------------- //

	proto.integratePhysics = function() {
	  this.x += this.velocity;
	  this.velocity *= this.getFrictionFactor();
	};

	proto.applyForce = function( force ) {
	  this.velocity += force;
	};

	proto.getFrictionFactor = function() {
	  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
	};

	proto.getRestingPosition = function() {
	  // my thanks to Steven Wittens, who simplified this math greatly
	  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
	};

	proto.applyDragForce = function() {
	  if ( !this.isDraggable || !this.isPointerDown ) return;

	  // change the position to drag position by applying force
	  let dragVelocity = this.dragX - this.x;
	  let dragForce = dragVelocity - this.velocity;
	  this.applyForce( dragForce );
	};

	proto.applySelectedAttraction = function() {
	  // do not attract if pointer down or no slides
	  let dragDown = this.isDraggable && this.isPointerDown;
	  if ( dragDown || this.isFreeScrolling || !this.slides.length ) return;

	  let distance = this.selectedSlide.target * -1 - this.x;
	  let force = distance * this.options.selectedAttraction;
	  this.applyForce( force );
	};

	return proto;

	} ) );
	}(animate));

	(function (module) {
	// Flickity main
	/* eslint-disable max-params */
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	        window,
	        evEmitter$1.exports,
	        getSize$2.exports,
	        utils$1.exports,
	        cell.exports,
	        slide.exports,
	        animate.exports,
	    );
	  } else {
	    // browser global
	    let _Flickity = window.Flickity;

	    window.Flickity = factory(
	        window,
	        window.EvEmitter,
	        window.getSize,
	        window.fizzyUIUtils,
	        _Flickity.Cell,
	        _Flickity.Slide,
	        _Flickity.animatePrototype,
	    );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal,
	    function factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
	/* eslint-enable max-params */

	// vars
	const { getComputedStyle, console } = window;
	let { jQuery } = window;

	// -------------------------- Flickity -------------------------- //

	// globally unique identifiers
	let GUID = 0;
	// internal store of all Flickity intances
	let instances = {};

	function Flickity( element, options ) {
	  let queryElement = utils.getQueryElement( element );
	  if ( !queryElement ) {
	    if ( console ) console.error(`Bad element for Flickity: ${queryElement || element}`);
	    return;
	  }
	  this.element = queryElement;
	  // do not initialize twice on same element
	  if ( this.element.flickityGUID ) {
	    let instance = instances[ this.element.flickityGUID ];
	    if ( instance ) instance.option( options );
	    return instance;
	  }

	  // add jQuery
	  if ( jQuery ) {
	    this.$element = jQuery( this.element );
	  }
	  // options
	  this.options = { ...this.constructor.defaults };
	  this.option( options );

	  // kick things off
	  this._create();
	}

	Flickity.defaults = {
	  accessibility: true,
	  // adaptiveHeight: false,
	  cellAlign: 'center',
	  // cellSelector: undefined,
	  // contain: false,
	  freeScrollFriction: 0.075, // friction when free-scrolling
	  friction: 0.28, // friction when selecting
	  namespaceJQueryEvents: true,
	  // initialIndex: 0,
	  percentPosition: true,
	  resize: true,
	  selectedAttraction: 0.025,
	  setGallerySize: true,
	  // watchCSS: false,
	  // wrapAround: false
	};

	// hash of methods triggered on _create()
	Flickity.create = {};

	let proto = Flickity.prototype;
	// inherit EventEmitter
	Object.assign( proto, EvEmitter.prototype );

	proto._create = function() {
	  let { resize, watchCSS, rightToLeft } = this.options;
	  // add id for Flickity.data
	  let id = this.guid = ++GUID;
	  this.element.flickityGUID = id; // expando
	  instances[ id ] = this; // associate via id
	  // initial properties
	  this.selectedIndex = 0;
	  // how many frames slider has been in same position
	  this.restingFrames = 0;
	  // initial physics properties
	  this.x = 0;
	  this.velocity = 0;
	  this.beginMargin = rightToLeft ? 'marginRight' : 'marginLeft';
	  this.endMargin = rightToLeft ? 'marginLeft' : 'marginRight';
	  // create viewport & slider
	  this.viewport = document.createElement('div');
	  this.viewport.className = 'flickity-viewport';
	  this._createSlider();
	  // used for keyboard navigation
	  this.focusableElems = [ this.element ];

	  if ( resize || watchCSS ) {
	    window.addEventListener( 'resize', this );
	  }

	  // add listeners from on option
	  for ( let eventName in this.options.on ) {
	    let listener = this.options.on[ eventName ];
	    this.on( eventName, listener );
	  }

	  for ( let method in Flickity.create ) {
	    Flickity.create[ method ].call( this );
	  }

	  if ( watchCSS ) {
	    this.watchCSS();
	  } else {
	    this.activate();
	  }
	};

	/**
	 * set options
	 * @param {Object} opts - options to extend
	 */
	proto.option = function( opts ) {
	  Object.assign( this.options, opts );
	};

	proto.activate = function() {
	  if ( this.isActive ) return;

	  this.isActive = true;
	  this.element.classList.add('flickity-enabled');
	  if ( this.options.rightToLeft ) {
	    this.element.classList.add('flickity-rtl');
	  }

	  this.getSize();
	  // move initial cell elements so they can be loaded as cells
	  let cellElems = this._filterFindCellElements( this.element.children );
	  this.slider.append( ...cellElems );
	  this.viewport.append( this.slider );
	  this.element.append( this.viewport );
	  // get cells from children
	  this.reloadCells();

	  if ( this.options.accessibility ) {
	    // allow element to focusable
	    this.element.tabIndex = 0;
	    // listen for key presses
	    this.element.addEventListener( 'keydown', this );
	  }

	  this.emitEvent('activate');
	  this.selectInitialIndex();
	  // flag for initial activation, for using initialIndex
	  this.isInitActivated = true;
	  // ready event. #493
	  this.dispatchEvent('ready');
	};

	// slider positions the cells
	proto._createSlider = function() {
	  // slider element does all the positioning
	  let slider = document.createElement('div');
	  slider.className = 'flickity-slider';
	  this.slider = slider;
	};

	proto._filterFindCellElements = function( elems ) {
	  return utils.filterFindElements( elems, this.options.cellSelector );
	};

	// goes through all children
	proto.reloadCells = function() {
	  // collection of item elements
	  this.cells = this._makeCells( this.slider.children );
	  this.positionCells();
	  this._updateWrapShiftCells();
	  this.setGallerySize();
	};

	/**
	 * turn elements into Flickity.Cells
	 * @param {[Array, NodeList, HTMLElement]} elems - elements to make into cells
	 * @returns {Array} items - collection of new Flickity Cells
	 */
	proto._makeCells = function( elems ) {
	  let cellElems = this._filterFindCellElements( elems );

	  // create new Cells for collection
	  return cellElems.map( ( cellElem ) => new Cell( cellElem ) );
	};

	proto.getLastCell = function() {
	  return this.cells[ this.cells.length - 1 ];
	};

	proto.getLastSlide = function() {
	  return this.slides[ this.slides.length - 1 ];
	};

	// positions all cells
	proto.positionCells = function() {
	  // size all cells
	  this._sizeCells( this.cells );
	  // position all cells
	  this._positionCells( 0 );
	};

	/**
	 * position certain cells
	 * @param {Integer} index - which cell to start with
	 */
	proto._positionCells = function( index ) {
	  index = index || 0;
	  // also measure maxCellHeight
	  // start 0 if positioning all cells
	  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
	  let cellX = 0;
	  // get cellX
	  if ( index > 0 ) {
	    let startCell = this.cells[ index - 1 ];
	    cellX = startCell.x + startCell.size.outerWidth;
	  }

	  this.cells.slice( index ).forEach( ( cell ) => {
	    cell.x = cellX;
	    this._renderCellPosition( cell, cellX );
	    cellX += cell.size.outerWidth;
	    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
	  } );
	  // keep track of cellX for wrap-around
	  this.slideableWidth = cellX;
	  // slides
	  this.updateSlides();
	  // contain slides target
	  this._containSlides();
	  // update slidesWidth
	  this.slidesWidth = this.cells.length ?
	    this.getLastSlide().target - this.slides[0].target : 0;
	};

	proto._renderCellPosition = function( cell, x ) {
	  // render position of cell with in slider
	  let sideOffset = this.options.rightToLeft ? -1 : 1;
	  let renderX = x * sideOffset;
	  if ( this.options.percentPosition ) renderX *= this.size.innerWidth / cell.size.width;
	  let positionValue = this.getPositionValue( renderX );
	  cell.element.style.transform = `translateX( ${positionValue} )`;
	};

	/**
	 * cell.getSize() on multiple cells
	 * @param {Array} cells - cells to size
	 */
	proto._sizeCells = function( cells ) {
	  cells.forEach( ( cell ) => cell.getSize() );
	};

	// --------------------------  -------------------------- //

	proto.updateSlides = function() {
	  this.slides = [];
	  if ( !this.cells.length ) return;

	  let { beginMargin, endMargin } = this;
	  let slide = new Slide( beginMargin, endMargin, this.cellAlign );
	  this.slides.push( slide );

	  let canCellFit = this._getCanCellFit();

	  this.cells.forEach( ( cell, i ) => {
	    // just add cell if first cell in slide
	    if ( !slide.cells.length ) {
	      slide.addCell( cell );
	      return;
	    }

	    let slideWidth = ( slide.outerWidth - slide.firstMargin ) +
	      ( cell.size.outerWidth - cell.size[ endMargin ] );

	    if ( canCellFit( i, slideWidth ) ) {
	      slide.addCell( cell );
	    } else {
	      // doesn't fit, new slide
	      slide.updateTarget();

	      slide = new Slide( beginMargin, endMargin, this.cellAlign );
	      this.slides.push( slide );
	      slide.addCell( cell );
	    }
	  } );
	  // last slide
	  slide.updateTarget();
	  // update .selectedSlide
	  this.updateSelectedSlide();
	};

	proto._getCanCellFit = function() {
	  let { groupCells } = this.options;
	  if ( !groupCells ) return () => false;

	  if ( typeof groupCells == 'number' ) {
	    // group by number. 3 -> [0,1,2], [3,4,5], ...
	    let number = parseInt( groupCells, 10 );
	    return ( i ) => ( i % number ) !== 0;
	  }
	  // default, group by width of slide
	  let percent = 1;
	  // parse '75%
	  let percentMatch = typeof groupCells == 'string' && groupCells.match( /^(\d+)%$/ );
	  if ( percentMatch ) percent = parseInt( percentMatch[1], 10 ) / 100;
	  let groupWidth = ( this.size.innerWidth + 1 ) * percent;
	  return ( i, slideWidth ) => slideWidth <= groupWidth;
	};

	// alias _init for jQuery plugin .flickity()
	proto._init =
	proto.reposition = function() {
	  this.positionCells();
	  this.positionSliderAtSelected();
	};

	proto.getSize = function() {
	  this.size = getSize( this.element );
	  this.setCellAlign();
	  this.cursorPosition = this.size.innerWidth * this.cellAlign;
	};

	let cellAlignShorthands = {
	  left: 0,
	  center: 0.5,
	  right: 1,
	};

	proto.setCellAlign = function() {
	  let { cellAlign, rightToLeft } = this.options;
	  let shorthand = cellAlignShorthands[ cellAlign ];
	  this.cellAlign = shorthand !== undefined ? shorthand : cellAlign;
	  if ( rightToLeft ) this.cellAlign = 1 - this.cellAlign;
	};

	proto.setGallerySize = function() {
	  if ( !this.options.setGallerySize ) return;

	  let height = this.options.adaptiveHeight && this.selectedSlide ?
	    this.selectedSlide.height : this.maxCellHeight;
	  this.viewport.style.height = `${height}px`;
	};

	proto._updateWrapShiftCells = function() {
	  // update isWrapping
	  this.isWrapping = this.getIsWrapping();
	  // only for wrap-around
	  if ( !this.isWrapping ) return;

	  // unshift previous cells
	  this._unshiftCells( this.beforeShiftCells );
	  this._unshiftCells( this.afterShiftCells );
	  // get before cells
	  // initial gap
	  let beforeGapX = this.cursorPosition;
	  let lastIndex = this.cells.length - 1;
	  this.beforeShiftCells = this._getGapCells( beforeGapX, lastIndex, -1 );
	  // get after cells
	  // ending gap between last cell and end of gallery viewport
	  let afterGapX = this.size.innerWidth - this.cursorPosition;
	  // start cloning at first cell, working forwards
	  this.afterShiftCells = this._getGapCells( afterGapX, 0, 1 );
	};

	proto.getIsWrapping = function() {
	  let { wrapAround } = this.options;
	  if ( !wrapAround || this.slides.length < 2 ) return false;

	  if ( wrapAround !== 'fill' ) return true;
	  // check that slides can fit

	  let gapWidth = this.slideableWidth - this.size.innerWidth;
	  if ( gapWidth > this.size.innerWidth ) return true; // gap * 2x big, all good
	  // check that content width - shifting cell is bigger than viewport width
	  for ( let cell of this.cells ) {
	    if ( cell.size.outerWidth > gapWidth ) return false;
	  }
	  return true;
	};

	proto._getGapCells = function( gapX, cellIndex, increment ) {
	  // keep adding cells until the cover the initial gap
	  let cells = [];
	  while ( gapX > 0 ) {
	    let cell = this.cells[ cellIndex ];
	    if ( !cell ) break;

	    cells.push( cell );
	    cellIndex += increment;
	    gapX -= cell.size.outerWidth;
	  }
	  return cells;
	};

	// ----- contain & wrap ----- //

	// contain cell targets so no excess sliding
	proto._containSlides = function() {
	  let isContaining = this.options.contain && !this.isWrapping &&
	      this.cells.length;
	  if ( !isContaining ) return;

	  let contentWidth = this.slideableWidth - this.getLastCell().size[ this.endMargin ];
	  // content is less than gallery size
	  let isContentSmaller = contentWidth < this.size.innerWidth;
	  if ( isContentSmaller ) {
	    // all cells fit inside gallery
	    this.slides.forEach( ( slide ) => {
	      slide.target = contentWidth * this.cellAlign;
	    } );
	  } else {
	    // contain to bounds
	    let beginBound = this.cursorPosition + this.cells[0].size[ this.beginMargin ];
	    let endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
	    this.slides.forEach( ( slide ) => {
	      slide.target = Math.max( slide.target, beginBound );
	      slide.target = Math.min( slide.target, endBound );
	    } );
	  }
	};

	// ----- events ----- //

	/**
	 * emits events via eventEmitter and jQuery events
	 * @param {String} type - name of event
	 * @param {Event} event - original event
	 * @param {Array} args - extra arguments
	 */
	proto.dispatchEvent = function( type, event, args ) {
	  let emitArgs = event ? [ event ].concat( args ) : args;
	  this.emitEvent( type, emitArgs );

	  if ( jQuery && this.$element ) {
	    // default trigger with type if no event
	    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
	    let $event = type;
	    if ( event ) {
	      // create jQuery event
	      let jQEvent = new jQuery.Event( event );
	      jQEvent.type = type;
	      $event = jQEvent;
	    }
	    this.$element.trigger( $event, args );
	  }
	};

	const unidraggerEvents = [
	  'dragStart',
	  'dragMove',
	  'dragEnd',
	  'pointerDown',
	  'pointerMove',
	  'pointerEnd',
	  'staticClick',
	];

	let _emitEvent = proto.emitEvent;
	proto.emitEvent = function( eventName, args ) {
	  if ( eventName === 'staticClick' ) {
	    // add cellElem and cellIndex args to staticClick
	    let clickedCell = this.getParentCell( args[0].target );
	    let cellElem = clickedCell && clickedCell.element;
	    let cellIndex = clickedCell && this.cells.indexOf( clickedCell );
	    args = args.concat( cellElem, cellIndex );
	  }
	  // do regular thing
	  _emitEvent.call( this, eventName, args );
	  // duck-punch in jQuery events for Unidragger events
	  let isUnidraggerEvent = unidraggerEvents.includes( eventName );
	  if ( !isUnidraggerEvent || !jQuery || !this.$element ) return;

	  eventName += this.options.namespaceJQueryEvents ? '.flickity' : '';
	  let event = args.shift( 0 );
	  let jQEvent = new jQuery.Event( event );
	  jQEvent.type = eventName;
	  this.$element.trigger( jQEvent, args );
	};

	// -------------------------- select -------------------------- //

	/**
	 * @param {Integer} index - index of the slide
	 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
	 * @param {Boolean} isInstant - will immediately set position at selected cell
	 */
	proto.select = function( index, isWrap, isInstant ) {
	  if ( !this.isActive ) return;

	  index = parseInt( index, 10 );
	  this._wrapSelect( index );

	  if ( this.isWrapping || isWrap ) {
	    index = utils.modulo( index, this.slides.length );
	  }
	  // bail if invalid index
	  if ( !this.slides[ index ] ) return;

	  let prevIndex = this.selectedIndex;
	  this.selectedIndex = index;
	  this.updateSelectedSlide();
	  if ( isInstant ) {
	    this.positionSliderAtSelected();
	  } else {
	    this.startAnimation();
	  }
	  if ( this.options.adaptiveHeight ) {
	    this.setGallerySize();
	  }
	  // events
	  this.dispatchEvent( 'select', null, [ index ] );
	  // change event if new index
	  if ( index !== prevIndex ) {
	    this.dispatchEvent( 'change', null, [ index ] );
	  }
	};

	// wraps position for wrapAround, to move to closest slide. #113
	proto._wrapSelect = function( index ) {
	  if ( !this.isWrapping ) return;

	  const { selectedIndex, slideableWidth, slides: { length } } = this;
	  // shift index for wrap, do not wrap dragSelect
	  if ( !this.isDragSelect ) {
	    let wrapIndex = utils.modulo( index, length );
	    // go to shortest
	    let delta = Math.abs( wrapIndex - selectedIndex );
	    let backWrapDelta = Math.abs( ( wrapIndex + length ) - selectedIndex );
	    let forewardWrapDelta = Math.abs( ( wrapIndex - length ) - selectedIndex );
	    if ( backWrapDelta < delta ) {
	      index += length;
	    } else if ( forewardWrapDelta < delta ) {
	      index -= length;
	    }
	  }

	  // wrap position so slider is within normal area
	  if ( index < 0 ) {
	    this.x -= slideableWidth;
	  } else if ( index >= length ) {
	    this.x += slideableWidth;
	  }
	};

	proto.previous = function( isWrap, isInstant ) {
	  this.select( this.selectedIndex - 1, isWrap, isInstant );
	};

	proto.next = function( isWrap, isInstant ) {
	  this.select( this.selectedIndex + 1, isWrap, isInstant );
	};

	proto.updateSelectedSlide = function() {
	  let slide = this.slides[ this.selectedIndex ];
	  // selectedIndex could be outside of slides, if triggered before resize()
	  if ( !slide ) return;

	  // unselect previous selected slide
	  this.unselectSelectedSlide();
	  // update new selected slide
	  this.selectedSlide = slide;
	  slide.select();
	  this.selectedCells = slide.cells;
	  this.selectedElements = slide.getCellElements();
	  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
	  this.selectedCell = slide.cells[0];
	  this.selectedElement = this.selectedElements[0];
	};

	proto.unselectSelectedSlide = function() {
	  if ( this.selectedSlide ) this.selectedSlide.unselect();
	};

	proto.selectInitialIndex = function() {
	  let initialIndex = this.options.initialIndex;
	  // already activated, select previous selectedIndex
	  if ( this.isInitActivated ) {
	    this.select( this.selectedIndex, false, true );
	    return;
	  }
	  // select with selector string
	  if ( initialIndex && typeof initialIndex == 'string' ) {
	    let cell = this.queryCell( initialIndex );
	    if ( cell ) {
	      this.selectCell( initialIndex, false, true );
	      return;
	    }
	  }

	  let index = 0;
	  // select with number
	  if ( initialIndex && this.slides[ initialIndex ] ) {
	    index = initialIndex;
	  }
	  // select instantly
	  this.select( index, false, true );
	};

	/**
	 * select slide from number or cell element
	 * @param {[Element, Number]} value - zero-based index or element to select
	 * @param {Boolean} isWrap - enables wrapping around for extra index
	 * @param {Boolean} isInstant - disables slide animation
	 */
	proto.selectCell = function( value, isWrap, isInstant ) {
	  // get cell
	  let cell = this.queryCell( value );
	  if ( !cell ) return;

	  let index = this.getCellSlideIndex( cell );
	  this.select( index, isWrap, isInstant );
	};

	proto.getCellSlideIndex = function( cell ) {
	  // get index of slide that has cell
	  let cellSlide = this.slides.find( ( slide ) => slide.cells.includes( cell ) );
	  return this.slides.indexOf( cellSlide );
	};

	// -------------------------- get cells -------------------------- //

	/**
	 * get Flickity.Cell, given an Element
	 * @param {Element} elem - matching cell element
	 * @returns {Flickity.Cell} cell - matching cell
	 */
	proto.getCell = function( elem ) {
	  // loop through cells to get the one that matches
	  for ( let cell of this.cells ) {
	    if ( cell.element === elem ) return cell;
	  }
	};

	/**
	 * get collection of Flickity.Cells, given Elements
	 * @param {[Element, Array, NodeList]} elems - multiple elements
	 * @returns {Array} cells - Flickity.Cells
	 */
	proto.getCells = function( elems ) {
	  elems = utils.makeArray( elems );
	  return elems.map( ( elem ) => this.getCell( elem ) ).filter( Boolean );
	};

	/**
	 * get cell elements
	 * @returns {Array} cellElems
	 */
	proto.getCellElements = function() {
	  return this.cells.map( ( cell ) => cell.element );
	};

	/**
	 * get parent cell from an element
	 * @param {Element} elem - child element
	 * @returns {Flickit.Cell} cell - parent cell
	 */
	proto.getParentCell = function( elem ) {
	  // first check if elem is cell
	  let cell = this.getCell( elem );
	  if ( cell ) return cell;

	  // try to get parent cell elem
	  let closest = elem.closest('.flickity-slider > *');
	  return this.getCell( closest );
	};

	/**
	 * get cells adjacent to a slide
	 * @param {Integer} adjCount - number of adjacent slides
	 * @param {Integer} index - index of slide to start
	 * @returns {Array} cells - array of Flickity.Cells
	 */
	proto.getAdjacentCellElements = function( adjCount, index ) {
	  if ( !adjCount ) return this.selectedSlide.getCellElements();

	  index = index === undefined ? this.selectedIndex : index;

	  let len = this.slides.length;
	  if ( 1 + ( adjCount * 2 ) >= len ) {
	    return this.getCellElements(); // get all
	  }

	  let cellElems = [];
	  for ( let i = index - adjCount; i <= index + adjCount; i++ ) {
	    let slideIndex = this.isWrapping ? utils.modulo( i, len ) : i;
	    let slide = this.slides[ slideIndex ];
	    if ( slide ) {
	      cellElems = cellElems.concat( slide.getCellElements() );
	    }
	  }
	  return cellElems;
	};

	/**
	 * select slide from number or cell element
	 * @param {[Element, String, Number]} selector - element, selector string, or index
	 * @returns {Flickity.Cell} - matching cell
	 */
	proto.queryCell = function( selector ) {
	  if ( typeof selector == 'number' ) {
	    // use number as index
	    return this.cells[ selector ];
	  }
	  // do not select invalid selectors from hash: #123, #/. #791
	  let isSelectorString = typeof selector == 'string' && !selector.match( /^[#.]?[\d/]/ );
	  if ( isSelectorString ) {
	    // use string as selector, get element
	    selector = this.element.querySelector( selector );
	  }
	  // get cell from element
	  return this.getCell( selector );
	};

	// -------------------------- events -------------------------- //

	proto.uiChange = function() {
	  this.emitEvent('uiChange');
	};

	// ----- resize ----- //

	proto.onresize = function() {
	  this.watchCSS();
	  this.resize();
	};

	utils.debounceMethod( Flickity, 'onresize', 150 );

	proto.resize = function() {
	  // #1177 disable resize behavior when animating or dragging for iOS 15
	  if ( !this.isActive || this.isAnimating || this.isDragging ) return;
	  this.getSize();
	  // wrap values
	  if ( this.isWrapping ) {
	    this.x = utils.modulo( this.x, this.slideableWidth );
	  }
	  this.positionCells();
	  this._updateWrapShiftCells();
	  this.setGallerySize();
	  this.emitEvent('resize');
	  // update selected index for group slides, instant
	  // TODO: position can be lost between groups of various numbers
	  let selectedElement = this.selectedElements && this.selectedElements[0];
	  this.selectCell( selectedElement, false, true );
	};

	// watches the :after property, activates/deactivates
	proto.watchCSS = function() {
	  if ( !this.options.watchCSS ) return;

	  let afterContent = getComputedStyle( this.element, ':after' ).content;
	  // activate if :after { content: 'flickity' }
	  if ( afterContent.includes('flickity') ) {
	    this.activate();
	  } else {
	    this.deactivate();
	  }
	};

	// ----- keydown ----- //

	// go previous/next if left/right keys pressed
	proto.onkeydown = function( event ) {
	  let { activeElement } = document;
	  let handler = Flickity.keyboardHandlers[ event.key ];
	  // only work if element is in focus
	  if ( !this.options.accessibility || !activeElement || !handler ) return;

	  let isFocused = this.focusableElems.some( ( elem ) => activeElement === elem );
	  if ( isFocused ) handler.call( this );
	};

	Flickity.keyboardHandlers = {
	  ArrowLeft: function() {
	    this.uiChange();
	    let leftMethod = this.options.rightToLeft ? 'next' : 'previous';
	    this[ leftMethod ]();
	  },
	  ArrowRight: function() {
	    this.uiChange();
	    let rightMethod = this.options.rightToLeft ? 'previous' : 'next';
	    this[ rightMethod ]();
	  },
	};

	// ----- focus ----- //

	proto.focus = function() {
	  this.element.focus({ preventScroll: true });
	};

	// -------------------------- destroy -------------------------- //

	// deactivate all Flickity functionality, but keep stuff available
	proto.deactivate = function() {
	  if ( !this.isActive ) return;

	  this.element.classList.remove('flickity-enabled');
	  this.element.classList.remove('flickity-rtl');
	  this.unselectSelectedSlide();
	  // destroy cells
	  this.cells.forEach( ( cell ) => cell.destroy() );
	  this.viewport.remove();
	  // move child elements back into element
	  this.element.append( ...this.slider.children );
	  if ( this.options.accessibility ) {
	    this.element.removeAttribute('tabIndex');
	    this.element.removeEventListener( 'keydown', this );
	  }
	  // set flags
	  this.isActive = false;
	  this.emitEvent('deactivate');
	};

	proto.destroy = function() {
	  this.deactivate();
	  window.removeEventListener( 'resize', this );
	  this.allOff();
	  this.emitEvent('destroy');
	  if ( jQuery && this.$element ) {
	    jQuery.removeData( this.element, 'flickity' );
	  }
	  delete this.element.flickityGUID;
	  delete instances[ this.guid ];
	};

	// -------------------------- prototype -------------------------- //

	Object.assign( proto, animatePrototype );

	// -------------------------- extras -------------------------- //

	/**
	 * get Flickity instance from element
	 * @param {[Element, String]} elem - element or selector string
	 * @returns {Flickity} - Flickity instance
	 */
	Flickity.data = function( elem ) {
	  elem = utils.getQueryElement( elem );
	  if ( elem ) return instances[ elem.flickityGUID ];
	};

	utils.htmlInit( Flickity, 'flickity' );

	let { jQueryBridget } = window;
	if ( jQuery && jQueryBridget ) {
	  jQueryBridget( 'flickity', Flickity, jQuery );
	}

	// set internal jQuery, for Webpack + jQuery v3, #478
	Flickity.setJQuery = function( jq ) {
	  jQuery = jq;
	};

	Flickity.Cell = Cell;
	Flickity.Slide = Slide;

	return Flickity;

	} ) );
	}(core));

	var drag = {exports: {}};

	var unidragger = {exports: {}};

	/*!
	 * Unidragger v3.0.1
	 * Draggable base class
	 * MIT license
	 */

	(function (module) {
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	        window,
	        evEmitter$1.exports,
	    );
	  } else {
	    // browser global
	    window.Unidragger = factory(
	        window,
	        window.EvEmitter,
	    );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( window, EvEmitter ) {

	function Unidragger() {}

	// inherit EvEmitter
	let proto = Unidragger.prototype = Object.create( EvEmitter.prototype );

	// ----- bind start ----- //

	// trigger handler methods for events
	proto.handleEvent = function( event ) {
	  let method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	let startEvent, activeEvents;
	if ( 'ontouchstart' in window ) {
	  // HACK prefer Touch Events as you can preventDefault on touchstart to
	  // disable scroll in iOS & mobile Chrome metafizzy/flickity#1177
	  startEvent = 'touchstart';
	  activeEvents = [ 'touchmove', 'touchend', 'touchcancel' ];
	} else if ( window.PointerEvent ) {
	  // Pointer Events
	  startEvent = 'pointerdown';
	  activeEvents = [ 'pointermove', 'pointerup', 'pointercancel' ];
	} else {
	  // mouse events
	  startEvent = 'mousedown';
	  activeEvents = [ 'mousemove', 'mouseup' ];
	}

	// prototype so it can be overwriteable by Flickity
	proto.touchActionValue = 'none';

	proto.bindHandles = function() {
	  this._bindHandles( 'addEventListener', this.touchActionValue );
	};

	proto.unbindHandles = function() {
	  this._bindHandles( 'removeEventListener', '' );
	};

	/**
	 * Add or remove start event
	 * @param {String} bindMethod - addEventListener or removeEventListener
	 * @param {String} touchAction - value for touch-action CSS property
	 */
	proto._bindHandles = function( bindMethod, touchAction ) {
	  this.handles.forEach( ( handle ) => {
	    handle[ bindMethod ]( startEvent, this );
	    handle[ bindMethod ]( 'click', this );
	    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
	    if ( window.PointerEvent ) handle.style.touchAction = touchAction;
	  } );
	};

	proto.bindActivePointerEvents = function() {
	  activeEvents.forEach( ( eventName ) => {
	    window.addEventListener( eventName, this );
	  } );
	};

	proto.unbindActivePointerEvents = function() {
	  activeEvents.forEach( ( eventName ) => {
	    window.removeEventListener( eventName, this );
	  } );
	};

	// ----- event handler helpers ----- //

	// trigger method with matching pointer
	proto.withPointer = function( methodName, event ) {
	  if ( event.pointerId === this.pointerIdentifier ) {
	    this[ methodName ]( event, event );
	  }
	};

	// trigger method with matching touch
	proto.withTouch = function( methodName, event ) {
	  let touch;
	  for ( let changedTouch of event.changedTouches ) {
	    if ( changedTouch.identifier === this.pointerIdentifier ) {
	      touch = changedTouch;
	    }
	  }
	  if ( touch ) this[ methodName ]( event, touch );
	};

	// ----- start event ----- //

	proto.onmousedown = function( event ) {
	  this.pointerDown( event, event );
	};

	proto.ontouchstart = function( event ) {
	  this.pointerDown( event, event.changedTouches[0] );
	};

	proto.onpointerdown = function( event ) {
	  this.pointerDown( event, event );
	};

	// nodes that have text fields
	const cursorNodes = [ 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION' ];
	// input types that do not have text fields
	const clickTypes = [ 'radio', 'checkbox', 'button', 'submit', 'image', 'file' ];

	/**
	 * any time you set `event, pointer` it refers to:
	 * @param {Event} event
	 * @param {Event | Touch} pointer
	 */
	proto.pointerDown = function( event, pointer ) {
	  // dismiss multi-touch taps, right clicks, and clicks on text fields
	  let isCursorNode = cursorNodes.includes( event.target.nodeName );
	  let isClickType = clickTypes.includes( event.target.type );
	  let isOkayElement = !isCursorNode || isClickType;
	  let isOkay = !this.isPointerDown && !event.button && isOkayElement;
	  if ( !isOkay ) return;

	  this.isPointerDown = true;
	  // save pointer identifier to match up touch events
	  this.pointerIdentifier = pointer.pointerId !== undefined ?
	    // pointerId for pointer events, touch.indentifier for touch events
	    pointer.pointerId : pointer.identifier;
	  // track position for move
	  this.pointerDownPointer = {
	    pageX: pointer.pageX,
	    pageY: pointer.pageY,
	  };

	  this.bindActivePointerEvents();
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};

	// ----- move ----- //

	proto.onmousemove = function( event ) {
	  this.pointerMove( event, event );
	};

	proto.onpointermove = function( event ) {
	  this.withPointer( 'pointerMove', event );
	};

	proto.ontouchmove = function( event ) {
	  this.withTouch( 'pointerMove', event );
	};

	proto.pointerMove = function( event, pointer ) {
	  let moveVector = {
	    x: pointer.pageX - this.pointerDownPointer.pageX,
	    y: pointer.pageY - this.pointerDownPointer.pageY,
	  };
	  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
	  // start drag if pointer has moved far enough to start drag
	  let isDragStarting = !this.isDragging && this.hasDragStarted( moveVector );
	  if ( isDragStarting ) this.dragStart( event, pointer );
	  if ( this.isDragging ) this.dragMove( event, pointer, moveVector );
	};

	// condition if pointer has moved far enough to start drag
	proto.hasDragStarted = function( moveVector ) {
	  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
	};

	// ----- drag ----- //

	proto.dragStart = function( event, pointer ) {
	  this.isDragging = true;
	  this.isPreventingClicks = true; // set flag to prevent clicks
	  this.emitEvent( 'dragStart', [ event, pointer ] );
	};

	proto.dragMove = function( event, pointer, moveVector ) {
	  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
	};

	// ----- end ----- //

	proto.onmouseup = function( event ) {
	  this.pointerUp( event, event );
	};

	proto.onpointerup = function( event ) {
	  this.withPointer( 'pointerUp', event );
	};

	proto.ontouchend = function( event ) {
	  this.withTouch( 'pointerUp', event );
	};

	proto.pointerUp = function( event, pointer ) {
	  this.pointerDone();
	  this.emitEvent( 'pointerUp', [ event, pointer ] );

	  if ( this.isDragging ) {
	    this.dragEnd( event, pointer );
	  } else {
	    // pointer didn't move enough for drag to start
	    this.staticClick( event, pointer );
	  }
	};

	proto.dragEnd = function( event, pointer ) {
	  this.isDragging = false; // reset flag
	  // re-enable clicking async
	  setTimeout( () => delete this.isPreventingClicks );

	  this.emitEvent( 'dragEnd', [ event, pointer ] );
	};

	// triggered on pointer up & pointer cancel
	proto.pointerDone = function() {
	  this.isPointerDown = false;
	  delete this.pointerIdentifier;
	  this.unbindActivePointerEvents();
	  this.emitEvent('pointerDone');
	};

	// ----- cancel ----- //

	proto.onpointercancel = function( event ) {
	  this.withPointer( 'pointerCancel', event );
	};

	proto.ontouchcancel = function( event ) {
	  this.withTouch( 'pointerCancel', event );
	};

	proto.pointerCancel = function( event, pointer ) {
	  this.pointerDone();
	  this.emitEvent( 'pointerCancel', [ event, pointer ] );
	};

	// ----- click ----- //

	// handle all clicks and prevent clicks when dragging
	proto.onclick = function( event ) {
	  if ( this.isPreventingClicks ) event.preventDefault();
	};

	// triggered after pointer down & up with no/tiny movement
	proto.staticClick = function( event, pointer ) {
	  // ignore emulated mouse up clicks
	  let isMouseup = event.type === 'mouseup';
	  if ( isMouseup && this.isIgnoringMouseUp ) return;

	  this.emitEvent( 'staticClick', [ event, pointer ] );

	  // set flag for emulated clicks 300ms after touchend
	  if ( isMouseup ) {
	    this.isIgnoringMouseUp = true;
	    // reset flag after 400ms
	    setTimeout( () => {
	      delete this.isIgnoringMouseUp;
	    }, 400 );
	  }
	};

	// -----  ----- //

	return Unidragger;

	} ) );
	}(unidragger));

	(function (module) {
	// drag
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	        window,
	        core.exports,
	        unidragger.exports,
	        utils$1.exports,
	    );
	  } else {
	    // browser global
	    window.Flickity = factory(
	        window,
	        window.Flickity,
	        window.Unidragger,
	        window.fizzyUIUtils,
	    );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal,
	    function factory( window, Flickity, Unidragger, utils ) {

	// ----- defaults ----- //

	Object.assign( Flickity.defaults, {
	  draggable: '>1',
	  dragThreshold: 3,
	} );

	// -------------------------- drag prototype -------------------------- //

	let proto = Flickity.prototype;
	Object.assign( proto, Unidragger.prototype ); // inherit Unidragger
	proto.touchActionValue = '';

	// --------------------------  -------------------------- //

	Flickity.create.drag = function() {
	  this.on( 'activate', this.onActivateDrag );
	  this.on( 'uiChange', this._uiChangeDrag );
	  this.on( 'deactivate', this.onDeactivateDrag );
	  this.on( 'cellChange', this.updateDraggable );
	  this.on( 'pointerDown', this.handlePointerDown );
	  this.on( 'pointerUp', this.handlePointerUp );
	  this.on( 'pointerDown', this.handlePointerDone );
	  this.on( 'dragStart', this.handleDragStart );
	  this.on( 'dragMove', this.handleDragMove );
	  this.on( 'dragEnd', this.handleDragEnd );
	  this.on( 'staticClick', this.handleStaticClick );
	  // TODO updateDraggable on resize? if groupCells & slides change
	};

	proto.onActivateDrag = function() {
	  this.handles = [ this.viewport ];
	  this.bindHandles();
	  this.updateDraggable();
	};

	proto.onDeactivateDrag = function() {
	  this.unbindHandles();
	  this.element.classList.remove('is-draggable');
	};

	proto.updateDraggable = function() {
	  // disable dragging if less than 2 slides. #278
	  if ( this.options.draggable === '>1' ) {
	    this.isDraggable = this.slides.length > 1;
	  } else {
	    this.isDraggable = this.options.draggable;
	  }
	  this.element.classList.toggle( 'is-draggable', this.isDraggable );
	};

	proto._uiChangeDrag = function() {
	  delete this.isFreeScrolling;
	};

	// -------------------------- pointer events -------------------------- //

	proto.handlePointerDown = function( event ) {
	  if ( !this.isDraggable ) {
	    // proceed for staticClick
	    this.bindActivePointerEvents( event );
	    return;
	  }

	  let isTouchStart = event.type === 'touchstart';
	  let isTouchPointer = event.pointerType === 'touch';
	  let isFocusNode = event.target.matches('input, textarea, select');
	  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) event.preventDefault();
	  if ( !isFocusNode ) this.focus();
	  // blur
	  if ( document.activeElement !== this.element ) document.activeElement.blur();
	  // stop if it was moving
	  this.dragX = this.x;
	  this.viewport.classList.add('is-pointer-down');
	  // track scrolling
	  this.pointerDownScroll = getScrollPosition();
	  window.addEventListener( 'scroll', this );
	  this.bindActivePointerEvents( event );
	};

	// ----- move ----- //

	proto.hasDragStarted = function( moveVector ) {
	  return Math.abs( moveVector.x ) > this.options.dragThreshold;
	};

	// ----- up ----- //

	proto.handlePointerUp = function() {
	  delete this.isTouchScrolling;
	  this.viewport.classList.remove('is-pointer-down');
	};

	proto.handlePointerDone = function() {
	  window.removeEventListener( 'scroll', this );
	  delete this.pointerDownScroll;
	};

	// -------------------------- dragging -------------------------- //

	proto.handleDragStart = function() {
	  if ( !this.isDraggable ) return;

	  this.dragStartPosition = this.x;
	  this.startAnimation();
	  window.removeEventListener( 'scroll', this );
	};

	proto.handleDragMove = function( event, pointer, moveVector ) {
	  if ( !this.isDraggable ) return;

	  event.preventDefault();

	  this.previousDragX = this.dragX;
	  // reverse if right-to-left
	  let direction = this.options.rightToLeft ? -1 : 1;
	  // wrap around move. #589
	  if ( this.isWrapping ) moveVector.x %= this.slideableWidth;
	  let dragX = this.dragStartPosition + moveVector.x * direction;

	  if ( !this.isWrapping ) {
	    // slow drag
	    let originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
	    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
	    let endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
	    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
	  }

	  this.dragX = dragX;
	  this.dragMoveTime = new Date();
	};

	proto.handleDragEnd = function() {
	  if ( !this.isDraggable ) return;

	  let { freeScroll } = this.options;
	  if ( freeScroll ) this.isFreeScrolling = true;
	  // set selectedIndex based on where flick will end up
	  let index = this.dragEndRestingSelect();

	  if ( freeScroll && !this.isWrapping ) {
	    // if free-scroll & not wrap around
	    // do not free-scroll if going outside of bounding slides
	    // so bounding slides can attract slider, and keep it in bounds
	    let restingX = this.getRestingPosition();
	    this.isFreeScrolling = -restingX > this.slides[0].target &&
	      -restingX < this.getLastSlide().target;
	  } else if ( !freeScroll && index === this.selectedIndex ) {
	    // boost selection if selected index has not changed
	    index += this.dragEndBoostSelect();
	  }
	  delete this.previousDragX;
	  // apply selection
	  // HACK, set flag so dragging stays in correct direction
	  this.isDragSelect = this.isWrapping;
	  this.select( index );
	  delete this.isDragSelect;
	};

	proto.dragEndRestingSelect = function() {
	  let restingX = this.getRestingPosition();
	  // how far away from selected slide
	  let distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
	  // get closet resting going up and going down
	  let positiveResting = this._getClosestResting( restingX, distance, 1 );
	  let negativeResting = this._getClosestResting( restingX, distance, -1 );
	  // use closer resting for wrap-around
	  return positiveResting.distance < negativeResting.distance ?
	    positiveResting.index : negativeResting.index;
	};

	/**
	 * given resting X and distance to selected cell
	 * get the distance and index of the closest cell
	 * @param {Number} restingX - estimated post-flick resting position
	 * @param {Number} distance - distance to selected cell
	 * @param {Integer} increment - +1 or -1, going up or down
	 * @returns {Object} - { distance: {Number}, index: {Integer} }
	 */
	proto._getClosestResting = function( restingX, distance, increment ) {
	  let index = this.selectedIndex;
	  let minDistance = Infinity;
	  let condition = this.options.contain && !this.isWrapping ?
	    // if containing, keep going if distance is equal to minDistance
	    ( dist, minDist ) => dist <= minDist :
	    ( dist, minDist ) => dist < minDist;

	  while ( condition( distance, minDistance ) ) {
	    // measure distance to next cell
	    index += increment;
	    minDistance = distance;
	    distance = this.getSlideDistance( -restingX, index );
	    if ( distance === null ) break;

	    distance = Math.abs( distance );
	  }
	  return {
	    distance: minDistance,
	    // selected was previous index
	    index: index - increment,
	  };
	};

	/**
	 * measure distance between x and a slide target
	 * @param {Number} x - horizontal position
	 * @param {Integer} index - slide index
	 * @returns {Number} - slide distance
	 */
	proto.getSlideDistance = function( x, index ) {
	  let len = this.slides.length;
	  // wrap around if at least 2 slides
	  let isWrapAround = this.options.wrapAround && len > 1;
	  let slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
	  let slide = this.slides[ slideIndex ];
	  if ( !slide ) return null;

	  // add distance for wrap-around slides
	  let wrap = isWrapAround ? this.slideableWidth * Math.floor( index/len ) : 0;
	  return x - ( slide.target + wrap );
	};

	proto.dragEndBoostSelect = function() {
	  // do not boost if no previousDragX or dragMoveTime
	  if ( this.previousDragX === undefined || !this.dragMoveTime ||
	    // or if drag was held for 100 ms
	    new Date() - this.dragMoveTime > 100 ) {
	    return 0;
	  }

	  let distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
	  let delta = this.previousDragX - this.dragX;
	  if ( distance > 0 && delta > 0 ) {
	    // boost to next if moving towards the right, and positive velocity
	    return 1;
	  } else if ( distance < 0 && delta < 0 ) {
	    // boost to previous if moving towards the left, and negative velocity
	    return -1;
	  }
	  return 0;
	};

	// ----- scroll ----- //

	proto.onscroll = function() {
	  let scroll = getScrollPosition();
	  let scrollMoveX = this.pointerDownScroll.x - scroll.x;
	  let scrollMoveY = this.pointerDownScroll.y - scroll.y;
	  // cancel click/tap if scroll is too much
	  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
	    this.pointerDone();
	  }
	};

	// ----- utils ----- //

	function getScrollPosition() {
	  return {
	    x: window.pageXOffset,
	    y: window.pageYOffset,
	  };
	}

	// -----  ----- //

	return Flickity;

	} ) );
	}(drag));

	var prevNextButton = {exports: {}};

	(function (module) {
	// prev/next buttons
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory( core.exports );
	  } else {
	    // browser global
	    factory( window.Flickity );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( Flickity ) {

	const svgURI = 'http://www.w3.org/2000/svg';

	// -------------------------- PrevNextButton -------------------------- //

	function PrevNextButton( increment, direction, arrowShape ) {
	  this.increment = increment;
	  this.direction = direction;
	  this.isPrevious = increment === 'previous';
	  this.isLeft = direction === 'left';
	  this._create( arrowShape );
	}

	PrevNextButton.prototype._create = function( arrowShape ) {
	  // properties
	  let element = this.element = document.createElement('button');
	  element.className = `flickity-button flickity-prev-next-button ${this.increment}`;
	  let label = this.isPrevious ? 'Previous' : 'Next';
	  // prevent button from submitting form https://stackoverflow.com/a/10836076/182183
	  element.setAttribute( 'type', 'button' );
	  element.setAttribute( 'aria-label', label );
	  // init as disabled
	  this.disable();
	  // create arrow
	  let svg = this.createSVG( label, arrowShape );
	  element.append( svg );
	};

	PrevNextButton.prototype.createSVG = function( label, arrowShape ) {
	  let svg = document.createElementNS( svgURI, 'svg' );
	  svg.setAttribute( 'class', 'flickity-button-icon' );
	  svg.setAttribute( 'viewBox', '0 0 100 100' );
	  // add title #1189
	  let title = document.createElementNS( svgURI, 'title' );
	  title.append( label );
	  // add path
	  let path = document.createElementNS( svgURI, 'path' );
	  let pathMovements = getArrowMovements( arrowShape );
	  path.setAttribute( 'd', pathMovements );
	  path.setAttribute( 'class', 'arrow' );
	  // rotate arrow
	  if ( !this.isLeft ) {
	    path.setAttribute( 'transform', 'translate(100, 100) rotate(180)' );
	  }
	  svg.append( title, path );
	  return svg;
	};

	// get SVG path movmement
	function getArrowMovements( shape ) {
	  // use shape as movement if string
	  if ( typeof shape == 'string' ) return shape;

	  let { x0, x1, x2, x3, y1, y2 } = shape;

	  // create movement string
	  return `M ${x0}, 50
    L ${x1}, ${y1 + 50}
    L ${x2}, ${y2 + 50}
    L ${x3}, 50
    L ${x2}, ${50 - y2}
    L ${x1}, ${50 - y1}
    Z`;
	}

	// -----  ----- //

	PrevNextButton.prototype.enable = function() {
	  this.element.removeAttribute('disabled');
	};

	PrevNextButton.prototype.disable = function() {
	  this.element.setAttribute( 'disabled', true );
	};

	// -------------------------- Flickity prototype -------------------------- //

	Object.assign( Flickity.defaults, {
	  prevNextButtons: true,
	  arrowShape: {
	    x0: 10,
	    x1: 60, y1: 50,
	    x2: 70, y2: 40,
	    x3: 30,
	  },
	} );

	Flickity.create.prevNextButtons = function() {
	  if ( !this.options.prevNextButtons ) return;

	  let { rightToLeft, arrowShape } = this.options;
	  let prevDirection = rightToLeft ? 'right' : 'left';
	  let nextDirection = rightToLeft ? 'left' : 'right';
	  this.prevButton = new PrevNextButton( 'previous', prevDirection, arrowShape );
	  this.nextButton = new PrevNextButton( 'next', nextDirection, arrowShape );
	  this.focusableElems.push( this.prevButton.element );
	  this.focusableElems.push( this.nextButton.element );

	  this.handlePrevButtonClick = () => {
	    this.uiChange();
	    this.previous();
	  };

	  this.handleNextButtonClick = () => {
	    this.uiChange();
	    this.next();
	  };

	  this.on( 'activate', this.activatePrevNextButtons );
	  this.on( 'select', this.updatePrevNextButtons );
	};

	let proto = Flickity.prototype;

	proto.updatePrevNextButtons = function() {
	  let lastIndex = this.slides.length ? this.slides.length - 1 : 0;
	  this.updatePrevNextButton( this.prevButton, 0 );
	  this.updatePrevNextButton( this.nextButton, lastIndex );
	};

	proto.updatePrevNextButton = function( button, disabledIndex ) {
	  // enable is wrapAround and at least 2 slides
	  if ( this.isWrapping && this.slides.length > 1 ) {
	    button.enable();
	    return;
	  }

	  let isEnabled = this.selectedIndex !== disabledIndex;
	  button[ isEnabled ? 'enable' : 'disable' ]();
	  // if disabling button that is focused,
	  // shift focus to element to maintain keyboard accessibility
	  let isDisabledFocused = !isEnabled && document.activeElement === button.element;
	  if ( isDisabledFocused ) this.focus();
	};

	proto.activatePrevNextButtons = function() {
	  this.prevButton.element.addEventListener( 'click', this.handlePrevButtonClick );
	  this.nextButton.element.addEventListener( 'click', this.handleNextButtonClick );
	  this.element.append( this.prevButton.element, this.nextButton.element );
	  this.on( 'deactivate', this.deactivatePrevNextButtons );
	};

	proto.deactivatePrevNextButtons = function() {
	  this.prevButton.element.remove();
	  this.nextButton.element.remove();
	  this.prevButton.element.removeEventListener( 'click', this.handlePrevButtonClick );
	  this.nextButton.element.removeEventListener( 'click', this.handleNextButtonClick );
	  this.off( 'deactivate', this.deactivatePrevNextButtons );
	};

	// --------------------------  -------------------------- //

	Flickity.PrevNextButton = PrevNextButton;

	return Flickity;

	} ) );
	}(prevNextButton));

	var pageDots = {exports: {}};

	(function (module) {
	// page dots
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	        core.exports,
	        utils$1.exports,
	    );
	  } else {
	    // browser global
	    factory(
	        window.Flickity,
	        window.fizzyUIUtils,
	    );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( Flickity, utils ) {

	// -------------------------- PageDots -------------------------- //

	function PageDots() {
	  // create holder element
	  this.holder = document.createElement('div');
	  this.holder.className = 'flickity-page-dots';
	  // create dots, array of elements
	  this.dots = [];
	}

	PageDots.prototype.setDots = function( slidesLength ) {
	  // get difference between number of slides and number of dots
	  let delta = slidesLength - this.dots.length;
	  if ( delta > 0 ) {
	    this.addDots( delta );
	  } else if ( delta < 0 ) {
	    this.removeDots( -delta );
	  }
	};

	PageDots.prototype.addDots = function( count ) {
	  let newDots = new Array( count ).fill()
	    .map( ( item, i ) => {
	      let dot = document.createElement('button');
	      dot.setAttribute( 'type', 'button' );
	      let num = i + 1 + this.dots.length;
	      dot.className = 'flickity-page-dot';
	      dot.textContent = `View slide ${num}`;
	      return dot;
	    } );

	  this.holder.append( ...newDots );
	  this.dots = this.dots.concat( newDots );
	};

	PageDots.prototype.removeDots = function( count ) {
	  // remove from this.dots collection
	  let removeDots = this.dots.splice( this.dots.length - count, count );
	  // remove from DOM
	  removeDots.forEach( ( dot ) => dot.remove() );
	};

	PageDots.prototype.updateSelected = function( index ) {
	  // remove selected class on previous
	  if ( this.selectedDot ) {
	    this.selectedDot.classList.remove('is-selected');
	    this.selectedDot.removeAttribute('aria-current');
	  }
	  // don't proceed if no dots
	  if ( !this.dots.length ) return;

	  this.selectedDot = this.dots[ index ];
	  this.selectedDot.classList.add('is-selected');
	  this.selectedDot.setAttribute( 'aria-current', 'step' );
	};

	Flickity.PageDots = PageDots;

	// -------------------------- Flickity -------------------------- //

	Object.assign( Flickity.defaults, {
	  pageDots: true,
	} );

	Flickity.create.pageDots = function() {
	  if ( !this.options.pageDots ) return;

	  this.pageDots = new PageDots();
	  this.handlePageDotsClick = this.onPageDotsClick.bind( this );
	  // events
	  this.on( 'activate', this.activatePageDots );
	  this.on( 'select', this.updateSelectedPageDots );
	  this.on( 'cellChange', this.updatePageDots );
	  this.on( 'resize', this.updatePageDots );
	  this.on( 'deactivate', this.deactivatePageDots );
	};

	let proto = Flickity.prototype;

	proto.activatePageDots = function() {
	  this.pageDots.setDots( this.slides.length );
	  this.focusableElems.push( ...this.pageDots.dots );
	  this.pageDots.holder.addEventListener( 'click', this.handlePageDotsClick );
	  this.element.append( this.pageDots.holder );
	};

	proto.onPageDotsClick = function( event ) {
	  let index = this.pageDots.dots.indexOf( event.target );
	  if ( index === -1 ) return; // only dot clicks

	  this.uiChange();
	  this.select( index );
	};

	proto.updateSelectedPageDots = function() {
	  this.pageDots.updateSelected( this.selectedIndex );
	};

	proto.updatePageDots = function() {
	  this.pageDots.dots.forEach( ( dot ) => {
	    utils.removeFrom( this.focusableElems, dot );
	  } );
	  this.pageDots.setDots( this.slides.length );
	  this.focusableElems.push( ...this.pageDots.dots );
	};

	proto.deactivatePageDots = function() {
	  this.pageDots.holder.remove();
	  this.pageDots.holder.removeEventListener( 'click', this.handlePageDotsClick );
	};

	// -----  ----- //

	Flickity.PageDots = PageDots;

	return Flickity;

	} ) );
	}(pageDots));

	var player = {exports: {}};

	(function (module) {
	// player & autoPlay
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory( core.exports );
	  } else {
	    // browser global
	    factory( window.Flickity );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( Flickity ) {

	// -------------------------- Player -------------------------- //

	function Player( autoPlay, onTick ) {
	  this.autoPlay = autoPlay;
	  this.onTick = onTick;
	  this.state = 'stopped';
	  // visibility change event handler
	  this.onVisibilityChange = this.visibilityChange.bind( this );
	  this.onVisibilityPlay = this.visibilityPlay.bind( this );
	}

	// start play
	Player.prototype.play = function() {
	  if ( this.state === 'playing' ) return;

	  // do not play if page is hidden, start playing when page is visible
	  let isPageHidden = document.hidden;
	  if ( isPageHidden ) {
	    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
	    return;
	  }

	  this.state = 'playing';
	  // listen to visibility change
	  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
	  // start ticking
	  this.tick();
	};

	Player.prototype.tick = function() {
	  // do not tick if not playing
	  if ( this.state !== 'playing' ) return;

	  // default to 3 seconds
	  let time = typeof this.autoPlay == 'number' ? this.autoPlay : 3000;
	  // HACK: reset ticks if stopped and started within interval
	  this.clear();
	  this.timeout = setTimeout( () => {
	    this.onTick();
	    this.tick();
	  }, time );
	};

	Player.prototype.stop = function() {
	  this.state = 'stopped';
	  this.clear();
	  // remove visibility change event
	  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
	};

	Player.prototype.clear = function() {
	  clearTimeout( this.timeout );
	};

	Player.prototype.pause = function() {
	  if ( this.state === 'playing' ) {
	    this.state = 'paused';
	    this.clear();
	  }
	};

	Player.prototype.unpause = function() {
	  // re-start play if paused
	  if ( this.state === 'paused' ) this.play();
	};

	// pause if page visibility is hidden, unpause if visible
	Player.prototype.visibilityChange = function() {
	  let isPageHidden = document.hidden;
	  this[ isPageHidden ? 'pause' : 'unpause' ]();
	};

	Player.prototype.visibilityPlay = function() {
	  this.play();
	  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
	};

	// -------------------------- Flickity -------------------------- //

	Object.assign( Flickity.defaults, {
	  pauseAutoPlayOnHover: true,
	} );

	Flickity.create.player = function() {
	  this.player = new Player( this.options.autoPlay, () => {
	    this.next( true );
	  } );

	  this.on( 'activate', this.activatePlayer );
	  this.on( 'uiChange', this.stopPlayer );
	  this.on( 'pointerDown', this.stopPlayer );
	  this.on( 'deactivate', this.deactivatePlayer );
	};

	let proto = Flickity.prototype;

	proto.activatePlayer = function() {
	  if ( !this.options.autoPlay ) return;

	  this.player.play();
	  this.element.addEventListener( 'mouseenter', this );
	};

	// Player API, don't hate the ... thanks I know where the door is

	proto.playPlayer = function() {
	  this.player.play();
	};

	proto.stopPlayer = function() {
	  this.player.stop();
	};

	proto.pausePlayer = function() {
	  this.player.pause();
	};

	proto.unpausePlayer = function() {
	  this.player.unpause();
	};

	proto.deactivatePlayer = function() {
	  this.player.stop();
	  this.element.removeEventListener( 'mouseenter', this );
	};

	// ----- mouseenter/leave ----- //

	// pause auto-play on hover
	proto.onmouseenter = function() {
	  if ( !this.options.pauseAutoPlayOnHover ) return;

	  this.player.pause();
	  this.element.addEventListener( 'mouseleave', this );
	};

	// resume auto-play on hover off
	proto.onmouseleave = function() {
	  this.player.unpause();
	  this.element.removeEventListener( 'mouseleave', this );
	};

	// -----  ----- //

	Flickity.Player = Player;

	return Flickity;

	} ) );
	}(player));

	var addRemoveCell = {exports: {}};

	(function (module) {
	// add, remove cell
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	        core.exports,
	        utils$1.exports,
	    );
	  } else {
	    // browser global
	    factory(
	        window.Flickity,
	        window.fizzyUIUtils,
	    );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( Flickity, utils ) {

	// append cells to a document fragment
	function getCellsFragment( cells ) {
	  let fragment = document.createDocumentFragment();
	  cells.forEach( ( cell ) => fragment.appendChild( cell.element ) );
	  return fragment;
	}

	// -------------------------- add/remove cell prototype -------------------------- //

	let proto = Flickity.prototype;

	/**
	 * Insert, prepend, or append cells
	 * @param {[Element, Array, NodeList]} elems - Elements to insert
	 * @param {Integer} index - Zero-based number to insert
	 */
	proto.insert = function( elems, index ) {
	  let cells = this._makeCells( elems );
	  if ( !cells || !cells.length ) return;

	  let len = this.cells.length;
	  // default to append
	  index = index === undefined ? len : index;
	  // add cells with document fragment
	  let fragment = getCellsFragment( cells );
	  // append to slider
	  let isAppend = index === len;
	  if ( isAppend ) {
	    this.slider.appendChild( fragment );
	  } else {
	    let insertCellElement = this.cells[ index ].element;
	    this.slider.insertBefore( fragment, insertCellElement );
	  }
	  // add to this.cells
	  if ( index === 0 ) {
	    // prepend, add to start
	    this.cells = cells.concat( this.cells );
	  } else if ( isAppend ) {
	    // append, add to end
	    this.cells = this.cells.concat( cells );
	  } else {
	    // insert in this.cells
	    let endCells = this.cells.splice( index, len - index );
	    this.cells = this.cells.concat( cells ).concat( endCells );
	  }

	  this._sizeCells( cells );
	  this.cellChange( index );
	  this.positionSliderAtSelected();
	};

	proto.append = function( elems ) {
	  this.insert( elems, this.cells.length );
	};

	proto.prepend = function( elems ) {
	  this.insert( elems, 0 );
	};

	/**
	 * Remove cells
	 * @param {[Element, Array, NodeList]} elems - ELements to remove
	 */
	proto.remove = function( elems ) {
	  let cells = this.getCells( elems );
	  if ( !cells || !cells.length ) return;

	  let minCellIndex = this.cells.length - 1;
	  // remove cells from collection & DOM
	  cells.forEach( ( cell ) => {
	    cell.remove();
	    let index = this.cells.indexOf( cell );
	    minCellIndex = Math.min( index, minCellIndex );
	    utils.removeFrom( this.cells, cell );
	  } );

	  this.cellChange( minCellIndex );
	  this.positionSliderAtSelected();
	};

	/**
	 * logic to be run after a cell's size changes
	 * @param {Element} elem - cell's element
	 */
	proto.cellSizeChange = function( elem ) {
	  let cell = this.getCell( elem );
	  if ( !cell ) return;

	  cell.getSize();

	  let index = this.cells.indexOf( cell );
	  this.cellChange( index );
	  // do not position slider after lazy load
	};

	/**
	 * logic any time a cell is changed: added, removed, or size changed
	 * @param {Integer} changedCellIndex - index of the changed cell, optional
	 */
	proto.cellChange = function( changedCellIndex ) {
	  let prevSelectedElem = this.selectedElement;
	  this._positionCells( changedCellIndex );
	  this._updateWrapShiftCells();
	  this.setGallerySize();
	  // update selectedIndex, try to maintain position & select previous selected element
	  let cell = this.getCell( prevSelectedElem );
	  if ( cell ) this.selectedIndex = this.getCellSlideIndex( cell );
	  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

	  this.emitEvent( 'cellChange', [ changedCellIndex ] );
	  // position slider
	  this.select( this.selectedIndex );
	};

	// -----  ----- //

	return Flickity;

	} ) );
	}(addRemoveCell));

	var lazyload = {exports: {}};

	(function (module) {
	// lazyload
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	        core.exports,
	        utils$1.exports,
	    );
	  } else {
	    // browser global
	    factory(
	        window.Flickity,
	        window.fizzyUIUtils,
	    );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( Flickity, utils ) {

	const lazyAttr = 'data-flickity-lazyload';
	const lazySrcAttr = `${lazyAttr}-src`;
	const lazySrcsetAttr = `${lazyAttr}-srcset`;
	const imgSelector = `img[${lazyAttr}], img[${lazySrcAttr}], ` +
	  `img[${lazySrcsetAttr}], source[${lazySrcsetAttr}]`;

	Flickity.create.lazyLoad = function() {
	  this.on( 'select', this.lazyLoad );

	  this.handleLazyLoadComplete = this.onLazyLoadComplete.bind( this );
	};

	let proto = Flickity.prototype;

	proto.lazyLoad = function() {
	  let { lazyLoad } = this.options;
	  if ( !lazyLoad ) return;

	  // get adjacent cells, use lazyLoad option for adjacent count
	  let adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
	  // lazy load images
	  this.getAdjacentCellElements( adjCount )
	    .map( getCellLazyImages )
	    .flat()
	    .forEach( ( img ) => new LazyLoader( img, this.handleLazyLoadComplete ) );
	};

	function getCellLazyImages( cellElem ) {
	  // check if cell element is lazy image
	  if ( cellElem.matches('img') ) {
	    let cellAttr = cellElem.getAttribute( lazyAttr );
	    let cellSrcAttr = cellElem.getAttribute( lazySrcAttr );
	    let cellSrcsetAttr = cellElem.getAttribute( lazySrcsetAttr );
	    if ( cellAttr || cellSrcAttr || cellSrcsetAttr ) {
	      return cellElem;
	    }
	  }
	  // select lazy images in cell
	  return [ ...cellElem.querySelectorAll( imgSelector ) ];
	}

	proto.onLazyLoadComplete = function( img, event ) {
	  let cell = this.getParentCell( img );
	  let cellElem = cell && cell.element;
	  this.cellSizeChange( cellElem );

	  this.dispatchEvent( 'lazyLoad', event, cellElem );
	};

	// -------------------------- LazyLoader -------------------------- //

	/**
	 * class to handle loading images
	 * @param {Image} img - Image element
	 * @param {Function} onComplete - callback function
	 */
	function LazyLoader( img, onComplete ) {
	  this.img = img;
	  this.onComplete = onComplete;
	  this.load();
	}

	LazyLoader.prototype.handleEvent = utils.handleEvent;

	LazyLoader.prototype.load = function() {
	  this.img.addEventListener( 'load', this );
	  this.img.addEventListener( 'error', this );
	  // get src & srcset
	  let src = this.img.getAttribute( lazyAttr ) ||
	    this.img.getAttribute( lazySrcAttr );
	  let srcset = this.img.getAttribute( lazySrcsetAttr );
	  // set src & serset
	  this.img.src = src;
	  if ( srcset ) this.img.setAttribute( 'srcset', srcset );
	  // remove attr
	  this.img.removeAttribute( lazyAttr );
	  this.img.removeAttribute( lazySrcAttr );
	  this.img.removeAttribute( lazySrcsetAttr );
	};

	LazyLoader.prototype.onload = function( event ) {
	  this.complete( event, 'flickity-lazyloaded' );
	};

	LazyLoader.prototype.onerror = function( event ) {
	  this.complete( event, 'flickity-lazyerror' );
	};

	LazyLoader.prototype.complete = function( event, className ) {
	  // unbind events
	  this.img.removeEventListener( 'load', this );
	  this.img.removeEventListener( 'error', this );
	  let mediaElem = this.img.parentNode.matches('picture') ? this.img.parentNode : this.img;
	  mediaElem.classList.add( className );

	  this.onComplete( this.img, event );
	};

	// -----  ----- //

	Flickity.LazyLoader = LazyLoader;

	return Flickity;

	} ) );
	}(lazyload));

	var imagesloaded$1 = {exports: {}};

	var imagesloaded = {exports: {}};

	/*!
	 * imagesLoaded v5.0.0
	 * JavaScript is all like "You images are done yet or what?"
	 * MIT License
	 */

	(function (module) {
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory( window, evEmitter$1.exports );
	  } else {
	    // browser global
	    window.imagesLoaded = factory( window, window.EvEmitter );
	  }

	} )( typeof window !== 'undefined' ? window : commonjsGlobal,
	    function factory( window, EvEmitter ) {

	let $ = window.jQuery;
	let console = window.console;

	// -------------------------- helpers -------------------------- //

	// turn element or nodeList into an array
	function makeArray( obj ) {
	  // use object if already an array
	  if ( Array.isArray( obj ) ) return obj;

	  let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
	  // convert nodeList to array
	  if ( isArrayLike ) return [ ...obj ];

	  // array of single index
	  return [ obj ];
	}

	// -------------------------- imagesLoaded -------------------------- //

	/**
	 * @param {[Array, Element, NodeList, String]} elem
	 * @param {[Object, Function]} options - if function, use as callback
	 * @param {Function} onAlways - callback function
	 * @returns {ImagesLoaded}
	 */
	function ImagesLoaded( elem, options, onAlways ) {
	  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
	  if ( !( this instanceof ImagesLoaded ) ) {
	    return new ImagesLoaded( elem, options, onAlways );
	  }
	  // use elem as selector string
	  let queryElem = elem;
	  if ( typeof elem == 'string' ) {
	    queryElem = document.querySelectorAll( elem );
	  }
	  // bail if bad element
	  if ( !queryElem ) {
	    console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
	    return;
	  }

	  this.elements = makeArray( queryElem );
	  this.options = {};
	  // shift arguments if no options set
	  if ( typeof options == 'function' ) {
	    onAlways = options;
	  } else {
	    Object.assign( this.options, options );
	  }

	  if ( onAlways ) this.on( 'always', onAlways );

	  this.getImages();
	  // add jQuery Deferred object
	  if ( $ ) this.jqDeferred = new $.Deferred();

	  // HACK check async to allow time to bind listeners
	  setTimeout( this.check.bind( this ) );
	}

	ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

	ImagesLoaded.prototype.getImages = function() {
	  this.images = [];

	  // filter & find items if we have an item selector
	  this.elements.forEach( this.addElementImages, this );
	};

	const elementNodeTypes = [ 1, 9, 11 ];

	/**
	 * @param {Node} elem
	 */
	ImagesLoaded.prototype.addElementImages = function( elem ) {
	  // filter siblings
	  if ( elem.nodeName === 'IMG' ) {
	    this.addImage( elem );
	  }
	  // get background image on element
	  if ( this.options.background === true ) {
	    this.addElementBackgroundImages( elem );
	  }

	  // find children
	  // no non-element nodes, #143
	  let { nodeType } = elem;
	  if ( !nodeType || !elementNodeTypes.includes( nodeType ) ) return;

	  let childImgs = elem.querySelectorAll('img');
	  // concat childElems to filterFound array
	  for ( let img of childImgs ) {
	    this.addImage( img );
	  }

	  // get child background images
	  if ( typeof this.options.background == 'string' ) {
	    let children = elem.querySelectorAll( this.options.background );
	    for ( let child of children ) {
	      this.addElementBackgroundImages( child );
	    }
	  }
	};

	const reURL = /url\((['"])?(.*?)\1\)/gi;

	ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
	  let style = getComputedStyle( elem );
	  // Firefox returns null if in a hidden iframe https://bugzil.la/548397
	  if ( !style ) return;

	  // get url inside url("...")
	  let matches = reURL.exec( style.backgroundImage );
	  while ( matches !== null ) {
	    let url = matches && matches[2];
	    if ( url ) {
	      this.addBackground( url, elem );
	    }
	    matches = reURL.exec( style.backgroundImage );
	  }
	};

	/**
	 * @param {Image} img
	 */
	ImagesLoaded.prototype.addImage = function( img ) {
	  let loadingImage = new LoadingImage( img );
	  this.images.push( loadingImage );
	};

	ImagesLoaded.prototype.addBackground = function( url, elem ) {
	  let background = new Background( url, elem );
	  this.images.push( background );
	};

	ImagesLoaded.prototype.check = function() {
	  this.progressedCount = 0;
	  this.hasAnyBroken = false;
	  // complete if no images
	  if ( !this.images.length ) {
	    this.complete();
	    return;
	  }

	  /* eslint-disable-next-line func-style */
	  let onProgress = ( image, elem, message ) => {
	    // HACK - Chrome triggers event before object properties have changed. #83
	    setTimeout( () => {
	      this.progress( image, elem, message );
	    } );
	  };

	  this.images.forEach( function( loadingImage ) {
	    loadingImage.once( 'progress', onProgress );
	    loadingImage.check();
	  } );
	};

	ImagesLoaded.prototype.progress = function( image, elem, message ) {
	  this.progressedCount++;
	  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
	  // progress event
	  this.emitEvent( 'progress', [ this, image, elem ] );
	  if ( this.jqDeferred && this.jqDeferred.notify ) {
	    this.jqDeferred.notify( this, image );
	  }
	  // check if completed
	  if ( this.progressedCount === this.images.length ) {
	    this.complete();
	  }

	  if ( this.options.debug && console ) {
	    console.log( `progress: ${message}`, image, elem );
	  }
	};

	ImagesLoaded.prototype.complete = function() {
	  let eventName = this.hasAnyBroken ? 'fail' : 'done';
	  this.isComplete = true;
	  this.emitEvent( eventName, [ this ] );
	  this.emitEvent( 'always', [ this ] );
	  if ( this.jqDeferred ) {
	    let jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
	    this.jqDeferred[ jqMethod ]( this );
	  }
	};

	// --------------------------  -------------------------- //

	function LoadingImage( img ) {
	  this.img = img;
	}

	LoadingImage.prototype = Object.create( EvEmitter.prototype );

	LoadingImage.prototype.check = function() {
	  // If complete is true and browser supports natural sizes,
	  // try to check for image status manually.
	  let isComplete = this.getIsImageComplete();
	  if ( isComplete ) {
	    // report based on naturalWidth
	    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
	    return;
	  }

	  // If none of the checks above matched, simulate loading on detached element.
	  this.proxyImage = new Image();
	  // add crossOrigin attribute. #204
	  if ( this.img.crossOrigin ) {
	    this.proxyImage.crossOrigin = this.img.crossOrigin;
	  }
	  this.proxyImage.addEventListener( 'load', this );
	  this.proxyImage.addEventListener( 'error', this );
	  // bind to image as well for Firefox. #191
	  this.img.addEventListener( 'load', this );
	  this.img.addEventListener( 'error', this );
	  this.proxyImage.src = this.img.currentSrc || this.img.src;
	};

	LoadingImage.prototype.getIsImageComplete = function() {
	  // check for non-zero, non-undefined naturalWidth
	  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
	  return this.img.complete && this.img.naturalWidth;
	};

	LoadingImage.prototype.confirm = function( isLoaded, message ) {
	  this.isLoaded = isLoaded;
	  let { parentNode } = this.img;
	  // emit progress with parent <picture> or self <img>
	  let elem = parentNode.nodeName === 'PICTURE' ? parentNode : this.img;
	  this.emitEvent( 'progress', [ this, elem, message ] );
	};

	// ----- events ----- //

	// trigger specified handler for event type
	LoadingImage.prototype.handleEvent = function( event ) {
	  let method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	LoadingImage.prototype.onload = function() {
	  this.confirm( true, 'onload' );
	  this.unbindEvents();
	};

	LoadingImage.prototype.onerror = function() {
	  this.confirm( false, 'onerror' );
	  this.unbindEvents();
	};

	LoadingImage.prototype.unbindEvents = function() {
	  this.proxyImage.removeEventListener( 'load', this );
	  this.proxyImage.removeEventListener( 'error', this );
	  this.img.removeEventListener( 'load', this );
	  this.img.removeEventListener( 'error', this );
	};

	// -------------------------- Background -------------------------- //

	function Background( url, element ) {
	  this.url = url;
	  this.element = element;
	  this.img = new Image();
	}

	// inherit LoadingImage prototype
	Background.prototype = Object.create( LoadingImage.prototype );

	Background.prototype.check = function() {
	  this.img.addEventListener( 'load', this );
	  this.img.addEventListener( 'error', this );
	  this.img.src = this.url;
	  // check if image is already complete
	  let isComplete = this.getIsImageComplete();
	  if ( isComplete ) {
	    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
	    this.unbindEvents();
	  }
	};

	Background.prototype.unbindEvents = function() {
	  this.img.removeEventListener( 'load', this );
	  this.img.removeEventListener( 'error', this );
	};

	Background.prototype.confirm = function( isLoaded, message ) {
	  this.isLoaded = isLoaded;
	  this.emitEvent( 'progress', [ this, this.element, message ] );
	};

	// -------------------------- jQuery -------------------------- //

	ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
	  jQuery = jQuery || window.jQuery;
	  if ( !jQuery ) return;

	  // set local variable
	  $ = jQuery;
	  // $().imagesLoaded()
	  $.fn.imagesLoaded = function( options, onAlways ) {
	    let instance = new ImagesLoaded( this, options, onAlways );
	    return instance.jqDeferred.promise( $( this ) );
	  };
	};
	// try making plugin
	ImagesLoaded.makeJQueryPlugin();

	// --------------------------  -------------------------- //

	return ImagesLoaded;

	} );
	}(imagesloaded));

	(function (module) {
	// imagesloaded
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	        core.exports,
	        imagesloaded.exports,
	    );
	  } else {
	    // browser global
	    factory(
	        window.Flickity,
	        window.imagesLoaded,
	    );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal,
	    function factory( Flickity, imagesLoaded ) {

	Flickity.create.imagesLoaded = function() {
	  this.on( 'activate', this.imagesLoaded );
	};

	Flickity.prototype.imagesLoaded = function() {
	  if ( !this.options.imagesLoaded ) return;

	  let onImagesLoadedProgress = ( instance, image ) => {
	    let cell = this.getParentCell( image.img );
	    this.cellSizeChange( cell && cell.element );
	    if ( !this.options.freeScroll ) this.positionSliderAtSelected();
	  };
	  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
	};

	return Flickity;

	} ) );
	}(imagesloaded$1));

	/*!
	 * Flickity v3.0.0
	 * Touch, responsive, flickable carousels
	 *
	 * Licensed GPLv3 for open source use
	 * or Flickity Commercial License for commercial use
	 *
	 * https://flickity.metafizzy.co
	 * Copyright 2015-2022 Metafizzy
	 */

	(function (module) {
	if ( module.exports ) {
	  const Flickity = core.exports;
	  
	  
	  
	  
	  
	  
	  

	  module.exports = Flickity;
	}
	}(js));

	var Flickity = js.exports;

	var flickityFade = {exports: {}};

	/**
	 * Flickity fade v2.0.0
	 * Fade between Flickity slides
	 */

	(function (module) {
	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	        js.exports,
	        utils$1.exports,
	    );
	  } else {
	    // browser global
	    factory(
	        window.Flickity,
	        window.fizzyUIUtils,
	    );
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function factory( Flickity, utils ) {

	// ---- Slide ---- //

	let Slide = Flickity.Slide;

	Slide.prototype.renderFadePosition = function() {
	};

	Slide.prototype.setOpacity = function( alpha ) {
	  this.cells.forEach( ( cell ) => {
	    cell.element.style.opacity = alpha;
	  } );
	};

	// ---- Flickity ---- //

	Flickity.create.fade = function() {
	  this.fadeIndex = this.selectedIndex;
	  this.prevSelectedIndex = this.selectedIndex;
	  this.on( 'select', this.onSelectFade );
	  this.on( 'dragEnd', this.onDragEndFade );
	  this.on( 'settle', this.onSettleFade );
	  this.on( 'activate', this.onActivateFade );
	  this.on( 'deactivate', this.onDeactivateFade );
	};

	let proto = Flickity.prototype;

	let updateSlides = proto.updateSlides;
	proto.updateSlides = function() {
	  updateSlides.apply( this, arguments );
	  if ( !this.options.fade ) return;

	  this.slides.forEach( ( slide, i ) => {
	    // position cells at selected target
	    let slideTargetX = slide.target - slide.x;
	    let firstCellX = slide.cells[0].x;
	    slide.cells.forEach( ( cell ) => {
	      let targetX = cell.x - firstCellX - slideTargetX;
	      this._renderCellPosition( cell, targetX );
	    } );
	    // set initial opacity
	    let alpha = i === this.selectedIndex ? 1 : 0;
	    slide.setOpacity( alpha );
	  } );
	};

	/* ---- events ---- */

	proto.onSelectFade = function() {
	  // in case of resize, keep fadeIndex within current count
	  this.fadeIndex = Math.min( this.prevSelectedIndex, this.slides.length - 1 );
	  this.prevSelectedIndex = this.selectedIndex;
	};

	proto.onSettleFade = function() {
	  delete this.didDragEnd;
	  if ( !this.options.fade ) return;

	  // set full and 0 opacity on selected & faded slides
	  this.selectedSlide.setOpacity( 1 );
	  let fadedSlide = this.slides[ this.fadeIndex ];
	  if ( fadedSlide && this.fadeIndex !== this.selectedIndex ) {
	    this.slides[ this.fadeIndex ].setOpacity( 0 );
	  }
	};

	proto.onDragEndFade = function() {
	  // set flag
	  this.didDragEnd = true;
	};

	proto.onActivateFade = function() {
	  if ( this.options.fade ) {
	    this.element.classList.add('is-fade');
	  }
	};

	proto.onDeactivateFade = function() {
	  if ( !this.options.fade ) return;

	  this.element.classList.remove('is-fade');
	  // reset opacity
	  this.slides.forEach( ( slide ) => {
	    slide.setOpacity('');
	  } );
	};

	/* ---- position & fading ---- */

	let positionSlider = proto.positionSlider;
	proto.positionSlider = function() {
	  if ( !this.options.fade ) {
	    positionSlider.apply( this, arguments );
	    return;
	  }

	  this.fadeSlides();
	  this.dispatchScrollEvent();
	};

	let positionSliderAtSelected = proto.positionSliderAtSelected;
	proto.positionSliderAtSelected = function() {
	  if ( this.options.fade ) {
	    // position fade slider at origin
	    this.setTranslateX( 0 );
	  }
	  positionSliderAtSelected.apply( this, arguments );
	};

	proto.fadeSlides = function() {
	  if ( this.slides.length < 2 ) return;

	  // get slides to fade-in & fade-out
	  let indexes = this.getFadeIndexes();
	  let fadeSlideA = this.slides[ indexes.a ];
	  let fadeSlideB = this.slides[ indexes.b ];
	  let distance = this.wrapDifference( fadeSlideA.target, fadeSlideB.target );
	  let progress = this.wrapDifference( fadeSlideA.target, -this.x );
	  progress /= distance;

	  fadeSlideA.setOpacity( 1 - progress );
	  fadeSlideB.setOpacity( progress );

	  // hide previous slide
	  let fadeHideIndex = indexes.a;
	  if ( this.isDragging ) {
	    fadeHideIndex = progress > 0.5 ? indexes.a : indexes.b;
	  }
	  let isNewHideIndex = this.fadeHideIndex !== undefined &&
	    this.fadeHideIndex !== fadeHideIndex &&
	    this.fadeHideIndex !== indexes.a &&
	    this.fadeHideIndex !== indexes.b;
	  if ( isNewHideIndex ) {
	    // new fadeHideSlide set, hide previous
	    this.slides[ this.fadeHideIndex ].setOpacity( 0 );
	  }
	  this.fadeHideIndex = fadeHideIndex;
	};

	proto.getFadeIndexes = function() {
	  if ( !this.isDragging && !this.didDragEnd ) {
	    return {
	      a: this.fadeIndex,
	      b: this.selectedIndex,
	    };
	  }
	  if ( this.options.wrapAround ) {
	    return this.getFadeDragWrapIndexes();
	  } else {
	    return this.getFadeDragLimitIndexes();
	  }
	};

	proto.getFadeDragWrapIndexes = function() {
	  let distances = this.slides.map( function( slide, i ) {
	    return this.getSlideDistance( -this.x, i );
	  }, this );
	  let absDistances = distances.map( function( distance ) {
	    return Math.abs( distance );
	  } );
	  let minDistance = Math.min( ...absDistances );
	  let closestIndex = absDistances.indexOf( minDistance );
	  let distance = distances[ closestIndex ];
	  let len = this.slides.length;

	  let delta = distance >= 0 ? 1 : -1;
	  return {
	    a: closestIndex,
	    b: utils.modulo( closestIndex + delta, len ),
	  };
	};

	proto.getFadeDragLimitIndexes = function() {
	  // calculate closest previous slide
	  let dragIndex = 0;
	  for ( let i = 0; i < this.slides.length - 1; i++ ) {
	    let slide = this.slides[i];
	    if ( -this.x < slide.target ) {
	      break;
	    }
	    dragIndex = i;
	  }
	  return {
	    a: dragIndex,
	    b: dragIndex + 1,
	  };
	};

	proto.wrapDifference = function( a, b ) {
	  let diff = b - a;
	  if ( !this.options.wrapAround ) return diff;

	  let diffPlus = diff + this.slideableWidth;
	  let diffMinus = diff - this.slideableWidth;
	  if ( Math.abs( diffPlus ) < Math.abs( diff ) ) {
	    diff = diffPlus;
	  }
	  if ( Math.abs( diffMinus ) < Math.abs( diff ) ) {
	    diff = diffMinus;
	  }
	  return diff;
	};

	// ---- wrapAround ---- //

	let _updateWrapShiftCells = proto._updateWrapShiftCells;
	proto._updateWrapShiftCells = function() {
	  if ( this.options.fade ) {
	    // update isWrapping
	    this.isWrapping = this.getIsWrapping();
	  } else {
	    _updateWrapShiftCells.apply( this, arguments );
	  }
	};

	let shiftWrapCells = proto.shiftWrapCells;
	proto.shiftWrapCells = function() {
	  if ( !this.options.fade ) {
	    shiftWrapCells.apply( this, arguments );
	  }
	};

	return Flickity;

	} ) );
	}(flickityFade));

	var masonry = {exports: {}};

	var outlayer = {exports: {}};

	var evEmitter = {exports: {}};

	/**
	 * EvEmitter v1.1.0
	 * Lil' event emitter
	 * MIT License
	 */

	(function (module) {
	/* jshint unused: true, undef: true, strict: true */

	( function( global, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module, window */
	  if ( module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.EvEmitter = factory();
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function() {

	function EvEmitter() {}

	var proto = EvEmitter.prototype;

	proto.on = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // set events hash
	  var events = this._events = this._events || {};
	  // set listeners array
	  var listeners = events[ eventName ] = events[ eventName ] || [];
	  // only add once
	  if ( listeners.indexOf( listener ) == -1 ) {
	    listeners.push( listener );
	  }

	  return this;
	};

	proto.once = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // add event
	  this.on( eventName, listener );
	  // set once flag
	  // set onceEvents hash
	  var onceEvents = this._onceEvents = this._onceEvents || {};
	  // set onceListeners object
	  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
	  // set flag
	  onceListeners[ listener ] = true;

	  return this;
	};

	proto.off = function( eventName, listener ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var index = listeners.indexOf( listener );
	  if ( index != -1 ) {
	    listeners.splice( index, 1 );
	  }

	  return this;
	};

	proto.emitEvent = function( eventName, args ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  // copy over to avoid interference if .off() in listener
	  listeners = listeners.slice(0);
	  args = args || [];
	  // once stuff
	  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

	  for ( var i=0; i < listeners.length; i++ ) {
	    var listener = listeners[i];
	    var isOnce = onceListeners && onceListeners[ listener ];
	    if ( isOnce ) {
	      // remove listener
	      // remove before trigger to prevent recursion
	      this.off( eventName, listener );
	      // unset once flag
	      delete onceListeners[ listener ];
	    }
	    // trigger listener
	    listener.apply( this, args );
	  }

	  return this;
	};

	proto.allOff = function() {
	  delete this._events;
	  delete this._onceEvents;
	};

	return EvEmitter;

	}));
	}(evEmitter));

	var getSize$1 = {exports: {}};

	/*!
	 * getSize v2.0.3
	 * measure size of elements
	 * MIT license
	 */

	(function (module) {
	/* jshint browser: true, strict: true, undef: true, unused: true */
	/* globals console: false */

	( function( window, factory ) {
	  /* jshint strict: false */ /* globals define, module */
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.getSize = factory();
	  }

	})( window, function factory() {

	// -------------------------- helpers -------------------------- //

	// get a number from a string, not a percentage
	function getStyleSize( value ) {
	  var num = parseFloat( value );
	  // not a percent like '100%', and a number
	  var isValid = value.indexOf('%') == -1 && !isNaN( num );
	  return isValid && num;
	}

	function noop() {}

	var logError = typeof console == 'undefined' ? noop :
	  function( message ) {
	    console.error( message );
	  };

	// -------------------------- measurements -------------------------- //

	var measurements = [
	  'paddingLeft',
	  'paddingRight',
	  'paddingTop',
	  'paddingBottom',
	  'marginLeft',
	  'marginRight',
	  'marginTop',
	  'marginBottom',
	  'borderLeftWidth',
	  'borderRightWidth',
	  'borderTopWidth',
	  'borderBottomWidth'
	];

	var measurementsLength = measurements.length;

	function getZeroSize() {
	  var size = {
	    width: 0,
	    height: 0,
	    innerWidth: 0,
	    innerHeight: 0,
	    outerWidth: 0,
	    outerHeight: 0
	  };
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    size[ measurement ] = 0;
	  }
	  return size;
	}

	// -------------------------- getStyle -------------------------- //

	/**
	 * getStyle, get style of element, check for Firefox bug
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	 */
	function getStyle( elem ) {
	  var style = getComputedStyle( elem );
	  if ( !style ) {
	    logError( 'Style returned ' + style +
	      '. Are you running this code in a hidden iframe on Firefox? ' +
	      'See https://bit.ly/getsizebug1' );
	  }
	  return style;
	}

	// -------------------------- setup -------------------------- //

	var isSetup = false;

	var isBoxSizeOuter;

	/**
	 * setup
	 * check isBoxSizerOuter
	 * do on first getSize() rather than on page load for Firefox bug
	 */
	function setup() {
	  // setup once
	  if ( isSetup ) {
	    return;
	  }
	  isSetup = true;

	  // -------------------------- box sizing -------------------------- //

	  /**
	   * Chrome & Safari measure the outer-width on style.width on border-box elems
	   * IE11 & Firefox<29 measures the inner-width
	   */
	  var div = document.createElement('div');
	  div.style.width = '200px';
	  div.style.padding = '1px 2px 3px 4px';
	  div.style.borderStyle = 'solid';
	  div.style.borderWidth = '1px 2px 3px 4px';
	  div.style.boxSizing = 'border-box';

	  var body = document.body || document.documentElement;
	  body.appendChild( div );
	  var style = getStyle( div );
	  // round value for browser zoom. desandro/masonry#928
	  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
	  getSize.isBoxSizeOuter = isBoxSizeOuter;

	  body.removeChild( div );
	}

	// -------------------------- getSize -------------------------- //

	function getSize( elem ) {
	  setup();

	  // use querySeletor if elem is string
	  if ( typeof elem == 'string' ) {
	    elem = document.querySelector( elem );
	  }

	  // do not proceed on non-objects
	  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
	    return;
	  }

	  var style = getStyle( elem );

	  // if hidden, everything is 0
	  if ( style.display == 'none' ) {
	    return getZeroSize();
	  }

	  var size = {};
	  size.width = elem.offsetWidth;
	  size.height = elem.offsetHeight;

	  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

	  // get all measurements
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    var value = style[ measurement ];
	    var num = parseFloat( value );
	    // any 'auto', 'medium' value will be 0
	    size[ measurement ] = !isNaN( num ) ? num : 0;
	  }

	  var paddingWidth = size.paddingLeft + size.paddingRight;
	  var paddingHeight = size.paddingTop + size.paddingBottom;
	  var marginWidth = size.marginLeft + size.marginRight;
	  var marginHeight = size.marginTop + size.marginBottom;
	  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

	  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

	  // overwrite width and height if we can get it from style
	  var styleWidth = getStyleSize( style.width );
	  if ( styleWidth !== false ) {
	    size.width = styleWidth +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
	  }

	  var styleHeight = getStyleSize( style.height );
	  if ( styleHeight !== false ) {
	    size.height = styleHeight +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
	  }

	  size.innerWidth = size.width - ( paddingWidth + borderWidth );
	  size.innerHeight = size.height - ( paddingHeight + borderHeight );

	  size.outerWidth = size.width + marginWidth;
	  size.outerHeight = size.height + marginHeight;

	  return size;
	}

	return getSize;

	});
	}(getSize$1));

	var utils = {exports: {}};

	var matchesSelector = {exports: {}};

	/**
	 * matchesSelector v2.0.2
	 * matchesSelector( element, '.selector' )
	 * MIT license
	 */

	(function (module) {
	/*jshint browser: true, strict: true, undef: true, unused: true */

	( function( window, factory ) {
	  // universal module definition
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.matchesSelector = factory();
	  }

	}( window, function factory() {

	  var matchesMethod = ( function() {
	    var ElemProto = window.Element.prototype;
	    // check for the standard method name first
	    if ( ElemProto.matches ) {
	      return 'matches';
	    }
	    // check un-prefixed
	    if ( ElemProto.matchesSelector ) {
	      return 'matchesSelector';
	    }
	    // check vendor prefixes
	    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

	    for ( var i=0; i < prefixes.length; i++ ) {
	      var prefix = prefixes[i];
	      var method = prefix + 'MatchesSelector';
	      if ( ElemProto[ method ] ) {
	        return method;
	      }
	    }
	  })();

	  return function matchesSelector( elem, selector ) {
	    return elem[ matchesMethod ]( selector );
	  };

	}));
	}(matchesSelector));

	/**
	 * Fizzy UI utils v2.0.7
	 * MIT license
	 */

	(function (module) {
	/*jshint browser: true, undef: true, unused: true, strict: true */

	( function( window, factory ) {
	  // universal module definition
	  /*jshint strict: false */ /*globals define, module, require */

	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      matchesSelector.exports
	    );
	  } else {
	    // browser global
	    window.fizzyUIUtils = factory(
	      window,
	      window.matchesSelector
	    );
	  }

	}( window, function factory( window, matchesSelector ) {

	var utils = {};

	// ----- extend ----- //

	// extends objects
	utils.extend = function( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	};

	// ----- modulo ----- //

	utils.modulo = function( num, div ) {
	  return ( ( num % div ) + div ) % div;
	};

	// ----- makeArray ----- //

	var arraySlice = Array.prototype.slice;

	// turn element or nodeList into an array
	utils.makeArray = function( obj ) {
	  if ( Array.isArray( obj ) ) {
	    // use object if already an array
	    return obj;
	  }
	  // return empty array if undefined or null. #6
	  if ( obj === null || obj === undefined ) {
	    return [];
	  }

	  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
	  if ( isArrayLike ) {
	    // convert nodeList to array
	    return arraySlice.call( obj );
	  }

	  // array of single index
	  return [ obj ];
	};

	// ----- removeFrom ----- //

	utils.removeFrom = function( ary, obj ) {
	  var index = ary.indexOf( obj );
	  if ( index != -1 ) {
	    ary.splice( index, 1 );
	  }
	};

	// ----- getParent ----- //

	utils.getParent = function( elem, selector ) {
	  while ( elem.parentNode && elem != document.body ) {
	    elem = elem.parentNode;
	    if ( matchesSelector( elem, selector ) ) {
	      return elem;
	    }
	  }
	};

	// ----- getQueryElement ----- //

	// use element as selector string
	utils.getQueryElement = function( elem ) {
	  if ( typeof elem == 'string' ) {
	    return document.querySelector( elem );
	  }
	  return elem;
	};

	// ----- handleEvent ----- //

	// enable .ontype to trigger from .addEventListener( elem, 'type' )
	utils.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	// ----- filterFindElements ----- //

	utils.filterFindElements = function( elems, selector ) {
	  // make array of elems
	  elems = utils.makeArray( elems );
	  var ffElems = [];

	  elems.forEach( function( elem ) {
	    // check that elem is an actual element
	    if ( !( elem instanceof HTMLElement ) ) {
	      return;
	    }
	    // add elem if no selector
	    if ( !selector ) {
	      ffElems.push( elem );
	      return;
	    }
	    // filter & find items if we have a selector
	    // filter
	    if ( matchesSelector( elem, selector ) ) {
	      ffElems.push( elem );
	    }
	    // find children
	    var childElems = elem.querySelectorAll( selector );
	    // concat childElems to filterFound array
	    for ( var i=0; i < childElems.length; i++ ) {
	      ffElems.push( childElems[i] );
	    }
	  });

	  return ffElems;
	};

	// ----- debounceMethod ----- //

	utils.debounceMethod = function( _class, methodName, threshold ) {
	  threshold = threshold || 100;
	  // original method
	  var method = _class.prototype[ methodName ];
	  var timeoutName = methodName + 'Timeout';

	  _class.prototype[ methodName ] = function() {
	    var timeout = this[ timeoutName ];
	    clearTimeout( timeout );

	    var args = arguments;
	    var _this = this;
	    this[ timeoutName ] = setTimeout( function() {
	      method.apply( _this, args );
	      delete _this[ timeoutName ];
	    }, threshold );
	  };
	};

	// ----- docReady ----- //

	utils.docReady = function( callback ) {
	  var readyState = document.readyState;
	  if ( readyState == 'complete' || readyState == 'interactive' ) {
	    // do async to allow for other scripts to run. metafizzy/flickity#441
	    setTimeout( callback );
	  } else {
	    document.addEventListener( 'DOMContentLoaded', callback );
	  }
	};

	// ----- htmlInit ----- //

	// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
	utils.toDashed = function( str ) {
	  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
	    return $1 + '-' + $2;
	  }).toLowerCase();
	};

	var console = window.console;
	/**
	 * allow user to initialize classes via [data-namespace] or .js-namespace class
	 * htmlInit( Widget, 'widgetName' )
	 * options are parsed from data-namespace-options
	 */
	utils.htmlInit = function( WidgetClass, namespace ) {
	  utils.docReady( function() {
	    var dashedNamespace = utils.toDashed( namespace );
	    var dataAttr = 'data-' + dashedNamespace;
	    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
	    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
	    var elems = utils.makeArray( dataAttrElems )
	      .concat( utils.makeArray( jsDashElems ) );
	    var dataOptionsAttr = dataAttr + '-options';
	    var jQuery = window.jQuery;

	    elems.forEach( function( elem ) {
	      var attr = elem.getAttribute( dataAttr ) ||
	        elem.getAttribute( dataOptionsAttr );
	      var options;
	      try {
	        options = attr && JSON.parse( attr );
	      } catch ( error ) {
	        // log error, do not initialize
	        if ( console ) {
	          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
	          ': ' + error );
	        }
	        return;
	      }
	      // initialize
	      var instance = new WidgetClass( elem, options );
	      // make available via $().data('namespace')
	      if ( jQuery ) {
	        jQuery.data( elem, namespace, instance );
	      }
	    });

	  });
	};

	// -----  ----- //

	return utils;

	}));
	}(utils));

	var item = {exports: {}};

	/**
	 * Outlayer Item
	 */

	(function (module) {
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module, require */
	  if ( module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory(
	      evEmitter.exports,
	      getSize$1.exports
	    );
	  } else {
	    // browser global
	    window.Outlayer = {};
	    window.Outlayer.Item = factory(
	      window.EvEmitter,
	      window.getSize
	    );
	  }

	}( window, function factory( EvEmitter, getSize ) {

	// ----- helpers ----- //

	function isEmptyObj( obj ) {
	  for ( var prop in obj ) {
	    return false;
	  }
	  prop = null;
	  return true;
	}

	// -------------------------- CSS3 support -------------------------- //


	var docElemStyle = document.documentElement.style;

	var transitionProperty = typeof docElemStyle.transition == 'string' ?
	  'transition' : 'WebkitTransition';
	var transformProperty = typeof docElemStyle.transform == 'string' ?
	  'transform' : 'WebkitTransform';

	var transitionEndEvent = {
	  WebkitTransition: 'webkitTransitionEnd',
	  transition: 'transitionend'
	}[ transitionProperty ];

	// cache all vendor properties that could have vendor prefix
	var vendorProperties = {
	  transform: transformProperty,
	  transition: transitionProperty,
	  transitionDuration: transitionProperty + 'Duration',
	  transitionProperty: transitionProperty + 'Property',
	  transitionDelay: transitionProperty + 'Delay'
	};

	// -------------------------- Item -------------------------- //

	function Item( element, layout ) {
	  if ( !element ) {
	    return;
	  }

	  this.element = element;
	  // parent layout class, i.e. Masonry, Isotope, or Packery
	  this.layout = layout;
	  this.position = {
	    x: 0,
	    y: 0
	  };

	  this._create();
	}

	// inherit EvEmitter
	var proto = Item.prototype = Object.create( EvEmitter.prototype );
	proto.constructor = Item;

	proto._create = function() {
	  // transition objects
	  this._transn = {
	    ingProperties: {},
	    clean: {},
	    onEnd: {}
	  };

	  this.css({
	    position: 'absolute'
	  });
	};

	// trigger specified handler for event type
	proto.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	proto.getSize = function() {
	  this.size = getSize( this.element );
	};

	/**
	 * apply CSS styles to element
	 * @param {Object} style
	 */
	proto.css = function( style ) {
	  var elemStyle = this.element.style;

	  for ( var prop in style ) {
	    // use vendor property if available
	    var supportedProp = vendorProperties[ prop ] || prop;
	    elemStyle[ supportedProp ] = style[ prop ];
	  }
	};

	 // measure position, and sets it
	proto.getPosition = function() {
	  var style = getComputedStyle( this.element );
	  var isOriginLeft = this.layout._getOption('originLeft');
	  var isOriginTop = this.layout._getOption('originTop');
	  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
	  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
	  var x = parseFloat( xValue );
	  var y = parseFloat( yValue );
	  // convert percent to pixels
	  var layoutSize = this.layout.size;
	  if ( xValue.indexOf('%') != -1 ) {
	    x = ( x / 100 ) * layoutSize.width;
	  }
	  if ( yValue.indexOf('%') != -1 ) {
	    y = ( y / 100 ) * layoutSize.height;
	  }
	  // clean up 'auto' or other non-integer values
	  x = isNaN( x ) ? 0 : x;
	  y = isNaN( y ) ? 0 : y;
	  // remove padding from measurement
	  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
	  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

	  this.position.x = x;
	  this.position.y = y;
	};

	// set settled position, apply padding
	proto.layoutPosition = function() {
	  var layoutSize = this.layout.size;
	  var style = {};
	  var isOriginLeft = this.layout._getOption('originLeft');
	  var isOriginTop = this.layout._getOption('originTop');

	  // x
	  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
	  var xProperty = isOriginLeft ? 'left' : 'right';
	  var xResetProperty = isOriginLeft ? 'right' : 'left';

	  var x = this.position.x + layoutSize[ xPadding ];
	  // set in percentage or pixels
	  style[ xProperty ] = this.getXValue( x );
	  // reset other property
	  style[ xResetProperty ] = '';

	  // y
	  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
	  var yProperty = isOriginTop ? 'top' : 'bottom';
	  var yResetProperty = isOriginTop ? 'bottom' : 'top';

	  var y = this.position.y + layoutSize[ yPadding ];
	  // set in percentage or pixels
	  style[ yProperty ] = this.getYValue( y );
	  // reset other property
	  style[ yResetProperty ] = '';

	  this.css( style );
	  this.emitEvent( 'layout', [ this ] );
	};

	proto.getXValue = function( x ) {
	  var isHorizontal = this.layout._getOption('horizontal');
	  return this.layout.options.percentPosition && !isHorizontal ?
	    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
	};

	proto.getYValue = function( y ) {
	  var isHorizontal = this.layout._getOption('horizontal');
	  return this.layout.options.percentPosition && isHorizontal ?
	    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
	};

	proto._transitionTo = function( x, y ) {
	  this.getPosition();
	  // get current x & y from top/left
	  var curX = this.position.x;
	  var curY = this.position.y;

	  var didNotMove = x == this.position.x && y == this.position.y;

	  // save end position
	  this.setPosition( x, y );

	  // if did not move and not transitioning, just go to layout
	  if ( didNotMove && !this.isTransitioning ) {
	    this.layoutPosition();
	    return;
	  }

	  var transX = x - curX;
	  var transY = y - curY;
	  var transitionStyle = {};
	  transitionStyle.transform = this.getTranslate( transX, transY );

	  this.transition({
	    to: transitionStyle,
	    onTransitionEnd: {
	      transform: this.layoutPosition
	    },
	    isCleaning: true
	  });
	};

	proto.getTranslate = function( x, y ) {
	  // flip cooridinates if origin on right or bottom
	  var isOriginLeft = this.layout._getOption('originLeft');
	  var isOriginTop = this.layout._getOption('originTop');
	  x = isOriginLeft ? x : -x;
	  y = isOriginTop ? y : -y;
	  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
	};

	// non transition + transform support
	proto.goTo = function( x, y ) {
	  this.setPosition( x, y );
	  this.layoutPosition();
	};

	proto.moveTo = proto._transitionTo;

	proto.setPosition = function( x, y ) {
	  this.position.x = parseFloat( x );
	  this.position.y = parseFloat( y );
	};

	// ----- transition ----- //

	/**
	 * @param {Object} style - CSS
	 * @param {Function} onTransitionEnd
	 */

	// non transition, just trigger callback
	proto._nonTransition = function( args ) {
	  this.css( args.to );
	  if ( args.isCleaning ) {
	    this._removeStyles( args.to );
	  }
	  for ( var prop in args.onTransitionEnd ) {
	    args.onTransitionEnd[ prop ].call( this );
	  }
	};

	/**
	 * proper transition
	 * @param {Object} args - arguments
	 *   @param {Object} to - style to transition to
	 *   @param {Object} from - style to start transition from
	 *   @param {Boolean} isCleaning - removes transition styles after transition
	 *   @param {Function} onTransitionEnd - callback
	 */
	proto.transition = function( args ) {
	  // redirect to nonTransition if no transition duration
	  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
	    this._nonTransition( args );
	    return;
	  }

	  var _transition = this._transn;
	  // keep track of onTransitionEnd callback by css property
	  for ( var prop in args.onTransitionEnd ) {
	    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
	  }
	  // keep track of properties that are transitioning
	  for ( prop in args.to ) {
	    _transition.ingProperties[ prop ] = true;
	    // keep track of properties to clean up when transition is done
	    if ( args.isCleaning ) {
	      _transition.clean[ prop ] = true;
	    }
	  }

	  // set from styles
	  if ( args.from ) {
	    this.css( args.from );
	    // force redraw. http://blog.alexmaccaw.com/css-transitions
	    this.element.offsetHeight;
	  }
	  // enable transition
	  this.enableTransition( args.to );
	  // set styles that are transitioning
	  this.css( args.to );

	  this.isTransitioning = true;

	};

	// dash before all cap letters, including first for
	// WebkitTransform => -webkit-transform
	function toDashedAll( str ) {
	  return str.replace( /([A-Z])/g, function( $1 ) {
	    return '-' + $1.toLowerCase();
	  });
	}

	var transitionProps = 'opacity,' + toDashedAll( transformProperty );

	proto.enableTransition = function(/* style */) {
	  // HACK changing transitionProperty during a transition
	  // will cause transition to jump
	  if ( this.isTransitioning ) {
	    return;
	  }

	  // make `transition: foo, bar, baz` from style object
	  // HACK un-comment this when enableTransition can work
	  // while a transition is happening
	  // var transitionValues = [];
	  // for ( var prop in style ) {
	  //   // dash-ify camelCased properties like WebkitTransition
	  //   prop = vendorProperties[ prop ] || prop;
	  //   transitionValues.push( toDashedAll( prop ) );
	  // }
	  // munge number to millisecond, to match stagger
	  var duration = this.layout.options.transitionDuration;
	  duration = typeof duration == 'number' ? duration + 'ms' : duration;
	  // enable transition styles
	  this.css({
	    transitionProperty: transitionProps,
	    transitionDuration: duration,
	    transitionDelay: this.staggerDelay || 0
	  });
	  // listen for transition end event
	  this.element.addEventListener( transitionEndEvent, this, false );
	};

	// ----- events ----- //

	proto.onwebkitTransitionEnd = function( event ) {
	  this.ontransitionend( event );
	};

	proto.onotransitionend = function( event ) {
	  this.ontransitionend( event );
	};

	// properties that I munge to make my life easier
	var dashedVendorProperties = {
	  '-webkit-transform': 'transform'
	};

	proto.ontransitionend = function( event ) {
	  // disregard bubbled events from children
	  if ( event.target !== this.element ) {
	    return;
	  }
	  var _transition = this._transn;
	  // get property name of transitioned property, convert to prefix-free
	  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

	  // remove property that has completed transitioning
	  delete _transition.ingProperties[ propertyName ];
	  // check if any properties are still transitioning
	  if ( isEmptyObj( _transition.ingProperties ) ) {
	    // all properties have completed transitioning
	    this.disableTransition();
	  }
	  // clean style
	  if ( propertyName in _transition.clean ) {
	    // clean up style
	    this.element.style[ event.propertyName ] = '';
	    delete _transition.clean[ propertyName ];
	  }
	  // trigger onTransitionEnd callback
	  if ( propertyName in _transition.onEnd ) {
	    var onTransitionEnd = _transition.onEnd[ propertyName ];
	    onTransitionEnd.call( this );
	    delete _transition.onEnd[ propertyName ];
	  }

	  this.emitEvent( 'transitionEnd', [ this ] );
	};

	proto.disableTransition = function() {
	  this.removeTransitionStyles();
	  this.element.removeEventListener( transitionEndEvent, this, false );
	  this.isTransitioning = false;
	};

	/**
	 * removes style property from element
	 * @param {Object} style
	**/
	proto._removeStyles = function( style ) {
	  // clean up transition styles
	  var cleanStyle = {};
	  for ( var prop in style ) {
	    cleanStyle[ prop ] = '';
	  }
	  this.css( cleanStyle );
	};

	var cleanTransitionStyle = {
	  transitionProperty: '',
	  transitionDuration: '',
	  transitionDelay: ''
	};

	proto.removeTransitionStyles = function() {
	  // remove transition
	  this.css( cleanTransitionStyle );
	};

	// ----- stagger ----- //

	proto.stagger = function( delay ) {
	  delay = isNaN( delay ) ? 0 : delay;
	  this.staggerDelay = delay + 'ms';
	};

	// ----- show/hide/remove ----- //

	// remove element from DOM
	proto.removeElem = function() {
	  this.element.parentNode.removeChild( this.element );
	  // remove display: none
	  this.css({ display: '' });
	  this.emitEvent( 'remove', [ this ] );
	};

	proto.remove = function() {
	  // just remove element if no transition support or no transition
	  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
	    this.removeElem();
	    return;
	  }

	  // start transition
	  this.once( 'transitionEnd', function() {
	    this.removeElem();
	  });
	  this.hide();
	};

	proto.reveal = function() {
	  delete this.isHidden;
	  // remove display: none
	  this.css({ display: '' });

	  var options = this.layout.options;

	  var onTransitionEnd = {};
	  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
	  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

	  this.transition({
	    from: options.hiddenStyle,
	    to: options.visibleStyle,
	    isCleaning: true,
	    onTransitionEnd: onTransitionEnd
	  });
	};

	proto.onRevealTransitionEnd = function() {
	  // check if still visible
	  // during transition, item may have been hidden
	  if ( !this.isHidden ) {
	    this.emitEvent('reveal');
	  }
	};

	/**
	 * get style property use for hide/reveal transition end
	 * @param {String} styleProperty - hiddenStyle/visibleStyle
	 * @returns {String}
	 */
	proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
	  var optionStyle = this.layout.options[ styleProperty ];
	  // use opacity
	  if ( optionStyle.opacity ) {
	    return 'opacity';
	  }
	  // get first property
	  for ( var prop in optionStyle ) {
	    return prop;
	  }
	};

	proto.hide = function() {
	  // set flag
	  this.isHidden = true;
	  // remove display: none
	  this.css({ display: '' });

	  var options = this.layout.options;

	  var onTransitionEnd = {};
	  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
	  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

	  this.transition({
	    from: options.visibleStyle,
	    to: options.hiddenStyle,
	    // keep hidden stuff hidden
	    isCleaning: true,
	    onTransitionEnd: onTransitionEnd
	  });
	};

	proto.onHideTransitionEnd = function() {
	  // check if still hidden
	  // during transition, item may have been un-hidden
	  if ( this.isHidden ) {
	    this.css({ display: 'none' });
	    this.emitEvent('hide');
	  }
	};

	proto.destroy = function() {
	  this.css({
	    position: '',
	    left: '',
	    right: '',
	    top: '',
	    bottom: '',
	    transition: '',
	    transform: ''
	  });
	};

	return Item;

	}));
	}(item));

	/*!
	 * Outlayer v2.1.1
	 * the brains and guts of a layout library
	 * MIT license
	 */

	(function (module) {
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module, require */
	  if ( module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory(
	      window,
	      evEmitter.exports,
	      getSize$1.exports,
	      utils.exports,
	      item.exports
	    );
	  } else {
	    // browser global
	    window.Outlayer = factory(
	      window,
	      window.EvEmitter,
	      window.getSize,
	      window.fizzyUIUtils,
	      window.Outlayer.Item
	    );
	  }

	}( window, function factory( window, EvEmitter, getSize, utils, Item ) {

	// ----- vars ----- //

	var console = window.console;
	var jQuery = window.jQuery;
	var noop = function() {};

	// -------------------------- Outlayer -------------------------- //

	// globally unique identifiers
	var GUID = 0;
	// internal store of all Outlayer intances
	var instances = {};


	/**
	 * @param {Element, String} element
	 * @param {Object} options
	 * @constructor
	 */
	function Outlayer( element, options ) {
	  var queryElement = utils.getQueryElement( element );
	  if ( !queryElement ) {
	    if ( console ) {
	      console.error( 'Bad element for ' + this.constructor.namespace +
	        ': ' + ( queryElement || element ) );
	    }
	    return;
	  }
	  this.element = queryElement;
	  // add jQuery
	  if ( jQuery ) {
	    this.$element = jQuery( this.element );
	  }

	  // options
	  this.options = utils.extend( {}, this.constructor.defaults );
	  this.option( options );

	  // add id for Outlayer.getFromElement
	  var id = ++GUID;
	  this.element.outlayerGUID = id; // expando
	  instances[ id ] = this; // associate via id

	  // kick it off
	  this._create();

	  var isInitLayout = this._getOption('initLayout');
	  if ( isInitLayout ) {
	    this.layout();
	  }
	}

	// settings are for internal use only
	Outlayer.namespace = 'outlayer';
	Outlayer.Item = Item;

	// default options
	Outlayer.defaults = {
	  containerStyle: {
	    position: 'relative'
	  },
	  initLayout: true,
	  originLeft: true,
	  originTop: true,
	  resize: true,
	  resizeContainer: true,
	  // item options
	  transitionDuration: '0.4s',
	  hiddenStyle: {
	    opacity: 0,
	    transform: 'scale(0.001)'
	  },
	  visibleStyle: {
	    opacity: 1,
	    transform: 'scale(1)'
	  }
	};

	var proto = Outlayer.prototype;
	// inherit EvEmitter
	utils.extend( proto, EvEmitter.prototype );

	/**
	 * set options
	 * @param {Object} opts
	 */
	proto.option = function( opts ) {
	  utils.extend( this.options, opts );
	};

	/**
	 * get backwards compatible option value, check old name
	 */
	proto._getOption = function( option ) {
	  var oldOption = this.constructor.compatOptions[ option ];
	  return oldOption && this.options[ oldOption ] !== undefined ?
	    this.options[ oldOption ] : this.options[ option ];
	};

	Outlayer.compatOptions = {
	  // currentName: oldName
	  initLayout: 'isInitLayout',
	  horizontal: 'isHorizontal',
	  layoutInstant: 'isLayoutInstant',
	  originLeft: 'isOriginLeft',
	  originTop: 'isOriginTop',
	  resize: 'isResizeBound',
	  resizeContainer: 'isResizingContainer'
	};

	proto._create = function() {
	  // get items from children
	  this.reloadItems();
	  // elements that affect layout, but are not laid out
	  this.stamps = [];
	  this.stamp( this.options.stamp );
	  // set container style
	  utils.extend( this.element.style, this.options.containerStyle );

	  // bind resize method
	  var canBindResize = this._getOption('resize');
	  if ( canBindResize ) {
	    this.bindResize();
	  }
	};

	// goes through all children again and gets bricks in proper order
	proto.reloadItems = function() {
	  // collection of item elements
	  this.items = this._itemize( this.element.children );
	};


	/**
	 * turn elements into Outlayer.Items to be used in layout
	 * @param {Array or NodeList or HTMLElement} elems
	 * @returns {Array} items - collection of new Outlayer Items
	 */
	proto._itemize = function( elems ) {

	  var itemElems = this._filterFindItemElements( elems );
	  var Item = this.constructor.Item;

	  // create new Outlayer Items for collection
	  var items = [];
	  for ( var i=0; i < itemElems.length; i++ ) {
	    var elem = itemElems[i];
	    var item = new Item( elem, this );
	    items.push( item );
	  }

	  return items;
	};

	/**
	 * get item elements to be used in layout
	 * @param {Array or NodeList or HTMLElement} elems
	 * @returns {Array} items - item elements
	 */
	proto._filterFindItemElements = function( elems ) {
	  return utils.filterFindElements( elems, this.options.itemSelector );
	};

	/**
	 * getter method for getting item elements
	 * @returns {Array} elems - collection of item elements
	 */
	proto.getItemElements = function() {
	  return this.items.map( function( item ) {
	    return item.element;
	  });
	};

	// ----- init & layout ----- //

	/**
	 * lays out all items
	 */
	proto.layout = function() {
	  this._resetLayout();
	  this._manageStamps();

	  // don't animate first layout
	  var layoutInstant = this._getOption('layoutInstant');
	  var isInstant = layoutInstant !== undefined ?
	    layoutInstant : !this._isLayoutInited;
	  this.layoutItems( this.items, isInstant );

	  // flag for initalized
	  this._isLayoutInited = true;
	};

	// _init is alias for layout
	proto._init = proto.layout;

	/**
	 * logic before any new layout
	 */
	proto._resetLayout = function() {
	  this.getSize();
	};


	proto.getSize = function() {
	  this.size = getSize( this.element );
	};

	/**
	 * get measurement from option, for columnWidth, rowHeight, gutter
	 * if option is String -> get element from selector string, & get size of element
	 * if option is Element -> get size of element
	 * else use option as a number
	 *
	 * @param {String} measurement
	 * @param {String} size - width or height
	 * @private
	 */
	proto._getMeasurement = function( measurement, size ) {
	  var option = this.options[ measurement ];
	  var elem;
	  if ( !option ) {
	    // default to 0
	    this[ measurement ] = 0;
	  } else {
	    // use option as an element
	    if ( typeof option == 'string' ) {
	      elem = this.element.querySelector( option );
	    } else if ( option instanceof HTMLElement ) {
	      elem = option;
	    }
	    // use size of element, if element
	    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
	  }
	};

	/**
	 * layout a collection of item elements
	 * @api public
	 */
	proto.layoutItems = function( items, isInstant ) {
	  items = this._getItemsForLayout( items );

	  this._layoutItems( items, isInstant );

	  this._postLayout();
	};

	/**
	 * get the items to be laid out
	 * you may want to skip over some items
	 * @param {Array} items
	 * @returns {Array} items
	 */
	proto._getItemsForLayout = function( items ) {
	  return items.filter( function( item ) {
	    return !item.isIgnored;
	  });
	};

	/**
	 * layout items
	 * @param {Array} items
	 * @param {Boolean} isInstant
	 */
	proto._layoutItems = function( items, isInstant ) {
	  this._emitCompleteOnItems( 'layout', items );

	  if ( !items || !items.length ) {
	    // no items, emit event with empty array
	    return;
	  }

	  var queue = [];

	  items.forEach( function( item ) {
	    // get x/y object from method
	    var position = this._getItemLayoutPosition( item );
	    // enqueue
	    position.item = item;
	    position.isInstant = isInstant || item.isLayoutInstant;
	    queue.push( position );
	  }, this );

	  this._processLayoutQueue( queue );
	};

	/**
	 * get item layout position
	 * @param {Outlayer.Item} item
	 * @returns {Object} x and y position
	 */
	proto._getItemLayoutPosition = function( /* item */ ) {
	  return {
	    x: 0,
	    y: 0
	  };
	};

	/**
	 * iterate over array and position each item
	 * Reason being - separating this logic prevents 'layout invalidation'
	 * thx @paul_irish
	 * @param {Array} queue
	 */
	proto._processLayoutQueue = function( queue ) {
	  this.updateStagger();
	  queue.forEach( function( obj, i ) {
	    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
	  }, this );
	};

	// set stagger from option in milliseconds number
	proto.updateStagger = function() {
	  var stagger = this.options.stagger;
	  if ( stagger === null || stagger === undefined ) {
	    this.stagger = 0;
	    return;
	  }
	  this.stagger = getMilliseconds( stagger );
	  return this.stagger;
	};

	/**
	 * Sets position of item in DOM
	 * @param {Outlayer.Item} item
	 * @param {Number} x - horizontal position
	 * @param {Number} y - vertical position
	 * @param {Boolean} isInstant - disables transitions
	 */
	proto._positionItem = function( item, x, y, isInstant, i ) {
	  if ( isInstant ) {
	    // if not transition, just set CSS
	    item.goTo( x, y );
	  } else {
	    item.stagger( i * this.stagger );
	    item.moveTo( x, y );
	  }
	};

	/**
	 * Any logic you want to do after each layout,
	 * i.e. size the container
	 */
	proto._postLayout = function() {
	  this.resizeContainer();
	};

	proto.resizeContainer = function() {
	  var isResizingContainer = this._getOption('resizeContainer');
	  if ( !isResizingContainer ) {
	    return;
	  }
	  var size = this._getContainerSize();
	  if ( size ) {
	    this._setContainerMeasure( size.width, true );
	    this._setContainerMeasure( size.height, false );
	  }
	};

	/**
	 * Sets width or height of container if returned
	 * @returns {Object} size
	 *   @param {Number} width
	 *   @param {Number} height
	 */
	proto._getContainerSize = noop;

	/**
	 * @param {Number} measure - size of width or height
	 * @param {Boolean} isWidth
	 */
	proto._setContainerMeasure = function( measure, isWidth ) {
	  if ( measure === undefined ) {
	    return;
	  }

	  var elemSize = this.size;
	  // add padding and border width if border box
	  if ( elemSize.isBorderBox ) {
	    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
	      elemSize.borderLeftWidth + elemSize.borderRightWidth :
	      elemSize.paddingBottom + elemSize.paddingTop +
	      elemSize.borderTopWidth + elemSize.borderBottomWidth;
	  }

	  measure = Math.max( measure, 0 );
	  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
	};

	/**
	 * emit eventComplete on a collection of items events
	 * @param {String} eventName
	 * @param {Array} items - Outlayer.Items
	 */
	proto._emitCompleteOnItems = function( eventName, items ) {
	  var _this = this;
	  function onComplete() {
	    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
	  }

	  var count = items.length;
	  if ( !items || !count ) {
	    onComplete();
	    return;
	  }

	  var doneCount = 0;
	  function tick() {
	    doneCount++;
	    if ( doneCount == count ) {
	      onComplete();
	    }
	  }

	  // bind callback
	  items.forEach( function( item ) {
	    item.once( eventName, tick );
	  });
	};

	/**
	 * emits events via EvEmitter and jQuery events
	 * @param {String} type - name of event
	 * @param {Event} event - original event
	 * @param {Array} args - extra arguments
	 */
	proto.dispatchEvent = function( type, event, args ) {
	  // add original event to arguments
	  var emitArgs = event ? [ event ].concat( args ) : args;
	  this.emitEvent( type, emitArgs );

	  if ( jQuery ) {
	    // set this.$element
	    this.$element = this.$element || jQuery( this.element );
	    if ( event ) {
	      // create jQuery event
	      var $event = jQuery.Event( event );
	      $event.type = type;
	      this.$element.trigger( $event, args );
	    } else {
	      // just trigger with type if no event available
	      this.$element.trigger( type, args );
	    }
	  }
	};

	// -------------------------- ignore & stamps -------------------------- //


	/**
	 * keep item in collection, but do not lay it out
	 * ignored items do not get skipped in layout
	 * @param {Element} elem
	 */
	proto.ignore = function( elem ) {
	  var item = this.getItem( elem );
	  if ( item ) {
	    item.isIgnored = true;
	  }
	};

	/**
	 * return item to layout collection
	 * @param {Element} elem
	 */
	proto.unignore = function( elem ) {
	  var item = this.getItem( elem );
	  if ( item ) {
	    delete item.isIgnored;
	  }
	};

	/**
	 * adds elements to stamps
	 * @param {NodeList, Array, Element, or String} elems
	 */
	proto.stamp = function( elems ) {
	  elems = this._find( elems );
	  if ( !elems ) {
	    return;
	  }

	  this.stamps = this.stamps.concat( elems );
	  // ignore
	  elems.forEach( this.ignore, this );
	};

	/**
	 * removes elements to stamps
	 * @param {NodeList, Array, or Element} elems
	 */
	proto.unstamp = function( elems ) {
	  elems = this._find( elems );
	  if ( !elems ){
	    return;
	  }

	  elems.forEach( function( elem ) {
	    // filter out removed stamp elements
	    utils.removeFrom( this.stamps, elem );
	    this.unignore( elem );
	  }, this );
	};

	/**
	 * finds child elements
	 * @param {NodeList, Array, Element, or String} elems
	 * @returns {Array} elems
	 */
	proto._find = function( elems ) {
	  if ( !elems ) {
	    return;
	  }
	  // if string, use argument as selector string
	  if ( typeof elems == 'string' ) {
	    elems = this.element.querySelectorAll( elems );
	  }
	  elems = utils.makeArray( elems );
	  return elems;
	};

	proto._manageStamps = function() {
	  if ( !this.stamps || !this.stamps.length ) {
	    return;
	  }

	  this._getBoundingRect();

	  this.stamps.forEach( this._manageStamp, this );
	};

	// update boundingLeft / Top
	proto._getBoundingRect = function() {
	  // get bounding rect for container element
	  var boundingRect = this.element.getBoundingClientRect();
	  var size = this.size;
	  this._boundingRect = {
	    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
	    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
	    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
	    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
	  };
	};

	/**
	 * @param {Element} stamp
	**/
	proto._manageStamp = noop;

	/**
	 * get x/y position of element relative to container element
	 * @param {Element} elem
	 * @returns {Object} offset - has left, top, right, bottom
	 */
	proto._getElementOffset = function( elem ) {
	  var boundingRect = elem.getBoundingClientRect();
	  var thisRect = this._boundingRect;
	  var size = getSize( elem );
	  var offset = {
	    left: boundingRect.left - thisRect.left - size.marginLeft,
	    top: boundingRect.top - thisRect.top - size.marginTop,
	    right: thisRect.right - boundingRect.right - size.marginRight,
	    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
	  };
	  return offset;
	};

	// -------------------------- resize -------------------------- //

	// enable event handlers for listeners
	// i.e. resize -> onresize
	proto.handleEvent = utils.handleEvent;

	/**
	 * Bind layout to window resizing
	 */
	proto.bindResize = function() {
	  window.addEventListener( 'resize', this );
	  this.isResizeBound = true;
	};

	/**
	 * Unbind layout to window resizing
	 */
	proto.unbindResize = function() {
	  window.removeEventListener( 'resize', this );
	  this.isResizeBound = false;
	};

	proto.onresize = function() {
	  this.resize();
	};

	utils.debounceMethod( Outlayer, 'onresize', 100 );

	proto.resize = function() {
	  // don't trigger if size did not change
	  // or if resize was unbound. See #9
	  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
	    return;
	  }

	  this.layout();
	};

	/**
	 * check if layout is needed post layout
	 * @returns Boolean
	 */
	proto.needsResizeLayout = function() {
	  var size = getSize( this.element );
	  // check that this.size and size are there
	  // IE8 triggers resize on body size change, so they might not be
	  var hasSizes = this.size && size;
	  return hasSizes && size.innerWidth !== this.size.innerWidth;
	};

	// -------------------------- methods -------------------------- //

	/**
	 * add items to Outlayer instance
	 * @param {Array or NodeList or Element} elems
	 * @returns {Array} items - Outlayer.Items
	**/
	proto.addItems = function( elems ) {
	  var items = this._itemize( elems );
	  // add items to collection
	  if ( items.length ) {
	    this.items = this.items.concat( items );
	  }
	  return items;
	};

	/**
	 * Layout newly-appended item elements
	 * @param {Array or NodeList or Element} elems
	 */
	proto.appended = function( elems ) {
	  var items = this.addItems( elems );
	  if ( !items.length ) {
	    return;
	  }
	  // layout and reveal just the new items
	  this.layoutItems( items, true );
	  this.reveal( items );
	};

	/**
	 * Layout prepended elements
	 * @param {Array or NodeList or Element} elems
	 */
	proto.prepended = function( elems ) {
	  var items = this._itemize( elems );
	  if ( !items.length ) {
	    return;
	  }
	  // add items to beginning of collection
	  var previousItems = this.items.slice(0);
	  this.items = items.concat( previousItems );
	  // start new layout
	  this._resetLayout();
	  this._manageStamps();
	  // layout new stuff without transition
	  this.layoutItems( items, true );
	  this.reveal( items );
	  // layout previous items
	  this.layoutItems( previousItems );
	};

	/**
	 * reveal a collection of items
	 * @param {Array of Outlayer.Items} items
	 */
	proto.reveal = function( items ) {
	  this._emitCompleteOnItems( 'reveal', items );
	  if ( !items || !items.length ) {
	    return;
	  }
	  var stagger = this.updateStagger();
	  items.forEach( function( item, i ) {
	    item.stagger( i * stagger );
	    item.reveal();
	  });
	};

	/**
	 * hide a collection of items
	 * @param {Array of Outlayer.Items} items
	 */
	proto.hide = function( items ) {
	  this._emitCompleteOnItems( 'hide', items );
	  if ( !items || !items.length ) {
	    return;
	  }
	  var stagger = this.updateStagger();
	  items.forEach( function( item, i ) {
	    item.stagger( i * stagger );
	    item.hide();
	  });
	};

	/**
	 * reveal item elements
	 * @param {Array}, {Element}, {NodeList} items
	 */
	proto.revealItemElements = function( elems ) {
	  var items = this.getItems( elems );
	  this.reveal( items );
	};

	/**
	 * hide item elements
	 * @param {Array}, {Element}, {NodeList} items
	 */
	proto.hideItemElements = function( elems ) {
	  var items = this.getItems( elems );
	  this.hide( items );
	};

	/**
	 * get Outlayer.Item, given an Element
	 * @param {Element} elem
	 * @param {Function} callback
	 * @returns {Outlayer.Item} item
	 */
	proto.getItem = function( elem ) {
	  // loop through items to get the one that matches
	  for ( var i=0; i < this.items.length; i++ ) {
	    var item = this.items[i];
	    if ( item.element == elem ) {
	      // return item
	      return item;
	    }
	  }
	};

	/**
	 * get collection of Outlayer.Items, given Elements
	 * @param {Array} elems
	 * @returns {Array} items - Outlayer.Items
	 */
	proto.getItems = function( elems ) {
	  elems = utils.makeArray( elems );
	  var items = [];
	  elems.forEach( function( elem ) {
	    var item = this.getItem( elem );
	    if ( item ) {
	      items.push( item );
	    }
	  }, this );

	  return items;
	};

	/**
	 * remove element(s) from instance and DOM
	 * @param {Array or NodeList or Element} elems
	 */
	proto.remove = function( elems ) {
	  var removeItems = this.getItems( elems );

	  this._emitCompleteOnItems( 'remove', removeItems );

	  // bail if no items to remove
	  if ( !removeItems || !removeItems.length ) {
	    return;
	  }

	  removeItems.forEach( function( item ) {
	    item.remove();
	    // remove item from collection
	    utils.removeFrom( this.items, item );
	  }, this );
	};

	// ----- destroy ----- //

	// remove and disable Outlayer instance
	proto.destroy = function() {
	  // clean up dynamic styles
	  var style = this.element.style;
	  style.height = '';
	  style.position = '';
	  style.width = '';
	  // destroy items
	  this.items.forEach( function( item ) {
	    item.destroy();
	  });

	  this.unbindResize();

	  var id = this.element.outlayerGUID;
	  delete instances[ id ]; // remove reference to instance by id
	  delete this.element.outlayerGUID;
	  // remove data for jQuery
	  if ( jQuery ) {
	    jQuery.removeData( this.element, this.constructor.namespace );
	  }

	};

	// -------------------------- data -------------------------- //

	/**
	 * get Outlayer instance from element
	 * @param {Element} elem
	 * @returns {Outlayer}
	 */
	Outlayer.data = function( elem ) {
	  elem = utils.getQueryElement( elem );
	  var id = elem && elem.outlayerGUID;
	  return id && instances[ id ];
	};


	// -------------------------- create Outlayer class -------------------------- //

	/**
	 * create a layout class
	 * @param {String} namespace
	 */
	Outlayer.create = function( namespace, options ) {
	  // sub-class Outlayer
	  var Layout = subclass( Outlayer );
	  // apply new options and compatOptions
	  Layout.defaults = utils.extend( {}, Outlayer.defaults );
	  utils.extend( Layout.defaults, options );
	  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

	  Layout.namespace = namespace;

	  Layout.data = Outlayer.data;

	  // sub-class Item
	  Layout.Item = subclass( Item );

	  // -------------------------- declarative -------------------------- //

	  utils.htmlInit( Layout, namespace );

	  // -------------------------- jQuery bridge -------------------------- //

	  // make into jQuery plugin
	  if ( jQuery && jQuery.bridget ) {
	    jQuery.bridget( namespace, Layout );
	  }

	  return Layout;
	};

	function subclass( Parent ) {
	  function SubClass() {
	    Parent.apply( this, arguments );
	  }

	  SubClass.prototype = Object.create( Parent.prototype );
	  SubClass.prototype.constructor = SubClass;

	  return SubClass;
	}

	// ----- helpers ----- //

	// how many milliseconds are in each unit
	var msUnits = {
	  ms: 1,
	  s: 1000
	};

	// munge time-like parameter into millisecond number
	// '0.4s' -> 40
	function getMilliseconds( time ) {
	  if ( typeof time == 'number' ) {
	    return time;
	  }
	  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
	  var num = matches && matches[1];
	  var unit = matches && matches[2];
	  if ( !num.length ) {
	    return 0;
	  }
	  num = parseFloat( num );
	  var mult = msUnits[ unit ] || 1;
	  return num * mult;
	}

	// ----- fin ----- //

	// back in global
	Outlayer.Item = Item;

	return Outlayer;

	}));
	}(outlayer));

	var getSize = {exports: {}};

	/*!
	 * getSize v2.0.3
	 * measure size of elements
	 * MIT license
	 */

	(function (module) {
	/* jshint browser: true, strict: true, undef: true, unused: true */
	/* globals console: false */

	( function( window, factory ) {
	  /* jshint strict: false */ /* globals define, module */
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.getSize = factory();
	  }

	})( window, function factory() {

	// -------------------------- helpers -------------------------- //

	// get a number from a string, not a percentage
	function getStyleSize( value ) {
	  var num = parseFloat( value );
	  // not a percent like '100%', and a number
	  var isValid = value.indexOf('%') == -1 && !isNaN( num );
	  return isValid && num;
	}

	function noop() {}

	var logError = typeof console == 'undefined' ? noop :
	  function( message ) {
	    console.error( message );
	  };

	// -------------------------- measurements -------------------------- //

	var measurements = [
	  'paddingLeft',
	  'paddingRight',
	  'paddingTop',
	  'paddingBottom',
	  'marginLeft',
	  'marginRight',
	  'marginTop',
	  'marginBottom',
	  'borderLeftWidth',
	  'borderRightWidth',
	  'borderTopWidth',
	  'borderBottomWidth'
	];

	var measurementsLength = measurements.length;

	function getZeroSize() {
	  var size = {
	    width: 0,
	    height: 0,
	    innerWidth: 0,
	    innerHeight: 0,
	    outerWidth: 0,
	    outerHeight: 0
	  };
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    size[ measurement ] = 0;
	  }
	  return size;
	}

	// -------------------------- getStyle -------------------------- //

	/**
	 * getStyle, get style of element, check for Firefox bug
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	 */
	function getStyle( elem ) {
	  var style = getComputedStyle( elem );
	  if ( !style ) {
	    logError( 'Style returned ' + style +
	      '. Are you running this code in a hidden iframe on Firefox? ' +
	      'See https://bit.ly/getsizebug1' );
	  }
	  return style;
	}

	// -------------------------- setup -------------------------- //

	var isSetup = false;

	var isBoxSizeOuter;

	/**
	 * setup
	 * check isBoxSizerOuter
	 * do on first getSize() rather than on page load for Firefox bug
	 */
	function setup() {
	  // setup once
	  if ( isSetup ) {
	    return;
	  }
	  isSetup = true;

	  // -------------------------- box sizing -------------------------- //

	  /**
	   * Chrome & Safari measure the outer-width on style.width on border-box elems
	   * IE11 & Firefox<29 measures the inner-width
	   */
	  var div = document.createElement('div');
	  div.style.width = '200px';
	  div.style.padding = '1px 2px 3px 4px';
	  div.style.borderStyle = 'solid';
	  div.style.borderWidth = '1px 2px 3px 4px';
	  div.style.boxSizing = 'border-box';

	  var body = document.body || document.documentElement;
	  body.appendChild( div );
	  var style = getStyle( div );
	  // round value for browser zoom. desandro/masonry#928
	  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
	  getSize.isBoxSizeOuter = isBoxSizeOuter;

	  body.removeChild( div );
	}

	// -------------------------- getSize -------------------------- //

	function getSize( elem ) {
	  setup();

	  // use querySeletor if elem is string
	  if ( typeof elem == 'string' ) {
	    elem = document.querySelector( elem );
	  }

	  // do not proceed on non-objects
	  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
	    return;
	  }

	  var style = getStyle( elem );

	  // if hidden, everything is 0
	  if ( style.display == 'none' ) {
	    return getZeroSize();
	  }

	  var size = {};
	  size.width = elem.offsetWidth;
	  size.height = elem.offsetHeight;

	  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

	  // get all measurements
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    var value = style[ measurement ];
	    var num = parseFloat( value );
	    // any 'auto', 'medium' value will be 0
	    size[ measurement ] = !isNaN( num ) ? num : 0;
	  }

	  var paddingWidth = size.paddingLeft + size.paddingRight;
	  var paddingHeight = size.paddingTop + size.paddingBottom;
	  var marginWidth = size.marginLeft + size.marginRight;
	  var marginHeight = size.marginTop + size.marginBottom;
	  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

	  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

	  // overwrite width and height if we can get it from style
	  var styleWidth = getStyleSize( style.width );
	  if ( styleWidth !== false ) {
	    size.width = styleWidth +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
	  }

	  var styleHeight = getStyleSize( style.height );
	  if ( styleHeight !== false ) {
	    size.height = styleHeight +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
	  }

	  size.innerWidth = size.width - ( paddingWidth + borderWidth );
	  size.innerHeight = size.height - ( paddingHeight + borderHeight );

	  size.outerWidth = size.width + marginWidth;
	  size.outerHeight = size.height + marginHeight;

	  return size;
	}

	return getSize;

	});
	}(getSize));

	/*!
	 * Masonry v4.2.2
	 * Cascading grid layout library
	 * https://masonry.desandro.com
	 * MIT License
	 * by David DeSandro
	 */

	(function (module) {
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /*globals define, module, require */
	  if ( module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      outlayer.exports,
	      getSize.exports
	    );
	  } else {
	    // browser global
	    window.Masonry = factory(
	      window.Outlayer,
	      window.getSize
	    );
	  }

	}( window, function factory( Outlayer, getSize ) {

	// -------------------------- masonryDefinition -------------------------- //

	  // create an Outlayer layout class
	  var Masonry = Outlayer.create('masonry');
	  // isFitWidth -> fitWidth
	  Masonry.compatOptions.fitWidth = 'isFitWidth';

	  var proto = Masonry.prototype;

	  proto._resetLayout = function() {
	    this.getSize();
	    this._getMeasurement( 'columnWidth', 'outerWidth' );
	    this._getMeasurement( 'gutter', 'outerWidth' );
	    this.measureColumns();

	    // reset column Y
	    this.colYs = [];
	    for ( var i=0; i < this.cols; i++ ) {
	      this.colYs.push( 0 );
	    }

	    this.maxY = 0;
	    this.horizontalColIndex = 0;
	  };

	  proto.measureColumns = function() {
	    this.getContainerWidth();
	    // if columnWidth is 0, default to outerWidth of first item
	    if ( !this.columnWidth ) {
	      var firstItem = this.items[0];
	      var firstItemElem = firstItem && firstItem.element;
	      // columnWidth fall back to item of first element
	      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
	        // if first elem has no width, default to size of container
	        this.containerWidth;
	    }

	    var columnWidth = this.columnWidth += this.gutter;

	    // calculate columns
	    var containerWidth = this.containerWidth + this.gutter;
	    var cols = containerWidth / columnWidth;
	    // fix rounding errors, typically with gutters
	    var excess = columnWidth - containerWidth % columnWidth;
	    // if overshoot is less than a pixel, round up, otherwise floor it
	    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
	    cols = Math[ mathMethod ]( cols );
	    this.cols = Math.max( cols, 1 );
	  };

	  proto.getContainerWidth = function() {
	    // container is parent if fit width
	    var isFitWidth = this._getOption('fitWidth');
	    var container = isFitWidth ? this.element.parentNode : this.element;
	    // check that this.size and size are there
	    // IE8 triggers resize on body size change, so they might not be
	    var size = getSize( container );
	    this.containerWidth = size && size.innerWidth;
	  };

	  proto._getItemLayoutPosition = function( item ) {
	    item.getSize();
	    // how many columns does this brick span
	    var remainder = item.size.outerWidth % this.columnWidth;
	    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
	    // round if off by 1 pixel, otherwise use ceil
	    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
	    colSpan = Math.min( colSpan, this.cols );
	    // use horizontal or top column position
	    var colPosMethod = this.options.horizontalOrder ?
	      '_getHorizontalColPosition' : '_getTopColPosition';
	    var colPosition = this[ colPosMethod ]( colSpan, item );
	    // position the brick
	    var position = {
	      x: this.columnWidth * colPosition.col,
	      y: colPosition.y
	    };
	    // apply setHeight to necessary columns
	    var setHeight = colPosition.y + item.size.outerHeight;
	    var setMax = colSpan + colPosition.col;
	    for ( var i = colPosition.col; i < setMax; i++ ) {
	      this.colYs[i] = setHeight;
	    }

	    return position;
	  };

	  proto._getTopColPosition = function( colSpan ) {
	    var colGroup = this._getTopColGroup( colSpan );
	    // get the minimum Y value from the columns
	    var minimumY = Math.min.apply( Math, colGroup );

	    return {
	      col: colGroup.indexOf( minimumY ),
	      y: minimumY,
	    };
	  };

	  /**
	   * @param {Number} colSpan - number of columns the element spans
	   * @returns {Array} colGroup
	   */
	  proto._getTopColGroup = function( colSpan ) {
	    if ( colSpan < 2 ) {
	      // if brick spans only one column, use all the column Ys
	      return this.colYs;
	    }

	    var colGroup = [];
	    // how many different places could this brick fit horizontally
	    var groupCount = this.cols + 1 - colSpan;
	    // for each group potential horizontal position
	    for ( var i = 0; i < groupCount; i++ ) {
	      colGroup[i] = this._getColGroupY( i, colSpan );
	    }
	    return colGroup;
	  };

	  proto._getColGroupY = function( col, colSpan ) {
	    if ( colSpan < 2 ) {
	      return this.colYs[ col ];
	    }
	    // make an array of colY values for that one group
	    var groupColYs = this.colYs.slice( col, col + colSpan );
	    // and get the max value of the array
	    return Math.max.apply( Math, groupColYs );
	  };

	  // get column position based on horizontal index. #873
	  proto._getHorizontalColPosition = function( colSpan, item ) {
	    var col = this.horizontalColIndex % this.cols;
	    var isOver = colSpan > 1 && col + colSpan > this.cols;
	    // shift to next row if item can't fit on current row
	    col = isOver ? 0 : col;
	    // don't let zero-size items take up space
	    var hasSize = item.size.outerWidth && item.size.outerHeight;
	    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;

	    return {
	      col: col,
	      y: this._getColGroupY( col, colSpan ),
	    };
	  };

	  proto._manageStamp = function( stamp ) {
	    var stampSize = getSize( stamp );
	    var offset = this._getElementOffset( stamp );
	    // get the columns that this stamp affects
	    var isOriginLeft = this._getOption('originLeft');
	    var firstX = isOriginLeft ? offset.left : offset.right;
	    var lastX = firstX + stampSize.outerWidth;
	    var firstCol = Math.floor( firstX / this.columnWidth );
	    firstCol = Math.max( 0, firstCol );
	    var lastCol = Math.floor( lastX / this.columnWidth );
	    // lastCol should not go over if multiple of columnWidth #425
	    lastCol -= lastX % this.columnWidth ? 0 : 1;
	    lastCol = Math.min( this.cols - 1, lastCol );
	    // set colYs to bottom of the stamp

	    var isOriginTop = this._getOption('originTop');
	    var stampMaxY = ( isOriginTop ? offset.top : offset.bottom ) +
	      stampSize.outerHeight;
	    for ( var i = firstCol; i <= lastCol; i++ ) {
	      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
	    }
	  };

	  proto._getContainerSize = function() {
	    this.maxY = Math.max.apply( Math, this.colYs );
	    var size = {
	      height: this.maxY
	    };

	    if ( this._getOption('fitWidth') ) {
	      size.width = this._getContainerFitWidth();
	    }

	    return size;
	  };

	  proto._getContainerFitWidth = function() {
	    var unusedCols = 0;
	    // count unused columns
	    var i = this.cols;
	    while ( --i ) {
	      if ( this.colYs[i] !== 0 ) {
	        break;
	      }
	      unusedCols++;
	    }
	    // fit container to columns that have been used
	    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
	  };

	  proto.needsResizeLayout = function() {
	    var previousWidth = this.containerWidth;
	    this.getContainerWidth();
	    return previousWidth != this.containerWidth;
	  };

	  return Masonry;

	}));
	}(masonry));

	var mixitup$1 = {exports: {}};

	/**!
	 * MixItUp v3.3.1
	 * A high-performance, dependency-free library for animated filtering, sorting and more
	 * Build 94e0fbf6-cd0b-4987-b3c0-14b59b67b8a0
	 *
	 * @copyright Copyright 2014-2018 KunkaLabs Limited.
	 * @author    KunkaLabs Limited.
	 * @link      https://www.kunkalabs.com/mixitup/
	 *
	 * @license   Commercial use requires a commercial license.
	 *            https://www.kunkalabs.com/mixitup/licenses/
	 *
	 *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
	 *            http://creativecommons.org/licenses/by-nc/3.0/
	 */

	(function (module, exports) {
	(function(window) {

	    var mixitup = null,
	        h       = null;

	    (function() {
	        var VENDORS = ['webkit', 'moz', 'o', 'ms'],
	            canary  = window.document.createElement('div'),
	            i       = -1;

	        // window.requestAnimationFrame

	        for (i = 0; i < VENDORS.length && !window.requestAnimationFrame; i++) {
	            window.requestAnimationFrame = window[VENDORS[i] + 'RequestAnimationFrame'];
	        }

	        // Element.nextElementSibling

	        if (typeof canary.nextElementSibling === 'undefined') {
	            Object.defineProperty(window.Element.prototype, 'nextElementSibling', {
	                get: function() {
	                    var el = this.nextSibling;

	                    while (el) {
	                        if (el.nodeType === 1) {
	                            return el;
	                        }

	                        el = el.nextSibling;
	                    }

	                    return null;
	                }
	            });
	        }

	        // Element.matches

	        (function(ElementPrototype) {
	            ElementPrototype.matches =
	                ElementPrototype.matches ||
	                ElementPrototype.machesSelector ||
	                ElementPrototype.mozMatchesSelector ||
	                ElementPrototype.msMatchesSelector ||
	                ElementPrototype.oMatchesSelector ||
	                ElementPrototype.webkitMatchesSelector ||
	                function (selector) {
	                    return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(selector), this) > -1;
	                };
	        })(window.Element.prototype);

	        // Object.keys
	        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

	        if (!Object.keys) {
	            Object.keys = (function() {
	                var hasOwnProperty      = Object.prototype.hasOwnProperty,
	                    hasDontEnumBug      = false,
	                    dontEnums           = [],
	                    dontEnumsLength     = -1;

	                hasDontEnumBug = !({
	                    toString: null
	                })
	                    .propertyIsEnumerable('toString');

	                dontEnums = [
	                    'toString',
	                    'toLocaleString',
	                    'valueOf',
	                    'hasOwnProperty',
	                    'isPrototypeOf',
	                    'propertyIsEnumerable',
	                    'constructor'
	                ];

	                dontEnumsLength = dontEnums.length;

	                return function(obj) {
	                    var result  = [],
	                        prop    = '',
	                        i       = -1;

	                    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
	                        throw new TypeError('Object.keys called on non-object');
	                    }

	                    for (prop in obj) {
	                        if (hasOwnProperty.call(obj, prop)) {
	                            result.push(prop);
	                        }
	                    }

	                    if (hasDontEnumBug) {
	                        for (i = 0; i < dontEnumsLength; i++) {
	                            if (hasOwnProperty.call(obj, dontEnums[i])) {
	                                result.push(dontEnums[i]);
	                            }
	                        }
	                    }

	                    return result;
	                };
	            }());
	        }

	        // Array.isArray
	        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

	        if (!Array.isArray) {
	            Array.isArray = function(arg) {
	                return Object.prototype.toString.call(arg) === '[object Array]';
	            };
	        }

	        // Object.create
	        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create

	        if (typeof Object.create !== 'function') {
	            Object.create = (function(undefined$1) {
	                var Temp = function() {};

	                return function (prototype, propertiesObject) {
	                    if (prototype !== Object(prototype) && prototype !== null) {
	                        throw TypeError('Argument must be an object, or null');
	                    }

	                    Temp.prototype = prototype || {};

	                    var result = new Temp();

	                    Temp.prototype = null;

	                    if (propertiesObject !== undefined$1) {
	                        Object.defineProperties(result, propertiesObject);
	                    }

	                    if (prototype === null) {
	                        /* jshint ignore:start */
	                        result.__proto__ = null;
	                        /* jshint ignore:end */
	                    }

	                    return result;
	                };
	            })();
	        }

	        // String.prototyoe.trim

	        if (!String.prototype.trim) {
	            String.prototype.trim = function() {
	                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	            };
	        }

	        // Array.prototype.indexOf
	        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

	        if (!Array.prototype.indexOf) {
	            Array.prototype.indexOf = function(searchElement) {
	                var n, k, t, len;

	                if (this === null) {
	                    throw new TypeError();
	                }

	                t = Object(this);

	                len = t.length >>> 0;

	                if (len === 0) {
	                    return -1;
	                }

	                n = 0;

	                if (arguments.length > 1) {
	                    n = Number(arguments[1]);

	                    if (n !== n) {
	                        n = 0;
	                    } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
	                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
	                    }
	                }

	                if (n >= len) {
	                    return -1;
	                }

	                for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
	                    if (k in t && t[k] === searchElement) {
	                        return k;
	                    }
	                }

	                return -1;
	            };
	        }

	        // Function.prototype.bind
	        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

	        if (!Function.prototype.bind) {
	            Function.prototype.bind = function(oThis) {
	                var aArgs, self, FNOP, fBound;

	                if (typeof this !== 'function') {
	                    throw new TypeError();
	                }

	                aArgs = Array.prototype.slice.call(arguments, 1);

	                self = this;

	                FNOP = function() {};

	                fBound = function() {
	                    return self.apply(this instanceof FNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
	                };

	                if (this.prototype) {
	                    FNOP.prototype = this.prototype;
	                }

	                fBound.prototype = new FNOP();

	                return fBound;
	            };
	        }

	        // Element.prototype.dispatchEvent

	        if (!window.Element.prototype.dispatchEvent) {
	            window.Element.prototype.dispatchEvent = function(event) {
	                try {
	                    return this.fireEvent('on' + event.type, event);
	                } catch (err) {}
	            };
	        }
	    })();

	    /**
	     * The `mixitup()` "factory" function creates and returns individual instances
	     * of MixItUp, known as "mixers", on which API methods can be called.
	     *
	     * When loading MixItUp via a script tag, the factory function is accessed
	     * via the global variable `mixitup`. When using a module loading
	     * system (e.g. ES2015, CommonJS, RequireJS), the factory function is
	     * exported into your module when you require the MixItUp library.
	     *
	     * @example
	     * mixitup(container [,config] [,foreignDoc])
	     *
	     * @example <caption>Example 1: Creating a mixer instance with an element reference</caption>
	     * var containerEl = document.querySelector('.container');
	     *
	     * var mixer = mixitup(containerEl);
	     *
	     * @example <caption>Example 2: Creating a mixer instance with a selector string</caption>
	     * var mixer = mixitup('.container');
	     *
	     * @example <caption>Example 3: Passing a configuration object</caption>
	     * var mixer = mixitup(containerEl, {
	     *     animation: {
	     *         effects: 'fade scale(0.5)'
	     *     }
	     * });
	     *
	     * @example <caption>Example 4: Passing an iframe reference</caption>
	     * var mixer = mixitup(containerEl, config, foreignDocument);
	     *
	     * @global
	     * @namespace
	     * @public
	     * @kind        function
	     * @since       3.0.0
	     * @param       {(Element|string)}  container
	     *      A DOM element or selector string representing the container(s) on which to instantiate MixItUp.
	     * @param       {object}            [config]
	     *      An optional "configuration object" used to customize the behavior of the MixItUp instance.
	     * @param       {object}            [foreignDoc]
	     *      An optional reference to a `document`, which can be used to control a MixItUp instance in an iframe.
	     * @return      {mixitup.Mixer}
	     *      A "mixer" object holding the MixItUp instance.
	     */

	    mixitup = function(container, config, foreignDoc) {
	        var el                  = null,
	            returnCollection    = false,
	            instance            = null,
	            facade              = null,
	            doc                 = null,
	            output              = null,
	            instances           = [],
	            id                  = '',
	            elements            = [],
	            i                   = -1;

	        doc = foreignDoc || window.document;

	        if (returnCollection = arguments[3]) {
	            // A non-documented 4th paramater enabling control of multiple instances

	            returnCollection = typeof returnCollection === 'boolean';
	        }

	        if (typeof container === 'string') {
	            elements = doc.querySelectorAll(container);
	        } else if (container && typeof container === 'object' && h.isElement(container, doc)) {
	            elements = [container];
	        } else if (container && typeof container === 'object' && container.length) {
	            // Although not documented, the container may also be an array-like list of
	            // elements such as a NodeList or jQuery collection, is returnCollection is true

	            elements = container;
	        } else {
	            throw new Error(mixitup.messages.errorFactoryInvalidContainer());
	        }

	        if (elements.length < 1) {
	            throw new Error(mixitup.messages.errorFactoryContainerNotFound());
	        }

	        for (i = 0; el = elements[i]; i++) {
	            if (i > 0 && !returnCollection) break;

	            if (!el.id) {
	                id = 'MixItUp' + h.randomHex();

	                el.id = id;
	            } else {
	                id = el.id;
	            }

	            if (mixitup.instances[id] instanceof mixitup.Mixer) {
	                instance = mixitup.instances[id];

	                if (!config || (config && config.debug && config.debug.showWarnings !== false)) {
	                    console.warn(mixitup.messages.warningFactoryPreexistingInstance());
	                }
	            } else {
	                instance = new mixitup.Mixer();

	                instance.attach(el, doc, id, config);

	                mixitup.instances[id] = instance;
	            }

	            facade = new mixitup.Facade(instance);

	            if (config && config.debug && config.debug.enable) {
	                instances.push(instance);
	            } else {
	                instances.push(facade);
	            }
	        }

	        if (returnCollection) {
	            output = new mixitup.Collection(instances);
	        } else {
	            // Return the first instance regardless

	            output = instances[0];
	        }

	        return output;
	    };

	    /**
	     * The `.use()` static method is used to extend the functionality of mixitup with compatible
	     * extensions and libraries in an environment with modular scoping e.g. ES2015, CommonJS, or RequireJS.
	     *
	     * You need only call the `.use()` function once per project, per extension, as module loaders
	     * will cache a single reference to MixItUp inclusive of all changes made.
	     *
	     * @example
	     * mixitup.use(extension)
	     *
	     * @example <caption>Example 1: Extending MixItUp with the Pagination Extension</caption>
	     *
	     * import mixitup from 'mixitup';
	     * import mixitupPagination from 'mixitup-pagination';
	     *
	     * mixitup.use(mixitupPagination);
	     *
	     * // All mixers created by the factory function in all modules will now
	     * // have pagination functionality
	     *
	     * var mixer = mixitup('.container');
	     *
	     * @public
	     * @name     use
	     * @memberof mixitup
	     * @kind     function
	     * @static
	     * @since    3.0.0
	     * @param    {*}  extension   A reference to the extension or library to be used.
	     * @return   {void}
	     */

	    mixitup.use = function(extension) {
	        mixitup.Base.prototype.callActions.call(mixitup, 'beforeUse', arguments);

	        // Call the extension's factory function, passing
	        // the mixitup factory as a paramater

	        if (typeof extension === 'function' && extension.TYPE === 'mixitup-extension') {
	            // Mixitup extension

	            if (typeof mixitup.extensions[extension.NAME] === 'undefined') {
	                extension(mixitup);

	                mixitup.extensions[extension.NAME] = extension;
	            }
	        } else if (extension.fn && extension.fn.jquery) {
	            // jQuery

	            mixitup.libraries.$ = extension;
	        }

	        mixitup.Base.prototype.callActions.call(mixitup, 'afterUse', arguments);
	    };

	    mixitup.instances   = {};
	    mixitup.extensions  = {};
	    mixitup.libraries   = {};

	    /**
	     * @private
	     */

	    h = {

	        /**
	         * @private
	         * @param   {HTMLElement}   el
	         * @param   {string}        cls
	         * @return  {boolean}
	         */

	        hasClass: function(el, cls) {
	            return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}   el
	         * @param   {string}        cls
	         * @return  {void}
	         */

	        addClass: function(el, cls) {
	            if (!this.hasClass(el, cls)) el.className += el.className ? ' ' + cls : cls;
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}   el
	         * @param   {string}        cls
	         * @return  {void}
	         */

	        removeClass: function(el, cls) {
	            if (this.hasClass(el, cls)) {
	                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');

	                el.className = el.className.replace(reg, ' ').trim();
	            }
	        },

	        /**
	         * Merges the properties of the source object onto the
	         * target object. Alters the target object.
	         *
	         * @private
	         * @param   {object}    destination
	         * @param   {object}    source
	         * @param   {boolean}   [deep=false]
	         * @param   {boolean}   [handleErrors=false]
	         * @return  {void}
	         */

	        extend: function(destination, source, deep, handleErrors) {
	            var sourceKeys  = [],
	                key         = '',
	                i           = -1;

	            deep = deep || false;
	            handleErrors = handleErrors || false;

	            try {
	                if (Array.isArray(source)) {
	                    for (i = 0; i < source.length; i++) {
	                        sourceKeys.push(i);
	                    }
	                } else if (source) {
	                    sourceKeys = Object.keys(source);
	                }

	                for (i = 0; i < sourceKeys.length; i++) {
	                    key = sourceKeys[i];

	                    if (!deep || typeof source[key] !== 'object' || this.isElement(source[key])) {
	                        // All non-object properties, or all properties if shallow extend

	                        destination[key] = source[key];
	                    } else if (Array.isArray(source[key])) {
	                        // Arrays

	                        if (!destination[key]) {
	                            destination[key] = [];
	                        }

	                        this.extend(destination[key], source[key], deep, handleErrors);
	                    } else {
	                        // Objects

	                        if (!destination[key]) {
	                            destination[key] = {};
	                        }

	                        this.extend(destination[key], source[key], deep, handleErrors);
	                    }
	                }
	            } catch(err) {
	                if (handleErrors) {
	                    this.handleExtendError(err, destination);
	                } else {
	                    throw err;
	                }
	            }

	            return destination;
	        },

	        /**
	         * @private
	         * @param   {Error}  err
	         * @param   {object} destination
	         * @return  {void}
	         */

	        handleExtendError: function(err, destination) {
	            var re                  = /property "?(\w*)"?[,:] object/i,
	                matches             = null,
	                erroneous           = '',
	                message             = '',
	                suggestion          = '',
	                probableMatch       = '',
	                key                 = '',
	                mostMatchingChars   = -1,
	                i                   = -1;

	            if (err instanceof TypeError && (matches = re.exec(err.message))) {
	                erroneous = matches[1];

	                for (key in destination) {
	                    i = 0;

	                    while (i < erroneous.length && erroneous.charAt(i) === key.charAt(i)) {
	                        i++;
	                    }

	                    if (i > mostMatchingChars) {
	                        mostMatchingChars = i;
	                        probableMatch = key;
	                    }
	                }

	                if (mostMatchingChars > 1) {
	                    suggestion = mixitup.messages.errorConfigInvalidPropertySuggestion({
	                        probableMatch: probableMatch
	                    });
	                }

	                message = mixitup.messages.errorConfigInvalidProperty({
	                    erroneous: erroneous,
	                    suggestion: suggestion
	                });

	                throw new TypeError(message);
	            }

	            throw err;
	        },

	        /**
	         * @private
	         * @param   {string} str
	         * @return  {function}
	         */

	        template: function(str) {
	            var re          = /\${([\w]*)}/g,
	                dynamics    = {},
	                matches     = null;

	            while ((matches = re.exec(str))) {
	                dynamics[matches[1]] = new RegExp('\\${' + matches[1] + '}', 'g');
	            }

	            return function(data) {
	                var key     = '',
	                    output  = str;

	                data = data || {};

	                for (key in dynamics) {
	                    output = output.replace(dynamics[key], typeof data[key] !== 'undefined' ? data[key] : '');
	                }

	                return output;
	            };
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}   el
	         * @param   {string}        type
	         * @param   {function}      fn
	         * @param   {boolean}       useCapture
	         * @return  {void}
	         */

	        on: function(el, type, fn, useCapture) {
	            if (!el) return;

	            if (el.addEventListener) {
	                el.addEventListener(type, fn, useCapture);
	            } else if (el.attachEvent) {
	                el['e' + type + fn] = fn;

	                el[type + fn] = function() {
	                    el['e' + type + fn](window.event);
	                };

	                el.attachEvent('on' + type, el[type + fn]);
	            }
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}   el
	         * @param   {string}        type
	         * @param   {function}      fn
	         * @return  {void}
	         */

	        off: function(el, type, fn) {
	            if (!el) return;

	            if (el.removeEventListener) {
	                el.removeEventListener(type, fn, false);
	            } else if (el.detachEvent) {
	                el.detachEvent('on' + type, el[type + fn]);
	                el[type + fn] = null;
	            }
	        },

	        /**
	         * @private
	         * @param   {string}      eventType
	         * @param   {object}      detail
	         * @param   {Document}    [doc]
	         * @return  {CustomEvent}
	         */

	        getCustomEvent: function(eventType, detail, doc) {
	            var event = null;

	            doc = doc || window.document;

	            if (typeof window.CustomEvent === 'function') {
	                event = new window.CustomEvent(eventType, {
	                    detail: detail,
	                    bubbles: true,
	                    cancelable: true
	                });
	            } else if (typeof doc.createEvent === 'function') {
	                event = doc.createEvent('CustomEvent');
	                event.initCustomEvent(eventType, true, true, detail);
	            } else {
	                event = doc.createEventObject(),
	                event.type = eventType;

	                event.returnValue = false;
	                event.cancelBubble = false;
	                event.detail = detail;
	            }

	            return event;
	        },

	        /**
	         * @private
	         * @param   {Event} e
	         * @return  {Event}
	         */

	        getOriginalEvent: function(e) {
	            if (e.touches && e.touches.length) {
	                return e.touches[0];
	            } else if (e.changedTouches && e.changedTouches.length) {
	                return e.changedTouches[0];
	            } else {
	                return e;
	            }
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}   el
	         * @param   {string}        selector
	         * @return  {Number}
	         */

	        index: function(el, selector) {
	            var i = 0;

	            while ((el = el.previousElementSibling) !== null) {
	                if (!selector || el.matches(selector)) {
	                    ++i;
	                }
	            }

	            return i;
	        },

	        /**
	         * Converts a dash or snake-case string to camel case.
	         *
	         * @private
	         * @param   {string}    str
	         * @param   {boolean}   [isPascal]
	         * @return  {string}
	         */

	        camelCase: function(str) {
	            return str.toLowerCase().replace(/([_-][a-z])/g, function($1) {
	                return $1.toUpperCase().replace(/[_-]/, '');
	            });
	        },

	        /**
	         * Converts a dash or snake-case string to pascal case.
	         *
	         * @private
	         * @param   {string}    str
	         * @param   {boolean}   [isPascal]
	         * @return  {string}
	         */

	        pascalCase: function(str) {
	            return (str = this.camelCase(str)).charAt(0).toUpperCase() + str.slice(1);
	        },

	        /**
	         * Converts a camel or pascal-case string to dash case.
	         *
	         * @private
	         * @param   {string}    str
	         * @return  {string}
	         */

	        dashCase: function(str) {
	            return str.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}       el
	         * @param   {HTMLHtmlElement}   [doc]
	         * @return  {boolean}
	         */

	        isElement: function(el, doc) {
	            doc = doc || window.document;

	            if (
	                window.HTMLElement &&
	                el instanceof window.HTMLElement
	            ) {
	                return true;
	            } else if (
	                doc.defaultView &&
	                doc.defaultView.HTMLElement &&
	                el instanceof doc.defaultView.HTMLElement
	            ) {
	                return true;
	            } else {
	                return (
	                    el !== null &&
	                    el.nodeType === 1 &&
	                    typeof el.nodeName === 'string'
	                );
	            }
	        },

	        /**
	         * @private
	         * @param   {string}            htmlString
	         * @param   {HTMLHtmlElement}   [doc]
	         * @return  {DocumentFragment}
	         */

	        createElement: function(htmlString, doc) {
	            var frag = null,
	                temp = null;

	            doc = doc || window.document;

	            frag = doc.createDocumentFragment();
	            temp = doc.createElement('div');

	            temp.innerHTML = htmlString.trim();

	            while (temp.firstChild) {
	                frag.appendChild(temp.firstChild);
	            }

	            return frag;
	        },

	        /**
	         * @private
	         * @param   {Node} node
	         * @return  {void}
	         */

	        removeWhitespace: function(node) {
	            var deleting;

	            while (node && node.nodeName === '#text') {
	                deleting = node;

	                node = node.previousSibling;

	                deleting.parentElement && deleting.parentElement.removeChild(deleting);
	            }
	        },

	        /**
	         * @private
	         * @param   {Array<*>}  a
	         * @param   {Array<*>}  b
	         * @return  {boolean}
	         */

	        isEqualArray: function(a, b) {
	            var i = a.length;

	            if (i !== b.length) return false;

	            while (i--) {
	                if (a[i] !== b[i]) return false;
	            }

	            return true;
	        },

	        /**
	         * @private
	         * @param   {object}  a
	         * @param   {object}  b
	         * @return  {boolean}
	         */

	        deepEquals: function(a, b) {
	            var key;

	            if (typeof a === 'object' && a && typeof b === 'object' && b) {
	                if (Object.keys(a).length !== Object.keys(b).length) return false;

	                for (key in a) {
	                    if (!b.hasOwnProperty(key) || !this.deepEquals(a[key], b[key])) return false;
	                }
	            } else if (a !== b) {
	                return false;
	            }

	            return true;
	        },

	        /**
	         * @private
	         * @param   {Array<*>}  oldArray
	         * @return  {Array<*>}
	         */

	        arrayShuffle: function(oldArray) {
	            var newArray    = oldArray.slice(),
	                len         = newArray.length,
	                i           = len,
	                p           = -1,
	                t           = [];

	            while (i--) {
	                p = ~~(Math.random() * len);
	                t = newArray[i];

	                newArray[i] = newArray[p];
	                newArray[p] = t;
	            }

	            return newArray;
	        },

	        /**
	         * @private
	         * @param   {object}    list
	         */

	        arrayFromList: function(list) {
	            var output, i;

	            try {
	                return Array.prototype.slice.call(list);
	            } catch(err) {
	                output = [];

	                for (i = 0; i < list.length; i++) {
	                    output.push(list[i]);
	                }

	                return output;
	            }
	        },

	        /**
	         * @private
	         * @param   {function}  func
	         * @param   {Number}    wait
	         * @param   {boolean}   immediate
	         * @return  {function}
	         */

	        debounce: function(func, wait, immediate) {
	            var timeout;

	            return function() {
	                var self     = this,
	                    args     = arguments,
	                    callNow  = immediate && !timeout,
	                    later    = null;

	                later = function() {
	                    timeout  = null;

	                    if (!immediate) {
	                        func.apply(self, args);
	                    }
	                };

	                clearTimeout(timeout);

	                timeout = setTimeout(later, wait);

	                if (callNow) func.apply(self, args);
	            };
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}   element
	         * @return  {object}
	         */

	        position: function(element) {
	            var xPosition       = 0,
	                yPosition       = 0,
	                offsetParent    = element;

	            while (element) {
	                xPosition -= element.scrollLeft;
	                yPosition -= element.scrollTop;

	                if (element === offsetParent) {
	                    xPosition += element.offsetLeft;
	                    yPosition += element.offsetTop;

	                    offsetParent = element.offsetParent;
	                }

	                element = element.parentElement;
	            }

	            return {
	                x: xPosition,
	                y: yPosition
	            };
	        },

	        /**
	         * @private
	         * @param   {object}    node1
	         * @param   {object}    node2
	         * @return  {Number}
	         */

	        getHypotenuse: function(node1, node2) {
	            var distanceX = node1.x - node2.x,
	                distanceY = node1.y - node2.y;

	            distanceX = distanceX < 0 ? distanceX * -1 : distanceX,
	            distanceY = distanceY < 0 ? distanceY * -1 : distanceY;

	            return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
	        },

	        /**
	         * Calcuates the area of intersection between two rectangles and expresses it as
	         * a ratio in comparison to the area of the first rectangle.
	         *
	         * @private
	         * @param   {Rect}  box1
	         * @param   {Rect}  box2
	         * @return  {number}
	         */

	        getIntersectionRatio: function(box1, box2) {
	            var controlArea         = box1.width * box1.height,
	                intersectionX       = -1,
	                intersectionY       = -1,
	                intersectionArea    = -1,
	                ratio               = -1;

	            intersectionX =
	                Math.max(0, Math.min(box1.left + box1.width, box2.left + box2.width) - Math.max(box1.left, box2.left));

	            intersectionY =
	                Math.max(0, Math.min(box1.top + box1.height, box2.top + box2.height) - Math.max(box1.top, box2.top));

	            intersectionArea = intersectionY * intersectionX;

	            ratio = intersectionArea / controlArea;

	            return ratio;
	        },

	        /**
	         * @private
	         * @param   {object}            el
	         * @param   {string}            selector
	         * @param   {boolean}           [includeSelf]
	         * @param   {HTMLHtmlElement}   [doc]
	         * @return  {Element|null}
	         */

	        closestParent: function(el, selector, includeSelf, doc) {
	            var parent  = el.parentNode;

	            doc = doc || window.document;

	            if (includeSelf && el.matches(selector)) {
	                return el;
	            }

	            while (parent && parent != doc.body) {
	                if (parent.matches && parent.matches(selector)) {
	                    return parent;
	                } else if (parent.parentNode) {
	                    parent = parent.parentNode;
	                } else {
	                    return null;
	                }
	            }

	            return null;
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}       el
	         * @param   {string}            selector
	         * @param   {HTMLHtmlElement}   [doc]
	         * @return  {NodeList}
	         */

	        children: function(el, selector, doc) {
	            var children    = [],
	                tempId      = '';

	            doc = doc || window.doc;

	            if (el) {
	                if (!el.id) {
	                    tempId = 'Temp' + this.randomHexKey();

	                    el.id = tempId;
	                }

	                children = doc.querySelectorAll('#' + el.id + ' > ' + selector);

	                if (tempId) {
	                    el.removeAttribute('id');
	                }
	            }

	            return children;
	        },

	        /**
	         * Creates a clone of a provided array, with any empty strings removed.
	         *
	         * @private
	         * @param   {Array<*>} originalArray
	         * @return  {Array<*>}
	         */

	        clean: function(originalArray) {
	            var cleanArray = [],
	                i = -1;

	            for (i = 0; i < originalArray.length; i++) {
	                if (originalArray[i] !== '') {
	                    cleanArray.push(originalArray[i]);
	                }
	            }

	            return cleanArray;
	        },

	        /**
	         * Abstracts an ES6 promise into a q-like deferred interface for storage and deferred resolution.
	         *
	         * @private
	         * @param  {object} libraries
	         * @return {h.Deferred}
	         */

	        defer: function(libraries) {
	            var deferred       = null,
	                promiseWrapper = null,
	                $              = null;

	            promiseWrapper = new this.Deferred();

	            if (mixitup.features.has.promises) {
	                // ES6 native promise or polyfill

	                promiseWrapper.promise = new Promise(function(resolve, reject) {
	                    promiseWrapper.resolve = resolve;
	                    promiseWrapper.reject  = reject;
	                });
	            } else if (($ = (window.jQuery || libraries.$)) && typeof $.Deferred === 'function') {
	                // jQuery

	                deferred = $.Deferred();

	                promiseWrapper.promise = deferred.promise();
	                promiseWrapper.resolve = deferred.resolve;
	                promiseWrapper.reject  = deferred.reject;
	            } else if (window.console) {
	                // No implementation

	                console.warn(mixitup.messages.warningNoPromiseImplementation());
	            }

	            return promiseWrapper;
	        },

	        /**
	         * @private
	         * @param   {Array<Promise>}    tasks
	         * @param   {object}            libraries
	         * @return  {Promise<Array>}
	         */

	        all: function(tasks, libraries) {
	            var $ = null;

	            if (mixitup.features.has.promises) {
	                return Promise.all(tasks);
	            } else if (($ = (window.jQuery || libraries.$)) && typeof $.when === 'function') {
	                return $.when.apply($, tasks)
	                    .done(function() {
	                        // jQuery when returns spread arguments rather than an array or resolutions

	                        return arguments;
	                    });
	            }

	            // No implementation

	            if (window.console) {
	                console.warn(mixitup.messages.warningNoPromiseImplementation());
	            }

	            return [];
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}   el
	         * @param   {string}        property
	         * @param   {Array<string>} vendors
	         * @return  {string}
	         */

	        getPrefix: function(el, property, vendors) {
	            var i       = -1,
	                prefix  = '';

	            if (h.dashCase(property) in el.style) return '';

	            for (i = 0; prefix = vendors[i]; i++) {
	                if (prefix + property in el.style) {
	                    return prefix.toLowerCase();
	                }
	            }

	            return 'unsupported';
	        },

	        /**
	         * @private
	         * @return  {string}
	         */

	        randomHex: function() {
	            return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
	        },

	        /**
	         * @private
	         * @param   {HTMLDocument}  [doc]
	         * @return  {object}
	         */

	        getDocumentState: function(doc) {
	            doc = typeof doc.body === 'object' ? doc : window.document;

	            return {
	                scrollTop: window.pageYOffset,
	                scrollLeft: window.pageXOffset,
	                docHeight: doc.documentElement.scrollHeight,
	                docWidth: doc.documentElement.scrollWidth,
	                viewportHeight: doc.documentElement.clientHeight,
	                viewportWidth: doc.documentElement.clientWidth
	            };
	        },

	        /**
	         * @private
	         * @param   {object}    obj
	         * @param   {function}  fn
	         * @return  {function}
	         */

	        bind: function(obj, fn) {
	            return function() {
	                return fn.apply(obj, arguments);
	            };
	        },

	        /**
	         * @private
	         * @param   {HTMLElement}   el
	         * @return  {boolean}
	         */

	        isVisible: function(el) {
	            var styles = null;

	            if (el.offsetParent) return true;

	            styles = window.getComputedStyle(el);

	            if (
	                styles.position === 'fixed' &&
	                styles.visibility !== 'hidden' &&
	                styles.opacity !== '0'
	            ) {
	                // Fixed elements report no offsetParent,
	                // but may still be invisible

	                return true;
	            }

	            return false;
	        },

	        /**
	         * @private
	         * @param   {object}    obj
	         */

	        seal: function(obj) {
	            if (typeof Object.seal === 'function') {
	                Object.seal(obj);
	            }
	        },

	        /**
	         * @private
	         * @param   {object}    obj
	         */

	        freeze: function(obj) {
	            if (typeof Object.freeze === 'function') {
	                Object.freeze(obj);
	            }
	        },

	        /**
	         * @private
	         * @param   {string}    control
	         * @param   {string}    specimen
	         * @return  {boolean}
	         */

	        compareVersions: function(control, specimen) {
	            var controlParts    = control.split('.'),
	                specimenParts   = specimen.split('.'),
	                controlPart     = -1,
	                specimenPart    = -1,
	                i               = -1;

	            for (i = 0; i < controlParts.length; i++) {
	                controlPart     = parseInt(controlParts[i].replace(/[^\d.]/g, ''));
	                specimenPart    = parseInt(specimenParts[i].replace(/[^\d.]/g, '') || 0);

	                if (specimenPart < controlPart) {
	                    return false;
	                } else if (specimenPart > controlPart) {
	                    return true;
	                }
	            }

	            return true;
	        },

	        /**
	         * @private
	         * @constructor
	         */

	        Deferred: function() {
	            this.promise    = null;
	            this.resolve    = null;
	            this.reject     = null;
	            this.id         = h.randomHex();
	        },

	        /**
	         * @private
	         * @param   {object}  obj
	         * @return  {boolean}
	         */

	        isEmptyObject: function(obj) {
	            var key = '';

	            if (typeof Object.keys === 'function') {
	                return Object.keys(obj).length === 0;
	            }

	            for (key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    return false;
	                }
	            }

	            return true;
	        },

	        /**
	         * @param   {mixitup.Config.ClassNames}   classNames
	         * @param   {string}                      elementName
	         * @param   {string}                      [modifier]
	         * @return  {string}
	         */

	        getClassname: function(classNames, elementName, modifier) {
	            var classname = '';

	            classname += classNames.block;

	            if (classname.length) {
	                classname += classNames.delineatorElement;
	            }

	            classname += classNames['element' + this.pascalCase(elementName)];

	            if (!modifier) return classname;

	            if (classname.length) {
	                classname += classNames.delineatorModifier;
	            }

	            classname += modifier;

	            return classname;
	        },

	        /**
	         * Returns the value of a property on a given object via its string key.
	         *
	         * @param   {object}    obj
	         * @param   {string}    stringKey
	         * @return  {*} value
	         */

	        getProperty: function(obj, stringKey) {
	            var parts           = stringKey.split('.'),
	                returnCurrent   = null,
	                current         = '',
	                i               = 0;

	            if (!stringKey) {
	                return obj;
	            }

	            returnCurrent = function(obj) {
	                if (!obj) {
	                    return null;
	                } else {
	                    return obj[current];
	                }
	            };

	            while (i < parts.length) {
	                current = parts[i];

	                obj = returnCurrent(obj);

	                i++;
	            }

	            if (typeof obj !== 'undefined') {
	                return obj;
	            } else {
	                return null;
	            }
	        }
	    };

	    mixitup.h = h;

	    /**
	     * The Base class adds instance methods to all other extensible MixItUp classes,
	     * enabling the calling of any registered hooks.
	     *
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.Base = function() {};

	    mixitup.Base.prototype = {
	        constructor: mixitup.Base,

	        /**
	         * Calls any registered hooks for the provided action.
	         *
	         * @memberof    mixitup.Base
	         * @private
	         * @instance
	         * @since       2.0.0
	         * @param       {string}    actionName
	         * @param       {Array<*>}  args
	         * @return      {void}
	         */

	        callActions: function(actionName, args) {
	            var self            = this,
	                hooks           = self.constructor.actions[actionName],
	                extensionName   = '';

	            if (!hooks || h.isEmptyObject(hooks)) return;

	            for (extensionName in hooks) {
	                hooks[extensionName].apply(self, args);
	            }
	        },

	        /**
	         * Calls any registered hooks for the provided filter.
	         *
	         * @memberof    mixitup.Base
	         * @private
	         * @instance
	         * @since       2.0.0
	         * @param       {string}    filterName
	         * @param       {*}         input
	         * @param       {Array<*>}  args
	         * @return      {*}
	         */

	        callFilters: function(filterName, input, args) {
	            var self            = this,
	                hooks           = self.constructor.filters[filterName],
	                output          = input,
	                extensionName   = '';

	            if (!hooks || h.isEmptyObject(hooks)) return output;

	            args = args || [];

	            for (extensionName in hooks) {
	                args = h.arrayFromList(args);

	                args.unshift(output);

	                output = hooks[extensionName].apply(self, args);
	            }

	            return output;
	        }
	    };

	    /**
	     * The BaseStatic class holds a set of static methods which are then added to all other
	     * extensible MixItUp classes as a means of integrating extensions via the addition of new
	     * methods and/or actions and hooks.
	     *
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.BaseStatic = function() {
	        this.actions = {};
	        this.filters = {};

	        /**
	         * Performs a shallow extend on the class's prototype, adding one or more new members to
	         * the class in a single operation.
	         *
	         * @memberof    mixitup.BaseStatic
	         * @public
	         * @static
	         * @since       2.1.0
	         * @param       {object} extension
	         * @return      {void}
	         */

	        this.extend = function(extension) {
	            h.extend(this.prototype, extension);
	        };

	        /**
	         * Registers a function to be called on the action hook of the provided name.
	         *
	         * @memberof    mixitup.BaseStatic
	         * @public
	         * @static
	         * @since       2.1.0
	         * @param       {string}    hookName
	         * @param       {string}    extensionName
	         * @param       {function}  func
	         * @return      {void}
	         */

	        this.registerAction = function(hookName, extensionName, func) {
	            (this.actions[hookName] = this.actions[hookName] || {})[extensionName] = func;
	        };

	        /**
	         * Registers a function to be called on the filter of the provided name.
	         *
	         * @memberof    mixitup.BaseStatic
	         * @public
	         * @static
	         * @since       2.1.0
	         * @param       {string}    hookName
	         * @param       {string}    extensionName
	         * @param       {function}  func
	         * @return      {void}
	         */

	        this.registerFilter = function(hookName, extensionName, func) {
	            (this.filters[hookName] = this.filters[hookName] || {})[extensionName] = func;
	        };
	    };

	    /**
	     * The `mixitup.Features` class performs all feature and CSS prefix detection
	     * neccessary for MixItUp to function correctly, as well as storing various
	     * string and array constants. All feature decection is on evaluation of the
	     * library and stored in a singleton instance for use by other internal classes.
	     *
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.Features = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.boxSizingPrefix            = '';
	        this.transformPrefix            = '';
	        this.transitionPrefix           = '';

	        this.boxSizingPrefix            = '';
	        this.transformProp              = '';
	        this.transformRule              = '';
	        this.transitionProp             = '';
	        this.perspectiveProp            = '';
	        this.perspectiveOriginProp      = '';

	        this.has                        = new mixitup.Has();

	        this.canary                     = null;

	        this.BOX_SIZING_PROP            = 'boxSizing';
	        this.TRANSITION_PROP            = 'transition';
	        this.TRANSFORM_PROP             = 'transform';
	        this.PERSPECTIVE_PROP           = 'perspective';
	        this.PERSPECTIVE_ORIGIN_PROP    = 'perspectiveOrigin';
	        this.VENDORS                    = ['Webkit', 'moz', 'O', 'ms'];

	        this.TWEENABLE = [
	            'opacity',
	            'width', 'height',
	            'marginRight', 'marginBottom',
	            'x', 'y',
	            'scale',
	            'translateX', 'translateY', 'translateZ',
	            'rotateX', 'rotateY', 'rotateZ'
	        ];

	        this.callActions('afterConstruct');
	    };

	    mixitup.BaseStatic.call(mixitup.Features);

	    mixitup.Features.prototype = Object.create(mixitup.Base.prototype);

	    h.extend(mixitup.Features.prototype,
	    /** @lends mixitup.Features */
	    {
	        constructor: mixitup.Features,

	        /**
	         * @private
	         * @return  {void}
	         */

	        init: function() {
	            var self = this;

	            self.callActions('beforeInit', arguments);

	            self.canary = document.createElement('div');

	            self.setPrefixes();
	            self.runTests();

	            self.callActions('beforeInit', arguments);
	        },

	        /**
	         * @private
	         * @return  {void}
	         */

	        runTests: function() {
	            var self = this;

	            self.callActions('beforeRunTests', arguments);

	            self.has.promises       = typeof window.Promise === 'function';
	            self.has.transitions    = self.transitionPrefix !== 'unsupported';

	            self.callActions('afterRunTests', arguments);

	            h.freeze(self.has);
	        },

	        /**
	         * @private
	         * @return  {void}
	         */

	        setPrefixes: function() {
	            var self = this;

	            self.callActions('beforeSetPrefixes', arguments);

	            self.transitionPrefix   = h.getPrefix(self.canary, 'Transition', self.VENDORS);
	            self.transformPrefix    = h.getPrefix(self.canary, 'Transform', self.VENDORS);
	            self.boxSizingPrefix    = h.getPrefix(self.canary, 'BoxSizing', self.VENDORS);

	            self.boxSizingProp = self.boxSizingPrefix ?
	                self.boxSizingPrefix + h.pascalCase(self.BOX_SIZING_PROP) : self.BOX_SIZING_PROP;

	            self.transitionProp = self.transitionPrefix ?
	                self.transitionPrefix + h.pascalCase(self.TRANSITION_PROP) : self.TRANSITION_PROP;

	            self.transformProp = self.transformPrefix ?
	                self.transformPrefix + h.pascalCase(self.TRANSFORM_PROP) : self.TRANSFORM_PROP;

	            self.transformRule = self.transformPrefix ?
	                '-' + self.transformPrefix + '-' + self.TRANSFORM_PROP : self.TRANSFORM_PROP;

	            self.perspectiveProp = self.transformPrefix ?
	                self.transformPrefix + h.pascalCase(self.PERSPECTIVE_PROP) : self.PERSPECTIVE_PROP;

	            self.perspectiveOriginProp = self.transformPrefix ?
	                self.transformPrefix + h.pascalCase(self.PERSPECTIVE_ORIGIN_PROP) :
	                self.PERSPECTIVE_ORIGIN_PROP;

	            self.callActions('afterSetPrefixes', arguments);
	        }
	    });

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.Has = function() {
	        this.transitions    = false;
	        this.promises       = false;

	        h.seal(this);
	    };

	    // Assign a singleton instance to `mixitup.features` and initialise:

	    mixitup.features = new mixitup.Features();

	    mixitup.features.init();

	    /**
	     * A group of properties defining the mixer's animation and effects settings.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        animation
	     * @namespace
	     * @public
	     * @since       2.0.0
	     */

	    mixitup.ConfigAnimation = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A boolean dictating whether or not animation should be enabled for the MixItUp instance.
	         * If `false`, all operations will occur instantly and syncronously, although callback
	         * functions and any returned promises will still be fulfilled.
	         *
	         * @example <caption>Example: Create a mixer with all animations disabled</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         enable: false
	         *     }
	         * });
	         *
	         * @name        enable
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.enable = true;

	        /**
	         * A string of one or more space-seperated properties to which transitions will be
	         * applied for all filtering animations.
	         *
	         * Properties can be listed any order or combination, although they will be applied in a specific
	         * predefined order to produce consistent results.
	         *
	         * To learn more about available effects, experiment with our <a href="https://www.kunkalabs.com/mixitup/">
	         * sandbox demo</a> and try out the "Export config" button in the Animation options drop down.
	         *
	         * @example <caption>Example: Apply "fade" and "translateZ" effects to all animations</caption>
	         * // As targets are filtered in and out, they will fade between
	         * // opacity 1 and 0 and transform between translateZ(-100px) and
	         * // translateZ(0).
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         effects: 'fade translateZ(-100px)'
	         *     }
	         * });
	         *
	         * @name        effects
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {string}
	         * @default     'fade scale'
	         */

	        this.effects = 'fade scale';

	        /**
	         * A string of one or more space-seperated effects to be applied only to filter-in
	         * animations, overriding `config.animation.effects` if set.
	         *
	         * @example <caption>Example: Apply downwards vertical translate to targets being filtered in</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         effectsIn: 'fade translateY(-100%)'
	         *     }
	         * });
	         *
	         * @name        effectsIn
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {string}
	         * @default     ''
	         */

	        this.effectsIn = '';

	        /**
	         * A string of one or more space-seperated effects to be applied only to filter-out
	         * animations, overriding `config.animation.effects` if set.
	         *
	         * @example <caption>Example: Apply upwards vertical translate to targets being filtered out</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         effectsOut: 'fade translateY(-100%)'
	         *     }
	         * });
	         *
	         * @name        effectsOut
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {string}
	         * @default     ''
	         */

	        this.effectsOut = '';

	        /**
	         * An integer dictating the duration of all MixItUp animations in milliseconds, not
	         * including any additional delay apllied via the `'stagger'` effect.
	         *
	         * @example <caption>Example: Apply an animation duration of 200ms to all mixitup animations</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         duration: 200
	         *     }
	         * });
	         *
	         * @name        duration
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {number}
	         * @default     600
	         */

	        this.duration = 600;

	        /**
	         * A valid CSS3 transition-timing function or shorthand. For a full list of accepted
	         * values, visit <a href="http://easings.net" target="_blank">easings.net</a>.
	         *
	         * @example <caption>Example 1: Apply "ease-in-out" easing to all animations</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         easing: 'ease-in-out'
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Apply a custom "cubic-bezier" easing function to all animations</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
	         *     }
	         * });
	         *
	         * @name        easing
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {string}
	         * @default     'ease'
	         */

	        this.easing = 'ease';

	        /**
	         * A boolean dictating whether or not to apply perspective to the MixItUp container
	         * during animations. By default, perspective is always applied and creates the
	         * illusion of three-dimensional space for effects such as `translateZ`, `rotateX`,
	         * and `rotateY`.
	         *
	         * You may wish to disable this and define your own perspective settings via CSS.
	         *
	         * @example <caption>Example: Prevent perspective from being applied to any 3D transforms</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         applyPerspective: false
	         *     }
	         * });
	         *
	         * @name        applyPerspective
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {bolean}
	         * @default     true
	         */

	        this.applyPerspective = true;

	        /**
	         * The perspective distance value to be applied to the container during animations,
	         * affecting any 3D-transform-based effects.
	         *
	         * @example <caption>Example: Set a perspective distance of 2000px</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         effects: 'rotateY(-25deg)',
	         *         perspectiveDistance: '2000px'
	         *     }
	         * });
	         *
	         * @name        perspectiveDistance
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {string}
	         * @default     '3000px'
	         */

	        this.perspectiveDistance = '3000px';

	        /**
	         * The perspective-origin value to be applied to the container during animations,
	         * affecting any 3D-transform-based effects.
	         *
	         * @example <caption>Example: Set a perspective origin in the top-right of the container</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         effects: 'transateZ(-200px)',
	         *         perspectiveOrigin: '100% 0'
	         *     }
	         * });
	         *
	         * @name        perspectiveOrigin
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {string}
	         * @default     '50% 50%'
	         */

	        this.perspectiveOrigin = '50% 50%';

	        /**
	         * A boolean dictating whether or not to enable the queuing of operations.
	         *
	         * If `true` (default), and a control is clicked or an API call is made while another
	         * operation is progress, the operation will go into the queue and will be automatically exectuted
	         * when the previous operaitons is finished.
	         *
	         * If `false`, any requested operations will be ignored, and the `onMixBusy` callback and `mixBusy`
	         * event will be fired. If `debug.showWarnings` is enabled, a console warning will also occur.
	         *
	         * @example <caption>Example: Disable queuing</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         queue: false
	         *     }
	         * });
	         *
	         * @name        queue
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.queue = true;

	        /**
	         * An integer dictacting the maximum number of operations allowed in the queue at
	         * any time, when queuing is enabled.
	         *
	         * @example <caption>Example: Allow a maximum of 5 operations in the queue at any time</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         queueLimit: 5
	         *     }
	         * });
	         *
	         * @name        queueLimit
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {number}
	         * @default     3
	         */

	        this.queueLimit = 3;

	        /**
	         * A boolean dictating whether or not to transition the height and width of the
	         * container as elements are filtered in and out. If disabled, the container height
	         * will change abruptly.
	         *
	         * It may be desirable to disable this on mobile devices as the CSS `height` and
	         * `width` properties do not receive GPU-acceleration and can therefore cause stuttering.
	         *
	         * @example <caption>Example 1: Disable the transitioning of the container height and/or width</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         animateResizeContainer: false
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Disable the transitioning of the container height and/or width for mobile devices only</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         animateResizeContainer: myFeatureTests.isMobile ? false : true
	         *     }
	         * });
	         *
	         * @name        animateResizeContainer
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.animateResizeContainer = true;

	        /**
	         * A boolean dictating whether or not to transition the height and width of target
	         * elements as they change throughout the course of an animation.
	         *
	         * This is often a must for flex-box grid layouts where the size of target elements may change
	         * depending on final their position in relation to their siblings, or for `.changeLayout()`
	         * operations where the size of targets change between layouts.
	         *
	         * NB: This feature requires additional calculations and manipulation to non-hardware-accelerated
	         * properties which may adversely affect performance on slower devices, and is therefore
	         * disabled by default.
	         *
	         * @example <caption>Example: Enable the transitioning of target widths and heights</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         animateResizeTargets: true
	         *     }
	         * });
	         *
	         * @name        animateResizeTargets
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {boolean}
	         * @default     false
	         */

	        this.animateResizeTargets = false;

	        /**
	         * A custom function used to manipulate the order in which the stagger delay is
	         * incremented when using the ‘stagger’ effect.
	         *
	         * When using the 'stagger' effect, the delay applied to each target element is incremented
	         * based on its index. You may create a custom function to manipulate the order in which the
	         * delay is incremented and create engaging non-linear stagger effects.
	         *
	         * The function receives the index of the target element as a parameter, and must
	         * return an integer which serves as the multiplier for the stagger delay.
	         *
	         * @example <caption>Example 1: Stagger target elements by column in a 3-column grid</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         effects: 'fade stagger(100ms)',
	         *         staggerSequence: function(i) {
	         *             return i % 3;
	         *         }
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Using an algorithm to produce a more complex sequence</caption>
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         effects: 'fade stagger(100ms)',
	         *         staggerSequence: function(i) {
	         *             return (2*i) - (5*((i/3) - ((1/3) * (i%3))));
	         *         }
	         *     }
	         * });
	         *
	         * @name        staggerSequence
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {function}
	         * @default     null
	         */

	        this.staggerSequence = null;

	        /**
	         * A boolean dictating whether or not to reverse the direction of `translate`
	         * and `rotate` transforms for elements being filtered out.
	         *
	         * It can be used to create carousel-like animations where elements enter and exit
	         * from opposite directions. If enabled, the effect `translateX(-100%)` for elements
	         * being filtered in would become `translateX(100%)` for targets being filtered out.
	         *
	         * This functionality can also be achieved by providing seperate effects
	         * strings for `config.animation.effectsIn` and `config.animation.effectsOut`.
	         *
	         * @example <caption>Example: Reverse the desired direction on any translate/rotate effect for targets being filtered out</caption>
	         * // Elements being filtered in will be translated from '100%' to '0' while
	         * // elements being filtered out will be translated from 0 to '-100%'
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         effects: 'fade translateX(100%)',
	         *         reverseOut: true,
	         *         nudge: false // Disable nudging to create a carousel-like effect
	         *     }
	         * });
	         *
	         * @name        reverseOut
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {boolean}
	         * @default     false
	         */

	        this.reverseOut = false;

	        /**
	         * A boolean dictating whether or not to "nudge" the animation path of targets
	         * when they are being filtered in and out simulatenously.
	         *
	         * This has been the default behavior of MixItUp since version 1, but it
	         * may be desirable to disable this effect when filtering directly from
	         * one exclusive set of targets to a different exclusive set of targets,
	         * to create a carousel-like effect, or a generally more subtle animation.
	         *
	         * @example <caption>Example: Disable the "nudging" of targets being filtered in and out simulatenously</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         nudge: false
	         *     }
	         * });
	         *
	         * @name        nudge
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.nudge = true;

	        /**
	         * A boolean dictating whether or not to clamp the height of the container while MixItUp's
	         * geometry tests are carried out before an operation.
	         *
	         * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
	         * height of the container might affect its vertical positioning in the viewport
	         * (e.g. a vertically-centered container), this should be turned off to ensure accurate
	         * test results and a smooth animation.
	         *
	         * @example <caption>Example: Disable container height-clamping</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         clampHeight: false
	         *     }
	         * });
	         *
	         * @name        clampHeight
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.clampHeight = true;

	        /**
	         * A boolean dictating whether or not to clamp the width of the container while MixItUp's
	         * geometry tests are carried out before an operation.
	         *
	         * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
	         * width of the container might affect its horitzontal positioning in the viewport
	         * (e.g. a horizontall-centered container), this should be turned off to ensure accurate
	         * test results and a smooth animation.
	         *
	         * @example <caption>Example: Disable container width-clamping</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     animation: {
	         *         clampWidth: false
	         *     }
	         * });
	         *
	         * @name        clampWidth
	         * @memberof    mixitup.Config.animation
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.clampWidth = true;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigAnimation);

	    mixitup.ConfigAnimation.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigAnimation.prototype.constructor = mixitup.ConfigAnimation;

	    /**
	     * A group of properties relating to the behavior of the Mixer.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        behavior
	     * @namespace
	     * @public
	     * @since       3.1.12
	     */

	    mixitup.ConfigBehavior = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A boolean dictating whether to allow "live" sorting of the mixer.
	         *
	         * Because of the expensive nature of sorting, MixItUp makes use of several
	         * internal optimizations to skip redundant sorting operations, such as when
	         * the newly requested sort command is the same as the active one. The caveat
	         * to this optimization is that "live" edits to the value of a target's sorting
	         * attribute will be ignored when requesting a re-sort by the same attribute.
	         *
	         * By setting to `behavior.liveSort` to `true`, the mixer will always re-sort
	         * regardless of whether or not the sorting attribute and order have changed.
	         *
	         * @example <caption>Example: Enabling `liveSort` to allow for re-sorting</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     behavior: {
	         *         liveSort: true
	         *     },
	         *     load: {
	         *         sort: 'edited:desc'
	         *     }
	         * });
	         *
	         * var target = containerEl.children[3];
	         *
	         * console.log(target.getAttribute('data-edited')); // '2015-04-24'
	         *
	         * target.setAttribute('data-edited', '2017-08-10'); // Update the target's edited date
	         *
	         * mixer.sort('edited:desc')
	         *     .then(function(state) {
	         *         // The target is now at the top of the list
	         *
	         *         console.log(state.targets[0] === target); // true
	         *     });
	         *
	         * @name        liveSort
	         * @memberof    mixitup.Config.behavior
	         * @instance
	         * @type        {boolean}
	         * @default     false
	         */

	        this.liveSort = false;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigBehavior);

	    mixitup.ConfigBehavior.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigBehavior.prototype.constructor = mixitup.ConfigBehavior;

	    /**
	     * A group of optional callback functions to be invoked at various
	     * points within the lifecycle of a mixer operation.
	     *
	     * Each function is analogous to an event of the same name triggered from the
	     * container element, and is invoked immediately after it.
	     *
	     * All callback functions receive the current `state` object as their first
	     * argument, as well as other more specific arguments described below.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        callbacks
	     * @namespace
	     * @public
	     * @since       2.0.0
	     */

	    mixitup.ConfigCallbacks = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A callback function invoked immediately after any MixItUp operation is requested
	         * and before animations have begun.
	         *
	         * A second `futureState` argument is passed to the function which represents the final
	         * state of the mixer once the requested operation has completed.
	         *
	         * @example <caption>Example: Adding an `onMixStart` callback function</caption>
	         * var mixer = mixitup(containerEl, {
	         *     callbacks: {
	         *         onMixStart: function(state, futureState) {
	         *              console.log('Starting operation...');
	         *         }
	         *     }
	         * });
	         *
	         * @name        onMixStart
	         * @memberof    mixitup.Config.callbacks
	         * @instance
	         * @type        {function}
	         * @default     null
	         */

	        this.onMixStart = null;

	        /**
	         * A callback function invoked when a MixItUp operation is requested while another
	         * operation is in progress, and the animation queue is full, or queueing
	         * is disabled.
	         *
	         * @example <caption>Example: Adding an `onMixBusy` callback function</caption>
	         * var mixer = mixitup(containerEl, {
	         *     callbacks: {
	         *         onMixBusy: function(state) {
	         *              console.log('Mixer busy');
	         *         }
	         *     }
	         * });
	         *
	         * @name        onMixBusy
	         * @memberof    mixitup.Config.callbacks
	         * @instance
	         * @type        {function}
	         * @default     null
	         */

	        this.onMixBusy  = null;

	        /**
	         * A callback function invoked after any MixItUp operation has completed, and the
	         * state has been updated.
	         *
	         * @example <caption>Example: Adding an `onMixEnd` callback function</caption>
	         * var mixer = mixitup(containerEl, {
	         *     callbacks: {
	         *         onMixEnd: function(state) {
	         *              console.log('Operation complete');
	         *         }
	         *     }
	         * });
	         *
	         * @name        onMixEnd
	         * @memberof    mixitup.Config.callbacks
	         * @instance
	         * @type        {function}
	         * @default     null
	         */

	        this.onMixEnd   = null;

	        /**
	         * A callback function invoked whenever an operation "fails", i.e. no targets
	         * could be found matching the requested filter.
	         *
	         * @example <caption>Example: Adding an `onMixFail` callback function</caption>
	         * var mixer = mixitup(containerEl, {
	         *     callbacks: {
	         *         onMixFail: function(state) {
	         *              console.log('No items could be found matching the requested filter');
	         *         }
	         *     }
	         * });
	         *
	         * @name        onMixFail
	         * @memberof    mixitup.Config.callbacks
	         * @instance
	         * @type        {function}
	         * @default     null
	         */

	        this.onMixFail  = null;

	        /**
	         * A callback function invoked whenever a MixItUp control is clicked, and before its
	         * respective operation is requested.
	         *
	         * The clicked element is assigned to the `this` keyword within the function. The original
	         * click event is passed to the function as the second argument, which can be useful if
	         * using `<a>` tags as controls where the default behavior needs to be prevented.
	         *
	         * Returning `false` from the callback will prevent the control click from triggering
	         * an operation.
	         *
	         * @example <caption>Example 1: Adding an `onMixClick` callback function</caption>
	         * var mixer = mixitup(containerEl, {
	         *     callbacks: {
	         *         onMixClick: function(state, originalEvent) {
	         *              console.log('The control "' + this.innerText + '" was clicked');
	         *         }
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Using `onMixClick` to manipulate the original click event</caption>
	         * var mixer = mixitup(containerEl, {
	         *     callbacks: {
	         *         onMixClick: function(state, originalEvent) {
	         *              // Prevent original click event from bubbling up:
	         *              originalEvent.stopPropagation();
	         *
	         *              // Prevent default behavior of clicked element:
	         *              originalEvent.preventDefault();
	         *         }
	         *     }
	         * });
	         *
	         * @example <caption>Example 3: Using `onMixClick` to conditionally cancel operations</caption>
	         * var mixer = mixitup(containerEl, {
	         *     callbacks: {
	         *         onMixClick: function(state, originalEvent) {
	         *              // Perform some conditional check:
	         *
	         *              if (myApp.isLoading) {
	         *                  // By returning false, we can prevent the control click from triggering an operation.
	         *
	         *                  return false;
	         *              }
	         *         }
	         *     }
	         * });
	         *
	         * @name        onMixClick
	         * @memberof    mixitup.Config.callbacks
	         * @instance
	         * @type        {function}
	         * @default     null
	         */

	        this.onMixClick = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigCallbacks);

	    mixitup.ConfigCallbacks.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigCallbacks.prototype.constructor = mixitup.ConfigCallbacks;

	    /**
	     * A group of properties relating to clickable control elements.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        controls
	     * @namespace
	     * @public
	     * @since       2.0.0
	     */

	    mixitup.ConfigControls = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A boolean dictating whether or not controls should be enabled for the mixer instance.
	         *
	         * If `true` (default behavior), MixItUp will search the DOM for any clickable elements with
	         * `data-filter`, `data-sort` or `data-toggle` attributes, and bind them for click events.
	         *
	         * If `false`, no click handlers will be bound, and all functionality must therefore be performed
	         * via the mixer's API methods.
	         *
	         * If you do not intend to use the default controls, setting this property to `false` will
	         * marginally improve the startup time of your mixer instance, and will also prevent any other active
	         * mixer instances in the DOM which are bound to controls from controlling the instance.
	         *
	         * @example <caption>Example: Disabling controls</caption>
	         * var mixer = mixitup(containerEl, {
	         *     controls: {
	         *         enable: false
	         *     }
	         * });
	         *
	         * // With the default controls disabled, we can only control
	         * // the mixer via its API methods, e.g.:
	         *
	         * mixer.filter('.cat-1');
	         *
	         * @name        enable
	         * @memberof    mixitup.Config.controls
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.enable = true;

	        /**
	         * A boolean dictating whether or not to use event delegation when binding click events
	         * to the default controls.
	         *
	         * If `false` (default behavior), each control button in the DOM will be found and
	         * individually bound when a mixer is instantiated, with their corresponding actions
	         * cached for performance.
	         *
	         * If `true`, a single click handler will be applied to the `window` (or container element - see
	         * `config.controls.scope`), and any click events triggered by elements with `data-filter`,
	         * `data-sort` or `data-toggle` attributes present will be handled as they propagate upwards.
	         *
	         * If you require a user interface where control buttons may be added, removed, or changed during the
	         * lifetime of a mixer, `controls.live` should be set to `true`. There is a marginal but unavoidable
	         * performance deficit when using live controls, as the value of each control button must be read
	         * from the DOM in real time once the click event has propagated.
	         *
	         * @example <caption>Example: Setting live controls</caption>
	         * var mixer = mixitup(containerEl, {
	         *     controls: {
	         *         live: true
	         *     }
	         * });
	         *
	         * // Control buttons can now be added, remove and changed without breaking
	         * // the mixer's UI
	         *
	         * @name        live
	         * @memberof    mixitup.Config.controls
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.live = false;

	        /**
	         * A string dictating the "scope" to use when binding or querying the default controls. The available
	         * values are `'global'` or `'local'`.
	         *
	         * When set to `'global'` (default behavior), MixItUp will query the entire document for control buttons
	         * to bind, or delegate click events from (see `config.controls.live`).
	         *
	         * When set to `'local'`, MixItUp will only query (or bind click events to) its own container element.
	         * This may be desireable if you require multiple active mixer instances within the same document, with
	         * controls that would otherwise intefere with each other if scoped globally.
	         *
	         * Conversely, if you wish to control multiple instances with a single UI, you would create one
	         * set of controls and keep the controls scope of each mixer set to `global`.
	         *
	         * @example <caption>Example: Setting 'local' scoped controls</caption>
	         * var mixerOne = mixitup(containerOne, {
	         *     controls: {
	         *         scope: 'local'
	         *     }
	         * });
	         *
	         * var mixerTwo = mixitup(containerTwo, {
	         *     controls: {
	         *         scope: 'local'
	         *     }
	         * });
	         *
	         * // Both mixers can now exist within the same document with
	         * // isolated controls placed within their container elements.
	         *
	         * @name        scope
	         * @memberof    mixitup.Config.controls
	         * @instance
	         * @type        {string}
	         * @default     'global'
	         */

	        this.scope = 'global'; // enum: ['local' ,'global']

	        /**
	         * A string dictating the type of logic to apply when concatenating the filter selectors of
	         * active toggle buttons (i.e. any clickable element with a `data-toggle` attribute).
	         *
	         * If set to `'or'` (default behavior), selectors will be concatenated together as
	         * a comma-seperated list. For example:
	         *
	         * `'.cat-1, .cat-2'` (shows any elements matching `'.cat-1'` OR `'.cat-2'`)
	         *
	         * If set to `'and'`, selectors will be directly concatenated together. For example:
	         *
	         * `'.cat-1.cat-2'` (shows any elements which match both `'.cat-1'` AND `'.cat-2'`)
	         *
	         * @example <caption>Example: Setting "and" toggle logic</caption>
	         * var mixer = mixitup(containerEl, {
	         *     controls: {
	         *         toggleLogic: 'and'
	         *     }
	         * });
	         *
	         * @name        toggleLogic
	         * @memberof    mixitup.Config.controls
	         * @instance
	         * @type        {string}
	         * @default     'or'
	         */

	        this.toggleLogic = 'or'; // enum: ['or', 'and']

	        /**
	         * A string dictating the filter behavior when all toggles are inactive.
	         *
	         * When set to `'all'` (default behavior), *all* targets will be shown by default
	         * when no toggles are active, or at the moment all active toggles are toggled off.
	         *
	         * When set to `'none'`, no targets will be shown by default when no toggles are
	         * active, or at the moment all active toggles are toggled off.
	         *
	         * @example <caption>Example 1: Setting the default toggle behavior to `'all'`</caption>
	         * var mixer = mixitup(containerEl, {
	         *     controls: {
	         *         toggleDefault: 'all'
	         *     }
	         * });
	         *
	         * mixer.toggleOn('.cat-2')
	         *     .then(function() {
	         *         // Deactivate all active toggles
	         *
	         *         return mixer.toggleOff('.cat-2')
	         *     })
	         *     .then(function(state) {
	         *          console.log(state.activeFilter.selector); // 'all'
	         *          console.log(state.totalShow); // 12
	         *     });
	         *
	         * @example <caption>Example 2: Setting the default toggle behavior to `'none'`</caption>
	         * var mixer = mixitup(containerEl, {
	         *     controls: {
	         *         toggleDefault: 'none'
	         *     }
	         * });
	         *
	         * mixer.toggleOn('.cat-2')
	         *     .then(function() {
	         *         // Deactivate all active toggles
	         *
	         *         return mixer.toggleOff('.cat-2')
	         *     })
	         *     .then(function(state) {
	         *          console.log(state.activeFilter.selector); // 'none'
	         *          console.log(state.totalShow); // 0
	         *     });
	         *
	         * @name        toggleDefault
	         * @memberof    mixitup.Config.controls
	         * @instance
	         * @type        {string}
	         * @default     'all'
	         */

	        this.toggleDefault = 'all'; // enum: ['all', 'none']

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigControls);

	    mixitup.ConfigControls.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigControls.prototype.constructor = mixitup.ConfigControls;

	    /**
	     * A group of properties defining the output and structure of class names programmatically
	     * added to controls and containers to reflect the state of the mixer.
	     *
	     * Most commonly, class names are added to controls by MixItUp to indicate that
	     * the control is active so that it can be styled accordingly - `'mixitup-control-active'` by default.
	     *
	     * Using a "BEM" like structure, each classname is broken into the three parts:
	     * a block namespace (`'mixitup'`), an element name (e.g. `'control'`), and an optional modifier
	     * name (e.g. `'active'`) reflecting the state of the element.
	     *
	     * By default, each part of the classname is concatenated together using single hyphens as
	     * delineators, but this can be easily customised to match the naming convention and style of
	     * your project.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        classNames
	     * @namespace
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.ConfigClassNames = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * The "block" portion, or top-level namespace added to the start of any class names created by MixItUp.
	         *
	         * @example <caption>Example 1: changing the `config.classNames.block` value</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         block: 'portfolio'
	         *     }
	         * });
	         *
	         * // Active control output: "portfolio-control-active"
	         *
	         * @example <caption>Example 2: Removing `config.classNames.block`</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         block: ''
	         *     }
	         * });
	         *
	         * // Active control output: "control-active"
	         *
	         * @name        block
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'mixitup'
	         */

	        this.block = 'mixitup';

	        /**
	         * The "element" portion of the class name added to container.
	         *
	         * @name        elementContainer
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'container'
	         */

	        this.elementContainer = 'container';

	        /**
	         * The "element" portion of the class name added to filter controls.
	         *
	         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
	         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
	         *
	         * @example <caption>Example 1: changing the `config.classNames.elementFilter` value</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         elementFilter: 'filter'
	         *     }
	         * });
	         *
	         * // Active filter output: "mixitup-filter-active"
	         *
	         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementFilter` values</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         block: 'portfolio',
	         *         elementFilter: 'filter'
	         *     }
	         * });
	         *
	         * // Active filter output: "portfolio-filter-active"
	         *
	         * @name        elementFilter
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'control'
	         */

	        this.elementFilter = 'control';

	        /**
	         * The "element" portion of the class name added to sort controls.
	         *
	         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
	         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
	         *
	         * @example <caption>Example 1: changing the `config.classNames.elementSort` value</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         elementSort: 'sort'
	         *     }
	         * });
	         *
	         * // Active sort output: "mixitup-sort-active"
	         *
	         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementSort` values</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         block: 'portfolio',
	         *         elementSort: 'sort'
	         *     }
	         * });
	         *
	         * // Active sort output: "portfolio-sort-active"
	         *
	         * @name        elementSort
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'control'
	         */

	        this.elementSort = 'control';

	        /**
	         * The "element" portion of the class name added to multimix controls.
	         *
	         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
	         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
	         *
	         * @example <caption>Example 1: changing the `config.classNames.elementMultimix` value</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         elementMultimix: 'multimix'
	         *     }
	         * });
	         *
	         * // Active multimix output: "mixitup-multimix-active"
	         *
	         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementMultimix` values</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         block: 'portfolio',
	         *         elementSort: 'multimix'
	         *     }
	         * });
	         *
	         * // Active multimix output: "portfolio-multimix-active"
	         *
	         * @name        elementMultimix
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'control'
	         */

	        this.elementMultimix = 'control';

	        /**
	         * The "element" portion of the class name added to toggle controls.
	         *
	         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
	         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
	         *
	         * @example <caption>Example 1: changing the `config.classNames.elementToggle` value</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         elementToggle: 'toggle'
	         *     }
	         * });
	         *
	         * // Active toggle output: "mixitup-toggle-active"
	         *
	         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementToggle` values</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         block: 'portfolio',
	         *         elementToggle: 'toggle'
	         *     }
	         * });
	         *
	         * // Active toggle output: "portfolio-toggle-active"
	         *
	         * @name        elementToggle
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'control'
	         */

	        this.elementToggle = 'control';

	        /**
	         * The "modifier" portion of the class name added to active controls.
	         * @name        modifierActive
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'active'
	         */

	        this.modifierActive = 'active';

	        /**
	         * The "modifier" portion of the class name added to disabled controls.
	         *
	         * @name        modifierDisabled
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'disabled'
	         */

	        this.modifierDisabled = 'disabled';

	        /**
	         * The "modifier" portion of the class name added to the container when in a "failed" state.
	         *
	         * @name        modifierFailed
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     'failed'
	         */

	        this.modifierFailed = 'failed';

	        /**
	         * The delineator used between the "block" and "element" portions of any class name added by MixItUp.
	         *
	         * If the block portion is ommited by setting it to an empty string, no delineator will be added.
	         *
	         * @example <caption>Example: changing the delineator to match BEM convention</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         delineatorElement: '__'
	         *     }
	         * });
	         *
	         * // example active control output: "mixitup__control-active"
	         *
	         * @name        delineatorElement
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     '-'
	         */

	        this.delineatorElement = '-';

	        /**
	         * The delineator used between the "element" and "modifier" portions of any class name added by MixItUp.
	         *
	         * If the element portion is ommited by setting it to an empty string, no delineator will be added.
	         *
	         * @example <caption>Example: changing both delineators to match BEM convention</caption>
	         * var mixer = mixitup(containerEl, {
	         *     classNames: {
	         *         delineatorElement: '__'
	         *         delineatorModifier: '--'
	         *     }
	         * });
	         *
	         * // Active control output: "mixitup__control--active"
	         *
	         * @name        delineatorModifier
	         * @memberof    mixitup.Config.classNames
	         * @instance
	         * @type        {string}
	         * @default     '-'
	         */

	        this.delineatorModifier = '-';

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigClassNames);

	    mixitup.ConfigClassNames.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigClassNames.prototype.constructor = mixitup.ConfigClassNames;

	    /**
	     * A group of properties relating to MixItUp's dataset API.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        data
	     * @namespace
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.ConfigData = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A string specifying the name of the key containing your data model's unique
	         * identifier (UID). To use the dataset API, a UID key must be specified and
	         * be present and unique on all objects in the dataset you provide to MixItUp.
	         *
	         * For example, if your dataset is made up of MongoDB documents, the UID
	         * key would be `'id'` or `'_id'`.
	         *
	         * @example <caption>Example: Setting the UID to `'id'`</caption>
	         * var mixer = mixitup(containerEl, {
	         *     data: {
	         *         uidKey: 'id'
	         *     }
	         * });
	         *
	         * @name        uidKey
	         * @memberof    mixitup.Config.data
	         * @instance
	         * @type        {string}
	         * @default     ''
	         */

	        this.uidKey = '';

	        /**
	         * A boolean dictating whether or not MixItUp should "dirty check" each object in
	         * your dataset for changes whenever `.dataset()` is called, and re-render any targets
	         * for which a change is found.
	         *
	         * Depending on the complexity of your data model, dirty checking can be expensive
	         * and is therefore disabled by default.
	         *
	         * NB: For changes to be detected, a new immutable instance of the edited model must be
	         * provided to mixitup, rather than manipulating properties on the existing instance.
	         * If your changes are a result of a DB write and read, you will most likely be calling
	         * `.dataset()` with a clean set of objects each time, so this will not be an issue.
	         *
	         * @example <caption>Example: Enabling dirty checking</caption>
	         *
	         * var myDataset = [
	         *     {
	         *         id: 0,
	         *         title: "Blog Post Title 0"
	         *         ...
	         *     },
	         *     {
	         *         id: 1,
	         *         title: "Blog Post Title 1"
	         *         ...
	         *     }
	         * ];
	         *
	         * // Instantiate a mixer with a pre-loaded dataset, and a target renderer
	         * // function defined
	         *
	         * var mixer = mixitup(containerEl, {
	         *     data: {
	         *         uidKey: 'id',
	         *         dirtyCheck: true
	         *     },
	         *     load: {
	         *         dataset: myDataset
	         *     },
	         *     render: {
	         *         target: function() { ... }
	         *     }
	         * });
	         *
	         * // For illustration, we will clone and edit the second object in the dataset.
	         * // NB: this would typically be done server-side in response to a DB update,
	         * and then re-queried via an API.
	         *
	         * myDataset[1] = Object.assign({}, myDataset[1]);
	         *
	         * myDataset[1].title = 'Blog Post Title 11';
	         *
	         * mixer.dataset(myDataset)
	         *    .then(function() {
	         *        // the target with ID "1", will be re-rendered reflecting its new title
	         *    });
	         *
	         * @name        dirtyCheck
	         * @memberof    mixitup.Config.data
	         * @instance
	         * @type        {boolean}
	         * @default     false
	         */

	        this.dirtyCheck = false;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigData);

	    mixitup.ConfigData.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigData.prototype.constructor = mixitup.ConfigData;

	    /**
	     * A group of properties allowing the toggling of various debug features.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        debug
	     * @namespace
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.ConfigDebug = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A boolean dictating whether or not the mixer instance returned by the
	         * `mixitup()` factory function should expose private properties and methods.
	         *
	         * By default, mixer instances only expose their public API, but enabling
	         * debug mode will give you access to various mixer internals which may aid
	         * in debugging, or the authoring of extensions.
	         *
	         * @example <caption>Example: Enabling debug mode</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     debug: {
	         *         enable: true
	         *     }
	         * });
	         *
	         * // Private properties and methods will now be visible on the mixer instance:
	         *
	         * console.log(mixer);
	         *
	         * @name        enable
	         * @memberof    mixitup.Config.debug
	         * @instance
	         * @type        {boolean}
	         * @default     false
	         */

	        this.enable = false;

	        /**
	         * A boolean dictating whether or not warnings should be shown when various
	         * common gotchas occur.
	         *
	         * Warnings are intended to provide insights during development when something
	         * occurs that is not a fatal, but may indicate an issue with your integration,
	         * and are therefore turned on by default. However, you may wish to disable
	         * them in production.
	         *
	         * @example <caption>Example 1: Disabling warnings</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     debug: {
	         *         showWarnings: false
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Disabling warnings based on environment</caption>
	         *
	         * var showWarnings = myAppConfig.environment === 'development' ? true : false;
	         *
	         * var mixer = mixitup(containerEl, {
	         *     debug: {
	         *         showWarnings: showWarnings
	         *     }
	         * });
	         *
	         * @name        showWarnings
	         * @memberof    mixitup.Config.debug
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.showWarnings = true;

	        /**
	         * Used for server-side testing only.
	         *
	         * @private
	         * @name        fauxAsync
	         * @memberof    mixitup.Config.debug
	         * @instance
	         * @type        {boolean}
	         * @default     false
	         */

	        this.fauxAsync = false;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigDebug);

	    mixitup.ConfigDebug.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigDebug.prototype.constructor = mixitup.ConfigDebug;

	    /**
	     * A group of properties relating to the layout of the container.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        layout
	     * @namespace
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.ConfigLayout = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A boolean dictating whether or not mixitup should query all descendants
	         * of the container for targets, or only immediate children.
	         *
	         * By default, mixitup will query all descendants matching the
	         * `selectors.target` selector when indexing targets upon instantiation.
	         * This allows for targets to be nested inside a sub-container which is
	         * useful when ring-fencing targets from locally scoped controls in your
	         * markup (see `controls.scope`).
	         *
	         * However, if you are building a more complex UI requiring the nesting
	         * of mixers within mixers, you will most likely want to limit targets to
	         * immediate children of the container by setting this property to `false`.
	         *
	         * @example <caption>Example: Restricting targets to immediate children</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     layout: {
	         *         allowNestedTargets: false
	         *     }
	         * });
	         *
	         * @name        allowNestedTargets
	         * @memberof    mixitup.Config.layout
	         * @instance
	         * @type        {boolean}
	         * @default     true
	         */

	        this.allowNestedTargets = true;

	        /**
	         * A string specifying an optional class name to apply to the container when in
	         * its default state.
	         *
	         * By changing this class name or adding a class name to the container via the
	         * `.changeLayout()` API method, the CSS layout of the container can be changed,
	         * and MixItUp will attemp to gracefully animate the container and its targets
	         * between states.
	         *
	         * @example <caption>Example 1: Specifying a container class name</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     layout: {
	         *         containerClassName: 'grid'
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Changing the default class name with `.changeLayout()`</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     layout: {
	         *         containerClassName: 'grid'
	         *     }
	         * });
	         *
	         * mixer.changeLayout('list')
	         *     .then(function(state) {
	         *          console.log(state.activeContainerClass); // "list"
	         *     });
	         *
	         * @name        containerClassName
	         * @memberof    mixitup.Config.layout
	         * @instance
	         * @type        {string}
	         * @default     ''
	         */

	        this.containerClassName = '';

	        /**
	         * A reference to a non-target sibling element after which to insert targets
	         * when there are no targets in the container.
	         *
	         * @example <caption>Example: Setting a `siblingBefore` reference element</caption>
	         *
	         * var addButton = containerEl.querySelector('button');
	         *
	         * var mixer = mixitup(containerEl, {
	         *     layout: {
	         *         siblingBefore: addButton
	         *     }
	         * });
	         *
	         * @name        siblingBefore
	         * @memberof    mixitup.Config.layout
	         * @instance
	         * @type        {HTMLElement}
	         * @default     null
	         */

	        this.siblingBefore = null;

	        /**
	         * A reference to a non-target sibling element before which to insert targets
	         * when there are no targets in the container.
	         *
	         * @example <caption>Example: Setting an `siblingAfter` reference element</caption>
	         *
	         * var gap = containerEl.querySelector('.gap');
	         *
	         * var mixer = mixitup(containerEl, {
	         *     layout: {
	         *         siblingAfter: gap
	         *     }
	         * });
	         *
	         * @name        siblingAfter
	         * @memberof    mixitup.Config.layout
	         * @instance
	         * @type        {HTMLElement}
	         * @default     null
	         */

	        this.siblingAfter = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigLayout);

	    mixitup.ConfigLayout.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigLayout.prototype.constructor = mixitup.ConfigLayout;

	    /**
	     * A group of properties defining the initial state of the mixer on load (instantiation).
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        load
	     * @namespace
	     * @public
	     * @since       2.0.0
	     */

	    mixitup.ConfigLoad = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A string defining any filtering to be statically applied to the mixer on load.
	         * As per the `.filter()` API, this can be any valid selector string, or the
	         * values `'all'` or `'none'`.
	         *
	         * @example <caption>Example 1: Defining an initial filter selector to be applied on load</caption>
	         *
	         * // The mixer will show only those targets matching '.category-a' on load.
	         *
	         * var mixer = mixitup(containerEl, {
	         *     load: {
	         *         filter: '.category-a'
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Hiding all targets on load</caption>
	         *
	         * // The mixer will show hide all targets on load.
	         *
	         * var mixer = mixitup(containerEl, {
	         *     load: {
	         *         filter: 'none'
	         *     }
	         * });
	         *
	         * @name        filter
	         * @memberof    mixitup.Config.load
	         * @instance
	         * @type        {string}
	         * @default     'all'
	         */

	        this.filter = 'all';

	        /**
	         * A string defining any sorting to be statically applied to the mixer on load.
	         * As per the `.sort()` API, this should be a valid "sort string" made up of
	         * an attribute to sort by (or `'default'`) followed by an optional sorting
	         * order, or the value `'random'`;
	         *
	         * @example <caption>Example: Defining sorting to be applied on load</caption>
	         *
	         * // The mixer will sort the container by the value of the `data-published-date`
	         * // attribute, in descending order.
	         *
	         * var mixer = mixitup(containerEl, {
	         *     load: {
	         *         sort: 'published-date:desc'
	         *     }
	         * });
	         *
	         * @name        sort
	         * @memberof    mixitup.Config.load
	         * @instance
	         * @type        {string}
	         * @default     'default:asc'
	         */

	        this.sort = 'default:asc';

	        /**
	         * An array of objects representing the underlying data of any pre-rendered targets,
	         * when using the `.dataset()` API.
	         *
	         * NB: If targets are pre-rendered when the mixer is instantiated, this must be set.
	         *
	         * @example <caption>Example: Defining the initial underyling dataset</caption>
	         *
	         * var myDataset = [
	         *     {
	         *         id: 0,
	         *         title: "Blog Post Title 0",
	         *         ...
	         *     },
	         *     {
	         *         id: 1,
	         *         title: "Blog Post Title 1",
	         *         ...
	         *     }
	         * ];
	         *
	         * var mixer = mixitup(containerEl, {
	         *     data: {
	         *         uidKey: 'id'
	         *     },
	         *     load: {
	         *         dataset: myDataset
	         *     }
	         * });
	         *
	         * @name        dataset
	         * @memberof    mixitup.Config.load
	         * @instance
	         * @type        {Array.<object>}
	         * @default     null
	         */

	        this.dataset = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigLoad);

	    mixitup.ConfigLoad.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigLoad.prototype.constructor = mixitup.ConfigLoad;

	    /**
	     * A group of properties defining the selectors used to query elements within a mixitup container.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        selectors
	     * @namespace
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.ConfigSelectors = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A selector string used to query and index target elements within the container.
	         *
	         * By default, the class selector `'.mix'` is used, but this can be changed to an
	         * attribute or element selector to match the style of your project.
	         *
	         * @example <caption>Example 1: Changing the target selector</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     selectors: {
	         *         target: '.portfolio-item'
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Using an attribute selector as a target selector</caption>
	         *
	         * // The mixer will search for any children with the attribute `data-ref="mix"`
	         *
	         * var mixer = mixitup(containerEl, {
	         *     selectors: {
	         *         target: '[data-ref="mix"]'
	         *     }
	         * });
	         *
	         * @name        target
	         * @memberof    mixitup.Config.selectors
	         * @instance
	         * @type        {string}
	         * @default     '.mix'
	         */

	        this.target = '.mix';

	        /**
	         * A optional selector string used to add further specificity to the querying of control elements,
	         * in addition to their mandatory data attribute (e.g. `data-filter`, `data-toggle`, `data-sort`).
	         *
	         * This can be used if other elements in your document must contain the above attributes
	         * (e.g. for use in third-party scripts), and would otherwise interfere with MixItUp. Adding
	         * an additional `control` selector of your choice allows MixItUp to restrict event handling
	         * to only those elements matching the defined selector.
	         *
	         * @name        control
	         * @memberof    mixitup.Config.selectors
	         * @instance
	         * @type        {string}
	         * @default     ''
	         *
	         * @example <caption>Example 1: Adding a `selectors.control` selector</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     selectors: {
	         *         control: '.mixitup-control'
	         *     }
	         * });
	         *
	         * // Will not be handled:
	         * // <button data-filter=".category-a"></button>
	         *
	         * // Will be handled:
	         * // <button class="mixitup-control" data-filter=".category-a"></button>
	         */

	        this.control = '';

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigSelectors);

	    mixitup.ConfigSelectors.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigSelectors.prototype.constructor = mixitup.ConfigSelectors;

	    /**
	     * A group of optional render functions for creating and updating elements.
	     *
	     * All render functions receive a data object, and should return a valid HTML string.
	     *
	     * @constructor
	     * @memberof    mixitup.Config
	     * @name        render
	     * @namespace
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.ConfigRender = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A function returning an HTML string representing a target element, or a reference to a
	         * single DOM element.
	         *
	         * The function is invoked as part of the `.dataset()` API, whenever a new item is added
	         * to the dataset, or an item in the dataset changes (if `dataset.dirtyCheck` is enabled).
	         *
	         * The function receives the relevant dataset item as its first parameter.
	         *
	         * @example <caption>Example 1: Using string concatenation</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     render: {
	         *         target: function(item) {
	         *             return (
	         *                 '&lt;div class="mix"&gt;' +
	         *                     '&lt;h2&gt;' + item.title + '&lt;/h2&gt;' +
	         *                 '&lt;/div&gt;'
	         *             );
	         *         }
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Using an ES2015 template literal</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     render: {
	         *         target: function(item) {
	         *             return (
	         *                 `&lt;div class="mix"&gt;
	         *                     &lt;h2&gt;${item.title}&lt;/h2&gt;
	         *                  &lt;/div&gt;`
	         *             );
	         *         }
	         *     }
	         * });
	         *
	         * @example <caption>Example 3: Using a Handlebars template</caption>
	         *
	         * var targetTemplate = Handlebars.compile('&lt;div class="mix"&gt;&lt;h2&gt;{{title}}&lt;/h2&gt;&lt;/div&gt;');
	         *
	         * var mixer = mixitup(containerEl, {
	         *     render: {
	         *         target: targetTemplate
	         *     }
	         * });
	         *
	         * @example <caption>Example 4: Returning a DOM element</caption>
	         *
	         * var mixer = mixitup(containerEl, {
	         *     render: {
	         *         target: function(item) {
	         *              // Create a single element using your framework's built-in renderer
	         *
	         *              var el = ...
	         *
	         *              return el;
	         *         }
	         *     }
	         * });
	         *
	         * @name        target
	         * @memberof    mixitup.Config.render
	         * @instance
	         * @type        {function}
	         * @default     'null'
	         */

	        this.target = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigRender);

	    mixitup.ConfigRender.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigRender.prototype.constructor = mixitup.ConfigRender;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.ConfigTemplates = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ConfigTemplates);

	    mixitup.ConfigTemplates.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ConfigTemplates.prototype.constructor = mixitup.ConfigTemplates;

	    /**
	     * `mixitup.Config` is an interface used for customising the functionality of a
	     * mixer instance. It is organised into several semantically distinct sub-objects,
	     * each one pertaining to a particular aspect of MixItUp functionality.
	     *
	     * An object literal containing any or all of the available properies,
	     * known as the "configuration object", can be passed as the second parameter to
	     * the `mixitup` factory function when creating a mixer instance to customise its
	     * functionality as needed.
	     *
	     * If no configuration object is passed, the mixer instance will take on the default
	     * configuration values detailed below.
	     *
	     * @example <caption>Example 1: Creating and passing the configuration object</caption>
	     * // Create a configuration object with desired values
	     *
	     * var config = {
	     *     animation: {
	     *         enable: false
	     *     },
	     *     selectors: {
	     *         target: '.item'
	     *     }
	     * };
	     *
	     * // Pass the configuration object to the mixitup factory function
	     *
	     * var mixer = mixitup(containerEl, config);
	     *
	     * @example <caption>Example 2: Passing the configuration object inline</caption>
	     * // Typically, the configuration object is passed inline for brevity.
	     *
	     * var mixer = mixitup(containerEl, {
	     *     controls: {
	     *         live: true,
	     *         toggleLogic: 'and'
	     *     }
	     * });
	     *
	     *
	     * @constructor
	     * @memberof    mixitup
	     * @namespace
	     * @public
	     * @since       2.0.0
	     */

	    mixitup.Config = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.animation          = new mixitup.ConfigAnimation();
	        this.behavior           = new mixitup.ConfigBehavior();
	        this.callbacks          = new mixitup.ConfigCallbacks();
	        this.controls           = new mixitup.ConfigControls();
	        this.classNames         = new mixitup.ConfigClassNames();
	        this.data               = new mixitup.ConfigData();
	        this.debug              = new mixitup.ConfigDebug();
	        this.layout             = new mixitup.ConfigLayout();
	        this.load               = new mixitup.ConfigLoad();
	        this.selectors          = new mixitup.ConfigSelectors();
	        this.render             = new mixitup.ConfigRender();
	        this.templates          = new mixitup.ConfigTemplates();

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Config);

	    mixitup.Config.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.Config.prototype.constructor = mixitup.Config;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.MixerDom = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.document               = null;
	        this.body                   = null;
	        this.container              = null;
	        this.parent                 = null;
	        this.targets                = [];

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.MixerDom);

	    mixitup.MixerDom.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.MixerDom.prototype.constructor = mixitup.MixerDom;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.UiClassNames = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.base       = '';
	        this.active     = '';
	        this.disabled   = '';

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.UiClassNames);

	    mixitup.UiClassNames.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.UiClassNames.prototype.constructor = mixitup.UiClassNames;

	    /**
	     * An object into which all arbitrary arguments sent to '.dataset()' are mapped.
	     *
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.CommandDataset = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.dataset = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.CommandDataset);

	    mixitup.CommandDataset.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.CommandDataset.prototype.constructor = mixitup.CommandDataset;

	    /**
	     * An object into which all arbitrary arguments sent to '.multimix()' are mapped.
	     *
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.CommandMultimix = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.filter       = null;
	        this.sort         = null;
	        this.insert       = null;
	        this.remove       = null;
	        this.changeLayout = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.CommandMultimix);

	    mixitup.CommandMultimix.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.CommandMultimix.prototype.constructor = mixitup.CommandMultimix;

	    /**
	     * An object into which all arbitrary arguments sent to '.filter()' are mapped.
	     *
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.CommandFilter = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.selector   = '';
	        this.collection = null;
	        this.action     = 'show'; // enum: ['show', 'hide']

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.CommandFilter);

	    mixitup.CommandFilter.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.CommandFilter.prototype.constructor = mixitup.CommandFilter;

	    /**
	     * An object into which all arbitrary arguments sent to '.sort()' are mapped.
	     *
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.CommandSort = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.sortString = '';
	        this.attribute  = '';
	        this.order      = 'asc';
	        this.collection = null;
	        this.next       = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.CommandSort);

	    mixitup.CommandSort.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.CommandSort.prototype.constructor = mixitup.CommandSort;

	    /**
	     * An object into which all arbitrary arguments sent to '.insert()' are mapped.
	     *
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.CommandInsert = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.index      = 0;
	        this.collection = [];
	        this.position   = 'before'; // enum: ['before', 'after']
	        this.sibling    = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.CommandInsert);

	    mixitup.CommandInsert.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.CommandInsert.prototype.constructor = mixitup.CommandInsert;

	    /**
	     * An object into which all arbitrary arguments sent to '.remove()' are mapped.
	     *
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.CommandRemove = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.targets    = [];
	        this.collection = [];

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.CommandRemove);

	    mixitup.CommandRemove.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.CommandRemove.prototype.constructor = mixitup.CommandRemove;

	    /**
	     * An object into which all arbitrary arguments sent to '.changeLayout()' are mapped.
	     *
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.CommandChangeLayout = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.containerClassName = '';

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.CommandChangeLayout);

	    mixitup.CommandChangeLayout.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.CommandChangeLayout.prototype.constructor = mixitup.CommandChangeLayout;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     * @param       {string}        type
	     * @param       {string}        selector
	     * @param       {boolean}       [live]
	     * @param       {string}        [parent]
	     *     An optional string representing the name of the mixer.dom property containing a reference to a parent element.
	     */

	    mixitup.ControlDefinition = function(type, selector, live, parent) {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.type    = type;
	        this.selector  = selector;
	        this.live      = live || false;
	        this.parent    = parent || '';

	        this.callActions('afterConstruct');

	        h.freeze(this);
	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.ControlDefinition);

	    mixitup.ControlDefinition.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.ControlDefinition.prototype.constructor = mixitup.ControlDefinition;

	    mixitup.controlDefinitions = [];

	    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('multimix', '[data-filter][data-sort]'));
	    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('filter', '[data-filter]'));
	    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('sort', '[data-sort]'));
	    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('toggle', '[data-toggle]'));

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.Control = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.el         = null;
	        this.selector   = '';
	        this.bound      = [];
	        this.pending    = -1;
	        this.type       = '';
	        this.status     = 'inactive'; // enum: ['inactive', 'active', 'disabled', 'live']
	        this.filter     = '';
	        this.sort       = '';
	        this.canDisable = false;
	        this.handler    = null;
	        this.classNames = new mixitup.UiClassNames();

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Control);

	    mixitup.Control.prototype = Object.create(mixitup.Base.prototype);

	    h.extend(mixitup.Control.prototype,
	    /** @lends mixitup.Control */
	    {
	        constructor: mixitup.Control,

	        /**
	         * @private
	         * @param {HTMLElement} el
	         * @param {string}      type
	         * @param {string}      selector
	         */

	        init: function(el, type, selector) {
	            var self = this;

	            this.callActions('beforeInit', arguments);

	            self.el         = el;
	            self.type       = type;
	            self.selector   = selector;

	            if (self.selector) {
	                self.status = 'live';
	            } else {
	                self.canDisable = typeof self.el.disable === 'boolean';

	                switch (self.type) {
	                    case 'filter':
	                        self.filter = self.el.getAttribute('data-filter');

	                        break;
	                    case 'toggle':
	                        self.filter = self.el.getAttribute('data-toggle');

	                        break;
	                    case 'sort':
	                        self.sort   = self.el.getAttribute('data-sort');

	                        break;
	                    case 'multimix':
	                        self.filter = self.el.getAttribute('data-filter');
	                        self.sort   = self.el.getAttribute('data-sort');

	                        break;
	                }
	            }

	            self.bindClick();

	            mixitup.controls.push(self);

	            this.callActions('afterInit', arguments);
	        },

	        /**
	         * @private
	         * @param  {mixitup.Mixer} mixer
	         * @return {boolean}
	         */

	        isBound: function(mixer) {
	            var self    = this,
	                isBound = false;

	            this.callActions('beforeIsBound', arguments);

	            isBound = self.bound.indexOf(mixer) > -1;

	            return self.callFilters('afterIsBound', isBound, arguments);
	        },

	        /**
	         * @private
	         * @param  {mixitup.Mixer} mixer
	         * @return {void}
	         */

	        addBinding: function(mixer) {
	            var self = this;

	            this.callActions('beforeAddBinding', arguments);

	            if (!self.isBound()) {
	                self.bound.push(mixer);
	            }

	            this.callActions('afterAddBinding', arguments);
	        },

	        /**
	         * @private
	         * @param  {mixitup.Mixer} mixer
	         * @return {void}
	         */

	        removeBinding: function(mixer) {
	            var self        = this,
	                removeIndex = -1;

	            this.callActions('beforeRemoveBinding', arguments);

	            if ((removeIndex = self.bound.indexOf(mixer)) > -1) {
	                self.bound.splice(removeIndex, 1);
	            }

	            if (self.bound.length < 1) {
	                // No bindings exist, unbind event click handlers

	                self.unbindClick();

	                // Remove from `mixitup.controls` list

	                removeIndex = mixitup.controls.indexOf(self);

	                mixitup.controls.splice(removeIndex, 1);

	                if (self.status === 'active') {
	                    self.renderStatus(self.el, 'inactive');
	                }
	            }

	            this.callActions('afterRemoveBinding', arguments);
	        },

	        /**
	         * @private
	         * @return {void}
	         */

	        bindClick: function() {
	            var self = this;

	            this.callActions('beforeBindClick', arguments);

	            self.handler = function(e) {
	                self.handleClick(e);
	            };

	            h.on(self.el, 'click', self.handler);

	            this.callActions('afterBindClick', arguments);
	        },

	        /**
	         * @private
	         * @return {void}
	         */

	        unbindClick: function() {
	            var self = this;

	            this.callActions('beforeUnbindClick', arguments);

	            h.off(self.el, 'click', self.handler);

	            self.handler = null;

	            this.callActions('afterUnbindClick', arguments);
	        },

	        /**
	         * @private
	         * @param   {MouseEvent} e
	         * @return  {void}
	         */

	        handleClick: function(e) {
	            var self        = this,
	                button      = null,
	                mixer       = null,
	                isActive    = false,
	                returnValue = void(0),
	                command     = {},
	                clone       = null,
	                commands    = [],
	                i           = -1;

	            this.callActions('beforeHandleClick', arguments);

	            this.pending = 0;

	            mixer = self.bound[0];

	            if (!self.selector) {
	                button = self.el;
	            } else {
	                button = h.closestParent(e.target, mixer.config.selectors.control + self.selector, true, mixer.dom.document);
	            }

	            if (!button) {
	                self.callActions('afterHandleClick', arguments);

	                return;
	            }

	            switch (self.type) {
	                case 'filter':
	                    command.filter = self.filter || button.getAttribute('data-filter');

	                    break;
	                case 'sort':
	                    command.sort = self.sort || button.getAttribute('data-sort');

	                    break;
	                case 'multimix':
	                    command.filter  = self.filter || button.getAttribute('data-filter');
	                    command.sort    = self.sort || button.getAttribute('data-sort');

	                    break;
	                case 'toggle':
	                    command.filter  = self.filter || button.getAttribute('data-toggle');

	                    if (self.status === 'live') {
	                        isActive = h.hasClass(button, self.classNames.active);
	                    } else {
	                        isActive = self.status === 'active';
	                    }

	                    break;
	            }

	            for (i = 0; i < self.bound.length; i++) {
	                // Create a clone of the command for each bound mixer instance

	                clone = new mixitup.CommandMultimix();

	                h.extend(clone, command);

	                commands.push(clone);
	            }

	            commands = self.callFilters('commandsHandleClick', commands, arguments);

	            self.pending = self.bound.length;

	            for (i = 0; mixer = self.bound[i]; i++) {
	                command = commands[i];

	                if (!command) {
	                    // An extension may set a command null to indicate that the click should not be handled

	                    continue;
	                }

	                if (!mixer.lastClicked) {
	                    mixer.lastClicked = button;
	                }

	                mixitup.events.fire('mixClick', mixer.dom.container, {
	                    state: mixer.state,
	                    instance: mixer,
	                    originalEvent: e,
	                    control: mixer.lastClicked
	                }, mixer.dom.document);

	                if (typeof mixer.config.callbacks.onMixClick === 'function') {
	                    returnValue = mixer.config.callbacks.onMixClick.call(mixer.lastClicked, mixer.state, e, mixer);

	                    if (returnValue === false) {
	                        // User has returned `false` from the callback, so do not handle click

	                        continue;
	                    }
	                }

	                if (self.type === 'toggle') {
	                    isActive ? mixer.toggleOff(command.filter) : mixer.toggleOn(command.filter);
	                } else {
	                    mixer.multimix(command);
	                }
	            }

	            this.callActions('afterHandleClick', arguments);
	        },

	        /**
	         * @param   {object}          command
	         * @param   {Array<string>}   toggleArray
	         * @return  {void}
	         */

	        update: function(command, toggleArray) {
	            var self    = this,
	                actions = new mixitup.CommandMultimix();

	            self.callActions('beforeUpdate', arguments);

	            self.pending--;

	            self.pending = Math.max(0, self.pending);

	            if (self.pending > 0) return;

	            if (self.status === 'live') {
	                // Live control (status unknown)

	                self.updateLive(command, toggleArray);
	            } else {
	                // Static control

	                actions.sort    = self.sort;
	                actions.filter  = self.filter;

	                self.callFilters('actionsUpdate', actions, arguments);

	                self.parseStatusChange(self.el, command, actions, toggleArray);
	            }

	            self.callActions('afterUpdate', arguments);
	        },

	        /**
	         * @param   {mixitup.CommandMultimix} command
	         * @param   {Array<string>}           toggleArray
	         * @return  {void}
	         */

	        updateLive: function(command, toggleArray) {
	            var self            = this,
	                controlButtons  = null,
	                actions         = null,
	                button          = null,
	                i               = -1;

	            self.callActions('beforeUpdateLive', arguments);

	            if (!self.el) return;

	            controlButtons = self.el.querySelectorAll(self.selector);

	            for (i = 0; button = controlButtons[i]; i++) {
	                actions = new mixitup.CommandMultimix();

	                switch (self.type) {
	                    case 'filter':
	                        actions.filter = button.getAttribute('data-filter');

	                        break;
	                    case 'sort':
	                        actions.sort = button.getAttribute('data-sort');

	                        break;
	                    case 'multimix':
	                        actions.filter  = button.getAttribute('data-filter');
	                        actions.sort    = button.getAttribute('data-sort');

	                        break;
	                    case 'toggle':
	                        actions.filter  = button.getAttribute('data-toggle');

	                        break;
	                }

	                actions = self.callFilters('actionsUpdateLive', actions, arguments);

	                self.parseStatusChange(button, command, actions, toggleArray);
	            }

	            self.callActions('afterUpdateLive', arguments);
	        },

	        /**
	         * @param   {HTMLElement}             button
	         * @param   {mixitup.CommandMultimix} command
	         * @param   {mixitup.CommandMultimix} actions
	         * @param   {Array<string>}           toggleArray
	         * @return  {void}
	         */

	        parseStatusChange: function(button, command, actions, toggleArray) {
	            var self    = this,
	                alias   = '',
	                toggle  = '',
	                i       = -1;

	            self.callActions('beforeParseStatusChange', arguments);

	            switch (self.type) {
	                case 'filter':
	                    if (command.filter === actions.filter) {
	                        self.renderStatus(button, 'active');
	                    } else {
	                        self.renderStatus(button, 'inactive');
	                    }

	                    break;
	                case 'multimix':
	                    if (command.sort === actions.sort && command.filter === actions.filter) {
	                        self.renderStatus(button, 'active');
	                    } else {
	                        self.renderStatus(button, 'inactive');
	                    }

	                    break;
	                case 'sort':
	                    if (command.sort.match(/:asc/g)) {
	                        alias = command.sort.replace(/:asc/g, '');
	                    }

	                    if (command.sort === actions.sort || alias === actions.sort) {
	                        self.renderStatus(button, 'active');
	                    } else {
	                        self.renderStatus(button, 'inactive');
	                    }

	                    break;
	                case 'toggle':
	                    if (toggleArray.length < 1) self.renderStatus(button, 'inactive');

	                    if (command.filter === actions.filter) {
	                        self.renderStatus(button, 'active');
	                    }

	                    for (i = 0; i < toggleArray.length; i++) {
	                        toggle = toggleArray[i];

	                        if (toggle === actions.filter) {
	                            // Button matches one active toggle

	                            self.renderStatus(button, 'active');

	                            break;
	                        }

	                        self.renderStatus(button, 'inactive');
	                    }

	                    break;
	            }

	            self.callActions('afterParseStatusChange', arguments);
	        },

	        /**
	         * @param   {HTMLElement}   button
	         * @param   {string}        status
	         * @return  {void}
	         */

	        renderStatus: function(button, status) {
	            var self = this;

	            self.callActions('beforeRenderStatus', arguments);

	            switch (status) {
	                case 'active':
	                    h.addClass(button, self.classNames.active);
	                    h.removeClass(button, self.classNames.disabled);

	                    if (self.canDisable) self.el.disabled = false;

	                    break;
	                case 'inactive':
	                    h.removeClass(button, self.classNames.active);
	                    h.removeClass(button, self.classNames.disabled);

	                    if (self.canDisable) self.el.disabled = false;

	                    break;
	                case 'disabled':
	                    if (self.canDisable) self.el.disabled = true;

	                    h.addClass(button, self.classNames.disabled);
	                    h.removeClass(button, self.classNames.active);

	                    break;
	            }

	            if (self.status !== 'live') {
	                // Update the control's status propery if not live

	                self.status = status;
	            }

	            self.callActions('afterRenderStatus', arguments);
	        }
	    });

	    mixitup.controls = [];

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.StyleData = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.x              = 0;
	        this.y              = 0;
	        this.top            = 0;
	        this.right          = 0;
	        this.bottom         = 0;
	        this.left           = 0;
	        this.width          = 0;
	        this.height         = 0;
	        this.marginRight    = 0;
	        this.marginBottom   = 0;
	        this.opacity        = 0;
	        this.scale          = new mixitup.TransformData();
	        this.translateX     = new mixitup.TransformData();
	        this.translateY     = new mixitup.TransformData();
	        this.translateZ     = new mixitup.TransformData();
	        this.rotateX        = new mixitup.TransformData();
	        this.rotateY        = new mixitup.TransformData();
	        this.rotateZ        = new mixitup.TransformData();

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.StyleData);

	    mixitup.StyleData.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.StyleData.prototype.constructor = mixitup.StyleData;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.TransformData = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.value  = 0;
	        this.unit   = '';

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.TransformData);

	    mixitup.TransformData.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.TransformData.prototype.constructor = mixitup.TransformData;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.TransformDefaults = function() {
	        mixitup.StyleData.apply(this);

	        this.callActions('beforeConstruct');

	        this.scale.value        = 0.01;
	        this.scale.unit         = '';

	        this.translateX.value   = 20;
	        this.translateX.unit    = 'px';

	        this.translateY.value   = 20;
	        this.translateY.unit    = 'px';

	        this.translateZ.value   = 20;
	        this.translateZ.unit    = 'px';

	        this.rotateX.value      = 90;
	        this.rotateX.unit       = 'deg';

	        this.rotateY.value      = 90;
	        this.rotateY.unit       = 'deg';

	        this.rotateX.value      = 90;
	        this.rotateX.unit       = 'deg';

	        this.rotateZ.value      = 180;
	        this.rotateZ.unit       = 'deg';

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.TransformDefaults);

	    mixitup.TransformDefaults.prototype = Object.create(mixitup.StyleData.prototype);

	    mixitup.TransformDefaults.prototype.constructor = mixitup.TransformDefaults;

	    /**
	     * @private
	     * @static
	     * @since   3.0.0
	     * @type    {mixitup.TransformDefaults}
	     */

	    mixitup.transformDefaults = new mixitup.TransformDefaults();

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.EventDetail = function() {
	        this.state          = null;
	        this.futureState    = null;
	        this.instance       = null;
	        this.originalEvent  = null;
	    };

	    /**
	     * The `mixitup.Events` class contains all custom events dispatched by MixItUp at various
	     * points within the lifecycle of a mixer operation.
	     *
	     * Each event is analogous to the callback function of the same name defined in
	     * the `callbacks` configuration object, and is triggered immediately before it.
	     *
	     * Events are always triggered from the container element on which MixItUp is instantiated
	     * upon.
	     *
	     * As with any event, registered event handlers receive the event object as a parameter
	     * which includes a `detail` property containting references to the current `state`,
	     * the `mixer` instance, and other event-specific properties described below.
	     *
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.Events = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * A custom event triggered immediately after any MixItUp operation is requested
	         * and before animations have begun.
	         *
	         * The `mixStart` event also exposes a `futureState` property via the
	         * `event.detail` object, which represents the final state of the mixer once
	         * the requested operation has completed.
	         *
	         * @name        mixStart
	         * @memberof    mixitup.Events
	         * @static
	         * @type        {CustomEvent}
	         */

	        this.mixStart = null;

	        /**
	         * A custom event triggered when a MixItUp operation is requested while another
	         * operation is in progress, and the animation queue is full, or queueing
	         * is disabled.
	         *
	         * @name        mixBusy
	         * @memberof    mixitup.Events
	         * @static
	         * @type        {CustomEvent}
	         */

	        this.mixBusy = null;

	        /**
	         * A custom event triggered after any MixItUp operation has completed, and the
	         * state has been updated.
	         *
	         * @name        mixEnd
	         * @memberof    mixitup.Events
	         * @static
	         * @type        {CustomEvent}
	         */

	        this.mixEnd = null;

	        /**
	         * A custom event triggered whenever a filter operation "fails", i.e. no targets
	         * could be found matching the requested filter.
	         *
	         * @name        mixFail
	         * @memberof    mixitup.Events
	         * @static
	         * @type        {CustomEvent}
	         */

	        this.mixFail = null;

	        /**
	         * A custom event triggered whenever a MixItUp control is clicked, and before its
	         * respective operation is requested.
	         *
	         * This event also exposes an `originalEvent` property via the `event.detail`
	         * object, which holds a reference to the original click event.
	         *
	         * @name        mixClick
	         * @memberof    mixitup.Events
	         * @static
	         * @type        {CustomEvent}
	         */

	        this.mixClick = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Events);

	    mixitup.Events.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.Events.prototype.constructor = mixitup.Events;

	    /**
	     * @private
	     * @param   {string}      eventType
	     * @param   {Element}     el
	     * @param   {object}      detail
	     * @param   {Document}    [doc]
	     */

	    mixitup.Events.prototype.fire = function(eventType, el, detail, doc) {
	        var self        = this,
	            event       = null,
	            eventDetail = new mixitup.EventDetail();

	        self.callActions('beforeFire', arguments);

	        if (typeof self[eventType] === 'undefined') {
	            throw new Error('Event type "' + eventType + '" not found.');
	        }

	        eventDetail.state = new mixitup.State();

	        h.extend(eventDetail.state, detail.state);

	        if (detail.futureState) {
	            eventDetail.futureState = new mixitup.State();

	            h.extend(eventDetail.futureState, detail.futureState);
	        }

	        eventDetail.instance = detail.instance;

	        if (detail.originalEvent) {
	            eventDetail.originalEvent = detail.originalEvent;
	        }

	        event = h.getCustomEvent(eventType, eventDetail, doc);

	        self.callFilters('eventFire', event, arguments);

	        el.dispatchEvent(event);
	    };

	    // Asign a singleton instance to `mixitup.events`:

	    mixitup.events = new mixitup.Events();

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.QueueItem = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.args           = [];
	        this.instruction    = null;
	        this.triggerElement = null;
	        this.deferred       = null;
	        this.isToggling     = false;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.QueueItem);

	    mixitup.QueueItem.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.QueueItem.prototype.constructor = mixitup.QueueItem;

	    /**
	     * The `mixitup.Mixer` class is used to hold discreet, user-configured
	     * instances of MixItUp on a provided container element.
	     *
	     * Mixer instances are returned whenever the `mixitup()` factory function is called,
	     * which expose a range of methods enabling API-based filtering, sorting,
	     * insertion, removal and more.
	     *
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.Mixer = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.config            = new mixitup.Config();

	        this.id                = '';

	        this.isBusy            = false;
	        this.isToggling        = false;
	        this.incPadding        = true;

	        this.controls          = [];
	        this.targets           = [];
	        this.origOrder         = [];
	        this.cache             = {};

	        this.toggleArray       = [];

	        this.targetsMoved      = 0;
	        this.targetsImmovable  = 0;
	        this.targetsBound      = 0;
	        this.targetsDone       = 0;

	        this.staggerDuration   = 0;
	        this.effectsIn         = null;
	        this.effectsOut        = null;
	        this.transformIn       = [];
	        this.transformOut      = [];
	        this.queue             = [];

	        this.state             = null;
	        this.lastOperation     = null;
	        this.lastClicked       = null;
	        this.userCallback      = null;
	        this.userDeferred      = null;

	        this.dom               = new mixitup.MixerDom();

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Mixer);

	    mixitup.Mixer.prototype = Object.create(mixitup.Base.prototype);

	    h.extend(mixitup.Mixer.prototype,
	    /** @lends mixitup.Mixer */
	    {
	        constructor: mixitup.Mixer,

	        /**
	         * @private
	         * @instance
	         * @since 3.0.0
	         * @param {HTMLElement} container
	         * @param {HTMLElement} document
	         * @param {string}      id
	         * @param {object}      [config]
	         */

	        attach: function(container, document, id, config) {
	            var self    = this,
	                target  = null,
	                i       = -1;

	            self.callActions('beforeAttach', arguments);

	            self.id = id;

	            if (config) {
	                h.extend(self.config, config, true, true);
	            }

	            self.sanitizeConfig();

	            self.cacheDom(container, document);

	            if (self.config.layout.containerClassName) {
	                h.addClass(self.dom.container, self.config.layout.containerClassName);
	            }

	            if (!mixitup.features.has.transitions) {
	                self.config.animation.enable = false;
	            }

	            if (typeof window.console === 'undefined') {
	                self.config.debug.showWarnings = false;
	            }

	            if (self.config.data.uidKey) {
	                // If the dataset API is in use, force disable controls

	                self.config.controls.enable = false;
	            }

	            self.indexTargets();

	            self.state = self.getInitialState();

	            for (i = 0; target = self.lastOperation.toHide[i]; i++) {
	                target.hide();
	            }

	            if (self.config.controls.enable) {
	                self.initControls();

	                self.buildToggleArray(null, self.state);

	                self.updateControls({
	                    filter: self.state.activeFilter,
	                    sort: self.state.activeSort
	                });
	            }

	            self.parseEffects();

	            self.callActions('afterAttach', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since 3.0.0
	         * @return {void}
	         */

	        sanitizeConfig: function() {
	            var self = this;

	            self.callActions('beforeSanitizeConfig', arguments);

	            // Sanitize enum/string config options

	            self.config.controls.scope          = self.config.controls.scope.toLowerCase().trim();
	            self.config.controls.toggleLogic    = self.config.controls.toggleLogic.toLowerCase().trim();
	            self.config.controls.toggleDefault  = self.config.controls.toggleDefault.toLowerCase().trim();

	            self.config.animation.effects       = self.config.animation.effects.trim();

	            self.callActions('afterSanitizeConfig', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @return  {mixitup.State}
	         */

	        getInitialState: function() {
	            var self        = this,
	                state       = new mixitup.State(),
	                operation   = new mixitup.Operation();

	            self.callActions('beforeGetInitialState', arguments);

	            // Map initial values into a mock state object in order to construct an operation

	            state.activeContainerClassName = self.config.layout.containerClassName;

	            if (self.config.load.dataset) {
	                // Dataset API

	                if (!self.config.data.uidKey || typeof self.config.data.uidKey !== 'string') {
	                    throw new TypeError(mixitup.messages.errorConfigDataUidKeyNotSet());
	                }

	                operation.startDataset = operation.newDataset = state.activeDataset = self.config.load.dataset.slice();
	                operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;
	                operation.show = self.targets.slice();

	                state = self.callFilters('stateGetInitialState', state, arguments);
	            } else {
	                // DOM API

	                state.activeFilter              = self.parseFilterArgs([self.config.load.filter]).command;
	                state.activeSort                = self.parseSortArgs([self.config.load.sort]).command;
	                state.totalTargets              = self.targets.length;

	                state = self.callFilters('stateGetInitialState', state, arguments);

	                if (
	                    state.activeSort.collection || state.activeSort.attribute ||
	                    state.activeSort.order === 'random' || state.activeSort.order === 'desc'
	                ) {
	                    // Sorting on load

	                    operation.newSort = state.activeSort;

	                    self.sortOperation(operation);

	                    self.printSort(false, operation);

	                    self.targets = operation.newOrder;
	                } else {
	                    operation.startOrder = operation.newOrder = self.targets;
	                }

	                operation.startFilter               = operation.newFilter               = state.activeFilter;
	                operation.startSort                 = operation.newSort                 = state.activeSort;
	                operation.startContainerClassName   = operation.newContainerClassName   = state.activeContainerClassName;

	                if (operation.newFilter.selector === 'all') {
	                    operation.newFilter.selector = self.config.selectors.target;
	                } else if (operation.newFilter.selector === 'none') {
	                    operation.newFilter.selector = '';
	                }
	            }

	            operation = self.callFilters('operationGetInitialState', operation, [state]);

	            self.lastOperation = operation;

	            if (operation.newFilter) {
	                self.filterOperation(operation);
	            }

	            state = self.buildState(operation);

	            return state;
	        },

	        /**
	         * Caches references of DOM elements neccessary for the mixer's functionality.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {HTMLElement}       el
	         * @param   {HTMLHtmlElement}   document
	         * @return  {void}
	         */

	        cacheDom: function(el, document) {
	            var self    = this;

	            self.callActions('beforeCacheDom', arguments);

	            self.dom.document  = document;
	            self.dom.body      = self.dom.document.querySelector('body');
	            self.dom.container = el;
	            self.dom.parent    = el;

	            self.callActions('afterCacheDom', arguments);
	        },

	        /**
	         * Indexes all child elements of the mixer matching the `selectors.target`
	         * selector, instantiating a mixitup.Target for each one.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @return  {void}
	         */

	        indexTargets: function() {
	            var self            = this,
	                target          = null,
	                el              = null,
	                dataset         = null,
	                i               = -1;

	            self.callActions('beforeIndexTargets', arguments);

	            self.dom.targets = self.config.layout.allowNestedTargets ?
	                self.dom.container.querySelectorAll(self.config.selectors.target) :
	                h.children(self.dom.container, self.config.selectors.target, self.dom.document);

	            self.dom.targets = h.arrayFromList(self.dom.targets);

	            self.targets = [];

	            if ((dataset = self.config.load.dataset) && dataset.length !== self.dom.targets.length) {
	                throw new Error(mixitup.messages.errorDatasetPrerenderedMismatch());
	            }

	            if (self.dom.targets.length) {
	                for (i = 0; el = self.dom.targets[i]; i++) {
	                    target = new mixitup.Target();

	                    target.init(el, self, dataset ? dataset[i] : void(0));

	                    target.isInDom = true;

	                    self.targets.push(target);
	                }

	                self.dom.parent = self.dom.targets[0].parentElement === self.dom.container ?
	                    self.dom.container :
	                    self.dom.targets[0].parentElement;
	            }

	            self.origOrder = self.targets;

	            self.callActions('afterIndexTargets', arguments);
	        },

	        initControls: function() {
	            var self                = this,
	                definition          = '',
	                controlElements     = null,
	                el                  = null,
	                parent              = null,
	                delagators          = null,
	                control             = null,
	                i                   = -1,
	                j                   = -1;

	            self.callActions('beforeInitControls', arguments);

	            switch (self.config.controls.scope) {
	                case 'local':
	                    parent = self.dom.container;

	                    break;
	                case 'global':
	                    parent = self.dom.document;

	                    break;
	                default:
	                    throw new Error(mixitup.messages.errorConfigInvalidControlsScope());
	            }

	            for (i = 0; definition = mixitup.controlDefinitions[i]; i++) {
	                if (self.config.controls.live || definition.live) {
	                    if (definition.parent) {
	                        delagators = self.dom[definition.parent];

	                        if (!delagators || delagators.length < 0) continue;

	                        if (typeof delagators.length !== 'number') {
	                            delagators = [delagators];
	                        }
	                    } else {
	                        delagators = [parent];
	                    }

	                    for (j = 0; (el = delagators[j]); j++) {
	                        control = self.getControl(el,  definition.type, definition.selector);

	                        self.controls.push(control);
	                    }
	                } else {
	                    controlElements = parent.querySelectorAll(self.config.selectors.control + definition.selector);

	                    for (j = 0; (el = controlElements[j]); j++) {
	                        control = self.getControl(el, definition.type, '');

	                        if (!control) continue;

	                        self.controls.push(control);
	                    }
	                }
	            }

	            self.callActions('afterInitControls', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {HTMLElement} el
	         * @param   {string}      type
	         * @param   {string}      selector
	         * @return  {mixitup.Control|null}
	         */

	        getControl: function(el, type, selector) {
	            var self    = this,
	                control = null,
	                i       = -1;

	            self.callActions('beforeGetControl', arguments);

	            if (!selector) {
	                // Static controls only

	                for (i = 0; control = mixitup.controls[i]; i++) {
	                    if (control.el === el && control.isBound(self)) {
	                        // Control already bound to this mixer (as another type).

	                        // NB: This prevents duplicate controls from being registered where a selector
	                        // might collide, eg: "[data-filter]" and "[data-filter][data-sort]"

	                        return self.callFilters('controlGetControl', null, arguments);
	                    } else if (control.el === el && control.type === type && control.selector === selector) {
	                        // Another mixer is already using this control, add this mixer as a binding

	                        control.addBinding(self);

	                        return self.callFilters('controlGetControl', control, arguments);
	                    }
	                }
	            }

	            // Create new control

	            control = new mixitup.Control();

	            control.init(el, type, selector);

	            control.classNames.base     = h.getClassname(self.config.classNames, type);
	            control.classNames.active   = h.getClassname(self.config.classNames, type, self.config.classNames.modifierActive);
	            control.classNames.disabled = h.getClassname(self.config.classNames, type, self.config.classNames.modifierDisabled);

	            // Add a reference to this mixer as a binding

	            control.addBinding(self);

	            return self.callFilters('controlGetControl', control, arguments);
	        },

	        /**
	         * Creates a compound selector by joining the `toggleArray` value as per the
	         * defined toggle logic.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @return  {string}
	         */

	        getToggleSelector: function() {
	            var self            = this,
	                delineator      = self.config.controls.toggleLogic === 'or' ? ', ' : '',
	                toggleSelector  = '';

	            self.callActions('beforeGetToggleSelector', arguments);

	            self.toggleArray = h.clean(self.toggleArray);

	            toggleSelector = self.toggleArray.join(delineator);

	            if (toggleSelector === '') {
	                toggleSelector = self.config.controls.toggleDefault;
	            }

	            return self.callFilters('selectorGetToggleSelector', toggleSelector, arguments);
	        },

	        /**
	         * Breaks compound selector strings in an array of discreet selectors,
	         * as per the active `controls.toggleLogic` configuration option. Accepts
	         * either a dynamic command object, or a state object.
	         *
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {object}        [command]
	         * @param   {mixitup.State} [state]
	         * @return  {void}
	         */

	        buildToggleArray: function(command, state) {
	            var self                    = this,
	                activeFilterSelector    = '';

	            self.callActions('beforeBuildToggleArray', arguments);

	            if (command && command.filter) {
	                activeFilterSelector = command.filter.selector.replace(/\s/g, '');
	            } else if (state) {
	                activeFilterSelector = state.activeFilter.selector.replace(/\s/g, '');
	            } else {
	                return;
	            }

	            if (activeFilterSelector === self.config.selectors.target || activeFilterSelector === 'all') {
	                activeFilterSelector = '';
	            }

	            if (self.config.controls.toggleLogic === 'or') {
	                self.toggleArray = activeFilterSelector.split(',');
	            } else {
	                self.toggleArray = self.splitCompoundSelector(activeFilterSelector);
	            }

	            self.toggleArray = h.clean(self.toggleArray);

	            self.callActions('afterBuildToggleArray', arguments);
	        },

	        /**
	         * Takes a compound selector (e.g. `.cat-1.cat-2`, `[data-cat="1"][data-cat="2"]`)
	         * and breaks into its individual selectors.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {string} compoundSelector
	         * @return  {string[]}
	         */

	        splitCompoundSelector: function(compoundSelector) {
	            // Break at a `.` or `[`, capturing the delineator

	            var partials    = compoundSelector.split(/([\.\[])/g),
	                toggleArray = [],
	                selector    = '',
	                i           = -1;

	            if (partials[0] === '') {
	                partials.shift();
	            }

	            for (i = 0; i < partials.length; i++) {
	                if (i % 2 === 0) {
	                    selector = '';
	                }

	                selector += partials[i];

	                if (i % 2 !== 0) {
	                    toggleArray.push(selector);
	                }
	            }

	            return toggleArray;
	        },

	        /**
	         * Updates controls to their active/inactive state based on the command or
	         * current state of the mixer.
	         *
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {object} command
	         * @return  {void}
	         */

	        updateControls: function(command) {
	            var self    = this,
	                control = null,
	                output  = new mixitup.CommandMultimix(),
	                i       = -1;

	            self.callActions('beforeUpdateControls', arguments);

	            // Sanitise to defaults

	            if (command.filter) {
	                output.filter = command.filter.selector;
	            } else {
	                output.filter = self.state.activeFilter.selector;
	            }

	            if (command.sort) {
	                output.sort = self.buildSortString(command.sort);
	            } else {
	                output.sort = self.buildSortString(self.state.activeSort);
	            }

	            if (output.filter === self.config.selectors.target) {
	                output.filter = 'all';
	            }

	            if (output.filter === '') {
	                output.filter = 'none';
	            }

	            h.freeze(output);

	            for (i = 0; control = self.controls[i]; i++) {
	                control.update(output, self.toggleArray);
	            }

	            self.callActions('afterUpdateControls', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {mixitup.CommandSort}   command
	         * @return  {string}
	         */

	        buildSortString: function(command) {
	            var self    = this;
	            var output  = '';

	            output += command.sortString;

	            if (command.next) {
	                output += ' ' + self.buildSortString(command.next);
	            }

	            return output;
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {object}        command
	         * @param   {Operation}     operation
	         * @return  {Promise.<mixitup.State>}
	         */

	        insertTargets: function(command, operation) {
	            var self            = this,
	                nextSibling     = null,
	                insertionIndex  = -1,
	                frag            = null,
	                target          = null,
	                el              = null,
	                i               = -1;

	            self.callActions('beforeInsertTargets', arguments);

	            if (typeof command.index === 'undefined') command.index = 0;

	            nextSibling = self.getNextSibling(command.index, command.sibling, command.position);
	            frag        = self.dom.document.createDocumentFragment();

	            if (nextSibling) {
	                insertionIndex = h.index(nextSibling, self.config.selectors.target);
	            } else {
	                insertionIndex = self.targets.length;
	            }

	            if (command.collection) {
	                for (i = 0; el = command.collection[i]; i++) {
	                    if (self.dom.targets.indexOf(el) > -1) {
	                        throw new Error(mixitup.messages.errorInsertPreexistingElement());
	                    }

	                    // Ensure elements are hidden when they are added to the DOM, so they can
	                    // be animated in gracefully

	                    el.style.display = 'none';

	                    frag.appendChild(el);
	                    frag.appendChild(self.dom.document.createTextNode(' '));

	                    if (!h.isElement(el, self.dom.document) || !el.matches(self.config.selectors.target)) continue;

	                    target = new mixitup.Target();

	                    target.init(el, self);

	                    target.isInDom = true;

	                    self.targets.splice(insertionIndex, 0, target);

	                    insertionIndex++;
	                }

	                self.dom.parent.insertBefore(frag, nextSibling);
	            }

	            // Since targets have been added, the original order must be updated

	            operation.startOrder = self.origOrder = self.targets;

	            self.callActions('afterInsertTargets', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Number}      [index]
	         * @param   {Element}     [sibling]
	         * @param   {string}      [position]
	         * @return  {Element}
	         */

	        getNextSibling: function(index, sibling, position) {
	            var self    = this,
	                element = null;

	            index = Math.max(index, 0);

	            if (sibling && position === 'before') {
	                // Explicit sibling

	                element = sibling;
	            } else if (sibling && position === 'after') {
	                // Explicit sibling

	                element = sibling.nextElementSibling || null;
	            } else if (self.targets.length > 0 && typeof index !== 'undefined') {
	                // Index and targets exist

	                element = (index < self.targets.length || !self.targets.length) ?
	                    self.targets[index].dom.el :
	                    self.targets[self.targets.length - 1].dom.el.nextElementSibling;
	            } else if (self.targets.length === 0 && self.dom.parent.children.length > 0) {
	                // No targets but other siblings

	                if (self.config.layout.siblingAfter) {
	                    element = self.config.layout.siblingAfter;
	                } else if (self.config.layout.siblingBefore) {
	                    element = self.config.layout.siblingBefore.nextElementSibling;
	                } else {
	                    self.dom.parent.children[0];
	                }
	            } else ;

	            return self.callFilters('elementGetNextSibling', element, arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        filterOperation: function(operation) {
	            var self        = this,
	                testResult  = false,
	                index       = -1,
	                action      = '',
	                target      = null,
	                i           = -1;

	            self.callActions('beforeFilterOperation', arguments);

	            action = operation.newFilter.action;

	            for (i = 0; target = operation.newOrder[i]; i++) {
	                if (operation.newFilter.collection) {
	                    // show via collection

	                    testResult = operation.newFilter.collection.indexOf(target.dom.el) > -1;
	                } else {
	                    // show via selector

	                    if (operation.newFilter.selector === '') {
	                        testResult = false;
	                    } else {
	                        testResult = target.dom.el.matches(operation.newFilter.selector);
	                    }
	                }

	                self.evaluateHideShow(testResult, target, action, operation);
	            }

	            if (operation.toRemove.length) {
	                for (i = 0; target = operation.show[i]; i++) {
	                    if (operation.toRemove.indexOf(target) > -1) {
	                        // If any shown targets should be removed, move them into the toHide array

	                        operation.show.splice(i, 1);

	                        if ((index = operation.toShow.indexOf(target)) > -1) {
	                            operation.toShow.splice(index, 1);
	                        }

	                        operation.toHide.push(target);
	                        operation.hide.push(target);

	                        i--;
	                    }
	                }
	            }

	            operation.matching = operation.show.slice();

	            if (operation.show.length === 0 && operation.newFilter.selector !== '' && self.targets.length !== 0) {
	                operation.hasFailed = true;
	            }

	            self.callActions('afterFilterOperation', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {boolean}   testResult
	         * @param   {Element}   target
	         * @param   {string}    action
	         * @param   {Operation} operation
	         * @return  {void}
	         */

	        evaluateHideShow: function(testResult, target, action, operation) {
	            var self = this,
	                filteredTestResult = false,
	                args = Array.prototype.slice.call(arguments, 1);

	            filteredTestResult = self.callFilters('testResultEvaluateHideShow', testResult, args);

	            self.callActions('beforeEvaluateHideShow', arguments);

	            if (
	                filteredTestResult === true && action === 'show' ||
	                filteredTestResult === false && action === 'hide'
	            ) {
	                operation.show.push(target);

	                !target.isShown && operation.toShow.push(target);
	            } else {
	                operation.hide.push(target);

	                target.isShown && operation.toHide.push(target);
	            }

	            self.callActions('afterEvaluateHideShow', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        sortOperation: function(operation) {
	            var self     = this,
	                newOrder = [],
	                target   = null,
	                el       = null,
	                i        = -1;

	            self.callActions('beforeSortOperation', arguments);

	            operation.startOrder = self.targets;

	            if (operation.newSort.collection) {
	                // Sort by collection

	                newOrder = [];

	                for (i = 0; (el = operation.newSort.collection[i]); i++) {
	                    if (self.dom.targets.indexOf(el) < 0) {
	                        throw new Error(mixitup.messages.errorSortNonExistentElement());
	                    }

	                    target = new mixitup.Target();

	                    target.init(el, self);

	                    target.isInDom = true;

	                    newOrder.push(target);
	                }

	                operation.newOrder = newOrder;
	            } else if (operation.newSort.order === 'random') {
	                // Sort random

	                operation.newOrder = h.arrayShuffle(operation.startOrder);
	            } else if (operation.newSort.attribute === '') {
	                // Sort by default

	                operation.newOrder = self.origOrder.slice();

	                if (operation.newSort.order === 'desc') {
	                    operation.newOrder.reverse();
	                }
	            } else {
	                // Sort by attribute

	                operation.newOrder = operation.startOrder.slice();

	                operation.newOrder.sort(function(a, b) {
	                    return self.compare(a, b, operation.newSort);
	                });
	            }

	            if (h.isEqualArray(operation.newOrder, operation.startOrder)) {
	                operation.willSort = false;
	            }

	            self.callActions('afterSortOperation', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {mixitup.Target}        a
	         * @param   {mixitup.Target}        b
	         * @param   {mixitup.CommandSort}   command
	         * @return  {Number}
	         */

	        compare: function(a, b, command) {
	            var self        = this,
	                order       = command.order,
	                attrA       = self.getAttributeValue(a, command.attribute),
	                attrB       = self.getAttributeValue(b, command.attribute);

	            if (isNaN(attrA * 1) || isNaN(attrB * 1)) {
	                attrA = attrA.toLowerCase();
	                attrB = attrB.toLowerCase();
	            } else {
	                attrA = attrA * 1;
	                attrB = attrB * 1;
	            }

	            if (attrA < attrB) {
	                return order === 'asc' ? -1 : 1;
	            }

	            if (attrA > attrB) {
	                return order === 'asc' ? 1 : -1;
	            }

	            if (attrA === attrB && command.next) {
	                return self.compare(a, b, command.next);
	            }

	            return 0;
	        },

	        /**
	         * Reads the values of any data attributes present the provided target element
	         * which match the current sort command.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {mixitup.Target}    target
	         * @param   {string}            [attribute]
	         * @return  {(String|Number)}
	         */

	        getAttributeValue: function(target, attribute) {
	            var self    = this,
	                value   = '';

	            value = target.dom.el.getAttribute('data-' + attribute);

	            if (value === null) {
	                if (self.config.debug.showWarnings) {
	                    // Encourage users to assign values to all targets to avoid erroneous sorting
	                    // when types are mixed

	                    console.warn(mixitup.messages.warningInconsistentSortingAttributes({
	                        attribute: 'data-' + attribute
	                    }));
	                }
	            }

	            // If an attribute is not present, return 0 as a safety value

	            return self.callFilters('valueGetAttributeValue', value || 0, arguments);
	        },

	        /**
	         * Inserts elements into the DOM in the appropriate
	         * order using a document fragment for minimal
	         * DOM thrashing
	         *
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {boolean}   isResetting
	         * @param   {Operation} operation
	         * @return  {void}
	         */

	        printSort: function(isResetting, operation) {
	            var self        = this,
	                startOrder  = isResetting ? operation.newOrder : operation.startOrder,
	                newOrder    = isResetting ? operation.startOrder : operation.newOrder,
	                nextSibling = startOrder.length ? startOrder[startOrder.length - 1].dom.el.nextElementSibling : null,
	                frag        = window.document.createDocumentFragment(),
	                whitespace  = null,
	                target      = null,
	                el          = null,
	                i           = -1;

	            self.callActions('beforePrintSort', arguments);

	            // Empty the container

	            for (i = 0; target = startOrder[i]; i++) {
	                el = target.dom.el;

	                if (el.style.position === 'absolute') continue;

	                h.removeWhitespace(el.previousSibling);

	                el.parentElement.removeChild(el);
	            }

	            whitespace = nextSibling ? nextSibling.previousSibling : self.dom.parent.lastChild;

	            if (whitespace && whitespace.nodeName === '#text') {
	                h.removeWhitespace(whitespace);
	            }

	            for (i = 0; target = newOrder[i]; i++) {
	                // Add targets into a document fragment

	                el = target.dom.el;

	                if (h.isElement(frag.lastChild)) {
	                    frag.appendChild(window.document.createTextNode(' '));
	                }

	                frag.appendChild(el);
	            }

	            // Insert the document fragment into the container
	            // before any other non-target elements

	            if (self.dom.parent.firstChild && self.dom.parent.firstChild !== nextSibling) {
	                frag.insertBefore(window.document.createTextNode(' '), frag.childNodes[0]);
	            }

	            if (nextSibling) {
	                frag.appendChild(window.document.createTextNode(' '));

	                self.dom.parent.insertBefore(frag, nextSibling);
	            } else {
	                self.dom.parent.appendChild(frag);
	            }

	            self.callActions('afterPrintSort', arguments);
	        },

	        /**
	         * Parses user-defined sort strings (i.e. `default:asc`) into sort commands objects.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {string}                sortString
	         * @param   {mixitup.CommandSort}   command
	         * @return  {mixitup.CommandSort}
	         */

	        parseSortString: function(sortString, command) {
	            var self        = this,
	                rules       = sortString.split(' '),
	                current     = command,
	                rule        = [],
	                i           = -1;

	            // command.sortString = sortString;

	            for (i = 0; i < rules.length; i++) {
	                rule = rules[i].split(':');

	                current.sortString  = rules[i];
	                current.attribute   = h.dashCase(rule[0]);
	                current.order       = rule[1] || 'asc';

	                switch (current.attribute) {
	                    case 'default':
	                        // treat "default" as sorting by no attribute

	                        current.attribute = '';

	                        break;
	                    case 'random':
	                        // treat "random" as an order not an attribute

	                        current.attribute   = '';
	                        current.order       = 'random';

	                        break;
	                }

	                if (!current.attribute || current.order === 'random') break;

	                if (i < rules.length - 1) {
	                    // Embed reference to the next command

	                    current.next = new mixitup.CommandSort();

	                    h.freeze(current);

	                    current = current.next;
	                }
	            }

	            return self.callFilters('commandsParseSort', command, arguments);
	        },

	        /**
	         * Parses all effects out of the user-defined `animation.effects` string into
	         * their respective properties and units.
	         *
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @return  {void}
	         */

	        parseEffects: function() {
	            var self            = this,
	                transformName   = '',
	                effectsIn       = self.config.animation.effectsIn || self.config.animation.effects,
	                effectsOut      = self.config.animation.effectsOut || self.config.animation.effects;

	            self.callActions('beforeParseEffects', arguments);

	            self.effectsIn      = new mixitup.StyleData();
	            self.effectsOut     = new mixitup.StyleData();
	            self.transformIn    = [];
	            self.transformOut   = [];

	            self.effectsIn.opacity = self.effectsOut.opacity = 1;

	            self.parseEffect('fade', effectsIn, self.effectsIn, self.transformIn);
	            self.parseEffect('fade', effectsOut, self.effectsOut, self.transformOut, true);

	            for (transformName in mixitup.transformDefaults) {
	                if (!(mixitup.transformDefaults[transformName] instanceof mixitup.TransformData)) {
	                    continue;
	                }

	                self.parseEffect(transformName, effectsIn, self.effectsIn, self.transformIn);
	                self.parseEffect(transformName, effectsOut, self.effectsOut, self.transformOut, true);
	            }

	            self.parseEffect('stagger', effectsIn, self.effectsIn, self.transformIn);
	            self.parseEffect('stagger', effectsOut, self.effectsOut, self.transformOut, true);

	            self.callActions('afterParseEffects', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {string}    effectName
	         * @param   {string}    effectString
	         * @param   {StyleData} effects
	         * @param   {String[]}  transform
	         * @param   {boolean}   [isOut]
	         */

	        parseEffect: function(effectName, effectString, effects, transform, isOut) {
	            var self        = this,
	                re          = /\(([^)]+)\)/,
	                propIndex   = -1,
	                str         = '',
	                match       = [],
	                val         = '',
	                units       = ['%', 'px', 'em', 'rem', 'vh', 'vw', 'deg'],
	                unit        = '',
	                i           = -1;

	            self.callActions('beforeParseEffect', arguments);

	            if (typeof effectString !== 'string') {
	                throw new TypeError(mixitup.messages.errorConfigInvalidAnimationEffects());
	            }

	            if (effectString.indexOf(effectName) < 0) {
	                // The effect is not present in the effects string

	                if (effectName === 'stagger') {
	                    // Reset stagger to 0

	                    self.staggerDuration = 0;
	                }

	                return;
	            }

	            // The effect is present

	            propIndex = effectString.indexOf(effectName + '(');

	            if (propIndex > -1) {
	                // The effect has a user defined value in parentheses

	                // Extract from the first parenthesis to the end of string

	                str = effectString.substring(propIndex);

	                // Match any number of characters between "(" and ")"

	                match = re.exec(str);

	                val = match[1];
	            }

	            switch (effectName) {
	                case 'fade':
	                    effects.opacity = val ? parseFloat(val) : 0;

	                    break;
	                case 'stagger':
	                    self.staggerDuration = val ? parseFloat(val) : 100;

	                    // TODO: Currently stagger must be applied globally, but
	                    // if seperate values are specified for in/out, this should
	                    // be respected

	                    break;
	                default:
	                    // All other effects are transforms following the same structure

	                    if (isOut && self.config.animation.reverseOut && effectName !== 'scale') {
	                        effects[effectName].value =
	                            (val ? parseFloat(val) : mixitup.transformDefaults[effectName].value) * -1;
	                    } else {
	                        effects[effectName].value =
	                            (val ? parseFloat(val) : mixitup.transformDefaults[effectName].value);
	                    }

	                    if (val) {
	                        for (i = 0; unit = units[i]; i++) {
	                            if (val.indexOf(unit) > -1) {
	                                effects[effectName].unit = unit;

	                                break;
	                            }
	                        }
	                    } else {
	                        effects[effectName].unit = mixitup.transformDefaults[effectName].unit;
	                    }

	                    transform.push(
	                        effectName +
	                        '(' +
	                        effects[effectName].value +
	                        effects[effectName].unit +
	                        ')'
	                    );
	            }

	            self.callActions('afterParseEffect', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {State}
	         */

	        buildState: function(operation) {
	            var self        = this,
	                state       = new mixitup.State(),
	                target      = null,
	                i           = -1;

	            self.callActions('beforeBuildState', arguments);

	            // Map target elements into state arrays.
	            // the real target objects should never be exposed

	            for (i = 0; target = self.targets[i]; i++) {
	                if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
	                    state.targets.push(target.dom.el);
	                }
	            }

	            for (i = 0; target = operation.matching[i]; i++) {
	                state.matching.push(target.dom.el);
	            }

	            for (i = 0; target = operation.show[i]; i++) {
	                state.show.push(target.dom.el);
	            }

	            for (i = 0; target = operation.hide[i]; i++) {
	                if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
	                    state.hide.push(target.dom.el);
	                }
	            }

	            state.id                        = self.id;
	            state.container                 = self.dom.container;
	            state.activeFilter              = operation.newFilter;
	            state.activeSort                = operation.newSort;
	            state.activeDataset             = operation.newDataset;
	            state.activeContainerClassName  = operation.newContainerClassName;
	            state.hasFailed                 = operation.hasFailed;
	            state.totalTargets              = self.targets.length;
	            state.totalShow                 = operation.show.length;
	            state.totalHide                 = operation.hide.length;
	            state.totalMatching             = operation.matching.length;
	            state.triggerElement            = operation.triggerElement;

	            return self.callFilters('stateBuildState', state, arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {boolean}   shouldAnimate
	         * @param   {Operation} operation
	         * @return  {void}
	         */

	        goMix: function(shouldAnimate, operation) {
	            var self        = this,
	                deferred    = null;

	            self.callActions('beforeGoMix', arguments);

	            // If the animation duration is set to 0ms,
	            // or no effects specified,
	            // or the container is hidden
	            // then abort animation

	            if (
	                !self.config.animation.duration || !self.config.animation.effects || !h.isVisible(self.dom.container)
	            ) {
	                shouldAnimate = false;
	            }

	            if (
	                !operation.toShow.length &&
	                !operation.toHide.length &&
	                !operation.willSort &&
	                !operation.willChangeLayout
	            ) {
	                // If nothing to show or hide, and not sorting or
	                // changing layout

	                shouldAnimate = false;
	            }

	            if (
	                !operation.startState.show.length &&
	                !operation.show.length
	            ) {
	                // If nothing currently shown, nothing to show

	                shouldAnimate = false;
	            }

	            mixitup.events.fire('mixStart', self.dom.container, {
	                state: operation.startState,
	                futureState: operation.newState,
	                instance: self
	            }, self.dom.document);

	            if (typeof self.config.callbacks.onMixStart === 'function') {
	                self.config.callbacks.onMixStart.call(
	                    self.dom.container,
	                    operation.startState,
	                    operation.newState,
	                    self
	                );
	            }

	            h.removeClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));

	            if (!self.userDeferred) {
	                // Queue empty, no pending operations

	                deferred = self.userDeferred = h.defer(mixitup.libraries);
	            } else {
	                // Use existing deferred

	                deferred = self.userDeferred;
	            }

	            self.isBusy = true;

	            if (!shouldAnimate || !mixitup.features.has.transitions) {
	                // Abort

	                if (self.config.debug.fauxAsync) {
	                    setTimeout(function() {
	                        self.cleanUp(operation);
	                    }, self.config.animation.duration);
	                } else {
	                    self.cleanUp(operation);
	                }

	                return self.callFilters('promiseGoMix', deferred.promise, arguments);
	            }

	            // If we should animate and the platform supports transitions, go for it

	            if (window.pageYOffset !== operation.docState.scrollTop) {
	                window.scrollTo(operation.docState.scrollLeft, operation.docState.scrollTop);
	            }

	            if (self.config.animation.applyPerspective) {
	                self.dom.parent.style[mixitup.features.perspectiveProp] =
	                    self.config.animation.perspectiveDistance;

	                self.dom.parent.style[mixitup.features.perspectiveOriginProp] =
	                    self.config.animation.perspectiveOrigin;
	            }

	            if (
	                self.config.animation.animateResizeContainer &&
	                operation.startHeight !== operation.newHeight &&
	                operation.viewportDeltaY !== operation.startHeight - operation.newHeight
	            ) {
	                self.dom.parent.style.height = operation.startHeight + 'px';
	            }

	            if (
	                self.config.animation.animateResizeContainer &&
	                operation.startWidth !== operation.newWidth &&
	                operation.viewportDeltaX !== operation.startWidth - operation.newWidth
	            ) {
	                self.dom.parent.style.width = operation.startWidth + 'px';
	            }

	            if (operation.startHeight === operation.newHeight) {
	                self.dom.parent.style.height = operation.startHeight + 'px';
	            }

	            if (operation.startWidth === operation.newWidth) {
	                self.dom.parent.style.width = operation.startWidth + 'px';
	            }

	            if (operation.startHeight === operation.newHeight && operation.startWidth === operation.newWidth) {
	                self.dom.parent.style.overflow = 'hidden';
	            }

	            requestAnimationFrame(function() {
	                self.moveTargets(operation);
	            });

	            return self.callFilters('promiseGoMix', deferred.promise, arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        getStartMixData: function(operation) {
	            var self        = this,
	                parentStyle = window.getComputedStyle(self.dom.parent),
	                parentRect  = self.dom.parent.getBoundingClientRect(),
	                target      = null,
	                data        = {},
	                i           = -1,
	                boxSizing   = parentStyle[mixitup.features.boxSizingProp];

	            self.incPadding = (boxSizing === 'border-box');

	            self.callActions('beforeGetStartMixData', arguments);

	            for (i = 0; target = operation.show[i]; i++) {
	                data = target.getPosData();

	                operation.showPosData[i] = {
	                    startPosData: data
	                };
	            }

	            for (i = 0; target = operation.toHide[i]; i++) {
	                data = target.getPosData();

	                operation.toHidePosData[i] = {
	                    startPosData: data
	                };
	            }

	            operation.startX = parentRect.left;
	            operation.startY = parentRect.top;

	            operation.startHeight = self.incPadding ?
	                parentRect.height :
	                parentRect.height -
	                    parseFloat(parentStyle.paddingTop) -
	                    parseFloat(parentStyle.paddingBottom) -
	                    parseFloat(parentStyle.borderTop) -
	                    parseFloat(parentStyle.borderBottom);

	            operation.startWidth = self.incPadding ?
	                parentRect.width :
	                parentRect.width -
	                    parseFloat(parentStyle.paddingLeft) -
	                    parseFloat(parentStyle.paddingRight) -
	                    parseFloat(parentStyle.borderLeft) -
	                    parseFloat(parentStyle.borderRight);

	            self.callActions('afterGetStartMixData', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        setInter: function(operation) {
	            var self    = this,
	                target  = null,
	                i       = -1;

	            self.callActions('beforeSetInter', arguments);

	            // Prevent scrollbar flicker on non-inertial scroll platforms by clamping height/width

	            if (self.config.animation.clampHeight) {
	                self.dom.parent.style.height    = operation.startHeight + 'px';
	                self.dom.parent.style.overflow  = 'hidden';
	            }

	            if (self.config.animation.clampWidth) {
	                self.dom.parent.style.width     = operation.startWidth + 'px';
	                self.dom.parent.style.overflow  = 'hidden';
	            }

	            for (i = 0; target = operation.toShow[i]; i++) {
	                target.show();
	            }

	            if (operation.willChangeLayout) {
	                h.removeClass(self.dom.container, operation.startContainerClassName);
	                h.addClass(self.dom.container, operation.newContainerClassName);
	            }

	            self.callActions('afterSetInter', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        getInterMixData: function(operation) {
	            var self    = this,
	                target  = null,
	                i       = -1;

	            self.callActions('beforeGetInterMixData', arguments);

	            for (i = 0; target = operation.show[i]; i++) {
	                operation.showPosData[i].interPosData = target.getPosData();
	            }

	            for (i = 0; target = operation.toHide[i]; i++) {
	                operation.toHidePosData[i].interPosData = target.getPosData();
	            }

	            self.callActions('afterGetInterMixData', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        setFinal: function(operation) {
	            var self    = this,
	                target  = null,
	                i       = -1;

	            self.callActions('beforeSetFinal', arguments);

	            operation.willSort && self.printSort(false, operation);

	            for (i = 0; target = operation.toHide[i]; i++) {
	                target.hide();
	            }

	            self.callActions('afterSetFinal', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        getFinalMixData: function(operation) {
	            var self        = this,
	                parentStyle = null,
	                parentRect  = null,
	                target      = null,
	                i           = -1;

	            self.callActions('beforeGetFinalMixData', arguments);

	            for (i = 0; target = operation.show[i]; i++) {
	                operation.showPosData[i].finalPosData = target.getPosData();
	            }

	            for (i = 0; target = operation.toHide[i]; i++) {
	                operation.toHidePosData[i].finalPosData = target.getPosData();
	            }

	            // Remove clamping

	            if (self.config.animation.clampHeight || self.config.animation.clampWidth) {
	                self.dom.parent.style.height    =
	                self.dom.parent.style.width     =
	                self.dom.parent.style.overflow  = '';
	            }

	            if (!self.incPadding) {
	                parentStyle = window.getComputedStyle(self.dom.parent);
	            }

	            parentRect  = self.dom.parent.getBoundingClientRect();

	            operation.newX = parentRect.left;
	            operation.newY = parentRect.top;

	            operation.newHeight = self.incPadding ?
	                parentRect.height :
	                parentRect.height -
	                    parseFloat(parentStyle.paddingTop) -
	                    parseFloat(parentStyle.paddingBottom) -
	                    parseFloat(parentStyle.borderTop) -
	                    parseFloat(parentStyle.borderBottom);

	            operation.newWidth = self.incPadding ?
	                parentRect.width :
	                parentRect.width -
	                    parseFloat(parentStyle.paddingLeft) -
	                    parseFloat(parentStyle.paddingRight) -
	                    parseFloat(parentStyle.borderLeft) -
	                    parseFloat(parentStyle.borderRight);

	            operation.viewportDeltaX = operation.docState.viewportWidth - this.dom.document.documentElement.clientWidth;
	            operation.viewportDeltaY = operation.docState.viewportHeight - this.dom.document.documentElement.clientHeight;

	            if (operation.willSort) {
	                self.printSort(true, operation);
	            }

	            for (i = 0; target = operation.toShow[i]; i++) {
	                target.hide();
	            }

	            for (i = 0; target = operation.toHide[i]; i++) {
	                target.show();
	            }

	            if (operation.willChangeLayout) {
	                h.removeClass(self.dom.container, operation.newContainerClassName);
	                h.addClass(self.dom.container, self.config.layout.containerClassName);
	            }

	            self.callActions('afterGetFinalMixData', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since    3.0.0
	         * @param    {Operation}     operation
	         */

	        getTweenData: function(operation) {
	            var self            = this,
	                target          = null,
	                posData         = null,
	                effectNames     = Object.getOwnPropertyNames(self.effectsIn),
	                effectName      = '',
	                effect          = null,
	                widthChange     = -1,
	                heightChange    = -1,
	                i               = -1,
	                j               = -1;

	            self.callActions('beforeGetTweenData', arguments);

	            for (i = 0; target = operation.show[i]; i++) {
	                posData             = operation.showPosData[i];
	                posData.posIn       = new mixitup.StyleData();
	                posData.posOut      = new mixitup.StyleData();
	                posData.tweenData   = new mixitup.StyleData();

	                // Process x and y

	                if (target.isShown) {
	                    posData.posIn.x = posData.startPosData.x - posData.interPosData.x;
	                    posData.posIn.y = posData.startPosData.y - posData.interPosData.y;
	                } else {
	                    posData.posIn.x = posData.posIn.y = 0;
	                }

	                posData.posOut.x = posData.finalPosData.x - posData.interPosData.x;
	                posData.posOut.y = posData.finalPosData.y - posData.interPosData.y;

	                // Process opacity

	                posData.posIn.opacity       = target.isShown ? 1 : self.effectsIn.opacity;
	                posData.posOut.opacity      = 1;
	                posData.tweenData.opacity   = posData.posOut.opacity - posData.posIn.opacity;

	                // Adjust x and y if not nudging

	                if (!target.isShown && !self.config.animation.nudge) {
	                    posData.posIn.x = posData.posOut.x;
	                    posData.posIn.y = posData.posOut.y;
	                }

	                posData.tweenData.x = posData.posOut.x - posData.posIn.x;
	                posData.tweenData.y = posData.posOut.y - posData.posIn.y;

	                // Process width, height, and margins

	                if (self.config.animation.animateResizeTargets) {
	                    posData.posIn.width     = posData.startPosData.width;
	                    posData.posIn.height    = posData.startPosData.height;

	                    // "||" Prevents width/height change from including 0 width/height if hiding or showing

	                    widthChange = (posData.startPosData.width || posData.finalPosData.width) - posData.interPosData.width;

	                    posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

	                    heightChange = (posData.startPosData.height || posData.finalPosData.height) - posData.interPosData.height;

	                    posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;

	                    posData.posOut.width    = posData.finalPosData.width;
	                    posData.posOut.height   = posData.finalPosData.height;

	                    widthChange = (posData.finalPosData.width || posData.startPosData.width) - posData.interPosData.width;

	                    posData.posOut.marginRight = posData.finalPosData.marginRight - widthChange;

	                    heightChange = (posData.finalPosData.height || posData.startPosData.height) - posData.interPosData.height;

	                    posData.posOut.marginBottom = posData.finalPosData.marginBottom - heightChange;

	                    posData.tweenData.width         = posData.posOut.width - posData.posIn.width;
	                    posData.tweenData.height        = posData.posOut.height - posData.posIn.height;
	                    posData.tweenData.marginRight   = posData.posOut.marginRight - posData.posIn.marginRight;
	                    posData.tweenData.marginBottom  = posData.posOut.marginBottom - posData.posIn.marginBottom;
	                }

	                // Process transforms

	                for (j = 0; effectName = effectNames[j]; j++) {
	                    effect = self.effectsIn[effectName];

	                    if (!(effect instanceof mixitup.TransformData) || !effect.value) continue;

	                    posData.posIn[effectName].value     = effect.value;
	                    posData.posOut[effectName].value    = 0;

	                    posData.tweenData[effectName].value =
	                        posData.posOut[effectName].value - posData.posIn[effectName].value;

	                    posData.posIn[effectName].unit =
	                        posData.posOut[effectName].unit =
	                        posData.tweenData[effectName].unit =
	                        effect.unit;
	                }
	            }

	            for (i = 0; target = operation.toHide[i]; i++) {
	                posData             = operation.toHidePosData[i];
	                posData.posIn       = new mixitup.StyleData();
	                posData.posOut      = new mixitup.StyleData();
	                posData.tweenData   = new mixitup.StyleData();

	                // Process x and y

	                posData.posIn.x     = target.isShown ? posData.startPosData.x - posData.interPosData.x : 0;
	                posData.posIn.y     = target.isShown ? posData.startPosData.y - posData.interPosData.y : 0;
	                posData.posOut.x    = self.config.animation.nudge ? 0 : posData.posIn.x;
	                posData.posOut.y    = self.config.animation.nudge ? 0 : posData.posIn.y;
	                posData.tweenData.x = posData.posOut.x - posData.posIn.x;
	                posData.tweenData.y = posData.posOut.y - posData.posIn.y;

	                // Process width, height, and margins

	                if (self.config.animation.animateResizeTargets) {
	                    posData.posIn.width         = posData.startPosData.width;
	                    posData.posIn.height        = posData.startPosData.height;

	                    widthChange = posData.startPosData.width - posData.interPosData.width;

	                    posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

	                    heightChange = posData.startPosData.height - posData.interPosData.height;

	                    posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;
	                }

	                // Process opacity

	                posData.posIn.opacity       = 1;
	                posData.posOut.opacity      = self.effectsOut.opacity;
	                posData.tweenData.opacity   = posData.posOut.opacity - posData.posIn.opacity;

	                // Process transforms

	                for (j = 0; effectName = effectNames[j]; j++) {
	                    effect = self.effectsOut[effectName];

	                    if (!(effect instanceof mixitup.TransformData) || !effect.value) continue;

	                    posData.posIn[effectName].value     = 0;
	                    posData.posOut[effectName].value    = effect.value;

	                    posData.tweenData[effectName].value =
	                        posData.posOut[effectName].value - posData.posIn[effectName].value;

	                    posData.posIn[effectName].unit =
	                        posData.posOut[effectName].unit =
	                        posData.tweenData[effectName].unit =
	                        effect.unit;
	                }
	            }

	            self.callActions('afterGetTweenData', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        moveTargets: function(operation) {
	            var self            = this,
	                target          = null,
	                moveData        = null,
	                posData         = null,
	                statusChange    = '',
	                willTransition  = false,
	                staggerIndex    = -1,
	                i               = -1,
	                checkProgress   = self.checkProgress.bind(self);

	            self.callActions('beforeMoveTargets', arguments);

	            // TODO: this is an extra loop in addition to the calcs
	            // done in getOperation, could some of this be done there?

	            for (i = 0; target = operation.show[i]; i++) {
	                moveData    = new mixitup.IMoveData();
	                posData     = operation.showPosData[i];

	                statusChange = target.isShown ? 'none' : 'show';

	                willTransition = self.willTransition(
	                    statusChange,
	                    operation.hasEffect,
	                    posData.posIn,
	                    posData.posOut
	                );

	                if (willTransition) {
	                    // Prevent non-transitioning targets from incrementing the staggerIndex

	                    staggerIndex++;
	                }

	                target.show();

	                moveData.posIn          = posData.posIn;
	                moveData.posOut         = posData.posOut;
	                moveData.statusChange   = statusChange;
	                moveData.staggerIndex   = staggerIndex;
	                moveData.operation      = operation;
	                moveData.callback       = willTransition ? checkProgress : null;

	                target.move(moveData);
	            }

	            for (i = 0; target = operation.toHide[i]; i++) {
	                posData  = operation.toHidePosData[i];
	                moveData = new mixitup.IMoveData();

	                statusChange = 'hide';

	                willTransition = self.willTransition(statusChange, posData.posIn, posData.posOut);

	                moveData.posIn          = posData.posIn;
	                moveData.posOut         = posData.posOut;
	                moveData.statusChange   = statusChange;
	                moveData.staggerIndex   = i;
	                moveData.operation      = operation;
	                moveData.callback       = willTransition ? checkProgress : null;

	                target.move(moveData);
	            }

	            if (self.config.animation.animateResizeContainer) {
	                self.dom.parent.style[mixitup.features.transitionProp] =
	                    'height ' + self.config.animation.duration + 'ms ease, ' +
	                    'width ' + self.config.animation.duration + 'ms ease ';

	                requestAnimationFrame(function() {
	                    if (
	                        operation.startHeight !== operation.newHeight &&
	                        operation.viewportDeltaY !== operation.startHeight - operation.newHeight
	                    ) {
	                        self.dom.parent.style.height = operation.newHeight + 'px';
	                    }

	                    if (
	                        operation.startWidth !== operation.newWidth &&
	                        operation.viewportDeltaX !== operation.startWidth - operation.newWidth
	                    ) {
	                        self.dom.parent.style.width = operation.newWidth + 'px';
	                    }
	                });
	            }

	            if (operation.willChangeLayout) {
	                h.removeClass(self.dom.container, self.config.layout.ContainerClassName);
	                h.addClass(self.dom.container, operation.newContainerClassName);
	            }

	            self.callActions('afterMoveTargets', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @return  {boolean}
	         */

	        hasEffect: function() {
	            var self        = this,
	                EFFECTABLES = [
	                    'scale',
	                    'translateX', 'translateY', 'translateZ',
	                    'rotateX', 'rotateY', 'rotateZ'
	                ],
	                effectName  = '',
	                effect      = null,
	                result      = false,
	                value       = -1,
	                i           = -1;

	            if (self.effectsIn.opacity !== 1) {
	                return self.callFilters('resultHasEffect', true, arguments);
	            }

	            for (i = 0; effectName = EFFECTABLES[i]; i++) {
	                effect  = self.effectsIn[effectName];
	                value   = (typeof effect && effect.value !== 'undefined') ?
	                    effect.value : effect;

	                if (value !== 0) {
	                    result = true;

	                    break;
	                }
	            }

	            return self.callFilters('resultHasEffect', result, arguments);
	        },

	        /**
	         * Determines if a target element will transition in
	         * some fasion and therefore requires binding of
	         * transitionEnd
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {string}        statusChange
	         * @param   {boolean}       hasEffect
	         * @param   {StyleData}     posIn
	         * @param   {StyleData}     posOut
	         * @return  {boolean}
	         */

	        willTransition: function(statusChange, hasEffect, posIn, posOut) {
	            var self    = this,
	                result  = false;

	            if (!h.isVisible(self.dom.container)) {
	                // If the container is not visible, the transitionEnd
	                // event will not occur and MixItUp will hang

	                result = false;
	            } else if (
	                (statusChange !== 'none' && hasEffect) ||
	                posIn.x !== posOut.x ||
	                posIn.y !== posOut.y
	            ) {
	                // If opacity and/or translate will change

	                result = true;
	            } else if (self.config.animation.animateResizeTargets) {
	                // Check if width, height or margins will change

	                result = (
	                    posIn.width !== posOut.width ||
	                    posIn.height !== posOut.height ||
	                    posIn.marginRight !== posOut.marginRight ||
	                    posIn.marginTop !== posOut.marginTop
	                );
	            } else {
	                result = false;
	            }

	            return self.callFilters('resultWillTransition', result, arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        checkProgress: function(operation) {
	            var self = this;

	            self.targetsDone++;

	            if (self.targetsBound === self.targetsDone) {
	                self.cleanUp(operation);
	            }
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Operation}     operation
	         * @return  {void}
	         */

	        cleanUp: function(operation) {
	            var self                = this,
	                target              = null,
	                whitespaceBefore    = null,
	                whitespaceAfter     = null,
	                nextInQueue         = null,
	                i                   = -1;

	            self.callActions('beforeCleanUp', arguments);

	            self.targetsMoved          =
	                self.targetsImmovable  =
	                self.targetsBound      =
	                self.targetsDone       = 0;

	            for (i = 0; target = operation.show[i]; i++) {
	                target.cleanUp();

	                target.show();
	            }

	            for (i = 0; target = operation.toHide[i]; i++) {
	                target.cleanUp();

	                target.hide();
	            }

	            if (operation.willSort) {
	                self.printSort(false, operation);
	            }

	            // Remove any styles applied to the parent container

	            self.dom.parent.style[mixitup.features.transitionProp]             =
	                self.dom.parent.style.height                                   =
	                self.dom.parent.style.width                                    =
	                self.dom.parent.style.overflow                                 =
	                self.dom.parent.style[mixitup.features.perspectiveProp]        =
	                self.dom.parent.style[mixitup.features.perspectiveOriginProp]  = '';

	            if (operation.willChangeLayout) {
	                h.removeClass(self.dom.container, operation.startContainerClassName);
	                h.addClass(self.dom.container, operation.newContainerClassName);
	            }

	            if (operation.toRemove.length) {
	                for (i = 0; target = self.targets[i]; i++) {
	                    if (operation.toRemove.indexOf(target) > -1) {
	                        if (
	                            (whitespaceBefore = target.dom.el.previousSibling) && whitespaceBefore.nodeName === '#text' &&
	                            (whitespaceAfter = target.dom.el.nextSibling) && whitespaceAfter.nodeName === '#text'
	                        ) {
	                            h.removeWhitespace(whitespaceBefore);
	                        }

	                        if (!operation.willSort) {
	                            // NB: Sorting will remove targets as a bi-product of `printSort()`

	                            self.dom.parent.removeChild(target.dom.el);
	                        }

	                        self.targets.splice(i, 1);

	                        target.isInDom = false;

	                        i--;
	                    }
	                }

	                // Since targets have been removed, the original order must be updated

	                self.origOrder = self.targets;
	            }

	            if (operation.willSort) {
	                self.targets = operation.newOrder;
	            }

	            self.state = operation.newState;
	            self.lastOperation = operation;

	            self.dom.targets = self.state.targets;

	            // mixEnd

	            mixitup.events.fire('mixEnd', self.dom.container, {
	                state: self.state,
	                instance: self
	            }, self.dom.document);

	            if (typeof self.config.callbacks.onMixEnd === 'function') {
	                self.config.callbacks.onMixEnd.call(self.dom.container, self.state, self);
	            }

	            if (operation.hasFailed) {
	                // mixFail

	                mixitup.events.fire('mixFail', self.dom.container, {
	                    state: self.state,
	                    instance: self
	                }, self.dom.document);

	                if (typeof self.config.callbacks.onMixFail === 'function') {
	                    self.config.callbacks.onMixFail.call(self.dom.container, self.state, self);
	                }

	                h.addClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));
	            }

	            // User-defined callback function

	            if (typeof self.userCallback === 'function') {
	                self.userCallback.call(self.dom.container, self.state, self);
	            }

	            if (typeof self.userDeferred.resolve === 'function') {
	                self.userDeferred.resolve(self.state);
	            }

	            self.userCallback  = null;
	            self.userDeferred  = null;
	            self.lastClicked   = null;
	            self.isToggling    = false;
	            self.isBusy        = false;

	            if (self.queue.length) {
	                self.callActions('beforeReadQueueCleanUp', arguments);

	                nextInQueue = self.queue.shift();

	                // Update non-public API properties stored in queue

	                self.userDeferred  = nextInQueue.deferred;
	                self.isToggling    = nextInQueue.isToggling;
	                self.lastClicked   = nextInQueue.triggerElement;

	                if (nextInQueue.instruction.command instanceof mixitup.CommandMultimix) {
	                    self.multimix.apply(self, nextInQueue.args);
	                } else {
	                    self.dataset.apply(self, nextInQueue.args);
	                }
	            }

	            self.callActions('afterCleanUp', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Array<*>}  args
	         * @return  {mixitup.UserInstruction}
	         */

	        parseMultimixArgs: function(args) {
	            var self        = this,
	                instruction = new mixitup.UserInstruction(),
	                arg         = null,
	                i           = -1;

	            instruction.animate = self.config.animation.enable;
	            instruction.command = new mixitup.CommandMultimix();

	            for (i = 0; i < args.length; i++) {
	                arg = args[i];

	                if (arg === null) continue;

	                if (typeof arg === 'object') {
	                    h.extend(instruction.command, arg);
	                } else if (typeof arg === 'boolean') {
	                    instruction.animate = arg;
	                } else if (typeof arg === 'function') {
	                    instruction.callback = arg;
	                }
	            }

	            // Coerce arbitrary command arguments into typed command objects

	            if (instruction.command.insert && !(instruction.command.insert instanceof mixitup.CommandInsert)) {
	                instruction.command.insert = self.parseInsertArgs([instruction.command.insert]).command;
	            }

	            if (instruction.command.remove && !(instruction.command.remove instanceof mixitup.CommandRemove)) {
	                instruction.command.remove = self.parseRemoveArgs([instruction.command.remove]).command;
	            }

	            if (instruction.command.filter && !(instruction.command.filter instanceof mixitup.CommandFilter)) {
	                instruction.command.filter = self.parseFilterArgs([instruction.command.filter]).command;
	            }

	            if (instruction.command.sort && !(instruction.command.sort instanceof mixitup.CommandSort)) {
	                instruction.command.sort = self.parseSortArgs([instruction.command.sort]).command;
	            }

	            if (instruction.command.changeLayout && !(instruction.command.changeLayout instanceof mixitup.CommandChangeLayout)) {
	                instruction.command.changeLayout = self.parseChangeLayoutArgs([instruction.command.changeLayout]).command;
	            }

	            instruction = self.callFilters('instructionParseMultimixArgs', instruction, arguments);

	            h.freeze(instruction);

	            return instruction;
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Array<*>}  args
	         * @return  {mixitup.UserInstruction}
	         */

	        parseFilterArgs: function(args) {
	            var self        = this,
	                instruction = new mixitup.UserInstruction(),
	                arg         = null,
	                i           = -1;

	            instruction.animate = self.config.animation.enable;
	            instruction.command = new mixitup.CommandFilter();

	            for (i = 0; i < args.length; i++) {
	                arg = args[i];

	                if (typeof arg === 'string') {
	                    // Selector

	                    instruction.command.selector = arg;
	                } else if (arg === null) {
	                    instruction.command.collection = [];
	                } else if (typeof arg === 'object' && h.isElement(arg, self.dom.document)) {
	                    // Single element

	                    instruction.command.collection = [arg];
	                } else if (typeof arg === 'object' && typeof arg.length !== 'undefined') {
	                    // Multiple elements in array, NodeList or jQuery collection

	                    instruction.command.collection = h.arrayFromList(arg);
	                } else if (typeof arg === 'object') {
	                    // Filter command

	                    h.extend(instruction.command, arg);
	                } else if (typeof arg === 'boolean') {
	                    instruction.animate = arg;
	                } else if (typeof arg === 'function') {
	                    instruction.callback = arg;
	                }
	            }

	            if (instruction.command.selector && instruction.command.collection) {
	                throw new Error(mixitup.messages.errorFilterInvalidArguments());
	            }

	            instruction = self.callFilters('instructionParseFilterArgs', instruction, arguments);

	            h.freeze(instruction);

	            return instruction;
	        },

	        parseSortArgs: function(args) {
	            var self        = this,
	                instruction = new mixitup.UserInstruction(),
	                arg         = null,
	                sortString  = '',
	                i           = -1;

	            instruction.animate = self.config.animation.enable;
	            instruction.command = new mixitup.CommandSort();

	            for (i = 0; i < args.length; i++) {
	                arg = args[i];

	                if (arg === null) continue;

	                switch (typeof arg) {
	                    case 'string':
	                        // Sort string

	                        sortString = arg;

	                        break;
	                    case 'object':
	                        // Array of element references

	                        if (arg.length) {
	                            instruction.command.collection = h.arrayFromList(arg);
	                        }

	                        break;
	                    case 'boolean':
	                        instruction.animate = arg;

	                        break;
	                    case 'function':
	                        instruction.callback = arg;

	                        break;
	                }
	            }

	            if (sortString) {
	                instruction.command = self.parseSortString(sortString, instruction.command);
	            }

	            instruction = self.callFilters('instructionParseSortArgs', instruction, arguments);

	            h.freeze(instruction);

	            return instruction;
	        },

	        /**
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {Array<*>}  args
	         * @return  {mixitup.UserInstruction}
	         */

	        parseInsertArgs: function(args) {
	            var self        = this,
	                instruction = new mixitup.UserInstruction(),
	                arg         = null,
	                i           = -1;

	            instruction.animate = self.config.animation.enable;
	            instruction.command = new mixitup.CommandInsert();

	            for (i = 0; i < args.length; i++) {
	                arg = args[i];

	                if (arg === null) continue;

	                if (typeof arg === 'number') {
	                    // Insert index

	                    instruction.command.index = arg;
	                } else if (typeof arg === 'string' && ['before', 'after'].indexOf(arg) > -1) {
	                    // 'before'/'after'

	                    instruction.command.position = arg;
	                } else if (typeof arg === 'string') {
	                    // Markup

	                    instruction.command.collection =
	                        h.arrayFromList(h.createElement(arg).childNodes);
	                } else if (typeof arg === 'object' && h.isElement(arg, self.dom.document)) {
	                    // Single element

	                    !instruction.command.collection.length ?
	                        (instruction.command.collection = [arg]) :
	                        (instruction.command.sibling = arg);
	                } else if (typeof arg === 'object' && arg.length) {
	                    // Multiple elements in array or jQuery collection

	                    !instruction.command.collection.length ?
	                        (instruction.command.collection = arg) :
	                        instruction.command.sibling = arg[0];
	                } else if (typeof arg === 'object' && arg.childNodes && arg.childNodes.length) {
	                    // Document fragment

	                    !instruction.command.collection.length ?
	                        instruction.command.collection = h.arrayFromList(arg.childNodes) :
	                        instruction.command.sibling = arg.childNodes[0];
	                } else if (typeof arg === 'object') {
	                    // Insert command

	                    h.extend(instruction.command, arg);
	                } else if (typeof arg === 'boolean') {
	                    instruction.animate = arg;
	                } else if (typeof arg === 'function') {
	                    instruction.callback = arg;
	                }
	            }

	            if (instruction.command.index && instruction.command.sibling) {
	                throw new Error(mixitup.messages.errorInsertInvalidArguments());
	            }

	            if (!instruction.command.collection.length && self.config.debug.showWarnings) {
	                console.warn(mixitup.messages.warningInsertNoElements());
	            }

	            instruction = self.callFilters('instructionParseInsertArgs', instruction, arguments);

	            h.freeze(instruction);

	            return instruction;
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Array<*>}  args
	         * @return  {mixitup.UserInstruction}
	         */

	        parseRemoveArgs: function(args) {
	            var self        = this,
	                instruction = new mixitup.UserInstruction(),
	                target      = null,
	                arg         = null,
	                i           = -1;

	            instruction.animate = self.config.animation.enable;
	            instruction.command = new mixitup.CommandRemove();

	            for (i = 0; i < args.length; i++) {
	                arg = args[i];

	                if (arg === null) continue;

	                switch (typeof arg) {
	                    case 'number':
	                        if (self.targets[arg]) {
	                            instruction.command.targets[0] = self.targets[arg];
	                        }

	                        break;
	                    case 'string':
	                        instruction.command.collection = h.arrayFromList(self.dom.parent.querySelectorAll(arg));

	                        break;
	                    case 'object':
	                        if (arg && arg.length) {
	                            instruction.command.collection = arg;
	                        } else if (h.isElement(arg, self.dom.document)) {
	                            instruction.command.collection = [arg];
	                        } else {
	                            // Remove command

	                            h.extend(instruction.command, arg);
	                        }

	                        break;
	                    case 'boolean':
	                        instruction.animate = arg;

	                        break;
	                    case 'function':
	                        instruction.callback = arg;

	                        break;
	                }
	            }

	            if (instruction.command.collection.length) {
	                for (i = 0; target = self.targets[i]; i++) {
	                    if (instruction.command.collection.indexOf(target.dom.el) > -1) {
	                        instruction.command.targets.push(target);
	                    }
	                }
	            }

	            if (!instruction.command.targets.length && self.config.debug.showWarnings) {
	                console.warn(mixitup.messages.warningRemoveNoElements());
	            }

	            h.freeze(instruction);

	            return instruction;
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Array<*>}  args
	         * @return  {mixitup.UserInstruction}
	         */

	        parseDatasetArgs: function(args) {
	            var self        = this,
	                instruction = new mixitup.UserInstruction(),
	                arg         = null,
	                i           = -1;

	            instruction.animate = self.config.animation.enable;
	            instruction.command = new mixitup.CommandDataset();

	            for (i = 0; i < args.length; i++) {
	                arg = args[i];

	                if (arg === null) continue;

	                switch (typeof arg) {
	                    case 'object':
	                        if (Array.isArray(arg) || typeof arg.length === 'number') {
	                            instruction.command.dataset = arg;
	                        } else {
	                            // Change layout command

	                            h.extend(instruction.command, arg);
	                        }

	                        break;
	                    case 'boolean':
	                        instruction.animate = arg;

	                        break;
	                    case 'function':
	                        instruction.callback = arg;

	                        break;
	                }
	            }

	            h.freeze(instruction);

	            return instruction;
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Array<*>}  args
	         * @return  {mixitup.UserInstruction}
	         */

	        parseChangeLayoutArgs: function(args) {
	            var self        = this,
	                instruction = new mixitup.UserInstruction(),
	                arg         = null,
	                i           = -1;

	            instruction.animate = self.config.animation.enable;
	            instruction.command = new mixitup.CommandChangeLayout();

	            for (i = 0; i < args.length; i++) {
	                arg = args[i];

	                if (arg === null) continue;

	                switch (typeof arg) {
	                    case 'string':
	                        instruction.command.containerClassName = arg;

	                        break;
	                    case 'object':
	                        // Change layout command

	                        h.extend(instruction.command, arg);

	                        break;
	                    case 'boolean':
	                        instruction.animate = arg;

	                        break;
	                    case 'function':
	                        instruction.callback = arg;

	                        break;
	                }
	            }

	            h.freeze(instruction);

	            return instruction;
	        },

	        /**
	         * @private
	         * @instance
	         * @since       3.0.0
	         * @param       {mixitup.QueueItem}         queueItem
	         * @return      {Promise.<mixitup.State>}
	         */

	        queueMix: function(queueItem) {
	            var self            = this,
	                deferred        = null,
	                toggleSelector  = '';

	            self.callActions('beforeQueueMix', arguments);

	            deferred = h.defer(mixitup.libraries);

	            if (self.config.animation.queue && self.queue.length < self.config.animation.queueLimit) {
	                queueItem.deferred = deferred;

	                self.queue.push(queueItem);

	                // Keep controls in sync with user interactions. Mixer will catch up as it drains the queue.

	                if (self.config.controls.enable) {
	                    if (self.isToggling) {
	                        self.buildToggleArray(queueItem.instruction.command);

	                        toggleSelector = self.getToggleSelector();

	                        self.updateControls({
	                            filter: {
	                                selector: toggleSelector
	                            }
	                        });
	                    } else {
	                        self.updateControls(queueItem.instruction.command);
	                    }
	                }
	            } else {
	                if (self.config.debug.showWarnings) {
	                    console.warn(mixitup.messages.warningMultimixInstanceQueueFull());
	                }

	                deferred.resolve(self.state);

	                mixitup.events.fire('mixBusy', self.dom.container, {
	                    state: self.state,
	                    instance: self
	                }, self.dom.document);

	                if (typeof self.config.callbacks.onMixBusy === 'function') {
	                    self.config.callbacks.onMixBusy.call(self.dom.container, self.state, self);
	                }
	            }

	            return self.callFilters('promiseQueueMix', deferred.promise, arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Array.<object>}    newDataset
	         * @return  {Operation}
	         */

	        getDataOperation: function(newDataset) {
	            var self                = this,
	                operation           = new mixitup.Operation(),
	                startDataset        = [];

	            operation = self.callFilters('operationUnmappedGetDataOperation', operation, arguments);

	            if (self.dom.targets.length && !(startDataset = (self.state.activeDataset || [])).length) {
	                throw new Error(mixitup.messages.errorDatasetNotSet());
	            }

	            operation.id            = h.randomHex();
	            operation.startState    = self.state;
	            operation.startDataset  = startDataset;
	            operation.newDataset    = newDataset.slice();

	            self.diffDatasets(operation);

	            operation.startOrder = self.targets;
	            operation.newOrder = operation.show;

	            if (self.config.animation.enable) {
	                self.getStartMixData(operation);
	                self.setInter(operation);

	                operation.docState = h.getDocumentState(self.dom.document);

	                self.getInterMixData(operation);
	                self.setFinal(operation);
	                self.getFinalMixData(operation);

	                self.parseEffects();

	                operation.hasEffect = self.hasEffect();

	                self.getTweenData(operation);
	            }

	            self.targets = operation.show.slice();

	            operation.newState = self.buildState(operation);

	            // NB: Targets to be removed must be included in `self.targets` for removal during clean up,
	            // but are added after state is built so that state is accurate

	            Array.prototype.push.apply(self.targets, operation.toRemove);

	            operation = self.callFilters('operationMappedGetDataOperation', operation, arguments);

	            return operation;
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {mixitup.Operation} operation
	         * @return  {void}
	         */

	        diffDatasets: function(operation) {
	            var self                = this,
	                persistantStartIds  = [],
	                persistantNewIds    = [],
	                insertedTargets     = [],
	                data                = null,
	                target              = null,
	                el                  = null,
	                frag                = null,
	                nextEl              = null,
	                uids                = {},
	                id                  = '',
	                i                   = -1;

	            self.callActions('beforeDiffDatasets', arguments);

	            for (i = 0; data = operation.newDataset[i]; i++) {
	                if (typeof (id = data[self.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
	                    throw new TypeError(mixitup.messages.errorDatasetInvalidUidKey({
	                        uidKey: self.config.data.uidKey
	                    }));
	                }

	                if (!uids[id]) {
	                    uids[id] = true;
	                } else {
	                    throw new Error(mixitup.messages.errorDatasetDuplicateUid({
	                        uid: id
	                    }));
	                }

	                if ((target = self.cache[id]) instanceof mixitup.Target) {
	                    // Already in cache

	                    if (self.config.data.dirtyCheck && !h.deepEquals(data, target.data)) {
	                        // change detected

	                        el = target.render(data);

	                        target.data = data;

	                        if (el !== target.dom.el) {
	                            // Update target element reference

	                            if (target.isInDom) {
	                                target.unbindEvents();

	                                self.dom.parent.replaceChild(el, target.dom.el);
	                            }

	                            if (!target.isShown) {
	                                el.style.display = 'none';
	                            }

	                            target.dom.el = el;

	                            if (target.isInDom) {
	                                target.bindEvents();
	                            }
	                        }
	                    }

	                    el = target.dom.el;
	                } else {
	                    // New target

	                    target = new mixitup.Target();

	                    target.init(null, self, data);

	                    target.hide();
	                }

	                if (!target.isInDom) {
	                    // Adding to DOM

	                    if (!frag) {
	                        // Open frag

	                        frag = self.dom.document.createDocumentFragment();
	                    }

	                    if (frag.lastElementChild) {
	                        frag.appendChild(self.dom.document.createTextNode(' '));
	                    }

	                    frag.appendChild(target.dom.el);

	                    target.isInDom = true;

	                    target.unbindEvents();
	                    target.bindEvents();
	                    target.hide();

	                    operation.toShow.push(target);

	                    insertedTargets.push(target);
	                } else {
	                    // Already in DOM

	                    nextEl = target.dom.el.nextElementSibling;

	                    persistantNewIds.push(id);

	                    if (frag) {
	                        // Close and insert previously opened frag

	                        if (frag.lastElementChild) {
	                            frag.appendChild(self.dom.document.createTextNode(' '));
	                        }

	                        self.insertDatasetFrag(frag, target.dom.el, insertedTargets);

	                        frag = null;
	                    }
	                }

	                operation.show.push(target);
	            }

	            if (frag) {
	                // Unclosed frag remaining

	                nextEl = nextEl || self.config.layout.siblingAfter;

	                if (nextEl) {
	                    frag.appendChild(self.dom.document.createTextNode(' '));
	                }

	                self.insertDatasetFrag(frag, nextEl, insertedTargets);
	            }

	            for (i = 0; data = operation.startDataset[i]; i++) {
	                id = data[self.config.data.uidKey];

	                target = self.cache[id];

	                if (operation.show.indexOf(target) < 0) {
	                    // Previously shown but now absent

	                    operation.hide.push(target);
	                    operation.toHide.push(target);
	                    operation.toRemove.push(target);
	                } else {
	                    persistantStartIds.push(id);
	                }
	            }

	            if (!h.isEqualArray(persistantStartIds, persistantNewIds)) {
	                operation.willSort = true;
	            }

	            self.callActions('afterDiffDatasets', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.1.5
	         * @param   {DocumentFragment}          frag
	         * @param   {(HTMLElement|null)}        nextEl
	         * @param   {Array.<mixitup.Target>}    targets
	         * @return  {void}
	         */

	        insertDatasetFrag: function(frag, nextEl, targets) {
	            var self = this;
	            var insertAt = nextEl ? h.arrayFromList(self.dom.parent.children).indexOf(nextEl) : self.targets.length;

	            self.dom.parent.insertBefore(frag, nextEl);

	            while (targets.length) {
	                self.targets.splice(insertAt, 0, targets.shift());

	                insertAt++;
	            }
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {mixitup.CommandSort} sortCommandA
	         * @param   {mixitup.CommandSort} sortCommandB
	         * @return  {boolean}
	         */

	        willSort: function(sortCommandA, sortCommandB) {
	            var self    = this,
	                result  = false;

	            if (
	                self.config.behavior.liveSort ||
	                sortCommandA.order       === 'random' ||
	                sortCommandA.attribute   !== sortCommandB.attribute ||
	                sortCommandA.order       !== sortCommandB.order ||
	                sortCommandA.collection  !== sortCommandB.collection ||
	                (sortCommandA.next === null && sortCommandB.next) ||
	                (sortCommandA.next && sortCommandB.next === null)
	            ) {
	                result = true;
	            } else if (sortCommandA.next && sortCommandB.next) {
	                result = self.willSort(sortCommandA.next, sortCommandB.next);
	            } else {
	                result = false;
	            }

	            return self.callFilters('resultWillSort', result, arguments);
	        },

	        /**
	         * A shorthand method for `.filter('all')`. Shows all targets in the container.
	         *
	         * @example
	         *
	         * .show()
	         *
	         * @example <caption>Example: Showing all targets</caption>
	         *
	         * mixer.show()
	         *     .then(function(state) {
	         *         console.log(state.totalShow === state.totalTargets); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @return      {Promise.<mixitup.State>}
	         */

	        show: function() {
	            var self = this;

	            return self.filter('all');
	        },

	        /**
	         * A shorthand method for `.filter('none')`. Hides all targets in the container.
	         *
	         * @example
	         *
	         * .hide()
	         *
	         * @example <caption>Example: Hiding all targets</caption>
	         *
	         * mixer.hide()
	         *     .then(function(state) {
	         *         console.log(state.totalShow === 0); // true
	         *         console.log(state.totalHide === state.totalTargets); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @return      {Promise.<mixitup.State>}
	         */

	        hide: function() {
	            var self = this;

	            return self.filter('none');
	        },

	        /**
	         * Returns a boolean indicating whether or not a MixItUp operation is
	         * currently in progress.
	         *
	         * @example
	         *
	         * .isMixing()
	         *
	         * @example <caption>Example: Checking the status of a mixer</caption>
	         *
	         * mixer.sort('random', function() {
	         *     console.log(mixer.isMixing()) // false
	         * });
	         *
	         * console.log(mixer.isMixing()) // true
	         *
	         * @public
	         * @instance
	         * @since   2.0.0
	         * @return  {boolean}
	         */

	        isMixing: function() {
	            var self = this;

	            return self.isBusy;
	        },

	        /**
	         * Filters all targets in the container by a provided selector string, or the values `'all'`
	         * or `'none'`. Only targets matching the selector will be shown.
	         *
	         * @example
	         *
	         * .filter(selector [, animate] [, callback])
	         *
	         * @example <caption>Example 1: Filtering targets by a class selector</caption>
	         *
	         * mixer.filter('.category-a')
	         *     .then(function(state) {
	         *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a').length); // true
	         *     });
	         *
	         * @example <caption>Example 2: Filtering targets by an attribute selector</caption>
	         *
	         * mixer.filter('[data-category~="a"]')
	         *     .then(function(state) {
	         *         console.log(state.totalShow === containerEl.querySelectorAll('[data-category~="a"]').length); // true
	         *     });
	         *
	         * @example <caption>Example 3: Filtering targets by a compound selector</caption>
	         *
	         * // Show only those targets with the classes 'category-a' AND 'category-b'
	         *
	         * mixer.filter('.category-a.category-c')
	         *     .then(function(state) {
	         *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a.category-c').length); // true
	         *     });
	         *
	         * @example <caption>Example 4: Filtering via an element collection</caption>
	         *
	         * var collection = Array.from(container.querySelectorAll('.mix'));
	         *
	         * console.log(collection.length); // 34
	         *
	         * // Filter the collection manually using Array.prototype.filter
	         *
	         * var filtered = collection.filter(function(target) {
	         *    return parseInt(target.getAttribute('data-price')) > 10;
	         * });
	         *
	         * console.log(filtered.length); // 22
	         *
	         * // Pass the filtered collection to MixItUp
	         *
	         * mixer.filter(filtered)
	         *    .then(function(state) {
	         *        console.log(state.activeFilter.collection.length === 22); // true
	         *    });
	         *
	         * @public
	         * @instance
	         * @since       2.0.0
	         * @param       {(string|HTMLElement|Array.<HTMLElement>)} selector
	         *      Any valid CSS selector (i.e. `'.category-a'`), or the values `'all'` or `'none'`. The filter method also accepts a reference to single target element or a collection of target elements to show.
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        filter: function() {
	            var self        = this,
	                instruction = self.parseFilterArgs(arguments);

	            return self.multimix({
	                filter: instruction.command
	            }, instruction.animate, instruction.callback);
	        },

	        /**
	         * Adds an additional selector to the currently active filter selector, concatenating
	         * as per the logic defined in `controls.toggleLogic`.
	         *
	         * @example
	         *
	         * .toggleOn(selector [, animate] [, callback])
	         *
	         * @example <caption>Example: Toggling on a filter selector</caption>
	         *
	         * console.log(mixer.getState().activeFilter.selector); // '.category-a'
	         *
	         * mixer.toggleOn('.category-b')
	         *     .then(function(state) {
	         *         console.log(state.activeFilter.selector); // '.category-a, .category-b'
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {string}    selector
	         *      Any valid CSS selector (i.e. `'.category-a'`)
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        toggleOn: function() {
	            var self            = this,
	                instruction     = self.parseFilterArgs(arguments),
	                selector        = instruction.command.selector,
	                toggleSelector  = '';

	            self.isToggling = true;

	            if (self.toggleArray.indexOf(selector) < 0) {
	                self.toggleArray.push(selector);
	            }

	            toggleSelector = self.getToggleSelector();

	            return self.multimix({
	                filter: toggleSelector
	            }, instruction.animate, instruction.callback);
	        },

	        /**
	         * Removes a selector from the active filter selector.
	         *
	         * @example
	         *
	         * .toggleOff(selector [, animate] [, callback])
	         *
	         * @example <caption>Example: Toggling off a filter selector</caption>
	         *
	         * console.log(mixer.getState().activeFilter.selector); // '.category-a, .category-b'
	         *
	         * mixer.toggleOff('.category-b')
	         *     .then(function(state) {
	         *         console.log(state.activeFilter.selector); // '.category-a'
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {string}    selector
	         *      Any valid CSS selector (i.e. `'.category-a'`)
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        toggleOff: function() {
	            var self            = this,
	                instruction     = self.parseFilterArgs(arguments),
	                selector        = instruction.command.selector,
	                selectorIndex   = self.toggleArray.indexOf(selector),
	                toggleSelector  = '';

	            self.isToggling = true;

	            if (selectorIndex > -1) {
	                self.toggleArray.splice(selectorIndex, 1);
	            }

	            toggleSelector = self.getToggleSelector();

	            return self.multimix({
	                filter: toggleSelector
	            }, instruction.animate, instruction.callback);
	        },

	        /**
	         * Sorts all targets in the container according to a provided sort string.
	         *
	         * @example
	         *
	         * .sort(sortString [, animate] [, callback])
	         *
	         * @example <caption>Example 1: Sorting by the default DOM order</caption>
	         *
	         * // Reverse the default order of the targets
	         *
	         * mixer.sort('default:desc')
	         *     .then(function(state) {
	         *         console.log(state.activeSort.attribute === 'default'); // true
	         *         console.log(state.activeSort.order === 'desc'); // true
	         *     });
	         *
	         * @example <caption>Example 2: Sorting by a custom data-attribute</caption>
	         *
	         * // Sort the targets by the value of a `data-published-date` attribute
	         *
	         * mixer.sort('published-date:asc')
	         *     .then(function(state) {
	         *         console.log(state.activeSort.attribute === 'published-date'); // true
	         *         console.log(state.activeSort.order === 'asc'); // true
	         *     });
	         *
	         * @example <caption>Example 3: Sorting by multiple attributes</caption>
	         *
	         * // Sort the targets by the value of a `data-published-date` attribute, then by `data-title`
	         *
	         * mixer.sort('published-date:desc data-title:asc')
	         *     .then(function(state) {
	         *         console.log(state.activeSort.attribute === 'published-date'); // true
	         *         console.log(state.activeSort.order === 'desc'); // true
	         *
	         *         console.log(state.activeSort.next.attribute === 'title'); // true
	         *         console.log(state.activeSort.next.order === 'asc'); // true
	         *     });
	         *
	         * @example <caption>Example 4: Sorting by random</caption>
	         *
	         * mixer.sort('random')
	         *     .then(function(state) {
	         *         console.log(state.activeSort.order === 'random') // true
	         *     });
	         *
	         * @example <caption>Example 5: Sorting via an element collection</caption>
	         *
	         * var collection = Array.from(container.querySelectorAll('.mix'));
	         *
	         * // Swap the position of two elements in the collection:
	         *
	         * var temp = collection[1];
	         *
	         * collection[1] = collection[0];
	         * collection[0] = temp;
	         *
	         * // Pass the sorted collection to MixItUp
	         *
	         * mixer.sort(collection)
	         *     .then(function(state) {
	         *         console.log(state.targets[0] === collection[0]); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       2.0.0
	         * @param       {(string|Array.<HTMLElement>)}    sortString
	         *      A valid sort string (e.g. `'default'`, `'published-date:asc'`, or `'random'`). The sort method also accepts an array of all target elements in a user-defined order.
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        sort: function() {
	            var self        = this,
	                instruction = self.parseSortArgs(arguments);

	            return self.multimix({
	                sort: instruction.command
	            }, instruction.animate, instruction.callback);
	        },

	        /**
	         * Changes the layout of the container by adding, removing or updating a
	         * layout-specific class name. If `animation.animateResizetargets` is
	         * enabled, MixItUp will attempt to gracefully animate the width, height,
	         * and position of targets between layout states.
	         *
	         * @example
	         *
	         * .changeLayout(containerClassName [, animate] [, callback])
	         *
	         * @example <caption>Example 1: Adding a new class name to the container</caption>
	         *
	         * mixer.changeLayout('container-list')
	         *      .then(function(state) {
	         *          console.log(state.activeContainerClass === 'container-list'); // true
	         *      });
	         *
	         * @example <caption>Example 2: Removing a previously added class name from the container</caption>
	         *
	         * mixer.changeLayout('')
	         *      .then(function(state) {
	         *          console.log(state.activeContainerClass === ''); // true
	         *      });
	         *
	         * @public
	         * @instance
	         * @since       2.0.0
	         * @param       {string}    containerClassName
	         *      A layout-specific class name to add to the container.
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        changeLayout: function() {
	            var self        = this,
	                instruction = self.parseChangeLayoutArgs(arguments);

	            return self.multimix({
	                changeLayout: instruction.command
	            }, instruction.animate, instruction.callback);
	        },

	        /**
	         * Updates the contents and order of the container to reflect the provided dataset,
	         * if the dataset API is in use.
	         *
	         * The dataset API is designed for use in API-driven JavaScript applications, and
	         * can be used instead of DOM-based methods such as `.filter()`, `.sort()`,
	         * `.insert()`, etc. When used, insertion, removal, sorting and pagination can be
	         * achieved purely via changes to your data model, without the uglyness of having
	         * to interact with or query the DOM directly.
	         *
	         * @example
	         *
	         * .dataset(dataset [, animate] [, callback])
	         *
	         * @example <caption>Example 1: Rendering a dataset</caption>
	         *
	         * var myDataset = [
	         *     {id: 1, ...},
	         *     {id: 2, ...},
	         *     {id: 3, ...}
	         * ];
	         *
	         * mixer.dataset(myDataset)
	         *     .then(function(state) {
	         *         console.log(state.totalShow === 3); // true
	         *     });
	         *
	         * @example <caption>Example 2: Sorting a dataset</caption>
	         *
	         * // Create a new dataset in reverse order
	         *
	         * var newDataset = myDataset.slice().reverse();
	         *
	         * mixer.dataset(newDataset)
	         *     .then(function(state) {
	         *         console.log(state.activeDataset[0] === myDataset[2]); // true
	         *     });
	         *
	         * @example <caption>Example 3: Removing an item from the dataset</caption>
	         *
	         * console.log(myDataset.length); // 3
	         *
	         * // Create a new dataset with the last item removed.
	         *
	         * var newDataset = myDataset.slice().pop();
	         *
	         * mixer.dataset(newDataset)
	         *     .then(function(state) {
	         *         console.log(state.totalShow === 2); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {Array.<object>}    dataset
	         *      An array of objects, each one representing the underlying data model of a target to be rendered.
	         * @param       {boolean}           [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}          [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        dataset: function() {
	            var self        = this,
	                instruction = self.parseDatasetArgs(arguments),
	                operation   = null,
	                queueItem   = null,
	                animate     = false;

	            self.callActions('beforeDataset', arguments);

	            if (!self.isBusy) {
	                if (instruction.callback) self.userCallback = instruction.callback;

	                animate = (instruction.animate ^ self.config.animation.enable) ? instruction.animate : self.config.animation.enable;

	                operation = self.getDataOperation(instruction.command.dataset);

	                return self.goMix(animate, operation);
	            } else {
	                queueItem = new mixitup.QueueItem();

	                queueItem.args          = arguments;
	                queueItem.instruction   = instruction;

	                return self.queueMix(queueItem);
	            }
	        },

	        /**
	         * Performs simultaneous `filter`, `sort`, `insert`, `remove` and `changeLayout`
	         * operations as requested.
	         *
	         * @example
	         *
	         * .multimix(multimixCommand [, animate] [, callback])
	         *
	         * @example <caption>Example 1: Performing simultaneous filtering and sorting</caption>
	         *
	         * mixer.multimix({
	         *     filter: '.category-b',
	         *     sort: 'published-date:desc'
	         * })
	         *     .then(function(state) {
	         *         console.log(state.activeFilter.selector === '.category-b'); // true
	         *         console.log(state.activeSort.attribute === 'published-date'); // true
	         *     });
	         *
	         * @example <caption>Example 2: Performing simultaneous sorting, insertion, and removal</caption>
	         *
	         * console.log(mixer.getState().totalShow); // 6
	         *
	         * // NB: When inserting via `multimix()`, an object should be provided as the value
	         * // for the `insert` portion of the command, allowing for a collection of elements
	         * // and an insertion index to be specified.
	         *
	         * mixer.multimix({
	         *     sort: 'published-date:desc', // Sort the container, including any new elements
	         *     insert: {
	         *         collection: [newElementReferenceA, newElementReferenceB], // Add 2 new elements at index 5
	         *         index: 5
	         *     },
	         *     remove: existingElementReference // Remove 1 existing element
	         * })
	         *     .then(function(state) {
	         *         console.log(state.activeSort.attribute === 'published-date'); // true
	         *         console.log(state.totalShow === 7); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       2.0.0
	         * @param       {object}    multimixCommand
	         *      An object containing one or more things to do
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        multimix: function() {
	            var self        = this,
	                operation   = null,
	                animate     = false,
	                queueItem   = null,
	                instruction = self.parseMultimixArgs(arguments);

	            self.callActions('beforeMultimix', arguments);

	            if (!self.isBusy) {
	                operation = self.getOperation(instruction.command);

	                if (self.config.controls.enable) {
	                    // Update controls for API calls

	                    if (instruction.command.filter && !self.isToggling) {
	                        // As we are not toggling, reset the toggle array
	                        // so new filter overrides existing toggles

	                        self.toggleArray.length = 0;
	                        self.buildToggleArray(operation.command);
	                    }

	                    if (self.queue.length < 1) {
	                        self.updateControls(operation.command);
	                    }
	                }

	                if (instruction.callback) self.userCallback = instruction.callback;

	                // Always allow the instruction to override the instance setting

	                animate = (instruction.animate ^ self.config.animation.enable) ?
	                    instruction.animate :
	                    self.config.animation.enable;

	                self.callFilters('operationMultimix', operation, arguments);

	                return self.goMix(animate, operation);
	            } else {
	                queueItem = new mixitup.QueueItem();

	                queueItem.args           = arguments;
	                queueItem.instruction    = instruction;
	                queueItem.triggerElement = self.lastClicked;
	                queueItem.isToggling     = self.isToggling;

	                return self.queueMix(queueItem);
	            }
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {object}            multimixCommand
	         * @param   {boolean}           [isPreFetch]
	         *      An optional boolean indicating that the operation is being pre-fetched for execution at a later time.
	         * @return  {Operation|null}
	         */

	        getOperation: function(multimixCommand) {
	            var self                = this,
	                sortCommand         = multimixCommand.sort,
	                filterCommand       = multimixCommand.filter,
	                changeLayoutCommand = multimixCommand.changeLayout,
	                removeCommand       = multimixCommand.remove,
	                insertCommand       = multimixCommand.insert,
	                operation           = new mixitup.Operation();

	            operation = self.callFilters('operationUnmappedGetOperation', operation, arguments);

	            operation.id                = h.randomHex();
	            operation.command           = multimixCommand;
	            operation.startState        = self.state;
	            operation.triggerElement    = self.lastClicked;

	            if (self.isBusy) {
	                if (self.config.debug.showWarnings) {
	                    console.warn(mixitup.messages.warningGetOperationInstanceBusy());
	                }

	                return null;
	            }

	            if (insertCommand) {
	                self.insertTargets(insertCommand, operation);
	            }

	            if (removeCommand) {
	                operation.toRemove = removeCommand.targets;
	            }

	            operation.startSort = operation.newSort = operation.startState.activeSort;
	            operation.startOrder = operation.newOrder = self.targets;

	            if (sortCommand) {
	                operation.startSort = operation.startState.activeSort;
	                operation.newSort   = sortCommand;

	                operation.willSort = self.willSort(sortCommand, operation.startState.activeSort);

	                if (operation.willSort) {
	                    self.sortOperation(operation);
	                }
	            }

	            operation.startFilter = operation.startState.activeFilter;

	            if (filterCommand) {
	                operation.newFilter = filterCommand;
	            } else {
	                operation.newFilter = h.extend(new mixitup.CommandFilter(), operation.startFilter);
	            }

	            if (operation.newFilter.selector === 'all') {
	                operation.newFilter.selector = self.config.selectors.target;
	            } else if (operation.newFilter.selector === 'none') {
	                operation.newFilter.selector = '';
	            }

	            self.filterOperation(operation);

	            operation.startContainerClassName = operation.startState.activeContainerClassName;

	            if (changeLayoutCommand) {
	                operation.newContainerClassName = changeLayoutCommand.containerClassName;

	                if (operation.newContainerClassName !== operation.startContainerClassName) {
	                    operation.willChangeLayout = true;
	                }
	            } else {
	                operation.newContainerClassName = operation.startContainerClassName;
	            }

	            if (self.config.animation.enable) {
	                // Populate the operation's position data

	                self.getStartMixData(operation);
	                self.setInter(operation);

	                operation.docState = h.getDocumentState(self.dom.document);

	                self.getInterMixData(operation);
	                self.setFinal(operation);
	                self.getFinalMixData(operation);

	                self.parseEffects();

	                operation.hasEffect = self.hasEffect();

	                self.getTweenData(operation);
	            }

	            if (operation.willSort) {
	                self.targets = operation.newOrder;
	            }

	            operation.newState = self.buildState(operation);

	            return self.callFilters('operationMappedGetOperation', operation, arguments);
	        },

	        /**
	         * Renders a previously created operation at a specific point in its path, as
	         * determined by a multiplier between 0 and 1.
	         *
	         * @example
	         * .tween(operation, multiplier)
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {mixitup.Operation}     operation
	         *      An operation object created via the `getOperation` method
	         *
	         * @param   {Float}                 multiplier
	         *      Any number between 0 and 1 representing the percentage complete of the operation
	         * @return  {void}
	         */

	        tween: function(operation, multiplier) {
	            var target          = null,
	                posData         = null,
	                toHideIndex     = -1,
	                i               = -1;

	            multiplier = Math.min(multiplier, 1);
	            multiplier = Math.max(multiplier, 0);

	            for (i = 0; target = operation.show[i]; i++) {
	                posData = operation.showPosData[i];

	                target.applyTween(posData, multiplier);
	            }

	            for (i = 0; target = operation.hide[i]; i++) {
	                if (target.isShown) {
	                    target.hide();
	                }

	                if ((toHideIndex = operation.toHide.indexOf(target)) > -1) {
	                    posData = operation.toHidePosData[toHideIndex];

	                    if (!target.isShown) {
	                        target.show();
	                    }

	                    target.applyTween(posData, multiplier);
	                }
	            }
	        },

	        /**
	         * Inserts one or more new target elements into the container at a specified
	         * index.
	         *
	         * To be indexed as targets, new elements must match the `selectors.target`
	         * selector (`'.mix'` by default).
	         *
	         * @example
	         *
	         * .insert(newElements [, index] [, animate], [, callback])
	         *
	         * @example <caption>Example 1: Inserting a single element via reference</caption>
	         *
	         * console.log(mixer.getState().totalShow); // 0
	         *
	         * // Create a new element
	         *
	         * var newElement = document.createElement('div');
	         * newElement.classList.add('mix');
	         *
	         * mixer.insert(newElement)
	         *     .then(function(state) {
	         *         console.log(state.totalShow === 1); // true
	         *     });
	         *
	         * @example <caption>Example 2: Inserting a single element via HTML string</caption>
	         *
	         * console.log(mixer.getState().totalShow); // 1
	         *
	         * // Create a new element via reference
	         *
	         * var newElementHtml = '&lt;div class="mix"&gt;&lt;/div&gt;';
	         *
	         * // Create and insert the new element at index 1
	         *
	         * mixer.insert(newElementHtml, 1)
	         *     .then(function(state) {
	         *         console.log(state.totalShow === 2); // true
	         *         console.log(state.show[1].outerHTML === newElementHtml); // true
	         *     });
	         *
	         * @example <caption>Example 3: Inserting multiple elements via reference</caption>
	         *
	         * console.log(mixer.getState().totalShow); // 2
	         *
	         * // Create an array of new elements to insert.
	         *
	         * var newElement1 = document.createElement('div');
	         * var newElement2 = document.createElement('div');
	         *
	         * newElement1.classList.add('mix');
	         * newElement2.classList.add('mix');
	         *
	         * var newElementsCollection = [newElement1, newElement2];
	         *
	         * // Insert the new elements starting at index 1
	         *
	         * mixer.insert(newElementsCollection, 1)
	         *     .then(function(state) {
	         *         console.log(state.totalShow === 4); // true
	         *         console.log(state.show[1] === newElement1); // true
	         *         console.log(state.show[2] === newElement2); // true
	         *     });
	         *
	         * @example <caption>Example 4: Inserting a jQuery collection object containing one or more elements</caption>
	         *
	         * console.log(mixer.getState().totalShow); // 4
	         *
	         * var $newElement = $('&lt;div class="mix"&gt;&lt;/div&gt;');
	         *
	         * // Insert the new elements starting at index 3
	         *
	         * mixer.insert($newElement, 3)
	         *     .then(function(state) {
	         *         console.log(state.totalShow === 5); // true
	         *         console.log(state.show[3] === $newElement[0]); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       2.0.0
	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
	         * @param       {number}    index=0
	         *      The index at which to insert the new element(s). `0` by default.
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        insert: function() {
	            var self = this,
	                args = self.parseInsertArgs(arguments);

	            return self.multimix({
	                insert: args.command
	            }, args.animate, args.callback);
	        },

	        /**
	         * Inserts one or more new elements before a provided reference element.
	         *
	         * @example
	         *
	         * .insertBefore(newElements, referenceElement [, animate] [, callback])
	         *
	         * @example <caption>Example: Inserting a new element before a reference element</caption>
	         *
	         * // An existing reference element is chosen at index 2
	         *
	         * var referenceElement = mixer.getState().show[2];
	         *
	         * // Create a new element
	         *
	         * var newElement = document.createElement('div');
	         * newElement.classList.add('mix');
	         *
	         * mixer.insertBefore(newElement, referenceElement)
	         *     .then(function(state) {
	         *         // The new element is inserted into the container at index 2, before the reference element
	         *
	         *         console.log(state.show[2] === newElement); // true
	         *
	         *         // The reference element is now at index 3
	         *
	         *         console.log(state.show[3] === referenceElement); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
	         * @param       {HTMLElement}    referenceElement
	         *      A reference to an existing element in the container to insert new elements before.
	         *@param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        insertBefore: function() {
	            var self = this,
	                args = self.parseInsertArgs(arguments);

	            return self.insert(args.command.collection, 'before', args.command.sibling, args.animate, args.callback);
	        },

	        /**
	         * Inserts one or more new elements after a provided reference element.
	         *
	         * @example
	         *
	         * .insertAfter(newElements, referenceElement [, animate] [, callback])
	         *
	         * @example <caption>Example: Inserting a new element after a reference element</caption>
	         *
	         * // An existing reference element is chosen at index 2
	         *
	         * var referenceElement = mixer.getState().show[2];
	         *
	         * // Create a new element
	         *
	         * var newElement = document.createElement('div');
	         * newElement.classList.add('mix');
	         *
	         * mixer.insertAfter(newElement, referenceElement)
	         *     .then(function(state) {
	         *         // The new element is inserted into the container at index 3, after the reference element
	         *
	         *         console.log(state.show[3] === newElement); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
	         * @param       {HTMLElement}    referenceElement
	         *      A reference to an existing element in the container to insert new elements after.
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        insertAfter: function() {
	            var self = this,
	                args = self.parseInsertArgs(arguments);

	            return self.insert(args.command.collection, 'after', args.command.sibling, args.animate, args.callback);
	        },

	        /**
	         * Inserts one or more new elements into the container before all existing targets.
	         *
	         * @example
	         *
	         * .prepend(newElements [,animate] [,callback])
	         *
	         * @example <caption>Example: Prepending a new element</caption>
	         *
	         * // Create a new element
	         *
	         * var newElement = document.createElement('div');
	         * newElement.classList.add('mix');
	         *
	         * // Insert the element into the container
	         *
	         * mixer.prepend(newElement)
	         *     .then(function(state) {
	         *         console.log(state.show[0] === newElement); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        prepend: function() {
	            var self = this,
	                args = self.parseInsertArgs(arguments);

	            return self.insert(0, args.command.collection, args.animate, args.callback);
	        },

	        /**
	         * Inserts one or more new elements into the container after all existing targets.
	         *
	         * @example
	         *
	         * .append(newElements [,animate] [,callback])
	         *
	         * @example <caption>Example: Appending a new element</caption>
	         *
	         * // Create a new element
	         *
	         * var newElement = document.createElement('div');
	         * newElement.classList.add('mix');
	         *
	         * // Insert the element into the container
	         *
	         * mixer.append(newElement)
	         *     .then(function(state) {
	         *         console.log(state.show[state.show.length - 1] === newElement); // true
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        append: function() {
	            var self = this,
	                args = self.parseInsertArgs(arguments);

	            return self.insert(self.state.totalTargets, args.command.collection, args.animate, args.callback);
	        },

	        /**
	         * Removes one or more existing target elements from the container.
	         *
	         * @example
	         *
	         * .remove(elements [, animate] [, callback])
	         *
	         * @example <caption>Example 1: Removing an element by reference</caption>
	         *
	         * var elementToRemove = containerEl.firstElementChild;
	         *
	         * mixer.remove(elementToRemove)
	         *      .then(function(state) {
	         *          console.log(state.targets.indexOf(elementToRemove) === -1); // true
	         *      });
	         *
	         * @example <caption>Example 2: Removing a collection of elements by reference</caption>
	         *
	         * var elementsToRemove = containerEl.querySelectorAll('.category-a');
	         *
	         * console.log(elementsToRemove.length) // 3
	         *
	         * mixer.remove(elementsToRemove)
	         *      .then(function() {
	         *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
	         *      });
	         *
	         * @example <caption>Example 3: Removing one or more elements by selector</caption>
	         *
	         * mixer.remove('.category-a')
	         *      .then(function() {
	         *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
	         *      });
	         *
	         * @example <caption>Example 4: Removing an element by index</caption>
	         *
	         * console.log(mixer.getState.totalShow); // 4
	         *
	         * // Remove the element at index 3
	         *
	         * mixer.remove(3)
	         *      .then(function(state) {
	         *          console.log(state.totalShow); // 3
	         *          console.log(state.show[3]); // undefined
	         *      });
	         *
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {(HTMLElement|Array.<HTMLElement>|string|number)}    elements
	         *      A reference to a single element to remove, an array-like collection of elements, a selector string, or the index of an element to remove.
	         * @param       {boolean}   [animate=true]
	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
	         * @param       {function}  [callback=null]
	         *      An optional callback function to be invoked after the operation has completed.
	         * @return      {Promise.<mixitup.State>}
	         *      A promise resolving with the current state object.
	         */

	        remove: function() {
	            var self = this,
	                args = self.parseRemoveArgs(arguments);

	            return self.multimix({
	                remove: args.command
	            }, args.animate, args.callback);
	        },

	        /**
	         * Retrieves the the value of any property or sub-object within the current
	         * mixitup configuration, or the whole configuration object.
	         *
	         * @example
	         *
	         * .getConfig([stringKey])
	         *
	         * @example <caption>Example 1: retrieve the entire configuration object</caption>
	         *
	         * var config = mixer.getConfig(); // Config { ... }
	         *
	         * @example <caption>Example 2: retrieve a named sub-object of configuration object</caption>
	         *
	         * var animation = mixer.getConfig('animation'); // ConfigAnimation { ... }
	         *
	         * @example <caption>Example 3: retrieve a value of configuration object via a dot-notation string key</caption>
	         *
	         * var effects = mixer.getConfig('animation.effects'); // 'fade scale'
	         *
	         * @public
	         * @instance
	         * @since       2.0.0
	         * @param       {string}    [stringKey]    A "dot-notation" string key
	         * @return      {*}
	         */

	        getConfig: function(stringKey) {
	            var self    = this,
	                value   = null;

	            if (!stringKey) {
	                value = self.config;
	            } else {
	                value = h.getProperty(self.config, stringKey);
	            }

	            return self.callFilters('valueGetConfig', value, arguments);
	        },

	        /**
	         * Updates the configuration of the mixer, after it has been instantiated.
	         *
	         * See the Configuration Object documentation for a full list of avilable
	         * configuration options.
	         *
	         * @example
	         *
	         * .configure(config)
	         *
	         * @example <caption>Example 1: Updating animation options</caption>
	         *
	         * mixer.configure({
	         *     animation: {
	         *         effects: 'fade translateX(-100%)',
	         *         duration: 300
	         *     }
	         * });
	         *
	         * @example <caption>Example 2: Removing a callback after it has been set</caption>
	         *
	         * var mixer;
	         *
	         * function handleMixEndOnce() {
	         *     // Do something ..
	         *
	         *     // Then nullify the callback
	         *
	         *     mixer.configure({
	         *         callbacks: {
	         *             onMixEnd: null
	         *         }
	         *     });
	         * };
	         *
	         * // Instantiate a mixer with a callback defined
	         *
	         * mixer = mixitup(containerEl, {
	         *     callbacks: {
	         *         onMixEnd: handleMixEndOnce
	         *     }
	         * });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {object}    config
	         *      An object containing one of more configuration options.
	         * @return      {void}
	         */

	        configure: function(config) {
	            var self = this;

	            self.callActions('beforeConfigure', arguments);

	            h.extend(self.config, config, true, true);

	            self.callActions('afterConfigure', arguments);
	        },

	        /**
	         * Returns an object containing information about the current state of the
	         * mixer. See the State Object documentation for more information.
	         *
	         * NB: State objects are immutable and should therefore be regenerated
	         * after any operation.
	         *
	         * @example
	         *
	         * .getState();
	         *
	         * @example <caption>Example: Retrieving a state object</caption>
	         *
	         * var state = mixer.getState();
	         *
	         * console.log(state.totalShow + 'targets are currently shown');
	         *
	         * @public
	         * @instance
	         * @since       2.0.0
	         * @return      {mixitup.State} An object reflecting the current state of the mixer.
	         */

	        getState: function() {
	            var self    = this,
	                state   = null;

	            state = new mixitup.State();

	            h.extend(state, self.state);

	            h.freeze(state);

	            return self.callFilters('stateGetState', state, arguments);
	        },

	        /**
	         * Forces the re-indexing all targets within the container.
	         *
	         * This should only be used if some other piece of code in your application
	         * has manipulated the contents of your container, which should be avoided.
	         *
	         * If you need to add or remove target elements from the container, use
	         * the built-in `.insert()` or `.remove()` methods, and MixItUp will keep
	         * itself up to date.
	         *
	         * @example
	         *
	         * .forceRefresh()
	         *
	         * @example <caption>Example: Force refreshing the mixer after external DOM manipulation</caption>
	         *
	         * console.log(mixer.getState().totalShow); // 3
	         *
	         * // An element is removed from the container via some external DOM manipulation code:
	         *
	         * containerEl.removeChild(containerEl.firstElementChild);
	         *
	         * // The mixer does not know that the number of targets has changed:
	         *
	         * console.log(mixer.getState().totalShow); // 3
	         *
	         * mixer.forceRefresh();
	         *
	         * // After forceRefresh, the mixer is in sync again:
	         *
	         * console.log(mixer.getState().totalShow); // 2
	         *
	         * @public
	         * @instance
	         * @since 2.1.2
	         * @return {void}
	         */

	        forceRefresh: function() {
	            var self = this;

	            self.indexTargets();
	        },

	        /**
	         * Forces the re-rendering of all targets when using the Dataset API.
	         *
	         * By default, targets are only re-rendered when `data.dirtyCheck` is
	         * enabled, and an item's data has changed when `dataset()` is called.
	         *
	         * The `forceRender()` method allows for the re-rendering of all targets
	         * in response to some arbitrary event, such as the changing of the target
	         * render function.
	         *
	         * Targets are rendered against their existing data.
	         *
	         * @example
	         *
	         * .forceRender()
	         *
	         * @example <caption>Example: Force render targets after changing the target render function</caption>
	         *
	         * console.log(container.innerHTML); // ... &lt;span class="mix"&gt;Foo&lt;/span&gt; ...
	         *
	         * mixer.configure({
	         *     render: {
	         *         target: (item) => `&lt;a href="/${item.slug}/" class="mix"&gt;${item.title}&lt;/a&gt;`
	         *     }
	         * });
	         *
	         * mixer.forceRender();
	         *
	         * console.log(container.innerHTML); // ... &lt;a href="/foo/" class="mix"&gt;Foo&lt;/a&gt; ...
	         *
	         * @public
	         * @instance
	         * @since 3.2.1
	         * @return {void}
	         */

	        forceRender: function() {
	            var self    = this,
	                target  = null,
	                el      = null,
	                id      = '';

	            for (id in self.cache) {
	                target = self.cache[id];

	                el = target.render(target.data);

	                if (el !== target.dom.el) {
	                    // Update target element reference

	                    if (target.isInDom) {
	                        target.unbindEvents();

	                        self.dom.parent.replaceChild(el, target.dom.el);
	                    }

	                    if (!target.isShown) {
	                        el.style.display = 'none';
	                    }

	                    target.dom.el = el;

	                    if (target.isInDom) {
	                        target.bindEvents();
	                    }
	                }
	            }

	            self.state = self.buildState(self.lastOperation);
	        },

	        /**
	         * Removes mixitup functionality from the container, unbinds all control
	         * event handlers, and deletes the mixer instance from MixItUp's internal
	         * cache.
	         *
	         * This should be performed whenever a mixer's container is removed from
	         * the DOM, such as during a page change in a single page application,
	         * or React's `componentWillUnmount()`.
	         *
	         * @example
	         *
	         * .destroy([cleanUp])
	         *
	         * @example <caption>Example: Destroying the mixer before removing its container element</caption>
	         *
	         * mixer.destroy();
	         *
	         * containerEl.parentElement.removeChild(containerEl);
	         *
	         * @public
	         * @instance
	         * @since   2.0.0
	         * @param   {boolean}   [cleanUp=false]
	         *     An optional boolean dictating whether or not to clean up any inline `display: none;` styling applied to hidden targets.
	         * @return  {void}
	         */

	        destroy: function(cleanUp) {
	            var self    = this,
	                control = null,
	                target  = null,
	                i       = 0;

	            self.callActions('beforeDestroy', arguments);

	            for (i = 0; control = self.controls[i]; i++) {
	                control.removeBinding(self);
	            }

	            for (i = 0; target = self.targets[i]; i++) {
	                if (cleanUp) {
	                    target.show();
	                }

	                target.unbindEvents();
	            }

	            if (self.dom.container.id.match(/^MixItUp/)) {
	                self.dom.container.removeAttribute('id');
	            }

	            delete mixitup.instances[self.id];

	            self.callActions('afterDestroy', arguments);
	        }
	    });

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.IMoveData = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.posIn          = null;
	        this.posOut         = null;
	        this.operation      = null;
	        this.callback       = null;
	        this.statusChange   = '';
	        this.duration       = -1;
	        this.staggerIndex   = -1;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.IMoveData);

	    mixitup.IMoveData.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.IMoveData.prototype.constructor = mixitup.IMoveData;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.TargetDom = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.el = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.TargetDom);

	    mixitup.TargetDom.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.TargetDom.prototype.constructor = mixitup.TargetDom;

	    /**
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.Target = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.id         = '';
	        this.sortString = '';
	        this.mixer      = null;
	        this.callback   = null;
	        this.isShown    = false;
	        this.isBound    = false;
	        this.isExcluded = false;
	        this.isInDom    = false;
	        this.handler    = null;
	        this.operation  = null;
	        this.data       = null;
	        this.dom        = new mixitup.TargetDom();

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Target);

	    mixitup.Target.prototype = Object.create(mixitup.Base.prototype);

	    h.extend(mixitup.Target.prototype, {
	        constructor: mixitup.Target,

	        /**
	         * Initialises a newly instantiated Target.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {(Element|null)}    el
	         * @param   {object}            mixer
	         * @param   {object}            [data]
	         * @return  {void}
	         */

	        init: function(el, mixer, data) {
	            var self = this,
	                id   = '';

	            self.callActions('beforeInit', arguments);

	            self.mixer = mixer;

	            if (!el) {
	                // If no element is provided, render it

	                el = self.render(data);
	            }

	            self.cacheDom(el);

	            self.bindEvents();

	            if (self.dom.el.style.display !== 'none') {
	                self.isShown = true;
	            }

	            if (data && mixer.config.data.uidKey) {
	                if (typeof (id = data[mixer.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
	                    throw new TypeError(mixitup.messages.errorDatasetInvalidUidKey({
	                        uidKey: mixer.config.data.uidKey
	                    }));
	                }

	                self.id     = id;
	                self.data   = data;

	                mixer.cache[id] = self;
	            }

	            self.callActions('afterInit', arguments);
	        },

	        /**
	         * Renders the target element using a user-defined renderer function.
	         *
	         * @private
	         * @instance
	         * @since   3.1.4
	         * @param   {object} data
	         * @return  {void}
	         */

	        render: function(data) {
	            var self    = this,
	                render  = null,
	                el      = null,
	                temp    = null,
	                output  = '';

	            self.callActions('beforeRender', arguments);

	            render = self.callFilters('renderRender', self.mixer.config.render.target, arguments);

	            if (typeof render !== 'function') {
	                throw new TypeError(mixitup.messages.errorDatasetRendererNotSet());
	            }

	            output = render(data);

	            if (output && typeof output === 'object' && h.isElement(output)) {
	                el = output;
	            } else if (typeof output === 'string') {
	                temp = document.createElement('div');
	                temp.innerHTML = output;

	                el = temp.firstElementChild;
	            }

	            return self.callFilters('elRender', el, arguments);
	        },

	        /**
	         * Caches references of DOM elements neccessary for the target's functionality.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Element} el
	         * @return  {void}
	         */

	        cacheDom: function(el) {
	            var self = this;

	            self.callActions('beforeCacheDom', arguments);

	            self.dom.el = el;

	            self.callActions('afterCacheDom', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {string}    attributeName
	         * @return  {void}
	         */

	        getSortString: function(attributeName) {
	            var self    = this,
	                value   = self.dom.el.getAttribute('data-' + attributeName) || '';

	            self.callActions('beforeGetSortString', arguments);

	            value = isNaN(value * 1) ?
	                value.toLowerCase() :
	                value * 1;

	            self.sortString = value;

	            self.callActions('afterGetSortString', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @return  {void}
	         */

	        show: function() {
	            var self = this;

	            self.callActions('beforeShow', arguments);

	            if (!self.isShown) {
	                self.dom.el.style.display = '';

	                self.isShown = true;
	            }

	            self.callActions('afterShow', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @return  {void}
	         */

	        hide: function() {
	            var self = this;

	            self.callActions('beforeHide', arguments);

	            if (self.isShown) {
	                self.dom.el.style.display = 'none';

	                self.isShown = false;
	            }

	            self.callActions('afterHide', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {mixitup.IMoveData} moveData
	         * @return  {void}
	         */

	        move: function(moveData) {
	            var self = this;

	            self.callActions('beforeMove', arguments);

	            if (!self.isExcluded) {
	                self.mixer.targetsMoved++;
	            }

	            self.applyStylesIn(moveData);

	            requestAnimationFrame(function() {
	                self.applyStylesOut(moveData);
	            });

	            self.callActions('afterMove', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {object}    posData
	         * @param   {number}    multiplier
	         * @return  {void}
	         */

	        applyTween: function(posData, multiplier) {
	            var self                    = this,
	                propertyName            = '',
	                tweenData               = null,
	                posIn                   = posData.posIn,
	                currentTransformValues  = [],
	                currentValues           = new mixitup.StyleData(),
	                i                       = -1;

	            self.callActions('beforeApplyTween', arguments);

	            currentValues.x     = posIn.x;
	            currentValues.y     = posIn.y;

	            if (multiplier === 0) {
	                self.hide();
	            } else if (!self.isShown) {
	                self.show();
	            }

	            for (i = 0; propertyName = mixitup.features.TWEENABLE[i]; i++) {
	                tweenData = posData.tweenData[propertyName];

	                if (propertyName === 'x') {
	                    if (!tweenData) continue;

	                    currentValues.x = posIn.x + (tweenData * multiplier);
	                } else if (propertyName === 'y') {
	                    if (!tweenData) continue;

	                    currentValues.y = posIn.y + (tweenData * multiplier);
	                } else if (tweenData instanceof mixitup.TransformData) {
	                    if (!tweenData.value) continue;

	                    currentValues[propertyName].value =
	                        posIn[propertyName].value + (tweenData.value * multiplier);

	                    currentValues[propertyName].unit  = tweenData.unit;

	                    currentTransformValues.push(
	                        propertyName + '(' + currentValues[propertyName].value + tweenData.unit + ')'
	                    );
	                } else {
	                    if (!tweenData) continue;

	                    currentValues[propertyName] = posIn[propertyName] + (tweenData * multiplier);

	                    self.dom.el.style[propertyName] = currentValues[propertyName];
	                }
	            }

	            if (currentValues.x || currentValues.y) {
	                currentTransformValues.unshift('translate(' + currentValues.x + 'px, ' + currentValues.y + 'px)');
	            }

	            if (currentTransformValues.length) {
	                self.dom.el.style[mixitup.features.transformProp] = currentTransformValues.join(' ');
	            }

	            self.callActions('afterApplyTween', arguments);
	        },

	        /**
	         * Applies the initial styling to a target element before any transition
	         * is applied.
	         *
	         * @private
	         * @instance
	         * @param   {mixitup.IMoveData} moveData
	         * @return  {void}
	         */

	        applyStylesIn: function(moveData) {
	            var self            = this,
	                posIn           = moveData.posIn,
	                isFading        = self.mixer.effectsIn.opacity !== 1,
	                transformValues = [];

	            self.callActions('beforeApplyStylesIn', arguments);

	            transformValues.push('translate(' + posIn.x + 'px, ' + posIn.y + 'px)');

	            if (self.mixer.config.animation.animateResizeTargets) {
	                if (moveData.statusChange !== 'show') {
	                    // Don't apply posIn width or height or showing, as will be 0

	                    self.dom.el.style.width  = posIn.width + 'px';
	                    self.dom.el.style.height = posIn.height + 'px';
	                }

	                self.dom.el.style.marginRight  = posIn.marginRight + 'px';
	                self.dom.el.style.marginBottom = posIn.marginBottom + 'px';
	            }

	            isFading && (self.dom.el.style.opacity = posIn.opacity);

	            if (moveData.statusChange === 'show') {
	                transformValues = transformValues.concat(self.mixer.transformIn);
	            }

	            self.dom.el.style[mixitup.features.transformProp] = transformValues.join(' ');

	            self.callActions('afterApplyStylesIn', arguments);
	        },

	        /**
	         * Applies a transition followed by the final styles for the element to
	         * transition towards.
	         *
	         * @private
	         * @instance
	         * @param   {mixitup.IMoveData} moveData
	         * @return  {void}
	         */

	        applyStylesOut: function(moveData) {
	            var self            = this,
	                transitionRules = [],
	                transformValues = [],
	                isResizing      = self.mixer.config.animation.animateResizeTargets,
	                isFading        = typeof self.mixer.effectsIn.opacity !== 'undefined';

	            self.callActions('beforeApplyStylesOut', arguments);

	            // Build the transition rules

	            transitionRules.push(self.writeTransitionRule(
	                mixitup.features.transformRule,
	                moveData.staggerIndex
	            ));

	            if (moveData.statusChange !== 'none') {
	                transitionRules.push(self.writeTransitionRule(
	                    'opacity',
	                    moveData.staggerIndex,
	                    moveData.duration
	                ));
	            }

	            if (isResizing) {
	                transitionRules.push(self.writeTransitionRule(
	                    'width',
	                    moveData.staggerIndex,
	                    moveData.duration
	                ));

	                transitionRules.push(self.writeTransitionRule(
	                    'height',
	                    moveData.staggerIndex,
	                    moveData.duration
	                ));

	                transitionRules.push(self.writeTransitionRule(
	                    'margin',
	                    moveData.staggerIndex,
	                    moveData.duration
	                ));
	            }

	            // If no callback was provided, the element will
	            // not transition in any way so tag it as "immovable"

	            if (!moveData.callback) {
	                self.mixer.targetsImmovable++;

	                if (self.mixer.targetsMoved === self.mixer.targetsImmovable) {
	                    // If the total targets moved is equal to the
	                    // number of immovable targets, the operation
	                    // should be considered finished

	                    self.mixer.cleanUp(moveData.operation);
	                }

	                return;
	            }

	            // If the target will transition in some fasion,
	            // assign a callback function

	            self.operation = moveData.operation;
	            self.callback = moveData.callback;

	            // As long as the target is not excluded, increment
	            // the total number of targets bound

	            !self.isExcluded && self.mixer.targetsBound++;

	            // Tag the target as bound to differentiate from transitionEnd
	            // events that may come from stylesheet driven effects

	            self.isBound = true;

	            // Apply the transition

	            self.applyTransition(transitionRules);

	            // Apply width, height and margin negation

	            if (isResizing && moveData.posOut.width > 0 && moveData.posOut.height > 0) {
	                self.dom.el.style.width        = moveData.posOut.width + 'px';
	                self.dom.el.style.height       = moveData.posOut.height + 'px';
	                self.dom.el.style.marginRight  = moveData.posOut.marginRight + 'px';
	                self.dom.el.style.marginBottom = moveData.posOut.marginBottom + 'px';
	            }

	            if (!self.mixer.config.animation.nudge && moveData.statusChange === 'hide') {
	                // If we're not nudging, the translation should be
	                // applied before any other transforms to prevent
	                // lateral movement

	                transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
	            }

	            // Apply fade

	            switch (moveData.statusChange) {
	                case 'hide':
	                    isFading && (self.dom.el.style.opacity = self.mixer.effectsOut.opacity);

	                    transformValues = transformValues.concat(self.mixer.transformOut);

	                    break;
	                case 'show':
	                    isFading && (self.dom.el.style.opacity = 1);
	            }

	            if (
	                self.mixer.config.animation.nudge ||
	                (!self.mixer.config.animation.nudge && moveData.statusChange !== 'hide')
	            ) {
	                // Opposite of above - apply translate after
	                // other transform

	                transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
	            }

	            // Apply transforms

	            self.dom.el.style[mixitup.features.transformProp] = transformValues.join(' ');

	            self.callActions('afterApplyStylesOut', arguments);
	        },

	        /**
	         * Combines the name of a CSS property with the appropriate duration and delay
	         * values to created a valid transition rule.
	         *
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {string}    property
	         * @param   {number}    staggerIndex
	         * @param   {number}    duration
	         * @return  {string}
	         */

	        writeTransitionRule: function(property, staggerIndex, duration) {
	            var self  = this,
	                delay = self.getDelay(staggerIndex),
	                rule  = '';

	            rule = property + ' ' +
	                (duration > 0 ? duration : self.mixer.config.animation.duration) + 'ms ' +
	                delay + 'ms ' +
	                (property === 'opacity' ? 'linear' : self.mixer.config.animation.easing);

	            return self.callFilters('ruleWriteTransitionRule', rule, arguments);
	        },

	        /**
	         * Calculates the transition delay for each target element based on its index, if
	         * staggering is applied. If defined, A custom `animation.staggerSeqeuence`
	         * function can be used to manipulate the order of indices to produce custom
	         * stagger effects (e.g. for use in a grid with irregular row lengths).
	         *
	         * @private
	         * @instance
	         * @since   2.0.0
	         * @param   {number}    index
	         * @return  {number}
	         */

	        getDelay: function(index) {
	            var self    = this,
	                delay   = -1;

	            if (typeof self.mixer.config.animation.staggerSequence === 'function') {
	                index = self.mixer.config.animation.staggerSequence.call(self, index, self.state);
	            }

	            delay = !!self.mixer.staggerDuration ? index * self.mixer.staggerDuration : 0;

	            return self.callFilters('delayGetDelay', delay, arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {string[]}  rules
	         * @return  {void}
	         */

	        applyTransition: function(rules) {
	            var self                = this,
	                transitionString    = rules.join(', ');

	            self.callActions('beforeApplyTransition', arguments);

	            self.dom.el.style[mixitup.features.transitionProp] = transitionString;

	            self.callActions('afterApplyTransition', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Event} e
	         * @return  {void}
	         */

	        handleTransitionEnd: function(e) {
	            var self        = this,
	                propName    = e.propertyName,
	                canResize   = self.mixer.config.animation.animateResizeTargets;

	            self.callActions('beforeHandleTransitionEnd', arguments);

	            if (
	                self.isBound &&
	                e.target.matches(self.mixer.config.selectors.target) &&
	                (
	                    propName.indexOf('transform') > -1 ||
	                    propName.indexOf('opacity') > -1 ||
	                    canResize && propName.indexOf('height') > -1 ||
	                    canResize && propName.indexOf('width') > -1 ||
	                    canResize && propName.indexOf('margin') > -1
	                )
	            ) {
	                self.callback.call(self, self.operation);

	                self.isBound = false;
	                self.callback = null;
	                self.operation = null;
	            }

	            self.callActions('afterHandleTransitionEnd', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {Event}     e
	         * @return  {void}
	         */

	        eventBus: function(e) {
	            var self = this;

	            self.callActions('beforeEventBus', arguments);

	            switch (e.type) {
	                case 'webkitTransitionEnd':
	                case 'transitionend':
	                    self.handleTransitionEnd(e);
	            }

	            self.callActions('afterEventBus', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @return  {void}
	         */

	        unbindEvents: function() {
	            var self = this;

	            self.callActions('beforeUnbindEvents', arguments);

	            h.off(self.dom.el, 'webkitTransitionEnd', self.handler);
	            h.off(self.dom.el, 'transitionend', self.handler);

	            self.callActions('afterUnbindEvents', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @return  {void}
	         */

	        bindEvents: function() {
	            var self                = this,
	                transitionEndEvent  = '';

	            self.callActions('beforeBindEvents', arguments);

	            transitionEndEvent = mixitup.features.transitionPrefix === 'webkit' ? 'webkitTransitionEnd' : 'transitionend';

	            self.handler = function(e) {
	                return self.eventBus(e);
	            };

	            h.on(self.dom.el, transitionEndEvent, self.handler);

	            self.callActions('afterBindEvents', arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since   3.0.0
	         * @param   {boolean}   [getBox]
	         * @return  {PosData}
	         */

	        getPosData: function(getBox) {
	            var self    = this,
	                styles  = {},
	                rect    = null,
	                posData = new mixitup.StyleData();

	            self.callActions('beforeGetPosData', arguments);

	            posData.x = self.dom.el.offsetLeft;
	            posData.y = self.dom.el.offsetTop;

	            if (self.mixer.config.animation.animateResizeTargets || getBox) {
	                rect = self.dom.el.getBoundingClientRect();

	                posData.top     = rect.top;
	                posData.right   = rect.right;
	                posData.bottom  = rect.bottom;
	                posData.left    = rect.left;

	                posData.width  = rect.width;
	                posData.height = rect.height;
	            }

	            if (self.mixer.config.animation.animateResizeTargets) {
	                styles = window.getComputedStyle(self.dom.el);

	                posData.marginBottom = parseFloat(styles.marginBottom);
	                posData.marginRight  = parseFloat(styles.marginRight);
	            }

	            return self.callFilters('posDataGetPosData', posData, arguments);
	        },

	        /**
	         * @private
	         * @instance
	         * @since       3.0.0
	         * @return      {void}
	         */

	        cleanUp: function() {
	            var self = this;

	            self.callActions('beforeCleanUp', arguments);

	            self.dom.el.style[mixitup.features.transformProp]  = '';
	            self.dom.el.style[mixitup.features.transitionProp] = '';
	            self.dom.el.style.opacity                          = '';

	            if (self.mixer.config.animation.animateResizeTargets) {
	                self.dom.el.style.width        = '';
	                self.dom.el.style.height       = '';
	                self.dom.el.style.marginRight  = '';
	                self.dom.el.style.marginBottom = '';
	            }

	            self.callActions('afterCleanUp', arguments);
	        }
	    });

	    /**
	     * A jQuery-collection-like wrapper around one or more `mixitup.Mixer` instances
	     * allowing simultaneous control of said instances similar to the MixItUp 2 API.
	     *
	     * @example
	     * new mixitup.Collection(instances)
	     *
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     * @param       {mixitup.Mixer[]}   instances
	     */

	    mixitup.Collection = function(instances) {
	        var instance    = null,
	            i           = -1;

	        this.callActions('beforeConstruct');

	        for (i = 0; instance = instances[i]; i++) {
	            this[i] = instance;
	        }

	        this.length = instances.length;

	        this.callActions('afterConstruct');

	        h.freeze(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Collection);

	    mixitup.Collection.prototype = Object.create(mixitup.Base.prototype);

	    h.extend(mixitup.Collection.prototype,
	    /** @lends mixitup.Collection */
	    {
	        constructor: mixitup.Collection,

	        /**
	         * Calls a method on all instances in the collection by passing the method
	         * name as a string followed by any applicable parameters to be curried into
	         * to the method.
	         *
	         * @example
	         * .mixitup(methodName[,arg1][,arg2..]);
	         *
	         * @example
	         * var collection = new Collection([mixer1, mixer2]);
	         *
	         * return collection.mixitup('filter', '.category-a')
	         *     .then(function(states) {
	         *         state.forEach(function(state) {
	         *             console.log(state.activeFilter.selector); // .category-a
	         *         });
	         *     });
	         *
	         * @public
	         * @instance
	         * @since       3.0.0
	         * @param       {string}  methodName
	         * @return      {Promise<Array<mixitup.State>>}
	         */

	        mixitup: function(methodName) {
	            var self        = this,
	                instance    = null,
	                args        = Array.prototype.slice.call(arguments),
	                tasks       = [],
	                i           = -1;

	            this.callActions('beforeMixitup');

	            args.shift();

	            for (i = 0; instance = self[i]; i++) {
	                tasks.push(instance[methodName].apply(instance, args));
	            }

	            return self.callFilters('promiseMixitup', h.all(tasks, mixitup.libraries), arguments);
	        }
	    });

	    /**
	     * `mixitup.Operation` objects contain all data neccessary to describe the full
	     * lifecycle of any MixItUp operation. They can be used to compute and store an
	     * operation for use at a later time (e.g. programmatic tweening).
	     *
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.Operation = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.id                      = '';

	        this.args                    = [];
	        this.command                 = null;
	        this.showPosData             = [];
	        this.toHidePosData           = [];

	        this.startState              = null;
	        this.newState                = null;
	        this.docState                = null;

	        this.willSort                = false;
	        this.willChangeLayout        = false;
	        this.hasEffect               = false;
	        this.hasFailed               = false;

	        this.triggerElement          = null;

	        this.show                    = [];
	        this.hide                    = [];
	        this.matching                = [];
	        this.toShow                  = [];
	        this.toHide                  = [];
	        this.toMove                  = [];
	        this.toRemove                = [];
	        this.startOrder              = [];
	        this.newOrder                = [];
	        this.startSort               = null;
	        this.newSort                 = null;
	        this.startFilter             = null;
	        this.newFilter               = null;
	        this.startDataset            = null;
	        this.newDataset              = null;
	        this.viewportDeltaX          = 0;
	        this.viewportDeltaY          = 0;
	        this.startX                  = 0;
	        this.startY                  = 0;
	        this.startHeight             = 0;
	        this.startWidth              = 0;
	        this.newX                    = 0;
	        this.newY                    = 0;
	        this.newHeight               = 0;
	        this.newWidth                = 0;
	        this.startContainerClassName = '';
	        this.startDisplay            = '';
	        this.newContainerClassName   = '';
	        this.newDisplay              = '';

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Operation);

	    mixitup.Operation.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.Operation.prototype.constructor = mixitup.Operation;

	    /**
	     * `mixitup.State` objects expose various pieces of data detailing the state of
	     * a MixItUp instance. They are provided at the start and end of any operation via
	     * callbacks and events, with the most recent state stored between operations
	     * for retrieval at any time via the API.
	     *
	     * @constructor
	     * @namespace
	     * @memberof    mixitup
	     * @public
	     * @since       3.0.0
	     */

	    mixitup.State = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /**
	         * The ID of the mixer instance.
	         *
	         * @name        id
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {string}
	         * @default     ''
	         */

	        this.id = '';

	        /**
	         * The currently active filter command as set by a control click or API call.
	         *
	         * @name        activeFilter
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {mixitup.CommandFilter}
	         * @default     null
	         */

	        this.activeFilter = null;

	        /**
	         * The currently active sort command as set by a control click or API call.
	         *
	         * @name        activeSort
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {mixitup.CommandSort}
	         * @default     null
	         */

	        this.activeSort = null;

	        /**
	         * The current layout-specific container class name, if applied.
	         *
	         * @name        activeContainerClassName
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {string}
	         * @default     ''
	         */

	        this.activeContainerClassName = '';

	        /**
	         * A reference to the container element that the mixer is instantiated on.
	         *
	         * @name        container
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {Element}
	         * @default     null
	         */

	        this.container = null;

	        /**
	         * An array of all target elements indexed by the mixer.
	         *
	         * @name        targets
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {Array.<Element>}
	         * @default     []
	         */

	        this.targets = [];

	        /**
	         * An array of all target elements not matching the current filter.
	         *
	         * @name        hide
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {Array.<Element>}
	         * @default     []
	         */

	        this.hide = [];

	        /**
	         * An array of all target elements matching the current filter and any additional
	         * limits applied such as pagination.
	         *
	         * @name        show
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {Array.<Element>}
	         * @default     []
	         */

	        this.show = [];

	        /**
	         * An array of all target elements matching the current filter irrespective of
	         * any additional limits applied such as pagination.
	         *
	         * @name        matching
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {Array.<Element>}
	         * @default     []
	         */

	        this.matching = [];

	        /**
	         * An integer representing the total number of target elements indexed by the
	         * mixer. Equivalent to `state.targets.length`.
	         *
	         * @name        totalTargets
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {number}
	         * @default     -1
	         */

	        this.totalTargets = -1;

	        /**
	         * An integer representing the total number of target elements matching the
	         * current filter and any additional limits applied such as pagination.
	         * Equivalent to `state.show.length`.
	         *
	         * @name        totalShow
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {number}
	         * @default     -1
	         */

	        this.totalShow = -1;

	        /**
	         * An integer representing the total number of target elements not matching
	         * the current filter. Equivalent to `state.hide.length`.
	         *
	         * @name        totalHide
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {number}
	         * @default     -1
	         */

	        this.totalHide = -1;

	        /**
	         * An integer representing the total number of target elements matching the
	         * current filter irrespective of any other limits applied such as pagination.
	         * Equivalent to `state.matching.length`.
	         *
	         * @name        totalMatching
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {number}
	         * @default     -1
	         */

	        this.totalMatching = -1;

	        /**
	         * A boolean indicating whether the last operation "failed", i.e. no targets
	         * could be found matching the filter.
	         *
	         * @name        hasFailed
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {boolean}
	         * @default     false
	         */

	        this.hasFailed = false;

	        /**
	         * The DOM element that was clicked if the last operation was triggered by the
	         * clicking of a control and not an API call.
	         *
	         * @name        triggerElement
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {Element|null}
	         * @default     null
	         */

	        this.triggerElement = null;

	        /**
	         * The currently active dataset underlying the rendered targets, if the
	         * dataset API is in use.
	         *
	         * @name        activeDataset
	         * @memberof    mixitup.State
	         * @instance
	         * @type        {Array.<object>}
	         * @default     null
	         */

	        this.activeDataset = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.State);

	    mixitup.State.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.State.prototype.constructor = mixitup.State;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.UserInstruction = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        this.command    = {};
	        this.animate    = false;
	        this.callback   = null;

	        this.callActions('afterConstruct');

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.UserInstruction);

	    mixitup.UserInstruction.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.UserInstruction.prototype.constructor = mixitup.UserInstruction;

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     */

	    mixitup.Messages = function() {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct');

	        /* Errors
	        ----------------------------------------------------------------------------- */

	        this.ERROR_FACTORY_INVALID_CONTAINER =
	            '[MixItUp] An invalid selector or element reference was passed to the mixitup factory function';

	        this.ERROR_FACTORY_CONTAINER_NOT_FOUND =
	            '[MixItUp] The provided selector yielded no container element';

	        this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS =
	            '[MixItUp] Invalid value for `animation.effects`';

	        this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE =
	            '[MixItUp] Invalid value for `controls.scope`';

	        this.ERROR_CONFIG_INVALID_PROPERTY =
	            '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}';

	        this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION =
	            '. Did you mean "${probableMatch}"?';

	        this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET =
	            '[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`';

	        this.ERROR_DATASET_INVALID_UID_KEY =
	            '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items';

	        this.ERROR_DATASET_DUPLICATE_UID =
	            '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.';

	        this.ERROR_INSERT_INVALID_ARGUMENTS =
	            '[MixItUp] Please provider either an index or a sibling and position to insert, not both';

	        this.ERROR_INSERT_PREEXISTING_ELEMENT =
	            '[MixItUp] An element to be inserted already exists in the container';

	        this.ERROR_FILTER_INVALID_ARGUMENTS =
	            '[MixItUp] Please provide either a selector or collection `.filter()`, not both';

	        this.ERROR_DATASET_NOT_SET =
	            '[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`';

	        this.ERROR_DATASET_PRERENDERED_MISMATCH =
	            '[MixItUp] `load.dataset` does not match pre-rendered targets';

	        this.ERROR_DATASET_RENDERER_NOT_SET =
	            '[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`';

	        this.ERROR_SORT_NON_EXISTENT_ELEMENT =
	            '[MixItUp] An element to be sorted does not already exist in the container';

	        /* Warnings
	        ----------------------------------------------------------------------------- */

	        this.WARNING_FACTORY_PREEXISTING_INSTANCE =
	            '[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored.' +
	            ' If you wish to perform additional methods on this instance, please create a reference.';

	        this.WARNING_INSERT_NO_ELEMENTS =
	            '[MixItUp] WARNING: No valid elements were passed to `.insert()`';

	        this.WARNING_REMOVE_NO_ELEMENTS =
	            '[MixItUp] WARNING: No valid elements were passed to `.remove()`';

	        this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL =
	            '[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the ' +
	            'queue is full or queuing is disabled.';

	        this.WARNING_GET_OPERATION_INSTANCE_BUSY =
	            '[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.';

	        this.WARNING_NO_PROMISE_IMPLEMENTATION =
	            '[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install' +
	            ' an ES6 Promise polyfill.';

	        this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES =
	            '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements' +
	            ' which may product unexpected sort output';

	        this.callActions('afterConstruct');

	        this.compileTemplates();

	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Messages);

	    mixitup.Messages.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.Messages.prototype.constructor = mixitup.Messages;

	    /**
	     * @return {void}
	     */

	    mixitup.Messages.prototype.compileTemplates = function() {
	        var errorKey        = '';
	        var errorMessage    = '';

	        for (errorKey in this) {
	            if (typeof (errorMessage = this[errorKey]) !== 'string') continue;

	            this[h.camelCase(errorKey)] = h.template(errorMessage);
	        }
	    };

	    mixitup.messages = new mixitup.Messages();

	    /**
	     * @constructor
	     * @memberof    mixitup
	     * @private
	     * @since       3.0.0
	     * @param       {mixitup.Mixer} mixer
	     */

	    mixitup.Facade = function Mixer(mixer) {
	        mixitup.Base.call(this);

	        this.callActions('beforeConstruct', arguments);

	        this.configure          = mixer.configure.bind(mixer);
	        this.show               = mixer.show.bind(mixer);
	        this.hide               = mixer.hide.bind(mixer);
	        this.filter             = mixer.filter.bind(mixer);
	        this.toggleOn           = mixer.toggleOn.bind(mixer);
	        this.toggleOff          = mixer.toggleOff.bind(mixer);
	        this.sort               = mixer.sort.bind(mixer);
	        this.changeLayout       = mixer.changeLayout.bind(mixer);
	        this.multimix           = mixer.multimix.bind(mixer);
	        this.dataset            = mixer.dataset.bind(mixer);
	        this.tween              = mixer.tween.bind(mixer);
	        this.insert             = mixer.insert.bind(mixer);
	        this.insertBefore       = mixer.insertBefore.bind(mixer);
	        this.insertAfter        = mixer.insertAfter.bind(mixer);
	        this.prepend            = mixer.prepend.bind(mixer);
	        this.append             = mixer.append.bind(mixer);
	        this.remove             = mixer.remove.bind(mixer);
	        this.destroy            = mixer.destroy.bind(mixer);
	        this.forceRefresh       = mixer.forceRefresh.bind(mixer);
	        this.forceRender        = mixer.forceRender.bind(mixer);
	        this.isMixing           = mixer.isMixing.bind(mixer);
	        this.getOperation       = mixer.getOperation.bind(mixer);
	        this.getConfig          = mixer.getConfig.bind(mixer);
	        this.getState           = mixer.getState.bind(mixer);

	        this.callActions('afterConstruct', arguments);

	        h.freeze(this);
	        h.seal(this);
	    };

	    mixitup.BaseStatic.call(mixitup.Facade);

	    mixitup.Facade.prototype = Object.create(mixitup.Base.prototype);

	    mixitup.Facade.prototype.constructor = mixitup.Facade;

	    {
	        module.exports = mixitup;
	    }
	    mixitup.BaseStatic.call(mixitup.constructor);

	    mixitup.NAME = 'mixitup';
	    mixitup.CORE_VERSION = '3.3.1';
	})(window);
	}(mixitup$1));

	var mixitup = mixitup$1.exports;

	var sticky_compile = {exports: {}};

	(function (module, exports) {
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	/**
	 * Sticky.js
	 * Library for sticky elements written in vanilla javascript. With this library you can easily set sticky elements on your website. It's also responsive.
	 *
	 * @version 1.3.0
	 * @author Rafal Galus <biuro@rafalgalus.pl>
	 * @website https://rgalus.github.io/sticky-js/
	 * @repo https://github.com/rgalus/sticky-js
	 * @license https://github.com/rgalus/sticky-js/blob/master/LICENSE
	 */
	var Sticky = /*#__PURE__*/function () {
	  /**
	   * Sticky instance constructor
	   * @constructor
	   * @param {string} selector - Selector which we can find elements
	   * @param {string} options - Global options for sticky elements (could be overwritten by data-{option}="" attributes)
	   */
	  function Sticky() {
	    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Sticky);

	    this.selector = selector;
	    this.elements = [];
	    this.version = '1.3.0';
	    this.vp = this.getViewportSize();
	    this.body = document.querySelector('body');
	    this.options = {
	      wrap: options.wrap || false,
	      wrapWith: options.wrapWith || '<span></span>',
	      marginTop: options.marginTop || 0,
	      marginBottom: options.marginBottom || 0,
	      stickyFor: options.stickyFor || 0,
	      stickyClass: options.stickyClass || null,
	      stickyContainer: options.stickyContainer || 'body'
	    };
	    this.updateScrollTopPosition = this.updateScrollTopPosition.bind(this);
	    this.updateScrollTopPosition();
	    window.addEventListener('load', this.updateScrollTopPosition);
	    window.addEventListener('scroll', this.updateScrollTopPosition);
	    this.run();
	  }
	  /**
	   * Function that waits for page to be fully loaded and then renders & activates every sticky element found with specified selector
	   * @function
	   */


	  _createClass(Sticky, [{
	    key: "run",
	    value: function run() {
	      var _this = this;

	      // wait for page to be fully loaded
	      var pageLoaded = setInterval(function () {
	        if (document.readyState === 'complete') {
	          clearInterval(pageLoaded);
	          var elements = document.querySelectorAll(_this.selector);

	          _this.forEach(elements, function (element) {
	            return _this.renderElement(element);
	          });
	        }
	      }, 10);
	    }
	    /**
	     * Function that assign needed variables for sticky element, that are used in future for calculations and other
	     * @function
	     * @param {node} element - Element to be rendered
	     */

	  }, {
	    key: "renderElement",
	    value: function renderElement(element) {
	      var _this2 = this;

	      // create container for variables needed in future
	      element.sticky = {}; // set default variables

	      element.sticky.active = false;
	      element.sticky.marginTop = parseInt(element.getAttribute('data-margin-top')) || this.options.marginTop;
	      element.sticky.marginBottom = parseInt(element.getAttribute('data-margin-bottom')) || this.options.marginBottom;
	      element.sticky.stickyFor = parseInt(element.getAttribute('data-sticky-for')) || this.options.stickyFor;
	      element.sticky.stickyClass = element.getAttribute('data-sticky-class') || this.options.stickyClass;
	      element.sticky.wrap = element.hasAttribute('data-sticky-wrap') ? true : this.options.wrap; // @todo attribute for stickyContainer
	      // element.sticky.stickyContainer = element.getAttribute('data-sticky-container') || this.options.stickyContainer;

	      element.sticky.stickyContainer = this.options.stickyContainer;
	      element.sticky.container = this.getStickyContainer(element);
	      element.sticky.container.rect = this.getRectangle(element.sticky.container);
	      element.sticky.rect = this.getRectangle(element); // fix when element is image that has not yet loaded and width, height = 0

	      if (element.tagName.toLowerCase() === 'img') {
	        element.onload = function () {
	          return element.sticky.rect = _this2.getRectangle(element);
	        };
	      }

	      if (element.sticky.wrap) {
	        this.wrapElement(element);
	      } // activate rendered element


	      this.activate(element);
	    }
	    /**
	     * Wraps element into placeholder element
	     * @function
	     * @param {node} element - Element to be wrapped
	     */

	  }, {
	    key: "wrapElement",
	    value: function wrapElement(element) {
	      element.insertAdjacentHTML('beforebegin', element.getAttribute('data-sticky-wrapWith') || this.options.wrapWith);
	      element.previousSibling.appendChild(element);
	    }
	    /**
	     * Function that activates element when specified conditions are met and then initalise events
	     * @function
	     * @param {node} element - Element to be activated
	     */

	  }, {
	    key: "activate",
	    value: function activate(element) {
	      if (element.sticky.rect.top + element.sticky.rect.height < element.sticky.container.rect.top + element.sticky.container.rect.height && element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
	        element.sticky.active = true;
	      }

	      if (this.elements.indexOf(element) < 0) {
	        this.elements.push(element);
	      }

	      if (!element.sticky.resizeEvent) {
	        this.initResizeEvents(element);
	        element.sticky.resizeEvent = true;
	      }

	      if (!element.sticky.scrollEvent) {
	        this.initScrollEvents(element);
	        element.sticky.scrollEvent = true;
	      }

	      this.setPosition(element);
	    }
	    /**
	     * Function which is adding onResizeEvents to window listener and assigns function to element as resizeListener
	     * @function
	     * @param {node} element - Element for which resize events are initialised
	     */

	  }, {
	    key: "initResizeEvents",
	    value: function initResizeEvents(element) {
	      var _this3 = this;

	      element.sticky.resizeListener = function () {
	        return _this3.onResizeEvents(element);
	      };

	      window.addEventListener('resize', element.sticky.resizeListener);
	    }
	    /**
	     * Removes element listener from resize event
	     * @function
	     * @param {node} element - Element from which listener is deleted
	     */

	  }, {
	    key: "destroyResizeEvents",
	    value: function destroyResizeEvents(element) {
	      window.removeEventListener('resize', element.sticky.resizeListener);
	    }
	    /**
	     * Function which is fired when user resize window. It checks if element should be activated or deactivated and then run setPosition function
	     * @function
	     * @param {node} element - Element for which event function is fired
	     */

	  }, {
	    key: "onResizeEvents",
	    value: function onResizeEvents(element) {
	      this.vp = this.getViewportSize();
	      element.sticky.rect = this.getRectangle(element);
	      element.sticky.container.rect = this.getRectangle(element.sticky.container);

	      if (element.sticky.rect.top + element.sticky.rect.height < element.sticky.container.rect.top + element.sticky.container.rect.height && element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
	        element.sticky.active = true;
	      } else if (element.sticky.rect.top + element.sticky.rect.height >= element.sticky.container.rect.top + element.sticky.container.rect.height || element.sticky.stickyFor >= this.vp.width && element.sticky.active) {
	        element.sticky.active = false;
	      }

	      this.setPosition(element);
	    }
	    /**
	     * Function which is adding onScrollEvents to window listener and assigns function to element as scrollListener
	     * @function
	     * @param {node} element - Element for which scroll events are initialised
	     */

	  }, {
	    key: "initScrollEvents",
	    value: function initScrollEvents(element) {
	      var _this4 = this;

	      element.sticky.scrollListener = function () {
	        return _this4.onScrollEvents(element);
	      };

	      window.addEventListener('scroll', element.sticky.scrollListener);
	    }
	    /**
	     * Removes element listener from scroll event
	     * @function
	     * @param {node} element - Element from which listener is deleted
	     */

	  }, {
	    key: "destroyScrollEvents",
	    value: function destroyScrollEvents(element) {
	      window.removeEventListener('scroll', element.sticky.scrollListener);
	    }
	    /**
	     * Function which is fired when user scroll window. If element is active, function is invoking setPosition function
	     * @function
	     * @param {node} element - Element for which event function is fired
	     */

	  }, {
	    key: "onScrollEvents",
	    value: function onScrollEvents(element) {
	      if (element.sticky && element.sticky.active) {
	        this.setPosition(element);
	      }
	    }
	    /**
	     * Main function for the library. Here are some condition calculations and css appending for sticky element when user scroll window
	     * @function
	     * @param {node} element - Element that will be positioned if it's active
	     */

	  }, {
	    key: "setPosition",
	    value: function setPosition(element) {
	      this.css(element, {
	        position: '',
	        width: '',
	        top: '',
	        left: ''
	      });

	      if (this.vp.height < element.sticky.rect.height || !element.sticky.active) {
	        return;
	      }

	      if (!element.sticky.rect.width) {
	        element.sticky.rect = this.getRectangle(element);
	      }

	      if (element.sticky.wrap) {
	        this.css(element.parentNode, {
	          display: 'block',
	          width: element.sticky.rect.width + 'px',
	          height: element.sticky.rect.height + 'px'
	        });
	      }

	      if (element.sticky.rect.top === 0 && element.sticky.container === this.body) {
	        this.css(element, {
	          position: 'fixed',
	          top: element.sticky.rect.top + 'px',
	          left: element.sticky.rect.left + 'px',
	          width: element.sticky.rect.width + 'px'
	        });

	        if (element.sticky.stickyClass) {
	          element.classList.add(element.sticky.stickyClass);
	        }
	      } else if (this.scrollTop > element.sticky.rect.top - element.sticky.marginTop) {
	        this.css(element, {
	          position: 'fixed',
	          width: element.sticky.rect.width + 'px',
	          left: element.sticky.rect.left + 'px'
	        });

	        if (this.scrollTop + element.sticky.rect.height + element.sticky.marginTop > element.sticky.container.rect.top + element.sticky.container.offsetHeight - element.sticky.marginBottom) {
	          if (element.sticky.stickyClass) {
	            element.classList.remove(element.sticky.stickyClass);
	          }

	          this.css(element, {
	            top: element.sticky.container.rect.top + element.sticky.container.offsetHeight - (this.scrollTop + element.sticky.rect.height + element.sticky.marginBottom) + 'px'
	          });
	        } else {
	          if (element.sticky.stickyClass) {
	            element.classList.add(element.sticky.stickyClass);
	          }

	          this.css(element, {
	            top: element.sticky.marginTop + 'px'
	          });
	        }
	      } else {
	        if (element.sticky.stickyClass) {
	          element.classList.remove(element.sticky.stickyClass);
	        }

	        this.css(element, {
	          position: '',
	          width: '',
	          top: '',
	          left: ''
	        });

	        if (element.sticky.wrap) {
	          this.css(element.parentNode, {
	            display: '',
	            width: '',
	            height: ''
	          });
	        }
	      }
	    }
	    /**
	     * Function that updates element sticky rectangle (with sticky container), then activate or deactivate element, then update position if it's active
	     * @function
	     */

	  }, {
	    key: "update",
	    value: function update() {
	      var _this5 = this;

	      this.forEach(this.elements, function (element) {
	        element.sticky.rect = _this5.getRectangle(element);
	        element.sticky.container.rect = _this5.getRectangle(element.sticky.container);

	        _this5.activate(element);

	        _this5.setPosition(element);
	      });
	    }
	    /**
	     * Destroys sticky element, remove listeners
	     * @function
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var _this6 = this;

	      window.removeEventListener('load', this.updateScrollTopPosition);
	      window.removeEventListener('scroll', this.updateScrollTopPosition);
	      this.forEach(this.elements, function (element) {
	        _this6.destroyResizeEvents(element);

	        _this6.destroyScrollEvents(element);

	        delete element.sticky;
	      });
	    }
	    /**
	     * Function that returns container element in which sticky element is stuck (if is not specified, then it's stuck to body)
	     * @function
	     * @param {node} element - Element which sticky container are looked for
	     * @return {node} element - Sticky container
	     */

	  }, {
	    key: "getStickyContainer",
	    value: function getStickyContainer(element) {
	      var container = element.parentNode;

	      while (!container.hasAttribute('data-sticky-container') && !container.parentNode.querySelector(element.sticky.stickyContainer) && container !== this.body) {
	        container = container.parentNode;
	      }

	      return container;
	    }
	    /**
	     * Function that returns element rectangle & position (width, height, top, left)
	     * @function
	     * @param {node} element - Element which position & rectangle are returned
	     * @return {object}
	     */

	  }, {
	    key: "getRectangle",
	    value: function getRectangle(element) {
	      this.css(element, {
	        position: '',
	        width: '',
	        top: '',
	        left: ''
	      });
	      var width = Math.max(element.offsetWidth, element.clientWidth, element.scrollWidth);
	      var height = Math.max(element.offsetHeight, element.clientHeight, element.scrollHeight);
	      var top = 0;
	      var left = 0;

	      do {
	        top += element.offsetTop || 0;
	        left += element.offsetLeft || 0;
	        element = element.offsetParent;
	      } while (element);

	      return {
	        top: top,
	        left: left,
	        width: width,
	        height: height
	      };
	    }
	    /**
	     * Function that returns viewport dimensions
	     * @function
	     * @return {object}
	     */

	  }, {
	    key: "getViewportSize",
	    value: function getViewportSize() {
	      return {
	        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
	        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	      };
	    }
	    /**
	     * Function that updates window scroll position
	     * @function
	     * @return {number}
	     */

	  }, {
	    key: "updateScrollTopPosition",
	    value: function updateScrollTopPosition() {
	      this.scrollTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
	    }
	    /**
	     * Helper function for loops
	     * @helper
	     * @param {array}
	     * @param {function} callback - Callback function (no need for explanation)
	     */

	  }, {
	    key: "forEach",
	    value: function forEach(array, callback) {
	      for (var i = 0, len = array.length; i < len; i++) {
	        callback(array[i]);
	      }
	    }
	    /**
	     * Helper function to add/remove css properties for specified element.
	     * @helper
	     * @param {node} element - DOM element
	     * @param {object} properties - CSS properties that will be added/removed from specified element
	     */

	  }, {
	    key: "css",
	    value: function css(element, properties) {
	      for (var property in properties) {
	        if (properties.hasOwnProperty(property)) {
	          element.style[property] = properties[property];
	        }
	      }
	    }
	  }]);

	  return Sticky;
	}();
	/**
	 * Export function that supports AMD, CommonJS and Plain Browser.
	 */


	(function (root, factory) {
	  {
	    module.exports = factory;
	  }
	})(commonjsGlobal, Sticky);
	}(sticky_compile));

	var Sticky = sticky_compile.exports;

	var stickyJs = Sticky;

	new stickyJs('[data-sticky]', {});
	aos.init({
	  once: true,
	  duration: 600,
	  // values from 0 to 3000, with step 50ms
	  easing: 'ease-in-out'
	});
	/**
	 * Scrollspy
	 */

	(function ($) {
	  $.fn.scrollSpy = function (options) {
	    var $Root = $('html');
	    $Root.css('scroll-behavior');
	    var settings = $.extend({
	      offset: 0,
	      offsetElement: null,
	      activeClass: 'active',
	      anchors: ['a[href*=\\#]'],
	      ignoreAnchors: [],
	      scrollDuration: 1,
	      scrollEasing: 'swing'
	    }, options);

	    if ($.ui === undefined) {
	      // Fallbacks if jQuery UI is not loaded
	      settings = $.extend(settings, {
	        scrollEasing: 'swing'
	      });
	    }

	    var update = function () {
	      // update offset
	      if ($(settings.offsetElement).length) {
	        settings = $.extend(settings, {
	          offset: $(settings.offsetElement).height()
	        });
	      }
	    };

	    update();
	    $(window).on('resize', update);
	    /*$(window).on('load', function(){
	    if (location.hash) {
	     scrollTo(location.hash);
	    }
	    });*/

	    return this.each(function () {
	      var $ScrollSpy = this;
	      var $Anchors = $();
	      var scrollMap = [];
	      var activeNavElement = undefined;

	      if (Array.isArray(settings.anchors)) {
	        settings.anchors.forEach(function (e) {
	          $Anchors = $Anchors.add($($ScrollSpy).find(e));
	        });
	      }

	      if (Array.isArray(settings.ignoreAnchors)) {
	        settings.ignoreAnchors.forEach(function (e) {
	          $Anchors = $Anchors.filter(':not(' + e + ')');
	        });
	      }

	      var updateScrollMap = function () {
	        $Anchors.each((i, el) => {
	          var $Target = $(el.hash);

	          if ($Target.length) {
	            scrollMap.push({
	              navElement: el,
	              targetOffset: $Target.offset(),
	              targetHeight: $Target.outerHeight()
	            });
	          }
	        });
	        scrollMap.sort(function (a, b) {
	          return a.targetOffset.top - b.targetOffset.top;
	        });
	        scrollMap.reverse();
	      };

	      updateScrollMap();
	      $(window).on('resize', updateScrollMap);

	      var scrollSpy = function () {
	        var scrollPos = $(document).scrollTop() + settings.offset;
	        var posElement = scrollMap.find(function (el) {
	          if (el.targetOffset.top <= scrollPos) {
	            if (el.targetOffset.top + el.targetHeight >= scrollPos) {
	              return true;
	            }
	          }
	        });

	        if (posElement && posElement.navElement != activeNavElement) {
	          $(activeNavElement).removeClass(settings.activeClass);
	          $(posElement.navElement).addClass(settings.activeClass);
	          activeNavElement = posElement.navElement;
	        } else if (!posElement) {
	          $(activeNavElement).removeClass(settings.activeClass);
	          activeNavElement = undefined;
	        }
	      };

	      scrollSpy();
	      $(document).on('scroll', scrollSpy);
	      $Anchors.click(function (e) {
	        //e.preventDefault();
	        var hash = e.currentTarget.hash;
	        history.pushState({}, '', hash); //scrollTo(hash);
	      });
	    });
	  };
	})(jQuery);

	jQuery(function ($) {
	  $(window).scroll(function () {
	    if ($(this).scrollTop() > 0 && !$('body').hasClass('footer-visible')) {
	      $('#scrollToTopBtn').fadeIn();
	    } else {
	      $('#scrollToTopBtn').fadeOut();
	    }
	  });
	  $(document).on('click', '#scrollToTopBtn', scrollToTop);

	  function scrollToTop() {
	    $('html, body').animate({
	      scrollTop: 0
	    }, 800);
	  }

	  document.addEventListener('aos:in:elixir-countup', ({
	    detail
	  }) => {
	    elixirCountup(detail);
	  });

	  if ($('[data-aos-id="elixir-countup"]').length) {
	    $('[data-aos-id="elixir-countup"]').each(function () {
	      if ($(this).hasClass('aos-animate')) {
	        elixirCountup($(this));
	      }
	    });
	  }

	  function elixirCountup(element) {
	    $(element).prop('Counter', 0).animate({
	      Counter: $(element).data('count')
	    }, {
	      duration: 5000,
	      easing: 'swing',
	      step: function (now) {
	        //$(element).text(Math.ceil(now).toLocaleString('sr-RS'))
	        $(element).text(Math.ceil(now));
	      }
	    });
	  }
	  /*$('.main-carousel').flickity({
	      // options
	      cellAlign: 'left',
	      contain: true
	    });*/


	  if ($('#preporuke-djubrenja-nav').length) {
	    Flickity.data('.preporuke-djubrenja-slider', {
	      on: {
	        ready: function () {
	          console.log('Flickity ready');
	          $('.preporuke-djubrenja-slider article').addClass('h-100');
	        }
	      }
	    });
	    var pdj_tab = document.querySelector('#preporuke-djubrenja-nav');
	    pdj_tab.addEventListener('shown.bs.tab', function (event) {
	      var flkty = Flickity.data('.preporuke-djubrenja-slider');
	      flkty.resize();
	      $('.preporuke-djubrenja-slider article').addClass('h-100');
	      console.log('Resized');
	    });
	  }

	  if ($('#preporuke-djubrenja-mix').length) {
	    mixitup('#preporuke-djubrenja-mix');
	  }

	  if ($('#oglasi-za-posao-mix').length) {
	    var op_mixer = mixitup('#oglasi-za-posao-mix', {
	      callbacks: {
	        onMixStart: function (state, futureState) {
	          $('#no-jobs-found').hide();
	        },
	        onMixFail: function (state) {
	          $('#no-jobs-found').fadeIn();
	        }
	      }
	    });
	    $(document).on('change', '#jobs-company, #jobs-location', function () {
	      var c = '',
	          l = '';

	      if ($('#jobs-company').val()) {
	        c = '.company-' + $('#jobs-company').val();
	      }

	      if ($('#jobs-location').val()) {
	        l = '.location-' + $('#jobs-location').val();
	      }

	      if ((c + l).length) {
	        op_mixer.filter(c + l);
	      } else {
	        op_mixer.show();
	      }
	    });
	    $('#reset-job-mix').on('click', function () {
	      $('#jobs-company').prop('selectedIndex', 0);
	      $('#jobs-location').prop('selectedIndex', 0);
	      op_mixer.show();
	    });
	  }

	  $('#navbar-koraci').scrollSpy({
	    offsetElement: '#wrapper-navbar'
	  });
	});
	document.addEventListener("DOMContentLoaded", function () {
	  function handleIntersection(entries) {
	    let isInViewport = false;
	    entries.forEach(entry => {
	      if (entry.isIntersecting) {
	        isInViewport = true;
	      }
	    });

	    if (isInViewport) {
	      document.body.classList.add('footer-visible');
	    } else {
	      document.body.classList.remove('footer-visible');
	    }
	  }

	  if (document.querySelector('#scrollToTopBtn')) {
	    const targetElement = document.querySelector('#wrapper-footer');
	    const observer = new IntersectionObserver(handleIntersection);
	    observer.observe(targetElement);
	  }
	});

	exports.Alert = alert;
	exports.Button = button;
	exports.Carousel = carousel;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = modal;
	exports.Offcanvas = offcanvas;
	exports.Popover = popover;
	exports.Scrollspy = scrollspy;
	exports.Tab = tab;
	exports.Toast = toast;
	exports.Tooltip = tooltip;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=theme.js.map
