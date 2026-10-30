import { modeOf, normalizeModeSettings } from './modes.js?v=20261030.casewords1';
import { tableSnapshot, actTable, reconcileTable, tableView } from './table-state.js?v=20261030.4';
import { caseSnapshot, actCase, reconcileCase, caseView } from './case-state.js?v=20261030.casewords1';
export function partySnapshot(game) { return modeOf(game.settings) === 'table' ? tableSnapshot(game) : caseSnapshot(game); }
export function reconcileParty(game, people, connectedIds, now) { return (modeOf(game.settings) === 'table' ? reconcileTable : reconcileCase)(game,people,connectedIds,now); }
export function actParty(game, actor, action, now, rules, context) { return (modeOf(game.settings) === 'table' ? actTable : actCase)({...game,settings:normalizeModeSettings(game.settings)},actor,action,now,rules,context); }
export function partyView(game, actor, now, context) { return (modeOf(game.settings) === 'table' ? tableView : caseView)(game,actor,now,context); }
