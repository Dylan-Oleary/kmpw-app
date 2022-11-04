# Woxy Mobile Application

## Getting Started

1. Install the project dependencies

```bash
yarn
```

2. Install iOS dependencies

```bash
yarn ios:install
```

3. Create `.env` file

Add an `.env` file

```bash
touch .env
```

Add these variables to the `.env` file

```js
ENV=
API_BASE_URL=
API_GRAPHQL_URL=
USER_MAX_NUM_OF_DOGS=
```

**Note**
`ENV` will be one of `development, staging, production`

## Running the project

1. Start the Metro development server

```bash
yarn start
```

2. Build the application

Android

```bash
yarn android:dev
```

iOS

```bash
yarn ios:dev
```

## Deployments

When deploying a new AAB to the Google Play store, the `versionCode` variable in `~/android/app/build.gradle` must be incremented
