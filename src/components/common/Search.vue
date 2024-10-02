<template>
  <div class="flex w-50 mt-3 gap-3">
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      v-model="localParams.keyword"
      @keyup.enter="onSearch"
    />
    <button class="btn btn-primary" type="button" @click="onSearch">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// 부모 컴포넌트에서 전달받은 props
const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    default: '검색어를 입력해주세요.', // 기본 플레이스홀더 텍스트
  },
  buttonText: {
    type: String,
    default: '검색', // 기본 버튼 텍스트
  },
});

const emit = defineEmits(['update:params']);

const localParams = ref({
  keyword: props.params.keyword || '',
});

// 키워드가 변경될 때마다 로컬 상태(localParams)와 부모 컴포넌트의 상태 동기화
watch(
  () => props.params,
  newParams => {
    localParams.value.keyword = newParams.keyword || '';
  },
  { immediate: true },
);

const onSearch = () => {
  emit('update:params', {
    ...props.params,
    keyword: localParams.value.keyword,
    page: 0, // 검색 시 첫 페이지로 이동
  });
};
</script>

<style scoped></style>
