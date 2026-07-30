# Architecture

## System boundaries

| Application | Responsibility | Main technologies |
|---|---|---|
| `frontend` | Customer discovery and purchasing | React, Vite, Router, Axios |
| `admin` | Catalog and order operations | React, Vite, Router, Axios |
| `backend` | Business rules, persistence, auth, payments | Node, Express, Mongoose, JWT, Stripe |

Each application owns its dependencies and can be developed or deployed independently.

## Backend organization

- Routes define public and protected HTTP contracts.
- Controllers coordinate domain operations and responses.
- Models represent MongoDB commerce entities.
- Middleware centralizes authentication, role enforcement, uploads, and errors.
- Swagger annotations keep API documentation close to endpoints.

## Authentication flow

1. A user registers or logs in through a web client.
2. The API verifies credentials and signs a JWT.
3. The client sends it in the `Authorization: Bearer` header.
4. Middleware validates the signature and loads the user.
5. Administrator endpoints apply an additional role check.

Authorization is enforced by the API; hiding an admin screen is not considered a
security boundary.

## Commerce flow

Public endpoints supply catalog and promotional content. Authenticated customers
maintain carts, wishlists, addresses, and orders. Stripe creates payment intents
for authenticated orders and webhooks update payment state. Administrators manage
catalog and fulfillment through the separate dashboard.

## Configuration and deployment

React apps receive only the public `VITE_API_URL`. Backend credentials remain in
server environment variables. `CLIENT_URLS` is a comma-separated browser-origin
allow-list. Static clients, API, and database are independent services.

The current local upload implementation is suitable for development. Production
media should use durable object storage because stateless service filesystems are
not persistent.
