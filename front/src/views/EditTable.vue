<template>
    <div class="home">
        <table class="doc-table w100">
            <tbody class="w100">
            <tr v-for="(doctor,index) in doctors" :key="doctor._id" class="w100">
                <td >{{index + 1}}</td>
                <td v-if="doctor.spec">
                    {{getSpecialtyById(doctor.spec)}}
                    <select v-model="doctor.spec" >
                        <!--<option disabled value="">Выберите один из вариантов</option>-->
                        <option v-for="spec in specialty" :value="spec._id" :key="spec._id" > {{spec.name}}</option>
                    </select>
                </td>
                <td v-if="doctor.number"> {{doctor.number}}</td>
                <td v-if="doctor.name"> {{doctor.name}}</td>
                <td v-if="doctor.d1"> {{doctor.d1}}</td>
                <td v-if="doctor.d2"> {{doctor.d2}}</td>
                <td v-if="doctor.d3"> {{doctor.d3}}</td>
                <td v-if="doctor.d4"> {{doctor.d4}}</td>
                <td v-if="doctor.d5"> {{doctor.d5}}</td>
                <td v-if="doctor.image">
                    <img :src="doctor.image.src" >
                </td>
                <td><button @click="editDoctor(doctor)"> Редактировать </button></td>
                <edit-doctor :doctor="doctor"></edit-doctor>
            </tr>
            </tbody>
        </table>
        <div class="content">
            <div class="buttons-box">
                <button class="btn" @click="saveDoctors" >Сохранить</button>
            </div>
        </div>

    </div>
</template>

<script>

    import DoctorService from '../services/DoctorService'
    import EditDoctor from "./EditDoctor";

    export default {
        name: 'EditTable',
        components: {EditDoctor},
        data(){
            return {
                doctors: [],
                specialty: []
            }
        },
        mounted(){
            return Promise.all([
                DoctorService.getDoctors(),
                DoctorService.getSpecialty()
            ]).then(([doctors,specialty])=>{
                if(doctors){
                    this.doctors = doctors;
                }
                if(specialty){
                    this.specialty = specialty;
                }
            })
        },
        methods:{
            editDoctor(doctor){

            },
            saveDoctors(){

            },
            getSpecialtyById(id){
                let spec = this.specialty.find((special) =>{
                    return special._id == id;
                })
                if (spec) {
                    return spec.name;
                }
                else{
                    return "Доктор, просто доктор"

                }
            }
        }
    }
</script>

<style lang="scss">
    .w100{
        width: 100%;
    }


    .doc-table{
        border-collapse: collapse;
    }
    .doc-table td, .doc-table th {
        padding: 10px;
    }
    .doc-table thead{
        background-color: #bfac8f;
    }

    .doc-table tbody th {
        text-align: left;
        font-size: 18px;
    }
    .doc-table tbody tr:nth-child(2n) {
        background: #E5E5E5;
    }

    .doc-table tbody td:last-of-type {
        text-align: center;
    }

    .doc-table tbody tr:hover {
        box-shadow: none;
        top: 2px;
        left: 2px;
        background: #ffd6ab;
    }

    .home{
        width: 100%;
    }
    .buttons-box{
        bottom: 0;
        //max-width: 1200px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .btn{
        padding: 10px;
        border: 1px solid gray;
        border-radius: 3px;
        background-color: aliceblue;
        cursor: pointer;
    }
    .btn:hover{
        background-color: antiquewhite;
    }
</style>
