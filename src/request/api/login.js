import service from '../index.js'
//登录接口
export function getLogin(user){
	return service({
		method:'POST',
		url:`/getID`,
		data:{
			name:user.name,
			pwd:user.pwd
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
