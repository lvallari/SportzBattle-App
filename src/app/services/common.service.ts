import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  fixObject(obj:any,fields:any){
    //delete all fields that are not defined in fields
    var objx = JSON.parse(JSON.stringify(obj));
    var okeys = Object.keys(obj);
    //var fnames = fields.map(x => {return x.name});
    okeys.forEach((f) => {
      if (fields.indexOf(f) == -1) delete objx[f];
    });

    return objx;
  }

  objectChanged(obj:any,original:any,fields:any){

    var hasChanged = false;
    for (var i=0; i< fields.length; i++){
      if (obj[fields[i]] != original[fields[i]]) {
        //console.log('changed', fields[i], obj[fields[i]], original[fields[i]]);
        hasChanged = true;
        break;
      }
    }
    return hasChanged;
  }

 
  generateToken(){
    var chars = 'abcdefghijklmnopqrstuwxyz01234567';
    var token = '';
    for (var i=0; i < 16; i++){
      token += chars.charAt(Math.round(Math.random()*chars.length));
    }
    return token;
  }

  generateEmail(){
    var chars = 'abcdefghijklmnopqrstuwxyz';
    var token = '';
    for (var i=0; i < 8; i++){
      token += chars.charAt(Math.round(Math.random()*chars.length));
    }
    return token + '@brewker.com';
  }

  generateImageName(){
    var chars = '0123456789';
    var token = '';
    for (var i=0; i < 8; i++){
      token += chars.charAt(Math.round(Math.random()*chars.length));
    }
    return token;
  }

  getDate(timestamp:any){
    
  var date = new Date(timestamp);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  //return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
  //return (getMonthShort(month) + ' ' + day + ', ' + year + ' ' + hours + ':' + (minutes < 10 ? ('0' + minutes): minutes));
  return (this.getMonthShort(month) + ' ' + day + ', ' + year);// + ', ' + year + ' ' + hours + ':' + (minutes < 10 ? ('0' + minutes): minutes));
}

getDate2(timestamp:any){
    
  var date = new Date(timestamp);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  //return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
  //return (getMonthShort(month) + ' ' + day + ', ' + year + ' ' + hours + ':' + (minutes < 10 ? ('0' + minutes): minutes));
  return ((month < 10 ? ('0' + month):month) + '-' + day + '-' + year);// + ', ' + year + ' ' + hours + ':' + (minutes < 10 ? ('0' + minutes): minutes));
}

getCurrentDate(){
  var date_object = new Date();
    
  var date = {
      month: date_object.getMonth(),
      year: date_object.getFullYear()
  }

  return date;
}

getDateTime(timestamp:any){
  var date = new Date(timestamp);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  //return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
  //return (getMonthShort(month) + ' ' + day + ', ' + year + ' ' + hours + ':' + (minutes < 10 ? ('0' + minutes): minutes));
  return (this.getMonthShort(month) + ' ' + day + ', ' + hours + ':' + (minutes < 10 ? ('0' + minutes): minutes));
}

getMonthShort(num:number){
  //console.log('num',num);
  if (num == 1) return 'Jan';
  else if (num == 2) return 'Feb';
  else if (num == 3) return 'Mar';
  else if (num == 4) return 'Apr';
  else if (num == 5) return 'May';
  else if (num == 6) return 'Jun';
  else if (num == 7) return 'Jul';
  else if (num == 8) return 'Aug';
  else if (num == 9) return 'Sep';
  else if (num == 10) return 'Oct';
  else if (num == 11) return 'Nov';
  else if (num == 12) return 'Dec';
  else return 'Jan';
}

getWhen(timestamp:any){
  //This function calculates difference between current time and elapsedTime and returns humanized string
  var cT = Date.now();
  var dT = cT - timestamp;

  var dTmin = Math.floor(dT/60000); //delta time minutes

  //console.log('cT', cT);
  //console.log('delta', dTmin);
  
  //if within a minute, show 'just now'
  if (dTmin < 1) return 'just now';
  else if (dTmin < 60) return dTmin + ' mins ago';
  else {
    var dThr = Math.floor(dT/3600000); //delta time hrs
    if (dThr == 1) return '1 hr ago';
    else if (dThr < 24) return dThr + ' hrs ago';
    else {
      var dTday = Math.floor(dT/86400000); //delta time days
      if (dTday == 1) return '1 day ago';
      else if (dTday < 30) return dTday + ' days ago';
      else {
        var dTmonth = Math.floor(dT/2592000000); //delta time months
        if (dTmonth == 1) return '1 month ago';
        else if (dTmonth < 12) return dTmonth + ' months ago';
        else{
          var dTyear = Math.floor(dT/31104000000); //delta time years
          if (dTyear == 1) return '1 year ago';
          else return dTyear + ' years ago';
        }
      }
    
    }
  }
}

  computeAverage(reviews: any[]){
    var sum = 0;
    
    reviews.forEach(x => {
      sum += Number(x.overall_experience);
    });

    //console.log('sum', sum);
    return reviews.length > 0 ? (sum/reviews.length).toFixed(2):'-';
  }

  resizeImage(base64:any, width:any, quality:any, filename:string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const img = new Image();
    img.src = base64;
  
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = width;
        canvas.height = (width * img.height) / img.width;
        if (ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          base64: dataUrl,
          filename: filename
        });
      };
      img.onerror = reject;
    });
  }

  shuffle(array:any[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

crypt(salt:string, text:string){
  const textToChars = (text:string) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n:any) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code:any) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

decrypt(salt:string, encoded:any){
  const textToChars = (text:any) => text.split("").map((c:any) => c.charCodeAt(0));
  const applySaltToChar = (code:any) => textToChars(salt).reduce((a:any, b:any) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex:any) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode:any) => String.fromCharCode(charCode))
    .join("");
};

getDatesFromStartOfMonth() {
  let dates = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = currentDate.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Loop from the 1st of the current month to today
  for (let day = 1; day <= today; day++) {
    // Create a new date for each day
    const date = new Date(currentYear, currentMonth, day);

    // Format the date as 'Jan 1'
    const formattedDate = `${monthNames[currentMonth]} ${day}`;

    // Add the formatted date to the array
    dates.push(formattedDate);
  }

  return dates;
}

getLastThreeMonthsDates() {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dates = [];
  const today = new Date();
  const startMonth = new Date(today.getFullYear(), today.getMonth() - 2, 1); // Starting from the 1st day of the month, three months ago

  for (let date = new Date(startMonth); date <= today; date.setDate(date.getDate() + 1)) {
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    dates.push(formattedDate);
  }

  return dates;
}

formatDateLabel(monthIdx:number, date:number) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Check if monthIdx is within the valid range
  if (monthIdx < 0 || monthIdx > 11) {
    return 'Invalid month index';
  }
  
  // Check if the date is within a typical month range
  if (date < 1 || date > 31) {
    return 'Invalid date';
  }

  const month = monthNames[monthIdx];
  return `${month} ${date}`;
}
formatDateToYYYYMMDD(item:any){

  //console.log('item', item);

  //val has value MM-DD-YYYY
  //var tags = val.split(' ');
  //console.log('tags', tags);
  if (item) return (item.$M+1) + '/' + item.$D + '/' + item.$y;
  else return '0';
}

formatMonthLabel(monthIdx:number, year:number) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Check if monthIdx is within the valid range
  if (monthIdx < 0 || monthIdx > 11) {
    return 'Invalid month index';
  }
  
  const month = monthNames[monthIdx];
  return `${month} ${year}`;
}

  getDateString(timestamp: number) {

    var date = new Date(timestamp);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //return year.toString() + (month < 10 ? ('0' + month):month) + (day < 10 ? ('0' + day): day);
    return monthNames[month] + '-' + (day < 10 ? ('0' + day) : day);
  }

  isThisMonth(date_str:string){
    var date = new Date();
    var m = date.getUTCMonth();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = monthNames[m];

    return date_str.indexOf(month) > -1;
  }

  getFirstDayOfMonthEpoch() {
    // Get the current date
    const currentDate = new Date();
    
    // Set the date to the first day of the current month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    // Convert the date to epoch time (milliseconds since January 1, 1970)
    const epochTime = firstDayOfMonth.getTime();
    
    // Return the epoch time
    return epochTime;
  }

  getEpochTimeForTodayAtMidnight() {
    // Create a new Date object for today's date
    const now = new Date();
    
    // Set the time to 12:01 AM
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 1, 0, 0);
    
    // Return the epoch time
    return midnight.getTime();
  }

  assignLevel(user: any, levels: any) {

    //find correct level
    var skill_level: any;
    for (var i = 0; i < levels.length; i++) {
      if (user.all_time_points) {
        if (user.all_time_points >= levels[i].points) {
          skill_level = levels[i];
          break;
        }
      }
      else {
        if (user.points >= levels[i].points) {
          skill_level = levels[i];
          break;
        }
      }
    }

    //var skill_level = levels[0];
    if (skill_level) {
      user.level = skill_level.level;
      user.level_icon = skill_level.icon;
    }

  }

  getOrdinalSuffix(number:number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = number % 100;
    return number + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
  }

}
