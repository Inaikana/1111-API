import axios from "axios"

function henko() {
  return {
    // 回傳一個物件
    mode: "", // 在物件裡是【 key : value , 】
    email: "",
    tinyname: "",
    password: "",

    init() {
      if (IDing()) {
        this.sagasu()
      } else {
        this.tsukuru()
      }
    },

    IDing() {
      // 老師的isLogin() 回傳是否登入的布林值
      const token = localStorage.getItem("ID")
      return token != ""
    },

    async OshiTaikou() {
      const { email, password } = this
      if (email != "" && password != "") {
        const userdata = {
          user: {
            email: email,
            password: password,
          },
        }
        try {
          const resp = await axios.post("https://todoo.5xcamp.us/users/sign_in", userdata)
          const token = resp.headers.authorization
          localStorage.setItem("ID", token)
          this.reset()
          this.sagasu()
        } catch (err) {
          console.log(err)
        }
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
