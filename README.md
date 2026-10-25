# Fluentser

Fluentser is a creator-brand partnership marketplace. This repository is a fresh MVP foundation because the supplied workspace contained no existing project files.

## Included in this MVP

- Creator Expo app at `apps/creator-mobile` (Expo SDK 57): creator onboarding, profile setup, campaign browsing, and a local preview save when the API is offline. Run with `npm run dev:creator` (Expo Go/device) or `npm run dev:creator:web` (web preview at `http://localhost:4176`).
- Creator web preview at `/`: creator registration/login, opt-in profile setup, public visibility control, profile-link consent, YouTube channel sync after creator submission, campaign browsing, and application submission.
- Brand web workspace at `/brand`: search only public Fluentser creator profiles, filter by linked social platform, view profile details and sources, and create campaigns.
- Express API: registration/login, creator profile and social-account routes, internal creator directory, campaign create/list/publish, creator applications, health, and OpenAPI JSON.
- MongoDB/Mongoose persistence for users, organizations, creator profiles, campaigns, applications and normalized social accounts, with unique username, application, email, social identity and provider-refresh indexes.
- YouTube Data API v3 runs only after a creator provides their own channel URL and grants consent. Creator-authorized social accounts store provider metrics in MongoDB and refresh automatically when the snapshot reaches 12 hours old. API credentials stay on the server.
- Instagram profile links can be saved with consent and are clearly marked unverified. Creator-owned insights are not fetched until an authorized Meta professional-account login flow is configured and implemented.

The creator Expo native app, standalone admin app, refresh-token rotation, email verification/reset, brand-side application review, invitations/offers/collaboration workspaces, persistent messaging, payments, Meta OAuth, support/admin moderation, and analytics are not implemented in this initial slice. Do not use it as a production marketplace until those areas and operational security work are completed.

## Requirements and setup

- Node.js 20+ and npm 10+
- MongoDB (local or hosted)
- Optional: YouTube Data API v3 key. Instagram Modash and Meta credentials are not required for app startup.

```powershell
Copy-Item .env.example .env
# Set MONGODB_URI and JWT_ACCESS_SECRET in .env (use at least 32 random characters).
# Optionally set YOUTUBE_API_KEY.
npm install
npm run dev
```

Open the creator web preview at `http://localhost:4175/`, the brand workspace at `http://localhost:4175/brand`, and API health at `http://localhost:4000/api/v1/health`. Register a creator, complete the profile, connect a channel with consent, and choose whether to make the profile public. Then register a brand, browse the Fluentser directory, and create campaigns. The creator directory only returns public Fluentser profiles; brands do not search YouTube or Instagram catalogs.

For a device-based mobile client, set its API base URL to the computer's LAN address; `localhost` on a phone refers to the phone itself. A mobile client has not yet been included.

## Environment variables

See `.env.example`. Both `JWT_ACCESS_SECRET` (at least 32 characters) and `MONGODB_URI` are required for API startup. Set `WEB_BASE_URL` to the exact web origin. Never put provider keys in Vite variables.

### MongoDB Atlas setup

The API already uses Mongoose models for users, creator profiles, social accounts, organizations, campaigns, and applications. To connect a hosted database:

1. Create an Atlas project and a free shared cluster in the [MongoDB Atlas console](https://cloud.mongodb.com/).
2. In **Database Access**, create a database user with read/write access to the `fluentser` database. This is separate from your Atlas website login.
3. In **Network Access**, allow the development computer's current public IP. Avoid `0.0.0.0/0` for a real deployment.
4. Choose **Connect → Drivers → Node.js**, copy the connection string, replace its username/password placeholders, and set the database path to `/fluentser`.
5. Put the URI in the root `.env` as `MONGODB_URI=...`. If the password contains reserved URI characters, percent-encode them. Do not commit or paste the URI into chat.
6. Start the backend with `npm run dev:api`; verify `http://localhost:4000/api/v1/health` reports `"database":"connected"`.

For local development, `mongodb://127.0.0.1:27017/fluentser` works when MongoDB Community Server is installed and running. The API exits with a connection error if MongoDB is unavailable.

## API routes

All routes are under `/api/v1`.

| Method | Route | Access |
|---|---|---|
| GET | `/health` | Public; reports configured/not-configured booleans only |
| POST | `/auth/register` | Public; creates brand or creator account (brand registration also creates an organization) |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Authenticated |
| GET | `/creators/me` | Creator; own profile and linked accounts |
| PATCH | `/creators/me` | Creator; update profile and public visibility |
| GET | `/creators` | Brand; search public Fluentser creator profiles |
| GET | `/creators/:id` | Brand; view a public enrolled creator profile |
| POST | `/social-accounts/connect` | Creator; submit owned profile link and consent |
| POST | `/social-accounts/preview` | Creator; preview provider data without storing it |
| POST | `/social-accounts/:id/sync` | Creator; refresh a consented provider account |
| DELETE | `/social-accounts/:id` | Creator; disconnect own social account |
| GET | `/campaigns` | Public listing of published campaigns; `page`, `limit`, `q` |
| POST | `/campaigns` | Brand |
| POST | `/campaigns/:id/publish` | Owning brand |
| POST | `/campaigns/:id/applications` | Creator; unique campaign/creator application |
| GET | `/discovery/search` | Brand alias for enrolled creator-directory search; `q`, `platform`, `page`, `limit` |
| GET | `/openapi.json` | Public OpenAPI document |

Validation errors use `{ error: { code, message, details? } }`. API responses include an `X-Request-Id` header.

## Provider setup

Enable YouTube Data API v3 for a Google Cloud project, restrict its server-side API key to YouTube Data API v3, and set `YOUTUBE_API_KEY` in the root `.env`. A creator first submits their own channel URL and grants consent. The app previews data using `channels.list`; only after creator confirmation does it store the provider snapshot against that creator's MongoDB social account. The sync scheduler checks for due snapshots every five minutes and refreshes them at their 12-hour expiry; transient failures retry after one hour (quota failures after 12 hours). Provider data that cannot be refreshed is cleared after 30 days, per YouTube's API data storage policy. Brands only see social metrics for creators who have made their Fluentser profile public. Missing metrics remain null.

Before enabling Modash, confirm the Discovery API endpoint, authentication header, supported request filters and response schema with current provider documentation and the account's granted access. `MODASH_API_KEY` is never sent to the browser. Missing Modash access does not fall back to example creators.

## Commands

```powershell
npm run dev       # API + brand web
npm run dev:api   # API only
npm run dev:web   # brand web only
npm run typecheck
npm run build
```

No automated test suite is included yet. Configure the credentials and database before attempting provider or persistence smoke tests.
