<template>
    <div id="app">
        <div id="nav">
            <router-link class="link" to="/">Просмотр</router-link>
            <router-link class="link" to="/editTable">Редактирование</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
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
        padding: 30px;
        background: #f9ead0;

        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #8e64b3;
            }
        }
    }
    .link{
        margin-left: 20px;
    }
</style>
