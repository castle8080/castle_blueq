import { Injectable } from '@angular/core';
import * as msal from '@azure/msal-browser';
import * as rx from 'rxjs';
import { PopupRequest } from '@azure/msal-browser';

import { environment } from '../../environments/environment';
import { Identity } from '../model/identity';
import { AuthenticationService } from '../service/authentication-service';

function getMSALConfig(): msal.Configuration {
    let redirectUrl = window.location.protocol + "//" + window.location.host + "/authentication/signin";

    return {
        auth: {
            clientId: environment.msal.clientId,
            authority: environment.msal.authority,
            redirectUri: redirectUrl
        },
        cache: {
            cacheLocation: "localStorage"
        },
        system: {	
            loggerOptions: {	
                loggerCallback: (level, message, containsPii) => {
                    console.log(level, message);
                }
            }
        }
    }
}

function createPCApplication() {
    return new msal.PublicClientApplication(getMSALConfig());
}

@Injectable()
export class MSALAuthenticationService implements AuthenticationService {

    private _clientApp: msal.IPublicClientApplication;
    private _identity$ = new rx.BehaviorSubject<Identity|null>(null);

    constructor() {
        this._clientApp = createPCApplication();
        this._identity$.subscribe(identity => {
            console.log("Identity: ", identity);
        });
    }

    observeIdentity(): rx.Observable<Identity|null> {
        return this._identity$;
    }

    getCurrentIdentity(): Identity|null {
        return this._identity$.value;
    }

    async loginSilent(): Promise<void> {
        try {
            console.log("Trying silent login");
            let result = await this._clientApp.ssoSilent({ scopes: ['openid'] });
            if (result != null) {
                await this._handleAuthenticationResult(result!);
            }
            else {
                console.log("Still no identity!");
            }
        }
        catch (e) {
            console.log("Error performing single sign-on silent: ", e);
        }
    }

    async login(): Promise<void> {
        let result = await this._clientApp.handleRedirectPromise();
        if (result != null)
        {
            await this._handleAuthenticationResult(result!);
        }
        else {
            this.checkCurrentAccounts();
            this.startLoginSSO();
        }
    }

    private async checkCurrentAccounts() {
        let accounts = this._clientApp.getAllAccounts();
        if (accounts.length == 1) {
            console.log("Account!", accounts[0]);
        }
    }

    private async startLoginSSO() {
        try {
            let result = await this._clientApp.ssoSilent({ scopes: ['openid'] });
            if (result != null) {
                await this._handleAuthenticationResult(result!);
            }
            else {
                console.log("Still no identity!");
            }
        }
        catch (e) {
            console.log("Error performing single sign-on silent: ", e);
            await this.startLoginRedirect();
        }
    }

    private async startLoginRedirect() {
        await this._clientApp.loginRedirect({
            scopes: ["User.Read"]
        });
    }

    private async _handleAuthenticationResult(result: msal.AuthenticationResult) {
        let identity = new Identity(
            result.account!.name || result.account!.username,
            result.account!.username,
            result.accessToken,
            result.expiresOn
        );

        this._identity$.next(identity);

        return identity;
    }
}


