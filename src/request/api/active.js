import service from '../index.js'
export function getDevData(userID,devID,startTime,endTime){
	return service({
		method:'POST',
		url:`/getDevData`,
		data:{
			userID,
            devID,
            startTime,
            endTime
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}