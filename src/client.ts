import xmlrpc, { Client } from "xmlrpc";

import { Signature, RegistrationAuthority } from './typings'

export enum MethodRegistrationAuthority {
    MatchAccount = 'matcher.matchAccount'
}

export enum MethodSignature {
    RequestTransaction = 'requester.requestTransaction',
}

type MethodRegistrationAuthorityParams = {
    [MethodRegistrationAuthority.MatchAccount]: RegistrationAuthority.MatchingFilter;
}

type MethodSignatureParams = {
    [MethodSignature.RequestTransaction]: Signature.TransactionRequest;
}

type Credentials = {
    /** The email address associated to the Universign account. */
    email: string;
    /** The password associated to the Universign account. */
    password: string;
}

interface ClientConfig {
    /**
     * The email address and password associated to the Universign account.
     */
    credentials: Credentials,
    /**
     * The Universign XML-RPC url.
     * @default "https://ws.universign.eu"
     */
    url?: string,
    /**
     * The Universign base url.
     * @default "/sign/rpc" for {@link SignatureClient} — "/ra/rpc" for {@link RegistrationAuthorityClient}
     */
    path?: string;
    /**
     * Defines the protocol used — https if true.
     * @default true
     */
    isSecure?: boolean;
}

/** Class representing a universign client. */
class UniversignClient<Method extends string, Params> {
    private readonly config: ClientConfig;
    private readonly xmlrpcClient: Client;

    constructor(config: ClientConfig) {
        this.config = {
            url: 'https://ws.universign.eu',
            isSecure: true,
            ...config,
        };

        const xmlrpcOptions = {
            url: `${this.config.url}${this.config.path}`,
            basic_auth: { user: this.config.credentials.email, pass: this.config.credentials.password }
        }

        if (this.config.isSecure) {
            this.xmlrpcClient = xmlrpc.createSecureClient(xmlrpcOptions)
        } else {
            this.xmlrpcClient = xmlrpc.createClient(xmlrpcOptions);
        }
    }

    async call(method: Method, params: Params[]) {
        console.log(method, params);
        return new Promise((resolve, reject) => {
            this.xmlrpcClient.methodCall(method, params, (error, value) => {
                if (error) {
                    return reject(error);
                }
                return resolve(value);
            });
        });
    }
}

export class SignatureClient extends UniversignClient<MethodSignature, MethodSignatureParams[MethodSignature]> {
    constructor(config: ClientConfig) {
        super({ path: '/sign/rpc/', ...config });
    }

    async call(method: MethodSignature, params: MethodSignatureParams[MethodSignature][]) {
        return super.call(method, params);
    }
}

export class RegistrationAuthorityClient extends UniversignClient<MethodRegistrationAuthority, MethodRegistrationAuthorityParams[MethodRegistrationAuthority]> {
    constructor(config: ClientConfig) {
        super({ path: '/ra/rpc/', ...config });
    }

    async call(method: MethodRegistrationAuthority, params: MethodRegistrationAuthorityParams[MethodRegistrationAuthority][]) {
        return super.call(method, params);
    }
}
