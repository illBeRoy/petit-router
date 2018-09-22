![Petit Router](logo.png)
> miniature router for react, with window history support

## Quick Start

First, install as dependency:

```bash
npm install petit-router
```

Then, use the simple API, just like in the example:

```js
import * as React from 'react';
import { Router, Route, A, back } from 'petit-router';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/">
          <span>
            This is homepage.
            go to <A href="/about">about</A>
          </span>
        </Route>
        <Route path="/about">
          <span>
            This is About page.
            <button onClick={back}>back</button>
          </span>
        </Route>
      </Router>
    );
  }
}
```

## API

### `<Router fallback?={string} />` Component

The main component that wraps around the application. The router's path is directly connected to `window.location.pathname` and is changed via `window.history` mutations.

**Props**:
  - `fallback?: string` the fallback route to use if the current one was not found, such as a 404 page (default value: `/`)

### `<Route path={string} />`

A component that represents a given route within our application. When the user navigates to `path`, the contents of the route are mounted, and when he leaves, they are unmounted.

**Props**:
  - `path: string` the path to show the contents under.

### `<A href={string}>`

A wrapper around the `a` html element that navigates within the scope of the router (instead of redirecting the page).

**Props**:
  - `href: string` the path to navigate to

### `navigateTo(path: string)`

Triggers page navigation imperatively (could be used instead of the `A` component).

### `back()`

Triggers `back` action, that is, navigates to the previous page.

### `redirect(path: string)`

Triggers page redirection - that is, replacing the current route with a new one, and removing the old one from routing history.
