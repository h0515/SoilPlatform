import service from '../index.js'
export function getDevList(userID){
	return service({
		method:'POST',
		url:`/getDevList`,
		data:{
			userID,
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
export function setName(userID,devID,AliasName){
	return service({
		method:'POST',
		url:`/setName`,
		data:{
			userID,
			devID,
			AliasName
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}