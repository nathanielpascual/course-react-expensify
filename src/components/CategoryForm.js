import React from 'react';

export default class CategoryForm extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            description: props.category? props.category.description : '',
            parentId : props.category? props.category.parentId : '',
            error : '',
            categories : props.categories ? props.categories : null
        }
    }
    onDescriptionChange = (e)=> {
        const description = e.target.value;
        this.setState(()=>({description}));
    };

    onCategoryChange =(e)=> {
        const parentId = e.target.value;
        this.setState(()=>({parentId}));
    };

    onSubmit =(e)=>{
        e.preventDefault();
        if(!this.state.description){
            this.setState(()=>({error:'Please provide description'}))
        }
        else{
            this.setState(()=>({error:''}));
            this.props.onSubmit({
                description : this.state.description,
                parentId : this.state.parentId,
            })
        }
    }
    render() {
        let optionItems = this.state.categories.map((category) =>
        <option key={category.parentId} 
                defaultValue={this.state.parentId}
                value={category.parentId}>{category.description}</option>
         );
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
                    <div className="field__control"><select
                            className="select select__max-width"
                            value = {this.state.category} 
                            onChange ={this.onCategoryChange}>
                            <option className="optionDefault" key="0" value="0" >-Select Parent-</option>
                            {optionItems}
                        </select>
                    </div>
                    <div className="field__button-control">
                        <Link className="button" to="/createCategory">+</Link>
                    </div>
                </div> 
                <div>
                    <button className="button">Save Expense</button>
                 </div>
            </form>
        )
    };
}