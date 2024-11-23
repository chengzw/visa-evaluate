import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    questions: [],
    answers: {},
    notification: {
      show: false,
      type: 'success',
      message: ''
    }
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
    setQuestions(state, payload) {
      state.questions = payload;
    },
    setAnswer(state, { categoryId, questionId, answer }) {
      if (!state.answers[categoryId]) {
        Vue.set(state.answers, categoryId, {})
      }
      Vue.set(state.answers[categoryId], questionId, answer)
    },
    showNotification(state, { type, message }) {
      state.notification = {
        show: true,
        type,
        message
      }
      setTimeout(() => {
        state.notification.show = false
      }, 3000)
    }
  },
  actions: {
    fetchData({ commit }) {
      // console.log('Fetching data')
      axios.get('https://api.ip008.com/visa/get_questions.php')
        .then(response => {
          commit('setCategories', response.data.categories);
          commit('setQuestions', response.data.questions);
        })
        .catch(error => {
          console.error('请求categories数据失败:', error);
        });
    },
    async submitSurvey({ state }) {
      try {
        await axios.post('/api/submit', state.answers)
        return true
      } catch (error) {
        console.error('提交失败:', error)
        return false
      }
    }
  }
})