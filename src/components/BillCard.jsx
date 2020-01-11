import React from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import styled from "@emotion/styled";
import getDateTime from "../utils/getDateTime";

const StyledCard = styled(Card)({
  boxShadow: "none !important"
});

const StyledCardContent = styled(Card.Content)({
  padding: "0 !important"
});

const BillCard = ({id, name, matter, created, link, }) => {
  const getLinkParameters = () => {
    // Shorten whitespaces to one whitespace
    const linkParameters = {
      // For search parameter, replace whitespaces with `+`
      pathname: link,
    }
    return linkParameters;
  }

  return (
    <StyledCard fluid>
      <StyledCardContent>
        <Card.Header>
          <Link to={getLinkParameters()}>
            {name}
          </Link>
        </Card.Header>
        <Card.Meta>{getDateTime(created)}</Card.Meta>
      </StyledCardContent>
    </StyledCard >
  )
};

export default BillCard;
