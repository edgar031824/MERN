
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/auth/authContext';

const Login = ({ history }) => {
	const { alert, showAlert } = useContext(alertContext);
	const { logIn, message, authenticated } = useContext(authContext);
	const [user, setUser] = useState({
		email: '',
		password: ''
	});
	const onChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value
		})
	};

	const onSubmit = (e) => {
		const { email, password } = user;
		e.preventDefault();
		if (!email.trim() || !password.trim()) {
			showAlert({
				msg: 'complete the fields',
				category: 'alert-error'
			});
			return;
		}

		if (password.length < 6) {
			showAlert({
				msg: 'password must have at least 6 characteres',
				category: 'alert-error'
			});
			return;
		}

		logIn(user);
	};

	useEffect(() => {
		if (authenticated) {
			history.push('/projects');
		} else if (message) {
			showAlert({
				msg: message.msg,
				category: 'alert-error'
			});
		}

	}, [message, authenticated]);

	return (
		<div className="form-usuario">
			{alert && (<div className={`${alert.category}`} > {alert.msg} </div>)}
			< div className="contenedor-form sombra-dark">
				<h1>Login</h1>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="your email"
							value={user.email}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={user.password}
							placeholder="your password"
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="campo-form">
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Log in"
						/>
					</div>
				</form>
				<Link to={"/new-account"} className="enlace-cuenta">Get an account</Link>
			</div>
		</div >
	);
};

export default Login;