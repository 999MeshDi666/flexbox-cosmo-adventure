import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/slices/levelSlice";
import { setText } from "../../store/slices/textSlice";
import { setStyle } from "../../store/slices/styleSlice";
import { handleShow } from "../../store/slices/modalSlice";
import { obj2css } from "../../utils/converters";
import toStyle from 'css-to-style';
import desc from "../../json/descriptions.json";
import _ from "lodash";

const CodePanel = ({ levelsList, level }) => {

  const curLvl = useSelector((state) => state.level.value);
  const text = useSelector((state) => state.text.value);
  const style = useSelector((state) => state.style.value);
  const lang = useSelector((state) => state.lang.value);
  const curDifficulty = useSelector((state)=> state.difficulty.curDifficulty);
  const dispatch = useDispatch();
  

  const handleSetText = (e) => {
    dispatch(setText(e.target.value));
  };
  const handleShowModal = () =>{
    dispatch(handleShow())
  }
  const handleCheckStyles = () => {
    let maxLvl = Object.keys(levelsList).length;

    if (_.isEqual(style, level.answer)) {
      if (curLvl === maxLvl) {
        console.log(curLvl);
      } else {
        dispatch(increment());
      }
      console.log("Правильно");
    } else {
      console.log("Неправильно");
    }

    dispatch(setStyle({}));
    dispatch(setText(""));
  };
  const handleShowAnswer = () =>{
    dispatch(setText(obj2css(level.answer)))
  }

  useEffect(() => {
    const txt2css = text.toLowerCase();
    const reactInlineCSS = toStyle(txt2css)
    dispatch(setStyle(reactInlineCSS));
  }, [text]);
  console.log()
  return (
    <div className="code-panel panel">
      <div className="monitor code-panel-monitor">
        <p className="line-numbers"> 1 2 3 4 5 6 7 8 9 10 11 12</p>
        <div className="css-content">
          <p className="css-text text-content">
            {level.parentStyles? '' : <>.board &#123; <br/> display: flex; <br/>&#125; </>}   
          </p>
          <p className="css-text text-content">
            {level.parentStyles? <>.board &#123; <br/> display: flex; </> : <>.{level.childName} &#123;</>}
          </p>
          <textarea 
            className="textarea-answer"
            name="text" 
            id="text" 
            value={text} 
            placeholder= {desc[lang].others.placeholder}
            onChange={handleSetText} 
          />
          <p className="text-content">&#125;</p>
        </div>
      </div>
      <div className="panel-btns">
        <button className="panel-btn answer-btn"  
                disabled={curDifficulty ==='easy'? false:true} 
                onClick={handleShowAnswer}></button>
        <button className="panel-btn settings-btn" onClick={handleShowModal}></button>
        <button className="panel-btn check-btn" onClick={handleCheckStyles}>{desc[lang].others.check}</button>
      </div>
      
    </div>
  );
};

export default CodePanel;
