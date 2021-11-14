let APIURL = "";
switch (window.location.hostname) {
	//this is the local hgost name of your react app
	case "localhost":
	case "127.0.0.01":
		APIURL = "http://localhost:3001";
		break;
	case "gillnet-app.herokuapp.com":
		APIURL = "https://gillnet.herokuapp.com/";
}
// Hello?
export default APIURL;
