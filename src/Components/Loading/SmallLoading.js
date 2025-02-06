import './../../Css/components/smallLoading.css';

export default function SmallLoading(){
    return <section className="dots-container d-flex justify-content-center align-items-center" style={{minHeight:"calc(100dvh - 97px)"}}>
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
  </section>;
}