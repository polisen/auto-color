import pi from "../utility/pi";

addEventListener("message", (event: MessageEvent) => {
  console.log("worker event message", event.target, event.type);
  postMessage(pi(event.data));
});
