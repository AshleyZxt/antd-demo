<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="email" label="email" name="email">
      <a-input v-model:value="formState.email" placeholder="请输入以135/186开头的11位数字" />
    </a-form-item>
    <a-form-item ref="phone" label="phone" name="phone">
      <a-input v-model:value="formState.phone" placeholder="请输入以135/186开头的11位数字" />
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from "vue";
export default defineComponent({
  setup() {
    const formRef = ref();
    const formState = reactive({
      email: "",
      phone: "",
    });
    let validatePass = async (rule, value) => {
      if (value.length !== 11) {
        return Promise.reject("格式有误, 请检查格式后重试");
      } else {
        const regs = /^((135)|(186))\d{8}$/;
        if (regs.test(value) == true) {
          formRef.value.validateFields("");
        } else {
          return Promise.reject("格式有误, 请检查格式后重试");
        }
        return Promise.resolve();
      }
    };
    const rules = {
      email: [
        {
          required: true,
          validator: validatePass,
          trigger: "blur",
        }
      ],
      phone: [
        {
          required: true,
          validator: validatePass,
          trigger: "blur",
        },
      ],
    };

    return {
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      rules,
    };
  },
});
</script>