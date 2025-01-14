/**
 * Generates an RSA key pair using the Web Crypto API in the browser.
 *
 * @returns A Promise that resolves to an object containing the public and private keys in JWK format.
 */
export async function generateRSAKeyPair(): Promise<{ publicKey: JsonWebKey; privateKey: JsonWebKey }> {
    // Define the RSA key generation parameters
    const keyGenerationParams: RsaHashedKeyGenParams = {
        name: "RSA-OAEP",           // Algorithm name for RSA encryption with Optimal Asymmetric Encryption Padding (OAEP)
        modulusLength: 2048,        // Length of the RSA modulus in bits (commonly 2048 or 4096)
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // Public exponent (commonly 65537 represented in hex)
        hash: { name: "SHA-256" },  // Hash function to use with RSA-OAEP
    };

    // Generate the RSA key pair
    const keyPair: CryptoKeyPair = await window.crypto.subtle.generateKey(
        keyGenerationParams, // The key generation parameters defined above
        true,                // Whether the key is extractable (can be exported)
        ["encrypt", "decrypt"] // Usages for the keys
    );

    // Export the public key to JWK (JSON Web Key) format
    const publicKeyJWK: JsonWebKey = await window.crypto.subtle.exportKey(
        "jwk",    // Export format
        keyPair.publicKey // The public key to export
    );

    // Export the private key to JWK format
    const privateKeyJWK: JsonWebKey = await window.crypto.subtle.exportKey(
        "jwk",     // Export format
        keyPair.privateKey // The private key to export
    );

    // Return the key pair in JWK format
    return {
        publicKey: publicKeyJWK,
        privateKey: privateKeyJWK,
    };
}
