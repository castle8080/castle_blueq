/**
 *Module: controllers
 * 
 * Allows you to decorate methods which can handle an http request. Use
 * the decorator httpHandler on a method.
 * 
 * For the decorated methods to be added to express the function
 * configureController should be called on a controller instance and
 * the express app.
 * 
 * Note: I should look at nestjs instead of this.
 */
import { Express, Request, Response, NextFunction } from 'express';

/** A function which handles an http request. */
type HandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>|any;

/** The http methods supported by the httpHandler decorator. */
type SupportedHttpMethod = "get" | "post" | "put";

/**
 * Represents meta data telling how to bind a method to an Express route.
 */
interface HttpBindingEntry {
    method: SupportedHttpMethod,
    path: string,
    property: string
}

/**
 * Interface for objects which have http binding info.
 */
interface HttpBindingInfo {
    "_httpBindings": HttpBindingEntry[]
};

/**
 * Decorates a method as an express routable method.
 */
export function httpHandler(method: SupportedHttpMethod, path: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!("_httpBindings" in target)) {
            target["_httpBindings"] = [];
        }
        target["_httpBindings"].push({ method: method, path: path, property: propertyKey });
    };
}

/**
 * Wraps an express handler function so that exceptions are handled for async
 * handling and sends back return object as json.
 */
function wrapHttpHandler(h: HandlerFunction) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let answer = h(req, res, next);
            if (answer instanceof Promise<any>) {
                res.json(await answer);
            }
            else {
                res.json(answer);
            }
        }
        catch (e) {
            next(e);
        }
    };
}

/**
 * Configures an express binding entry into the express application.
 */
function configureHttpBindingEntry(app: Express, b: HttpBindingEntry, controller: any) {
    console.log(`binding http: ${b.method} ${b.path} to ${controller.constructor.name}.${b.property}`)
    let h = wrapHttpHandler(controller[b.property].bind(controller));
    app[b.method].apply(app, [b.path, h as any]);
}

/**
 * Configured routes to the controller in the Express app. 
 */
export function configureController(app: Express, controller: any) {
    if ("_httpBindings" in controller) {
        for (let b of (controller as HttpBindingInfo)._httpBindings) {
            configureHttpBindingEntry(app, b, controller);
        }
    }
}
