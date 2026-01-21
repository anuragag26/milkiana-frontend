import { useEffect, useRef, useState } from "react";

const VideoWithThumbnail = ({ src }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [thumbnail, setThumbnail] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [userPlaying, setUserPlaying] = useState(false);

  /* ========== AUTO THUMBNAIL ========== */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const captureFrame = () => {
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setThumbnail(canvas.toDataURL("image/jpeg"));
    };

    video.addEventListener("loadeddata", () => {
      video.currentTime = 1;
    });

    video.addEventListener("seeked", captureFrame);

    return () => {
      video.removeEventListener("seeked", captureFrame);
    };
  }, []);

  /* ========== HOVER PREVIEW ========== */
  const handleMouseEnter = () => {
    if (window.innerWidth < 768 || userPlaying) return;
    setHovered(true);
    videoRef.current.muted = true;
    videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (userPlaying) return;
    setHovered(false);
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  /* ========== CLICK TO PLAY ========== */
  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    setUserPlaying(true);
    setHovered(false);

    video.muted = false;     // 🔑 REQUIRED
    video.controls = true;
    video.play().catch(() => {});
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        muted
        playsInline
        poster={thumbnail}
        controls={userPlaying}
        loading="lazy"
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-80 object-cover"
      />

      <canvas ref={canvasRef} className="hidden" />

      {/* Play overlay (only before user plays) */}
      {!userPlaying && !hovered && thumbnail && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-2xl">
            ▶
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoWithThumbnail;
