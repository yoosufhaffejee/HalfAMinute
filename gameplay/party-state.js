import { modeOf, normalizeModeSettings } from './modes.js?v=20261031.beta1';
import { tableSnapshot, actTable, reconcileTable, tableView } from './table-state.js?v=20261030.4';
import { caseSnapshot, actCase, reconcileCase, caseView } from './case-state.js?v=20261031.beta1';
import { betaSnapshot, actBeta, reconcileBeta, betaView } from './cake-beta-state.js?v=20261031.beta2';
const select = (game, table, beta, original) => modeOf(game.settings) === 'table' ? table : modeOf(game.settings) === 'cakebeta' ? beta : original;
export function partySnapshot(game) { return select(game,tableSnapshot,betaSnapshot,caseSnapshot)(game); }
export function reconcileParty(game, people, connectedIds, now) { return select(game,reconcileTable,reconcileBeta,reconcileCase)(game,people,connectedIds,now); }
export function actParty(game, actor, action, now, rules, context) { return select(game,actTable,actBeta,actCase)({...game,settings:normalizeModeSettings(game.settings)},actor,action,now,rules,context); }
export function partyView(game, actor, now, context) { return select(game,tableView,betaView,caseView)(game,actor,now,context); }
