const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let cells = []
let mark = []
let model = [[0,0, 0,1, 0,2] ,[1,0, 1,1, 1,2] ,[2,0, 2,1, 2,2] ,[0,0, 1,0, 2,0] ,[0,1, 1,1, 2,1] ,[0,2, 1,2, 2,2] ,[0,0, 1,1, 2,2] ,[0,2, 1,1, 2,0]]
function checkMark() {

  function accept(x,y,z) {
    return (x !=-1 && x==y && y==z)
  }

  for(let ip of model) {
    if(accept(mark[ip[0]][ip[1]],mark[ip[2]][ip[3]],mark[ip[4]][ip[5]]))
      return mark[ip[0]][ip[1]]
    }

  return game.cnt>=9 ? 3 : -1
}
for(let i=0;i<3;i++) {
  cells[i] = []
  for(let j=0;j<3;j++) cells[i].push($(`#IP${i}${j}`))
}

let game = {
  turn: 0,
  cnt: 0,
  setup: function() {
    for(let i=0;i<3;i++) mark[i] = [-1,-1,-1]
    game.turn = 0
    game.cnt = 0
    for(let i=0;i<3;i++) for(let j=0;j<3;j++) cells[i][j].innerText = ""
    $('#inform').style.display = 'block'
  },

  over: function() {
    for(let i=0;i<3;i++) mark = [3,3,3]
  },

  handleEvents: function() {
    $('#inform').addEventListener('click',() => {
      $('#inform').style.display = 'none'
    })

    for(let i=0;i<3;i++)
      for(let j=0;j<3;j++) {
        cells[i][j].addEventListener('mousedown',() => {
          if(mark[i][j] !== -1) return false;

          ++game.cnt

          cells[i][j].innerText = game.turn ? "X" : "O"
          mark[i][j] = game.turn

          game.turn = !game.turn
        })

        cells[i][j].addEventListener('mouseup',() => {
          let ans = checkMark()
          if(ans == -1) return false
          
          if(ans == 3) $('#inform .content span').innerText = `We are winners \n Click to Restart!`
          else $('#inform .content span').innerText = `${ans ? 'X win' : 'O win'} \n Click to Restart!`

          game.setup()
        })
      }
        

    
  },
  start: function() {
    game.setup()
    game.handleEvents()
  }
}

game.start()