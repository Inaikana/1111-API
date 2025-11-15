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
    firstState: 1,

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

    // toggleDebounce: debounce(1000, function (id) {
    //   axios.patch(`https://todoo.5xcamp.us/todos/${id}/toggle`, null, this.setconfig())
    // }),

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

      // 【以下嘗試用自己的方法】

      if (listdata.state == undefined) {
        // 用老師的方法 在listdata建立state

        if (listdata.completed_at != null) {
          // 有 completed_at = 前面假按給的 = 假按之前是沒有的 = 最初是未完成(未套用CSS)

          listdata.state = -1 // 定義-1為沒套用CSS效果
          this.firstState = -1 // 記錄初始狀況
        } else {
          // 沒有 completed_at = 前面假按reset掉的 = 假按之前是有的 = 最初是已完成(有套用CSS)

          listdata.state = 1 // 定義1為有套用CSS效果
          this.firstState = 1 // 記錄初始狀況
        }
      }

      listdata.state = listdata.state * -1
      console.log(`按下後的listdata.state = ${listdata.state}`)
      console.log(`按下後的this.firstState = ${this.firstState}`)
      console.log("~~~~~~以下進入if~~~~~~~")

      if (listdata.state != this.firstState) {
        console.log(`if裡的listdata.state = ${listdata.state}`)
        console.log(`if裡的this.firstState = ${this.firstState}`)
        this.toggleDebounce()
        this.F()
      }
      console.log("!!!!!!!!!!!!!!一輪分隔線!!!!!!!!!!!!!!")

      // 【以上嘗試用自己的方法】
    },

    F() {
      console.log("奇數才打API")
    },

    toggleDebounce: debounce(1000, function () {
      console.log("Debounce都會打API")
    }),

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
