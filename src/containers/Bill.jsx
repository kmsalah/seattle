import React from "react";
import { getBillById } from "../api";
import { Loader } from "semantic-ui-react";
import Bill from "../components/Bill";
import useDocumentTitle from "../hooks/useDocumentTitle";
import getDateTime from "../utils/getDateTime";

const BillContainer = ({ id, query, videoTimePoint }) => {
  const [bill, setBill] = React.useState();
  useDocumentTitle(bill ? `${bill.name} - ${getDateTime(bill.date)}` : 'Loading...');

  React.useEffect(() => {
    try {
      (async () => {
        const billData = await getBillById(id);
        setBill(billData);
      })();
    } catch (e) {
      // log error and display message
    }
  }, [id]);

  return bill ? (
    <Bill
      id={id}
      name={bill.name}
      matter={bill.matter}
      decision={bill.decision}
      event_id={bill.event_id}
    />
  ) : <Loader active/>;
};

export default BillContainer;
