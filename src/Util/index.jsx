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

  compareDate(dateOne, dateSecond) {
    const date1 = new Date(dateOne);
    const date2 = new Date(dateSecond);
    const day1 = date1.getDate();
    const month1 = date1.getMonth();
    const year1 = date1.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();
    if (year1 === year2 && month1 === month2 && day1 === day2) {
      return true;
    } else {
      return false;
    }
  }
}

export default new Util();
