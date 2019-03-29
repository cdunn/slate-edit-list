export default function(plugin, editor) {
    return editor.command(plugin.changes.decreaseItemDepth);
}
