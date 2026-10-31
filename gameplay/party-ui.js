import { modeOf } from './modes.js?v=20261031.beta1';
import { createTableSurface } from './table-ui.js?v=20261030.4';
import { createCaseSurface } from './case-ui.js?v=20261031.beta1';
import { createBetaSurface } from './cake-beta-ui.js?v=20261031.beta2';
export function createPartySurface(root, callbacks) {
    const table = createTableSurface(root, callbacks), investigation = createCaseSurface(root, callbacks), beta = createBetaSurface(root, callbacks);
    return {render(state){(modeOf(state.game.settings)==='table'?table:modeOf(state.game.settings)==='cakebeta'?beta:investigation).render(state)},reset(){table.reset();investigation.reset();beta.reset();}};
}
