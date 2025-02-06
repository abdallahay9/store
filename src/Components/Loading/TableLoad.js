import './TableLoad.css';

export default function TableLoad({ rowCount }) {
    return (
        <div className='tableLoad'>
            {
                Array.from({ length: (rowCount + 1 ) <= 5 ? rowCount+1 : 5}).map((_, index) => (
                    <div key={index} className='trLoad tr1'></div>
                ))
            }
        </div>
    );
}
