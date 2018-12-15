import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import UpdateCategoryModal from './UpdateCategoryModal';
import { isNullOrUndefined } from 'util';

let optionItems = [];
export default class ExpenseForm extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            description: props.expense? props.expense.description : '',
            note : props.expense? props.expense.note : '',
            amount :  props.expense? (props.expense.amount/100).toString() : '',
            category : props.expense? (props.expense.category) : '',            
            createdAt : props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused : false,
            error : '',
            categories : props.categories ? props.categories : null,
            showCategoryModal:false,
            showSubCategoryModal:false,
            selectedCategory:0
        }
    }
    
    onDescriptionChange = (e)=> {
        const description = e.target.value;
        this.setState(()=>({description}));
    };

    onNoteChange =(e)=> {
        const note = e.target.value;
        this.setState(()=>({note}));
    };

    onAmountChange =(e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=>({amount}));
        }
        
    };

    onCategoryChange =(e)=> {
        const category = e.target.value;
        const selectedCategory = e.target.selectedIndex;
        this.setState(()=>({category}));
        this.setState(()=>({selectedCategory}));
    };

    onDateChange =(createdAt) => {
        if(createdAt){
            this.setState(()=>({createdAt}));
        }
       
    };
    onFocusChange = ({focused}) => {
        this.setState(()=>({calendarFocused:focused}))
    };
    
    onShowCategory = (e) => {
        e.preventDefault();
        this.setState({showCategoryModal:true})
    };

    onSubmit =(e)=>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(()=>({error:'Please provide description and amount'}))
        }
        else{
            this.setState(()=>({error:''}));
            this.props.onSubmit({
                description : this.state.description,
                amount : parseFloat(this.state.amount,10) * 100,
                note : this.state.note,
                category: this.state.category,
                createdAt : this.state.createdAt.valueOf()
            })
        }
    }   

    onCancel = () => {
        this.setState({showCategoryModal:false})
    };

    onUpdateCategory = () => {
        this.setState({showCategoryModal:false});
     }

    render(){
        {
            let tempList = this.props.categories.filter((category)=> category.type === 'ADD_CATEGORY')

            if(tempList.length ===0 || isNullOrUndefined(tempList)) {
                optionItems= this.props.categories !==null && this.props.categories.map((category) =>
                    <option key={category.id} id={category.id} value={category.description}>{category.description}</option>
                );
            }
            tempList = null;
        }
        return (
                <form className="form" onSubmit={this.onSubmit}>
                   {this.state.error && <p className="form__error">{this.state.error}</p>}
                   <div className="field">
                    <input 
                        type="text"
                        className="text-input input__max-width"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}/>
                   </div>
                   <div className="field">
                    <input
                            type="text"
                            className="text-input input__max-width"
                            placeholder="Amount"
                            value = {this.state.amount}
                            onChange ={this.onAmountChange}
                        />
                   </div>  
                    <div className="field">
                        <div className="field__control"><select
                                className="select select__max-width"
                                value = {this.state.category} 
                                onChange ={this.onCategoryChange}>
                                <option className="optionDefault" key="-1" id="-1">-Select Category-</option>
                                {optionItems}
                            </select>
                        </div>
                        <div className="field__button-control">
                            <button className="button" onClick={this.onShowCategory}>+</button>
                        </div>
                        
                    </div> 

                    <SingleDatePicker
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange = {()=> false }
                    />

                    <textarea
                         className="textarea input__max-width"
                         placeholder ="Add a note for your expense (optional)"
                         value={this.state.note}
                         onChange={this.onNoteChange}/>
 
                    <div>
                       <button className="button">Save Expense</button>
                    </div>

                    {
                     this.state.selectedCategory===0 ? (
                        <UpdateCategoryModal 
                            showCategoryModal={this.state.showCategoryModal}
                            onCancel ={this.onCancel}
                            onUpdateCategory = {this.onUpdateCategory}
                            categories={this.state.categories}/>
                        ) : ( '' )
                    }
                </form>
        )
    }
}