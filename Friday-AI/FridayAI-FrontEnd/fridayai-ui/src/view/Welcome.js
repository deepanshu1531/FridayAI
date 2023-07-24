import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TextArea from "./TextArea";
import TypeArea from "./TypeArea";
import Conversation from "../pojo/Conversation";
import AIVoice from "../pojo/AIVoices";

export default class Welcome extends React.Component {

    convo = new Conversation();

    constructor(){
        super();
        new AIVoice().aiSpeak("");
    }

    state = {
        convoList : [this.convo]
    };

    async componentDidMount(){
        this.setState({
            convoList:[await new Conversation().fridayCall("start")]
        });
        new AIVoice().aiSpeak(this.state.convoList[0].getSolution());
    }

    componentDidUpdate(){
        document.getElementById("down").scrollIntoView({ behavior: 'smooth' });
    }

    onSubmitForm=async (e,query)=>{
        e.preventDefault();
        let convoObj = await new Conversation().fridayCall(query);
        this.setState({
            convoList:this.state.convoList.concat(convoObj)
        });

        (convoObj.getSolution().length<= 300)
            ?
            new AIVoice().aiSpeak(convoObj.getSolution())
            :
            new AIVoice().aiSpeak("Here is the possible result.")
    }

    render() {
        return (
            <section className="msger" id="messenger">
                <TextArea convoList={this.state.convoList}></TextArea>
                <TypeArea onFormSubmit={this.onSubmitForm}></TypeArea>
            </section>

        );
    }
}