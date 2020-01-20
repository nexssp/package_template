# Template - Nexss PROGRAMMER 2.0

To Install Nexss Programmer please go to [Nexss Programmer CLI](https://github.com/nexssp/cli#readme) for more information.

Multiple templates for output. Uses consolidate.js package to handle various templates.

## Examples

```sh
nexss Template --template="mytemplate.twig"
nexss Template --server
nexss Template --listTemplates # displays list of the templates
nexss Template --copyTemplate="page.pug" # it will copy page.pug to the src/views/page.pug (from current older!!)
nexss Template --copytemplate="page.jade" --newTemplateName="mynewname" # it will copy with new name
```

## Important

```yml
debug: 0 # Please remember to add this, otherwise debug messages will be displayed. Eg pug as errors.
```

## Different template engines

## Links

<https://github.com/tj/consolidate.js/>
