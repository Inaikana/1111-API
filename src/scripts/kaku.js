function henko() {
  return {
    // 回傳一個物件
    mode: "ikou", // 在物件裡是【 key : value , 】
    email: "",
    tinyname: "",
    password: "",

    OShiTatsukuru: function () {
      console.log(this.email)
      console.log(this.tinyname)
      console.log(this.password)
    },

    ikou: function () {
      this.mode = "ikou"
    },
    tsukuru: function () {
      // 作る
      this.mode = "tsukuru"
    },
    sagasu: function () {
      this.mode = "sagasu"
    },
    ikouAru: function () {
      return this.mode == "ikou" //讓它回傳一個布林值 true或false
    },
    tsukuruAru: function () {
      return this.mode == "tsukuru"
    },
    sagasuAru: function () {
      return this.mode == "sagasu"
    },
  }
}

export { henko }
