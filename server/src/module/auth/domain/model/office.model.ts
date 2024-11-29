export default class Office {
  readonly #id: number;
  readonly #name: string;

  constructor(id: number, name: string) {
    this.#id = id;
    this.#name = name;
  }
  
  getId(): number {
    return this.#id;
  }

  getName(): string {
    return this.#name;
  }
}