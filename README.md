# Template - Nexss PROGRAMMER 2.0

To Install Nexss Programmer please go to [Nexss Programmer CLI](https://github.com/nexssp/cli#readme) for more information.

Multiple templates for output. Uses consolidate.js package to handle various templates.

## Examples

```sh
nexss Template --listTemplates # displays list of the templates available in the Template package
nexss Template --copyTemplate="page.pug" # it will copy page.pug to the src/views/page.pug so you can modify it and use it nexss Template --template="src/views/page.pug".
nexss Template --copyTemplate="page.jade" --newTemplateName="mynewname" # it will copy with new name -> src/views/mynewname.jade
nexss Template --template="src/views/mynewname.jade" --server # --server will start a development server to share results




```

## Important

```yml
debug: 0 # Please remember to add this, otherwise debug messages will be displayed. Eg pug as errors.
```

## Different template engines

## Links

<https://github.com/tj/consolidate.js/>
