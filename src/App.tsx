import React, { useEffect, useRef, useState } from "react";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { CgPlayTrackPrev } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { IoIosPlay } from "react-icons/io";
import { CgPlayPause } from "react-icons/cg";
import { CurrentSongProps, SongInfoProps, SongsProps } from "./Type";
import { mySongs } from "./data";

const App = () => {
  let [songs, setSongs] = useState<SongsProps[]>(mySongs);
  let [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  let [currentSong, setCurrentSong] = useState<CurrentSongProps>(
    songs[currentSongIndex]
  );
  let [playBtn, setPlayBtn] = useState(true);
  let [showSongs, setShowSongs] = useState(true);
  let [songInfo, setSongInfo] = useState<SongInfoProps>({
    current: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const playSong = () => {
    setPlayBtn(!playBtn);
    if (playBtn) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };
  useEffect(() => {
    setCurrentSong(songs[currentSongIndex]);
  }, [currentSongIndex]);

  const selectSong = (num: number): void => {
    songs.forEach((item, index) => {
      if (num === index) {
        setCurrentSong(item);
        setCurrentSongIndex(index);
      }
    });
  };
  const nextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
    setPlayBtn(true);
    audioRef.current?.play();
  };
  const prevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
  };
  const handleSong = () => {
    setSongInfo({
      current: audioRef.current?.currentTime,
      duration: audioRef.current?.duration,
    });
  };

  const formatTime = (time: any) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute}:${second}`;
  };

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    audioRef.current!.currentTime = newTime;
    setSongInfo({ ...songInfo, current: newTime });
  };
  return (
    <div className="max-h-[100vh] overflow-hidden">
      <nav className="bg-green-700 text-white h-[10vh] flex justify-around items-center">
        <RiNeteaseCloudMusicLine className="text-5xl cursor-pointer" />
        <h1 className="text-3xl">Amazon Music</h1>
        {showSongs ? (
          <FaArrowAltCircleLeft
            onClick={() => setShowSongs(false)}
            className="text-2xl cursor-pointer"
          />
        ) : (
          <FaArrowAltCircleRight
            onClick={() => setShowSongs(true)}
            className="text-2xl cursor-pointer"
          />
        )}
      </nav>
      <div
        className={showSongs ? "grid grid-cols-1" : "grid grid-cols-2 h-[90vh]"}
      >
        {showSongs ? (
          <div className="flex flex-col gap-2 h-[90vh] p-1 overflow-auto">
            {songs.map((song, index) => (
              <div
                className={
                  currentSongIndex === index
                    ? "flex justify-between cursor-pointer bg-green-900 hover:bg-pink-500 duration-300 rounded-md text-white text-center p-4"
                    : "flex justify-between cursor-pointer bg-pink-700 hover:bg-pink-500 duration-300 rounded-md text-white text-center p-4"
                }
                key={index}
                onClick={() => selectSong(index)}
              >
                <img
                  className="w-10 h-10 rounded-[50%]"
                  src={song.cover}
                  alt={song.name}
                />
                <div>
                  <p className="text-xl">{song.name}</p>
                  <p className="text-xs">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="bg-orange-600 flex text-white flex-col justify-center items-center">
          <img
            src={currentSong.cover}
            alt={currentSong.name}
            className="w-80 h-80 rounded-[50%]"
          />
          <h2 className="text-4xl my-5">{currentSong.name}</h2>
          <h6 className="text-2xl mb-5">{currentSong.artist}</h6>
          <div className="flex gap-2">
            <label> {formatTime(songInfo.current)} </label>
            <input
              max={songInfo.duration}
              value={songInfo.current}
              type="range"
              onChange={handleValue}
              name=""
              id=""
            />
            <label>{formatTime(songInfo.duration)}</label>
          </div>

          <div className="flex text-5xl">
            <CgPlayTrackPrev onClick={prevSong} className="cursor-pointer" />

            {playBtn ? (
              <IoIosPlay onClick={playSong} className="cursor-pointer" />
            ) : (
              <CgPlayPause onClick={playSong} className="cursor-pointer" />
            )}

            <CgPlayTrackNext onClick={nextSong} className="cursor-pointer" />
          </div>
          <audio
            ref={audioRef}
            src={currentSong.audio}
            onTimeUpdate={handleSong}
            onLoadedMetadata={handleSong}
          ></audio>
        </div>
      </div>
    </div>
  );
};

export default App;
