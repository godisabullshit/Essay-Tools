# EssayTools by Isaak Eriksson

Using the natural language features provided by Google's API, I've began a christmas project consisting of tools that would critically analyze texts in order to write essays faster.

## Getting started

* Clone the repo with `git clone https://github.com/MyIsaak/EssayTools.git`
* [Read the Electron docs](https://electronjs.org/docs) to learn since it's the framework used to host this tool 
* [Read the Google Natural Language API docs](https://cloud.google.com/natural-language/docs/basics) to learn since it's the main NLP API being used

Take note that this project began as a christmas project solely for the purpose of helping students (and myself) analyze essays using common natural language techniques. 

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
photon/
├── css/
│   ├── photon.css
│   ├── photon.min.css
├── fonts/
│   ├── photon-entypo.eot
│   ├── photon-entypo.svg
│   ├── photon-entypo.ttf
│   └── photon-entypo.woff
└── template-app/
    ├── js/
    │   └── menu.js
    ├── app.js
    ├── index.html
    └── package.json
```

We provide compiled CSS (`photon.*`), as well as the minified CSS. We also include the Entypo fonts and a template Electron application for you to quickly get started.

## Documentation

Photon's documentation is built with [Jekyll](http://jekyllrb.com) and publicly hosted on GitHub Pages at <http://photonkit.com>. The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v2.5.x).
  * **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.
2. Install the Ruby-based syntax highlighter, [Rouge](https://github.com/jneen/rouge), with `gem install rouge`.
3. From the root `/photon` directory, run `jekyll serve` in the command line.
4. Open <http://localhost:4000> in your browser, and boom!

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).

## Contributing

Please file a GitHub issue to [report a bug](https://github.com/connors/photon/issues). When reporting a bug, be sure to follow the [contributor guidelines](https://github.com/connors/photon/blob/master/CONTRIBUTING.md).


## Development

1. Install node dependencies: `npm install`.
2. Open the app: `npm start`.

Modifying source Sass files? Open a second Terminal tab and run `grunt` to kick off a build the compiled `photon.css`.

## License

Copyright @IsaakEriksson. Released under MIT.
