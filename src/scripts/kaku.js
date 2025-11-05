import axios from "axios"

function henko() {
  return {
    // 回傳一個物件
    mode: "ikou", // 在物件裡是【 key : value , 】
    email: "",
    tinyname: "",
    password: "",

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
          const resp = await axios.post("https://todoo.5xcamp.us/users", userdata)
          console.log(resp)
        } catch (err) {
          console.log(err.response.data.message)
        }
      }
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
