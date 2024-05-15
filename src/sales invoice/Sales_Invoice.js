import React, { useState } from "react";
import toast from "react-hot-toast";
import { CButton, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'react-date-picker/dist/DatePicker.css';
// import DatePicker from "react-date-picker";
import { axiosInstance } from "../api/AxiosInstance";

const Sales_Invoice = () => {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState([]);
  const [code, setCode] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState([]);
  //   const [showAddInputs, setShowAddInputs] = useState(false);

  // const totalAmount = () => {
  //   return value.reduce(
  //     (amount, item) => amount + parseFloat(item.amount || 0),
  //     0
  //   );
  // };

  const totalAmount = () => {
    const total = value.reduce(
      (amount, item) => amount + parseInt(item.amount || 0),
      0
    );
    return total.toLocaleString("en-US", { minimumFractionDigits: 0 });
  };

  const customerChange = (e) => {
    setCustomer(e.target.value);
  };

  const phoneChange = (e) => {
    setPhone(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const addressChange = (e) => {
    setAddress(e.target.value);
  };

  const addClick = () => {
    setValue((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        code: "",
        description: "",
        price: "",
        quantity: "",
        amount: "",
      },
    ]);
    // setShowAddInputs(true)
  };

  const addChange = (i, e) => {
    const { name, value } = e.target;

    switch (name) {
      case "code":
        setCode(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "quantity":
        setQuantity(value);
        break;
      case "total":
        setTotal(value);
        break;
    }

    console.log(e.target);
    setValue((prev) => {
      const updatedValue = prev.map((item, index) => {
        if (index === i) {
          let amount = 0;
          let price = 0;
          let quantity = 0;
          if (item.quantity && item.price) {
            amount = item.quantity * item.price;
          }

          if (name == "price") {
            amount = item.quantity * value;
          }
          if (name == "quantity") {
            amount = item.price * value;
          }

          return { ...item, [name]: value, amount: amount };
        }
        return item;
      });
      return updatedValue;
    });
  };

  const xClick = (id) => {
    setValue((prev) => {
      let newData = prev.filter((data) => data.id != id);
      return newData;
    });
  };

  const saveClick = async () => {
    const stockItems = value.map((item) => ({
      stock_code: item.code,
      stock_description: item.description,
      stock_price: item.price,
      stock_quantity: item.quantity,
    }));

    let saveData = await axiosInstance.post("/api/invoice/create", {
      customer_name: customer,
      customer_phone: phone,
      customer_email: email,
      customer_address: address,
      stock_data: stockItems,
      total_amount: totalAmount(),
    });

    toast.success(saveData.data.message);
    console.log(saveData);
    setCustomer("");
    setPhone("");
    setEmail("");
    setAddress("");
    // setShowAddInputs(false)
    // stock_code: code,
    // stock_description: description,
    // stock_price: price,
    // stock_quantity: quantity,
    // total_amount: total,
  };

  return (
    <>
      <div>
        <h5 className="sales_form_header">Sales Invoice</h5>

        <div id="sales_form_body">
          <form className="form_input_desigin">
            <CRow>
              <CCol lg="6">
                <CRow>
                  <CCol lg="2">
                    <CFormLabel>Customer</CFormLabel>
                  </CCol>
                  <CCol lg="7">
                    <CFormInput
                      className="form-control"
                      type="text"
                      value={customer}
                      onChange={customerChange}
                    />
                  </CCol>
                  <CCol lg="3"></CCol>
                </CRow>

                <CRow className="mt-4">
                  <CCol lg="2">
                    <CFormLabel className="col-form-label">Email</CFormLabel>
                  </CCol>
                  <CCol lg="7">
                    <CFormInput
                      className="form-control"
                      type="text"
                      value={email}
                      onChange={emailChange}
                    />
                  </CCol>
                  <CCol lg="3"></CCol>
                </CRow>
              </CCol>

              <CCol lg="6">
                <CRow style={{ marginRight: "50%" }}>
                  <CCol lg="2">
                    <CFormLabel>Phone</CFormLabel>
                  </CCol>
                  <CCol lg="7">
                    <CFormInput
                      className="form-control"
                      type="number"
                      value={phone}
                      onChange={phoneChange}
                    />
                  </CCol>
                  <CCol lg="3"></CCol>
                </CRow>

                <CRow className="mt-4">
                  <CCol lg="2">
                    <CFormLabel className="col-form-label">Address</CFormLabel>
                  </CCol>
                  <CCol lg="7">
                    <CFormInput
                      className="form-control"
                      type="text"
                      value={address}
                      onChange={addressChange}
                    />
                  </CCol>
                  <CCol lg="3"></CCol>
                </CRow>
              </CCol>
            </CRow>
          </form>
        </div>
      </div>

      <div className="stock_home">
        <h2>Stock List</h2>
        <CButton className="btn btn-success" onClick={addClick}>
          +Add
        </CButton>
      </div>

      {/* {showAddInputs ? <> */}
      <div style={{ margin: "2%" }}>
        <CRow>
          <CCol>
            <table className="table table-bordered table-striped">
              <thead className="table table-info">
                <tr>
                  <th className="text-center" width={80}>
                    Code
                  </th>
                  <th className="text-center" width={180}>
                    Description
                  </th>
                  <th className="text-center" width={190}>
                    Price
                  </th>
                  <th className="text-center" width={180}>
                    Quantity
                  </th>
                  <th className="text-center" width={180}>
                    Amount
                  </th>
                  <th className="text-center" width={10}>
                    Remove
                  </th>
                </tr>
              </thead>

              <tbody>
                {value.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={data.code}
                          onChange={(e) => addChange(i, e)}
                          name="code"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={data.description}
                          onChange={(e) => addChange(i, e)}
                          name="description"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control price"
                          value={data.price}
                          onChange={(e) => addChange(i, e)}
                          name="price"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={data.quantity}
                          onChange={(e) => addChange(i, e)}
                          name="quantity"
                        />
                      </td>
                      <td className="amount">
                        <span>
                          {data.amount.toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      </td>
                      <td>
                        <CButton
                          className="btn btn-sm btn-danger"
                          onClick={() => xClick(data.id)}
                        >
                          X
                        </CButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className="text-center" colSpan={5}>
                    <div className="text-center total">
                      Total Amount : {totalAmount()}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
            {/* <div className="total">
              <h3>Total</h3>&nbsp;&nbsp;
              <CFormInput
                type="text"
                className="form-control total"
                name="total"
                value={totalAmount()}
                readOnly
              ></CFormInput>
            </div> */}
          </CCol>
        </CRow>
      </div>

      <div className="save_buttom">
        <CRow>
          <CButton className="btn btn-success" onClick={saveClick}>
            Save
          </CButton>
        </CRow>
      </div>
      {/* </>: <StockList />} */}
    </>
  );
};

export default Sales_Invoice;
