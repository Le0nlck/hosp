import axios from 'axios';
const uri = "http://localhost:9000";
let callApi = (method, path, data)=>{
    if(method == 'post'){
        return axios.post(uri + "/" + path, {body: data}).then((res)=>{
            if(res.data){
                return res.data;
            }
            else{
                return new Promise.reject(res.statusText);
            }

        }).catch((err)=>{
            console.error(err);
        })
    }
    else{
        return axios.get(uri + "/" + path).then((res)=>{
            if(res.data){
                return res.data;
            }
            else{
                return new Promise.reject(res.statusText);
            }
        }).catch((err)=>{
            console.error(err);
        })
    }
}


let DoctorService = {
    getDoctors: ()=>{
        let doctor = {
            spec: "1",
            number: "1",
            name: "1",
            d1: "1",
            d2: "1",
            d3: "1",
            d4: "1",
            d5: "1",
        };

       return callApi('get', 'getDoctors');
    },
    getSpecialty: ()=>{
        return callApi('get', 'getSpecialty');
    },
    addDoctor: (doctor)=>{
        return callApi('post', 'addDoctor', doctor);
    },
    loadImage:(formData)=>{
        return callApi('post', 'loadImage', doctor)
    }
}

export default DoctorService;