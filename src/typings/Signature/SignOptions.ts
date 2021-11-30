import { BaseObject } from "../BaseObject";

import { Language } from "./Language";
import { SignatureField } from './SignatureField';

export enum SignOptionsSignatureFormat {
    /**
     * The signature follows the format defined in `ETSI TS 102 778-3 PAdES Part 3: PAdES Enhanced - PAdES-BES`.
     */
    PADES = 'PADES',
    /**
     * The signature follows the format defined in `ISO 32000-1` with the signing certificate attribute.
     * This format is a compatibility mode with `PAdES` (same semantic than `PAdES` with the `ISO 32000-1` format).
     */
    PADES_COMP = 'PADES-COMP',
    /**
     * The signature follows the format defined in `ETSI TS 102 778-2 PAdES Part 2: CMS Profile based on ISO 32000-1`.
     */
    ISO_32000_1 = 'ISO-32000-1'
}

/**
 * The `SignOptions` data structure contains options for a document signature
 * and allows to specify a signature profile to use.
 */
interface ISignOptions {
    /**
     * The name of the signature profile to use. A signature profile contains a private key and a signature field.
     * Signature profiles are set up by the `UNIVERSIGN` team. The default value is "default".
     * @default "default"
     */
    profile?: string;
    /**
     * A description of a visible PDF signature field.
     * If none is provided, no signature field will be produced on the signed document.
     */
    signatureField?: SignatureField;
    /**
     * The reason for the digital signature.
     */
    reason?: string;
    /**
     * The signer’s location.
     */
    location?: string;
    /**
     * The signature format.
     * @default {@link ISO_32000_1}
     */
    signatureFormat?: SignOptionsSignatureFormat;
    /**
     * The language for this transaction.
     * @default {@link English}
     */
    language?: Language;
    /**
     * The name of the pattern for the signature field.
     */
    patternName?: string;
}

/**
 * Class representing a {@link ISignOptions}.
 */
export class SignOptions extends BaseObject<ISignOptions> implements ISignOptions {
    /**
     * Create a new instance of a `SignOptions`.
     * @constructor
     * @param {ISignOptions} signOptions
     */
    constructor(signOptions: ISignOptions) {
        super(signOptions);
    }
}
