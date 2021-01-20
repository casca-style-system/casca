
import cli = require("yargs");
import { displayBanner } from "./logger";
const packageJson = require( '../../package.json');

async function main({argv}:{argv:string[]}) {

  cli
    .scriptName('casca')
    .version(packageJson.version)
    .usage('Usage: $0 <command> [options]');

  cli
    .commandDir('commands')
    .strict()
    .strictCommands()
    .fail((message:any, error:any, yargs:any) => {
      if (error) {
        if (error.stderr) {
          console.error(error.stderr);
          process.exit(1);
        }
        console.error(error);
        process.exit(1);

      } else {
        console.log(message);
        console.log(yargs.help());
        process.exit(1);
      }
    })
    if(argv.length==2) {
      displayBanner()
      cli.showHelp();
      return;
    }
    cli.parse(argv.slice(2)).argv;

};

export default main
