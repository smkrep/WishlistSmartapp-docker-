import React from 'react'
import "../App.css"
import trash from "../trash-can-solid.svg"


export default class Wish extends React.Component {
    constructor (props){
      super(props);
      this.state = {id: props.id, importance: props.importance, name: props.name, price: props.price, category: props.category, additional_info: props.additional_info}
        this.handleClick = this.handleClick.bind(this)
        this.onRemove = props.onRemove
    }

  
    render() {
      
      return (
        <div className={`wish ${this.state.importance} `} id={`wish-${this.state.id}`}>
                <div className="header" >
                    <div className='deleteWish'>
                        <img className="options" src={trash} width={20} height={20} onClick={() => this.onRemove(this.state.name)}/>
                    </div>
                </div>
                <div className="name" onClick={this.handleClick}>
                    <span>{this.state.name}</span>
                    <p className='description-header'>˅ Подробнее ˅</p>
                    <div className="description">
                        <p className="description-text">{this.state.additional_info}</p>
                    </div>
                </div>
                <div className="body" id='wish-body'>
                    <div className="triangle-down" onClick={this.handleClick} id={`wish-button-${this.state.id}`}></div>
                    <span className="price">{this.state.price}</span>
                    <div className="category">
                        <span>Категория:</span>
                        <a className="category-name">{this.state.category}</a>
                    </div>
                </div>
            </div>
      );
    }

    handleClick(event){
        const el = document.getElementById(`wish-button-${this.state.id}`)
        const wish = document.getElementById(`wish-${this.state.id}`)
        wish.classList.toggle('expanded')
        if (el.classList.contains('triangle-down')){
            el.classList.remove('triangle-down')
            el.classList.add('triangle-up')
        }
        else if (el.classList.contains('triangle-up')){
            el.classList.remove('triangle-up')
            el.classList.add('triangle-down')
        }
    }


  } 
