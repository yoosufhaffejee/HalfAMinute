#!/usr/bin/env node
// Exercise the real pool-loading functions without loading browser/network code.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const gameSource = fs.readFileSync(path.join(root, "script.js"), "utf8");
const dataSource = fs.readFileSync(path.join(root, "data.js"), "utf8");
const functionNames = [
  "normalizeWord", "dedupeWordObjects", "getRecentWords",
  "filterRecentlyUsedWords", "setWordDescriptionsFromObjects",
  "getEasyWords", "getHardWords", "loadWords", "shuffleArray"
];
const functions = functionNames.map(name => {
  const match = gameSource.match(new RegExp(`^function ${name}\\([^]*?^}`, "m"));
  assert.ok(match, `Cannot find game function ${name}`);
  return match[0];
}).join("\n");
let recent = [];
const context = {
  localStorage: { getItem: () => JSON.stringify(recent) }
};
vm.createContext(context);
vm.runInContext(`${dataSource}\n
  let easyWords = [], hardWords = [], wordDescriptionLookup;
  let numWords = 15;
  const RECENT_WORDS_STORAGE_KEY = "test-only";
  ${functions}
  this.api = { categories, themes, loadWords, normalizeWord,
    getPools: () => ({easyWords, hardWords, wordDescriptionLookup}) };
`, context);
const { api } = context;
let selections = 0;
for (const [kind, pools] of Object.entries({ categories: api.categories, themes: api.themes })) {
  for (const [name, entries] of Object.entries(pools)) {
    if (kind === "themes") assert.ok(entries.length >= 100, `${name} should retain 100+ prompts`);
    for (const difficulty of ["easy", "normal", "hard"]) {
      const words = api.loadWords(kind === "themes" ? name : "None", kind === "themes" ? [] : [name], difficulty);
      const expected = entries.filter(e => difficulty === "normal" || e.difficulty === difficulty);
      assert.equal(words.length, expected.length, `${kind}/${name}/${difficulty}: entry loss`);
      assert.equal(new Set(words.map(api.normalizeWord)).size, words.length, `${name}: repeated answer`);
      assert.ok(words.length >= 15, `${name}/${difficulty}: cannot fill maximum-size card`);
      const { easyWords, hardWords, wordDescriptionLookup } = api.getPools();
      if (difficulty === "normal") {
        assert.ok(easyWords.length >= 8 && hardWords.length >= 7, `${name}: incomplete mixed card`);
      }
      for (const word of words) assert.ok(wordDescriptionLookup.get(api.normalizeWord(word)), `${word}: missing training hint`);
      selections++;
    }
  }
}
// The default and overlapping-category selections must also deduplicate correctly.
for (const categories of [[], ["Music", "Movies and TV", "Famous Personalities"]]) {
  const words = api.loadWords("None", categories, "normal");
  assert.equal(new Set(words.map(api.normalizeWord)).size, words.length);
  if (!categories.length) assert.ok(words.length >= 5000, "Default vocabulary should contain 5,000+ distinct answers");
  selections++;
}
// Test the real recent-history filter using a pool large enough to activate it.
const historyWords = api.loadWords("None", [], "normal").slice(0, 20);
recent = historyWords.map(api.normalizeWord);
const fresh = api.loadWords("None", [], "normal");
assert.ok(historyWords.every(word => !fresh.includes(word)), "Recent answers leaked into a fresh large pool");
recent = [];

// Verify validator failure behaviour against synthetic malformed data in memory.
const validatorSource = fs.readFileSync(path.join(__dirname, "validate-data.js"), "utf8").replace(/^#![^\n]*\n/, "");
const fixture = () => ({
  categories: { Test: Array.from({ length: 32 }, (_, i) => ({word:`Prompt ${i}`, difficulty:i < 16 ? "easy" : "hard", description:"A useful clue."})) },
  themes: { Test: Array.from({ length: 32 }, (_, i) => ({word:`Theme ${i}`, difficulty:i < 16 ? "easy" : "hard", description:"Another useful clue."})) }
});
function runValidator(data) {
  const fakeProcess = { exitCode: 0, exit: code => { throw new Error(`Unexpected parse exit ${code}`); } };
  const source = `const categories = ${JSON.stringify(data.categories)}; const themes = ${JSON.stringify(data.themes)};`;
  vm.runInNewContext(validatorSource, {
    __dirname,
    require: name => name === "fs" ? {readFileSync: () => source} : require(name),
    process: fakeProcess,
    console: { log() {}, error() {} }
  });
  return fakeProcess.exitCode;
}
assert.equal(runValidator(fixture()), 0);
for (const mutate of [
  d => { d.categories.Test[0].difficulty = "Easy"; },
  d => { d.categories.Test[0].description = ""; },
  d => { d.categories.Test[0].word = "The Café"; d.categories.Test[1].word = "Cafe"; },
  d => { d.categories.Test.forEach(e => e.difficulty = "easy"); },
  d => { d.themes = {}; },
  d => { d.categories.Test[0] = []; }
]) {
  const data = fixture();
  mutate(data);
  assert.equal(runValidator(data), 1, "Invalid data unexpectedly passed validation");
}
console.log(`PASS: ${selections} real pool selections, training hints, recent-history suppression, and 6 validator failure cases.`);
