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
let gpc = 1;
let gps = 0;
function incrementGem() {  //função de adição ao clicar na gema
    gem.innerHTML = Math.round(parsedGem += gpc)
}
function buyClicker() { //comprar o upgrade clicker
    if (parsedGem >= parsedClickerCost) {
        gem.innerHTML = Math.round(parsedGem -= parsedClickerCost);
        
        clickerLevel.innerHTML ++  // função de adicionar mais poder de click ao comprar upgrade

        parsedClickerIncrease= parseFloat((parsedClickerIncrease * 1.03).toFixed(2))
        clickerIncrease.innerHTML = parsedClickerIncrease
        gpc += parsedClickerIncrease

        parsedClickerCost *= 1.18;
        clickerCost.innerHTML = Math.round(parsedClickerCost)
    }
}
function buyPickaxe() { //comprar o upgrade Pickaxe
    if (parsedGem >= parsedPickaxeCost) {
        gem.innerHTML = Math.round(parsedGem -= parsedPickaxeCost);
        
        pickaxeLevel.innerHTML ++  // função de adicionar mais poder de click ao comprar upgrade

        parsedPickaxeIncrease= parseFloat((parsedPickaxeIncrease * 1.03).toFixed(2))
        pickaxeIncrease.innerHTML = parsedPickaxeIncrease
        gps += parsedPickaxeIncrease

        parsedPickaxeCost *= 1.18;
        pickaxeCost.innerHTML = Math.round(parsedClickerCost)
    }
}
function buyMiner() { //comprar o upgrade Miner
    if (parsedGem >= parsedMinerCost) {
        gem.innerHTML = Math.round(parsedGem -= parsedMinerCost);
        
        minerLevel.innerHTML ++  // função de adicionar mais poder de click ao comprar upgrade

        parsedMinerIncrease= parseFloat((parsedMinerIncrease * 1.03).toFixed(2))
        minerIncrease.innerHTML = parsedMinerIncrease
        gps += parsedMinerIncrease

        parsedMinerCost *= 1.18;
        minerCost.innerHTML = Math.round(parsedClickerCost)
    }
}
setInterval(() => {
    parsedGem += gps / 10
    gem.innerHTML = Math.round(parsedGem)
    gpcText.innerHTML = Math.round(gpc)
    gpsText.innerHTML = Math.round(gps)
},100) 