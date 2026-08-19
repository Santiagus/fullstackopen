import ReactDOM from "react-dom/client";
import App from "./App";

let counter = 10;
ReactDOM.createRoot(document.getElementById("root")).render(
  <App counter={counter} />,
);
