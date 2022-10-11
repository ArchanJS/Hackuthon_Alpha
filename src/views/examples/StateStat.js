
import {
  Form,
  Badge,
  Card,
  CardHeader,
  Label,
  Media,
  Table,
  Container,
  Row,
  FormGroup,
  Input,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import statedata from "./data";
const StateStat = () => {
  const [items, setItems] = useState([]);

  console.log(items);

  const [currentLocation, setCurrentLocation] = useState("");
  const [mapData, setMapData] = useState([]);
  function getCoordintes() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
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

  function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
    xhr.open(
      "GET",
      "https://us1.locationiq.com/v1/reverse.php?key=pk.88d13b07059d6caa7b9d528ca18b5caa&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var city = response.address.city;
        setCurrentLocation(response.address.state);
        //         var newArray = statedata.filter(function (el) {
        //   return el.State_Name=="West Bengal";
        // });
        // console.log(newArray);

        var result = statedata.filter((obj) => obj.State_Name == "West Bengal");
        setMapData(result);
        return;
      }
    }
  }
  useEffect(() => {
    getCoordintes();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0"></h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">State Name</th>
                    <th scope="col">Season</th>
                    <th scope="col">Crop</th>
                    <th scope="col">Area</th>
                    <th scope="col">Production</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {mapData.map((item) => {
                    return (
                      <tr>
                      <td>{item.State_Name}</td>
                      <td>{item.Season}</td>
                      <td>{item.Crop}</td>
                      <td>{item.Area}</td>
                      <td>{item.Production}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default StateStat;
