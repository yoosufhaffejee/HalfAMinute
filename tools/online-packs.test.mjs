import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeOnlinePack, ONLINE_PACK_LIMIT } from '../gameplay/online-packs.js';

const entry = (word, difficulty='easy', canonical=word) => ({word, canonical, difficulty});

test('a shared pack is a bounded independent snapshot with canonical duplicates removed', () => {
    const input={kind:'custom',entries:[entry('  Messi  ','hard','Lionel Messi'),entry('Lionel Messi'),entry('Mars')]};
    const pack=normalizeOnlinePack(input);
    assert.deepEqual(pack.entries,[entry('Messi','hard','Lionel Messi'),entry('Mars')]);
    input.entries[0].word='Changed';
    assert.equal(pack.entries[0].word,'Messi');
    assert.equal(normalizeOnlinePack(null),null);
    assert.equal(normalizeOnlinePack(undefined),null);
    assert.equal(normalizeOnlinePack({kind:'custom',entries:Array.from({length:ONLINE_PACK_LIMIT},(_,i)=>entry(`Word ${i}`))}).entries.length,150);
});

test('invalid shared packs fail explicitly instead of becoming built-in words', () => {
    for(const pack of [{}, {kind:'builtin',entries:[entry('Mars')]}, {kind:'custom',entries:[]},
        {kind:'custom',entries:[null]}, {kind:'custom',entries:[entry('<script>')]},
        {kind:'custom',entries:[entry('Two\nlines')]}, {kind:'custom',entries:[entry('x'.repeat(81))]},
        {kind:'custom',entries:[entry('Mars','normal')]}, {kind:'custom',entries:[entry('Mars','easy','x'.repeat(97))]},
        {kind:'custom',entries:Array.from({length:151},(_,i)=>entry(`Word ${i}`))}]) {
        assert.throws(()=>normalizeOnlinePack(pack),error=>error.message==='invalid-word-pack');
    }
});
