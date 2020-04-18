import React, { useState, useEffect } from "react";
import { persist } from "./utils/persist";
import assert from "@brillout/assert";

export { TimeCounterList };

@persist({
  key: "timer_tab-time_counter_list",
  deserializer: (data, time_counter_list) => {
    data.forEach((time_counter_data) => {
      let { counter_target, counter_id } = time_counter_data;
      counter_target = new Date(counter_target);
      const time_counter = new TimeCounter({ counter_target, counter_id });
      time_counter_list.counter_list.push(time_counter);
    });
  },
  serializer: (time_counter_list) =>
    time_counter_list.counter_list.map((time_counter: TimeCounter) => ({
      counter_id: time_counter.counter_id,
      counter_target: time_counter.counter_target,
    })),
})
class TimeCounterList {
  counter_list: TimeCounter[] = [];
  #view;
  add_time_counter(time_counter: TimeCounter) {
    this.counter_list.push(time_counter);
    // @ts-ignore
    this.save();
  }
  get view() {
    return (this.#view =
      this.#view ||
      ((props) => {
        const getTime = () => new Date();
        const [time, updateView] = useState(getTime());
        useEffect(() => {
          setTimeout(() => updateView(getTime()), 300);
        });
        return (
          <Center {...props}>
            <div id="time-counter-list">
              {this.counter_list.map((time_counter) =>
                time_counter.view({ time })
              )}
              <div id="time-counter-creator">
                <form onSubmit={this.onSubmit.bind(this)}>
                  <button type="submit">New Stopwatch</button>
                </form>
              </div>
            </div>
          </Center>
        );
      }));
  }
  onSubmit(ev) {
    ev.preventDefault();
    console.log("sub", this);
    const counter_id = (Math.random() * 1000000) | 0;
    const counter_target = new Date();
    const time_counter = new TimeCounter({ counter_target, counter_id });
    this.add_time_counter(time_counter);
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
