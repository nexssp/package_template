// Nexss PROGRAMMER 2.0.0 - NodeJS
// Template module
// STDIN
process.stdin.on("data", function(NexssStdin) {
  let NexssStdout,
    cons = require("consolidate");
  try {
    NexssStdout = JSON.parse(NexssStdin.toString());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const page = NexssStdout.file || `${process.cwd()}/src/views/page.pug`;
  const arr = page.split(".");
  const ext = arr[arr.length - 1];

  if (!cons[ext]) {
    console.error(
      `'${ext}' template type has not been found. 'nexss Template package' uses consolidate.js. You can see template types list by going to this website: https://github.com/tj/consolidate.js/`
    );
    process.exit(1);
  }
  try {
    require.resolve(ext);
  } catch (e) {
    let installPackage = ext;
    if (ext === "swig") {
      installPackage = "swig-templates";
    }

    console.log(
      `${installPackage} not found. Trying to install template engine...`
    );

    require("child_process").execSync(`npm i ${installPackage}`, {
      stdio: "inherit"
    });
  }

  cons[ext](page, NexssStdout, function(err, html) {
    if (err) {
      console.log(err);
    } else {
      console.log(html);
    }
  });
});
// process.stdin.on("end", function() {
//   //On Windows below is not needed.
//   process.exit(0);
// });
