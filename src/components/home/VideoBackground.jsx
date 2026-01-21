const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

const VideoBackground = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source
        src={`https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/milkiana/hero-bg.mp4`}
        type="video/mp4"
      />
    </video>
  );
};

export default VideoBackground;
