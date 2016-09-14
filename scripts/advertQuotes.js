/**
 * Created by r3v3nan7 on 08.09.16.
 */
function advertQuotes(){


    var advertizingQuotes = [
        "\"We need to stop interrupting what people are interested in & be what people are interested in.\" -- Craig Davis",

        "\"Nobody counts the number of ads you run; they just remember the impression you make.\" -- Bill Bernbach",

        "\"Nobody reads ads. People read what interests them, and sometimes it’s an ad.\" -- Howard Luck Gossage",

        "\"The only people who care about advertising are the people who work in advertising.\" -- George Parker",

        "\"By definition, remarkable things get remarked upon.\" -- Seth Godin",

        "\"Rules are what the artist breaks; the memorable never emerged from a formula.\" -- Bill Bernbach",

        "\"In advertising, not to be different is virtually suicidal.\" -- Bill Bernbach",

        "\"Never write an advertisement which you wouldn’t want your family to read. You wouldn’t tell lies to your own wife. Don’t tell them to mine.\" -- David Ogilvy",

        "\"Advertising is only evil when it advertises evil things.\" -- David Ogivly",

        "\"If dogs don’t like your dog food, the packaging doesn’t matter.\" -- Stephen Denny",

        "\"Don’t find customers for your product. Find products for your customers.\" -- Seth Godin.",

        "\"Give them quality. That’s the best kind of advertising.\" -- Milton Hershey",

        "\"Simplicity is the ultimate sophistication.\" -- Leonardo Da Vinci",

        "\"Make it simple. Make it memorable. Make it inviting to look at.\" -- Leo Burnett",

        "\"If you can’t explain it to a six year old, you don’t understand it well enough yourself.\" -- Albert Einsteen",

        "\"If you want to understand how a lion hunts, don’t go to the zoo. Go to the jungle.\" -- Jim Stengel",

        "\"The aim of marketing is to know and understand the customer so well the product or service fits him and sells itself.\" -- Peter Drucker",

        "\"Curiosity about life, in all its aspects, I think, is still the secret of great creative people.\" -- Leo Burnett",

        "\"Creativity may well be the last legal unfair competitive advantage we can take to run over the competition.\" --Dave Trott",

        "\"Creativity without strategy is called art, creative with strategy is called advertising.\" -- Prof. Jef L. Richards",

        "\"An idea can turn to magic or dust, depending on the talent that rubs against it.\" -- Bill Bernbach",

        "\"Think like a wise man but communicate in the language of the people.\" -- William Butler Yeats",

        "\"In our factory, we make lipstick. In our advertising, we sell hope.\" -- Peter Nivio Zarlenga",

        "\"Don’t tell me how good you make it; tell me how good it makes me when I use it.\" -- Leo Burnett",

        "\"People share, read and generally engage more with any type of content when it’s surfaced through friends and people they know and trust.\" -- Malorie Lucich, Facebook",

        "\"On the average, five times as many people read the headline as read the body copy. When you have written your headline, you have spent eighty cents out of your dollar.\" --  David Ogilvy",

        "\"People spend money when and where they feel good.\" -- Walt Disney",

        "\"Stopping advertising to save money is like stopping your watch to save time.\" -- Henry Ford",

        "\"Doing business without advertising is like winking at a girl in the dark. You know what you are doing, but nobody else does\" -- Steuart Henderson Britt"



    ];


    //var randNum = Math.floor(Math.Rand() * quotes.length);
    var randNum = Math.floor((Math.random() * advertizingQuotes.length));

    //alert(quotes[randNum]);
    $('.advertQuotes').html('<p onclick="advertQuotes()">' + advertizingQuotes[randNum] + ' </p>');


}










function advertQuotesPosts(postId) {

    let elementById =  '#' + postId.id;

    var advertizingQuotes = [
        "\"We need to stop interrupting what people are interested in & be what people are interested in.\" -- Craig Davis",

        "\"Nobody counts the number of ads you run; they just remember the impression you make.\" -- Bill Bernbach",

        "\"Nobody reads ads. People read what interests them, and sometimes it’s an ad.\" -- Howard Luck Gossage",

        "\"The only people who care about advertising are the people who work in advertising.\" -- George Parker",

        "\"By definition, remarkable things get remarked upon.\" -- Seth Godin",

        "\"Rules are what the artist breaks; the memorable never emerged from a formula.\" -- Bill Bernbach",

        "\"In advertising, not to be different is virtually suicidal.\" -- Bill Bernbach",

        "\"Never write an advertisement which you wouldn’t want your family to read. You wouldn’t tell lies to your own wife. Don’t tell them to mine.\" -- David Ogilvy",

        "\"Advertising is only evil when it advertises evil things.\" -- David Ogivly",

        "\"If dogs don’t like your dog food, the packaging doesn’t matter.\" -- Stephen Denny",

        "\"Don’t find customers for your product. Find products for your customers.\" -- Seth Godin.",

        "\"Give them quality. That’s the best kind of advertising.\" -- Milton Hershey",

        "\"Simplicity is the ultimate sophistication.\" -- Leonardo Da Vinci",

        "\"Make it simple. Make it memorable. Make it inviting to look at.\" -- Leo Burnett",

        "\"If you can’t explain it to a six year old, you don’t understand it well enough yourself.\" -- Albert Einsteen",

        "\"If you want to understand how a lion hunts, don’t go to the zoo. Go to the jungle.\" -- Jim Stengel",

        "\"The aim of marketing is to know and understand the customer so well the product or service fits him and sells itself.\" -- Peter Drucker",

        "\"Curiosity about life, in all its aspects, I think, is still the secret of great creative people.\" -- Leo Burnett",

        "\"Creativity may well be the last legal unfair competitive advantage we can take to run over the competition.\" --Dave Trott",

        "\"Creativity without strategy is called art, creative with strategy is called advertising.\" -- Prof. Jef L. Richards",

        "\"An idea can turn to magic or dust, depending on the talent that rubs against it.\" -- Bill Bernbach",

        "\"Think like a wise man but communicate in the language of the people.\" -- William Butler Yeats",

        "\"In our factory, we make lipstick. In our advertising, we sell hope.\" -- Peter Nivio Zarlenga",

        "\"Don’t tell me how good you make it; tell me how good it makes me when I use it.\" -- Leo Burnett",

        "\"People share, read and generally engage more with any type of content when it’s surfaced through friends and people they know and trust.\" -- Malorie Lucich, Facebook",

        "\"On the average, five times as many people read the headline as read the body copy. When you have written your headline, you have spent eighty cents out of your dollar.\" --  David Ogilvy",

        "\"People spend money when and where they feel good.\" -- Walt Disney",

        "\"Stopping advertising to save money is like stopping your watch to save time.\" -- Henry Ford",

        "\"Doing business without advertising is like winking at a girl in the dark. You know what you are doing, but nobody else does\" -- Steuart Henderson Britt"



    ];


    //var randNum = Math.floor(Math.Rand() * quotes.length);
    var randNum = Math.floor((Math.random() * advertizingQuotes.length));

    //alert(quotes[randNum]);
    $(elementById + ' .advertQuotesPosts').html('<p>' + advertizingQuotes[randNum] + ' </p>');
}







function RandomAdvertQuote() {

    var advertizingQuotes = [
        "\"We need to stop interrupting what people are interested in & be what people are interested in.\" -- Craig Davis",

        "\"Nobody counts the number of ads you run; they just remember the impression you make.\" -- Bill Bernbach",

        "\"Nobody reads ads. People read what interests them, and sometimes it’s an ad.\" -- Howard Luck Gossage",

        "\"The only people who care about advertising are the people who work in advertising.\" -- George Parker",

        "\"By definition, remarkable things get remarked upon.\" -- Seth Godin",

        "\"Rules are what the artist breaks; the memorable never emerged from a formula.\" -- Bill Bernbach",

        "\"In advertising, not to be different is virtually suicidal.\" -- Bill Bernbach",

        "\"Never write an advertisement which you wouldn’t want your family to read. You wouldn’t tell lies to your own wife. Don’t tell them to mine.\" -- David Ogilvy",

        "\"Advertising is only evil when it advertises evil things.\" -- David Ogivly",

        "\"If dogs don’t like your dog food, the packaging doesn’t matter.\" -- Stephen Denny",

        "\"Don’t find customers for your product. Find products for your customers.\" -- Seth Godin.",

        "\"Give them quality. That’s the best kind of advertising.\" -- Milton Hershey",

        "\"Simplicity is the ultimate sophistication.\" -- Leonardo Da Vinci",

        "\"Make it simple. Make it memorable. Make it inviting to look at.\" -- Leo Burnett",

        "\"If you can’t explain it to a six year old, you don’t understand it well enough yourself.\" -- Albert Einsteen",

        "\"If you want to understand how a lion hunts, don’t go to the zoo. Go to the jungle.\" -- Jim Stengel",

        "\"The aim of marketing is to know and understand the customer so well the product or service fits him and sells itself.\" -- Peter Drucker",

        "\"Curiosity about life, in all its aspects, I think, is still the secret of great creative people.\" -- Leo Burnett",

        "\"Creativity may well be the last legal unfair competitive advantage we can take to run over the competition.\" --Dave Trott",

        "\"Creativity without strategy is called art, creative with strategy is called advertising.\" -- Prof. Jef L. Richards",

        "\"An idea can turn to magic or dust, depending on the talent that rubs against it.\" -- Bill Bernbach",

        "\"Think like a wise man but communicate in the language of the people.\" -- William Butler Yeats",

        "\"In our factory, we make lipstick. In our advertising, we sell hope.\" -- Peter Nivio Zarlenga",

        "\"Don’t tell me how good you make it; tell me how good it makes me when I use it.\" -- Leo Burnett",

        "\"People share, read and generally engage more with any type of content when it’s surfaced through friends and people they know and trust.\" -- Malorie Lucich, Facebook",

        "\"On the average, five times as many people read the headline as read the body copy. When you have written your headline, you have spent eighty cents out of your dollar.\" --  David Ogilvy",

        "\"People spend money when and where they feel good.\" -- Walt Disney",

        "\"Stopping advertising to save money is like stopping your watch to save time.\" -- Henry Ford",

        "\"Doing business without advertising is like winking at a girl in the dark. You know what you are doing, but nobody else does\" -- Steuart Henderson Britt",
    ];

    //var randNum = Math.floor(Math.Rand() * quotes.length);
    var randNum = Math.floor((Math.random() * advertizingQuotes.length));

    //alert(quotes[randNum]);
    return advertizingQuotes[randNum];

}









