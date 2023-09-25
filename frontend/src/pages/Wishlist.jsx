import React, { useState } from 'react'
import { AddWishButton } from '../components/AddWishButton'
import { AddWishModal } from '../components/AddWishModal'
import Wish from '../components/Wish'


const CONN_URL = "https://server-drab-six.vercel.app"


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
