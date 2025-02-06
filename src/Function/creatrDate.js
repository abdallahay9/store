export default function createDate(date){
    if(date != null){
        const newDate = new Date(date);
        const day = newDate.getDate().toString().length == 1 ?  "0" + newDate.getDate() : newDate.getDate();  // استخدم getDate() بدل getDay() للحصول على رقم اليوم في الشهر
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().length == 1 ? "0" + (newDate.getMonth() + 1) :  newDate.getMonth() + 1;  // getMonth() يعيد الأشهر من 0 إلى 11
        return `${year}-${month}-${day}`;
    }
    return '1970-01-01';
}