export default function CreateShort(text){
    return text.length > 7 ? text.slice(0 , 7) + "..." : text;
}