var Navigo = require('navigo');
var Vue = require('vue');
import Rx from 'rxjs/Rx';
var mqtt = require('mqtt');
import nav_html from './nav.html'
import app_html from './app.html'
import about_html from './about.html'
import {generateTemplateString} from './util.js'



let app_templ = generateTemplateString(app_html)({dog: 'Ulysses'})

var el = function(sel) {
  return document.querySelector(sel);
}

Rx.Observable.of(1,2,3)

var foo = Rx.Observable.create(function (observer) {
  console.log('Hello');
  observer.next(42);
  observer.next(420);
  setTimeout(() => {
    observer.next(300);
  }, 1000);  
  observer.next(142);
});

var food ='bagel';

var hi = Rx.Observable.create(function subscribe(observer) {
  var id = setInterval(() => {
    observer.next('hi')
  }, 1000);
});

var his = hi.subscribe(x => console.log(x));

var observable = Rx.Observable.from([10, 20, 30]);
var subscription = observable.subscribe(x => console.log(x));
// Later:
subscription.unsubscribe();

function rtdog(){
  setContent('Ulysses');
  observable.subscribe(x => console.log(x));  
}

console.log('starting now works on import');

window.goprod = ()=>{
  console.log('in goprod')
  router.navigate('/products/list');
}

var setContent = function(content) {
  el('#rt').innerHTML = content;
};

var router;
var routing = function(mode){
  router = new Navigo(null, true);
  router
    .on({
      'products/:id': function (params) {
        setContent('Products id='+params.id);
        console.log(params.id);
      },
      'products': function () {
        el('#rt').innerHTML = about_html;
        var dev = document.getElementById("idev")        
        new Vue({
          el: '#rt',
          data: {
            message: 'in about products'
          },
          methods: {
            devChanged: function () {
              console.log('in about prod dev changed')
              var deviceId = dev.value
              //publish to device
              var prg = deviceId+'/prg'
              var cmd = deviceId +'/cmd'
              var req = deviceId +'/req'
              //publish to server
              var trigtime = deviceId +'/time'
              //subscribe
              var devtime = deviceId +'/devtime'
              var srstate = deviceId+'/srstate'
              var sched = deviceId +'/sched'
              var flags = deviceId+'/flags'
              //deprecate
              var timr = deviceId+'/timr'
              var subject = new Rx.Subject();
              subject.subscribe({
                next: (v) => console.log('observerA: ' + v)
              });
              var timro;
              var timroable = Rx.Observable.create(function subscribe(timro) {
                  timro.next('plo.tIMElEFT')
              });
              // progs = deviceId+'/progs'
              var client = mqtt.connect('ws://162.217.250.109:3333')              
              client.on('connect', function(){
                console.log('maybe connected')
                client.subscribe(devtime)//device time
                client.subscribe(srstate) 
                client.subscribe(timr) 
                client.subscribe(sched)
                client.subscribe(flags)
                client.on('message', function(topic, payload) {
                  var pls = payload.toString()
                  var plo = JSON.parse(pls)
                  //console.log(plo)
                  console.log('['+topic+'] '+payload.toString())
                  var sp = topic.split("/")
                  var job = sp[1];  
                  switch(job){
                    case "srstate": 
                      break;
                    case "timr":
                      var otimr = plo;
                      //console.log(JSON.stringify(otimr));
                      
                      subject.next(plo.tIMElEFT);
                      break;
                  }
                });

              });           
            }
          }
        })
      },
      'dog': rtdog,
      '*': function () {
        setContent('Home')
      }
    })
    .resolve();  
}




var init = function () {
  //console.log(app_templ)
  el('#content').innerHTML = app_templ;
  new Vue({
    el: '#mess',
    data: {
      message: 'Hello Vue.js!'
    }
  })
  routing();

  var but2 = document.querySelector('#but2');
  console.log(but2)
  //but2.addEventListener('click', () => console.log(`Clicked ${++count} times`));

  // Rx.Observable.fromEvent(but2, 'click')
  //   .throttle(1000)
  //   .scan(count => count + 1, 0)
  //   .subscribe(count => {
  //     console.log('Clicked ${count} times');
  //     hi.unsubscribe()
  //   });  
  Rx.Observable.fromEvent(but2, 'click')
    .scan(count => count + 1, 0)
    .subscribe(count => {
      console.log(`Clicked ${count} times`);
      console.log(his)
      his.unsubscribe()
    });    
};

window.onload = init;

function multiplyByTen(input) {
  var output = Rx.Observable.create(function subscribe(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
  return output;
}
var input = Rx.Observable.from([1, 2, 3, 4]);
var output = multiplyByTen(input);
output.subscribe(x => console.log(x));

var clicks = Rx.Observable.fromEvent(document, 'click');
var result = clicks.throttle(ev => Rx.Observable.interval(1000));
result.subscribe(x => console.log(x));
