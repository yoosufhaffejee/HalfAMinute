# Firebase AI Logic migration

Configured through the authenticated Firebase CLI, Google Cloud CLI and Firebase administration API on 2026-10-20.

## Service configuration

- Existing Firebase project and web app reused: `halfaminute-01`.
- Billing remains disabled (Spark). No billing upgrade, Cloud Function, custom backend or hosting migration.
- Enabled reCAPTCHA Enterprise and API Keys management APIs for provider registration and scoped browser-key administration.
- Registered a score-based reCAPTCHA Enterprise App Check provider, restricted to `yoosufhaffejee.github.io`, with the default 0.5 risk threshold and one-hour token TTL.
- AI Logic's existing App Check enforcement remains enabled (`firebaseml.googleapis.com`). Realtime Database rules/enforcement were not changed.
- Added `firebaseappcheck.googleapis.com` to the existing source browser key's API targets. Its three existing live-domain referrer restrictions and existing API targets were retained. No direct Generative Language API access was added to that key.

## Application

- Replaced the legacy direct Gemini SDK and embedded Gemini credential with Firebase AI Logic and Google-managed authorization.
- Firebase app/database/AI/App Check SDKs use version 13.0.0 consistently.
- AI and attestation initialize lazily on first generation; failures cannot block ordinary local/online startup. Explicit later requests can recover after SDK initialization failure.
- Uses the pinned free-tier-supported `gemini-3.5-flash-lite` model with text output capped at 4096 tokens. The existing broad/strict prompts, word cleanup, manual editing and fallback remain.
- Sends limited-use App Check tokens; server replay enforcement was not changed.
- Error feedback now understands Firebase AI's `customErrorData`, including HTTP status and quota retry details. Verification failures have their own player-facing recovery message.

## Verification

- 114 automated tests pass across AI initialization, error handling, gameplay, lobby state, lifecycle and UI integration.
- Official CDN modules load successfully. Source syntax and whitespace checks pass.
- A temporary App Check debug registration successfully exchanged a limited-use token and generated ten football-player entries through the Firebase AI Logic proxy (finish reason `STOP`). The debug registration was deleted immediately afterward; no token was saved to the repository.
- A request without an App Check token was rejected with HTTP 401 `UNAUTHENTICATED` / `Firebase App Check token is invalid.`
- Production browser verification is recorded after deployment below.

The original blocked Gemini credential was removed from current source. It is still present in historical commits and remains blocked by Google. No replacement Gemini secret was introduced.
