//exercitiu
class Software{
    constructor(name){
        this.name=name
    }

    run(){
        console.log(`${this.name} software is running`)
    }
}

const s0=new Software('me donno')
s0.run()

class BrowserPlugin{
    constructor(description){
        this.description=description
    }

    action(){
        console.log(`${this.description} is activated`)
    }
}

const p0=new BrowserPlugin('ad blocker')
const p1=new BrowserPlugin('dark mode')
p0.action()
p1.action()

class Browser extends Software{
    constructor(name){
        super(name);
        this.plugins=[]
    }

    addPlugin(p){
        this.plugins.push(p);
    }

    activatePlugins(){
        console.log(`activating all plugins`)
        this.plugins.forEach(element=>{element.action()});
    }
}

const b0=new Browser('Chrome')
b0.run
b0.addPlugin(p0);
b0.addPlugin(p1)
console.log(b0.plugins)
b0.activatePlugins()

//exemplu din video
// class Robot{
//     constructor(name){
//         this.name=name
//     }

//     move(){
//         console.log(`${this.name} is moving`)
//     }
// }

// const r0=new Robot('coddy :)')
// r0.move()

// class Weapon{
//     constructor(description){
//         this.description=description
//     }

//     fire(){
//         console.log(`${this.description} is firing`)
//     }
// }

// const w0=new Weapon('laser')
// w0.fire()

// class CombatRobot extends Robot{
//     constructor(name){
//         super(name)
//         this.weapons=[]
//     }

//     addWeapons(w){
//         this.weapons.push(w)
//     }

//     fire(){
//         console.log('firing all weapons')
//         this.weapons.forEach(element=>{element.fire()});
//     }
// }

// const r1=new CombatRobot('coddy combat version')
// r1.addWeapons(w0)
// r1.move()
// r1.fire()

// Robot.prototype.fly=function(){
//     console.log(`${this.name} is flying`)
// }

// r1.fly()