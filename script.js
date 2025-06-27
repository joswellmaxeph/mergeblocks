const colors2 = [
  "white",
  "hotpink",
  "blueviolet",
  "gray",
  "olive",
  "orange",
  "red",
  "blue",
  "purple",
  "green",
  "cornflowerblue",
  "black",
  "springgreen",
  "maroon",
  "magenta",
  "gold",
  "navy",
  "rebeccapurple",
  "salmon",
  "thistle",
  "dodgerblue",
  "chocolate",
  "aqua",
  "blueviolet",
  "crimson",
  "forestgreen",
  "deeppink",
  "#2A4A9A",
  "olivedrab",
  "orangered",
  "peru",
  "palevioletred",
  "plum",
  "saddlebrown",
  "slateblue",
  "tomato",
  "darkcyan",
  "#720390",
  "#20A947",
  "#D83030",
  "#7200EC",
  "#09092E",
  "#520908",
  "#299440",
  "#20A050",
  "#A00000",
  "#303030",
  "#BF5010",
  "#0050BF",
  "#30BF30",
  "#123456",
  "#BE8C2A",
  "#4F7F20",
  "#708090",
  "#2080AB",
  "#00EEAA",
  "#4AB020",
  "#B000B0",
  "#00F020",
  "#335533",
  "#AA2255",
  "#36A0A1",
  "#440000",
  "#707000",
  "#000044",
  "#289840",
  "#273757",
  "#A1A100",
  "#C18100",
  "#702070",
  "#c0b0a0",
  "#704010",
  "#002030",
  "#300000",
  "#500000",
  "#700000",
  "#900000",
  "#B00000",
  "#D00000",
  "#F00000",
  "#0",
];

const hexes = [0, 3, 5, 7, 9, "B", "D", "F"];

function giveColors(spot) {
  const colorsB = [];
  for (let r = 0; r < hexes.length; r++) {
    for (let g = 0; g < hexes.length; g++) {
      for (let b = 0; b < hexes.length; b++) {
        if (spot == 2) {
          colorsB.push(`#${hexes[r]}F${hexes[g]}F${hexes[b]}F`);
        }
        if (spot == 1) {
          colorsB.push(`#${hexes[r]}F${hexes[b]}F${hexes[g]}F`);
        }
        if (spot == 0) {
          colorsB.push(`#${hexes[b]}F${hexes[r]}F${hexes[g]}F`);
        }
      }
    }
  }

  return colorsB;
}

const colorsR = giveColors(0);
const colorsG = giveColors(1);
const colorsB = giveColors(2);

const colorsA = [];

function addSome(startIdx, arr) {
  for (let i = startIdx; i < startIdx + hexes.length; i++) {
    colorsA.push(arr[i]);
  }
}
for (let i = 0; i < colorsR.length; i = i + hexes.length) {
  addSome(i, colorsR);
  addSome(i, colorsG);
  addSome(i, colorsB);
}

const colors33 = [...new Set(colorsA)];

function getContrastColor(hexColor) {
  // Convert hex color to RGB
  

  let r = parseInt(hexColor.slice(1, 3), 16);
  

  let g = parseInt(hexColor.slice(3, 5), 16);

  let b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance

  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  
  // Return black or white based on luminance

  return luminance > 0.5 ? "#000000" : "#ffffff";
}

const color4s = [
  "#e6f0ff",
  "#bae6fd",
  "#7ed6df",
  "#e0f2fe",
  "#ffefd5",
  "#ffdeb3",
  "#ffce9e",
];

let currentUp = 1;
let highmax = 5;

let blocks = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

let gameWon = false;

function done() {
  if (highmax >= 329) {
    alert("you win :)");
    if (!gameWon) {
      gamesWon++;
      gameWon = true;
      makeScore();
    }
  }
  
  if (blocks[6].every(x => x > 0)) {
    alert("you lose :(");
    gameWon = false;
  }
}

function symmetry(blockies) {
  if (blockies.length < 1) return false;
  if (blockies[0].length != 5) return false;
  
  for (let row = 0; row < blockies.length; row++) {
    if (blockies[row][0] != blockies[row][4]) return false;
    if (blockies[row][1] != blockies[row][3]) return false;
  }
  
  return true;
}

function colorBasedOnNumRows(blockies) {
  let numRows = 0;
  for (let row = 0; row < blockies.length; row++) {
    for (let cell = 0; cell < blockies[row].length; cell++) {
      if (blockies[row][cell] != 0) {
        numRows++;
        break;
      }
    }
  }
  
  if (numRows === 1) {
    return "#eeeeee";
  }
  
  if (numRows === 2) {
    return "#e9e9e9";
  }
  
  if (numRows === 3) {
    return "#e5e5e5";
  }
  
  if (numRows === 4) {
    return "#e0e0e0";
  }
  
  if (numRows === 5) {
    return "#d9d9d9";
  }
  
  if (numRows === 6) {
    return "#d5d5d5";
  }
  
  return "#d0d0d0";
}

function getBgFill(blockies) {
  if (blockies.length < 1) return "#eeeeee";
  const numCols = blockies[0].length;
  for (let col = 0; col < numCols; col++) {
    let upperBlocks = [];
    for (let row = 0; row < blockies.length; row++) {
      let curBlockVal = blockies[row][col];
      for (let ub = 0; ub < upperBlocks.length; ub++) {
        if (curBlockVal > upperBlocks[ub]) {
          return "#eedddd";
        }
      }

      upperBlocks.push(curBlockVal);
    }
  }

  return symmetry(blockies) ? "#eef7f2" : colorBasedOnNumRows(blockies);
}

function newGame() {
  if (!confirm("sure?")) return;
  localStorage.setItem("gamesWon", gamesWon);
  localStorage.setItem("blocks", "");
  window.location.reload();
}

const blocksStored = localStorage.getItem("blocks");
let gamesWon = localStorage.getItem("gamesWon") || 0;

function makeFiveColumns(someBlocks) {
  const newBlocks = [];
  for (let row = 0; row < someBlocks.length; row++) {
    const newRow = [];
    for (let i = 0; i < 5; i++) {
      newRow.push(someBlocks[row][i] || 0)
    }
    
    newBlocks.push(newRow);
  }
  
  return newBlocks;
}

if (blocksStored) {
  blocks = JSON.parse(blocksStored);
  localStorage.setItem(`stored-blocks-a${Math.floor(Math.random() * 200)}`, blocksStored);
  blocks = makeFiveColumns(blocks);
  let maxRow = blocks.map(function(row){ return Math.max.apply(Math, row); });
  let max = Math.max.apply(null, maxRow);
  let min = Math.max(1, max - 8);
  currentUp = min + Math.floor(Math.random() * 5);
} else {
  alert("tap a column to send a block up. blocks with the same value will merge together. if you run out of space you lose. if you get a block with a value of 1 duotrigintillion you win. press ok to play");
}

const mags = [
  "",
  "k",
  "m",
  "b",
  "t",
  "qa",
  "qi",
  "sx",
  "sp",
  "oc",
  "no",
  "de",
  "ud",
  "dd",
  "td",
  "qt",
  "qd",
  "sd",
  "st",
  "od",
  "nd",
  "v",
  "uv",
  "dv",
  "tv",
  "qv",
  "qg",
  "xv",
  "sv",
  "ov",
  "nv",
  "tg",
  "ut",
  "dt"
];

const xEdge = blocks[0].length - 1;
const yEdge = blocks.length - 1;

let clickingAllowed = true;
let blockWidth = 120;

const mergeTime = 80;
const maxNumChars = 4;

function abbrNum(num, mag) {
  if (num < 1000 || (num < 10000 && mag == 0)) {
    return `${num}${mags[mag]}`;
  } else {
    return abbrNum(Math.floor(num / 1000), mag + 1);
  }
}

const colors = [];
let numberOfColors = 0;
for (let s = .4; s <= 1; s+=.3) {
  for (let h = 0; h <= 1; h+=.1) {
    for (let v = .1; v <= 1; v+= .1) {
      const color = { h: h, s: s, v: v};
      if (numberOfColors !== 299) {
        colors.push(HSVtoRGB(color));
      }
      
      numberOfColors++;
    }
  }
}

colors.push(HSVtoRGB({ h: 1, s: 0, v: 1}))

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
  
  
  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  
}

function drawBlockGeneral(ctx, xPx, yPx, val, hideText) {
  if (val === 0) {
    return;
  }

  const actWidth = blockWidth - 4;

  ctx.fillStyle = colors[val];
  ctx.fillRect(xPx, yPx, actWidth, actWidth);
  ctx.fillStyle = getContrastColor(colors[val]);
  ctx.font = "14pt serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const textX = xPx + actWidth / 2;
  const textY = yPx + actWidth / 2;

  const textNum = 2 ** val;
  const textStr = abbrNum(textNum, 0);

  ctx.fillText(hideText ? "" : textStr, textX, textY);
}

function modForTimestamp(x) {
  return 100 * Math.sin(x / (mergeTime / Math.PI));
}

function animateMergeBlock(
  canvas,
  row,
  col,
  val,
  timestamp,
  doneCallback,
  goingUp,
   leftAdj,
   rightAdj
) {
  drawAllBlocks(canvas);
  if (timestamp > mergeTime) {
    doneCallback();
    return;
  } else {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = colors[val];

    let yPos = row * blockWidth + 2;
    
    const xPx = col * blockWidth + 2;
    
    if (goingUp) {
      yPos = yPos - blockWidth * (timestamp / mergeTime);
      drawBlockGeneral(ctx, xPx, (row * blockWidth + 2) - blockWidth, val, true);
    }


    drawBlockGeneral(ctx, xPx, yPos, val, leftAdj || rightAdj);
    
    if (leftAdj) {
      drawBlockGeneral(ctx, (xPx - blockWidth) + blockWidth * (timestamp / mergeTime), yPos, val);
    }
    
    if (rightAdj) {
      drawBlockGeneral(ctx, (xPx + blockWidth) - blockWidth * (timestamp / mergeTime), yPos, val);
    }

    
    
    // ctx.fillRect(col*blockWidth + (10 - modForTimestamp(timestamp)/2), yPos, modForTimestamp(timestamp) + (blockWidth - 20), modForTimestamp(timestamp) + (blockWidth - 20));
    // ctx.fillStyle = "white";
    // ctx.font = "24px serif";
    // ctx.fillText(2 ** val, 24+col*blockWidth, 38+yPos);
    
   
    setTimeout(async () => {
      animateMergeBlock(
        canvas,
        row,
        col,
        val,
        timestamp + 1,
        doneCallback,
        goingUp,
        leftAdj,
        rightAdj
      );
    }, 1);
  }
}

function drawBlockSlide(
  canvas,
  col,
  val,
  endPosition,
  currentPosition,
  doneCallback
) {
  drawAllBlocks(canvas);
  if (currentPosition < endPosition) {
    doneCallback();
    return;
  } else {
    const ctx = canvas.getContext("2d");
    const xPx = col * blockWidth + 2;
    const yPx = currentPosition;
    drawBlockGeneral(ctx, xPx, yPx, val);
    /*
    ctx.fillStyle = colors[val];
    ctx.fillRect(col*blockWidth + 10, currentPosition, blockWidth - 20, blockWidth - 20);
    ctx.fillStyle = "white";
    ctx.font = "24px serif";
    ctx.fillText(2 ** val, 20+col*blockWidth, 48+currentPosition);
    */
    setTimeout(async () => {
      drawBlockSlide(
        canvas,
        col,
        val,
        endPosition,
        currentPosition - 10,
        doneCallback
      );
    }, 1);
  }
}

function insertBlockAtColumn(canvas, col) {
  for (let row = 0; row < blocks.length; row++) {
    if (!blocks[row][col]) {
      drawBlockSlide(
        canvas,
        col,
        currentUp,
        row * blockWidth + 20,
        blockWidth * (yEdge + 1),
        () => {
          blocks[row][col] = currentUp;
          document.querySelector("#current-up").style.backgroundColor = "white";
          drawAllBlocks(canvas);
          mergeAndShift(col, canvas);
        }
      );
      return true;
    }
  }

  return false;
}

function mergeBlocks(entryCol, canvas, doneCallback) {
  for (let y = yEdge; y >= 0; y--) {
    for (let x = 0; x < blocks[y].length; x++) {
      const currentBlockValue = blocks[y][x];
      if (!currentBlockValue) {
        continue;
      }
      const leftAdj = x > 0 && blocks[y][x - 1] === currentBlockValue;
      const rightAdj =
        x === entryCol && x < xEdge && blocks[y][x + 1] === currentBlockValue;
      const topAdj = y > 0 && blocks[y - 1][x] === currentBlockValue;

      let newVal = currentBlockValue;

      if (leftAdj) {
        newVal++;
        blocks[y][x - 1] = 0;
      }

      if (rightAdj) {
        newVal++;
        blocks[y][x + 1] = 0;
      }

      if (topAdj) {
        newVal++;
      }

      if (newVal > highmax) {
        highmax = newVal;
        //document.querySelector("#highma").textContent = "max power: " + highmax;
        for (let i = 0; i < blocks.length; i++) {
          for (let j = 0; j < blocks[0].length; j++) {
            if (blocks[i][j] < highmax - 8) {
              blocks[i][j] = 0;
            }
          }
        }
      }

      if (newVal !== currentBlockValue) {
        blocks[y][x] = 0;
        
        animateMergeBlock(
          canvas,
          y,
          x,
          newVal,
          0,
          () => {
            if (topAdj) {
              blocks[y - 1][x] = newVal;
            } else {
              blocks[y][x] = newVal;
            }
            
            doneCallback({ newMerge: true, newX: x });
          },
          topAdj,
          leftAdj,
          rightAdj
        );

        return;
      }
    }
  }

  doneCallback({ newMerge: false });
}

async function animateBlockUp(canvas, row, col, val, timestamp) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = colors[val];
  
  drawAllBlocks(canvas);
  return new Promise((resolve) => {
    if (timestamp > mergeTime) {
      resolve();
    } else {
      let yPos = row * blockWidth + 2;
      const xPx = col * blockWidth + 2;

      yPos = yPos - blockWidth * (timestamp / mergeTime);
      drawBlockGeneral(ctx, xPx, yPos, val);

      setTimeout(async () => {
        await animateBlockUp(
          canvas,
          row,
          col,
          val,
          timestamp + 1
        );
        
        resolve();
      }, 1);
    }
  });
}

async function shiftBlocksUp(canvas) {
  for (let row = 1; row < blocks.length; row++) {
    for (let col = 0; col < blocks[row].length; col++) {
      if (blocks[row][col] !== 0 && blocks[row - 1][col] === 0) {
        
        let blockVal = blocks[row][col];
        
        blocks[row][col] = 0;
        await animateBlockUp(canvas, row, col, blockVal, 0);
        blocks[row - 1][col] = blockVal;
      }
    }
  }
}

function drawAllBlocks(canvas) {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = getBgFill(blocks); //blocksBlocked(blocks) ? "#eedede" : "#eeeeee";
    for (let col = 0; col < blocks[0].length; col++) {
      ctx.fillRect(col * blockWidth + 1, 0, blockWidth - 2, canvas.height);
    }

    for (let x = 0; x < blocks.length; x++) {
      for (let y = 0; y < blocks[x].length; y++) {
        drawBlock(ctx, y, x, blocks[x][y]);
      }
    }
  }
}

function drawBlock(ctx, x, y, val) {
  const xPx = x * blockWidth + 2;
  const yPx = y * blockWidth + 2;
  drawBlockGeneral(ctx, xPx, yPx, val);

  /* if (val === 0) {
    return;
  }
  
  ctx.fillStyle = colors[val];
  ctx.fillRect(x*blockWidth + 10, y*blockWidth + 10, blockWidth - 20, blockWidth - 20);
  ctx.fillStyle = "white";
  ctx.font = "24px serif";
  ctx.fillText(2 ** val, 24+x*blockWidth, 48+y*blockWidth);
  */
}

function mergeAndShift(entryCol, canvas) {
  const mergeResult = mergeBlocks(entryCol, canvas, async (mergeResult) => {
    await shiftBlocksUp(canvas);
    drawAllBlocks(canvas);

    if (mergeResult.newMerge) {
      mergeAndShift(mergeResult.newX, canvas);
    } else {
      clickingAllowed = true;
      localStorage.setItem("blocks", JSON.stringify(blocks));
      let min = Math.max(1, highmax - 8);
      currentUp = min + Math.floor(Math.random() * 5);
      document.querySelector("#current-up").textContent = abbrNum(
        2 ** currentUp,
        0
      );
      document.querySelector("#current-up").style.backgroundColor =
        colors[currentUp];
      document.querySelector("#current-up").style.color = getContrastColor(colors[currentUp]);
      drawAllBlocks(canvas);
      done();
    }
  });
}

const mst = ""

function makeMessage() {
  const ms = document.querySelector("#msg");
  let cols = ["red", "green"];
  let curCol = 0;
  for (let i = 0; i < mst.length; i++) {
    let cutlet = mst[i];
    let col = cols[curCol];
    if (cutlet != " ") {
      curCol = (curCol + 1) % cols.length;
    }
    
    const spanny = document.createElement("span")
    spanny.textContent = cutlet;
    spanny.style.color = col;
    ms.appendChild(spanny);
  }
}

function makeScore() {
  const ms = document.querySelector("#score");
  if (gamesWon > 0) {
   ms.textContent = `Games Won: ${gamesWon}`;
  }
    }

document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.querySelector("canvas");
  canvas.width = Math.min(window.innerWidth, 400);
  canvas.height = (canvas.width / 5) * 7;
  blockWidth = canvas.width / blocks[0].length;
  drawAllBlocks(canvas);
  document.querySelector("#current-up").textContent = abbrNum(
    2 ** currentUp,
    0
  );
  document.querySelector("#current-up").style.backgroundColor =
    colors[currentUp];

  makeScore();  makeMessage();
  document.querySelector("#current-up").style.color = getContrastColor(colors[currentUp]);

  canvas.addEventListener("click", (e) => {
    if (!clickingAllowed) {
      return;
    }

    clickingAllowed = false;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const column = Math.floor(x / blockWidth);
    const inserted = insertBlockAtColumn(canvas, column);
    if (!inserted) {
      alert("illegal");
      clickingAllowed = true;
    } else {
      document.querySelector("#current-up").style.backgroundColor = "white";
      document.querySelector("#current-up").style.color = "white";
    }
  });
});
