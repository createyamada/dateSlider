<template>
  <p>日付ランジ</p>
  <DateRange :min="min" :max="max" :minValue="minValue" :maxValue="maxValue" :dateArr="dateArr" @change="changeDate()" />
</template>


<script setup>
import { ref , onBeforeMount } from 'vue';
import { getPeriodDate } from './Utils/Format';
import DateRange from '@/Components/DateRange.vue';

// ***********************************************
// *                                             
// *	変数宣言ブロック                                     
// *                                             
// ***********************************************
// ランジ最小値
const min = ref(0);
// ランジ最大値
const max = ref(0);
// ランジ最小選択値
const minValue = ref(0);
// ランジ最大選択値
const maxValue = ref(0);
// 年月配列
const dateArr = ref([]);

// ***********************************************
// *                                             
// *	関数宣言ブロック                                     
// *                                             
// ***********************************************
onBeforeMount(async() => {

  if(maxValue.value === 0) {
    // 期間日付配列を取得
    dateArr.value = getPeriodDate();
    min.value = 0;
    max.value = dateArr.value.length;
    minValue.value = 0;
    maxValue.value = dateArr.value.length;
    console.log('表示：'+dateArr.value.length)
  }

});

// ランジ変更時イベント
const changeDate = async() => {
  console.log('日付変更');
};

</script>




<style scoped>

</style>
