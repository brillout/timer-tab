import React, {useState, useEffect} from 'react';
import {FullView, MorePanel} from '../../tab-utils/views/FullViewWrapper';

export {SeriesView};

class TimeCounter {
    #target_time: Date;
    #counter_id: number;
    constructor({target_time, counter_id}) {
        this.#target_time = target_time;
        this.#counter_id = counter_id;
    }
    render_data({time}) {
        const ms = this.#target_time.getTime() - time.getTime();
        return (ms/1000)|0;
    }
    view({time}) {
        return <div>
            <div>{this.#counter_id}</div>
            <div>{
                this.render_data({time})
            }</div>
        </div>;
    }
}

class TimeCounterList{
  #counter_list: TimeCounter[] = [];
  #view;
  add(time_counter: TimeCounter) {
      this.#counter_list.push(time_counter);
  }
  get view() {
    return this.#view = this.#view || (() => {
        const getTime = () => new Date();
      const [time, updateView] = useState(getTime());
      useEffect(() => {setTimeout(() => updateView(getTime()), 300)});
      return <>
        {this.#counter_list.map(time_counter => time_counter.view({time}))}
      </>;
    });
}
}

const time_counter_list = new TimeCounterList();
const future_time = seconds => new Date(new Date().getTime()+1000*seconds);
time_counter_list.add(new TimeCounter({target_time: future_time(60), counter_id: 31}));
time_counter_list.add(new TimeCounter({target_time: future_time(10), counter_id: 3}));

function SeriesView() {
    return <>
        <FullView>
            <time_counter_list.view />
        </FullView>
        <MorePanel>
        <div>Hello</div>
        </MorePanel>
    </>;
}
