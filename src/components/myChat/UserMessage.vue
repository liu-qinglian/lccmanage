 <template>
  <div id="uesrtext">
    <textarea
      placeholder="按 Ctrl + Enter 发送"
      v-model="content"
      v-on:keyup="addMessage"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "uesrMessage",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    addMessage(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.$store.commit("addMessage", this.content);
        this.content = "";

        // let msgObj = new Object();
        // msgObj.to = "fff";
        // msgObj.content = this.content;
        // this.$store.state.stomp.send("", {}, JSON.stringify(msgObj));
      }
    },
  },
};
</script>

<style   scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #ddd;
}
#uesrtext > textarea {
  padding: 10px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
</style>