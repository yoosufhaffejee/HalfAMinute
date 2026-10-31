const assert=require('node:assert/strict'),fs=require('node:fs');
module.exports=({pageFor,gate,settings,layout,report,gameState,waitState,live,liveCodes,caseContent})=>{
    const btn=(p,type)=>p.locator(`[data-beta-action="${type}"]`);
    async function briefing(page){
        await page.getByRole('heading',{name:'The cake that couldn’t have vanished',exact:true}).waitFor();
        const text=await page.locator('.beta-briefing').innerText();assert.match(text,/Amara’s birthday party/);assert.match(text,/Nobody saw one carried/);assert.match(text,/Your mission/);
        assert.equal(await page.locator('.beta-suspect').count(),6);assert.equal(await page.locator('.beta-puzzle,.table-word-card').count(),0);assert.equal(await btn(page,'start-round').count(),0);
        assert.doesNotMatch(text,/Four legs|under the table|gold ribbon|star pattern/);
    }
    async function wordRound(page,count,local=false){
        if(local)await gate(page);await btn(page,'start-round').click();assert.equal(await page.locator('.table-word-card').count(),0);
        if(local)await page.clock.runFor(4800);await page.locator('.table-word-card li').first().waitFor();await btn(page,'end-round').click();
        for(let i=0;i<count;i++)await btn(page,'toggle-answer').nth(i).click();await btn(page,'submit-round').click();await btn(page,'beta-buy').waitFor();
    }
    async function experiment(page){for(const[field,value]of [['prop','foam'],['transport','trolley'],['cloth','down']])await page.locator('#beta-'+field).selectOption(value);await btn(page,'beta-test').click();await page.locator('.beta-trail').waitFor();}
    async function accuse(page,story){await btn(page,'beta-review').click();await page.locator('#beta-suspect').selectOption(String(story.solution.suspect));await page.locator('#beta-destination').selectOption(String(story.solution.destination));await btn(page,'confirm').click();await btn(page,'beta-accuse').click();await page.getByRole('heading',{name:'Cake found. Case solved!',exact:true}).waitFor();}
    return {
        async local(){
            const{page,context}=await pageFor();await page.clock.install();await page.evaluate(()=>{crypto.getRandomValues=a=>{a.fill(0);return a}});
            await page.locator('#quickMode').selectOption('cakebeta');assert.equal(await page.locator('#caseIdField').isVisible(),false);assert.equal(await page.locator('#ai').isVisible(),false);
            await page.locator('#localPlayerNames').fill('Alice\nBob');await settings(page,{txtSeconds:5,txtWords:5});await page.locator('#startGameButton').click();await briefing(page);
            await layout(page,'Beta narrative briefing');await page.screenshot({path:'reports/cake-beta-briefing.png',fullPage:true});await btn(page,'beta-begin').click();await gate(page);
            await layout(page,'Beta opening and suspects');await page.screenshot({path:'reports/cake-beta-opening.png',fullPage:true});
            await btn(page,'start-round').click();assert.equal(await page.locator('.table-word-card').count(),0);await page.clock.runFor(4800);await btn(page,'end-round').click();for(let i=0;i<3;i++)await btn(page,'toggle-answer').nth(i).click();await btn(page,'submit-round').click();
            await btn(page,'beta-buy').click();await page.locator('[data-answer="door"]').click();assert.match(await page.locator('.beta-feedback').innerText(),/does not fit/);await page.locator('[data-answer="table"]').click();
            assert.match(await page.locator('.party-progress').innerText(),/1 search points/);await btn(page,'continue-case').click();await wordRound(page,5,true);
            await btn(page,'beta-buy').click();await btn(page,'beta-hint').click();await page.locator('.beta-hint').waitFor();await layout(page,'Beta photo puzzle');await page.screenshot({path:'reports/cake-beta-photos.png',fullPage:true});
            await page.locator('[data-answer="ribbon"]').click();await btn(page,'beta-buy').click();await btn(page,'beta-test').click();assert.match(await page.locator('.beta-feedback').innerText(),/real cake is still/);
            await layout(page,'Beta experiment');await page.screenshot({path:'reports/cake-beta-experiment.png',fullPage:true});await experiment(page);
            await accuse(page,caseContent.CASES.cake);await layout(page,'Beta solved result');
            const download=page.waitForEvent('download');await btn(page,'summary').click();const summary=JSON.parse(fs.readFileSync(await(await download).path(),'utf8'));assert.equal(summary.mode,'cakebeta');assert.equal(summary.discoveries,3);assert.equal(summary.finishReason,'solved');
            const png=page.waitForEvent('download');await btn(page,'share').click();assert.equal((await png).suggestedFilename(),'half-a-minute-result.png');
            await btn(page,'replay').click();await briefing(page);await btn(page,'beta-begin').click();await gate(page);assert.match(await page.locator('.party-progress').innerText(),/0\/3 discoveries/);await btn(page,'request-end').click();await page.locator('#confirmEndGameButton').click();
            assert.equal(await page.locator('.case-solution').count(),0);await btn(page,'request-reveal').click();assert.equal(await page.locator('.case-solution').count(),0);await btn(page,'cancel-reveal').click();await btn(page,'request-reveal').click();await btn(page,'reveal-case').click();await page.locator('.case-solution').waitFor();
            await btn(page,'shuffle').click();await briefing(page);await btn(page,'beta-begin').click();await gate(page);assert.equal(await page.locator('.case-solution').count(),0);assert.match(await page.locator('.party-progress').innerText(),/0\/3 discoveries/);
            report.checks.push('Beta local: narrative/mission/suspects before play, no early puzzle spoilers, briefing on replay, private countdown, odd point carryover, wrong puzzle retry, hint purchase, visual comparison, experiment feedback, full solve, safe exports, same replay, reveal confirmation/cancel, new scenario reset');await context.close();
        },
        async online(){
            const host=await pageFor(),guest=await pageFor();await host.page.locator('#quickMode').selectOption('cakebeta');await settings(host.page,{txtSeconds:5,txtWords:5});
            await host.page.locator('#online').click();await host.page.locator('#playerName').fill('Host');await host.page.locator('#createLobbyButton').click();await host.page.waitForFunction(()=>/\b[A-Z]{4}\b/.test(document.getElementById('lblGameCode').textContent));
            const code=(await host.page.locator('#lblGameCode').innerText()).match(/\b[A-Z]{4}\b/)[0];if(live)liveCodes.push(code);
            await guest.page.locator('#online').click();await guest.page.locator('#playerName').fill('Guest');await guest.page.locator('#joinLobbyCode').fill(code);await guest.page.locator('#joinLobbyButton').click();await waitState(code,g=>g.numPlayers===2);
            const pageForId=(g,id)=>g.teams.flatMap(t=>t.players||[]).find(p=>p.playerId===id).playerName==='Host'?host.page:guest.page;
            let g=await gameState(code),leader=pageForId(g,g.hostId);await btn(leader,'start-game').click();
            await briefing(leader);const reader=leader===host.page?guest.page:host.page;await briefing(reader);await reader.reload({waitUntil:'domcontentloaded'});await briefing(reader);assert.equal(await btn(reader,'beta-begin').count(),0);await btn(leader,'beta-begin').click();
            for(let round=0;round<2;round++){
                g=await waitState(code,g=>g.phase==='idle');const speaker=pageForId(g,g.turn.speakerId),listener=speaker===host.page?guest.page:host.page;
                await btn(speaker,'start-round').click();assert.equal(await listener.locator('.table-word-card').count(),0);await speaker.locator('.table-word-card li').first().waitFor();assert.equal(await listener.locator('.table-word-card').count(),0);await btn(speaker,'end-round').click();
                for(let i=0;i<5;i++)await btn(speaker,'toggle-answer').nth(i).click();await btn(speaker,'submit-round').click();g=await waitState(code,g=>g.phase==='evidence');
                if(round===0){await btn(guest.page,'beta-buy').click();await guest.page.locator('[data-answer="table"]').click();await waitState(code,g=>g.party.beta.solved?.[0]);await host.page.reload({waitUntil:'domcontentloaded'});await host.page.locator('.beta-clue').waitFor();g=await gameState(code);await btn(pageForId(g,g.turn.speakerId),'continue-case').click();}
            }
            await btn(guest.page,'beta-buy').click();await guest.page.locator('[data-answer="ribbon"]').click();await waitState(code,g=>g.party.beta.solved?.[1]);await btn(guest.page,'beta-buy').click();await experiment(guest.page);g=await waitState(code,g=>g.party.beta.solved?.[2]);leader=pageForId(g,g.hostId);
            await btn(leader,'beta-review').click();const story=caseContent.caseStory(g);await leader.locator('#beta-suspect').selectOption(String(story.solution.suspect));await leader.locator('#beta-destination').selectOption(String(story.solution.destination));
            const listener=leader===host.page?guest.page:host.page;await listener.reload({waitUntil:'domcontentloaded'});await listener.locator('.beta-final').waitFor();assert.equal(await btn(listener,'confirm').count(),0);
            await btn(leader,'confirm').click();await btn(leader,'beta-accuse').click();g=await waitState(code,g=>g.finishReason==='solved');await listener.getByRole('heading',{name:'Cake found. Case solved!',exact:true}).waitFor();
            const scenario=g.party.scenarioId;await btn(leader,'replay').click();g=await waitState(code,g=>g.matchId===2);assert.equal(g.party.scenarioId,scenario);assert.equal(g.party.beta.points,0);assert.equal(g.phase,'briefing');
            for(const page of [host.page,guest.page]){await btn(page,'exit').click();await page.locator('#menu').waitFor({state:'visible'});}
            report.checks.push('Beta online: shared narrative briefing survives refresh, host-only begin, two clients, guest investigation/experiment edits, shared points, speaker word privacy, refresh persistence, host-only accusation, shared solved ending and replay reset');await host.context.close();await guest.context.close();
        }
    };
};
