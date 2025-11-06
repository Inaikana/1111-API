import axios from "axios"

function henko() {
  return {
    // 回傳一個物件
    mode: "ikou", // 在物件裡是【 key : value , 】
    email: "",
    tinyname: "",
    password: "",

    OshiTaikou() {
      const { email, password } = this
      if (email != "" && password != "") {
        console.log("打API!")
      }
    },

    async OShiTatsukuru() {
      const { email, tinyname, password } = this
      if (email != "" && tinyname != "" && password != "") {
        const userdata = {
          user: {
            email: email,
            nickname: tinyname,
            password: password,
          },
        }
        try {
          await axios.post("https://todoo.5xcamp.us/users", userdata)
          this.reset()
          this.ikou()
        } catch (err) {
          alert(err.response.data.message)
        }
      }
    },

    reset() {
      this.email = ""
      this.tinyname = ""
      this.password = ""
    },

    ikou() {
      this.mode = "ikou"
    },

    tsukuru() {
      // 作る
      this.mode = "tsukuru"
    },

    sagasu() {
      this.mode = "sagasu"
    },

    ikouAru() {
      return this.mode == "ikou" //讓它回傳一個布林值 true或false
    },

    tsukuruAru() {
      return this.mode == "tsukuru"
    },

    sagasuAru() {
      return this.mode == "sagasu"
    },
  }
}

export { henko }

// const {email,tinyname,password} = this;
// =
// const email = this.email
// const tinyname = this.tinyname
// const password = this.password
