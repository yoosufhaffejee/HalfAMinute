import { MODES, modeOf } from './modes.js?v=20261031.beta1';
import { CASES, caseSubmission } from './cases.js?v=20261031.beta1';
function download(blob, filename) {
    const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function partySummary(game) {
    if (modeOf(game.settings) === 'cakebeta') {
        const b = game.party.beta;
        download(new Blob([JSON.stringify({ version: 1, mode: 'cakebeta', caseId: 'cake', scenarioId: game.party.scenarioId,
            finishReason: game.finishReason, revealed: Boolean(game.party.revealed), wordRounds: game.party.history.length,
            correctWords: game.party.totalCorrect, searchPoints: b.points, discoveries: Object.keys(b.solved).length,
            hints: b.hints, accusation: b.theory, assessment: b.assessment || null }, null, 2)], { type: 'application/json' }), 'cake-escape-beta-summary.json');
        return;
    }
    const value = { version: 3, mode: modeOf(game.settings), matchId: game.matchId, finishReason: game.finishReason,
        ...(modeOf(game.settings) === 'table' ? { scores: game.party.players.map(player => player.points) } : {}), turns: game.party.history.map(event => ({ correct: event.earned, cardSize: event.wordCount })),
        ...(modeOf(game.settings) === 'case' ? { caseId: game.settings.caseId, scenarioId: game.party.scenarioId || 'original', revealed: Boolean(game.party.revealed), evidence: game.party.found.length, correct: game.party.totalCorrect, investigations: game.party.history.length,
            reconstruction: caseSubmission(game), assessment: game.party.assessment || null, nudges: game.party.hintsUsed || 0 }
            : { format: game.party.format, timing: game.settings.tableTiming, scoring: game.settings.tableScoring, seconds: game.settings.tableSeconds, wordsPerCard: game.settings.numWords }) };
    download(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }), 'half-a-minute-summary.json');
}
export async function sharePartyResult(game) {
    const mode = modeOf(game.settings), table = mode === 'table', beta = mode === 'cakebeta', canvas = document.createElement('canvas');
    canvas.width = 800; canvas.height = table ? 340 + game.party.players.length * 56 : 440;
    const context = canvas.getContext('2d'); context.fillStyle = '#f3f5f8'; context.fillRect(0, 0, canvas.width, canvas.height);
    context.textAlign = 'center'; context.fillStyle = '#172033'; context.font = 'bold 34px Arial'; context.fillText('Half A Minute', 400, 70);
    context.font = '26px Arial'; context.fillText(MODES[mode].name, 400, 120);
    const title = game.finishReason === 'stopped' ? 'Match ended' : table ? game.finishReason === 'draw' ? "It's a draw!" : 'A table well played'
        : game.finishReason === 'solved' ? 'Case solved!' : game.party.revealed ? 'Scenario revealed' : 'Case still open';
    context.font = 'bold 38px Arial'; context.fillText(title, 400, 190);
    context.font = '24px Arial';
    if (table) game.party.players.forEach((player, index) => context.fillText(`Player ${index + 1} · ${player.points} points`, 400, 255 + index * 56));
    else { context.fillText(CASES[game.settings.caseId].title, 400, 260, 720); context.fillText(beta ? `${Object.keys(game.party.beta.solved).length}/3 discoveries · ${game.party.history.length} word rounds` : `${game.party.found.length}/12 evidence · ${game.party.history.length} investigations`, 400, 305, 720); context.fillText(beta ? 'One crew. A very slippery cake.' : game.finishReason==='solved'?'Explanation, timeline and evidence connected.':'One crew. One reconstruction.', 400, 350, 720); }
    context.fillStyle = '#64748b'; context.font = '20px Arial'; context.fillText('Describe. Guess. Play again.', 400, canvas.height - 42);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png')); if (!blob) throw new Error('Unable to make the card');
    const file = new File([blob], 'half-a-minute-result.png', { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] }) && navigator.share) {
        try { await navigator.share({ title: 'Half A Minute', files: [file] }); return 'Result card shared.'; }
        catch (error) { if (error.name === 'AbortError') return ''; }
    }
    download(blob, file.name); return 'Result card downloaded.';
}
