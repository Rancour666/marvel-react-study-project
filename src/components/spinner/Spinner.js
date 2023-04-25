import spinner from './spinner.gif'

const Spinner = (prop) =>{
	return (
		<div style={{margin: '0 auto', alignItems: 'center', display:'flex', minHeight: prop.minHeight}}>
			<img 
				style={{margin: '0 auto', alignItems: 'center', display:'flex'}}
				src={spinner}
				//src={process.env.PUBLIC_URL + './images/spinner.gif'}
				alt="spinner"
			/>
		</div>
		
	)
	
}

export default Spinner;