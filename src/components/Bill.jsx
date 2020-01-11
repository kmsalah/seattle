import React from "react";

import styled from "@emotion/styled";

const StyledEvent = styled.div({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between"
});

const Header = styled.div({
  width: "100%",
  margin: "1em 0"
});

const Event = ({
  id,
  name,
  matter,
  decision,
  event_id,

}) => {
  
  return (
    <StyledEvent>
      <Header>
        <h1>minutes_item_id: {id}</h1>
      </Header>
        <h2>minutes_item name: {name}</h2>
        <h2>minutes_item matter: {matter}</h2>
        <h2>event_id: {event_id}</h2>
    </StyledEvent>
  );
};

export default Event;
