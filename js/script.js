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

		resetDrawing() {
			drawingManager.setDrawingMode(null)
		},

		removeFigure() {
			this.setMap(null)
		},

	}

	$('.newPlace').click(function (e) {
		e.preventDefault();
		drawingActions.showTools();
		$(this).attr('disabled', 'disabled');
		$('.close').removeAttr('disabled');
	});

	$('.close').click(function (e) {
		e.preventDefault();
		drawingActions.hideTools();
		$(this).attr('disabled', 'disabled');
		$('.newPlace').removeAttr('disabled');
	});

	google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
		const rectangle_coordinates = rectangle.getBounds().toJSON();
		place.push(rectangle_coordinates);
		console.log(place);

		// Фигура нарисована: нельзя рисовать, тулбар скрыли
		drawingActions.resetDrawing();
		drawingActions.hideTools();

		// Нажали Отмена: снова показали тулбар и убрали уже нарисованую фигуру
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
		drawingActions.resetDrawing();
		drawingActions.hideTools();
		$('.cancel').click(function (e) {
			e.preventDefault();
			place.pop();
			drawingActions.showTools();
			drawingActions.removeFigure.call(polygon);
		});
	});
}

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