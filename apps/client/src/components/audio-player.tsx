// apps/client/src/components/audio-player.tsx
'use client';

import {
  MagnifyingGlassIcon,
  // Bars3Icon,
  // MagnifyingGlassIcon,
  // QuestionMarkCircleIcon,
  PlayIcon,
  PauseIcon,
  UserIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export function AudioPlayer() {
  return (
    <>
      <div
        // bg-gray-800
        className=" p-4 rounded-lg text-white"
      >
        <audio
          id="audioPlayer"
          // src="path_to_your_audio_file.mp3"
        >
          {/* <source src="horse.ogg" type="audio/ogg" /> */}
        </audio>
        <div className="flex items-center gap-4">
          <button id="playButton" className="w-5 h-5">
            <PlayIcon />
          </button>

          <button id="pauseButton" className="w-5 h-5">
            <PauseIcon />
          </button>

          <div className="w-4/5 flex flex-row gap-4 items-center">
            <span id="current-time">0:00</span>
            <input
              type="range"
              id="seek-slider"
              max="100"
              value="0"
              className="w-full h-1 bg-yellow-200 rounded-md appearance-none cursor-pointer dark:bg-slate-700"
              onChange={() => {}}
            />
            <span id="duration" className="time">
              0:00
            </span>
          </div>

          {/* <output id="volume-output">100</output>
          <input type="range" id="volume-slider" max="100" value="100" />
          <button id="mute-icon"></button> */}
        </div>
      </div>
    </>
  );
}
