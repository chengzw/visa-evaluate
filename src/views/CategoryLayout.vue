<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Progress bar -->
    <div class="max-w-3xl mx-auto mb-8">
      <div class="flex justify-between mb-2">
        <span class="text-sm text-blue-600 font-medium">进度</span>
        <span class="text-sm text-blue-600 font-medium">{{ currentCategoryIndex + 1 }} / {{ categories.length }}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          :style="{ width: `${((currentCategoryIndex + 1) / categories.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <!-- Category header -->
      <div class="bg-blue-50 p-6 rounded-t-lg border-b border-blue-100">
        <h1 v-if="currentCategory" class="text-2xl font-bold text-blue-600">{{ currentCategory.name }}</h1>
        <p class="text-gray-600 mt-2">请认真填写以下问题，带 <span class="star">*</span> 的为必填项</p>
      </div>
      
      <!-- Questions -->
      <div class="p-6">
        <div v-for="question in categoryQuestions" :key="question.id" class="mb-8 last:mb-0">
          <question-component
            :question="question"
            :value="getAnswer(question.id)"
            @input="handleAnswer(question.id, $event)"
          />
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
        <div class="flex justify-between">
          <button
            v-if="currentCategoryIndex > 0"
            @click="navigateToCategory(currentCategoryIndex - 1)"
            class="px-6 py-2 bg-white border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors duration-200"
          >
            上一步
          </button>
          <button
            v-if="currentCategoryIndex < categories.length - 1"
            @click="navigateToCategory(currentCategoryIndex + 1)"
            :disabled="notFillAll"
            class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 ml-auto disabled:opacity-25 disabled:cursor-not-allowed"
          >
            下一步
          </button>
          <button
            v-else
            @click="submitSurvey"
            class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 ml-auto disabled:opacity-25 disabled:cursor-not-allowed"
          >
            提交问卷
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionComponent from '../components/QuestionComponent.vue'
import axios from 'axios'

export default {
  name: 'CategoryLayout',
  components: {
    QuestionComponent
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created() {
    this.$store.dispatch('fetchData');
  },
  computed: {
    ...mapState(['categories', 'questions', 'answers']),
    currentCategory() {
      // console.log('finding category for current: ', parseInt(this.id))
      let category = this.categories.find(c => c.id === parseInt(this.id))
      return category
    },
    currentCategoryIndex() {
      // console.log("this.id: ", this.id, 'categories: ', this.categories)
      return this.categories.findIndex(c => c.id === parseInt(this.id))
    },
    categoryQuestions() {
      return this.questions[this.id] || []
    },
    notFillAll() {
      return !this.allQuestionValid()
    }
  },
  methods: {
    getAnswer(questionId) {
      return this.answers[this.id]?.[questionId]
    },
    handleAnswer(questionId, answer) {
      console.log('handleAnswer', questionId, answer)
      this.$store.commit('setAnswer', {
        categoryId: parseInt(this.id),
        questionId,
        answer
      })
      console.log('handleAnswer call allQuestionValid: ', this.allQuestionValid())
    },
    allQuestionValid() {
      // 使用every方法遍历数组，确保所有问题都有效
      return this.categoryQuestions.every(question => {
        // 直接返回问题的有效性
        const answer = this.getAnswer(question.id)
        const valid = this.checkQuestionValid(question, answer);
        console.log('allQuestionValid. question: ', question, answer, "valid: ", valid)
        return valid
      });
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
    navigateToCategory(index) {
      const nextCategory = this.categories[index]
      this.$router.push(`/category/${nextCategory.id}`)
    },
    async submitSurvey() {
      try {
        const success = await this.$store.dispatch('submitSurvey')
        if (success) {
          this.$store.commit('showNotification', {
            type: 'success',
            message: '问卷提交成功！感谢您的参与。'
          })
        } else {
          throw new Error('提交失败')
        }
      } catch (error) {
        this.$store.commit('showNotification', {
          type: 'error',
          message: '提交失败，请稍后重试。'
        })
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
<style>
.star {
  color: red;
  padding-top: 5px;
}
</style>