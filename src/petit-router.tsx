import * as React from 'react';

export interface RouterAction {
  path: string;
  wasHandled: boolean;
}

const aRouterAction = (path: string): RouterAction => {
  return {
    path,
    wasHandled: false
  }
};

const RouteContext = React.createContext<RouterAction>(null);

export interface RouterProps {
  fallback?: string;
  children: any;
}

export interface RouterState {
  routeStack: RouterAction[];
}

export class Router extends React.PureComponent<RouterProps, RouterState> {
  static defaultProps: Partial<RouterProps> = {
    fallback: '/'
  };

  readonly state = {
    routeStack: [aRouterAction(window.location.pathname)],
  };

  componentWillMount() {
    window.addEventListener('popstate', this.onWindowLocationChanged);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onWindowLocationChanged);
  }

  componentDidMount() {
    this.ensureRouteWasHandled();
  }

  componentDidUpdate() {
    this.ensureRouteWasHandled();
  }

  pushRouterState(path: string) {
    const { routeStack } = this.state;
    this.setState({
      routeStack: [...routeStack, aRouterAction(path)]
    });
  }

  private onWindowLocationChanged = () => {
    this.pushRouterState(window.location.pathname);
  }

  private ensureRouteWasHandled() {
    const { fallback } = this.props;
    const { routeStack } = this.state;
    const mostRecentRouteAction = routeStack[routeStack.length - 1];

    console.log(mostRecentRouteAction);
    if (!mostRecentRouteAction.wasHandled && mostRecentRouteAction.path !== fallback) {
      redirect(fallback);
    }
  }

  render() {
    const { children } = this.props;
    const { routeStack } = this.state;
    return (
      <RouteContext.Provider value={routeStack[routeStack.length - 1]}>
        { children }
      </RouteContext.Provider>
    );
  }
}

export interface RouteProps {
  path: string;
  children: any;
}

export class Route extends React.PureComponent<RouteProps> {
  private handleRouterActionAndRender = (routerAction: RouterAction) => {
    const { path, children } = this.props;
    if (!routerAction.wasHandled && routerAction.path === path) {
      routerAction.wasHandled = true;
      return children;
    } else {
      return null;
    }
  }

  render() {
    return (
      <RouteContext.Consumer>
        { this.handleRouterActionAndRender }
      </RouteContext.Consumer>
    );
  }
}

export interface AProps {
  href: string;
  children: any;
}

export class A extends React.PureComponent<AProps> {
  onClick = (e) => {
    const { href } = this.props;
    navigateTo(href);
    e.preventDefault();
    return false;
  }

  render() {
    const { href, children } = this.props;
    return <a href={href} onClick={this.onClick}>{ children }</a>;
  }
}

export const navigateTo = (path: string) => {
  window.history.pushState(undefined, undefined, path);
  window.history.pushState(undefined, undefined, path);
  window.history.back();
}

export const redirect = (path: string) => {
  window.history.replaceState(undefined, undefined, path);
  window.history.pushState(undefined, undefined, path);
  window.history.back();
}

export const back = () => {
  window.history.back();
}
