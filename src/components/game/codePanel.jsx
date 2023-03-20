import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/slices/levelSlice";
import { setStyle, setText } from "../../store/slices/styleSlice";
import { showModal } from "../../store/slices/modalSlice";
import { obj2css } from "../../utils/converters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toStyle from "css-to-style";
import desc from "../../json/descriptions.json";
import _ from "lodash";

const CodePanel = ({ levelsList, level }) => {
  const curLvl = useSelector((state) => state.level.value);
  const text = useSelector((state) => state.styles.text);
  const style = useSelector((state) => state.styles.style);
  const lang = useSelector((state) => state.lang.value);
  const curDifficulty = useSelector((state) => state.difficulty.curDifficulty);
  const dispatch = useDispatch();

  const handleSetText = (e) => {
    dispatch(setText(e.target.value));
  };
  const handleShowModal = () => {
    dispatch(showModal());
  };
  const handleCheckStyles = () => {
    let maxLvl = Object.keys(levelsList).length;

    if (_.isEqual(style, level.answer)) {
      if (curLvl === maxLvl) {
        success();
      } else {
        dispatch(increment());
      }
      success();
    } else {
      error();
    }

    dispatch(setStyle({}));
    dispatch(setText(""));
  };
  const handleShowAnswer = () => {
    dispatch(setText(obj2css(level.answer)));
  };

  useEffect(() => {
    const txt2css = text.toLowerCase();
    const reactInlineCSS = toStyle(txt2css);
    dispatch(setStyle(reactInlineCSS));
  }, [text]);
  const success = () =>
  toast("🚀 Wow so easy!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const error = () =>
  toast.error("Please try again", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  return (
    <div className="code-panel panel">
      <div className="monitor code-panel-monitor">
        <p className="line-numbers"> 1 2 3 4 5 6 7 8 9 10 11 12</p>
        <div className="css-content">
          <p className="css-text text-content">
            {level.parentStyles ? (
              ""
            ) : (
              <>
                .board &#123; <br /> display: flex; <br />
                &#125;{" "}
              </>
            )}
          </p>
          <p className="css-text text-content">
            {level.parentStyles ? (
              <>
                .board &#123; <br /> display: flex;{" "}
              </>
            ) : (
              <>.{level.childName} &#123;</>
            )}
          </p>
          <textarea
            className="textarea-answer"
            name="text"
            id="text"
            value={text}
            placeholder={desc[lang].others.placeholder}
            onChange={handleSetText}
          />
          <p className="text-content">&#125;</p>
        </div>
      </div>
      <div className="panel-btns">
        <button
          className="panel-btn answer-btn"
          disabled={curDifficulty === "easy" ? false : true}
          onClick={handleShowAnswer}
        ></button>
        <button
          className="panel-btn settings-btn"
          onClick={handleShowModal}
        ></button>
        <button className="panel-btn check-btn" onClick={handleCheckStyles}>
          {desc[lang].others.check}
        </button>
      </div>
      <ToastContainer
        role="alert"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default CodePanel;
