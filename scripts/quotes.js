/**
 * Created by r3v3nan7 on 07.09.16.
 */

function quotes(){


    var quotes = [
        "My mother said to me, \"If you are a soldier, you will become a general. If you are a monk, you will become the Pope.\"  Instead, I was a painter, and became Picasso. -- Pablo Picasso.",

        "Murphy\'s Fourth Law: If there is a possibility of several things going wrong, the one that will cause the most damage will be the one to go wrong.",

        "\"If you live long enough, you\'ll see that every victory turns into a defeat.\" -- Simone de Beauvoir",

        "\"The purpose of law is to prevent the strong from always having their way.\" -- Ovid ",

        "\"Patriotism means to stand by the country. It does not mean to stand by the president or any other public official...\"  -- Theodore Roosevelt",

        "\"Politicians are like diapers. They should be changed often, and for the same reason.\"-- Anonymous",

        "My opinions might have changed, but not the fact that I am right.",

        "\"Chaos is found in greatest abundance wherever order is being sought. It always defeats order, because it is better organized.\" -- Terry Pratchett (Interesting Times)",

        "\"Democracy does not guarantee equality of conditions - it only gurantees equality of opportunity\" -- Irving Kristol",

        "\"The best preparation for tomorrow is doing your best today.\" -- H. Jackson Brown, Jr. ",

        "\"The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.\" -- Helen Keller",

        "\"What we think, we become.\" -- Buddha",

        "\"I can't change the direction of the wind, but I can adjust my sails to always reach my destination.\" -- Jimmy Dean",

        "\"Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.\" -- Francis of Assisi",

        "\"Happiness is not something you postpone for the future; it is something you design for the present.\" -- Jim Rohn",

        "\"Try to be a rainbow in someone's cloud.\" -- Maya Angelou",

        "\"Perfection is not attainable, but if we chase perfection we can catch excellence.\" -- Vince Lombardi",

        "\"Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.\" -- Steve Jobs",

        "\"If opportunity doesn't knock, build a door.\" -- Milton Berle",

        "\"Let us sacrifice our today so that our children can have a better tomorrow.\" -- A. P. J. Abdul Kalam",

        "\"Change your thoughts and you change your world.\" -- Norman Vincent Peale",

        "\"Nothing is impossible, the word itself says 'I'm possible'!\" -- Audrey Hepburn",

        "\"We know what we are, but know not what we may be.\" -- William Shakespeare",

        "\"Believe you can and you're halfway there.\" -- Theodore Roosevelt",

        "\"Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.\" -- Rabindranath Tagore",

        "\"Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.\" -- Buddha",

        "\"Put your heart, mind, and soul into even your smallest acts. This is the secret of success.\" -- Swami Sivananda"


    ];


    //var randNum = Math.floor(Math.Rand() * quotes.length);
    var randNum = Math.floor((Math.random() * quotes.length));

    //alert(quotes[randNum]);
    $('.quotes').html('<p onclick="quotes()">' + quotes[randNum] + ' </p>');

}
