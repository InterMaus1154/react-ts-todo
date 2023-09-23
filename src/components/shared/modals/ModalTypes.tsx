
import {FC, useState, useContext} from 'react';
import { SettingsContext } from '../../../context/SettingsContext';
import { CategoryContext } from '../../../context/CategoryContext';
import Button from '../Button';
import { generateKey } from '../../../util/Key';
import { ICategory } from '../../../util/Category';
import FilterBox from '../../sidepanel/components/FilterBox';
import SettingsComponent from '../../toppanel/components/Settings';
import "../../../style/components_style/Toppanel.css";

export const ItemAddedModal : FC = ()=>{


    const {settings, setSettings} = useContext(SettingsContext);

    return(
        <div className="Modal-content">
            <h2>New item successfully added</h2>
            <label>Don't show again
                <input type="checkbox" checked={!settings.itemAddedPopUp} onChange={()=>{
                    setSettings({...settings, itemAddedPopUp: !settings.itemAddedPopUp});
                }}/>
            </label>
        </div>
    )
};

export const ItemDetailsErrorModal :FC = () =>{
    return(
        <div className="Modal-content">
            <h2>Check your inputs!</h2>
            <h3>Check the followings: </h3>
            <ol>
                <li>Item name is present</li>
                <li>The date must be today, or after today</li>
                <li>If it is not all day, provide a time</li>
            </ol>
        </div>
    );
};

export const AllTodoRemovedModal :FC = () =>{
    return(
        <div className="Modal-content">
            <h2>Your todo list is cleared</h2>
        </div>
    );
};

export const ManageCategoriesModal :FC = () =>{

    const [catName, setCatName] = useState<string>("");
    const {categories, setCategories} = useContext(CategoryContext);

    const addCategory = () :void=>{
        if(catName.trim().length === 0){
            alert("Category name cannot be empty!");
            return;
        }

        setCategories([...categories, {id: generateKey(), value: catName, label: catName}])
    };

    const removeCategory = (category: ICategory) : void=>{
        setCategories(prev => prev.filter(current => current.id !== category.id));
    }

    return(
        <div className="Modal-content">
            <label className="Add-cat-lab">Add new category: 
                <input type="text" placeholder="Category name" value={catName} onChange={e => setCatName(e.target.value)}/>
                <Button text="Add" onClick={addCategory}/>
            </label>
            <h2>Categories: </h2>
            <ul className="Categories-list">
            {
                categories.slice(1, categories.length).map(category => (
                    <li key={category.id}>{category.label}
                        <Button text="Remove" onClick={()=>{removeCategory(category)}}/>
                    </li>
                    
                ))
            }
            </ul>
        </div>
    );
};


export const FilterModal : FC = ()=>{
    return(
        <div className="Modal-content">
            <FilterBox />
        </div>
    )
}

export const SettingsModal : FC = ()=>{
    return(
        <div className="ModalContent SettingsModal">
            <SettingsComponent />
        </div>
    );
}

export const UserRegisteredModal : FC = ()=>{
    return(
        <div className="ModalContent">
            <h2>User succesfully registered!</h2>
        </div>
    );
}

export const UserExistModal : FC = ()=>{
    return(
        <div className="ModalContent">
            <h2>This username has been already registered!</h2>
        </div>
    );
}

export const FillOutFieldsModal : FC = ()=>{
    return(
        <div className='ModalContent'>
            <h2>Make sure to fill out all the required fields!</h2>
        </div>
    );
};

export const InvalidCredentials : FC = ()=>{
    return(
        <div className='ModalContent'>
            <h2>Your username or password is invalid!</h2>
        </div>
    );
};

