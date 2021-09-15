<template>
  <vue-editor v-if="editable" v-model="content"/>
  <div v-else v-html="value"></div>
</template>


<script>
import { VueEditor } from 'vue2-editor';
export default {
  components: {
    VueEditor,
  },
  props: {
    editable: {
      type: Boolean,
      required: true
    },
    value: {
      type: String,
      required:true
    }
  },
  data() {
    return {
      content: ''
    }
  },
  watch: {
    content(newContent) {
      this.$emit('change', newContent);
    },
    value: {
      immediate: true,
      handler: function (newValue) {
        this.content = newValue;
      }
    },
  }
}

</script>

