import { Command, } from 'contexts/shared/domain/Command';

type Params = {
    url: string;
    state: string;
    clientId: string;
    redirectURI: string;
    responseType: string;
    scope: string;
};

export class AuthCommand extends Command {
    readonly url: string;
    readonly state: string;
    readonly clientId: string;
    readonly redirectURI: string;
    readonly responseType: string;
    readonly scope: string;

    constructor(params: Params) {
        super();

        this.url = params?.url;
        this.state = params?.state;
        this.clientId = params?.clientId;
        this.redirectURI = params?.redirectURI;
        this.responseType = params?.responseType;
        this.scope = params?.scope;
    }
}
