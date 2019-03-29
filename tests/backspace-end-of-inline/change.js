export default function(plugin, editor) {
    plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Backspace'
        },
        editor,
        () => {}
    );

    return editor;
}
