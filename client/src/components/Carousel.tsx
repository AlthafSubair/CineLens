import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useRef } from "react";
import { getCarousel } from "../redux/thunk/userThunk";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import YouTube from "react-youtube";

const Carousel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { carousel } = useSelector((state: RootState) => state.user);
  const glideRef = useRef<HTMLDivElement | null>(null);
  const glideInstance = useRef<Glide | null>(null); // Store the instance

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  useEffect(() => {
    if (!glideRef.current) return;

    glideInstance.current = new Glide(glideRef.current, {
      type: "carousel",
      perView: 1,
      focusAt: "center",
      gap: 20,
      animationDuration: 800,
    });

    glideInstance.current.mount();

    return () => {
      if (glideInstance.current) {
        glideInstance.current.destroy();
      }
    };
  }, [carousel]); // Ensure carousel updates correctly

  return (
    <div>
      <div ref={glideRef} className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {carousel?.map((item, index) => (
              <li key={index} className="glide__slide">
                <div className="bg-[#1e1e1e] text-center rounded-lg shadow-lg flex flex-col items-center justify-center ">
                  {/* Responsive YouTube Container */}
                  <div className="relative w-full lg:pb-[40%] pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <YouTube
                        videoId={item?.trailer}
                        className="w-full h-full"
                        opts={{
                          width: "100%",
                          height: "100%",
                          playerVars: {},
                        }}
                      />
                      
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="glide__arrows" data-glide-el="controls">
          <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
            ◀
          </button>
          <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
