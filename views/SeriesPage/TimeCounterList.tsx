import assert from "@brillout/assert";
import React, { useState, useEffect } from "react";
import { persist, ID } from "./utils/persist";
import { reactiveView } from "./reactiveView";

export { TimeCounterList };

abstract class TimeCounter {
  view({ time }: { time: Date }): JSX.Element {
    return <div>{time}I'm asbtract</div>;
  }
}

@persist({
  counter_target: Date,
  counter_id: ID,
})
class Stopwatch extends TimeCounter {
  counter_target: Date;
  counter_id: string;
  constructor({ counter_target }) {
    super();
    this.counter_target = counter_target;
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

@persist({
  minutes: Number,
  title: String,
  counter_id: ID,
  is_playing: Boolean,
  start_time: Date,
})
class Countdown {
  counter_id: string;
  title: string = "";
  minutes: number;
  is_playing: boolean = false;
  start_time: Date = null;
  constructor({ title, minutes }) {
    this.title = title;
    this.minutes = minutes;
  }
  view({ time }) {
    const header = <div>{this.title + " " + this.counter_id}</div>;

    let content: JSX.Element;
    if (!this.is_playing) {
      content = (
        <button type="button" onClick={this.onStart.bind(this)}>
          Start
        </button>
      );
    } else {
      const ms =
        this.start_time.getTime() + this.minutes * 60 * 1000 - time.getTime();
      const seconds = (ms / 1000) | 0;
      content = (
        <>
          <div>{seconds}</div>
          <button type="button" onClick={this.onStop.bind(this)}>
            Stop
          </button>
        </>
      );
    }
    return (
      <div className="time-counter glass-background" key={this.counter_id}>
        {header}
        {content}
      </div>
    );
  }
  onStart() {
    this.is_playing = true;
    this.start_time = new Date();
  }
  onStop() {
    this.is_playing = false;
  }
}

@persist({
  list_id: ID,
  counter_list: [TimeCounter],
})
@reactiveView
class TimeCounterList {
  list_id: string;
  time_counter_creator: MultiCreator = new MultiCreator(this);
  countdown_creator: CountdownCreator = new CountdownCreator(this);
  counter_list: TimeCounter[] = [];
  set_counter_list(counters: TimeCounter[]) {
    this.counter_list = counters;
  }
  add_time_counter(time_counter: TimeCounter) {
    this.counter_list.push(time_counter);
    // @ts-ignore
    this.save();
  }
  add_new_countdown({ minutes, title }: { minutes: number; title: string }) {
    const time_counter = new Countdown({ minutes, title });
    this.add_time_counter(time_counter);
  }
  view(props: any) {
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
          <this.countdown_creator.view />
        </div>
      </Center>
    );
  }
}

@reactiveView
class CountdownCreator {
  minutes: number;
  title: string = null;
  #time_counter_list: TimeCounterList;
  constructor(time_counter_list: TimeCounterList) {
    this.#time_counter_list = time_counter_list;
  }
  view() {
    return (
      <form
        onSubmit={this.onSubmit.bind(this)}
        className="time-counter glass-background"
      >
        <Input type={Number} stateProp="minutes" stateObject={this} />
        <button type="submit">Add Timer</button>
      </form>
    );
  }
  onSubmit(ev) {
    ev.preventDefault();
    const { minutes, title } = this;
    this.#time_counter_list.add_new_countdown({ minutes, title });
  }
}

function Input({ type, stateProp, stateObject }) {
  return (
    <input
      type="text"
      value={stateObject[stateProp]}
      onChange={(ev) => {
        let val = ev.target.value;
        if (type === Number) {
          val = parseInt(val, 10);
        }
        stateObject[stateProp] = val;
      }}
    ></input>
  );
}

@reactiveView
class MultiCreator {
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
    return <div className="time-counter glass-background">{content}</div>;
  }
  create_new_stopwatch() {
    const counter_target = new Date();
    const time_counter = new Stopwatch({ counter_target });
    assert(time_counter.counter_id);
    this.#time_counter_list.add_time_counter(time_counter);
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
