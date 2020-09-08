import baseRequest from './request';

const tokenAuth = token => {
	if (token) {
		baseRequest.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete baseRequest.defaults.headers.common['x-auth-token'];
	}
}

export default tokenAuth;