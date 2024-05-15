// import { CButton, CFormInput } from "@coreui/react";
// import { useState } from "react";
// import * as XLSX from "xlsx";

// export default function ExcelImport() {
//   const [showImportInput, setShowImportInput] = useState(false);
//   const [importedData, setImportedData] = useState([]);
//   const [importError, setImportError] = useState(null);
//   const [importing, setImporting] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = (event) => {
//       try {
//         setImporting(true);
//         const workbook = XLSX.read(event.target?.result, {
//           type: "binary",
//         });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const sheetData = XLSX.utils.sheet_to_json(sheet);
//         setImportedData(sheetData);
//         setImportError(null);
//       } catch (error) {
//         setImportError("Error importing data. Please try again.");
//         console.error(error);
//       } finally {
//         setImporting(false);
//       }
//     };

//     reader.readAsBinaryString(file);
//   };

//   async function importExcelData() {
//     setIsLoading(true);
//     try {
//       // Your import logic here
//       // For simplicity, I'm not including the axios call
//     } catch (error) {
//       // Error handling
//     } finally {
//       setTimeout(() => {
//         setIsLoading(false);
//         setShowImportInput(false);
//         window.location.assign("/");
//       }, 2000);
//     }
//   }

//   return (
//     <>
//       <CButton onClick={() => setShowImportInput(true)}>Import Excel</CButton>
//       {showImportInput && (
//         <div className="overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h2>
//                 {importedData.length
//                   ? "Your Excel Data Preview"
//                   : "Upload your excel file"}
//               </h2>
//             </div>
//             <div className="modal-body">
//               {importedData.length ? (
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       {importedData.length > 0 &&
//                         Object.keys(importedData[0]).map((key) => (
//                           <th key={key}>{key}</th>
//                         ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {importedData.map((row, rowIndex) => (
//                       <tr key={rowIndex}>
//                         {Object.values(row).map((value, columnIndex) => (
//                           <td key={columnIndex}>{value}</td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 // <input
//                 //   type="file"
//                 //   accept=".xlsx,.xls"
//                 //   onChange={handleFileUpload}
//                 // />
//                 <CFormInput
//                   style={{ width: "30%" }}
//                   className="list_two"
//                   type="file"
//                   accept=".xlsx,.xls"
//                   onChange={handleFileUpload}
//                 />
//               )}
//               {importError && <p className="error">{importError}</p>}
//             </div>
//             <div className="modal-footer">
//               <CButton
//                 onClick={() => {
//                   setShowImportInput(false);
//                   setImportedData([]);
//                 }}
//                 disabled={importing}
//               >
//                 Cancel
//               </CButton>
//               <CButton
//                 disabled={!importedData.length || importing || isLoading}
//                 onClick={importExcelData}
//               >
//                 Import
//               </CButton>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
