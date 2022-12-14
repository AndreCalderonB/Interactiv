import React, { useEffect, useRef, useState } from "react";

function PlayButton({ reference, select }) {

  return (
    <div ref={reference} className="playButton absolute" onClick={() => select("hi") }>
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35 4.375C18.0879 4.375 4.375 18.0879 4.375 35C4.375 51.9121 18.0879 65.625 35 65.625C51.9121 65.625 65.625 51.9121 65.625 35C65.625 18.0879 51.9121 4.375 35 4.375ZM44.8506 35.4717L29.9209 46.334C29.839 46.3928 29.7426 46.4279 29.6421 46.4355C29.5416 46.443 29.4409 46.4227 29.3512 46.3768C29.2615 46.3309 29.1861 46.2611 29.1335 46.1752C29.0808 46.0892 29.0529 45.9904 29.0527 45.8896V24.1787C29.0524 24.0777 29.08 23.9786 29.1326 23.8924C29.1851 23.8061 29.2605 23.7361 29.3504 23.6901C29.4403 23.6441 29.5412 23.6239 29.6419 23.6317C29.7426 23.6395 29.8392 23.675 29.9209 23.7344L44.8506 34.5898C44.9211 34.6397 44.9787 34.7058 45.0184 34.7825C45.0581 34.8592 45.0788 34.9444 45.0788 35.0308C45.0788 35.1172 45.0581 35.2023 45.0184 35.279C44.9787 35.3557 44.9211 35.4218 44.8506 35.4717V35.4717Z"
          fill="#1F9279"
        />
      </svg>
    </div>
  );
}

function ImgContainer({ position, isImage, select, source }) {
  const divRef = useRef();
  const buttonRef = useRef();
  const [mouseOver, setMouseOver] = useState(false);

  const checkPos = (e) => {
    if (buttonRef.current != undefined) {
      buttonRef.current.style.cursor = "pointer";
      buttonRef.current.style.display = "block";
      buttonRef.current.style.left = e.pageX - e.target.offsetLeft + "px";
      buttonRef.current.style.top = e.pageY - e.target.offsetTop + "px";
      buttonRef.current.style.transform = "translate(-50%, -50%)";
    }
  };
  const mouseIsOver = (e) => {
    e.preventDefault();
    setMouseOver(true);
  };

  const mouseIsOut = (e) => {
    e.preventDefault();
    setMouseOver(false);
  };

  useEffect(() => {

    divRef.current.addEventListener("mousemove", checkPos);
    divRef.current.addEventListener("mouseenter", mouseIsOver);
    divRef.current.addEventListener("mouseleave", mouseIsOut);
    divRef.current.style.backgroundImage = "url("+source+")"
    return () => {
      if(divRef.current != null){
        divRef.current.removeEventListener("mousemove", checkPos);
      }
    };
  }, []);

  return (
    <div ref={divRef} className={position + " relative overflow-hidden imgBG"}>
      {(mouseOver && !isImage) && <PlayButton select={select} reference={buttonRef} />}
    </div>
  );
}

export default ImgContainer;
