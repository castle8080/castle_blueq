const archiver = require("archiver");
const child_process = require('child_process');
const util = require('util');
const $p = util.promisify;
const exec = util.promisify(child_process.exec); 

async function run_command(cmd) {
    console.log(cmd);
    var r = await exec(cmd);
    console.log(r.stdout);
    console.log(r.stderr);
}

async function create_zip() {
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });
}

async function run() {
    await run_command("npm run build");
}

run();