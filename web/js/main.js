fetch.loop=(n,...a)=>{
	return fetch(...a).catch((r)=>{
		r.ok=false;
		return r;
	}).then((r)=>{
		if (!r.ok){
			if (n==1){
				throw new Error("API Request Error");
			}
			return fetch.loop(n-1,...a);
		}
		return r
	});
}
document.addEventListener("DOMContentLoaded",()=>{
	document.querySelectorAll(".bg-r .bg .wr .top .icon")[0].onclick=()=>{
		window.location.href="/";
	};
	let te=document.querySelectorAll(".bg-r .bg .wr .top .title")[0];
	te.innerHTML=te.innerText.split("").map((e)=>{
		return `<span class="c">${e}</span>`;
	}).join("");
	let se=document.querySelectorAll(".bg-r .bg .wr .side")[0];
	fetch.loop(3,"/api/v1/popular",{}).then((e)=>e.json()).then((e)=>e.forEach((k)=>{
		se.innerHTML+=`<div class="elem" onclick="window.location.href='${k.url}'">${k.name}</div>`;
	}));
},false);
