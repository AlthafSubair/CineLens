import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import YouTube from 'react-youtube';

interface Props {
  yt: string;
  setIsOpen: (isOpen: boolean) => void;
  setYt: (yt: string) => void;
}

const Trailer = ({ yt, setIsOpen,setYt }: Props) => {
  const [opts, setOpts] = useState({
    height: '300', // Default height
    width: '500',  // Default width
    playerVars: {
      autoplay: 1,
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    setYt("")
  }

  // Update video dimensions based on screen size
  useEffect(() => {
    const updateVideoSize = () => {
      if (window.innerWidth >= 1024) {
        setOpts({ height: '450', width: '800', playerVars: { autoplay: 1 } });
      } else if (window.innerWidth >= 768) {
        setOpts({ height: '400', width: '600', playerVars: { autoplay: 1 } });
      } 
      else if(window.innerWidth >= 564){
        setOpts({ height: '300', width: '500', playerVars: { autoplay: 1 } });
      }
      else if(window.innerWidth >= 456){
        setOpts({ height: '200', width: '400', playerVars: { autoplay: 1 } });
      }
      else {
        setOpts({ height: '155', width: '310', playerVars: { autoplay: 1 } });
      }
    };

    updateVideoSize(); // Run on component mount
    window.addEventListener('resize', updateVideoSize); // Listen to resize

    return () => window.removeEventListener('resize', updateVideoSize); // Cleanup
  }, []);

  return (
    <>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" onClick={handleClose}></div>

      {/* Video Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="relative dark:bg-black p-1 bg-white bg-opacity-50 shadow-lg rounded-lg">
          {/* Close Button */}
          <button
            className="absolute -top-9 right-1 bg-black bg-opacity-50 p-2 rounded-full text-white font-bold hover:text-red-800"
            onClick={handleClose}
          >
            <MdClose />
          </button>
          {/* YouTube Video */}
          <div style={{ width: `${opts.width}px`, height: `${opts.height}px` }}>
            <YouTube videoId={yt} opts={opts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Trailer;

