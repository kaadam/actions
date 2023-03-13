const { exec } = require('child_process');
const path = require('path');

if (process.argv.length > 3) {
  console.error("usage: process.argv[0] process.argv[1]");
  process.exit(1);
}

var arch = process.env.INPUT_ARCH.toLowerCase()
var args = `'-arch=${arch}'`
if (process.env.INPUT_HOST_ARCH) {
  var host = process.env.INPUT_HOST_ARCH.toLowerCase()
  args = args.concat(' ', `'-host_arch=${host}'`)
}
var script = path.join(__dirname, 'vs_setup.bat')

cmd = 'git config --global core.autocrlf false'
exec(cmd, (error, stdout, stderr) => {
  console.log(`${stdout}`);
  console.error(`${stderr}`);
  if (error) {
    process.exit(error);
  }
});

console.log(`${script}`)
exec(`${script} ${args}`, (error, stdout, stderr) => {

  console.error(`${stderr}`);
  if (error) {
    process.exit(error);
  }

  var fs = require('fs');
  fs.appendFile(process.env.GITHUB_ENV, `${stdout}`, function (err) {
    if (err) throw err;
    console.log('Wrote environment variables to file:');
    console.log(`${stdout}`);
  });
});

