import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client';
import { useEffect, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import FullScreenControls from './fullscreen-controls';
import VolumeControls from './volume-controls';

type LiveVideoProps = {
  participant: Participant;
};

const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const onVolumeChange = (value: number) => {
    setVolume(+value);

    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = value * 0.01;
    }
  };

  const toggleMuted = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;

    setIsFullScreen(isCurrentlyFullScreen);
  };

  useEventListener('fullscreenchange', handleFullScreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div className="relative" ref={wrapperRef}>
      <video width="100%" ref={videoRef} />
      <div className="absolute bottom-0 p-2 w-full bg-gradient-to-b from-transparent to-black">
        <div className="flex items-center justify-between">
          <VolumeControls
            onChange={onVolumeChange}
            onToggle={toggleMuted}
            value={volume}
          />
          <FullScreenControls
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
