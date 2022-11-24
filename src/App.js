import React, { useState, useEffect, useCallback, Fragment } from "react";
import "./App.scss";
import Grid from "./Grid";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [initialheight, setinitialheight] = useState(0);
  const [initialwidth, setinitialwidth] = useState(0);
  const [boundingClient, setBoundingClient] = useState({});
  const [gridStyling, setGridStyling] = useState({
    border: "solid",
    color: "gray",
    gap: 200,
  });

  const height = 450;
  const width = 1200;
  const [diffX, setdiffX] = useState(0);
  const [diffY, setdiffY] = useState(0);
  const [dragging, setdragging] = useState(false);
  const [styles, setstyles] = useState([]);
  const [styleheightwidth, setstyleheightwidth] = useState([]);

  useEffect(() => {
    window.addEventListener("mouseup", dragEnd);
  }, []);

  const setHeightWidth = (obj) => {
    setGridStyling(obj);
    togglePopup();
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const dragStart = (event) => {
    setinitialwidth(event.screenX);
    setinitialheight(event.screenY);
    setdiffX(event.screenX - event.currentTarget.getBoundingClientRect().left);
    setdiffY(event.screenY - event.currentTarget.getBoundingClientRect().top);
    setdragging(true);
  };

  const drag = (e) => {
    if (dragging) {
      var left = e.screenX - diffX;
      var top = e.screenY - diffY;

      left = Math.round(left / gridStyling.gap) * gridStyling.gap;
      top = Math.round(top / gridStyling.gap) * gridStyling.gap;
      setstyles({
        left: left,
        top: top,
      });
    }
  };

  const dragEnd = (event) => {
    let height = event.screenY - initialheight;
    let width = event.screenX - initialwidth;

    setdragging(false);
  };
  const parentRef = useCallback((node) => {
    node?.addEventListener("mousedown", () => {
      window.addEventListener("mousemove", () => {
        setBoundingClient(node.getBoundingClientRect());
      });
    });
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", () => {});
    });

    if (node) {
      setBoundingClient(node.getBoundingClientRect());
    }
  }, []);

  return (
    <Fragment>
      {/*<Toolbar title="Responsive Grid" showButtons={false} />*/}
      <div className="grid-main">
        <div
          className="shape"
          style={styles}
          onMouseDown={dragStart}
          onMouseUp={dragEnd}
        >
          Movable div
        </div>
        <div className="grid-container" ref={parentRef} onMouseMove={drag}>
          <Grid
            boundingClient={boundingClient}
            gridStyling={{
              gap: gridStyling.gap,
              color: gridStyling.color,
              border: gridStyling.border,
            }}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
