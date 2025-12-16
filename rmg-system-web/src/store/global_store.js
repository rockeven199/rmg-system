import { createStore } from "vuex";

// 全局状态管理
const store = createStore({
  state() {
    return {
      // 搜索类型
      searchType: "",
      // 开始搜索
      enableSearch: false,
      // 返回数据
      resultData: [],
      // 搜索关键字是否为空
      keywordIsNull: false,
    };
  },
  mutations: {
    // 设置搜索类型
    setSearchType(state, _type) {
      state.searchType = _type;
    },
    // 设置开始搜索
    setEnableSearch(state, _enable) {
      state.enableSearch = _enable;
    },
    // 设置返回数据
    setResultData(state, _data) {
      state.resultData = _data;
    },
    // 判断关键字是否为空
    setKeywordIsNull(state, _KeywordIsNull) {
      state.keywordIsNull = _KeywordIsNull;
    },
  },
});

export default store;
