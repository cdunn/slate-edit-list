import expect from 'expect';

export default function(plugin, editor) {
    const { value } = editor;
    const initialText = value.startBlock.text;
    const initialSelection = value.selection;

    editor.command(plugin.changes.wrapInList).undo();

    // Back to previous cursor position
    expect(editor.value.startBlock.text).toEqual(initialText);
    expect(editor.value.selection.toJS()).toEqual(initialSelection.toJS());

    return editor;
}
