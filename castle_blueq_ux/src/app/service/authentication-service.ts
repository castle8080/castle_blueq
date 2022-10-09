import * as rx from 'rxjs';
import { Identity } from '../model/identity';

export abstract class AuthenticationService {
    abstract getCurrentIdentity(): Identity|null;
    abstract observeIdentity(): rx.Observable<Identity|null>;
    abstract login(): Promise<void>;
    abstract loginSilent(): Promise<void>;
}


