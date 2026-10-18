# Word curation

## October 18, 2026 expansion

The existing 31 categories and 10 themes are preserved, with the same `{ word, difficulty, description }` data shape and `easy` / `hard` labels.

| Measure | Before | After |
| --- | ---: | ---: |
| Category entries | 2,713 | 5,330 |
| Distinct category answers | 2,515 | 5,103 |
| Theme entries | 399 | 1,031 |
| Distinct theme answers | 360 | 991 |
| Smallest theme | 39 | 100 |

Distinct counts ignore case, accents, punctuation, and a leading “The”. They do not add category and theme counts together: intentional overlap exists between modes. The distinct category vocabulary has more than doubled, and theme entries have grown to about 2.6 times their previous size.

## What difficulty means

Imagine giving a spoken clue under time pressure without using any meaningful word in the answer, parts of a compound word, or derivatives of those words. Rate the shortest reasonable route to a precise guess.

- **Easy:** a familiar function, iconic scene, action, or association gives the team a direct route. “Photosynthesis” is long, but “plants using sunlight to make their food” is a direct clue. “Doctor”, “Teacher”, and “Spoon” have direct functional clues and were incorrectly marked hard in the old list.
- **Hard:** the speaker must work around blocked wording, distinguish competing answers, or explain several linked ideas. “Cold Feet” needs the idiomatic meaning rather than its literal body parts. “Red Herring” needs the idea of a misleading clue. “Regenerative Braking” needs both slowing down and recovering energy without using either answer word.

Recognition is a prerequisite for enjoyable play. A name can be easy when one iconic role identifies it; a common expression can be hard when its obvious wording is forbidden. A specialist name that nobody can clue is usually a poor addition, even if it qualifies as difficult trivia. Ratings assume a mixed English-speaking adult group with South African context; adjust after observing actual play.

Do not force a difficulty quota by labelling obvious items hard. The game consumes three easy and two hard answers on a default five-word normal card. More hard entries extend a pool only when they are worthwhile prompts. Every pool must still support the maximum configurable card size of 15 in either single-difficulty mode.

## Gaps filled

- History and geography: recognizable events, objects, leaders, local towns, African destinations, and travel landmarks.
- Science, space, inventions, and medicine: things people encounter, memorable discoveries, practical technology, body experiences, and concepts with explainable mechanisms.
- Literature and screen entertainment: fairy tales, children's favourites, distinctive characters, authors, comedies, animation, anime, and story devices. Literature now offers more characters; Books and Authors adds more writers and memoirs.
- Music and sport: African performers and genres, recognizable acts, local teams, athletes, sporting situations, and techniques.
- Nature, food, and fashion: familiar animals and behaviours, African dishes, cooking techniques, everyday garments, and funny style mishaps.
- Work, transport, business, politics, and law: daily situations, local services and brands, workplaces, public life, and concepts that invite an explanation rather than a spelling exercise.
- Internet culture and miscellaneous: recognizable memes, social awkwardness, playful expressions, and funny experiences such as “Wrong Chat”, “Brain Freeze”, “Dad Joke”, “Photobomb”, and “Rubber Duck Debugging”.

The new prompts were curated for this game. They are not a transcription of a commercial card deck. The publisher's [30 Seconds overview](https://www.30seconds.ie/) was used as a reference for the describe-without-saying-the-answer format.

## Theme audit

| Theme | Before | After | Easy | Hard |
| --- | ---: | ---: | ---: | ---: |
| Wedding Fever | 40 | 104 | 61 | 43 |
| Holiday Time | 40 | 100 | 53 | 47 |
| Sports Event | 39 | 105 | 52 | 53 |
| Summer Vacation | 40 | 104 | 60 | 44 |
| Halloween Party | 40 | 103 | 56 | 47 |
| Christmas Celebration | 40 | 103 | 58 | 45 |
| Back to School | 40 | 100 | 51 | 49 |
| Music Festival | 40 | 104 | 59 | 45 |
| Movie Night | 40 | 104 | 60 | 44 |
| Adventure Trip | 40 | 104 | 61 | 43 |

Holiday Time now includes public holidays, Eid, Diwali, lunar celebrations, birthdays, family occasions, and travel. Christmas Celebration concentrates on its own traditions, food, films, songs, and familiar festive mishaps; unrelated celebrations were removed from that pool. Other themes combine activities, objects, people, rituals, and funny situations instead of repeating variants of the same phrase.

“Current Events” is treated as recognizable news vocabulary and shared public experiences, rather than a feed of claims about who currently holds office. Its hard pool grew from one answer to 67. New biographical clues generally use specific past achievements, roles, or works so that the list ages more slowly.

## Category audit

| Category | Before | After | Easy | Hard |
| --- | ---: | ---: | ---: | ---: |
| History | 86 | 165 | 95 | 70 |
| Geography (Places & Attractions) | 233 | 303 | 197 | 106 |
| Science & Technology | 92 | 181 | 99 | 82 |
| Literature | 57 | 146 | 90 | 56 |
| Art and Culture | 76 | 164 | 93 | 71 |
| Music | 94 | 172 | 107 | 65 |
| Sports | 208 | 261 | 178 | 83 |
| Movies and TV | 137 | 219 | 156 | 63 |
| Food and Drink | 86 | 176 | 119 | 57 |
| Nature and Wildlife | 63 | 152 | 104 | 48 |
| Languages | 74 | 162 | 110 | 52 |
| Famous Personalities | 115 | 203 | 159 | 44 |
| Current Events | 51 | 140 | 73 | 67 |
| Religion and Mythology | 64 | 129 | 80 | 49 |
| Space and Astronomy | 56 | 131 | 80 | 51 |
| Inventions and Discoveries | 55 | 141 | 85 | 56 |
| Health and Medicine | 57 | 147 | 93 | 54 |
| Games and Toys | 74 | 147 | 113 | 34 |
| Books and Authors | 56 | 142 | 93 | 49 |
| Video Games | 87 | 172 | 96 | 76 |
| Cars | 58 | 146 | 85 | 61 |
| Fashion | 47 | 135 | 96 | 39 |
| Miscellaneous | 71 | 148 | 91 | 57 |
| Business, Brands, and Companies | 90 | 179 | 127 | 52 |
| Politics and Government | 90 | 179 | 98 | 81 |
| Household and Everyday Objects | 90 | 177 | 148 | 29 |
| Professions and Workplaces | 90 | 180 | 134 | 46 |
| Travel, Transport, and Aviation | 89 | 179 | 141 | 38 |
| Internet Culture and Social Media | 90 | 190 | 111 | 79 |
| Crime, Law, and Justice | 90 | 177 | 101 | 76 |
| Africa: People, Places, and Events | 87 | 187 | 116 | 71 |

## Duplicate and description policy

- Consolidate obvious aliases within a pool: Everest / Mount Everest, Moby Dick / Moby-Dick, Pokémon / Pokemon, and Barbie / Barbie Dolls should not inflate its size.
- Keep legitimate cross-category fit, such as an author in Literature and Famous Personalities. The game deduplicates combined selections.
- Use the same display spelling for an identical answer across pools. Check the intended meaning: a school geometry compass and a navigation compass may need different descriptions.
- Remove generic filler and adjective-only variants. Examples removed include “Galactic”, “Stellar”, “Holy”, and “Divine”, alongside repeated umbrella labels and over-specific variants of sporting events.
- For new entries, write a concise clue avoiding the answer's meaningful words and derivatives, including parts of compounds. Test whether that clue actually identifies the answer rather than dozens of alternatives.
- New clues received an exact-word scan and a derivative/compound review. Automated scans are aids, not proof that a clue follows every house rule. Older retained descriptions can still be reference definitions rather than legal clues to read verbatim.
- Preserve factual accuracy. Prefer a completed event, a signature role, or an established association over changing officeholders, rankings, acquisitions, or current records. Revisit time-sensitive legacy descriptions during later maintenance.

## Checks

```sh
node tools/validate-data.js
node tools/test-word-data.js
```

The validator reports vocabulary totals, distributions, overlap, invalid records, duplicate variants within a pool, and difficulty pools smaller than 15. It fails on invalid records, internal duplicates, or undersized pools; selective overlap across pools is informational.

The focused checks exercise 125 actual loading selections, including all 41 pools in all three modes, default play, and overlapping categories. They also check hint availability, recent-word suppression in a sufficiently large pool, and six malformed-data failure cases.

The expansion preserves the selection algorithm. It improves the number of cards available before reloads; it does not guarantee a no-repeat full-deck cycle. The current algorithm can reload when either difficulty runs low, and recent-history filtering is conditional on the remaining pool's size. Those are separate gameplay issues to assess if repetition remains noticeable after this content update.
