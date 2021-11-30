export * from './MatchingFilter';
export * from './MatchingResult';
export * from './ValidationRequest';
export * from './ValidatorResult';
export * from './PersonalInfo';
export * from './IdDocument';
export * from './CertificateInfo';

import { MatchingFilter } from './MatchingFilter';
import { MatchingResult } from './MatchingResult';
import { ValidationRequest } from './ValidationRequest';
import { ValidatorResult } from './ValidatorResult';

export enum Method {
    MatchAccount = 'matcher.matchAccount',
    Validate = 'validator.validate',
    CheckOperatorStatus = 'ra.checkOperatorStatus',
    GetCertificateAgreement = 'ra.getCertificateAgreement',
    RevokeCertificate = 'ra.revokeCertificate',
    RevokeMyCertificate = 'ra.revokeMyCertificate',
    GetResult = 'validator.getResult',
}

type MethodRequestMapping = {
    [Method.MatchAccount]: {
        param: MatchingFilter;
        response: MatchingResult[];
    };
    [Method.Validate]: {
        param: ValidationRequest;
        response: ValidatorResult;
    };
    [Method.CheckOperatorStatus]: {
        param: string;
        response: number;
    };
    [Method.GetCertificateAgreement]: {
        param: string;
        response: Buffer;
    };
    [Method.RevokeCertificate]: {
        param: string;
        response: void;
    };
    [Method.RevokeMyCertificate]: {
        param: void;
        response: void;
    };
    [Method.GetResult]: {
        param: string;
        response: ValidatorResult;
    };
}

type Request<M extends Method> = MethodRequestMapping[M];

export type Params<M extends Method> = Request<M>['param'];
export type Response<M extends Method> = Request<M>['response'];
