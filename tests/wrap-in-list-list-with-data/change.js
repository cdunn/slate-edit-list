export default function(plugin, editor) {
    const data = { style: { listStyleType: 'disc' } };
    return editor.command(plugin.changes.wrapInList, false, data);
}
