import './style.css'


// Variables definition 
let quoteContainer: HTMLElement;
let quoteText: HTMLElement;
let authorText: HTMLElement;
let twitterBtn: HTMLElement;
let newQuoteBtn: HTMLElement;
let loader: HTMLElement;
let alertBanner: HTMLElement;

let apiQuotes: any;

// Variables init 
quoteContainer = document.getElementById('quote-container')!;
quoteText = document.getElementById('quote')!;
authorText = document.getElementById('author')!;
twitterBtn = document.getElementById('twitter')!;
newQuoteBtn  = document.getElementById('new-quote')!;
loader  = document.getElementById('loader')!;
alertBanner  = document.getElementById('alert-banner')!;

//Hide alerte Banner
function hideBanner ():void {
  alertBanner.classList.add('displayNone');
}

//Show alerte Banner
function showBanner ():void {
  alertBanner.classList.remove('displayNone');
}

// Show Loading
function loading ():void {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading 
function complete ():void {
  quoteContainer.hidden =  false;
  loader.hidden = true;
}

// Show New Quote
function newQuote ():void{
  loading();
  // Pick a random quote from apiQUotes array
  const quote:any = (apiQuotes[Math.floor(Math.random() * apiQuotes.length)]);

  // Check if Author field is blnak replace it by Unknowed
  (!quote.author)?  authorText.textContent = "Unknow" : authorText.textContent = quote.author;

  // Check Quote length to determine styling
  (quote.text.length> 50)? quoteText.classList.add('long-quote'):quoteText.classList.remove('long-quote');
  
  //Set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}




// Get Quotes From API
async function getQuotes():Promise<void>  {
  loading();
  const apiurl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try{
    hideBanner();
    const response:Response = await fetch(apiurl);
    apiQuotes = await response.json();
    newQuote();
  } catch {
      showBanner();
    // Catch Error Here
  }
}

// Twieet Quote 

function tweetQuote ():void{
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText?.textContent} - ${authorText?.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn?.addEventListener('click',tweetQuote);

// On Load
getQuotes();
