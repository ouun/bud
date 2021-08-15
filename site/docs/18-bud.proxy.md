---
slug: bud.proxy
title: bud.proxy
description: Proxy an existing development server.
sidebar_label: bud.proxy
---

Users building on top of a server-side framework like WordPress, Laravel, RoR, etc. will likely need to proxy their established development server.

## Usage

[bud.proxy](/docs/bud.proxy), with nothing passed, will proxy `localhost:8000`.

```ts title='bud.config.ts'
bud.proxy();
```

Optionally, you may also use [bud.proxy](/docs/bud.proxy) to configure the host and port:

```ts title='bud.config.ts'
bud.proxy({
  host: 'example.test',
  port: 8000,
});
```