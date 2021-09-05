const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const C = $('#C')
const done = $('#equal-btn')
const process = $('#process')
const res = $('#result')
const del = $('#del-btn')

let ans
let oparator

let input = {
  val: 0,
  active: false,

  record: function(x = 0) {
    this.val = x
    this.active = true
    work.complete = false
  },

  stop: function() {
    this.val = 0
    this.active = false
  },

  delDigit: function() {
    this.val/=10
    this.val = Math.floor(this.val)
    res.innerText = `${this.val}`
  },

  getDigit: function(x) {
    if(work.complete) ans = 0

    if(this.active) this.val = this.val*10 + x;
    else this.record(x)

    res.innerText = `${this.val}`
  }
}

let work = {
  complete: true,

  ing: function(key) {
    if(this.complete) {
      this.complete = false
    } else {
      calc()
    }

    oparator = key
    process.innerText = "" + ans + oparators[+oparator]
    res.innerText = "0"
    input.record()
  },

  stop: function() {
    this.complete = true
    oparator = null
  }
}

const nums = []
const works = []
oparators = ['+','-','x','/']
// Nx
for(let i = 0;i<10;i++) { 
  let id = '#N' + i
  nums.push($(id))
  nums[i].addEventListener('click',digitPressing) 
}
// Dx
for(let i = 0;i<4;i++)
{
  let id = '#D' + i
  works.push($(id))
  works[i].addEventListener('click',operating)
} 

C.addEventListener('click',reset)
done.addEventListener('click',calc)
del.addEventListener('click',() => {
  input.delDigit()
})

C.click()

//
function digitPressing(e) {
  let x = +e.target.dataset.val

  input.getDigit(x) 
}

function operating(e) {
  let type = e.target.id || e.target.parentNode.id

  work.ing(type[1])
}

function calc() {
  switch (oparator) {
    case "0":
      ans+=input.val
      break;
    case "1":
      ans-=input.val
      break;
    case "2":
      ans*=input.val
      break;
    case "3":
      ans/=input.val
      ans = +ans.toFixed(7)
      break;
    default:
      ans = input.active ? input.val : ans
  }

  input.stop()
  work.stop()

  process.innerText = ""
  res.innerText = ans
}

function reset() {
  work.stop()
  input.stop()
  process.innerText = ""
  res.innerText = "0"
  ans = 0
  n = 0

}

