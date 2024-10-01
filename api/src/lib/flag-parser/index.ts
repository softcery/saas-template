export class FlagParser {
  public static getFlags(args: string[]): Map<string, string> {
    const filterArgs = (flag: string) => flag.includes('--');
    const mapFlags = (flag: string) => flag.replace('--', '').split('=');

    const filteredArgs = args.slice(2).filter(filterArgs).map(mapFlags);

    const flagsObj: Map<string, string> = new Map();

    for (const arg of filteredArgs) {
      flagsObj.set(arg[0], arg[1] ?? '');
    }

    return flagsObj;
  }
}
