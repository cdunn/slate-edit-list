export default function(plugin, editor) {
    return plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Enter'
        },
        editor,
        () => {}
    );
}
