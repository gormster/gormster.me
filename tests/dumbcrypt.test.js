import { TestCase } from './assertion.js';
import { encryptString, decryptString } from '../src/dumbcrypt.js';

export default class EncryptDecryptTests extends TestCase {

  testEncryptDecrypt() {
    this.describe('encrypt/decrypt cycle should produce the same thing');

    let testStrings = ['hello world', 'test@example.com', 'café'];

    for(let s of testStrings) {
      let encrypted = encryptString(s);
      let decrypted = decryptString(encrypted);
      this.assert(decrypted === s, `${s} did not survive an encrypt/decrypt cycle. got ${decrypted} instead.`);
    }
  }

}
