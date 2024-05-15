import { CButton, CFormInput } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import "react-responsive-pagination/themes/minimal.css";
import { Pagination } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import Cookies from "js-cookie";

const SalesInvoiceList = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [importFile, setImportFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(10);
  const [totalRow, setTotalRow] = useState(0);

  const selectedChange = (e) => {
    setSelected(e.target.value);
    console.log("select pagination");
  };

  useEffect(() => {
    const searchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/invoice/list?search=${search}&page=${page}`
        );
        console.log("INVOICE RESPONSE", response.data);
        if (response.status === 200) {
          setList(response.data.data);
          setTotalPage(response.data.lastPage); //lastPage is backend field Name
          setTotalRow(response.data.totalItems); //totalItems is backend field Name
        } else {
          throw new Error("Request Failed");
        }
      } catch (error) {
        console.error("Error:", error.response);
      }
    };
    searchData();
  }, [search, page]);

  const showClick = async (invoice_id) => {
    navigate(`/details/${invoice_id}`);
  };

  const editClick = async (id) => {
    navigate(`/updateSaleInvoice/${id}`);
  };

  const deleteClick = async (invoice_id) => {
    const deleteData = await axiosInstance.delete(
      `api/invoice/delete/${invoice_id}`
    );
    toast.success(deleteData.data.message);
    window.location.reload();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // const uploadClick = async () => {
  //   const uploadData = await axiosInstance.post(`/api/invoice/importcsv`);
  //   console.log(uploadData);
  // };

  const uploadClick = async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        `/api/invoice/importcsv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fileChange = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setImportFile(e.target.result);
        };
      } else {
        setTypeError("Please Select only Your Excel File");
        setImportFile(null);
      }
    } else {
      console.log("please select your file");
    }
  };

  return (
    <>
      <div className="saleinvoice_list_body">
        <div className="list_header">
          <h5 className="list_one">Sales Invoice List</h5>
          <div style={{ marginTop: "3%" }}>
            <a
              href="https://crudinvoicepostgresql.onrender.com/api/invoice/exportcsv"
              className="btn btn-success"
            >
              Export
            </a>
          </div>
          &nbsp;&nbsp;
          <div style={{ marginTop: "3%" }}>
            <CButton className="btn btn-info" onClick={() => setVisible(true)}>
              Import
            </CButton>
          </div>
          <CFormInput
            style={{ width: "30%" }}
            className="list_two"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>

        <div className="tb_style">
          <p style={{ marginRight: "89%" }}>Total Count : {totalRow}</p>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="text-center" width={60}>
                  No.
                </th>
                <th className="text-center" width={110}>
                  Invoice No.
                </th>
                <th className="text-center" width={110}>
                  Customer
                </th>
                <th className="text-center" width={110}>
                  Phone
                </th>
                <th className="text-center" width={110}>
                  Email
                </th>
                <th className="text-center" width={140}>
                  Address
                </th>
                <th className="text-center" width={110}>
                  Code
                </th>
                <th className="text-center" width={110}>
                  Price
                </th>
                <th className="text-center" width={110}>
                  Quantity
                </th>
                <th className="text-center" width={100} colSpan={3}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((data, index) => (
                <tr key={index}>
                  <td>{data.custom_id}</td>
                  <td>{data.invoice_no}</td>
                  <td>{data.customer_name}</td>
                  <td>{data.customer_phone}</td>
                  <td>{data.customer_email}</td>
                  <td>{data.customer_address}</td>
                  <td>
                    {data.stock_items.map((item) => item.stock_code).join(", ")}
                  </td>
                  <td>
                    {data.stock_items

                      .map((item) => item.stock_price)
                      .join(", ")}
                  </td>
                  <td>
                    {data.stock_items
                      .map((item) => item.stock_quantity)
                      .join(", ")}
                  </td>
                  <td>
                    <CButton
                      className="btn btn-sm btn-success"
                      onClick={() => showClick(data.invoice_id)}
                    >
                      Show
                    </CButton>
                    &nbsp;
                    <CButton
                      className="btn btn-sm btn-warning"
                      onClick={() => editClick(data.invoice_id)}
                    >
                      Edit
                    </CButton>
                    &nbsp;
                    <CButton
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteClick(data.invoice_id)}
                    >
                      Delete
                    </CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <select
              value={selected}
              onChange={selectedChange}
              className="pagination-body"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
            </select>

            <Pagination className="justify-content-center">
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
              />
              {[...Array(totalPage)].map((_, index) => {
                // Show only a subset of pages around the current page
                const lowerBound = Math.max(page - 2, 1);
                const upperBound = Math.min(page + 2, totalPage);

                // Render ellipsis if necessary
                if (
                  (index + 1 < lowerBound && lowerBound > 2) ||
                  (index + 1 > upperBound && upperBound < totalPage - 1)
                ) {
                  return null; // Render nothing
                }

                // Render page numbers
                if (
                  index + 1 === 1 ||
                  index + 1 === totalPage ||
                  index + 1 === page ||
                  (index + 1 >= lowerBound && index + 1 <= upperBound)
                ) {
                  return (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === page}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  );
                }

                // Render ellipsis
                if (
                  (index + 1 === lowerBound - 1 && lowerBound > 2) ||
                  (index + 1 === upperBound + 1 && upperBound < totalPage - 1)
                ) {
                  return <Pagination.Ellipsis key={`ellipsis-${index}`} />;
                }

                return null; // Render nothing
              })}
              <Pagination.Next
                onClick={() => handlePageChange(Math.min(page + 1, totalPage))}
                disabled={page === totalPage}
              />
              <Pagination.Last onClick={() => handlePageChange(totalPage)} />
            </Pagination>
          </div>
        </div>
      </div>

      <Dialog
        header="Upload File"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50%", backgroundColor: "gray" }}
      >
        <div style={{ margin: "2%" }}>
          <h4 className="mt-2">Upload & Excel Import</h4>
          <form>
            <CFormInput
              type="file"
              className="form-control mt-2"
              required
              onChange={fileChange}
              id="fileInput"
              accept=".csv,.xlsx"
            ></CFormInput>
            <CButton
              className="btn btn-primary btn-md mt-2"
              onClick={uploadClick}
            >
              Upload
            </CButton>
            {typeError && (
              <div className="alert alert-danger" role="alert">
                {typeError}
              </div>
            )}
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default SalesInvoiceList;
