import React from 'react';
import faker from 'faker';

let TRACKS = [
  'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3',
  'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3',
  'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3',
  'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3',
  'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
];
TRACKS = TRACKS.map((i) => {
  return {
    author: faker.name.firstName('female'),
    title: faker.name.title(),
    src: i,
    time: 0,
    duration: 0,
  };
});

export const MediaPlayerStoreContext = React.createContext(null);

const MediaInfo = ({ title, author }) => {
  return (
    <div>
      <h3>{title}</h3>
      <h6>{author}</h6>
    </div>
  );
};

const SeekBar = ({ currentTime, totalTime, onChange }) => {
  // const [currentTime] = React.useState('0:00');
  // const [totalTime] = React.useState('0:00');
  return (
    <div>
      <span>{calculateTime(currentTime)}</span>
      <input type="range" onInput={onChange} max={totalTime} />
      <span>{calculateTime(totalTime)}</span>
    </div>
  );
};

// const [PREV, PLAY_PAUSE, NEXT] = [-1, 0, 1];
// const MediaControls = () => {
//   const [current, setCurrent] = React.useState(0);
//   const change = (action) => {
//     switch (action) {
//       case PLAY_PAUSE:
//         console.log(TRACKS);
//         return;
//       case NEXT:
//         setCurrent((current + NEXT) % TRACKS.length);
//         return;
//       case PREV:
//         setCurrent((current + PREV) % TRACKS.length);
//         return;
//     }
//   };
//   const i = current < 0 ? current * -1 : current;
//   return (
//     <>
//       {JSON.stringify(TRACKS[i])}
//       <div>
//         <button onClick={() => change(PREV)}>prev</button>
//         <button onClick={() => change(PLAY_PAUSE)}>play</button>
//         <button onClick={() => change(NEXT)}>next</button>
//       </div>
//       <SeekBar />
//     </>
//   );
// };

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

const PlayerControls = () => {
  const { state, dispatch } = React.useContext(MediaPlayerStoreContext);
  const onChange = ({ target }) => {
    dispatch({ type: SET_JUMP_TIME, payload: Math.floor(target.value) });
  };
  return (
    <>
      <button onClick={() => dispatch({ type: SET_PLAYLIST, payload: TRACKS })}>
        SET PLAYLIST
      </button>
      <button onClick={() => dispatch({ type: SET_RANDOM })}>RANDOM</button>
      <SeekBar
        currentTime={state.current.time}
        totalTime={state.current.duration}
        onChange={onChange}
      />
      {/* <MediaControls /> */}
      {/* <VolumeControls /> */}
    </>
  );
};

const [
  SET_PLAYLIST,
  SET_CURRENT_MEDIA,
  SET_CURRENT_TIME,
  SET_DURATION,
  SET_JUMP_TIME,
  SET_RANDOM,
] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PLAYLIST:
      return { ...state, playlist: action.payload };
    case SET_CURRENT_MEDIA:
      return { ...state, current: action.payload };
    case SET_JUMP_TIME:
      return { ...state, jump: action.payload };
    case SET_RANDOM:
      return {
        ...state,
        current:
          state.playlist[Math.floor(Math.random() * state.playlist.length)],
      };
    case SET_CURRENT_TIME:
      return { ...state, current: { ...state.current, time: action.payload } };
    case SET_DURATION:
      return {
        ...state,
        current: { ...state.current, duration: action.payload },
      };

    default:
      return state;
  }
};

const initialState = {
  playing: false,
  mute: false,
  playlist: [],
  jump: 0,
  current: {
    author: '',
    title: '',
    src: '',
    duration: '',
    currenTime: '',
  },
};
const PlayBar = () => {
  const audioRef = React.useRef();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    audioRef.current.src = state.current.src;
    audioRef.current.play();
  }, [state.current.src]);
  React.useEffect(() => {
    dispatch({ type: SET_CURRENT_MEDIA, payload: TRACKS[0] });
  }, []);
  React.useEffect(() => {
    // dispatch({ type: SET_CURRENT_MEDIA, payload: TRACKS[0] });
    // audio.currentTime = Math.floor(target.value);
    audioRef.current.currentTime = Math.floor(state.jump);
  }, [state.jump]);

  return (
    <MediaPlayerStoreContext.Provider value={{ state, dispatch }}>
      <div className="playbar">
        <PlayerControls />
        <audio
          ref={audioRef}
          controls
          onLoadedMetadata={({ target }) =>
            dispatch({ type: SET_DURATION, payload: target.duration })
          }
          onTimeUpdate={({ target }) =>
            dispatch({ type: SET_CURRENT_TIME, payload: target.currentTime })
          }
        />
      </div>
      {JSON.stringify(state.current, null, 4)}
      <MediaInfo {...state.current} />
      {state.playlist.map((i) => (
        <MediaInfo {...i} />
      ))}
    </MediaPlayerStoreContext.Provider>
  );
};
export default PlayBar;
