import axios from 'axios';

export default class Conversation{
    query='';
    solution='';
    
    setQuery=(query)=>{
        this.query = query;
    }

    getQuery=()=>{
        return this.query;
    }

    setSolution=(solution)=>{
        this.solution = solution;
    }

    getSolution=()=>{
        return this.solution;
    }

    fridayCall=async (value)=>{
        let convo = new Conversation()
        console.log(encodeURI(value))
        let res=await axios.post("http://localhost:8080/friday/activate/"+encodeURI(value.replaceAll("\\","--").replaceAll('/',"==")));
        convo.setQuery(value);
        convo.setSolution(res.data);
        return convo;
    }

}