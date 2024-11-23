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
        <h1 class="text-2xl font-bold text-blue-600">{{ currentCategory.name }}</h1>
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
      return this.categories.findIndex(c => c.id === parseInt(this.id))
    },
    categoryQuestions() {
      return this.questions[this.id] || []
    },
    notFillAll() {
      return true;
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