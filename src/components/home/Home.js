import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { recordsHelper, timerHelper } from "../../helpers";

export const Home = () => {
  const [userName, setUserName] = useState("");
  const [editable, setEditable] = useState(true);
  const [validErr, setValidErr] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [activeTimer, setActiveTimer] = useState(false);

  const [questions, setQuestions] = useState([]);
  const hasQuestions = questions.length !== 0;

  const [userAnswers, setUserAnswers] = useState({});

  const [answers, setAnswers] = useState([]);
  const hasAnswers = answers.length !== 0;

  const correctAnswers = answers.filter(
    ({ q_id, answer }) => answer === userAnswers[q_id]
  );

  const correctAnsCount = correctAnswers.length;

  const getQuestions = () => {
    const isEmptyName = userName === "";

    if (!isEmptyName) {
      const questions = api.getQuestions(5);

      setEditable(false);
      setActiveTimer(true);
      setQuestions(questions);
    }

    isEmptyName !== validErr && setValidErr(isEmptyName);
  };

  const getAnswers = () => {
    const answers = api.getAnswers(questions);

    setAnswers(answers);
    setActiveTimer(false);
  };

  const handleNameInput = (e) => {
    setUserName(e.target.value);
  };

  const handleSelect = (id, answer) => () => {
    if (!hasAnswers) {
      const sameAnswer = userAnswers[id] === answer;
      const value = { ...userAnswers };

      if (sameAnswer) {
        delete value[id];
      } else {
        value[id] = answer;
      }

      setUserAnswers(value);
    }
  };

  const answerChecker = (qId) => {
    return correctAnswers.some((a) => a.q_id === qId);
  };

  const classNameHelper = (qId, ans) => {
    let className = "";

    const selected = userAnswers[qId] === ans;

    const correctAns = answers.some(
      ({ q_id, answer }) => q_id === qId && answer === ans
    );

    if (selected)
      className = hasAnswers && !correctAns ? "incorrect" : "selected";

    if (correctAns && hasAnswers) className = "correct";

    return className;
  };

  useEffect(() => {
    if (activeTimer) {
      setTimeout(() => {
        setSeconds(seconds + 1);
      }, 1000);
    }
  }, [activeTimer, seconds]);

  useEffect(() => {
    hasAnswers &&
      recordsHelper({
        name: userName,
        correctAnswers: correctAnsCount,
        seconds,
      });
  }, [hasAnswers]);

  return (
    <div>
      <label>Ваше имя</label>
      <input
        name="userName"
        value={userName}
        disabled={!editable}
        onChange={handleNameInput}
        className={validErr ? "errorBorder" : ""}
      />
      {validErr && <p>Введите имя</p>}
      <div>
        {hasAnswers && <span>Правильных ответов - {correctAnsCount}</span>}
      </div>
      <div>
        {hasQuestions ? (
          <div>
            <span>
              Время - {timerHelper(seconds).getMinutes()} :{" "}
              {timerHelper(seconds).getSeconds()}
            </span>
            {hasAnswers && (
              <div>
                <Link to="/records">Посмотреть список лидеров</Link>
              </div>
            )}
            {questions.map((q) => (
              <div key={q.id}>
                <h3>{q.question}</h3>
                {hasAnswers && (
                  <span>{answerChecker(q.id) ? "yes" : "no"}</span>
                )}
                <ul className="options">
                  {q.options.map((opt, i) => {
                    return (
                      <li
                        key={i}
                        onClick={handleSelect(q.id, opt.answer)}
                        className={classNameHelper(q.id, opt.answer)}
                      >
                        {opt.answer} - {opt.description}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {!hasAnswers && (
              <div>
                <button onClick={getAnswers}>Ответить</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={getQuestions}>Начать викторину</button>
        )}
      </div>
    </div>
  );
};
