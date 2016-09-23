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