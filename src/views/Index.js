
import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	NavItem,
	NavLink,
	Nav,
	Progress,
	Table,
	Container,
	Row,
	Col,
} from "reactstrap";

// core components
import { chartOptions, parseOptions, chartExample2, chartExample3, chartExample4 } from "variables/charts.js";

import Suggestions from "../components/Suggestions/Suggestions";

import Header from "components/Headers/Header";
import { UncontrolledAlert, Alert } from "reactstrap";

import axios from "axios";
require("dotenv").config();

function returnForecast(param, forecastData) {
	if (forecastData === {}) return;
	if (!("forecast" in forecastData)) return;
	if (!("forecastday" in forecastData.forecast)) return;
	const days = [];
	days.push(forecastData.current);
	for (var i = 0; i < 3; i++) {
		days.push(forecastData.forecast.forecastday[i].hour[5]);
		days.push(forecastData.forecast.forecastday[i].hour[17]);
	}
	console.log(days)
	days.sort(compare)

	if (param === 1) {
		const labels = [];
		const data = [];
		labels.push("Today");
		data.push(days[0].humidity);
		for (var i = 1; i < 7; i++) {
			labels.push(new Date(days[i].time).toLocaleString());
			data.push(days[i].humidity);
		}
		return {
			labels: labels,
			datasets: [
				{
					data: data,
				},
			],
		};
	} else {
		const labels = [];
		const data = [];
		labels.push("Today");
		data.push(days[0].temp_c);
		for (var i = 1; i < 7; i++) {
			labels.push(new Date(days[i].time).toLocaleString());
			data.push(days[i].temp_c);
		}
		return {
			labels: labels,
			datasets: [
				{
					data: data,
				},
			],
		};
	}
}

function checkForAlerts(res) {
	if (res === {}) return;
	if (!("alerts" in res)) return;
	const alerts = res.alerts.alert;
	if (alerts.length === 0) return;
	const alertsToDisplay = alerts;
	// alerts.forEach((alert) => {
	// 	alertsToDisplay.push(
	// 		<Alert color="danger">
	// 			<strong>{alert.event}</strong>
	// 			<em>{alert.headline}</em>
	// 		</Alert>
	// 	);
	// });
	return alertsToDisplay;
}

const Index = (props) => {
	const [activeNav, setActiveNav] = useState(1); // 0 => Rain, 1 => Temp
	const [forecastData, setForecastData] = useState({});
	const [graphLoading, setGraphLoading] = useState(true);
	const [alerts, setAlerts] = useState([]);
	const [weatherImg, setWeatherImg] = useState("https://cdn.weatherapi.com/weather/64x64/day/113.png");

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

	if (window.Chart) {
		parseOptions(Chart, chartOptions());
	}

	const toggleNavs = (e, index) => {
		e.preventDefault();
		setActiveNav(index);
	};

	const [crop, setCrop] = useState("rice");
	const [chartLoading, setChartLoading] = useState(true);

	const [chart2Data, setChart2Data] = useState({
		labels: ["Nov 2021", "Dec 2021", "Jan 2021", "Feb 2021", "Mar 2021", "Apr 2021"],
		datasets: [
			{
				label: "Sales",
				data: [0, 0, 0, 0, 0, 0],
				maxBarThickness: 10,
			},
		],
	});

	const getPrice = async (date1, index) => {
		const years = [2009, 2010, 2011, 2012, 2013, 2014];
		const res = await axios.get(
			"https://price-predictor-api3.herokuapp.com/?item=" +
			crop +
			"&year=" +
			years[index] +
			"&month=" +
			date1.month
		);
		return res;
	};

	const getForecast = async () => {
		const res = await axios.get(
			`https://api.weatherapi.com/v1/forecast.json?key=a92290ec26e440c780a105938220910&q=auto:ip&days=4&alerts=yes`
		);
		return res;
	};

	useEffect(async () => {
		setGraphLoading(true);
		const data = await getForecast();
		setForecastData(data.data);
		// const alerts = checkForAlerts(data.data);
		// setAlerts(alerts);
		setGraphLoading(false);
		console.log(data.data.current.condition.icon);
		setWeatherImg("https:" + data.data.current.condition.icon);
	}, []);

	useEffect(async () => {
		setChartLoading(true);
		let dates = [];
		let labels = [];

		let currYear = new Date().getFullYear();
		let currMonth = new Date().getMonth() + 1;

		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		for (let i = 0; i < 6; i++) {
			let dateObj = {};
			dateObj.year = currYear;
			dateObj.month = currMonth;

			labels.push(months[currMonth - 1] + " " + currYear);
			dates.push(dateObj);

			if (currMonth == 12) currYear++;
			currMonth++;
			if (currMonth > 12) currMonth = 1;
		}

		let prices = [];

		for (let i = 0; i < dates.length; i++) {
			let date1 = dates[i];
			let price = await getPrice(date1, i);
			// console.log(price);
			prices.push(Math.round(price.data.price * 100) / 100);
		}

		let newChartData = {
			labels,
			datasets: [
				{
					label: "Sales",
					data: [25, 20, 30, 22, 17, 29],
					maxBarThickness: 10,
				},
			],
		};

		newChartData.datasets[0].data = prices;
		setChart2Data(newChartData);
		setChartLoading(false);
	}, [crop]);

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				<Row>
					<Col className="mb-5 mb-xl-0" xl="8">
						<Card className="bg-gradient-default shadow">
							<CardHeader className="bg-transparent">
								<Row className="align-items-center">
									<div className="col">
										<h6 className="text-uppercase text-light ls-1 mb-1">
											Overview <img src={weatherImg} width={25} height={25}></img>
										</h6>
										<h2 className="text-white mb-0">
											Expected {activeNav === 1 ? "Humidity" : "Temperature"}
										</h2>
									</div>
									<div className="col">
										<Nav className="justify-content-end" pills>
											<NavItem>
												<NavLink
													className={classnames("py-2 px-3", {
														active: activeNav === 1,
													})}
													href="#pablo"
													onClick={(e) => toggleNavs(e, 1)}
												>
													<span className="d-none d-md-block">Humidity</span>
													<span className="d-md-none">H</span>
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													className={classnames("py-2 px-3", {
														active: activeNav === 2,
													})}
													data-toggle="tab"
													href="#pablo"
													onClick={(e) => toggleNavs(e, 2)}
												>
													<span className="d-none d-md-block">Temperature</span>
													<span className="d-md-none">T</span>
												</NavLink>
											</NavItem>
										</Nav>
									</div>
								</Row>
							</CardHeader>
							<CardBody>
								{/* Chart */}
								<div className="chart">
									{graphLoading && <p>Fetching Location...</p>}
									{!graphLoading && (
										<Line
											data={returnForecast(activeNav, forecastData)}
											options={activeNav === 1 ? chartExample3.options : chartExample4.options}
											getDatasetAtEvent={(e) => console.log(e)}
										/>
									)}
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl="4">
						<Card className="shadow">
							<CardHeader className="bg-transparent">
								<Row className="align-items-center">
									<div className="col">
										<h6 className="text-uppercase text-muted ls-1 mb-1">Profits</h6>
										<div className="d-flex" style={{ justifyContent: "space-between" }}>
											<h2 className="mb-0">Predicted Prices</h2>
											<select
												name="crops"
												id="crops"
												onChange={(e) => {
													setCrop(e.target.value);
												}}
												style={{
													backgroundColor: "#fff",
													border: "1px solid #32325d",
													borderRadius: "5px",
													padding: "5px",
													fontWeight: "600",
													color: "#32325d",
												}}
											>
												<option value="rice">Rice</option>
												<option value="wheat">Wheat</option>
												<option value="bajra">Bajra</option>
												<option value="moong">Moong</option>
												<option value="jowar">Jowar</option>
												<option value="urad">Urad</option>
												<option value="maize">Maize</option>
											</select>
										</div>
									</div>
								</Row>
							</CardHeader>
							<CardBody>
								{/* Chart */}
								<div className="chart">
									{chartLoading && <p>Loading...</p>}
									{!chartLoading && <Bar data={chart2Data} options={chartExample2.options} />}
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<span className="mt-2">&nbsp;</span>
				<UncontrolledAlert color="success" >
					<span className="alert-inner--icon">
						<i className="ni ni-like-2" />
					</span>{" "}
					Best time to harvest <strong>Wheat</strong> has arrived (between October and November)
				</UncontrolledAlert>
				<UncontrolledAlert color="success" >
					<span className="alert-inner--icon">
						<i className="ni ni-like-2" />
					</span>{" "}
					Best time to harvest <strong>Moong</strong> has arrived (between February and March)
				</UncontrolledAlert>
				<UncontrolledAlert color="success" >
					<span className="alert-inner--icon">
						<i className="ni ni-like-2" />
					</span>{" "}
					Best time to harvest <strong>Rice</strong> has arrived (between November and December)
				</UncontrolledAlert>
				<UncontrolledAlert color="warning" >
					Prices of <strong>Bajra</strong> are expected to increase by <em>1.49 times</em> by February. <strong>Suggestion: Increase Inventory of Rice</strong>
				</UncontrolledAlert>
				<UncontrolledAlert color="warning" >
					Prices of <strong>Rice</strong> are expected to increase by <em>1.43 times</em> by March. <strong>Suggestion: Increase Inventory of Rice</strong>
				</UncontrolledAlert>
				<UncontrolledAlert color="warning" >
					Prices of <strong>Maize</strong> are expected to increase by <em>1.64 times</em> by February. <strong>Suggestion: Increase Inventory of Rice</strong>
				</UncontrolledAlert>
				{alerts &&
					alerts.map((alert, _index) => (
						<Alert color="danger" key={_index}>
							<strong>{alert.event}</strong>&nbsp;&nbsp;
							<em>{alert.desc}</em>
						</Alert>
					))}
				{!chartLoading && <Suggestions data={forecastData} />}
			</Container>
		</>
	);
};

function compare(a, b) {
	if (a.time < b.time) {
		return -1;
	}
	if (a.time > b.time) {
		return 1;
	}
	return 0;
}

export default Index;
