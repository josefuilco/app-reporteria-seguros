import type { Url } from './types.data-provider'

export default class DataProvider {
  static #instance: DataProvider
  #url: Url

  private constructor() {
    this.#url = 'https://localhost:3000'
  }

  static getInstance(): DataProvider {
    this.#instance ??= new DataProvider()
    return this.#instance
  }

  //#region Setters
  setUrl(url: Url): void {
    this.#url = url
  }
  //#endregion

  //#region Methods
  async get<T>(): Promise<T> {
    throw new Error('Method not implemented')
  }

  async post<T>(): Promise<T> {
    throw new Error('Method not implemented')
  }

  async put<T>(): Promise<T> {
    throw new Error('Method not implemented')
  }

  async delete<T>(): Promise<T> {
    throw new Error('Method not implemented')
  }
  //#endregion
}