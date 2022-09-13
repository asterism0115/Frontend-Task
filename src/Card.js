import React from "react";
import "./Card.css";
import { AnimateKeyframes } from "react-simple-animate";

const Card = (props) => {
  const _translateX = "0px";
  const _translateY = "0px";
  const _style = {
    transform: `translate(${_translateX},${_translateY} )`,
  };

  return (
    <AnimateKeyframes
      play={props.play}
      duration={0.5}
      easeType="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      keyframes={[
        { 0: "opacity: 0" },
        { 50: "opacity: 1", transform: "translateX(400px)" },
        { 100: "opacity: 1", transform: `translateX(${_translateX}px)` },
      ]}
    >
      <figure className="Card" style={{ ..._style }}>
        <img src={props.src} alt={props.alt} />
      </figure>
    </AnimateKeyframes>
  );
};

export default Card;
