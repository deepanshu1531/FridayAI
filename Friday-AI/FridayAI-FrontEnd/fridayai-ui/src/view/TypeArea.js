import React from "react";
import { Icon } from '@iconify/react';

export default class TypeArea extends React.Component {

    state = {
        queryText: '',
        btnDis: true,
        micBtnColor: ''
    }

    onMicClick = (e) => {
        console.log(e.keyCode)
        // checking if mousepad or space bar is clicked. keycode 13 is spacebar undefine for mousepad.
        if (e.keyCode === undefined || e.keyCode === 32) {
            let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            let recognition = new SpeechRecognition();
            let transcript = '';
            recognition.onstart = () => {
                console.log("speech recognization started");
                this.setState({ micBtnColor: 'red' });
            };
            recognition.onspeechend = () => {
                this.setState({ micBtnColor: '' })
                recognition.stop();
                console.log("speech recognization stopped");
            }
            recognition.onresult = async (event) => {
                transcript = await event.results[0][0].transcript;
                (this.state.queryText === '') ?
                    this.setState({
                        queryText: transcript,
                        btnDis: ''
                    })
                    :
                    this.setState({
                        queryText: this.state.queryText + " " + transcript,
                        btnDis: ''
                    })
            };
            recognition.start();
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if(this.state.queryText !== ''){
                this.props.onFormSubmit(e, this.state.queryText);
                this.setState({
                    queryText: '',
                    btnDis: true
                })
            }
        } else {
            e.preventDefault();
        }
    }



    onType = (e) => {
        if (e.target.value !== '') {
            this.setState({
                btnDis: ''
            })
        }
        else {
            this.setState({
                btnDis: true
            })
        }
        this.setState({
            queryText: e.target.value
        })
    }

    handleSubmit = (e) => {
        this.props.onFormSubmit(e, e.target.query.value);
        this.setState({
            queryText: '',
            btnDis: true
        })
    }

    render() {
        return (
            <>
                <form className="msger-inputarea" methon="post" onSubmit={e => this.handleSubmit(e)}>
                    <input name="query" type="text" className="msger-input" value={this.state.queryText} onChange={this.onType} placeholder="Ask something.."></input>
                    <button type="button" className="msger-mic-btn" style={{ background: this.state.micBtnColor }} onClick={this.onMicClick} onKeyDown={this.onMicClick}><Icon icon="majesticons:microphone" width="40" height="40" /></button>
                    <button type="submit" className="msger-send-btn" disabled={this.state.btnDis}><Icon icon="carbon:send-filled" color="black" width="40" height="40" /></button>
                </form>
            </>
        );
    }
}