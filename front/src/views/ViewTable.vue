<template>
    <div class="home view-table">
        <table class="doc-table w100">
            <caption> Расписание работы подразделений поликлиники</caption>
            <thead>
                <tr>
                    <th>Специалист</th>
                    <th>№ каб.</th>
                    <th class=""> Фото </th>
                    <th>ФИО.</th>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                </tr>
            </thead>
            <tbody class="w100">
                <tr v-for="(doctor,index) in doctorList" :key="doctor._id" class="w100">
                    <td> {{getSpecialtyById(doctor.spec)}}</td>
                    <td> {{doctor.number}}</td>
                    <td class="td-image"> <img class="doc-image" :src="doctor.image"> </td>
                    <td> {{doctor.name}}</td>
                    <td> {{doctor.d1}}</td>
                    <td> {{doctor.d2}}</td>
                    <td> {{doctor.d3}}</td>
                    <td> {{doctor.d4}}</td>
                    <td> {{doctor.d5}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'ViewTable',
        data(){
            return {
            }
        },
        computed: {
            doctorList () {
                return this.$store.getters.doctors.filter(doc => !doc.area);
            },
            specialty(){
                return this.$store.getters.specialty
            }
        },
        mounted(){
            return this.$store.dispatch('reloadDoctors');
        },
        methods:{
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

<style lang="scss" >

    .home{
        margin-top: 20px;
    }
    .w100{
        width: 100%;
    }
    .doc-table{
        border-collapse: collapse;
        .doc-image{
            height: 33px;
        }
    }
    .doc-table th {
        padding: 7px;
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
    .doc-table caption{
        font-size: 19px;
        font-weight: 600;
    }
    .view-table {
        table td{
            padding: 0;
        }
        table th,td{
            border-right: 1px solid gray;
        }
        table td:last-child,th:last-child{
            border-right: 0;
        }
    }
</style>
