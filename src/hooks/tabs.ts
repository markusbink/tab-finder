import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Helper from "../helpers/Helper";
import { AppState } from "../store/types";

const tabsSelector = (state: AppState) => state.tabs;

export const useTabs = () => useSelector(tabsSelector);

export const useFilteredTabs = (searchTerm: string) => {
  const tabs = useTabs();
  const [filteredTabs, setFilteredTabs] = useState(tabs);

  useEffect(() => {
    setFilteredTabs(Helper.filterTabsByTerm(tabs, searchTerm));
  }, [tabs, searchTerm, setFilteredTabs]);

  return filteredTabs;
};
