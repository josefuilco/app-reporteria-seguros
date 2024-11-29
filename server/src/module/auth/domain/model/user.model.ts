export default class User {
  readonly #id: string;
  readonly #name: string;
  readonly #password: string;
  
  constructor(id: string, name: string, password: string) {
    this.#id = id;
    this.#name = name;
    this.#password = password;
  }

  getId(): string {
    return this.#id;
  }

  getName(): string {
    return this.#name;
  }

  getPassword() {
    return this.#password;
  }
}