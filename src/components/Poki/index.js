import './index.css'
const Poki=(props)=>{
    const {name, image}=props
    return (
        <li className="poki-card">
            <div className="poki-container">
                <div className='image-card'><img className="poki-image" src={image} alt="pokemon-image" /></div>
                <h1 className="poki-heading">{name}</h1>
            </div>
        </li>
    )
}

export default Poki