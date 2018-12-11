<template>
    <div class="home">
        <table class="doc-table w100">
            <thead>
                <tr>
                    <th>№ уч.</th>
                    <th>№ каб.</th>
                    <th>  Фото </th>
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
                <tr v-for="(doctor,index) in doctors" :key="doctor._id" class="w100">
                    <td>{{index + 1}}</td>
                    <td> {{getSpecialtyById(doctor.spec)}}</td>
                    <td> <img class="doc-image" :src="doctor.image"> </td>
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

    import DoctorService from '../services/DoctorService'
    export default {
        name: 'ViewTable',
        data(){
            return {
                doctors: []
            }
        },
        mounted(){
            return Promise.all([
                DoctorService.getDoctors(),
                DoctorService.getSpecialty()
            ]).then(([doctors,specialty])=>{
                if(doctors){
                    doctors.forEach((doc)=>{
                        doc.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAIGCAMAAAC/PAFpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkRFNjlCM0E1MjRDMTFFMTlDMTQ5NkU2N0U2NzQ3MDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkRFNjlCMzk1MjRDMTFFMTlDMTQ5NkU2N0U2NzQ3MDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwQjg4RUNDMjdEN0YzQUUyQTM0NzY3QzE2QzM4MjNEIiBzdFJlZjpkb2N1bWVudElEPSI4MEI4OEVDQzI3RDdGM0FFMkEzNDc2N0MxNkMzODIzRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkOlQZYAAAMAUExUReqTQ9KdVyAnQ9qDM+6QLlOYhfDLOGGQfqqq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";
                    });
                    this.doctors = doctors;
                }
                if(specialty){
                    this.specialty = specialty;
                }
            })
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
