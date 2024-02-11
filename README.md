# Streem

Streem is a live streaming platform that helps you broadcast, watch, and interact with streams in real-time.

## Built With

- NextJs
- TypeScript
- TailwindCSS
- ShadcnUI
- NextAuth
- Prisma
- PostgreSQL
- LiveKit
- Uploadthing
- zod
- zustand

## Run Locally

Follow the below steps to run this project locally

### Clone the project

```bash
  git clone https://github.com/shaqeebakhtar/streem.git
```

### Go to the project directory

```bash
  cd streem
```

### Install dependencies

```bash
  pnpm install
```

### Copy .env.example to .env

```bash
  cp .env.example .env
```

### Update .env

#### Generate Google OAuth client ID credentials

Follow the mentioned steps - [Create access credentials](https://developers.google.com/workspace/guides/create-credentials#oauth-client-id)

Add `http://localhost:3000` under `Authorized JavaScript origins`

Add `http://localhost:3000/api/auth/callback/google` under `Authorised redirect URIs`

#### Generate LiveKit Keys

- Signup on [LiveKit](https://livekit.io/)
- Create a new project
- Go to `Settings > Keys` and generate your tokens

#### Generate Uploadthing Keys

- Signup on [Uploadthing](https://uploadthing.com/)
- Create a new app
- Go to `Settings > API Keys`

```bash
  NEXTAUTH_SECRET="nextauth_secret"
  DATABASE_URL="postgresql://postgres:password@localhost:5500/streem?schema=public"

  GOOGLE_CLIENT_ID="client_id"
  GOOGLE_CLIENT_SECRET="client_secret"

  LIVEKIT_API_URL="https://project_url"
  LIVEKIT_API_KEY="api_key"
  LIVEKIT_API_SECRET="api_secret"
  NEXT_PUBLIC_LIVEKIT_URL="wss://project_url"

  UPLOADTHING_SECRET="uploadthing_secret"
  UPLOADTHING_APP_ID="app_id"
```

Start the development server

```bash
  pnpm dev
```
