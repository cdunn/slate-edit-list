import expect from 'expect';

export default function(plugin, editor) {
    const ret = plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Enter',
            shiftKey: true
        },
        editor,
        () => {}
    );

    expect(ret == null).toBe(true);
}
