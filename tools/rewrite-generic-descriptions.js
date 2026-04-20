const fs = require('fs');
const vm = require('vm');

const DATA_FILE = 'data.js';

const genericPhrases = [
  'reference;',
  'clue;',
  'Appears in clues',
  'Commonly used when',
  'A familiar object linked',
  'term; start with',
  'General-knowledge entry',
  'Public figure reference',
  'Personality clue',
  'Famous-person clue',
  'A recognizable African reference often used in regional knowledge clues.',
  'A job-related clue tied to specific skills and work environments.',
  'A profession or workplace role often clued through duties, tools, or uniforms.',
  'A politics or government clue tied to elections, institutions, or power.',
  'A transport-related term used in travel and mobility contexts.',
  'An internet-culture clue tied to online trends, creators, or social platforms.',
  'A justice-system clue tied to investigations, courts, or legal outcomes.',
  'Athletics reference; clue with team/event context and a famous moment.',
  'Sports clue; describe the sport, role, and a defining achievement.',
  'Sports term; start with game type, then scoring or tournament context.',
  'Movie/show reference; start with setting, then the central conflict.',
  'Screen clue; describe plot setup, franchise, or actor association.',
  'Film/TV clue; use genre, main character, and iconic scene or line.',
  'Culinary reference; use texture, preparation style, or meal type.',
  'Language term; start with geography and one defining grammar or script trait.',
  'Language clue; describe region, script, and common usage context.',
  'Belief-system reference; clue with origin, practices, and key narrative.',
  'Gaming reference; start with genre and one iconic mechanic.',
  'Video-game clue; describe platform, gameplay loop, and objective.',
  'Game/toy clue; describe how it is played and what makes it recognizable.',
  'Play clue; start with player actions, then pieces or equipment.',
  'Leisure reference; clue with age group, rules, and objective.'
];

const categoryHints = {
  'Sports': 'sport athletics tournament team player',
  'Movies and TV': 'film television series movie character',
  'Food and Drink': 'food dish drink cuisine ingredient',
  'Nature and Wildlife': 'animal nature ecosystem wildlife',
  'Languages': 'language linguistics script',
  'Famous Personalities': 'person biography notable figure',
  'Current Events': 'news modern current affairs',
  'Religion and Mythology': 'religion mythology deity faith',
  'Space and Astronomy': 'space astronomy planet galaxy',
  'Inventions and Discoveries': 'invention discovery science technology',
  'Health and Medicine': 'health medicine anatomy disease',
  'Games and Toys': 'game toy board game play',
  'Books and Authors': 'book author novel literature',
  'Video Games': 'video game gaming franchise',
  'Cars': 'car automobile vehicle motor',
  'Fashion': 'fashion clothing apparel style',
  'Miscellaneous': 'general concept term',
  'Politics and Government': 'politics government election law diplomacy',
  'Household and Everyday Objects': 'household object home tool',
  'Professions and Workplaces': 'profession occupation workplace job',
  'Travel, Transport, and Aviation': 'travel transport aviation airport transit',
  'Internet Culture and Social Media': 'internet social media online meme platform',
  'Crime, Law, and Justice': 'crime law justice legal court police',
  'Africa: People, Places, and Events': 'Africa history geography people event'
};

const fallbackByCategory = {
  'Sports': 'A well-known sport or sporting term, usually clued by rules, equipment, or scoring.',
  'Movies and TV': 'A notable film or TV reference, usually clued by plot, characters, or iconic scenes.',
  'Food and Drink': 'A common food or drink item, often clued by ingredients, taste, or preparation style.',
  'Nature and Wildlife': 'A nature or wildlife term often clued by habitat, appearance, or behavior.',
  'Languages': 'A language term often clued by region, script, and where it is widely spoken.',
  'Famous Personalities': 'A notable public figure often clued by field, nationality, or signature achievement.',
  'Current Events': 'A contemporary issue or event often clued by headlines and global impact.',
  'Religion and Mythology': 'A religion or mythology term often clued by beliefs, stories, or symbols.',
  'Space and Astronomy': 'A space-related term often clued by planets, stars, missions, or cosmic phenomena.',
  'Inventions and Discoveries': 'An invention or discovery often clued by function, inventor, or scientific impact.',
  'Health and Medicine': 'A health or medical term often clued by body systems, treatment, or diagnosis.',
  'Games and Toys': 'A game or toy term often clued by gameplay, rules, or familiar components.',
  'Books and Authors': 'A literature term often clued by author, story, or famous characters.',
  'Video Games': 'A video game reference often clued by franchise, platform, or core gameplay.',
  'Cars': 'An automotive term often clued by design, performance, or vehicle function.',
  'Fashion': 'A fashion term often clued by clothing style, accessory type, or runway context.',
  'Miscellaneous': 'A general-knowledge term often clued by context, purpose, or common usage.',
  'Politics and Government': 'A political term often clued by elections, institutions, or leadership.',
  'Household and Everyday Objects': 'An everyday household item usually clued by use and where it is found at home.',
  'Professions and Workplaces': 'A profession term often clued by responsibilities, tools, or work environment.',
  'Travel, Transport, and Aviation': 'A travel or transport term often clued by flights, routes, or transit systems.',
  'Internet Culture and Social Media': 'An online-culture term often clued by platforms, trends, or digital behavior.',
  'Crime, Law, and Justice': 'A legal or crime term often clued by investigations, courts, or penalties.',
  'Africa: People, Places, and Events': 'An African people/place/event reference often clued by geography, history, or culture.'
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isGeneric(description) {
  return genericPhrases.some((phrase) => description.includes(phrase));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getFirstSentence(extract) {
  if (!extract) return null;
  const text = extract.replace(/\s+/g, ' ').trim();
  const match = text.match(/^(.{20,260}?[.!?])\s/);
  return (match ? match[1] : text.slice(0, 220)).trim();
}

function cleanupSentence(sentence, word, title) {
  if (!sentence) return null;
  let output = sentence.replace(/\s+/g, ' ').trim();
  output = output.replace(/\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim();

  const patterns = [
    new RegExp(`^${escapeRegExp(title || '')}\\s+(is|was|are|were)\\s+`, 'i'),
    new RegExp(`^${escapeRegExp(word || '')}\\s+(is|was|are|were)\\s+`, 'i')
  ];

  for (const pattern of patterns) {
    if (pattern.source !== '^(?:)\\s+(is|was|are|were)\\s+' && pattern.test(output)) {
      output = output.replace(pattern, 'A ');
      break;
    }
  }

  output = output.replace(/^A an\s+/i, 'An ');
  output = output.replace(/^A a\s+/i, 'A ');
  output = output.replace(/^A the\s+/i, 'The ');

  if (/may refer to|can refer to|most often refers to/i.test(output)) return null;
  if (output.length < 18) return null;
  if (output.length > 180) output = `${output.slice(0, 177).replace(/[,;:\s]+$/, '')}...`;
  if (!/[.!?]$/.test(output)) output += '.';
  return output.charAt(0).toUpperCase() + output.slice(1);
}

async function fetchJson(url) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'HalfAMinuteDataAudit/1.0' } });
      if (!response.ok) {
        if (response.status >= 500 || response.status === 429) {
          await sleep(180 * attempt);
          continue;
        }
        return null;
      }
      return await response.json();
    } catch {
      await sleep(220 * attempt);
    }
  }
  return null;
}

const summaryCache = new Map();
const searchCache = new Map();

async function getSummaryByTitle(title) {
  if (!title) return null;
  if (summaryCache.has(title)) return summaryCache.get(title);
  const json = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
  summaryCache.set(title, json || null);
  return json || null;
}

async function searchTitles(query) {
  if (searchCache.has(query)) return searchCache.get(query);
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=5`;
  const json = await fetchJson(url);
  const titles = json?.query?.search?.map((result) => result.title).filter(Boolean) || [];
  searchCache.set(query, titles);
  return titles;
}

async function resolveDescription(word, category) {
  const hint = categoryHints[category] || 'general knowledge';
  const candidates = [word.trim()];
  const queries = [
    `"${word}" ${hint}`,
    `${word} ${hint}`,
    `${word} wikipedia`
  ];

  for (const query of queries) {
    const results = await searchTitles(query);
    for (const title of results) candidates.push(title);
  }

  const seen = new Set();
  for (const title of candidates) {
    if (!title) continue;
    const key = title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const summary = await getSummaryByTitle(title);
    if (!summary?.extract) continue;
    if (String(summary.type || '').toLowerCase() === 'disambiguation') continue;

    const sentence = getFirstSentence(summary.extract);
    const cleaned = cleanupSentence(sentence, word, summary.title || title);
    if (cleaned) return cleaned;
  }

  return fallbackByCategory[category] || 'A recognizable general-knowledge entry often clued by context and association.';
}

function writeUpdatedCategories(fullSource, categories) {
  const start = fullSource.indexOf('const categories = ');
  const themesStart = fullSource.indexOf('const themes = ');
  if (start === -1 || themesStart === -1 || themesStart <= start) {
    throw new Error('Could not locate categories/themes blocks in data.js');
  }
  const categoriesBlock = `const categories = ${JSON.stringify(categories, null, 2)};\n\n`;
  const output = fullSource.slice(0, start) + categoriesBlock + fullSource.slice(themesStart);
  fs.writeFileSync(DATA_FILE, output, 'utf8');
}

function parseArgs(argv) {
  const args = { categories: [] };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--category' && argv[i + 1]) {
      args.categories.push(argv[i + 1]);
      i += 1;
    }
  }
  return args;
}

async function main() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const context = {};
  vm.runInNewContext(`${raw}\nthis._categories = categories;`, context);
  const categories = context._categories;
  const { categories: categoryFilter } = parseArgs(process.argv);
  const allowed = categoryFilter.length ? new Set(categoryFilter) : null;

  const targets = [];
  for (const [categoryName, entries] of Object.entries(categories)) {
    if (allowed && !allowed.has(categoryName)) continue;
    for (const entry of entries) {
      if (isGeneric(String(entry.description || ''))) {
        targets.push({ categoryName, entry });
      }
    }
  }

  console.log(`Targets: ${targets.length}`);
  let completed = 0;
  for (const target of targets) {
    completed += 1;
    target.entry.description = await resolveDescription(target.entry.word, target.categoryName);
    if (completed % 25 === 0 || completed === targets.length) {
      console.log(`Updated ${completed}/${targets.length}`);
    }
    if (completed % 100 === 0) {
      writeUpdatedCategories(raw, categories);
      console.log(`Checkpoint write at ${completed}/${targets.length}`);
    }
  }

  writeUpdatedCategories(raw, categories);
  console.log('Done');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
