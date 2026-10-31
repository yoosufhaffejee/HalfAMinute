// A separate prototype. The original Case Files reducer/content is unchanged.
import { actCase, caseSnapshot, reconcileCase, caseView } from './case-state.js?v=20261031.beta1';
import { caseStory } from './cases.js?v=20261031.beta1';
import { BETA_PUZZLES, betaStory, acceptsRiddle } from './cake-beta-content.js?v=20261031.riddles1';
export { BETA_PUZZLES } from './cake-beta-content.js?v=20261031.riddles1';
export function betaSnapshot(data) {
    const g = caseSnapshot(data);
    if (g.party?.beta) {
        const b = g.party.beta;
        g.party.beta = { ...b, opened: b.opened || {}, solved: b.solved || {}, hints: b.hints || {},
            riddles: {0:{misses:0,accepted:false,...b.riddles?.[0]},2:{misses:0,accepted:false,...b.riddles?.[2]}},
            assisted: b.assisted || {},photo:b.photo || {pick:'',reason:''},orientation:b.orientation || 'reflected',
            theory: b.theory || { suspect: -1, destination: -1 } };
    }
    return g;
}
function prepare(g) {
    if (g?.party && g.phase === 'idle') g.turn.leadId = caseStory(g).leads[g.party.history.length % 3].id;
    return g;
}
export function reconcileBeta(g, people, connectedIds) { Object.assign(g, betaSnapshot(g)); reconcileCase(g, people, connectedIds); prepare(g); }
export function actBeta(data, actor, action, now, rules, context) {
    let g = betaSnapshot(structuredClone(data));
    if (typeof action.type !== 'string') return;
    if ((action.matchId ?? 1) !== (g.matchId ?? 1) || g.wordPack || action.turnId !== g.turn?.id && !['start-game','rematch'].includes(action.type)) return;
    if (['start-game','rematch'].includes(action.type)) {
        g = actCase(g, actor, { ...action, caseId: 'cake' }, now, rules, context);
        if (!g) return;
        g.party.beta = { points: 0, opened: {}, solved: {}, hints: {}, revision: 0, feedback: '',
            riddles:{0:{misses:0,accepted:false},2:{misses:0,accepted:false}},assisted:{},photo:{pick:'',reason:''},orientation:'reflected',theory: { suspect: -1, destination: -1 } };
        g.phase = 'briefing';
        return g;
    }
    const b = g.party?.beta, host = actor.playerId === g.hostId;
    if (!b) return;
    if (action.type === 'beta-begin') {
        if (!host || g.phase !== 'briefing' || action.revision !== b.revision) return;
        b.revision++; g.phase = 'idle'; g.gameState = 'resumed';
        reconcileBeta(g, context.people, context.connectedIds);
        return prepare(g);
    }
    const member = context.connectedIds.includes(actor.playerId) && g.party.players.some(p => p.id === actor.playerId && !p.departed);
    const board = member && ['idle','waiting','evidence','accusing'].includes(g.phase);
    if (action.type.startsWith('beta-')) {
        if (!board || action.revision !== b.revision) return;
        const i = action.index, puzzle = Number.isInteger(i) && BETA_PUZZLES[i];
        if (action.type === 'beta-buy' || action.type === 'beta-hint') {
            if (!puzzle || b.solved[i] || b.points < 2) return;
            if (action.type === 'beta-buy') {
                if (b.opened[i] || i > 0 && !b.solved[i-1]) return;
                b.opened[i] = true; b.feedback = '';
            } else {
                if (!b.opened[i] || (b.hints[i] || 0) >= puzzle.hints.length) return;
                b.hints[i] = (b.hints[i] || 0) + 1; b.feedback = 'A new hint is ready.';
            }
            b.points -= 2;
        } else if (action.type === 'beta-riddle' || action.type === 'beta-riddle-choice') {
            if (!puzzle || puzzle.kind!=='riddle' || !b.opened[i] || b.riddles[i].accepted) return;
            const r=b.riddles[i];let answer=action.answer;
            if(action.type==='beta-riddle-choice'){
                if(r.misses<3)return;const choice=puzzle.choices.find(([key])=>key===answer);if(!choice)return;
                b.assisted[i]=true;
            }else if(typeof answer!=='string'||answer.length>80||!answer.trim()||!/[a-z]/i.test(answer))return;
            if(acceptsRiddle(i,answer)){
                r.accepted=true;if(i===0)b.solved[0]=true;
                b.feedback=i===0?'The serving trolley fits every line. Inspecting its handle reveals a sleeve fibre; its shelf has fresh icing.':'A mirror. The recovered photograph needs interpreting before you can trust its left and right.';
            }else{r.misses++;b.feedback=r.misses>=3?'Not a match. Four related choices are available below.':'That does not fit every line. Discuss another answer, or use a hint.';}
        } else if(action.type==='beta-photo'){
            if(!b.opened[1]||b.solved[1]||!Object.hasOwn({pick:['','a','b'],reason:['','tray','ribbon','cherries']},action.field))return;
            const choices={pick:['','a','b'],reason:['','tray','ribbon','cherries']};if(!choices[action.field].includes(action.value))return;
            b.photo[action.field]=action.value;b.feedback='';
        } else if(action.type==='beta-photo-check'){
            if(!b.opened[1]||b.solved[1]||!b.photo.pick||!b.photo.reason)return;
            if(b.photo.pick===betaStory(g).realPhoto&&b.photo.reason==='tray'){
                b.solved[1]=true;b.feedback='The loaded tray bends; the display’s tray stays straight. The real cake left before the later photo was taken.';
            }else b.feedback='That explanation does not fit both photographs and the tray reference. Compare them again.';
        } else if(action.type==='beta-orient'){
            if(!b.opened[2]||!b.riddles[2].accepted||!['reflected','flipped','rotated'].includes(action.value))return;
            b.orientation=action.value;
            if(action.value==='flipped'){b.solved[2]=true;b.feedback='The lettering now reads normally. Compare the wrist detail with the sleeve fibre, then use the room guide to locate the cake.';}
            else b.feedback='Check whether the lettering and the room guide agree with this view.';
        } else if (action.type === 'beta-review') {
            if (!host || !g.party.history.length || ![0,1,2].every(k=>b.solved[k]) && g.party.history.length < g.settings.caseTurns) return;
            b.returnPhase = g.phase === 'accusing' ? 'evidence' : g.phase; g.phase = 'accusing';
        } else if (action.type === 'beta-back') {
            if (!host || g.phase !== 'accusing') return;
            g.phase = g.party.history.length >= g.settings.caseTurns ? 'evidence' : b.returnPhase || 'evidence';
        } else if (action.type === 'beta-theory') {
            if (!host || g.phase !== 'accusing' || !['suspect','destination'].includes(action.field) || !Number.isInteger(action.index)
                || action.index < -1 || action.index >= (action.field === 'suspect' ? betaStory(g).people.length : betaStory(g).destinations.length)) return;
            b.theory[action.field] = action.index;
        } else if (action.type === 'beta-accuse') {
            const draft = action.theory;
            if (!host || g.phase !== 'accusing' || !g.party.history.length || !draft || draft.revision !== b.revision
                || draft.suspect !== b.theory.suspect || draft.destination !== b.theory.destination
                || !Number.isInteger(draft.suspect) || draft.suspect < 0 || draft.suspect >= betaStory(g).people.length
                || !Number.isInteger(draft.destination) || draft.destination < 0 || draft.destination >= betaStory(g).destinations.length) return;
            const solution = betaStory(g).solution;
            b.assessment = { suspect: draft.suspect === solution.suspect, destination: draft.destination === solution.destination,
                discoveries: [0,1,2].every(k=>b.solved[k]) };
            g.phase = 'finished'; g.roundActive = false; g.endedAt = now;
            g.finishReason = Object.values(b.assessment).every(Boolean) ? 'solved' : 'unsolved';
        } else return;
        b.revision++; g.gameState = g.phase === 'finished' ? 'finished' : 'resumed'; return g;
    }
    if (!['start-round','end-round','expire-round','toggle-answer','submit-round','continue-case','end-game','reveal-case'].includes(action.type)) return;
    g = actCase(g, actor, action, now, rules, context);
    if (g && action.type === 'submit-round') {
        g.party.beta.points += g.turn.selectedIndexes.length;
        g.party.beta.feedback = `${g.turn.selectedIndexes.length} correct · ${g.turn.selectedIndexes.length} search points earned.`;
        g.party.found = []; g.party.discoveries = []; g.party.beta.revision++;
    }
    return prepare(g);
}
export function betaView(data, actor, now, context) {
    const g = betaSnapshot(data), view = caseView(g, actor, now, context);
    return { ...view, canStartRound: view.canStartRound && (g.party?.history.length || 0) < g.settings.caseTurns,
        canExplore: view.active && Boolean(view.participant) && ['idle','waiting','evidence','accusing'].includes(g.phase) };
}
