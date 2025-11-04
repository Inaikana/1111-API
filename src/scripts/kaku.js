function henko() {
  return {
    // 回傳一個物件
    mode: "ikou", // 在物件裡是【 key : value , 】
    email: "",
    tinyname: "",
    password: "",

    OShiTatsukuru: function () {
      const email = this.email
      const tinyname = this.tinyname
      const password = this.password
      if (email !== "" && tinyname !== "" && password !== "") {
        console.log("打API")
      }
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
