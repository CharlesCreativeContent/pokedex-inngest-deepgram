"use client"
import { inngest } from "../inngest/inngest.client";
import { useState } from "react";

export default function Home(){
const [message, setMessage] = useState("Pokedex Description");
const [id, setId] = useState("#ID");
const [name, setName] = useState("#Bulbasaur");
const [type, setType] = useState("#Type");

async function updateUI(text: string): Promise<void> {
let {name, id, types} = await getPokemon(text)
let intro = `${name}! A ${types[0].type.name} type pokemon!`
setName(name)
let eventId = await preload(name)
setId("#"+id)
setType(types[0].type.name)
updater(name,"#main-screen")
setTimeout( async ()=>{
let output = await triggerInngestEvent(eventId)
let answer = output.data[0].output
console.log("answer: ", answer)
pokedexTalk( intro + " " + answer )
setMessage(answer+"")
},3000)
}

const pokedexTalk = async (speech: string) => {
  try {
    const res = await fetch("/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: speech }),
    });

    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const blob = await res.blob(); // audio, not JSON
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  } catch (err) {
    console.error(err);
  }
};


let pokemon2ImageBaseURL = (id:string) => `url(https://projectpokemon.org/images/normal-sprite/${id}.gif)`
let updater = (id:string,className:string): void =>{
const pokemonstat = document.querySelector(className)
if(className==="#main-screen") {
if (pokemonstat) pokemonstat.style.backgroundImage = pokemon2ImageBaseURL(id)
}else{
if (pokemonstat) pokemonstat.innerHTML = id
}
}

async function preload (pokemon:string){
  console.log("pokemon name: going in", pokemon)
const response = await inngest.send({
    name: "test/hello.world",
    data: { message: pokemon },
  });
  const eventId = response.ids[0];
  return eventId
}

async function triggerInngestEvent(eventId: string): Promise<void> {
  return await fetch(
    `http://localhost:8288/v1/events/${eventId}/runs`,
    {
      method: "GET",
      headers: {
        "x-inngest-env":
          "vS9sdMBelobZYRE9xWXl3a_guC0V3-5WF7qYfF5tBSAsiDBscekS3vU6xZybXYtnyKGvjipu0qTqwk7y65JMNw",
        Accept: "application/json",
        Authorization:
          "Bearer signkey-prod-c30da45501605b5c580c697873bbf88e992ca126e68e04ab72432f2bfe01dc9c",
      },
    }
  ).then(res=>res.json())
}

function getPokemon(id: string){
  return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
  .then(_=>_.json())
  .then(data=>data)
  .catch(error=>console.error(error))
}

  return (
    
    <div id="bigPicture" style={{ backgroundColor: "white" }}>
      
      <div className="logo">
    <img src="https://shawncharles.com/images/pokedex.jpg" height="200%" alt="logo" />
  </div>

  <div className="mention">
    <div className="links">
      <a href="https://shawncharles.com" target="_blank">
        <div className="link-logo codepen"></div>
      </a>
      <a href="https://github.com/CharlesCreativeContent" target="_blank">
        <div className="link-logo github"></div>
      </a>
      <a href="https://twitter.com/shawnbasquiat" target="_blank">
        <div className="link-logo twitter"></div>
      </a>
      <a href="https://www.linkedin.com/in/shawnxcharles/" target="_blank">
        <div className="link-logo linkedin"></div>
      </a>
    </div>
  </div>

  <div id="pokedex">
    <div id="left-panel">
      <div className="left-top-container">
        <svg id="svg4" height="100" width="225" className="left-svg">
          <polyline points="0,75 70,75 90,38 224,38"  id="svg1" />
        </svg>
        <div className="lights-container">
          <div className="big-light-boarder">
            <div className="big-light blue">
              <div className="big-dot light-blue"></div>
            </div>
          </div>
          <div className="small-lights-container">
            <div className="small-light red">
              <div className="dot light-red"></div>
            </div>
            <div className="small-light yellow">
              <div className="dot light-yellow"></div>
            </div>
            <div className="small-light green">
              <div className="dot light-green"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="screen-container">
        <div className="screen">
          <div className="top-screen-lights">
            <div className="mini-light red"></div>
            <div className="mini-light red"></div>
          </div>
          <div id="main-screen"></div>
          <div className="bottom-screen-lights">
            <div className="small-light red">
              <div className="dot light-red"></div>
            </div>
            <div className="burger">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-container">
        <div className="upper-buttons-container">
          <div className="big-button"></div>
          <div className="long-buttons-container">
            <div className="long-button red"></div>
            <div className="long-button light-blue"></div>
          </div>
        </div>
        <div className="nav-buttons-container">
          <div className="dots-container">
            <div>.</div>
            <div>.</div>
          </div>
          <div className="green-screen">
            <span id="name-screen">{name}</span>
          </div>
          <div className="right-nav-container">
            <div className="nav-button">
              <div className="nav-center-circle"></div>
              <div className="nav-button-vertical"></div>
              <div className="nav-button-horizontal">
                <div className="border-top"></div>
                <div className="border-bottom"></div>
              </div>
            </div>
            <div className="bottom-right-nav-container">
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
              <div className="dots-container">
                <div className="black-dot">.</div>
                <div className="black-dot">.</div>
                <div className="black-dot">.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="right-panel" className="no-border">
      <div className="empty-container no-border">
        <svg className="no-border" height="100%" width="100%">
          <polyline id="svg2" className="no-border" points="0,0 0,40 138,40 158,75 250,75 250,0 0,0"  />
          <polyline id="svg3" className="no-border" points="0,40 138,40 158,75 250,75" />
        </svg>
      </div>
      <div className="top-screen-container">
        <div id="about-screen" className="right-panel-screen">{message}
        </div>
      </div>
      <div className="square-buttons-container">
        <div className="blue-squares-container">
          <div className="blue-square"></div>
          <div className="blue-square"></div>
          <div className="blue-square"></div>
          <div className="blue-square"></div>
          <div className="blue-square"></div>
          <div className="blue-square"></div>
          <div className="blue-square"></div>
          <div className="blue-square"></div>
          <div className="blue-square"></div>
          <div className="blue-square"></div>
        </div>
      </div>
      <div className="center-buttons-container">
        <div className="center-left-container">
          <div className="small-reds-container">
            <div className="small-light red">
              <div className="dot light-red"></div>
            </div>
            <div className="small-light red">
              <div className="dot light-red"></div>
            </div>
          </div>
          <div className="white-squares-container">
            <div className="white-square"></div>
            <div className="white-square"></div>
          </div>
        </div>
        <div className="center-right-container">
          <div className="thin-buttons-container">
            <div className="thin-button"></div>
            <div className="thin-button"></div>
          </div>
          <div className="yellow-button yellow">
            <div className="big-dot light-yellow"></div>
          </div>
        </div>
      </div>
      <div className="bottom-screens-container">
        <div id="type-screen" className="right-panel-screen">{type}</div>
        <div id="id-screen" className="right-panel-screen">{id}</div>
      </div>
    </div>
  </div>

 
  <div className="search-container">
    <input id="name-input" type="text" placeholder={ message } 
        onBlur={(e) => updateUI(e.target.value)} />
        
    <div id="search-btn" className="ball-container">
      <div className="upper-half-ball"></div>
      <div className="bottom-half-ball"></div>
      <div className="center-ball"></div>
      <div className="center-line"></div>
    </div>
  </div>
  
    </div>
    
  );
}
