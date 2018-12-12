<template>
    <div class="home">
        <table class="doc-table w100">
            <caption>Расписание работы врачей педиатров участковых</caption>
            <thead class="w100">
                <tr>
                    <th></th>
                    <th>Должность</th>
                    <th>Участок</th>
                    <th>Кабинет </th>
                    <th>ФИО.</th>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Фото</th>
                    <th>Ред. фото</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="w100 edit-table">
            <tr v-for="(doctor,index) in doctorList" :key="doctor._id" class="w100">
                <td >{{index + 1}}</td>
                <td >
                    <select @change="editDoctor(doctor, true)" v-model="doctor.spec" >
                        <!--<option disabled value="">Выберите один из вариантов</option>-->
                        <option v-for="spec in specialty" :value="spec._id" :key="spec._id" > {{spec.name}}</option>
                    </select>
                </td>
                <td > <div v-if="doctor.spec"> <input class="area" @change="editDoctor(doctor)" type="number" v-model="doctor.area"></div></td>
                <td > <div v-if="doctor.spec"> <input @change="editDoctor(doctor)" v-model="doctor.number"></div></td>
                <td > <div v-if="doctor.spec"> <input @change="editDoctor(doctor)" v-model="doctor.name"></div> </td>
                <td > <div v-if="doctor.spec"> <input @change="editDoctor(doctor)" v-model="doctor.d1"></div></td>
                <td > <div v-if="doctor.spec"> <input @change="editDoctor(doctor)" v-model="doctor.d2"></div></td>
                <td > <div v-if="doctor.spec"> <input @change="editDoctor(doctor)" v-model="doctor.d3"></div></td>
                <td > <div v-if="doctor.spec"> <input @change="editDoctor(doctor)" v-model="doctor.d4"></div></td>
                <td > <div v-if="doctor.spec"> <input @change="editDoctor(doctor)" v-model="doctor.d5"></div></td>
                <td > <div v-if="doctor.spec"> <img class="doc-image" v-if="doctor && doctor.image" :src="doctor.image" ></div></td>
                <td >
                    <div v-if="doctor.spec">
                        <input class="input-file" type="file" @change="onFileSelected(doctor, $event)">
                        <div><button @click="onUpload(doctor)">
                            Upload
                        </button></div>
                    </div>


                </td>
                <td> <div v-if="doctor.spec"><button class="btn" @click="removeDoctor(doctor,index)"> Удалить</button></div></td>
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

    function cloneObj(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    export default {
        name: 'EditTable',
        data(){
            return {
                deletedDoctors:[]
            }
        },
        computed:{
            doctors(){
                return this.$store.state.doctors;
            },
            specialty(){
                return this.$store.getters.specialty
            },
            doctorList(){
                let docs = this.doctors.filter(doc => doc.spec);
                docs = [...docs,{
                    name: "Доктор"
                }];

                return docs;
            }
        },
        mounted(){
            this.reload();
        },
        methods:{
            reload(){
                return this.$store.dispatch('reloadDoctors');
            },
            editDoctor(doctor,isSpec = false){

                if(isSpec && !doctor._id && !doctor.inChange){
                    this.doctors.push(doctor);
                }
                doctor.inChange = true;
            },
            saveDoctors(){
                let doctors = this.doctors.filter(doc => doc.inChange || !doc._id);
                let deleted = this.deletedDoctors.filter(doc => doc._id);
                deleted.forEach((doc)=> {doc.isDeleted = true});
                let resDocs = doctors.concat(deleted);

                return DoctorService.saveDoctors(resDocs).then(()=>{
                    this.reload();
                    this.deletedDoctors = [];
                });
            },
            removeDoctor(doctor, index){
                if(confirm("Вы уверены, что хотите удалить специалиста?")){
                    this.deletedDoctors = this.deletedDoctors.concat(cloneObj(this.doctors.splice(index,1)));
                }
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
            },
            onFileSelected(doctor, event){
                doctor.file = event.target.files[0];
            },
            onUpload(doctor){
                if(doctor && doctor.file){
                    let fr = new FileReader();
                    fr.onload = (event)=>{
                        doctor.image = event.target.result;
                        doctor = {...doctor};
                    };

                    fr.readAsDataURL(doctor.file);
                    doctor.inChange = true;
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
        padding: 5px;
    }
    .doc-table thead{
        background-color: #bfac8f;
    }

    .doc-image{
        height: 40px;
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

    .edit-table input, .edit-table select{
        padding: 3px;
        width: 170px;
    }

    .edit-table td .input-file{
        width: 100%;
    }
    @media screen and (max-width: 1910px) {
        .edit-table input, .edit-table select{
            max-width: 100px;
        }
    }

    .doc-table .area{
        width: 30px;
    }
</style>
