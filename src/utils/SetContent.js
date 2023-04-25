
import Spinner from '../components/spinner/Spinner';
import Error from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

//FSM modification - создаем ф-цию генерации контента в зависимости от состояния process, переданного в нее компонента Component и данньіх data полученньіх по запросу, которьіе наполнят компонент
const setContent = (process, Component, data) =>{
	switch(process){
		case 'waiting':
			return <Skeleton/>;
		case 'loading':
			return <Spinner/>;
		case 'error':
			return <Error/>;
		case 'confirmed':
			return <Component data={data}/>
		default:
			throw new Error('Unexpected process state');
	}
}

export default setContent;