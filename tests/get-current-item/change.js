import expect from 'expect';

export default function(plugin, editor) {
    const currentItem = plugin.utils.getCurrentItem(editor.value);
    expect(currentItem.key).toBe('current_item');
}
