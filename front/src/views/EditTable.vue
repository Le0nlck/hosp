<template>
    <div class="home">
        <table class="doc-table w100">
            <tbody class="w100">
            <tr v-for="(doctor,index) in doctors" :key="doctor._id" class="w100">
                <td >{{index + 1}}</td>
                <td v-if="doctor.spec">
                    <select v-model="doctor.spec" >
                        <!--<option disabled value="">Выберите один из вариантов</option>-->
                        <option v-for="spec in specialty" :value="spec._id" :key="spec._id" > {{spec.name}}</option>
                    </select>
                </td>
                <td > {{doctor.number}}</td>
                <td > {{doctor.name}}</td>
                <td > {{doctor.d1}}</td>
                <td > {{doctor.d2}}</td>
                <td > {{doctor.d3}}</td>
                <td > {{doctor.d4}}</td>
                <td > {{doctor.d5}}</td>
                <td >
                    <img v-if="doctor && doctor.src" :src="doctor.image.src" >
                    <edit-doctor v-if="doctor" :doctor="doctor"></edit-doctor>
                </td>
                <!--<td><button @click="editDoctor(doctor)"> Редактировать </button></td>-->
                <!---->
            </tr>
            </tbody>
        </table>
        <div class="content">
            <div class="buttons-box">
                <button class="btn" @click="saveDoctors()" >Сохранить</button>
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
        computed:{
            editDoctors(){
                let docs = {...this.doctors};
                docs = docs.filter(doc => doc.spec);

                return docs;
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
                return DoctorService.saveDoctors(this.doctors);
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
