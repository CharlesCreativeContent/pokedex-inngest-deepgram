"use client"
import { inngest } from "../inngest/inngest.client";
import { useState } from "react";
import { NextResponse } from "next/server";

export default function Home(){
const [message, setMessage] = useState("Waiting for message...");
function alertle(text: string): void {
  let p = document.querySelector("p");
  if (p) p.innerHTML = text;
}

async function triggerInngestEvent(){
  await inngest.send({
    name: 'test/hello.world',
    data: {
      message: "Hello From Next.js"
    }
  })
  .then(response=>response.ids[0])
  .then(eventId=>{

      setTimeout(function(){
        fetch(`http://localhost:8288/v1/events/${eventId}/runs`,{
  method: 'GET',
  headers: {'x-inngest-env': 'vS9sdMBelobZYRE9xWXl3a_guC0V3-5WF7qYfF5tBSAsiDBscekS3vU6xZybXYtnyKGvjipu0qTqwk7y65JMNw', Accept: 'application/json', Authorization: 'Bearer signkey-prod-c30da45501605b5c580c697873bbf88e992ca126e68e04ab72432f2bfe01dc9c'}
}).then(inference=>inference.json())
    .then(done=>{
      // setMessage(done.data[0].output[0].message.content)
      alertle(done.data[0].output[0].message.content)
    })

}, 3000);
  })
  
  // fetch("https://pokeapi.co/api/v2/pokemon/1")
  // .then(data=>data.json())
  // .then(data=>console.log(data))
  // .catch(error=>console.error(error))
}

  return (
    <div style={{ backgroundColor: "black" }}>
      <form action={ triggerInngestEvent }>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Trigger Inngest Event</button>
      </form>
      <p style={{ color: "white" }}>{message}</p>
    </div>
    
  );
}
