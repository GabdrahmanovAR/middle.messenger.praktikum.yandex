import { IProps } from '../@models/common';
import Block from './Block';
import Route from './Route';

class Router {
  private static __instance: ThisType<Router>;

  protected history: History;

  protected routes: Route[];

  private _currentRoute: Route;

  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  /**
   * Регистрация роута
   * @param pathname
   * @param block
   * @returns
   */
  public use(pathname: string, block: Block<Record<string, unknown>>, props?: IProps): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery, viewProps: props });

    this.routes.push(route);

    return this;
  }

  public start(): void {
    window.onpopstate = ((event: PopStateEvent): void => {
      this._onRoute(event.currentTarget.location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  public getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new Router('main#app');

export default router;
