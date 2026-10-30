import { modeOf } from './modes.js?v=20261030.variants1';
import { createTableSurface } from './table-ui.js?v=20261030.4';
import { createCaseSurface } from './case-ui.js?v=20261030.briefing1';
export function createPartySurface(root, callbacks) {
    const table = createTableSurface(root, callbacks), investigation = createCaseSurface(root, callbacks);
    return {render(state){(modeOf(state.game.settings)==='table'?table:investigation).render(state)},reset(){table.reset();investigation.reset();}};
}
