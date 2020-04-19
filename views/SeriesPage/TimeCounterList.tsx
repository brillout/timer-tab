import React, { useState, useEffect } from "react";
import { persist } from "./utils/persist";
import assert from "@brillout/assert";
import { reactiveView } from "./reactiveView";

export { TimeCounterList };

@persist({
  key: "timer_tab-time_counter_list",
  deserializer: function (data) {
    const counters = data.map((time_counter_data) => {
      let { counter_target, counter_id } = time_counter_data;
      counter_target = new Date(counter_target);
      const counter = new TimeCounter({ counter_target, counter_id });
      return counter;
    });
    this.set_counter_list(counters);
  },
  serializer: function () {
    const data = this.counter_list.map((counter: TimeCounter) => ({
      counter_id: counter.counter_id,
      counter_target: counter.counter_target,
    }));
    return data;
  },
})
@reactiveView
class TimeCounterList {
  time_counter_creator: TimeCounterCreator = new TimeCounterCreator(this);
  counter_list: TimeCounter[];
  set_counter_list(counters: TimeCounter[]) {
    this.counter_list = counters;
  }
  add_new_time_counter(time_counter: TimeCounter) {
    this.counter_list.push(time_counter);
    // @ts-ignore
    this.save();
  }
  view(props) {
    const getTime = () => new Date();
    const [time, updateView] = useState(getTime());
    useEffect(() => {
      setTimeout(() => updateView(getTime()), 300);
    });
    return (
      <Center {...props}>
        <div id="time-counter-list">
          {this.counter_list.map((time_counter) => time_counter.view({ time }))}
          <this.time_counter_creator.view />
        </div>
      </Center>
    );
  }
}

class TimeCounter {
  counter_target: Date;
  counter_id: number;
  constructor({ counter_target, counter_id }) {
    assert(counter_target);
    assert(counter_id);
    this.counter_target = counter_target;
    this.counter_id = counter_id;
  }
  render_data({ time }) {
    const ms = this.counter_target.getTime() - time.getTime();
    return (ms / 1000) | 0;
  }
  view({ time }) {
    return (
      <div className="time-counter glass-background" key={this.counter_id}>
        <div>{this.counter_id}</div>
        <div>{this.render_data({ time })}</div>
      </div>
    );
  }
}

@reactiveView
class TimeCounterCreator {
  selected_timer_type = null;
  #time_counter_list: TimeCounterList;
  constructor(time_counter_list: TimeCounterList) {
    this.#time_counter_list = time_counter_list;
  }
  view() {
    const content = (this.selected_timer_type === null && (
      <>
        <div onClick={() => (this.selected_timer_type = "countdown")}>
          New Countdown
        </div>
        <div onClick={() => (this.selected_timer_type = "alarm")}>
          New Alarm Clock
        </div>
        <div onClick={() => this.create_new_stopwatch()}>New Stopwatch</div>
      </>
    )) ||
      (this.selected_timer_type === "countdown" && <div>New CT</div>) || (
        <div>New AC</div>
      );
    return (
      <div id="time-counter-creator" className="time-counter glass-background">
        {content}
      </div>
    );
  }
  create_new_stopwatch() {
    const counter_id = (Math.random() * 1000000) | 0;
    const counter_target = new Date();
    const time_counter = new TimeCounter({ counter_target, counter_id });
    this.#time_counter_list.add_new_time_counter(time_counter);
  }
}

function Center({ style, ...props }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      {...props}
    ></div>
  );
}
