import expect from 'expect';

export default function(plugin, editor) {
    editor.command(plugin.changes.decreaseItemDepth).undo();

    // Back to previous cursor position
    expect(editor.value.startBlock.text).toEqual('Item 1.1');

    return editor;
}
