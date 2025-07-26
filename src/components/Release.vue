<template>
    
  <div class="release-container">
    <el-collapse
      class="collapse-full"
      v-model="activeNames"
      @change="handleChange"
    >
      <el-collapse-item v-for="version in versions" :key="version" class="collapse-item" :title="version" :name="version">
        <div class="release-items">
          <ReleaseItem
            system="Windows"
            description="Windows(x64)"
          />
          <ReleaseItem
            system="Windows"
            description="Windows(x86)"
          />
          <ReleaseItem
            system="Windows"
            description="Windows(x64)"
          />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ReleaseItem from "./ReleaseItem.vue";
const activeNames = ref(["1"]);
import { versions } from "@/config/data.js";
const handleChange = (val) => {
  console.log(val);
};
</script>

<style scoped lang="less">
.release-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  ::v-deep(.el-collapse-item__header),
  ::v-deep(.el-collapse-item__wrap) {
    background-color: transparent !important;
    box-shadow: none;
  }
  ::v-deep(.el-collapse-item__header)
   {
    border-top: 1px solid rgba(169, 169, 169, 0.3); // 你想要的颜色
    //   border-bottom: 1px solid rgba(169, 169, 169, 0.3); // 你想要的颜色
    font-size: var(--text-large-size);
  }
  ::v-deep(.el-collapse-item__wrap) {
    border: none;
    margin: 0;
    padding: 0;
  }
}

.collapse-full {
  width: 100%;
}

.collapse-item {
  background-color: transparent;
}

.release-items {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
