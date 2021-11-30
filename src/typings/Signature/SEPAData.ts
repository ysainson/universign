import { BaseObject } from "../BaseObject";

import { SEPAThirdParty } from './SEPAThirdParty';

/**
 * The `SEPAData` data structure contains information needed to create a SEPA mandate PDF.
 */
interface ISEPAData {
    /**
     * A unique mandate identifier.
     */
    rum: string;
    /**
     * A unique creditor identifier.
     */
    ics: string;
    /**
     * The debtor International Bank Account Number.
     */
    iban: string;
    /**
     * The debtor Bank Identifier Code.
     */
    bic: string;
    /**
     * Whether this SEPA mandate describe a recurring payment (`true`) or a single-shot payment (`false`).
     */
    recurring: boolean;
    /**
     * Information on the debtor.
     */
    debtor: SEPAThirdParty;
    /**
     * Information on the creditor.
     */
    creditor: SEPAThirdParty;
}

/**
 * Class representing a {@link ISEPAData}.
 */
export class SEPAData extends BaseObject<ISEPAData> implements ISEPAData {
    readonly rum: string;
    readonly ics: string;
    readonly iban: string;
    readonly bic: string;
    readonly recurring: boolean;
    readonly debtor: SEPAThirdParty;
    readonly creditor: SEPAThirdParty;

    /**
     * Create a new instance of a `SEPAData`.
     * @constructor
     * @param {ISEPAData} sepaData
     */
    constructor(sepaData: ISEPAData) {
        super(sepaData);
        this.rum = sepaData.rum;
        this.ics = sepaData.ics;
        this.iban = sepaData.iban;
        this.bic = sepaData.bic;
        this.recurring = sepaData.recurring;
        this.debtor = sepaData.debtor;
        this.creditor = sepaData.creditor;
    }
}
