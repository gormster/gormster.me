# gormster.me

This is the code behind the site for https://gormster.me

## Building

You'll need:

* [node](https://nodejs.org) v14
* [yarn](https://yarnpkg.com) v2

All you need to do is `yarn install` to get the dependencies, then `yarn gulp` to build the output.

## Testing

Because this is a website, we need to test with browser JS rather than node. I had thought "hey we can use node for unit testing at least" but that turned out to be a terrible idea: the very first test I wrote passed in node but failed in all browsers. So, forget that.

Instead, you just run a server at the root directory (I use `python3 -m http.server` but you can use whatever you like) and just open `/tests/` in the browsers you're testing.
