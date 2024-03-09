import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTheme } from './themeContext';
import {motion} from 'framer-motion'
const Giphy = ({word}) => {
    // console.log("word:", word)
    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const {theme, toggleTheme, showCopied, showCopyAlert} = useTheme();
    useEffect(()=>{
       
        const fetchData = async () =>{
            try{
                const results = await axios(
                "https://api.giphy.com/v1/gifs/search",
                {
                    
                    params: {
                        api_key: process.env.REACT_APP_GIPHY_API_KEY,
                        q: word,
                        limit: 8
                    }
                });
            
            setData(results.data.data)
            // console.log("data:", data)
            
            }
            catch(error){
                console.log("error in giphy",error)
            }
            
            }
            fetchData()
    }, [word, data])
    const toggleOpen = () =>{
        setIsOpen(prev => (!prev))
    }
    const handleClick = (url) => {
        showCopyAlert();
        navigator.clipboard.writeText(url);
    };
  return (
    
    <div className={`w-full flex  flex-col ${theme == "light"?'bg-slate-300':'bg-slate-700'} p-2 rounded-lg`}>
    <motion.button initial={{scale: 1}} whileHover={{scale: 1.01}} onClick={toggleOpen} className={`p-3 rounded-lg ${theme=='light'?'bg-slate-100':'bg-slate-600'}`}>{isOpen?<>close</>:<>click to find similar GIFs.</>}</motion.button>
    <motion.div initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: isOpen ? 'auto' : 0 , display: isOpen ? 'flex' : 'hidden'}}
                transition={{ duration: 0.8}} className={`mt-5 w-full gif box-border ${theme=='light'?'bg-slate-400':'bg-slate-600'} ${isOpen?'flex flex-wrap h-auto  p-5 rounded-2xl overflow-hidden':'hidden'}`}>
        {data.map((element)=>{
            
            return <motion.div key={element.id} initial={{scale: 1}} whileHover={{scale: 1.02}} whileTap={{scale: 1.02}} onClick={() => handleClick(element.images.fixed_height.url)}>
                <img src={element.images.fixed_height.url} className={`${isOpen?'object-cover':'hidden'}`} alt={element.id} />
            </motion.div>
        })}
        
    </motion.div></div>
  )
}

export default Giphy