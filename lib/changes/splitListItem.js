// @flow
import { type Editor } from 'slate-react';

import type Options from '../options';
import { getCurrentItem } from '../utils';

/**
 * Split a list item at the start of the current range.
 */
function splitListItem(opts: Options, editor: Editor): Editor {
    const { value } = editor;
    const currentItem = getCurrentItem(opts, value);
    if (!currentItem) {
        return editor;
    }

    const { start } = value.selection;
    const splitOffset = start.offset;

    return editor.splitDescendantsByKey(
        currentItem.key,
        start.key,
        splitOffset
    );
}

export default splitListItem;
