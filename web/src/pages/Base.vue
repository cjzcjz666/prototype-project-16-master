<template>
  <div class="base">
    <el-form :model="form" class="base-form">
      <el-form-item label="名称:" class="form-item">
        <el-input v-model="form.name" class="form-input" size="small" />
      </el-form-item>
      <el-form-item label="描述:" class="form-item">
        <el-input v-model="form.desc" class="form-input" size="small" />
      </el-form-item>
      <el-form-item class="form-item">
        <el-button @click="addBase" size="small" type="primary">添加</el-button>
      </el-form-item>
    </el-form>
    <update-base-modal v-if="updateModalDisplay" :form="updatedForm" @close="hideUpdateModal" />
    <el-table :data="bases">
      <el-table-column label="ID" prop="id" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="描述" prop="desc" />
      <el-table-column label="创建时间" prop="createdAt" />
      <el-table-column label="更新时间" prop="updatedAt" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="updateBase(scope.row)">更新</el-button>
          <el-button size="mini" type="danger" @click="deleteBase(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.base {
}

.base-form {
  display: flex;
  margin: 20px 0;
}

.form-item {
  display: flex;
  margin-right: 40px;
}
</style>

<script lang="ts">
import { uploadFile } from "../utils/upload";
import UpdateBaseModal from "../components/base/UpdateBaseModal.vue";
export default {
  components: { UpdateBaseModal },
  data() {
    return {
      updateModalDisplay: false,
      form: {
        name: "",
        desc: ""
      },
      updatedForm: {
        id: 0,
        name: "",
        desc: ""
      }
    };
  },
  computed: {
    bases() {
      return this.$store.state.bases;
    }
  },
  methods: {
    async requestBases() {
      await this.$store.dispatch("requestBases");
    },
    async addBase() {
      await this.$store.dispatch("addBase", this.form);
      this.form = {
        name: "",
        desc: ""
      };
    },
    async deleteBase(id) {
      try {
        await this.$confirm("确认删除该base？", "提示", {
          type: "warning"
        });
        await this.$store.dispatch("deleteBase", { id });
      } catch (e) {}
    },
    updateBase(payload) {
      this.updatedForm = {
        id: payload.id,
        name: payload.name,
        desc: payload.desc
      };
      this.updateModalDisplay = true;
    },
    hideUpdateModal() {
      this.updateModalDisplay = false;
    }
  },
  async mounted() {
    await this.requestBases();
  }
};
</script>

