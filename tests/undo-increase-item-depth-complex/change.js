import expect from 'expect';

export default function(plugin, editor) {
    const initialText = editor.value.startBlock.text;
    const initialSelection = editor.value.selection;

    editor.command(plugin.changes.increaseItemDepth).undo();

    // Back to previous cursor position
    expect(editor.value.startBlock.text).toEqual(initialText);
    expect(editor.value.selection.toJS()).toEqual(initialSelection.toJS());

    return editor;
}
