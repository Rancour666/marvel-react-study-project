import { useState, useCallback } from "react";

const useHttp = () => {
	//const [loading, setLoading] = useState(false);
	//const [error, setError] = useState(null);

	//FSM modification задаем состояние процесс, с начальньім значением 'waiting'
	const [process, setProcess] = useState('waiting');
	//--------------------------------------------------------------------------

	const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-type':'application/json'})=>{

		//setLoading(true);

		//FSM modification - пока идет запрос на сервер ставим состояние в "loading"
		setProcess('loading');
		//--------------------------------------------------------------------------

		try{
			const response = await fetch(url, {method, body,headers});
			if (!response.ok){
				throw new Error (`Could not fetch ${url}, status: ${response.status}`)
			}
			const data = await response.json();
			//setLoading(false);

			//FSM modification - когда запрос на сервер ЗАВЕРШЕН УСПЕШНО ставим состояние в "confirmed"
			//setProcess('confirmed'); //можно удалить, мьі передали єту смену process в компонент, т.к. тут она совершается до получения data из-за чего может бьіть ошибка асинхронности
			//--------------------------------------------------------------------------

			return data;
		}
		catch(e){
			//setLoading(true);
			//setError(e.message);

			//FSM modification - когда запрос на сервер ЗАВЕРШЕН ОШИБКОЙ ставим состояние в "error"
			setProcess('error');
			//--------------------------------------------------------------------------

			throw e;
		}

		

	}, [])

	const clearError = useCallback(() => {
		//setError(null);

		//FSM modification - после сброса ошибки ставим состояние в "loading"
		setProcess('loading');
		//--------------------------------------------------------------------------

	}, []);

	return {request, clearError, process, setProcess}//FSM modification - добаляем так же состояние process и setProcess для передачи его в другие компонентьі (loading, error, удаляем )
}

export default useHttp;