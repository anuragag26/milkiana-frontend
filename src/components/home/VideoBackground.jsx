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
        src={`https://res.cloudinary.com/${cloudName}/video/upload/MILKIANA_PASHU_AAHAR_AD_FILM_WITH_GOVINDA_-_Creative_Media_Productions_India_Pvt_Ltd_1080p_h264_evnlmp`}
        type="video/mp4"
      />
    </video>
  );
};

export default VideoBackground;
