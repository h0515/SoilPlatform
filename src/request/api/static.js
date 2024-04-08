import service from '../index.js'
export function getDevLastData(userID,devID){
	return service({
		method:'POST',
		url:`/getDevLastData`,
		data:{
			userID,
            devID
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}