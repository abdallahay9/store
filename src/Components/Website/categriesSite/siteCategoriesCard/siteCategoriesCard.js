import './siteCategoriesCard.css'
export default function(props){
    return <div className='siteCategoriesCard'>
        <div className='image' style={{ backgroundImage:`url(${props.image})` }}></div>
        <div className='title'>{props.title}</div>
    </div>
}