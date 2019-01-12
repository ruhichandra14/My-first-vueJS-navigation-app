<template>
    <nav class = "nav-menu">
        <ul>
            <li :class="[topicsCombinedClasses , {boldTopics: isBold} , 'nav-menu-item']" v-for="(item, index) in items" :id=index+1><a>{{ item }}</a></li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "NavigationMenu",
        data(){
            return{
                items: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
                isBold: true,
            }
        },
        computed:{
            topicsCombinedClasses: function(){
                return{
                    textShadowed: this.textShadow
                }
            }
        }
    }
</script>

<style scoped>
    .nav-menu{
        display: inline-block;
        width: 10%;
        vertical-align: top;
        position: fixed;
        left:1%;
        top:110px
    }
    .nav-menu ul{
        padding: 0;
    }
    li.nav-menu-item {
        list-style-type: none;
        padding: 20px 0;
    }

    li.nav-menu-item :hover{
        color:red;
        text-decoration: underline;
        cursor: pointer;
    }

    li.nav-menu-item:nth-child(2n){
        background-color: cornsilk;
    }
    li.nav-menu-item:nth-child(2n+1){
        background-color: bisque;
    }
    li.nav-menu-item.boldTopics{
        font-weight: bold;
    }
    .textShadowed{
        text-shadow:5px 5px #fff0f0;
    }
    .linearGradiented{
        background: -webkit-linear-gradient(#eee, #333);
    }


</style>