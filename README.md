## tags
### 03_state.subscribe_to_innerHTML

    import count_html from './count.html'
    import Rx from 'rxjs/Rx';

    const count = ()=>{
      document.querySelector('#rt').innerHTML = count_html
      var increaseButton = document.querySelector('#increase');
      var increase = Rx.Observable.fromEvent(increaseButton, 'click')
        .map(() => state => Object.assign({}, state, {count: state.count + 1}));

      var decreaseButton = document.querySelector('#decrease');
      var decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
        .map(() => state => Object.assign({}, state, {count: state.count - 1}));

      var inputElement = document.querySelector('#inp');
      var input = Rx.Observable.fromEvent(inputElement, 'keypress')
        .map(event => state => Object.assign({}, state, {inputValue: event.target.value}));   

      var state = Rx.Observable
        .merge(increase, decrease, input)
        .scan((state, changeFn) => changeFn(state), {count: 0})

      state.subscribe((state) => {
        document.querySelector('#cnt').innerHTML = state.count;
        document.querySelector('#outp').innerHTML = 'Hello ' + state.inputValue;
      }); 
    }

    export {count }
### 02_count
<blockquote>we also need to handle is that multiple observables can update a single state store.
http://reactivex.io/rxjs/manual/tutorial.html#creating-applications</blockquote>
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