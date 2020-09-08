import React from 'react';
import NewProject from '../projects/newProject';
import List from '../projects/list';

const SideBar = () => {
	return (
		<aside>
			<h1>MERN<span>tasks</span></h1>
			<NewProject />
			<div className="proyectos">
				<h2>Your projects</h2>
				<List />
			</div>
		</aside>
	);
};

export default SideBar;