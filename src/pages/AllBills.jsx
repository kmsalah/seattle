import React from "react";
import { Container } from "semantic-ui-react";
import styled from "@emotion/styled";
import AllBills from "../containers/AllBills";

const Layout = styled(Container)({
  minHeight: "100vh"
});

const ContentContainer = styled(Container)({
  marginTop: "2em !important",
  marginBottom: "5em !important"
});

const AllBillsPage = () => {
  return (
    <Layout>
      <ContentContainer>
        <h2>All Bills</h2>
        <AllBills />
      </ContentContainer>
    </Layout>
  );
};

export default AllBillsPage;
