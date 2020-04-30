import React from "react";
import { FullView, MorePanel } from "../../tab-utils/views/FullViewWrapper";
import "./time-counter.css";
import { TimeCounterList } from "./TimeCounterList";

export { SeriesView };

function SeriesView() {
  return (
    <>
      <FullView>
        <Content />
      </FullView>
      <MorePanel>
        <div>Hello</div>
      </MorePanel>
    </>
  );
}

function Content() {
  if (typeof window === "undefined") {
    return null;
  }
  const time_counter_list = new TimeCounterList({ instanceKey: "multi" });
  return (
    <time_counter_list.view style={{ width: "100vw", minHeight: "100vh" }} />
  );
}
