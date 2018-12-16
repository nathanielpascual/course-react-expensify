import React from 'react';

class CategoryListItem extends React.Component{
    constructor(props){
        super(props);
    }

    onOpen=(e)=> {
        const selectedCategory = e.target.innerText;
        this.props.onOpen(selectedCategory);
    }

    render(){
        return (
         <div className="list-item--modal" onClick={this.onOpen}>
            <div>
                <span className="list_item__sub-title--modal" >{this.props.description}</span>
             </div> 
         </div>
        )
    };
};
export default CategoryListItem;
