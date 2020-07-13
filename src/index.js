// Nexss PROGRAMMER 2.x - NodeJS
// Template module
process.stdin.on("data", function (NexssStdin) {
  let NexssStdout,
    cons = require("consolidate");
  try {
    NexssStdout = JSON.parse(NexssStdin.toString());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  const fs = require("fs");
  const path = require("path");
  const templatesPath = `${process.cwd()}/src/views/`;

  // --copyTemplate
  let displayTemplates;
  if (NexssStdout.copyTemplate) {
    const TemplateToCopyPath = `${templatesPath}${NexssStdout.copyTemplate}`;
    if (!fs.existsSync(TemplateToCopyPath)) {
      // We use here console.log as we want to display in the right order
      // console.error is use to even show the solutions from NexssP
      console.log(
        `\x1b[31mERROR: \x1b[1m${TemplateToCopyPath}\x1b[0m \x1b[31mhas not been found. \x1b[0m`
      );
      displayTemplates = true;
    } else {
      const destination = `${NexssStdout.cwd}/src/views`;
      if (NexssStdout.newTemplateName) {
        if (path.extname(NexssStdout.newTemplateName)) {
          console.log(
            `\x1b[31mERROR: ${
              NexssStdout.newTemplateName
            } cannot have extension. It will be taken from source file. ${path.extname(
              NexssStdout.copyTemplate
            )}\x1b[0m`
          );
          process.exit(1);
        }
        NexssStdout.copyTemplate =
          NexssStdout.newTemplateName + path.extname(NexssStdout.copyTemplate);
      }

      if (!fs.existsSync(destination)) {
        // We create folder for views...
        fs.mkdirSync(destination, { recursive: true });
      }

      if (fs.existsSync(`${destination}/${NexssStdout.copyTemplate}`)) {
        console.log(
          `\x1b[31mERROR: \x1b[1m${TemplateToCopyPath}\x1b[0m \x1b[31malready exists. \x1b[0m`
        );
        console.log("Use --newTemplateName='mynewtemplate' for a new name");
        process.exit(1);
      }

      NexssStdout.template = `src/views/${path.basename(
        NexssStdout.copyTemplate
      )}`;

      fs.copyFileSync(
        TemplateToCopyPath,
        `${destination}/${NexssStdout.copyTemplate}`
      );

      console.log(
        `\x1b[33mNew template has been created ${NexssStdout.template}\x1b[0m`
      );
      process.exit(0);
    }
  }

  // --listTemplates - Shows Available templates
  if (NexssStdout.listTemplates || displayTemplates) {
    console.log(
      `\x1b[1mAvailable Templates \x1b[34m(${path.normalize(
        templatesPath
      )}):\x1b[0m`
    );
    items = fs.readdirSync(templatesPath);
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
    process.exit(0);
  }

  //
  const page = NexssStdout.template
    ? `${NexssStdout.cwd}/${NexssStdout.template}`
    : `${process.cwd()}/src/views/page.pug`;

  const ext = require("path").extname(page).slice(1);

  if (!cons[ext]) {
    console.error(
      `Template engine with extension '${ext}' has not been found. 
'Template' uses consolidate.js. 
You can see template types list by going to this website: https://github.com/tj/consolidate.js/`
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
      stdio: "inherit",
    });
  }
  // When debug it displays errors on the stderr
  delete NexssStdout.debug;
  cons[ext](page, NexssStdout, function (err, html) {
    if (err) {
      console.error(err);
    } else {
      console.log(html);
    }
  });
});
// process.stdin.on("end", function() {
//   //On Windows below is not needed.
//   process.exit(0);
// });
