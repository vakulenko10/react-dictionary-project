import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Container from './Container';
import { useTheme } from './themeContext';
import { motion, useInView  } from 'framer-motion';
const MainComponent = () => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [data, setData] = useState(null);
  const [word, setWord] = useState('example');

  const findWordMeanings = (obj) => {
    if (obj && obj.meanings && Array.isArray(obj.meanings)) {
      return obj.meanings
    }
    return [];
  };
  const findWordData = (obj) => {
    const neededProps = ["word", "text", "audio"];
    const result = {};
  
    const searchProperties = (object) => {
      // Check if obj is an object
      if (typeof object === 'object' && object !== null) {
        // Iterate over object keys
        for (let key in object) {
          // Check if the key is one of the needed properties
          if (neededProps.includes(key)) {
            result[key] = object[key]; // Store the value
          } else if (typeof object[key] === 'object') {
            // If the value is an object, recursively search for the needed property
            searchProperties(object[key]);
          }
        }
      }
    };
  
    searchProperties(obj);
    return result;
  };

  const renderWordData = (obj) =>{
    return (<motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay:  0.5 }} className={`flex ${theme == "light"?'bg-slate-300': 'bg-slate-600'} rounded p-5`}>
        <ul>
        {Object.entries(findWordData(obj)).map(([key, value]) => (
            (key != "audio")?<li key={key}>
            <strong>{key}: </strong>
            {value}
          </li>:<li className='flex' key={key}><audio controls key={key}><source key={key} src={value} type="audio/mpeg" /></audio></li>
        ))}
        </ul>
    </motion.div>)
  }
  const findMeaningData = (obj) => {
    const neededProps = ["word", "text", "audio", "partOfSpeech", "definition", "synonyms", "antonyms"];
    const result = {};

    const searchProperties = (object) => {
      // Check if obj is an object
      if (typeof object === 'object' && object !== null) {
        // Iterate over object keys
        for (let key in object) {
          // Check if the key is one of the needed properties
          // if(key == 'synonyms' || key == 'antonyms'){
          //   result[key] = object[key];
          //   // console.log(typeof key)
          //   console.log("object[key]:",object[key])
          // }
          if (neededProps.includes(key) && object[key] ) {
            
            result[key] = object[key]; 
          } else if (typeof object[key] === 'object') {
            // If the value is an object, recursively search for the needed property
            searchProperties(object[key]);
          }
        }
      }
    };
    searchProperties(obj);
    return result;
  };
  const renderMeanings = (meanings) => {
    return meanings.map((meaning, index) => (
      <motion.div key={index} className={` break-words text-wrap  relative flex flex-col p-2 flex-wrap meaning-card w-full ${theme == 'light'? 'bg-[#b8c3d1fe]':'bg-slate-600'} rounded-lg md:p-5 w-full my-3`} initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 0.5, delay: index * 0.1 }} >
        <h3>Meaning {index + 1}</h3>
        <ul>
          {Object.entries(findMeaningData(meaning)).map(([key, value]) => (
            <li key={key}>
              <strong>{key}: </strong>
              {Array.isArray(value) ? (
                <span>{value.map((word, index) => <span key={index}>{word}{index < value.length - 1 ? ', ' : ''}</span>)}</span>
              ) : value}
            </li>
          ))}
        </ul>
      </motion.div>
    ));
  };
  const fetchData = async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        // Handle the error gracefully without logging to the console
        // console.error('Error fetching data:', error);
        // Optionally, you can set the data state to null or handle it in any other way
        setData(null);
      }
    };

  useEffect(() => {
    fetchData();
  }, [word]);

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };
  const {theme, toggleTheme} = useTheme();
  return (
    <Container>
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay:  0.8 }} exit={{opacity: 0, y: 0 }} className={`overflow-hidden w-full box-border break-words text-wrap md:px-10 ${theme == 'light'? 'bg-slate-200':'bg-slate-800 text-white'}  rounded py-10`}>
      <div className='inline'>
        <label htmlFor="word">Enter Word: </label>
        <input id="word" type="text" value={word} className={`px-3 py-1 border-[1px] rounded  out  ${theme == 'light'? 'bg-slate-200 border-[#000]':'bg-slate-800 border-[#fff] text-white'}`} onChange={handleWordChange} />
      </div>
      <div className={`rounded-lg box-border overflow-hidden`}>
        {/* Render your fetched data here */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {data && data.map((item, index) => item && <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity:1, x:0}} className={`my-10  py-10 px-3  rounded-lg ${theme == 'light'? 'bg-slate-300':'bg-slate-700 text-white'} `} key={index}><div key={index}>{renderWordData(item)}</div>
        {findWordMeanings(item) && renderMeanings(findWordMeanings(item))}
        </motion.div>)
        }
        {/* Render specific properties */}
        <div>
        {/* {data && renderWordData(data)} */}
        {/* {data && findWordMeanings(data).length > 0 && renderMeanings(findWordMeanings(data))} */}
        </div>
      </div>
    </motion.div></Container>
  );
};

export default MainComponent;