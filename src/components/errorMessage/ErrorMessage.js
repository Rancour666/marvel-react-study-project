//import errorImg from './error.gif';

const Error = () => {
	return (
		<div style={{margin: '0 auto', alignItems: 'center', justifyContent:'center', display:'flex'}}>
			<img
				style={{width: 200, height: 200}}
				//src={errorImg}
				src={process.env.PUBLIC_URL + './images/error.gif'}
				alt="error image"
			/>
		</div>
		
	)
}

export default Error;