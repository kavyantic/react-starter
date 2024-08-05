"use client";

export class StorageService {
  static keys = {
    AUTH_STATE: "s9snolf9smxcvyjgtdbits6sfl&%s5@.sdf",
    TOKEN_KEY: "sjsdf&^%00sd%&.99sdf72#4lsdfisdfkisdlfsd",
  };

  static saveAuthState(auth: Object): void {
    localStorage.setItem(StorageService.keys.AUTH_STATE, JSON.stringify(auth));
  }

  static loadAuthState(): Object {
    const authState = localStorage.getItem(StorageService.keys.AUTH_STATE);
    if (authState) {
      return JSON.parse(authState);
    } else {
      throw new Error("No auth info found");
    }
  }
  static saveToken(token: string) {
    localStorage.setItem(StorageService.keys.TOKEN_KEY, token);
  }
  static clearToken() {
    localStorage.removeItem(StorageService.keys.TOKEN_KEY);
  }

  static getToken(): string {
    const token = localStorage.getItem(StorageService.keys.TOKEN_KEY);
    if (token) {
      return token;
    } else {
      throw new Error("No token found");
    }
  }

  static getTokenSafe(): string {
    return localStorage.getItem(StorageService.keys.TOKEN_KEY) || "";
  }
}
