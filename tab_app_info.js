import logoUrl from "./logo.svg";
import assert from "@brillout/assert";

import React from "react";

export const tab_app_name = "Timer Tab";
export const tab_app_url = "https://www.timer-tab.com";
export const tab_app_source_code = "https://github.com/brillout/timer-tab";
export const tab_app_mail = compute_mail("timertab");
export const tab_app_logo = logoUrl;
export const tab_app_google_analytics_id = "UA-5263303-6";
export const tab_app_google_analytics_id_2 = "a5263303w24659437p23108626";
export const tab_app_google_adsense = "ca-pub-9219370515525286";
export const tab_app_header_links = [
  /*
  { link_url: "/history", link_name: "History" },
  */
  {
    link_url: "https://www.clocktab.com",
    link_name: "Clock Tab",
    link_target: "_blank",
  },
];
export const TabAppRoadmap = () => (
  <>
    <li>Time Tracker app.</li>
    <li>Pomodoro Timer app.</li>
    <li>Support multiple timers.</li>
    <li>Timer history.</li>
    <li>Improved load performance.</li>
    <li>Offline support.</li>
  </>
);

function compute_mail(mail_user) {
  const at = String.fromCharCode(2 * 32);
  // fuck-spam-crawlers@brillout.com
  const mail = mail_user + at + "brillout" + "." + "com";
  assert(at === "@");
  return mail;
}
