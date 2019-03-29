// @flow
import { Block } from 'slate';
import { type Editor } from 'slate-react'

import type Options from '../options';
import { getItemDepth, getCurrentItem } from '../utils';

/**
 * Decreases the depth of the current item. The following items will
 * be moved as sublist of the decreased item.
 *
 * No-op for root items.
 */
function decreaseItemDepth(opts: Options, editor: Editor): Editor {
    const { value } = editor;
    const { document } = value;

    // Cannot decrease item depth of root items
    const depth = getItemDepth(opts, value);
    if (depth == 1) {
        return editor;
    }

    const currentItem = getCurrentItem(opts, value);
    if (!currentItem) {
        return editor;
    }

    const currentList = document.getParent(currentItem.key);
    const parentItem = document.getParent(currentList.key);
    const parentList = document.getParent(parentItem.key);
    // The items following the item will be moved to a sublist of currentItem
    const followingItems = currentList.nodes
        .skipUntil(i => i === currentItem)
        .rest();

    // True if the currentItem and the followingItems make the whole
    // currentList, and hence the currentList will be emptied
    const willEmptyCurrentList =
        currentList.nodes.size === followingItems.size + 1;

    if (!followingItems.isEmpty()) {
        // Add them as sublist of currentItem
        const sublist = Block.create({
            object: 'block',
            type: currentList.type,
            data: currentList.data
        });
        // Add the sublist
        editor.withoutNormalizing(() => {
            editor.insertNodeByKey(
                currentItem.key,
                currentItem.nodes.size,
                sublist
            );

            editor.moveNodeByKey(
                currentItem.key,
                parentList.key,
                parentList.nodes.indexOf(parentItem) + 1
            );

            // Move the followingItems to the sublist
            followingItems.forEach((item, index) =>
                editor.moveNodeByKey(
                    item.key,
                    sublist.key,
                    sublist.nodes.size + index
                )
            );
        });
    } else {
        editor.moveNodeByKey(
            currentItem.key,
            parentList.key,
            parentList.nodes.indexOf(parentItem) + 1
        );
    }

    // Remove the currentList completely if needed
    if (willEmptyCurrentList) {
        editor.removeNodeByKey(currentList.key);
    }

    return editor;
}

export default decreaseItemDepth;
