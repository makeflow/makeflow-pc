# Makeflow PC

Makeflow for PC.

### Development Guide

#### Run locally

```bash
yarn build:dev
yarn start
```

#### Scripts

- Compile and build in development mode：`yarn build:dev`
- Compile and build in production mode：`yarn build`
- Run app in development mode (needs build first): `yarn start`
- Package without generating installer (needs build first): `yarn pack`
- Package and generate installer (needs build first): `yarn dist`

If you are in China, you may want to use those instead:

```bash
yarn pack:china
yarn dist:china
```

#### Release

Run:

```
yarn release -- <version>
```

For example:

```
yarn release -- 1.0.0
```

This will update the version of this app and trigger the CI to build unsigned installers of this version for both Windows and macOS. Installer files can be found at release page.
