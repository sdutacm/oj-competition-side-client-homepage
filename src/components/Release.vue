<script setup>
import { ref } from "vue";
import ReleaseItem from "./ReleaseItem.vue";
const activeNames = ref(["1"]);
import { LinuxData, WindowsData, MacOSData } from "@/config/data.js";
import { versions } from "@/config/data.js";
import { ElTag } from "element-plus";
const handleChange = (val) => {
  console.log(val);
};

function genDesc(version, sys) {
  switch (sys) {
    case "Windows":
      return WindowsData.find((item) => item.version === version)?.description || [];
    case "Linux":
      return LinuxData.find((item) => item.version === version)?.description || [];
    case "macOS":
      return MacOSData.find((item) => item.version === version)?.description || [];
    default:
      return [];
  }
}

</script>

<template>
  <div class="release-container">
    <el-collapse
      class="collapse-full"
      v-model="activeNames"
      @change="handleChange"
    >
      <el-collapse-item
        v-for="(version, index) in versions"
        :key="index"
        class="collapse-item"
        :name="`${index + 1}`"
      >
      <template #title>
        {{ version }}
        <el-tag v-if="index === 0" type="info" >
          最新版本
        </el-tag>
      </template>
        <div class="release-items">
          <ReleaseItem system="Windows" :description="genDesc(version, 'Windows')" />
          <ReleaseItem system="macOS" :description="genDesc(version, 'macOS')" />
          <ReleaseItem system="Linux" :description="genDesc(version, 'Linux')" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>



<style scoped lang="less">
.release-container {
  width: 60% !important;
  position: relative;
  overflow: hidden;
  ::v-deep(.el)-collapse {
    border: none;
  }
  ::v-deep(.el-collapse-item__header),
  ::v-deep(.el-collapse-item__wrap) {
    background-color: transparent !important;
    box-shadow: none;
    color: var(--text-color);
  }
  ::v-deep(.el-collapse-item__header) {
    border-top: 1px solid var(--text-color);
    border-bottom: none;
    font-size: var(--text-large-size);
    height: 4rem;
  }
  ::v-deep(.el-collapse-item__wrap) {
    border-bottom: none;
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
