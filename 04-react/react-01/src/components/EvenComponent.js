import React from 'react';

class EvenComp extends React.Component {

	render() {
		return (
			<div>
				<h1 style={{display: (this.props.counter)%2 ? 'block' : 'none'}}>
                    Hello World from EvenComp 
				</h1>
			</div>
		)
	}

}

export default EvenComp;