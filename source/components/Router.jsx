import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const BasicExample = () => (
	<Router>
		<div>
			<ul className='Nav'>
				<li><NavLink activeClassName='active' to='/'>Search</NavLink></li>
				<li><NavLink activeClassName='active' to='/gallery'>Gallery</NavLink></li>
			</ul>
			<Switch>
				<Route exact path='/' component={List} />
				<Route path='/gallery' component={Gallery} />
				<Route render={function(){return <p>Not Found</p>}} />
			</Switch>
		</div>
	</Router>
)

export default BasicExample
