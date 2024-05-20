#! /usr/bin/env code
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

const res = await inquirer.prompt([
    {
        type: "number",
        name: "userInput",
        message: "Please enter the amount of seconds",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            } else if (input > 60) {
                return "Seconds must be 60 or less";
            } else {
                return true;
            }
        }
    }
]);

let input = res.userInput;

function startTime(val:number) {
    const endTime = new Date(new Date().getTime() + val * 1000);
    
    const interval = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(endTime, currentTime);

        if (timeDiff <= 0) {
            console.log("Timer has expired");
            clearInterval(interval); // Stop the interval
            process.exit(); // Exit the process
        }

        const min = Math.floor(timeDiff / 60);
        const sec = timeDiff % 60;
        console.log(`${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`);
    }, 1000);
}

startTime(input);