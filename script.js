function SplitText(text, splitType, appendDestination, tagType){
  this.text = text;
  this.splitType = splitType;
  this.appendDestination = appendDestination;
  this.tagType = tagType;
  this.splitArray = [];
  this.newText = "";
  this.splitByType();
  this.makeHTML();
  this.appendHTML();
  this.animate();
}
SplitText.prototype.splitByType = function(){
  if(this.splitType == "char"){
    this.splitArray = this.text.split("");
  }
  else if(this.splitType == "word"){
    this.splitArray = this.text.split(" ");
  }
}
SplitText.prototype.makeHTML = function(){
  this.newText = "<span class='splitText' style='display:inline-block'>";
  if(this.splitType == "char"){
    for(i in this.splitArray){
      //console.log(typeof(i));
      var next = parseInt(i)+1;
      //console.log(next);
      this.newText += this.splitArray[i];
      this.newText += "</span>"
      if(i != this.splitArray.length - 1){
        if(this.splitArray[next] != ' '){
          this.newText += "<span class='splitText' style='display:inline-block'>"
        }
        else if(this.splitArray[next] == ' '){
          this.newText += "<span>"
        }
      }
    }
  }
  else if(this.splitType == "word"){
    for(i in this.splitArray){
      this.newText += this.splitArray[i];
      this.newText += "</span>";
      if(i != this.splitArray.length -1){
        this.newText += "<span> </span>";
        this.newText += "<span class='splitText' style='display:inline-block'>"
      }
    }
  }

}

SplitText.prototype.appendHTML = function(){
  $(this.appendDestination).append("<"+this.tagType+">"+this.newText+"</"+this.tagType+">");
}
SplitText.prototype.animate = function(){
  TweenMax.staggerFrom(".splitText", .8, {opacity:0, rotation:-180, y:-100, ease:Back.easeOut}, .08)
}

$(document).on("ready", function(){
  phrase = new SplitText("I like turd sandwhiches", "char", "body", "p");

  $("button").on("click", makeNewPhrase);
  $("#form").on("submit", makeNewPhrase); //form submission isn't working i.e. hitting enter.
  var field1 = $("#phrase");
  var field2 = $("#grouping");
  function makeNewPhrase(evt){
    evt.preventDefault();
    genPhrase = new SplitText(field1.val(), field2.val(), "body", "p");
  }
})
