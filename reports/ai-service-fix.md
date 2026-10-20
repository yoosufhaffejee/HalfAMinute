# AI service diagnosis and error handling

The live-origin provider check returned HTTP 403 with: "Your API key was reported as leaked. Please use another API key." The embedded credential is blocked. Changing the model cannot resolve this rejection. Google's model documentation still lists `gemini-flash-latest`: https://ai.google.dev/gemini-api/docs/models.

The previous error handler searched for `rate` anywhere in the provider message. This also matches `generateContent`, so credential and model failures could incorrectly appear as temporary rate limits.

The new classifier uses HTTP status, provider error codes and specific messages. It separates credential, model, quota, temporary rate-limit, service, safety, request and network failures. A retry delay is shown only when supplied by the provider. Application logging records only the failure category and status, without the raw provider response or request URL.

Validation: 106 automated tests pass, including regression coverage for the misleading `generateContent` match, quota versus short-term limits, provider retry delays, and preserving a ready pack after credential rejection. A local browser request verified the access message, restored controls and preserved manual pack: [screenshot](ai-error-feedback.png).

Generation is **not restored** by this client fix. A replacement Gemini credential must be provisioned outside the public repository and used through a server endpoint. The existing origin restrictions were not changed. Backend selection and credential provisioning remain outstanding.
