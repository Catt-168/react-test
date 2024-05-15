import React from "react";
import Sales_Invoice from "./sales invoice/Sales_Invoice";
import StockLists from "./stocklist/StockLists";

const Sales_Invoice  = React.lazy(() => import('./src/sales invoice/Sales_Invoice'));
const StockLists  = React.lazy(() => import('./src/stocklists/StockLists'));

const routes = [
    { path: '/salesinvoice', name: 'Sales Invoice', component: Sales_Invoice },
    { path: '/stocklists', name: 'Stock Lists', component: StockLists },
];

export default routes;