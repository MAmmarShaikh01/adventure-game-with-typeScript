import inquirer from "inquirer";
let enemies = ["skeleton", "zombie", "alien", "assasin"];
let maxEnemyHealth = 100;
let maxAttackDamage = 15;
let ourCharacterHealth = 100;
let ourCharacterAttackDamage = 15;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;
let running = true;
let sep = () => console.log("------------------------------------------------");
let rand = (max) => Math.floor(Math.random() * max);
console.log("Welcome to the dungeon!");
while (running) {
    sep();
    let enemyHealth = rand(maxEnemyHealth) + 1;
    let enemy = enemies[rand(enemies.length)];
    let enemyAttackDamage = rand(maxAttackDamage) + 1;
    console.log(`You have encountered a ${enemy}!`);
    console.log(`It has ${enemyHealth}XP health and ${enemyAttackDamage} attack damage.`);
    console.log(`You have ${ourCharacterHealth}XP health and ${ourCharacterAttackDamage} attack damage.`);
    while (enemyHealth > 0) {
        sep();
        let userInput = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: ["Attack", "Use Health Potion", "Run"]
            }
        ]);
        if (userInput.action == "Attack") {
            let damageGiven = rand(ourCharacterAttackDamage);
            let damageRecieved = rand(enemyAttackDamage);
            ourCharacterHealth -= damageRecieved;
            enemyHealth -= damageGiven;
            console.log("You did " + damageGiven + " damage.");
            console.log("The " + enemy + " did " + damageRecieved + " damage.");
            sep();
            if (enemyHealth >= 1) {
                if (ourCharacterHealth > 0) {
                    console.log(`now ${enemy} health is ${enemyHealth} and your health is ${ourCharacterHealth}`);
                }
            }
            else {
                console.log(`You defeated the ${enemy}!`);
                break;
            }
            if (ourCharacterHealth < 1) {
                console.log("You have been defeated by the " + enemy);
                break;
            }
        }
        else if (userInput.action == "Use Health Potion") {
            sep();
            if (numHealthPotions > 0) {
                ourCharacterHealth += healthPotionHealAmount;
                numHealthPotions -= 1;
                console.log("You used a health potion. Your health is now " + ourCharacterHealth + "." + "\n" + "You have " + numHealthPotions + " health potions left.");
            }
            else {
                console.log("You don't have any health potions left. Defeat the " + enemy + ' to get the chance to use a health potion.');
            }
        }
        else if (userInput.action == "Run") {
            sep();
            let runChance = rand(100);
            if (runChance > 70) {
                console.log("You successfully ran away from the " + enemy);
                break;
            }
            else {
                console.log("You couldn't escape the " + enemy + " try again");
                ourCharacterHealth -= 10;
                console.log("Your health is now " + ourCharacterHealth);
            }
        }
    }
    sep();
    if (ourCharacterHealth < 1) {
        console.log("You have been defeated by the " + enemy + " and thrown out of the dungeon.");
        let cont = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "Would you like to play again?",
                choices: ["Yes", "No"]
            }
        ]);
        if (cont.action == "Yes") {
            ourCharacterHealth = 100;
            running = true;
        }
        else {
            console.log("You lose!!!");
            running = false;
        }
    }
    else if (enemyHealth < 1) {
        console.log("You have defeated the " + enemy + " and won the game!");
        console.log("your health is " + ourCharacterHealth);
        if (rand(100) < healthPotionDropChance) {
            numHealthPotions += 1;
            console.log("Enemy dropped a health potion. You now have " + numHealthPotions + " health potion(s).");
        }
        let playAgain = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "Would you like to play again?",
                choices: ["Yes", "No"]
            }
        ]);
        if (playAgain.action == "Yes") {
            running = true;
        }
        else {
            console.log("Thanks for playing!");
            running = false;
        }
    }
}
