import { Modal } from "./UI/modal"
import { Map } from "./UI/maps"
import { getUserLocation, /*getUserAddress*/ } from "./utility/location"
class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateBtn = document.getElementById("locate-btn");
    // this.sharePlaceBtn = document.getElementById("share-btn");

    locateBtn.addEventListener("click", this.getUserLocationHandler.bind(this));
    addressForm.addEventListener("submit", this.addressFormHandler.bind(this));
  }
  
  displayMap(coordinates, address){
    if(this.map){
      this.map.render(coordinates);
    } else{
      this.map = new Map(coordinates);
    }

    // this.sharePlaceBtn.disable = false;
    // const sharePlaceLink = document.getElementById("share-link");
    // sharePlaceLink.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`
  }
  getUserLocationHandler() {
    if(!navigator.geolocation){
      alert("Your browser does not have loaction feature - please use some morden browser or enter your address manually")
      return;
    }
    const modal = new Modal("loading-modal-content", "Loading location - Please wait.");
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async sucess => {
        modal.hide();
        const coordinates = {
          lat: sucess.coords.latitude,
          lng: sucess.coords.longitude
        };
        //const address = await getUserAddress(coordinates);
        this.displayMap(coordinates)
        console.log(coordinates, address);
    }, 
      fail => {
        modal.hide();
        alert("Can't get your location please enter your adress manually");
      });

  }

  async addressFormHandler(e) {
    e.preventDefault();
    const address = e.target.querySelector("input").value;
    if(!address || address.trim().length === 0){
      alert("Not a valid address!")
    }
    const modal = new Modal("loading-modal-content", "Loading location - Please wait.");
    modal.show();
    try{
      const coordinates = await getUserLocation(address);
      this.displayMap(coordinates, address);
    } catch(err){
      alert(err.message);
    }
    modal.hide();
  }
}

const placeFinder = new PlaceFinder();