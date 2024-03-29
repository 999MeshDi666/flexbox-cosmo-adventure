import { useDispatch } from "react-redux";
import { setLang } from "../../store/slices/langSlice";

const LangSettings = ({ description, lang }) => {
  const dispatch = useDispatch();
  const handleSelectLang = (e) => {
    dispatch(setLang(e.target.value));
  };
  return (
    <div className="settings-select">
      <p className="settings-subtitle">{description.text.langSettings}:</p>
      <select
        className="lang-select select"
        onChange={handleSelectLang}
        value={lang}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="kz">Қазақша</option>
      </select>
    </div>
  );
};
export default LangSettings;
