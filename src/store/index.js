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
    questions: {"1":[{"id":1,"type":"radio","text":"\u66fe\u6539\u8fc7\u59d3","option_count":2,"must":true,"subQuestions":{"\u662f  ":[],"\u5426":[]},"options":["\u662f  ","\u5426"]},{"id":2,"type":"radio","text":"\u66fe\u6539\u8fc7\u540d","option_count":2,"must":true,"subQuestions":{"\u662f  ":[],"\u5426":[]},"options":["\u662f  ","\u5426"]},{"id":3,"type":"radio","text":"\u6027\u522b","option_count":2,"must":true,"subQuestions":{"\u7537":[],"\u5973":[]},"options":["\u7537","\u5973"]},{"id":4,"type":"radio","text":"\u5a5a\u59fb\u72b6\u51b5","option_count":8,"must":true,"subQuestions":{"\u5df2\u5a5a":[],"\u4e8b\u5b9e\u5a5a\u59fb":[],"\u540c\u6027\u4f34\u4fa3":[],"\u540c\u5c45\u5173\u7cfb":[],"\u5355\u8eab":[],"\u4e27\u5076":[],"\u79bb\u5f02":[],"\u5408\u6cd5\u5206\u5c45":[]},"options":["\u5df2\u5a5a","\u4e8b\u5b9e\u5a5a\u59fb","\u540c\u6027\u4f34\u4fa3","\u540c\u5c45\u5173\u7cfb","\u5355\u8eab","\u4e27\u5076","\u79bb\u5f02","\u5408\u6cd5\u5206\u5c45"]},{"id":5,"type":"input","text":"\u5e74\u9f84\u548c\u51fa\u751f\u5730\u70b9","option_count":2,"must":true,"subQuestions":{"\u5e74\u9f84:":[],"\u51fa\u751f\u5730\u70b9: [\u5e02]\/[\u7701(\u5dde)]\/[\u56fd\u5bb6(\u5730\u533a)]":[]},"fields":["\u5e74\u9f84:","\u51fa\u751f\u5730\u70b9: [\u5e02]\/[\u7701(\u5dde)]\/[\u56fd\u5bb6(\u5730\u533a)]"]},{"id":6,"type":"input","text":"\u56fd(\u5730\u533a)\u7c4d","option_count":2,"must":true,"subQuestions":{"\u56fd(\u5730\u533a)\u7c4d:":[],"\u66fe\u62e5\u6709\u7684\u5176\u4ed6\u56fd(\u5730\u533a)\u7c4d\uff1a":[]},"fields":["\u56fd(\u5730\u533a)\u7c4d:","\u66fe\u62e5\u6709\u7684\u5176\u4ed6\u56fd(\u5730\u533a)\u7c4d\uff1a"]},{"id":7,"type":"radio","text":"\u5176\u4ed6\u56fd\u5bb6(\u5730\u533a)\u5c45\u7559\u6743","option_count":2,"must":true,"subQuestions":{"\u6709":[{"id":19,"text":"","option_count":1,"type":"input","must":true,"options":[],"fields":["\u8f93\u5165\u5c45\u7559\u6743\u56fd\u5bb6(\u5730\u533a)"],"subQuestions":{"\u8f93\u5165\u5c45\u7559\u6743\u56fd\u5bb6(\u5730\u533a)":[]}}],"\u65e0":[]},"options":["\u6709","\u65e0"]},{"id":8,"type":"radio","text":"\u7f8e\u56fd\u793e\u4f1a\u5b89\u5168\u53f7","option_count":2,"must":true,"subQuestions":{"\u6709":[],"\u65e0":[]},"options":["\u6709","\u65e0"]},{"id":9,"type":"radio","text":"\u7f8e\u56fd\u7eb3\u7a0e\u4eba\u8bc6\u522b\u53f7","option_count":2,"must":true,"subQuestions":{"\u6709":[],"\u65e0":[]},"options":["\u6709","\u65e0"]}],"2":[{"id":10,"type":"radio","text":"\u8d74\u7f8e\u65c5\u884c\u7684\u76ee\u7684","option_count":3,"must":true,"subQuestions":{"B1 \u5546\u52a1\u8003\u5bdf   ":[{"id":26,"text":"","option_count":2,"type":"radio","must":true,"options":["\u6709\u9080\u8bf7\u51fd","\u65e0\u9080\u8bf7\u51fd"],"fields":[],"subQuestions":{"\u6709\u9080\u8bf7\u51fd":[{"id":27,"text":"","option_count":3,"type":"radio","must":true,"options":["\u89c2\u5c55","\u53c2\u5c55","\u5546\u4e1a\u5408\u4f5c\/\u7814\u8ba8\u4f1a"],"fields":[],"subQuestions":{"\u89c2\u5c55":[],"\u53c2\u5c55":[],"\u5546\u4e1a\u5408\u4f5c\/\u7814\u8ba8\u4f1a":[]}}],"\u65e0\u9080\u8bf7\u51fd":[]}}],"B2 \u77ed\u671f\u65c5\u6e38  ":[{"id":32,"text":"","option_count":6,"type":"radio","must":true,"options":["\u65c5\u6e38","\u77ed\u671f\u57f9\u8bad\/\u6e38\u5b66","\u63a2\u4eb2","\u53c2\u52a0\u4e1a\u4f59\/\u804c\u4e1a\u4f53\u80b2\u8d5b\u4e8b","\u846c\u793c","\u5c31\u533b"],"fields":[],"subQuestions":{"\u65c5\u6e38":[{"id":33,"text":"","option_count":2,"type":"radio","must":true,"options":["\u6709\u5408\u7406\u884c\u7a0b","\u65e0\u884c\u7a0b"],"fields":[],"subQuestions":{"\u6709\u5408\u7406\u884c\u7a0b":[],"\u65e0\u884c\u7a0b":[]}}],"\u77ed\u671f\u57f9\u8bad\/\u6e38\u5b66":[{"id":36,"text":"","option_count":2,"type":"radio","must":true,"options":["\u6709\u7f8e\u65b9offer","\u65e0\u7f8e\u65b9offer"],"fields":[],"subQuestions":{"\u6709\u7f8e\u65b9offer":[],"\u65e0\u7f8e\u65b9offer":[]}}],"\u63a2\u4eb2":[{"id":39,"text":"","option_count":2,"type":"radio","must":true,"options":["\u76f4\u7cfb\u4eb2\u5c5e","\u65c1\u7cfb\u4eb2\u5c5e(\u9664\u7236\u6bcd\u3001\u5b50\u5973\u3001\u914d\u5076\u3001\u5144\u5f1f\u3001\u59d0\u59b9\u4e4b\u5916)"],"fields":[],"subQuestions":{"\u76f4\u7cfb\u4eb2\u5c5e":[],"\u65c1\u7cfb\u4eb2\u5c5e(\u9664\u7236\u6bcd\u3001\u5b50\u5973\u3001\u914d\u5076\u3001\u5144\u5f1f\u3001\u59d0\u59b9\u4e4b\u5916)":[]}}],"\u53c2\u52a0\u4e1a\u4f59\/\u804c\u4e1a\u4f53\u80b2\u8d5b\u4e8b":[{"id":42,"text":"","option_count":2,"type":"radio","must":true,"options":["\u5df2\u4ea4\u62a5\u540d\u8d39","\u672a\u4ea4\u62a5\u540d\u8d39"],"fields":[],"subQuestions":{"\u5df2\u4ea4\u62a5\u540d\u8d39":[],"\u672a\u4ea4\u62a5\u540d\u8d39":[]}}],"\u846c\u793c":[{"id":45,"text":"","option_count":2,"type":"radio","must":true,"options":["\u6709\u8ba3\u544a","\u65e0\u8ba3\u544a"],"fields":[],"subQuestions":{"\u6709\u8ba3\u544a":[{"id":46,"text":"","option_count":2,"type":"radio","must":true,"options":["\u76f4\u7cfb\u4eb2\u5c5e","\u65c1\u7cfb\u4eb2\u5c5e(\u9664\u7236\u6bcd\u3001\u5b50\u5973\u3001\u914d\u5076\u3001\u5144\u5f1f\u3001\u59d0\u59b9\u4e4b\u5916)"],"fields":[],"subQuestions":{"\u76f4\u7cfb\u4eb2\u5c5e":[],"\u65c1\u7cfb\u4eb2\u5c5e(\u9664\u7236\u6bcd\u3001\u5b50\u5973\u3001\u914d\u5076\u3001\u5144\u5f1f\u3001\u59d0\u59b9\u4e4b\u5916)":[]}}],"\u65e0\u8ba3\u544a":[]}}],"\u5c31\u533b":[{"id":50,"text":"","option_count":2,"type":"radio","must":true,"options":["\u6709\u7f8e\u65b9\u533b\u9662\u6587\u4ef6","\u65e0\u7f8e\u65b9\u533b\u9662\u6587\u4ef6"],"fields":[],"subQuestions":{"\u6709\u7f8e\u65b9\u533b\u9662\u6587\u4ef6":[],"\u65e0\u7f8e\u65b9\u533b\u9662\u6587\u4ef6":[]}}]}}],"B1\/B2 \u5546\u52a1\u8003\u5bdf\/\u77ed\u671f\u65c5\u6e38":[]},"options":["B1 \u5546\u52a1\u8003\u5bdf   ","B2 \u77ed\u671f\u65c5\u6e38  ","B1\/B2 \u5546\u52a1\u8003\u5bdf\/\u77ed\u671f\u65c5\u6e38"]},{"id":11,"type":"input","text":"\u6709\u7279\u5b9a\u7684\u65c5\u884c\u8ba1\u5212","option_count":6,"must":true,"subQuestions":{"\u5728\u7f8e\u505c\u7559\u65f6\u95f4(\u5929):":[],"\u8d74\u7f8e\u822a\u73ed(\u5982\u6709):":[],"\u62b5\u7f8e\u57ce\u5e02:":[],"\u79bb\u7f8e\u822a\u73ed(\u5982\u6709):":[],"\u79bb\u7f8e\u57ce\u5e02:":[],"\u5728\u7f8e\u8ba1\u5212\u53c2\u89c2\u8bbf\u95ee\u7684\u5730\u65b9(\u53ef\u591a\u9879\uff0c\u4ee5\u3001\u9694\u5f00):":[]},"fields":["\u5728\u7f8e\u505c\u7559\u65f6\u95f4(\u5929):","\u8d74\u7f8e\u822a\u73ed(\u5982\u6709):","\u62b5\u7f8e\u57ce\u5e02:","\u79bb\u7f8e\u822a\u73ed(\u5982\u6709):","\u79bb\u7f8e\u57ce\u5e02:","\u5728\u7f8e\u8ba1\u5212\u53c2\u89c2\u8bbf\u95ee\u7684\u5730\u65b9(\u53ef\u591a\u9879\uff0c\u4ee5\u3001\u9694\u5f00):"]},{"id":12,"type":"radio","text":"\u652f\u4ed8\u65c5\u884c\u8d39\u7528\u65b9","option_count":4,"must":true,"subQuestions":{"\u81ea\u5df1":[],"\u5176\u4ed6\u4eba":[{"id":61,"text":"","option_count":1,"type":"input","must":false,"options":[],"fields":["\u4e0e\u672c\u4eba\u5173\u7cfb"],"subQuestions":{"\u4e0e\u672c\u4eba\u5173\u7cfb":[]}}],"\u73b0\u5728\u7684\u96c7\u4e3b":[],"\u7f8e\u56fd\u96c7\u4e3b":[]},"options":["\u81ea\u5df1","\u5176\u4ed6\u4eba","\u73b0\u5728\u7684\u96c7\u4e3b","\u7f8e\u56fd\u96c7\u4e3b"]}],"3":[{"id":13,"type":"radio","text":"\u662f\u5426\u6709\u540c\u884c\u4eba","option_count":2,"must":true,"subQuestions":{"\u6709":[{"id":65,"text":"","option_count":2,"type":"radio","must":true,"options":["\u968f\u56e2\u961f\u6216\u7ec4\u7ec7\u7684\u4e00\u5458   ","\u5176\u4ed6\u540c\u884c\u4eba"],"fields":[],"subQuestions":{"\u968f\u56e2\u961f\u6216\u7ec4\u7ec7\u7684\u4e00\u5458   ":[],"\u5176\u4ed6\u540c\u884c\u4eba":[{"id":67,"text":"","option_count":2,"type":"radio","must":true,"options":["\u540c\u884c\u4eba\u6709\u7f8e\u7b7e","\u540c\u884c\u4eba\u65e0\u7f8e\u7b7e"],"fields":[],"subQuestions":{"\u540c\u884c\u4eba\u6709\u7f8e\u7b7e":[],"\u540c\u884c\u4eba\u65e0\u7f8e\u7b7e":[]}}]}}],"\u6ca1\u6709":[]},"options":["\u6709","\u6ca1\u6709"]}],"4":[{"id":14,"type":"radio","text":"\u662f\u5426\u83b7\u5f97\u8fc7\u7f8e\u56fd\u7b7e\u8bc1","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":71,"text":"","option_count":6,"type":"radio","must":true,"options":["\u6301\u7b7e\u8bc1\u53bb\u8fc7\u7f8e\u56fd","\u672a\u53bb\u7f8e\u56fd"],"fields":["\u6b21\u6570\uff1a","\u6700\u8fd1\u4e00\u6b21\u7b7e\u8bc1\u7c7b\u578b\uff1a","\u6700\u8fd1\u4e00\u6b21\u7b7e\u53d1\u65e5\u671f(\u5e74\/\u6708\/\u65e5)\uff1a","\u6700\u8fd1\u4e00\u6b21\u7b7e\u53d1\u5730:"],"subQuestions":{"\u6b21\u6570\uff1a":[],"\u6700\u8fd1\u4e00\u6b21\u7b7e\u8bc1\u7c7b\u578b\uff1a":[],"\u6700\u8fd1\u4e00\u6b21\u7b7e\u53d1\u65e5\u671f(\u5e74\/\u6708\/\u65e5)\uff1a":[],"\u6700\u8fd1\u4e00\u6b21\u7b7e\u53d1\u5730:":[],"\u6301\u7b7e\u8bc1\u53bb\u8fc7\u7f8e\u56fd":[{"id":76,"text":"","option_count":2,"type":"radio","must":true,"options":["\u5408\u6cd5\u505c\u7559\u5e76\u8fd4\u56de","\u903e\u671f\u8fd4\u56de"],"fields":[],"subQuestions":{"\u5408\u6cd5\u505c\u7559\u5e76\u8fd4\u56de":[],"\u903e\u671f\u8fd4\u56de":[]}}],"\u672a\u53bb\u7f8e\u56fd":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":15,"type":"radio","text":"\u662f\u5426\u88ab\u7f8e\u56fd\u62d2\u7b7e\u8fc7","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":81,"text":"","option_count":4,"type":"input","must":true,"options":[],"fields":["\u6b21\u6570\uff1a","\u6700\u8fd1\u4e00\u6b21\u7684\u62d2\u7b7e\u65f6\u95f4:","\u6700\u8fd1\u4e00\u6b21\u7533\u8bf7\u7684\u7b7e\u8bc1\u7c7b\u578b:","\u6700\u8fd1\u4e00\u6b21\u7533\u8bf7\u7684\u62d2\u7b7e\u539f\u56e0:"],"subQuestions":{"\u6b21\u6570\uff1a":[],"\u6700\u8fd1\u4e00\u6b21\u7684\u62d2\u7b7e\u65f6\u95f4:":[],"\u6700\u8fd1\u4e00\u6b21\u7533\u8bf7\u7684\u7b7e\u8bc1\u7c7b\u578b:":[],"\u6700\u8fd1\u4e00\u6b21\u7533\u8bf7\u7684\u62d2\u7b7e\u539f\u56e0:":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":16,"type":"radio","text":"\u662f\u5426\u88ab\u53d6\u6d88\u8fc7\u7f8e\u56fd\u7b7e\u8bc1(\u201c\u53d6\u6d88\u201d\u662f\u6307\u7b7e\u8bc1\u672a\u88ab\u4f7f\u7528\u8fc7\u5c31\u5df2\u5931\u6548)","option_count":2,"must":true,"subQuestions":{"\u662f":[],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":17,"type":"radio","text":"\u662f\u5426\u88ab\u5e9f\u9664\u8fc7\u7f8e\u56fd\u7b7e\u8bc1(\u201c\u5e9f\u9664\u201d\u662f\u6307\u7b7e\u8bc1\u5df2\u4f7f\u7528\u8fc7\u4f46\u540e\u88ab\u5b98\u65b9\u4f5c\u5e9f)","option_count":2,"must":true,"subQuestions":{"\u662f":[],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":18,"type":"radio","text":"\u662f\u5426\u88ab\u62d2\u7edd\u8fc7\u8fdb\u5165\u7f8e\u56fd","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":91,"text":"","option_count":2,"type":"radio","must":true,"options":["\u540e\u5f97\u4ee5\u518d\u6b21\u8fdb\u5165\u7f8e\u56fd","\u518d\u672a\u88ab\u8bb8\u53ef\u8fdb\u5165\u7f8e\u56fd"],"fields":[],"subQuestions":{"\u540e\u5f97\u4ee5\u518d\u6b21\u8fdb\u5165\u7f8e\u56fd":[],"\u518d\u672a\u88ab\u8bb8\u53ef\u8fdb\u5165\u7f8e\u56fd":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":19,"type":"radio","text":"\u662f\u5426\u6709\u4eba\u4ee3\u8868\u4f60\u5411\u7f8e\u56fd\u9012\u4ea4\u8fc7\u975e\u79fb\u6c11\u8bf7\u613f\u4e66","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":95,"text":"","option_count":2,"type":"input","must":true,"options":[],"fields":["[\u63d0\u4ea4\u65f6\u95f4]","[\u7533\u8bf7\u7c7b\u522b]"],"subQuestions":{"[\u63d0\u4ea4\u65f6\u95f4]":[],"[\u7533\u8bf7\u7c7b\u522b]":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]}],"5":[{"id":20,"type":"radio","text":"\u62a4\u7167\/\u65c5\u884c\u6587\u4ef6\u79cd\u7c7b","option_count":4,"must":true,"subQuestions":{"\u56fa\u5b9a":[],"\u5b98\u65b9":[],"\u5916\u4ea4":[],"\u5176\u4ed6":[]},"options":["\u56fa\u5b9a","\u5b98\u65b9","\u5916\u4ea4","\u5176\u4ed6"]},{"id":21,"type":"input","text":"\u62a4\u7167\/\u65c5\u884c\u6587\u4ef6\u7b7e\u53d1\u5730","option_count":1,"must":true,"subQuestions":{"[\u5e02]\/[\u7701(\u5dde) ]\/[\u56fd\u5bb6(\u5730\u533a)]":[]},"fields":["[\u5e02]\/[\u7701(\u5dde) ]\/[\u56fd\u5bb6(\u5730\u533a)]"]}],"6":[{"id":22,"type":"radio","text":"\u5728\u7f8e\u56fd\u662f\u5426\u6709\u8054\u7cfb\u4eba\u6216\u7ec4\u7ec7","option_count":2,"must":true,"subQuestions":{"\u6709":[{"id":104,"text":"","option_count":7,"type":"radio","must":true,"options":["\u4eb2\u621a","\u914d\u5076","\u670b\u53cb","\u5546\u52a1\u4f19\u4f34","\u96c7\u4e3b","\u4e3b\u529e\u5355\u4f4d\u5b98\u65b9","\u5176\u4ed6"],"fields":[],"subQuestions":{"\u4eb2\u621a":[{"id":105,"text":"","option_count":2,"type":"radio","must":true,"options":["\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba","\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba"],"fields":[],"subQuestions":{"\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[],"\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[]}}],"\u914d\u5076":[{"id":108,"text":"","option_count":2,"type":"radio","must":true,"options":["\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba","\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba"],"fields":[],"subQuestions":{"\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[],"\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[]}}],"\u670b\u53cb":[{"id":111,"text":"","option_count":2,"type":"radio","must":true,"options":["\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba","\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba"],"fields":[],"subQuestions":{"\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[],"\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[]}}],"\u5546\u52a1\u4f19\u4f34":[{"id":114,"text":"","option_count":2,"type":"radio","must":true,"options":["\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba","\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba"],"fields":[],"subQuestions":{"\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[],"\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[]}}],"\u96c7\u4e3b":[{"id":117,"text":"","option_count":2,"type":"radio","must":true,"options":["\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba","\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba"],"fields":[],"subQuestions":{"\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[],"\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[]}}],"\u4e3b\u529e\u5355\u4f4d\u5b98\u65b9":[{"id":120,"text":"","option_count":2,"type":"radio","must":true,"options":["\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba","\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba"],"fields":[],"subQuestions":{"\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[],"\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[]}}],"\u5176\u4ed6":[{"id":123,"text":"","option_count":2,"type":"radio","must":true,"options":["\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba","\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba"],"fields":[],"subQuestions":{"\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[],"\u4e0d\u80fd\u63d0\u4f9b\u5728\u7f8e\u5730\u5740\u3001\u7535\u8bdd\u548c\u5177\u4f53\u8054\u7cfb\u4eba":[]}}]}}],"\u6ca1\u6709":[]},"options":["\u6709","\u6ca1\u6709"]}],"7":[{"id":23,"type":"radio","text":"\u7236\u4eb2\u662f\u5426\u5728\u7f8e\u56fd","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":127,"text":"","option_count":2,"type":"radio","must":true,"options":["\u8eab\u4efd\u5408\u6cd5","\u8eab\u4efd\u4e0d\u5408\u6cd5"],"fields":[],"subQuestions":{"\u8eab\u4efd\u5408\u6cd5":[{"id":128,"text":"","option_count":10,"type":"radio","must":true,"options":["\u7f8e\u56fd\u516c\u6c11","\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11","F\u7c7b","H\u7c7b","J\u7c7b","K\u7c7b","L\u7c7b","M\u7c7b","O\u7c7b","\u4e0d\u77e5\u9053"],"fields":[],"subQuestions":{"\u7f8e\u56fd\u516c\u6c11":[],"\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11":[],"F\u7c7b":[],"H\u7c7b":[],"J\u7c7b":[],"K\u7c7b":[],"L\u7c7b":[],"M\u7c7b":[],"O\u7c7b":[],"\u4e0d\u77e5\u9053":[]}}],"\u8eab\u4efd\u4e0d\u5408\u6cd5":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":24,"type":"radio","text":"\u6bcd\u4eb2\u662f\u5426\u5728\u7f8e\u56fd","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":141,"text":"","option_count":2,"type":"radio","must":true,"options":["\u8eab\u4efd\u5408\u6cd5","\u8eab\u4efd\u4e0d\u5408\u6cd5"],"fields":[],"subQuestions":{"\u8eab\u4efd\u5408\u6cd5":[{"id":142,"text":"","option_count":10,"type":"radio","must":true,"options":["\u7f8e\u56fd\u516c\u6c11","\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11","F\u7c7b","H\u7c7b","J\u7c7b","K\u7c7b","L\u7c7b","M\u7c7b","O\u7c7b","\u4e0d\u77e5\u9053"],"fields":[],"subQuestions":{"\u7f8e\u56fd\u516c\u6c11":[],"\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11":[],"F\u7c7b":[],"H\u7c7b":[],"J\u7c7b":[],"K\u7c7b":[],"L\u7c7b":[],"M\u7c7b":[],"O\u7c7b":[],"\u4e0d\u77e5\u9053":[]}}],"\u8eab\u4efd\u4e0d\u5408\u6cd5":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":25,"type":"radio","text":"\u76f4\u7cfb\u4eb2\u5c5e\u662f\u5426\u5728\u7f8e\u56fd","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":155,"text":"","option_count":4,"type":"radio","must":true,"options":["\u914d\u5076","\u672a\u5a5a\u592b\/\u59bb","\u5b69\u5b50","\u5144\u5f1f\/\u59d0\u59b9"],"fields":[],"subQuestions":{"\u914d\u5076":[{"id":156,"text":"","option_count":2,"type":"radio","must":true,"options":["\u8eab\u4efd\u5408\u6cd5","\u8eab\u4efd\u4e0d\u5408\u6cd5"],"fields":[],"subQuestions":{"\u8eab\u4efd\u5408\u6cd5":[{"id":157,"text":"","option_count":3,"type":"radio","must":true,"options":["\u7f8e\u56fd\u516c\u6c11","\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11","\u975e\u79fb\u6c11"],"fields":[],"subQuestions":{"\u7f8e\u56fd\u516c\u6c11":[],"\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11":[],"\u975e\u79fb\u6c11":[]}}],"\u8eab\u4efd\u4e0d\u5408\u6cd5":[]}}],"\u672a\u5a5a\u592b\/\u59bb":[{"id":162,"text":"","option_count":2,"type":"radio","must":true,"options":["\u8eab\u4efd\u5408\u6cd5","\u8eab\u4efd\u4e0d\u5408\u6cd5"],"fields":[],"subQuestions":{"\u8eab\u4efd\u5408\u6cd5":[{"id":163,"text":"","option_count":3,"type":"radio","must":true,"options":["\u7f8e\u56fd\u516c\u6c11","\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11","\u975e\u79fb\u6c11"],"fields":[],"subQuestions":{"\u7f8e\u56fd\u516c\u6c11":[],"\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11":[],"\u975e\u79fb\u6c11":[]}}],"\u8eab\u4efd\u4e0d\u5408\u6cd5":[]}}],"\u5b69\u5b50":[{"id":168,"text":"","option_count":2,"type":"radio","must":true,"options":["\u8eab\u4efd\u5408\u6cd5","\u8eab\u4efd\u4e0d\u5408\u6cd5"],"fields":[],"subQuestions":{"\u8eab\u4efd\u5408\u6cd5":[{"id":169,"text":"","option_count":3,"type":"radio","must":true,"options":["\u7f8e\u56fd\u516c\u6c11","\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11","\u975e\u79fb\u6c11"],"fields":[],"subQuestions":{"\u7f8e\u56fd\u516c\u6c11":[],"\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11":[],"\u975e\u79fb\u6c11":[]}}],"\u8eab\u4efd\u4e0d\u5408\u6cd5":[]}}],"\u5144\u5f1f\/\u59d0\u59b9":[{"id":174,"text":"","option_count":2,"type":"radio","must":true,"options":["\u8eab\u4efd\u5408\u6cd5","\u8eab\u4efd\u4e0d\u5408\u6cd5"],"fields":[],"subQuestions":{"\u8eab\u4efd\u5408\u6cd5":[{"id":175,"text":"","option_count":3,"type":"radio","must":true,"options":["\u7f8e\u56fd\u516c\u6c11","\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11","\u975e\u79fb\u6c11"],"fields":[],"subQuestions":{"\u7f8e\u56fd\u516c\u6c11":[],"\u7f8e\u56fd\u6c38\u4e45\u5c45\u6c11":[],"\u975e\u79fb\u6c11":[]}}],"\u8eab\u4efd\u4e0d\u5408\u6cd5":[]}}]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":26,"type":"radio","text":"\u662f\u5426\u6709\u914d\u5076","option_count":2,"must":true,"subQuestions":{"\u6709":[{"id":181,"text":"","option_count":2,"type":"radio","must":true,"options":["\u540c\u884c","\u4e0d\u540c\u884c"],"fields":[],"subQuestions":{"\u540c\u884c":[{"id":182,"text":"","option_count":1,"type":"input","must":true,"options":[],"fields":["\u914d\u5076\u7684\u56fd(\u5730\u533a)\u7c4d"],"subQuestions":{"\u914d\u5076\u7684\u56fd(\u5730\u533a)\u7c4d":[]}}],"\u4e0d\u540c\u884c":[]}}],"\u65e0":[]},"options":["\u6709","\u65e0"]}],"8":[{"id":27,"type":"radio","text":"\u5f53\u524d\u7684\u804c\u4e1a","option_count":4,"must":true,"subQuestions":{"\u5728\u804c":[{"id":186,"text":"","option_count":4,"type":"input","must":true,"options":[],"fields":["\u884c\u4e1a","\u804c\u52a1","\u5de5\u4f5c\u5e74\u9650","\u6708\u5de5\u8d44(\u5143):"],"subQuestions":{"\u884c\u4e1a":[],"\u804c\u52a1":[],"\u5de5\u4f5c\u5e74\u9650":[],"\u6708\u5de5\u8d44(\u5143):":[]}}],"\u79bb\u804c":[],"\u65e0\u804c\u4e1a":[],"\u5728\u8bfb":[]},"options":["\u5728\u804c","\u79bb\u804c","\u65e0\u804c\u4e1a","\u5728\u8bfb"]},{"id":28,"type":"radio","text":"\u8fd1\u4e94\u5e74\u662f\u5426\u5de5\u4f5c\u8fc7","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":194,"text":"","option_count":2,"type":"input","must":true,"options":[],"fields":["\u884c\u4e1a","\u804c\u52a1"],"subQuestions":{"\u884c\u4e1a":[],"\u804c\u52a1":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":29,"type":"radio","text":"\u5b66\u5386\u60c5\u51b5","option_count":5,"must":true,"subQuestions":{"\u7814\u7a76\u751f":[{"id":198,"text":"","option_count":1,"type":"input","must":true,"options":[],"fields":["\u4e13\u4e1a"],"subQuestions":{"\u4e13\u4e1a":[]}}],"\u5927\u5b66\u672c\u79d1":[{"id":200,"text":"","option_count":1,"type":"input","must":true,"options":[],"fields":["\u4e13\u4e1a"],"subQuestions":{"\u4e13\u4e1a":[]}}],"\u5927\u5b66\u4e13\u79d1":[{"id":202,"text":"","option_count":1,"type":"input","must":true,"options":[],"fields":["\u4e13\u4e1a"],"subQuestions":{"\u4e13\u4e1a":[]}}],"\u9ad8\u4e2d":[],"\u9ad8\u4e2d\u4ee5\u4e0b":[]},"options":["\u7814\u7a76\u751f","\u5927\u5b66\u672c\u79d1","\u5927\u5b66\u4e13\u79d1","\u9ad8\u4e2d","\u9ad8\u4e2d\u4ee5\u4e0b"]}],"9":[{"id":30,"type":"radio","text":"\u662f\u5426\u4fe1\u4ef0\u5b97\u6559","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":206,"text":"","option_count":2,"type":"input","must":true,"options":[],"fields":["\u5b97\u6559","\u6240\u5c5e\u56e2\u4f53\u540d\u79f0"],"subQuestions":{"\u5b97\u6559":[],"\u6240\u5c5e\u56e2\u4f53\u540d\u79f0":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":31,"type":"radio","text":"\u65e5\u5e38\u6d41\u5229\u4f7f\u7528\u7684\u8bed\u8a00","option_count":3,"must":true,"subQuestions":{"\u4e2d\u6587  ":[],"\u82f1\u6587":[],"\u5176\u4ed6\u8bed\u8a00":[]},"options":["\u4e2d\u6587  ","\u82f1\u6587","\u5176\u4ed6\u8bed\u8a00"]},{"id":32,"type":"radio","text":"\u8fc7\u53bb\u4e94\u5e74\u7684\u51fa\u56fd\u7ecf\u5386","option_count":2,"must":true,"subQuestions":{"\u6709":[{"id":213,"text":"","option_count":1,"type":"input","must":true,"options":[],"fields":["\u56fd\u5bb6(\u5730\u533a)\u540d\u5b57(\u4ee5\"\u3001\"\u9694\u5f00)"],"subQuestions":{"\u56fd\u5bb6(\u5730\u533a)\u540d\u5b57(\u4ee5\"\u3001\"\u9694\u5f00)":[]}}],"\u65e0":[]},"options":["\u6709","\u65e0"]},{"id":33,"type":"radio","text":"\u662f\u5426\u53c2\u52a0\u793e\u4f1a\u6216\u4e13\u4e1a\u7ec4\u7ec7","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":216,"text":"","option_count":5,"type":"radio","must":true,"options":["\u56fd\u9645\u7ea7","\u56fd\u5bb6\u7ea7","\u7701\u7ea7","\u5e02\u7ea7","\u53bf\u533a\u7ea7"],"fields":[],"subQuestions":{"\u56fd\u9645\u7ea7":[],"\u56fd\u5bb6\u7ea7":[],"\u7701\u7ea7":[],"\u5e02\u7ea7":[],"\u53bf\u533a\u7ea7":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":34,"type":"radio","text":"\u662f\u5426\u62e5\u6709\u6b66\u5668\u3001\u7206\u7834\u3001\u6838\u80fd\u3001\u751f\u7269\u3001\u5316\u5b66\u65b9\u9762\u7684\u6280\u80fd\u6216\u63a5\u53d7\u8fc7\u8fd9\u4e9b\u57f9\u8bad","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":223,"text":"","option_count":1,"type":"input","must":true,"options":[],"fields":["\u5177\u4f53\u7c7b\u522b"],"subQuestions":{"\u5177\u4f53\u7c7b\u522b":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":35,"type":"radio","text":"\u662f\u5426\u5728\u519b\u961f\u670d\u52a1\u8fc7","option_count":2,"must":true,"subQuestions":{"\u662f":[{"id":226,"text":"","option_count":4,"type":"input","must":true,"options":[],"fields":["\u56fd\u5bb6","\u90e8\u95e8","\u519b\u8854","\u5177\u4f53\u65f6\u95f4"],"subQuestions":{"\u56fd\u5bb6":[],"\u90e8\u95e8":[],"\u519b\u8854":[],"\u5177\u4f53\u65f6\u95f4":[]}}],"\u5426":[]},"options":["\u662f","\u5426"]},{"id":36,"type":"radio","text":"\u662f\u5426\u5728\u975e\u6cd5\u519b\u4e8b\u7ec4\u7ec7\u670d\u52a1","option_count":2,"must":true,"subQuestions":{"\u662f":[],"\u5426":[]},"options":["\u662f","\u5426"]}]},
    // questions: {
    //   1: [
    //     {
    //       id: 1,
    //       type: 'radio',
    //       text: '曾改过姓？',
    //       options: ['是', '否'],
    //       subQuestions: {
    //         '是': [
    //           {
    //             id: 2,
    //             type: 'input',
    //             text: '请详细说明原因：',
    //             fields: ['原因']
    //           }
    //         ]
    //       }
    //     },
    //     {
    //       id: 2,
    //       type: 'radio',
    //       text: '曾改过名？',
    //       options: ['是', '否'],
    //       subQuestions: {
    //         '是': [
    //           {
    //             id: 2,
    //             type: 'input',
    //             text: '请详细说明原因：',
    //             fields: ['原因']
    //           }
    //         ]
    //       }
    //     },
    //     {
    //       id: 3,
    //       type: 'radio',
    //       text: '婚姻状况',
    //       options: ['已婚', '事实婚姻', '未婚', '离婚', '丧偶'],
    //       subQuestions: {
    //         '是': [
    //           {
    //             id: 2,
    //             type: 'input',
    //             text: '请详细说明原因：',
    //             fields: ['原因']
    //           }
    //         ]
    //       }
    //     },
    //     {
    //       id: 4,
    //       type: 'input',
    //       text: '年龄和出生地点',
    //       fields: ['年龄', '地点'],
    //       subQuestions: {
    //         '是': [
    //           {
    //             id: 2,
    //             type: 'input',
    //             text: '请详细说明原因：',
    //             fields: ['原因']
    //           }
    //         ]
    //       }
    //     },
    //     {
    //       id: 5,
    //       type: 'radio',
    //       text: '其他国家(地区)居留权',
    //       options: ['有', '无'],
    //       subQuestions: {
    //         '有': [
    //           {
    //             id: 2,
    //             type: 'input',
    //             text: '输入居留权国家(地区)',
    //             fields: ['']
    //           }
    //         ]
    //       }
    //     }
    //   ],
    //   2: [
    //     {
    //       id: 1,
    //       type: 'radio',
    //       text: '赴美旅行的目的',
    //       options: ['B1 商务考察', 'B2 短期旅游', 'B1/B2 商务考察/短期旅游'],
    //       subQuestions: {
    //         'B1 商务考察': [
    //           {
    //             id: 2,
    //             type: 'radio',
    //             text: '',
    //             options: ['有邀请函', '无邀请函'],
    //             subQuestions: {
    //               '有邀请函': [
    //                 {
    //                   id: 3,
    //                   type: 'radio',
    //                   text: '',
    //                   options: ['观展', '参展', '商业合作/研讨会']
    //                 }
    //               ]
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   ],
    //   3: []
    // },
    answers: {},
    notification: {
      show: false,
      type: 'success',
      message: ''
    }
  },
  mutations: {
    setCategories(state, payload) {
      // state.categories = payload;
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