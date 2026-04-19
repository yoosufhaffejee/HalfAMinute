#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dataPath = path.resolve(__dirname, "..", "data.js");

function normalizeWord(word) {
  return String(word || "").trim().toLowerCase();
}

function loadData(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${source}\nthis.__exported = { categories, themes };`, context);
  return context.__exported;
}

function incrementMapCounter(map, key) {
  map.set(key, (map.get(key) || 0) + 1);
}

function scanBucket(bucketName, bucketData, issues) {
  const allowedDifficulty = new Set(["easy", "hard"]);
  const duplicateTracker = new Map();
  const categoryDifficulty = {};
  const globalWordToCategories = new Map();

  Object.entries(bucketData).forEach(([categoryName, entries]) => {
    if (!Array.isArray(entries)) {
      issues.structure.push(`${bucketName} -> "${categoryName}" is not an array`);
      return;
    }

    categoryDifficulty[categoryName] = { total: 0, easy: 0, hard: 0, invalid: 0 };
    duplicateTracker.set(categoryName, new Map());

    entries.forEach((entry, index) => {
      const pointer = `${bucketName} -> ${categoryName}[${index}]`;
      categoryDifficulty[categoryName].total += 1;

      if (!entry || typeof entry !== "object") {
        issues.missingFields.push(`${pointer}: item is not an object`);
        categoryDifficulty[categoryName].invalid += 1;
        return;
      }

      const word = typeof entry.word === "string" ? entry.word.trim() : "";
      const difficulty = String(entry.difficulty || "").trim().toLowerCase();
      const description = typeof entry.description === "string" ? entry.description.trim() : "";

      if (!word) {
        issues.missingFields.push(`${pointer}: missing word`);
      }

      if (!description) {
        issues.missingFields.push(`${pointer}: missing description`);
      }

      if (/insertdescription|placeholder|todo|tbd/i.test(description)) {
        issues.placeholderDescriptions.push(`${pointer}: "${entry.description}"`);
      }

      if (!allowedDifficulty.has(difficulty)) {
        issues.invalidDifficulty.push(`${pointer}: invalid difficulty "${entry.difficulty}"`);
        categoryDifficulty[categoryName].invalid += 1;
      } else {
        categoryDifficulty[categoryName][difficulty] += 1;
      }

      if (word) {
        const normalizedWord = normalizeWord(word);
        incrementMapCounter(duplicateTracker.get(categoryName), normalizedWord);

        if (!globalWordToCategories.has(normalizedWord)) {
          globalWordToCategories.set(normalizedWord, new Set());
        }

        globalWordToCategories.get(normalizedWord).add(categoryName);
      }
    });
  });

  const intraCategoryDuplicates = [];
  duplicateTracker.forEach((wordMap, categoryName) => {
    wordMap.forEach((count, normalizedWord) => {
      if (count > 1) {
        intraCategoryDuplicates.push({
          category: categoryName,
          word: normalizedWord,
          count
        });
      }
    });
  });

  const interCategoryDuplicates = [];
  globalWordToCategories.forEach((categorySet, normalizedWord) => {
    if (categorySet.size > 1) {
      interCategoryDuplicates.push({
        word: normalizedWord,
        categories: Array.from(categorySet).sort()
      });
    }
  });

  intraCategoryDuplicates.sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
  interCategoryDuplicates.sort((a, b) => b.categories.length - a.categories.length || a.word.localeCompare(b.word));

  return {
    categoryDifficulty,
    intraCategoryDuplicates,
    interCategoryDuplicates
  };
}

function printSection(title, lines = []) {
  console.log(`\n=== ${title} ===`);
  if (lines.length === 0) {
    console.log("None");
    return;
  }

  lines.forEach(line => console.log(line));
}

function printDifficultyReport(name, report) {
  console.log(`\n=== ${name} Difficulty Distribution ===`);
  Object.entries(report).forEach(([categoryName, stats]) => {
    const easyPct = stats.total ? ((stats.easy / stats.total) * 100).toFixed(1) : "0.0";
    const hardPct = stats.total ? ((stats.hard / stats.total) * 100).toFixed(1) : "0.0";
    const invalidPct = stats.total ? ((stats.invalid / stats.total) * 100).toFixed(1) : "0.0";
    console.log(
      `${categoryName}: total=${stats.total}, easy=${stats.easy} (${easyPct}%), hard=${stats.hard} (${hardPct}%), invalid=${stats.invalid} (${invalidPct}%)`
    );
  });
}

function summarizeDuplicates(name, intra, inter) {
  console.log(`\n=== ${name} Duplicate Summary ===`);
  console.log(`Intra-category duplicates: ${intra.length}`);
  console.log(`Inter-category duplicates: ${inter.length}`);

  if (intra.length > 0) {
    console.log("\nTop intra-category duplicates:");
    intra.slice(0, 15).forEach(item => {
      console.log(`- ${item.category}: "${item.word}" x${item.count}`);
    });
  }

  if (inter.length > 0) {
    console.log("\nTop inter-category duplicates:");
    inter.slice(0, 20).forEach(item => {
      console.log(`- "${item.word}" -> ${item.categories.join(", ")}`);
    });
  }
}

function main() {
  let parsed;
  try {
    parsed = loadData(dataPath);
  } catch (error) {
    console.error(`Failed to parse data.js: ${error.message}`);
    process.exit(1);
  }

  const issues = {
    structure: [],
    missingFields: [],
    invalidDifficulty: [],
    placeholderDescriptions: []
  };

  if (!parsed || typeof parsed !== "object") {
    console.error("Invalid exported data shape. Expected categories and themes.");
    process.exit(1);
  }

  const categories = parsed.categories || {};
  const themes = parsed.themes || {};

  const categoryResults = scanBucket("categories", categories, issues);
  const themeResults = scanBucket("themes", themes, issues);

  printSection("Structure Issues", issues.structure);
  printSection("Missing/Invalid Fields", issues.missingFields.slice(0, 200));
  printSection("Invalid Difficulty Values", issues.invalidDifficulty.slice(0, 200));
  printSection("Placeholder Descriptions", issues.placeholderDescriptions.slice(0, 200));

  printDifficultyReport("Category", categoryResults.categoryDifficulty);
  printDifficultyReport("Theme", themeResults.categoryDifficulty);

  summarizeDuplicates("Category", categoryResults.intraCategoryDuplicates, categoryResults.interCategoryDuplicates);
  summarizeDuplicates("Theme", themeResults.intraCategoryDuplicates, themeResults.interCategoryDuplicates);

  const criticalIssueCount =
    issues.structure.length +
    issues.missingFields.length +
    issues.invalidDifficulty.length +
    issues.placeholderDescriptions.length;

  console.log(`\n=== Validation Result ===`);
  if (criticalIssueCount > 0) {
    console.log(`FAIL: ${criticalIssueCount} issue(s) found.`);
    process.exitCode = 1;
  } else {
    console.log("PASS: no critical data-quality issues found.");
  }
}

main();
