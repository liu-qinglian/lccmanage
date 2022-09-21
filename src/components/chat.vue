<template>
  <div id="chat">
    <div class="sidebar">
      <cards></cards>
      <lists></lists>
    </div>
    <div class="main">
      <messages></messages>
      <userMessage></userMessage>
    </div>
  </div>
</template>

<script>
import cards from "./myChat/Cards.vue";
import lists from "./myChat/Lists.vue";
import userMessage from "./myChat/UserMessage.vue";
import messages from "./myChat/Messages.vue";
export default {
  name: "chat",
  data() {
    return {};
  },
  mounted: function () {
    this.$store.dispatch("initData");
  },
  components: {
    cards,
    lists,
    messages,
    userMessage,
  },
};
</script>


<style scoped>
#chat {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
}
.sidebar,
.main {
  height: 100%;
}
.sidebar {
  float: left;
  color: #f4f4f4;
  background-color: #2e3238;
  width: 200px;
}
.main {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
</style>