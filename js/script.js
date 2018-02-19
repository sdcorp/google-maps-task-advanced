const place = [];

function initMap() {
	const myMap = new google.maps.Map(document.getElementById('map'), {
		center: { lat: -34.397, lng: 150.644 },
		zoom: 8
	});
	const drawingManager = new google.maps.drawing.DrawingManager({
		drawingControl: false,
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER,
			drawingModes: ['polygon', 'rectangle']
		},
	});
	drawingManager.setMap(myMap);

	const drawingActions = {
		showTools() {
			drawingManager.setOptions({
				drawingControl: true
			});
		},

		hideTools() {
			drawingManager.setOptions({
				drawingControl: false
			});
		},
		// Откл рисование
		resetDrawing() {
			drawingManager.setDrawingMode(null)
		},

		removeFigure() {
			this.setMap(null)
		},

	}

	// Новое место: показываем тулбар, откл кнопку, показываем кнопки выбора
	$('.newPlace').click(function (e) {
		e.preventDefault();
		drawingActions.showTools();
		$(this).attr('disabled', 'disabled');
		$('.choice').fadeIn(400);
	});

	// Сохранить: добавляем модалку
	$('.save').click(function (e) {
		e.preventDefault();
		if (place.length !== 0) {
			modalActions.openModal();
			modalActions.closeModal();
		} else {
			alert('First, create place!')
		}
	});

	// После Submit: вкл кнопку NewPlace, закрываем модалку, скрываем кнопки выбора, чистим массив
	$('.create_form').submit(function (e) {
		e.preventDefault();
		$('.newPlace').removeAttr('disabled');
		modalActions.closeModalInstantly();
		$('.choice').fadeOut(100);
		place.pop();
	});

	google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
		const rectangle_coordinates = rectangle.getBounds().toJSON();
		place.push(rectangle_coordinates);
		console.log(place);

		// Фигура нарисована: откл рисование, тулбар скрыли
		drawingActions.resetDrawing();
		drawingActions.hideTools();

		// Отмена: показали тулбар, убрали уже нарисованую фигуру, вкл кнопку NewPlace
		$('.cancel').click(function (e) {
			e.preventDefault();
			place.pop();
			drawingActions.showTools();
			drawingActions.removeFigure.call(rectangle);
		});
	});

	google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
		const vertices = polygon.getPath().getArray();
		const polygon_coordinates = getPolygon(vertices);
		place.push(polygon_coordinates);
		console.log(place);

		// Фигура нарисована: откл рисование, тулбар скрыли
		drawingActions.resetDrawing();
		drawingActions.hideTools();

		// Отмена: показали тулбар, убрали уже нарисованую фигуру, вкл кнопку NewPlace		
		$('.cancel').click(function (e) {
			e.preventDefault();
			place.pop();
			drawingActions.showTools();
			drawingActions.removeFigure.call(polygon);
		});
	});
}

// Получаем координаты вершин полигона и заносим их в объект
function getPolygon(vertices) {
	const polygon = {};
	vertices.forEach(function (el, index) {
		polygon['coordinate ' + index] = {
			lat: el.lat(),
			lng: el.lng(),
		}
	});
	return polygon;
}

const modalActions = {
	// Открываем модалку
	openModal() {
		$('.overlay').fadeIn(400, // анимируем показ обложки 
			function () { // далее показываем мод. окно 
				$('.modal_form')
					.css('display', 'block')
					.animate({ opacity: 1 }, 200);
			});
	},
	// Закрываем модалку
	closeModalInstantly() {
		$('.modal_form')
			.animate({ opacity: 0 }, 200,  // уменьшаем прозрачность 
				function () { // пoсле aнимaции 
					$(this).css('display', 'none'); // скрываем окно 
					$('.overlay').fadeOut(400); // скрывaем пoдлoжку 
				}
			);
	},
	// Закрываем модалку по клику на Х или оверлей
	closeModal() {
		let that = this;
		$('.modal_close, .overlay').click(function () {
			that.closeModalInstantly();
		});
	},
}