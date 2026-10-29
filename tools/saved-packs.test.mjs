import test from 'node:test';
import assert from 'node:assert/strict';
import * as Library from '../gameplay/saved-packs.js';

const entry=(word='Mars')=>({word,canonical:word,difficulty:'hard'});
function storage() { const data=new Map();return {getItem:key=>data.get(key),setItem:(key,value)=>data.set(key,value)}; }
const pack=(name='Night',id='1')=>({id,name,topics:['Minecraft','Airport chaos'],strict:true,difficulty:'normal',entries:[entry()]});

test('saved library round trips topics, difficulty and entries; names update in place without growing',()=>{
    const store=storage();Library.savePack(store,pack());
    const saved=Library.readPacks(store)[0];assert.deepEqual(saved,pack());
    const replacement=pack('night','2');replacement.entries=[entry('Venus')];Library.savePack(store,replacement);
    const all=Library.readPacks(store);assert.equal(all.length,1);assert.equal(all[0].id,'1');assert.equal(all[0].entries[0].word,'Venus');
    Library.deletePack(store,'1');assert.deepEqual(Library.readPacks(store),[]);
});

test('library is bounded without silent eviction; legacy single topics migrate and corrupt entries are skipped',()=>{
    const store=storage();for(let i=0;i<Library.SAVED_PACK_LIMIT;i++)Library.savePack(store,pack(`Pack ${i}`,String(i)));
    assert.throws(()=>Library.savePack(store,pack('Extra')),/library is full/);
    assert.equal(Library.readPacks(store).length,12);
    Library.savePack(store,pack('Pack 0'));assert.equal(Library.readPacks(store).length,12);
    store.setItem(Library.SAVED_PACKS_KEY,JSON.stringify([null,{}, {...pack(),topics:undefined,topic:'Legacy topic'}, {...pack(),entries:[]}]));
    assert.deepEqual(Library.readPacks(store)[0].topics,['Legacy topic']);assert.equal(Library.readPacks(store).length,1);
    store.setItem(Library.SAVED_PACKS_KEY,'broken');assert.deepEqual(Library.readPacks(store),[]);
    assert.deepEqual(Library.readPacks({getItem(){throw Error('denied')}}),[]);
});

test('invalid or failed writes preserve the saved library',()=>{
    const store=storage();Library.savePack(store,pack());
    for(const bad of [{...pack(),name:''},{...pack(),entries:[]},{...pack(),topics:['A','B','C','D','E','F']}])assert.throws(()=>Library.savePack(store,bad));
    assert.equal(Library.readPacks(store).length,1);
    assert.throws(()=>Library.savePack({...store,setItem(){throw Error('quota')}},pack('New')),/quota/);
    assert.equal(Library.readPacks(store)[0].name,'Night');
});
