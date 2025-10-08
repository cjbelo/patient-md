# Patient Management Dashboard (Prototype)

A small, focused prototype that demonstrates a **patient management dashboard** using modern React patterns and a mocked GraphQL.

- **Front-end:** React + TypeScript + Vite + Tailwind
- **Data layer:** Apollo Client (v4) with **SchemaLink** (no server needed)
- **State:** Zustand (UI/persisted data), React Router (routing)
- **Icons/Fonts:** Phosphor Icons, Poppins

> Goal: show clean code, strong state management, GraphQL usage, loading/error states, filtering/search, pagination, and a small add-patient form.

---

## Features

- **Routing:** `/login` and `/dashboard` with guards/redirects
- **Patients list:** search, gender filter, pagination, loading & error states
- **Add patient:** basic form with inline validation
- **Mock GraphQL:** Apollo SchemaLink + resolvers (no separate API server)
- **State mgmt:** Zustand for UI state (page/search/filter) and simple auth
- **Persistence:** LocalStorage for auth token/email and patient data via Zustand persist

---

## Tech Stack

- **React** `^19` + **TypeScript** `~5.9` + **Vite** `^7`
- **Tailwind v4** via `@tailwindcss/vite`
- **Apollo Client v4** (`@apollo/client`, `graphql`, `rxjs`)
- **Zustand v5**
- **React Router v7**
- **Phosphor Icons** `@phosphor-icons/react`
- **Poppins** font `@fontsource/poppins`

---

## Getting Started

```bash
# install
npm i

# dev
npm dev  # -> http://localhost:3000

# build
npm build

# preview production build
npm preview
```

**Node**: 18+ recommended.

---

## Usage Notes

### Apollo Client v4 import paths

React bindings & hooks moved to sub-paths:

```ts
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { useQuery, useMutation } from "@apollo/client/react/hooks";
import { SchemaLink } from "@apollo/client/link/schema";
```

---

## Scripts

- `npm dev` — start dev server
- `npm build` — type-check and build
- `npm preview` — preview the production build
- `npm lint` — run ESLint

---

## Project Structure (high level)

```
src/
  apollo/
    client.ts       # Apollo Client (SchemaLink + cache policies)
    schema.ts       # typeDefs + resolvers (mock GraphQL)
  components/
  hooks/
  pages/
  store/
    uiStore.ts      # Zustand UI state (page/search/filter)
    patientStore.ts # Persisted data backing resolvers
  utils/
    auth.ts         # isAuthed/login/logout (stores token+email)
    constants.ts
  App.tsx
  main.tsx
  index.css
```

---

## How It Works

- **Mock GraphQL:** Apollo’s `SchemaLink` executes queries/mutations against in-memory resolvers (no server).
- **State boundaries:**
  - **Apollo cache**: patient list, mutation results
  - **Zustand**: UI/ephemeral state (search, filter, pagination), simple auth token/email
- **Performance:** memoized query variables, normalized cache, key fields, lightweight components.

---

### package.json (for reference)

```json
{
  "name": "patient-md",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@apollo/client": "^4.0.7",
    "@fontsource/poppins": "^5.2.7",
    "@graphql-tools/schema": "^10.0.25",
    "@phosphor-icons/react": "^2.1.10",
    "@tailwindcss/vite": "^4.1.14",
    "graphql": "^16.11.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.3",
    "rxjs": "^7.8.2",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/node": "^24.6.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react-swc": "^4.1.0",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.45.0",
    "vite": "^7.1.7"
  }
}
```
