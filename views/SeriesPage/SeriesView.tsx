import React, { useState, useEffect } from "react";
import { FullView, MorePanel } from "../../tab-utils/views/FullViewWrapper";
import "./time-counter.css";
import assert from "@brillout/assert";

export { SeriesView };

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
      <div className="time-counter" key={this.counter_id}>
        <div>{this.counter_id}</div>
        <div>{this.render_data({ time })}</div>
      </div>
    );
  }
}

/*
const future_time = (seconds) =>
  new Date(new Date().getTime() + 1000 * seconds);
time_counter_list.add_time_counter(
  new TimeCounter({ counter_target: future_time(60), counter_id: 31 })
);
time_counter_list.add_time_counter(
  new TimeCounter({ counter_target: future_time(10), counter_id: 3 })
);
*/

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
      (() => {
        const getTime = () => new Date();
        const [time, updateView] = useState(getTime());
        useEffect(() => {
          setTimeout(() => updateView(getTime()), 300);
        });
        return (
          <div className="#time-counter-list">
            {this.counter_list.map((time_counter) =>
              time_counter.view({ time })
            )}
            <div className="#time-counter-creator">
              <form onSubmit={this.onSubmit.bind(this)}>
                <button type="submit">New Stopwatch</button>
              </form>
            </div>
          </div>
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

function persist({ key, serializer, deserializer }) {
  return function <T extends { new (...args: any[]): {} }>(cls: T) {
    return class extends cls {
      constructor(...args) {
        super(...args);
        deserialize(this);
      }
      save() {
        serialize(this);
      }
    };
  };

  function serialize(instance) {
    const data = serializer(instance);
    assert(
      data.every((d) => d.counter_id && d.counter_target),
      data
    );
    window.localStorage[key] = JSON.stringify(data);
  }

  function deserialize(instance) {
    let data;
    const data__str = window.localStorage[key];
    if (data__str) {
      data = JSON.parse(data__str);
    } else {
      data = [];
    }
    deserializer(data, instance);
  }
}

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
  const time_counter_list = new TimeCounterList();
  return <time_counter_list.view />;
}
