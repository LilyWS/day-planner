var timeBlocks = $(".time-block");
var saveButtons = $(".saveBtn")
var currentDayEl = $("#currentDay");
var hour = moment().format('HH');

for(let i=0;i<saveButtons.length;i++){
    $(saveButtons[i]).attr("id",[i+9]);
}

//set savedevents to local storage equivalent
var savedEvents = (localStorage.getItem("savedEvents") != null) ? JSON.parse(localStorage.getItem("savedEvents")) : 1;
//if no saved events initialize the object. im aware this is a stupid way to do this.
if(savedEvents==1) {
    savedEvents = {};
    for(let i=0; i<timeBlocks.length; i++) { //fill out savedEvents object
        savedEvents[i+9] = "";

    }
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
}


currentDayEl.text(moment().format("dddd, MMMM Do"));

//style hour blocks and restore saved events
for(let i=0; i<timeBlocks.length; i++) {
    let childObj = $(timeBlocks.find('textarea')[i]);
    if(i+9 < hour){
        childObj.addClass("past");
    }else if(i+9 > hour){
        childObj.addClass("future");
    }else {
        childObj.addClass("present");
    }
    childObj.text(savedEvents[i+9]);
}

saveButtons.on('click', function() {
    savedEvents[$(this).attr("id")] = $(timeBlocks.find('textarea')[$(this).attr("id")-9]).val();
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
});

