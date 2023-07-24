import React from "react";
import isURL from 'validator/lib/isURL';
import Linkify from 'react-linkify';
import { SecureLink } from "react-secure-link";
import { Icon } from '@iconify/react';

export default class TextArea extends React.Component {

    state={
        muteBtn:"fluent:speaker-2-28-regular"
    }

    componentDidMount=()=>{
        if(sessionStorage.getItem("isSpeaking")==="false"){
            this.setState({
                muteBtn : "fluent:speaker-off-28-regular"
            })
        }
    }

    voiceControl = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("isSpeaking") === null || sessionStorage.getItem("isSpeaking") === "true") {
            console.log("mute");
            sessionStorage.setItem("isSpeaking", "false");
            window.speechSynthesis.pause();
            this.setState({
                muteBtn : "fluent:speaker-off-28-regular"
            })
        }
        else {
            console.log("Unmute");
            sessionStorage.setItem("isSpeaking", "true");
            window.speechSynthesis.cancel();
            this.setState({
                muteBtn : "fluent:speaker-2-28-regular"
            })
        }

    }

    render() {
        return (
            <>
                <header className="msger-header">
                    <div className="msger-header-title">
                        <Icon icon="emojione-v1:girl" color="black" width="40" height="40" />
                        Friday
                        <button className="msger-mute-btn" onClick={e => this.voiceControl(e)}>
                            <Icon icon={this.state.muteBtn} color="white" width="40" height="40" />
                        </button>
                    </div>
                    <div className="msger-header-options">
                        <span><i className="fas fa-cog"></i></span>
                    </div>
                </header>

                <main className="msger-chat">
                    {this.props.convoList.map(chat => (
                        <>
                            {(chat.getQuery() !== '')
                                ?
                                <div className="msg right-msg">
                                    <div
                                        className="msg-img-right"
                                        style={{ backgroundimage: "url()" }}
                                    ></div>

                                    <div className="msg-bubble">
                                        <div className="msg-info">
                                            <div className="msg-info-name">You</div>
                                            <div className="msg-info-time">{new Date().getHours() + ':' + new Date().getMinutes()}</div>
                                        </div>

                                        <div className="msg-text">
                                            {chat.getQuery()}
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            }

                            {(chat.getSolution() !== '')
                                ?
                                (isURL(chat.getSolution())) ?
                                    <>

                                        <div className="msg left-msg">
                                            <div
                                                className="msg-img-left"
                                                style={{ backgroundimage: "url()" }}
                                            ></div>

                                            <div className="msg-bubble">
                                                <div className="msg-info">
                                                    <div className="msg-info-name">Friday</div>
                                                    <div className="msg-info-time">{new Date().getHours() + ':' + new Date().getMinutes()}</div>
                                                </div>

                                                <img width="250" height="250" src={chat.getSolution()} alt={chat.getQuery()}></img>
                                            </div>
                                        </div>

                                    </>
                                    :
                                    <div className="msg left-msg">
                                        <div
                                            className="msg-img-left"
                                            style={{ backgroundimage: "url()" }}
                                        ></div>

                                        <div className="msg-bubble">
                                            <div className="msg-info">
                                                <div className="msg-info-name">Friday</div>
                                                <div className="msg-info-time">{new Date().getHours() + ':' + new Date().getMinutes()}</div>
                                            </div>

                                            <div className="msg-text">
                                                <Linkify componentDecorator={
                                                    (decoratedHref, decoratedText, key) =>
                                                        (<SecureLink href={decoratedHref} key={key}>{decoratedText}</SecureLink>)}>
                                                    <pre style={{ whiteSpace: "pre-wrap" }}>
                                                        {chat.getSolution()}
                                                    </pre>
                                                </Linkify>
                                            </div>
                                        </div>
                                    </div>
                                :
                                <></>
                            }
                        </>
                    ))}
                    <div id="down"></div>
                </main>
            </>
        );
    }
}