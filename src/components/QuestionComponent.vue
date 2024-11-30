<template>
  <div class="question-container" :class="{'py-3 px-4': nestingLevel > 0}">
    <div class="mb-4">
      <p class="text-lg font-medium text-gray-700 mb-2"><span v-if="question.must && question.type !== 'input' && question.text !== ''" class="star">*</span>{{ question.text }}</p>

      <!-- 输入题 -->
      <!-- <div v-else-if="question.type === 'input'" class="space-y-3"> -->
      <div class="space-y-3 more-space">
        <div v-for="field in question.fields" :key="field" class="flex flex-col">
          <label 
            :for="field + '-' + question.id" 
            class="text-sm text-gray-600 mb-1"
          >
            <span v-if="question.fields_must[field]" class="star">*</span>{{ field }}
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
              v-model="selectedAnswers"
              @change="handleInput()"
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
  data() {
    return {
      selectedAnswers: this.value?.answers || []
    }
  },
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
      return this.getSubQuestionValid()
      // if (!this.question.must) return true
      // console.log()
      // let isValid = true
      // return isValid
      // switch (this.question.type) {
      //   case "radio":
      //     isValid = (this.value?.answer && this.value?.answer.length > 0) ? true : false
      //     break
      //   case "checkbox":
      //     isValid = (this.value?.answer && this.value?.answer.length > 0) ? true : false
      //     break
      //   case "input":
      //     isValid = (Object.values(this.value?.fields || {}).some(field => field.trim()!== '  ')) ? true : false  
      //     break;
      // }
      // if (this.question.type === 'input') {
      //   return Object.values(this.value?.fields || {}).some(field => field.trim()!== '')
      // } else if (this.question.type === 'checkbox') {
      //   return this.value?.answer && this.value?.answer.length > 0
      // }
      // else if (this.question.type === 'radio') {
      //   if (!this.value?.answer || this.value?.answer.length == 0) {
      //     return false;
      //   }
      //   if (this.question.subQuestions) {
      //     let subQuestion = this.question.subQuestion[this.value.answer]
      //     console.log(subQuestion);
      //   }
      // }
      // return true;
    },
    subQuestions() {
      return this.question.subQuestions?.[this.value?.answer] || []
    },
    valid() {
      // return this.getValid()
      return this.checkQuestionValid(this.question, this.value)
    }
  },
  methods: {
    handleInput(val, field = null) {
      // console.log("handleInput:", val, field, this.value)
      if (this.question.type === 'input') {
        const newValue = {
          type: 'input',
          valid: this.getValid(),
          fields: { ...(this.value?.fields || {}) }
        }
        newValue.fields[field] = val
        newValue.valid = this.valid
        this.question.valid = this.valid
        this.$emit('input', newValue)
      }
      else if (this.question.type == 'check') {
        const newValue = {
          type: 'check',
          answers: this.selectedAnswers,
        }
        // console.log("check answers:", newValue)
        this.question.valid = this.valid
        this.$emit('input', newValue)
      } else {
        // 当选择改变时，保留答案但清除子问题的答案
        const newValue = {
          type: 'radio',
          answer: val,
          subAnswers: {}
        }
        this.question.valid = this.valid
        console.log("handleInput will emit value:", newValue, "question " + this.question.id + " valid: ", this.question.valid)
        this.$emit('input', newValue)
      }
    },
    getValue(field) {
      return this.value?.fields?.[field] || ''
    },
    getSubQuestionValue(questionId) {
      return this.value?.subAnswers?.[questionId]
    },
    getSubQuestionFromValue(question, value) {
      // 目前只有options类型的子问题
      if (!question.subQuestions)  {
        return null;
      }
      // 本问题有subQuestions
      const subQuestion = Object.keys(question.subQuestions).includes(value.answer) ? question.subQuestions[value.answer] : null;
      if (subQuestion && subQuestion.length > 0) {
        return subQuestion[0]
      }
      return subQuestion
    },
    getSubValueFromValue(subQuestion, value) {
      // console.log("get subValue from value: ", subQuestion, value, "keys: ", Object.keys(value.subAnswers), "subQuestion.id: ", subQuestion.id)
      if (!value.subAnswers) {
        return null
      }
      const subValue = Object.keys(value.subAnswers).includes(subQuestion.id.toString()) ? value.subAnswers[subQuestion.id] : null;
      // console.log("getSubValueFromValue got subValue:", subValue)
      return subValue
    },
    checkQuestionValid(question, value) {
      const debugId = 0
      if (question.id == debugId) {
        console.log("checkQuestionValid for ", question, value)
      }
      if (!question.must) {
        console.log("checkQuestionValid: ", question.text, " is not must: true")
        question.valid = true
        return true
      }
      if (!value) {
        console.log("checkQuestionValid: ", question.text, " has no value: false")
        question.valid = false
        return false
      }
      // 先检查当前问题是否已经正确回答
      if (question.options) {
        // 有options需要选择，value里必须有answer
        if (!value.answer || value.answer.length == 0 || question.options.indexOf(value.answer) === -1) {
          // console.log("checkQuestionValid: ", question.text, " has no valid answer: false")
          question.valid = false
          return false
        }
        if (question.id == debugId) {
          console.log("start get subquestion and subvalue")
        }
        const subQuestion = this.getSubQuestionFromValue(question, value)
        if (!subQuestion) {
          // console.log("checkQuestionValid: ", question.text, " has no subQuestion for ", value.answer, ": true")
          question.valid = true
          return true
        }
        const subValue = this.getSubValueFromValue(subQuestion, value)
        if (question.id == debugId) {
          console.log("start check subquestion: ", subQuestion, subValue)
        }
        const subQuestionValid = this.checkQuestionValid(subQuestion, subValue)
        if (question.id == debugId) {
          console.log("checkQuestionValid for subquestion: ", question.text, ", subQuestion: ", subQuestion, ", subValue: ", subValue, " is valid: ", subQuestionValid)
        }
        question.valid = subQuestionValid
        return subQuestionValid
      }
      else if (question.fields) {
        // 使用some方法遍历数组
        // console.log("checkdQuestionValid: question " + question.id + " has fields: ", question)
        const foundInvalid = question.fields.some(field => {
          const must = Object.keys(question.fields_must).includes(field) ? question.fields_must[field] : false;
          if (!must) {
            console.log(field, ": must is false: valid")
            return false
          }
          // 调用自定义函数判断元素
          const result = (value?.fields?.[field] || '').trim()
          // 如果函数返回空字符串，则结束遍历
          // console.log(field, " result: ", result)
          return result === '';
        });
        // console.log("checkQuestionValid: ", question.text, ", is valid: ", !foundInvalid)
        question.valid = !foundInvalid
        return !foundInvalid;
      }
      else if (question.checks) {
        const answers = value?.answers || []
        const valid = answers.length > 0
        // console.log("checkQuestionValid: ", question.text, ", checkbox answers: ", value.answers, ", is valid: ", valid)
        question.valid = valid
        return valid
      }
      question.valid = true
      return true
    },
    getValid() {
      if (!this.question.must) return true
      let isValid = true
      if (this.question.fields) {
        // 使用some方法遍历数组
        const foundInvalid = this.question.fields.some(field => {
          // 调用自定义函数判断元素
          const result = this.getValue(field).trim();
          // 如果函数返回空字符串，则结束遍历
          console.log(field, result)
          return result === '';
        });
        isValid =!foundInvalid;
      }
      else if (this.question.options) {
        isValid = (this.value?.answer && this.value?.answer.length > 0) ? true : false
        console.log("getValid for question [" + this.question.text + "]: ", isValid, this.value?.answer)
      }
      // console.log("getValid: ", isValid)
      return isValid
    },
    getSubQuestionValid() {
      // console.log("getSubQuestionValid: ", this.question, this.answer)
      return this.answer
    },
    handleSubQuestionInput(questionId, answer) {
      console.log("handleSubQuestionInput: ", questionId, answer, this.question)
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