<template>

  <div id="app">
    <header>Welcome to Vue.js</header>
    <NavigationMenu></NavigationMenu>
    <SectionInfo/>
  </div>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue'
import SectionInfo from './components/SectionInfo.vue'

export default {
  name: 'app',
  components: {
      NavigationMenu,
      SectionInfo
  },
    mounted(){
        this.myMethod();
        this.clickHandler();
    },
    methods:{
        myMethod(){
            var infoItem = document.getElementsByClassName('info-item');
            var scrollPos = false;
            document.getElementById("1").classList.add("activeElem");
            window.addEventListener('scroll',function(){
                var currentSection, currentScroll, infoItemLen;
                currentScroll = document.getElementsByTagName("html")[0].scrollTop;
                infoItemLen = infoItem.length;
                for(var i=0;i<infoItemLen;i++){
                     var divPosition = infoItem[i].offsetTop;
                     if( divPosition - 1 < currentScroll ){
                        currentSection = infoItem[i];
                     }
                }
                if(currentSection && currentSection.getAttribute('id') !== 5) {
                    var id;
                    scrollPos = true;
                    if (scrollPos) {
                        document.getElementsByClassName('activeElem')[0].classList.remove("activeElem");
                        id = currentSection.getAttribute('id');
                        document.getElementById(id - 4).classList.add("activeElem");
                    }
                }
            });
        },
        clickHandler(){
            document.body.addEventListener('click',function(event){
                var currentTopic, currSection, topicInfo, evtTgtLi, topicId;
                evtTgtLi = event.target.closest("li");
                if(evtTgtLi && evtTgtLi.className == "nav-menu-item"){
                    topicInfo = event.target.closest("li");
                }
                if(topicInfo && topicInfo.id){
                    topicId = Number(topicInfo.id)+4;
                    document.getElementById(topicId).scrollIntoView(true);
                }
            });

        }
    }
}

</script>

<style>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: floralwhite;
}
  header {
    background-color: gold;
    padding: 20px;
    font-family: fantasy;
    font-size: 22px;
    position: fixed;
    width: 100%;
  }
  .activeElem{
      color:red;
      text-decoration: underline;
      cursor: pointer;
  }
</style>
