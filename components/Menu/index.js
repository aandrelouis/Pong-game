import React from "react"
import { useState } from "react"
import { Jogo } from "../Jogo";
import styles from "../../styles/components/Menu.module.css"

export function Menu(){
    const [level, setLevel] = useState(0);
    const [inGame, setInGame] = useState(false);

    function selectLevel(nivel){       
        if(nivel == "facil"){
            setLevel(0)
        }else if(nivel == "medio"){
            setLevel(1)
        }else if(nivel == "dificil"){
            setLevel(2)
        }else{
            setLevel(3)
        }
        setInGame(true)
    }

    return(
        <div className={styles.container}>
            {
                inGame 
                ?
                    <Jogo callbackParent={(bool) => setInGame(false)} level={level} />
                :
                <div className={styles.containerCanvas}>
                    <h1>0x0</h1>
                    <div className={styles.canvas}>
                        <h2>Selecione o nível</h2>
                        <div className={styles.buttons}>
                            <button onClick={() => selectLevel("facil")}>FÁCIL</button>
                            <button onClick={() => selectLevel("medio")}>MÉDIO</button>
                            <button onClick={() => selectLevel("dificil")}>DIFÍCIL</button>
                            <button onClick={() => selectLevel("impossivel")}>IMPOSSÍVEL</button>
                        </div>
                        
                    </div>
                </div>
            }
            
        </div>
    )
}