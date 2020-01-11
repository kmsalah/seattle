import React from "react";
import Bill from "../containers/Bill";
import { Container } from "semantic-ui-react";
import styled from "@emotion/styled";
import queryString from "query-string";

const Layout = styled(Container)({
  minHeight: "100vh"
});

const ContentContainer = styled(Container)({
  marginTop: "2em !important",
  marginBottom: "5em !important"
});

const BillPage = ({ match, location }) => {
  // The query parameters in the URL
  const { q, t } = queryString.parse(location.search);

  const parseQuery = () => {
    // Get the search transcript query
    let query = q ? q.trim().replace(/\+/g, ' ') : '';
    if (location.state) {
      query = location.state.query || query;
    }
    return query;
  }

  return (
    <Layout>
      <ContentContainer>
        <Bill
          id={match.params.id}
          query={parseQuery()}
          />
      </ContentContainer>
    </Layout>
  );
};

export default BillPage;
