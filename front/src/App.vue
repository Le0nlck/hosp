<template>
    <div id="app">
        <div id="nav">
            <a class="link" title="Расп. врачей"><div @click="goTo('/')" class="doc-table-1-icon"></div></a>
            <a class="link" title="Расп. Участковых"><div @click="goTo('/shedule')" class="doc-table-2-icon"></div></a>
            <a class="link" title="Редактирование"><div @click="goTo('/editTable')" class="doc-edit-icon"></div></a>
            <a class="link" title="Ред. специалистов"><div @click="goTo('/editSpec')" class="spec-edit-icon"></div></a>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name:"app",
        methods:{
            goTo(route){
                this.$router.push(route);
            }
        }
    }
</script>
<style lang="scss" >
    body{
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        background: #f9ead0;

        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #8e64b3;
            }
        }
    }
    .h2 {
        font-size: 18px;
        color: #5F5F5F;
        font-weight: normal;
        padding-left: 10px;
    }
    .link{
        margin-left: 20px;
    }
    .spec-edit-icon{
        background-image: url("../src/assets/group.png");
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .doc-edit-icon{
        background-image: url("../src/assets/settings.png");
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .doc-table-1-icon{
        background-image: url("../src/assets/list.png");
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .doc-table-2-icon{
        background-image: url("../src/assets/notepad.png");
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
</style>
