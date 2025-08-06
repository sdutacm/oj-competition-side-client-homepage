<script setup>
import { ref } from "vue";
import ReleaseItem from "./ReleaseItem.vue";
import { ElTag } from "element-plus";
import { getVersions, getVersionDownloads } from "@/utils/downloadUrlGenerator";

const activeNames = ref(["1"]);

const handleChange = (val) => {
  console.log(val);
};

// 从环境变量获取版本列表
const versions = getVersions();

// 生成特定版本的描述数据
function genDesc(version, sys) {
  const versionDownloads = getVersionDownloads(version);
  return versionDownloads[sys] || [];
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
          <ReleaseItem system="Windows" :description="genDesc(version, 'Windows')" :version="version" />
          <ReleaseItem system="macOS" :description="genDesc(version, 'macOS')" :version="version" />
          <ReleaseItem system="Linux" :description="genDesc(version, 'Linux')" :version="version" />
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
  
  // 移动端适配
  @media screen and (max-width: 1000px) {
    width: 90% !important;
  }
  
  // 平板适配
  @media screen and (min-width: 1001px) and (max-width: 1024px) {
    width: 80% !important;
  }
  
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
    position: relative;
    
    // 移动端适配
    @media screen and (max-width: 1000px) {
      font-size: var(--text-medium-size);
      height: 3.5rem;
      padding: 0 1rem;
    }
    
    // 平板适配
    @media screen and (min-width: 1001px) and (max-width: 1024px) {
      font-size: var(--text-medium-size);
      height: 3.8rem;
    }
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
  aspect-ratio: 3/1;
  // height: 15rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  // 移动端适配
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    aspect-ratio: auto;
    gap: 1rem;
    padding: 1rem 0;
    align-items: stretch;
  }
  
  // 平板适配
  @media screen and (min-width: 1001px) and (max-width: 1024px) {
    aspect-ratio: 2/1;
    gap: 1rem;
  }
}
</style>
