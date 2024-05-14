import { IProps } from '../@models/common';
import Block from './Block';
import Route from './Route';

// TODO !!!!!!! исправить ошибки роутера
export default class Router {
  private static __instance: ThisType<Router>;

  protected history: History;

  protected routes: Route[];

  private _currentRoute: Route;

  private _rootQuery: string;

  private _canActivate: (pathname: string) => Promise<boolean>;

  constructor(rootQuery: string, canActivate = async (_pathname: string): Promise<boolean> => true) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._canActivate = canActivate;

    Router.__instance = this;
  }

  /**
   * Регистрация роута
   * @param pathname
   * @param block
   * @returns
   */
  public use<T extends IProps>(pathname: string, block: typeof Block<T>): this {
    const route = new Route<T>(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  public async start(): Promise<void> {
    window.onpopstate = ((event: PopStateEvent): void => {
      this._onRoute(event.currentTarget.location.pathname);
    });

    await this._onRoute(window.location.pathname);
  }

  private async _onRoute(pathname: string): Promise<void> {
    const canActivate = await this._canActivate(pathname);
    if (!canActivate) {
      return;
    }

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
    const route = this.routes.find((routeItem) => routeItem.match(pathname));
    if (!route) {
      return this.routes.find((routeItem) => routeItem.match('*'));
    }
    return route;
  }

  public reset(): void {
    this.routes.forEach((route: Route) => route.clear());
  }
}
