import {Link} from 'react-router-dom';
import {timerHelper} from '../../helpers';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

export const LeadersBoards = () => {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const leaders = records
        .sort((cur, next) => cur.seconds - next.seconds)
        .sort((cur, next) => next.correctAnswers - cur.correctAnswers);

    return (
        <Container>
            <Link to="/">
                <h3 className='mb-3 mt-3 ml-2'>На главную</h3>
            </Link>
            <div>
                {leaders.length !== 0 ? (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Имя</th>
                            <th>правильных ответов</th>
                            <th>Время</th>
                        </tr>
                        </thead>
                        {leaders.map((rec, i) => {
                            return (
                                <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{rec.name}</td>
                                    <td>{rec.correctAnswers}</td>
                                    <td>{timerHelper(rec.seconds).getMinutes()} :{' '}
                                        {timerHelper(rec.seconds).getSeconds()}</td>
                                </tr>
                                </tbody>
                            );
                        })}
                    </Table>
                ) : (
                    <h3>В списке пока нет участников</h3>
                )}
            </div>
        </Container>
    );
};
