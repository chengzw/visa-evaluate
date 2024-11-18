import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      { id: 1, name: '个人信息' },
      { id: 2, name: '旅行信息' },
      { id: 3, name: '旅行随同人' },
      { id: 4, name: '之前的美国旅行经历' },
      { id: 5, name: '护照信息' },
      { id: 6, name: '美方联系信息' },
      { id: 7, name: '家庭信息' },
      { id: 8, name: '工作教育培训情况' },
      { id: 9, name: '附加工作教育信息和旅行记录' }
    ],
    questions: {
      1: [
        {
          id: 1,
          type: 'radio',
          text: '曾改过姓？',
          options: ['是', '否'],
          subQuestions: {
            '是': [
              {
                id: 2,
                type: 'input',
                text: '请详细说明原因：',
                fields: ['原因']
              }
            ]
          }
        },
        {
          id: 2,
          type: 'radio',
          text: '曾改过名？',
          options: ['是', '否'],
          subQuestions: {
            '是': [
              {
                id: 2,
                type: 'input',
                text: '请详细说明原因：',
                fields: ['原因']
              }
            ]
          }
        },
        {
          id: 3,
          type: 'radio',
          text: '婚姻状况',
          options: ['已婚', '事实婚姻', '未婚', '离婚', '丧偶'],
          subQuestions: {
            '是': [
              {
                id: 2,
                type: 'input',
                text: '请详细说明原因：',
                fields: ['原因']
              }
            ]
          }
        },
        {
          id: 4,
          type: 'input',
          text: '年龄和出生地点',
          fields: ['年龄', '地点'],
          subQuestions: {
            '是': [
              {
                id: 2,
                type: 'input',
                text: '请详细说明原因：',
                fields: ['原因']
              }
            ]
          }
        },
        {
          id: 5,
          type: 'radio',
          text: '其他国家(地区)居留权',
          options: ['有', '无'],
          subQuestions: {
            '有': [
              {
                id: 2,
                type: 'input',
                text: '输入居留权国家(地区)',
                fields: ['']
              }
            ]
          }
        }
      ],
      2: [
        {
          id: 1,
          type: 'radio',
          text: '赴美旅行的目的',
          options: ['B1 商务考察', 'B2 短期旅游', 'B1/B2 商务考察/短期旅游'],
          subQuestions: {
            'B1 商务考察': [
              {
                id: 2,
                type: 'radio',
                text: '',
                options: ['有邀请函', '无邀请函'],
                subQuestions: {
                  '有邀请函': [
                    {
                      id: 3,
                      type: 'radio',
                      text: '',
                      options: ['观展', '参展', '商业合作/研讨会']
                    }
                  ]
                }
              }
            ]
          }
        }
      ],
      3: []
    },
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
      console.log(state.categories)
      console.log(payload)
    },
    setQuestions(state, payload) {
      // state.questions = payload;
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
      axios.get('https://api.ip008.com/visa/test.php')
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