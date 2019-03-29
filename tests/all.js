/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import expect from 'expect';
import fs from 'fs';
import path from 'path';
import Slate from 'slate';
import hyperprint from 'slate-hyperprint';

import EditList from '../lib';

// Provide the value with
function deserializeValue(plugin, value) {
    return new Slate.Editor({
      plugins: [plugin],
      value: Slate.Value.fromJSON(
        {
          selection: value.selection,
          document: value.document,
        }
      )
    });
}

describe('slate-edit-list', () => {
    const tests = fs.readdirSync(__dirname);

    tests.forEach((test, index) => {
        if (test[0] === '.' || path.extname(test).length > 0) return;
        it(test, () => {
            const dir = path.resolve(__dirname, test);
            const plugin = EditList();

            const input = deserializeValue(
                plugin,
                require(path.resolve(dir, 'input.js')).default
            );

            const expectedPath = path.resolve(dir, 'expected.js');
            const expected =
                fs.existsSync(expectedPath) &&
                deserializeValue(plugin, require(expectedPath).default);

            const runChange = require(path.resolve(dir, 'change.js')).default;

            const newChange = runChange(plugin, input);
            if (expected) {
                const actual = newChange.value.document;

                expect(hyperprint(actual, { strict: false })).toEqual(
                    hyperprint(expected.value.document, { strict: false })
                );
            }
        });
    });
});
