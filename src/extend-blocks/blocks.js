/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */
/*
(function(wp) {
    const { registerPlugin } = wp.plugins;
    const { Plugin } = wp.editPost;
    const { useEffect, useRef, useState } = wp.element;
    const { Dropdown, Button } = wp.components;
    const { useSelect, useDispatch } = wp.data;
    const { __ } = wp.i18n;

    // Define custom breakpoints (adjust as needed)
    const breakpoints = [
        { label: 'Desktop', slug: 'Desktop', value: 'base', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#111722" d="M20.5 16.3h-.7v-8a2 2 0 0 0-2-2H6.2a2 2 0 0 0-2 2v8h-.7c-.8 0-1.5.6-1.5 1.4h20c0-.8-.7-1.4-1.5-1.4Zm-14.8-8c0-.4.2-.6.5-.6h11.6c.3 0 .5.3.5.5V16H5.7V8.1Z"/></svg>' },
        { label: 'Laptop', slug: 'Laptop', value: '1366', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#111722" d="m19.4 16.6-1-3.2V6.8a2 2 0 0 0-2-2H7.6a2 2 0 0 0-2 2v6.6l-1 3.2v1c0 .3.2.6.4.9.2.3.4.4.6.5l.9.2h11c.2 0 .5 0 .8-.2.3 0 .5-.3.7-.5l.3-.9c.2-.3.2-.7.1-1ZM7 6.8c0-.2 0-.3.2-.4l.4-.2h8.8l.4.2.2.4v6H7v-6Zm10.9 10.8-.2.2H6.3a.2.2 0 0 1-.2-.2V17l.7-2.9h10.4l.8 3v.2l-.1.3Zm-5.2-1.7h-1.4c-.4 0-.7.3-.7.7 0 .5.2.8.7.8h1.4c.4 0 .8-.3.8-.8 0-.4-.4-.7-.8-.7Z"/></svg>' },
        { label: 'Tablet', slug: 'Tablet', value: '1024', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#111722" d="M16.4 5H7.6C6.6 5 6 5.8 6 6.8v10.4c0 1 .8 1.8 1.7 1.8h8.8c1 0 1.7-.8 1.7-1.8V6.8c0-1-.8-1.8-1.7-1.8Zm.4 12.3c0 .2-.2.4-.4.4H7.6c-.2 0-.4-.2-.4-.4V6.7c0-.2.2-.4.4-.4h8.8c.2 0 .4.2.4.5v10.4Zm-6.6-.5h3.6v-1.3h-3.6v1.3Z"/></svg>' },
        { label: 'Mobile', slug: 'Mobile', value: '767', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#111722" d="M15 4H9a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12Zm-4.5-.5h2V16h-2v1.5Z"/></svg>' },
    ];

    // Component to render the dropdown
    const CustomBreakpointsDropdown = () => {
        const { deviceType } = useSelect(select => ({
            deviceType: select('core/edit-post').__experimentalGetPreviewDeviceType(),
        }), []);
        const { __experimentalSetPreviewDeviceType } = useDispatch('core/edit-post');
        const rootRef = useRef(null);
        const [isMounted, setIsMounted] = useState(false);

        // Replace the default preview dropdown
        useEffect(() => {
            const interval = setInterval(() => {
                const headerSettings = document.querySelector('.editor-header__settings');
                if (!headerSettings) return;

                const defaultDropdown = headerSettings.querySelector('.components-dropdown.editor-preview-dropdown');
                if (!defaultDropdown) return;

                let root = document.getElementById('my-breakpoints-root');
                if (!root) {
                    root = document.createElement('div');
                    root.id = 'my-breakpoints-root';
                    defaultDropdown.replaceWith(root);
                }

                if (!rootRef.current) {
                    rootRef.current = wp.element.createRoot(root);
                    rootRef.current.render(<CustomBreakpoints />);
                    setIsMounted(true);
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }, []);

        // Handle breakpoint selection
        const currentBreakpoint = breakpoints.find(bp => bp.slug === deviceType) || breakpoints[0];

        useEffect(() => {
            const width = currentBreakpoint.value === 'base' ? null : parseInt(currentBreakpoint.value);
            const iframeContainer = document.querySelector('.block-editor-iframe__container') || document.querySelector('.interface-interface-skeleton__body');

            if (width && iframeContainer) {
                document.body.style.setProperty('--my-breakpoint-width', `${width}px`);
                const containerWidth = iframeContainer.offsetWidth;
                if (containerWidth < width) {
                    const scale = containerWidth / width;
                    document.body.style.setProperty('--my-breakpoint-scale', `${scale}`);
                } else {
                    document.body.style.removeProperty('--my-breakpoint-scale');
                }

                // Sync with Gutenberg’s device types
                if (width <= 767) __experimentalSetPreviewDeviceType('Mobile');
                else if (width <= 1024) __experimentalSetPreviewDeviceType('Tablet');
                else __experimentalSetPreviewDeviceType('Desktop');
            } else {
                document.body.style.removeProperty('--my-breakpoint-width');
                document.body.style.removeProperty('--my-breakpoint-scale');
                __experimentalSetPreviewDeviceType('Desktop');
            }
        }, [currentBreakpoint]);

        return null; // Rendered via createRoot
    };

    const CustomBreakpoints = () => {
        const { __experimentalSetPreviewDeviceType } = useDispatch('core/edit-post');
        const currentDevice = useSelect(select => select('core/edit-post').__experimentalGetPreviewDeviceType(), []);

        return (
            <Dropdown
                className="my-breakpoints-dropdown"
                contentClassName="my-breakpoints-content"
                popoverProps={{ placement: 'bottom-end' }}
                renderToggle={({ isOpen, onToggle }) => (
                    <Button
                        className="my-breakpoints-toggle"
                        onClick={onToggle}
                        aria-expanded={isOpen}
                        icon={<span dangerouslySetInnerHTML={{ __html: breakpoints.find(bp => bp.slug === currentDevice)?.icon || breakpoints[0].icon }} />}
                    />
                )}
                renderContent={() => (
                    <div>
                        {breakpoints.map(bp => (
                            <Button
                                key={bp.slug}
                                className="my-breakpoints-item"
                                onClick={() => __experimentalSetPreviewDeviceType(bp.slug)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: bp.icon }} />
                                {bp.label} {bp.value !== 'base' ? `(max ${bp.value}px)` : ''}
                            </Button>
                        ))}
                    </div>
                )}
            />
        );
    };

    // Register the plugin
    registerPlugin('my-custom-breakpoints', {
        render: CustomBreakpointsDropdown,
    });

    // Add CSS for smooth transitions
    wp.domReady(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            iframe[name="editor-canvas"] {
                width: var(--my-breakpoint-width, 100%) !important;
                transform: scale(var(--my-breakpoint-scale, 1));
                transform-origin: top left;
                transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
            }

        `;
        document.head.appendChild(style);
    });
})(window.wp);

*/
import "./hide-on-mobile/hide-on-mobile";
import "./animation/animation";
import "./disable-title/index";

// import './woo/products.js'; REST API ...
// import './section/section'; WIP
// Work in progress
// import './add-id-to-blocks/add-id-to-blocks'; WIP
