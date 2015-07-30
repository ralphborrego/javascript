$(function(){
  var bannerArray = [
    "banner-1.jpg",
    "banner-2.jpg",
    "banner-3.jpg",
    "banner-4.jpg"
  ];
  var linkArray = [
    "http://test-1.com/",
    "http://test-2.com/",
    "http://test-3.com/",
    "https://test-4.com/"
  ];
  
  var imgLocation   = "images/";
  var randNum     = Math.floor(Math.random() * 4) + 0;
  var bannerLocation = $('#ban > a > img');
  
  var banImg  = imgLocation + bannerArray[randNum];
  var banLink = linkArray[randNum];
  
  $(bannerLocation).attr('src',banImg);
  $('#ban > a').attr('href',banLink);
});