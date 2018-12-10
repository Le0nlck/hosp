<template>
    <div>
        <div class="changeImage">
            <input type="file" @change="onFileSelected">
            <img v-if="doctor && doctor.src" :src="doctor.src">
            <button @click="onUpload()">
                Upload
            </button>
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
            onFileSelected(event){
                this.selectedFile = event.target.files[0];
            },
            imageIsLoaded(event){
                this.doctor.src = event.target.result;
                this.doctor = {...this.doctor};
            },
            onUpload(){
                let fr = new FileReader();
                fr.onload = this.imageIsLoaded;

                fr.readAsDataURL(this.selectedFile);
            }
        },
    }
</script>

<style scoped>

</style>