import expect from 'expect';

export default function(plugin, editor) {
    const previousItem = plugin.utils.getPreviousItem(editor.value);
    expect(previousItem.key).toBe('previous_item');
}
