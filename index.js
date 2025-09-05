import { defaultValues } from "./defaultValues.js";
import { powerUpsIntervals, upgrades } from "./upgrades.js";

let gem = document.querySelector('.gem-cost') //definiu a gema
let parsedGem = parseFloat(gem.innerHTML) 


let gpcText = document.getElementById('gpc-text') //definiu o texto do gps e gpc
let gpsText = document.getElementById('gps-text') 

let gemImgContainer = document.querySelector('.gem-img-container')

let gpc = 1;
let gps = 0;

const bgm = new Audio('./sounds/bgm.mp3')
bgm.volume = 0.1
document.addEventListener('click', () => {
    bgm.loop = true
    bgm.play()
}, { once: true })



function incrementGem(event) {  //função de adição ao clicar na gema
    const clickSound = new Audio('./sounds/click.mp3')
    clickSound.volume = 0.1
    clickSound.play()

    gem.innerHTML = Math.round(parsedGem += gpc)
    const x = event.offsetX
    const y = event.offsetY
    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(gpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
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

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)
    const nextLevelP = document.getElementById(`${mu.name}-next-p`)

    if (parsedGem >= mu.parsedCost) {
        const UpgradeSound = new Audio('./sounds/upgrade.mp3')
        UpgradeSound.play()
        UpgradeSound.volume = 0.1;
        gem.innerHTML = Math.round(parsedGem -= mu.parsedCost);

        let index = powerUpsIntervals.indexOf(parseFloat(mu.level.innerHTML))

        if ( index !== -1) {
            upgradeDiv.style.cssText = `border-color: white`;
            nextLevelDiv.style.cssText = `background-color: rgb(90, 90, 90); font-weight: normal`;
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)
            
            if ( mu.name === 'clicker') {
                gpc *= mu.powerUps[index].multiplier
                nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per click`
            } else {
                gps -= mu.power
                mu.power *= mu.powerUps[index].multiplier
                gps += mu.power
                nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per second`
            }
        }
            mu.level.innerHTML ++
            index = powerUpsIntervals.indexOf(parseFloat(mu.level.innerHTML))

        if ( index !== -1) {
            upgradeDiv.style.cssText = `border-color: blue`;
            nextLevelDiv.style.cssText = `background-color: rgb(7, 90, 197); font-weight: bold`;
            nextLevelP.innerText = mu.powerUps[index].description

            mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.0004 ** parseFloat(mu.level.innerHTML))
        } else{
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)
            mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.gemMultiplier).toFixed(2))

            if (mu.name === 'clicker') nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per click`
            else  nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per second`
        }
    
        if (mu.name === 'clicker') {
            gpc += mu.parsedIncrease
        } else {
            gps -= mu.power
            mu.power += mu.parsedIncrease
            gps += mu.power
        }

        if (mu.name === 'clicker') gpx += mu.parsedIncrease
        else {}
    }
}

function save () {
    localStorage.clear()
    upgrades.map((upgrade) => {
        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })
        localStorage.setItem(upgrade.name, obj)
    })

    localStorage.setItem('gpc', JSON.stringify(gpc))
    localStorage.setItem('gps', JSON.stringify(gps))
    localStorage.setItem('gem', JSON.stringify(parsedGem))
}

function load () {
    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))

        upgrade.parsedCost = savedValues.parsedCost
        upgrade.parsedIncrease = savedValues.parsedIncrease
        upgrade.level.innerHTML = savedValues.parsedLevel
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost)
        upgrade.increase.innerHTML = upgrade.parsedIncrease
    })
    gpc = JSON.parse(localStorage.getItem('gpc'))
    gps = JSON.parse(localStorage.getItem('gps'))
    parsedGem = JSON.parse(localStorage.getItem('gem'))
    gem.innerHTML = Math.round(parsedGem)
}

setInterval(() => {
    parsedGem += gps / 10
    gem.innerHTML = Math.round(parsedGem)
    gpcText.innerHTML = Math.round(gpc)
    gpsText.innerHTML = Math.round(gps)
},100) 

window.incrementGem = incrementGem
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load