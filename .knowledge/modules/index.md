# Modules

One concept per source directory under `src/`.

* [App](/modules/app.md) - Root component and bootstrap that map `location.pathname` to a page component.
* [pages](/modules/pages.md) - The `Signup`, `Login` and `Welcome` screens, including the password rule checklist.
* [components](/modules/components.md) - Presentational primitives `Card`, `Field` and `Message` shared by all pages.
* [router](/modules/router.md) - Hand-rolled History API router providing `navigate`, `usePath` and `Link`.
* [store](/modules/store.md) - Demo-only account persistence over `localStorage` and `sessionStorage`.
