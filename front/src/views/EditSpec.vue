<template>
    <div class="home">
        <table class="doc-table w100">
            <caption>Редактирование специалистов</caption>
            <thead class="w100">
            <tr>
                <th></th>
                <th>Специальность</th>
                <td></td>
            </tr>
            </thead>
            <tbody class="w100 edit-table">
            <tr v-for="(spec, index) in specialty" :key="spec._id" class="w100">
                <td > {{index + 1}}</td>
                <td > <div > <input @change="editSpecialty(spec)" v-model="spec.name"></div></td>
                <td><button v-if="spec.name"  class="btn" @click="removeSpecialty(spec, index)">Удалить</button></td>
            </tr>
            </tbody>
        </table>
        <div class="content">
            <div class="buttons-box">
                <button class="btn" @click="saveSpecialty()" >Сохранить</button>
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
                deletedSpecialty:[]
            }
        },
        computed:{
            specs(){
                return this.$store.getters.specialty
            },
            specialty(){
                let specs = this.specs.filter(spec => spec.name);
                specs = [...specs,{
                    name: ""
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
            editSpecialty(spec){
                if(spec && !spec._id && !spec.inChange){
                    this.specs.push(spec);
                }
                spec.inChange = true;
            },
            saveSpecialty(){
                let specs = this.specs.filter(spec => (spec.name && spec.inChange || !spec._id));
                let deleted = this.deletedSpecialty.filter(spec => spec._id || !spec.name);
                deleted = deleted.concat(this.specs.filter(spec => !spec.name && spec._id ));
                deleted.forEach((doc)=> {doc.isDeleted = true });
                let resSpecs = specs.concat(deleted);

                return DoctorService.saveSpecialty(resSpecs).then(()=>{
                    this.reload();
                    this.deletedSpecialty = [];
                });
            },
            removeSpecialty(spec, index){
                if(confirm("Вы уверены, что хотите удалить специальность?") && index >= 0){
                    this.deletedSpecialty = this.deletedSpecialty.concat(cloneObj(this.specs.splice(index,1)));
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
