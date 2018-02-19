
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
}