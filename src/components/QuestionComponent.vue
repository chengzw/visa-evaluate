<template>
  <div class="question-container" :class="{'py-3 px-4': nestingLevel > 0}">
    <div class="mb-4">
      <p class="text-lg font-medium text-gray-700 mb-2"><span v-if="question.must && question.type !== 'input' && question.text !== ''" class="star">*</span>{{ question.text }} [{{ valid }}]</p>
      <p><span v-if="subQuestionValid">valid</span><span v-else>invalid</span> {{ value }}</p>

      <!-- 输入题 -->
      <!-- <div v-else-if="question.type === 'input'" class="space-y-3"> -->
      <div class="space-y-3 more-space">
        <div v-for="field in question.fields" :key="field" class="flex flex-col">
          <label 
            :for="field + '-' + question.id" 
            class="text-sm text-gray-600 mb-1"
          >
            <span v-if="question.must" class="star">*</span>{{ field }}
          </label>
          <input
            type="text"
            :id="field + '-' + question.id"
            :value="getValue(field)"
            @input="handleInput($event.target.value, field)"
            class="form-input px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
        </div>
      </div>

      <!-- 多选题 -->
      <div class="space-y-2">
        <div v-for="check in question.checks" :key="check">
          <div class="flex items-center">
            <input
              type="checkbox"
              :id="'check-' + question.id + '-' + check"
              :value="check"
              @change="handleInput(check)"
              class="form-checkbox h-4 w-4 text-blue-600 cursor-pointer"
            >
            <label 
              :for="'check-' + question.id + '-' + check" 
              class="ml-2 text-gray-700 cursor-pointer hover:text-blue-600"
            >
            {{ check }}
            </label>
          </div>
        </div>
      </div>
      
      <!-- 单选题 -->
      <!-- <div v-if="question.type === 'radio'" class="space-y-2"> -->
      <div class="space-y-2">
        <div v-for="option in question.options" :key="option">
          <div class="flex items-center">
            <input
              type="radio"
              :id="'option-' + question.id + '-' + option"
              :value="option"
              :checked="value?.answer === option"
              @change="handleInput(option)"
              class="form-radio h-4 w-4 text-blue-600 cursor-pointer"
            >
            <label 
              :for="'option-' + question.id + '-' + option" 
              class="ml-2 text-gray-700 cursor-pointer hover:text-blue-600"
            >
              {{ option }}
            </label>
          </div>

          <div id="sub" v-if="subQuestions && subQuestions.length > 0 && value?.answer === option">
            <!-- 嵌套的子问题 -->
            <transition name="fade">
              <div 
                v-if="showSubQuestions"
                class="ml-1 mt-4 border-l-2 border-blue-200 pl-2 rounded-r"
                :class="{
                  'bg-blue-50': nestingLevel === 1,
                  'bg-blue-100': nestingLevel === 2,
                  'bg-blue-200': nestingLevel >= 3
                }"
              >
                <question-component
                  v-for="subQuestion in subQuestions"
                  :key="subQuestion.id"
                  :question="subQuestion"
                  :value="getSubQuestionValue(subQuestion.id)"
                  :nesting-level="nestingLevel + 1"
                  @input="handleSubQuestionInput(subQuestion.id, $event)"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>

            <!-- 嵌套的子问题 -->
            <!-- <transition name="fade">
              <div 
                v-if="showSubQuestions" dat="{option}"
                class="ml-6 mt-4 border-l-2 border-blue-200 pl-4 rounded-r"
                :class="{
                  'bg-blue-50': nestingLevel === 1,
                  'bg-blue-100': nestingLevel === 2,
                  'bg-blue-200': nestingLevel >= 3
                }"
              >
                <question-component
                  v-for="subQuestion in subQuestions"
                  :key="subQuestion.id"
                  :question="subQuestion"
                  :value="getSubQuestionValue(subQuestion.id)"
                  :nesting-level="nestingLevel + 1"
                  @input="handleSubQuestionInput(subQuestion.id, $event)"
                />
              </div>
            </transition> -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    },
    nestingLevel: {
      type: Number,
      default: 0
    }
  },
  computed: {
    showSubQuestions() {
      return this.question.subQuestions && 
             this.question.subQuestions[this.value?.answer] &&
             this.question.type === 'radio'
    },
    subQuestionValid() {
      if (!this.question.must) return true
      if (this.question.type === 'input') {
        return Object.values(this.value?.fields || {}).some(field => field.trim()!== '')
      } else if (this.question.type === 'checkbox') {
        return this.value?.answer && this.value?.answer.length > 0
      }
      else if (this.question.type === 'radio') {
        return this.question.type === 'radio' && this.value?.answer && this.value?.answer.length > 0
      }
      return true;
    },
    subQuestions() {
      return this.question.subQuestions?.[this.value?.answer] || []
    },
    valid() {
      if (this.question.must && this.question.type === 'radio') {
        return this.value?.answer && this.value?.answer.length > 0
      } else if (this.question.must && this.question.type === 'input') {
        return Object.values(this.value?.fields || {}).some(field => field.trim()!== '')
      } else if (this.question.must && this.question.type === 'checkbox') {
        return this.value?.answer && this.value?.answer.length > 0
      } else {
        return true
      }
    }
  },
  methods: {
    handleInput(val, field = null) {
      if (this.question.type === 'input') {
        const newValue = {
          type: 'input',
          fields: { ...(this.value?.fields || {}) }
        }
        newValue.fields[field] = val
        this.$emit('input', newValue)
      } else {
        // 当选择改变时，保留答案但清除子问题的答案
        this.$emit('input', {
          type: 'radio',
          answer: val,
          subAnswers: {}
        })
      }
    },
    getValue(field) {
      return this.value?.fields?.[field] || ''
    },
    getSubQuestionValue(questionId) {
      return this.value?.subAnswers?.[questionId]
    },
    handleSubQuestionInput(questionId, answer) {
      const newValue = {
        ...this.value,
        subAnswers: {
          ...(this.value?.subAnswers || {}),
          [questionId]: answer
        }
      }
      this.$emit('input', newValue)
    }
  }
}
</script>

<style scoped>
.question-container {
  transition: all 0.3s ease;
}

.question-container:hover {
  background-color: rgba(239, 246, 255, 0.5);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

input[type="radio"] {
  cursor: pointer;
}

input[type="text"]:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.more-space {
  margin-bottom: 16px !important;
}
</style>