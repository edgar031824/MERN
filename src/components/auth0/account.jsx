
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/auth/authContext';

const Account = ({ history }) => {
	const [user, setUser] = useState({
		email: '',
		password: '',
		name: '',
		confirm: ''
	})
	const onChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value
		})
	};
	const { email, password, name, confirm } = user;
	const { alert, showAlert } = useContext(alertContext);
	const { registerUser, authenticated, message } = useContext(authContext);

	const onSubmit = (e) => {
		e.preventDefault();
		if (!email.trim() || !password.trim() || !name.trim() || !confirm.trim()) {
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

		if (password !== confirm) {
			showAlert({
				msg: 'the passwords are not the same',
				category: 'alert-error'
			});
			return;
		}
		registerUser({
			name,
			password,
			email
		});
	};

	useEffect(() => {
		const goToProject = () => {
			if (authenticated) {
				history.push('/projects');
			} else if (message) {
				showAlert({
					msg: message.msg,
					category: 'alert-error'
				});
			}
		}
		goToProject();
	}, [message, authenticated])

	return (
		<div className="form-usuario">
			{alert && (<div className={`${alert.category}`} > {alert.msg} </div>)
			}
			<div className="contenedor-form sombra-dark">
				<h1>Create an account</h1>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="campo-form">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="your name"
							value={user.name}
							onChange={(e) => onChange(e)}
						/>
					</div>
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
						<label htmlFor="confirm">Confirm password</label>
						<input
							type="password"
							id="confirm"
							name="confirm"
							value={user.confirm}
							placeholder="confirm you password"
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="campo-form">
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Register"
						/>
					</div>
				</form>
				<Link to={"/"} className="enlace-cuenta">Back to login</Link>
			</div>
		</div >
	);
};

export default Account;