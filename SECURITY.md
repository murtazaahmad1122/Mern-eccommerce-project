# Security Policy

Security improvements apply to the latest commit on `main`. Report vulnerabilities
privately to the repository owner through GitHub rather than opening a public issue.

## Public repository rules

- Never commit `.env` files, private keys, tokens, database exports, or payment secrets.
- Use Stripe test mode and synthetic accounts, addresses, orders, and reviews.
- Rotate a credential immediately if it is ever committed.
- Store production secrets only in encrypted hosting environment settings.
- Restrict MongoDB users and network access to the minimum required permissions.

## Production checklist

- Generate a long, unique `JWT_SECRET`.
- Restrict `CLIENT_URLS` to the deployed storefront and admin origins.
- Add rate limiting, security headers, request-size limits, and audit logging before
  processing real customer traffic.
- Move uploaded files to durable object storage for stateless cloud deployment.
