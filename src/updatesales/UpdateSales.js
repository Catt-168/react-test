import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CButton, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'react-date-picker/dist/DatePicker.css';
// import DatePicker from "react-date-picker";
import { axiosInstance } from "../api/AxiosInstance";
import { useParams } from "react-router";

const UpdateSales = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState([]);
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [code, setCode] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState([]);

  const totalAmount = () => {
    const total = value.reduce(
      (amount, item) => amount + parseInt(item.amount || 0),
      0
    );
    return total.toLocaleString("en-US", { minimumFractionDigits: 0 });
  };

  // const totalAmount = () => {
  //   return value.reduce(
  //     (amount, item) => amount + parseFloat(item.amount || 0),
  //     0
  //   );
  // };

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/api/invoice/edit/${id}`);
      if (res.status == 200) {
        const {
          customer_name,
          customer_phone,
          customer_email,
          customer_address,
          stock_items,
          invoice_id,
          invoice_no,
        } = res.data.data;
        setInvoiceId(invoice_id);
        setInvoiceNo(invoice_no);
        setCustomer(customer_name);
        setPhone(customer_phone);
        setEmail(customer_email);
        setAddress(customer_address);
        setValue(
          stock_items.map((item) => ({
            stockId: item.stock_id,
            code: item.stock_code,
            description: item.stock_description,
            price: item.stock_price,
            quantity: item.stock_quantity,
            amount: item.stock_price * item.stock_quantity,
          }))
        );
        console.log(res.data.data);
      }
    };
    console.log(fetchData);
    fetchData();
  }, [id]);

  const updateClick = async (invoice_id) => {
    const stockItems = value.map((item) => ({
      stock_id: item.stockId,
      stock_code: item.code,
      stock_description: item.description,
      stock_price: item.price,
      stock_quantity: item.quantity,
    }));

    // console.log(stockItems);

    let updateData = await axiosInstance.put(`/api/invoice/edit/${invoiceId}`, {
      invoice_id: invoiceId,
      invoice_no: invoiceNo,
      customer_name: customer,
      customer_phone: phone,
      customer_email: email,
      customer_address: address,
      stock_data: stockItems,
      total_amount: totalAmount(),
    });
    toast.success(updateData.data.message);
    console.log(updateData);
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

  const xClick = (stockId) => {
    setValue((prev) => {
      let newData = prev.filter((data) => data.stockId !== stockId);
      console.log(newData);
      return newData;
    });
  };

  return (
    <>
      <a href="/salesinvoicelist" className="link">
        Sales Invoice List
      </a>
      <div>
        <h5 className="sales_form_header">Sales Invoice Update</h5>

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
                <CRow>
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
        <h5>Stock List</h5>
        <CButton className="btn btn-success" onClick={addClick}>
          +Add
        </CButton>
      </div>

      <div style={{ margin: "2%" }}>
        <CRow className="mt-3">
          <CCol>
            <table className="stock_body table table-bordered table-striped">
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
                  <th className="text-center" width={110}>
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
                          onClick={() => xClick(data.stockId)}
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
                className="form-control"
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
          <CButton className="btn btn-sm btn-primary" onClick={updateClick}>
            Update
          </CButton>
        </CRow>
      </div>
    </>
  );
};

export default UpdateSales;
