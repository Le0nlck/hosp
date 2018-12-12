import Vue from 'vue'
import Vuex from 'vuex'
import DoctorService from './services/DoctorService'
import createMutationsSharer from './utils/vuex-reactive-pages';

Vue.use(Vuex);


export default new Vuex.Store({
    plugins: [
        createMutationsSharer({
            predicate: ['setDoctors'],
            sharingKey: "some-subscribe-key",
            storageKey: "some-storage-key"
        }),
    ],
    state: {
        doctors: [],
        specialty: []
    },

    getters:{
        doctors(state){
            return state.doctors;
        },
        specialty(state){
            return state.specialty;
        },
    },
    actions:{
        reloadDoctors(context) {
            return Promise.all([
                DoctorService.getDoctors(),
                DoctorService.getSpecialty()
            ]).then(([doctors,specialty])=>{
                if(doctors){
                    context.commit("setDoctors", doctors);
                }
                if(specialty){
                    context.commit("setSpecialty", specialty);
                }
                return true;
            })

        },
        reloadSpec(context){
            return DoctorService.getSpecialty().then((specialty)=>{
                if(specialty){
                    context.commit("setSpecialty", specialty);
                    return true;
                }
            })
        }
    },
    mutations: {
        setDoctors(state, doctors){
            state.doctors = doctors;
        },
        setSpecialty(state, specialty){
            state.specialty = specialty;
        },
    }
})
