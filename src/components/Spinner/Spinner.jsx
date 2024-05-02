import ClipLoader from "react-spinners/ClipLoader";
import "./Spinner.css"
// import ContentLoader, {Facebook } from 'react-content-loader'


const Spinner = ({ css, size, loading }) => {
  return (
    <div className="spinner">
      <ClipLoader css={css} size={size} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default Spinner;
