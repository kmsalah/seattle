import React from "react";
import BillCard from "./BillCard";
import { Card } from "semantic-ui-react";

const BillCardGroup = ({ bills, query }) => {
  return (
    <Card.Group centered>
      {bills.map(({id, name, matter, created, link}) => (
        <BillCard
          key={id}
          id={id}
          name={name}
          matter={matter ? matter : "matter"}
          created={created}
          link={`/bills/${id}`}
          query={query}
        />
      ))}
    </Card.Group>
  );
};

export default React.memo(BillCardGroup);