import expect from 'expect';

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

    // Selection check
    expect(editor.value.startBlock.text).toEqual('');
    expect(editor.value.selection.anchor.offset).toEqual(0);
    expect(editor.value.selection.isCollapsed).toBe(true);

    return editor;
}
