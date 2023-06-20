import CryptoJS from "crypto-js";

class Util {
  constructor() {
    this.secretKey = "mySecretKey";
  }
  isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  saveDataIntoStorageLocal(name, data) {
    const encryptedData = this.encryptObject(data, this.secretKey);
    const dat = this.decryptObject(encryptedData, Object.secretKey);
    localStorage.setItem(this.hashString(name), encryptedData);
  }

  getDataFromStorageLocal(name) {
    const data = localStorage.getItem(this.hashString(name));
    if (data) {
      const dataDecrypt = this.decryptObject(data, this.secretKey);
      return dataDecrypt;
    }
    return null;
  }

  verifyHash = (string, expectedHash) => {
    const hashedString = CryptoJS.SHA256(string).toString();
    return hashedString === expectedHash;
  };

  hashString = (string) => {
    const hashedString = CryptoJS.SHA256(string).toString();
    return hashedString;
  };

  encryptObject = (obj, secretKey) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(obj),
      secretKey
    ).toString();
    return encrypted;
  };

  decryptObject = (encryptedData, secretKey) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(decrypted);
  };
}

export default new Util();
