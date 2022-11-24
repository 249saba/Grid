import React, { Fragment } from "react";
import "./styles.scss";
function Grid(props) {
  const {
    boundingClient: { height, width, x, y } = {},
    gridStyling: { gap, border, color } = {},
  } = props;
  const drawHorizontalLines = () => {
    let lines = [];
    if (gap === 0) {
      gap = 1;
    }
    let countlines = height / gap;
    for (let i = 0; i < countlines; i++) {
      lines.push(
        <div
          className="horizontal-line grid-line"
          style={{
            top: y + i * gap,
            width: width + "px",
            borderBottom: "1px " + border + " " + color,
          }}
        ></div>
      );
    }
    return lines;
  };

  const drawVerticalLines = () => {
    let line = [];
    let countlines = width / gap;
    for (let i = 0; i < countlines; i++) {
      line.push(
        <div
          className="vertical-line grid-line"
          style={{
            left: x + i * gap,
            height: height + "px",
            borderLeft: "1px " + border + " " + color,
          }}
        ></div>
      );
    }
    return line;
  };

  return (
    <Fragment>
      {drawHorizontalLines()}
      {drawVerticalLines()}
    </Fragment>
  );
}
export default Grid;
