// ambil tanggal hari ini

const getDate = new Date();
const getYear = getDate.getFullYear();
const getMonth = getDate.getMonth() + 1;
const getDay = getDate.getDate();

function bulan(){
    if(getMonth < 10){
        bulan = `0${getMonth}`;
    }else{
        bulan = getMonth
    }
    return bulan
}
function hari(){
    if(getDay < 10){
        hari = `0${getDay}`;
    }else{
        hari = getDay;
    }
    return hari;
}



const tanggal = `${getYear}-${bulan()}-${hari()}`;
// console.log(tanggal);


function getJadwalSholat() {
    fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/682/tanggal/2022-12-29')
    .then(response => response.json())
    .then(data => {
        const jadwal = data.jadwal.data;
        document.getElementById("imsak").innerHTML = jadwal.imsak;
        document.getElementById("subuh").innerHTML = jadwal.subuh;
        document.getElementById("terbit").innerHTML = jadwal.terbit;
        document.getElementById("dhuha").innerHTML = jadwal.dhuha;
        document.getElementById("dzuhur").innerHTML = jadwal.dzuhur;
        document.getElementById("ashar").innerHTML = jadwal.ashar;
        document.getElementById("magrib").innerHTML = jadwal.maghrib;
        document.getElementById("isya").innerHTML = jadwal.isya;
    })
}

setInterval(getJadwalSholat,500);

//full screen
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

// tanggal baru
var fixd;

function isGregLeapYear(year)
{
return year%4 == 0 && year%100 != 0 || year%400 == 0;
}


function gregToFixed(year, month, day)
{
var a = Math.floor((year - 1) / 4);
var b = Math.floor((year - 1) / 100);
var c = Math.floor((year - 1) / 400);
var d = Math.floor((367 * month - 362) / 12);

if (month <= 2)
e = 0;
else if (month > 2 && isGregLeapYear(year))
e = -1;
else
e = -2;

return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + day;
}

function Hijri(year, month, day)
{
this.year = year;
this.month = month;
this.day = day;
this.toFixed = hijriToFixed;
this.toString = hijriToString;
}

function hijriToFixed()
{
return this.day + Math.ceil(29.5 * (this.month - 1)) + (this.year - 1) * 354 +
Math.floor((3 + 11 * this.year) / 30) + 227015 - 1;
}

function hijriToString()
{
var months = new Array("Muharram","Safar","Rabiul Awwal","Rabiul Tsani","Jumadil Ula","Jumadil Tsani","Rajab","Sya\'ban","Ramadhan","Syawwal","Dzul Qa\'dah","Dzul Hijjah");
return this.day + " " + months[this.month -1]+ " " + this.year;
}

function fixedToHijri(f)
{
var i=new Hijri(1100, 1, 1);
i.year = Math.floor((30 * (f - 227015) + 10646) / 10631);
var i2=new Hijri(i.year, 1, 1);
var m = Math.ceil((f - 29 - i2.toFixed()) / 29.5) + 1;
i.month = Math.min(m, 12);
i2.year = i.year;
i2.month = i.month;
i2.day = 1;
i.day = f - i2.toFixed() + 1;
return i;
}

var tod=new Date();
var weekday=new Array("Ahad","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu");
var monthname=new Array("Januari","Februari","Maret","April","Mei"," Juni","Juli","Agustus","September","Oktober","November","Desember");

var y = tod.getFullYear();
var m = tod.getMonth();
var d = tod.getDate();
var dow = tod.getDay();

fixd=gregToFixed(y, m, d);
var h=new Hijri(1421, 11, 28);
h = fixedToHijri(fixd);