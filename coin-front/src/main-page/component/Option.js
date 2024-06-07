import { toFormattedString } from "../../Format";
import Clock from "./Clock";

function Option({
  exchange,
}) {
  return (
    <div className="option">
      <div className="clock">
        <Clock />
      </div>
      <div className="option-right">
        <p className="rating">
          <span>환율 : </span>
          {toFormattedString(exchange)}
        </p>
      </div>
    </div>
  );
}

export default Option;
