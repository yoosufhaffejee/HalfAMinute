// Presentation helpers never advance a turn or change its score.
export const REACTIONS = { clap: '👏', fire: '🔥', laugh: '😂', shock: '😱', clever: '🧠', close: '😅', ouch: '💀' };
export const REACTION_LABELS = { clap: 'Applaud', fire: 'On fire', laugh: 'That was hilarious', shock: 'No way!', clever: 'Clever clue', close: 'That was close', ouch: 'Brutal!' };
export const REACTION_TTL_MS = 3500;

export function roundHighlight(event, previous = []) {
    if (!event || !event.earned) return '';
    if (event.wordCount > 0 && event.earned === event.wordCount) return `Perfect card! ${event.earned}/${event.wordCount}`;
    const earlier = previous.filter(item => item.teamIndex === event.teamIndex && item.id !== event.id);
    if (earlier.length && event.earned > Math.max(...earlier.map(item => item.earned || 0))) return "Your team's best round!";
    return '';
}

export function leadChange(event, points) {
    if (!event?.pointsBeforeAll || points.length < 2) return '';
    const team = event.teamIndex, others = points.filter((_, index) => index !== team);
    const beforeOthers = event.pointsBeforeAll.filter((_, index) => index !== team);
    return points[team] > Math.max(...others) && event.pointsBeforeAll[team] <= Math.max(...beforeOthers)
        ? `Team ${team + 1} takes the lead!` : '';
}

export function finishContext(progress, points, teamIndex, chaos, wordCount) {
    if (!progress.finalTurnCount || progress.finished || !progress.pendingTeams.includes(teamIndex)) return '';
    const rival = Math.max(...points.filter((_, index) => index !== teamIndex));
    const gap = rival - points[teamIndex];
    if (gap < 0) return `Team ${teamIndex + 1} leads by ${-gap}.`;
    if (gap === 0) return `Team ${teamIndex + 1} is level with the lead.`;
    if (chaos || gap > wordCount) return `Team ${teamIndex + 1} trails the lead by ${gap}.`;
    return `${gap} ${gap === 1 ? 'point' : 'points'} to tie${gap < wordCount ? ` · ${gap + 1} to take the lead` : ''}.`;
}

export function rosterKey(teams) {
    return JSON.stringify(teams.map(team => (team.players || []).map(player => player.playerId).sort()));
}

export function freshSeries(teamCount, roster = '') {
    return { roster, wins: Array(teamCount).fill(0), draws: 0, lastMatchId: 0 };
}

export function recordSeries(series, matchId, winners) {
    if (!series || !winners.length || series.lastMatchId === matchId) return series;
    const next = { ...series, wins: [...series.wins], lastMatchId: matchId };
    if (winners.length > 1) next.draws++;
    else next.wins[winners[0]]++;
    return next;
}

export function seriesLabel(series) {
    if (!series || !series.wins.some(Boolean) && !series.draws) return '';
    const wins = series.wins.map((count, index) => `Team ${index + 1}: ${count}`).join(' · ');
    return `This session · ${wins}${series.draws ? ` · ${series.draws} ${series.draws === 1 ? 'draw' : 'draws'}` : ''}`;
}

export function inviteCode(href) {
    try { const code = new URL(href).searchParams.get('lobby')?.toUpperCase(); return /^[A-Z]{4}$/.test(code || '') ? code : ''; }
    catch { return ''; }
}

export function inviteLink(href, code) {
    if (!/^[A-Z]{4}$/.test(code)) throw new Error('invalid-lobby-code');
    const url = new URL(href); url.search = ''; url.hash = ''; url.searchParams.set('lobby', code); return url.href;
}
