// Encryption Utils
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const salt = process.env.SALT || 'default_salt';

export function encrypt(data: string): string {
    const dataToEncrypt = CryptoJS.AES.encrypt(data, salt);
    const encryption = dataToEncrypt.toString();
    return encryption;
}

export function decrypt(cipherCode: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherCode, salt);
    const actualData = bytes.toString(CryptoJS.enc.Utf8);
    return actualData;
}

// Example usage
export const email = encrypt(process.env.email!);
export const password = encrypt(process.env.password!);
console.log('Encrypted email:', email);
console.log('Encrypted password:', password);

const emailP = decrypt(email);
const passwordlp = decrypt(password)
console.log('Decrypted email:', emailP);
console.log('Decrypted Password: ',passwordlp)
