import { Link } from "react-router-dom";
import { timerHelper } from "../../helpers";

export const LeadersBoards = () => {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  const liders = records
    .sort((cur, next) => cur.seconds - next.seconds)
    .sort((cur, next) => next.correctAnswers - cur.correctAnswers);

  return (
    <div>
      <Link to="/">
        <h3>Домой</h3>
      </Link>
      <ul>
        {liders.length !== 0 ? (
          liders.map((rec, i) => {
            return (
              <li key={i}>
                <span>
                  {i + 1}) Имя - {rec.name},{" "}
                </span>
                <span>правильных ответов - {rec.correctAnswers}, </span>
                <span>
                  время - {timerHelper(rec.seconds).getMinutes()} :{" "}
                  {timerHelper(rec.seconds).getSeconds()}{" "}
                </span>
              </li>
            );
          })
        ) : (
          <h3>В списке пока нет участников</h3>
        )}
      </ul>
    </div>
  );
};
