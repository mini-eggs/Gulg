import prog from "caporal";
import Gulg from "./gulg";

const gulg = new Gulg();
const { version } = require('../package.json')

prog
  .version(version)
  .action(() => {
    gulg.list()
  })
  .parse(process.argv)
