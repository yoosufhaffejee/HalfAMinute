import { PACK_SYSTEM_INSTRUCTION, PACK_RESPONSE_SCHEMA } from './ai-packs.js?v=20261020.14';

// Public client configuration only. Gemini authorization stays in Firebase AI Logic.
export const AI_SETTINGS = Object.freeze({
    siteKey: '6LfqzvgtAAAAABYZFIg-pG7eN_YJ99VDXawvJcpk',
    model: 'gemini-3.5-flash-lite'
});

async function loadFirebaseAiSdk() {
    const [appCheck, ai] = await Promise.all([
        import('https://www.gstatic.com/firebasejs/13.0.0/firebase-app-check.js'),
        import('https://www.gstatic.com/firebasejs/13.0.0/firebase-ai.js')
    ]);
    return { ...appCheck, ...ai };
}

export function createAiWordClient(app, { loadSdk = loadFirebaseAiSdk } = {}) {
    let initialization;
    let appCheckReady = false;

    async function initialize() {
        // Load AI and attestation only when requested, so their availability never
        // prevents a local game or an online lobby from opening.
        if (!initialization) {
            initialization = loadSdk().then(sdk => {
                if (!appCheckReady) {
                    sdk.initializeAppCheck(app, {
                        provider: new sdk.ReCaptchaEnterpriseProvider(AI_SETTINGS.siteKey),
                        isTokenAutoRefreshEnabled: true
                    });
                    appCheckReady = true;
                }
                const ai = sdk.getAI(app, {
                    backend: new sdk.GoogleAIBackend(),
                    useLimitedUseAppCheckTokens: true
                });
                return sdk.getGenerativeModel(ai, {
                    model: AI_SETTINGS.model,
                    systemInstruction: PACK_SYSTEM_INSTRUCTION,
                    generationConfig: { maxOutputTokens: 12288, responseMimeType: 'application/json', responseSchema: PACK_RESPONSE_SCHEMA }
                });
            }).catch(error => {
                initialization = undefined;
                throw error;
            });
        }
        return initialization;
    }

    return {
        async generateContent(prompt) {
            const model = await initialize();
            return model.generateContent(prompt);
        }
    };
}
