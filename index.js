let gem = document.querySelector('.gem-cost') //definiu a gema
let parsedGem = parseFloat(gem.innerHTML) 

let clickerCost = document.querySelector('.clicker-cost') //definiu o custo do clicker
let parsedClickerCost = parseFloat(clickerCost.innerHTML)
let clickerLevel = document.querySelector('.clicker-level') //definiu o nivel do clicker
let clickerIncrease = document.querySelector('.clicker-increase') //definiu o aumento do clicker
let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML)

let pickaxeCost = document.querySelector('.pickaxe-cost') //definiu o custo da pickaxe
let parsedPickaxeCost = parseFloat(pickaxeCost.innerHTML)
let pickaxeLevel = document.querySelector('.pickaxe-level') //definiu o nivel da pickaxe
let pickaxeIncrease = document.querySelector('.pickaxe-increase') //definiu o aumento da pickaxe
let parsedPickaxeIncrease = parseFloat(pickaxeIncrease.innerHTML)

let minerCost = document.querySelector('.miner-cost') //definiu o custo do miner
let parsedMinerCost = parseFloat(minerCost.innerHTML)
let minerLevel = document.querySelector('.miner-level') //definiu o nivel do miner
let minerIncrease = document.querySelector('.miner-increase') //definiu o aumento do miner
let parsedMinerIncrease = parseFloat(minerIncrease.innerHTML)

let gpcText = document.getElementById('gpc-text') //definiu o texto do gps e gpc
let gpsText = document.getElementById('gps-text') 

let gemImgContainer = document.querySelector('.gem-img-container')

let gpc = 1;
let gps = 0;

const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector('.clicker-increase'),
        parsedIncrease: parseFloat(document.querySelector('.clicker-increase').innerHTML),
        level: document.querySelector('.clicker-level'),
        gemMultiplier: 1.025,
        costMultiplier: 1.12,
    },
    {
        name: 'pickaxe',
        cost: document.querySelector('.pickaxe-cost'),
        parsedCost: parseFloat(document.querySelector('.pickaxe-cost').innerHTML),
        increase: document.querySelector('.pickaxe-increase'),
        parsedIncrease: parseFloat(document.querySelector('.pickaxe-increase').innerHTML),
        level: document.querySelector('.pickaxe-level'),
        gemMultiplier: 1.025,
        costMultiplier: 1.12,
    },
    {
        name: 'miner',
        cost: document.querySelector('.miner-cost'),
        parsedCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
        increase: document.querySelector('.miner-increase'),
        parsedIncrease: parseFloat(document.querySelector('.miner-increase').innerHTML),
        level: document.querySelector('.miner-level'),
        gemMultiplier: 1.025,
        costMultiplier: 1.12,
    }
]

function incrementGem(event) {  //função de adição ao clicar na gema
    gem.innerHTML = Math.round(parsedGem += gpc)
    const x = event.offsetX
    const y = event.offsetY
    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(gpc)}`
    div.style.cssText = `color: white; position: absolute; top ${y}px; left: ${x}px; pointer-events: none;`
    gemImgContainer.appendChild(div)
    div.classList.add('fade-up')
    timeout(div)
}
const timeout = (div) => {
    setTimeout(() =>{
        div.remove()
    },800)
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) =>{
        if (u.name === upgrade) return u
    })

    if (parsedGem >= mu.parsedCost) {
        gem.innerHTML = Math.round(parsedGem -= mu.parsedCost);

        mu.level.innerHTML ++

        mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.gemMultiplier).toFixed(2))
        mu.increase.innerHTML = mu.parsedIncrease

        mu.parsedCost *= mu.costMultiplier;
        mu.cost.innerHTML = Math.round(mu.parsedCost)

        if (mu.name === 'clicker') {
            gpc += mu.parsedIncrease
        } else {
            gps += mu.parsedIncrease
        }
    }
}

setInterval(() => {
    parsedGem += gps / 10
    gem.innerHTML = Math.round(parsedGem)
    gpcText.innerHTML = Math.round(gpc)
    gpsText.innerHTML = Math.round(gps)
},100) 