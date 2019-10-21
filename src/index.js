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

  const page = NexssStdout.file || "views/page.jade";
  const arr = page.split(".");
  const ext = arr[arr.length - 1];

  cons[ext](page, NexssStdout, function(err, html) {
    if (err) throw err;
    console.log(html);
    // process.stdout.write(JSON.stringify(NexssStdout));
    // process.stdout.write(html);
  });
});

process.stdin.on("end", function() {
  //On Windows below is not needed.
  process.exit(0);
});
