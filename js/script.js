
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
}