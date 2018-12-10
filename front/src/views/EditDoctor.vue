<template>
    <div>
        <div class="changeImage">
            <input type="file" @change="onFileSelected()">
            <img v-if="selectedFile" :src="selectedFile.src">
            <button @click="onUpload()">
                Upload
            </button>
        </div>
        <div>
            <input type="text" v-model="doctor.name"/>
        </div>

    </div>
</template>

<script>
    import DoctorService from '../services/DoctorService'

    export default {
        name: "EditDoctor",
        props:{
            doctor: Object
        },
        data(){
            return{
                selectedFile: null
            }
        },
        methods:{
            onFileSelected(){
                this.selectedFile = event.target.files[0]
            },
            onUpload(){
                let fd = new FormData();
                fd.append('image',this.selectedFile, this.selectedFile.name)
                debugger;

                return DoctorService.loadImage(fd).then((res)=> {

                });
            }
        }
    }
</script>

<style scoped>

</style>