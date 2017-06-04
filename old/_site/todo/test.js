function printNumbers() {
    for (var i = 0; i<100; i++) {
        if (i%15) {
            console.log("M");
        } else if (i%3) {
            console.log("S");
        } else if (i%5) {
            console.log("A");
        } else {
            console.log(i);
        }
    }
}