import React from 'react';

class OddComp extends React.Component {

	render() {
		return (
			<div>
				<h1 style={{display: (this.props.counter)%2 ? 'none' : 'block'}}>
                    Hello World from OddComp 
				</h1>
			</div>
		)
	}

}

export default OddComp;