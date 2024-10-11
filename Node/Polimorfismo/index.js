class Vehicle {
    move() {
        console.log("O veículo está se movendo")
    }
}

class Car extends Vehicle {
    move() {
        console.log("O carro está se movendo")
    }
}

class Ship extends Vehicle {
    move() {
        console.log("O navio está navegando")
    }
}

class Aircraft extends Vehicle {
    move(speed) {
        console.log(`A aeronave está voando a ${speed} Km/h`)
    }
}


const delorean = new Car()
const blackperl = new Ship()
const apollo12 = new Aircraft()

//delorean.move()
//blackperl.move()
//apollo12.move('30')

function start(vehicle) {
    console.log(`Veiculo iniciado!`);
    vehicle.move()
}

start(delorean)
start(blackperl)
start(apollo12)