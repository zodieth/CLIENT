import React from "react";
import {connect} from "react-redux" /// es una funcion, me permite tomar los valores del estado global y me va a permitir hacer dispatch tambien
//import { getAllCharacters } from "../Redux/actions";
import ProductsCard from "../ProductsCard/ProductsCard";
import style from "./cards.module.css"

class Cards extends React.Component{ 
    constructor(props){ /// siempre se llama al constructor por la sitaxis de Emscript 6
        super(props)
    }

    componentDidMount(){  
        this.props.getAllCharacters(); 
    }

    render(){ 
        return(
            <div className={style.container}> 
                {
                    this.props.currentPokemones.map(products=>{  
                        return( 
                            <ProductsCard 
                                name={products.name}
                                description={products.description}
                                price={products.price}
                                images={products.images}
                                category={products.category}
                                brand={products.brand}
                                reviews={products.reviews}
                                questions={products.questions}
                                active={products.active}
                                key={products._id}
                                id={products._id}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps=(state)=>{ /// esto me permite armar un objeto con los valores del objeto global, recibe el estado global el conect le da el estao global y esto retorna un objeto con lo que quiero de ahi (REDUCER) entonces yo quiero characters... pongo state.characters (viene del reducer de la funcion initialstate) y todo esto se va a props
    return{
        characters:state.characters, /// los personajes que ya vienen de la api
        myCharacters:state.myCharacters, /// hago otro con mis personajes
    }
}

const mapDispatchToProps=(dispatch)=>{ // yo quiero que esto se ejecute cuando el componente se monta /// me entraga funciones que puedan hacer dispatch, xq cards solo no puede hacerlo solo
    return{ /// esto es un objeto de dispacheadores
        getAllCharacters: () => dispatch(getAllCharacters()),  ///le ponemos getAllCharacters xq generalmente se pone el mismo nombre que queremos ejecutar aca       
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cards); /// connect(mapStateToProps,mapDispatchToProps)esto viene del conects y me permite hacer dispatch, si las pongo aca solas me va a tirar error asi que las tengo que definir mas arriba 