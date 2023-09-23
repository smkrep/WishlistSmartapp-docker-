import React, { useState } from 'react'
import { AddWishButton } from '../components/AddWishButton'
import { AddWishModal } from '../components/AddWishModal'
import Wish from '../components/Wish'
// import {
//   createSmartappDebugger,
//   createAssistant,
// } from "@salutejs/client";

const CONN_URL = "https://server-drab-six.vercel.app"


// const initializeAssistant = (getState/*: any*/) => {
//   if (process.env.NODE_ENV === "development") {
//     return createSmartappDebugger({
//       token: process.env.REACT_APP_TOKEN ?? "",
//       initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
//       getState,
//     });
//   }
//   return createAssistant({ getState });
// };

// test ci

export default class WishList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wishes: []
    }

    this.sberAssistantUserId = "colatestid"
    console.log(typeof (this.sberAssistantUserId))

    this.wishobj = { importance: '', name: '', price: '', category: '', additional_info: '' }

    this.getWishesFromDB(this.sberAssistantUserId)

    //   this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    //   this.assistant.on("data", (event/*: any*/) => {
    //     if(event.type=="smart_app_data"){
    //       if (event.sub != undefined) {
    //         // this.sberAssistantUserId = event.sub
    //         // console.log("Sub", this.sberAssistantUserId)
    //         // this.getWishesFromDB(this.sberAssistantUserId)
    //       }else if (event.user_id != undefined) {
    //         // this.sberAssistantUserId = event.user_id
    //         // console.log("UserId", this.sberAssistantUserId)
    //         // this.getWishesFromDB(this.sberAssistantUserId)
    //       }
    //     };
    //     //console.log(`assistant.on(data)`, event);
    //     const { action } = event
    //     this.dispatchAssistantAction(action);
    //   });
    //   this.assistant.on("start", (event) => {
    //     //console.log(`assistant.on(start)`, event);
    //   });

    // }

    // getStateForAssistant () {
    //   //console.log('getStateForAssistant: this.state:', this.state)
    //   const state = {
    //     item_selector: {
    //       items: this.state.wishes.map(
    //         ({ id, title }, index) => ({
    //           number: index + 1,
    //           id,
    //           title,
    //         })
    //       ),
    //     },
    //   };
    //   //console.log('getStateForAssistant: state:', state)
    //   return state;
    // }

    // dispatchAssistantAction (action) {
    //   //console.log('dispatchAssistantAction', action);
    //   if (action) {
    //     switch (action.type) {
    //       case 'sberid':
    //         this.sberAssistantUserId = action.note
    //         this.sberAssistantUserId = this.sberAssistantUserId.replaceAll(' ', '')
    //         this.sberAssistantUserId = this.sberAssistantUserId.replaceAll('+', '')
    //         console.log(this.sberAssistantUserId)
    //         this.getWishesFromDB(this.sberAssistantUserId)
    //         break
    //       case 'name':
    //         this.wishobj.name = action.note
    //         break
    //       case 'importance':
    //         //this.wishobj({priority: action.note})
    //         switch(action.note.toLowerCase()){
    //           case 'высокий':
    //             this.wishobj.importance = 'important'
    //             break
    //           case 'средний':
    //             this.wishobj.importance = 'medium'
    //             break
    //           case 'низкий':
    //             this.wishobj.importance = 'not-important'
    //             break
    //         }
    //         break
    //       case 'price':
    //         this.wishobj.price = action.note
    //         break
    //       case 'category':
    //         this.wishobj.category = action.note
    //         break
    //       case 'delname':
    //         this.updateWishesInDB(JSON.stringify({sberuserid: this.sberAssistantUserId, list_of_wishes: this.state.wishes.filter(elem => elem.name.toLowerCase() !== action.note.toLowerCase())}))
    //         this.setState({
    //           wishes: this.state.wishes.filter(elem => elem.name.toLowerCase() !== action.note.toLowerCase())
    //         });
    //         break
    //       case 'additional':
    //         switch(action.note.toLowerCase()){
    //           case 'нет':
    //             this.wishobj.additional_info = " "
    //             break
    //           default:
    //             this.wishobj.additional_info = action.note
    //             break
    //         }
    //         this.updateWishesInDB(JSON.stringify({sberuserid: this.sberAssistantUserId, list_of_wishes: [...this.state.wishes, {importance: this.wishobj.importance, name: this.wishobj.name, price: this.wishobj.price, category: this.wishobj.category, additional_info: this.wishobj.additional_info}]}))
    //         this.setState({
    //           wishes: [...this.state.wishes, {importance: this.wishobj.importance, name: this.wishobj.name, price: this.wishobj.price, category: this.wishobj.category, additional_info: this.wishobj.additional_info}]
    //         });
    //         break
    //     }
    //   }
  }

  getWishesFromDB(identificator) {
    const Http = new XMLHttpRequest();
    const url = CONN_URL + "/api/getWishes/?sberuserid=" + identificator;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
      const res = Http.response;
      if (res != "") {
        var obj = JSON.parse(res)
        if (obj == null) return
        this.setState({
          wishes: obj['wishes']
        })
      }

    }
  }

  updateWishesInDB(listOfWishes) {
    const Http = new XMLHttpRequest();
    const url = CONN_URL + "/api/updateWishes/";

    var body = listOfWishes

    Http.open("POST", url, true);
    Http.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    Http.send(body);

    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }
  }

  onAddChild = (state) => {
    this.updateWishesInDB(JSON.stringify({ sberuserid: this.sberAssistantUserId, list_of_wishes: [...this.state.wishes, state] }))
    this.setState({
      wishes: [...this.state.wishes, state]
    });
  }

  onRemoveChild = (state) => {
    this.updateWishesInDB(JSON.stringify({ sberuserid: this.sberAssistantUserId, list_of_wishes: this.state.wishes.filter(elem => elem.name !== state) }))
    this.setState({
      wishes: this.state.wishes.filter(elem => elem.name !== state)
    })
  }


  render() {

    const chA = [];

    for (var i = 0; i < this.state.wishes.length; i += 1) {
      chA.push(<Wish
        key={Math.random().toString(36).substring(7)}
        id={Math.random().toString(36).substring(7)}
        importance={this.state.wishes[i].importance}
        name={this.state.wishes[i].name}
        price={this.state.wishes[i].price}
        category={this.state.wishes[i].category}
        additional_info={this.state.wishes[i].additional_info}
        onRemove={this.onRemoveChild} />);
    };

    return (
      <ParentComponent onAdd={this.onAddChild}>
        {chA}
      </ParentComponent>
    );
  }
}

export const ParentComponent = props => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div>
      <section className='buttonContainer'>
        <AddWishButton setActive={setModalActive} />
      </section>
      <section className="container">
        {props.children}
      </section>
      <section className='footer'>
      </section>
      <AddWishModal active={modalActive} setActive={setModalActive} onAdd={props.onAdd} />
    </div>)
};
