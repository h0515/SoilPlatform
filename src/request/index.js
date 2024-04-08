import axios from 'axios';
let service=axios.create({
	baseURL:'/api/',
	timeout:2000
})
export default service