# Welcome to Remix with XDM!

This is a sample of a Remix app, running on Cloudflare Pages Functions. It utilizes XDM to source Markdown from anywhere (database etc), process it on the Function, then send it to the client for rendering.

**In order to make this work, patching an upstream module is required as of decode-named-character-reference@1.0.1. This is because it assumes a context of the browser, when we are compiling on the Function. The change to is for index.dom.js, and is as follows:**

```diff
- const element = document.createElement('i')
+ if(typeof document !== "undefined") {
+     const element = document.createElement('i')
+ }
```

## Development

_There is currently a bug with Wrangler and Remix that causes HMR not to work. Simply restart the dev server on changes._

You will be utlizing Wrangler for local development to emulate the Cloudflare runtime. This is already wired up in your package.json as the `dev` script:

```sh
# start the remix dev server and wrangler
$ npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!
