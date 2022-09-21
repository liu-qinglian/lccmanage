<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane name="DepMana" label="部门管理">
        <DepMana> </DepMana>
      </el-tab-pane>
      <el-tab-pane name="PosMana" label="职位管理"
        >职位管理<PosMana> </PosMana
      ></el-tab-pane>
      <el-tab-pane name="JobMana" label="职称管理"
        >职称管理<JobMana> </JobMana
      ></el-tab-pane>
      <el-tab-pane name="EcMana" label="奖惩规则"
        >奖惩规则<EcMana> </EcMana
      ></el-tab-pane>
      <el-tab-pane name="PermissMana" label="权限组"
        >权限组<PermissMana> </PermissMana
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepMana from "../../components/sys/basic/DepMana.vue";
import PosMana from "../../components/sys/basic/PosMana.vue";
import JobMana from "../../components/sys/basic/JobMana.vue";
import EcMana from "../../components/sys/basic/EcMana.vue";
import PermissMana from "../../components/sys/basic/PermissMana.vue";

export default {
  name: "sysBasic",
  components: { DepMana, EcMana, JobMana, PermissMana, PosMana },
  data() {
    return {
      activeName: "DepMana",
    };
  },
};
</script>

<style>
</style>