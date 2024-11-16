Component({
  properties: {
    answer: {
      type: String,
      default: ""
    },
    question: {
      type: String,
      default: ""
    },
    id: {
      type: Number,
      default: 0
    }
  },

  data: {
    showFlag: 0
  },
  
  methods: {
    toggleCard() {
      this.setData({
        showFlag: this.data.showFlag ? false : true
      })
    }
  }
})