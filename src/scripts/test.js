import { debounce } from "throttle-debounce"

const D = debounce(500, function () {
  console.log("打API")
})

D()
