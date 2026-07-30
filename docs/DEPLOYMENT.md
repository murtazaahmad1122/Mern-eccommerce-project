# Deployment Runbook

## MongoDB Atlas

Create a dedicated cluster and database user, configure network access for the API
host, and save the application connection string as `MONGO_URI`. Use synthetic
portfolio data and never expose this string in a `VITE_` variable.

## Backend on Render

Create a Blueprint from this repository. `render.yaml` configures:

- Root directory: `backend`
- Build: `npm ci`
- Start: `npm start`
- Health check: `/api/health`

Enter the requested secret values:

```env
MONGO_URI=<Atlas connection string>
CLIENT_URLS=https://<storefront>,https://<admin>
JWT_SECRET=<long random secret>
API_BASE_URL=https://<api>
STRIPE_SECRET_KEY=<Stripe test secret>
STRIPE_WEBHOOK_SECRET=<Stripe endpoint secret>
STRIPE_CURRENCY=usd
```

Verify `/api/health` and `/docs` after deployment.

## Storefront on Vercel

Import the repository with root directory `frontend`, Vite preset, build command
`npm run build`, output directory `dist`, and:

```env
VITE_API_URL=https://<api>/api
```

## Admin on Vercel

Import the same repository again with root directory `admin` and the same Vite
settings and `VITE_API_URL`. Each app includes an SPA rewrite for direct navigation.

After Vercel assigns both domains, update Render's `CLIENT_URLS` with their exact
HTTPS origins and redeploy.

## Stripe test webhook

Create a test-mode endpoint at:

```text
https://<api>/api/payments/stripe/webhook
```

Keep its signing secret in `STRIPE_WEBHOOK_SECRET`, never in a React app.

## Smoke test

- Health and Swagger endpoints load.
- Storefront catalog, registration, login, cart, and checkout work.
- CORS accepts both deployed clients.
- Customer accounts cannot call administrator endpoints.
- Admin product and order changes persist after refresh.
- Nested client routes work when opened directly.

## Known limitation

Files written to `backend/uploads` are local to the running service. Replace this
with durable cloud object storage before relying on uploads in production.
