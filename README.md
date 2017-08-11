# Add ESLint Comment

Every time when I trying to add ESLint to an old project, it's painful to fix errors like `eqeqeq` or `no-var`.

One way is to enable these rules and add eslint comment to the old files to prevent new files breaking these rules.

This is what this tool can do.

> Add ESLint comment per file according to the ESLint result.

Before:

```js
var foo;
if (foo == 1) {
    alert(foo);
}
```

After:

```js
/* eslint no-var:0 */
/* eslint no-alert:0 */
/* eslint eqeqeq:0 */
var foo;
if (foo == 1) {
    alert(foo);
}
```

## Getting Started

### Installation

```bash
npm install add-eslint-comment -g
```

### Generate ESLint Result JSON

```bash
eslint -f json src > eslint-result.json
```

This will lint your `src` directory, formatter the result to json, and output into `eslint-result.json` file.

Checkout [the documentation](http://eslint.org/docs/user-guide/formatters/#json) for more details.

### Add ESLint Comment per file

```bash
add-eslint-comment -j eslint-result.json
```

---

Have fun with add-eslint-comment!
