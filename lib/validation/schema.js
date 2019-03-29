// @flow
import { type Node } from 'slate';

import { type Editor } from 'slate-react'
import type Options from '../options';

/**
 * Create a schema definition with rules to normalize lists
 */
function schema(opts: Options): Object {
    const constructedSchema = {
        blocks: {
            [opts.typeItem]: {
                parent: opts.types.map(t => ({ type: t })),
                nodes: [{ match: { object: 'block' } }],

                normalize: normalize({
                    parent_type_invalid: (editor, context) =>
                        editor.unwrapBlockByKey(context.node.key, {
                            normalize: false
                        }),
                    child_object_invalid: (editor, context) =>
                        wrapChildrenInDefaultBlock(opts, editor, context.node)
                })
            }
        }
    };

    // validate all list types, ensure they only have list item children
    opts.types.forEach(type => {
        constructedSchema.blocks[type] = {
            nodes: [{ match: { type: opts.typeItem } }],
            normalize: normalize({
                child_type_invalid: (editor, context) =>
                    editor.wrapBlockByKey(context.child.key, opts.typeItem, {
                        normalize: false
                    })
            })
        };
    });

    return constructedSchema;
}

/*
 * Allows to define a normalize function through a keyed collection of functions
 */
function normalize(reasons: { [string]: (Editor, context: any) => any }): * {
    return (editor, error) => {
        const reasonFn = reasons[error.code];
        if (reasonFn) {
            reasonFn(editor, error);
        }
    };
}

/**
 * Wraps all child of a node in the default block type.
 * Returns a editor, for chaining purposes
 */
function wrapChildrenInDefaultBlock(
    opts: Options,
    editor: Editor,
    node: Node
): Editor {
    editor.wrapBlockByKey(node.nodes.first().key, opts.typeDefault, {
        normalize: false
    });

    const wrapper = editor.value.document.getDescendant(node.key).nodes.first();

    // Add in the remaining items
    node.nodes.rest().forEach((child, index) =>
        editor.moveNodeByKey(child.key, wrapper.key, index + 1, {
            normalize: false
        })
    );

    return editor;
}

export default schema;
