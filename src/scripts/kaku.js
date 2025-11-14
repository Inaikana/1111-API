import axios from "axios"
import { debounce } from "throttle-debounce"

// const toggleDebounce = debounce(2000, () => {
//   return console.log("GO")
// })

function henko() {
  return {
    // 回傳一個物件
    mode: "", // 在物件裡是【 key : value , 】
    email: "",
    tinyname: "",
    password: "",
    IDing: false,
    taskname: "",
    task: [],

    init() {
      const token = localStorage.getItem("ID")
      if (token) {
        this.IDing = true
        this.showlist()
      }
      if (this.IDing) {
        this.sagasu()
      } else {
        this.tsukuru()
      }
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

          if (token) {
            localStorage.setItem("ID", token)
          }

          this.reset()
          this.IDing = true
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

    async OShiTahanasu() {
      //離す
      const token = localStorage.getItem("ID")
      if (token) {
        const disappear = {
          headers: {
            Authorization: token,
          },
        }
        try {
          await axios.delete("https://todoo.5xcamp.us/users/sign_out", disappear)
          localStorage.removeItem("ID")
          this.IDing = false
          this.ikou()
        } catch (err) {
          console.log(err)
        }
      }
    },

    async dolist() {
      if (this.taskname != "") {
        const data = {
          todo: {
            content: this.taskname,
          },
        }
        // 假發
        const fake = {
          id: crypto.randomUUID(),
          content: this.taskname,
        }
        this.task.unshift(fake)

        this.taskname = ""

        // 真發
        const resp = await axios.post("https://todoo.5xcamp.us/todos", data, this.setconfig())

        //  換回真資料
        const truedata = resp.data
        const idx = this.task.findIndex((t) => {
          return t.id == fake.id
        })
        this.task.splice(idx, 1, truedata)
      }
    },

    async showlist() {
      const token = localStorage.getItem("ID")
      const config = {
        headers: {
          Authorization: token,
        },
      }
      const resp = await axios.get("https://todoo.5xcamp.us/todos", config)
      this.task = resp.data.todos
    },

    deleteTask() {
      const tid = this.$el.dataset.id
      const idx = this.task.findIndex((e) => {
        return e.id === tid
      })
      if (idx >= 0) {
        // 演
        this.task.splice(idx, 1)

        // 真
        axios.delete(`https://todoo.5xcamp.us/todos/${tid}`, this.setconfig())
      }
    },

    toggleDebounce: debounce(1000, (id) => {
      return console.log(id)
    }),

    async toggleTask(id) {
      // 演
      const listdata = this.task.find((obj) => {
        return obj.id == id
      })

      if (listdata.completed_at != null) {
        listdata.completed_at = null
      } else {
        listdata.completed_at = new Date()
      }

      // 真
      this.toggleDebounce(id)
      // if (listdata != null) {
      //   const resp = await axios.patch(`https://todoo.5xcamp.us/todos/${id}/toggle`, null, this.setconfig())
      //   console.log(resp)
      // }
    },

    setconfig() {
      const token = localStorage.getItem("ID")
      const config = {
        headers: {
          Authorization: token,
        },
      }
      return config
    },

    reset() {
      this.email = ""
      this.tinyname = ""
      this.password = ""
    },

    ikou() {
      this.reset()
      this.mode = "ikou"
    },

    tsukuru() {
      // 作る
      this.reset()
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
