# Quick Message to Downstream Dev

---

Hey [Name],

Quick question about the design-system library! We're setting up the Ionic app and hitting some weird errors with components that use signal inputs (like `DsButton`, `DsAvatar`, etc.).

The components work fine when we import directly from the source files, but when we try to use the compiled library from `dist/`, we get injection context errors. 

**How are you importing the library in your project?** 

Is it something like:
```json
"@propbinder/design-system": "file:../design-system/dist/design-system-lib"
```

Or are you using tsconfig path mapping to the source files?

Just trying to figure out if this is something everyone deals with or if we're doing something wrong 😅

Thanks!

---

## Even More Casual (Slack/Chat Style)

Hey! Quick q about the design-system lib

We're seeing errors when importing from the compiled library (the dist/ folder), but it works fine when importing from source

How are you using it? npm link? path mapping in tsconfig? just curious if you hit the same thing

thanks! 🙏

