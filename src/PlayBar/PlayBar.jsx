import React from 'react';
import faker from 'faker';
const [PREV, PLAY_PAUSE, NEXT] = [-1, 0, 1];

const SeekBar = () => {
  const [currentTime] = React.useState('0:00');
  const [totalTime] = React.useState('0:00');
  return (
    <div>
      <span>{currentTime}</span>
      <input type="range" />
      <span>{totalTime}</span>
    </div>
  );
};

let TRACKS = [1, 2, 3, 4, 5];
TRACKS = TRACKS.map((i) => {
  return {
    author: faker.name.firstName('female'),
    title: faker.name.title(),
    url: i,
  };
});

window.f = faker;

const MediaControls = () => {
  const [current, setCurrent] = React.useState(0);
  const change = (action) => {
    switch (action) {
      case PLAY_PAUSE:
        console.log(TRACKS);
        return;
      case NEXT:
        setCurrent((current + NEXT) % TRACKS.length);
        return;
      case PREV:
        setCurrent((current + PREV) % TRACKS.length);
        return;
    }
  };
  const i = current < 0 ? current * -1 : current;
  return (
    <>
      {JSON.stringify(TRACKS[i])}
      <div>
        <button onClick={() => change(PREV)}>prev</button>
        <button onClick={() => change(PLAY_PAUSE)}>play</button>
        <button onClick={() => change(NEXT)}>next</button>
      </div>
      <SeekBar />
    </>
  );
};

const PlayerControls = () => {
  return (
    <>
      <MediaControls />
      {/* <VolumeControls /> */}
    </>
  );
};

const PlayBar = () => {
  const player = React.useRef();
  return (
    <div className="playbar">
      <PlayerControls />
      <audio ref={player} controls />
    </div>
  );
};

export default PlayBar;
