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

