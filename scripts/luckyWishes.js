/**
 * Created by r3v3nan7 on 09.09.16.
 */

function luckyWish(){

    var wishes = [
      "Here’s to wishing you the best of luck in all life has to offer you.",

      "Good luck to you as you move toward the next chapter life brings your way.",

      "I heard about your good news and wanted to wish you good luck and best of health.",

      "So glad to hear about your promotion. May your life always be filled with such good luck.",

      "My heart is filled with joy at the sound of your good news. Best of luck to you dear friend.",

      "Here’s to hoping good luck continues to follow you for all the rest of your days my friend.",

      "Luck is not found but made by those who are determined and you are one such person.",

      "Sending you thoughtful wishes in all life’s endeavors. Good luck to you now and always.",

      "I am overjoyed to know that your life is filled with such good luck and may it always be that way.",

      "Life is what you make of it and I am happy to know that yours is filled with such good luck.",

      "May you find as much joy in your life as you have luck my sweet friend.",

      "So happy to hear your wonderful news. Here’s to wishing you the best of luck!",

      "I am thrilled to know that luck has finally found you. Warmest wishes my friend.",

      "Sending you happy thoughts and lots of luck as you move forward with your life.",

      "The sweetest things in life are love and happiness. Wishing you good luck now that you have found that.",

      "My heart is flowing with joy at knowing that good luck has finally fallen upon your doorstep.",

      "I find my heart singing a chorus at your happy news. Good luck to you during this joyous time.",

      "Smile knowing that good luck has finally found you. Wishing you plenty of joy, happiness, and health.",

      "The good luck you have made for yourself is an inspiration to many. May it continue throughout your life.",

      "Good luck to you and remember to keep your head up high for all the days of your beautiful and wonderful life."
    ];


    var randNum = Math.floor((Math.random() * wishes.length));

    //alert(quotes[randNum]);
    $('.luckyWishes').html('<p onclick="luckyWish()">' + wishes[randNum] + ' </p>');

}
