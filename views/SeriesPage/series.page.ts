import { SeriesView } from "./SeriesView";
import { onPageLoad } from "./onPageLoad";
import { config } from "../../tab-utils/views/FullViewWrapper";

export default config({
  route: "/series",
  view: SeriesView,
  renderToDom: true,

  title: "Timer Series - Timer Tab",

  head: [
    '<meta name="keywords" content="timer series multiple sequences"/>',
    '<meta property="og:description" itemprop="description" name="description" content="Timer Series to create multiple timers and timer sequences." />',
  ],
  onPageLoad,
});
