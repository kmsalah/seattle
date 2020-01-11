import React from "react";
import styled from "@emotion/styled";
import BillCardGroup from "../components/BillCardGroup";
 import EventsFilter from "./EventsFilter";
import { getDateText } from "../components/SelectDateRange";
import { getCheckboxText } from "../components/SelectFilterOptions";
import { getSortText } from "../components/SelectSorting";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useFilter, { getSelectedOptions } from "../hooks/useFilter"; 
import { getAllEventMinutesItems} from "../api";

export const FiltersSection = styled.div({
  position: "sticky",
  top: "0",
  backgroundColor: "white",
  zIndex: "1",
  padding: "1em 0 2em",
  "> .ui.button": {
    marginBottom: "0.5em",
    "@media(max-width:500px)": {
      width: "100%"
    }
  }
});

export const ResultCount = styled.span({
  display: "block",
  color: "grey",
  marginBottom: "2em"
});

export const LoadingText = styled.span({
  color: "grey",
  fontWeight: "700",
  fontSize: "1.5em",
  marginTop: "1em",
});

export const Results = styled.div({
  paddingLeft: "1em"
});

const BillCardGroupContainer = ({ query }) => {
  const [initialGetBillsComplete, setInitialGetBillsComplete] = React.useState(false);
  const [filterBillsComplete, setFilterBillsComplete] = React.useState(true);
  const [visibleBills, setVisibleBills] = React.useState([]);
  const dateRangeFilter = useFilter({ start: '', end: '' }, 'Date', '', getDateText);
  const committeeFilter = useFilter({}, 'Committee', false, getCheckboxText);
  const sortFilter = useFilter({ by: '', order: '' }, 'Sort', '', getSortText);
  useDocumentTitle('Committee Events');

  React.useEffect(() => {
    //to prevent setting react state when the component is unmounted
    let didCancel = false;

    const fetchAllBills = async () => {
      const allBills= await getAllEventMinutesItems();
      if (!didCancel) {
        setVisibleBills(allBills);
        setInitialGetBillsComplete(true);
      }
    };

    fetchAllBills();
    return (() => {
      didCancel = true;
    });
  }, []);

  const prevCommitteeRef = React.useRef();
  const prevDateRangeRef = React.useRef();
  const prevSortRef = React.useRef();

  // handlePopupClose is a callback for when one of the FilterPopups in EventsFilter closes. 
  // It will perform filtering, depending on whether any of filter values have changed.
  /*
  const handlePopupClose = async () => {
    if (!committeeFilter.isSameValue(prevCommitteeRef.current) ||
      !dateRangeFilter.isSameValue(prevDateRangeRef.current) ||
      !sortFilter.isSameValue(prevSortRef.current)) {
      window.scroll(0, 0);
      setFilterEventsComplete(false);
      setVisibleEvents([]);
      const events = await getFilteredEvents(dateRangeFilter.value,
        getSelectedOptions(committeeFilter.value),
        sortFilter.value);
      setVisibleEvents(events);
      prevCommitteeRef.current = committeeFilter.value;
      prevDateRangeRef.current = dateRangeFilter.value;
      prevSortRef.current = sortFilter.value;
      setFilterEventsComplete(true);
    }
  }
*/
  return (
    <React.Fragment>
      <Results>
        {(!initialGetBillsComplete ) ? (
          <LoadingText>Loading...</LoadingText>
        ) : (
            <ResultCount>{visibleBills.length} results</ResultCount>
          )}
        <BillCardGroup bills={visibleBills} />
      </Results>
    </React.Fragment>
  );
};

export default BillCardGroupContainer;
