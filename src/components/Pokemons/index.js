import './index.css'
import {useState, useEffect} from 'react'
import Poki from '../Poki'

const Pokemons=()=>{
    const [pokemons, setPokemons]=useState([])
    const [filteredData, setFilteredData]=useState([])
    const [nextUrl, setNext]=useState('https://pokeapi.co/api/v2/pokemon')
    const [prevUrl, setPrev]=useState(null)
    const [searchInput, setSearch]=useState('')

    const fetchData= async(url)=>{

        try{
            const response= await fetch(url, {method:"GET"})
            const data= await response.json()
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            const pokemonData= await Promise.all(
                data.results.map(async each=>{
                    const fetchedresponse= await fetch(each.url, {method:"GET"})
                    const fetchedData=await fetchedresponse.json()
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                      }
                    return {
                        name:each.name,
                        image:fetchedData.sprites.front_default,
                    }
                })
            )

            setPokemons([...pokemonData])
            setFilteredData([...pokemonData])
            setNext(data.next)
            setPrev(data.previous)
        }catch(err){
            console.log("error is:", err)
        }
    }

    useEffect(()=>{
        fetchData(nextUrl)
    }, [])

    useEffect(()=>{
        const filterdata=pokemons.filter(each=>each && each.name && each.name.toLowerCase().includes(searchInput.toLowerCase()))
        setFilteredData(filterdata)
    }, [searchInput, pokemons])

    const loadMore=()=>{

        fetchData(nextUrl)
    }

    const loadprevMore=()=>{

        fetchData(prevUrl)
    }


    return (
        <div className='main-container'>
            <h1 className='main-heading'>Your Go To Place For Favourite Pokemons</h1>
            <input type='text' placeholder="Enter your pokemon name" className='search-bar'
            value={searchInput}
            onChange={(e)=>setSearch(e.target.value)} />

            <ul className='poki-lists'>
                {filteredData.map((each, index)=>(
                    <Poki key={index} name={each.name} image={each.image} />
                ))}
            </ul>
            <div className='button-container'>
                <button className='prev-button' onClick={loadprevMore}>..Prev</button>
                <button className='next-button' onClick={loadMore}>Next..</button>
            </div>
        </div>
    )
}

export default Pokemons