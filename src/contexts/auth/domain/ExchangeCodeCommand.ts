import { Command, } from 'contexts/shared/domain/Command';

type Params = {
    url: string;
    clientId: string;
    clientSecret: string;
    grantType: string;
    redirectURI: string;
    code: string;
};

export class ExchangeCodeCommand extends Command {
    readonly url: string;
    readonly clientId: string;
    readonly clientSecret: string;
    readonly grantType: string;
    readonly redirectURI: string;
    readonly code: string;

    constructor(params: Params) {
        super();

        this.url = params?.url;
        this.clientId = params?.clientId;
        this.clientSecret = params?.clientSecret;
        this.grantType = params?.grantType;
        this.redirectURI = params?.redirectURI;
        this.code = params?.code;
    }
}
