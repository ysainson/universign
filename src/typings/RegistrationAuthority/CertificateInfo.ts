/**
 * The `CertificateInfo` struct contains information about a certificate.
 * This struct is used as a return value only, and will never be instantiated by users.
 */
export interface CertificateInfo {
    /**
     * The certificate subject DN.
     */
    subjectDN: string;
    /**
     * The certificate serial number.
     */
    serialNumber: string;
    /**
     * The whole chain of the certificate.
     * The first element in the array is the root certificate and the last element is the end entity.
     */
    chain: Buffer[];
}
