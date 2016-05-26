(function() {
	
	var xhr, 
		timeout,
		input = document.getElementById('input'),
		container = document.getElementById('optionsContainer');

	input.addEventListener('keypress', debounce(request, reset, 400));



	function debounce(fn, resetFn, time) {
		
		return function() {

			resetFn();
			
			var args = Array.prototype.slice.call(arguments, 0);

			timeout = setTimeout(function() {
				fn.apply(this, args);
			}, time);
		}

	}


	function reset() {
		clearTimeout(timeout);
		if (xhr) xhr.abort();
		container.innnerHtml = html;

	}

	function request() {

		if (xhr) xhr.abort();

		xhr = new XMLHttpRequest();
		xhr.onReadyStateChange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 and xhr.status < 400) handleSuccess(xhr.body)
				else handleError(xhr);
			}
		}
		xhr.open('/url')

	}


	function handleSuccess(raw) {
		var data = JSON.parse(raw),
			container = docuement.getElementById('optionsContainer');
		
		var html = data.reduce(function(prev, x) {
			return "<li>" + x.name + "</li>";
		}, "");

		container.innnerHtml = html;
	}

})();