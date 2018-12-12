<template>
    <div class="home">
        <table class="doc-table w100">
            <caption>Расписание работы врачей педиатров участковых</caption>
            <thead class="w100">
            <tr>
                <th></th>
                <th>Специальность</th>
            </tr>
            </thead>
            <tbody class="w100 edit-table">
            <tr v-for="(spec, index) in specialty" :key="spec._id" class="w100">
                <td > {{index + 1}}</td>
                <td > <div v-if="spec.name"> <input @change="editDoctor(doctor)" v-model="spec.name"></div></td>
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
            specs(){
                return this.$store.getters.specialty
            },
            specialty(){
                let specs = this.specs.filter(spec => spec.name);
                specs = [...specs,{
                    name: "Терапевт"
                }];

                return specs;
            },
        },
        mounted(){
            this.reload();
        },
        methods:{
            reload(){
                return this.$store.dispatch('reloadSpec');
            },
            editDoctor(spec){
                if(spec && !spec._id && !spec.inChange){
                    this.spec.push(spec);
                }
                spec.inChange = true;
            },
            saveDoctors(){
                let specs = this.specs.filter(spec => spec.inChange || !spec._id);
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
