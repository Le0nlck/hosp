<template>
    <div class="home">
        <table class="doc-table w100">
            <caption> Расписание работы врачей педиатров участковых</caption>
            <thead>
            <tr>
                <th>№ уч.</th>
                <th>№ каб.</th>
                <th>ФИО.</th>
                <th>Пн</th>
                <th>Вт</th>
                <th>Ср</th>
                <th>Чт</th>
                <th>Пт</th>
                <th></th>
            </tr>
            </thead>
            <tbody class="w100">
            <tr v-for="doctor in doctorList" :key="doctor._id" class="w100">
                <td>{{doctor.area}}</td>
                <td> {{doctor.number}}</td>
                <td> {{doctor.name}}</td>
                <td> {{doctor.number}}</td>
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
            return{}
        },
        computed: {
            doctorList() {
                return this.$store.getters.doctors.filter(doc => doc.area).sort((doc, docCurr) => {
                    return doc.area > docCurr.area ? 1 : -1;
                });
            },
        },
        mounted(){
            return this.$store.dispatch('reloadDoctors');
        },
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
            height: 40px;
        }
    }
    .doc-table th {
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
</style>
