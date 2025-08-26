/**
 * @author diegofmo0802 <diegofmo0802@gmail.com>.
 * @description Adds the router to the webapp.
 * @module saml.webapp
 * @license Apache-2.0
 */

import App from "WebApp.js";
import Events from "../Events.js";
import _Rule from "./Rule.js";

export class Router extends Events<Router.eventMap> {
    private static history: string[] = [];
    private index: number = 0;
    private rules: Router.Rule[] = [];
    /**
     * Creates an instance of Router.
    */
    public constructor() { super();
        this.history.push(this.page);
        window.addEventListener('popstate', (event) => {
            this.history = [];
            this.index = 0;
            this.history.push(this.page);
            this.emit('change');
        });
    }
    private get history (): string[] { return Router.history; }
    private set history (history: string[]) { Router.history = history; }
    /**
     * Triggered when the router receives a request.
     * @param app The app instance.
     */
    public async renderManager(app: App) {
        const page = this.page;
        const rule = this.rules.find((rule) => rule.test(page));
        if (!rule) return void console.log(`[App] no rule found for: ${page}`);
        if (!await rule.testAuth()) return void console.log(`[App] auth failed for: ${page}`);
        try {
            await rule.exec(app);
            console.log(`[App] routed: ${page}`);
        } catch (error) { console.error(`[App] error rendering: ${page}`, error); }
    }
    /**
     * Add render rules to the router.
     * @param rules The rules to add.
     */
    public addRules(rules: Router.Rule[]) { this.rules.push(...rules); }
    /**
     * Add a render rule to the router.
     * @param urlRule The url rule to match.
     * @param renderExec The function to execute when the rule is matched.
     * @param authExec The function to execute to check if the user is authenticated.
     */
    public addRule(urlRule: string, renderExec: Router.Rule.renderer, authExec?: Router.Rule.authenticator) {
        const rule = new Router.Rule(urlRule, renderExec, authExec);
        this.rules.push(rule);
    }
    /**
     * Cleans the url.
     * @param url The url to clean.
     * @returns The cleaned url.
    */
    public cleanUrl(url: string): string {
        if (!url.startsWith('/')) url = this.page + '/' + url;
        if (url.endsWith('/')) url = url.slice(0, -1);
        if (!url.startsWith('/')) url = '/' + url;
        return url;
    }
    /**
     * check if there is a previous page.
     * @returns true if there is a previous page, false otherwise.
    */
    public hasPrevious(): boolean { return this.index > 0 }
    /**
     * check if there is a next page.
     * @returns true if there is a next page, false otherwise.
    */
    public hasNext(): boolean { return this.index < this.history.length - 1; }
    /**
     * Gets the current page.
     * @returns The current page.
    */
    public get page(): string { return this.cleanUrl(window.location.pathname); }
    /**
     * Sets the current page.
     * @param page The page to set.
    */
    public set page(page: string) { this.set(page); }
    /**
     * Sets the current page.
     * @param page The page to set.
    */
    public set(page: string, change: boolean = true): void {
        page = this.cleanUrl(page);
        if (page === this.page) return;
        const newUrl = new URL(page, window.location.origin);
        window.history.pushState({}, '', newUrl);
        this.history = this.history.slice(0, this.index + 1);
        this.history.push(this.page);
        this.index = this.history.length - 1;
        this.emit('push');
        if (change) this.emit('change');
    }
    /**
     * Goes back to the previous page.
    */
    public back(change: boolean = true): void {
        if (!this.hasPrevious()) return;
        this.index -= 1;
        const previousPage = this.history[this.index];
        if (previousPage === this.page) return;
        const newUrl = new URL(previousPage, window.location.origin);
        window.history.pushState(null, '', newUrl);
        this.emit('back');
        if (change) this.emit('change');
    }
    /**
     * Goes to the next page.
    */
    public next(change: boolean = true): void {
        if (!this.hasNext()) return;
        this.index += 1;
        const nextPage = this.history[this.index];
        if (nextPage === this.page) return;
        const newUrl = new URL(nextPage, window.location.origin);
        window.history.pushState(null, '', newUrl);
        this.emit('next');
        if (change) this.emit('change');
    }
}

export namespace Router {
    export import Rule = _Rule;
    export type eventMap = {
        [name in (
            'change' | 'push' | 'back' | 'next'
        )]: Events.Listener
    }
}

export default Router