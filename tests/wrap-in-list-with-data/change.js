export default function(plugin, editor) {
    const data = { style: { listStyleType: 'decimal' } };
    return editor.command(plugin.changes.wrapInList, 'ol_list', data);
}
