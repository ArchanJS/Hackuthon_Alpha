import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import AdminLayout from "layouts/Admin";

import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";

function App() {
	const [r, setR] = useState(false);
	const [userType, setUserType] = useState("farmer");

	const refresh = () => {
		setR(!r);
	};


	return (
		<BrowserRouter>
			<ReactNotification />
			<Switch>
				<Route path="/farmer" render={(props) => <AdminLayout {...props} refresh={refresh} />} />
				<Route>
					<Redirect to="/farmer/index" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
