import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sales_Invoice from "./sales invoice/Sales_Invoice";
import SalesInvoiceList from "./salesinvoicelist/SalesInvoiceList";
import { Toaster } from "react-hot-toast";
import UpdateSales from "./updatesales/UpdateSales";
import Detail from "./detail/Detail";
import Login from "./login/Login";

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sales_Invoice />} />
          <Route path="/salesinvoice" element={<Sales_Invoice />} />
          <Route path="/salesinvoicelist" element={<SalesInvoiceList />} />
          <Route path="/updateSaleInvoice/:id" element={<UpdateSales />} />
          <Route path="/details/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
