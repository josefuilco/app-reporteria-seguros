import { readdirSync } from "fs";

export default function loadModules<T>(dirname: string): T[] {
  const moduleMemory: T[] = [];
  const moduleDir = readdirSync(dirname);
  moduleDir.forEach(module => {
    if (!module.endsWith('.js'))
      return;
    const { default: moduleClass } = require(`${ dirname }/${ module }`);
    moduleMemory.push(new moduleClass());
  });
  return moduleMemory;
}