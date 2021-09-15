<template>
  <el-dialog title="更新base"  width="400px" visible @close="handleCancel">
    <el-form :model="initForm">
      <el-form-item label="名称:" class="update-form-item">
        <el-input v-model="initForm.name" class="form-input" size="small"/>
      </el-form-item>
      <el-form-item label="描述:" class="update-form-item">
        <el-input v-model="initForm.desc" class="form-input" size="small"/>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button @click="handleCancel" size="mini">取消</el-button>
        <el-button @click="handleSubmit" size="mini" type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
  .update-form-item {

    display: flex;
  }
  .update-form-item .el-input {
    width: 300px;
  }
</style>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      initForm: {
        id: -1,
        name: '',
        desc: ''
      }
    }
  },
  methods: {
      handleCancel() {
        this.$emit('close');
      },
      async handleSubmit() {
        await this.$store.dispatch('updateBase', this.initForm);
        this.$emit('close');
      }
  },
  mounted() {
    this.initForm = this.form;
  }
}

</script>

