<template>
  <div id="list">
    <ul>
      <li
        v-for="(item, key) in admins"
        :key="key"
        :class="{ active: item.id === currentSessionId }"
        v-on:click="changeCurrentSessionId(item.id)"
      >
        <!--   :class="[item.id === currentSessionId ? 'active':'']" -->
        <img class="avatar" :src="item.userFace" :alt="item.name" />
        <p class="name">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "lists",
  data() {
    return {};
  },
  computed: { ...mapState(["sessions", "admins", "currentSessionId"]) },
  methods: {
    changeCurrentSessionId: function (id) {
      this.$store.commit("changeCurrentSessionId", id);
    },
  },
};
</script>

<style   scoped>
#list li {
  padding: 12px 15px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
}
#list:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

li.active {
  /*注意这个是.不是冒号:*/
  background-color: rgba(255, 255, 255, 0.1);
}
.avatar {
  border-radius: 2px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.name {
  display: inline-block;
  margin-left: 15px;
}
</style>