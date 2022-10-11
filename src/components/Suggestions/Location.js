import React, { useEffect, useState } from "react";
import { Row, Col, CardHeader, Table, Card } from "reactstrap";
import crops from "./crops.json";
const Temperature = () => {

	const [currentLocation,setCurrentLocation] = useState("");
	// Step 1: Get user coordinates
	function getCoordintes() {
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		function success(pos) {
			var crd = pos.coords;
			var lat = crd.latitude.toString();
			var lng = crd.longitude.toString();
			var coordinates = [lat, lng];
			console.log(`Latitude: ${lat}, Longitude: ${lng}`);
			getCity(coordinates);
			return;

		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}

		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	// Step 2: Get city name
	function getCity(coordinates) {
		var xhr = new XMLHttpRequest();
		var lat = coordinates[0];
		var lng = coordinates[1];

		// Paste your LocationIQ token below.
		xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.88d13b07059d6caa7b9d528ca18b5caa&lat=" +
			lat + "&lon=" + lng + "&format=json", true);
		xhr.send();
		xhr.onreadystatechange = processRequest;
		xhr.addEventListener("readystatechange", processRequest, false);

		function processRequest(e) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var response = JSON.parse(xhr.responseText);
				var city = response.address.city;
				setCurrentLocation(response.address.state);
				return;
			}
		}
	}
	useEffect(()=>{
		getCoordintes();
	},[])

	const suggestedCrops = [];
	Object.keys(crops).forEach((crop) => {
		crops[crop].locations.forEach((location) => {
			if (location === currentLocation) suggestedCrops.push(crop);
		});
	});
	return (
		<Col className="mb-xl-0 p-0" xl="">
			<Card className="shadow p-4">
				<CardHeader className="border-0">
					<Row className="align-items-center">
						<div className="col">
							<h3 className="mb-0 text-center"></h3>
						</div>
					</Row>
				</CardHeader>
				<p>
					<strong>Current Location: {currentLocation}</strong>
				</p>
				<Table className="align-items-center table-flush table-striped" responsive>
					<thead>
						<tr>
							<th scope="col">Crop</th>
							<th scope="col">Min Required Temperature</th>
							<th scope="col">Max Allowed Temperature</th>
						</tr>
					</thead>
					<tbody>
						{suggestedCrops.map((crop, index) => (
							<tr key={index + "crop"}>
								<td>{crop}</td>
								<td>{crops[crop].min_T}ºC</td>
								<td>{crops[crop].max_T}ºC</td>
							</tr>
						))}
						{/* <tr>
							<th scope="row">/argon/profile.html</th>
							<td>1,795</td>
							<td>190</td>
							<td>
								<i className="fas fa-arrow-down text-danger mr-3" /> 46,53%
							</td>
						</tr> */}
					</tbody>
				</Table>
			</Card>
		</Col>
	);
};

export default Temperature;
