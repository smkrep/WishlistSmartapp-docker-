import React from 'react'
import "../AddWishModal.css"



class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {importance: 'important', name: '', price: '', category: '', additional_info: ''};
    this.onAdd = props.onAdd
    this.setActive = props.setActive
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleUnfocus = this.handleUnfocus.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    this.onAdd(this.state)
    this.clearInput()
    this.setActive(false)
    event.preventDefault();
  }

  handleFocus(){
    var x = window.matchMedia("(max-width: 800px)")
    if (x.matches) {
      console.log(document.getElementsByClassName("modal")[0])
      document.getElementsByClassName("modal")[0].style.alignItems = "flex-start"
    }
    
  }

  handleUnfocus(){
    var x = window.matchMedia("(max-width: 800px)")
    if (x.matches) {
      console.log(document.getElementsByClassName("modal")[0])
    document.getElementsByClassName("modal")[0].style.alignItems = "center"
    }
  }
 
  clearInput() {
    this.setState({importance: 'important', name: '', price: '', category: '', additional_info: ''});
    let inputs = document.getElementsByClassName("textInput")
    document.getElementById("additional-info").value = ""
    document.getElementById("importance").value = "important"
    for (let i = 0; i < inputs.length; i += 1){
      inputs[i].value = ""
    }
  }

  render() {
    return (
      <>
      <button className="closeModal" onClick={() => {this.setActive(false); this.clearInput()}}>×</button>
      <form onSubmit={this.handleSubmit}>
        <p>
      <label htmlFor='importance' className="selector-label">Приоритет:</label>
        <select className="selector" value={this.state.importance} onChange={this.handleChange} id="importance" name="importance">
            <option value="important">Высокий</option>
            <option value="medium">Средний</option>
            <option value="not-important">Низкий</option>
        </select>
        </p>
        <input className="textInput" value={this.state.name} onChange={this.handleChange} onBlur={this.handleUnfocus} onFocus={this.handleFocus} type="text" id="name" name="name" placeholder="Введите название" required minLength="1" maxLength="32" />
        <input className="textInput" value={this.state.price} onChange={this.handleChange} onBlur={this.handleUnfocus} onFocus={this.handleFocus} type="text" inputMode="numeric" id="price" name="price" placeholder="Введите цену" onInvalid={(e)=>{e.target.setCustomValidity("Введите неотрицательное целое число.")}} onInput={(e)=>{e.target.setCustomValidity("")}} pattern="\d*" required min="0"/>
        <input className="textInput" value={this.state.category} onChange={this.handleChange} onBlur={this.handleUnfocus} onFocus={this.handleFocus} type="text" id="category" name="category" placeholder="Введите категорию" required minLength="1" maxLength="32"/>
        <textarea className="textArea" value={this.state.additional_info} onChange={this.handleChange} onBlur={this.handleUnfocus} onFocus={this.handleFocus} id="additional-info" name="additional_info"></textarea>
        <button className="buttonSubmit" type="submit">Добавить</button>

    </form>
    </>
    );
  }
}

export const AddWishModal = ({active, setActive, onAdd}) => {

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
        <div className='modal__content' onClick={e => e.stopPropagation()}>
            <AddForm onAdd={onAdd} setActive={setActive} />
        </div>
    </div>
  )
}
