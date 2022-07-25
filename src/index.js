class Car {
  constructor(name) {
    this.name = name;
    this.forward = 0;
  }
  go() {
    const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
    if (randomNumber >= 4) {
      this.forward += 1;
    }
  }
}

class Cars {
  constructor(carNames, cars) {
    this.carNames = "";
    this.cars = [];
  }

  getCarNames() {
    return this.carNames;
  }

  getCars() {
    //console.log(this.cars);
    return this.cars;
  }

  setCarNames(carNames) {
    this.carNames = carNames;
  }

  setCars(carNamesArr) {
    carNamesArr.forEach((name) => {
      this.cars.push(new Car(name));
    });
  }

  checkCarName(carNamesArr) {
    carNamesArr.forEach((name) => {
      if (name.length > 5) {
        this.setCarNames("");
        console.log(this.getCars());
        alert("5자 이하로");
      }
    });
  }

  carNamesInputHandler() {
    const carNamesInput = document.getElementById("car-names-input");
    carNamesInput.addEventListener("change", (e) => {
      this.setCarNames(carNamesInput.value);
    });
  }

  carNamesSubmitHandler() {
    const carNamesButton = document.getElementById("car-names-submit");
    carNamesButton.addEventListener("click", (e) => {
      e.preventDefault();
      const carNamesArr = this.getCarNames().split(",");
      this.checkCarName(carNamesArr);
      this.setCars(carNamesArr);
      console.log(cars);
    });
  }
}

class Result {
  constructor(race) {
    this.cars = cars;
  }
  printWinner() {
    console.log(winner);
  }
}

class Race {
  constructor(cars) {
    this.cars = cars;
    this.racingCount = 0;
    this.winnerArr = [];
  }
  setRacingCount(number) {
    this.racingCount = number;
  }
  setWinner(winnerArr) {
    winnerArr.forEach((car) => {
      this.winnerArr.push(car.name);
    });
    //console.log(this.winnerArr);
  }
  getRacingCount() {
    return this.racingCount;
  }
  getWinner() {
    return this.winnerArr;
  }

  racingCountInputHandler() {
    const racingCountInput = document.getElementById("racing-count-input");
    racingCountInput.addEventListener("change", (e) => {
      e.preventDefault();
      this.setRacingCount(racingCountInput.value);
    });
  }
  racingCountSubmitHandler() {
    const racingCountButton = document.getElementById("racing-count-submit");
    racingCountButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(this.getRacingCount());
      this.play();
    });
  }

  play() {
    const cars = this.cars.getCars();
    for (let i = 0; i < this.getRacingCount(); i++) {
      cars.forEach((car) => {
        car.go();
      });
      //console.log(cars);
      this.printRacingResult();
    }
    this.findWinner();
    this.printWinner();
  }

  findWinner() {
    const cars = this.cars.getCars();
    const forwardResult = [];
    cars.forEach((car) => {
      forwardResult.push(car.forward);
    });
    const maxForward = Math.max(...forwardResult);

    let result = cars.filter((car) => {
      return car.forward === maxForward;
    });

    this.setWinner(result);
  }
  printWinner() {
    const racingWinner = document.getElementById("racing-winners");
    const str = this.getWinner().join(",");
    racingWinner.innerText = str;
    //console.log(this.getWinner().join(","));
  }
  printRacingResult() {
    const cars = this.cars.getCars();

    for (let i = 0; i < 3; i++) {
      const racingResult = document.createElement("h5");
      racingResult.innerText = `${cars[i].name}: ${"-".repeat(
        cars[i].forward
      )}`;
      document.body.appendChild(racingResult);
      //console.log(`${cars[i].name}: ${"-".repeat(cars[i].forward)}`);
    }
  }
}

const cars = new Cars();
cars.carNamesInputHandler();
cars.carNamesSubmitHandler();

const race = new Race(cars);
race.racingCountInputHandler();
race.racingCountSubmitHandler();
