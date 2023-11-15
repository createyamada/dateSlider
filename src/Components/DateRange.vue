<template>
    <div>
        <div ref="range" class="custom_range minmax">
            <div class="indicator"></div>
            <input
                ref="input_min"
                type="range"
                name="min"
                id="min"
                :min="min"
                :max="max"
                :value="rangeMinValue"
                :step="step"
                @input="onInput"
                @change="change"
            />
            <input
                ref="input_max"
                type="range"
                name="max"
                id="max"
                :min="min"
                :max="max"
                :value="rangeMaxValue"
                :step="step"
                @input="onInput"
                @change="change"
            />
    
            <div class="minmax_labels">
                <div>
                    <p class="minmax_label">最小</p>
                    <input class="date_input" type="text" :step="step" v-model="dateMin" disabled/>
                </div>
                <div>
                    <p class="minmax_label">最大</p>
                    <input class="date_input" type="text" :step="step" v-model="dateMax" disabled/>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref , watchEffect } from 'vue';

// ***********************************************
// *                                             
// *	変数宣言ブロック                                     
// *                                             
// ***********************************************

const { min , max , step , minValue , maxValue , dateArr } = defineProps({
    // ランジの最小値
    min: {
        type:Number,
        default: 0
    },
    // ランジの最大値
    max :{
        type:Number,
        default:100
    },
    // 増加値
    step:{
        type:Number,
        default:1
    },
    // ランジの最小選択値
    minValue:{
        type:Number,
        default:0
    },
    // ランジの最大選択値
    maxValue:{
        type:Number,
        default:100
    },
    // 表示する日付の配列
    dateArr:{
        type:Array,
        default:[]
    }
});

const emit = defineEmits([
    "update:minValue",
    "update:maxValue",
    "update:rangeMin",
    "update:rangeMax",
    "dateArr",
    "change"
]);

const range = ref(null);
const inputMin = ref(null);
const inputMax = ref(null);
const rangeMinValue = ref(minValue);
const rangeMaxValue = ref(maxValue);
const rangeMin = ref(min);
const rangeMax = ref(max);
const dateMin = ref('');
const dateMax = ref('');
const dates = ref(dateArr);

// ***********************************************
// *                                             
// *	関数宣言                                     
// *                                             
// ***********************************************

// ランジ値変更時イベント
const change = () => {
    // 親要素のchengeを発火する
    emit('change');
};

// 最小と最大の差の率を計算
const getRatio = (value , min , max) => {
    return ((value - min) / (max - min)) * 100;
};

const adaptCss = (left , right) => {
    range.value.style.setProperty("--progressLeft", `${left}%`);
    range.value.style.setProperty("--progressRight", `${right}%`);
};

// 更新時値の変更
watchEffect(() => {
    if (range.value) {
        // Emitの値にて内部変数を更新する
        emit("update:minValue" , rangeMinValue);
        emit("update:maxValue" , rangeMaxValue);
        emit("update:min" , rangeMin.value);
        emit("update:max" , rangeMax.value);


        // 配列の中のインデックスにて表示日付を選択
        const minIndex = rangeMinValue.value === rangeMax.value ? rangeMax - 1 : rangeMinValue.value;
        const maxIndex = rangeMaxValue.value === 0 ? 0 : rangeMaxValue.value - 1;

        dateMin.value = dates.value[minIndex];
        dateMax.value = dates.value[maxIndex];

        // 選択値の全体の割合を計算
        const leftRatio = getRatio(rangeMinValue.value , min , max);
        const rightRatio = 100 - getRatio(rangeMaxValue.value , min , max);

        // CSSを適応
        adaptCss(leftRatio , rightRatio);
    }
});

// 選択値がそれぞれ最大最小を越していないか
const onInput = ({ target }) => {
    if(target.name === 'min') {
        target.value > rangeMaxValue.value ? target.value = rangeMaxValue.value : rangeMinValue.value = parseFloat(target.value);
    }

    if(target.name === 'max') {
        target.value < rangeMinValue.value ? target.value = rangeMinValue.value : rangeMaxValue.value = parseFloat(target.value);
    }
};

</script>


<style scoped>

.custom_range {
    --trackHeight: 0.35rem;
    --thumbRadius: 1rem;
  }
  
  /* style the input element with type "range" */
  .custom_range input[type="range"] {
    position: relative;
    appearance: none;
    background: none;
    border-radius: 999px;
    z-index: 0;
    height: 100%;
    pointer-events: none;
  }
  
  /* ::before element to replace the slider track */
  .custom_range input[type="range"]::before {
    content: "";
    display: block;
    position: absolute;
    width: var(--ProgressPercent, 100%);
    height: 100%;
    background: #00865a;
    border-radius: 999px;
  }
  
  /* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
  .custom_range input[type="range"]::-webkit-slider-runnable-track {
    appearance: none;
    background: #005a3c;
    height: var(--trackHeight);
    border-radius: 999px;
  }
  
  .custom_range input[type="range"]::-webkit-slider-thumb {
    position: relative;
    width: var(--thumbRadius);
    height: var(--thumbRadius);
    margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
    background: #005a3c;
    border: 1px solid  #00865a;
    border-radius: 999px;
    pointer-events: all;
    appearance: none;
    z-index: 1;
  }
  
  /* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
  .custom_range.default input[type="range"]::-moz-range-track {
    appearance: none;
    background: #005a3c;
    height: var(--trackHeight);
    border-radius: 999px;
  }
  
  .custom_range input[type="range"]::-moz-range-thumb {
    position: relative;
    box-sizing: border-box;
    width: var(--thumbRadius);
    height: var(--thumbRadius);
    margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
    background: #005a3c;
    border: 1px solid  #00865a;
    border-radius: 999px;
    pointer-events: all;
    appearance: none;
    z-index: 1;
  }
  
  .custom_range.minmax {
    position: relative;
    height: var(--trackHeight);
    background: #005a3c;
    border-radius: 999px;
    margin: 0.5rem 0;
    --progressLeft: 0%;
    --progressRight: 0%;
  }
  
  .custom_range .indicator {
    position: absolute;
    height: 100%;
    pointer-events: none;
    left: var(--thumbRadius);
    right: var(--thumbRadius);
  }
  
  .custom_range .indicator::before {
    content: "";
    position: absolute;
    background: #00865a;
    height: 100%;
    left: var(--progressLeft);
    right: var(--progressRight);
  }
  
  .custom_range.minmax input[type="range"] {
    position: absolute;
    width: calc(100% - var(--thumbRadius));
  }
  
  .custom_range.minmax input[type="range"][name="max"] {
    left: var(--thumbRadius);
  }
  
  .custom_range.minmax input[type="range"]::-webkit-slider-runnable-track {
    background: none;
  }
  
  .custom_range.minmax input[type="range"]::before {
    display: none;
  }
  
  .minmax_labels {
    display: flex;
    justify-content: space-between;
  }
  
  .minmax_labels input {
    width: 200px;
  }
</style>