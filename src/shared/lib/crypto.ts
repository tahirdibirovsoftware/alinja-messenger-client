// src/shared/crypto/crypto.service.ts
export class CryptoService {
    private static readonly ALGORITHM = {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]), // 65537
        hash: 'SHA-256'
    };

    /**
     * Generates a new RSA key pair and returns them in PEM format
     */
    static async generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
        try {
            // Generate the key pair
            const keyPair = await window.crypto.subtle.generateKey(
                this.ALGORITHM,
                true, // extractable
                ['encrypt', 'decrypt']
            );

            // Export public key to format suitable for PEM
            const exportedPublicKey = await window.crypto.subtle.exportKey(
                'spki',
                keyPair.publicKey
            );

            // Export private key to format suitable for PEM
            const exportedPrivateKey = await window.crypto.subtle.exportKey(
                'pkcs8',
                keyPair.privateKey
            );

            // Convert the exported keys to PEM format
            const publicKeyPem = this.arrayBufferToPem(
                exportedPublicKey,
                'PUBLIC KEY'
            );
            const privateKeyPem = this.arrayBufferToPem(
                exportedPrivateKey,
                'PRIVATE KEY'
            );

            return {
                publicKey: publicKeyPem,
                privateKey: privateKeyPem
            };
        } catch (error) {
            console.error('Error generating key pair:', error);
            throw new Error('Failed to generate encryption keys');
        }
    }

    /**
     * Converts an ArrayBuffer to PEM format
     */
    private static arrayBufferToPem(buffer: ArrayBuffer, type: string): string {
        // Convert ArrayBuffer to Base64
        const base64 = this.arrayBufferToBase64(buffer);

        // Format as PEM
        const pem = [
            `-----BEGIN ${type}-----`,
            ...this.chunks(base64, 64),
            `-----END ${type}-----`
        ].join('\n');

        return pem;
    }

    /**
     * Converts an ArrayBuffer to Base64 string
     */
    private static arrayBufferToBase64(buffer: ArrayBuffer): string {
        const binary = String.fromCharCode(...new Uint8Array(buffer));
        return window.btoa(binary);
    }

    /**
     * Splits a string into chunks of specified size
     */
    private static chunks(str: string, size: number): string[] {
        const chunks: string[] = [];
        for (let i = 0; i < str.length; i += size) {
            chunks.push(str.slice(i, i + size));
        }
        return chunks;
    }
}