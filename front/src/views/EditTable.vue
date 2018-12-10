<template>
    <div class="home">
        <table class="w100">
            <tbody class="w100">
            <tr v-for="(doctor,index) in doctors" :key="doctor._id" class="w100">
                <td >{{index + 1}}</td>
                <td v-if="doctor.spec"> {{doctor.spec}}</td>
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
                doctors: []
            }
        },
        mounted(){
            return DoctorService.getDoctors().then((doctors)=>{
                if(doctors){
                    this.doctors = doctors;
                }

            })
        },
        methods:{
            editDoctor(doctor){

            }
        }
    }
</script>

<style lang="scss">
    .w100{
        width: 100%;
    }
</style>
