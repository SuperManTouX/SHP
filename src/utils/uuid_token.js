import { v4 as uuidv4 } from 'uuid';
let getUuid = ()=>{
    let uuid_token = localStorage.getItem('UUID')
    if(!uuid_token ){
        localStorage.setItem('UUID',uuidv4())
    }
    return uuid_token
}
export default getUuid