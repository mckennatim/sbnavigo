## tags
### 02_count
NOT Quite each observable has its own version of ctx

    import count_html from './count.html'
    import Rx from 'rxjs/Rx';

    const count = ()=>{
      document.querySelector('#rt').innerHTML = count_html
      var increaseButton = document.querySelector('#increase');
      Rx.Observable.fromEvent(increaseButton, 'click')
        .scan(cxt => cxt+1, 0)
        .subscribe(cxt=> document.querySelector('#cnt').innerHTML = cxt)
      var decreaseButton = document.querySelector('#decrease');
      Rx.Observable.fromEvent(decreaseButton, 'click')
        .scan(cxt => cxt-1, 0)
        .subscribe(cxt=> document.querySelector('#cnt').innerHTML = cxt)
    };

export { count }

### 01_init_commit
DOESNT work with webpack devserver
* navigo router using hash tags
* imports RX and mqtt
* imports es6 tagged templates and compiles template using `let nav_templ = generateTemplateString(nav_html)({dog: 'Ulysses'})`
* setContent loads DOM, always with nav_templ
* window.goprod needed for click function since webpack wraps its stuff so as not to be in the global window space
* start router on load

.

      var init = function () {
        routing();
      };

window.onload = init;

<s>broken for webpack.production.config, `app.js:1Uncaught ReferenceError: useHash is not defined`</s>

  router = new Navigo(null, true); works

  import won't work unless query is in module

      module: {
        loaders: [
          { test: /\.js$/, 
            exclude: /node_modules/,
            loader: 'babel-loader' ,
            include: __dirname,
            query:
            {
              presets:['es2015']
            }
          },
          { test: /\.css$/, loader: "style!css?modules" },
          { test: /\.html$/, loader: "babel!es6-template-string?context=styles" }
        ],
      },  