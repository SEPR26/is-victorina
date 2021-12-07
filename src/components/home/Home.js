import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {api} from '../../api/api';
import {recordsHelper, timerHelper} from '../../helpers';
import './home.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Card, Form} from 'react-bootstrap';

export const Home = () => {
    const [userName, setUserName] = useState('');
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
        ({q_id, answer}) => answer === userAnswers[q_id]
    );

    const correctAnsCount = correctAnswers.length;

    const getQuestions = () => {
        const isEmptyName = userName.trim() === '';

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
        e.preventDefault();
        setUserName(e.target.value);
    };

    const handleDownEnter = (e) => {
        if (e.key === 'Enter') {
            getQuestions();
            setUserName(e.target.value);
        }
    };

    const handleSelect = (id, answer) => () => {
        if (!hasAnswers) {
            const sameAnswer = userAnswers[id] === answer;
            const value = {...userAnswers};

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
        let className = '';

        const selected = userAnswers[qId] === ans;

        const correctAns = answers.some(
            ({q_id, answer}) => q_id === qId && answer === ans
        );

        if (selected)
            className = hasAnswers && !correctAns ? 'incorrect' : 'selected';

        if (correctAns && hasAnswers) className = 'correct';

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
            seconds
        });
    }, [hasAnswers]);

    return (
        <Container>
            {(editable &&
                <div className='text-center mb-2'>
                    <h1 className='text-primary mt-5 p-3 rounded'>Введите имя</h1>
                    <Form.Control
                        value={userName}
                        disabled={!editable}
                        onChange={handleNameInput}
                        onKeyPress={handleDownEnter}
                        type="text"
                        className={`${validErr ? 'errorBorder' : ''} input-name`}
                    />
                    {validErr && <p className='text-danger'>Это обязательное поле *</p>}
                </div>)}
            <div>
                {hasAnswers && <div className='timer-count-fav'>Правильных ответов - {correctAnsCount}</div>}
            </div>
            <div className='text-center'>
                {hasQuestions ? (
                    <div>
                        <div className='text-left timer-count-fav mb-3 mt-3'>
                            Время - {timerHelper(seconds).getMinutes()} : {' '} {timerHelper(seconds).getSeconds()}
                        </div>
                        {hasAnswers && (
                            <div className='text-left timer-count-fav mb-3'>
                                <Link to="/records">Посмотреть свой результат в списоке лидеров</Link>
                            </div>
                        )}
                        {questions.map((q) => (
                            <Card key={q.id} className='mb-3'>
                                <h3 className='text-left pl-3 mt-2'>{q.question}</h3>
                                {hasAnswers && (
                                    <div className='text-left mb-2'>
                                        {answerChecker(q.id)
                                            ? <h5 className='text-success pl-3'>Ответ верный</h5>
                                            : <h5 className='text-danger pl-3'>Ответ не верный</h5>
                                        }
                                    </div>
                                )}
                                <ul className="options mt-3">
                                    {q.options.map((opt, i) => {
                                        return (
                                            <li
                                                key={i}
                                                onClick={handleSelect(q.id, opt.answer)}
                                                className={`${classNameHelper(q.id, opt.answer)} text-left pl-3 pt-2 pb-2 `}
                                            >
                                                {opt.answer}) {opt.description}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Card>
                        ))}
                        {!hasAnswers && (
                            <div className='text-right mb-5'>
                                <Button
                                    variant="primary"
                                    onClick={getAnswers}
                                    className='btn-submit'
                                >
                                    Завершить викторину
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Button
                        onClick={getQuestions}
                        variant="outline-primary"
                        size="lg"
                        className='mt-3 btn-start'
                    >
                        Начать викторину
                    </Button>
                )}
            </div>
        </Container>
    );
};
