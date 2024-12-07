export default abstract class DOI {
  protected readonly value: string;
  
  constructor(value: string) {
    this.value = value;
    this.checkDOI();
  }

  abstract checkDOI(): void;

  getValue(): string {
    return this.value;
  }
}