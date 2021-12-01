import xmlrpc, { Client } from "xmlrpc";

import { RegistrationAuthority, Signature } from './typings'

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

type Params<P> = { params: P };

/** Class representing a universign client. */
class UniversignClient<Method extends string, ParamsType, ResponseType> {
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

    async call(method: Method, { params }: Params<ParamsType>): Promise<ResponseType> {
        console.log(method, params);
        return new Promise((resolve, reject) => {
            this.xmlrpcClient.methodCall(method, Array.isArray(params) ? params : [params], (error, value) => {
                if (error) {
                    return reject(error);
                }
                return resolve(value);
            });
        });
    }
}

export class RegistrationAuthorityClient extends UniversignClient<
    RegistrationAuthority.Method,
    RegistrationAuthority.Params<RegistrationAuthority.Method>,
    RegistrationAuthority.Response<RegistrationAuthority.Method>
> {
    constructor(config: ClientConfig) {
        super({ path: '/ra/rpc/', ...config });
    }

    async call<M extends RegistrationAuthority.Method>(
        method: M,
        { params }: Params<RegistrationAuthority.Params<M>>
    ): Promise<RegistrationAuthority.Response<M>> {
        return super.call(method, { params });
    }
}

export class SignatureClient extends UniversignClient<
    Signature.Method,
    Signature.Params<Signature.Method>,
    Signature.Response<Signature.Method>
    > {
    constructor(config: ClientConfig) {
        super({ path: '/sign/rpc/', ...config });
    }

    async call<M extends Signature.Method>(
        method: M,
        { params }: Params<Signature.Params<M>>
    ): Promise<Signature.Response<M>> {
        return super.call(method, { params });
    }
}
