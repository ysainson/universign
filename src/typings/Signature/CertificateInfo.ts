/**
 * The `CertificateInfo` struct contains information about a certificate.
 * This structure is used as a return value only, and will never be instantiated by users.
 */
export interface CertificateInfo {
    /**
     * The certificate subject DN.
     */
    subject: string;
    /**
     * The certificate issuer DN.
     */
    issuer: string;
    /**
     * The certificate serial number.
     */
    serial: string;
}
