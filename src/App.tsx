import { useState } from 'react'
import styles  from './App.module.css'
import poweredImage from './assets/powered.png'
import {levels, calculateImc, Level} from './helpers/imc'
import { GridItem } from './components/GridItem'
import leftArrowImage from './assets/leftarrow.png'



const App = () => {

  const [heightField, setHeightField] = useState<number>(0)

  const [weightField, setWeightField] = useState<number>(0)

  const [toShow, setToShow] = useState<Level | null>(null)





  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField))

    } else {
      alert('Digite todos os campos')
    }
  }

  const handlebackbutton = () => {
    setToShow(null)
    setHeightField(0);
    setWeightField(0);
  }


  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="imagem da logo" width={150}/>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftside}>
            
            <h1>Calcule o seu IMC</h1>
            <p>IMC é a sigla Indice de Massa Corporea, parametro adotado pela Organização Mundial de Saude para calcular o peso ideal de cada pessoa </p>


             <input 
              type = 'number'
              placeholder='Digite a sua altura Ex: 1.5 (em metros)'
              value={heightField > 0 ? heightField : ''}
              onChange={e => setHeightField(parseFloat(e.target.value))}
              disabled = {toShow ? true : false}
             /> 

            <input 
              type = 'number'
              placeholder='Digite o seu peso Ex: 75.3 (em kg)'
              value={weightField > 0 ? weightField : ''}
              onChange={e => setWeightField(parseFloat(e.target.value))}
              disabled = {toShow ? true : false}

             /> 
              
            <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calculate</button>
        </div>

        <div className={styles.rightside}>
          {!toShow &&
            <div className={styles.grid}>

              {levels.map((item,key)=>(
               <GridItem key={key} item={item}/>
              ))}

            </div>
            }
            
            {toShow &&

              <div className={styles.rightbig}>

                  <div className={styles.rightArrow} onClick={handlebackbutton}>
                    <img src={leftArrowImage} width={25}/>  
                  </div>
                  <GridItem item={toShow}/>
                
                </div>
            
            }
        </div>
      </div>
    </div>
  )
}

export default App;