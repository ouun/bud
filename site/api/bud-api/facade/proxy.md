---
id: bud-api.facade.proxy
title: proxy property
sidebar_label: proxy property
hide_title: true
sidebar: "api"
slug: proxy
---

## Facade.proxy property

Set proxy settings for the development server.

Signature:

```typescript
proxy: proxy;
```

## Remarks

- By default there is no proxy enabled.

- If enabled with no proxies whatever is running on localhost on port 8000.

## Example 1

Enable:

```js
bud.proxy();
```

## Example 2

Disable:

```js
bud.proxy({ enabled: false });
```

## Example 3

Specify host and port:

```js
bud.proxy({
  host: "example.test",
  port: 3000,
});
```