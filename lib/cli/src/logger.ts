import chalk = require("chalk");

const bannerArt =`
░█████╗░░█████╗░░██████╗░█████╗░░█████╗░
██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗
██║░░╚═╝███████║╚█████╗░██║░░╚═╝███████║
██║░░██╗██╔══██║░╚═══██╗██║░░██╗██╔══██║
╚█████╔╝██║░░██║██████╔╝╚█████╔╝██║░░██║
░╚════╝░╚═╝░░╚═╝╚═════╝░░╚════╝░╚═╝░░╚═╝`

export class Logger {
  private command:string;
  private timers: Array<number> = [];
  private indentLevel = 0;

  constructor(command:string) {
    this.command = command;

  }
  private log(boxCharacter:string, message:string = '') {
    console.log(chalk`{yellow ${this.command} ▐} {gray ${boxCharacter}} ${message}`);
  }
  private getLinePrefix() {
    let prefix = '';
    for (let i = 0; i < this.indentLevel; i++) {
      prefix += '┃  ';
    }
    return prefix;
  }

  info(message:string) {
    this.indentLevel -= 1;
    const prefix = this.getLinePrefix();
    this.indentLevel += 1;

    this.log(prefix + '┣', chalk.gray(message));
  }
  start(message:string) {
    const start = Date.now();
    this.timers.push(start);

    const prefix = this.getLinePrefix();
    this.log(prefix + '┏', message);

    this.indentLevel += 1;
  }
  stop(message:string = '') {
    this.indentLevel -= 1;

    const duration = ((Date.now() - (this.timers.pop() || Date.now())) / 1000).toFixed(2);
    const prefix = this.getLinePrefix();

    if (message) {
      this.log(prefix + '┗', message);
    } else {
      this.log(prefix + '┗', chalk`{gray Done in {italic ${duration}s}}`);
    }
  }
  newline() {
    const prefix = this.getLinePrefix();
    this.log(prefix + '┃');
  }

}
export function createLogger(command:string):Logger {
  return new Logger(command)
}
export function  displayBanner() {
  console.log(bannerArt)
}
